'use strict';
// Bastion · alliances on the server: create, join (open or on request), roles (leader, officers, members), 50 members,
// no attack between members, help with constructions, resources sent to an ally (daily limit), reinforcements
// that defend an ally's base (room given by his Rally Point), 24 h before joining another alliance after leaving,
// a leader away for 7 days is replaced. Everything is checked here: the browser only sends orders.
// The changes to the games go through the game engine (server-only orders, refused when a browser sends them).

module.exports = function makeAlliances(C) {
  const { db, Q, log, clean, push, runFor, DAY_FMT } = C;
  const MAX_MEMBERS = 50, LEAVE_WAIT = 24 * 3600_000, LEADER_AWAY = 7 * 86400_000;
  const SEND_DAY_MAX = 15_000_000_000;                     // resources a player can send to his allies per day (all together)
  const SEND_RES = ['metal', 'wood', 'stone', 'fuel', 'rations'];   // gold and Heavy Alloy stay personal
  const HELP_MAX = 10, HELP_SHARE = 0.02, HELP_MIN = 60_000;   // each help: 2 % of the construction time (1 minute at least), 10 helps max
  const RALLY_TROOPS = [0, 2000, 4000, 7000, 12000, 25000, 40000, 60000, 90000, 140000, 200000];   // room for reinforcements by Rally Point level (same as one march)
  const UNITS = new Set(['recruit', 'rifleman', 'sniper', 'assault', 'truck', 'drone', 'apc', 'tank', 'artillery', 'heli', 'gunship', 'mastodon']);
  const NAME_OK = /^[\p{L}\p{N}][\p{L}\p{N} '_.-]{1,22}[\p{L}\p{N}.]$/u;   // 3 to 24 characters

  db.exec(`CREATE TABLE IF NOT EXISTS alliances (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE COLLATE NOCASE, descr TEXT NOT NULL DEFAULT '', open INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS ally_members (user_id INTEGER PRIMARY KEY, aid INTEGER NOT NULL, role TEXT NOT NULL, joined INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS ally_members_aid ON ally_members (aid);
    CREATE TABLE IF NOT EXISTS ally_requests (user_id INTEGER NOT NULL, aid INTEGER NOT NULL, at INTEGER NOT NULL, PRIMARY KEY (user_id, aid));
    CREATE TABLE IF NOT EXISTS ally_log (id INTEGER PRIMARY KEY, aid INTEGER NOT NULL, at INTEGER NOT NULL, k TEXT NOT NULL, d TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS ally_log_aid ON ally_log (aid, id);
    CREATE TABLE IF NOT EXISTS ally_helps (target INTEGER NOT NULL, qkey TEXT NOT NULL, helper INTEGER NOT NULL, at INTEGER NOT NULL, PRIMARY KEY (target, qkey, helper));
    CREATE TABLE IF NOT EXISTS ally_sent (user_id INTEGER NOT NULL, day TEXT NOT NULL, amount INTEGER NOT NULL, PRIMARY KEY (user_id, day));
    CREATE TABLE IF NOT EXISTS reinforcements (id INTEGER PRIMARY KEY, owner INTEGER NOT NULL, host INTEGER NOT NULL, troops TEXT NOT NULL, status TEXT NOT NULL, arrive INTEGER NOT NULL, secs INTEGER NOT NULL, created INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS reinf_host ON reinforcements (host, status);
    CREATE INDEX IF NOT EXISTS reinf_owner ON reinforcements (owner);`);
  if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'aleft'").get()) db.exec('ALTER TABLE users ADD COLUMN aleft INTEGER NOT NULL DEFAULT 0');   // time the player left his alliance

  const A = {
    byId: db.prepare('SELECT * FROM alliances WHERE id = ?'),
    byName: db.prepare('SELECT * FROM alliances WHERE name = ?'),
    add: db.prepare('INSERT INTO alliances (name, descr, open, created) VALUES (?, ?, ?, ?)'),
    del: db.prepare('DELETE FROM alliances WHERE id = ?'),
    settings: db.prepare('UPDATE alliances SET descr = ?, open = ? WHERE id = ?'),
    member: db.prepare('SELECT * FROM ally_members WHERE user_id = ?'),
    members: db.prepare(`SELECT m.user_id AS id, m.role, m.joined, u.name, u.seen, u.created, b.power, b.updated FROM ally_members m JOIN users u ON u.id = m.user_id
      LEFT JOIN bases b ON b.user_id = m.user_id WHERE m.aid = ? ORDER BY CASE m.role WHEN 'leader' THEN 0 WHEN 'officer' THEN 1 ELSE 2 END, b.power DESC`),
    count: db.prepare('SELECT COUNT(*) AS n FROM ally_members WHERE aid = ?'),
    join: db.prepare('INSERT INTO ally_members (user_id, aid, role, joined) VALUES (?, ?, ?, ?)'),
    leave: db.prepare('DELETE FROM ally_members WHERE user_id = ?'),
    setRole: db.prepare('UPDATE ally_members SET role = ? WHERE user_id = ?'),
    reqAdd: db.prepare('INSERT OR IGNORE INTO ally_requests (user_id, aid, at) VALUES (?, ?, ?)'),
    reqDel: db.prepare('DELETE FROM ally_requests WHERE user_id = ? AND aid = ?'),
    reqDelUser: db.prepare('DELETE FROM ally_requests WHERE user_id = ?'),
    reqDelAlly: db.prepare('DELETE FROM ally_requests WHERE aid = ?'),
    reqOf: db.prepare('SELECT aid FROM ally_requests WHERE user_id = ?'),
    reqsOf: db.prepare('SELECT r.user_id AS id, r.at, u.name, b.power FROM ally_requests r JOIN users u ON u.id = r.user_id LEFT JOIN bases b ON b.user_id = r.user_id WHERE r.aid = ? ORDER BY r.at'),
    logAdd: db.prepare('INSERT INTO ally_log (aid, at, k, d) VALUES (?, ?, ?, ?)'),
    logOf: db.prepare('SELECT at, k, d FROM ally_log WHERE aid = ? ORDER BY id DESC LIMIT 60'),
    logDel: db.prepare('DELETE FROM ally_log WHERE aid = ?'),
    list: db.prepare(`SELECT a.id, a.name, a.open, a.descr, COUNT(m.user_id) AS n, COALESCE(SUM(b.power), 0) AS power FROM alliances a
      LEFT JOIN ally_members m ON m.aid = a.id LEFT JOIN bases b ON b.user_id = m.user_id GROUP BY a.id ORDER BY power DESC LIMIT 100`),
    helps: db.prepare('SELECT COUNT(*) AS n FROM ally_helps WHERE target = ? AND qkey = ?'),
    helped: db.prepare('SELECT 1 FROM ally_helps WHERE target = ? AND qkey = ? AND helper = ?'),
    helpAdd: db.prepare('INSERT INTO ally_helps (target, qkey, helper, at) VALUES (?, ?, ?, ?)'),
    sent: db.prepare('SELECT amount FROM ally_sent WHERE user_id = ? AND day = ?'),
    sentAdd: db.prepare('INSERT INTO ally_sent (user_id, day, amount) VALUES (?, ?, ?) ON CONFLICT(user_id, day) DO UPDATE SET amount = amount + excluded.amount'),
    rAdd: db.prepare('INSERT INTO reinforcements (owner, host, troops, status, arrive, secs, created) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    rById: db.prepare('SELECT * FROM reinforcements WHERE id = ?'),
    rStatus: db.prepare('UPDATE reinforcements SET status = ?, arrive = ? WHERE id = ?'),
    rTroops: db.prepare('UPDATE reinforcements SET troops = ? WHERE id = ?'),
    rDel: db.prepare('DELETE FROM reinforcements WHERE id = ?'),
    rIn: db.prepare("SELECT r.*, u.name FROM reinforcements r JOIN users u ON u.id = r.owner WHERE r.host = ? AND r.status != 'back' ORDER BY r.id"),
    rOut: db.prepare('SELECT r.*, u.name FROM reinforcements r JOIN users u ON u.id = r.host WHERE r.owner = ? ORDER BY r.id'),
    rHere: db.prepare("SELECT * FROM reinforcements WHERE host = ? AND status = 'here' ORDER BY id"),
    rDue: db.prepare("SELECT * FROM reinforcements WHERE status IN ('go', 'back') AND arrive <= ? ORDER BY arrive LIMIT 50"),
    rOf: db.prepare("SELECT * FROM reinforcements WHERE (owner = ? OR host = ?) AND status != 'back'"),
    attacksBetween: db.prepare("SELECT 1 FROM attacks WHERE status = 'out' AND ((att = ? AND def = ?) OR (att = ? AND def = ?)) LIMIT 1"),
    nameOf: db.prepare('SELECT a.name FROM ally_members m JOIN alliances a ON a.id = m.aid WHERE m.user_id = ?'),
  };
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const parse = s => { try { return JSON.parse(s) || {}; } catch (e) { return {}; } };
  const troopSum = t => Object.values(t || {}).reduce((s, v) => s + (+v || 0), 0);
  const cleanTroops = t => { const o = {}; if (t && typeof t === 'object' && !Array.isArray(t)) for (const u of Object.keys(t)) if (UNITS.has(u)) { const n = Math.floor(Number(t[u]) || 0); if (n > 0) o[u] = Math.min(n, 1e9); } return o; };
  const allyOf = uid => { const m = A.member.get(uid); return m ? { m, a: A.byId.get(m.aid) } : null; };
  const sameAlliance = (u1, u2) => { const a = A.member.get(u1), b = A.member.get(u2); return !!(a && b && a.aid === b.aid); };
  const allyName = uid => { const r = A.nameOf.get(uid); return r ? r.name : null; };
  const note = (aid, k, d) => A.logAdd.run(aid, Date.now(), k, JSON.stringify(d));
  const tellAlly = aid => { for (const m of A.members.all(aid)) push(m.id, 'ally', {}); };
  const userOf = id => Q.user.get(id);
  // a game changed by a server-only order (or read, without an order): the engine catches up the time first
  function game(uid, action, args) {
    const u = userOf(uid), b = Q.base.get(uid); if (!u || !b) throw err(404, 'unknown_player');
    return runFor({ id: u.id, name: u.name, created: u.created, role: 'player' }, b, action, args || [], 'en');
  }
  const rallyLvl = st => { let l = 0; for (const k in (st.slots || {})) if (st.slots[k].type === 'rally') l = Math.max(l, st.slots[k].lvl || 0); return l; };
  const reinfCap = st => RALLY_TROOPS[Math.max(0, Math.min(10, rallyLvl(st)))];
  const reinfUsed = uid => A.rIn.all(uid).reduce((s, r) => s + troopSum(parse(r.troops)), 0);

  // ---------- reinforcements going home (leaving the alliance, recalled, sent back) ----------
  function sendHome(r, now = Date.now()) { A.rStatus.run('back', now + r.secs * 1000, r.id); push(r.owner, 'ally', {}); push(r.host, 'ally', {}); }
  function allHome(uid) { for (const r of A.rOf.all(uid, uid)) sendHome(r); }
  // the reinforcements arrive, or come back home (their troops go back into the owner's army)
  setInterval(() => {
    const now = Date.now();
    for (const r of A.rDue.all(now)) {
      try {
        if (r.status === 'go') { A.rStatus.run('here', r.arrive, r.id); push(r.host, 'ally', {}); push(r.owner, 'ally', {}); continue; }
        const t = parse(r.troops); A.rDel.run(r.id);
        if (troopSum(t)) { game(r.owner, 'reinfBack', [t]); push(r.owner, 'sync', {}); }
        push(r.owner, 'ally', {});
      } catch (e) { log('ERREUR', `renforts ${r.id} : ${e.message}`); A.rDel.run(r.id); }
    }
  }, 1000).unref();

  // ---------- a leader away for 7 days: the strongest officer (or member) seen recently takes his place ----------
  function checkLeader(aid) {
    const ms = A.members.all(aid), lead = ms.find(m => m.role === 'leader'), now = Date.now(), seen = m => Math.max(m.seen || 0, m.updated || 0);
    if (lead && now - seen(lead) < LEADER_AWAY) return;
    const next = ms.filter(m => m.role !== 'leader' && now - seen(m) < LEADER_AWAY).sort((x, y) => (y.role === 'officer') - (x.role === 'officer') || (y.power || 0) - (x.power || 0))[0];
    if (!next) return;
    if (lead) A.setRole.run('officer', lead.id);
    A.setRole.run('leader', next.id); note(aid, 'newleader', { n: next.name, o: lead ? lead.name : '' });
    log('ALLIANCE', `${next.name} devient chef de l'alliance ${aid} (ancien chef absent depuis 7 jours)`); tellAlly(aid);
  }
  setInterval(() => { try { for (const a of db.prepare('SELECT id FROM alliances').all()) checkLeader(a.id); } catch (e) { log('ERREUR', 'chefs des alliances : ' + e.message); } }, 3600_000).unref();

  // ---------- what the player sees ----------
  function view(me) {
    const now = Date.now(), u = db.prepare('SELECT aleft FROM users WHERE id = ?').get(me.id) || {};
    const al = allyOf(me.id);
    const out = { now, max: MAX_MEMBERS, wait: Math.max(0, (u.aleft || 0) + LEAVE_WAIT - now), requests: A.reqOf.all(me.id).map(r => r.aid) };
    if (!al) { out.list = A.list.all().map(a => ({ id: a.id, name: a.name, open: !!a.open, n: a.n, power: a.power, descr: a.descr })); return out; }
    checkLeader(al.a.id);
    const role = A.member.get(me.id).role, ms = A.members.all(al.a.id), staff = role === 'leader' || role === 'officer';
    const helps = [];
    for (const m of ms) {
      if (m.id === me.id) continue;
      const b = Q.base.get(m.id); if (!b || !b.state) continue;
      const st = parse(b.state);
      for (const [bs, q] of [['main', st._b === 'op' ? (st.op || {}).queue : st.queue], ['op', st._b === 'op' ? st.queue : (st.op || {}).queue]]) {
        if (!q || !q.end || q.end <= now) continue;
        const key = `${bs}|${q.slot}|${q.type}|${q.lvl}|${q.start}`;
        helps.push({ name: m.name, base: bs, type: q.type, lvl: q.lvl, end: q.end, n: A.helps.get(m.id, key).n, max: HELP_MAX, done: !!A.helped.get(m.id, key, me.id), key });
      }
    }
    const myB = Q.base.get(me.id), myState = myB && myB.state ? parse(myB.state) : {};
    out.ally = { id: al.a.id, name: al.a.name, descr: al.a.descr, open: !!al.a.open, created: al.a.created, role,
      members: ms.map(m => ({ name: m.name, role: m.role, power: m.power || 0, seen: Math.max(m.seen || 0, m.updated || 0), joined: m.joined, me: m.id === me.id })),
      requests: staff ? A.reqsOf.all(al.a.id).map(r => ({ name: r.name, power: r.power || 0, at: r.at })) : [],
      helps, log: A.logOf.all(al.a.id).map(l => ({ at: l.at, k: l.k, d: parse(l.d) })),
      reinfIn: A.rIn.all(me.id).map(r => ({ id: r.id, name: r.name, troops: parse(r.troops), status: r.status, arrive: r.arrive })),
      reinfOut: A.rOut.all(me.id).map(r => ({ id: r.id, name: r.name, troops: parse(r.troops), status: r.status, arrive: r.arrive })),
      reinfCap: reinfCap(myState), reinfUsed: reinfUsed(me.id),
      sent: (A.sent.get(me.id, DAY_FMT.format(new Date(now))) || { amount: 0 }).amount, sendMax: SEND_DAY_MAX };
    return out;
  }

  // ---------- the orders ----------
  function joinNow(uid, a, by) {
    if (A.count.get(a.id).n >= MAX_MEMBERS) throw err(409, 'ally_full');
    for (const m of A.members.all(a.id)) if (A.attacksBetween.get(uid, m.id, m.id, uid)) throw err(409, 'ally_attack_running');
    A.join.run(uid, a.id, 'member', Date.now()); A.reqDelUser.run(uid);
    const u = userOf(uid); note(a.id, 'join', { n: u.name, by: by || '' }); log('ALLIANCE', `${u.name} rejoint l'alliance ${a.name}${by ? ' (accepté par ' + by + ')' : ''}`);
    tellAlly(a.id); push(uid, 'ally', {});
  }
  function leaveNow(uid, a, k, by) {
    const u = userOf(uid);
    allHome(uid);                                              // his reinforcements come home, the ones at his base too
    A.leave.run(uid);
    if (k === 'leave') db.prepare('UPDATE users SET aleft = ? WHERE id = ?').run(Date.now(), uid);
    note(a.id, k, { n: u.name, by: by || '' }); tellAlly(a.id); push(uid, 'ally', {});
  }
  function act(me, P) {
    const op = String(P.op || ''), now = Date.now(), al = allyOf(me.id), role = al ? al.m.role : null;
    const staff = role === 'leader' || role === 'officer';
    const target = () => { const u = Q.userByName.get(String(P.name || '').trim()); if (!u) throw err(404, 'unknown_player'); return u; };
    const mate = () => { const u = target(); if (!al || !sameAlliance(me.id, u.id)) throw err(409, 'not_in_your_alliance'); if (u.id === me.id) throw err(400, 'bad_order'); return u; };
    switch (op) {
      case 'create': {
        if (al) throw err(409, 'already_in_alliance');
        const w = (db.prepare('SELECT aleft FROM users WHERE id = ?').get(me.id).aleft || 0) + LEAVE_WAIT - now; if (w > 0) throw err(409, 'ally_wait');
        const name = String(P.name || '').replace(/\s+/g, ' ').trim();
        if (!NAME_OK.test(name)) throw err(400, 'ally_bad_name');
        if (A.byName.get(name)) throw err(409, 'ally_name_taken');
        const id = Number(A.add.run(name, '', P.open ? 1 : 0, now).lastInsertRowid);
        A.join.run(me.id, id, 'leader', now); A.reqDelUser.run(me.id);
        note(id, 'create', { n: me.name }); log('ALLIANCE', `${me.name} crée l'alliance ${name}`);
        return { ok: true };
      }
      case 'join': {
        if (al) throw err(409, 'already_in_alliance');
        const w = (db.prepare('SELECT aleft FROM users WHERE id = ?').get(me.id).aleft || 0) + LEAVE_WAIT - now; if (w > 0) throw err(409, 'ally_wait');
        const a = A.byId.get(Math.floor(Number(P.id) || 0)); if (!a) throw err(404, 'ally_unknown');
        if (a.open) { joinNow(me.id, a); return { ok: true, joined: true }; }
        if (A.count.get(a.id).n >= MAX_MEMBERS) throw err(409, 'ally_full');
        if (A.reqOf.all(me.id).length >= 5 && !A.reqOf.all(me.id).some(r => r.aid === a.id)) throw err(409, 'ally_too_many_requests');
        A.reqAdd.run(me.id, a.id, now); note(a.id, 'request', { n: me.name }); tellAlly(a.id);
        return { ok: true, requested: true };
      }
      case 'cancel': { A.reqDel.run(me.id, Math.floor(Number(P.id) || 0)); return { ok: true }; }
      case 'accept': case 'refuse': {
        if (!staff) throw err(403, 'ally_not_allowed');
        const u = target(); if (!db.prepare('SELECT 1 FROM ally_requests WHERE user_id = ? AND aid = ?').get(u.id, al.a.id)) throw err(404, 'ally_no_request');
        A.reqDel.run(u.id, al.a.id);
        if (op === 'refuse') { note(al.a.id, 'refused', { n: u.name, by: me.name }); tellAlly(al.a.id); push(u.id, 'ally', {}); return { ok: true }; }
        if (A.member.get(u.id)) throw err(409, 'already_in_alliance');
        joinNow(u.id, al.a, me.name); return { ok: true };
      }
      case 'leave': {
        if (!al) throw err(409, 'no_alliance');
        if (role === 'leader') {
          if (A.count.get(al.a.id).n > 1) throw err(409, 'ally_leader_leave');   // give the lead to someone first, or disband
          return disband(me, al);
        }
        leaveNow(me.id, al.a, 'leave'); log('ALLIANCE', `${me.name} quitte l'alliance ${al.a.name}`); return { ok: true };
      }
      case 'kick': {
        const u = mate(), r = A.member.get(u.id).role;
        if (!staff || r === 'leader' || (role === 'officer' && r !== 'member')) throw err(403, 'ally_not_allowed');
        leaveNow(u.id, al.a, 'kick', me.name); log('ALLIANCE', `${u.name} exclu de l'alliance ${al.a.name} par ${me.name}`); return { ok: true };
      }
      case 'promote': case 'demote': {
        if (role !== 'leader') throw err(403, 'ally_not_allowed');
        const u = mate(), r = A.member.get(u.id).role;
        if (op === 'promote' && r !== 'member') throw err(409, 'bad_order');
        if (op === 'demote' && r !== 'officer') throw err(409, 'bad_order');
        A.setRole.run(op === 'promote' ? 'officer' : 'member', u.id); note(al.a.id, op, { n: u.name, by: me.name }); tellAlly(al.a.id); return { ok: true };
      }
      case 'transfer': {
        if (role !== 'leader') throw err(403, 'ally_not_allowed');
        const u = mate(); A.setRole.run('leader', u.id); A.setRole.run('officer', me.id);
        note(al.a.id, 'newleader', { n: u.name, o: me.name }); log('ALLIANCE', `${me.name} donne la tête de l'alliance ${al.a.name} à ${u.name}`); tellAlly(al.a.id); return { ok: true };
      }
      case 'settings': {
        if (role !== 'leader') throw err(403, 'ally_not_allowed');
        const d = String(P.descr || '').replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ' ').slice(0, 500);
        A.settings.run(d, P.open ? 1 : 0, al.a.id); tellAlly(al.a.id); return { ok: true };
      }
      case 'disband': { if (role !== 'leader') throw err(403, 'ally_not_allowed'); return disband(me, al); }
      // ----- send resources to an ally (5 basic resources, daily limit) -----
      case 'give': {
        const u = mate(), res = {}; let tot = 0;
        for (const r of SEND_RES) { const n = Math.floor(Number((P.res || {})[r]) || 0); if (n > 0) { res[r] = Math.min(n, 1e12); tot += res[r]; } }
        if (!tot) throw err(400, 'ally_nothing');
        const day = DAY_FMT.format(new Date(now)), sent = (A.sent.get(me.id, day) || { amount: 0 }).amount;
        if (sent + tot > SEND_DAY_MAX) throw err(409, 'ally_send_limit');
        const r1 = game(me.id, 'allyGive', [res]); if (r1.error) throw err(409, r1.error);
        game(u.id, 'allyGet', [res]); A.sentAdd.run(me.id, day, tot);
        note(al.a.id, 'give', { n: me.name, t: u.name, res }); log('ALLIANCE', `${me.name} envoie ${Object.entries(res).map(([k, v]) => k + ' ' + v).join(', ')} à ${u.name}`);
        push(u.id, 'sync', {}); tellAlly(al.a.id);
        return { ok: true, state: r1.state };
      }
      // ----- help an ally's construction -----
      case 'help': {
        const u = mate(), key = String(P.key || '').slice(0, 120), bs = key.split('|')[0];
        if (bs !== 'main' && bs !== 'op') throw err(400, 'bad_order');
        if (A.helped.get(u.id, key, me.id)) throw err(409, 'ally_helped');
        if (A.helps.get(u.id, key).n >= HELP_MAX) throw err(409, 'ally_help_max');
        const r = game(u.id, 'allyHelp', [bs, key, HELP_SHARE, HELP_MIN]); if (r.error) throw err(409, r.error === 'bad_order' ? 'ally_help_over' : r.error);
        A.helpAdd.run(u.id, key, me.id, now); push(u.id, 'sync', {}); tellAlly(al.a.id);
        return { ok: true };
      }
      // ----- reinforcements -----
      case 'reinforce': {
        const u = mate(), q = cleanTroops(P.q), n = troopSum(q); if (!n) throw err(400, 'ally_nothing');
        const hb = Q.base.get(u.id), hs = hb && hb.state ? parse(hb.state) : {};
        if (reinfUsed(u.id) + n > reinfCap(hs)) throw err(409, 'ally_reinf_full');
        const r = game(me.id, 'reinforce', [hb.x, hb.y, q]); if (r.error) throw err(409, r.error);
        const ev = r.events.find(e => e.t === 'reinf'); if (!ev) throw err(409, 'bad_order');
        A.rAdd.run(me.id, u.id, JSON.stringify(q), 'go', now + ev.secs * 1000, ev.secs, now);
        note(al.a.id, 'reinf', { n: me.name, t: u.name, c: n }); push(u.id, 'ally', {}); tellAlly(al.a.id);
        return { ok: true, state: r.state };
      }
      case 'recall': case 'sendback': {
        const r = A.rById.get(Math.floor(Number(P.id) || 0));
        if (!r || r.status === 'back' || (op === 'recall' ? r.owner : r.host) !== me.id) throw err(404, 'bad_order');
        sendHome(r, now); return { ok: true };
      }
    }
    throw err(400, 'bad_order');
  }
  function disband(me, al) {
    for (const m of A.members.all(al.a.id)) { allHome(m.id); A.leave.run(m.id); push(m.id, 'ally', {}); }
    A.reqDelAlly.run(al.a.id); A.logDel.run(al.a.id); A.del.run(al.a.id);
    log('ALLIANCE', `${me.name} dissout l'alliance ${al.a.name}`); return { ok: true };
  }

  // ---------- fights: the reinforcements at a base defend it with its own troops ----------
  function reinfAt(uid) { const t = {}; for (const r of A.rHere.all(uid)) for (const [u, n] of Object.entries(cleanTroops(parse(r.troops)))) t[u] = (t[u] || 0) + n; return t; }
  // after the fight: each reinforcement keeps its share of the survivors of its kind of troop
  function afterFight(uid, left, attName) {
    const rows = A.rHere.all(uid); if (!rows.length) return;
    const tot = reinfAt(uid); const lost = {};
    for (const r of rows) {
      const t = cleanTroops(parse(r.troops)), k = {}; let was = 0, now = 0;
      for (const u in t) { const keep = tot[u] ? Math.floor(t[u] * Math.min(1, (left[u] || 0) / tot[u])) : 0; was += t[u]; now += keep; if (keep) k[u] = keep; }
      if (now < was) { lost[r.owner] = (lost[r.owner] || 0) + (was - now); push(r.owner, 'ally', {}); }
      if (now) A.rTroops.run(JSON.stringify(k), r.id); else A.rDel.run(r.id);
    }
    const al = A.member.get(uid), host = userOf(uid);
    if (al) for (const [o, n] of Object.entries(lost)) { const ou = userOf(+o); note(al.aid, 'reinfLost', { n: ou ? ou.name : '?', t: host ? host.name : '?', a: attName, c: n }); }
  }

  // every player's alliance name (map and ranking)
  const namesQ = db.prepare('SELECT m.user_id AS id, a.name FROM ally_members m JOIN alliances a ON a.id = m.aid');
  const names = () => new Map(namesQ.all().map(r => [r.id, r.name]));
  return { view, act, sameAlliance, allyName, names, reinfAt, afterFight, allHome, SERVER_ACTS: new Set(['reinforce', 'reinfBack', 'allyGive', 'allyGet', 'allyHelp']) };
};
