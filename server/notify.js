'use strict';
// Bastion · push notifications (Web Push: Android, PC, iPhone when the game is on the home screen).
// No paid service: the browser gives an address (endpoint) at its own push service (Google, Mozilla, Apple);
// the server sends there a message encrypted for that browser only (RFC 8291), signed with the game's own keys (VAPID, RFC 8292).
// The keys are made once by the server and kept in the database: nothing to configure.
// Nothing is sent while the player has the game open (he sees everything in the game), and nothing at night (23 h - 8 h, Paris)
// if he kept the night mode, except the attacks.
const crypto = require('crypto');

module.exports = function makeNotify({ db, log, engine, online, Q }) {
  db.exec(`CREATE TABLE IF NOT EXISTS kv (k TEXT PRIMARY KEY, v TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS push_subs (endpoint TEXT PRIMARY KEY, uid INTEGER NOT NULL, p256dh TEXT NOT NULL, auth TEXT NOT NULL, lang TEXT NOT NULL, created INTEGER NOT NULL, fails INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS push_subs_uid ON push_subs (uid);
    CREATE TABLE IF NOT EXISTS push_prefs (uid INTEGER PRIMARY KEY, prefs TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS push_jobs (uid INTEGER NOT NULL, kind TEXT NOT NULL, at INTEGER NOT NULL, data TEXT NOT NULL, PRIMARY KEY (uid, kind));
    CREATE INDEX IF NOT EXISTS push_jobs_at ON push_jobs (at);`);
  const N = {
    kvGet: db.prepare('SELECT v FROM kv WHERE k = ?'), kvSet: db.prepare('INSERT OR REPLACE INTO kv (k, v) VALUES (?, ?)'),
    subAdd: db.prepare('INSERT OR REPLACE INTO push_subs (endpoint, uid, p256dh, auth, lang, created, fails) VALUES (?, ?, ?, ?, ?, ?, 0)'),
    subDel: db.prepare('DELETE FROM push_subs WHERE endpoint = ?'), subDelUid: db.prepare('DELETE FROM push_subs WHERE endpoint = ? AND uid = ?'),
    subsOf: db.prepare('SELECT * FROM push_subs WHERE uid = ?'), subFail: db.prepare('UPDATE push_subs SET fails = fails + 1 WHERE endpoint = ?'),
    subOk: db.prepare('UPDATE push_subs SET fails = 0 WHERE endpoint = ?'),
    uids: db.prepare('SELECT DISTINCT s.uid FROM push_subs s JOIN users u ON u.id = s.uid WHERE u.banned = 0'),
    prefGet: db.prepare('SELECT prefs FROM push_prefs WHERE uid = ?'), prefSet: db.prepare('INSERT OR REPLACE INTO push_prefs (uid, prefs) VALUES (?, ?)'),
    jobSet: db.prepare('INSERT OR REPLACE INTO push_jobs (uid, kind, at, data) VALUES (?, ?, ?, ?)'), jobDel: db.prepare('DELETE FROM push_jobs WHERE uid = ? AND kind = ?'),
    jobsOf: db.prepare('SELECT kind, at FROM push_jobs WHERE uid = ?'), due: db.prepare('SELECT * FROM push_jobs WHERE at <= ? ORDER BY at LIMIT 200'),
    jobMove: db.prepare('UPDATE push_jobs SET at = ? WHERE uid = ? AND kind = ?'),
    allyOf: db.prepare('SELECT m2.user_id AS uid FROM ally_members m1 JOIN ally_members m2 ON m2.aid = m1.aid WHERE m1.user_id = ? AND m2.user_id != ?'),
  };
  const b64u = b => Buffer.from(b).toString('base64url'), unb64u = s => Buffer.from(String(s), 'base64url');

  // ----- the game's keys (made once) -----
  let V = null;
  try { V = JSON.parse((N.kvGet.get('vapid') || {}).v || 'null'); } catch (e) {}
  if (!V || !V.pub || !V.d) {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });
    const jp = publicKey.export({ format: 'jwk' }), jd = privateKey.export({ format: 'jwk' });
    V = { pub: b64u(Buffer.concat([Buffer.from([4]), unb64u(jp.x), unb64u(jp.y)])), x: jp.x, y: jp.y, d: jd.d };
    N.kvSet.run('vapid', JSON.stringify(V)); log('NOTIFICATIONS', 'clés de notification créées');
  }
  const vapidKey = crypto.createPrivateKey({ key: { kty: 'EC', crv: 'P-256', x: V.x, y: V.y, d: V.d }, format: 'jwk' });
  const SUBJECT = process.env.PUBLIC_URL ? process.env.PUBLIC_URL.replace(/\/$/, '') : 'https://bastion.stryxhost.fr';
  const jwtCache = new Map();
  function vapidAuth(endpoint) {
    const aud = new URL(endpoint).origin, now = Math.floor(Date.now() / 1000), c = jwtCache.get(aud);
    if (c && c.exp - now > 3600) return c.h;
    const exp = now + 12 * 3600, head = b64u(JSON.stringify({ typ: 'JWT', alg: 'ES256' })), body = b64u(JSON.stringify({ aud, exp, sub: SUBJECT }));
    const sig = crypto.sign('sha256', Buffer.from(head + '.' + body), { key: vapidKey, dsaEncoding: 'ieee-p1363' });
    const h = `vapid t=${head}.${body}.${b64u(sig)}, k=${V.pub}`; jwtCache.set(aud, { h, exp }); return h;
  }
  // ----- encryption for one browser (RFC 8291, aes128gcm) -----
  function encrypt(p256dh, authSecret, plain, salt, asKeys) {
    const uaPub = unb64u(p256dh), auth = unb64u(authSecret);
    const ecdh = asKeys || crypto.createECDH('prime256v1'); if (!asKeys) ecdh.generateKeys();
    const asPub = ecdh.getPublicKey(), shared = ecdh.computeSecret(uaPub);
    salt = salt || crypto.randomBytes(16);
    const ikm = Buffer.from(crypto.hkdfSync('sha256', shared, auth, Buffer.concat([Buffer.from('WebPush: info\0'), uaPub, asPub]), 32));
    const cek = Buffer.from(crypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: aes128gcm\0'), 16));
    const nonce = Buffer.from(crypto.hkdfSync('sha256', ikm, salt, Buffer.from('Content-Encoding: nonce\0'), 12));
    const ci = crypto.createCipheriv('aes-128-gcm', cek, nonce);
    const body = Buffer.concat([ci.update(Buffer.concat([Buffer.from(plain), Buffer.from([2])])), ci.final(), ci.getAuthTag()]);
    const head = Buffer.alloc(21); salt.copy(head, 0); head.writeUInt32BE(4096, 16); head[20] = asPub.length;
    return Buffer.concat([head, asPub, body]);
  }

  // ----- settings of a player -----
  const DEF = { build: 1, research: 1, train: 1, march: 0, attack: 1, shield: 1, cal: 1, ev: 1, pm: 1, ally: 0, night: 1 };
  const PREF_OF = { build: 'build', research: 'research', train: 'train', march: 'march', attack: 'attack', spy: 'attack', shield: 'shield', cal: 'cal', evstart: 'ev', evlast: 'ev', pm: 'pm', ally: 'ally' };
  function prefs(uid) { let p = {}; try { p = JSON.parse((N.prefGet.get(uid) || {}).prefs || '{}'); } catch (e) {} const o = {}; for (const k in DEF) o[k] = k in p ? (p[k] ? 1 : 0) : DEF[k]; return o; }
  // Paris hour and minute, and the night (23 h - 8 h)
  const parisHM = t => { const p = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(t);
    return [+p.find(x => x.type === 'hour').value, +p.find(x => x.type === 'minute').value]; };
  const isNight = t => { const [h] = parisHM(t); return h >= 23 || h < 8; };
  const morning = t => { const [h, m] = parisHM(t); return t + (((8 * 60 - (h * 60 + m)) + 1440) % 1440) * 60000; };
  const parisDay = t => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(t);

  // ----- sending -----
  const STATS = { sent: 0, failed: 0, gone: 0 };
  async function deliver(sub, msg, ttl, urgent) {
    try {
      const body = encrypt(sub.p256dh, sub.auth, JSON.stringify(msg));
      const r = await fetch(sub.endpoint, { method: 'POST', body, signal: AbortSignal.timeout(10000),
        headers: { 'Content-Type': 'application/octet-stream', 'Content-Encoding': 'aes128gcm', TTL: String(ttl), Urgency: urgent ? 'high' : 'normal', Authorization: vapidAuth(sub.endpoint) } });
      if (r.status === 404 || r.status === 410) { N.subDel.run(sub.endpoint); STATS.gone++; return; }   // this browser said no or was reset
      if (r.status >= 400) { STATS.failed++; N.subFail.run(sub.endpoint); if (sub.fails >= 20) N.subDel.run(sub.endpoint); log('NOTIFICATIONS', `refus du service de notification (${r.status}) pour un abonnement`); return; }
      STATS.sent++; if (sub.fails) N.subOk.run(sub.endpoint);
    } catch (e) { STATS.failed++; N.subFail.run(sub.endpoint); }
  }
  // kind: build, research, train, march, attack, spy, shield, cal, evstart, evlast, pm, ally. Returns false when held back.
  function send(uid, kind, data, opt = {}) {
    const P = prefs(uid), pk = PREF_OF[kind]; if (pk && !P[pk]) return true;
    if (!opt.always && online(uid)) return true;                       // the game is open: he sees it there
    const urgent = kind === 'attack' || kind === 'spy';
    if (!urgent && !opt.always && P.night && isNight(Date.now())) return false;       // night: later (timers) or never (the others)
    const subs = N.subsOf.all(uid); if (!subs.length) return true;
    for (const s of subs) {
      let t; try { t = engine.pushText(s.lang, kind, data || {}); } catch (e) { log('ERREUR', 'texte de notification : ' + e.message); return true; }
      deliver(s, { title: t.title, body: t.body, tag: opt.tag || kind, url: './?app=1', ts: Date.now() }, opt.ttl || (urgent ? 900 : 6 * 3600), urgent);
    }
    return true;
  }
  const sendAll = (kind, data) => { for (const { uid } of N.uids.all()) send(uid, kind, data); };

  // ----- the timers of a game, noted at each save -----
  const TIMED = ['build', 'research', 'train', 'march', 'shield'];
  function onSave(uid, st, shieldEnd) {
    const now = Date.now(), want = {};
    const q = [st.queue, st.queue2, ...['op', 'br'].flatMap(k => st[k] && typeof st[k] === 'object' ? [st[k].queue, st[k].queue2] : [])].filter(x => x && x.end > now);
    if (q.length) { const f = q.reduce((a, b) => a.end <= b.end ? a : b); want.build = [f.end, { t: f.type, l: f.lvl }]; }
    const rc = st.research && st.research.cur; if (rc && rc.e > now) want.research = [rc.e, { t: rc.t, l: rc.l }];
    const tr = [st.training, ...['op', 'br'].map(k => st[k] && st[k].training)].filter(Boolean).flatMap(T => Object.values(T || {}).flat()).filter(j => j && j.e > now);
    if (tr.length) want.train = [Math.max(...tr.map(j => j.e)), {}];
    const mr = (st.marches || []).filter(m => !m.auto && m.b > now && (m.st === 'out' || m.st === 'back'));
    if (mr.length) want.march = [Math.max(...mr.map(m => m.b)), {}];
    if (shieldEnd > now + 3600_000 + 60_000) want.shield = [shieldEnd - 3600_000, {}];
    const have = new Map(N.jobsOf.all(uid).map(j => [j.kind, j.at]));
    for (const k of TIMED) {
      if (want[k]) { if (have.get(k) !== want[k][0]) N.jobSet.run(uid, k, want[k][0], JSON.stringify(want[k][1])); }
      else if (have.has(k)) N.jobDel.run(uid, k);
    }
  }
  // the tick: timers due, the calendar reminder at 19 h (Paris), once a day
  function tick() {
    const now = Date.now();
    for (const j of N.due.all(now)) {
      let d = {}; try { d = JSON.parse(j.data); } catch (e) {}
      if (now - j.at > 6 * 3600_000) { N.jobDel.run(j.uid, j.kind); continue; }   // far too late (server stopped): forget it
      if (send(j.uid, j.kind, d) === false) N.jobMove.run(morning(now), j.uid, j.kind); else N.jobDel.run(j.uid, j.kind);
    }
    const [h] = parisHM(now), day = parisDay(now);
    if (h === 19 && (N.kvGet.get('cal_day') || {}).v !== day) {
      N.kvSet.run('cal_day', day); let n = 0;
      for (const { uid } of N.uids.all()) {
        const b = Q.base.get(uid); if (!b || !b.state) continue;
        try { const c = engine.calInfo(JSON.parse(b.state)); if (c.ready) { send(uid, 'cal', { n: c.n }); n++; } } catch (e) {}
      }
      if (n) log('NOTIFICATIONS', `rappel du cadeau du calendrier envoyé à ${n} joueur(s)`);
    }
  }
  setInterval(() => { try { tick(); } catch (e) { log('ERREUR', 'notifications : ' + e.message); } }, 30_000).unref();

  // ----- moments of the game -----
  function onAttack(defUid, attName, kind, arrive) {
    const t = Math.max(0, Math.round((arrive - Date.now()) / 1000));
    send(defUid, kind === 'spy' ? 'spy' : 'attack', { p: attName, t }, { tag: 'attack' });
    if (kind !== 'spy') { const du = Q.user.get(defUid); for (const { uid } of N.allyOf.all(defUid, defUid)) send(uid, 'ally', { p: du ? du.name : '', a: attName, t }); }
  }
  const onPm = (toUid, fromName, text) => send(toUid, 'pm', { p: fromName, x: String(text || '').slice(0, 120) }, { tag: 'pm-' + fromName });

  // ----- the browser side: /api/push -----
  function view(me) { return { key: V.pub, prefs: prefs(me.id), n: N.subsOf.all(me.id).length }; }
  function act(me, P) {
    const err = (code, error) => Object.assign(new Error(error), { code, error });
    const op = String(P.op || '');
    if (op === 'sub') {
      const s = P.sub || {}, ep = String(s.endpoint || ''), k = s.keys || {};
      let u; try { u = new URL(ep); } catch (e) { throw err(400, 'bad_order'); }
      if (u.protocol !== 'https:' || ep.length > 1000 || !/^[\w-]{80,100}$/.test(String(k.p256dh || '')) || !/^[\w-]{16,30}$/.test(String(k.auth || ''))) throw err(400, 'bad_order');
      if (N.subsOf.all(me.id).length >= 10 && !N.subsOf.all(me.id).some(x => x.endpoint === ep)) throw err(409, 'too_many');
      N.subAdd.run(ep, me.id, k.p256dh, k.auth, String(P.lang || 'fr').slice(0, 5), Date.now());
      return { ok: true };
    }
    if (op === 'unsub') { N.subDelUid.run(String(P.endpoint || ''), me.id); return { ok: true }; }
    if (op === 'prefs') { const p = prefs(me.id), q = P.prefs || {}; for (const k in DEF) if (k in q) p[k] = q[k] ? 1 : 0; N.prefSet.run(me.id, JSON.stringify(p)); return { ok: true }; }
    if (op === 'test') { if (!N.subsOf.all(me.id).length) throw err(409, 'no_sub'); send(me.id, 'test', {}, { always: true }); return { ok: true }; }
    throw err(400, 'bad_order');
  }
  return { send, sendAll, onSave, onAttack, onPm, view, act, tick, encrypt, stats: () => ({ ...STATS, subs: db.prepare('SELECT COUNT(*) AS n FROM push_subs').get().n }) };
};
