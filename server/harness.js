// Runs inside the server game engine, after js/game.js: same global scope as the game.
// Turns every display function off, collects the messages, and exposes __run() for the server.
let __events = [];
renderAll = renderRes = renderQueue = renderSlots = renderSheet = liveSheet = updateRepBadge = requestDraw = drawMap = buildWorld = () => {};
closeSheet = openPanel = openSlot = chestShow = renderTuto = drawClock = () => {};
save = () => {};
toast = m => { __events.push({ t: 'toast', m: String(m) }); };
powerGain = n => { if (n > 0) __events.push({ t: 'power', n }); };
lootFx = got => { __events.push({ t: 'loot', got }); };
// chests: drawn with the server's secure random generator
openChest = function (id, count) {
  if (!ITEMS[id] || ITEMS[id].kind !== 'chest' || !invN(id)) return;
  count = Math.max(1, Math.min(count || 1, invN(id), 50)); const rewards = [];
  for (let i = 0; i < count; i++) { takeItem(id); const r = rollLoot(id, __rnd); rewards.push(r);
    if (r.k === 'item') addItem(r.id, r.n); else if (r.k === 'troops') state.troops[r.u] = (state.troops[r.u] || 0) + r.n; }
  __events.push({ t: 'chest', id, rewards });
};
wheelResult = (wheel, idx, reward, all) => { __events.push({ t: 'wheel', wheel, idx, reward, all }); };
levelUpShow = (from, to, rew) => { __events.push({ t: 'levelup', from, to, rew }); };
// catch up everything that happened since the last visit (production, constructions, research, training, marches, repairs).
// The time away is replayed event by event: each finished construction, research, training order, march step or boost
// changes the production, the storage or the upkeep from that moment on, exactly as if the player had stayed online.
function __nextEvent(limit) {
  const ts = [];
  for (const b of baseList()) { const q = queueOf(b), T = trainingOf(b) || {};   // main base and outpost
    if (q) ts.push(q.end); for (const bl in T) for (const j of T[bl]) ts.push(j.e); }
  const rc = researchState().cur; if (rc) ts.push(rc.e);
  for (const m of state.marches) ts.push(m.st === 'out' ? m.a : m.b);
  for (const k in (state.boosts || {})) ts.push(state.boosts[k]);
  let best = null; for (const t of ts) if (t > state.last && t < limit && (best === null || t < best)) best = t;
  return best;
}
function __catchUp() {
  const real = Date.now();
  for (let i = 0; i < 5000; i++) { const t = __nextEvent(real);   // 12 h of auto attacks can mean a few thousand returns
     if (t === null) break; __setNow(t); tick(); }
  __setNow(null); tick(); tick();
}
const __int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
// an order may only use real game names: a name every object answers to (constructor, toString...) is refused at once
function __safeArgs(v, depth){ if(depth>6) return false;
  if(typeof v==='string') return !PROTO_KEYS.has(v);
  if(Array.isArray(v)) return v.every(x=>__safeArgs(x, depth+1));
  if(v && typeof v==='object') return Object.keys(v).every(k=>!PROTO_KEYS.has(k) && __safeArgs(v[k], depth+1));
  return true; }
// which base an order is for: the main base (default) or the outpost (only if the player has one)
const __base = b => (b === undefined || b === null || b === 'main') ? 'main' : (b === 'op' && state.op) ? 'op' : null;
const __in = (b, f) => { const bs = __base(b); if (!bs) return 'bad_order'; return withBase(bs, f); };
const STAFF_ONLY = new Set(['finish', 'finishTraining', 'finishResearch', 'finishMarch', 'reset']);
// every order the browser may send, with its checks (the game functions do the rest of the checks themselves)
const __ACTIONS = {
  build(slot, t, l, b) { return __in(b, () => {
    const s = SLOTS.find(x => x.id === slot); l = __int(l, 1, MAX);
    if (!s || !slotUsable(s) || !own(B, t) || !baseAllows(t)) return 'bad_order';
    const cur = state.slots[slot];
    if (cur) { if (cur.type !== t || l !== cur.lvl + 1) return 'bad_order'; }
    else if (l !== 1 || !canPlace(s, t) || (state.queue && state.queue.slot === slot)) return 'bad_order';
    const why = whyNot(t, l); if (why) return why;
    startBuild(slot, t, l); }); },
  cancel(b) { return __in(b, () => { if (!state.queue) return 'bad_order'; cancel(); }); },
  cancelTrain(bl, i, b) { return __in(b, () => { i = __int(i, 0, 10); if (!TRAINERS.includes(bl) || !(state.training[bl] || [])[i]) return 'bad_order'; cancelTrain(bl, i); }); },
  train(u, n, b) { return __in(b, () => { n = __int(n, 0, 1e7); if (!own(UNITS, u)) return 'bad_order'; const why = whyNotTrain(u, n); if (why) return why; train(u, n); }); },
  // found the outpost on a free mountain (the server has already checked that no base stands on this tile)
  found(x, y) { if (typeof x !== 'number' || typeof y !== 'number') return 'bad_order'; return foundOutpost('rempart', __int(x, 1, MAPN), __int(y, 1, MAPN)) || undefined; },
  research(t) { if (!own(TECH, t)) return 'bad_order'; const why = whyNotResearch(t, techLv(t) + 1); if (why) return why; startResearch(t); },
  cancelResearch() { if (!researchState().cur) return 'bad_order'; cancelResearch(); },
  // o.pvp is added by the server only (after its own checks) when the target is another player's base
  launch(o) {
    o = o || {}; const x = __int(o.x, 1, MAPN), y = __int(o.y, 1, MAPN); mapSel = { x, y };
    for (const k in atkQty) delete atkQty[k];
    const pv = o.pvp, spy = pv && pv.kind === 'spy';
    for (const u in (o.q || {})) if (own(UNITS, u) && (!spy || u === 'drone')) atkQty[u] = __int(o.q[u], 0, 1e8);
    atkTitan = spy ? false : o.titan === 'op' ? (state.op ? 'op' : false) : (o.titan ? 'main' : false);   // one Titan: the main one or the Rampart one
    if (spy && !atkQty.drone) return 'bad_order';
    if (!pv) { const tl = tileAt(x, y); if (!attackable(tl)) return 'bad_order'; }   // never an outpost, a base or empty land
    if (x === state.pos.x && y === state.pos.y) return 'bad_order';
    const why = whyNotMarch(atkQty); if (why) return why;
    const n0 = state.marches.length; launch();
    if (pv && state.marches.length > n0) { const m = state.marches[state.marches.length - 1];
      m.pvp = pv.uid; m.kind = spy ? 'spy' : 'attack'; m.tname = String(pv.name).slice(0, 16);
      state.truce = 0; state.attackedPlayer = true; }   // attacking or spying ends your own truce and your beginner protection
  },
  autoStart(plans) {
    if (!Array.isArray(plans) || !plans.length || plans.length > 5) return 'bad_order';
    const clean = [];
    for (const p of plans) { if (!p || !AUTO_TYPES.includes(p.tt)) return 'bad_order'; const q = {};
      for (const u in (p.q || {})) if (own(UNITS, u)) q[u] = __int(p.q[u], 0, 1e8);
      clean.push({ tt: p.tt, lvl: __int(p.lvl, 1, 10), q, titan: !!p.titan }); }
    return autoStart(clean) || undefined;
  },
  autoStop() { if (!state.auto) return 'bad_order'; autoStop(); },
  useItem(id, all) { if (!own(ITEMS, id) || !invN(id)) return 'bad_order'; useItem(id, !!all); },
  speed(id, tg) { if (!own(ITEMS, id) || !invN(id) || typeof tg !== 'string' || tg.length > 40) return 'bad_order'; speedTarget = tg; if (!speedJob(tg)) return 'bad_order'; useSpeed(id); },
  defend(u, n) { if (!own(UNITS, u)) return 'bad_order'; moveDefense(u, __int(n, -1e8, 1e8)); },
  claimQuest(id) { return claimQuest(String(id || '')); },
  spin(w, n) { if (!own(WHEELS, w)) return 'bad_order'; return doSpin(w, __int(n, 1, SPIN_MAX)); },
  daily() { return claimDailyTicket(); },
  readReport(id) { const r = state.reports.find(x => x.id === Number(id)); if (!r) return 'bad_order'; r.read = true; },
  readAllReports() { for (const r of state.reports) r.read = true; },
  // ----- alliances: orders given by the server only (a browser sending them is refused before the engine) -----
  reinforce(x, y, q) {   // troops leave to defend an ally's base: travel time like a march
    if (!bldLevel('rally')) return _t('Build a {b} first',{b:_t('Rally Point')});
    const t = {}; let n = 0; for (const u in (q || {})) if (own(UNITS, u)) { const k = __int(q[u], 0, 1e9); if (k > (state.troops[u] || 0)) return _t('Choose your troops'); if (k) { t[u] = k; n += k; } }
    if (!n) return 'bad_order';
    mapSel = { x: __int(x, 1, MAPN), y: __int(y, 1, MAPN) };
    const secs = marchStats(t, false).secs; for (const u in t) state.troops[u] -= t[u];
    __events.push({ t: 'reinf', secs, q: t }); },
  reinfBack(q) { for (const u in (q || {})) if (own(UNITS, u)) state.troops[u] = (state.troops[u] || 0) + __int(q[u], 0, 1e9); },
  allyGive(res) { const R = ['metal', 'wood', 'stone', 'fuel', 'rations'];
    for (const r of R) if (__int((res || {})[r], 0, 1e12) > Math.floor(state.res[r] || 0)) return _t('Not enough resources');
    for (const r of R) state.res[r] -= __int((res || {})[r], 0, 1e12); },
  allyGet(res) { for (const r of ['metal', 'wood', 'stone', 'fuel', 'rations']) state.res[r] = (state.res[r] || 0) + __int((res || {})[r], 0, 1e12); },
  allyHelp(b, key, share, min) { return __in(b, () => { const q = state.queue, now = Date.now();
    if (!q || q.end <= now || `${b}|${q.slot}|${q.type}|${q.lvl}|${q.start}` !== key) return 'bad_order';
    q.end = Math.max(now, q.end - Math.max(min, Math.round((q.end - q.start) * share))); }); },
  // test buttons (admin and test accounts only)
  finish(b) { return __in(b, () => { if (state.queue) complete(); }); },
  finishTraining(bl, b) { return __in(b, () => { if (!TRAINERS.includes(bl)) return 'bad_order'; finishTraining(bl); }); },
  finishResearch() { checkResearch(true); },
  finishMarch(id) { finishMarch(id); },
  reset() { const op = state.pos; state = fresh(); state.pos = op; normalizeState(); },
};
// an attack (or a spy mission) arrives: both bases are brought up to date, then the fight is resolved
function __pvp(attJson, defJson, mid, attName, defName) {
  __events = [];
  const load = j => { const st = JSON.parse(j); state = st && st.slots ? st : fresh(); normalizeState(); __catchUp(); return state; };
  const att = load(attJson), def = load(defJson);
  const m = att.marches.find(x => x.id === mid && x.pvp && x.st === 'out');
  if (!m) return JSON.stringify({ gone: true });
  const r = m.kind === 'spy' ? spyResolve(att, def, m, attName, defName) : pvpResolve(att, def, m, attName, defName);
  const info = st => { state = st; return { lvl: playerLevel(totalPower()), power: totalPower() }; };
  return JSON.stringify({ att, def, r, kind: m.kind, a: info(att), d: info(def) });
}
function __run(stJson, lang, action, argsJson, role) {
  __events = []; LANG = lang;
  let st = JSON.parse(stJson);
  state = st && st.slots ? st : Object.assign(fresh(), { pos: st && st.pos });
  normalizeState(); __catchUp();
  let error = null;
  if (action) {
    const args = JSON.parse(argsJson), f = own(__ACTIONS, action) ? __ACTIONS[action] : null;
    if (!f || !Array.isArray(args) || !__safeArgs(args, 0)) error = 'bad_order';
    else if (STAFF_ONLY.has(action) && !['admin', 'tester'].includes(role)) error = 'forbidden';
    else { try { const r = f(...args); if (r) error = r; } catch (e) { error = 'bad_order'; } }
    __catchUp();
  }
  return JSON.stringify({ state, events: __events, error, lvl: playerLevel(totalPower()), power: totalPower() });
}
// every outpost of the map, from the database (the Fortified Mountains move away from them)
function __setOutposts(json) { setOutposts(JSON.parse(json)); tileCache.clear(); return OUTPOSTS.size; }
