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
const DATA = path.join(ROOT, 'data');                       // never in git: holds the database
const PORT = +process.env.SERVER_PORT || +process.env.PORT || 8080;   // Pelican gives the port in SERVER_PORT
const MAPN = 750;
fs.mkdirSync(DATA, { recursive: true });

// ---------- console log (in French: it is read by the server owner in the Pelican console) ----------
const STAMP = new Intl.DateTimeFormat('fr-FR', { timeZone: SERVER_TZ, day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const clean = v => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, '?').slice(0, 40);   // a name typed by anybody: no line breaks in the log
function log(tag, msg) { console.log(`[${STAMP.format(new Date())}] [${tag}] ${msg}`); }

// ---------- database ----------
const db = new DatabaseSync(path.join(DATA, 'bastion.db'));
db.exec(`PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE COLLATE NOCASE, salt TEXT NOT NULL, hash TEXT NOT NULL, created INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created INTEGER NOT NULL, seen INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS bases (user_id INTEGER PRIMARY KEY, x INTEGER NOT NULL, y INTEGER NOT NULL, lvl INTEGER NOT NULL DEFAULT 1, power INTEGER NOT NULL DEFAULT 0,
    state TEXT, updated INTEGER NOT NULL DEFAULT 0);
  CREATE UNIQUE INDEX IF NOT EXISTS bases_pos ON bases (x, y);`);
// roles: player · tester (test account with every power) · admin (can also create accounts)
if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'role'").get()) db.exec("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'player'");
if (!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get()) {   // the very first account becomes the administrator
  const first = db.prepare('SELECT id, name FROM users ORDER BY id LIMIT 1').get();
  if (first) { db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(first.id); log('ADMIN', `Administrateur : ${first.name}`); }
}
const Q = {
  userByName: db.prepare('SELECT * FROM users WHERE name = ?'),
  addUser: db.prepare('INSERT INTO users (name, salt, hash, created) VALUES (?, ?, ?, ?)'),
  addSession: db.prepare('INSERT INTO sessions (token, user_id, created, seen) VALUES (?, ?, ?, ?)'),
  session: db.prepare('SELECT s.token, u.id, u.name, u.role FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?'),
  seen: db.prepare('UPDATE sessions SET seen = ? WHERE token = ?'),
  delSession: db.prepare('DELETE FROM sessions WHERE token = ?'),
  oldSessions: db.prepare('DELETE FROM sessions WHERE seen < ?'),
  base: db.prepare('SELECT * FROM bases WHERE user_id = ?'),
  addBase: db.prepare('INSERT INTO bases (user_id, x, y, updated) VALUES (?, ?, ?, ?)'),
  saveBase: db.prepare('UPDATE bases SET state = ?, lvl = ?, power = ?, updated = ? WHERE user_id = ?'),
  allPos: db.prepare('SELECT x, y FROM bases'),
  players: db.prepare('SELECT u.name, b.x, b.y, b.lvl, b.power FROM bases b JOIN users u ON u.id = b.user_id WHERE b.user_id != ?'),
  count: db.prepare('SELECT COUNT(*) AS n FROM users'),
  setRole: db.prepare('UPDATE users SET role = ? WHERE id = ?'),
  accounts: db.prepare('SELECT u.name, u.role, u.created, b.lvl, b.power, b.updated FROM users u LEFT JOIN bases b ON b.user_id = u.id ORDER BY u.id'),
};

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
const seenAt = new Map();   // the "last seen" time of a session is written at most once a minute (fewer database writes)
function auth(req) {
  const m = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || ''); if (!m) return null;
  const s = Q.session.get(m[1]); if (!s) return null;
  const now = Date.now(); if (now - (seenAt.get(m[1]) || 0) > 60_000) { seenAt.set(m[1], now); Q.seen.run(now, m[1]); }
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
}, 5 * 60_000).unref();
// a free spot for a new base: on the tile grid, away from the map edges and from other players
function freeSpot() {
  const used = Q.allPos.all();
  for (let i = 0; i < 500; i++) {
    const x = 2 * Math.floor((80 + Math.random() * (MAPN - 160)) / 2), y = 2 * Math.floor((80 + Math.random() * (MAPN - 160)) / 2);
    if (used.every(p => Math.abs(p.x - x) + Math.abs(p.y - y) >= 8)) return { x, y };
  }
  throw new Error('map full');
}
const NAME_OK = /^[\p{L}\p{N}_\- ]{3,16}$/u;
// behind the Cloudflare tunnel every request comes from the tunnel: the real player address is in CF-Connecting-IP
function ipOf(req) {
  const r = (req.socket.remoteAddress || '?').replace(/^::ffff:/, '');
  const local = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|^::1$/.test(r);
  return clean((local && req.headers['cf-connecting-ip']) || r);
}
function cheat(me, ip, what) { STATS.cheat++; log('TRICHE?', `${me ? me.name : '(non connecté)'} · ${ip} · ${what}`); }

// ---------- API ----------
async function api(req, res, url, ip) {
  if (url === '/api/ping') return send(res, 200, { t: Date.now(), tz: SERVER_TZ });
  if (url === '/api/health') return send(res, 200, { ok: true, game: 'Bastion', players: Q.count.get().n, uptime: Math.round(process.uptime()) });

  if (url === '/api/register' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    blockIfTooMany(ip, strike(ip), 'créations de compte');          // every new account counts: no flood of accounts
    const { name = '', password = '' } = await readBody(req, 10_000);
    const n = String(name).trim();
    if (!NAME_OK.test(n)) return send(res, 400, { error: 'bad_name' });
    if (String(password).length < 6 || String(password).length > 100) return send(res, 400, { error: 'bad_password' });
    if (Q.userByName.get(n)) return send(res, 409, { error: 'name_taken' });
    const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
    const id = Number(Q.addUser.run(n, salt, hashPass(String(password), salt), now).lastInsertRowid);
    if (Q.count.get().n === 1) { Q.setRole.run('admin', id); log('ADMIN', `Administrateur : ${n}`); }
    const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
    const token = crypto.randomBytes(32).toString('hex'); Q.addSession.run(token, id, now, now);
    STATS.registered++; STATS.players.add(n);
    log('INSCRIPTION', `${n} · ${ip} · base en (${p.x}, ${p.y})`);
    return send(res, 200, { token, name: n });
  }
  if (url === '/api/login' && req.method === 'POST') {
    if (isBlocked(ip)) return send(res, 429, { error: 'too_many' });
    const { name = '', password = '' } = await readBody(req, 10_000);
    const u = Q.userByName.get(String(name).trim());
    if (!u || !crypto.timingSafeEqual(Buffer.from(hashPass(String(password), u.salt), 'hex'), Buffer.from(u.hash, 'hex'))) {
      STATS.loginFail++;
      const n = strike(ip);
      log('CONNEXION ÉCHOUÉE', `${clean(String(name).trim()) || '(vide)'} · ${ip} · ${u ? 'mauvais mot de passe' : 'compte inconnu'} · essai ${n} en une minute`);
      blockIfTooMany(ip, n, 'connexions échouées');
      return send(res, 401, { error: 'bad_login' });
    }
    const token = crypto.randomBytes(32).toString('hex'), now = Date.now(); Q.addSession.run(token, u.id, now, now);
    STATS.loginOk++; STATS.players.add(u.name);
    log('CONNEXION OK', `${u.name} · ${ip}${u.role !== 'player' ? ' · ' + u.role : ''}`);
    return send(res, 200, { token, name: u.name });
  }
  const me = auth(req);
  if (!me) return send(res, 401, { error: 'not_logged_in' });
  STATS.players.add(me.name);
  if (url === '/api/logout' && req.method === 'POST') { Q.delSession.run(me.token); seenAt.delete(me.token); log('DÉCONNEXION', `${me.name} · ${ip}`); return send(res, 200, { ok: true }); }
  if (url === '/api/state' && req.method === 'GET') {
    const b = Q.base.get(me.id), r = runFor(me, b, null, [], langOf(req));
    return send(res, 200, { name: me.name, role: me.role, pos: { x: b.x, y: b.y }, state: r.state, events: r.events, serverTime: Date.now() });
  }
  if (url === '/api/act' && req.method === 'POST') {             // one order from the player: checked and run by the server
    const { a, args = [], lang } = await readBody(req, 20_000);
    const b = Q.base.get(me.id), act = clean(a), r = runFor(me, b, String(a || ''), Array.isArray(args) ? args.slice(0, 5) : [], lang);
    refusedOrder(me, ip, act, args, r.error);
    return send(res, 200, { state: r.state, events: r.events, error: r.error, serverTime: Date.now() });
  }
  if (url === '/api/state' && req.method === 'PUT') { cheat(me, ip, 'tentative d\'envoyer une partie modifiée (PUT /api/state)'); return send(res, 403, { error: 'forbidden' }); }
  if (url === '/api/admin' && req.method === 'POST') return admin(req, res, me, ip);
  if (url === '/api/chest' && req.method === 'POST') return openChest(req, res, me, ip);
  if (url === '/api/players' && req.method === 'GET') return send(res, 200, { players: Q.players.all(me.id) });
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
function runFor(me, b, action, args, lang, force) {
  const st = b.state ? JSON.parse(b.state) : { pos: { x: b.x, y: b.y } };
  st.pos = { x: b.x, y: b.y };                                          // the position always comes from the server
  const before = shape(st);
  const r = engine.run(st, LANG_OK.includes(lang) ? lang : 'en', action, args, me.role);
  r.state.pos = { x: b.x, y: b.y };
  if (force || action || r.events.length || !b.state || shape(r.state) !== before || b.lvl !== r.lvl) {
    Q.saveBase.run(JSON.stringify(r.state), r.lvl, r.power, Date.now(), me.id); STATS.saved++;
  } else STATS.skipped++;
  return r;
}

// ---------- administration (admin and test accounts only) ----------
const RESS = ['metal', 'wood', 'stone', 'fuel', 'rations', 'gold'];
const UNIT_IDS = ['recruit', 'rifleman', 'sniper', 'assault', 'truck', 'drone', 'apc', 'tank', 'artillery', 'heli', 'gunship'];
const TECH_IDS = ['extraction', 'forestry', 'rationing', 'refining', 'engineering', 'drill', 'ballistics', 'armor', 'medicine', 'logistics', 'engines', 'robotics'];
const int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
function createAccount(name, password, role) {
  const n = String(name || '').trim();
  if (!NAME_OK.test(n)) throw Object.assign(new Error('bad_name'), { code: 400 });
  if (String(password || '').length < 6) throw Object.assign(new Error('bad_password'), { code: 400 });
  if (Q.userByName.get(n)) throw Object.assign(new Error('name_taken'), { code: 409 });
  const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
  const id = Number(Q.addUser.run(n, salt, hashPass(String(password), salt), now).lastInsertRowid);
  const rl = ['player', 'tester', 'admin'].includes(role) ? role : 'tester';
  Q.setRole.run(rl, id);
  const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
  return { n, rl };
}
async function admin(req, res, me, ip) {
  if (!['admin', 'tester'].includes(me.role)) { cheat(me, ip, 'tentative d\'utiliser l\'administration'); return send(res, 403, { error: 'forbidden' }); }
  const { action, p = {} } = await readBody(req, 50_000);
  if (action === 'accounts') return me.role === 'admin' ? send(res, 200, { accounts: Q.accounts.all() }) : send(res, 403, { error: 'forbidden' });
  if (action === 'create_account') {
    if (me.role !== 'admin') { cheat(me, ip, 'compte test : tentative de créer un compte'); return send(res, 403, { error: 'forbidden' }); }
    try { const c = createAccount(p.name, p.password, p.role); log('ADMIN', `${me.name} a créé le compte ${c.n} (${c.rl})`); return send(res, 200, { ok: true, name: c.n }); }
    catch (e) { return send(res, e.code || 500, { error: e.message }); }
  }
  const b = Q.base.get(me.id);
  const st = runFor(me, b, null, [], 'en').state;                      // up to date server copy
  const now = Date.now();
  st.res = st.res || {}; st.troops = st.troops || {}; st.inv = st.inv || {}; st.slots = st.slots || {}; st.research = st.research || { lv: {}, cur: null };
  switch (action) {
    case 'give_res': { const n = int(p.amount, 0, 1e10); for (const r of (p.res === 'all' ? RESS : [p.res])) if (RESS.includes(r)) st.res[r] = (st.res[r] || 0) + n; break; }
    case 'give_item': { const id = String(p.id || ''); if (!/^[a-z0-9_]{2,40}$/.test(id)) return send(res, 400, { error: 'bad_item' }); st.inv[id] = (st.inv[id] || 0) + int(p.n, 1, 100000); break; }
    case 'give_all_items': { for (const id of (Array.isArray(p.ids) ? p.ids : [])) if (/^[a-z0-9_]{2,40}$/.test(id)) st.inv[id] = (st.inv[id] || 0) + int(p.n, 1, 1000); break; }
    case 'give_troops': { if (!UNIT_IDS.includes(p.u)) return send(res, 400, { error: 'bad_unit' }); st.troops[p.u] = (st.troops[p.u] || 0) + int(p.n, 1, 10_000_000); break; }
    case 'finish_all': {
      if (st.queue) st.queue.end = now;
      if (st.research.cur) st.research.cur.e = now;
      for (const bl in (st.training || {})) for (const j of st.training[bl]) { j.s = now; j.e = now; }
      for (const m of (st.marches || [])) { if (m.st === 'out') { m.a = now; m.b = now + 1000; } else m.b = now; }
      break; }
    case 'set_buildings': { const l = int(p.lvl, 1, 10); for (const k in st.slots) st.slots[k].lvl = l; if (st.queue && st.queue.lvl <= l) st.queue = null; break; }
    case 'set_research': { const l = int(p.lvl, 0, 10); for (const t of TECH_IDS) { if (l) st.research.lv[t] = l; else delete st.research.lv[t]; } st.research.cur = null; break; }
    case 'titan': { st.titan = st.titan || { lvl: 1, xp: 0, hp: 100, away: false, eq: {}, inv: [] }; st.titan.lvl = int(p.lvl, 1, 10); st.titan.xp = 0; st.titan.hp = 100; st.titan.away = false; break; }
    case 'titan_part': { st.titan = st.titan || { lvl: 1, xp: 0, hp: 100, away: false, eq: {}, inv: [] };
      if (!['armor', 'weapon', 'reactor', 'legs'].includes(p.s)) return send(res, 400, { error: 'bad_part' });
      st.titan.inv.push({ id: now + Math.floor(Math.random() * 1000), s: p.s, t: int(p.t, 1, 3) }); break; }
    default: return send(res, 400, { error: 'unknown_action' });
  }
  b.state = JSON.stringify(st);
  const r = runFor(me, b, null, [], p.lang || 'en', true);              // finishes what the admin action completed
  const { lang, ...shown } = p || {};
  log('ADMIN', `${me.name} (${me.role}) · ${action}${action === 'give_all_items' ? '' : ' ' + JSON.stringify(shown).slice(0, 160)}`);
  return send(res, 200, { ok: true, state: r.state, events: r.events });
}

// ---------- mystery chests: opened by the game engine on the server (secure random draw) ----------
async function openChest(req, res, me, ip) {
  const { id, count = 1, lang } = await readBody(req, 10_000);
  if (!LOOT[id]) return send(res, 400, { error: 'bad_chest' });
  const r = runFor(me, Q.base.get(me.id), 'useItem', [id, count > 1], lang);
  refusedOrder(me, ip, 'chest', [id], r.error);
  return send(res, 200, { ok: !r.error, error: r.error, state: r.state, events: r.events });
}

// ---------- static files (the game itself): kept in memory, compressed once ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.svg': 'image/svg+xml' };
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
function serveFile(req, res, url) {
  const file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  const rel = path.relative(ROOT, file).split(path.sep)[0];
  if (file !== ROOT && !file.startsWith(ROOT + path.sep) || ['server', 'data', '.git', 'node_modules', 'package.json'].includes(rel)) { res.writeHead(403); return res.end('Forbidden'); }
  loadFile(file, (err, e) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const h = { 'Content-Type': e.type, 'ETag': e.etag, 'Vary': 'Accept-Encoding', 'Cache-Control': /\.(webp|jpg|png|woff2)$/.test(file) ? 'public, max-age=86400' : 'no-cache' };
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
    if (url !== '/api/ping' && url !== '/api/health') {
      const ms = Number(process.hrtime.bigint() - res.t0) / 1e6;
      STATS.apiN++; STATS.apiMs += ms; if (ms > STATS.apiMax) { STATS.apiMax = ms; STATS.apiMaxUrl = url; }
    }
    return;
  }
  serveFile(req, res, url);
}).listen(PORT, '0.0.0.0', () => log('DÉMARRAGE', `Serveur Bastion sur le port ${PORT} · ${Q.count.get().n} joueurs inscrits`));

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

// forget sessions unused for 30 days
setInterval(() => Q.oldSessions.run(Date.now() - 30 * 86400_000), 3600_000).unref();
