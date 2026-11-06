'use strict';
// Mekanik War · the visits of the website (mekanikwar.com), for the management panel.
// No cookie, nothing stored on the visitor's device, no IP address kept: a visitor of the day is a hash of
// (address + browser + a random key of the day held in memory only), forgotten at midnight.
// Where they come from: the « src » (or « utm_source ») of the link (?src=tiktok), otherwise the site of origin (Referer).
// The beta sign-ups remember the source of their visitor (column « origin »), to see which video or post brings testers.
const crypto = require('crypto');

module.exports = function makeVisits({ db, log, DAY_FMT }) {
  db.exec(`CREATE TABLE IF NOT EXISTS site_visits (day TEXT NOT NULL, kind TEXT NOT NULL, k TEXT NOT NULL, n INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (day, kind, k));`);
  // kind: views (k = all) · uniq (k = all) · src (k = source, unique visitors) · page (k = page, views) · bpage (k = all: unique visitors of the beta page)
  const inc = db.prepare('INSERT INTO site_visits (day, kind, k, n) VALUES (?, ?, ?, 1) ON CONFLICT(day, kind, k) DO UPDATE SET n = n + 1');
  const day = t => DAY_FMT.format(new Date(t || Date.now()));
  let today = '', salt = null, oldSalt = null, seen = new Map(), seenBeta = new Set(), yesterday = new Map();   // hash -> source (today, and yesterday for the late sign-ups)
  function roll() {
    const d = day();
    if (d === today) return d;
    yesterday = seen; oldSalt = salt; today = d; salt = crypto.randomBytes(16); seen = new Map(); seenBeta = new Set();
    return d;
  }
  const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|whatsapp|telegram|skype|headless|python|curl|wget|lighthouse|monitor|uptime|feed|scan|java\/|okhttp|go-http/i;
  const hashOf = (ip, ua, key = salt) => crypto.createHash('sha256').update(key).update(String(ip)).update('|').update(String(ua || '')).digest('base64').slice(0, 16);
  // the source of a visit: the link's mark first, then the site it comes from
  const SITES = [[/(^|\.)tiktok\.com$/, 'tiktok'], [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'], [/(^|\.)google\./, 'google'], [/(^|\.)bing\.com$/, 'bing'],
    [/(^|\.)(duckduckgo\.com|qwant\.com|ecosia\.org|yahoo\.com|yandex\.)/, 'moteurs'], [/(^|\.)reddit\.com$/, 'reddit'], [/(^|\.)(discord\.com|discord\.gg|discordapp\.com)$/, 'discord'],
    [/(^|\.)(facebook\.com|fb\.com|messenger\.com)$/, 'facebook'], [/(^|\.)instagram\.com$/, 'instagram'], [/(^|\.)(t\.co|twitter\.com|x\.com)$/, 'x'],
    [/(^|\.)jeuxvideo\.com$/, 'jeuxvideo'], [/(^|\.)itch\.io$/, 'itch'], [/(^|\.)steamcommunity\.com$/, 'steam']];
  function sourceOf(query, referer, ownHost) {
    const q = new URLSearchParams(query || ''), s = String(q.get('src') || q.get('utm_source') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 20);
    if (s) return s;
    let h = ''; try { h = new URL(referer).hostname.toLowerCase(); } catch (e) {}
    if (!h || h === ownHost || /(^|\.)mekanikwar\.com$/.test(h)) return 'direct';
    for (const [re, k] of SITES) if (re.test(h)) return k;
    return h.replace(/^www\./, '').slice(0, 30);
  }
  // a page of the site was shown (status 200, HTML): counted once per page view, the visitor once a day
  function hit(req, ip, page) {
    try {
      const ua = req.headers['user-agent'] || '';
      if (req.method !== 'GET' || !ua || BOT.test(ua) || req.headers['purpose'] === 'prefetch' || req.headers['sec-purpose']) return;
      const d = roll(), h = hashOf(ip, ua), pg = String(page || '/').slice(0, 60);
      inc.run(d, 'views', 'all'); inc.run(d, 'page', pg);
      if (!seen.has(h)) {
        const q = (req.url || '').split('?')[1] || '';
        const s = sourceOf(q, req.headers.referer, String(req.headers.host || '').split(':')[0]);
        seen.set(h, s); inc.run(d, 'uniq', 'all'); inc.run(d, 'src', s);
      }
      if (/\/beta\/$/.test(pg) && !seenBeta.has(h)) { seenBeta.add(h); inc.run(d, 'bpage', 'all'); }
    } catch (e) { log('ERREUR', 'compteur de visites : ' + e.message); }
  }
  // the source of the visitor who signs up for the beta (same address and browser, today or yesterday)
  function originOf(ip, ua) {
    roll(); const h = hashOf(ip, ua);
    if (seen.has(h)) return seen.get(h);
    if (oldSalt) { const y = hashOf(ip, ua, oldSalt); if (yesterday.has(y)) return yesterday.get(y); }   // came yesterday, signs up after midnight
    return null;
  }
  // the panel: the last « n » days
  function report(n) {
    n = Math.max(1, Math.min(90, n | 0 || 30));
    const days = []; for (let i = n - 1; i >= 0; i--) days.push(day(Date.now() - i * 86400_000));
    const from = days[0];
    const rows = db.prepare('SELECT day, kind, k, n FROM site_visits WHERE day >= ?').all(from);
    const per = Object.fromEntries(days.map(d => [d, { day: d, uniq: 0, views: 0, beta: 0, signups: 0 }]));
    const src = new Map(), pages = new Map();
    for (const r of rows) {
      const p = per[r.day]; if (!p) continue;
      if (r.kind === 'uniq') p.uniq += r.n; else if (r.kind === 'views') p.views += r.n; else if (r.kind === 'bpage') p.beta += r.n;
      else if (r.kind === 'src') src.set(r.k, (src.get(r.k) || 0) + r.n); else if (r.kind === 'page') pages.set(r.k, (pages.get(r.k) || 0) + r.n);
    }
    const sign = new Map();
    let su = []; try { su = db.prepare("SELECT at, origin FROM beta_signups WHERE src = 'site' AND at >= ?").all(Date.now() - (n + 1) * 86400_000); } catch (e) {}
    for (const r of su) { const d = day(r.at); if (per[d]) { per[d].signups++; const o = r.origin || 'inconnue'; sign.set(o, (sign.get(o) || 0) + 1); } }
    const keys = new Set([...src.keys(), ...sign.keys()]);
    return {
      days: days.map(d => per[d]),
      sources: [...keys].map(k => ({ k, n: src.get(k) || 0, signups: sign.get(k) || 0 })).sort((a, b) => b.n - a.n || b.signups - a.signups),
      pages: [...pages].map(([k, v]) => ({ k, n: v })).sort((a, b) => b.n - a.n).slice(0, 12),
    };
  }
  return { hit, originOf, report };
};
