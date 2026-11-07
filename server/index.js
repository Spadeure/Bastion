// Bastion game server
// Player accounts, SQLite database, saved games, other players on the world map.
// Every order from a player is checked and run by the server (game engine), the browser only displays.
// Security log in the console (Pelican): logins, blocked addresses, refused orders, hourly summary.
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto'), zlib = require('zlib');
// Node prints a warning because its SQLite module is new: hide only that one, keep every other warning
process.removeAllListeners('warning');
process.on('warning', w => { if (!/SQLite/.test(w.message)) console.warn(`${w.name}: ${w.message}`); });
const { DatabaseSync } = require('node:sqlite');
const { LOOT } = require('../js/loot.js');   // the same tables as the game shows
const engine = require('./engine.js');      // the game rules, run by the server
const SERVER_TZ = process.env.SERVER_TZ || 'Europe/Paris';   // time zone of the server clock shown in the game and of the log

const ROOT = path.join(__dirname, '..');
// Version of the game files: a fingerprint of the page, scripts and styles. Each update (git pull + restart) gives a new one.
// The page loads its files with ?v=<version>, so no phone, browser or Cloudflare cache can keep an old copy,
// and open games compare it every few seconds: a new version means "update installed, reload".
function gameVersion() {
  const h = crypto.createHash('sha1');
  for (const d of ['', 'js', 'css']) for (const f of fs.readdirSync(path.join(ROOT, d)).sort()) if (/\.(html|js|css)$/.test(f)) h.update(f).update(fs.readFileSync(path.join(ROOT, d, f)));
  return h.digest('base64url').slice(0, 10);
}
const VERSION = gameVersion();
let indexPage = null, adminPage = null;   // index.html (and admin.html, the management panel) with the version stamped in, built once
function buildIndex(file = 'index.html') {
  const html = fs.readFileSync(path.join(ROOT, file), 'utf8')
    .replace(/(href|src)="((?:css|js)\/[^"?]+\.(?:css|js))"/g, `$1="$2?v=${VERSION}"`)
    .replace('</head>', `<meta name="bastion-ver" content="${VERSION}">\n</head>`);   // no inline script: the pages only run the game's own files (CSP)
  // the test server installs as its own app « Bastion Test » (name and icons marked TEST), next to the official game
  const html2 = file === 'index.html' && IS_TEST ? html.replace('<title>Mekanik War: Titans</title>', '<title>Mekanik War Test</title>')
    .replace('content="Mekanik War">', 'content="MW Test">').replace(/assets\/app\/(apple-touch-icon|favicon)\.png/g, 'assets/app/test-$1.png') : html;
  const data = Buffer.from(html2);
  return { data, br: zlib.brotliCompressSync(data), gz: zlib.gzipSync(data) };
}
const DATA = path.join(ROOT, 'data');                       // never in git: holds the database
const PORT = +process.env.SERVER_PORT || +process.env.PORT || 8080;   // Pelican gives the port in SERVER_PORT
const MAPN = 750;
fs.mkdirSync(DATA, { recursive: true });
// Installed version: git commit and branch (read at start), and the id of the latest "What's new" notes.
// The branch tells the server what it is: "test" = the test server (orange banner, registrations closed).
function gitInfo() {
  const out = { commit: '', branch: '', subject: '' };
  const git = (...a) => require('child_process').execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], timeout: 5000 }).trim();
  try { out.commit = git('rev-parse', 'HEAD'); out.branch = git('rev-parse', '--abbrev-ref', 'HEAD'); out.subject = git('log', '-1', '--format=%s').slice(0, 200); }
  catch (e) {   // no git program: read the .git folder directly
    try { const head = fs.readFileSync(path.join(ROOT, '.git', 'HEAD'), 'utf8').trim(), m = /^ref: refs\/heads\/(.+)$/.exec(head);
      if (!m) out.commit = head; else { out.branch = m[1];
        const f = path.join(ROOT, '.git', 'refs', 'heads', m[1]);
        if (fs.existsSync(f)) out.commit = fs.readFileSync(f, 'utf8').trim();
        else { const pr = fs.readFileSync(path.join(ROOT, '.git', 'packed-refs'), 'utf8').split('\n').find(l => l.endsWith(' refs/heads/' + m[1])); if (pr) out.commit = pr.split(' ')[0]; } } } catch (e2) {} }
  if (!/^[0-9a-f]{40}$/.test(out.commit)) out.commit = '';
  return out;
}
const GIT = gitInfo();
const PATCH_ID = (/const PATCH = \[\s*\{id:'([^']+)'/.exec(fs.readFileSync(path.join(ROOT, 'js', 'game.js'), 'utf8')) || [])[1] || '';
const IS_TEST = process.env.BASTION_TEST ? /^(1|true|on)$/i.test(process.env.BASTION_TEST) : GIT.branch === 'test';
const STARTED = Date.now();
// the publisher's details shown in the legal pages (Pelican variables, nothing to change in the code)
const LEGAL = Object.fromEntries(Object.entries({ name: 'LEGAL_NAME', siret: 'LEGAL_SIRET', email: 'LEGAL_EMAIL', address: 'LEGAL_ADDRESS', mediator: 'LEGAL_MEDIATOR', mediator_url: 'LEGAL_MEDIATOR_URL' })
  .map(([k, v]) => [k, String(process.env[v] || '').slice(0, 200)]));

// ---------- console log (in French: it is read by the server owner in the Pelican console) ----------
const STAMP = new Intl.DateTimeFormat('fr-FR', { timeZone: SERVER_TZ, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const clean = v => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, '?').slice(0, 40);   // a name typed by anybody: no line breaks in the log
let logStore = null;   // set once the database is open: every line is also kept for the live journal of the management panel
function log(tag, msg) { console.log(`[${STAMP.format(new Date())}] [${tag}] ${msg}`); if (logStore) try { logStore.run(Date.now(), String(tag), String(msg).slice(0, 2000)); } catch (e) {} }
// an error in a background task must never stop the whole server: it is written in the console instead
process.on('unhandledRejection', e => log('ERREUR', `tâche en arrière-plan : ${e && e.stack ? e.stack.split('\n').slice(0, 3).join(' | ') : e}`));
// an unexpected error anywhere else: written in the journal, then the game stops; the launcher starts it again 5 seconds later
process.on('uncaughtException', e => { log('ERREUR', `PLANTAGE : ${e && e.stack ? e.stack.split('\n').slice(0, 4).join(' | ') : e}`); process.exit(1); });

// ---------- database ----------
const db = new DatabaseSync(path.join(DATA, 'bastion.db'));
db.exec(`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE COLLATE NOCASE, salt TEXT NOT NULL, hash TEXT NOT NULL, created INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created INTEGER NOT NULL, seen INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS bases (user_id INTEGER PRIMARY KEY, x INTEGER NOT NULL, y INTEGER NOT NULL, lvl INTEGER NOT NULL DEFAULT 1, power INTEGER NOT NULL DEFAULT 0,
    state TEXT, updated INTEGER NOT NULL DEFAULT 0);
  CREATE UNIQUE INDEX IF NOT EXISTS bases_pos ON bases (x, y);
  CREATE TABLE IF NOT EXISTS attacks (id INTEGER PRIMARY KEY, att INTEGER NOT NULL, def INTEGER NOT NULL, kind TEXT NOT NULL, mid INTEGER NOT NULL,
    launched INTEGER NOT NULL, eta0 INTEGER NOT NULL, arrive INTEGER NOT NULL, troops TEXT, titan INTEGER NOT NULL DEFAULT 0, status TEXT NOT NULL DEFAULT 'out', result TEXT);
  CREATE INDEX IF NOT EXISTS attacks_out ON attacks (status, arrive);
  CREATE INDEX IF NOT EXISTS attacks_def ON attacks (def, status);`);
// shield: end of the beginner protection or of the truce (0 = can be attacked)
if (!db.prepare("SELECT 1 FROM pragma_table_info('bases') WHERE name = 'shield'").get()) db.exec("ALTER TABLE bases ADD COLUMN shield INTEGER NOT NULL DEFAULT 0");
if (!db.prepare("SELECT 1 FROM pragma_table_info('bases') WHERE name = 'cos'").get()) db.exec("ALTER TABLE bases ADD COLUMN cos TEXT");   // shop cosmetics seen by the others
// ranking: PvP victories (attacks + defenses won) and battles won, copied from the saved game at each save (read by the ranking)
if (!db.prepare("SELECT 1 FROM pragma_table_info('bases') WHERE name = 'pvp'").get()) {
  db.exec("ALTER TABLE bases ADD COLUMN pvp INTEGER NOT NULL DEFAULT 0; ALTER TABLE bases ADD COLUMN wins INTEGER NOT NULL DEFAULT 0");
  const up = db.prepare('UPDATE bases SET pvp = ?, wins = ? WHERE user_id = ?');
  for (const b of db.prepare('SELECT user_id, state FROM bases WHERE state IS NOT NULL').all()) {
    try { const ss = JSON.parse(b.state).stats || {}; up.run((+ss.pvpWins || 0) + (+ss.pvpDef || 0), +ss.wins || 0, b.user_id); } catch (e) {} }
}
// roles: player · tester (test account with every power) · admin (can also create accounts)
if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'role'").get()) db.exec("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'player'");
// accounts blocked for using a script: banned = time of the block (0 = free); the reports explain why
if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'banned'").get()) db.exec("ALTER TABLE users ADD COLUMN banned INTEGER NOT NULL DEFAULT 0");
// last time the player was seen (any request), for the management panel
if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'seen'").get()) db.exec("ALTER TABLE users ADD COLUMN seen INTEGER NOT NULL DEFAULT 0");
// the journal (same lines as the console) and the announcements, for the management panel
db.exec(`CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY, at INTEGER NOT NULL, tag TEXT NOT NULL, msg TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS announces (id INTEGER PRIMARY KEY, at INTEGER NOT NULL, text TEXT NOT NULL, color TEXT NOT NULL, until INTEGER NOT NULL, by TEXT);`);
logStore = db.prepare('INSERT INTO logs (at, tag, msg) VALUES (?, ?, ?)');
setInterval(() => { try { db.prepare('DELETE FROM logs WHERE id < (SELECT MAX(id) FROM logs) - 20000').run(); } catch (e) {} }, 3600_000).unref();   // the 20 000 latest lines are kept
db.exec(`CREATE TABLE IF NOT EXISTS bans (id INTEGER PRIMARY KEY, user_id INTEGER NOT NULL, at INTEGER NOT NULL, reason TEXT NOT NULL, detail TEXT, active INTEGER NOT NULL DEFAULT 1);
  CREATE INDEX IF NOT EXISTS bans_user ON bans (user_id, at);`);
// Public test phase: the account named ADMIN_NAME (Spadeure) is always the administrator, the only one with every power.
// Once (remembered in the database): every other account becomes a normal player, test accounts included.
const ADMIN_NAME = process.env.ADMIN_NAME || 'Spadeure';
db.exec('CREATE TABLE IF NOT EXISTS meta (k TEXT PRIMARY KEY, v TEXT)');
// outposts: one row per outpost (a player has at most one of each type), never two on the same tile; lvl = level of its Outpost Center (shown on the map)
db.exec(`CREATE TABLE IF NOT EXISTS outposts (user_id INTEGER NOT NULL, type TEXT NOT NULL, x INTEGER NOT NULL, y INTEGER NOT NULL, lvl INTEGER NOT NULL DEFAULT 1, created INTEGER NOT NULL, PRIMARY KEY (user_id, type));
  CREATE UNIQUE INDEX IF NOT EXISTS outposts_pos ON outposts (x, y);`);
{ const adm = db.prepare('SELECT id, name, role FROM users WHERE name = ? COLLATE NOCASE').get(ADMIN_NAME);
  if (adm && adm.role !== 'admin') { db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(adm.id); log('ADMIN', `Administrateur : ${adm.name}`); }
  if (adm && !db.prepare("SELECT 1 FROM meta WHERE k = 'public_test'").get()) {
    const n = db.prepare("UPDATE users SET role = 'player' WHERE id != ? AND role != 'player'").run(adm.id).changes;
    db.prepare("INSERT INTO meta (k, v) VALUES ('public_test', ?)").run(String(Date.now()));
    log('ADMIN', `Phase de test publique : ${n} compte(s) de test ou admin repassé(s) en joueur normal, seul ${adm.name} garde les pouvoirs`); } }
// One-time full reset before the public test (27/10/2026): every account is deleted except ADMIN_NAME, whose base starts again from zero.
// A copy of the whole database is saved first in data/ (backup-before-reset-….db), just in case.
{ const KEY = 'reset_2026_10_27', adm = db.prepare('SELECT id, name FROM users WHERE name = ? COLLATE NOCASE').get(ADMIN_NAME);
  if (!db.prepare('SELECT 1 FROM meta WHERE k = ?').get(KEY)) {
    if (!db.prepare('SELECT 1 FROM users LIMIT 1').get()) db.prepare('INSERT INTO meta (k, v) VALUES (?, ?)').run(KEY, 'empty');   // brand new server: nothing to reset, ever
    else if (!adm) log('ADMIN', `Remise à zéro annulée : le compte ${ADMIN_NAME} n'existe pas sur ce serveur`);
    else {
      const backup = path.join(DATA, `backup-before-reset-${new Date().toISOString().slice(0, 10)}.db`);
      try { if (!fs.existsSync(backup)) db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`); } catch (e) { log('ERREUR', 'sauvegarde avant remise à zéro : ' + e.message); }
      const before = db.prepare('SELECT COUNT(*) n FROM users').get().n;
      db.exec('BEGIN');
      db.prepare('DELETE FROM attacks').run();
      db.prepare('DELETE FROM sessions WHERE user_id != ?').run(adm.id);
      db.prepare('DELETE FROM bases WHERE user_id != ?').run(adm.id);
      db.prepare('DELETE FROM users WHERE id != ?').run(adm.id);
      db.prepare('UPDATE bases SET state = NULL, lvl = 1, power = 0, shield = 0, updated = ? WHERE user_id = ?').run(Date.now(), adm.id);   // a brand new base
      db.prepare("UPDATE users SET role = 'admin', created = ? WHERE id = ?").run(Date.now(), adm.id);
      db.prepare('INSERT INTO meta (k, v) VALUES (?, ?)').run(KEY, String(Date.now()));
      db.exec('COMMIT');
      log('ADMIN', `REMISE À ZÉRO : ${before - 1} compte(s) supprimé(s), base de ${adm.name} repartie de zéro · sauvegarde : ${path.basename(backup)}`);
    } } }
// One-time full wipe (30/10/2026): every account is deleted, ADMIN_NAME too (it is created again with "Create an account").
// Bases, outposts, attacks, sessions and blocks go with them; the journal and the announcements are kept.
// A copy of the whole database is saved first in data/ (backup-before-wipe-….db), just in case.
{ const KEY = 'wipe_2026_10_30';
  if (!db.prepare('SELECT 1 FROM meta WHERE k = ?').get(KEY)) {
    const before = db.prepare('SELECT COUNT(*) n FROM users').get().n;
    if (before) {
      const backup = path.join(DATA, `backup-before-wipe-${new Date().toISOString().slice(0, 10)}.db`);
      try { if (!fs.existsSync(backup)) db.exec(`VACUUM INTO '${backup.replace(/'/g, "''")}'`); } catch (e) { log('ERREUR', 'sauvegarde avant wipe : ' + e.message); }
      db.exec('BEGIN');
      for (const t of ['attacks', 'sessions', 'outposts', 'bans', 'bases', 'users']) db.prepare(`DELETE FROM ${t}`).run();
      db.prepare('INSERT INTO meta (k, v) VALUES (?, ?)').run(KEY, String(Date.now()));
      db.exec('COMMIT');
      log('ADMIN', `WIPE GÉNÉRAL : ${before} compte(s) supprimé(s), ${ADMIN_NAME} compris · sauvegarde : ${path.basename(backup)}`);
    } else db.prepare('INSERT INTO meta (k, v) VALUES (?, ?)').run(KEY, 'empty');   // brand new server: nothing to wipe, ever
  } }
if (!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get()) {   // no admin yet (empty server): the very first account becomes the administrator
  const first = db.prepare('SELECT id, name FROM users ORDER BY id LIMIT 1').get();
  if (first) { db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(first.id); log('ADMIN', `Administrateur : ${first.name}`); }
}
const Q = {
  userByName: db.prepare('SELECT * FROM users WHERE name = ?'),
  addUser: db.prepare('INSERT INTO users (name, salt, hash, created) VALUES (?, ?, ?, ?)'),
  addSession: db.prepare('INSERT INTO sessions (token, user_id, created, seen) VALUES (?, ?, ?, ?)'),
  session: db.prepare('SELECT s.token, u.id, u.name, u.role, u.created, u.banned FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?'),
  user: db.prepare('SELECT id, name, role, created FROM users WHERE id = ?'),
  seen: db.prepare('UPDATE sessions SET seen = ? WHERE token = ?'),
  delSession: db.prepare('DELETE FROM sessions WHERE token = ?'),
  oldSessions: db.prepare('DELETE FROM sessions WHERE seen < ?'),
  base: db.prepare('SELECT * FROM bases WHERE user_id = ?'),
  addBase: db.prepare('INSERT INTO bases (user_id, x, y, updated) VALUES (?, ?, ?, ?)'),
  saveBase: db.prepare('UPDATE bases SET state = ?, lvl = ?, power = ?, updated = ?, shield = ?, pvp = ?, wins = ?, cos = ? WHERE user_id = ?'),
  allPos: db.prepare('SELECT x, y FROM bases'),
  baseAt: db.prepare('SELECT user_id FROM bases WHERE x = ? AND y = ?'),
  // alliance: always empty until alliances exist (the map already shows it, so nothing changes on the player side then)
  players: db.prepare('SELECT u.id AS uid, u.name, b.x, b.y, b.lvl, b.power, b.shield, b.cos FROM bases b JOIN users u ON u.id = b.user_id WHERE b.user_id != ?'),
  target: db.prepare('SELECT b.user_id, b.lvl, b.shield, u.name FROM bases b JOIN users u ON u.id = b.user_id WHERE b.x = ? AND b.y = ?'),
  atkByMarch: db.prepare('SELECT id, status, arrive FROM attacks WHERE att = ? AND mid = ?'),
  atkAdd: db.prepare('INSERT INTO attacks (att, def, kind, mid, launched, eta0, arrive, troops, titan) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'),
  atkArrive: db.prepare("UPDATE attacks SET arrive = ? WHERE id = ? AND status = 'out'"),
  atkOutOf: db.prepare("SELECT id, mid, def FROM attacks WHERE att = ? AND status = 'out'"),
  atkStatus: db.prepare('UPDATE attacks SET status = ?, result = ? WHERE id = ?'),
  atkDue: db.prepare("SELECT * FROM attacks WHERE status = 'out' AND arrive <= ? ORDER BY arrive LIMIT 50"),
  atkIncoming: db.prepare("SELECT a.*, u.name AS aname FROM attacks a JOIN users u ON u.id = a.att WHERE a.def = ? AND a.status = 'out' ORDER BY a.arrive"),
  count: db.prepare('SELECT COUNT(*) AS n FROM users'),
  setRole: db.prepare('UPDATE users SET role = ? WHERE id = ?'),
  accounts: db.prepare(`SELECT u.name, u.role, u.created, u.banned, b.lvl, b.power, b.updated,
    (SELECT json_object('at', x.at, 'reason', x.reason, 'detail', x.detail) FROM bans x WHERE x.user_id = u.id AND x.active = 1 ORDER BY x.at DESC LIMIT 1) AS ban
    FROM users u LEFT JOIN bases b ON b.user_id = u.id ORDER BY u.id`),
  setBanned: db.prepare('UPDATE users SET banned = ? WHERE id = ?'),
  addBan: db.prepare('INSERT INTO bans (user_id, at, reason, detail) VALUES (?, ?, ?, ?)'),
  endBans: db.prepare('UPDATE bans SET active = 0 WHERE user_id = ?'),
  lastBan: db.prepare('SELECT * FROM bans WHERE user_id = ? ORDER BY at DESC LIMIT 1'),
  opOf: db.prepare("SELECT * FROM outposts WHERE user_id = ? AND type = 'rempart'"),
  opOfT: db.prepare('SELECT * FROM outposts WHERE user_id = ? AND type = ?'),
  opAt: db.prepare('SELECT user_id FROM outposts WHERE x = ? AND y = ?'),
  addOp: db.prepare('INSERT INTO outposts (user_id, type, x, y, lvl, created) VALUES (?, ?, ?, ?, 1, ?)'),
  delOp: db.prepare('DELETE FROM outposts WHERE user_id = ?'),
  opLvl: db.prepare('UPDATE outposts SET lvl = ? WHERE user_id = ? AND type = ? AND lvl != ?'),
  allOps: db.prepare('SELECT o.type AS t, o.x, o.y, o.lvl, u.name FROM outposts o JOIN users u ON u.id = o.user_id'),
  userSeen: db.prepare('UPDATE users SET seen = ? WHERE id = ?'),
  bannedList: db.prepare('SELECT u.id, u.name, u.banned, (SELECT reason FROM bans x WHERE x.user_id = u.id ORDER BY x.at DESC LIMIT 1) AS reason FROM users u WHERE u.banned > 0 ORDER BY u.banned DESC'),
};

const lastIp = new Map(), onlineSince = new Map();   // user id -> last address seen · time the game was opened (live line)
// the answer for a blocked account: blocked for a script, or by the administrator (with his reason)
function banError(uid) { const b = Q.lastBan.get(uid); if (b && b.reason === 'admin') { let d = {}; try { d = JSON.parse(b.detail || '{}'); } catch (e) {} return { error: 'banned_admin', motif: String(d.motif || '').slice(0, 200) }; } return { error: 'banned' }; }
// ---------- statistics for the hourly summary ----------
const newStats = () => ({ loginOk: 0, loginFail: 0, registered: 0, blockedIps: new Set(), blockedHits: 0, refused: 0, cheat: 0, saved: 0, skipped: 0,
  players: new Set(), refusedBy: new Map(), apiN: 0, apiMs: 0, apiMax: 0, apiMaxUrl: '' });
let STATS = newStats();

// ---------- helpers ----------
const hashPass = (pass, salt) => crypto.scryptSync(pass, salt, 64).toString('hex');
// answers are compressed when big enough (brotli or gzip): less to send through the tunnel, faster on phones
function compressFor(req, buf) {
  const ae = String(req.headers['accept-encoding'] || '');
  if (buf.length < 1024) return null;
  if (/\bbr\b/.test(ae)) return ['br', zlib.brotliCompressSync(buf, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 } })];
  if (/\bgzip\b/.test(ae)) return ['gzip', zlib.gzipSync(buf, { level: 6 })];
  return null;
}
function send(res, code, obj) {
  let body = Buffer.from(JSON.stringify(obj));
  const h = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding' };
  const c = compressFor(res.req, body); if (c) { h['Content-Encoding'] = c[0]; body = c[1]; }
  if (res.t0) h['Server-Timing'] = `app;dur=${(Number(process.hrtime.bigint() - res.t0) / 1e6).toFixed(1)}`;   // time spent in the server, shown in the game
  res.writeHead(code, h); res.end(body);
}
const badBody = () => Object.assign(new Error('bad_body'), { bad: true });
function readBody(req, max = 1_000_000) {
  return new Promise((ok, ko) => { let size = 0; const parts = [];
    req.on('data', c => { size += c.length; if (size > max) { ko(badBody()); req.destroy(); } else parts.push(c); });
    req.on('end', () => { try { const v = parts.length ? JSON.parse(Buffer.concat(parts).toString('utf8')) : {}; ok(v && typeof v === 'object' ? v : {}); } catch (e) { ko(badBody()); } });
    req.on('error', ko); });
}
try { db.exec('ALTER TABLE sessions ADD COLUMN panel INTEGER NOT NULL DEFAULT 0'); } catch (e) {}   // 1 = opened from the management panel (never replaced by a game login)
// one game at a time per account: a new login, or a game page opening its live line, replaces the older one (the older page is told why)
const replaced = new Map(), activeTok = new Map();   // token replaced -> time (kept 1 h) · user id -> token of the game page in use
setInterval(() => { const old = Date.now() - 3600_000; for (const [k, v] of replaced) if (v < old) replaced.delete(k); }, 600_000).unref();
function replaceGames(uid, keepRes) {   // the other open game pages of this account are closed, with the reason
  const set = streams.get(uid); if (!set) return 0; let n = 0;
  for (const r of [...set]) if (r !== keepRes) { try { r.write(`event: kick\ndata: ${JSON.stringify({ why: 'elsewhere' })}\n\n`); r.end(); } catch (e) {} set.delete(r); n++; }
  return n;
}
const seenAt = new Map();   // the "last seen" time of a session is written at most once a minute (fewer database writes)
function auth(req) {
  const m = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || ''); if (!m) return null;
  const s = Q.session.get(m[1]); if (!s) return replaced.has(m[1]) ? { replaced: true } : null;
  const now = Date.now(); if (now - (seenAt.get(m[1]) || 0) > 60_000) { seenAt.set(m[1], now); Q.seen.run(now, m[1]); Q.userSeen.run(now, s.id); }
  return s;
}
// protection against password guessing: more than 10 failed tries (or new accounts) in one minute
// from the same address blocks that address for 10 minutes
const STRIKES = 10, STRIKE_WINDOW = 60_000, BLOCK_TIME = 10 * 60_000;
const strikes = new Map(), blocked = new Map();
function isBlocked(ip) {
  const until = blocked.get(ip); if (!until) return false;
  if (Date.now() >= until) { blocked.delete(ip); return false; }
  STATS.blockedHits++; return true;
}
function strike(ip) {
  const now = Date.now(), t = (strikes.get(ip) || []).filter(x => now - x < STRIKE_WINDOW); t.push(now); strikes.set(ip, t);
  return t.length;
}
function blockIfTooMany(ip, n, why) {
  if (n <= STRIKES) return;
  blocked.set(ip, Date.now() + BLOCK_TIME); strikes.delete(ip); STATS.blockedIps.add(ip);
  log('BLOQUÉ', `${ip} · bloquée 10 minutes après ${n} essais en une minute (${why})`);
}
setInterval(() => {   // forget old tries so the lists never grow
  const now = Date.now();
  for (const [ip, t] of strikes) if (!t.some(x => now - x < STRIKE_WINDOW)) strikes.delete(ip);
  for (const [ip, u] of blocked) if (now >= u) blocked.delete(ip);
  for (const [tk, s] of seenAt) if (now - s > 3600_000) seenAt.delete(tk);
  for (const [id, b] of orderBucket) if (!b.waiting && now - b.at > 600_000) orderBucket.delete(id);
  for (const [id, w] of watch) { const last = w.acts.length ? w.acts[w.acts.length - 1].t : 0; if (now - last > 3600_000 && !w.bad.some(t => now - t < 600_000)) watch.delete(id); }
  for (const [id, t] of tooFastLog) if (now - t > 600_000) tooFastLog.delete(id);
  for (const [ip, t] of panelOutLog) if (now - t > 600_000) panelOutLog.delete(ip);
  for (const ip of [...newAccounts.keys()]) accountsToday(ip);
}, 5 * 60_000).unref();
// new accounts: at most 5 per day from the same address (a family or friends sharing a connection still fit)
const ACCOUNTS_PER_DAY = +process.env.ACCOUNTS_PER_DAY || 5, newAccounts = new Map();   // address -> creation times
function accountsToday(ip) { const now = Date.now(), t = (newAccounts.get(ip) || []).filter(x => now - x < 86400_000); if (t.length) newAccounts.set(ip, t); else newAccounts.delete(ip); return t.length; }
// orders: a player clicking even very fast never notices anything; a script firing hundreds of orders is slowed down,
// then refused, so it can never slow the server down for the others. Each player has a reserve of 40 orders
// that refills at 12 per second; when it is empty, the next orders simply wait their turn (a fraction of a second).
const ORDER_BURST = 40, ORDER_RATE = 12, ORDER_WAIT_MAX = 60;   // more than 60 orders waiting at once: refused
const orderBucket = new Map();   // user id -> {tokens, at, waiting}
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function orderTurn(me) {
  if (me.role === 'admin') return true;
  let b = orderBucket.get(me.id); const now = Date.now();
  if (!b) orderBucket.set(me.id, b = { tokens: ORDER_BURST, at: now, waiting: 0 });
  b.tokens = Math.min(ORDER_BURST, b.tokens + (now - b.at) / 1000 * ORDER_RATE); b.at = now;
  if (b.tokens >= 1) { b.tokens--; return true; }
  if (b.waiting >= ORDER_WAIT_MAX) return false;
  b.waiting++; b.tokens--;   // takes its place in the line: the wait grows with the line
  try { await sleep(Math.ceil(-b.tokens / ORDER_RATE * 1000)); } finally { b.waiting--; }
  return true;
}
const tooFastLog = new Map();   // one line per player and per minute in the console
function tooFast(me, ip, res, req) {
  STATS.refused++; const now = Date.now();
  banPlayer(me, ip, req, 'burst', { n: ORDER_WAIT_MAX }); if (me.banned) return send(res, 403, { error: 'banned' });
  if (now - (tooFastLog.get(me.id) || 0) > 60_000) { tooFastLog.set(me.id, now); cheat(me, ip, 'beaucoup trop d\'ordres à la fois (script ?) : ordres refusés pendant un moment'); }
  return send(res, 429, { error: 'too_fast' });
}
// ---------- scripts are forbidden: an account caught using one is blocked, with a report saying why ----------
// The game itself never sends an order on its own (its timers only ask for the news), so every order comes from a tap.
// Signs that cannot come from a person:
//  · not_game : requests that do not come from the game page (a program talking to the server directly)
//  · burst    : more orders waiting at once than fingers can send
//  · rush     : far too many orders in one minute
//  · flood    : far too many orders in 10 minutes
//  · regular  : a long run of orders at perfectly regular intervals (a person is never that regular, a timer always is)
//  · nonstop  : orders in every 10-minute slot for 16 hours in a row (a person sleeps)
// The thresholds are far above what a very fast player does. The administrator is never checked (on the test server only).
const BOT = { badSig: 20, rush: 200, flood: 600, regularN: 60, regularCv: 0.025, regularMinGap: 1500, regularMaxGap: 600_000, nonstopH: 16 };
const watch = new Map();   // user id -> {acts:[{t,a}], bad:[t], slots:Set}
const watchOf = id => { let w = watch.get(id); if (!w) watch.set(id, w = { acts: [], bad: [], slots: new Set() }); return w; };
// the game page signs its requests with a mark computed from the session key (same function in js/game.js)
function pageSig(token) { let h1 = 0xdeadbeef ^ 77, h2 = 0x41c6ce57 ^ 77; const s = token + '|bastion-play';
  for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); h1 = Math.imul(h1 ^ c, 2654435761); h2 = Math.imul(h2 ^ c, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16).padStart(8, '0') + (h1 >>> 0).toString(16).padStart(8, '0'); }
const REASON_FR = {
  not_game: d => `${d.n} requêtes envoyées hors de la page du jeu (un programme qui parle directement au serveur)`,
  burst: d => `plus de ${d.n} ordres en attente en même temps (ordres envoyés par un programme)`,
  rush: d => `${d.n} ordres en une minute (impossible à la main)`,
  flood: d => `${d.n} ordres en 10 minutes (impossible à la main)`,
  regular: d => `${d.n} ordres d'affilée à intervalles parfaitement réguliers (toutes les ${d.g} s, écart ${d.v} %) : un humain n'est jamais aussi régulier`,
  nonstop: d => `des ordres toutes les 10 minutes sans aucune pause pendant ${d.h} heures`,
  admin: d => `bloqué par ${d.by || 'l\'administrateur'}${d.motif ? ' : ' + d.motif : ''}`,
};
function banPlayer(me, ip, req, reason, d) {
  if (me.role === 'admin' || me.banned) return;
  const now = Date.now(), w = watchOf(me.id);
  const detail = { ...d, ip, ua: clean(String(req.headers['user-agent'] || '')).slice(0, 40) + (String(req.headers['user-agent'] || '').length > 40 ? '…' : ''),
    last: w.acts.slice(-25).map(x => [x.t, x.a]) };
  Q.setBanned.run(now, me.id); Q.addBan.run(me.id, now, reason, JSON.stringify(detail));   // its sessions stay: every request answers « blocked »
  me.banned = now; watch.delete(me.id); orderBucket.delete(me.id);
  log('SCRIPT', `${me.name} BLOQUÉ · ${ip} · ${REASON_FR[reason](d)} · tape « rapport ${me.name} » pour le détail, « debloquer ${me.name} » pour annuler`);
  push(me.id, 'banned', {});
  const set = streams.get(me.id); if (set) for (const r of set) { try { r.end(); } catch (e) {} }
}
// a request to the game engine without the mark of the game page: refused (an old page reloads by itself); many of them = a program
function checkSig(me, ip, req) {
  if (me.role === 'admin') return true;
  if (req.headers['x-bastion'] === pageSig(me.token)) return true;
  const w = watchOf(me.id), now = Date.now(); w.bad = w.bad.filter(t => now - t < 600_000); w.bad.push(now);
  if (w.bad.length >= BOT.badSig) banPlayer(me, ip, req, 'not_game', { n: w.bad.length });
  return false;
}
// one order from a player: looked at after it is done (nothing is slowed down)
function noteOrder(me, ip, req, a) {
  if (me.role === 'admin' || me.banned) return;
  const now = Date.now(), w = watchOf(me.id);
  w.acts.push({ t: now, a: clean(a).slice(0, 16) }); if (w.acts.length > BOT.flood + 50) w.acts.splice(0, w.acts.length - BOT.flood - 50);
  const n10 = w.acts.filter(x => now - x.t < 600_000).length;
  const n1 = w.acts.filter(x => now - x.t < 60_000).length;
  if (n1 >= BOT.rush) return banPlayer(me, ip, req, 'rush', { n: n1 });
  if (n10 >= BOT.flood) return banPlayer(me, ip, req, 'flood', { n: n10 });
  if (w.acts.length > BOT.regularN) {
    const tt = w.acts.slice(-BOT.regularN - 1).map(x => x.t), gaps = tt.slice(1).map((t, i) => t - tt[i]);
    if (gaps.every(g => g >= BOT.regularMinGap && g <= BOT.regularMaxGap)) {
      const mean = gaps.reduce((s, g) => s + g, 0) / gaps.length, cv = Math.sqrt(gaps.reduce((s, g) => s + (g - mean) ** 2, 0) / gaps.length) / mean;
      if (cv < BOT.regularCv) return banPlayer(me, ip, req, 'regular', { n: gaps.length, g: +(mean / 1000).toFixed(2), v: +(cv * 100).toFixed(1) });
    }
  }
  const slot = Math.floor(now / 600_000); w.slots.add(slot);
  if (w.slots.size > 200) for (const k of w.slots) if (k < slot - 150) w.slots.delete(k);
  let run = 0; while (w.slots.has(slot - run)) run++;
  if (run >= BOT.nonstopH * 6) return banPlayer(me, ip, req, 'nonstop', { h: BOT.nonstopH });
}
function unbanPlayer(u, by) {
  Q.setBanned.run(0, u.id); Q.endBans.run(u.id); watch.delete(u.id); orderBucket.delete(u.id);
  log('SCRIPT', `${u.name} débloqué par ${by}`);
}
// a free spot for a new base: on the tile grid, away from the map edges and from other players
function freeSpot() {
  const used = [...Q.allPos.all(), ...Q.allOps.all()];   // away from the bases and the outposts
  for (let i = 0; i < 500; i++) {
    const x = 2 * Math.floor((80 + Math.random() * (MAPN - 160)) / 2), y = 2 * Math.floor((80 + Math.random() * (MAPN - 160)) / 2);
    if (used.every(p => Math.abs(p.x - x) + Math.abs(p.y - y) >= 8) && !engine.isFort(x, y)) return { x, y };   // never on a Fortified Mountain
  }
  throw new Error('map full');
}
// the game engine knows every outpost of the map (never attacked, Fortified Mountains move away from them)
const OP_TYPES = { rempart: 'op', brasier: 'br' };   // outpost type -> its key in the saved game
function loadOutposts() { engine.setOutposts(Q.allOps.all()); }
loadOutposts();
const NAME_OK = /^[\p{L}\p{N}_\- ]{3,16}$/u;
// a name may not mix alphabets (no "Spаdeure" with a Russian "а"), and may not look like a name already taken
const SCRIPTS = [/\p{Script=Latin}/u, /\p{Script=Cyrillic}/u, /\p{Script=Greek}/u, /\p{Script=Arabic}/u, /\p{Script=Han}/u, /\p{Script=Hiragana}|\p{Script=Katakana}/u, /\p{Script=Hangul}/u, /\p{Script=Hebrew}/u, /\p{Script=Thai}/u];
const oneScript = n => { const used = new Set(); for (const ch of n) if (/\p{L}/u.test(ch)) { const i = SCRIPTS.findIndex(r => r.test(ch)); used.add(i); if (i < 0) return false; } return used.size <= 1 || (used.size === 2 && used.has(5) && used.has(4)); };
const LOOK = { 'а': 'a', 'е': 'e', 'о': 'o', 'р': 'p', 'с': 'c', 'у': 'y', 'х': 'x', 'ѕ': 's', 'і': 'i', 'ј': 'j', 'к': 'k', 'м': 'm', 'т': 't', 'в': 'b', 'н': 'h', 'г': 'r', 'ԁ': 'd', 'ɡ': 'g', 'ο': 'o', 'α': 'a', 'ρ': 'p', 'ν': 'v', 'ι': 'i', 'κ': 'k', 'τ': 't', 'υ': 'u', 'χ': 'x', 'ε': 'e', 'β': 'b', 'η': 'n', 'μ': 'm', 'ω': 'w' };
const skeleton = n => [...n.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase()].map(c => LOOK[c] || c).join('').replace(/[\s_\-]+/g, '').replace(/0/g, 'o').replace(/[1l|]/g, 'i').replace(/4/g, 'a').replace(/5/g, 's').replace(/3/g, 'e').replace(/7/g, 't').replace(/rn/g, 'm');
function nameLooksTaken(n) { const k = skeleton(n); for (const u of db.prepare('SELECT name FROM users').all()) if (skeleton(u.name) === k) return true; return false; }
// behind the Cloudflare tunnel every request comes from the tunnel: the real player address is in CF-Connecting-IP
function ipOf(req) {
  const r = (req.socket.remoteAddress || '?').replace(/^::ffff:/, '');
  const local = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|^::1$/.test(r);
  return clean((local && req.headers['cf-connecting-ip']) || r);
}
// The management panel opens only from home: a computer on the same local network as the server (http://192.168.1.190:<port>/admin).
// Everything that comes from the internet goes through the Cloudflare tunnel, which always adds its CF-... marks: refused.
// PANEL_REMOTE=1 (Pelican variable) opens it from anywhere, only in case of need.
const PANEL_REMOTE = /^(1|true|on)$/i.test(String(process.env.PANEL_REMOTE || ''));
function fromHome(req) {
  if (PANEL_REMOTE) return true;
  const r = (req.socket.remoteAddress || '').replace(/^::ffff:/, '');
  const local = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|^::1$|^f[cd][0-9a-f]{2}:|^fe80:/i.test(r);
  return local && !req.headers['cf-connecting-ip'] && !req.headers['cf-ray'] && !req.headers['x-forwarded-for'];
}
const panelOutLog = new Map();   // one line per address and per 10 minutes in the journal
function panelOutside(ip, url) {
  const now = Date.now(); if (now - (panelOutLog.get(ip) || 0) < 600_000) return; panelOutLog.set(ip, now);
  log('PANEL REFUSÉ', `${ip} · ${clean(url)} · le panel de gestion s'ouvre seulement depuis le réseau de la maison`);
}
function cheat(me, ip, what) { STATS.cheat++; log('TRICHE?', `${me ? me.name : '(non connecté)'} · ${ip} · ${what}`); }

// ---------- API ----------
async function api(req, res, url, ip) {
  if (url.startsWith('/api/admin/') && !fromHome(req)) { panelOutside(ip, url); return send(res, 404, { error: 'not_found' }); }   // the panel does not exist seen from the internet
  if (url === '/api/ping') return send(res, 200, { t: Date.now(), tz: SERVER_TZ, v: VERSION, s: panel.status() });   // s: maintenance, announcement, test server
  if (url === '/api/health') return send(res, 200, { ok: true, game: 'Bastion', players: Q.count.get().n, uptime: Math.round(process.uptime()),
    commit: GIT.commit, branch: GIT.branch, subject: GIT.subject, patch: PATCH_ID, version: VERSION, test: IS_TEST, beta: beta.isOn(), legal: LEGAL });
  // the beta sign-up form of the website (no account needed)
  if (url === '/api/beta/signup' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    blockIfTooMany(ip, strike(ip), 'inscriptions à la bêta');
    const P = await readBody(req, 5_000);
    try { return send(res, 200, beta.signup(P, ip, visits.originOf(ip, req.headers['user-agent']))); } catch (e) { if (!e.code) throw e; return send(res, e.code, { error: e.error }); }
  }

  if (url === '/api/register' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    blockIfTooMany(ip, strike(ip), 'créations de compte');          // every new account counts: no flood of accounts
    const { name = '', password = '', email = '', lang = 'en', ref = '' } = await readBody(req, 10_000);
    // test server: only the administrator account can be created here (the testers are created from the management panel)
    const isAdm = String(name).trim().toLowerCase() === ADMIN_NAME.toLowerCase();
    // beta mode: only the addresses signed up for the beta (website or panel) can create an account
    const brow = beta.registerCheck(String(name).trim(), email, isAdm);
    if (typeof brow === 'string') { log('INSCRIPTION REFUSÉE', `${clean(String(name).trim())} · ${ip} · bêta : ${{ beta_only: 'adresse absente de la liste des inscrits', beta_used: 'place déjà utilisée par un autre compte', beta_soon: 'la bêta n\'est pas encore lancée' }[brow] || brow}`); return send(res, 403, { error: brow }); }
    if (IS_TEST && !isAdm && !(brow && typeof brow === 'object')) { log('INSCRIPTION REFUSÉE', `${clean(String(name).trim())} · ${ip} · serveur de test (comptes créés depuis le panel)`); return send(res, 403, { error: 'test_closed' }); }
    if (panel.isMaint() && String(name).trim().toLowerCase() !== ADMIN_NAME.toLowerCase()) return send(res, 503, { error: 'maintenance' });
    if (accountsToday(ip) >= ACCOUNTS_PER_DAY) { log('INSCRIPTION REFUSÉE', `${clean(String(name).trim())} · ${ip} · déjà ${ACCOUNTS_PER_DAY} comptes créés aujourd'hui depuis cette adresse`); return send(res, 429, { error: 'too_many_accounts' }); }
    const n = String(name).trim();
    if (!NAME_OK.test(n) || !oneScript(n)) return send(res, 400, { error: 'bad_name' });
    if (String(password).length < 6 || String(password).length > 100) return send(res, 400, { error: 'bad_password' });
    if (Q.userByName.get(n) || nameLooksTaken(n) || (skeleton(n) === skeleton(ADMIN_NAME) && n.toLowerCase() !== ADMIN_NAME.toLowerCase())) return send(res, 409, { error: 'name_taken' });
    let mail = null;   // the e-mail address: needed on the official server (forgotten password), confirmed by a link
    if (!IS_TEST || email) { try { mail = acc.checkNewEmail(email); } catch (e) { return send(res, e.code, { error: e.error }); } }
    const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
    const id = Number(Q.addUser.run(n, salt, hashPass(String(password), salt), now).lastInsertRowid);
    if (Q.count.get().n === 1) { Q.setRole.run('admin', id); log('ADMIN', `Administrateur : ${n}`); }
    const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
    newAccounts.set(ip, [...(newAccounts.get(ip) || []), now]);
    const token = crypto.randomBytes(32).toString('hex'); Q.addSession.run(token, id, now, now); Q.userSeen.run(now, id); lastIp.set(id, ip);
    if (mail) acc.afterRegister(id, mail, LANG_OK.includes(lang) ? lang : 'en');
    if (brow && typeof brow === 'object') beta.registered(brow, id);
    if (ref) try { referral.onRegister(id, ref, ip); } catch (e) { log('ERREUR', 'parrainage : ' + e.message); }
    STATS.registered++; STATS.players.add(n);
    log('INSCRIPTION', `${n} · ${ip} · base en (${p.x}, ${p.y})`);
    return send(res, 200, { token, name: n });
  }
  // forgotten password, new password from the e-mail link, address confirmed: without being logged in
  if (url === '/api/password/forgot' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' }); blockIfTooMany(ip, strike(ip), 'demandes de mot de passe');
    const P = await readBody(req, 5_000); return send(res, 200, await acc.forgot({ who: P.who, lang: LANG_OK.includes(P.lang) ? P.lang : 'en' }));
  }
  if ((url === '/api/password/reset' || url === '/api/email/verify') && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    const P = await readBody(req, 5_000);
    try { return send(res, 200, url === '/api/email/verify' ? acc.verify(P) : acc.reset(P)); }
    catch (e) { if (!e.code) throw e; if (e.error === 'link_expired') blockIfTooMany(ip, strike(ip), 'liens invalides'); return send(res, e.code, { error: e.error }); }
  }
  if (url === '/api/login' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    const { name = '', password = '', panel: fromPanel = false } = await readBody(req, 10_000);
    const u = Q.userByName.get(String(name).trim());
    if (!u || !crypto.timingSafeEqual(Buffer.from(hashPass(String(password), u.salt), 'hex'), Buffer.from(u.hash, 'hex'))) {
      STATS.loginFail++;
      const n = strike(ip);
      log('CONNEXION ÉCHOUÉE', `${clean(String(name).trim()) || '(vide)'} · ${ip} · ${u ? 'mauvais mot de passe' : 'compte inconnu'} · essai ${n} en une minute`);
      blockIfTooMany(ip, n, 'connexions échouées');
      return send(res, 401, { error: 'bad_login' });
    }
    { const bw = beta.access(u); if (bw && !fromPanel) { log('CONNEXION REFUSÉE', `${u.name} · ${ip} · bêta : ${bw === 'beta_soon' ? 'pas encore lancée' : 'compte absent de la liste des inscrits'}`); return send(res, 403, { error: bw }); } }
    if (u.banned) { const be = banError(u.id); log('CONNEXION REFUSÉE', `${u.name} · ${ip} · compte bloqué (${be.error === 'banned_admin' ? 'par l\'administrateur' : 'script'})`); return send(res, 403, be); }
    const token = crypto.randomBytes(32).toString('hex'), now = Date.now(); Q.addSession.run(token, u.id, now, now); Q.userSeen.run(now, u.id); lastIp.set(u.id, ip);
    let others = 0;
    if (fromPanel) db.prepare('UPDATE sessions SET panel = 1 WHERE token = ?').run(token);
    else {   // a game login: the account is logged out everywhere else (other computer, phone...)
      for (const o of db.prepare('SELECT token FROM sessions WHERE user_id = ? AND token != ? AND panel = 0').all(u.id, token)) { replaced.set(o.token, now); seenAt.delete(o.token); others++; }
      db.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ? AND panel = 0').run(u.id, token);
      others = Math.max(others ? 1 : 0, replaceGames(u.id)); activeTok.set(u.id, token);
    }
    STATS.loginOk++; STATS.players.add(u.name);
    log('CONNEXION OK', `${u.name} · ${ip}${u.role !== 'player' ? ' · ' + u.role : ''}${fromPanel ? ' · panel' : ''}${others ? ' · déconnecté de son autre appareil' : ''}`);
    return send(res, 200, { token, name: u.name });
  }
  if (url === '/api/pay/webhook' && req.method === 'POST') return pay().webhook(req, res);   // Stripe confirms a payment (signed, no player login)
  const me = auth(req);
  if (me && me.replaced) return send(res, 401, { error: 'session_replaced' });
  if (!me) return send(res, 401, { error: 'not_logged_in' });
  if (url.startsWith('/api/admin/') && me.role === 'admin') { lastIp.set(me.id, ip); return panel.route(req, res, url, me, ip); }   // the management panel (administrator only)
  if (me.banned) return send(res, 403, banError(me.id));
  { const bw = beta.access(me); if (bw && url !== '/api/logout') return send(res, 403, { error: bw }); }   // beta: the game is closed to this account   // blocked for using a script, or by the administrator
  STATS.players.add(me.name); lastIp.set(me.id, ip);
  // official server: nobody has any power in the game, the administrator plays exactly like everybody (checks, maintenance…);
  // his role only opens the management panel. The tests with the administration buttons are done on the test server.
  me.isAdmin = me.role === 'admin';   // the real role, kept for the rankings (the administrator of the official server is never ranked)
  if (!IS_TEST) me.role = 'player';
  if (url.startsWith('/api/admin/')) return panel.route(req, res, url, me, ip);   // not an administrator: refused there
  if (url === '/api/stream' && req.method === 'GET') {   // the live line (kept open)
    res.writeHead(200, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Cache-Control': 'no-cache, no-transform', 'Connection': 'keep-alive', 'X-Accel-Buffering': 'no' });
    let set = streams.get(me.id); if (!set) streams.set(me.id, set = new Set());
    replaceGames(me.id, res); activeTok.set(me.id, me.token);   // one game page at a time: the older ones (other tab, other device) are closed
    set.add(res); if (!onlineSince.has(me.id)) onlineSince.set(me.id, Date.now());
    const b = Q.base.get(me.id); res.write(`retry: 3000\nevent: incoming\ndata: ${JSON.stringify({ incoming: incomingFor(me.id, b && b.state ? JSON.parse(b.state) : {}) })}\n\nevent: srv\ndata: ${JSON.stringify(panel.status())}\n\n`);
    req.on('close', () => { set.delete(res); if (!set.size && streams.get(me.id) === set) { streams.delete(me.id); Q.userSeen.run(Date.now(), me.id);
      setTimeout(() => { if (!streams.has(me.id)) onlineSince.delete(me.id); }, 90_000).unref(); } });   // a short network cut does not count as leaving
    return;
  }
  if (url === '/api/logout' && req.method === 'POST') { Q.delSession.run(me.token); seenAt.delete(me.token); log('DÉCONNEXION', `${me.name} · ${ip}`); return send(res, 200, { ok: true }); }
  const ENGINE = (url === '/api/state' && req.method === 'GET') || (url === '/api/act' && req.method === 'POST') || (url === '/api/chest' && req.method === 'POST') || (url === '/api/alliance' && req.method === 'POST') || (url === '/api/chat' && req.method === 'POST');
  // maintenance: the players can still look at their game (time goes on), but every order is refused; the administrator plays normally
  // an order from a game page that is no longer the one in use (the account opened the game elsewhere): refused
  if ((req.method === 'POST' || req.method === 'PUT') && /^\/api\/(act|chest|alliance|chat|state|event)$/.test(url) && activeTok.has(me.id) && activeTok.get(me.id) !== me.token) return send(res, 409, { error: 'session_replaced' });
  if (panel.isMaint() && me.role !== 'admin' && ((url === '/api/act' || url === '/api/chest' || url === '/api/admin' || url === '/api/alliance') && req.method === 'POST')) return send(res, 503, { error: 'maintenance', srv: panel.status() });
  if (ENGINE && !checkSig(me, ip, req)) return send(res, me.banned ? 403 : 409, { error: me.banned ? 'banned' : 'old_page' });   // not from the game page
  if (ENGINE && !(await orderTurn(me))) return tooFast(me, ip, res, req);
  if (me.banned) return send(res, 403, { error: 'banned' });   // the game engine runs for these: one line per player
  if (url === '/api/state' && req.method === 'GET') {
    const b = Q.base.get(me.id), r = runFor(me, b, null, [], langOf(req));
    return send(res, 200, { name: me.name, role: me.role, pos: { x: b.x, y: b.y }, state: r.state, events: r.events, serverTime: Date.now(), pay: pay().MODE,
      beginner: beginnerEnd(r.state, me.created), incoming: incomingFor(me.id, r.state) });
  }
  if (url === '/api/act' && req.method === 'POST') {             // one order from the player: checked and run by the server
    const { a, args = [], lang } = await readBody(req, 20_000);
    const b = Q.base.get(me.id), act = clean(a);
    if (ally.SERVER_ACTS.has(String(a)) || ['payGrant', 'payCheck', 'payRevoke', 'evGrant', 'evRank', 'evFinal', 'alFinal', 'missionChat', 'statSet', 'betaGrant', 'refGrant'].includes(String(a))) { cheat(me, ip, `ordre réservé au serveur : ${act}`); return send(res, 403, { error: 'forbidden' }); }
    const refuse = err => { if (err === 'bad_order') refusedOrder(me, ip, act, args, err); const r0 = runFor(me, b, null, [], lang); return send(res, 200, { state: r0.state, events: r0.events, error: err, serverTime: Date.now() }); };
    if (a === 'launch' && Array.isArray(args) && args[0] && typeof args[0] === 'object') {
      const o = args[0]; delete o.pvp;                             // only the server says that the target is a player
      const t = Q.target.get(Math.floor(Number(o.x) || 0), Math.floor(Number(o.y) || 0));
      if (t) {
        if (t.user_id === me.id) return refuse('bad_order');
        if (ally.sameAlliance(me.id, t.user_id)) return refuse('same_alliance');   // never against a member of your own alliance
        if (t.shield > Date.now()) return refuse('target_protected');
        o.pvp = { uid: t.user_id, name: t.name, kind: o.kind === 'spy' ? 'spy' : 'attack' };
      } else if (o.kind === 'spy') return refuse('bad_order');
    }
    if (a === 'found') {                                           // the outpost: never on a base or on another outpost
      const x = Math.floor(Number(args && args[0]) || 0), y = Math.floor(Number(args && args[1]) || 0);
      if (Q.baseAt.get(x, y) || Q.opAt.get(x, y)) return refuse('tile_taken');
      const ft = args && args[2] === undefined ? 'rempart' : args && args[2];
      if (!OP_TYPES[ft] || Q.opOfT.get(me.id, ft)) return refuse('bad_order');
    }
    if (a === 'useItem' && Array.isArray(args) && /^truce_/.test(String(args[0])) && Q.atkIncoming.all(me.id).length) return refuse('attack_incoming');
    const qsig = st => { if (!st) return ''; const qs = [st.queue, st.op && st.op.queue, st.br && st.br.queue, st.queue2, st.op && st.op.queue2, st.br && st.br.queue2]; return JSON.stringify(qs.map(q => q && [q.slot, q.type, q.lvl, q.start, q.end])); };
    let q0 = ''; try { q0 = qsig(b && b.state ? JSON.parse(b.state) : null); } catch (e) {}
    const r = runFor(me, b, String(a || ''), Array.isArray(args) ? args.slice(0, 5) : [], lang);
    refusedOrder(me, ip, act, args, r.error); noteOrder(me, ip, req, act);
    if (!r.error && qsig(r.state) !== q0) ally.tellMates(me.id);   // a construction started, sped up or cancelled: the allies' Helps tab updates at once
    if (a === 'found' && !r.error) for (const [ft, k] of Object.entries(OP_TYPES)) { const o = r.state[k];
      if (!o || Q.opOfT.get(me.id, ft)) continue;
      try { Q.addOp.run(me.id, ft, o.x, o.y, Date.now()); loadOutposts(); log('AVANT-POSTE', `${me.name} a fondé son avant-poste ${ft === 'brasier' ? 'Brasier' : 'Rempart'} en (${o.x}, ${o.y})`); }
      catch (e) { log('ERREUR', `avant-poste de ${me.name} : ${e.message}`); } }
    if (a === 'reset' && !r.state.op && !r.state.br && Q.opOf.get(me.id)) { Q.delOp.run(me.id); loadOutposts(); }   // test button: the base starts again from zero, outpost included
    if (me.banned) return send(res, 403, { error: 'banned' });
    return send(res, 200, { state: r.state, events: r.events, error: r.error, serverTime: Date.now() });
  }
  if (url === '/api/pay/start' && req.method === 'POST') {   // a real-money purchase: the server opens the Stripe payment page (test server: simulated)
    if (panel.isMaint() && me.role !== 'admin') return send(res, 503, { error: 'maintenance' });
    if (beta.isOn()) return send(res, 403, { error: 'beta_shop' });   // no real-money purchase during the beta
    if (activeTok.has(me.id) && activeTok.get(me.id) !== me.token) return send(res, 409, { error: 'session_replaced' });
    const P0 = await readBody(req, 5_000);
    const origin = process.env.PUBLIC_URL ? process.env.PUBLIC_URL.replace(/\/$/, '') : `${req.headers['x-forwarded-proto'] || (req.socket.encrypted ? 'https' : 'http')}://${req.headers.host}`;
    return pay().start(req, res, me, P0, origin);
  }
  if (url === '/api/state' && req.method === 'PUT') { cheat(me, ip, 'tentative d\'envoyer une partie modifiée (PUT /api/state)'); return send(res, 403, { error: 'forbidden' }); }
  if (url === '/api/admin' && req.method === 'POST') return admin(req, res, me, ip);
  if (url === '/api/chest' && req.method === 'POST') return openChest(req, res, me, ip);
  if (url === '/api/players' && req.method === 'GET') { const now = Date.now(), an = ally.names();
    return send(res, 200, { players: Q.players.all(me.id).map(({ uid, cos, ...p }) => ({ ...p, cos: cos ? JSON.parse(cos) : null, shield: p.shield > now ? p.shield : 0, alliance: an.get(uid) || null })), outposts: Q.allOps.all() }); }
  if (url === '/api/alliance' && req.method === 'GET') return send(res, 200, ally.view(me));
  if (url === '/api/event' && req.method === 'GET') return send(res, 200, events.view(me));
  if (url === '/api/referral' && req.method === 'GET') return send(res, 200, referral.view(me));   // my invitation link, my friends, my rewards
  if (url === '/api/referral' && req.method === 'POST') { const P = await readBody(req, 5_000);
    try { return send(res, 200, referral.claim(me, P)); } catch (e) { if (!e.code) throw e; return send(res, e.code, { error: e.error }); } }
  if (url === '/api/bug' && req.method === 'POST') { const P = await readBody(req, 10_000);   // Settings › Report a bug: read in the panel
    try { return send(res, 200, beta.bug(me, P)); } catch (e) { if (!e.code) throw e; return send(res, e.code, { error: e.error }); } }
  if (url === '/api/account' && req.method === 'GET') return send(res, 200, acc.view(me));   // my e-mail address
  if (url === '/api/account' && req.method === 'POST') { const P = await readBody(req, 5_000);   // address, password, deletion
    try { const r = await acc.act(me, { ...P, lang: LANG_OK.includes(P.lang) ? P.lang : 'en' }); return send(res, 200, r); }
    catch (e) { if (!e.code) throw e; if (e.error === 'bad_login') blockIfTooMany(ip, strike(ip), 'mauvais mot de passe (compte)'); return send(res, e.code, { error: e.error }); } }
  if (url === '/api/push' && req.method === 'GET') return send(res, 200, notify.view(me));   // notifications: the game's public key, my settings
  if (url === '/api/push' && req.method === 'POST') { const P = await readBody(req, 5_000);
    try { return send(res, 200, notify.act(me, P)); } catch (e) { if (!e.code) throw e; return send(res, e.code, { error: e.error }); } }   // the tournament: tiers, my score, ranking
  if (url.startsWith('/api/chat')) {   // the chat: general, alliance, private
    try {
      const qs = new URLSearchParams(req.url.split('?')[1] || '');
      if (url === '/api/chat/sum' && req.method === 'GET') return send(res, 200, chat.summary(me));
      if (url === '/api/chat' && req.method === 'GET') return send(res, 200, chat.read(me, qs.get('ch'), qs.get('after')));
      if (url === '/api/chat' && req.method === 'POST') { const P = await readBody(req, 10_000); const r = chat.act(me, P); if (String(P.op || '') === 'send') { chatMission(me); if (r._pm) try { notify.onPm(r._pm, me.name, r.msg && r.msg.text); } catch (e) {} } delete r._pm; return send(res, 200, r); }
    } catch (e) { if (!e.code) throw e; return send(res, e.code, { error: e.error }); }
  }
  if (url === '/api/alliance' && req.method === 'POST') {
    const P = await readBody(req, 20_000); const op = clean(P.op);
    try { const r = ally.act(me, P); noteOrder(me, ip, req, 'ally:' + op); if (me.banned) return send(res, 403, { error: 'banned' }); return send(res, 200, { ...r, view: ally.view(me) }); }
    catch (e) { if (!e.code) throw e; if (e.error === 'bad_order') refusedOrder(me, ip, 'ally:' + op, [P.name || P.id || ''], 'bad_order'); return send(res, e.code, { error: e.error }); }
  }
  if (url === '/api/ranking' && req.method === 'GET') return send(res, 200, ranking(new URLSearchParams(req.url.split('?')[1] || '').get('by'), me.id));
  if (url === '/api/incoming' && req.method === 'GET') { const b = Q.base.get(me.id); return send(res, 200, { incoming: incomingFor(me.id, b && b.state ? JSON.parse(b.state) : {}) }); }
  return send(res, 404, { error: 'not_found' });
}
// an order the server refused. 'forbidden' and 'bad_order' never come from the normal game buttons
// (except a double click): they are logged. Game messages (not enough metal...) are normal and not logged.
function refusedOrder(me, ip, act, args, error) {
  if (error !== 'bad_order' && error !== 'forbidden') return;
  STATS.refused++; STATS.refusedBy.set(me.name, (STATS.refusedBy.get(me.name) || 0) + 1);
  let a = ''; try { a = JSON.stringify(args).slice(0, 120); } catch (e) {}
  if (error === 'forbidden') cheat(me, ip, `bouton de test interdit aux joueurs : ${act} ${a}`);
  else log('ORDRE REFUSÉ', `${me.name} · ${ip} · ${act || '(vide)'} ${a}`);
}

// ---------- ranking of the players: power, PvP victories, battles won (top 100 + the player's own place) ----------
// Blocked accounts are not ranked. Ties: the strongest first, then the oldest account. Computed at most every 20 seconds.
const RANK_BY = { power: 'b.power', pvp: 'b.pvp', wins: 'b.wins' }, RANK_TOP = 100, rankCache = new Map();
// alliances: total power of their members (blocked accounts left out), number of members, leader. Only names and numbers.
function allyRanking(uid) {
  let c = rankCache.get('ally');
  if (!c || Date.now() - c.at > 20_000) {
    const rows = db.prepare(`SELECT a.id, a.name, a.open, COUNT(u.id) AS members, COALESCE(SUM(b.power), 0) AS power,
        MAX(CASE WHEN m.role = 'leader' THEN u.name END) AS leader, ROW_NUMBER() OVER (ORDER BY COALESCE(SUM(b.power), 0) DESC, a.id) AS r
      FROM alliances a JOIN ally_members m ON m.aid = a.id JOIN users u ON u.id = m.user_id AND u.banned = 0 LEFT JOIN bases b ON b.user_id = u.id
      GROUP BY a.id`).all();
    const pub = x => ({ r: x.r, name: x.name, power: x.power, members: x.members, leader: x.leader || null, open: !!x.open });
    c = { at: Date.now(), top: rows.slice(0, RANK_TOP).map(pub), mine: new Map(rows.map(x => [x.id, pub(x)])), n: rows.length };
    rankCache.set('ally', c);
  }
  const m = db.prepare('SELECT aid FROM ally_members WHERE user_id = ?').get(uid);
  return { by: 'ally', top: c.top, me: m ? c.mine.get(m.aid) || null : null, n: c.n, at: c.at };
}
function ranking(by, uid) {
  if (by === 'ally') return allyRanking(uid);
  if (!Object.hasOwn(RANK_BY, by)) by = 'power';
  let c = rankCache.get(by);
  if (!c || Date.now() - c.at > 20_000) {
    const rows = db.prepare(`SELECT u.id, u.name, b.power, b.pvp, b.wins, ROW_NUMBER() OVER (ORDER BY ${RANK_BY[by]} DESC, b.power DESC, u.id) AS r
      FROM users u JOIN bases b ON b.user_id = u.id WHERE u.banned = 0`).all();
    const an = ally.names(), pub = x => ({ r: x.r, name: x.name, power: x.power, pvp: x.pvp, wins: x.wins, alliance: an.get(x.id) || null });   // never the position of the base
    c = { at: Date.now(), top: rows.slice(0, RANK_TOP).map(pub), mine: new Map(rows.map(x => [x.id, pub(x)])), n: rows.length };
    rankCache.set(by, c);
  }
  return { by, top: c.top, me: c.mine.get(uid) || null, n: c.n, at: c.at };
}

// ---------- running the game for one player ----------
const LANG_OK = ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl', 'tr', 'ru'];
const langOf = req => { const m = /[?&]lang=([a-z]{2})/.exec(req.url || ''); return m && LANG_OK.includes(m[1]) ? m[1] : 'en'; };
// What must be saved: everything except what grows by itself with time (resources, Titan repair, last tick).
// The engine always recomputes those from the saved time, so a visit that changed nothing else is not written.
function shape(s) {
  if (!s || !s.slots) return '';
  const { res, last, titan, ...rest } = s;
  return JSON.stringify(rest) + (titan ? JSON.stringify({ ...titan, hp: titan.hp >= 100 ? 100 : 0 }) : '');
}
// ---------- attacks between players ----------
const PVP = { beginnerMs: 3 * 86400_000, beginnerCC: 5 };   // no level gap: any commander can attack any other one
// beginner protection: 3 days, or until the Command Center reaches level 5, or until the player attacks someone
const beginnerEnd = (st, created) => (st && !st.attackedPlayer && ((st.slots || {}).cc || {}).lvl < PVP.beginnerCC) ? created + PVP.beginnerMs : 0;
const shieldOf = (st, created) => Math.max(beginnerEnd(st, created), (st && st.truce) || 0);
// the attacks table follows the marches of the attacker (speed-ups change the arrival time, a cancelled game removes them)
// ---------- live line to the open games: alerts and results are pushed at once (no waiting for the next check) ----------
const streams = new Map();   // user id -> open connections
function broadcast(ev, data) { const msg = `event: ${ev}\ndata: ${JSON.stringify(data)}\n\n`; for (const set of streams.values()) for (const r of set) { try { r.write(msg); } catch (e) {} } }
function push(uid, ev, data) { const set = streams.get(uid); if (!set) return; const msg = `event: ${ev}\ndata: ${JSON.stringify(data)}\n\n`; for (const r of set) { try { r.write(msg); } catch (e) {} } }
function pushIncoming(uid) { if (!streams.has(uid)) return; const b = Q.base.get(uid); push(uid, 'incoming', { incoming: incomingFor(uid, b && b.state ? JSON.parse(b.state) : {}) }); }
setInterval(() => { for (const set of streams.values()) for (const r of set) { try { r.write(': ping\n\n'); } catch (e) {} } }, 20000);   // keeps the line open through Cloudflare
function syncAttacks(uid, st) {
  const seen = new Set();
  for (const m of (st.marches || [])) {
    if (!m.pvp || m.st !== 'out') continue;
    seen.add(m.id);
    const row = Q.atkByMarch.get(uid, m.id);
    if (!row) { Q.atkAdd.run(uid, m.pvp, m.kind === 'spy' ? 'spy' : 'attack', m.id, m.s, m.a, m.a, JSON.stringify(m.troops || {}), m.titan ? 1 : 0); pushIncoming(m.pvp);
      try { const au = Q.user.get(uid); notify.onAttack(m.pvp, au ? au.name : '?', m.kind === 'spy' ? 'spy' : 'attack', m.a); } catch (e) { log('ERREUR', 'notification d\'attaque : ' + e.message); } }   // the target is warned at once
    else if (row.status === 'out' && row.arrive !== m.a) { Q.atkArrive.run(m.a, row.id); pushIncoming(m.pvp); }
  }
  for (const r of Q.atkOutOf.all(uid)) if (!seen.has(r.mid)) { Q.atkStatus.run('gone', null, r.id); pushIncoming(r.def); }
}
// the cosmetics the other players see (name colour, frame): only the ids the game knows, checked again by the browsers that show them
const COS_C = new Set(['#ffd54a', '#7fd3ff', '#ff7a66', '#8fe07a', '#c9a2ff']), COS_F = new Set(['steel', 'gold', 'elite']);
function pubCos(st) { const C = (st && st.cos) || {}, own = C.own || {}, V = (st && st.vip) || {}, o = {};
  const lv = Number.isInteger(V.lv) && V.lv >= 1 && V.lv <= 10 ? V.lv : 0;   // the VIP level computed by the engine (after the losses)
  const v = id => { const m = { color_gold: '#ffd54a', color_cyan: '#7fd3ff', color_red: '#ff7a66', color_green: '#8fe07a', color_violet: '#c9a2ff', frame_steel: 'steel', frame_gold: 'gold', frame_elite: 'elite' }; return m[id]; };
  if (C.c && own[C.c] && COS_C.has(v(C.c))) o.c = v(C.c); if (C.f && own[C.f] && COS_F.has(v(C.f))) o.f = v(C.f);
  if (C.f === 'frame_vip' && lv >= 10) o.f = 'vip';   // never sold: VIP 10 only
  if (V.show && lv) o.v = lv;   // the VIP badge, only if the player chose to show it
  if ((+st.champ || 0) > Date.now()) o.t = 1;
  if ((+st.champA || 0) > Date.now()) o.a = 1;
  if (st.betaVet === 1) o.b = 1;   // badge « Beta veteran » (the testers' reward)   // title « Champion alliance » (1st alliance of a challenge, 7 days)   // title « Champion » (1st of a tournament, 7 days)
  return Object.keys(o).length ? JSON.stringify(o) : null; }
function saveState(uid, created, r) {
  const ss = r.state.stats || {};
  Q.saveBase.run(JSON.stringify(r.state), r.lvl, r.power, Date.now(), shieldOf(r.state, created), (+ss.pvpWins || 0) + (+ss.pvpDef || 0), +ss.wins || 0, pubCos(r.state), uid); STATS.saved++;
  try { events.onSave(uid, r.power, r.state); } catch (e) { log('ERREUR', 'score d\'événement : ' + e.message); }
  try { if (typeof notify !== 'undefined') notify.onSave(uid, r.state, shieldOf(r.state, created)); } catch (e) { log('ERREUR', 'notifications : ' + e.message); }
  for (const [ft, k] of Object.entries(OP_TYPES)) if (r.state[k]) { const l = ((r.state[k].slots || {}).cc || {}).lvl || 1; Q.opLvl.run(l, uid, ft, l); }   // level shown on the map
  syncAttacks(uid, r.state);
}
function runFor(me, b, action, args, lang, force) {
  const st = b.state ? JSON.parse(b.state) : { pos: { x: b.x, y: b.y } };
  st.pos = { x: b.x, y: b.y };                                          // the position always comes from the server
  for (const [ft, k] of Object.entries(OP_TYPES)) if (st[k] && typeof st[k] === 'object') { const o = Q.opOfT.get(me.id, ft); if (o) { st[k].x = o.x; st[k].y = o.y; } }   // the outposts too
  const before = shape(st);
  const r = engine.run(st, LANG_OK.includes(lang) ? lang : 'en', action, args, me.role);
  r.state.pos = { x: b.x, y: b.y };
  if (force || action || r.events.length || !b.state || shape(r.state) !== before || b.lvl !== r.lvl || b.shield !== shieldOf(r.state, me.created)) saveState(me.id, me.created, r);
  else STATS.skipped++;
  return r;
}
// the 'send a message in the chat' mission: counted once a day per player (the game engine decides if it is a mission of his day)
const chatMis = new Map();
function chatMission(me) {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(Date.now()), k = me.id + ':' + day; if (chatMis.get(me.id) === k) return; chatMis.set(me.id, k);
  try { const u = Q.user.get(me.id), b = Q.base.get(me.id); if (!u || !b || !b.state) return;
    const r = runFor({ ...u, role: 'server' }, b, 'missionChat', [], 'fr', true); if (!r.error) push(me.id, 'sync', {}); } catch (e) { log('ERREUR', 'mission du chat : ' + e.message); }
}
// payments of the shop (server/pay.js), started on first use
let PAY = null;
const pay = () => PAY || (PAY = require('./pay')({ db, engine, log, send, push, runFor, Q, IS_TEST }));
// arrival of an attack or a spy mission: both bases are read, resolved together and saved
function resolveAttack(row) {
  const ab = Q.base.get(row.att), dbs = Q.base.get(row.def), au = Q.user.get(row.att), du = Q.user.get(row.def);
  if (!ab || !dbs || !au || !du || !ab.state) { Q.atkStatus.run('gone', null, row.id); return; }
  const ast = JSON.parse(ab.state); ast.pos = { x: ab.x, y: ab.y };
  const dst = dbs.state ? JSON.parse(dbs.state) : { pos: { x: dbs.x, y: dbs.y } }; dst.pos = { x: dbs.x, y: dbs.y };
  if (row.kind !== 'spy') { const rf = ally.reinfAt(row.def); if (Object.keys(rf).length) dst.reinf = rf; }   // allies' reinforcements defend with him
  const r = engine.pvp(ast, dst, row.mid, au.name, du.name);
  if (r.gone) { Q.atkStatus.run('gone', null, row.id); return; }
  r.att.pos = { x: ab.x, y: ab.y }; r.def.pos = { x: dbs.x, y: dbs.y };
  const rleft = r.def.reinfLeft; delete r.def.reinf; delete r.def.reinfLeft;
  if (rleft) ally.afterFight(row.def, rleft, au.name);
  Q.atkStatus.run('done', JSON.stringify(r.r).slice(0, 2000), row.id);
  saveState(row.att, au.created, { state: r.att, lvl: r.a.lvl, power: r.a.power });
  saveState(row.def, du.created, { state: r.def, lvl: r.d.lvl, power: r.d.power });
  push(row.att, 'sync', {}); push(row.def, 'sync', {}); pushIncoming(row.def);   // both games show the result and the report right away
  const loot = Object.entries((r.r && r.r.loot) || {}).map(([k, v]) => `${k} ${v}`).join(', ');
  if (r.kind === 'spy') log('ESPIONNAGE', `${au.name} → ${du.name} : ${r.r.ok ? 'réussi' : 'échoué'} (${r.r.killed} drone(s) abattu(s))`);
  else log('ATTAQUE', `${au.name} → ${du.name} : ${r.r.win ? 'victoire' : 'défaite'} · pertes attaquant ${r.r.attLost}, défenseur ${r.r.defLost} (puissance de combat)${loot ? ' · pillage ' + loot : ''}`);
}
setInterval(() => {
  const due = Q.atkDue.all(Date.now());
  for (const row of due) { try { resolveAttack(row); } catch (e) { log('ERREUR', `attaque ${row.id} : ${e.message}`); Q.atkStatus.run('error', String(e.message).slice(0, 200), row.id); } }
}, 1000).unref();
// alert for the defender: what the Radar Station and the Intelligence research reveal
function alertLevel(st) { let r = 0; for (const k in (st.slots || {})) if (st.slots[k].type === 'radar') r = Math.max(r, st.slots[k].lvl); return r + (((st.research || {}).lv || {}).intel || 0); }
const ALERT = { name: 1, eta: 4, count: 8, detail: 13 };
function incomingFor(uid, st) {
  const L = alertLevel(st || {});
  return Q.atkIncoming.all(uid).map(a => { const o = { id: a.id, kind: a.kind, level: L };
    const tr = JSON.parse(a.troops || '{}');
    if (L >= ALERT.name) o.name = a.aname;
    if (L >= ALERT.eta) o.eta = a.eta0;                                 // the time planned at departure: the attacker's speed-ups can make it wrong
    if (L >= ALERT.count) o.n = Object.values(tr).reduce((s, v) => s + v, 0);
    if (L >= ALERT.detail) { o.units = tr; o.titan = !!a.titan; }
    return o; });
}

// ---------- administration (admin and test accounts only) ----------
const RESS = ['metal', 'wood', 'stone', 'fuel', 'rations', 'gold', 'alloy', 'napalm'];
const UNIT_IDS = ['recruit', 'rifleman', 'sniper', 'assault', 'truck', 'drone', 'apc', 'tank', 'artillery', 'heli', 'gunship', 'mastodon', 'flamer'];
const TECH_IDS = ['extraction', 'forestry', 'rationing', 'refining', 'engineering', 'drill', 'ballistics', 'armor', 'medicine', 'logistics', 'engines', 'robotics', 'intel'];
const PROTO_KEYS = new Set([...Object.getOwnPropertyNames(Object.prototype), '__proto__']);   // names every object answers to: never a game name
const gameId = id => typeof id === 'string' && /^[a-z0-9_]{2,40}$/.test(id) && !PROTO_KEYS.has(id);
const int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
function createAccount(name, password, role) {
  const n = String(name || '').trim();
  if (!NAME_OK.test(n)) throw Object.assign(new Error('bad_name'), { code: 400 });
  if (String(password || '').length < 6) throw Object.assign(new Error('bad_password'), { code: 400 });
  if (Q.userByName.get(n)) throw Object.assign(new Error('name_taken'), { code: 409 });
  const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
  const id = Number(Q.addUser.run(n, salt, hashPass(String(password), salt), now).lastInsertRowid);
  const rl = ['player', 'tester', 'admin'].includes(role) ? role : 'player';
  Q.setRole.run(rl, id);
  const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
  return { n, rl };
}
// preset: an order from the management panel (already read and checked there)
async function admin(req, res, me, ip, preset) {
  if (!['admin', 'tester'].includes(me.role)) { cheat(me, ip, 'tentative d\'utiliser l\'administration'); return send(res, 403, { error: 'forbidden' }); }
  const { action, p: p0 } = preset || await readBody(req, 50_000), p = p0 && typeof p0 === 'object' ? p0 : {};
  if (action === 'accounts') return me.role === 'admin' ? send(res, 200, { accounts: Q.accounts.all() }) : send(res, 403, { error: 'forbidden' });
  if (action === 'create_account') {
    if (me.role !== 'admin') { cheat(me, ip, 'compte test : tentative de créer un compte'); return send(res, 403, { error: 'forbidden' }); }
    try { const c = createAccount(p.name, p.password, p.role); log('ADMIN', `${me.name} a créé le compte ${c.n} (${c.rl})`); return send(res, 200, { ok: true, name: c.n }); }
    catch (e) { return send(res, e.code || 500, { error: e.message }); }
  }
  if (action === 'unban') {
    if (me.role !== 'admin') { cheat(me, ip, 'compte test : tentative de débloquer un compte'); return send(res, 403, { error: 'forbidden' }); }
    const tu = Q.userByName.get(String(p.target || '').trim()); if (!tu) return send(res, 404, { error: 'unknown_player' });
    unbanPlayer(tu, me.name); return send(res, 200, { ok: true, name: tu.name });
  }
  // the administrator can give to any player (p.target = player name); test accounts only to themselves
  let who = me;
  if (p.target !== undefined && p.target !== null && p.target !== '') {
    if (me.role !== 'admin') { cheat(me, ip, 'compte test : tentative de donner à un autre joueur'); return send(res, 403, { error: 'forbidden' }); }
    if (!['give_res', 'give_item', 'give_troops', 'titan_part'].includes(action)) return send(res, 400, { error: 'unknown_action' });
    const tu = Q.userByName.get(String(p.target).trim());
    if (!tu) return send(res, 404, { error: 'unknown_player' });
    who = tu;
  }
  const b = Q.base.get(who.id);
  if (!b) return send(res, 404, { error: 'unknown_player' });
  const st = runFor(who, b, null, [], 'en').state;                     // up to date server copy
  const now = Date.now();
  st.res = st.res || {}; st.troops = st.troops || {}; st.inv = st.inv || {}; st.slots = st.slots || {}; st.research = st.research || { lv: {}, cur: null };
  switch (action) {
    case 'give_res': { const n = int(p.amount, 0, 1e10); if (p.res === 'credits') { st.credits = Math.floor(Number(st.credits) || 0) + Math.min(n, 1e7); break; } for (const r of (p.res === 'all' ? RESS : [p.res])) if (RESS.includes(r)) st.res[r] = (st.res[r] || 0) + n; break; }
    case 'give_item': { const id = String(p.id || ''); if (!gameId(id)) return send(res, 400, { error: 'bad_item' }); st.inv[id] = (st.inv[id] || 0) + int(p.n, 1, 100000); break; }
    case 'give_all_items': { for (const id of (Array.isArray(p.ids) ? p.ids : [])) if (gameId(id)) st.inv[id] = (st.inv[id] || 0) + int(p.n, 1, 1000); break; }
    case 'give_troops': { if (!UNIT_IDS.includes(p.u)) return send(res, 400, { error: 'bad_unit' }); st.troops[p.u] = (st.troops[p.u] || 0) + int(p.n, 1, 10_000_000); break; }
    case 'finish_all': {
      if (st.queue) st.queue.end = now; if (st.queue2) st.queue2.end = now;
      for (const k of ['op', 'br']) { const o = st[k]; if (!o) continue; if (o.queue) o.queue.end = now; if (o.queue2) o.queue2.end = now; for (const bl in (o.training || {})) for (const j of o.training[bl]) { j.s = now; j.e = now; } }
      if (st.research.cur) st.research.cur.e = now;
      for (const bl in (st.training || {})) for (const j of st.training[bl]) { j.s = now; j.e = now; }
      for (const m of (st.marches || [])) { if (m.st === 'out') { m.a = now; m.b = now + 1000; } else m.b = now; }
      break; }
    case 'set_buildings': { const l = int(p.lvl, 1, 10); for (const k in st.slots) st.slots[k].lvl = l; if (st.queue && st.queue.lvl <= l) st.queue = null;
      for (const ok of ['op', 'br']) { const o = st[ok]; if (o && o.slots) { for (const k in o.slots) o.slots[k].lvl = l; if (o.queue && o.queue.lvl <= l) o.queue = null; } } break; }
    case 'set_research': { const l = int(p.lvl, 0, 10); for (const t of TECH_IDS) { if (l) st.research.lv[t] = l; else delete st.research.lv[t]; }
      for (const t of ['outpost_rempart', 'mastodon_prog', 'outpost_brasier', 'flamer_prog']) { if (l) st.research.lv[t] = 1; else delete st.research.lv[t]; }   // the outpost researches have one level
      st.research.cur = null; break; }
    case 'titan': { st.titan = st.titan || { lvl: 1, xp: 0, hp: 100, away: false, parts: {} }; st.titan.lvl = int(p.lvl, 1, 10); st.titan.xp = 0; st.titan.hp = 100; st.titan.away = false;
      for (const k of ['op', 'br']) if (st[k] && st[k].titan) { const T = st[k].titan; T.lvl = st.titan.lvl; T.xp = 0; T.hp = 100; T.away = false; } break; }   // every Titan
    case 'titan_part': { st.titan = st.titan || { lvl: 1, xp: 0, hp: 100, away: false, parts: {} };   // gives one armor piece
      const pre = /^(r|b)_/.exec(String(p.s || '')), ok = pre ? (pre[1] === 'r' ? 'op' : 'br') : null, ps = pre ? String(p.s).slice(2) : p.s;   // r_xxx / b_xxx: a piece of the Rampart / Brasier Titan
      if (!['armor', 'weapon', 'reactor', 'legs'].includes(ps)) return send(res, 400, { error: 'bad_part' });
      if (ok) { const o = st[ok]; if (!o) return send(res, 400, { error: 'bad_part' }); o.titan = o.titan || { lvl: 1, xp: 0, hp: 100, away: false, parts: {} }; o.titan.parts = o.titan.parts || {}; if (!o.titan.parts[ps]) { o.titan.parts[ps] = 1; if (Object.keys(o.titan.parts).length === 4) o.titan.asm = 0; } }
      else { st.titan.parts = st.titan.parts || {}; if (!st.titan.parts[ps]) { st.titan.parts[ps] = 1; if (Object.keys(st.titan.parts).length === 4) st.titan.asm = 0; } } break; }   // the 4th piece: the armor waits to be assembled (as in the game)
    default: return send(res, 400, { error: 'unknown_action' });
  }
  b.state = JSON.stringify(st);
  const r = runFor(who, b, null, [], p.lang || 'en', true);             // finishes what the admin action completed
  const { lang, target, ...shown } = p || {};
  log('ADMIN', `${me.name} (${me.role})${who !== me ? ' → ' + who.name : ''} · ${action}${action === 'give_all_items' ? '' : ' ' + JSON.stringify(shown).slice(0, 160)}`);
  if (who !== me) return send(res, 200, { ok: true, target: who.name, lvl: r.lvl, power: r.power });   // another player: his game is not sent back
  return send(res, 200, { ok: true, state: r.state, events: r.events });
}

// ---------- mystery chests: opened by the game engine on the server (secure random draw) ----------
async function openChest(req, res, me, ip) {
  const { id, count = 1, lang } = await readBody(req, 10_000);
  if (!gameId(id) || !Object.hasOwn(LOOT, id)) return send(res, 400, { error: 'bad_chest' });
  const r = runFor(me, Q.base.get(me.id), 'useItem', [id, count > 1], lang);
  refusedOrder(me, ip, 'chest', [id], r.error); noteOrder(me, ip, req, 'chest');
  if (me.banned) return send(res, 403, { error: 'banned' });
  return send(res, 200, { ok: !r.error, error: r.error, state: r.state, events: r.events });
}

// ---------- static files (the game itself): kept in memory, compressed once ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg' };
const TEXT = new Set(['.html', '.js', '.css', '.json', '.svg']);
const fileCache = new Map();   // path -> {data, br, gz, etag, type, mtime}
function loadFile(file, cb) {
  fs.stat(file, (err, s) => {
    if (err || !s.isFile()) return cb(err || new Error('not a file'));
    const c = fileCache.get(file);
    if (c && c.mtime === s.mtimeMs && c.size === s.size) return cb(null, c);
    fs.readFile(file, (err2, data) => {
      if (err2) return cb(err2);
      const ext = path.extname(file).toLowerCase();
      const e = { data, type: TYPES[ext] || 'application/octet-stream', mtime: s.mtimeMs, size: s.size, etag: '"' + crypto.createHash('sha1').update(data).digest('base64url').slice(0, 20) + '"' };
      if (TEXT.has(ext) && data.length > 1024) {
        e.br = zlib.brotliCompressSync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 9 } });
        e.gz = zlib.gzipSync(data, { level: 9 });
      }
      if (s.size < 20_000_000) fileCache.set(file, e);
      cb(null, e);
    });
  });
}
// the browser's own protections: the game cannot be shown inside another site, files keep their type, no address leaks to other sites
const SEC_HEADERS = { 'X-Frame-Options': 'DENY', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "script-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'", 'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()' };
function serveFile(req, res, url) {
  const adm = url === '/admin' || url === '/admin/' || url === '/admin.html';   // the management panel: a page of its own, without the game
  if ((adm || url === '/js/admin.js' || url === '/css/admin.css') && !fromHome(req)) { panelOutside(ipOf(req), url); res.writeHead(404); return res.end('Not found'); }
  if (url === '/manifest.json' || url === '/manifest-test.json') {   // the app's name and icons: « Bastion Test » on the test server, never kept in a cache
    const m = fs.readFileSync(path.join(ROOT, IS_TEST ? 'manifest-test.json' : 'manifest.json'));
    res.writeHead(200, { ...SEC_HEADERS, 'Content-Type': 'application/manifest+json; charset=utf-8', 'Cache-Control': 'no-cache, no-store, must-revalidate' }); return res.end(m);
  }
  if (url === '/' || url === '/index.html' || adm) {   // the page itself: never kept in any cache
    if (adm && !adminPage) adminPage = buildIndex('admin.html'); else if (!adm && !indexPage) indexPage = buildIndex();
    const pg = adm ? adminPage : indexPage;
    const ae = String(req.headers['accept-encoding'] || ''), h = { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-store', 'Vary': 'Accept-Encoding' };
    if (adm) h['X-Robots-Tag'] = 'noindex';
    Object.assign(h, SEC_HEADERS);
    let body = pg.data;
    if (/\bbr\b/.test(ae)) { body = pg.br; h['Content-Encoding'] = 'br'; } else if (/\bgzip\b/.test(ae)) { body = pg.gz; h['Content-Encoding'] = 'gzip'; }
    h['Content-Length'] = body.length; res.writeHead(200, h); return res.end(req.method === 'HEAD' ? undefined : body);
  }
  const stamped = /[?&]v=/.test(req.url || '');
  const file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  const rel = path.relative(ROOT, file).split(path.sep)[0];
  if (file !== ROOT && !file.startsWith(ROOT + path.sep) || ['server', 'data', '.git', 'node_modules', 'package.json', 'tools', 'tests', 'CLAUDE.md', 'README.md'].includes(rel)) { res.writeHead(403); return res.end('Forbidden'); }
  loadFile(file, (err, e) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const h = { ...SEC_HEADERS, 'Content-Type': e.type, 'ETag': e.etag, 'Vary': 'Accept-Encoding', 'Cache-Control': stamped ? 'public, max-age=31536000, immutable' : /\.(webp|jpg|png|woff2)$/.test(file) ? 'public, max-age=86400' : 'no-cache' };   // a stamped file never changes: a new version has a new address
    if (req.headers['if-none-match'] === e.etag) { res.writeHead(304, h); return res.end(); }
    const ae = String(req.headers['accept-encoding'] || '');
    let body = e.data;
    if (e.br && /\bbr\b/.test(ae)) { body = e.br; h['Content-Encoding'] = 'br'; }
    else if (e.gz && /\bgzip\b/.test(ae)) { body = e.gz; h['Content-Encoding'] = 'gzip'; }
    h['Content-Length'] = body.length;
    res.writeHead(200, h); res.end(req.method === 'HEAD' ? undefined : body);
  });
}

http.createServer(async (req, res) => {
  let url; try { url = decodeURIComponent((req.url || '/').split('?')[0]); } catch { res.writeHead(400); return res.end(); }
  if (url.startsWith('/api/')) {
    const ip = ipOf(req); res.t0 = process.hrtime.bigint();
    try { await api(req, res, url, ip); }
    catch (e) {
      if (e.bad) { cheat(null, ip, `requête illisible ou trop grosse sur ${clean(url)}`); if (!res.headersSent) send(res, 400, { error: 'bad_request' }); }
      else { log('ERREUR', `${clean(url)} · ${e.message}`); if (!res.headersSent) send(res, 500, { error: 'server_error' }); }
    }
    if (url !== '/api/ping' && url !== '/api/health' && url !== '/api/stream') {
      const ms = Number(process.hrtime.bigint() - res.t0) / 1e6;
      STATS.apiN++; STATS.apiMs += ms; if (ms > STATS.apiMax) { STATS.apiMax = ms; STATS.apiMaxUrl = url; }
    }
    return;
  }
  if (/^\/r\/[^/]{1,40}$/.test(url)) {   // an invitation link: mekanikwar.com/r/<name> -> the game, with the name of the referrer
    const n = encodeURIComponent(url.slice(3)); res.writeHead(302, { Location: (site.isSiteHost(req.headers.host) ? site.PLAY : '/') + '?ref=' + n, 'Cache-Control': 'no-cache' }); return res.end(); }
  if ((url === '/site' || url.startsWith('/site/') || site.isSiteHost(req.headers.host)) && site.handle(req, res, url, req.headers.host, SEC_HEADERS)) return;
  serveFile(req, res, url);
}).listen(PORT, '0.0.0.0', () => { log('DÉMARRAGE', `Serveur Mekanik War sur le port ${PORT} · version ${VERSION} · ${Q.count.get().n} joueurs inscrits`);
  if (process.env.BASTION_CRASHED) log('ERREUR', `Le jeu avait planté (${clean(process.env.BASTION_CRASHED)}) : redémarré automatiquement par le lanceur`); });

// ---------- hourly summary in the console ----------
function summary() {
  const s = STATS; STATS = newStats();
  const avg = s.apiN ? (s.apiMs / s.apiN).toFixed(1) : '0';
  const suspects = [...s.refusedBy].filter(([, n]) => n >= 20).map(([n, k]) => `${n} (${k})`);
  log('BILAN', `Dernière heure : ${s.players.size} joueur(s) actif(s) · connexions ${s.loginOk} OK / ${s.loginFail} échouée(s) · ${s.registered} inscription(s)`);
  log('BILAN', `Sécurité : ${s.blockedIps.size} adresse(s) bloquée(s)${s.blockedIps.size ? ' (' + [...s.blockedIps].slice(0, 10).join(', ') + ')' : ''}, ${s.blockedHits} essai(s) rejeté(s) pendant un blocage · ${s.refused} ordre(s) refusé(s) · ${s.cheat} triche(s) possible(s)`
    + (suspects.length ? ` · à surveiller : ${suspects.join(', ')}` : ''));
  log('BILAN', `Serveur : ${s.apiN} requête(s), ${avg} ms en moyenne, maximum ${s.apiMax.toFixed(1)} ms${s.apiMaxUrl ? ' (' + s.apiMaxUrl + ')' : ''} · parties enregistrées ${s.saved}, inchangées ${s.skipped} · mémoire ${Math.round(process.memoryUsage().rss / 1048576)} Mo`);
}
const toNextHour = 3600_000 - (Date.now() % 3600_000);
setTimeout(() => { summary(); setInterval(summary, 3600_000).unref(); }, toNextHour).unref();
if (+process.env.BASTION_SUMMARY_MS) setInterval(summary, +process.env.BASTION_SUMMARY_MS).unref();   // tests only

// ---------- nightly copy of the database: data/backups/bastion-YYYY-MM-DD.db, the 7 latest are kept ----------
// Made once a day after 4 a.m. (server time), or at start-up if today's copy is missing and it is past 4 a.m.
// The copy is taken while the game runs: the players notice nothing.
const BACKUP_DIR = path.join(DATA, 'backups'), BACKUP_KEEP = +process.env.BACKUP_KEEP || 7, BACKUP_HOUR = 4;
const DAY_FMT = new Intl.DateTimeFormat('en-CA', { timeZone: SERVER_TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
const HOUR_FMT = new Intl.DateTimeFormat('en-GB', { timeZone: SERVER_TZ, hour: '2-digit', hourCycle: 'h23' });
function backupDb(force) {
  try {
    if (!force && +HOUR_FMT.format(new Date()) < BACKUP_HOUR) return;
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
    const file = path.join(BACKUP_DIR, `bastion-${DAY_FMT.format(new Date())}.db`);
    if (fs.existsSync(file)) { if (!force) return; fs.unlinkSync(file); }   // asked from the console: today's copy is made again
    const t0 = Date.now();
    db.exec(`VACUUM INTO '${file.replace(/'/g, "''")}'`);
    setTimeout(() => mailBackup(file), 2000);
    const old = fs.readdirSync(BACKUP_DIR).filter(f => /^bastion-\d{4}-\d{2}-\d{2}\.db$/.test(f)).sort().reverse().slice(BACKUP_KEEP);
    for (const f of old) fs.unlinkSync(path.join(BACKUP_DIR, f));
    log('SAUVEGARDE', `Copie de la base : backups/${path.basename(file)} (${Math.round(fs.statSync(file).size / 1024)} Ko, ${Date.now() - t0} ms)${old.length ? ' · ' + old.length + ' ancienne(s) supprimée(s)' : ''}`);
  } catch (e) { log('ERREUR', 'sauvegarde de la base : ' + e.message); }
}
// a copy outside the house: the day's copy, compressed, sent by e-mail (official server: to the game's mailbox, kept at OVH)
// BACKUP_EMAIL (Pelican variable) chooses another address; on the test server nothing is sent unless BACKUP_EMAIL is set
function mailBackup(file) {
  try {
    const to = process.env.BACKUP_EMAIL || (IS_TEST ? '' : acc.SMTP_USER);
    if (!to || /^(off|0|non)$/i.test(to) || !acc.mailOn()) return;
    const gz = zlib.gzipSync(fs.readFileSync(file), { level: 9 }), name = path.basename(file) + '.gz';
    if (gz.length > 15 * 1048576) { log('SAUVEGARDE', `copie trop grosse pour l'e-mail (${Math.round(gz.length / 1048576)} Mo) : non envoyée, elle reste dans data/backups`); return; }
    acc.sendMail(to, `Sauvegarde ${name.slice(8, 18)}`, `Copie de sauvegarde de la base du jeu (${name}, ${Math.round(gz.length / 1024)} Ko).\n\nGarde ce message : en cas de panne du serveur, cette pièce jointe permet de tout remettre en place.`, '', '', { name, type: 'application/gzip', data: gz })
      .then(ok => { if (ok) log('SAUVEGARDE', `copie envoyée par e-mail hors de la maison (${Math.round(gz.length / 1024)} Ko)`); })
      .catch(e => log('ERREUR', 'envoi de la sauvegarde par e-mail : ' + e.message));
  } catch (e) { log('ERREUR', 'envoi de la sauvegarde par e-mail : ' + e.message); }
}
setTimeout(() => backupDb(), 60_000).unref();
setInterval(() => backupDb(), 30 * 60_000).unref();
if (process.env.BACKUP_NOW) setTimeout(() => backupDb(true), 500).unref();   // tests only

// forget sessions unused for 30 days
setInterval(() => Q.oldSessions.run(Date.now() - 30 * 86400_000), 3600_000).unref();

// ---------- commands typed in the Pelican console (only the server owner has access to it) ----------
// aide · roles · joueurs · admin <pseudo> · testeur <pseudo> · joueur <pseudo> · sauvegarde
const ROLE_FR = { admin: 'administrateur', tester: 'compte de test', player: 'joueur normal' };
function consoleCommand(line) {
  const txt = String(line || '').trim(); if (!txt) return;
  const sp = txt.indexOf(' '), cmd = (sp < 0 ? txt : txt.slice(0, sp)).toLowerCase(), arg = sp < 0 ? '' : txt.slice(sp + 1).trim();
  const out = m => log('CONSOLE', m);
  if (cmd === 'aide' || cmd === 'help') {
    out('Commandes : roles (qui a des droits) · joueurs (liste des joueurs) · admin <pseudo> · testeur <pseudo> · joueur <pseudo> (repasse en joueur normal) · sauvegarde (copie de la base tout de suite) · bloques (comptes bloqués pour script) · rapport <pseudo> (pourquoi il est bloqué) · debloquer <pseudo>'); return; }
  if (cmd === 'sauvegarde' || cmd === 'backup') { backupDb(true); return; }
  if (cmd === 'bloques' || cmd === 'bloqués' || cmd === 'bannis') {
    const list = Q.bannedList.all();
    out(list.length ? `${list.length} compte(s) bloqué(s) : ` + list.map(u => `${u.name} (${STAMP.format(new Date(u.banned))}, ${u.reason || '?'})`).join(' · ') + ' · tape « rapport <pseudo> »' : 'aucun compte bloqué'); return; }
  if (cmd === 'rapport') {
    const u = arg && Q.userByName.get(arg); if (!u) { out(arg ? `Joueur introuvable : ${arg}` : 'Il manque le pseudo : rapport <pseudo>'); return; }
    const b = Q.lastBan.get(u.id); if (!b) { out(`${u.name} n'a jamais été bloqué`); return; }
    let d = {}; try { d = JSON.parse(b.detail || '{}'); } catch (e) {}
    out(`RAPPORT ${u.name} · ${u.banned ? 'BLOQUÉ' : 'débloqué depuis'} · bloqué le ${STAMP.format(new Date(b.at))}`);
    out(`Raison : ${REASON_FR[b.reason] ? REASON_FR[b.reason](d) : b.reason}`);
    out(`Adresse : ${d.ip || '?'} · Navigateur : ${d.ua || '?'}`);
    const last = (d.last || []).map(([t, a], i, L) => `${STAMP.format(new Date(t)).slice(-8)}${i ? ' (+' + ((t - L[i - 1][0]) / 1000).toFixed(1) + ' s)' : ''} ${a}`);
    out(last.length ? `Derniers ordres : ${last.join(' · ')}` : 'Derniers ordres : aucun (requêtes hors du jeu)'); return; }
  if (cmd === 'debloquer' || cmd === 'débloquer') {
    const u = arg && Q.userByName.get(arg); if (!u) { out(arg ? `Joueur introuvable : ${arg}` : 'Il manque le pseudo : debloquer <pseudo>'); return; }
    if (!u.banned) { out(`${u.name} n'est pas bloqué`); return; }
    unbanPlayer(u, 'la console'); return; }
  if (cmd === 'roles') {
    const list = db.prepare("SELECT name, role FROM users WHERE role != 'player' ORDER BY role, name").all();
    out(list.length ? list.map(u => `${u.name} (${ROLE_FR[u.role] || u.role})`).join(' · ') : 'aucun compte avec des droits'); return; }
  if (cmd === 'joueurs') {
    const list = db.prepare('SELECT u.name, u.role, b.lvl, b.power FROM users u LEFT JOIN bases b ON b.user_id = u.id ORDER BY b.power DESC').all();
    out(`${list.length} joueur(s) : ` + list.slice(0, 60).map(u => `${u.name} niv. ${u.lvl || 1}${u.role !== 'player' ? ' [' + (ROLE_FR[u.role] || u.role) + ']' : ''}`).join(' · ') + (list.length > 60 ? ' …' : '')); return; }
  const ROLES = { admin: 'admin', testeur: 'tester', joueur: 'player' };
  if (ROLES[cmd]) {
    if (!arg) { out(`Il manque le pseudo : ${cmd} <pseudo>`); return; }
    const u = Q.userByName.get(arg);
    if (!u) { out(`Joueur introuvable : ${arg} (tape « joueurs » pour voir la liste)`); return; }
    if (u.name.toLowerCase() === ADMIN_NAME.toLowerCase() && ROLES[cmd] !== 'admin') { out(`${u.name} est le compte principal : il reste toujours administrateur`); return; }
    if (ROLES[cmd] === 'tester' && !IS_TEST) { out('Pas de compte de test sur le serveur officiel : les tests se font sur le serveur de test'); return; }
    if (u.role === ROLES[cmd]) { out(`${u.name} est déjà ${ROLE_FR[u.role]}`); return; }
    Q.setRole.run(ROLES[cmd], u.id);
    log('ADMIN', `Console : ${u.name} passe ${ROLE_FR[ROLES[cmd]]} (avant : ${ROLE_FR[u.role] || u.role})`);
    push(u.id, 'reload', {});   // his open game reloads with the new rights
    return; }
  out(`Commande inconnue : ${cmd} · tape « aide »`);
}
try { require('readline').createInterface({ input: process.stdin, terminal: false }).on('line', l => { try { consoleCommand(l); } catch (e) { log('ERREUR', 'commande console : ' + e.message); } }); }
catch (e) { log('ERREUR', 'console indisponible : ' + e.message); }

// ---------- alliances ----------
const ally = require('./alliance.js')({ db, Q, log, clean, push, runFor, DAY_FMT });
// a stat of the quests that only the server sees (alliance joined, help given): written in the player's game
function statSet(uid, k) { try { const u = Q.user.get(uid), b = Q.base.get(uid); if (!u || !b || !b.state) return; const r = runFor({ ...u, role: 'server' }, b, 'statSet', [k], 'fr', true); if (!r.error) push(uid, 'sync', {}); } catch (e) { log('ERREUR', 'statistique de quête : ' + e.message); } }
ally.hooks.act = (uid, kind, other) => { try { events.onAct(uid, kind, other); } catch (e) { log('ERREUR', 'défi d\'alliance : ' + e.message); } if (kind === 'help') statSet(uid, 'helps'); };
ally.hooks.join = uid => statSet(uid, 'ally');
// accounts: e-mail, forgotten password, deletion (server/account.js)
const acc = require('./account.js')({ db, Q, log, hashPass, IS_TEST, ADMIN_NAME, ally,
  onDelete: u => { push(u.id, 'kick', {}); const set = streams.get(u.id); if (set) for (const r of set) { try { r.end(); } catch (e) {} } streams.delete(u.id); loadOutposts(); } });
// players already in an alliance before this version: the quest « join an alliance » is noted once
setTimeout(() => { let n = 0; for (const r of db.prepare("SELECT m.user_id AS uid FROM ally_members m JOIN bases b ON b.user_id = m.user_id WHERE b.state IS NOT NULL AND COALESCE(json_extract(b.state, '$.stats.ally'), 0) = 0").all()) { statSet(r.uid, 'ally'); n++; } if (n) log('QUÊTES', `alliance notée pour ${n} membre(s) déjà en alliance`); }, 3000).unref();   // help and reinforcements count for the Alliance Challenge
// ---------- chat ----------
const chat = require('./chat.js')({ db, Q, log, clean, push, broadcast, ally });
const events = require('./event.js')({ db, Q, log, runFor, broadcast, push, engine, IS_TEST });
// push notifications (server/notify.js): nothing is sent while the game is open
const notify = require('./notify.js')({ db, log, engine, online: uid => streams.has(uid), Q, IS_TEST });
const kvOnce = k => { if (db.prepare('SELECT 1 FROM kv WHERE k = ?').get(k)) return false; db.prepare('INSERT OR REPLACE INTO kv (k, v) VALUES (?, ?)').run(k, '1'); return true; };
events.hooks.start = e => { if (kvOnce('evstart_' + e.id)) notify.sendAll(e.type === 'ally' ? 'alstart' : 'evstart', {}); };
events.hooks.last = e => { if (kvOnce('evlast_' + e.id)) notify.sendAll(e.type === 'ally' ? 'allast' : 'evlast', {}); };

// ---------- the beta test (server/beta.js): sign-ups of the website, beta mode, invitations, reward, bug reports ----------
const beta = require('./beta.js')({ db, Q, log, clean, acc: () => acc, runFor, push, NAME_OK, IS_TEST });
// ---------- referral (server/referral.js): invitation links, rewards of the referrer and of the friend ----------
const referral = require('./referral.js')({ db, Q, log, clean, runFor, push, lastIp });
// ---------- the public website mekanikwar.com (server/site.js): home page, wiki built from the game rules, news, rankings ----------
const siteStats = { at: 0, v: null };
// the visits of the website (server/visits.js): no cookie, no address kept; read in the panel (Visites)
const visits = require('./visits.js')({ db, log, DAY_FMT });
const site = require('./site.js')({ engine, IS_TEST, log, beta, onView: (req, page) => visits.hit(req, ipOf(req), page),
  stats: () => { if (!siteStats.v || Date.now() - siteStats.at > 60_000) { siteStats.at = Date.now();
    siteStats.v = { players: db.prepare('SELECT COUNT(*) AS n FROM users WHERE banned = 0').get().n, alliances: db.prepare('SELECT COUNT(*) AS n FROM alliances').get().n }; } return siteStats.v; },
  ranking: by => { const r = ranking(by, 0); if (IS_TEST || by === 'ally') return r;   // the administrator of the official server is never ranked
    const adm = new Set(db.prepare("SELECT name FROM users WHERE role = 'admin'").all().map(x => x.name)); let n = 0;
    return { ...r, top: r.top.filter(x => !adm.has(x.name)).map(x => ({ ...x, r: ++n })) }; } });

// ---------- management panel (/admin): maintenance, updates, players, announcements, backups, journal ----------
const panel = require('./panel.js')({
  db, Q, log, send, readBody, broadcast, push, streams, onlineSince, lastIp, watch, cheat, clean, STAMP,
  ROOT, DATA, ADMIN_NAME, IS_TEST, GIT, PATCH_ID, VERSION, STARTED, REASON_FR, NAME_OK,
  BACKUP_DIR, backupDb: () => backupDb(true), createAccount, unbanPlayer, admin, engine, UNIT_IDS,
  orderBucket, chat, events, acc: () => acc, beta, visits,
});
