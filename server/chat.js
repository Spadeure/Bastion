'use strict';
// Bastion · chat on the server: general channel (every player), alliance channel, private messages between two players.
// Anti-spam: one message every 3 seconds, 10 per minute, 300 characters, never the same message twice in a row within a minute.
// Rude words are replaced by stars (French and English list). A player can ignore another one (he no longer sees his messages)
// and report a message (the report goes to the journal of the management panel). Kept: the 200 latest messages of the general
// channel and of each alliance, 30 days of private messages. Everything arrives at once through the live line (event "chat").

module.exports = function makeChat(C) {
  const { db, Q, log, clean, push, broadcast, ally } = C;
  const MAX_LEN = 300, GAP = 3000, PER_MIN = 10, KEEP = 200, PRIVATE_DAYS = 30;
  db.exec(`CREATE TABLE IF NOT EXISTS chat_msgs (id INTEGER PRIMARY KEY, ch TEXT NOT NULL, uid INTEGER NOT NULL, name TEXT NOT NULL, text TEXT NOT NULL, at INTEGER NOT NULL);
    CREATE INDEX IF NOT EXISTS chat_ch ON chat_msgs (ch, id);
    CREATE TABLE IF NOT EXISTS chat_ignore (uid INTEGER NOT NULL, target INTEGER NOT NULL, PRIMARY KEY (uid, target));
    CREATE TABLE IF NOT EXISTS chat_read (uid INTEGER NOT NULL, ch TEXT NOT NULL, last INTEGER NOT NULL, PRIMARY KEY (uid, ch));`);
  const M = {
    add: db.prepare('INSERT INTO chat_msgs (ch, uid, name, text, at) VALUES (?, ?, ?, ?, ?)'),
    last: db.prepare('SELECT id, uid, name, text, at FROM chat_msgs WHERE ch = ? ORDER BY id DESC LIMIT ?'),
    after: db.prepare('SELECT id, uid, name, text, at FROM chat_msgs WHERE ch = ? AND id > ? ORDER BY id LIMIT 100'),
    byId: db.prepare('SELECT * FROM chat_msgs WHERE id = ?'),
    trim: db.prepare('DELETE FROM chat_msgs WHERE ch = ? AND id <= (SELECT id FROM chat_msgs WHERE ch = ? ORDER BY id DESC LIMIT 1 OFFSET ?)'),
    oldPrivate: db.prepare("DELETE FROM chat_msgs WHERE ch LIKE 'p:%' AND at < ?"),
    ignores: db.prepare('SELECT i.target AS id, u.name FROM chat_ignore i JOIN users u ON u.id = i.target WHERE i.uid = ?'),
    ignoredBy: db.prepare('SELECT 1 FROM chat_ignore WHERE uid = ? AND target = ?'),
    ignore: db.prepare('INSERT OR IGNORE INTO chat_ignore (uid, target) VALUES (?, ?)'),
    unignore: db.prepare('DELETE FROM chat_ignore WHERE uid = ? AND target = ?'),
    read: db.prepare('INSERT INTO chat_read (uid, ch, last) VALUES (?, ?, ?) ON CONFLICT(uid, ch) DO UPDATE SET last = MAX(last, excluded.last)'),
    readOf: db.prepare('SELECT last FROM chat_read WHERE uid = ? AND ch = ?'),
    unread: db.prepare('SELECT COUNT(*) AS n FROM chat_msgs WHERE ch = ? AND id > ? AND uid != ?'),
    convs: db.prepare(`SELECT ch, MAX(id) AS last FROM chat_msgs WHERE ch LIKE 'p:%' AND (ch LIKE ? OR ch LIKE ?) GROUP BY ch ORDER BY last DESC LIMIT 50`),
  };
  setInterval(() => { try { M.oldPrivate.run(Date.now() - PRIVATE_DAYS * 86400_000); } catch (e) {} }, 3600_000).unref();

  // ---------- rude words: replaced by stars (whole words, any case, accents ignored) ----------
  const BAD = ['merde', 'putain', 'pute', 'salope', 'connard', 'connasse', 'encule', 'enculer', 'batard', 'nique', 'niquer', 'fdp', 'ntm', 'pd', 'tg', 'ta gueule',
    'fils de pute', 'nique ta mere', 'bite', 'couille', 'couilles', 'chier', 'enfoire', 'abruti', 'cretin', 'debile', 'gogol', 'negre', 'bougnoule',
    'fuck', 'fucking', 'fucker', 'motherfucker', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'cunt', 'whore', 'slut', 'faggot', 'fag', 'nigger', 'nigga', 'stfu', 'kys'];
  const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const BAD_RE = new RegExp(`(^|[^\\p{L}\\p{N}])((?:${BAD.map(w => w.replace(/ /g, '\\s+')).sort((a, b) => b.length - a.length).join('|')})(?:e?s)?)(?=$|[^\\p{L}\\p{N}])`, 'gu');   // plurals too
  function filter(text) {   // the folded copy finds the words, the original text keeps its accents and case elsewhere
    const f = fold(text); if (f.length !== text.length) return text.replace(/\S+/g, w => (BAD.includes(fold(w)) || BAD.includes(fold(w).replace(/e?s$/, ''))) ? '*'.repeat(w.length) : w);
    let out = text, m; BAD_RE.lastIndex = 0;
    while ((m = BAD_RE.exec(f))) { const s = m.index + m[1].length, e = s + m[2].length; out = out.slice(0, s) + out.slice(s, e).replace(/\S/g, '*') + out.slice(e); }
    return out;
  }

  // ---------- channels ----------
  const err = (code, error) => Object.assign(new Error(error), { code, error });
  const pch = (a, b) => `p:${Math.min(a, b)}:${Math.max(a, b)}`;
  const allyCh = uid => { const m = db.prepare('SELECT aid FROM ally_members WHERE user_id = ?').get(uid); return m ? 'a:' + m.aid : null; };
  const pub = m => ({ id: m.id, name: m.name, text: filter(m.text), at: m.at });   // filtered again when read: old messages follow the current list of words
  // which channel a player asks for: 'g', 'a' (his alliance) or 'p:<name>' (private with that player)
  function resolve(me, ch) {
    ch = String(ch || '');
    if (ch === 'g') return { ch: 'g' };
    if (ch === 'a') { const a = allyCh(me.id); if (!a) throw err(409, 'no_alliance'); return { ch: a }; }
    if (ch.startsWith('p:')) { const u = Q.userByName.get(ch.slice(2).trim()); if (!u) throw err(404, 'unknown_player'); if (u.id === me.id) throw err(400, 'bad_order'); return { ch: pch(me.id, u.id), to: u }; }
    throw err(400, 'bad_order');
  }
  const spam = new Map();   // user id -> {times:[], last:{text, at}}
  setInterval(() => { const now = Date.now(); for (const [k, v] of spam) if (now - (v.times[v.times.length - 1] || 0) > 120_000) spam.delete(k); }, 300_000).unref();

  function send(me, P) {
    const c = resolve(me, P.ch);
    let text = String(P.text || '').replace(/[\u0000-\u001f\u007f​-‏‪-‮⁦-⁩]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text) throw err(400, 'chat_empty');
    if (text.length > MAX_LEN) text = text.slice(0, MAX_LEN);
    const now = Date.now(), s = spam.get(me.id) || { times: [], last: null };
    s.times = s.times.filter(t => now - t < 60_000);
    if (s.times.length && now - s.times[s.times.length - 1] < GAP) throw err(429, 'chat_too_fast');
    if (s.times.length >= PER_MIN) throw err(429, 'chat_too_fast');
    if (s.last && s.last.text === text && now - s.last.at < 60_000) throw err(409, 'chat_repeat');
    s.times.push(now); s.last = { text, at: now }; spam.set(me.id, s);
    text = filter(text);
    const id = Number(M.add.run(c.ch, me.id, me.name, text, now).lastInsertRowid);
    if (!c.ch.startsWith('p:')) M.trim.run(c.ch, c.ch, KEEP);
    M.read.run(me.id, c.ch, id);
    const msg = { id, name: me.name, text, at: now };
    if (c.ch === 'g') broadcast('chat', { ch: 'g', msg });
    else if (c.ch.startsWith('a:')) for (const m of db.prepare('SELECT user_id FROM ally_members WHERE aid = ?').all(+c.ch.slice(2))) push(m.user_id, 'chat', { ch: 'a', msg });
    else { push(me.id, 'chat', { ch: 'p:' + c.to.name, msg }); if (!M.ignoredBy.get(c.to.id, me.id)) push(c.to.id, 'chat', { ch: 'p:' + me.name, msg }); }
    return { ok: true, msg };
  }
  // a channel: the latest messages (or the ones after an id), without the players this one ignores
  function read(me, ch, after) {
    const c = resolve(me, ch), ign = new Set(M.ignores.all(me.id).map(i => i.id));
    const rows = after ? M.after.all(c.ch, Math.floor(Number(after) || 0)) : M.last.all(c.ch, 60).reverse();
    const msgs = rows.filter(m => !ign.has(m.uid) || m.uid === me.id).map(pub);
    if (msgs.length) M.read.run(me.id, c.ch, msgs[msgs.length - 1].id);
    return { ch, msgs };
  }
  // what the game shows outside the chat: unread counts, the latest message of the general channel, the private conversations
  function summary(me) {
    const ign = M.ignores.all(me.id), ignIds = new Set(ign.map(i => i.id)), unread = ch => M.unread.get(ch, (M.readOf.get(me.id, ch) || { last: 0 }).last, me.id).n;
    const a = allyCh(me.id);
    const convs = M.convs.all(`p:${me.id}:%`, `p:%:${me.id}`).map(c => {
      const [, x, y] = c.ch.split(':').map(Number), other = x === me.id ? y : x, u = Q.user.get(other), m = M.byId.get(c.last);
      return u && !ignIds.has(other) ? { name: u.name, last: m ? pub(m) : null, unread: unread(c.ch) } : null; }).filter(Boolean);
    const g = M.last.all('g', 5).find(m => !ignIds.has(m.uid));
    return { last: g ? pub(g) : null, ally: !!a, unreadAlly: a ? unread(a) : 0, unreadPrivate: convs.reduce((s, c) => s + c.unread, 0), convs, ignored: ign.map(i => i.name), max: MAX_LEN };
  }
  function act(me, P) {
    const op = String(P.op || '');
    if (op === 'send') return send(me, P);
    if (op === 'read') { const c = resolve(me, P.ch); M.read.run(me.id, c.ch, Math.floor(Number(P.id) || 0)); return { ok: true }; }
    if (op === 'ignore' || op === 'unignore') {
      const u = Q.userByName.get(String(P.name || '').trim()); if (!u || u.id === me.id) throw err(404, 'unknown_player');
      (op === 'ignore' ? M.ignore : M.unignore).run(me.id, u.id); return { ok: true };
    }
    if (op === 'report') {
      const m = M.byId.get(Math.floor(Number(P.id) || 0)); if (!m) throw err(404, 'chat_gone');
      const where = m.ch === 'g' ? 'chat général' : m.ch.startsWith('a:') ? 'chat d\'alliance' : 'message privé';
      if (m.ch !== 'g' && !(m.ch === allyCh(me.id) || m.ch.split(':').slice(1).map(Number).includes(me.id))) throw err(403, 'bad_order');   // only a message he could see
      log('SIGNALEMENT', `${me.name} signale ${m.name} (${where}) : « ${String(m.text).slice(0, 300)} »`);
      return { ok: true };
    }
    throw err(400, 'bad_order');
  }
  return { act, read, summary, filter };
};
