// Vitesse d'entraînement : garnisons pour les 3 bâtiments, recherches Chaînes de montage (Usine) et Maintenance aéronautique (Héliport) : node tests/train_speed.js
const engine = require('../server/engine.js');
let ok = true; const check = (what, c) => { console.log((c ? 'OK   ' : 'ÉCHEC') + ' ' + what); if (!c) ok = false; };
const base = engine.run(null, 'fr', null, [], 'player').state;
Object.assign(base.slots, { cc: { type: 'command', lvl: 10 }, p1: { type: 'barracks', lvl: 10 }, p2: { type: 'factory', lvl: 10 }, p3: { type: 'helipad', lvl: 10 }, p4: { type: 'lab', lvl: 10 }, p5: { type: 'housing', lvl: 10 }, p6: { type: 'housing', lvl: 10 } });
for (const r in base.res) base.res[r] = 1e9;
base.research = { lv: { drill: 5, logistics: 5, engines: 5, ballistics: 5, armor: 5, command: 5, robotics: 5 }, cur: null };   // the research the test units need (no effect on speed)
// time of one training order (seconds) for a unit, with given research levels and garrisons
function jobTime(u, lv, garrisons) {
  const st = JSON.parse(JSON.stringify(base)); st.research.lv = { ...st.research.lv, ...lv };
  garrisons.forEach((l, i) => { st.slots['p' + (10 + i)] = { type: 'garrison', lvl: l }; });
  const r = engine.run(st, 'fr', 'train', [u, 100, 'main'], 'player');
  if (r.error) return 'refus : ' + r.error;
  const bl = { recruit: 'barracks', truck: 'factory', heli: 'helipad' }[u], j = (r.state.training[bl] || [])[0];
  return j ? Math.round((j.e - j.s) / 1000) : 'pas de file';
}
const sp = (b, g, t) => 1 + 0.05 * b + 0.03 * g + t;   // the rule
const near = (a, b) => typeof a === 'number' && Math.abs(a - b) <= 2;
const per = { recruit: 3 * 4 * 100, truck: 4 * 4 * 100, heli: 16 * 4 * 100 };
// 1. the garrisons speed up the 3 buildings
for (const u of ['recruit', 'truck', 'heli']) check(`garnisons (2 × niv. 10) : ${u} accéléré`, near(jobTime(u, {}, [10, 10]), per[u] / sp(10, 20, 0.25)));
// 2. Assembly Lines: the Vehicle Factory only
check('Chaînes de montage 5 : Usine +25 %', near(jobTime('truck', { assembly: 5 }, []), per.truck / sp(10, 0, 0.5)));
check('Chaînes de montage 5 : la Caserne ne change pas', near(jobTime('recruit', { assembly: 5 }, []), per.recruit / sp(10, 0, 0.25)));
// 3. Aircraft Maintenance: the Helipad only
check('Maintenance aéronautique 5 : Héliport +25 %', near(jobTime('heli', { avionics: 5 }, []), per.heli / sp(10, 0, 0.5)));
check('Maintenance aéronautique 5 : l\'Usine ne change pas', near(jobTime('truck', { avionics: 5 }, []), per.truck / sp(10, 0, 0.25)));
// 4. the researches can be started, and stop at level 5
let st = JSON.parse(JSON.stringify(base)); st.research.lv.drill = 3;
let r = engine.run(st, 'fr', 'research', ['assembly'], 'player'); check('recherche Chaînes de montage lancée', !r.error && r.state.research.cur && r.state.research.cur.t === 'assembly');
st = JSON.parse(JSON.stringify(base)); st.research.lv.drill = 3; st.research.lv.avionics = 5;
r = engine.run(st, 'fr', 'research', ['avionics'], 'player'); check('Maintenance aéronautique : refusée au-delà du niveau 5', !!r.error);
process.exit(ok ? 0 : 1);
