'use strict';
// Bastion · events (the Power Tournament), on the server side.
// The administrator plans an event from the management panel (start, length, Credits of the top 3).
// When it starts, the power of every base is noted (p0); then each save of a game updates the player's best gain (best = power - p0).
// Tiers: collected by the player once reached (the server checks the score, the game engine gives the items).
// End: the ranking is fixed (rank of each player) and the ranking rewards can be collected for 7 days.
module.exports = function makeEvents({ db, Q, log, runFor, broadcast, push, engine, IS_TEST }) {
  db.exec(`CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY, type TEXT NOT NULL, start INTEGER NOT NULL, end INTEGER NOT NULL, cr TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'planned', by TEXT, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS event_scores (eid INTEGER NOT NULL, uid INTEGER NOT NULL, p0 INTEGER NOT NULL, best INTEGER NOT NULL DEFAULT 0,
      claimed INTEGER NOT NULL DEFAULT 0, rank INTEGER, rclaimed INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (eid, uid));
    CREATE INDEX IF NOT EXISTS event_best ON event_scores (eid, best);`);
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
    top: db.prepare(`SELECT s.uid, s.best, u.name, b.cos FROM event_scores s JOIN users u ON u.id = s.uid LEFT JOIN bases b ON b.user_id = s.uid
      WHERE s.eid = ? AND s.best > 0 AND u.banned = 0 AND (? OR u.role != 'admin') ORDER BY s.best DESC, s.uid LIMIT ?`),
    above: db.prepare(`SELECT COUNT(*) AS n FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND u.banned = 0 AND (? OR u.role != 'admin') AND (s.best > ? OR (s.best = ? AND s.uid < ?))`),
    count: db.prepare(`SELECT COUNT(*) AS n FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND s.best > 0 AND u.banned = 0 AND (? OR u.role != 'admin')`),
    allBases: db.prepare('SELECT user_id, power FROM bases'),
    power: db.prepare('SELECT power FROM bases WHERE user_id = ?'),
  };
  const TEST = IS_TEST ? 1 : 0;
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
    broadcast('ev', {});
  }
  function finish(e, now) {
    const list = E.top.all(e.id, TEST, 1e9);
    db.exec('BEGIN'); try { list.forEach((r, i) => E.setRank.run(i + 1, e.id, r.uid)); E.status.run('ended', Math.min(e.end, now), e.id); db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `Tournoi de puissance n°${e.id} terminé · ${list.length} participant(s)${list.length ? ' · 1er : ' + list[0].name + ' (+' + list[0].best.toLocaleString('fr-FR') + ')' : ''} · récompenses à récupérer pendant 7 jours`);
    broadcast('ev', {});
  }
  setInterval(() => { const now = Date.now(), e = E.live.get(); if (!e) return;
    try { if (e.status === 'planned' && now >= e.start) start(e); else if (e.status === 'running' && now >= e.end) finish(e, now); }
    catch (x) { log('ERREUR', 'événement : ' + x.message); } }, 20_000).unref();

  // what the game shows: the running (or planned) event, else the last one ended less than 7 days ago
  function view(me) {
    const now = Date.now(), e = E.live.get() || E.last.get(now - KEEP);
    if (!e) return { ev: null };
    const s = E.score.get(e.id, me.id), T = tiers();
    let mine = null;
    if (s) { const p = (E.power.get(me.id) || {}).power || 0;
      mine = { best: s.best, gain: e.status === 'running' ? Math.max(0, p - s.p0) : s.best, claimed: s.claimed, rank: e.status === 'ended' ? s.rank || null : (s.best > 0 ? E.above.get(e.id, TEST, s.best, s.best, me.id).n + 1 : null), rclaimed: !!s.rclaimed }; }
    return { ev: pub(e), tiers: T, me: mine, n: E.count.get(e.id, TEST).n,
      top: e.status === 'planned' ? [] : E.top.all(e.id, TEST, 50).map((r, i) => ({ r: i + 1, name: r.name, best: r.best, cos: r.cos ? JSON.parse(r.cos) : null, me: r.uid === me.id })), now };
  }
  // the player collects a tier, or his ranking reward
  function act(me, P) {
    const err = (code, error) => Object.assign(new Error(error), { code, error });
    const now = Date.now(), e = E.live.get() || E.last.get(now - KEEP);
    if (!e || e.status === 'planned') throw err(409, 'no_event');
    const s = E.score.get(e.id, me.id); if (!s) throw err(409, 'no_event');
    const u = Q.user.get(me.id), b = Q.base.get(me.id); if (!u || !b) throw err(404, 'unknown_player');
    if (P.op === 'claim') {
      const i = Math.floor(Number(P.tier)), T = tiers();
      if (!(i >= 0 && i < T.length)) throw err(400, 'bad_order');
      if (s.claimed & (1 << i)) throw err(409, 'already_claimed');
      if (s.best < T[i]) throw err(409, 'not_reached');
      E.setClaimed.run(s.claimed | (1 << i), e.id, me.id);   // marked first: a second click can never give it twice
      const r = runFor({ ...u, role: 'server' }, b, 'evGrant', [i], P.lang || 'fr', true);
      if (r.error) { E.setClaimed.run(s.claimed, e.id, me.id); throw err(409, r.error); }
      return { ok: true, state: r.state };
    }
    if (P.op === 'rank') {
      if (e.status !== 'ended' || !s.rank) throw err(409, 'not_ranked');
      if (s.rank > 50 && s.best < tiers()[0]) throw err(409, 'not_ranked');   // beyond the 50th: only the players who reached the first tier
      if (!E.setRclaimed.run(e.id, me.id).changes) throw err(409, 'already_claimed');
      const cr = JSON.parse(e.cr || '[]')[s.rank - 1] || 0;
      const r = runFor({ ...u, role: 'server' }, b, 'evRank', [s.rank, cr], P.lang || 'fr', true);
      if (r.error) { db.prepare('UPDATE event_scores SET rclaimed = 0 WHERE eid = ? AND uid = ?').run(e.id, me.id); throw err(409, r.error); }
      log('ÉVÉNEMENT', `${u.name} récupère sa récompense de classement (${s.rank === 1 ? '1er' : s.rank + 'e'}${cr ? ', ' + cr + ' Crédits' : ''})`);
      return { ok: true, state: r.state };
    }
    throw err(400, 'bad_order');
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
  return { onSave, view, act, admin };
};
