'use strict';
// Bastion launcher: Pelican starts this file (Main file = server/launcher.js).
// It runs the game server (server/index.js) and restarts it when the admin panel asks:
//  - the game server exits with code 75 = "restart me";
//  - if data/deploy.json holds {commit}, that exact version is installed first (git fetch + git reset --hard),
//    so the official server gets exactly the version that was tested on the test server.
// A crash (any other exit while nobody asked to stop) restarts the game after 5 seconds; after 5 crashes in 10 minutes
// the launcher gives up and stops (something is really broken: the console says so). Pelican "Stop" stops everything.
const { spawn, execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..'), DATA = path.join(ROOT, 'data'), DEPLOY = path.join(DATA, 'deploy.json');
const CHILD = process.argv[2] || path.join(__dirname, 'index.js');
const RESTART = 75;
const say = m => console.log(`[lanceur] ${m}`);
const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 120000 }).trim();

function deploy() {
  if (!fs.existsSync(DEPLOY)) return;
  let res;
  try {
    const { commit = '', branch = 'test' } = JSON.parse(fs.readFileSync(DEPLOY, 'utf8'));
    if (!/^[0-9a-f]{7,40}$/.test(commit) || !/^[\w.-]{1,40}$/.test(branch)) throw new Error('version invalide');
    const before = git('rev-parse', 'HEAD');
    git('fetch', '--quiet', 'origin', branch);
    git('cat-file', '-e', commit + '^{commit}');               // the version exists
    git('reset', '--hard', '--quiet', commit);                   // data/ is not in git: never touched
    res = { ok: true, commit: git('rev-parse', 'HEAD'), before, at: Date.now() };
    say(`mise à jour installée : ${before.slice(0, 7)} -> ${res.commit.slice(0, 7)}`);
  } catch (e) {
    res = { ok: false, error: String(e.stderr || e.message).trim().slice(0, 500), at: Date.now() };
    say(`ÉCHEC de la mise à jour : ${res.error} (l'ancienne version redémarre)`);
  }
  try { fs.unlinkSync(DEPLOY); fs.writeFileSync(path.join(DATA, 'deploy-result.json'), JSON.stringify(res)); } catch (e) {}
}

// Pelican "Auto Update" switch (AUTO_UPDATE=1): get the latest version of the branch when the server starts,
// even if the startup command has no "git pull". Never for a restart asked by the panel (that one installs an exact version).
function autoUpdate() {
  if (!/^(1|true|on)$/i.test(String(process.env.AUTO_UPDATE || '')) || fs.existsSync(DEPLOY)) return;
  try { const before = git('rev-parse', 'HEAD'); git('pull', '--ff-only', '--quiet'); const now = git('rev-parse', 'HEAD');
    say(before === now ? `à jour (${now.slice(0, 7)})` : `mise à jour automatique : ${before.slice(0, 7)} -> ${now.slice(0, 7)}`); }
  catch (e) { say(`git pull impossible : ${String(e.stderr || e.message).trim().slice(0, 300)} (la version actuelle démarre)`); }
}

let child = null, stopping = false, crashes = [], lastCrash = '';
const CRASH_MAX = 5, CRASH_WINDOW = 10 * 60_000, CRASH_WAIT = 5000;
function start() {
  deploy();
  const env = { ...process.env, BASTION_LAUNCHER: '1' };   // the game knows it can ask for a restart
  if (lastCrash) env.BASTION_CRASHED = lastCrash;           // the game writes in its journal that it came back after a crash
  lastCrash = '';
  child = spawn(process.execPath, [CHILD], { cwd: ROOT, stdio: 'inherit', env });
  child.on('exit', (code, sig) => {
    if (stopping) return process.exit(code == null ? (sig ? 1 : 0) : code);
    if (code === RESTART) { say('redémarrage demandé par le panel'); return setTimeout(() => { autoUpdate(); start(); }, 500); }   // Auto Update: a simple restart also gets the latest version of the branch
    const now = Date.now(); crashes = crashes.filter(t => now - t < CRASH_WINDOW); crashes.push(now);
    const why = sig ? `signal ${sig}` : `code ${code}`;
    if (crashes.length > CRASH_MAX) { say(`le jeu a planté ${crashes.length} fois en 10 minutes (${why}) : arrêt. Regarde les lignes ERREUR juste au-dessus, puis fais Restart.`); return process.exit(code || 1); }
    say(`le jeu s'est arrêté tout seul (${why}) : redémarrage dans ${CRASH_WAIT / 1000} s (${crashes.length}/${CRASH_MAX} en 10 min)`);
    lastCrash = why; setTimeout(start, CRASH_WAIT);
  });
}
for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => { stopping = true; if (child) child.kill(s); else process.exit(0); });
autoUpdate();
start();
