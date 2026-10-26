// Bastion · game engine on the server.
// The server runs the very same game code as the browser (js/loot.js + js/game.js), without any display:
// same rules, same costs, same battles. Players only send orders; the server checks them, runs them and keeps the result.
const vm = require('vm'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');

// A do-nothing stand-in for the page (document, canvas, storage...): every property and call returns itself.
function makeDummy() {
  const fn = function () {};
  const p = new Proxy(fn, {
    get: (t, k) => k === Symbol.toPrimitive ? () => '' : k === 'length' ? 0 : k === Symbol.iterator ? function* () {} : p,
    apply: () => p, construct: () => p, set: () => true, has: () => true,
  });
  return p;
}

let ctx = null;
function load() {
  const dummy = makeDummy();
  const sandbox = {
    console, URL, JSON, Math, Date, Intl, Map, Set, Promise,
    document: dummy, window: dummy, navigator: dummy, localStorage: dummy, sessionStorage: dummy, performance: { now: () => Date.now() },
    location: { href: 'http://localhost/', protocol: 'http:', hostname: 'localhost' },
    requestAnimationFrame: () => 0, cancelAnimationFrame: () => {}, alert: () => {}, confirm: () => true,
    setTimeout: f => { try { f(); } catch (e) {} return 0; }, clearTimeout: () => {}, setInterval: () => 0, clearInterval: () => {},
    fetch: undefined, Image: function () { return dummy; },
    __rnd: n => crypto.randomInt(n),
  };
  ctx = vm.createContext(sandbox);
  for (const f of ['js/loot.js', 'js/game.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  vm.runInContext(fs.readFileSync(path.join(__dirname, 'harness.js'), 'utf8'), ctx, { filename: 'harness.js' });
  console.log('[moteur] Règles du jeu chargées sur le serveur');
}

// run one request: catch up time, then optionally one order. Returns {state, events, error, lvl, power}
function run(st, lang, action, args, role) {
  if (!ctx) load();
  const out = ctx.__run(JSON.stringify(st), lang || 'en', action || null, JSON.stringify(args || []), role || 'player');
  return JSON.parse(out);
}
module.exports = { run, load };
