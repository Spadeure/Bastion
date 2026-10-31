'use strict';
// Bastion · management panel (/admin) on the server side.
// Only the administrator role can use these addresses (/api/admin/...): any other account is refused and written in the journal.
// Maintenance (announced with a countdown, kept in the database), update from the test server, players, announcements,
// backups and the live journal.
const fs = require('fs'), path = require('path');

module.exports = function makePanel(C) {
  const { db, Q, log, send, readBody, broadcast, push, streams, onlineSince, lastIp, watch, cheat, clean, STAMP,
    DATA, ADMIN_NAME, IS_TEST, GIT, PATCH_ID, VERSION, STARTED, REASON_FR, BACKUP_DIR, backupDb, createAccount, unbanPlayer, admin, engine, UNIT_IDS, orderBucket, chat } = C;
  const TEST_URL = (process.env.TEST_URL || 'https://bastion-test.stryxhost.fr').replace(/\/+$/, '');
  // the other server, for the link between the two panels (same computer at home, other port)
  const OTHER = IS_TEST ? { name: 'OFFICIEL', port: +process.env.OFFICIAL_PORT || 58689 } : { name: 'TEST', port: +process.env.TEST_PORT || 55000 };
  const LAUNCHER = !!process.env.BASTION_LAUNCHER;   // started by server/launcher.js: a restart (exit code 75) brings the game back
  const RESTART = 75, REASONS = ['update', 'fix', 'server'], COLORS = ['info', 'warn'];
  const int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));

  // ---------- settings kept in the database (the server restarts in the same state) ----------
  const metaGet = k => { const r = db.prepare('SELECT v FROM meta WHERE k = ?').get(k); try { return r ? JSON.parse(r.v) : null; } catch (e) { return null; } };
  const metaSet = (k, v) => v == null ? db.prepare('DELETE FROM meta WHERE k = ?').run(k)
    : db.prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v').run(k, JSON.stringify(v));
  let maint = metaGet('maint');        // {since, dur (minutes), reason, by}: the game is closed to the players
  let plan = metaGet('maint_plan');    // {at, dur, reason, by}: maintenance announced, starts at "at"
  let ann = metaGet('announce');       // {id, text, color, at, until}: banner shown to every player
  if (maint) log('MAINTENANCE', `Le serveur démarre EN MAINTENANCE (depuis ${STAMP.format(new Date(maint.since))}) · réouverture automatique à ${STAMP.format(new Date(maint.since + maint.dur * 60000))}, ou « Remettre en ligne » dans le panel`);
  // result of the last update installed by the launcher
  let lastDeploy = null;
  try { lastDeploy = JSON.parse(fs.readFileSync(path.join(DATA, 'deploy-result.json'), 'utf8'));
    if (lastDeploy && Date.now() - lastDeploy.at < 120_000) log('MISE À JOUR', lastDeploy.ok ? `Version installée : ${String(lastDeploy.before || '').slice(0, 7)} -> ${String(lastDeploy.commit || '').slice(0, 7)}` : `ÉCHEC de l'installation : ${lastDeploy.error}`); } catch (e) {}

  // what every game receives (ping and live line): maintenance, countdown, announcement, test server
  function status() {
    const now = Date.now();
    return { m: maint ? { since: maint.since, dur: maint.dur, reason: maint.reason } : 0,
      p: plan ? { at: plan.at, dur: plan.dur, reason: plan.reason } : 0,
      a: ann && ann.until > now ? { id: ann.id, text: ann.text, color: ann.color, until: ann.until } : 0,
      test: IS_TEST };
  }
  const isMaint = () => !!maint;
  const changed = () => broadcast('srv', status());
  function startMaint(dur, reason, by, why) {
    maint = { since: Date.now(), dur: int(dur, 1, 1440), reason: REASONS.includes(reason) ? reason : 'update', by };
    plan = null; metaSet('maint', maint); metaSet('maint_plan', null);
    log('MAINTENANCE', `Jeu en maintenance (${why}) · durée prévue ${maint.dur} min · par ${by}`); changed();
  }
  function endMaint(by) {
    const was = maint; maint = null; plan = null; metaSet('maint', null); metaSet('maint_plan', null);
    log('MAINTENANCE', `Jeu remis en ligne par ${by}${was ? ' après ' + Math.round((Date.now() - was.since) / 60000) + ' min' : ''} · toutes les parties se rechargent`);
    broadcast('reload', {});
  }
  // the countdown reaches zero: maintenance starts by itself · an announcement ends: the banners go away at once
  setInterval(() => {
    const now = Date.now();
    if (plan && now >= plan.at) startMaint(plan.dur, plan.reason, plan.by, 'fin du compte à rebours');
    if (maint && now >= maint.since + maint.dur * 60000) endMaint('réouverture automatique (fin de la durée prévue)');   // a forgotten maintenance never blocks the players
    if (ann && ann.until <= now) { ann = null; metaSet('announce', null); changed(); }
  }, 1000).unref();

  // ---------- version of the test server (seen from the official server) ----------
  let testCache = null;
  async function testVersion(fresh) {
    if (IS_TEST) return null;
    if (!fresh && testCache && Date.now() - testCache.at < 15_000) return testCache.v;
    let v;
    try { const r = await fetch(TEST_URL + '/api/health', { signal: AbortSignal.timeout(5000), headers: { 'Cache-Control': 'no-cache' } });
      const j = await r.json();
      v = j && j.game === 'Bastion' ? { ok: true, commit: /^[0-9a-f]{40}$/.test(j.commit || '') ? j.commit : '', subject: String(j.subject || '').slice(0, 200), patch: String(j.patch || '').slice(0, 40), branch: String(j.branch || '').slice(0, 40), uptime: +j.uptime || 0, url: TEST_URL }
        : { ok: false, error: 'réponse inattendue', url: TEST_URL }; }
    catch (e) { v = { ok: false, error: e.name === 'TimeoutError' ? 'ne répond pas' : 'injoignable', url: TEST_URL }; }
    testCache = { at: Date.now(), v }; return v;
  }

  // ---------- journal ----------
  const CATS = {
    triche: ['TRICHE?', 'ORDRE REFUSÉ', 'SIGNALEMENT'],
    blocages: ['BLOQUÉ', 'SCRIPT', 'INSCRIPTION REFUSÉE', 'CONNEXION REFUSÉE', 'PANEL REFUSÉ'],
    connexions: ['CONNEXION OK', 'CONNEXION ÉCHOUÉE', 'DÉCONNEXION', 'INSCRIPTION'],
    erreurs: ['ERREUR'],
    admin: ['ADMIN', 'CONSOLE', 'PANEL', 'MODÉRATION', 'MAINTENANCE', 'ANNONCE', 'SAUVEGARDE', 'DÉMARRAGE', 'MISE À JOUR', 'REDÉMARRAGE'],
  };
  function logRead(after, cat, q, limit) {
    const where = ['id > ?'], args = [int(after, 0, 1e15)];
    if (CATS[cat]) { where.push(`tag IN (${CATS[cat].map(() => '?').join(',')})`); args.push(...CATS[cat]); }
    if (q) { where.push('instr(lower(msg), lower(?)) > 0'); args.push(String(q).slice(0, 40)); }
    const rows = db.prepare(`SELECT id, at, tag, msg FROM logs WHERE ${where.join(' AND ')} ORDER BY id DESC LIMIT ?`).all(...args, int(limit, 1, 500) || 200);
    return rows.reverse();
  }

  // ---------- players ----------
  const playersQ = db.prepare(`SELECT u.id, u.name, u.role, u.created, u.banned, u.seen, b.lvl, b.power, b.updated, b.x, b.y,
    (SELECT MAX(s.seen) FROM sessions s WHERE s.user_id = u.id) AS sseen FROM users u LEFT JOIN bases b ON b.user_id = u.id`);
  function players() {
    return playersQ.all().map(u => ({ name: u.name, role: u.role, created: u.created, banned: u.banned || 0, lvl: u.lvl || 1, power: u.power || 0,
      seen: Math.max(u.seen || 0, u.sseen || 0, u.updated || 0), online: onlineSince.get(u.id) || 0, admin: u.name.toLowerCase() === ADMIN_NAME.toLowerCase() }));
  }
  const banText = b => { let d = {}; try { d = JSON.parse(b.detail || '{}'); } catch (e) {}
    return { at: b.at, active: !!b.active, reason: b.reason, text: REASON_FR[b.reason] ? REASON_FR[b.reason](d) : b.reason, ip: d.ip || '', ua: d.ua || '',
      last: (d.last || []).slice(-25).map(([t, a], i, L) => ({ t, a: clean(a), gap: i ? +((t - L[i - 1][0]) / 1000).toFixed(1) : 0 })) }; };
  function playerCard(u) {
    const b = Q.base.get(u.id), now = Date.now();
    let st = {}; try { st = b && b.state ? JSON.parse(b.state) : {}; } catch (e) {}
    const troops = st.troops || {}, op = Q.opOf.get(u.id), w = watch.get(u.id);
    const sum = o => Object.values(o || {}).reduce((s, v) => s + (+v || 0), 0);
    return {
      name: u.name, role: u.role, created: u.created, banned: u.banned || 0, admin: u.name.toLowerCase() === ADMIN_NAME.toLowerCase(),
      lvl: b ? b.lvl : 1, power: b ? b.power : 0, pos: b ? { x: b.x, y: b.y } : null, shield: b && b.shield > now ? b.shield : 0,
      seen: Math.max(u.seen || 0, b ? b.updated : 0), online: onlineSince.get(u.id) || 0, ip: lastIp.get(u.id) || '', games: (streams.get(u.id) || new Set()).size,
      cc: ((st.slots || {}).cc || {}).lvl || 0, res: st.res || {}, troops: sum(troops), titan: st.titan ? st.titan.lvl : 0,
      outpost: op ? { x: op.x, y: op.y, lvl: op.lvl, titan: st.op && st.op.titan ? st.op.titan.lvl : 0 } : null,
      orders: w ? { m1: w.acts.filter(x => now - x.t < 60_000).length, m10: w.acts.filter(x => now - x.t < 600_000).length, bad: w.bad.filter(t => now - t < 600_000).length } : { m1: 0, m10: 0, bad: 0 },
      bans: db.prepare('SELECT * FROM bans WHERE user_id = ? ORDER BY at DESC LIMIT 10').all(u.id).map(banText),
    };
  }
  function closeGames(uid) { const set = streams.get(uid); if (set) for (const r of set) { try { r.end(); } catch (e) {} } }

  // ---------- backups ----------
  function backups() {
    const out = [];
    const add = (dir, rel) => { try { for (const f of fs.readdirSync(dir)) if (/\.db$/.test(f)) { const s = fs.statSync(path.join(dir, f)); out.push({ file: rel + f, size: s.size, at: s.mtimeMs }); } } catch (e) {} };
    add(BACKUP_DIR, 'backups/'); add(DATA, '');
    return out.filter(f => f.file !== 'bastion.db').sort((a, b) => b.at - a.at);
  }

  // ---------- restart (and update) through the launcher ----------
  function restartSoon(why) {
    log('REDÉMARRAGE', why);
    setTimeout(() => { try { db.close(); } catch (e) {} process.exit(RESTART); }, 700);
  }

  // ---------- the addresses /api/admin/... ----------
  async function route(req, res, url, me, ip) {
    if (me.role !== 'admin') { cheat(me, ip, `tentative d'utiliser le panel de gestion (${clean(url)})`); return send(res, 403, { error: 'forbidden' }); }
    const name = url.slice('/api/admin/'.length), qs = new URLSearchParams((req.url.split('?')[1]) || '');
    const P = req.method === 'POST' ? await readBody(req, 20_000) : {};
    const by = me.name, did = m => log('PANEL', `${by} · ${m}`);

    if (req.method === 'GET' && name === 'dash') {
      const errors = db.prepare("SELECT at, msg FROM logs WHERE tag = 'ERREUR' ORDER BY id DESC LIMIT 8").all();
      return send(res, 200, { me: me.name, server: { test: IS_TEST, branch: GIT.branch, commit: GIT.commit, subject: GIT.subject, patch: PATCH_ID, version: VERSION, started: STARTED,
        uptime: Math.round(process.uptime()), node: process.version, launcher: LAUNCHER, mem: Math.round(process.memoryUsage().rss / 1048576) },
        status: status(), maint, plan, other: OTHER, ann: ann && ann.until > Date.now() ? ann : null,
        chatReports: chat.mod.open(), online: streams.size, players: Q.count.get().n, banned: Q.bannedList.all().length, errors, lastDeploy, testServer: await testVersion(qs.get('fresh') === '1'), now: Date.now() });
    }
    // ----- chat moderation: reports, latest messages of the general chat, muted players -----
    if (req.method === 'GET' && name === 'chat') return send(res, 200, { reports: chat.mod.reports(), recent: chat.mod.recent(), mutes: chat.mod.mutes() });
    if (req.method === 'POST' && name === 'chat') {
      const op = String(P.op || '');
      try {
        if (op === 'del') return send(res, 200, chat.mod.del(int(P.id, 1, 1e15), by));
        if (op === 'mute') return send(res, 200, chat.mod.mute(P.name, int(P.min, 0, 525600), P.reason, by));
        if (op === 'unmute') return send(res, 200, chat.mod.unmute(P.name, by));
        if (op === 'close') return send(res, 200, chat.mod.close(int(P.id, 1, 1e15), by));
      } catch (e) { return send(res, e.code || 400, { error: e.error || 'erreur' }); }
      return send(res, 400, { error: 'action inconnue' });
    }
    // ----- maintenance -----
    if (req.method === 'POST' && name === 'maint') {
      const op = String(P.op || '');
      if (op === 'plan') {   // announce: banner with a countdown, then maintenance starts by itself (in = 0: right now)
        const inMin = int(P.in, 0, 240), dur = int(P.dur, 1, 1440), reason = REASONS.includes(P.reason) ? P.reason : 'update';
        if (maint) return send(res, 409, { error: 'déjà en maintenance' });
        if (!inMin) { startMaint(dur, reason, by, 'tout de suite, depuis le panel'); return send(res, 200, { ok: true }); }
        plan = { at: Date.now() + inMin * 60_000, dur, reason, by }; metaSet('maint_plan', plan);
        log('MAINTENANCE', `Maintenance annoncée par ${by} : dans ${inMin} min, durée prévue ${dur} min`); changed();
        return send(res, 200, { ok: true });
      }
      if (op === 'cancel') { if (!plan) return send(res, 409, { error: 'aucune maintenance annoncée' }); plan = null; metaSet('maint_plan', null); log('MAINTENANCE', `Maintenance annoncée annulée par ${by}`); changed(); return send(res, 200, { ok: true }); }
      if (op === 'now') { if (maint) return send(res, 409, { error: 'déjà en maintenance' }); const p0 = plan || {}; startMaint(P.dur || p0.dur || 15, P.reason || p0.reason, by, 'lancée à la main'); return send(res, 200, { ok: true }); }
      if (op === 'extend') { if (!maint) return send(res, 409, { error: 'le jeu n\'est pas en maintenance' });   // more time before the automatic reopening
        const add = int(P.add, 5, 240); maint.dur = Math.min(maint.dur + add, Math.ceil((Date.now() - maint.since) / 60000) + 1440); metaSet('maint', maint);
        log('MAINTENANCE', `Maintenance prolongée de ${add} min par ${by} · réouverture automatique à ${STAMP.format(new Date(maint.since + maint.dur * 60000))}`); changed(); return send(res, 200, { ok: true }); }
      if (op === 'off') { if (!maint && !plan) return send(res, 409, { error: 'le jeu est déjà en ligne' }); endMaint(by); return send(res, 200, { ok: true }); }
      return send(res, 400, { error: 'action inconnue' });
    }
    if (req.method === 'POST' && name === 'restart') {
      if (!LAUNCHER) return send(res, 409, { error: 'no_launcher' });
      did('redémarrage demandé'); send(res, 200, { ok: true }); restartSoon(`Redémarrage demandé par ${by} depuis le panel`); return;
    }
    if (req.method === 'POST' && name === 'deploy') {   // official server: install exactly the version running on the test server
      if (IS_TEST) return send(res, 409, { error: 'impossible sur le serveur de test' });
      if (!LAUNCHER) return send(res, 409, { error: 'no_launcher' });
      const t = await testVersion(true);
      if (!t || !t.ok || !t.commit) return send(res, 502, { error: 'version du serveur de test illisible' + (t && t.error ? ' (' + t.error + ')' : '') });
      if (P.commit && P.commit !== t.commit) return send(res, 409, { error: 'le serveur de test a changé de version entre-temps : recharge le tableau de bord' });
      if (t.commit === GIT.commit) return send(res, 409, { error: 'cette version est déjà installée' });
      // never back in time: the version of the test server must come after the one installed here
      if (GIT.commit) {
        const git = (...a) => require('child_process').execFileSync('git', a, { cwd: path.join(DATA, '..'), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], timeout: 60000 });
        try { git('fetch', '--quiet', 'origin', 'test'); } catch (e) {}
        let newer = null;
        try { git('merge-base', '--is-ancestor', GIT.commit, t.commit); newer = true; } catch (e) { newer = e.status === 1 ? false : null; }
        if (newer === false) { log('PANEL', `${by} · déploiement refusé : la version du serveur de test (${t.commit.slice(0, 7)}) est plus ancienne que celle de l'officiel (${GIT.commit.slice(0, 7)})`);
          return send(res, 409, { error: 'le serveur de test a une version plus ancienne que l\'officiel : redémarre d\'abord le serveur de test (Pelican ou panel du test), puis recharge ce tableau de bord' }); }
        if (newer === null) return send(res, 409, { error: 'impossible de comparer les versions (git) : réessaie dans un instant' });
      }
      fs.writeFileSync(path.join(DATA, 'deploy.json'), JSON.stringify({ commit: t.commit, branch: 'test', by, at: Date.now() }));
      if (!maint) startMaint(int(P.dur || 15, 5, 240), 'update', by, 'installation d\'une mise à jour');
      did(`déploiement de la version du serveur de test ${t.commit.slice(0, 7)} (${t.subject})`);
      send(res, 200, { ok: true, commit: t.commit });
      restartSoon(`Installation de la version ${t.commit.slice(0, 7)} puis redémarrage (en maintenance)`); return;
    }
    // ----- announcements -----
    if (req.method === 'POST' && name === 'announce') {
      if (P.op === 'off') { if (!ann) return send(res, 409, { error: 'aucune annonce en cours' });
        db.prepare('UPDATE announces SET until = ? WHERE id = ?').run(Date.now(), ann.id); log('ANNONCE', `Annonce retirée par ${by}`); ann = null; metaSet('announce', null); changed(); return send(res, 200, { ok: true }); }
      const text = String(P.text || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 300);
      if (!text) return send(res, 400, { error: 'le message est vide' });
      const color = COLORS.includes(P.color) ? P.color : 'info', min = int(P.min, 1, 10080), at = Date.now(), until = at + min * 60_000;
      if (ann) db.prepare('UPDATE announces SET until = ? WHERE id = ?').run(at, ann.id);   // a new one replaces the current one
      const id = Number(db.prepare('INSERT INTO announces (at, text, color, until, by) VALUES (?, ?, ?, ?, ?)').run(at, text, color, until, by).lastInsertRowid);
      ann = { id, text, color, at, until }; metaSet('announce', ann);
      log('ANNONCE', `${by} (${color === 'warn' ? 'alerte' : 'info'}, ${min} min) : ${text}`); changed();
      return send(res, 200, { ok: true });
    }
    if (req.method === 'GET' && name === 'announces') return send(res, 200, { list: db.prepare('SELECT * FROM announces ORDER BY id DESC LIMIT 10').all(), now: Date.now() });
    // ----- players -----
    if (req.method === 'GET' && name === 'players') return send(res, 200, { players: players(), now: Date.now() });
    if (req.method === 'GET' && name === 'player') {
      const u = Q.userByName.get(String(qs.get('name') || '').trim()); if (!u) return send(res, 404, { error: 'joueur introuvable' });
      return send(res, 200, { player: playerCard(u), now: Date.now() });
    }
    if (req.method === 'GET' && name === 'catalog') { const c = engine.catalog(); for (const r of c.res) if (r.id === 'alloy') r.name = 'Alliage lourd';
      c.units = c.units.filter(x => UNIT_IDS.includes(x.id)); return send(res, 200, c); }
    if (req.method === 'POST' && name === 'player') {
      const u = Q.userByName.get(String(P.name || '').trim()); if (!u) return send(res, 404, { error: 'joueur introuvable' });
      const main = u.name.toLowerCase() === ADMIN_NAME.toLowerCase(), op = String(P.op || '');
      if (op === 'ban') {
        if (main || u.id === me.id) return send(res, 409, { error: 'impossible de bloquer ce compte' });
        if (u.banned) return send(res, 409, { error: 'déjà bloqué' });
        const motif = String(P.motif || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 200);
        if (!motif) return send(res, 400, { error: 'indique un motif' });
        const now = Date.now();
        Q.setBanned.run(now, u.id); Q.addBan.run(u.id, now, 'admin', JSON.stringify({ motif, by, ip: lastIp.get(u.id) || '' }));
        watch.delete(u.id); orderBucket.delete(u.id);
        log('SCRIPT', `${u.name} BLOQUÉ par ${by} · motif : ${motif}`);
        push(u.id, 'banned', { error: 'banned_admin', motif }); closeGames(u.id);
        return send(res, 200, { ok: true });
      }
      if (op === 'unban') { if (!u.banned) return send(res, 409, { error: 'ce joueur n\'est pas bloqué' }); unbanPlayer(u, by + ' (panel)'); return send(res, 200, { ok: true }); }
      if (op === 'role') {
        const role = ['player', 'tester', 'admin'].includes(P.role) ? P.role : null; if (!role) return send(res, 400, { error: 'rôle inconnu' });
        if (role === 'tester' && !IS_TEST) return send(res, 409, { error: 'pas de compte de test sur le serveur officiel' });
        if (main && role !== 'admin') return send(res, 409, { error: `${u.name} est le compte principal : il reste toujours administrateur` });
        if (u.id === me.id) return send(res, 409, { error: 'impossible de changer ton propre rôle' });
        if (u.role === role) return send(res, 409, { error: 'il a déjà ce rôle' });
        Q.setRole.run(role, u.id); log('ADMIN', `Panel : ${u.name} passe ${role} (avant : ${u.role}) · par ${by}`);
        push(u.id, 'reload', {}); return send(res, 200, { ok: true });
      }
      if (op === 'kick') {
        if (u.id === me.id) return send(res, 409, { error: 'impossible de te déconnecter toi-même ici' });
        const n = db.prepare('DELETE FROM sessions WHERE user_id = ?').run(u.id).changes;
        push(u.id, 'kick', {}); closeGames(u.id); onlineSince.delete(u.id);
        log('DÉCONNEXION', `${u.name} déconnecté par ${by} (${n} session(s) fermée(s))`);
        return send(res, 200, { ok: true });
      }
      if (op === 'give') {   // the gifts of the in-game administration, to this player (test server only: on the official server everybody plays normally)
        if (!IS_TEST) return send(res, 403, { error: 'les dons se font seulement sur le serveur de test' });
        const action = String(P.action || '');
        if (!['give_res', 'give_item', 'give_troops', 'titan_part'].includes(action)) return send(res, 400, { error: 'don inconnu' });
        const p = P.p && typeof P.p === 'object' && !Array.isArray(P.p) ? { ...P.p } : {};
        return admin(req, res, me, ip, { action, p: { ...p, target: u.name, lang: 'fr' } });
      }
      return send(res, 400, { error: 'action inconnue' });
    }
    if (req.method === 'POST' && name === 'create') {
      try { const c = createAccount(P.name, P.password, P.role === 'tester' && IS_TEST ? 'tester' : 'player'); log('ADMIN', `${by} a créé le compte ${c.n} (${c.rl}) depuis le panel`); return send(res, 200, { ok: true, name: c.n }); }
      catch (e) { return send(res, e.code || 500, { error: { bad_name: 'nom invalide (3 à 16 lettres, chiffres, espaces, - ou _)', bad_password: 'mot de passe trop court (6 caractères minimum)', name_taken: 'ce nom est déjà pris' }[e.message] || e.message }); }
    }
    // ----- backups and journal -----
    if (req.method === 'GET' && name === 'backups') return send(res, 200, { list: backups() });
    if (req.method === 'POST' && name === 'backup') { did('sauvegarde demandée'); backupDb(); return send(res, 200, { ok: true, list: backups() }); }
    if (req.method === 'GET' && name === 'log') return send(res, 200, { lines: logRead(qs.get('after'), qs.get('cat'), qs.get('q'), qs.get('limit')) });
    return send(res, 404, { error: 'not_found' });
  }
  return { route, status, isMaint };
};
