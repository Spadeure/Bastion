'use strict';
// Bastion · events, on the server side: the Power Tournament ('power') and the Alliance Challenge ('ally'). One event at a time.
// Alliance Challenge: each player's points go to his alliance (power gained / 100, map victories, help and reinforcements to allies);
// the alliance's total reaches common tiers (for every member with at least 1,000 points) and ranks the alliances.
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
  // Alliance Challenge: the player's alliance (fixed at his first points), action points, victory points, victory counters at the start
  for (const c of ['aid INTEGER', 'pts INTEGER NOT NULL DEFAULT 0', 'wp INTEGER NOT NULL DEFAULT 0', "w0 TEXT NOT NULL DEFAULT '{}'"]) { try { db.exec('ALTER TABLE event_scores ADD COLUMN ' + c); } catch (e) {} }
  const KEEP = 7 * 86400_000, TYPES = ['power', 'ally'], AL_MIN = 1000;   // AL_MIN: points a member needs for the rewards
  const PTS = { camp: 50, fort: 300, pvp: 500, help: 20, helpMax: 10, reinf: 100 };
  const NAMES = { power: 'Tournoi de puissance', ally: "Défi d'alliance" }, nm = e => NAMES[e.type] || 'Événement';
  const CONTRIB = '(s.best / 100 + s.pts + s.wp)';
  const E = {
    byId: db.prepare('SELECT * FROM events WHERE id = ?'),
    live: db.prepare("SELECT * FROM events WHERE status IN ('planned', 'running') ORDER BY start LIMIT 1"),
    last: db.prepare("SELECT * FROM events WHERE status = 'ended' AND end > ? ORDER BY end DESC LIMIT 1"),
    list: db.prepare('SELECT e.*, (SELECT COUNT(*) FROM event_scores s WHERE s.eid = e.id AND (s.best > 0 OR s.pts > 0 OR s.wp > 0)) AS n FROM events e ORDER BY e.start DESC LIMIT 20'),
    // Alliance Challenge
    allBasesA: db.prepare(`SELECT b.user_id, b.power, m.aid, COALESCE(json_extract(b.state, '$.stats.campWins'), 0) AS c, COALESCE(json_extract(b.state, '$.stats.fortWins'), 0) AS f,
      COALESCE(json_extract(b.state, '$.stats.pvpWins'), 0) AS p FROM bases b LEFT JOIN ally_members m ON m.user_id = b.user_id`),
    addScoreA: db.prepare('INSERT OR IGNORE INTO event_scores (eid, uid, p0, aid, w0) VALUES (?, ?, ?, ?, ?)'),
    joinA: db.prepare('UPDATE event_scores SET aid = ?, p0 = ?, w0 = ?, best = 0, wp = 0 WHERE eid = ? AND uid = ? AND aid IS NULL'),
    setWp: db.prepare('UPDATE event_scores SET wp = ? WHERE eid = ? AND uid = ?'),
    addPts: db.prepare('UPDATE event_scores SET pts = pts + ? WHERE eid = ? AND uid = ?'),
    aidOf: db.prepare('SELECT aid FROM ally_members WHERE user_id = ?'),
    allyTop: db.prepare(`SELECT s.aid, a.name, SUM(${'(s.best / 100 + s.pts + s.wp)'}) AS sc, COUNT(*) AS m FROM event_scores s JOIN users u ON u.id = s.uid JOIN alliances a ON a.id = s.aid
      WHERE s.eid = ? AND s.aid IS NOT NULL AND u.banned = 0 AND (? OR u.role != 'admin') GROUP BY s.aid HAVING sc > 0 ORDER BY sc DESC, s.aid LIMIT ?`),
    members: db.prepare(`SELECT s.uid, u.name, u.role, b.cos, ${'(s.best / 100 + s.pts + s.wp)'} AS c FROM event_scores s JOIN users u ON u.id = s.uid LEFT JOIN bases b ON b.user_id = s.uid
      WHERE s.eid = ? AND s.aid = ? AND u.banned = 0 ORDER BY c DESC, s.uid LIMIT 60`),
    toSendA: db.prepare(`SELECT s.*, u.banned, u.role, ${'(s.best / 100 + s.pts + s.wp)'} AS c FROM event_scores s JOIN users u ON u.id = s.uid WHERE s.eid = ? AND s.aid IS NOT NULL`),
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
  const tiers = (e) => e && e.type === 'ally' ? engine.shop().alTiers : engine.shop().evTiers;   // power (tournament) or alliance points needed for each tier (from the game rules)
  const pub = e => e && { id: e.id, type: e.type, start: e.start, end: e.end, status: e.status, cr: JSON.parse(e.cr || '[]') };
  const running = () => { const e = E.live.get(); return e && e.status === 'running' ? e : null; };

  // a game was saved: the player's best gain of the running event
  function onSave(uid, power, st) {
    const e = running(); if (!e) return;
    if (e.type === 'ally') return onSaveA(e, uid, power, st);
    E.addScore.run(e.id, uid, Math.max(0, Math.floor(power || 0)));   // a player seen for the first time during the event (new account): starts from now
    const s = E.score.get(e.id, uid), g = Math.floor(power || 0) - s.p0;
    if (g > s.best) E.setBest.run(g, e.id, uid, g);
  }
  // Alliance Challenge: power gained and map victories, counted for the alliance the player had at his first points
  const winsOf = st => { const ss = (st && st.stats) || {}; return { c: +ss.campWins || 0, f: +ss.fortWins || 0, p: +ss.pvpWins || 0 }; };
  function scoreA(e, uid, power, st) {   // the player's line, with his alliance (null: not taking part); false when frozen (changed alliance)
    const cur = (E.aidOf.get(uid) || {}).aid || null, w = JSON.stringify(winsOf(st)), p = Math.max(0, Math.floor(power || 0));
    E.addScoreA.run(e.id, uid, p, cur, w);
    let s = E.score.get(e.id, uid);
    if (!s.aid && cur) { E.joinA.run(cur, p, w, e.id, uid); s = E.score.get(e.id, uid); }   // joined an alliance during the challenge: starts from now
    if (!s.aid || !cur || s.aid !== cur) return null;
    return s;
  }
  function onSaveA(e, uid, power, st) {
    const s = scoreA(e, uid, power, st); if (!s) return;
    const g = Math.floor(power || 0) - s.p0; if (g > s.best) E.setBest.run(g, e.id, uid, g);
    let w0 = {}; try { w0 = JSON.parse(s.w0 || '{}'); } catch (x) {}
    const w = winsOf(st), wp = Math.max(0, (w.c - (w0.c || 0)) * PTS.camp + (w.f - (w0.f || 0)) * PTS.fort + (w.p - (w0.p || 0)) * PTS.pvp);
    if (wp > s.wp) E.setWp.run(wp, e.id, uid);
  }
  // help with an ally's construction (10 a day count), reinforcements sent (once per ally and per day)
  const actSeen = new Map();
  function onAct(uid, kind, other) {
    const e = running(); if (!e || e.type !== 'ally') return;
    const b = Q.base.get(uid); let st = {}; try { st = b && b.state ? JSON.parse(b.state) : {}; } catch (x) {}
    const s = scoreA(e, uid, b ? b.power : 0, st); if (!s) return;
    const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(Date.now());
    if (kind === 'help') { const k = `${e.id}:${uid}:${day}:h`, n = actSeen.get(k) || 0; if (n >= PTS.helpMax) return; actSeen.set(k, n + 1); E.addPts.run(PTS.help, e.id, uid); }
    if (kind === 'reinf') { const k = `${e.id}:${uid}:${other}:${day}:r`; if (actSeen.has(k)) return; actSeen.set(k, 1); E.addPts.run(PTS.reinf, e.id, uid); }
    if (actSeen.size > 50000) actSeen.clear();
  }
  // start and end of the events (checked every 20 seconds)
  function start(e) {
    E.status.run('running', e.end, e.id);
    db.exec('BEGIN'); try {
      if (e.type === 'ally') { for (const b of E.allBasesA.all()) E.addScoreA.run(e.id, b.user_id, Math.max(0, Math.floor(b.power || 0)), b.aid || null, JSON.stringify({ c: +b.c || 0, f: +b.f || 0, p: +b.p || 0 })); }
      else for (const b of E.allBases.all()) E.addScore.run(e.id, b.user_id, Math.max(0, Math.floor(b.power || 0)));
      db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `${nm(e)} n°${e.id} commencé · fin le ${new Date(e.end).toLocaleString('fr-FR')}`);
    broadcast('ev', {}); try { hooks.start && hooks.start(e); } catch (x) {}
  }
  function finish(e, now) {
    if (e.type === 'ally') return finishA(e, now);
    const list = E.top.all(e.id, TEST, 1e9);
    db.exec('BEGIN'); try { list.forEach((r, i) => E.setRank.run(i + 1, e.id, r.uid)); E.status.run('ended', Math.min(e.end, now), e.id); db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `Tournoi de puissance n°${e.id} terminé · ${list.length} participant(s)${list.length ? ' · 1er : ' + list[0].name + ' (+' + list[0].best.toLocaleString('fr-FR') + ')' : ''}`);
    send(E.byId.get(e.id));
  }
  // Alliance Challenge: the alliances are ranked; each player's rank is his alliance's
  function finishA(e, now) {
    const list = E.allyTop.all(e.id, TEST, 1e9), rk = new Map(list.map((a, i) => [a.aid, i + 1]));
    db.exec('BEGIN'); try { for (const s of E.toSendA.all(e.id)) E.setRank.run(rk.get(s.aid) || null, e.id, s.uid); E.status.run('ended', Math.min(e.end, now), e.id); db.exec('COMMIT'); } catch (x) { db.exec('ROLLBACK'); throw x; }
    log('ÉVÉNEMENT', `Défi d'alliance n°${e.id} terminé · ${list.length} alliance(s)${list.length ? ' · 1re : ' + list[0].name + ' (' + list[0].sc.toLocaleString('fr-FR') + ' points)' : ''}`);
    send(E.byId.get(e.id));
  }
  function sendA(e) {
    const T = tiers(e), sc = new Map(E.allyTop.all(e.id, TEST, 1e9).map(a => [a.aid, a.sc]));
    let n = 0, bad = 0;
    for (const s of E.toSendA.all(e.id)) {
      if (s.banned || s.c < AL_MIN || (!IS_TEST && s.role === 'admin')) continue;
      const tot = sc.get(s.aid) || 0;
      let mask = 0; T.forEach((p, i) => { if (tot >= p && !(s.claimed & (1 << i))) mask |= 1 << i; });
      const rank = s.rank && !s.rclaimed && (s.rank <= 10 || tot >= T[0]) ? s.rank : 0;
      if (!mask && !rank) continue;
      const u = Q.user.get(s.uid), b = Q.base.get(s.uid); if (!u || !b) continue;
      E.setClaimed.run(s.claimed | mask, e.id, s.uid); if (rank) E.setRclaimed.run(e.id, s.uid);
      try {
        const r = runFor({ ...u, role: 'server' }, b, 'alFinal', [mask, rank, e.id], 'fr', true);
        if (r.error) throw new Error(r.error);
        push(s.uid, 'sync', {}); n++;
      } catch (x) { bad++; E.setClaimed.run(s.claimed, e.id, s.uid); db.prepare('UPDATE event_scores SET rclaimed = ? WHERE eid = ? AND uid = ?').run(s.rclaimed, e.id, s.uid);
        log('ERREUR', `défi d'alliance n°${e.id} : récompenses de ${u.name} non envoyées (${x.message})`); }
    }
    if (!bad) E.setSent.run(e.id);
    log('ÉVÉNEMENT', `Défi d'alliance n°${e.id} : récompenses envoyées automatiquement à ${n} joueur(s)${bad ? ` · ${bad} échec(s), nouvel essai dans 20 secondes` : ''}`);
    broadcast('ev', {});
  }
  // the rewards of an ended event, sent to every inventory (each player only once: claimed and rclaimed are marked first)
  function send(e) {
    if (e.type === 'ally') return sendA(e);
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
    if (e.type === 'ally') return viewA(e, me, now);
    const s = E.score.get(e.id, me.id), T = tiers();
    let mine = null;
    const out = !IS_TEST && (me.isAdmin || me.role === 'admin');   // the administrator of the official server plays, but is never ranked
    if (s) { const p = (E.power.get(me.id) || {}).power || 0;
      mine = { best: s.best, gain: e.status === 'running' ? Math.max(0, p - s.p0) : s.best, claimed: s.claimed, rank: out ? null : e.status === 'ended' ? s.rank || null : (s.best > 0 ? E.above.get(e.id, TEST, s.best, s.best, me.id).n + 1 : null), out, rclaimed: !!s.rclaimed, sent: !!e.sent }; }
    return { ev: pub(e), tiers: T, me: mine, n: E.count.get(e.id, TEST).n,
      top: e.status === 'planned' ? [] : listTop(e.id, me), now };
  }
  function viewA(e, me, now) {
    const T = tiers(e), s = E.score.get(e.id, me.id), cur = (E.aidOf.get(me.id) || {}).aid || null;
    const all = e.status === 'planned' ? [] : E.allyTop.all(e.id, TEST, 1e9), aid = s && s.aid ? s.aid : cur;
    const ri = all.findIndex(a => a.aid === aid), mine = ri >= 0 ? all[ri] : null;
    const aname = aid ? (db.prepare('SELECT name FROM alliances WHERE id = ?').get(aid) || {}).name || '' : '';
    const c = s ? Math.floor(s.best / 100) + s.pts + s.wp : 0;
    const top = all.slice(0, 30).map((a, i) => ({ r: i + 1, name: a.name, sc: a.sc, me: a.aid === aid }));
    if (ri >= 30) top.push({ r: ri + 1, name: mine.name, sc: mine.sc, me: true });
    const members = aid && e.status !== 'planned' ? E.members.all(e.id, aid).map(m => ({ name: m.name, c: m.c, me: m.uid === me.id, cos: m.cos ? JSON.parse(m.cos) : null, out: !IS_TEST && m.role === 'admin' })) : [];
    return { ev: pub(e), tiers: T, min: AL_MIN, pts: PTS, now, n: all.length,
      me: { c, aid, ally: aname, frozen: !!(s && s.aid && cur !== s.aid), noAlly: !aid, score: mine ? mine.sc : 0, rank: mine ? ri + 1 : null, claimed: s ? s.claimed : 0, rclaimed: !!(s && s.rclaimed), sent: !!e.sent, out: !IS_TEST && (me.isAdmin || me.role === 'admin') },
      top, members };
  }
  // ---------- management panel ----------
  const admin = {
    list: () => ({ list: E.list.all().map(e => ({ ...pub(e), n: e.n, by: e.by })), live: pub(E.live.get()), now: Date.now() }),
    create(P, by) {
      if (E.live.get()) throw Object.assign(new Error('Un événement est déjà prévu ou en cours'), { code: 409 });
      const type = TYPES.includes(P.type) ? P.type : 'power', now = Date.now();
      const startAt = Math.max(now, Math.floor(Number(P.start) || now)), days = Math.max(1, Math.min(30, Math.floor(Number(P.days) || 7)));
      const cr = type === 'ally' ? [0, 0, 0] : [0, 1, 2].map(i => Math.max(0, Math.min(5000, Math.floor(Number((P.cr || [])[i]) || 0))));   // no Credits in the Alliance Challenge
      const id = Number(E.add.run(type, startAt, startAt + days * 86400_000, JSON.stringify(cr), 'planned', by, now).lastInsertRowid);
      log('ÉVÉNEMENT', `${by} prévoit le ${NAMES[type]} n°${id} · début ${new Date(startAt).toLocaleString('fr-FR')} · ${days} jour(s)${type === 'power' ? ' · Crédits top 3 : ' + cr.join(' / ') : ''}`);
      if (startAt <= now + 1000) start(E.byId.get(id)); else broadcast('ev', {});
      return { id };
    },
    stop(id, by) {
      const e = E.byId.get(Math.floor(Number(id)) || 0); if (!e) throw Object.assign(new Error('Événement inconnu'), { code: 404 });
      if (e.status === 'planned') { E.del.run(e.id); log('ÉVÉNEMENT', `${by} annule le ${nm(e)} n°${e.id} (pas encore commencé)`); broadcast('ev', {}); return { ok: true }; }
      if (e.status === 'running') { log('ÉVÉNEMENT', `${by} termine maintenant le ${nm(e)} n°${e.id}`); finish(e, Date.now()); return { ok: true }; }
      throw Object.assign(new Error('Cet événement est déjà terminé'), { code: 409 });
    } };
  return { onSave, onAct, view, admin, hooks };
};
