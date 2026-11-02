// Mekanik War · the website: phone menu, language choice and the wiki search (no other script on the site)
(function () {
  const nav = document.getElementById('nav'), bg = document.getElementById('burger');
  if (bg && nav) bg.addEventListener('click', () => { const o = nav.classList.toggle('open'); bg.setAttribute('aria-expanded', o ? 'true' : 'false'); });
  document.querySelectorAll('select.lang').forEach(s => s.addEventListener('change', () => {
    try { document.cookie = 'mwlang=' + s.value + ';path=/;max-age=31536000;samesite=lax'; } catch (e) {}
    location.href = (s.dataset.base || '') + '/' + s.value + (s.dataset.path || '/');
  }));
  // the beta is not launched yet: a play button shows a message instead of opening the game
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-soon]'); if (!a) return;
    e.preventDefault();
    let m = document.getElementById('soonbox'); if (m) m.remove();
    m = document.createElement('div'); m.id = 'soonbox';
    const box = document.createElement('div'); box.className = 'soonin';
    const p = document.createElement('p'); p.textContent = a.dataset.soon; box.appendChild(p);
    const row = document.createElement('div'); row.className = 'soonrow';
    if (!/\/beta\/?$/.test(location.pathname)) { const j = document.createElement('a'); j.className = 'btn'; j.href = a.getAttribute('href'); j.textContent = a.dataset.join; row.appendChild(j); }
    const ok = document.createElement('button'); ok.className = 'btn ghost'; ok.type = 'button'; ok.textContent = 'OK'; row.appendChild(ok); box.appendChild(row);
    m.appendChild(box); document.body.appendChild(m);
    m.addEventListener('click', ev => { if (ev.target === m || ev.target === ok) m.remove(); });
  });
  // the beta sign-up form
  const bf = document.getElementById('bform');
  if (bf) bf.addEventListener('submit', e => {
    e.preventDefault();
    const out = document.getElementById('bres'), btn = bf.querySelector('button'), ER = JSON.parse(bf.dataset.err || '{}');
    const say = (t, ok) => { out.textContent = t; out.className = 'bmsg ' + (ok ? 'ok' : 'bad'); out.hidden = false; };
    btn.disabled = true;
    fetch('/api/beta/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: bf.name.value.trim(), email: bf.email.value.trim(), lang: bf.dataset.lang }) })
      .then(r => r.json().then(j => ({ ok: r.ok, j })))
      .then(({ ok, j }) => { if (ok) { say(bf.dataset.ok, true); bf.querySelectorAll('input,button').forEach(x => { x.disabled = true; }); } else { say(ER[j.error] || ER.net); btn.disabled = false; } })
      .catch(() => { say(ER.net); btn.disabled = false; });
  });
  const q = document.getElementById('q'), box = document.getElementById('qres');
  if (!q || !box) return;
  let data = null, sel = -1;
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const load = () => data ? Promise.resolve(data) : fetch(q.dataset.src).then(r => r.json()).then(d => (data = d.map(x => [x[0], x[1], x[2], norm(x[0])])));
  const show = () => {
    const v = norm(q.value.trim()); sel = -1;
    if (v.length < 2) { box.hidden = true; return; }
    load().then(d => {
      const r = d.filter(x => x[3].includes(v)).sort((a, b) => a[3].indexOf(v) - b[3].indexOf(v)).slice(0, 12);
      box.textContent = '';
      if (!r.length) { const p = document.createElement('p'); p.textContent = q.dataset.none; box.appendChild(p); }
      for (const x of r) { const a = document.createElement('a'); a.href = x[1]; const i = document.createElement('img'); i.src = x[2]; i.alt = ''; a.appendChild(i); a.appendChild(document.createTextNode(x[0])); box.appendChild(a); }
      box.hidden = false;
    }).catch(() => {});
  };
  q.addEventListener('input', show);
  q.addEventListener('keydown', e => {
    const l = box.querySelectorAll('a'); if (!l.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + l.length) % l.length; l.forEach((a, i) => a.classList.toggle('sel', i === sel)); }
    else if (e.key === 'Enter') { e.preventDefault(); location.href = (l[sel] || l[0]).href; }
    else if (e.key === 'Escape') box.hidden = true;
  });
  document.addEventListener('click', e => { if (!e.target.closest('.search')) box.hidden = true; });
})();
