// Mekanik War · the public website (mekanikwar.com): home page, wiki, news, rankings, legal pages, in the 9 languages.
// Served by the game server itself. The wiki is built from the game rules (server/engine.js wikiData): always up to date.
// On the website's own address (mekanikwar.com, www.mekanikwar.com) every page is at its root: /fr/, /fr/wiki/units/tank ...
// On the game addresses, the same site can be seen under /site/ (to check it on the test server before going live).
const TXT = require('./site-text.js');
const LANGS = [['en', 'English'], ['fr', 'Français'], ['es', 'Español'], ['de', 'Deutsch'], ['it', 'Italiano'], ['pt', 'Português'], ['pl', 'Polski'], ['tr', 'Türkçe'], ['ru', 'Русский']];
const LANG_OK = new Set(LANGS.map(l => l[0]));
const SITE_HOSTS = new Set(['mekanikwar.com', 'www.mekanikwar.com']);
const CANON = 'https://mekanikwar.com';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
// the version of the style and the script: their own fingerprint, so a phone never keeps an old copy
const fileVer = f => { try { return crypto.createHash('sha1').update(fs.readFileSync(path.join(__dirname, '..', f))).digest('hex').slice(0, 10); } catch (e) { return String(Date.now()); } };
const CSS_V = fileVer('css/site.css'), JS_V = fileVer('js/site.js');

module.exports = function makeSite({ engine, stats, ranking, IS_TEST, log, beta }) {
  const DISCORD = process.env.DISCORD_URL || 'https://discord.gg/fHpxRftpuS';   // the game's Discord server (invitation that never expires)
  const dcBtn = (T, cls) => `<a class="btn ${cls || 'ghost'} dcb" href="${DISCORD}" target="_blank" rel="noopener"><img src="/assets/img/messages.webp" alt="" width="22" height="22">${esc(T.discord)}</a>`;
  const BETA_CR = +process.env.BETA_CREDITS || 1200;   // the testers' reward announced on the beta page (the same number is given from the panel)
  // beta mode on but not launched yet: the play buttons open a message (and the beta page) instead of the game; they work again as soon as the beta is launched
  // beta running with places left: the play buttons lead to the sign-up (the game refuses an address that is not on the list); on the beta page itself, to the game
  const playA = c => c.soon ? `href="${c.B}/${c.lang}/beta/" data-soon="${esc(c.T.soonMsg)}" data-join="${esc(c.T.join)}"`
    : c.signup && c.path !== '/beta/' ? `href="${c.B}/${c.lang}/beta/"` : `href="${PLAY}"`;
  const PLAY = (process.env.PLAY_URL || (IS_TEST ? 'https://test.mekanikwar.com' : 'https://games.mekanikwar.com')).replace(/\/+$/, '') + '/';
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const fill = (s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => o && k in o ? o[k] : m);
  const nf = (lang, n) => { try { return Number(n || 0).toLocaleString(lang); } catch (e) { return String(n); } };
  const img = p => '/' + String(p || '').replace(/^\/+/, '');
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const fmtT = s => { s = Math.round(s); const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60), x = s % 60;
    return d ? `${d}d ${h}h` : h ? `${h}h ${String(m).padStart(2, '0')}m` : m ? `${m}m ${String(x).padStart(2, '0')}s` : `${x}s`; };
  const best = req => { const ck = /(?:^|;\s*)mwlang=([a-z]{2})/.exec(String(req.headers.cookie || '')); if (ck && LANG_OK.has(ck[1])) return ck[1]; const a = String(req.headers['accept-language'] || '').toLowerCase().split(',').map(x => x.trim().slice(0, 2)); return a.find(l => LANG_OK.has(l)) || 'en'; };

  // ---------- the frame of every page ----------
  function page(c, title, desc, body, opt = {}) {
    const { T, lang, B, path } = c, on = opt.nav || '';
    const href = (l, p) => `${B}/${l}${p}`;
    const alt = LANGS.map(([l]) => `<link rel="alternate" hreflang="${l}" href="${CANON}/${l}${path}">`).join('');
    const nav = [['', 'home'], ['/wiki/', 'wiki'], ['/news/', 'news'], ['/rankings/', 'rankings'], ['/beta/', 'beta']].map(([p, k]) => `<a href="${href(lang, p)}"${on === k ? ' class="on"' : ''}>${esc(T[k])}</a>`).join('');
    const sel = `<select class="lang" aria-label="${esc(T.language)}" data-path="${esc(path)}" data-base="${esc(B)}">${LANGS.map(([l, n]) => `<option value="${l}"${l === lang ? ' selected' : ''}>${n}</option>`).join('')}</select>`;
    return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title><meta name="description" content="${esc(desc)}"><meta name="theme-color" content="#0d1012"><meta name="color-scheme" content="dark">
<link rel="icon" type="image/png" href="/assets/app/favicon.png?v=2"><link rel="apple-touch-icon" href="/assets/app/apple-touch-icon.png?v=2">
<link rel="canonical" href="${CANON}/${lang}${path}">${alt}<link rel="alternate" hreflang="x-default" href="${CANON}/en${path}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:image" content="${CANON}/assets/app/icon-512.png"><meta property="og:type" content="website">
<link rel="preload" href="/assets/fonts/black-ops-one-400-latin.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/css/site.css?v=${CSS_V}"><script src="/js/site.js?v=${JS_V}" defer></script></head><body>
<header class="top"><div class="wrap"><a class="brand" href="${href(lang, '/')}"><img src="/assets/app/icon-192.png?v=2" alt="" width="38" height="38">MEKANIK WAR</a>
<nav class="nav" id="nav">${nav}<span class="mlang">${sel}</span></nav><span class="dlang">${sel}</span><a class="btn sm" ${playA(c)}>${esc(T.play)}</a>
<button class="burger" id="burger" aria-label="${esc(T.menu)}" aria-controls="nav" aria-expanded="false"><i></i></button></div></header>
${body}
<footer><div class="wrap"><div>${c.D.legal.map(x => `<a href="${href(lang, '/legal/' + x.id)}">${esc(x.name)}</a>`).join('')}<a href="${DISCORD}" target="_blank" rel="noopener">Discord</a><a href="mailto:contact@mekanikwar.com">${esc(T.contact)}</a></div><div>© ${new Date().getFullYear()} Mekanik War: Titans · contact@mekanikwar.com</div></div></footer>
<div class="mobplay"><a class="btn" ${playA(c)}>${esc(T.playFree)}</a></div></body></html>`;
  }
  const crumb = (c, list) => `<div class="crumb">${list.map(([n, p]) => p ? `<a href="${c.B}/${c.lang}${p}">${esc(n)}</a>` : esc(n)).join(' › ')}</div>`;
  const autoNote = c => `<div class="auto"><img src="/assets/img/ui_ok.webp" alt="" width="22" height="22">${esc(fill(c.T.auto, { d: c.D.news[0] ? c.D.news[0].date : c.D.ver }))}</div>`;
  const costTable = (c, cost) => { const r = Object.entries(cost || {}).filter(([, v]) => v > 0);
    return `<div class="costs">${r.map(([k, v]) => `<span><img src="${img(c.D.res[k] ? c.D.res[k].img : '')}" alt="" title="${esc(cap(c.D.res[k] ? c.D.res[k].name : k))}"><i class="rn">${esc(cap(c.D.res[k] ? c.D.res[k].name : k))}</i><b>${nf(c.lang, v)}</b></span>`).join('')}</div>`; };

  // ---------- the wiki menu ----------
  const CATS = [['guide', 'cGuide', 'assets/img/quests.webp'], ['units', 'cUnits', 'assets/img/tank.webp'], ['buildings', 'cBlds', 'assets/img/command_3.webp'], ['titan', 'cTitan', 'assets/img/titan_1.webp'],
    ['research', 'cTech', 'assets/img/research.webp'], ['outposts', 'cOut', 'assets/img/outpost.webp'], ['map', 'cMap', 'assets/img/camp4.webp'], ['items', 'cItems', 'assets/img/item_crate_l.webp'], ['alliances', 'cAlly', 'assets/img/ally.webp']];
  function wikiFrame(c, cat, inner) {
    const a = (k, n, ic) => `<a href="${c.B}/${c.lang}/wiki/${k}/"${k === cat ? ' class="on"' : ''}><img src="${img(ic)}" alt="">${esc(n)}</a>`;
    const side = `<aside class="side"><b>${esc(c.T.sGuide)}</b>${a('guide', c.T.cGuide, CATS[0][2])}<b>${esc(c.T.sEncy)}</b>${CATS.slice(1, 8).map(([k, n, ic]) => a(k, c.T[n], ic)).join('')}<b>${esc(c.T.sCommunity)}</b>${a('alliances', c.T.cAlly, CATS[8][2])}</aside>`;
    const tabs = `<div class="mtabs"><a href="${c.B}/${c.lang}/wiki/"${cat ? '' : ' class="on"'}>${esc(c.T.wiki)}</a>${CATS.map(([k, n]) => `<a href="${c.B}/${c.lang}/wiki/${k}/"${k === cat ? ' class="on"' : ''}>${esc(c.T[n])}</a>`).join('')}</div>`;
    const search = `<div class="search"><input id="q" type="search" placeholder="${esc(c.T.search)}" autocomplete="off" data-src="${c.B}/${c.lang}/search.json" data-none="${esc(c.T.noResult)}"><div id="qres" class="qres" hidden></div></div>`;
    return `<div class="wrap wl">${side}<main>${tabs}${search}${inner}${autoNote(c)}</main></div>`;
  }
  const outNames = c => c.D.outposts.map(o => o.name).join(', ');

  // ---------- pages ----------
  function home(c) {
    const { T, D, lang } = c, s = stats();
    const card = (im, t, p) => `<div class="card"><img src="${img(im)}" alt="" loading="lazy"><h3>${esc(t)}</h3><p>${esc(p)}</p></div>`;
    const nMain = D.blds.filter(b => b.main).length;
    const bi = beta ? beta.publicInfo() : null;
    const bband = bi && bi.open ? `<a class="betaband" href="${c.B}/${lang}/beta/"><span><b>${esc(fill(bi.on && bi.started ? T.bandOn : T.band, { n: nf(lang, bi.places - bi.count) }))}</b></span><span class="btn sm">${esc(T.join)}</span></a>` : '';
    const body = `${bband}<div class="hero"><div class="wrap"><div>
  <h1>MEKANIK WAR<small>TITANS</small></h1><p class="lead">${esc(T.lead)}</p>
  <div class="cta"><a class="btn" ${playA(c)}>${esc(T.playFree)}</a><a class="btn ghost" href="${c.B}/${lang}/wiki/">${esc(T.discoverWiki)}</a></div>
  <div class="plat">${esc(T.plat)}</div>
  <div class="stats"><div><b>${nf(lang, s.players)}</b><span>${esc(T.commanders)}</span></div><div><b>${nf(lang, s.alliances)}</b><span>${esc(T.alliances)}</span></div><div><b>9</b><span>${esc(T.languages)}</span></div></div>
 </div><img class="titan" src="/assets/img/titan.webp" alt="Titan" width="640" height="603"></div></div>
<section><div class="wrap"><div class="sh"><div><h2>${esc(T.theGame)}</h2><p>${esc(T.theGameSub)}</p></div></div><div class="grid4">
 ${card('assets/img/command_3.webp', T.f1t, fill(T.f1, { n: nMain }))}${card('assets/img/tank.webp', T.f2t, fill(T.f2, { n: D.units.length }))}${card('assets/img/titan_1.webp', T.f3t, T.f3)}${card('assets/img/ally.webp', T.f4t, T.f4)}
</div></div></section>
<section class="pt0"><div class="wrap"><div class="sh"><div><h2>${esc(T.pictures)}</h2></div></div><div class="shots">
 <div class="shot" style="background-image:url(/assets/img/site_base.jpg)"><span>${esc(T.pic1)}</span></div><div class="shot" style="background-image:url(/assets/img/site_fields.jpg)"><span>${esc(T.picF)}</span></div><div class="shot" style="background-image:url(/assets/img/site_map.jpg)"><span>${esc(T.pic2)}</span></div><div class="shot" style="background-image:url(/assets/img/op_bg_wall3.jpg)"><span>${esc(T.pic3)}</span></div>
</div></div></section>
<section class="pt0"><div class="wrap"><div class="sh"><div><h2>${esc(T.news.toUpperCase())}</h2><p>${esc(T.newsSub)}</p></div><a href="${c.B}/${lang}/news/">${esc(T.seeAll)}</a></div><div class="news">
 ${D.news.slice(0, 3).map(n => `<div class="card"><time datetime="${n.d}">${esc(n.date)}</time><p>${esc(n.items[0] || '')}</p></div>`).join('')}
</div></div></section>
<div class="band"><div class="wrap"><div><h2>${esc(T.ready)}</h2><div class="mut">${esc(T.readySub)}</div></div><div class="bbtns">${dcBtn(T)}<a class="btn" ${playA(c)}>${esc(T.playNow)}</a></div></div></div>`;
    return page(c, 'Mekanik War: Titans', T.lead, body, { nav: 'home' });
  }
  function wikiIndex(c) {
    const { T, D } = c, n = { units: D.units.length, blds: D.blds.filter(b => b.main).length, br: D.br.length };
    const sub = { guide: T.cGuideS, units: fill(T.cUnitsS, { n: n.units }), buildings: fill(T.cBldsS, { n: n.blds, m: D.max }), titan: T.cTitanS, research: fill(T.cTechS, { n: n.br }),
      outposts: outNames(c), map: T.cMapS, items: T.cItemsS, alliances: T.cAllyS };
    const inner = `${crumb(c, [[T.home, '/'], [T.wiki]])}<h1 class="ph">${esc(T.wiki.toUpperCase())}</h1><div class="cats">${CATS.map(([k, nm, ic]) => `<a class="cat" href="${c.B}/${c.lang}/wiki/${k}/"><img src="${img(ic)}" alt="" loading="lazy"><div><h3>${esc(T[nm])}</h3><p>${esc(sub[k])}</p></div></a>`).join('')}</div>`;
    return page(c, `${T.wiki} · Mekanik War`, T.cUnitsS.replace('{n}', n.units), wikiFrame(c, '', inner), { nav: 'wiki' });
  }
  const tile = (c, href, im, name, sub) => `<a class="tile" href="${c.B}/${c.lang}${href}"><img src="${img(im)}" alt="" loading="lazy"><b>${esc(name)}</b>${sub ? `<span>${esc(sub)}</span>` : ''}</a>`;
  function units(c) {
    const { T, D } = c;
    const groups = {}; for (const u of D.units) (groups[u.bldName] = groups[u.bldName] || []).push(u);
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cUnits]])}<h1 class="ph">${esc(T.cUnits.toUpperCase())}</h1>${Object.entries(groups).map(([b, l]) => `<h2 class="gh">${esc(b)}</h2><div class="tiles">${l.map(u => tile(c, '/wiki/units/' + u.id, u.img, u.name, `${T.attack} ${nf(c.lang, u.at)} · ${T.health} ${nf(c.lang, u.hp)}`)).join('')}</div>`).join('')}`;
    return page(c, `${T.cUnits} · ${T.wiki} Mekanik War`, fill(T.cUnitsS, { n: D.units.length }), wikiFrame(c, 'units', inner), { nav: 'wiki' });
  }
  function unit(c, u) {
    const { T, D, lang } = c, name = id => (D.units.find(x => x.id === id) || {}).name || id;
    const kpi = (ic, v, l) => `<div class="kpi"><img src="/assets/img/${ic}.webp" alt=""><div><b>${nf(lang, v)}</b><span>${esc(l)}</span></div></div>`;
    const row = (ic, l, v) => `<tr><td><img src="${ic}" alt="">${esc(l)}</td><td>${v}</td></tr>`;
    const tags = [`<span class="tag">${esc(fill(T.trainedIn, { b: u.bldName, l: u.req }))}</span>`];
    if (u.strong.length) tags.push(`<span class="tag g">${esc(fill(T.strong, { l: u.strong.join(', ') }))}</span>`);
    if (u.weak.length) tags.push(`<span class="tag r">${esc(fill(T.weak, { l: u.weak.map(name).join(', ') }))}</span>`);
    const bld = D.blds.find(b => b.id === u.bld);
    const unlock = [`<a href="${c.B}/${lang}/wiki/buildings/${u.bld}"><img src="${img(bld && bld.img)}" alt="">${esc(fill(T.trainedIn, { b: u.bldName, l: u.req }))}</a>`, ...u.tech.map(t => `<a href="${c.B}/${lang}/wiki/research/#${t.id}"><img src="${img(t.img)}" alt="">${esc(t.name)} ${t.l}</a>`)].join('');
    const others = D.units.filter(x => x.id !== u.id && x.bld === u.bld).map(x => `<a href="${c.B}/${lang}/wiki/units/${x.id}"><img src="${img(x.img)}" alt="">${esc(x.name)}</a>`).join('');
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cUnits, '/wiki/units/'], [u.name]])}
<div class="uhead"><img src="${img(u.img)}" alt="${esc(u.name)}"><div><h1>${esc(u.name.toUpperCase())}</h1><div class="tags">${tags.join('')}</div><div class="mut">${esc(u.desc)}</div>${u.role ? `<div class="role">${esc(cap(u.role))}</div>` : ''}
<div class="kpis">${kpi('ui_atk', u.at, T.attack)}${kpi('ui_def', u.df, T.defense)}${kpi('ui_hp', u.hp, T.health)}${kpi('ui_spd', u.sp, T.speed)}</div></div></div>
<div class="two"><div><h2>${esc(T.costUnit)}</h2>${costTable(c, u.cost)}<p class="mut sm"><img class="ic" src="/assets/img/ui_time.webp" alt=""> ${esc(T.time)} : <b>${fmtT(u.time)}</b> ${esc(T.perUnit)} (${esc(T.beforeBonus)})</p></div>
<div><h2>${esc(T.stats)}</h2><table class="tbl">${row('/assets/img/ui_load.webp', T.load, nf(lang, u.ld))}${u.rg ? row('/assets/img/ui_rng.webp', T.range, nf(lang, u.rg)) : ''}${row('/assets/img/power.webp', T.power, nf(lang, u.power))}${row('/assets/img/pop.webp', T.population, nf(lang, u.pop))}</table></div></div>
<div class="two"><div><h2>${esc(T.unlock)}</h2><div class="mini">${unlock}</div></div><div><h2>${esc(T.others)}</h2><div class="mini">${others}</div></div></div>`;
    return page(c, `${u.name} · ${T.wiki} Mekanik War`, u.desc, wikiFrame(c, 'units', inner), { nav: 'wiki' });
  }
  function buildings(c) {
    const { T, D } = c;
    const main = D.blds.filter(b => b.main && !b.field), fields = D.blds.filter(b => b.main && b.field), op = D.blds.filter(b => b.op);
    const grid = l => `<div class="tiles">${l.map(b => tile(c, '/wiki/buildings/' + b.id, b.img, b.name, b.req ? fill(T.needCC, { l: b.req }) : '')).join('')}</div>`;
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cBlds]])}<h1 class="ph">${esc(T.cBlds.toUpperCase())}</h1>${grid(main)}<h2 class="gh">${esc(T.field)}</h2>${grid(fields)}<h2 class="gh">${esc(T.opOnly)}</h2>${grid(op)}`;
    return page(c, `${T.cBlds} · ${T.wiki} Mekanik War`, fill(T.cBldsS, { n: main.length + fields.length, m: D.max }), wikiFrame(c, 'buildings', inner), { nav: 'wiki' });
  }
  function building(c, b) {
    const { T, D, lang } = c;
    const tags = [b.unique ? T.unique : '', b.field ? T.field : '', b.op ? T.opOnly : '', b.req ? fill(T.needCC, { l: b.req }) : '', fill(T.maxLvl, { l: D.max })].filter(Boolean).map(t => `<span class="tag">${esc(t)}</span>`).join('');
    const res = Object.keys(b.levels[0].cost).filter(r => b.levels.some(l => l.cost[r] > 0));
    const table = `<div class="tscroll"><table class="tbl lv"><tr><th>${esc(T.level)}</th>${res.map(r => `<th><img src="${img(D.res[r].img)}" alt="" title="${esc(D.res[r].name)}"></th>`).join('')}<th>${esc(T.time)}</th></tr>${b.levels.map(l => `<tr><td><b>${l.l}</b></td>${res.map(r => `<td>${nf(lang, l.cost[r])}</td>`).join('')}<td>${fmtT(l.time)}</td></tr>`).join('')}</table></div><p class="mut sm">${esc(T.buildTime)} (${esc(T.beforeBonus)})</p>`;
    const trains = D.units.filter(u => u.bld === b.id && b.main);
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cBlds, '/wiki/buildings/'], [b.name]])}
<div class="uhead"><img src="${img(b.img)}" alt="${esc(b.name)}"><div><h1>${esc(b.name.toUpperCase())}</h1><div class="tags">${tags}</div><div class="mut">${esc(b.desc)}</div></div></div>
${trains.length ? `<h2 class="gh">${esc(T.cUnits)}</h2><div class="mini">${trains.map(u => `<a href="${c.B}/${lang}/wiki/units/${u.id}"><img src="${img(u.img)}" alt="">${esc(u.name)} · ${esc(T.level)} ${u.req}</a>`).join('')}</div>` : ''}
<h2 class="gh">${esc(T.levels)}</h2>${table}`;
    return page(c, `${b.name} · ${T.wiki} Mekanik War`, b.desc, wikiFrame(c, 'buildings', inner), { nav: 'wiki' });
  }
  function research(c) {
    const { T, D, lang } = c;
    const one = t => `<div class="tech" id="${t.id}"><img src="${img(t.img)}" alt=""><div><h3>${esc(t.name)}</h3><div class="eff">${esc(t.eff)}</div>
<div class="tags">${t.max > 1 ? `<span class="tag">${esc(fill(T.maxLvl, { l: t.max }))}</span>` : ''}<span class="tag">${esc(fill(T.labLvl, { l: t.lab }))}</span>${t.req.map(r => `<span class="tag">${esc(T.requires)} : ${esc(r.name)} ${r.l}</span>`).join('')}${t.plans ? `<span class="tag g">${esc(fill(T.plansNeeded, { p: t.plans }))}</span>` : ''}</div>
<div class="mut sm">${esc(t.max > 1 ? T.firstLvl : T.cost)}</div>${costTable(c, t.cost)}</div></div>`;
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cTech]])}<h1 class="ph">${esc(T.cTech.toUpperCase())}</h1>${D.br.map(b => `<h2 class="gh">${esc(b.name)}</h2><div class="techs">${D.techs.filter(t => t.br === b.id).map(one).join('')}</div>`).join('')}`;
    return page(c, `${T.cTech} · ${T.wiki} Mekanik War`, fill(T.cTechS, { n: D.br.length }), wikiFrame(c, 'research', inner), { nav: 'wiki' });
  }
  function titan(c) {
    const { T, D } = c;
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cTitan]])}<h1 class="ph">${esc(T.cTitan.toUpperCase())}</h1><p class="intro">${esc(T.titanText)}</p>
<h2 class="gh">${esc(T.stages)}</h2><p class="mut">${esc(T.titanStages)}</p><div class="stages">${D.titan.stages.map((s, i) => `<div class="card c"><img src="${img(s)}" alt=""><h3>${esc(T.stageNames[i])}</h3></div>`).join('')}</div>
<h2 class="gh">${esc(T.parts)}</h2><div class="tiles">${D.titan.parts.map(p => `<div class="tile"><img src="${img(p.img)}" alt=""><b>${esc(p.name)}</b></div>`).join('')}</div>
<div class="mini mt"><a href="${c.B}/${c.lang}/wiki/buildings/hangar"><img src="/assets/img/titan_1.webp" alt="">${esc(D.titan.hangar)}</a><a href="${c.B}/${c.lang}/wiki/outposts/"><img src="/assets/img/outpost.webp" alt="">${esc(T.cOut)}</a></div>`;
    return page(c, `${T.cTitan} · ${T.wiki} Mekanik War`, T.titanText, wikiFrame(c, 'titan', inner), { nav: 'wiki' });
  }
  function outposts(c) {
    const { T, D, lang } = c;
    const special = { rempart: 'mastodon', brasier: 'flamer' };
    const one = o => { const u = D.units.find(x => x.id === special[o.id]), r = D.res[o.res];
      return `<div class="opcard"><div class="ophead"><img src="${img(o.img)}" alt=""><div><h2>${esc(o.name)}</h2><p class="mut">${esc(o.eff)}</p></div></div>
<div class="mini"><span class="pill"><img src="${img(r.img)}" alt="">${esc(T.rareRes)} : ${esc(cap(r.name))}</span><span class="pill"><img src="${img(o.titanImg)}" alt="">${esc(o.titan)}</span>${u ? `<a href="${c.B}/${lang}/wiki/units/${u.id}"><img src="${img(u.img)}" alt="">${esc(u.name)}</a>` : ''}</div>
<h3>${esc(T.foundIt)}</h3><div class="tags"><span class="tag g">${esc(fill(T.plansNeeded, { p: o.plans }))}</span><span class="tag">${esc(fill(T.labLvl, { l: o.lab }))}</span></div></div>`; };
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cOut]])}<h1 class="ph">${esc(T.cOut.toUpperCase())}</h1><p class="intro">${esc(T.outText)}</p>${D.outposts.map(one).join('')}`;
    return page(c, `${T.cOut} · ${T.wiki} Mekanik War`, T.outText, wikiFrame(c, 'outposts', inner), { nav: 'wiki' });
  }
  function map(c) {
    const { T, D } = c;
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cMap]])}<h1 class="ph">${esc(T.cMap.toUpperCase())}</h1><p class="intro">${esc(T.mapText)}</p>
<div class="tiles">${D.targets.map(t => `<div class="tile"><img src="${img(t.img)}" alt=""><b>${esc(t.name)}</b><span>${esc(T.levels110)}</span></div>`).join('')}</div>
<h2 class="gh">${esc(D.forts.join(' · '))}</h2><p class="mut">${esc(T.fortText)}</p><div class="tiles">${D.forts.map((f, i) => `<div class="tile"><img src="${img(D.fortImg[i])}" alt=""><b>${esc(f)}</b></div>`).join('')}</div>`;
    return page(c, `${T.cMap} · ${T.wiki} Mekanik War`, T.mapText, wikiFrame(c, 'map', inner), { nav: 'wiki' });
  }
  function items(c) {
    const { T, D } = c;
    const G = [['grpRes', i => i.kind === 'crate'], ['grpSpeed', i => ['speed', 'march', 'train'].includes(i.kind)], ['grpBoost', i => i.kind === 'boost'], ['grpChest', i => i.kind === 'chest'], ['grpOther', () => true]];
    const seen = new Set(), parts = G.map(([k, f]) => { const l = D.items.filter(i => !seen.has(i.id) && f(i)); l.forEach(i => seen.add(i.id)); return [k, l]; }).filter(([, l]) => l.length);
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cItems]])}<h1 class="ph">${esc(T.cItems.toUpperCase())}</h1>${parts.map(([k, l]) => `<h2 class="gh">${esc(T[k])}</h2><div class="items">${l.map(i => `<div class="item" id="${i.id}"><img src="${img(i.img)}" alt="" loading="lazy"><div><b>${esc(i.name)}</b><span>${esc(i.desc)}</span>${i.chances || ''}</div></div>`).join('')}</div>`).join('')}`;
    return page(c, `${T.cItems} · ${T.wiki} Mekanik War`, T.cItemsS, wikiFrame(c, 'items', inner), { nav: 'wiki' });
  }
  function alliances(c) {
    const { T } = c;
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cAlly]])}<h1 class="ph">${esc(T.cAlly.toUpperCase())}</h1><p class="intro">${esc(T.allyText)}</p>
<div class="two"><div class="card"><img src="/assets/img/power.webp" alt=""><h3>${esc(T.tourT)}</h3><p>${esc(T.tourText)}</p></div><div class="card"><img src="/assets/img/ally.webp" alt=""><h3>${esc(T.chalT)}</h3><p>${esc(T.chalText)}</p></div></div>
<div class="mini mt"><a href="${c.B}/${c.lang}/rankings/"><img src="/assets/img/ui_crown.webp" alt="">${esc(T.rankings)}</a></div>`;
    return page(c, `${T.cAlly} · ${T.wiki} Mekanik War`, T.allyText, wikiFrame(c, 'alliances', inner), { nav: 'wiki' });
  }
  function guide(c) {
    const { T } = c, ic = ['quests', 'command', 'mine', 'barracks', 'research', 'ally', 'defense'];
    const inner = `${crumb(c, [[T.wiki, '/wiki/'], [T.cGuide]])}<h1 class="ph">${esc(T.cGuide.toUpperCase())}</h1><p class="intro">${esc(T.guideIntro)}</p>
<ol class="steps">${[1, 2, 3, 4, 5, 6, 7].map((n, i) => `<li><img src="/assets/img/${ic[i]}.webp" alt=""><div><h3>${esc(T['g' + n + 't'])}</h3><p>${esc(T['g' + n])}</p></div></li>`).join('')}</ol>
<div class="band in"><div><h2>${esc(T.ready)}</h2><div class="mut">${esc(T.readySub)}</div></div><a class="btn" ${playA(c)}>${esc(T.playNow)}</a></div>`;
    return page(c, `${T.cGuide} · Mekanik War`, T.guideIntro, wikiFrame(c, 'guide', inner), { nav: 'wiki' });
  }
  function news(c) {
    const { T, D } = c;
    const body = `<div class="wrap narrow">${crumb(c, [[T.home, '/'], [T.news]])}<h1 class="ph">${esc(T.news.toUpperCase())}</h1>${D.news.map(n => `<article class="card nitem"><time datetime="${n.d}">${esc(fill(T.updateOf, { d: n.date }))}</time><ul>${n.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></article>`).join('')}</div>`;
    return page(c, `${T.news} · Mekanik War`, T.newsSub, body, { nav: 'news' });
  }
  function rankings(c) {
    const { T, lang } = c, top = 50, p = ranking('power'), a = ranking('ally');
    const tp = `<table class="tbl rk"><tr><th>#</th><th>${esc(T.rkPlayer)}</th><th>${esc(T.rkAlly)}</th><th>${esc(T.power)}</th></tr>${(p.top || []).slice(0, top).map(x => `<tr><td><b>${x.r}</b></td><td>${esc(x.name)}</td><td class="mut">${esc(x.alliance || '')}</td><td>${nf(lang, x.power)}</td></tr>`).join('') || `<tr><td colspan="4" class="mut">${esc(T.rkEmpty)}</td></tr>`}</table>`;
    const ta = `<table class="tbl rk"><tr><th>#</th><th>${esc(T.rkAlly)}</th><th>${esc(T.rkMembers)}</th><th>${esc(T.power)}</th></tr>${(a.top || []).slice(0, top).map(x => `<tr><td><b>${x.r}</b></td><td>${esc(x.name)}</td><td>${nf(lang, x.members)}</td><td>${nf(lang, x.power)}</td></tr>`).join('') || `<tr><td colspan="4" class="mut">${esc(T.rkEmpty)}</td></tr>`}</table>`;
    const body = `<div class="wrap">${crumb(c, [[T.home, '/'], [T.rankings]])}<h1 class="ph">${esc(T.rankings.toUpperCase())}</h1><div class="two"><div><h2>${esc(T.rkPlayers)} · ${esc(fill(T.rkTop, { n: top }))}</h2><div class="tscroll">${tp}</div></div><div><h2>${esc(T.rkAlliances)} · ${esc(fill(T.rkTop, { n: top }))}</h2><div class="tscroll">${ta}</div></div></div></div>`;
    return page(c, `${T.rankings} · Mekanik War`, T.rankings, body, { nav: 'rankings' });
  }
  function legal(c, x) {
    const { T, D } = c;
    const body = `<div class="wrap narrow">${crumb(c, [[T.home, '/'], [T.legal]])}<div class="mtabs on">${D.legal.map(l => `<a href="${c.B}/${c.lang}/legal/${l.id}"${l.id === x.id ? ' class="on"' : ''}>${esc(l.name)}</a>`).join('')}</div><h1 class="ph">${esc(x.name.toUpperCase())}</h1><div class="legal card">${x.html}</div></div>`;
    return page(c, `${x.name} · Mekanik War`, x.name, body);
  }
  // the beta test: places, sign-up form (sent by js/site.js to /api/beta/signup), how it works, the testers
  function betaPage(c) {
    const { T, lang } = c, bi = beta ? beta.publicInfo() : { open: false, full: false, count: 0, places: 50, msg: '', testers: [] };
    const pct = Math.min(100, Math.round(bi.count / Math.max(1, bi.places) * 100)), left = Math.max(0, bi.places - bi.count);
    const err = { bad_name: T.eName, bad_email: T.eEmail, email_taken: T.eTaken, name_taken: T.eNameTaken, full: T.eFull, closed: T.closed, too_many: T.eMany, net: T.eNet };
    const run = bi.on && bi.started;   // the beta is running: sign up = the game link by e-mail at once
    const form = bi.open ? `<form class="bform" id="bform" data-lang="${lang}" data-ok="${esc(run ? T.fOkOn : T.fOk)}" data-err='${esc(JSON.stringify(err))}' novalidate>
  <label>${esc(T.fName)}<input name="name" maxlength="16" autocomplete="nickname" required></label>
  <label>${esc(T.fEmail)}<input name="email" type="email" maxlength="120" autocomplete="email" required></label>
  <button class="btn" type="submit">${esc(T.fSend)}</button><p class="mut sm">${esc(T.fNote)}</p><p class="bmsg" id="bres" hidden></p></form>`
      : `<div class="card bclosed"><p>${esc(T.closed)}</p></div>`;
    const steps = [T.h1, run ? T.h2On : T.h2, T.h3, T.h4].map((t, i) => `<li><b>${i + 1}</b><p>${esc(t)}</p></li>`).join('');
    const body = `<div class="wrap narrow">${crumb(c, [[T.home, '/'], [T.beta]])}<h1 class="ph">${esc(run ? T.betaHOn : T.betaH)}</h1>
${run && bi.open ? `<div class="bopen">${esc(T.openNow)}</div>` : ''}
<div class="bhead"><img src="/assets/img/titan_1.webp" alt="" width="120" height="120"><p class="intro">${esc(fill(T.betaIntro, { m: nf(lang, bi.places), cr: nf(lang, BETA_CR) }))}</p></div>
<div class="bcount"><div><b>${nf(lang, bi.count)} / ${nf(lang, bi.places)}</b> <span class="mut">${esc(T.places)}</span></div><div class="bar"><i style="width:${pct}%"></i></div>${bi.open ? `<div class="mut sm">${esc(fill(T.left, { n: nf(lang, left) }))}</div>` : ''}</div>
${bi.msg ? `<div class="auto">${esc(bi.msg)}</div>` : ''}
<div class="dcrow"><p class="mut">${esc(T.discordSub)}</p>${dcBtn(T)}</div>
${form}
<h2 class="gh">${esc(T.how)}</h2><ol class="bsteps">${steps}</ol>
${bi.testers.length ? `<h2 class="gh">${esc(T.thanks)}</h2><p class="mut">${esc(T.thanksSub)}</p><div class="btesters">${bi.testers.map(n => `<span>${esc(n)}</span>`).join('')}</div>` : ''}</div>`;
    return page(c, `${T.beta} · Mekanik War`, fill(T.betaIntro, { m: bi.places, cr: BETA_CR }), body, { nav: 'beta' });
  }
  function notFound(c) {
    return page(c, `${c.T.notFound} · Mekanik War`, c.T.notFound, `<div class="wrap narrow nf"><h1 class="ph">404</h1><p>${esc(c.T.notFound)}</p><a class="btn" href="${c.B}/${c.lang}/">${esc(c.T.back)}</a></div>`);
  }
  function searchIndex(c) {
    const { D, B, lang } = c, u = p => `${B}/${lang}${p}`;
    return JSON.stringify([...D.units.map(x => [x.name, u('/wiki/units/' + x.id), img(x.img)]), ...D.blds.map(x => [x.name, u('/wiki/buildings/' + x.id), img(x.img)]),
      ...D.techs.map(x => [x.name, u('/wiki/research/#' + x.id), img(x.img)]), ...D.items.map(x => [x.name, u('/wiki/items/#' + x.id), img(x.img)]),
      ...D.outposts.map(x => [x.name, u('/wiki/outposts/'), img(x.img)]), ...D.targets.map(x => [x.name, u('/wiki/map/'), img(x.img)])]);
  }

  // ---------- routing ----------
  const cache = new Map();   // rendered pages: kept 2 minutes (the wiki only changes when the game is updated, i.e. at a restart)
  function render(lang, rest, B) {
    const T = TXT[lang], D = engine.wikiData(lang), bi = beta ? beta.publicInfo() : null, c = { T, D, lang, B, path: rest, soon: !!(bi && bi.on && !bi.started), signup: !!(bi && bi.on && bi.started && bi.open) };
    const m = rest.match(/^\/wiki\/(units|buildings)\/([a-z0-9_]+)$/);
    if (rest === '/' ) return [200, home(c)];
    if (rest === '/wiki/') return [200, wikiIndex(c)];
    if (rest === '/wiki/units/') return [200, units(c)];
    if (rest === '/wiki/buildings/') return [200, buildings(c)];
    if (m && m[1] === 'units') { const u = D.units.find(x => x.id === m[2]); if (u) return [200, unit(c, u)]; }
    if (m && m[1] === 'buildings') { const b = D.blds.find(x => x.id === m[2]); if (b) return [200, building(c, b)]; }
    const P = { '/beta/': betaPage, '/wiki/research/': research, '/wiki/titan/': titan, '/wiki/outposts/': outposts, '/wiki/map/': map, '/wiki/items/': items, '/wiki/alliances/': alliances, '/wiki/guide/': guide, '/news/': news, '/rankings/': rankings };
    if (P[rest]) return [200, P[rest](c)];
    const lg = rest.match(/^\/legal\/([a-z]+)$/); if (lg) { const x = D.legal.find(l => l.id === lg[1]); if (x) return [200, legal(c, x)]; }
    if (rest === '/search.json') return [200, searchIndex(c), 'application/json; charset=utf-8'];
    return [404, notFound(c)];
  }
  const isSiteHost = host => SITE_HOSTS.has(String(host || '').toLowerCase().split(':')[0]);
  // returns true when the request was a page of the website (false: let the game server serve it, e.g. /assets/...)
  function handle(req, res, url, host, SEC) {
    const onSite = isSiteHost(host), B = onSite ? '' : '/site';
    let rest = onSite ? url : url.replace(/^\/site(?=\/|$)/, '');
    if (!onSite && rest === url) return false;
    if (onSite && /^\/(assets|css|js)\//.test(url)) return false;   // pictures, fonts, styles: the normal files of the game
    if (onSite && url === '/robots.txt') { res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end(`User-agent: *\nAllow: /\nSitemap: ${CANON}/sitemap.xml\n`); return true; }
    if (onSite && url === '/sitemap.xml') { res.writeHead(200, { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' }); res.end(sitemap()); return true; }
    if (rest === '' || rest === '/') { res.writeHead(302, { Location: `${B}/${best(req)}/`, 'Cache-Control': 'no-cache', Vary: 'Accept-Language' }); res.end(); return true; }
    const lm = rest.match(/^\/([a-z]{2})(\/.*)?$/);
    if (!lm || !LANG_OK.has(lm[1])) { if (!onSite || /\.[a-z0-9]+$/i.test(rest)) return false; res.writeHead(302, { Location: `${B}/${best(req)}${rest.startsWith('/') ? rest : '/'}` }); res.end(); return true; }
    let p = lm[2] || '/';
    const leaf = /^\/(wiki\/(units|buildings)\/[a-z0-9_]+|legal\/[a-z]+|search\.json)\/?$/.test(p);
    if (leaf && p.endsWith('/')) p = p.slice(0, -1); else if (!leaf && !p.endsWith('/')) p += '/';
    if ((lm[2] || '/') !== p) { res.writeHead(301, { Location: `${B}/${lm[1]}${p}` }); res.end(); return true; }
    const bs = beta ? beta.publicInfo() : null, key = `${B}|${lm[1]}|${p}|${bs && bs.on ? (!bs.started ? 'soon' : bs.open ? 'signup' : '') : ''}`, live = p === '/beta/' || p === '/';   // the beta page shows the places left: kept 5 seconds only
    let e = cache.get(key);
    if (!e || Date.now() - e.at > (live ? 5_000 : 120_000)) {
      try { const [code, html, type] = render(lm[1], p, B); e = { at: Date.now(), code, html, type: type || 'text/html; charset=utf-8' }; }
      catch (err) { log('ERREUR', `site ${p} · ${err.message}`); res.writeHead(500, { 'Content-Type': 'text/plain' }); res.end('Error'); return true; }
      if (cache.size > 2000) cache.clear(); cache.set(key, e);
    }
    const h = { ...SEC, 'Content-Type': e.type, 'Cache-Control': live ? 'no-cache' : 'public, max-age=120' };
    if (!onSite) h['X-Robots-Tag'] = 'noindex';   // the preview on the game addresses is never indexed
    res.writeHead(e.code, h); res.end(req.method === 'HEAD' ? undefined : e.html); return true;
  }
  function sitemap() {
    const D = engine.wikiData('en'), paths = ['/', '/beta/', '/wiki/', '/wiki/units/', '/wiki/buildings/', '/wiki/research/', '/wiki/titan/', '/wiki/outposts/', '/wiki/map/', '/wiki/items/', '/wiki/alliances/', '/wiki/guide/', '/news/', '/rankings/',
      ...D.units.map(u => '/wiki/units/' + u.id), ...D.blds.map(b => '/wiki/buildings/' + b.id)];
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.flatMap(p => LANGS.map(([l]) => `<url><loc>${CANON}/${l}${p}</loc></url>`)).join('')}</urlset>`;
  }
  return { handle, isSiteHost, PLAY };
};
