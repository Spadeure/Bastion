// Bastion game server
// Step 2: player accounts, SQLite database, saved games, other players on the world map.
// Next steps: server-checked actions, attacks between players, wheel, alliances.
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

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
const Q = {
  userByName: db.prepare('SELECT * FROM users WHERE name = ?'),
  addUser: db.prepare('INSERT INTO users (name, salt, hash, created) VALUES (?, ?, ?, ?)'),
  addSession: db.prepare('INSERT INTO sessions (token, user_id, created, seen) VALUES (?, ?, ?, ?)'),
  session: db.prepare('SELECT s.token, u.id, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = ?'),
  seen: db.prepare('UPDATE sessions SET seen = ? WHERE token = ?'),
  delSession: db.prepare('DELETE FROM sessions WHERE token = ?'),
  oldSessions: db.prepare('DELETE FROM sessions WHERE seen < ?'),
  base: db.prepare('SELECT * FROM bases WHERE user_id = ?'),
  addBase: db.prepare('INSERT INTO bases (user_id, x, y, updated) VALUES (?, ?, ?, ?)'),
  saveBase: db.prepare('UPDATE bases SET state = ?, lvl = ?, power = ?, updated = ? WHERE user_id = ?'),
  allPos: db.prepare('SELECT x, y FROM bases'),
  players: db.prepare('SELECT u.name, b.x, b.y, b.lvl, b.power FROM bases b JOIN users u ON u.id = b.user_id WHERE b.user_id != ?'),
  count: db.prepare('SELECT COUNT(*) AS n FROM users'),
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
  const ip = req.socket.remoteAddress || '?';
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
    return send(res, 200, { name: me.name, pos: { x: b.x, y: b.y }, state: b.state ? JSON.parse(b.state) : null, serverTime: Date.now() });
  }
  if (url === '/api/state' && req.method === 'PUT') {
    const { state, lvl = 1, power = 0 } = await readBody(req, 2_000_000);
    if (!state || typeof state !== 'object') return send(res, 400, { error: 'bad_state' });
    const b = Q.base.get(me.id); state.pos = { x: b.x, y: b.y };          // the position always comes from the server
    Q.saveBase.run(JSON.stringify(state), Math.max(1, Math.min(99, lvl | 0)), Math.max(0, power | 0), Date.now(), me.id);
    return send(res, 200, { ok: true, serverTime: Date.now() });
  }
  if (url === '/api/players' && req.method === 'GET') return send(res, 200, { players: Q.players.all(me.id) });
  return send(res, 404, { error: 'not_found' });
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
