'use strict';
// Mekanik War · the beta test.
// - Sign-ups from the website (mekanikwar.com/beta): a commander name and an e-mail, a limited number of places, closed by itself when full.
// - The beta mode of the server (switch in the management panel): only the signed-up addresses can create an account, the paid shop is hidden.
// - The invitations by e-mail, the reset of the server at the start of the beta, the testers' reward (Credits + badge « Beta veteran »).
// - The bug reports sent from the game (Settings › Report a bug), read in the panel.

module.exports = function makeBeta({ db, Q, log, clean, acc, runFor, push, NAME_OK, IS_TEST }) {
  db.exec(`CREATE TABLE IF NOT EXISTS beta_signups (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT, lang TEXT NOT NULL DEFAULT 'fr', at INTEGER NOT NULL,
      src TEXT NOT NULL DEFAULT 'site', invited INTEGER NOT NULL DEFAULT 0, uid INTEGER, rewarded INTEGER NOT NULL DEFAULT 0, ip TEXT);
    CREATE UNIQUE INDEX IF NOT EXISTS beta_email ON beta_signups (email COLLATE NOCASE) WHERE email IS NOT NULL;
    CREATE TABLE IF NOT EXISTS bug_reports (id INTEGER PRIMARY KEY, uid INTEGER NOT NULL, name TEXT NOT NULL, at INTEGER NOT NULL, text TEXT NOT NULL, info TEXT, done INTEGER NOT NULL DEFAULT 0);`);
  const metaGet = k => { const r = db.prepare('SELECT v FROM meta WHERE k = ?').get(k); try { return r ? JSON.parse(r.v) : null; } catch (e) { return null; } };
  const metaSet = (k, v) => db.prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v').run(k, JSON.stringify(v));
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
  const txt = (v, n) => String(v || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
  // on: beta mode · open: sign-ups open on the website · places · msg: the message of the beta page (date of the start...)
  let S = Object.assign({ on: false, open: true, places: 50, msg: '' }, metaGet('beta') || {});
  const save = () => metaSet('beta', S);
  const B = {
    all: db.prepare('SELECT * FROM beta_signups ORDER BY at'),
    count: db.prepare('SELECT COUNT(*) AS n FROM beta_signups'),
    byEmail: db.prepare('SELECT * FROM beta_signups WHERE email = ? COLLATE NOCASE'),
    byName: db.prepare('SELECT * FROM beta_signups WHERE name = ? COLLATE NOCASE'),
    byUid: db.prepare('SELECT * FROM beta_signups WHERE uid = ?'),
    add: db.prepare('INSERT INTO beta_signups (name, email, lang, at, src, uid, ip) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    del: db.prepare('DELETE FROM beta_signups WHERE id = ?'),
    setUid: db.prepare('UPDATE beta_signups SET uid = ? WHERE id = ?'),
    invited: db.prepare('UPDATE beta_signups SET invited = ? WHERE id = ?'),
    rewarded: db.prepare('UPDATE beta_signups SET rewarded = ? WHERE id = ?'),
    testers: db.prepare('SELECT u.name FROM beta_signups s JOIN users u ON u.id = s.uid WHERE u.banned = 0 ORDER BY s.at'),
  };
  // the accounts that already play on this server are testers from the start (once): the administrator and the first players
  if (!metaGet('beta_seed')) {
    const now = Date.now();
    for (const u of db.prepare('SELECT id, name, email FROM users WHERE banned = 0 ORDER BY id').all())
      if (!B.byUid.get(u.id)) { try { B.add.run(u.name, u.email || null, 'fr', now, 'compte', u.id, null); } catch (e) { B.add.run(u.name, null, 'fr', now, 'compte', u.id, null); } }
    metaSet('beta_seed', now);
  }
  const count = () => B.count.get().n;
  const full = () => count() >= S.places;
  const isOpen = () => S.open && !full();

  // ---------- the website ----------
  function publicInfo() { return { open: isOpen(), full: full(), count: count(), places: S.places, msg: S.msg, on: S.on, testers: B.testers.all().map(r => r.name) }; }
  const perIp = new Map();   // address -> sign-up times (3 a day at most)
  function signup(P, ip) {
    if (!isOpen()) throw err(409, full() ? 'full' : 'closed');
    const name = txt(P.name, 16), email = txt(P.email, 120).toLowerCase(), lang = /^[a-z]{2}$/.test(P.lang || '') ? P.lang : 'en';
    if (!NAME_OK.test(name)) throw err(400, 'bad_name');
    if (!acc().EMAIL_OK(email)) throw err(400, 'bad_email');
    const now = Date.now(), L = (perIp.get(ip) || []).filter(t => now - t < 86400_000);
    if (L.length >= 3) throw err(429, 'too_many');
    if (B.byEmail.get(email)) throw err(409, 'email_taken');
    if (B.byName.get(name)) throw err(409, 'name_taken');
    B.add.run(name, email, lang, now, 'site', null, ip); perIp.set(ip, [...L, now]);
    log('BÊTA', `Inscription à la bêta : ${clean(name)} · ${ip} · place ${count()} / ${S.places}${full() ? ' · COMPLET : inscriptions fermées' : ''}`);
    return { ok: true, ...publicInfo() };
  }

  // ---------- the game ----------
  // beta mode: an account can be created only with an address of the list (the administrator always can)
  function registerCheck(name, email, isAdmin) {
    if (!S.on || isAdmin) return null;
    const r = email && B.byEmail.get(String(email).trim());
    if (!r) return 'beta_only';
    if (r.uid && db.prepare('SELECT 1 FROM users WHERE id = ?').get(r.uid)) return 'beta_used';
    return r;
  }
  function registered(row, uid) { if (row && row.id) B.setUid.run(uid, row.id); }
  // bug reports: 5 an hour per player
  function bug(me, P) {
    const text = String(P.text || '').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ').trim().slice(0, 2000);
    if (text.length < 5) throw err(400, 'bug_empty');
    if (db.prepare('SELECT COUNT(*) AS n FROM bug_reports WHERE uid = ? AND at > ?').get(me.id, Date.now() - 3600_000).n >= 5) throw err(429, 'bug_too_many');
    const info = txt(P.info, 300);
    db.prepare('INSERT INTO bug_reports (uid, name, at, text, info) VALUES (?, ?, ?, ?, ?)').run(me.id, me.name, Date.now(), text, info);
    log('BUG', `${me.name} signale : ${clean(text.replace(/\s+/g, ' ')).slice(0, 40)}… (à lire dans le panel, Bêta)`);
    return { ok: true };
  }

  // ---------- the management panel ----------
  function adminView() {
    const users = new Map(db.prepare('SELECT id, name, seen FROM users').all().map(u => [u.id, u]));
    return { ...S, count: count(), mailOn: acc().mailOn(), test: IS_TEST,
      list: B.all.all().map(r => { const u = r.uid ? users.get(r.uid) : null;
        return { id: r.id, name: r.name, email: r.email || '', lang: r.lang, at: r.at, src: r.src, invited: r.invited, rewarded: r.rewarded, account: u ? u.name : '', seen: u ? u.seen : 0 }; }),
      bugs: db.prepare('SELECT * FROM bug_reports ORDER BY done, id DESC LIMIT 200').all() };
  }
  const MAIL = {
    fr: ['Ta place pour la bêta', 'Bonjour {n},\n\nTa place pour la bêta de Mekanik War: Titans est confirmée. Merci de nous aider à préparer le jeu !\n\nCrée ton compte avec CETTE adresse e-mail ({e}), sinon le jeu ne te reconnaîtra pas. Tu peux choisir le nom de commandant que tu veux.\n{m}\nPour jouer : {u}\n\nUn bug, une idée ? Dans le jeu : Paramètres › Signaler un bug.', 'Jouer à la bêta'],
    en: ['Your place in the beta', 'Hello {n},\n\nYour place in the Mekanik War: Titans beta is confirmed. Thank you for helping us get the game ready!\n\nCreate your account with THIS e-mail address ({e}), otherwise the game will not recognise you. You can choose any commander name.\n{m}\nTo play: {u}\n\nA bug, an idea? In the game: Settings › Report a bug.', 'Play the beta'],
  };
  async function invite(ids, by) {
    let sent = 0, fail = 0;
    for (const r of B.all.all()) {
      if (!r.email || (ids && !ids.includes(r.id)) || (!ids && r.invited)) continue;
      const L = MAIL[r.lang === 'fr' ? 'fr' : 'en'], url = acc().BASE + '/';
      const text = L[1].replace('{n}', r.name).replace('{e}', r.email).replace('{m}', S.msg ? '\n' + S.msg + '\n' : '').replace('{u}', url);
      try { if (await acc().sendMail(r.email, L[0], text, L[2], url)) { B.invited.run(Date.now(), r.id); sent++; } else fail++; }
      catch (e) { fail++; log('ERREUR', `invitation à la bêta pour ${r.name} non envoyée : ${e.message}`); }
    }
    log('BÊTA', `${by} envoie les invitations : ${sent} envoyée(s)${fail ? ', ' + fail + ' en échec' : ''}`);
    return { ok: true, sent, fail };
  }
  // the reward of the testers: Credits and the badge « Beta veteran », once per tester (accounts that played the beta)
  function reward(cr, by) {
    let n = 0, wait = 0;
    for (const r of B.all.all()) {
      if (!r.uid || r.rewarded) continue;
      const u = Q.user.get(r.uid), b = Q.base.get(r.uid);
      if (!u || !b || !b.state) { wait++; continue; }   // no base yet: given at the next click
      const res = runFor({ ...u, role: 'server' }, b, 'betaGrant', [cr], 'fr', true);
      if (res.error) { log('ERREUR', `récompense de bêta refusée pour ${u.name} : ${res.error}`); continue; }
      B.rewarded.run(Date.now(), r.id); push(r.uid, 'sync', {}); n++;
    }
    log('BÊTA', `${by} distribue la récompense des testeurs : ${cr} Crédits + badge « Vétéran de la bêta » à ${n} joueur(s)${wait ? ' · ' + wait + ' sans base pour le moment' : ''}`);
    return { ok: true, n, wait };
  }
  // the reset of the whole server (start of the beta): every account is kept, every game starts again from zero
  function wipe(by) {
    const del = sql => { try { db.prepare(sql).run(); } catch (e) { if (!/no such table/.test(e.message)) throw e; } };
    db.exec('BEGIN');
    try {
      for (const t of ['attacks', 'outposts', 'alliances', 'ally_members', 'ally_requests', 'ally_log', 'ally_helps', 'ally_sent', 'reinforcements', 'convoys',
        'chat_msgs', 'chat_read', 'event_scores', 'push_jobs']) del('DELETE FROM ' + t);
      db.prepare('UPDATE bases SET state = NULL, lvl = 1, power = 0, shield = 0, pvp = 0, wins = 0, cos = NULL, updated = ?').run(Date.now());
      db.prepare('UPDATE beta_signups SET rewarded = 0').run();
      db.exec('COMMIT');
    } catch (e) { db.exec('ROLLBACK'); throw e; }
    log('BÊTA', `REMISE À ZÉRO du serveur par ${by} : toutes les parties repartent de zéro, les comptes sont gardés`);
  }
  async function adminAct(P, by) {
    const op = String(P.op || '');
    if (op === 'set') {
      if (P.on !== undefined) S.on = !!P.on;
      if (P.open !== undefined) S.open = !!P.open;
      if (P.places !== undefined) S.places = int(P.places, 1, 10000);
      if (P.msg !== undefined) S.msg = txt(P.msg, 300);
      save(); log('BÊTA', `${by} : mode bêta ${S.on ? 'ACTIVÉ' : 'désactivé'} · inscriptions ${S.open ? 'ouvertes' : 'fermées'} · ${S.places} places${S.msg ? ' · message : ' + S.msg : ''}`);
      return { ok: true };
    }
    if (op === 'add') {   // by hand: an account of this server, or a name and an e-mail
      const name = txt(P.name, 16), email = txt(P.email, 120).toLowerCase();
      const u = name && db.prepare('SELECT id, name, email FROM users WHERE name = ? COLLATE NOCASE').get(name);
      if (u && B.byUid.get(u.id)) throw err(409, 'ce compte est déjà dans la liste');
      if (!u && !NAME_OK.test(name)) throw err(400, 'nom invalide (3 à 16 lettres, chiffres, espaces, - ou _)');
      const mail = email || (u && u.email) || null;
      if (mail && !acc().EMAIL_OK(mail)) throw err(400, 'adresse e-mail invalide');
      if (mail && B.byEmail.get(mail)) throw err(409, 'cette adresse est déjà dans la liste');
      if (!u && !mail) throw err(400, 'ce n\'est pas un compte du serveur : indique aussi son adresse e-mail');
      B.add.run(u ? u.name : name, mail, 'fr', Date.now(), 'panel', u ? u.id : null, null);
      log('BÊTA', `${by} ajoute ${u ? u.name : name} à la liste de la bêta`); return { ok: true };
    }
    if (op === 'del') { const r = db.prepare('SELECT * FROM beta_signups WHERE id = ?').get(int(P.id, 1, 1e12)); if (!r) throw err(404, 'introuvable');
      B.del.run(r.id); log('BÊTA', `${by} retire ${r.name} de la liste de la bêta`); return { ok: true }; }
    if (op === 'invite') return invite(P.id ? [int(P.id, 1, 1e12)] : null, by);
    if (op === 'reward') { const cr = int(P.cr, 1, 100000); if (!cr) throw err(400, 'indique un nombre de Crédits'); return reward(cr, by); }
    if (op === 'bug') { db.prepare('UPDATE bug_reports SET done = ? WHERE id = ?').run(P.done ? 1 : 0, int(P.id, 1, 1e12)); return { ok: true }; }
    throw err(400, 'action inconnue');
  }
  return { publicInfo, signup, registerCheck, registered, bug, adminView, adminAct, wipe, isOn: () => S.on };
};
