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
    if (r.k === 'item') addItem(r.id, r.n); else if (r.k === 'troops') state.troops[r.u] = (state.troops[r.u] || 0) + r.n;
    else titanState().inv.push({ id: Date.now() * 10 + i, s: r.s, t: r.t }); }
  __events.push({ t: 'chest', id, rewards });
};
wheelResult = (wheel, idx, reward, all) => { __events.push({ t: 'wheel', wheel, idx, reward, all }); };
levelUpShow = (from, to, rew) => { __events.push({ t: 'levelup', from, to, rew }); };
// catch up everything that happened since the last visit (production, constructions, research, training, marches, repairs).
// The time away is replayed event by event: each finished construction, research, training order, march step or boost
// changes the production, the storage or the upkeep from that moment on, exactly as if the player had stayed online.
function __nextEvent(limit) {
  const ts = [];
  if (state.queue) ts.push(state.queue.end);
  const rc = researchState().cur; if (rc) ts.push(rc.e);
  for (const bl in state.training) for (const j of state.training[bl]) ts.push(j.e);
  for (const m of state.marches) ts.push(m.st === 'out' ? m.a : m.b);
  for (const k in (state.boosts || {})) ts.push(state.boosts[k]);
  let best = null; for (const t of ts) if (t > state.last && t < limit && (best === null || t < best)) best = t;
  return best;
}
function __catchUp() {
  const real = Date.now();
  for (let i = 0; i < 300; i++) { const t = __nextEvent(real); if (t === null) break; __setNow(t); tick(); }
  __setNow(null); tick(); tick();
}
const __int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
const STAFF_ONLY = new Set(['finish', 'finishTraining', 'finishResearch', 'finishMarch', 'reset']);
// every order the browser may send, with its checks (the game functions do the rest of the checks themselves)
const __ACTIONS = {
  build(slot, t, l) {
    const s = SLOTS.find(x => x.id === slot), d = B[t]; l = __int(l, 1, MAX);
    if (!s || s.deco || !d) return 'bad_order';
    const cur = state.slots[slot];
    if (cur) { if (cur.type !== t || l !== cur.lvl + 1) return 'bad_order'; }
    else if (l !== 1 || (s.fixed ? t !== s.fixed : (d.fixed || !!d.field !== (s.view === 'fields') || (d.unique && exists(t))))) return 'bad_order';
    const why = whyNot(t, l); if (why) return why;
    startBuild(slot, t, l);
  },
  cancel() { if (!state.queue) return 'bad_order'; cancel(); },
  train(u, n) { n = __int(n, 0, 1e7); if (!UNITS[u]) return 'bad_order'; const why = whyNotTrain(u, n); if (why) return why; train(u, n); },
  research(t) { if (!TECH[t]) return 'bad_order'; const why = whyNotResearch(t, techLv(t) + 1); if (why) return why; startResearch(t); },
  cancelResearch() { if (!researchState().cur) return 'bad_order'; cancelResearch(); },
  // o.pvp is added by the server only (after its own checks) when the target is another player's base
  launch(o) {
    o = o || {}; const x = __int(o.x, 1, MAPN), y = __int(o.y, 1, MAPN); mapSel = { x, y };
    for (const k in atkQty) delete atkQty[k];
    const pv = o.pvp, spy = pv && pv.kind === 'spy';
    for (const u in (o.q || {})) if (UNITS[u] && (!spy || u === 'drone')) atkQty[u] = __int(o.q[u], 0, 1e8);
    atkTitan = !spy && !!o.titan;
    if (spy && !atkQty.drone) return 'bad_order';
    if (!pv) { const tl = tileAt(x, y); if (!tl || tl.t === 'home' || tl.t === 'plain' || tl.t === 'player') return 'bad_order'; }
    if (x === state.pos.x && y === state.pos.y) return 'bad_order';
    const why = whyNotMarch(atkQty); if (why) return why;
    const n0 = state.marches.length; launch();
    if (pv && state.marches.length > n0) { const m = state.marches[state.marches.length - 1];
      m.pvp = pv.uid; m.kind = spy ? 'spy' : 'attack'; m.tname = String(pv.name).slice(0, 16);
      state.truce = 0; state.attackedPlayer = true; }   // attacking or spying ends your own truce and your beginner protection
  },
  useItem(id, all) { if (!ITEMS[id] || !invN(id)) return 'bad_order'; useItem(id, !!all); },
  speed(id, tg) { if (!ITEMS[id] || !invN(id) || typeof tg !== 'string' || tg.length > 40) return 'bad_order'; speedTarget = tg; if (!speedJob(tg)) return 'bad_order'; useSpeed(id); },
  defend(u, n) { if (!UNITS[u]) return 'bad_order'; moveDefense(u, __int(n, -1e8, 1e8)); },
  claimQuest(id) { return claimQuest(String(id || '')); },
  spin(w, n) { if (!WHEELS[w]) return 'bad_order'; return doSpin(w, __int(n, 1, SPIN_MAX)); },
  daily() { return claimDailyTicket(); },
  readReport(id) { const r = state.reports.find(x => x.id === Number(id)); if (!r) return 'bad_order'; r.read = true; },
  readAllReports() { for (const r of state.reports) r.read = true; },
  equip(id) { equip(id); }, unequip(s) { if (!EQ_SLOTS.includes(s)) return 'bad_order'; unequip(s); }, scrap(id) { scrap(id); },
  // test buttons (admin and test accounts only)
  finish() { if (state.queue) complete(); },
  finishTraining(bl) { if (!TRAINERS.includes(bl)) return 'bad_order'; finishTraining(bl); },
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
    const f = __ACTIONS[action];
    if (!f) error = 'bad_order';
    else if (STAFF_ONLY.has(action) && !['admin', 'tester'].includes(role)) error = 'forbidden';
    else { try { const r = f(...JSON.parse(argsJson)); if (r) error = r; } catch (e) { error = 'bad_order'; } }
    __catchUp();
  }
  return JSON.stringify({ state, events: __events, error, lvl: playerLevel(totalPower()), power: totalPower() });
}
