// Bastion · loot tables of the mystery chests.
// Shared by the game (to show the chances) and by the server (which does the real draw, so nobody can cheat).
// Each line: [weight, rarity, reward]. Rewards: {k:'item', id, n:[min,max]} · {k:'troops', u, n:[min,max]} · {k:'part', s:'*', t}
// In an item id, '*' means a random resource (metal, wood, stone, fuel, rations) and 'a|b' means one of them.
const LOOT = {
  chest_bronze: [
    [22, 'common',    {k:'item', id:'crate_*_s', n:[1,3]}],
    [12, 'common',    {k:'item', id:'speed_5m', n:[2,4]}],
    [10, 'common',    {k:'item', id:'speed_15m', n:[1,2]}],
    [12, 'common',    {k:'troops', u:'recruit', n:[100,300]}],
    [10, 'uncommon',  {k:'item', id:'crate_*_m', n:[1,1]}],
    [8,  'uncommon',  {k:'troops', u:'rifleman', n:[50,150]}],
    [7,  'uncommon',  {k:'item', id:'speed_1h', n:[1,1]}],
    [6,  'uncommon',  {k:'item', id:'boost_prod_*', n:[1,1]}],
    [5,  'uncommon',  {k:'item', id:'repair_s', n:[1,2]}],
    [4,  'rare',      {k:'item', id:'crate_gold_m', n:[1,1]}],
    [3,  'rare',      {k:'item', id:'speed_8h', n:[1,1]}],
    [1,  'epic',      {k:'item', id:'chest_silver', n:[1,1]}]
  ],
  chest_silver: [
    [18, 'common',    {k:'item', id:'crate_*_m', n:[1,3]}],
    [10, 'common',    {k:'item', id:'speed_1h', n:[1,2]}],
    [10, 'uncommon',  {k:'troops', u:'sniper', n:[50,150]}],
    [8,  'uncommon',  {k:'troops', u:'assault', n:[30,100]}],
    [8,  'uncommon',  {k:'troops', u:'heli', n:[10,40]}],
    [10, 'uncommon',  {k:'item', id:'speed_150m', n:[1,2]}],
    [8,  'rare',      {k:'item', id:'crate_*_l', n:[1,1]}],
    [7,  'rare',      {k:'item', id:'speed_8h', n:[1,2]}],
    [6,  'rare',      {k:'item', id:'boost_atk|boost_def', n:[1,1]}],
    [5,  'rare',      {k:'item', id:'march_50', n:[1,2]}],
    [4,  'epic',      {k:'part', s:'*', t:2}],
    [3,  'epic',      {k:'item', id:'speed_24h', n:[1,1]}],
    [2,  'epic',      {k:'item', id:'crate_gold_l', n:[1,1]}],
    [1,  'legendary', {k:'item', id:'chest_gold', n:[1,1]}]
  ],
  chest_gold: [
    [15, 'rare',      {k:'item', id:'crate_*_l', n:[2,4]}],
    [10, 'rare',      {k:'item', id:'crate_gold_l', n:[1,2]}],
    [10, 'rare',      {k:'item', id:'speed_15h', n:[1,2]}],
    [6,  'rare',      {k:'item', id:'boost_atk|boost_def', n:[2,2]}],
    [10, 'epic',      {k:'item', id:'speed_24h', n:[1,3]}],
    [10, 'epic',      {k:'troops', u:'tank', n:[20,60]}],
    [8,  'epic',      {k:'troops', u:'gunship', n:[15,40]}],
    [8,  'epic',      {k:'troops', u:'artillery', n:[15,40]}],
    [8,  'epic',      {k:'part', s:'*', t:2}],
    [6,  'epic',      {k:'item', id:'speed_60h', n:[1,1]}],
    [5,  'legendary', {k:'part', s:'*', t:3}],
    [4,  'legendary', {k:'item', id:'speed_96h', n:[1,1]}]
  ]
};
const LOOT_RES = ['metal','wood','stone','fuel','rations'], LOOT_PARTS = ['armor','weapon','reactor','legs'];
// one draw; rnd(n) must return an integer in [0, n)
function rollLoot(chest, rnd){
  const pool = LOOT[chest]; if(!pool) return null;
  let r = rnd(pool.reduce((s,l)=>s+l[0],0)), line = pool[0];
  for(const l of pool){ if(r < l[0]){ line = l; break; } r -= l[0]; }
  const [ , rarity, rw] = line, n = rw.n ? rw.n[0] + rnd(rw.n[1]-rw.n[0]+1) : 1;
  if(rw.k === 'item'){ let id = rw.id; if(id.includes('|')){ const o = id.split('|'); id = o[rnd(o.length)]; } id = id.replace('*', LOOT_RES[rnd(LOOT_RES.length)]); return {rarity, k:'item', id, n}; }
  if(rw.k === 'troops') return {rarity, k:'troops', u:rw.u, n};
  return {rarity, k:'part', s: rw.s === '*' ? LOOT_PARTS[rnd(4)] : rw.s, t: rw.t};
}
if(typeof module !== 'undefined') module.exports = { LOOT, rollLoot };
