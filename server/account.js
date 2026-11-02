'use strict';
// Bastion · accounts: e-mail address (confirmed by a link), forgotten password (a link valid 1 hour, used once),
// password change, account deletion (RGPD), and the e-mails themselves (SMTP, no external module).
// The SMTP settings come from the server's variables (Pelican): SMTP_HOST, SMTP_PORT (465 = TLS, 587 = STARTTLS), SMTP_USER, SMTP_PASS, SMTP_FROM.
// The links always point to PUBLIC_URL (or the game's own address): never to an address taken from the request.
const crypto = require('crypto'), net = require('net'), tls = require('tls');

const EMAIL_OK = s => typeof s === 'string' && s.length <= 120 && /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[a-z]{2,}$/i.test(s);

module.exports = function makeAccounts({ db, Q, log, hashPass, IS_TEST, ADMIN_NAME, ally, onDelete }) {
  for (const c of ['email TEXT', 'email_ok INTEGER NOT NULL DEFAULT 0']) { try { db.exec('ALTER TABLE users ADD COLUMN ' + c); } catch (e) {} }
  db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS users_email ON users (email COLLATE NOCASE) WHERE email IS NOT NULL;
    CREATE TABLE IF NOT EXISTS acc_tokens (hash TEXT PRIMARY KEY, uid INTEGER NOT NULL, kind TEXT NOT NULL, email TEXT, exp INTEGER NOT NULL, used INTEGER NOT NULL DEFAULT 0);
    CREATE INDEX IF NOT EXISTS acc_tokens_uid ON acc_tokens (uid, kind);`);
  const T = {
    byEmail: db.prepare('SELECT * FROM users WHERE email = ? COLLATE NOCASE'),
    byName: db.prepare('SELECT * FROM users WHERE name = ? COLLATE NOCASE'),
    byId: db.prepare('SELECT * FROM users WHERE id = ?'),
    setEmail: db.prepare('UPDATE users SET email = ?, email_ok = ? WHERE id = ?'),
    setOk: db.prepare('UPDATE users SET email_ok = 1 WHERE id = ? AND email = ? COLLATE NOCASE'),
    setPass: db.prepare('UPDATE users SET salt = ?, hash = ? WHERE id = ?'),
    add: db.prepare('INSERT INTO acc_tokens (hash, uid, kind, email, exp) VALUES (?, ?, ?, ?, ?)'),
    get: db.prepare('SELECT * FROM acc_tokens WHERE hash = ?'),
    use: db.prepare('UPDATE acc_tokens SET used = 1 WHERE hash = ? AND used = 0'),
    dropKind: db.prepare('UPDATE acc_tokens SET used = 1 WHERE uid = ? AND kind = ?'),
    last: db.prepare('SELECT MAX(exp) AS e FROM acc_tokens WHERE uid = ? AND kind = ?'),
    clean: db.prepare('DELETE FROM acc_tokens WHERE exp < ?'),
  };
  setInterval(() => { try { T.clean.run(Date.now() - 86400_000); } catch (e) {} }, 3600_000).unref();
  const BASE = (process.env.PUBLIC_URL || (IS_TEST ? 'https://test.mekanikwar.com' : 'https://games.mekanikwar.com')).replace(/\/$/, '');
  const GAME = IS_TEST ? 'Mekanik War Test' : 'Mekanik War';
  const sha = t => crypto.createHash('sha256').update(t).digest('hex');
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const LIFE = { reset: 3600_000, verify: 3 * 86400_000 }, GAP = { reset: 5 * 60_000, verify: 2 * 60_000 };

  // ---------- e-mails (SMTP) ----------
  const SMTP = { host: process.env.SMTP_HOST || '', port: +process.env.SMTP_PORT || 465, user: process.env.SMTP_USER || '', pass: process.env.SMTP_PASS || '', from: process.env.SMTP_FROM || process.env.SMTP_USER || '',
    plain: /^(off|none|0)$/i.test(process.env.SMTP_TLS || '') };   // SMTP_TLS=off: a relay on the same machine only (never through the internet)
  const mailOn = () => !!(SMTP.host && SMTP.from);
  function smtpSend(to, subject, text, html) {
    return new Promise((ok, ko) => {
      const b64 = s => Buffer.from(s, 'utf8').toString('base64'), wrap = s => s.replace(/.{1,76}/g, '$&\r\n');
      const bnd = 'b' + crypto.randomBytes(12).toString('hex'), mid = `<${crypto.randomBytes(12).toString('hex')}@${(SMTP.from.split('@')[1] || 'bastion').replace(/[^\w.-]/g, '')}>`;
      const msg = [`From: ${GAME} <${SMTP.from}>`, `To: <${to}>`, `Subject: =?UTF-8?B?${b64(subject)}?=`, `Date: ${new Date().toUTCString()}`, `Message-ID: ${mid}`, 'MIME-Version: 1.0',
        `Content-Type: multipart/alternative; boundary="${bnd}"`, '', `--${bnd}`, 'Content-Type: text/plain; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', wrap(b64(text)),
        `--${bnd}`, 'Content-Type: text/html; charset=UTF-8', 'Content-Transfer-Encoding: base64', '', wrap(b64(html)), `--${bnd}--`, ''].join('\r\n');
      let sock, buf = '', step = 0, done = false;
      const finish = e => { if (done) return; done = true; try { sock.end(); } catch (x) {} e ? ko(e) : ok(); };
      const write = s => sock.write(s + '\r\n');
      const auth = () => { if (!SMTP.user) { write(`MAIL FROM:<${SMTP.from}>`); step = 10; return; } write('AUTH LOGIN'); step = 5; };
      const onLine = (code, last) => {
        if (!last) return;
        if (step === 0) { if (code !== 220) return finish(new Error('accueil ' + code)); write('EHLO bastion'); step = 1; return; }
        if (step === 1) { if (code !== 250) return finish(new Error('EHLO ' + code)); if (!sock.encrypted && !SMTP.plain) { write('STARTTLS'); step = 2; return; } return auth(); }
        if (step === 2) { if (code !== 220) return finish(new Error('STARTTLS ' + code)); const raw = sock; raw.removeAllListeners('data');
          sock = tls.connect({ socket: raw, servername: SMTP.host }, () => { write('EHLO bastion'); step = 3; }); sock.on('data', onData); sock.on('error', finish); return; }
        if (step === 3) { if (code !== 250) return finish(new Error('EHLO ' + code)); return auth(); }
        if (step === 5) { if (code !== 334) return finish(new Error('AUTH ' + code)); write(b64(SMTP.user)); step = 6; return; }
        if (step === 6) { if (code !== 334) return finish(new Error('AUTH ' + code)); write(b64(SMTP.pass)); step = 7; return; }
        if (step === 7) { if (code !== 235) return finish(new Error('identifiants SMTP refusés (' + code + ')')); write(`MAIL FROM:<${SMTP.from}>`); step = 10; return; }
        if (step === 10) { if (code !== 250) return finish(new Error('MAIL FROM ' + code)); write(`RCPT TO:<${to}>`); step = 11; return; }
        if (step === 11) { if (code !== 250 && code !== 251) return finish(new Error('RCPT ' + code)); write('DATA'); step = 12; return; }
        if (step === 12) { if (code !== 354) return finish(new Error('DATA ' + code)); sock.write(msg.replace(/^\./gm, '..') + '\r\n.\r\n'); step = 13; return; }
        if (step === 13) { if (code !== 250) return finish(new Error('envoi ' + code)); write('QUIT'); return finish(); }
      };
      const onData = d => { buf += d.toString('utf8'); let i; while ((i = buf.indexOf('\r\n')) >= 0) { const line = buf.slice(0, i); buf = buf.slice(i + 2); onLine(+line.slice(0, 3), line[3] !== '-'); } };
      sock = SMTP.port === 465 ? tls.connect({ host: SMTP.host, port: SMTP.port, servername: SMTP.host }) : net.connect({ host: SMTP.host, port: SMTP.port });
      sock.setTimeout(20000, () => finish(new Error('délai dépassé')));
      sock.on('data', onData); sock.on('error', finish);
    });
  }
  // the texts of the e-mails, in the player's language (French or English)
  const MAILS = {
    verify: { fr: ['Confirme ton adresse e-mail', 'Bonjour {n},\n\nConfirme ton adresse e-mail pour pouvoir retrouver ton compte si tu oublies ton mot de passe :\n{u}\n\nCe lien est valable 3 jours. Si tu n\'as pas créé de compte sur {g}, ignore ce message.', 'Confirmer mon adresse'],
              en: ['Confirm your e-mail address', 'Hello {n},\n\nConfirm your e-mail address so you can recover your account if you forget your password:\n{u}\n\nThis link is valid for 3 days. If you did not create an account on {g}, ignore this message.', 'Confirm my address'] },
    reset:  { fr: ['Nouveau mot de passe', 'Bonjour {n},\n\nTu as demandé un nouveau mot de passe. Choisis-le ici :\n{u}\n\nCe lien est valable 1 heure et ne sert qu\'une fois. Si ce n\'est pas toi, ignore ce message : ton mot de passe ne change pas.', 'Choisir un nouveau mot de passe'],
              en: ['New password', 'Hello {n},\n\nYou asked for a new password. Choose it here:\n{u}\n\nThis link is valid for 1 hour and works only once. If it was not you, ignore this message: your password does not change.', 'Choose a new password'] },
  };
  async function mail(u, kind, email, lang) {
    const raw = crypto.randomBytes(32).toString('hex'), now = Date.now();
    T.dropKind.run(u.id, kind); T.add.run(sha(raw), u.id, kind, email, now + LIFE[kind]);
    const url = `${BASE}/?${kind === 'reset' ? 'reset' : 'verify'}=${raw}`;
    const L = MAILS[kind][lang === 'fr' ? 'fr' : 'en'], text = L[1].replace('{n}', u.name).replace('{u}', url).replace('{g}', GAME);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;background:#1a1e1a;color:#e8e2d0;padding:24px;border-radius:12px;border:2px solid #b8913a">
      <h2 style="color:#f3c534;letter-spacing:2px;margin-top:0">${esc(GAME.toUpperCase())}</h2>${esc(text).split('\n').filter(l => l !== url).map(l => l ? `<p>${l}</p>` : '').join('')}
      <p style="text-align:center;margin:24px 0"><a href="${esc(url)}" style="background:#f3c534;color:#1a1408;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:8px">${esc(L[2])}</a></p>
      <p style="font-size:12px;color:#9c9585">${esc(url)}</p></div>`;
    if (!mailOn()) { log('E-MAIL', `non envoyé à ${u.name} (${L[0]}) : réglages SMTP absents${IS_TEST ? ' · lien de test : ' + url : ''}`); return false; }
    try { await smtpSend(email, `${GAME} · ${L[0]}`, text, html); log('E-MAIL', `${L[0]} → ${u.name}`); return true; }
    catch (e) { log('ERREUR', `e-mail « ${L[0]} » pour ${u.name} non envoyé : ${e.message}`); return false; }
  }
  const tooSoon = (uid, kind) => { const l = T.last.get(uid, kind).e; return l && l - LIFE[kind] + GAP[kind] > Date.now(); };
  const useToken = (raw, kind) => { if (!/^[a-f0-9]{64}$/.test(String(raw || ''))) return null; const t = T.get.get(sha(raw)); if (!t || t.kind !== kind || t.used || t.exp < Date.now()) return null; return T.use.run(t.hash).changes ? t : null; };
  const newPass = (uid, pass) => { const salt = crypto.randomBytes(16).toString('hex'); T.setPass.run(salt, hashPass(String(pass), salt), uid); };
  const checkPass = (u, pass) => { const h = Buffer.from(hashPass(String(pass || ''), u.salt), 'hex'), w = Buffer.from(u.hash, 'hex'); return h.length === w.length && crypto.timingSafeEqual(h, w); };
  const PASS_OK = p => typeof p === 'string' && p.length >= 6 && p.length <= 100;
  const mask = e => e ? e.replace(/^(.)(.*)(@.*)$/, (m, a, b, c) => a + '*'.repeat(Math.min(6, b.length)) + c) : null;

  // ---------- the routes ----------
  // registration: the address is checked and kept, then the confirmation e-mail leaves
  function checkNewEmail(email) {
    const e = String(email || '').trim();
    if (!EMAIL_OK(e)) throw err(400, 'bad_email');
    if (T.byEmail.get(e)) throw err(409, 'email_taken');
    return e;
  }
  function afterRegister(uid, email, lang) { T.setEmail.run(email, 0, uid); const u = T.byId.get(uid); mail(u, 'verify', email, lang); }
  // forgotten password: always the same answer (nobody learns whether an account or an address exists)
  async function forgot(P) {
    const who = String(P.who || '').trim().slice(0, 120);
    const u = who.includes('@') ? T.byEmail.get(who) : T.byName.get(who);
    if (u && u.email && u.email_ok && !u.banned && !tooSoon(u.id, 'reset')) await mail(u, 'reset', u.email, P.lang);
    else if (u) log('MOT DE PASSE', `demande pour ${u.name} sans envoi (${!u.email ? 'pas d\'adresse' : !u.email_ok ? 'adresse non confirmée' : u.banned ? 'compte bloqué' : 'demande trop rapprochée'})`);
    return { ok: true };
  }
  function reset(P) {
    if (!PASS_OK(P.password)) throw err(400, 'bad_password');
    const t = useToken(P.token, 'reset'); if (!t) throw err(410, 'link_expired');
    const u = T.byId.get(t.uid); if (!u || u.banned) throw err(410, 'link_expired');
    newPass(u.id, P.password); T.setOk.run(u.id, t.email);   // the link came to that address: it is confirmed
    db.prepare('DELETE FROM sessions WHERE user_id = ?').run(u.id);
    log('MOT DE PASSE', `${u.name} a choisi un nouveau mot de passe (lien reçu par e-mail) · toutes ses sessions sont fermées`);
    return { ok: true, name: u.name };
  }
  function verify(P) {
    const t = useToken(P.token, 'verify'); if (!t) throw err(410, 'link_expired');
    if (!T.setOk.run(t.uid, t.email).changes) throw err(410, 'link_expired');
    const u = T.byId.get(t.uid); log('E-MAIL', `${u ? u.name : '?'} a confirmé son adresse`); return { ok: true, name: u ? u.name : '' };
  }
  function view(me) { const u = T.byId.get(me.id); return { email: u.email || null, ok: !!u.email_ok, mail: mailOn() }; }
  async function act(me, P) {
    const op = String(P.op || ''), u = T.byId.get(me.id);
    if (op === 'email') {
      if (!checkPass(u, P.password)) throw err(403, 'bad_login');
      const e = String(P.email || '').trim(); if (!EMAIL_OK(e)) throw err(400, 'bad_email');
      const o = T.byEmail.get(e); if (o && o.id !== u.id) throw err(409, 'email_taken');
      if (tooSoon(u.id, 'verify') && u.email && u.email.toLowerCase() === e.toLowerCase()) throw err(429, 'mail_wait');
      T.setEmail.run(e, 0, u.id); await mail(T.byId.get(u.id), 'verify', e, P.lang);
      log('E-MAIL', `${u.name} indique une adresse e-mail (à confirmer)`); return { ok: true, ...view(me) };
    }
    if (op === 'resend') {
      if (!u.email || u.email_ok) throw err(409, 'bad_order'); if (tooSoon(u.id, 'verify')) throw err(429, 'mail_wait');
      await mail(u, 'verify', u.email, P.lang); return { ok: true };
    }
    if (op === 'password') {
      if (!checkPass(u, P.old)) throw err(403, 'bad_login');
      if (!PASS_OK(P.password)) throw err(400, 'bad_password');
      newPass(u.id, P.password); db.prepare('DELETE FROM sessions WHERE user_id = ? AND token != ?').run(u.id, me.token);
      log('MOT DE PASSE', `${u.name} a changé son mot de passe · ses autres sessions sont fermées`); return { ok: true };
    }
    if (op === 'delete') {
      if (u.name.toLowerCase() === ADMIN_NAME.toLowerCase()) throw err(403, 'forbidden');
      if (!checkPass(u, P.password)) throw err(403, 'bad_login');
      if (String(P.confirm || '').trim().toLowerCase() !== u.name.toLowerCase()) throw err(400, 'bad_confirm');
      remove(u, 'à sa demande'); return { ok: true };
    }
    throw err(400, 'bad_order');
  }
  // the deletion itself (the payments are kept: accounting obligation; they only hold the account number)
  function remove(u, why) {
    try { ally.removeUser(u.id); } catch (e) { log('ERREUR', 'suppression : alliance : ' + e.message); }
    db.exec('BEGIN');
    try {
      const del = (sql, ...a) => { try { db.prepare(sql).run(...a); } catch (e) { if (!/no such table/.test(e.message)) throw e; } };
      del('DELETE FROM sessions WHERE user_id = ?', u.id); del('DELETE FROM outposts WHERE user_id = ?', u.id);
      del("UPDATE attacks SET status = 'gone' WHERE (att = ? OR def = ?) AND status = 'out'", u.id, u.id);
      del('DELETE FROM reinforcements WHERE owner = ? OR host = ?', u.id, u.id); del('DELETE FROM convoys WHERE owner = ? OR host = ?', u.id, u.id);
      del('DELETE FROM ally_requests WHERE user_id = ?', u.id); del('DELETE FROM ally_sent WHERE user_id = ?', u.id); del('DELETE FROM ally_helps WHERE target = ? OR helper = ?', u.id, u.id);
      del('DELETE FROM chat_msgs WHERE uid = ?', u.id); del('DELETE FROM chat_read WHERE uid = ?', u.id); del('DELETE FROM chat_ignore WHERE uid = ? OR target = ?', u.id, u.id); del('DELETE FROM chat_mutes WHERE uid = ?', u.id);
      del('DELETE FROM event_scores WHERE uid = ?', u.id); del('DELETE FROM push_subs WHERE uid = ?', u.id); del('DELETE FROM push_prefs WHERE uid = ?', u.id); del('DELETE FROM push_jobs WHERE uid = ?', u.id);
      del('DELETE FROM acc_tokens WHERE uid = ?', u.id); del('DELETE FROM bans WHERE user_id = ?', u.id); del('DELETE FROM bases WHERE user_id = ?', u.id); del('DELETE FROM users WHERE id = ?', u.id);
      db.exec('COMMIT');
    } catch (e) { db.exec('ROLLBACK'); throw e; }
    log('COMPTE SUPPRIMÉ', `${u.name} (n°${u.id}) · ${why} · base, avant-postes, messages et données effacés`);
    try { onDelete && onDelete(u); } catch (e) {}
  }
  // the management panel: a temporary password, or the reset link by e-mail
  const admin = {
    tempPass(u, by) { const p = crypto.randomBytes(6).toString('base64').replace(/[+/=]/g, '').slice(0, 8) + Math.floor(Math.random() * 90 + 10);
      newPass(u.id, p); db.prepare('DELETE FROM sessions WHERE user_id = ?').run(u.id); log('MOT DE PASSE', `${by} donne un mot de passe provisoire à ${u.name}`); return { password: p }; },
    async mailReset(u, by) { if (!u.email) throw err(409, 'pas d\'adresse e-mail pour ce compte'); const sent = await mail(u, 'reset', u.email, 'fr');
      log('MOT DE PASSE', `${by} envoie un lien de réinitialisation à ${u.name}`); return { ok: true, sent }; },
    remove(u, by) { if (u.name.toLowerCase() === ADMIN_NAME.toLowerCase()) throw err(409, 'le compte principal ne peut pas être supprimé'); remove(u, 'par ' + by); return { ok: true }; },
    info: u => ({ email: u.email || null, email_ok: !!u.email_ok }),
  };
  return { checkNewEmail, afterRegister, forgot, reset, verify, view, act, admin, mailOn, EMAIL_OK, mask };
};
