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
  try { db.exec('ALTER TABLE beta_signups ADD COLUMN bonus INTEGER NOT NULL DEFAULT 0'); } catch (e) {}
  try { db.exec('ALTER TABLE beta_signups ADD COLUMN origin TEXT'); } catch (e) {}   // where the visitor came from (tiktok, youtube… server/visits.js)   // the bonus of the most helpful testers (time it was given)
  const metaGet = k => { const r = db.prepare('SELECT v FROM meta WHERE k = ?').get(k); try { return r ? JSON.parse(r.v) : null; } catch (e) { return null; } };
  const metaSet = (k, v) => db.prepare('INSERT INTO meta (k, v) VALUES (?, ?) ON CONFLICT(k) DO UPDATE SET v = excluded.v').run(k, JSON.stringify(v));
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const int = (v, lo, hi) => Math.max(lo, Math.min(hi, Math.floor(Number(v) || 0)));
  const txt = (v, n) => String(v || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, n);
  // on: beta mode · open: sign-ups open on the website · places · msg: the message of the beta page (date of the start...)
  // started: the beta is launched (the listed testers can play); before, only the administrator can enter the game
  let S = Object.assign({ on: false, started: false, open: true, places: 50, msg: '' }, metaGet('beta') || {});
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
    testers: db.prepare('SELECT COALESCE(u.name, s.name) AS name FROM beta_signups s LEFT JOIN users u ON u.id = s.uid WHERE COALESCE(u.banned, 0) = 0 ORDER BY s.at'),   // every signed-up tester, at once (the account name once the account exists)
  };
  // the accounts that already play on this server are testers from the start (once): the administrator and the first players
  if (!metaGet('beta_seed')) {
    const now = Date.now();
    for (const u of db.prepare('SELECT id, name, email FROM users WHERE banned = 0 ORDER BY id').all())
      if (!B.byUid.get(u.id)) { try { B.add.run(u.name, u.email || null, 'fr', now, 'compte', u.id, null); } catch (e) { B.add.run(u.name, null, 'fr', now, 'compte', u.id, null); } }
    metaSet('beta_seed', now);
  }
  // a sign-up of the website by somebody who already has an account on this server (same e-mail, or same name): linked to that account
  const userByEmail = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE'), userByName = db.prepare('SELECT id FROM users WHERE name = ? COLLATE NOCASE');
  function linkAll() {
    for (const r of db.prepare('SELECT * FROM beta_signups WHERE uid IS NULL').all()) {
      const u = (r.email && userByEmail.get(r.email)) || userByName.get(r.name);
      if (u && !B.byUid.get(u.id)) B.setUid.run(u.id, r.id);
    }
  }
  linkAll();
  const count = () => B.count.get().n;
  const full = () => count() >= S.places;
  const isOpen = () => S.open && !full();

  // ---------- the website ----------
  function publicInfo() { return { open: isOpen(), full: full(), count: count(), places: S.places, msg: S.msg, on: S.on, started: S.started, testers: B.testers.all().map(r => r.name) }; }
  const perIp = new Map();   // address -> sign-up times (3 a day at most)
  function signup(P, ip, origin) {
    if (!isOpen()) throw err(409, full() ? 'full' : 'closed');
    const name = txt(P.name, 16), email = txt(P.email, 120).toLowerCase(), lang = /^[a-z]{2}$/.test(P.lang || '') ? P.lang : 'en';
    if (!NAME_OK.test(name)) throw err(400, 'bad_name');
    if (!acc().EMAIL_OK(email)) throw err(400, 'bad_email');
    const now = Date.now(), L = (perIp.get(ip) || []).filter(t => now - t < 86400_000);
    if (L.length >= 3) throw err(429, 'too_many');
    if (B.byEmail.get(email)) throw err(409, 'email_taken');
    if (B.byName.get(name)) throw err(409, 'name_taken');
    const id = Number(B.add.run(name, email, lang, now, 'site', null, ip).lastInsertRowid); perIp.set(ip, [...L, now]);
    if (origin) db.prepare('UPDATE beta_signups SET origin = ? WHERE id = ?').run(String(origin).slice(0, 30), id);
    log('BÊTA', `Inscription à la bêta : ${clean(name)} · ${ip}${origin ? ' · venu de ' + clean(origin) : ''} · place ${count()} / ${S.places}${full() ? ' · COMPLET : inscriptions fermées' : ''}`);
    linkAll();
    const now2 = S.on && S.started;   // the beta is running: the invitation (with the game link) leaves at once
    if (now2) invite([id], 'inscription').catch(e => log('ERREUR', 'invitation immédiate non envoyée : ' + e.message));
    if (full()) fullMail();
    return { ok: true, sent: now2, ...publicInfo() };
  }

  // the last place is taken: an e-mail to the game's mailbox (BETA_NOTIFY_EMAIL chooses another address, « off » sends nothing)
  function fullMail() {
    const to = process.env.BETA_NOTIFY_EMAIL || acc().SMTP_USER;
    if (!to || /^(off|0|non)$/i.test(to)) return;
    const names = B.all.all().map((r, i) => `${i + 1}. ${r.name}${r.email ? ' (' + r.email + ')' : ''}`).join('\n');
    const text = S.started ? `Bonne nouvelle : les ${S.places} places de la bêta sont prises ! Les inscriptions sur le site sont fermées automatiquement.\n\nLa bêta est déjà lancée : chaque inscrit a reçu le lien du jeu par e-mail au moment de son inscription. Pour ajouter des places : panel officiel › Bêta › Nombre de places, puis Rouvrir les inscriptions.\n\nListe des inscrits :\n${names}` : `Bonne nouvelle : les ${S.places} places de la bêta sont prises ! Les inscriptions sur le site sont fermées automatiquement.\n\nProchaines étapes, dans le panel officiel (menu Bêta) :\n1. Écris la date du lancement dans le message de la page bêta, puis Enregistrer.\n2. Annonce la date sur Discord.\n3. Le jour J : « Lancer la bêta », puis « Envoyer les invitations ».\n\nLes inscrits :\n${names}`;
    acc().sendMail(to, `Bêta complète : ${S.places} / ${S.places}`, text, '', '')
      .then(ok => { if (ok) log('BÊTA', 'E-mail « bêta complète » envoyé à l\'administrateur'); })
      .catch(e => log('ERREUR', 'e-mail « bêta complète » non envoyé : ' + e.message));
  }

  // ---------- the game ----------
  // beta mode: an account can be created only with an address of the list (the administrator always can)
  // who may play: beta mode off = everybody · beta not launched yet = the administrator only · beta launched = the accounts of the list
  function access(u) {
    if (!S.on || !u || u.role === 'admin') return null;
    if (!S.started) return 'beta_soon';
    if (!B.byUid.get(u.id)) linkAll();
    return B.byUid.get(u.id) ? null : 'beta_list';
  }
  function registerCheck(name, email, isAdmin) {
    if (!S.on || isAdmin) return null;
    if (!S.started) return 'beta_soon';
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
  const bugsOf = db.prepare('SELECT COUNT(*) AS n FROM bug_reports WHERE uid = ?');
  function adminView() {
    linkAll();
    const users = new Map(db.prepare('SELECT id, name, seen FROM users').all().map(u => [u.id, u]));
    return { ...S, count: count(), mailOn: acc().mailOn(), test: IS_TEST,
      list: B.all.all().map(r => { const u = r.uid ? users.get(r.uid) : null;
        return { id: r.id, name: r.name, email: r.email || '', lang: r.lang, at: r.at, src: r.src, origin: r.origin || '', invited: r.invited, rewarded: r.rewarded, bonus: r.bonus, bugs: r.uid ? (bugsOf.get(r.uid) || {}).n || 0 : 0, account: u ? u.name : '', seen: u ? u.seen : 0 }; }),
      bugs: db.prepare('SELECT * FROM bug_reports ORDER BY done, id DESC LIMIT 200').all() };
  }
  // the invitation: [subject, text for a new player, button, text for a player who already has an account on this server]
  const MAIL = {
    fr: ['Ta place pour la bêta', 'Bonjour {n},\n\nTa place pour la bêta de Mekanik War: Titans est confirmée. Merci de nous aider à préparer le jeu !\n\nCrée ton compte avec CETTE adresse e-mail ({e}), sinon le jeu ne te reconnaîtra pas. Tu peux choisir le nom de commandant que tu veux.\n{m}\nPour jouer : {u}\n\nUn bug, une idée ? Dans le jeu : Paramètres › Signaler un bug.', 'Jouer à la bêta',
      'Bonjour {n},\n\nLa bêta de Mekanik War: Titans est ouverte ! Merci de nous aider à préparer le jeu.\n\nConnecte-toi avec ton compte habituel.\n{m}\nPour jouer : {u}\n\nUn bug, une idée ? Dans le jeu : Paramètres › Signaler un bug.'],
    en: ['Your place in the beta', 'Hello {n},\n\nYour place in the Mekanik War: Titans beta is confirmed. Thank you for helping us get the game ready!\n\nCreate your account with THIS e-mail address ({e}), otherwise the game will not recognise you. You can choose any commander name.\n{m}\nTo play: {u}\n\nA bug, an idea? In the game: Settings › Report a bug.', 'Play the beta',
      'Hello {n},\n\nThe Mekanik War: Titans beta is open! Thank you for helping us get the game ready.\n\nLog in with your usual account.\n{m}\nTo play: {u}\n\nA bug, an idea? In the game: Settings › Report a bug.'],
    es: ['Tu plaza en la beta', 'Hola {n}:\n\nTu plaza en la beta de Mekanik War: Titans está confirmada. ¡Gracias por ayudarnos a preparar el juego!\n\nCrea tu cuenta con ESTA dirección de correo ({e}); si no, el juego no te reconocerá. Puedes elegir el nombre de comandante que quieras.\n{m}\nPara jugar: {u}\n\n¿Un error, una idea? En el juego: Ajustes › Informar de un error.', 'Jugar a la beta',
      'Hola {n}:\n\n¡La beta de Mekanik War: Titans está abierta! Gracias por ayudarnos a preparar el juego.\n\nInicia sesión con tu cuenta de siempre.\n{m}\nPara jugar: {u}\n\n¿Un error, una idea? En el juego: Ajustes › Informar de un error.'],
    de: ['Dein Platz in der Beta', 'Hallo {n},\n\ndein Platz in der Beta von Mekanik War: Titans ist bestätigt. Danke, dass du uns hilfst, das Spiel vorzubereiten!\n\nErstelle dein Konto mit DIESER E-Mail-Adresse ({e}), sonst erkennt dich das Spiel nicht. Den Kommandantennamen kannst du frei wählen.\n{m}\nZum Spielen: {u}\n\nEin Fehler, eine Idee? Im Spiel: Einstellungen › Fehler melden.', 'Beta spielen',
      'Hallo {n},\n\ndie Beta von Mekanik War: Titans ist offen! Danke, dass du uns hilfst, das Spiel vorzubereiten.\n\nMelde dich mit deinem gewohnten Konto an.\n{m}\nZum Spielen: {u}\n\nEin Fehler, eine Idee? Im Spiel: Einstellungen › Fehler melden.'],
    it: ['Il tuo posto nella beta', 'Ciao {n},\n\nil tuo posto nella beta di Mekanik War: Titans è confermato. Grazie per aiutarci a preparare il gioco!\n\nCrea il tuo account con QUESTO indirizzo e-mail ({e}), altrimenti il gioco non ti riconoscerà. Puoi scegliere il nome da comandante che vuoi.\n{m}\nPer giocare: {u}\n\nUn bug, un\'idea? Nel gioco: Impostazioni › Segnala un bug.', 'Gioca alla beta',
      'Ciao {n},\n\nla beta di Mekanik War: Titans è aperta! Grazie per aiutarci a preparare il gioco.\n\nAccedi con il tuo solito account.\n{m}\nPer giocare: {u}\n\nUn bug, un\'idea? Nel gioco: Impostazioni › Segnala un bug.'],
    pt: ['O teu lugar na beta', 'Olá {n},\n\no teu lugar na beta de Mekanik War: Titans está confirmado. Obrigado por nos ajudares a preparar o jogo!\n\nCria a tua conta com ESTE endereço de e-mail ({e}), senão o jogo não te reconhece. Podes escolher o nome de comandante que quiseres.\n{m}\nPara jogar: {u}\n\nUm bug, uma ideia? No jogo: Configurações › Relatar um bug.', 'Jogar a beta',
      'Olá {n},\n\na beta de Mekanik War: Titans está aberta! Obrigado por nos ajudares a preparar o jogo.\n\nInicia sessão com a tua conta habitual.\n{m}\nPara jogar: {u}\n\nUm bug, uma ideia? No jogo: Configurações › Relatar um bug.'],
    pl: ['Twoje miejsce w becie', 'Cześć {n},\n\ntwoje miejsce w becie Mekanik War: Titans jest potwierdzone. Dziękujemy, że pomagasz nam przygotować grę!\n\nZałóż konto z TYM adresem e-mail ({e}), inaczej gra cię nie rozpozna. Nazwę dowódcy możesz wybrać dowolną.\n{m}\nAby zagrać: {u}\n\nBłąd, pomysł? W grze: Ustawienia › Zgłoś błąd.', 'Zagraj w betę',
      'Cześć {n},\n\nbeta Mekanik War: Titans jest otwarta! Dziękujemy, że pomagasz nam przygotować grę.\n\nZaloguj się na swoje zwykłe konto.\n{m}\nAby zagrać: {u}\n\nBłąd, pomysł? W grze: Ustawienia › Zgłoś błąd.'],
    tr: ['Betadaki yerin', 'Merhaba {n},\n\nMekanik War: Titans betasındaki yerin onaylandı. Oyunu hazırlamamıza yardım ettiğin için teşekkürler!\n\nHesabını BU e-posta adresiyle ({e}) oluştur, yoksa oyun seni tanımaz. İstediğin komutan adını seçebilirsin.\n{m}\nOynamak için: {u}\n\nBir hata, bir fikir mi? Oyunda: Ayarlar › Hata bildir.', 'Betayı oyna',
      'Merhaba {n},\n\nMekanik War: Titans betası açıldı! Oyunu hazırlamamıza yardım ettiğin için teşekkürler.\n\nHer zamanki hesabınla giriş yap.\n{m}\nOynamak için: {u}\n\nBir hata, bir fikir mi? Oyunda: Ayarlar › Hata bildir.'],
    ru: ['Твоё место в бете', 'Привет, {n}!\n\nТвоё место в бете Mekanik War: Titans подтверждено. Спасибо, что помогаешь нам готовить игру!\n\nСоздай аккаунт с ЭТИМ адресом e-mail ({e}), иначе игра тебя не узнает. Имя командира можешь выбрать любое.\n{m}\nИграть: {u}\n\nОшибка, идея? В игре: Настройки › Сообщить об ошибке.', 'Играть в бету',
      'Привет, {n}!\n\nБета Mekanik War: Titans открыта! Спасибо, что помогаешь нам готовить игру.\n\nВойди в свой обычный аккаунт.\n{m}\nИграть: {u}\n\nОшибка, идея? В игре: Настройки › Сообщить об ошибке.'],
  };
  const userInfo = db.prepare('SELECT id, role FROM users WHERE id = ?');
  async function invite(ids, by) {
    let sent = 0, fail = 0;
    for (const r of B.all.all()) {
      if (!r.email || (ids && !ids.includes(r.id)) || (!ids && r.invited)) continue;
      const u = r.uid ? userInfo.get(r.uid) : null;
      if (u && u.role === 'admin') { B.invited.run(Date.now(), r.id); continue; }   // the administrator needs no invitation
      const L = MAIL[r.lang] || MAIL.en, url = acc().BASE + '/';
      const text = L[u ? 3 : 1].replace('{n}', r.name).replace('{e}', r.email).replace('{m}', S.msg ? '\n' + S.msg + '\n' : '').replace('{u}', url);
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
      db.prepare('UPDATE beta_signups SET rewarded = 0, bonus = 0').run();
      db.exec('COMMIT');
    } catch (e) { db.exec('ROLLBACK'); throw e; }
    log('BÊTA', `REMISE À ZÉRO du serveur par ${by} : toutes les parties repartent de zéro, les comptes sont gardés`);
  }
  async function adminAct(P, by) {
    const op = String(P.op || '');
    if (op === 'set') {
      if (P.on !== undefined) { S.on = !!P.on; if (!S.on) S.started = false; }
      const was = S.started;
      if (P.started !== undefined) S.started = !!P.started && S.on;
      const launched = S.started && !was;
      if (launched && P.msg === undefined && S.msg) { log('BÊTA', `message de la page bêta effacé au lancement : « ${clean(S.msg).slice(0, 60)} »`); S.msg = ''; }   // « the date will be announced… » is out of date
      if (launched) setTimeout(() => invite(null, by + ' (lancement)').catch(e => log('ERREUR', 'invitations du lancement : ' + e.message)), 0);
      if (P.open !== undefined) S.open = !!P.open;
      if (P.places !== undefined) S.places = int(P.places, 1, 10000);
      if (P.msg !== undefined) S.msg = txt(P.msg, 300);
      save(); log('BÊTA', `${by} : mode bêta ${S.on ? 'ACTIVÉ' + (S.started ? ' (bêta LANCÉE : les inscrits jouent)' : ' (bêta pas encore lancée : jeu fermé)') : 'désactivé'} · inscriptions ${S.open ? 'ouvertes' : 'fermées'} · ${S.places} places${S.msg ? ' · message : ' + S.msg : ''}`);
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
    if (op === 'bonus') {   // extra Credits for one tester (bugs reported, good ideas), once
      const cr = int(P.cr, 1, 100000), r = db.prepare('SELECT * FROM beta_signups WHERE id = ?').get(int(P.id, 1, 1e12));
      if (!r) throw err(404, 'introuvable'); if (!cr) throw err(400, 'indique un nombre de Crédits');
      if (r.bonus) throw err(409, 'ce testeur a déjà reçu son bonus');
      const u = r.uid && Q.user.get(r.uid), b = u && Q.base.get(r.uid);
      if (!u) throw err(409, 'ce testeur n\'a pas encore de compte');
      if (!b || !b.state) throw err(409, 'ce testeur n\'a pas encore de base : il doit se connecter une fois au jeu');
      const res = runFor({ ...u, role: 'server' }, b, 'betaGrant', [cr], 'fr', true);
      if (res.error) throw err(409, 'refusé par le jeu : ' + res.error);
      db.prepare('UPDATE beta_signups SET bonus = ? WHERE id = ?').run(Date.now(), r.id); push(r.uid, 'sync', {});
      log('BÊTA', `${by} donne un bonus de ${cr} Crédits à ${u.name}`); return { ok: true };
    }
    if (op === 'bug') { db.prepare('UPDATE bug_reports SET done = ? WHERE id = ?').run(P.done ? 1 : 0, int(P.id, 1, 1e12)); return { ok: true }; }
    throw err(400, 'action inconnue');
  }
  return { publicInfo, signup, registerCheck, registered, access, bug, adminView, adminAct, wipe, isOn: () => S.on };
};
