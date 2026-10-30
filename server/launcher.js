'use strict';
// Bastion launcher: Pelican starts this file (Main file = server/launcher.js).
// It runs the game server (server/index.js) and restarts it when the admin panel asks:
//  - the game server exits with code 75 = "restart me";
//  - if data/deploy.json holds {commit}, that exact version is installed first (git fetch + git reset --hard),
//    so the official server gets exactly the version that was tested on the test server.
// Any other exit (Pelican "Stop", a crash) stops the launcher too, with the same code.
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

let child = null, stopping = false;
function start() {
  deploy();
  child = spawn(process.execPath, [CHILD], { cwd: ROOT, stdio: 'inherit', env: process.env });
  child.on('exit', (code, sig) => {
    if (code === RESTART && !stopping) { say('redémarrage demandé par le panel'); return setTimeout(start, 500); }
    process.exit(code == null ? (sig ? 1 : 0) : code);
  });
}
for (const s of ['SIGINT', 'SIGTERM']) process.on(s, () => { stopping = true; if (child) child.kill(s); else process.exit(0); });
start();
