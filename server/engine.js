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
// is there a Fortified Mountain or a Fortified Oil Field on this tile? (new bases are never placed on one)
function isFort(x, y) { if (!ctx) load(); return !!ctx.isHotSpot(x, y); }
// the outposts of every player (the map must know them: they are never attacked, and a Fortified Mountain moves away)
function setOutposts(list) { if (!ctx) load(); return ctx.__setOutposts(JSON.stringify(list || [])); }
module.exports = { run, load, pvp, isFort, setOutposts };
// what the management panel can give: items, troops and resources, with their French names and pictures
function catalog() {
  if (!ctx) load();
  return JSON.parse(vm.runInContext(`(() => { const L0 = LANG; LANG = 'fr';
    try { return JSON.stringify({
      items: ITEM_ORDER.map(id => ({ id, name: itemName(id), img: itemArt(id) || ICS.drop || '' })),
      units: Object.keys(UNITS).map(id => ({ id, name: _t(UNITS[id].name), img: UNITS[id].img || '' })),
      res: [...['metal', 'wood', 'stone', 'fuel', 'rations', 'gold', 'alloy', 'napalm'].map(id => ({ id, name: _t(id), img: ICS[id] || '' })), { id: 'credits', name: 'Crédits de guerre', img: ICS.credits }] }); }
    finally { LANG = L0; } })()`, ctx));
}
module.exports.catalog = catalog;
// the real-money products of the shop (prices in euros, decided by the game rules, never by the browser)
function shop() {
  if (!ctx) load();
  return JSON.parse(vm.runInContext(`JSON.stringify({ packs: SHOP_PACKS, starter: SHOP_STARTER, pass: SHOP_PASS, prog: SHOP_PROG, weekly: SHOP_WEEKLY, products: PAY_PRODUCTS, cgv: CGV_VER, evTiers: EV_TIERS.map(t => t.p), alTiers: AL_TIERS.map(t => t.p) })`, ctx));
}
module.exports.shop = shop;
// the text of a notification, in the player's language
function pushText(lang, kind, data) {
  if (!ctx) load();
  ctx.__pa = JSON.stringify([String(lang || 'en'), String(kind), data || {}]);
  return JSON.parse(vm.runInContext(`(() => { const [l, k, d] = JSON.parse(__pa), L0 = LANG; LANG = LANGS.some(x => x[0] === l) ? l : 'en'; try { return JSON.stringify(pushText(k, d)); } finally { LANG = L0; } })()`, ctx));
}
// the calendar of a saved game: is the gift of today waiting, and which day is it
function calInfo(st) { if (!ctx) load(); try { return JSON.parse(ctx.__calInfo(JSON.stringify(st))); } finally { fakeNow = null; } }
module.exports.pushText = pushText; module.exports.calInfo = calInfo;
// the data of the website's wiki, in one language: every value comes from the game rules (so the wiki is always up to date)
const wikiCache = new Map();
function wikiData(lang) {
  if (!ctx) load();
  if (wikiCache.has(lang)) return wikiCache.get(lang);
  if (!ctx.__legalLoaded) { vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/legal.js'), 'utf8'), ctx, { filename: 'js/legal.js' }); ctx.__legalLoaded = true; }
  ctx.__legalInfo = JSON.stringify(Object.fromEntries(Object.entries({ name: 'LEGAL_NAME', siret: 'LEGAL_SIRET', email: 'LEGAL_EMAIL', address: 'LEGAL_ADDRESS', mediator: 'LEGAL_MEDIATOR', mediator_url: 'LEGAL_MEDIATOR_URL' })
    .map(([k, v]) => [k, String(process.env[v] || '').slice(0, 200)])));
  const d = JSON.parse(vm.runInContext(`(() => { const L0 = LANG; LANG = ${JSON.stringify(lang)};
    try {
      const nm = s => s ? _t(s) : '', tg = t => _t(TG_NAME[t]);
      const units = UNIT_ORDER.map(id => { const u = UNITS[id];
        const strong = u.at < 10 ? [] : Object.keys(TG_NAME).filter(t => vsMul(u.cl, t) > 1).map(tg);
        const weak = u.at < 10 ? [] : UNIT_ORDER.filter(v => v !== id && UNITS[v].at >= 10 && vsMul(UNITS[v].cl, u.tg) > 1);
        return { id, name: nm(u.name), desc: nm(u.desc), role: UNIT_ROLE[id] ? nm(UNIT_ROLE[id]) : '', img: u.img, bld: u.bld, bldName: nm(B[u.bld].name), req: u.req,
          at: u.at, df: u.df, hp: u.hp, sp: u.sp, rg: u.rg, ld: u.ld, power: u.power, pop: u.pop, time: u.time * TRAIN_SCALE, cost: u.cost,
          tech: Object.entries(UNIT_TECH[id] || {}).map(([t, l]) => ({ id: t, name: nm(TECH[t].name), l, img: TECH_ART[t] })),
          strong, weak, kind: u.cl }; });
      const blds = Object.keys(B).map(id => { const b = B[id], im = (IMGS[id] && IMGS[id].img) || (OP_IMG[id] && OP_IMG[id].img) || '';
        const lv = []; for (let l = 1; l <= MAX; l++) lv.push({ l, cost: costOf(id, l), time: Math.max(1, Math.round(Math.max(15, b.time * 45 * Math.pow(2.03, l - 1) * timeRamp(l)))) });
        return { id, name: nm(b.name), desc: nm(b.desc), img: im, field: !!b.field, unique: !!b.unique, req: b.req || 0, res: b.res || '', op: OP_ONLY.has(id), main: !OP_ONLY.has(id), levels: lv }; });
      const techs = Object.keys(TECH).map(id => { const t = TECH[id], mx = t.max || MAX;
        return { id, name: nm(t.name), br: t.br, eff: _t(t.eff, { p: Math.round(t.p * 100) }), lab: t.lab || 1, max: mx, img: TECH_ART[id],
          req: Object.entries(t.req || {}).map(([r, l]) => ({ id: r, name: nm(TECH[r].name), l })), plans: t.plans ? itemName(t.plans) : '',
          cost: t.max === 1 ? t.cost : techCost(id, 1) }; });
      const items = ITEM_ORDER.map(id => ({ id, kind: ITEMS[id].kind, name: itemName(id), desc: (() => { try { return itemDesc(id); } catch (e) { return ''; } })(), img: itemArt(id) || '' }));
      const br = TECH_BR.map(([k, n]) => ({ id: k, name: nm(n) }));
      const res = Object.fromEntries([...RES, 'alloy', 'napalm'].map(r => [r, { name: resName(r), img: ICS[r] }]));
      const targets = FEAT_T.map(([t, n, ic]) => ({ id: t, name: nm(n), img: (MSPR[t === 'camp' ? 'camp4' : t] || {}).img || ic() }));
      const outposts = Object.keys(OUTPOST).map(k => { const o = OUTPOST[k], t = TECH[o.tech];
        return { id: k, name: nm(o.name), titan: nm(o.titan), img: o.img, res: o.res, eff: _t(t.eff, {}), plans: itemName(t.plans), lab: t.lab,
          titanImg: (k === 'rempart' ? TITAN_STAGES_OP : TITAN_STAGES_BR)[1], hangar: nm(B[o.hangar].name) }; });
      const titan = { stages: [0, 1, 2].map(i => TITAN_STAGES[i]), parts: EQ_SLOTS.map(s => ({ id: s, name: nm(EQ_NAME[s]), img: 'assets/img/eq_' + s + '_2.webp' })), hangar: nm('Titan Hangar') };
      const fmtDate = s => { try { return new Date(s + 'T12:00:00').toLocaleDateString(LANG, { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return s; } };
      const news = PATCH.slice(0, 40).map(p => ({ id: p.id, d: p.d, date: fmtDate(p.d), items: p.items.map(x => _t(x)) }));
      const tx = s => _t(s);
      LEGAL_INFO = JSON.parse(__legalInfo);
      const legal = LEGAL_TABS.map(([k, n]) => ({ id: k, name: nm(n), html: legalHtml(k) }));
      return JSON.stringify({ units, blds, techs, items, br, res, targets, outposts, titan, news, legal, forts: [nm('Fortified Mountain'), nm('Fortified Oil Field')], fortImg: [(MSPR.fort || {}).img || 'assets/img/fort.webp', (MSPR.oilfort || {}).img || 'assets/img/oilfort.webp'], max: MAX, ver: PATCH[0].id,
        t: { Attack: tx('Attack'), Defense: tx('Defense'), Health: tx('Health'), Speed: tx('Speed'), Load: tx('Load'), Range: tx('Range'), Power: tx('Power'), Population: tx('Population') } });
    } finally { LANG = L0; } })()`, ctx));
  wikiCache.set(lang, d); return d;
}
module.exports.wikiData = wikiData;
