/* Beggy viral layer: ghost-a-friend orders, weekly leaderboards, streak/month stats, analytics.
   Loaded after script.js, which exposes window.BeggyApp. */
(function () {
  'use strict';

  const DISHES = [
    { dish: 'Hyderabadi Chicken Biryani', amount: 457 },
    { dish: 'Butter Chicken + 2 Butter Naan', amount: 512 },
    { dish: 'Double Smash Burger Combo', amount: 389 },
    { dish: 'Large Farmhouse Pizza', amount: 649 },
    { dish: 'Paneer Kathi Roll x2', amount: 298 },
    { dish: 'Death by Chocolate Sundae', amount: 245 }
  ];

  // ── Analytics (PostHog + Vercel Web Analytics custom events) ───────────────
  function track(name, props) {
    const data = props || {};
    try { if (window.posthog && window.posthog.capture) window.posthog.capture(name, data); } catch (e) {}
    try { if (window.va) window.va('event', { name, data }); } catch (e) {}
  }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function cleanName(s) {
    return String(s || '').replace(/[<>"'&]/g, '').replace(/\s+/g, ' ').trim().slice(0, 20);
  }

  function origin() {
    return window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'https://beggy.vercel.app';
  }

  function deviceId() {
    let id = '';
    try { id = localStorage.getItem('beggy_device') || ''; } catch (e) {}
    if (!id) {
      id = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);
      try { localStorage.setItem('beggy_device', id); } catch (e) {}
    }
    return id;
  }

  function savedName() {
    try { return localStorage.getItem('beggyName') || ''; } catch (e) { return ''; }
  }

  function el(html) {
    const t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  // ── Ghost a friend: sender side ────────────────────────────────────────────
  function ghostLink(to, from, dish, amount) {
    return `${origin()}/?g=${Math.round(amount)}&dish=${encodeURIComponent(dish)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  }

  function ghostMessage(to, from, dish, amount) {
    return `🛵 ${to}, I just ordered you ${dish} (₹${Math.round(amount)}). It's on the way. Track your rider here 👇\n${ghostLink(to, from, dish, amount)}`;
  }

  function buildGhostModal() {
    const options = DISHES.map((d, i) => `<option value="${i}">${esc(d.dish)} · ₹${d.amount}</option>`).join('');
    const modal = el(`
      <div class="gh-overlay" id="ghost-modal" style="display:none" role="dialog" aria-modal="true" aria-labelledby="gh-title">
        <div class="gh-card">
          <button class="gh-close" id="gh-close" type="button" aria-label="Close">&times;</button>
          <div class="gh-tag">👻 GHOST A FRIEND</div>
          <h3 class="gh-title" id="gh-title">Order them food that never arrives</h3>
          <p class="gh-sub">They get a real-looking tracking link with their name on it. The rider shows up. The food doesn't.</p>
          <label class="gh-label" for="gh-to">Friend's name</label>
          <input class="gh-input" id="gh-to" maxlength="20" placeholder="e.g. Rahul" autocomplete="off">
          <label class="gh-label" for="gh-from">Your name</label>
          <input class="gh-input" id="gh-from" maxlength="20" placeholder="e.g. Priya" autocomplete="nickname">
          <label class="gh-label" for="gh-dish">What are you "sending"?</label>
          <select class="gh-input" id="gh-dish">${options}</select>
          <a class="gh-send disabled" id="gh-send" target="_blank" rel="noopener noreferrer">💬 Send the fake order on WhatsApp</a>
          <button class="gh-copy" id="gh-copy" type="button">📋 Copy link instead</button>
          <p class="gh-foot">Harmless prank. No real order, no payment, nothing to cancel.</p>
        </div>
      </div>`);
    document.body.appendChild(modal);

    const to = modal.querySelector('#gh-to');
    const from = modal.querySelector('#gh-from');
    const dishSel = modal.querySelector('#gh-dish');
    const send = modal.querySelector('#gh-send');
    const copy = modal.querySelector('#gh-copy');

    function current() {
      const d = DISHES[Number(dishSel.value)] || DISHES[0];
      return { to: cleanName(to.value), from: cleanName(from.value), dish: d.dish, amount: d.amount };
    }
    function refresh() {
      const c = current();
      const ready = c.to.length >= 2 && c.from.length >= 2;
      send.classList.toggle('disabled', !ready);
      if (ready) send.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(ghostMessage(c.to, c.from, c.dish, c.amount))}`;
      else send.removeAttribute('href');
      copy.disabled = !ready;
    }
    [to, from, dishSel].forEach((i) => i.addEventListener('input', refresh));
    from.addEventListener('input', () => { try { localStorage.setItem('beggyName', cleanName(from.value)); } catch (e) {} });

    send.addEventListener('click', (e) => {
      if (send.classList.contains('disabled')) { e.preventDefault(); return; }
      const c = current();
      track('ghost_created', { channel: 'whatsapp', dish: c.dish, amount: c.amount });
    });
    copy.addEventListener('click', () => {
      const c = current();
      if (c.to.length < 2 || c.from.length < 2) return;
      const text = ghostMessage(c.to, c.from, c.dish, c.amount);
      const done = () => { copy.textContent = '✓ Copied. Paste it in any chat'; setTimeout(() => { copy.textContent = '📋 Copy link instead'; }, 2200); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(() => window.prompt('Copy this:', text));
      else window.prompt('Copy this:', text);
      track('ghost_created', { channel: 'copy', dish: c.dish, amount: c.amount });
    });
    modal.querySelector('#gh-close').addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });

    return {
      open(prefillTo) {
        if (prefillTo) to.value = cleanName(prefillTo);
        if (!from.value) from.value = savedName();
        const last = window.BeggyApp && window.BeggyApp.getLastOrder && window.BeggyApp.getLastOrder();
        if (last && last.dish) {
          const idx = DISHES.findIndex((d) => last.dish.toLowerCase().includes(d.dish.split(' ')[0].toLowerCase()));
          if (idx >= 0) dishSel.value = String(idx);
        }
        refresh();
        modal.style.display = 'flex';
        track('ghost_modal_opened', {});
        setTimeout(() => (to.value ? from : to).focus(), 50);
      }
    };
  }

  let ghostModal = null;
  function openGhost(prefillTo) {
    if (!ghostModal) ghostModal = buildGhostModal();
    ghostModal.open(prefillTo);
  }

  // ── Ghost a friend: receiver side (?g=AMOUNT&dish=&from=&to=) ───────────────
  let incomingGhost = null;

  function parseGhost() {
    const p = new URLSearchParams(window.location.search);
    const g = p.get('g');
    if (!g || isNaN(parseFloat(g))) return null;
    return {
      amount: Math.min(Math.max(Math.round(parseFloat(g)), 10), 50000),
      dish: (p.get('dish') || 'Biryani').replace(/[<>]/g, '').slice(0, 40),
      from: cleanName(p.get('from')) || 'A friend',
      to: cleanName(p.get('to')) || 'you'
    };
  }

  function showGhostArrival(g) {
    const duel = document.getElementById('duel-screen');
    const hero = document.getElementById('hero-ticker-section');
    if (duel) duel.style.display = 'none';
    if (hero) hero.style.display = 'none';

    const orderNo = 'BG' + String(Math.abs((g.amount * 7919 + g.from.length * 104729) % 900000) + 100000);
    const screen = el(`
      <section class="gh-arrival" id="ghost-arrival">
        <div class="gh-arrival-card">
          <div class="gh-tag">🎁 ORDER PLACED FOR YOU</div>
          <h1 class="gh-arrival-title">${esc(g.to)}, ${esc(g.from)} just ordered you <span>${esc(g.dish)}</span></h1>
          <div class="gh-receipt">
            <div><span>Order</span><strong>#${orderNo}</strong></div>
            <div><span>Paid by</span><strong>${esc(g.from)}</strong></div>
            <div><span>Amount</span><strong>₹${g.amount}</strong></div>
            <div><span>ETA</span><strong>~2 min</strong></div>
          </div>
          <button class="gh-track-btn" id="gh-track-btn" type="button">Track my order ➔</button>
        </div>
      </section>`);
    const main = document.getElementById('app-main');
    (main && main.parentNode ? main.parentNode.insertBefore(screen, main) : document.body.prepend(screen));

    screen.querySelector('#gh-track-btn').addEventListener('click', () => {
      screen.style.display = 'none';
      track('ghost_tracking_started', { amount: g.amount });
      const city = window.BeggyApp.getCity();
      const rest = (city.kitchens && city.kitchens[0] && city.kitchens[0].name) || 'Midnight Kitchen';
      window.BeggyApp.startGhostRide({ amount: g.amount, dish: g.dish, restaurant: rest, from: g.from, to: g.to });
    });
  }

  function onGhostFinished(g) {
    track('ghost_revealed', { amount: g.amount });
    const reveal = el(`
      <section class="gh-reveal" id="ghost-reveal">
        <div class="gh-reveal-inner">
          <div class="gh-reveal-emoji">👻</div>
          <h1 class="gh-reveal-title">You just got ghosted.</h1>
          <p class="gh-reveal-sub">${esc(g.from)} never ordered anything. There is no ${esc(g.dish)}. There was never a rider.</p>
          <p class="gh-reveal-note">But that craving would've cost ₹${g.amount}. Beggy is the food app where nothing arrives and you keep the money.</p>
          <button class="gh-back-btn" id="gh-back-btn" type="button">👻 Ghost ${esc(g.from)} back</button>
          <button class="gh-own-btn" id="gh-own-btn" type="button">Order my own fake food ➔</button>
        </div>
      </section>`);
    document.body.appendChild(reveal);
    reveal.querySelector('#gh-back-btn').addEventListener('click', () => {
      track('ghost_back_clicked', {});
      openGhost(g.from);
    });
    reveal.querySelector('#gh-own-btn').addEventListener('click', () => {
      reveal.remove();
      try { window.history.replaceState({}, '', '/'); } catch (e) {}
      const hero = document.getElementById('hero-ticker-section');
      if (hero) hero.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Leaderboard ─────────────────────────────────────────────────────────────
  let lbTab = 'india';
  let lbData = null;

  function renderBoard() {
    const list = document.getElementById('lb-list');
    const section = document.getElementById('lb-section');
    if (!list || !section) return;
    if (!lbData || !lbData.kv) { section.style.display = 'none'; return; }
    section.style.display = 'block';
    const rows = lbTab === 'india' ? lbData.india : lbData.city;
    if (!rows || rows.length === 0) {
      list.innerHTML = `<p class="lb-empty">Nobody on the board yet this week. Beat a craving and add your name.</p>`;
      return;
    }
    list.innerHTML = rows.map((r, i) => `
      <div class="lb-row"><span class="lb-rank">${i + 1}</span><span class="lb-name">${esc(r.name)}</span><span class="lb-amt">₹${Number(r.amount).toLocaleString('en-IN')}</span></div>`).join('');
  }

  function loadBoard() {
    const city = window.BeggyApp ? window.BeggyApp.getCityKey() : 'bengaluru';
    fetch(`/api/leaderboard?city=${encodeURIComponent(city)}`)
      .then((r) => r.json())
      .then((d) => { lbData = d; renderBoard(); })
      .catch(() => { lbData = null; renderBoard(); });
  }

  function buildBoard() {
    const hero = document.getElementById('hero-ticker-section');
    if (!hero) return;
    const cityName = (window.BeggyApp && window.BeggyApp.getCity().name) || 'Your city';
    const section = el(`
      <section class="lb-section" id="lb-section" style="display:none">
        <div class="lb-head">
          <h2 class="lb-title">This week's biggest ghosters</h2>
          <div class="lb-tabs">
            <button class="lb-tab active" data-tab="india" type="button">All India</button>
            <button class="lb-tab" data-tab="city" type="button" id="lb-city-tab">${esc(cityName)}</button>
          </div>
        </div>
        <div class="lb-list" id="lb-list"></div>
        <p class="lb-foot">Resets every Monday. Only completed fake orders count, capped per order.</p>
      </section>`);
    hero.insertAdjacentElement('afterend', section);
    section.querySelectorAll('.lb-tab').forEach((b) => b.addEventListener('click', () => {
      lbTab = b.getAttribute('data-tab');
      section.querySelectorAll('.lb-tab').forEach((x) => x.classList.toggle('active', x === b));
      renderBoard();
      track('leaderboard_tab', { tab: lbTab });
    }));
    // Keep the city tab in sync with the city switcher
    document.querySelectorAll('.city-option').forEach((opt) => opt.addEventListener('click', () => {
      setTimeout(() => {
        const t = document.getElementById('lb-city-tab');
        if (t && window.BeggyApp) t.textContent = window.BeggyApp.getCity().name;
        loadBoard();
      }, 0);
    }));
    loadBoard();
  }

  // ── Reveal screen additions: stats strip, ghost CTA, join leaderboard ───────
  function buildRevealExtras() {
    const actions = document.querySelector('#reveal-screen .reveal-actions');
    const nameWrap = document.querySelector('#reveal-screen .reveal-name-field-wrap');
    if (!actions || !nameWrap) return;

    const stats = el(`<div class="rv-stats" id="rv-stats"></div>`);
    const punch = document.querySelector('#reveal-screen .reveal-detail-pill');
    if (punch) punch.insertAdjacentElement('afterend', stats);

    const ghostBtn = el(`<button class="rv-ghost-btn" id="rv-ghost-btn" type="button">👻 Ghost a friend: send them a fake order</button>`);
    actions.insertBefore(ghostBtn, actions.firstChild);
    ghostBtn.addEventListener('click', () => openGhost());

    const join = el(`<button class="rv-join-btn" id="rv-join-btn" type="button">🏆 Put me on this week's leaderboard</button>`);
    nameWrap.insertAdjacentElement('afterend', join);
    join.addEventListener('click', () => {
      const nameInput = document.getElementById('reveal-name-input');
      const name = cleanName(nameInput ? nameInput.value : '');
      if (name.length < 2) { if (nameInput) nameInput.focus(); join.textContent = '✍️ Add your first name above first'; return; }
      const last = window.BeggyApp.getLastOrder();
      join.disabled = true;
      join.textContent = 'Adding you...';
      fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, city: window.BeggyApp.getCityKey(), amount: Math.round(last.amount || 0), device: deviceId() })
      }).then((r) => r.json()).then((d) => {
        if (d && d.ok && d.kv) { join.textContent = '✓ You\'re on the board'; track('leaderboard_joined', { city: window.BeggyApp.getCityKey() }); loadBoard(); }
        else if (d && d.error === 'slow_down') { join.textContent = 'Easy, champ. Try again in an hour.'; }
        else { join.textContent = 'Leaderboard is warming up. Try later.'; }
      }).catch(() => { join.textContent = 'Couldn\'t reach the board. Try later.'; join.disabled = false; });
    });

    // Refresh stats + reset join button every time the reveal opens
    const reveal = document.getElementById('reveal-screen');
    new MutationObserver(() => {
      if (reveal.style.display === 'flex') {
        const k = window.BeggyApp.getKept();
        const month = Math.round(k.month).toLocaleString('en-IN');
        stats.innerHTML = `<span>🔥 ${k.streak}-day streak</span><span class="pill-dot">•</span><span>₹${month} not spent this month</span>`;
        join.disabled = false;
        join.textContent = '🏆 Put me on this week\'s leaderboard';
      }
    }).observe(reveal, { attributes: true, attributeFilter: ['style'] });
  }

  function buildPostDeliveryGhost() {
    const sub = document.querySelector('#post-delivery-modal .pdm-sub');
    if (!sub || document.getElementById('pdm-ghost-btn')) return;
    const b = el(`<button class="rv-ghost-btn pdm-ghost-btn" id="pdm-ghost-btn" type="button">👻 Now ghost a friend with a fake order</button>`);
    sub.insertAdjacentElement('afterend', b);
    b.addEventListener('click', () => { track('ghost_entry', { from: 'post_delivery' }); openGhost(); });
  }

  function hideZeptoBanner() {
    try { sessionStorage.setItem('zepto_banner_dismissed', 'true'); } catch (e) {}
    const z = document.getElementById('zepto-slide-banner');
    if (z) { z.classList.remove('show'); z.style.display = 'none'; }
  }

  // Zepto banner: show at most once per device, and never on top of a popup or ride screen.
  function tameZeptoBanner() {
    const z = document.getElementById('zepto-slide-banner');
    if (!z) return;
    try {
      if (localStorage.getItem('beggy_zepto_seen') === '1') sessionStorage.setItem('zepto_banner_dismissed', 'true');
    } catch (e) {}
    const BUSY = ['post-delivery-modal', 'checkout-modal', 'tracking-screen', 'reveal-screen', 'ghost-modal', 'ghost-arrival', 'ghost-reveal'];
    const shown = (node) => node && node.style.display !== 'none' && getComputedStyle(node).display !== 'none';
    const busy = () => BUSY.some((id) => shown(document.getElementById(id))) ||
      !!document.querySelector('#cart-drawer.open');
    const check = () => {
      if (!shown(z)) return;
      try { localStorage.setItem('beggy_zepto_seen', '1'); } catch (e) {}
      z.classList.toggle('zsb-hidden-busy', busy());
    };
    new MutationObserver(check).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['style', 'class'], childList: true });
  }

  function buildHeroGhost() {
    const wrap = document.querySelector('#hero-ticker-section .hero-cta-wrap');
    if (!wrap) return;
    const b = el(`<button class="hero-ghost-btn" id="hero-ghost-btn" type="button"><span class="hg-main">👻 Ghost a friend</span><span class="hg-sub">Send them a fake order with their name on it</span></button>`);
    const truth = wrap.querySelector('.hero-tiny-truth');
    wrap.insertBefore(b, truth || null);
    b.addEventListener('click', () => { track('ghost_entry', { from: 'hero' }); openGhost(); });
  }

  // ── Click analytics for existing buttons ────────────────────────────────────
  const CLICK_EVENTS = {
    'hero-craving-btn': ['craving_clicked', {}],
    'co-place-order-btn': ['order_placed', {}],
    'btn-reveal-whatsapp': ['share_clicked', { platform: 'whatsapp' }],
    'btn-share-twitter': ['share_clicked', { platform: 'x' }],
    'btn-share-instagram': ['share_clicked', { platform: 'instagram' }],
    'btn-share-telegram': ['share_clicked', { platform: 'telegram' }],
    'btn-share-linkedin': ['share_clicked', { platform: 'linkedin' }],
    'btn-share-copy': ['share_clicked', { platform: 'copy' }],
    'btn-share-native': ['share_clicked', { platform: 'native' }],
    'btn-share-with-image': ['share_clicked', { platform: 'image' }],
    'btn-reveal-download': ['story_downloaded', {}],
    'btn-panic': ['panic_clicked', {}],
    'speed-skip': ['ride_skipped', {}],
    'speed-1x': ['ride_speed', { speed: 'realtime' }],
    'btn-zepto-reveal': ['affiliate_clicked', { partner: 'zepto', where: 'reveal' }],
    'pdm-zepto-btn': ['affiliate_clicked', { partner: 'zepto', where: 'modal' }],
    'btn-amazon-reveal': ['affiliate_clicked', { partner: 'amazon', where: 'reveal' }],
    'btn-amazon-affiliate': ['affiliate_clicked', { partner: 'amazon', where: 'panic' }],
    'duel-accept-btn': ['challenge_accepted', {}]
  };

  function bindAnalytics() {
    document.addEventListener('click', (e) => {
      const t = e.target.closest && e.target.closest('[id]');
      if (!t) return;
      const ev = CLICK_EVENTS[t.id];
      if (ev) track(ev[0], ev[1]);
    }, true);
  }

  // ── Boot ────────────────────────────────────────────────────────────────────
  window.BeggyViral = { track, onGhostFinished, openGhost };

  document.addEventListener('DOMContentLoaded', () => {
    if (!window.BeggyApp) return;
    bindAnalytics();
    buildHeroGhost();
    buildPostDeliveryGhost();
    tameZeptoBanner();
    buildBoard();
    buildRevealExtras();

    const params = new URLSearchParams(window.location.search);
    if (params.get('c')) track('challenge_opened', { amount: Number(params.get('c')) || 0 });

    incomingGhost = parseGhost();
    if (incomingGhost) {
      hideZeptoBanner();
      track('ghost_opened', { amount: incomingGhost.amount });
      showGhostArrival(incomingGhost);
    }
  });
})();
