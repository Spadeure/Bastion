// Bastion · payments of the shop (War Credits, starter pack, Command Pass).
// The browser only asks to buy: the price comes from the game rules (engine.shop()), and what is bought is given
// only once the payment is confirmed by Stripe (signed message to /api/pay/webhook). Every payment is recorded.
// Without a Stripe key: the test server simulates the payments (nobody is charged), the official server keeps them closed.
const crypto = require('crypto');
module.exports = function makePay({ db, engine, log, send, push, runFor, Q, IS_TEST }) {
  db.exec(`CREATE TABLE IF NOT EXISTS payments (id TEXT PRIMARY KEY, user_id INTEGER NOT NULL, prod TEXT NOT NULL, cents INTEGER NOT NULL, status TEXT NOT NULL, mode TEXT NOT NULL, created INTEGER NOT NULL, done INTEGER)`);
  for (const [c, t] of [['cgv', 'TEXT'], ['pi', 'TEXT'], ['cr', 'INTEGER']]) if (!db.prepare("SELECT 1 FROM pragma_table_info('payments') WHERE name = ?").get(c)) db.exec(`ALTER TABLE payments ADD COLUMN ${c} ${t}`);
  // cgv: version of the terms of sale accepted (with the waiver of the right of withdrawal) · pi: Stripe payment id · cr: War Credits given
  const P = {
    add: db.prepare('INSERT INTO payments (id, user_id, prod, cents, status, mode, created, cgv) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'),
    pending: db.prepare("SELECT 1 FROM payments WHERE user_id = ? AND prod = ? AND status = 'pending' AND created > ?"),
    setPi: db.prepare('UPDATE payments SET pi = ? WHERE id = ?'),
    setCr: db.prepare('UPDATE payments SET cr = ? WHERE id = ?'),
    byPi: db.prepare('SELECT * FROM payments WHERE pi = ?'),
    status: db.prepare('UPDATE payments SET status = ? WHERE id = ?'),
    get: db.prepare('SELECT * FROM payments WHERE id = ?'),
    done: db.prepare("UPDATE payments SET status = 'done', done = ? WHERE id = ? AND status = 'pending'"),
    fail: db.prepare("UPDATE payments SET status = ? WHERE id = ? AND status = 'pending'"),
    list: db.prepare('SELECT p.*, u.name FROM payments p LEFT JOIN users u ON u.id = p.user_id ORDER BY created DESC LIMIT ?'),
  };
  const KEY = process.env.STRIPE_SECRET_KEY || '', HOOK = process.env.STRIPE_WEBHOOK_SECRET || '';
  const MODE = KEY && HOOK ? 'stripe' : IS_TEST ? 'sim' : 'off';
  const live = /^sk_live_/.test(KEY);
  if (MODE === 'stripe') log('PAIEMENT', `Stripe branché (${live ? 'paiements RÉELS' : 'mode test, fausses cartes'})`);
  const names = () => { const s = engine.shop(), o = {}; for (const p of s.packs) o[p.id] = `${p.cr} Crédits de guerre`; o[s.starter.id] = 'Pack de départ'; o[s.pass.id] = `Pass de commandement (${s.pass.days} jours)`; for (const p of s.prog) o[p.id] = `Pack Centre niveau ${p.lvl}`; for (const p of s.weekly) o[p.id] = `Pack de la semaine (${p.id.slice(5)})`; return o; };
  const cents = prod => { const p = engine.shop().products[prod]; return p ? Math.round(p.eur * 100) : 0; };
  // gives what was bought (once): the game engine runs the order 'payGrant' for this player
  function grant(id) {
    const row = P.get.get(id); if (!row || row.status !== 'pending') return false;
    const u = Q.user.get(row.user_id), b = Q.base.get(row.user_id); if (!u || !b) { P.fail.run('no_player', id); return false; }
    let before = 0; try { before = Math.floor(+(JSON.parse(b.state || '{}').credits) || 0); } catch (e) {}
    const r = runFor({ ...u, role: 'server' }, b, 'payGrant', [row.prod], 'fr', true);
    if (r.error) { P.fail.run('refused:' + String(r.error).slice(0, 40), id); log('PAIEMENT', `${u.name} · ${row.prod} · REFUSÉ par le jeu (${r.error}) · ${id} : à rembourser`); return false; }
    P.done.run(Date.now(), id); P.setCr.run(Math.max(0, Math.floor(+r.state.credits || 0) - before), id); push(row.user_id, 'sync', {});
    log('ACHAT', `${u.name} · ${names()[row.prod] || row.prod} · ${(row.cents / 100).toFixed(2)} € · ${row.mode === 'sim' ? 'SIMULÉ (serveur de test)' : 'Stripe ' + id}`);
    return r;
  }
  // a payment refunded (by you from Stripe) or disputed (the player asked his bank): what it gave is taken back
  function revoke(row, why) {
    if (!row) return;
    if (row.status !== 'done') { P.status.run(why, row.id); return; }
    const u = Q.user.get(row.user_id), b = Q.base.get(row.user_id); P.status.run(why, row.id);
    if (!u || !b) return;
    const r = runFor({ ...u, role: 'server' }, b, 'payRevoke', [row.prod, row.cr || 0, row.cents], 'fr', true);
    push(row.user_id, 'sync', {});
    log(why === 'disputed' ? 'LITIGE' : 'REMBOURSEMENT', `${u.name} · ${names()[row.prod] || row.prod} · ${(row.cents / 100).toFixed(2)} € · ${row.cr || 0} Crédits et le contenu du pack repris${r.error ? ' (' + r.error + ')' : ''}${(r.state.credits || 0) < 0 ? ' · Crédits déjà dépensés : solde négatif ' + r.state.credits : ''}`);
  }
  const ONCE = prod => prod === 'starter' || /^(prog|week)_/.test(prod);   // packs bought only once: never two payments open at the same time
  async function stripe(path, form) {
    const r = await fetch('https://api.stripe.com/v1/' + path, { method: 'POST', headers: { Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(form).toString() });
    const j = await r.json(); if (!r.ok) throw new Error((j.error && j.error.message) || 'stripe ' + r.status); return j;
  }
  // POST /api/pay/start {p}: opens a payment (or simulates it on the test server)
  async function start(req, res, me, P0, origin) {
    const prod = String(P0.p || ''), c = cents(prod), CGV = engine.shop().cgv;
    if (!c) return send(res, 400, { error: 'bad_order' });
    if (P0.cgv !== CGV) return send(res, 400, { error: 'cgv_required' });   // the terms of sale (and the waiver of the right of withdrawal) are ticked first
    if (MODE === 'off') return send(res, 503, { error: 'pay_closed' });
    const b = Q.base.get(me.id); if (!b) return send(res, 404, { error: 'unknown_player' });
    { const chk = runFor({ ...me, role: 'server' }, b, 'payCheck', [prod], 'fr'); if (chk.error) return send(res, 409, { error: chk.error }); }   // unlocked, not bought yet, pack of this week
    if (ONCE(prod) && P.pending.get(me.id, prod, Date.now() - 35 * 60_000)) return send(res, 409, { error: 'pay_pending' });
    if (MODE === 'sim') {
      const id = 'sim_' + crypto.randomBytes(9).toString('hex'); P.add.run(id, me.id, prod, c, 'pending', 'sim', Date.now(), CGV);
      const r = grant(id); if (!r) return send(res, 409, { error: 'bad_order' });
      return send(res, 200, { state: r.state, events: r.events, serverTime: Date.now() });
    }
    try {
      const s = await stripe('checkout/sessions', {
        mode: 'payment', 'line_items[0][quantity]': '1', 'line_items[0][price_data][currency]': 'eur',
        'line_items[0][price_data][unit_amount]': String(c), 'line_items[0][price_data][product_data][name]': 'Bastion · ' + (names()[prod] || prod),
        client_reference_id: String(me.id), 'metadata[uid]': String(me.id), 'metadata[prod]': prod,
        success_url: origin + '/?pay=ok', cancel_url: origin + '/?pay=cancel', expires_at: String(Math.floor(Date.now() / 1000) + 31 * 60) });
      P.add.run(s.id, me.id, prod, c, 'pending', live ? 'live' : 'test', Date.now(), CGV);
      log('PAIEMENT', `${me.name} ouvre le paiement : ${names()[prod] || prod} · ${(c / 100).toFixed(2)} €`);
      return send(res, 200, { url: s.url });
    } catch (e) { log('ERREUR', `paiement Stripe pour ${me.name} : ${e.message}`); return send(res, 502, { error: 'pay_error' }); }
  }
  // POST /api/pay/webhook: Stripe confirms a payment (signed with the webhook secret)
  function readRaw(req, max = 200_000) { return new Promise((ok, ko) => { const parts = []; let n = 0;
    req.on('data', c => { n += c.length; if (n > max) { ko(new Error('too_big')); req.destroy(); } else parts.push(c); }); req.on('end', () => ok(Buffer.concat(parts))); req.on('error', ko); }); }
  function signed(raw, header) {
    const parts = Object.fromEntries(String(header || '').split(',').map(x => x.split('=')).filter(x => x.length === 2).map(([k, v]) => [k.trim(), v.trim()]));
    const t = Number(parts.t); if (!t || Math.abs(Date.now() / 1000 - t) > 300) return false;
    const want = crypto.createHmac('sha256', HOOK).update(`${t}.${raw.toString('utf8')}`).digest('hex');
    const got = String(header).split(',').filter(x => x.trim().startsWith('v1=')).map(x => x.trim().slice(3));
    return got.some(g => g.length === want.length && crypto.timingSafeEqual(Buffer.from(g), Buffer.from(want)));
  }
  async function webhook(req, res) {
    if (MODE !== 'stripe') return send(res, 404, { error: 'not_found' });
    let raw; try { raw = await readRaw(req); } catch (e) { return send(res, 400, { error: 'bad_body' }); }
    if (!signed(raw, req.headers['stripe-signature'])) { log('TRICHE?', 'message de paiement non signé par Stripe (refusé)'); return send(res, 400, { error: 'bad_signature' }); }
    let ev; try { ev = JSON.parse(raw.toString('utf8')); } catch (e) { return send(res, 400, { error: 'bad_body' }); }
    const o = ev.data && ev.data.object;
    if (ev.type === 'checkout.session.completed' && o && o.payment_status === 'paid') {
      const row = P.get.get(o.id);
      if (!row) log('PAIEMENT', `session inconnue ${o.id}`);
      else if (row.cents !== o.amount_total) { P.fail.run('bad_amount', o.id); log('TRICHE?', `paiement ${o.id} : montant ${o.amount_total} au lieu de ${row.cents}`); }
      else { if (o.payment_intent) P.setPi.run(String(o.payment_intent), o.id); grant(o.id); }
    }
    if (ev.type === 'checkout.session.expired' && o) P.fail.run('expired', o.id);
    if (ev.type === 'charge.refunded' && o && o.payment_intent) {   // refunded from the Stripe dashboard
      const row = P.byPi.get(String(o.payment_intent));
      if (!row) log('PAIEMENT', `remboursement d'un paiement inconnu ${o.payment_intent}`);
      else if (o.refunded) revoke(row, 'refunded');
      else log('REMBOURSEMENT', `remboursement PARTIEL de ${((o.amount_refunded || 0) / 100).toFixed(2)} € sur ${row.id} : rien repris automatiquement, à voir à la main`);
    }
    if (ev.type === 'charge.dispute.created' && o && o.payment_intent) {   // the player disputes the payment with his bank
      const row = P.byPi.get(String(o.payment_intent)); if (row) revoke(row, 'disputed'); else log('LITIGE', `litige sur un paiement inconnu ${o.payment_intent}`);
    }
    return send(res, 200, { received: true });
  }
  return { MODE, start, webhook, revoke, list: n => P.list.all(n || 100) };
};
