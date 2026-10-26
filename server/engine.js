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

// The game's own clock: the engine can replay the time a player was away step by step
// (production until the warehouse upgrade ends, then with the bigger storage, and so on).
// A separate Date class, so the server's real clock is never touched.
let fakeNow = null;
class GameDate extends Date {
  constructor(...a) { if (!a.length && fakeNow !== null) super(fakeNow); else super(...a); }
  static now() { return fakeNow !== null ? fakeNow : Date.now(); }
}

let ctx = null;
function load() {
  const dummy = makeDummy();
  const sandbox = {
    console, URL, JSON, Math, Date: GameDate, Intl, Map, Set, Promise,
    __setNow: t => { fakeNow = t; },
    __SERVER: true,
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
  let out;
  try { out = ctx.__run(JSON.stringify(st), lang || 'en', action || null, JSON.stringify(args || []), role || 'player'); }
  finally { fakeNow = null; }   // whatever happens, the clock goes back to real time
  return JSON.parse(out);
}
// attack between two players: both saved games in, both saved games out
function pvp(attSt, defSt, mid, attName, defName) {
  if (!ctx) load();
  try { return JSON.parse(ctx.__pvp(JSON.stringify(attSt), JSON.stringify(defSt), mid, attName, defName)); }
  finally { fakeNow = null; }
}
module.exports = { run, load, pvp };
