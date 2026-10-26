// Bastion game server (step 1): serves the game and answers a health check.
// Next steps: player accounts, SQLite database, real timers, attacks between players.
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const PORT = +process.env.SERVER_PORT || +process.env.PORT || 8080;   // Pelican gives the port in SERVER_PORT
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.json':'application/json','.svg':'image/svg+xml'};
const started = Date.now();
http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  if (url === '/api/health') { res.writeHead(200, {'Content-Type':'application/json'}); return res.end(JSON.stringify({ok:true, game:'Bastion', uptime:Math.round((Date.now()-started)/1000)})); }
  let file = path.normalize(path.join(ROOT, url === '/' ? 'index.html' : url));
  if (!file.startsWith(ROOT) || file.includes(path.sep + 'server' + path.sep) || file.includes(path.sep + '.git')) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, {'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': /\.(webp|jpg|png|woff2)$/.test(file) ? 'public, max-age=86400' : 'no-cache'});
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => console.log(`Bastion server running on port ${PORT}`));
