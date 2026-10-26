// Bastion game server
// Step 2: player accounts, SQLite database, saved games, other players on the world map.
// Next steps: server-checked actions, attacks between players, wheel, alliances.
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');
const { LOOT, rollLoot } = require('../js/loot.js');   // the same tables as the game shows

const ROOT = path.join(__dirname, '..');
const DATA = path.join(ROOT, 'data');                       // never in git: holds the database
const PORT = +process.env.SERVER_PORT || +process.env.PORT || 8080;   // Pelican gives the port in SERVER_PORT
const MAPN = 750;
fs.mkdirSync(DATA, { recursive: true });

// ---------- database ----------
const db = new DatabaseSync(path.join(DATA, 'bastion.db'));
db.exec(`PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE COLLATE NOCASE, salt TEXT NOT NULL, hash TEXT NOT NULL, created INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS sessions (token TEXT PRIMARY KEY, user_id INTEGER NOT NULL, created INTEGER NOT NULL, seen INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS bases (user_id INTEGER PRIMARY KEY, x INTEGER NOT NULL, y INTEGER NOT NULL, lvl INTEGER NOT NULL DEFAULT 1, power INTEGER NOT NULL DEFAULT 0,
    state TEXT, updated INTEGER NOT NULL DEFAULT 0);
  CREATE UNIQUE INDEX IF NOT EXISTS bases_pos ON bases (x, y);`);
// roles: player · tester (test account with every power) · admin (can also create accounts)
if (!db.prepare("SELECT 1 FROM pragma_table_info('users') WHERE name = 'role'").get()) db.exec("ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'player'");
if (!db.prepare("SELECT 1 FROM users WHERE role = 'admin'").get()) {   // the very first account becomes the administrator
  const first = db.prepare('SELECT id, name FROM users ORDER BY id LIMIT 1').get();
  if (first) { db.prepare("UPDATE users SET role = 'admin' WHERE id = ?").run(first.id); console.log(`Administrator: ${first.name}`); }
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

// ---------- helpers ----------
const hashPass = (pass, salt) => crypto.scryptSync(pass, salt, 64).toString('hex');
const send = (res, code, obj) => { res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(obj)); };
function readBody(req, max = 1_000_000) {
  return new Promise((ok, ko) => { let size = 0; const parts = [];
    req.on('data', c => { size += c.length; if (size > max) { ko(new Error('too big')); req.destroy(); } else parts.push(c); });
    req.on('end', () => { try { ok(parts.length ? JSON.parse(Buffer.concat(parts).toString('utf8')) : {}); } catch (e) { ko(e); } });
    req.on('error', ko); });
}
function auth(req) {
  const m = /^Bearer ([a-f0-9]{64})$/.exec(req.headers.authorization || ''); if (!m) return null;
  const s = Q.session.get(m[1]); if (s) Q.seen.run(Date.now(), m[1]); return s || null;
}
// simple protection against password guessing: 10 tries per minute and per address
const tries = new Map();
function tooMany(ip) { const now = Date.now(), t = (tries.get(ip) || []).filter(x => now - x < 60_000); t.push(now); tries.set(ip, t); return t.length > 10; }
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

// ---------- API ----------
async function api(req, res, url) {
  // behind the Cloudflare tunnel every request comes from the tunnel: the real player address is in CF-Connecting-IP
  const local = /^(::ffff:)?(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)|^::1$/.test(req.socket.remoteAddress || '');
  const ip = (local && req.headers['cf-connecting-ip']) || req.socket.remoteAddress || '?';
  if (url === '/api/health') return send(res, 200, { ok: true, game: 'Bastion', players: Q.count.get().n, uptime: Math.round(process.uptime()) });

  if (url === '/api/register' && req.method === 'POST') {
    if (tooMany(ip)) return send(res, 429, { error: 'too_many' });
    const { name = '', password = '' } = await readBody(req);
    const n = String(name).trim();
    if (!NAME_OK.test(n)) return send(res, 400, { error: 'bad_name' });
    if (String(password).length < 6 || String(password).length > 100) return send(res, 400, { error: 'bad_password' });
    if (Q.userByName.get(n)) return send(res, 409, { error: 'name_taken' });
    const salt = crypto.randomBytes(16).toString('hex'), now = Date.now();
    const id = Number(Q.addUser.run(n, salt, hashPass(String(password), salt), now).lastInsertRowid);
    if (Q.count.get().n === 1) { Q.setRole.run('admin', id); console.log(`Administrator: ${n}`); }
    const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
    const token = crypto.randomBytes(32).toString('hex'); Q.addSession.run(token, id, now, now);
    console.log(`New player: ${n} at (${p.x}, ${p.y})`);
    return send(res, 200, { token, name: n });
  }
  if (url === '/api/login' && req.method === 'POST') {
    if (tooMany(ip)) return send(res, 429, { error: 'too_many' });
    const { name = '', password = '' } = await readBody(req);
    const u = Q.userByName.get(String(name).trim());
    if (!u || !crypto.timingSafeEqual(Buffer.from(hashPass(String(password), u.salt), 'hex'), Buffer.from(u.hash, 'hex'))) return send(res, 401, { error: 'bad_login' });
    const token = crypto.randomBytes(32).toString('hex'), now = Date.now(); Q.addSession.run(token, u.id, now, now);
    return send(res, 200, { token, name: u.name });
  }
  const me = auth(req);
  if (!me) return send(res, 401, { error: 'not_logged_in' });
  if (url === '/api/logout' && req.method === 'POST') { Q.delSession.run(me.token); return send(res, 200, { ok: true }); }
  if (url === '/api/state' && req.method === 'GET') {
    const b = Q.base.get(me.id);
    return send(res, 200, { name: me.name, role: me.role, pos: { x: b.x, y: b.y }, state: b.state ? JSON.parse(b.state) : null, serverTime: Date.now() });
  }
  if (url === '/api/state' && req.method === 'PUT') {
    const { state, lvl = 1, power = 0 } = await readBody(req, 2_000_000);
    if (!state || typeof state !== 'object') return send(res, 400, { error: 'bad_state' });
    const b = Q.base.get(me.id); state.pos = { x: b.x, y: b.y };          // the position always comes from the server
    Q.saveBase.run(JSON.stringify(state), Math.max(1, Math.min(99, lvl | 0)), Math.max(0, power | 0), Date.now(), me.id);
    return send(res, 200, { ok: true, serverTime: Date.now() });
  }
  if (url === '/api/admin' && req.method === 'POST') return admin(req, res, me);
  if (url === '/api/chest' && req.method === 'POST') return openChest(req, res, me);
  if (url === '/api/players' && req.method === 'GET') return send(res, 200, { players: Q.players.all(me.id) });
  return send(res, 404, { error: 'not_found' });
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
  Q.setRole.run(['player', 'tester', 'admin'].includes(role) ? role : 'tester', id);
  const p = freeSpot(); Q.addBase.run(id, p.x, p.y, now);
  console.log(`Account created by an admin: ${n} (${role})`); return n;
}
async function admin(req, res, me) {
  if (!['admin', 'tester'].includes(me.role)) return send(res, 403, { error: 'forbidden' });
  const { action, p = {}, state } = await readBody(req, 2_000_000);
  if (action === 'accounts') return me.role === 'admin' ? send(res, 200, { accounts: Q.accounts.all() }) : send(res, 403, { error: 'forbidden' });
  if (action === 'create_account') {
    if (me.role !== 'admin') return send(res, 403, { error: 'forbidden' });
    try { return send(res, 200, { ok: true, name: createAccount(p.name, p.password, p.role) }); } catch (e) { return send(res, e.code || 500, { error: e.message }); }
  }
  const b = Q.base.get(me.id);
  const st = state && typeof state === 'object' ? state : (b.state ? JSON.parse(b.state) : null);
  if (!st) return send(res, 400, { error: 'no_state' });
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
  st.pos = { x: b.x, y: b.y };
  Q.saveBase.run(JSON.stringify(st), b.lvl, b.power, now, me.id);
  console.log(`Admin action by ${me.name}: ${action} ${action === 'give_all_items' ? '' : JSON.stringify(p)}`);
  return send(res, 200, { ok: true, state: st });
}

// ---------- mystery chests: the server draws the rewards ----------
async function openChest(req, res, me) {
  const { id, count = 1, state } = await readBody(req, 2_000_000);
  if (!LOOT[id]) return send(res, 400, { error: 'bad_chest' });
  const b = Q.base.get(me.id);
  const st = state && typeof state === 'object' ? state : (b.state ? JSON.parse(b.state) : null);
  if (!st) return send(res, 400, { error: 'no_state' });
  st.inv = st.inv || {}; st.troops = st.troops || {};
  const n = Math.min(int(count, 1, 50), st.inv[id] || 0);
  if (n < 1) return send(res, 400, { error: 'no_chest' });
  const rewards = [];
  for (let i = 0; i < n; i++) {
    st.inv[id]--; const r = rollLoot(id, k => crypto.randomInt(k));
    if (r.k === 'item') st.inv[r.id] = (st.inv[r.id] || 0) + r.n;
    else if (r.k === 'troops') st.troops[r.u] = (st.troops[r.u] || 0) + r.n;
    else { st.titan = st.titan || { lvl: 1, xp: 0, hp: 100, away: false, eq: {}, inv: [] }; st.titan.inv.push({ id: Date.now() + i * 7 + crypto.randomInt(5), s: r.s, t: r.t }); }
    rewards.push(r);
  }
  if (!st.inv[id]) delete st.inv[id];
  st.pos = { x: b.x, y: b.y };
  Q.saveBase.run(JSON.stringify(st), b.lvl, b.power, Date.now(), me.id);
  return send(res, 200, { ok: true, state: st, rewards });
}

// ---------- static files (the game itself) ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.json': 'application/json', '.svg': 'image/svg+xml' };
function serveFile(req, res, url) {
  const file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  const rel = path.relative(ROOT, file).split(path.sep)[0];
  if (file !== ROOT && !file.startsWith(ROOT + path.sep) || ['server', 'data', '.git', 'node_modules', 'package.json'].includes(rel)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': /\.(webp|jpg|png|woff2)$/.test(file) ? 'public, max-age=86400' : 'no-cache' });
    res.end(data);
  });
}

http.createServer(async (req, res) => {
  let url; try { url = decodeURIComponent((req.url || '/').split('?')[0]); } catch { res.writeHead(400); return res.end(); }
  if (url.startsWith('/api/')) {
    try { await api(req, res, url); } catch (e) { console.error('API error', url, e.message); if (!res.headersSent) send(res, 500, { error: 'server_error' }); }
    return;
  }
  serveFile(req, res, url);
}).listen(PORT, '0.0.0.0', () => console.log(`Bastion server running on port ${PORT} · ${Q.count.get().n} players`));

// forget sessions unused for 30 days
setInterval(() => Q.oldSessions.run(Date.now() - 30 * 86400_000), 3600_000).unref();
