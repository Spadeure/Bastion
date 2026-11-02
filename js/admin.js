// Bastion · management panel (/admin), for the administrator only.
// A page of its own: it never loads the game. Every action is an address /api/admin/... checked by the server.
'use strict';
(function () {
const $ = s => document.querySelector(s);
const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const IMG = n => `assets/img/${n}.webp`;
const fmtN = n => Math.round(+n || 0).toLocaleString('fr-FR');
const DT = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
const DTS = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
const HM = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
const dt = t => t ? DT.format(new Date(t)) : '—';
function dur(ms) { const s = Math.max(0, Math.round(ms / 1000)); if (s < 60) return s + ' s'; const m = Math.floor(s / 60); if (m < 60) return m + ' min';
  const h = Math.floor(m / 60); if (h < 48) return h + ' h ' + String(m % 60).padStart(2, '0'); return Math.floor(h / 24) + ' j ' + (h % 24) + ' h'; }
const ago = t => t ? 'il y a ' + dur(Date.now() - t) : 'jamais';
const mmss = ms => { const t = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(t / 3600), m = Math.floor(t % 3600 / 60), x = t % 60;
  return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(x).padStart(2, '0'); };
const short = c => c ? c.slice(0, 7) : '?';
const REASON = { update: 'Mise à jour du jeu', fix: 'Corrections de bugs', server: 'Entretien du serveur' };
const ROLE = { admin: 'Administrateur', tester: 'Compte de test', player: 'Joueur' };
const PART = { armor: 'Blindage', weapon: 'Arme', reactor: 'Réacteur', legs: 'Jambes' };

// ---------- session: the panel keeps its own key (logging in here never changes the account of the game) ----------
const KEY = 'bastion_admin_token';
let token = null; try { token = localStorage.getItem(KEY) || localStorage.getItem('bastion_token'); } catch (e) {}
async function api(method, url, body) {
  let r; try { r = await fetch('api/admin/' + url, { method, cache: 'no-store', headers: Object.assign({ 'Content-Type': 'application/json' }, token ? { Authorization: 'Bearer ' + token } : {}), body: body ? JSON.stringify(body) : undefined }); }
  catch (e) { const er = new Error('Serveur injoignable (redémarrage en cours ?)'); er.net = true; throw er; }
  let j = {}; try { j = await r.json(); } catch (e) {}
  if (r.status === 401) { showLogin(); throw new Error('Connecte-toi'); }
  if (r.status === 403 && j.error === 'forbidden') { showDenied(); throw new Error('Accès refusé'); }
  if (!r.ok || j.error) throw new Error(ERR[j.error] || j.error || ('erreur ' + r.status));
  return j;
}
const ERR = { no_launcher: 'Le serveur n\'a pas été démarré par le lanceur (Main file = server/launcher.js) : impossible de redémarrer d\'ici', not_found: 'adresse inconnue', banned: 'compte bloqué', banned_admin: 'compte bloqué', unknown_player: 'joueur introuvable', bad_item: 'objet inconnu', bad_unit: 'troupe inconnue', bad_part: 'pièce inconnue (le joueur n\'a peut-être pas d\'avant-poste)' };

// ---------- small tools: toast, confirmation ----------
let toastT = 0;
function toast(m, bad) { const el = $('#toast'); el.textContent = m; el.className = 'on' + (bad ? ' bad' : ''); clearTimeout(toastT); toastT = setTimeout(() => el.className = '', 3200); }
function confirmBox(title, text, okLabel, cls) {
  return new Promise(ok => {
    let m = $('#modal'); if (!m) { m = document.createElement('div'); m.id = 'modal'; document.body.appendChild(m); }
    m.innerHTML = `<div class="card"><div class="ch"><img src="${IMG('ui_warn')}" alt=""><h2>${esc(title)}</h2></div><p>${text}</p>
      <div class="row" style="margin-top:14px;justify-content:flex-end"><button class="btn sec" data-r="0">Annuler</button><button class="btn ${cls || ''}" data-r="1">${esc(okLabel || 'Confirmer')}</button></div></div>`;
    m.className = 'open';
    m.onclick = e => { const b = e.target.closest('[data-r]'); if (!b && e.target !== m) return; m.className = ''; ok(b ? b.dataset.r === '1' : false); };
  });
}
async function run(btn, fn, okMsg) {
  if (btn) btn.disabled = true;
  try { const r = await fn(); if (okMsg) toast(okMsg); return r; }
  catch (e) { toast(e.message, true); return null; }
  finally { if (btn) btn.disabled = false; }
}

// ---------- login ----------
function showLogin(msg) {
  stopTimers(); document.body.classList.add('nologin');
  $('#main').innerHTML = `<div class="login card"><div class="ch"><img src="assets/app/icon-192.png" alt="" style="border-radius:8px"><h2>Panel de gestion</h2></div>
    <p class="mut small">Réservé à l'administrateur.</p>
    <input id="ln" placeholder="Nom du commandant" autocomplete="username" maxlength="16"><input id="lp" type="password" placeholder="Mot de passe" autocomplete="current-password" maxlength="100">
    <p id="le" class="bad small">${esc(msg || '')}</p><button id="lg" class="btn wide" style="margin-top:8px"><img src="${IMG('ui_ok')}" alt="">Se connecter</button></div>`;
  const go = async () => {
    const b = $('#lg'); b.disabled = true;
    try { const r = await fetch('api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: $('#ln').value.trim(), password: $('#lp').value, panel: true }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error({ bad_login: 'Nom ou mot de passe incorrect.', too_many: 'Trop d\'essais : attends quelques minutes.', banned: 'Compte bloqué.', banned_admin: 'Compte bloqué.' }[j.error] || 'Connexion impossible.');
      token = j.token; try { localStorage.setItem(KEY, token); } catch (e) {}
      start();
    } catch (e) { $('#le').textContent = e.message; b.disabled = false; }
  };
  $('#lg').onclick = go; $('#main').onkeydown = e => { if (e.key === 'Enter') go(); };
  setTimeout(() => $('#ln') && $('#ln').focus(), 50);
}
function showDenied() {
  stopTimers();
  $('#main').innerHTML = `<div class="login card warnc"><div class="ch"><img src="${IMG('ui_lock')}" alt=""><h2>Accès refusé</h2></div>
    <p>Ce compte n'est pas administrateur. La tentative a été notée dans le journal.</p>
    <button class="btn sec wide" id="other" style="margin-top:12px">Se connecter avec un autre compte</button></div>`;
  $('#other').onclick = () => { token = null; try { localStorage.removeItem(KEY); } catch (e) {} showLogin(); };
}
$('#logout').onclick = async () => {
  let own = false; try { own = localStorage.getItem(KEY) === token; } catch (e) {}
  if (own && token) fetch('api/logout', { method: 'POST', headers: { Authorization: 'Bearer ' + token } }).catch(() => {});   // the session of the game is never closed from here
  token = null; try { localStorage.removeItem(KEY); } catch (e) {} showLogin();
};

// ---------- views ----------
let view = 'dash', D = null, timers = [];
const every = (ms, f) => timers.push(setInterval(f, ms));
function stopTimers() { timers.forEach(clearInterval); timers = []; }
let DEPLOY_DUR = 15;   // maintenance length chosen for the next deployment (minutes)
const VIEWS = { dash: viewDash, maint: viewMaint, players: viewPlayers, beta: viewBeta, chat: viewChat, ann: viewAnn, events: viewEvents, logs: viewLogs };
document.querySelectorAll('#menu [data-v]').forEach(b => b.onclick = () => go(b.dataset.v));
function go(v) {
  view = VIEWS[v] ? v : 'dash'; try { history.replaceState(null, '', '#' + view); } catch (e) {}
  document.querySelectorAll('#menu [data-v]').forEach(b => b.classList.toggle('on', b.dataset.v === view));
  stopTimers(); closeSheet(); VIEWS[view]();
}
// the server tag and the top bar (phone): which server this is
function top(title) {
  const s = D && D.server, tag = s ? `<div class="srvtag ${s.test ? 'test' : 'off'}">${s.test ? 'SERVEUR DE TEST' : 'SERVEUR OFFICIEL'}</div>` : '';
  return `<div id="mtop">${tag}<span class="sp"></span>${D && D.other ? `<a class="btn sec otherp" href="${esc(otherUrl())}">Panel ${esc(D.other.name)}</a>` : ''}<a class="btn sec" href="./">Jeu</a><button class="btn sec" onclick="document.getElementById('logout').click()">Quitter</button></div><h1>${esc(title)}</h1>`;
}
// the panel of the other server: same computer, other port (official 58689 <-> test 55000)
const otherUrl = () => `${location.protocol}//${location.hostname}:${D.other.port}/admin`;
function paintNav() {
  if (!D) return; const s = D.server, el = $('#srvtag');
  const o = $('#otherp'); if (o && D.other) { o.href = otherUrl(); o.querySelector('span').textContent = 'Aller au panel ' + D.other.name; o.className = 'btn ' + (s.test ? 'off' : 'test'); o.style.display = ''; }
  el.className = 'srvtag ' + (s.test ? 'test' : 'off'); el.textContent = s.test ? 'SERVEUR DE TEST' : 'SERVEUR OFFICIEL';
  document.title = (s.test ? '[TEST] ' : '') + 'Mekanik War · Gestion';
  const mb = $('#menu [data-v=maint]'); let d = mb.querySelector('.dot'); const want = !!(D.maint || D.plan);
  if (want && !d) { d = document.createElement('i'); d.className = 'dot'; mb.appendChild(d); } else if (!want && d) d.remove();
  const cb = $('#menu [data-v=chat]'); if (cb) { let c = cb.querySelector('.dot'); if (D.chatReports && !c) { c = document.createElement('i'); c.className = 'dot'; cb.appendChild(c); } else if (!D.chatReports && c) c.remove(); }
}
async function loadDash(fresh) { D = await api('GET', 'dash' + (fresh ? '?fresh=1' : '')); D.skew = Date.now() - D.now; paintNav(); return D; }
const now = () => Date.now() - ((D && D.skew) || 0);   // the server clock

function statusPills() {
  const p = [];
  if (D.maint) p.push(`<span class="pill mt"><i></i>Maintenance · réouverture dans <b data-cd="${D.maint.since + D.maint.dur * 60000}">${mmss(D.maint.since + D.maint.dur * 60000 - now())}</b></span>`);
  else if (D.plan) p.push(`<span class="pill pl"><i></i>Maintenance dans <b data-cd="${D.plan.at}">${mmss(D.plan.at - now())}</b></span>`);
  else p.push(`<span class="pill on"><i></i>En ligne</span>`);
  if (D.ann) p.push(`<span class="pill an"><i></i>Annonce en cours</span>`);
  return `<div class="pills">${p.join('')}</div>`;
}
function tickCountdowns() { document.querySelectorAll('[data-cd]').forEach(el => { el.textContent = mmss(+el.dataset.cd - now()); });
  document.querySelectorAll('[data-up]').forEach(el => { el.textContent = dur(now() - +el.dataset.up); }); }
function versionKv(s) {
  return `<div class="kv"><span>Commit</span><span class="mono">${esc(short(s.commit))}</span><span>Message</span><span>${esc(s.subject || '—')}</span>
    <span>Nouveautés</span><span class="mono">${esc(s.patch || '?')}</span><span>Branche</span><span class="mono">${esc(s.branch || '?')}</span></div>`;
}
function testCard(full) {
  const t = D.testServer, s = D.server; if (s.test || !t) return '';
  if (!t.ok) return `<div class="card warnc"><div class="ch"><img src="${IMG('radar')}" alt=""><h2>Serveur de test</h2></div><p class="warn">Version illisible : ${esc(t.error)}.</p><p class="mut small">${esc(t.url)}/api/health</p></div>`;
  const same = t.commit && t.commit === s.commit;
  return `<div class="card${same ? '' : ' warnc'}"><div class="ch"><img src="${IMG('radar')}" alt=""><h2>Serveur de test</h2></div>
    ${versionKv(t)}<p style="margin-top:8px" class="${same ? 'ok' : 'warn'}">${same ? 'Même version que l\'officiel.' : (t.commit ? 'Version différente de l\'officiel : prête à être déployée après tes tests.' : 'Commit inconnu (le serveur de test a une ancienne version).')}</p>
    ${full || same || !t.commit ? '' : `<div class="row"><button class="btn ora" onclick="location.hash='maint'"><img src="${IMG('ui_build')}" alt="">Aller au déploiement</button></div>`}</div>`;
}
function deployCard() {
  const r = D.lastDeploy; if (!r) return '';
  return `<div class="card${r.ok ? '' : ' warnc'}"><div class="ch"><img src="${IMG(r.ok ? 'ui_ok' : 'ui_warn')}" alt=""><h2>Dernière installation</h2></div>
    ${r.ok ? `<p class="ok">Réussie le ${dt(r.at)} : ${esc(short(r.before))} → ${esc(short(r.commit))}</p>` : `<p class="bad">Échec le ${dt(r.at)} : ${esc(r.error)}</p><p class="mut small">L'ancienne version a redémarré.</p>`}</div>`;
}

// ===== 1. dashboard =====
async function viewDash() {
  if (!D) $('#main').innerHTML = top('Tableau de bord') + '<p class="mut">Chargement…</p>';
  const draw = () => {
    const s = D.server;
    $('#main').innerHTML = top('Tableau de bord') + `<div class="grid">
      <div class="card"><div class="ch"><img src="${IMG('power')}" alt=""><h2>État du jeu</h2></div>${statusPills()}
        ${D.maint ? `<p style="margin-top:8px">Depuis ${dt(D.maint.since)} · durée prévue ${D.maint.dur} min · ${esc(REASON[D.maint.reason] || '')}</p>` : ''}
        ${D.ann ? `<p class="small mut" style="margin-top:8px">Annonce : ${esc(D.ann.text)}</p>` : ''}
        <div class="stat" style="margin-top:12px"><div><span class="big">${D.online}</span><small>connectés</small></div><div><span class="big">${D.players}</span><small>inscrits</small></div><div><span class="big">${D.banned}</span><small>bloqués</small></div></div></div>
      <div class="card"><div class="ch"><img src="${IMG('command')}" alt=""><h2>Version installée</h2></div>${versionKv(s)}
        <div class="kv" style="margin-top:6px"><span>Démarré</span><span>il y a <b data-up="${s.started}">${dur(now() - s.started)}</b></span><span>Mémoire</span><span>${s.mem} Mo · Node ${esc(s.node)}</span>
        <span>Lanceur</span><span>${s.launcher ? '<span class="ok">oui</span> (redémarrage possible)' : '<span class="warn">non</span> (Main file ≠ server/launcher.js)'}</span></div></div>
      ${testCard()}${deployCard()}
      <div class="card wide"><div class="ch"><img src="${IMG('ui_warn')}" alt=""><h2>Dernières erreurs</h2></div>
        ${D.errors.length ? D.errors.map(e => `<div class="err"><span class="mut mono">${DTS.format(new Date(e.at))}</span> ${esc(e.msg)}</div>`).join('') : '<p class="ok">Aucune erreur.</p>'}</div></div>`;
  };
  if (await run(null, () => loadDash())) draw();
  every(1000, tickCountdowns);
  every(5000, async () => { if (await run(null, () => loadDash())) draw(); });
}

// ===== 2. maintenance and update =====
async function viewMaint() {
  const draw = () => {
    const s = D.server, t = D.testServer, upd = s.test ? '' : `
      <div class="card wide${t && t.ok && t.commit && t.commit !== s.commit ? ' warnc' : ''}"><div class="ch"><img src="${IMG('ui_build')}" alt=""><h2>Déployer la version testée</h2></div>
        <div class="grid"><div><h3>Installée ici (officiel)</h3>${versionKv(s)}</div>
        <div><h3>Sur le serveur de test</h3>${t && t.ok ? versionKv(t) : `<p class="warn">${esc(t ? t.error : 'inconnue')}</p>`}</div></div>
        <div class="note">Le serveur officiel passe en maintenance (s'il n'y est pas déjà), installe exactement la version du serveur de test, puis redémarre <b>toujours en maintenance</b>. Tu vérifies, puis tu cliques « Remettre en ligne ». Si tu oublies, le jeu se rouvre tout seul à la fin de la durée choisie.</div>
        <div class="row"><label>Durée de la maintenance<select id="ddur">${[15, 30, 60, 120].map(v => `<option value="${v}"${v === DEPLOY_DUR ? ' selected' : ''}>${v < 60 ? v + ' min' : v / 60 + ' h'}</option>`).join('')}</select></label></div>
        <div class="row"><button class="btn ora" id="deploy" ${t && t.ok && t.commit && t.commit !== s.commit && s.launcher ? '' : 'disabled'}><img src="${IMG('ui_build')}" alt="">Déployer ${t && t.commit ? esc(short(t.commit)) : ''}</button>
          <button class="btn sec sm" id="reloadtest"><img src="${IMG('radar')}" alt="">Relire la version du test</button></div>
        ${t && t.ok && t.commit === s.commit ? '<p class="ok small">Le serveur de test a la même version : rien à déployer.</p>' : ''}${s.launcher ? '' : '<p class="warn small">Le lanceur n\'est pas utilisé : déploiement impossible d\'ici.</p>'}</div>`;
    const plan = D.plan, m = D.maint;
    const ctrl = m ? `
        <p>Le jeu est <b class="bad">en maintenance</b> depuis ${dt(m.since)} (durée prévue ${m.dur} min) · ${esc(REASON[m.reason] || '')}.</p>
        <p>Réouverture automatique dans <b class="warn" data-cd="${m.since + m.dur * 60000}">${mmss(m.since + m.dur * 60000 - now())}</b> (à ${HM.format(new Date(m.since + m.dur * 60000))}) : si tu oublies de remettre en ligne, le jeu se rouvre tout seul.</p>
        <p class="mut small">Les joueurs voient l'écran de maintenance, leurs ordres sont refusés, les compteurs continuent. Toi, tu joues normalement.</p>
        <div class="row" style="margin-top:10px"><button class="btn" id="online"><img src="${IMG('ui_ok')}" alt="">Remettre en ligne</button><button class="btn sec" id="ext15"><img src="${IMG('ui_time')}" alt="">+15 min</button><button class="btn sec" id="ext60"><img src="${IMG('ui_time')}" alt="">+1 h</button></div>`
      : plan ? `
        <p>Maintenance annoncée : début dans <b class="warn" data-cd="${plan.at}">${mmss(plan.at - now())}</b> (à ${HM.format(new Date(plan.at))}), durée prévue ${plan.dur} min · ${esc(REASON[plan.reason] || '')}.</p>
        <p class="mut small">À zéro, le jeu passe tout seul en maintenance.</p>
        <div class="row" style="margin-top:10px"><button class="btn red" id="mnow"><img src="${IMG('ui_lock')}" alt="">Lancer la maintenance maintenant</button><button class="btn sec" id="mcancel"><img src="${IMG('ui_close')}" alt="">Annuler l'annonce</button></div>`
      : `
        <div class="row"><label>Début<select id="min">${[[0, 'Tout de suite'], [5, 'Dans 5 min'], [10, 'Dans 10 min'], [15, 'Dans 15 min'], [30, 'Dans 30 min'], [60, 'Dans 1 h']].map(([v, l]) => `<option value="${v}"${v === 10 ? ' selected' : ''}>${l}</option>`).join('')}</select></label>
          <label>Durée prévue<select id="mdur">${[5, 10, 15, 30, 60, 120, 240].map(v => `<option value="${v}"${v === 30 ? ' selected' : ''}>${v < 60 ? v + ' min' : v / 60 + ' h'}</option>`).join('')}</select></label>
          <label>Motif<select id="mreason">${Object.entries(REASON).map(([k, l]) => `<option value="${k}">${l}</option>`).join('')}</select></label></div>
        <div class="preview warn" id="mprev"></div>
        <p class="mut small">Message déjà traduit dans les 9 langues : chaque joueur le voit dans sa langue.</p>
        <div class="row" style="margin-top:8px"><button class="btn ora" id="mplan"><img src="${IMG('ui_time')}" alt="">Annoncer la maintenance</button></div>`;
    $('#main').innerHTML = top('Maintenance et mise à jour') + `
      <div class="card${m || plan ? ' warnc' : ''}"><div class="ch"><img src="${IMG('ui_time')}" alt=""><h2>Maintenance</h2>${statusPills()}</div>${ctrl}</div>
      ${upd}${s.test ? '' : deployCard()}
      <div class="card"><div class="ch"><img src="${IMG('ui_repair')}" alt=""><h2>Redémarrer le serveur</h2></div>
        <p class="mut small">Le jeu s'arrête quelques secondes puis revient (les joueurs voient « Maintenance » pendant ce temps). ${s.test ? 'Sur le serveur de test, le redémarrage récupère aussi la dernière version de la branche test (si Auto Update est activé dans Pelican).' : ''}${m ? ' Il redémarre en maintenance.' : ''}</p>
        <div class="row"><button class="btn sec" id="restart" ${s.launcher ? '' : 'disabled'}><img src="${IMG('ui_repair')}" alt="">Redémarrer</button></div></div>`;
    const prev = () => { const el = $('#mprev'); if (!el) return; const mi = +$('#min').value;
      el.innerHTML = mi ? `<b>Maintenance dans ${mi}:00</b><br><span class="small">${esc(REASON[$('#mreason').value])} · Durée prévue : ${$('#mdur').value} min</span>` : `<b>Maintenance immédiate</b><br><span class="small">Les joueurs voient tout de suite l'écran de maintenance (durée prévue : ${$('#mdur').value} min).</span>`; };
    ['#min', '#mdur', '#mreason'].forEach(k => { const el = $(k); if (el) el.onchange = prev; }); prev();
    const on = (id, f) => { const b = $('#' + id); if (b) b.onclick = () => f(b); };
    on('mplan', async b => { const mi = +$('#min').value;
      if (!mi && !(await confirmBox('Maintenance immédiate', 'Les joueurs sont bloqués tout de suite. Continuer ?', 'Lancer', 'red'))) return;
      if (await run(b, () => api('POST', 'maint', { op: 'plan', in: mi, dur: +$('#mdur').value, reason: $('#mreason').value }), mi ? 'Maintenance annoncée' : 'Jeu en maintenance')) refresh(); });
    on('mnow', async b => { if (await confirmBox('Lancer maintenant', 'Le compte à rebours est arrêté et les joueurs sont bloqués tout de suite.', 'Lancer', 'red') && await run(b, () => api('POST', 'maint', { op: 'now' }), 'Jeu en maintenance')) refresh(); });
    on('mcancel', async b => { if (await run(b, () => api('POST', 'maint', { op: 'cancel' }), 'Annonce annulée')) refresh(); });
    for (const [id, add] of [['ext15', 15], ['ext60', 60]]) on(id, async b => { if (await run(b, () => api('POST', 'maint', { op: 'extend', add }), `Maintenance prolongée de ${add < 60 ? add + ' min' : '1 h'}`)) refresh(); });
    on('online', async b => { if (await confirmBox('Remettre en ligne', 'Tous les joueurs connectés vont recharger le jeu et pourront rejouer.', 'Remettre en ligne') && await run(b, () => api('POST', 'maint', { op: 'off' }), 'Jeu en ligne : les joueurs rechargent')) refresh(); });
    on('reloadtest', async b => { if (await run(b, () => loadDash(true))) draw(); });
    on('restart', async b => { if (!(await confirmBox('Redémarrer', 'Le serveur s\'arrête quelques secondes puis revient tout seul.', 'Redémarrer', 'ora'))) return;
      if (await run(b, () => api('POST', 'restart', {}), 'Redémarrage en cours…')) waitBack(D.server.commit); });
    { const dd = $('#ddur'); if (dd) dd.onchange = () => { DEPLOY_DUR = +dd.value; }; }
    on('deploy', async b => { const t = D.testServer;
      if (!(await confirmBox('Déployer la version testée', `Installer <b class="mono">${esc(short(t.commit))}</b> — ${esc(t.subject)} (Nouveautés ${esc(t.patch)}) sur le serveur officiel ?<br><br>Le jeu passe en maintenance et redémarre ; il reste en maintenance jusqu'à ce que tu le remettes en ligne, ou au plus ${DEPLOY_DUR < 60 ? DEPLOY_DUR + ' min' : DEPLOY_DUR / 60 + ' h'} (réouverture automatique).`, 'Déployer', 'ora'))) return;
      if (await run(b, () => api('POST', 'deploy', { commit: t.commit, dur: DEPLOY_DUR }), 'Installation en cours…')) waitBack(D.server.commit); });
  };
  const refresh = async () => { if (await run(null, () => loadDash())) draw(); };
  if (await run(null, () => loadDash(true))) draw();
  every(1000, tickCountdowns);
  every(5000, async () => { const active = document.activeElement && /SELECT|INPUT/.test(document.activeElement.tagName); if (!active) refresh(); else loadDash().catch(() => {}); });
}
// after a restart: wait until the server answers again, then show the result
function waitBack(before) {
  stopTimers();
  $('#main').innerHTML = top('Redémarrage') + `<div class="card"><div class="ch"><img class="spin" src="${IMG('ui_repair')}" alt=""><h2>Le serveur redémarre…</h2></div><p id="wb" class="mut">En attente du serveur…</p></div>`;
  const t0 = Date.now(); let seenDown = false;
  every(1500, async () => {
    try { const r = await fetch('api/health', { cache: 'no-store' }); const h = await r.json(); if (!seenDown && h.uptime > (Date.now() - t0) / 1000 + 3) return;
      stopTimers(); await loadDash(); toast(D.server.commit !== before ? `Nouvelle version installée : ${short(D.server.commit)}` : 'Serveur redémarré');
      go('maint'); }
    catch (e) { seenDown = true; $('#wb').textContent = 'Serveur arrêté, redémarrage… (' + Math.round((Date.now() - t0) / 1000) + ' s)'; }
  });
}

// ===== 3. players =====
let PL = null, ptab = 'online', psort = 'seen', pq = '', CAT = null;
async function viewPlayers() {
  const draw = () => {
    if (!PL) return;
    const n = now(), on = PL.filter(p => p.online), off = PL.filter(p => !p.online);
    let list = ptab === 'online' ? on : ptab === 'offline' ? off : PL;
    if (pq) list = list.filter(p => p.name.toLowerCase().includes(pq.toLowerCase()));
    const key = { lvl: p => -(p.lvl * 1e12 + p.power), power: p => -p.power, created: p => -p.created, seen: p => -(p.online ? 1e15 - p.online : p.seen), name: p => p.name.toLowerCase() }[psort];
    list = [...list].sort((a, b) => { const x = key(a), y = key(b); return x < y ? -1 : x > y ? 1 : 0; });
    const rows = list.slice(0, 400).map(p => `<div class="prow" data-p="${esc(p.name)}">
        <div class="pn"><i class="on${p.online ? ' y' : ''}"></i><b>${esc(p.name)}</b>${p.role !== 'player' ? `<span class="badge ${p.role}">${ROLE[p.role] || esc(p.role)}</span>` : ''}${p.banned ? '<span class="badge ban">bloqué</span>' : ''}</div>
        <div>niv. ${p.lvl}</div><div class="c3">${fmtN(p.power)}</div>
        <div class="c4">${p.online ? `<span class="ok">en ligne depuis ${dur(n - p.online)}</span>` : `vu ${ago(p.seen)}`} · <span class="mut">inscrit le ${dt(p.created)}</span></div></div>`).join('');
    const box = $('#plist'); if (box) box.innerHTML = `<div class="prow phead"><div>Commandant</div><div>Niveau</div><div class="c3">Puissance</div><div class="c4">Connexion</div></div>` + (rows || '<p class="mut" style="padding:8px">Aucun joueur.</p>');
    document.querySelectorAll('[data-tab]').forEach(b => { b.classList.toggle('on', b.dataset.tab === ptab); b.querySelector('b').textContent = { online: on.length, offline: off.length, all: PL.length }[b.dataset.tab]; });
  };
  $('#main').innerHTML = top('Joueurs') + `<div class="card">
    <div class="row"><input id="pq" class="grow" placeholder="Chercher un pseudo" value="${esc(pq)}">
      <select id="psort">${[['seen', 'Tri : connexion'], ['lvl', 'Tri : niveau'], ['power', 'Tri : puissance'], ['created', 'Tri : inscription'], ['name', 'Tri : nom']].map(([v, l]) => `<option value="${v}"${v === psort ? ' selected' : ''}>${l}</option>`).join('')}</select>
      <button class="btn sm" id="newacc"><img src="${IMG('ui_star')}" alt="">Créer un compte</button></div>
    <div class="tabs">${[['online', 'En ligne'], ['offline', 'Hors ligne'], ['all', 'Tous']].map(([k, l]) => `<button class="tab" data-tab="${k}">${l} (<b>…</b>)</button>`).join('')}</div>
    <div class="plist" id="plist"><p class="mut">Chargement…</p></div></div>`;
  $('#pq').oninput = e => { pq = e.target.value.trim(); draw(); };
  $('#psort').onchange = e => { psort = e.target.value; draw(); };
  document.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { ptab = b.dataset.tab; draw(); });
  $('#plist').onclick = e => { const r = e.target.closest('[data-p]'); if (r) openPlayer(r.dataset.p); };
  $('#newacc').onclick = createAccount;
  const load = async () => { const j = await run(null, () => api('GET', 'players')); if (j) { PL = j.players; draw(); } };
  await load(); every(10000, () => { if (!$('#sheet.open')) load(); });
  loadDash().catch(() => {});
}
function sheet(html) { let s = $('#sheet'); if (!s) { s = document.createElement('div'); s.id = 'sheet'; document.body.appendChild(s);
    s.addEventListener('click', e => { if (e.target === s || e.target.closest('.close')) closeSheet(); }); }
  s.innerHTML = `<div class="card"><button class="close"><img src="${IMG('ui_close')}" alt=""></button>${html}</div>`; s.className = 'open'; s.scrollTop = 0; return s; }
function closeSheet() { const s = $('#sheet'); if (s) s.className = ''; }
function createAccount() {
  const s = sheet(`<div class="ch"><img src="${IMG('ui_star')}" alt=""><h2>Créer un compte</h2></div>
    <p class="mut small">${D && D.server.test ? 'Pour tes testeurs. Sur ce serveur de test, c\'est la seule façon de créer un compte.' : 'Serveur officiel : le compte créé est un joueur normal (pas de boutons de test).'}</p>
    <div class="row"><input id="cn" class="grow" placeholder="Nom du commandant" maxlength="16"><input id="cp" class="grow" placeholder="Mot de passe (6 caractères min.)" maxlength="100"></div>
    <div class="row"><select id="cr">${D && D.server.test ? '<option value="tester">Compte de test (boutons de test)</option>' : ''}<option value="player">Joueur normal</option></select>
      <button class="btn" id="cgo"><img src="${IMG('ui_ok')}" alt="">Créer</button></div><p id="cres"></p>`);
  s.querySelector('#cp').value = Math.random().toString(36).slice(2, 10);
  s.querySelector('#cgo').onclick = async e => { const name = $('#cn').value.trim(), password = $('#cp').value;
    const j = await run(e.currentTarget, () => api('POST', 'create', { name, password, role: $('#cr').value }));
    if (j) { $('#cres').innerHTML = `<span class="ok">Compte <b>${esc(j.name)}</b> créé.</span> Mot de passe à lui donner : <b class="mono">${esc(password)}</b>`; PL = null; api('GET', 'players').then(x => { PL = x.players; }).catch(() => {}); } };
}
async function openPlayer(name) {
  const j = await run(null, () => api('GET', 'player?name=' + encodeURIComponent(name))); if (!j) return;
  if (!CAT) CAT = await run(null, () => api('GET', 'catalog')) || { items: [], units: [], res: [] };
  const p = j.player, n = j.now, opts = (l) => l.map(x => `<option value="${esc(x.id)}">${esc(x.name)}</option>`).join('');
  const res = Object.entries(p.res || {}).filter(([k]) => CAT.res.some(r => r.id === k)).map(([k, v]) => `${esc(CAT.res.find(r => r.id === k).name)} ${fmtN(v)}`).join(' · ');
  const parts = (pre, img) => Object.keys(PART).map(k => `<button data-part="${pre}${k}"><img src="${img(k)}" alt="">${PART[k]}</button>`).join('');
  const s = sheet(`<div class="ch"><img src="${IMG('troops')}" alt=""><h2>${esc(p.name)}</h2></div>
    <div class="pills" style="margin-bottom:10px">${p.online ? `<span class="pill on"><i></i>En ligne depuis ${dur(n - p.online)}</span>` : `<span class="pill mt" style="color:var(--mut);border-color:#444;background:#1118"><i></i>Hors ligne · vu ${ago(p.seen)}</span>`}
      <span class="pill an">${ROLE[p.role] || esc(p.role)}</span>${p.banned ? `<span class="pill mt"><i></i>Bloqué depuis le ${dt(p.banned)}</span>` : ''}</div>
    <div class="kv"><span>Niveau</span><span>${p.lvl} · puissance ${fmtN(p.power)} · Centre de commandement niv. ${p.cc || 1}</span>
      <span>Base</span><span>${p.pos ? `(${p.pos.x}, ${p.pos.y})` : '—'}${p.shield ? ` · protégée jusqu'au ${dt(p.shield)}` : ''}</span>
      <span>Avant-poste</span><span>${p.outpost ? `Rempart en (${p.outpost.x}, ${p.outpost.y}) · niv. ${p.outpost.lvl}${p.outpost.titan ? ' · Titan Rempart niv. ' + p.outpost.titan : ''}` : 'aucun'}</span>
      <span>Titan</span><span>${p.titan ? 'niv. ' + p.titan : 'aucun'}</span><span>Troupes</span><span>${fmtN(p.troops)} à la base</span>
      <span>Ressources</span><span class="small">${res || '—'}</span>
      <span>Inscrit</span><span>${dt(p.created)}</span><span>Adresse</span><span class="mono">${esc(p.ip || 'inconnue (pas vu depuis le démarrage)')}${p.games ? ` · ${p.games} partie(s) ouverte(s)` : ''}</span>
      <span>E-mail</span><span>${p.email ? esc(p.email) + (p.email_ok ? ' <span class="ok small">confirmée</span>' : ' <span class="warn small">pas encore confirmée</span>') : '<span class="mut">aucune</span>'}</span>
      <span>Ordres</span><span>${p.orders.m1} dans la dernière minute · ${p.orders.m10} en 10 min${p.orders.bad ? ` · <span class="warn">${p.orders.bad} requête(s) hors du jeu</span>` : ''}</span></div>
    <h3>Actions</h3>
    <div class="row">${p.admin ? '<span class="mut small">Compte principal : il ne peut être ni bloqué, ni déconnecté, ni changé de rôle.</span>' : `
      <button class="btn sec sm" id="kick"${p.online || p.games ? '' : ''}><img src="${IMG('ui_back')}" alt="">Déconnecter tout de suite</button>
      <select id="role">${Object.entries(ROLE).filter(([k]) => k !== 'tester' || (D && D.server.test) || p.role === 'tester').map(([k, l]) => `<option value="${k}"${k === p.role ? ' selected' : ''}>${l}</option>`).join('')}</select><button class="btn sec sm" id="setrole">Changer le rôle</button>`}</div>
    ${p.admin ? '' : p.banned ? `<div class="row"><button class="btn sm" id="unban"><img src="${IMG('ui_ok')}" alt="">Débloquer</button></div>`
      : `<div class="row"><input id="motif" class="grow" maxlength="200" placeholder="Motif du blocage (le joueur le verra)"><button class="btn red sm" id="ban"><img src="${IMG('ui_lock')}" alt="">Bloquer</button></div>`}
    <h3>Mot de passe et compte</h3>
    <div class="row"><button class="btn sec sm" id="pwmail"${p.email ? '' : ' disabled'}><img src="${IMG('messages')}" alt="">Envoyer un lien de réinitialisation</button>
      <button class="btn sec sm" id="pwtemp"><img src="${IMG('ui_lock')}" alt="">Mot de passe provisoire</button>
      ${p.admin ? '' : `<button class="btn red sm" id="delacc"><img src="${IMG('ui_close')}" alt="">Supprimer le compte</button>`}</div>
    ${p.mailOn ? '' : '<p class="mut small">Les e-mails ne partent pas encore : il manque les réglages SMTP dans les variables du serveur (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM).</p>'}
    ${D && D.server.test ? `<h3>Dons</h3>
    <div class="gifts">
      <div class="gift"><h3><img src="${IMG('metal')}" alt="">Ressources</h3><div class="row"><select id="gres">${opts(CAT.res)}<option value="all">Toutes (sauf alliage)</option></select></div>
        <div class="row"><input id="gresn" type="number" min="1" value="100000"><button class="btn sm" data-give="res">Donner</button></div></div>
      <div class="gift"><h3><img src="${IMG('inventory')}" alt="">Objets</h3><div class="row"><select id="gitem">${opts(CAT.items)}</select></div>
        <div class="row"><input id="gitemn" type="number" min="1" value="1"><button class="btn sm" data-give="item">Donner</button></div></div>
      <div class="gift"><h3><img src="${IMG('troops')}" alt="">Troupes</h3><div class="row"><select id="gunit">${opts(CAT.units)}</select></div>
        <div class="row"><input id="gunitn" type="number" min="1" value="1000"><button class="btn sm" data-give="unit">Donner</button></div></div>
      <div class="gift"><h3><img src="${IMG('titan_1')}" alt="">Pièces du Titan</h3><div class="parts">${parts('', k => IMG('eq_' + k + '_1'))}</div>
        <h3><img src="${IMG('rempart_titan_1')}" alt="">Pièces du Titan Rempart</h3><div class="parts">${parts('r_', k => IMG('rempart_eq_' + k))}</div>
        <h3><img src="${IMG('brasier_titan_1')}" alt="">Pièces du Titan Brasier</h3><div class="parts">${parts('b_', k => IMG('brasier_eq_' + k))}</div></div>
    </div>` : '<p class="mut small">Serveur officiel : pas de dons, tout le monde joue normalement. Les dons se font sur le serveur de test.</p>'}
    <h3>Rapport anti-triche</h3>
    ${p.bans.length ? p.bans.map(b => `<div class="ban"><b>${b.active ? 'Blocage en cours' : 'Ancien blocage'}</b> · ${dt(b.at)}<br>${esc(b.text)}${b.ip ? `<br><span class="mut small">Adresse ${esc(b.ip)}${b.ua ? ' · ' + esc(b.ua) : ''}</span>` : ''}
      ${b.last.length ? `<div class="ord">Derniers ordres : ${b.last.map(o => `${esc(DTS.format(new Date(o.t)).slice(-8))}${o.gap ? ' (+' + o.gap + ' s)' : ''} ${esc(o.a)}`).join(' · ')}</div>` : ''}</div>`).join('') : '<p class="ok small">Jamais bloqué.</p>'}`);
  const reopen = async (msg) => { toast(msg); PL = null; openPlayer(p.name); api('GET', 'players').then(x => { PL = x.players; }).catch(() => {}); };
  const act = async (b, body, msg) => { if (await run(b, () => api('POST', 'player', Object.assign({ name: p.name }, body)))) reopen(msg); };
  const on = (id, f) => { const b = s.querySelector('#' + id); if (b) b.onclick = () => f(b); };
  on('kick', async b => { if (await confirmBox('Déconnecter', `${esc(p.name)} est renvoyé à l'écran de connexion tout de suite (il peut se reconnecter).`, 'Déconnecter', 'ora')) act(b, { op: 'kick' }, 'Joueur déconnecté'); });
  on('pwmail', async b => { if (await confirmBox('Lien de réinitialisation', `Un e-mail part vers l'adresse de ${esc(p.name)} avec un lien valable 1 heure.`, 'Envoyer')) act(b, { op: 'pwmail' }, 'Lien envoyé'); });
  on('pwtemp', async b => { if (!await confirmBox('Mot de passe provisoire', `Le mot de passe de ${esc(p.name)} est remplacé, et ses parties ouvertes sont fermées. Tu lui donnes le nouveau mot de passe toi-même (il pourra le changer dans les Paramètres du jeu).`, 'Remplacer', 'ora')) return;
    try { const j = await api('POST', 'player', { name: p.name, op: 'pwtemp' }); await confirmBox('Nouveau mot de passe de ' + esc(p.name), `<b class="mono" style="font-size:20px">${esc(j.password)}</b><br><span class="mut small">Il n'est affiché qu'une fois : note-le pour le donner au joueur.</span>`, 'OK'); } catch (e) { toast(e.message, true); } });
  on('delacc', async b => { const c = prompt(`Supprimer définitivement le compte ${p.name} (base, avant-postes, messages) ?\nÉcris son nom exact pour confirmer :`); if (c === null) return;
    if (c !== p.name) return toast('Nom différent : rien n\'est supprimé', true);
    if (await run(b, () => api('POST', 'player', { name: p.name, op: 'delete', confirm: c }), 'Compte supprimé')) { PL = null; go('players'); } });
  on('setrole', b => act(b, { op: 'role', role: s.querySelector('#role').value }, 'Rôle changé'));
  on('unban', b => act(b, { op: 'unban' }, 'Joueur débloqué'));
  on('ban', async b => { const motif = s.querySelector('#motif').value.trim(); if (!motif) return toast('Indique un motif', true);
    if (await confirmBox('Bloquer ' + p.name, `Motif : « ${esc(motif)} ».<br>Sa partie se ferme tout de suite et il ne peut plus se connecter.`, 'Bloquer', 'red')) act(b, { op: 'ban', motif }, 'Joueur bloqué'); });
  s.querySelectorAll('[data-give]').forEach(b => b.onclick = async () => {
    const k = b.dataset.give, v = id => s.querySelector('#' + id).value;
    const body = k === 'res' ? { action: 'give_res', p: { res: v('gres'), amount: +v('gresn') } } : k === 'item' ? { action: 'give_item', p: { id: v('gitem'), n: +v('gitemn') } } : { action: 'give_troops', p: { u: v('gunit'), n: +v('gunitn') } };
    if (await run(b, () => api('POST', 'player', Object.assign({ name: p.name, op: 'give' }, body)), 'Envoyé à ' + p.name)) openPlayer(p.name);
  });
  s.querySelectorAll('[data-part]').forEach(b => b.onclick = async () => {
    if (await run(b, () => api('POST', 'player', { name: p.name, op: 'give', action: 'titan_part', p: { s: b.dataset.part } }), 'Pièce envoyée à ' + p.name)) openPlayer(p.name); });
}

// ===== 4. announcements =====
async function viewAnn() {
  const draw = (list) => {
    const n = now(), a = D.ann;
    $('#main').innerHTML = top('Annonces') + `
      ${a ? `<div class="card warnc"><div class="ch"><img src="${IMG('messages')}" alt=""><h2>Annonce en cours</h2></div>
        <div class="preview${a.color === 'warn' ? ' warn' : ''}">${esc(a.text)}</div><p class="mut small">Visible jusqu'à ${HM.format(new Date(a.until))} (encore <span data-cd="${a.until}">${mmss(a.until - n)}</span>).</p>
        <div class="row"><button class="btn red sm" id="aoff"><img src="${IMG('ui_close')}" alt="">Retirer l'annonce</button></div></div>` : ''}
      <div class="card"><div class="ch"><img src="${IMG('messages')}" alt=""><h2>Nouvelle annonce</h2></div>
        <textarea id="at" maxlength="300" placeholder="Message pour tous les joueurs (300 caractères max.)"></textarea>
        <div class="row"><label>Couleur<select id="ac"><option value="info">Info (laiton)</option><option value="warn">Alerte (orange)</option></select></label>
          <label>Durée<select id="ad">${[[5, '5 min'], [15, '15 min'], [30, '30 min'], [60, '1 h'], [180, '3 h'], [720, '12 h'], [1440, '24 h'], [4320, '3 jours']].map(([v, l]) => `<option value="${v}"${v === 60 ? ' selected' : ''}>${l}</option>`).join('')}</select></label></div>
        <div class="preview" id="aprev"><span class="mut">Aperçu</span></div>
        <p class="mut small">Le texte est affiché tel quel (il n'est pas traduit) : écris-le dans la langue de tes joueurs. Il remplace l'annonce en cours. Les joueurs qui se connectent pendant sa durée le voient aussi.</p>
        <div class="row"><button class="btn" id="ago"><img src="${IMG('ui_ok')}" alt="">Publier</button></div></div>
      <div class="card"><div class="ch"><img src="${IMG('reports')}" alt=""><h2>Historique (10 dernières)</h2></div>
        ${list.length ? list.map(x => `<div class="err"><span class="mut mono">${dt(x.at)}</span> <span class="badge ${x.color === 'warn' ? 'ban' : 'admin'}">${x.color === 'warn' ? 'alerte' : 'info'}</span> ${esc(x.text)}
          <span class="mut small">· ${x.until > n ? 'en cours' : 'terminée ' + dt(x.until)}</span></div>`).join('') : '<p class="mut">Aucune annonce.</p>'}</div>`;
    const prev = () => { const t = $('#at').value.trim(), el = $('#aprev'); el.className = 'preview' + ($('#ac').value === 'warn' ? ' warn' : ''); el.textContent = t || 'Aperçu'; };
    $('#at').oninput = prev; $('#ac').onchange = prev;
    $('#ago').onclick = async e => { const text = $('#at').value.trim(); if (!text) return toast('Le message est vide', true);
      if (await run(e.currentTarget, () => api('POST', 'announce', { text, color: $('#ac').value, min: +$('#ad').value }), 'Annonce publiée')) load(); };
    const off = $('#aoff'); if (off) off.onclick = async () => { if (await run(off, () => api('POST', 'announce', { op: 'off' }), 'Annonce retirée')) load(); };
  };
  const load = async () => { const [, l] = await Promise.all([loadDash(), api('GET', 'announces')]).catch(e => { toast(e.message, true); return [null, null]; }); if (l) draw(l.list); };
  await load(); every(1000, tickCountdowns);
}

// ===== beta test: settings, testers, invitations, reward, bug reports, reset =====
async function viewBeta() {
  let B = null, tab = 'list';
  const SRC = { site: 'site', panel: 'ajouté à la main', compte: 'compte existant' };
  const draw = () => {
    const free = Math.max(0, B.places - B.count), bugsOpen = B.bugs.filter(b => !b.done).length;
    $('#main').innerHTML = top('Bêta') + `
      <div class="card ${B.on ? 'warnc' : ''}"><div class="ch"><img src="${IMG('quests')}" alt=""><h2>Mode bêta</h2><span class="badge ${B.on ? 'ban' : ''}">${!B.on ? 'désactivé' : B.started ? 'BÊTA LANCÉE' : 'JEU FERMÉ'}</span></div>
        <p class="small">${!B.on ? 'Le jeu est ouvert à tout le monde.'
          : B.started ? '<b>Bêta lancée</b> : seuls les comptes de la liste des inscrits peuvent jouer (et créer leur compte avec la même adresse e-mail). Les autres comptes sont refusés. La boutique payante est cachée.'
          : '<b>Jeu fermé</b> : personne ne peut jouer ni créer de compte, sauf toi. Les joueurs voient « La bêta n\'a pas encore commencé ». Le jour J, clique sur « Lancer la bêta ».'}</p>
        <div class="row">${B.on ? `<button class="btn ${B.started ? 'sec' : 'ora'}" id="bstart"><img src="${IMG(B.started ? 'ui_lock' : 'ui_ok')}" alt="">${B.started ? 'Refermer le jeu (bêta en pause)' : 'Lancer la bêta (ouvrir aux inscrits)'}</button>` : ''}
          <button class="btn ${B.on ? 'sec' : 'ora'}" id="bon"><img src="${IMG(B.on ? 'ui_close' : 'ui_ok')}" alt="">${B.on ? 'Désactiver le mode bêta (jeu ouvert à tous)' : 'Activer le mode bêta'}</button></div></div>
      <div class="card"><div class="ch"><img src="${IMG('messages')}" alt=""><h2>Inscriptions sur le site</h2><span class="badge ${B.open && free ? 'admin' : 'ban'}">${!free ? 'COMPLET' : B.open ? 'ouvertes' : 'fermées'}</span></div>
        <p><b style="font-size:22px">${B.count} / ${B.places}</b> <span class="mut">places prises · page : <a href="https://mekanikwar.com/fr/beta" target="_blank" rel="noopener">mekanikwar.com/fr/beta</a></span></p>
        <div class="row"><label>Nombre de places<input id="bpl" type="number" min="1" max="10000" value="${B.places}" style="width:110px"></label>
          <button class="btn sec" id="bopen">${B.open ? 'Fermer les inscriptions' : 'Rouvrir les inscriptions'}</button></div>
        <label class="small mut" style="display:block;margin-top:6px">Message affiché sur la page bêta du site (et dans l'e-mail d'invitation)</label>
        <textarea id="bmsg" maxlength="300" placeholder="Ex. : Inscriptions closes ! La bêta commence le lundi 24 novembre à 18 h.">${esc(B.msg)}</textarea>
        <div class="row"><button class="btn" id="bsave"><img src="${IMG('ui_ok')}" alt="">Enregistrer</button></div>
        <p class="mut small">À 50 inscrits (ou le nombre choisi), les inscriptions se ferment toutes seules.</p></div>
      <div class="tabs"><button class="tab${tab === 'list' ? ' on' : ''}" data-t="list">Inscrits (${B.count})</button><button class="tab${tab === 'bugs' ? ' on' : ''}" data-t="bugs">Bugs signalés${bugsOpen ? ' (' + bugsOpen + ')' : ''}</button><button class="tab${tab === 'end' ? ' on' : ''}" data-t="end">Lancement et récompense</button></div>
      <div id="btab"></div>`;
    const T = $('#btab');
    if (tab === 'list') T.innerHTML = `<div class="card"><div class="ch"><img src="${IMG('troops')}" alt=""><h2>Liste des bêta-testeurs</h2></div>
        <div class="row"><input id="bn" placeholder="Nom (ou compte existant)" maxlength="16" class="grow"><input id="be" placeholder="Adresse e-mail" maxlength="120" class="grow"><button class="btn sm" id="badd"><img src="${IMG('ui_ok')}" alt="">Ajouter</button></div>
        <p class="mut small">Pour un compte qui existe déjà sur ce serveur, le nom suffit. Pour quelqu'un d'autre, mets son nom et son adresse e-mail.</p>
        <div class="row"><button class="btn ora" id="binv"><img src="${IMG('messages')}" alt="">Envoyer les invitations (${B.list.filter(r => r.email && !r.invited).length} pas encore invité(s))</button></div>
        <div class="row"><label>Bonus pour les plus actifs (Crédits)<input id="bbon" type="number" min="1" max="100000" value="500" style="width:120px"></label></div>
        <p class="mut small">Le bouton « Bonus » d'un testeur lui donne ce nombre de Crédits en plus, une seule fois (bugs signalés, bonnes idées). À faire après la récompense de fin de bêta.</p>
        ${B.mailOn ? '' : '<p class="note">Les e-mails ne sont pas réglés sur ce serveur (SMTP) : les invitations ne partiront pas.</p>'}
        <div class="plist">${B.list.map((r, i) => `<div class="prow brow">
          <div class="pn"><span class="mut small">${i + 1}.</span><b>${esc(r.name)}</b></div>
          <div class="small bem">${esc(r.email || '—')}<br><span class="mut">${esc(SRC[r.src] || r.src)} · ${dt(r.at)}</span></div>
          <div class="small">${r.account ? `<span class="ok">compte : ${esc(r.account)}</span>` : '<span class="mut">pas encore de compte</span>'}<br><span class="mut">${r.invited ? 'invité le ' + dt(r.invited) : 'pas invité'}${r.rewarded ? ' · récompensé' : ''}${r.bugs ? ' · ' + r.bugs + ' bug(s) signalé(s)' : ''}</span>${r.bonus ? '<br><span class="ok">bonus donné le ' + dt(r.bonus) + '</span>' : ''}</div>
          <div class="row bact" style="margin:0">${r.account && !r.bonus ? `<button class="btn sec sm" data-bonus="${r.id}" data-n="${esc(r.name)}">Bonus</button>` : ''}${r.email ? `<button class="btn sec sm" data-inv="${r.id}" title="Envoyer l'invitation">E-mail</button>` : ''}<button class="btn red sm" data-del="${r.id}" data-n="${esc(r.name)}">Retirer</button></div></div>`).join('') || '<p class="mut">Personne pour le moment.</p>'}</div></div>`;
    if (tab === 'bugs') T.innerHTML = `<div class="card"><div class="ch"><img src="${IMG('ui_warn')}" alt=""><h2>Bugs signalés par les joueurs</h2></div>
        <p class="mut small">Envoyés depuis le jeu (Paramètres › Signaler un bug). Copie-les à Claude pour qu'il les corrige.</p>
        ${B.bugs.map(b => `<div class="err" style="${b.done ? 'opacity:.55' : ''}"><span class="mut mono">${dt(b.at)}</span> <b>${esc(b.name)}</b> <span class="mut small">${esc(b.info || '')}</span>
          <div style="white-space:pre-wrap;margin:4px 0">${esc(b.text)}</div><button class="btn sec sm" data-bug="${b.id}" data-d="${b.done ? 0 : 1}">${b.done ? 'Remettre à traiter' : 'Marquer comme traité'}</button></div>`).join('') || '<p class="mut">Aucun bug signalé.</p>'}</div>`;
    if (tab === 'end') T.innerHTML = `<div class="card warnc"><div class="ch"><img src="${IMG('ui_warn')}" alt=""><h2>Remise à zéro du serveur</h2></div>
        <p class="small">Toutes les parties repartent de zéro (bases, troupes, alliances, avant-postes, chat). <b>Les comptes sont gardés</b> : chacun se reconnecte avec son nom et son mot de passe.
        Une copie complète de la base est faite juste avant (dossier data/backups). Le serveur redémarre ensuite tout seul.</p>
        <p class="small">À faire au <b>début</b> de la bêta (tout le monde part à égalité), et à la <b>fin</b> si on décide de remettre à zéro pour la sortie officielle.</p>
        <div class="row"><input id="bconf" placeholder="Écris REMISE A ZERO" maxlength="20"><button class="btn red" id="breset"><img src="${IMG('ui_warn')}" alt="">Remettre le serveur à zéro</button></div></div>
      <div class="card"><div class="ch"><img src="${IMG('power')}" alt=""><h2>Récompense des testeurs</h2></div>
        <p class="small">Donne des Crédits et le badge « Vétéran de la bêta » (visible par tous à côté du nom) à chaque testeur qui a un compte. Une seule fois par testeur.
        <b>À faire après la remise à zéro de fin de bêta</b>, sinon la remise à zéro effacerait la récompense.</p>
        <div class="row"><label>Crédits par testeur<input id="bcr" type="number" min="1" max="100000" value="1200" style="width:120px"></label><button class="btn" id="brew"><img src="${IMG('ui_ok')}" alt="">Distribuer la récompense</button></div></div>`;
    // ---- actions ----
    const post = (body, msg) => run(null, () => api('POST', 'beta', body), msg).then(r => { if (r) load(); return r; });
    $('#bon').onclick = async () => {
      if (!await confirmBox(B.on ? 'Désactiver le mode bêta' : 'Activer le mode bêta', B.on ? 'Le jeu sera de nouveau ouvert à tout le monde (inscriptions libres, boutique visible). Continuer ?'
        : 'Le jeu sera fermé à tout le monde sauf toi, jusqu\'à ce que tu cliques sur « Lancer la bêta ». Les parties ouvertes se rechargent. Continuer ?', B.on ? 'Désactiver' : 'Activer', 'ora')) return;
      post({ op: 'set', on: !B.on }, B.on ? 'Mode bêta désactivé' : 'Mode bêta activé : jeu fermé'); };
    const bs = $('#bstart'); if (bs) bs.onclick = async () => {
      if (!await confirmBox(B.started ? 'Refermer le jeu' : 'Lancer la bêta', B.started ? 'Plus personne ne pourra jouer sauf toi (les parties sont gardées). Continuer ?'
        : 'Les comptes de la liste des inscrits pourront jouer, et créer leur compte avec leur adresse e-mail. Pense à envoyer les invitations. Continuer ?', B.started ? 'Refermer' : 'Lancer', 'ora')) return;
      post({ op: 'set', started: !B.started }, B.started ? 'Jeu refermé' : 'Bêta lancée !'); };
    $('#bopen').onclick = () => post({ op: 'set', open: !B.open }, B.open ? 'Inscriptions fermées' : 'Inscriptions rouvertes');
    $('#bsave').onclick = () => post({ op: 'set', places: +$('#bpl').value, msg: $('#bmsg').value }, 'Enregistré');
    document.querySelectorAll('[data-t]').forEach(b => b.onclick = () => { tab = b.dataset.t; draw(); });
    const q = s => T.querySelector(s);
    if (q('#badd')) q('#badd').onclick = () => post({ op: 'add', name: q('#bn').value.trim(), email: q('#be').value.trim() }, 'Ajouté à la liste');
    if (q('#binv')) q('#binv').onclick = async e => { if (!await confirmBox('Envoyer les invitations', 'Un e-mail part vers chaque inscrit qui n\'a pas encore été invité, avec le lien du jeu et ton message. Continuer ?', 'Envoyer')) return;
      const r = await run(e.currentTarget, () => api('POST', 'beta', { op: 'invite' })); if (r) { toast(`${r.sent} invitation(s) envoyée(s)${r.fail ? ', ' + r.fail + ' en échec' : ''}`, !!r.fail); load(); } };
    T.querySelectorAll('[data-inv]').forEach(b => b.onclick = async () => { const r = await run(b, () => api('POST', 'beta', { op: 'invite', id: +b.dataset.inv })); if (r) { toast(r.sent ? 'Invitation envoyée' : 'Non envoyée', !r.sent); load(); } });
    T.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (await confirmBox('Retirer de la liste', `Retirer ${esc(b.dataset.n)} de la liste de la bêta ?`, 'Retirer', 'red')) post({ op: 'del', id: +b.dataset.del }, 'Retiré'); });
    T.querySelectorAll('[data-bonus]').forEach(b => b.onclick = async () => { const cr = +(q('#bbon') || {}).value; if (!(cr > 0)) return toast('Indique un nombre de Crédits', true);
      if (await confirmBox('Bonus', `Donner ${fmtN(cr)} Crédits en bonus à ${esc(b.dataset.n)} ? (une seule fois)`, 'Donner')) post({ op: 'bonus', id: +b.dataset.bonus, cr }, 'Bonus donné à ' + b.dataset.n); });
    T.querySelectorAll('[data-bug]').forEach(b => b.onclick = () => post({ op: 'bug', id: +b.dataset.bug, done: b.dataset.d === '1' }));
    if (q('#breset')) q('#breset').onclick = async e => { if (q('#bconf').value.trim() !== 'REMISE A ZERO') return toast('Écris exactement REMISE A ZERO', true);
      if (!await confirmBox('Remise à zéro', 'Toutes les parties de ce serveur vont repartir de zéro (une sauvegarde est faite avant). Le serveur redémarre ensuite. Continuer ?', 'Tout remettre à zéro', 'red')) return;
      const r = await run(e.currentTarget, () => api('POST', 'betareset', { confirm: 'REMISE A ZERO' })); if (r) toast('Remise à zéro faite (sauvegarde : ' + r.backup + '). Le serveur redémarre…'); };
    if (q('#brew')) q('#brew').onclick = async e => { const cr = +q('#bcr').value; if (!(cr > 0)) return toast('Indique un nombre de Crédits', true);
      if (!await confirmBox('Récompense des testeurs', `Donner ${fmtN(cr)} Crédits et le badge « Vétéran de la bêta » à chaque testeur qui a un compte (une seule fois par testeur) ?`, 'Distribuer')) return;
      const r = await run(e.currentTarget, () => api('POST', 'beta', { op: 'reward', cr })); if (r) { toast(`Récompense donnée à ${r.n} testeur(s)${r.wait ? ' · ' + r.wait + ' sans base pour le moment (reclique plus tard)' : ''}`); load(); } };
  };
  const load = async () => { try { await loadDash(); B = await api('GET', 'beta'); draw(); } catch (e) { toast(e.message, true); } };
  await load();
}

// ===== events: the Power Tournament =====
async function viewEvents() {
  const ST = { planned: ['Prévu', 'admin'], running: ['En cours', 'ok'], ended: ['Terminé', ''] };
  const NM = { power: 'Tournoi de puissance', ally: "Défi d'alliance" }, ICO = { power: 'power', ally: 'ally' };
  let kind = 'power';
  const draw = d => {
    const n = now(), L = d.live, today = new Date(n + 3600_000).toISOString().slice(0, 16);
    $('#main').innerHTML = top('Événements') + `
      ${L ? `<div class="card warnc"><div class="ch"><img src="${IMG(ICO[L.type] || 'power')}" alt=""><h2>${NM[L.type] || 'Événement'} n°${L.id} · ${ST[L.status][0]}</h2></div>
        <p>${L.status === 'planned' ? `Commence le <b>${dt(L.start)}</b> (dans <span data-cd="${L.start}">${mmss(L.start - n)}</span>)` : `Se termine le <b>${dt(L.end)}</b> (dans <span data-cd="${L.end}">${mmss(L.end - n)}</span>)`}</p>
        ${L.type === 'power' ? `<p class="mut small">Crédits du top 3 : ${L.cr.join(' / ')}</p>` : '<p class="mut small">Sans Crédits · récompenses pour chaque membre qui a marqué au moins 1 000 points</p>'}
        <p class="mut small">Un seul événement à la fois : il faut attendre la fin de celui-ci pour en lancer un autre.</p>
        <div class="row"><button class="btn red sm" id="evstop"><img src="${IMG('ui_close')}" alt="">${L.status === 'planned' ? 'Annuler' : 'Terminer maintenant'}</button></div></div>`
      : `<div class="card"><div class="ch"><img src="${IMG(ICO[kind])}" alt=""><h2>Lancer un événement</h2></div>
        <div class="row"><label>Type<select id="evtype"><option value="power"${kind === 'power' ? ' selected' : ''}>Tournoi de puissance</option><option value="ally"${kind === 'ally' ? ' selected' : ''}>Défi d'alliance</option></select></label></div>
        <p class="mut small">${kind === 'power' ? 'Les joueurs gagnent des paliers selon la puissance gagnée pendant le tournoi (troupes, constructions, recherches). Les paliers ne donnent ni troupes ni Crédits. À la fin, le classement est figé et tout est envoyé automatiquement dans les inventaires.'
          : "Chaque alliance marque des points ensemble : puissance gagnée (1 pt / 100), victoires sur la carte (camp +50, Montagne fortifiée +300, joueur +500), aide aux constructions (+20, 10 par jour), renforts (+100, une fois par allié et par jour). Paliers communs et classement des alliances, pour chaque membre qui a marqué au moins 1 000 points. Pas de Crédits. Tout est envoyé automatiquement à la fin."}</p>
        <div class="row"><label>Début<select id="evwhen"><option value="now">Tout de suite</option><option value="at">À une date</option></select></label>
          <label id="evatl" style="display:none">Date et heure<input type="datetime-local" id="evat" value="${today}"></label>
          <label>Durée<select id="evdays">${[1, 2, 3, 5, 7, 10, 14].map(v => `<option value="${v}"${v === (kind === 'ally' ? 5 : 7) ? ' selected' : ''}>${v} jour${v > 1 ? 's' : ''}</option>`).join('')}</select></label></div>
        ${kind === 'power' ? `<div class="row"><label>Crédits 1er<input type="number" id="evc1" value="150" min="0" max="5000"></label><label>Crédits 2e<input type="number" id="evc2" value="100" min="0" max="5000"></label><label>Crédits 3e<input type="number" id="evc3" value="50" min="0" max="5000"></label></div>` : ''}
        <div class="row"><button class="btn" id="evgo"><img src="${IMG('ui_ok')}" alt="">Lancer ${kind === 'power' ? 'le tournoi' : 'le défi'}</button></div></div>`}
      <div class="card"><div class="ch"><img src="${IMG('reports')}" alt=""><h2>Historique</h2></div>
        ${d.list.length ? d.list.map(e => `<div class="err"><span class="mut mono">${dt(e.start)} → ${dt(e.end)}</span> <span class="badge ${ST[e.status] ? ST[e.status][1] : ''}">${ST[e.status] ? ST[e.status][0] : e.status}</span> ${NM[e.type] || 'Événement'} n°${e.id} · ${e.n} participant(s)${e.type === 'power' ? ' · Crédits ' + e.cr.join(' / ') : ''} <span class="mut small">· par ${esc(e.by || '?')}</span></div>`).join('') : '<p class="mut">Aucun événement pour l\'instant.</p>'}</div>`;
    const ty = $('#evtype'); if (ty) ty.onchange = () => { kind = ty.value; draw(d); };
    const w = $('#evwhen'); if (w) w.onchange = () => { $('#evatl').style.display = w.value === 'at' ? '' : 'none'; };
    const go = $('#evgo'); if (go) go.onclick = async e => {
      const start = w.value === 'at' ? new Date($('#evat').value).getTime() : now(), days = +$('#evdays').value, cr = kind === 'power' ? [+$('#evc1').value, +$('#evc2').value, +$('#evc3').value] : [0, 0, 0];
      if (w.value === 'at' && !(start > now())) return toast('Choisis une date dans le futur', true);
      if (!await confirmBox('Lancer : ' + NM[kind], `Début : <b>${w.value === 'at' ? dt(start) : 'tout de suite'}</b> · durée <b>${days} jour(s)</b>${kind === 'power' ? `<br>Crédits du top 3 : <b>${cr.join(' / ')}</b>` : '<br>Sans Crédits'}`, 'Lancer')) return;
      if (await run(e.currentTarget, () => api('POST', 'event', { type: kind, start, days, cr }), NM[kind] + ' lancé')) load(); };
    const st = $('#evstop'); if (st) st.onclick = async () => {
      if (!await confirmBox(L.status === 'planned' ? 'Annuler' : 'Terminer maintenant', L.status === 'planned' ? "L'événement prévu est supprimé." : 'Le classement est figé maintenant et les récompenses sont envoyées automatiquement.', 'Confirmer', 'red')) return;
      if (await run(st, () => api('POST', 'event', { op: 'stop', id: L.id }), 'Fait')) load(); };
  };
  const load = async () => { try { draw(await api('GET', 'events')); } catch (e) { toast(e.message, true); } };
  await load(); every(1000, tickCountdowns);
}

// ===== chat moderation =====
let MUTE_MIN = 1440;   // length chosen for « Rendre muet » (minutes, 0 = for good)
const MUTES = [[60, '1 h'], [1440, '24 h'], [10080, '7 jours'], [0, 'Définitif']];
const muteTxt = m => m.until === 0 ? 'définitivement' : 'jusqu\'au ' + dt(m.until);
async function viewChat() {
  const draw = (C) => {
    const muteBtn = n => `<button class="btn red sm" data-mute="${esc(n)}"><img src="${IMG('ui_lock')}" alt="">Rendre muet</button>`;
    $('#main').innerHTML = top('Modération du chat') + `
      <div class="card"><div class="ch"><img src="${IMG('ui_lock')}" alt=""><h2>Durée pour « Rendre muet »</h2></div>
        <div class="row"><label>Durée<select id="mmin">${MUTES.map(([v, l]) => `<option value="${v}"${v === MUTE_MIN ? ' selected' : ''}>${l}</option>`).join('')}</select></label>
          <label class="grow">Motif (facultatif, gardé dans le Journal)<input id="mwhy" maxlength="200" placeholder="Insultes, spam…"></label></div>
        <p class="mut small">Un joueur muet peut jouer normalement, mais ne peut plus écrire dans le chat (général, alliance et privé). Il voit un message qui le lui explique.</p></div>
      <div class="card${C.reports.length ? ' warnc' : ''}"><div class="ch"><img src="${IMG('ui_warn')}" alt=""><h2>Signalements à traiter (${C.reports.length})</h2></div>
        ${C.reports.length ? C.reports.map(r => `<div class="err"><span class="mut mono">${dt(r.at)}</span> <b>${esc(r.rname)}</b> signale <b>${esc(r.name)}</b>
          <span class="badge ${r.times > 2 ? 'ban' : 'admin'}">signalé ${r.times} fois au total</span> <span class="mut small">· chat ${esc(r.where)}${r.gone ? ' · message déjà supprimé' : ''}</span>
          <div class="preview">${esc(r.text)}</div>
          <div class="row">${r.gone ? '' : `<button class="btn sm" data-del="${r.msg_id}"><img src="${IMG('ui_close')}" alt="">Supprimer le message</button>`}${muteBtn(r.name)}
            <button class="btn sec sm" data-close="${r.id}"><img src="${IMG('ui_ok')}" alt="">Rien à faire</button></div></div>`).join('') : '<p class="mut">Aucun signalement en attente.</p>'}</div>
      <div class="card"><div class="ch"><img src="${IMG('ui_lock')}" alt=""><h2>Joueurs muets (${C.mutes.length})</h2></div>
        ${C.mutes.length ? C.mutes.map(m => `<div class="err"><b>${esc(m.name)}</b> <span class="mut small">· muet ${muteTxt(m)} · par ${esc(m.by || '?')}${m.reason ? ' · ' + esc(m.reason) : ''}</span>
          <div class="row"><button class="btn sm" data-unmute="${esc(m.name)}"><img src="${IMG('ui_ok')}" alt="">Rendre la parole</button></div></div>`).join('') : '<p class="mut">Aucun joueur muet.</p>'}</div>
      <div class="card"><div class="ch"><img src="${IMG('messages')}" alt=""><h2>Chat général (50 derniers messages)</h2><button class="btn sec sm" id="creload"><img src="${IMG('radar')}" alt="">Actualiser</button></div>
        ${C.recent.length ? C.recent.map(m => `<div class="err"><span class="mut mono">${dt(m.at)}</span> <b>${esc(m.name)}</b> : ${esc(m.text)}
          <div class="row"><button class="btn sec sm" data-del="${m.id}"><img src="${IMG('ui_close')}" alt="">Supprimer</button>${muteBtn(m.name)}</div></div>`).join('') : '<p class="mut">Aucun message.</p>'}
        <p class="mut small">Les messages privés et d'alliance ne sont visibles ici que lorsqu'ils sont signalés.</p></div>`;
    $('#mmin').onchange = e => { MUTE_MIN = +e.target.value; };
    $('#creload').onclick = () => load();
    document.querySelectorAll('[data-del]').forEach(b => b.onclick = async () => { if (await confirmBox('Supprimer le message', 'Le message disparaît tout de suite chez tous les joueurs.', 'Supprimer', 'red') && await run(b, () => api('POST', 'chat', { op: 'del', id: +b.dataset.del }), 'Message supprimé')) load(); });
    document.querySelectorAll('[data-mute]').forEach(b => b.onclick = async () => { const n = b.dataset.mute, l = (MUTES.find(x => x[0] === MUTE_MIN) || [0, ''])[1];
      if (await confirmBox('Rendre muet', `<b>${esc(n)}</b> ne pourra plus écrire dans le chat (${MUTE_MIN ? 'pendant ' + l : 'définitivement'}).`, 'Rendre muet', 'red') && await run(b, () => api('POST', 'chat', { op: 'mute', name: n, min: MUTE_MIN, reason: $('#mwhy').value }), `${n} est muet`)) load(); });
    document.querySelectorAll('[data-unmute]').forEach(b => b.onclick = async () => { if (await run(b, () => api('POST', 'chat', { op: 'unmute', name: b.dataset.unmute }), 'Parole rendue')) load(); });
    document.querySelectorAll('[data-close]').forEach(b => b.onclick = async () => { if (await run(b, () => api('POST', 'chat', { op: 'close', id: +b.dataset.close }), 'Signalement classé')) load(); });
  };
  const load = async () => { const [, C] = await Promise.all([loadDash(), api('GET', 'chat')]).catch(e => { toast(e.message, true); return [null, null]; }); if (C) draw(C); };
  await load();
}

// ===== 5. backups and journal =====
let lcat = '', lq = '', lastId = 0, live = true;
const TAGCAT = {}; for (const [c, l] of Object.entries({ triche: ['TRICHE?', 'ORDRE REFUSÉ', 'SIGNALEMENT'], blocages: ['BLOQUÉ', 'SCRIPT', 'INSCRIPTION REFUSÉE', 'CONNEXION REFUSÉE', 'PANEL REFUSÉ'], connexions: ['CONNEXION OK', 'CONNEXION ÉCHOUÉE', 'DÉCONNEXION', 'INSCRIPTION'], erreurs: ['ERREUR'], admin: ['ADMIN', 'CONSOLE', 'PANEL', 'MODÉRATION', 'MAINTENANCE', 'ANNONCE', 'SAUVEGARDE', 'DÉMARRAGE', 'MISE À JOUR', 'REDÉMARRAGE'] })) for (const t of l) TAGCAT[t] = c;
async function viewLogs() {
  const size = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' Mo' : Math.round(b / 1024) + ' Ko';
  $('#main').innerHTML = top('Sauvegardes et journal') + `
    <div class="card"><div class="ch"><img src="${IMG('warehouse')}" alt=""><h2>Sauvegardes</h2><button class="btn sm" id="bnow"><img src="${IMG('ui_ok')}" alt="">Sauvegarder maintenant</button></div>
      <p class="mut small">Copie automatique chaque nuit après 4 h (les 7 dernières sont gardées), dans le dossier data/backups du serveur.</p><div class="blist" id="blist"><p class="mut">Chargement…</p></div></div>
    <div class="card"><div class="ch"><img src="${IMG('reports')}" alt=""><h2>Journal en direct</h2><label class="small" style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="live"${live ? ' checked' : ''}> en direct</label></div>
      <div class="tabs">${[['', 'Tout'], ['triche', 'Triche'], ['blocages', 'Blocages'], ['connexions', 'Connexions'], ['erreurs', 'Erreurs'], ['admin', 'Actions admin']].map(([k, l]) => `<button class="tab${k === lcat ? ' on' : ''}" data-cat="${k}">${l}</button>`).join('')}</div>
      <div class="row"><input id="lq" class="grow" placeholder="Rechercher un pseudo ou un mot" value="${esc(lq)}"></div>
      <div class="logbox" id="logbox"></div></div>`;
  const blist = l => { $('#blist').innerHTML = l.length ? l.map(f => `<div><span class="mono">${esc(f.file)}</span><span class="mut">${size(f.size)} · ${dt(f.at)}</span></div>`).join('') : '<p class="mut">Aucune sauvegarde pour l\'instant.</p>'; };
  run(null, () => api('GET', 'backups')).then(j => j && blist(j.list));
  $('#bnow').onclick = async e => { const j = await run(e.currentTarget, () => api('POST', 'backup', {}), 'Sauvegarde faite'); if (j) blist(j.list); };
  const box = $('#logbox');
  const line = l => { const c = TAGCAT[l.tag] || 'autre'; return `<div class="ll"><span class="t">${DTS.format(new Date(l.at))}</span><span class="g c-${c}">${esc(l.tag)}</span><span class="m">${esc(l.msg)}</span></div>`; };
  const load = async (reset) => {
    if (reset) { lastId = 0; box.innerHTML = ''; }
    const j = await run(null, () => api('GET', `log?after=${lastId}&cat=${encodeURIComponent(lcat)}&q=${encodeURIComponent(lq)}&limit=${lastId ? 300 : 200}`)); if (!j) return;
    if (!j.lines.length) { if (!lastId) box.innerHTML = '<p class="mut">Rien pour l\'instant.</p>'; return; }
    if (!lastId) box.innerHTML = '';
    const stick = box.scrollHeight - box.scrollTop - box.clientHeight < 40;
    box.insertAdjacentHTML('beforeend', j.lines.map(line).join('')); lastId = j.lines[j.lines.length - 1].id;
    while (box.children.length > 1500) box.firstChild.remove();
    if (stick || reset) box.scrollTop = box.scrollHeight;
  };
  document.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { lcat = b.dataset.cat; document.querySelectorAll('[data-cat]').forEach(x => x.classList.toggle('on', x === b)); load(true); });
  let qt = 0; $('#lq').oninput = e => { lq = e.target.value.trim(); clearTimeout(qt); qt = setTimeout(() => load(true), 350); };
  $('#live').onchange = e => { live = e.target.checked; };
  await load(true); every(3000, () => { if (live) load(); });
  loadDash().catch(() => {});
}

// ---------- start ----------
async function start() {
  document.body.classList.remove('nologin');
  try { await loadDash(); } catch (e) { if (e.message !== 'Connecte-toi' && e.message !== 'Accès refusé') { $('#main').innerHTML = `<div class="login card warnc"><h2>Serveur injoignable</h2><p>${esc(e.message)}</p><button class="btn" onclick="location.reload()">Réessayer</button></div>`; } return; }
  go((location.hash || '').slice(1) || 'dash');
}
addEventListener('hashchange', () => { const v = location.hash.slice(1); if (token && v !== view && VIEWS[v]) go(v); });
if (token) start(); else showLogin();
})();
