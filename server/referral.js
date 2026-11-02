'use strict';
// Mekanik War · referral: a player invites friends with his link (mekanikwar.com/r/<name>).
// The friend gets a welcome gift; when the friend's Command Center reaches level 5, then 10, both of them get a reward.
// 20 rewarded friends at most per player; an account created from the same connection as the referrer does not count.
// The rewards themselves are in the game rules (REF_TIERS in js/game.js), given by the server only (order 'refGrant').
module.exports = function makeReferral({ db, Q, log, clean, runFor, push, lastIp }) {
  db.exec(`CREATE TABLE IF NOT EXISTS referrals (uid INTEGER PRIMARY KEY, ref INTEGER NOT NULL, at INTEGER NOT NULL, ip TEXT,
    c0f INTEGER NOT NULL DEFAULT 0, c5r INTEGER NOT NULL DEFAULT 0, c5f INTEGER NOT NULL DEFAULT 0, c10r INTEGER NOT NULL DEFAULT 0, c10f INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS referrals_ref ON referrals (ref);`);
  const MAX = 20, TIERS = [0, 5, 10];
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const R = {
    of: db.prepare('SELECT * FROM referrals WHERE uid = ?'),
    friends: db.prepare('SELECT r.*, u.name, b.state FROM referrals r JOIN users u ON u.id = r.uid LEFT JOIN bases b ON b.user_id = r.uid WHERE r.ref = ? ORDER BY r.at'),
    count: db.prepare('SELECT COUNT(*) AS n FROM referrals WHERE ref = ?'),
    add: db.prepare('INSERT OR IGNORE INTO referrals (uid, ref, at, ip) VALUES (?, ?, ?, ?)'),
    regIp: db.prepare('SELECT ip FROM referrals WHERE uid = ?'),
  };
  // the level of the Command Center of the main base, read in the saved game (the main base's buildings are kept aside while an outpost is open)
  function ccOf(stateJson) {
    let st = {}; try { st = typeof stateJson === 'string' ? JSON.parse(stateJson) : (stateJson || {}); } catch (e) {}
    const sl = st._b && st._b !== 'main' ? (st[st._b] || {}).slots : st.slots;
    return (sl && sl.cc && +sl.cc.lvl) || 0;
  }
  // at registration: the name of the link, checked (exists, not the same connection, not full)
  function onRegister(uid, refName, ip) {
    const n = String(refName || '').trim().slice(0, 16); if (!n) return;
    const r = Q.userByName.get(n); if (!r || r.id === uid || r.banned) return;
    if (lastIp.get(r.id) && lastIp.get(r.id) === ip) { log('PARRAINAGE', `${n} → nouveau compte n°${uid} non compté : même connexion que le parrain (${ip})`); return; }
    if (R.count.get(r.id).n >= MAX) { log('PARRAINAGE', `${r.name} a déjà ${MAX} filleuls : nouveau compte n°${uid} non compté`); return; }
    R.add.run(uid, r.id, Date.now(), ip);
    log('PARRAINAGE', `${r.name} parraine un nouveau compte (n°${uid})`);
  }
  function view(me) {
    const mine = R.of.get(me.id), b = Q.base.get(me.id), myCc = ccOf(b && b.state);
    const ref = mine ? Q.user.get(mine.ref) : null;
    return { max: MAX, tiers: TIERS,
      me: mine && ref ? { by: ref.name, cc: myCc, c0f: !!mine.c0f, c5f: !!mine.c5f, c10f: !!mine.c10f } : null,
      friends: R.friends.all(me.id).map(f => ({ id: f.uid, name: f.name, cc: ccOf(f.state), c5r: !!f.c5r, c10r: !!f.c10r })) };
  }
  // claim a reward: side 'f' (I am the friend: tier 0, 5, 10) or 'r' (I am the referrer of friend <id>: tier 5, 10)
  function claim(me, P) {
    const t = +P.t; if (!TIERS.includes(t)) throw err(400, 'bad_order');
    let row, col;
    if (P.side === 'r') { row = R.of.get(+P.id); if (!row || row.ref !== me.id || t === 0) throw err(400, 'bad_order'); col = 'c' + t + 'r'; }
    else { row = R.of.get(me.id); if (!row) throw err(400, 'bad_order'); col = 'c' + t + 'f'; }
    if (row[col]) throw err(409, 'ref_claimed');
    const fb = Q.base.get(row.uid); if (t && ccOf(fb && fb.state) < t) throw err(409, 'ref_not_yet');
    const u = Q.user.get(me.id), b = Q.base.get(me.id); if (!b || !b.state) throw err(409, 'ref_not_yet');
    const r = runFor({ ...u, role: 'server' }, b, 'refGrant', [t, P.side === 'r' ? 'r' : 'f'], 'fr', true);
    if (r.error) throw err(409, r.error);
    if (!db.prepare(`UPDATE referrals SET ${col} = ? WHERE uid = ? AND ${col} = 0`).run(Date.now(), row.uid).changes) throw err(409, 'ref_claimed');
    log('PARRAINAGE', `${me.name} récupère la récompense ${t ? 'du niveau ' + t : 'de bienvenue'} (${P.side === 'r' ? 'parrain' : 'filleul'})`);
    push(me.id, 'sync', {}); return { ok: true };
  }
  return { onRegister, view, claim, ccOf };
};
