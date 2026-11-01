'use strict';
// Bastion · events (the Power Tournament), on the server side.
// The administrator plans an event from the management panel (start, length, Credits of the top 3).
// When it starts, the power of every base is noted (p0); then each save of a game updates the player's best gain (best = power - p0).
// Tiers: validated as soon as they are reached; nothing is given during the tournament.
// End: the ranking is fixed (rank of each player), then the server sends everything automatically to the inventories
// (every tier reached + the ranking reward). The results stay visible in the game for 7 days.
module.exports = function makeEvents({ db, Q, log, runFor, broadcast, push, engine, IS_TEST }) {
  db.exec(`CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, type TEXT NOT NULL, start INTEGER NOT NULL, end INTEGER NOT NULL, cr TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'planned', by TEXT, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS event_scores (eid INTEGER NOT NULL, uid INTEGER NOT NULL, p0 INTEGER NOT NULL, best INTEGER NOT NULL DEFAULT 0,
      claimed INTEGER NOT NULL DEFAULT 0, rank INTEGER, rclaimed INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (eid, uid));
    CREATE INDEX IF NOT EXISTS event_best ON event_scores (eid, best);`);
  try { db.exec('ALTER TABLE events ADD COLUMN sent INTEGER NOT NULL DEFAULT 0'); } catch (e) {}   // 1 = the rewards of this ended event were sent
  const KEEP = 7 * 86400_000, TYPES = ['power'];
  const E = {
    byId: db.prepare('SELECT * FROM events WHERE id = ?'),
    live: db.prepare("SELECT * FROM events WHERE status IN ('planned', 'running') ORDER BY start LIMIT 1"),
    last: db.prepare("SELECT * FROM events WHERE status = 'ended' AND end > ? ORDER BY end DESC LIMIT 1"),
    list: db.prepare('SELECT e.*, (SELECT COUNT(*) FROM event_scores s WHERE s.eid = e.id AND s.best > 0) AS n FROM events e ORDER BY e.start DESC LIMIT 20'),
    add: db.prepare('INSERT INTO events (type, start, end, cr, status, by, created) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    status: db.prepare('UPDATE events SET status = ?, end = ? WHERE id = ?'),
    del: db.prepare("DELETE FROM events WHERE id = ? AND status = 'planned'"),
    score: db.prepare('SELECT * FROM event_scores WHERE eid = ? AND uid = ?'),
    addScore: db.prepare('INSERT OR IGNORE INTO event_scores (eid, uid, p0) VALUES (?, ?, ?)'),
    setBest: db.prepare('UPDATE event_scores SET best = ? WHERE eid = ? AND uid = ? AND best < ?'),
    setClaimed: db.prepare('UPDATE event_scores SET claimed = ? WHERE eid = ? AND uid = ?'),
    setRank: db.prepare('UPDATE event_scores SET rank = ? WHERE eid = ? AND uid = ?'),
    setRclaimed: db.prepare('UPDATE event_scores SET rclaimed = 1 WHERE eid = ? AND uid = ? AND rclaimed = 0'),
    // the ranking: banned accounts never count; on the official server the administrator does not take part
    top: db.prepare(`SELECT s.uid, s.best, u.name, u.role, b.cos FROM event_scores s JOIN users u ON u.id = s.uid LEFT JOIN bases b ON b.user_id = s.uid
      WHERE s.eid = ? AND s.best > 0 AND u.banned = 0 AND (? OR u.role != 'admin') ORDER BY s.best DESC, s.uid LIMIT ?`),
    above: db.prepare(`SELECT COUNT(*) AS n FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND u.banned = 0 AND (? OR u.role != 'admin') AND (s.best > ? OR (s.best = ? AND s.uid < ?))`),
    count: db.prepare(`SELECT COUNT(*) AS n FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND s.best > 0 AND u.banned = 0 AND (? OR u.role != 'admin')`),
    allBases: db.prepare('SELECT user_id, power FROM bases'),
    unsent: db.prepare("SELECT * FROM events WHERE status = 'ended' AND sent = 0 ORDER BY end LIMIT 1"),
    setSent: db.prepare('UPDATE events SET sent = 1 WHERE id = ?'),
    toSend: db.prepare('SELECT s.*, u.banned FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND s.best > 0'),
    power: db.prepare('SELECT power FROM bases WHERE user_id = ?'),
  };
  const TEST = IS_TEST ? 1 : 0, hooks = {};   // hooks: start and last hour of a tournament (notifications)
  let lastHour = 0;
  const tiers = () => engine.shop().evTiers;   // power needed for each tier (from the game rules)
  const pub = e => e && { id: e.id, type: e.type, start: e.start, end: e.end, status: e.status, cr: JSON.parse(e.cr || '[]') };
  const running = () => { const e = E.live.get(); return e && e.status === 'running' ? e : null; };

  // a game was saved: the player's best gain of the running event
  function onSave(uid, power) {
    const e = running(); if (!e) return;
    E.addScore.run(e.id, uid, Math.max(0, Math.floor(power || 0)));   // a player seen for the first time during the event (new account): starts from now
    const s = E.score.get(e.id, uid), g = Math.floor(power || 0) - s.p0;
    if (g > s.best) E.setBest.run(g, e.id, uid, g);
  }
  // start and end of the events (checked every 20 seconds)
  function start(e) {
    E.status.run('running', e.end, e.id);
    db.exec('BEGIN'); try { for (const b of E.allBases.all()) E.addScore.run(e.id, b.user_id, Math.max(0, Math.floor(b.power || 0))); db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `Tournoi de puissance n°${e.id} commencé · fin le ${new Date(e.end).toLocaleString('fr-FR')}`);
    broadcast('ev', {}); try { hooks.start && hooks.start(e); } catch (x) {}
  }
  function finish(e, now) {
    const list = E.top.all(e.id, TEST, 1e9);
    db.exec('BEGIN'); try { list.forEach((r, i) => E.setRank.run(i + 1, e.id, r.uid)); E.status.run('ended', Math.min(e.end, now), e.id); db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `Tournoi de puissance n°${e.id} terminé · ${list.length} participant(s)${list.length ? ' · 1er : ' + list[0].name + ' (+' + list[0].best.toLocaleString('fr-FR') + ')' : ''}`);
    send(E.byId.get(e.id));
  }
  // the rewards of an ended event, sent to every inventory (each player only once: claimed and rclaimed are marked first)
  function send(e) {
    const T = tiers(), cr = JSON.parse(e.cr || '[]');
    let n = 0, bad = 0;
    for (const s of E.toSend.all(e.id)) {
      if (s.banned) continue;
      let mask = 0; T.forEach((p, i) => { if (s.best >= p && !(s.claimed & (1 << i))) mask |= 1 << i; });
      const rank = s.rank && !s.rclaimed && (s.rank <= 50 || s.best >= T[0]) ? s.rank : 0;
      if (!mask && !rank) continue;
      const u = Q.user.get(s.uid), b = Q.base.get(s.uid); if (!u || !b) continue;
      E.setClaimed.run(s.claimed | mask, e.id, s.uid); if (rank) E.setRclaimed.run(e.id, s.uid);
      try {
        const r = runFor({ ...u, role: 'server' }, b, 'evFinal', [mask, rank, rank ? cr[rank - 1] || 0 : 0, e.id], 'fr', true);
        if (r.error) throw new Error(r.error);
        push(s.uid, 'sync', {}); n++;
      } catch (x) { bad++; E.setClaimed.run(s.claimed, e.id, s.uid); db.prepare('UPDATE event_scores SET rclaimed = ? WHERE eid = ? AND uid = ?').run(s.rclaimed, e.id, s.uid);
        log('ERREUR', `tournoi n°${e.id} : récompenses de ${u.name} non envoyées (${x.message})`); }
    }
    if (!bad) E.setSent.run(e.id);
    log('ÉVÉNEMENT', `Tournoi de puissance n°${e.id} : récompenses envoyées automatiquement à ${n} joueur(s)${bad ? ` · ${bad} échec(s), nouvel essai dans 20 secondes` : ''}`);
    broadcast('ev', {});
  }
  setInterval(() => { const now = Date.now(), e = E.live.get();
    try { const u = E.unsent.get(); if (u) send(u); } catch (x) { log('ERREUR', 'envoi des récompenses du tournoi : ' + x.message); }
    if (!e) return;
    try { if (e.status === 'planned' && now >= e.start) start(e); else if (e.status === 'running' && now >= e.end) finish(e, now);
      else if (e.status === 'running' && now >= e.end - 3600_000 && e.end - e.start > 2 * 3600_000 && lastHour !== e.id) { lastHour = e.id; try { hooks.last && hooks.last(e); } catch (x) {} } }
    catch (x) { log('ERREUR', 'événement : ' + x.message); } }, 20_000).unref();

  // the ranking shown: every player who gained power (up to 50 ranked); on the official server the administrators appear without a rank
  function listTop(eid, me) {
    let n = 0; const out = [];
    for (const r of E.top.all(eid, 1, 80)) {
      const off = !IS_TEST && r.role === 'admin'; if (!off && n >= 50) continue; if (!off) n++;
      out.push({ r: off ? null : n, name: r.name, best: r.best, cos: r.cos ? JSON.parse(r.cos) : null, me: r.uid === me.id });
    }
    return out;
  }
  // what the game shows: the running (or planned) event, else the last one ended less than 7 days ago
  function view(me) {
    const now = Date.now(), e = E.live.get() || E.last.get(now - KEEP);
    if (!e) return { ev: null };
    const s = E.score.get(e.id, me.id), T = tiers();
    let mine = null;
    const out = !IS_TEST && me.role === 'admin';   // the administrator of the official server plays, but is never ranked
    if (s) { const p = (E.power.get(me.id) || {}).power || 0;
      mine = { best: s.best, gain: e.status === 'running' ? Math.max(0, p - s.p0) : s.best, claimed: s.claimed, rank: out ? null : e.status === 'ended' ? s.rank || null : (s.best > 0 ? E.above.get(e.id, TEST, s.best, s.best, me.id).n + 1 : null), out, rclaimed: !!s.rclaimed, sent: !!e.sent }; }
    return { ev: pub(e), tiers: T, me: mine, n: E.count.get(e.id, TEST).n,
      top: e.status === 'planned' ? [] : listTop(e.id, me), now };
  }
  // ---------- management panel ----------
  const admin = {
    list: () => ({ list: E.list.all().map(e => ({ ...pub(e), n: e.n, by: e.by })), live: pub(E.live.get()), now: Date.now() }),
    create(P, by) {
      if (E.live.get()) throw Object.assign(new Error('Un événement est déjà prévu ou en cours'), { code: 409 });
      const type = TYPES.includes(P.type) ? P.type : 'power', now = Date.now();
      const startAt = Math.max(now, Math.floor(Number(P.start) || now)), days = Math.max(1, Math.min(30, Math.floor(Number(P.days) || 7)));
      const cr = [0, 1, 2].map(i => Math.max(0, Math.min(5000, Math.floor(Number((P.cr || [])[i]) || 0))));
      const id = Number(E.add.run(type, startAt, startAt + days * 86400_000, JSON.stringify(cr), 'planned', by, now).lastInsertRowid);
      log('ÉVÉNEMENT', `${by} prévoit le Tournoi de puissance n°${id} · début ${new Date(startAt).toLocaleString('fr-FR')} · ${days} jour(s) · Crédits top 3 : ${cr.join(' / ')}`);
      if (startAt <= now + 1000) start(E.byId.get(id)); else broadcast('ev', {});
      return { id };
    },
    stop(id, by) {
      const e = E.byId.get(Math.floor(Number(id)) || 0); if (!e) throw Object.assign(new Error('Événement inconnu'), { code: 404 });
      if (e.status === 'planned') { E.del.run(e.id); log('ÉVÉNEMENT', `${by} annule le Tournoi de puissance n°${e.id} (pas encore commencé)`); broadcast('ev', {}); return { ok: true }; }
      if (e.status === 'running') { log('ÉVÉNEMENT', `${by} termine maintenant le Tournoi de puissance n°${e.id}`); finish(e, Date.now()); return { ok: true }; }
      throw Object.assign(new Error('Cet événement est déjà terminé'), { code: 409 });
    } };
  return { onSave, view, admin, hooks };
};
