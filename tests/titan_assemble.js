// Règles de l'assemblage de l'armure du Titan (principal, Rempart, Brasier) : node tests/titan_assemble.js
const engine = require(require('path').join(__dirname, '..', 'server', 'engine.js'));
const P4 = { armor: 1, weapon: 1, reactor: 1, legs: 1 };
const base = engine.run(null, 'fr', null, [], 'player').state;
base.slots.hangar = { type: 'hangar', lvl: 5 };
const op = (t, hk, x) => ({ t, x, y: 100, at: Date.now(), slots: { cc: { type: 'opcenter', lvl: 5 }, wall: { type: 'wall', lvl: 1 }, hangar: { type: hk, lvl: 3 } }, queue: null, training: {}, titan: { lvl: 2, xp: 0, hp: 100, away: false, parts: { ...P4 }, asm: 0 } });
let ok = true; const check = (what, cond) => { console.log((cond ? 'OK   ' : 'ÉCHEC') + ' ' + what); if (!cond) ok = false; };
// 1. a player already armored (no asm): stays armored, the order is refused
let st = JSON.parse(JSON.stringify(base)); st.titan.parts = { ...P4 };
let r = engine.run(st, 'fr', 'titanAssemble', ['main'], 'player');
check('joueur déjà équipé : ordre refusé, Titan inchangé', r.error === 'bad_order' && r.state.titan.asm === undefined);
// 2. main Titan, 4 pieces, not assembled
st = JSON.parse(JSON.stringify(base)); st.titan.parts = { ...P4 }; st.titan.asm = 0;
r = engine.run(st, 'fr', null, [], 'player');
check('Titan principal : reste « à assembler » après rechargement', r.state.titan.asm === 0);
r = engine.run(r.state, 'fr', 'titanAssemble', ['main'], 'player');
check('Titan principal : assemblage accepté', !r.error && r.state.titan.asm === undefined);
r = engine.run(r.state, 'fr', 'titanAssemble', ['main'], 'player');
check('Titan principal : second assemblage refusé', r.error === 'bad_order');
// 3. only 3 pieces: refused
st = JSON.parse(JSON.stringify(base)); st.titan.parts = { armor: 1, weapon: 1, reactor: 1 }; st.titan.asm = 0;
r = engine.run(st, 'fr', 'titanAssemble', ['main'], 'player');
check('3 pièces seulement : refusé', r.error === 'bad_order');
// 4. Rampart and Brasier Titans
st = JSON.parse(JSON.stringify(base)); st.op = op('rempart', 'ophangar', 100); st.br = op('brasier', 'brhangar', 120);
r = engine.run(st, 'fr', null, [], 'player');
check('avant-postes : les 2 Titans restent « à assembler »', r.state.op && r.state.op.titan.asm === 0 && r.state.br && r.state.br.titan.asm === 0);
r = engine.run(r.state, 'fr', 'titanAssemble', ['op'], 'player');
check('Titan Rempart : assemblé, le Brasier attend toujours', !r.error && r.state.op.titan.asm === undefined && r.state.br.titan.asm === 0);
r = engine.run(r.state, 'fr', 'titanAssemble', ['br'], 'player');
check('Titan Brasier : assemblé', !r.error && r.state.br.titan.asm === undefined);
// 5. an outpost the player does not have
st = JSON.parse(JSON.stringify(base)); r = engine.run(st, 'fr', 'titanAssemble', ['br'], 'player');
check('avant-poste absent : refusé', r.error === 'bad_order');
process.exit(ok ? 0 : 1);
