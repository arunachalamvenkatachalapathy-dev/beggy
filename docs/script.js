// ============================================================================
// Beggy — Order food for free... for the food that never comes. You keep the money.
// ============================================================================

(function () {
  'use strict';

  // ── HTML Entity Escaper for XSS Defense ─────────────────────────────────────
  function escapeHtml(str) {
    if (typeof str !== 'string') return String(str ?? '');
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ── 4 City Packs & 32+ Fictional Kitchens ───────────────────────────────────
  const CITIES = {
    bengaluru: {
      name: 'Bengaluru',
      area: 'Indiranagar, 100ft Road',
      center: [12.9716, 77.5946],
      dest: [12.9784, 77.6408], // Indiranagar
      kitchens: [
        {
          id: 'blr-1',
          name: 'Koramangala Midnight Biryani Club',
          rating: '4.6 ★',
          cuisines: 'Biryani, Kebabs, Mughlai',
          eta: '25-35 mins',
          satire: '50% OFF up to ₹0',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [12.9352, 77.6245],
          dishes: [
            { id: 'b1', title: 'Midnight Special Chicken Dum Biryani', price: 349, veg: false },
            { id: 'b2', title: 'Mutton Seekh Kebab (4 pcs)', price: 289, veg: false }
          ]
        },
        {
          id: 'blr-2',
          name: 'Indiranagar Smashed Burger Cartel',
          rating: '4.5 ★',
          cuisines: 'Gourmet Burgers, Truffle Fries',
          eta: '20-30 mins',
          satire: 'Surge Fee Active (+₹25)',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          coords: [12.9784, 77.6408],
          dishes: [
            { id: 'b3', title: 'Double Smash Bacon Cheese Melt', price: 399, veg: false },
            { id: 'b4', title: 'Crispy Peri Peri Fries', price: 179, veg: true }
          ]
        },
        {
          id: 'blr-3',
          name: 'The Butter Chicken Project',
          rating: '4.7 ★',
          cuisines: 'North Indian, Naan, Dal Makhani',
          eta: '30-40 mins',
          satire: 'Free Delivery above ₹499',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
          coords: [12.9750, 77.6050],
          dishes: [
            { id: 'b5', title: 'Old Delhi Velvet Butter Chicken', price: 380, veg: false },
            { id: 'b6', title: 'Garlic Butter Naan (2 pcs)', price: 120, veg: true }
          ]
        },
        {
          id: 'blr-4',
          name: 'Rameshwaram Ghee Corner',
          rating: '4.8 ★',
          cuisines: 'South Indian, Dosas, Ghee Podi',
          eta: '15-25 mins',
          satire: '2-for-1 (Min Order ₹599)',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80',
          coords: [12.9719, 77.6412],
          dishes: [
            { id: 'b7', title: 'Ghee Podi Masala Dosa', price: 195, veg: true },
            { id: 'b8', title: 'Crispy Button Idlis with Sambar', price: 140, veg: true }
          ]
        },
        {
          id: 'blr-5',
          name: 'Bangalore Kathi Roll Co.',
          rating: '4.3 ★',
          cuisines: 'Kathi Rolls, Shawarma, Wraps',
          eta: '20-30 mins',
          satire: 'Rain Fee Added',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80',
          coords: [12.9698, 77.6150],
          dishes: [
            { id: 'b9', title: 'Double Chicken Egg Roll', price: 220, veg: false },
            { id: 'b10', title: 'Paneer Tikka Kathi Roll', price: 185, veg: true }
          ]
        },
        {
          id: 'blr-6',
          name: 'Corner Scoop Death By Chocolate',
          rating: '4.9 ★',
          cuisines: 'Desserts, Hot Fudge Sundaes',
          eta: '15-20 mins',
          satire: '0 Calories (Fake)',
          image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
          coords: [12.9345, 77.6189],
          dishes: [
            { id: 'b11', title: 'Classic Death By Chocolate Sundae', price: 260, veg: true },
            { id: 'b12', title: 'Warm Brownie Fudge Bowl', price: 210, veg: true }
          ]
        },
        {
          id: 'blr-7',
          name: 'Church Street Momos Garage',
          rating: '4.4 ★',
          cuisines: 'Tibetan Momos, Thukpa, Wings',
          eta: '20-30 mins',
          satire: 'Night Craving Special',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
          coords: [12.9740, 77.6070],
          dishes: [
            { id: 'b13', title: 'Crispy Fried Chicken Momos (8 pcs)', price: 240, veg: false },
            { id: 'b14', title: 'Steamed Cheese Corn Momos', price: 190, veg: true }
          ]
        },
        {
          id: 'blr-8',
          name: 'HSR Midnight Pizza Syndicate',
          rating: '4.5 ★',
          cuisines: 'Woodfired Pizza, Garlic Bread',
          eta: '30-40 mins',
          satire: 'Cheesy Overload',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
          coords: [12.9121, 77.6446],
          dishes: [
            { id: 'b15', title: 'Loaded Pepperoni & Jalapeno Pizza', price: 460, veg: false },
            { id: 'b16', title: 'Cheesy Garlic Pull-Apart Bread', price: 199, veg: true }
          ]
        }
      ]
    },
    mumbai: {
      name: 'Mumbai',
      area: 'Bandra West, Hill Road',
      center: [19.0596, 72.8295],
      dest: [19.0600, 72.8350],
      kitchens: [
        {
          id: 'mum-1',
          name: 'Bandra Midnight Butter Pav',
          rating: '4.7 ★',
          cuisines: 'Pav Bhaji, Tawa Pulao, Chaat',
          eta: '20-30 mins',
          satire: 'Extra Butter Alert',
          image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&q=80',
          coords: [19.0550, 72.8300],
          dishes: [
            { id: 'm1', title: 'Cheese Burst Pav Bhaji (4 Pav)', price: 270, veg: true },
            { id: 'm2', title: 'Spicy Mumbai Tawa Pulao', price: 220, veg: true }
          ]
        },
        {
          id: 'mum-2',
          name: 'Carter Road Shawarma Mafia',
          rating: '4.6 ★',
          cuisines: 'Lebanese Shawarma, Hummus, Fries',
          eta: '20-25 mins',
          satire: 'Open till 4 AM',
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
          coords: [19.0680, 72.8220],
          dishes: [
            { id: 'm3', title: 'Jumbo Chicken Garlic Shawarma', price: 249, veg: false },
            { id: 'm4', title: 'Loaded Cheese Fries', price: 180, veg: true }
          ]
        },
        {
          id: 'mum-3',
          name: 'Lower Parel Biryani Engine',
          rating: '4.5 ★',
          cuisines: 'Dum Biryani, Raita, Kebabs',
          eta: '30-40 mins',
          satire: 'Platform Fee ₹10',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [18.9950, 72.8300],
          dishes: [
            { id: 'm5', title: 'Hyderabadi Dum Chicken Biryani', price: 360, veg: false },
            { id: 'm6', title: 'Reshmi Malai Kebab (6 pcs)', price: 310, veg: false }
          ]
        },
        {
          id: 'mum-4',
          name: 'Colaba Burger Republic',
          rating: '4.8 ★',
          cuisines: 'Gourmet Sliders, Shakes',
          eta: '25-35 mins',
          satire: 'High Calorie Sin',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
          coords: [18.9067, 72.8147],
          dishes: [
            { id: 'm7', title: 'Truffle Mushroom Swiss Burger', price: 420, veg: true },
            { id: 'm8', title: 'Nutella Belgian Thick Shake', price: 230, veg: true }
          ]
        }
      ]
    },
    delhi: {
      name: 'Delhi NCR',
      area: 'Connaught Place / Cyber Hub',
      center: [28.6304, 77.2177],
      dest: [28.6328, 77.2197],
      kitchens: [
        {
          id: 'del-1',
          name: 'Connaught Midnight Darbar',
          rating: '4.8 ★',
          cuisines: 'Makhani Gravy, Garlic Naan, Dal',
          eta: '25-35 mins',
          satire: 'Pure Dilli Swag',
          image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80',
          coords: [28.6320, 77.2180],
          dishes: [
            { id: 'd1', title: 'Boneless Butter Chicken & 2 Naans', price: 440, veg: false },
            { id: 'd2', title: 'Dal Makhani Slow Cooked 24hrs', price: 320, veg: true }
          ]
        },
        {
          id: 'del-2',
          name: 'Hauz Khas Momos Garage',
          rating: '4.6 ★',
          cuisines: 'Afghani Momos, Kurkure Gravy',
          eta: '20-30 mins',
          satire: 'Spicy Red Chutney',
          image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
          coords: [28.5530, 77.1940],
          dishes: [
            { id: 'd3', title: 'Tandoori Afghani Chicken Momos', price: 260, veg: false },
            { id: 'd4', title: 'Kurkure Paneer Momos with Dip', price: 210, veg: true }
          ]
        },
        {
          id: 'del-3',
          name: 'Cyber Hub Roll Corporation',
          rating: '4.5 ★',
          cuisines: 'Mutton Seekh, Egg Rolls, Kebabs',
          eta: '20-25 mins',
          satire: 'Tech Worker Late Fuel',
          image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&q=80',
          coords: [28.4950, 77.0890],
          dishes: [
            { id: 'd5', title: 'Double Mutton Seekh Kathi Roll', price: 290, veg: false },
            { id: 'd6', title: 'Rumali Roti & Galouti Kebab', price: 340, veg: false }
          ]
        },
        {
          id: 'del-4',
          name: 'GK-II Midnight Pizza Syndicate',
          rating: '4.7 ★',
          cuisines: 'Woodfired Slices, Stuffed Crust',
          eta: '30-40 mins',
          satire: 'Late Night Addiction',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
          coords: [28.5350, 77.2400],
          dishes: [
            { id: 'd7', title: 'Spicy Pepperoni & Hot Honey Pizza', price: 470, veg: false },
            { id: 'd8', title: 'Garlic Parmesan Dough Knots', price: 180, veg: true }
          ]
        }
      ]
    },
    hyderabad: {
      name: 'Hyderabad',
      area: 'Jubilee Hills, Road No. 36',
      center: [17.4319, 78.4073],
      dest: [17.4350, 78.4090],
      kitchens: [
        {
          id: 'hyd-1',
          name: 'Charminar Zafrani Dum Biryani',
          rating: '4.9 ★',
          cuisines: 'Authentic Hyderabadi Dum Biryani',
          eta: '25-35 mins',
          satire: 'Nawabi Taste, ₹0 Bill',
          image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80',
          coords: [17.3616, 78.4747],
          dishes: [
            { id: 'h1', title: 'Special Zafrani Chicken Dum Biryani', price: 360, veg: false },
            { id: 'h2', title: 'Double Ka Meetha (Royal Dessert)', price: 150, veg: true }
          ]
        },
        {
          id: 'hyd-2',
          name: 'Madhapur Arabian Mandi Engine',
          rating: '4.7 ★',
          cuisines: 'Arabian Mandi, Juicy Chicken',
          eta: '30-40 mins',
          satire: 'Night Rush Active',
          image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
          coords: [17.4483, 78.3915],
          dishes: [
            { id: 'h3', title: 'Al Faham Chicken Mandi with Soup', price: 430, veg: false },
            { id: 'h4', title: 'Crispy Garlic Fish Bites', price: 310, veg: false }
          ]
        },
        {
          id: 'hyd-3',
          name: 'Gachibowli Midnight Shawarma Vault',
          rating: '4.5 ★',
          cuisines: 'Shawarma, Falafel, Rumali',
          eta: '15-25 mins',
          satire: 'Extra Mayo Guaranteed',
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80',
          coords: [17.4401, 78.3489],
          dishes: [
            { id: 'h5', title: 'Rumali Jumbo Chicken Shawarma', price: 230, veg: false },
            { id: 'h6', title: 'Peri Peri Crispy Chicken Strips', price: 210, veg: false }
          ]
        },
        {
          id: 'hyd-4',
          name: 'Banjara Spice Dosa Project',
          rating: '4.6 ★',
          cuisines: 'Guntur Karam Dosa, Vada, Upma',
          eta: '15-20 mins',
          satire: 'Ghee Podi Fire',
          image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80',
          coords: [17.4156, 78.4350],
          dishes: [
            { id: 'h7', title: 'Fire Guntur Karam Ghee Dosa', price: 180, veg: true },
            { id: 'h8', title: 'Cheese Corn Podi Dosa', price: 210, veg: true }
          ]
        }
      ]
    }
  };

  // ── Global App State ────────────────────────────────────────────────────────
  let currentCityKey = 'bengaluru';
  let activeDuel = null; // { from: 'Arun', amount: 340, dish: 'Biryani' }
  let cart = {}; // dishId -> { item, restaurant, qty }
  let lastOrderSummary = { amount: 457, dish: 'Midnight Biryani', restaurant: 'Koramangala Club', time: '11:42 PM' };

  // User Local Storage State: "The Bill You Kept"
  let userKeptState = {
    totalKept: 0,
    streak: 0,
    lastKeptDate: '',
    history: []
  };

  function loadUserKeptState() {
    try {
      const raw = localStorage.getItem('beggy_bill_kept');
      if (raw) {
        const parsed = JSON.parse(raw);
        userKeptState.totalKept = Number(parsed.totalKept) || 0;
        userKeptState.streak = Number(parsed.streak) || 0;
        userKeptState.lastKeptDate = parsed.lastKeptDate || '';
        userKeptState.history = Array.isArray(parsed.history) ? parsed.history : [];
      }
    } catch (e) {
      console.warn('Could not parse userKeptState', e);
    }
    updateHeaderBillUI();
  }

  function saveUserKeptState() {
    try {
      localStorage.setItem('beggy_bill_kept', JSON.stringify(userKeptState));
    } catch (e) {}
    updateHeaderBillUI();
  }

  function updateHeaderBillUI() {
    const el = document.getElementById('header-saved-val');
    if (el) el.textContent = `₹${Math.floor(userKeptState.totalKept)}`;
  }

  function localIsoDate(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // Sum of avoided orders in the current calendar month (entries without a timestamp are skipped)
  function monthKept() {
    const now = new Date();
    return userKeptState.history.reduce((sum, h) => {
      if (!h || !h.ts) return sum;
      const d = new Date(h.ts);
      return (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) ? sum + (Number(h.amount) || 0) : sum;
    }, 0);
  }

  // Streak only counts if the last beaten craving was today or yesterday
  function liveStreak() {
    const t = localIsoDate(new Date());
    const y = localIsoDate(new Date(Date.now() - 86400000));
    return (userKeptState.lastKeptDate === t || userKeptState.lastKeptDate === y) ? userKeptState.streak : 0;
  }

  // ── Live Rupee Ticker (Honest counter from real API) ────────────────────────
  function initLiveTicker() {
    const tickerEl = document.getElementById('live-hero-ticker');
    const subtitleEl = document.getElementById('ticker-subtitle');
    if (!tickerEl) return;

    fetch('/api/stats')
      .then(r => r.json())
      .then(d => {
        if (d && d.ok && typeof d.totalSaved === 'number' && d.totalSaved > 0) {
          tickerEl.textContent = Number(d.totalSaved).toLocaleString('en-IN');
          if (subtitleEl) subtitleEl.textContent = 'kept so far';
        } else {
          tickerEl.textContent = '0';
          if (subtitleEl) subtitleEl.textContent = 'kept so far — be the first tonight';
        }
      })
      .catch(() => {
        tickerEl.textContent = '0';
        if (subtitleEl) subtitleEl.textContent = 'kept so far — be the first tonight';
      });
  }

  // ── URL Duel Parser (?c=610&dish=Butter+Chicken&from=Priya) ──────────────────
  function parseUrlDuel() {
    const params = new URLSearchParams(window.location.search);
    const c = params.get('c');
    const dish = params.get('dish');
    const from = params.get('from');

    if (c && !isNaN(parseFloat(c))) {
      const amount = Math.min(Math.max(Math.round(parseFloat(c)), 10), 50000);
      const challenger = (from || 'A friend').slice(0, 30);
      const food = (dish || 'biryani').slice(0, 40);

      activeDuel = { from: challenger, amount, dish: food };

      // Render Duel Screen
      const duelScreen = document.getElementById('duel-screen');
      const heroSection = document.getElementById('hero-ticker-section');
      const nameEl = document.getElementById('duel-sender-name');
      const dishEl = document.getElementById('duel-dish-name');
      const amtEl = document.getElementById('duel-saved-amount');
      const btnAmtEl = document.getElementById('duel-btn-amt');

      if (nameEl) nameEl.textContent = challenger;
      if (dishEl) dishEl.textContent = food;
      if (amtEl) amtEl.textContent = `₹${amount}`;
      if (btnAmtEl) btnAmtEl.textContent = `₹${amount}`;

      if (duelScreen) duelScreen.style.display = 'flex';
      if (heroSection) heroSection.style.display = 'none';
      return true;
    }
    return false;
  }

  // ── City Switcher ───────────────────────────────────────────────────────────
  function initCitySwitcher() {
    const btn = document.getElementById('city-selector-btn');
    const dropdown = document.getElementById('city-dropdown');
    const label = document.getElementById('current-city-label');
    const cityTitle = document.getElementById('kitchens-city-title');

    if (!btn || !dropdown) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = dropdown.style.display === 'block';
      dropdown.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', !open);
    });

    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    });

    dropdown.querySelectorAll('.city-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const city = opt.getAttribute('data-city');
        if (CITIES[city]) {
          currentCityKey = city;
          dropdown.querySelectorAll('.city-option').forEach(o => o.classList.remove('active'));
          opt.classList.add('active');

          if (label) label.textContent = CITIES[city].name;
          if (cityTitle) cityTitle.textContent = CITIES[city].name;

          const locInfo = document.getElementById('cart-location-info');
          if (locInfo) locInfo.textContent = `Delivering to: ${CITIES[city].area} • ~11 mins`;

          renderKitchens();
        }
      });
    });
  }

  // ── Kitchens & Dishes Renderer ──────────────────────────────────────────────
  let activeFilter = 'all';
  let searchQuery = '';

  function renderKitchens() {
    const grid = document.getElementById('kitchens-grid');
    const countBadge = document.getElementById('kitchens-count-badge');
    if (!grid) return;

    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    let kitchens = cityData.kitchens;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      kitchens = kitchens.filter(k =>
        k.name.toLowerCase().includes(q) ||
        k.cuisines.toLowerCase().includes(q) ||
        k.dishes.some(d => d.title.toLowerCase().includes(q))
      );
    } else if (activeFilter !== 'all') {
      kitchens = kitchens.filter(k => {
        const text = (k.name + ' ' + k.cuisines).toLowerCase();
        if (activeFilter === 'biryani') return text.includes('biryani') || text.includes('mandi');
        if (activeFilter === 'burger') return text.includes('burger') || text.includes('fries');
        if (activeFilter === 'pizza') return text.includes('pizza');
        if (activeFilter === 'rolls') return text.includes('roll') || text.includes('shawarma');
        if (activeFilter === 'south') return text.includes('dosa') || text.includes('idli');
        if (activeFilter === 'north') return text.includes('north') || text.includes('naan') || text.includes('butter chicken');
        if (activeFilter === 'dessert') return text.includes('dessert') || text.includes('chocolate') || text.includes('shake');
        return true;
      });
    }

    if (countBadge) countBadge.textContent = `${kitchens.length} kitchens`;

    if (kitchens.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px 16px; color: var(--text-muted);">
          <span style="font-size: 2rem;">🍽️</span>
          <p style="margin-top: 10px; font-weight: 700;">No cravings match "${escapeHtml(searchQuery)}".</p>
          <p style="font-size: 0.8rem;">Try searching for biryani, burgers, pizza, rolls, or momos.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = kitchens.map(k => `
      <div class="kitchen-card" data-kitchen-id="${escapeHtml(k.id)}">
        <div class="kc-banner-wrap">
          <img src="${escapeHtml(k.image)}" alt="${escapeHtml(k.name)}" class="kc-banner-img" loading="lazy" />
          <span class="kc-satire-badge">${escapeHtml(k.satire)}</span>
          <span class="kc-eta-badge">⏱️ ${escapeHtml(k.eta)}</span>
        </div>

        <div class="kc-info">
          <div class="kc-name-row">
            <h3 class="kc-name">${escapeHtml(k.name)}</h3>
            <span class="kc-rating">${escapeHtml(k.rating)}</span>
          </div>
          <p class="kc-cuisines">${escapeHtml(k.cuisines)}</p>

          <div class="kc-dishes-list">
            ${k.dishes.map(d => {
              const inCart = cart[d.id];
              return `
                <div class="kc-dish-row">
                  <div class="dish-text-col">
                    <span class="dish-veg-tag">${d.veg ? '🟢' : '🔴'}</span>
                    <strong class="dish-title">${escapeHtml(d.title)}</strong>
                    <div class="dish-price">₹${d.price}</div>
                  </div>
                  <div class="dish-action-col">
                    ${inCart ? `
                      <div class="qty-stepper">
                        <button class="qty-btn btn-qty-minus" data-dish-id="${escapeHtml(d.id)}">−</button>
                        <span class="qty-val">${inCart.qty}</span>
                        <button class="qty-btn btn-qty-plus" data-dish-id="${escapeHtml(d.id)}">+</button>
                      </div>
                    ` : `
                      <button class="btn-add-dish" data-dish-id="${escapeHtml(d.id)}" data-kitchen-id="${escapeHtml(k.id)}">ADD</button>
                    `}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `).join('');

    bindDishEvents(kitchens);
  }

  function bindDishEvents(kitchens) {
    document.querySelectorAll('.btn-add-dish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        const kitchenId = e.currentTarget.getAttribute('data-kitchen-id');

        let foundDish = null;
        let foundKitchen = null;
        for (const k of kitchens) {
          const d = k.dishes.find(x => x.id === dishId);
          if (d) { foundDish = d; foundKitchen = k; break; }
        }

        if (foundDish) {
          cart[dishId] = {
            item: foundDish,
            restaurant: foundKitchen,
            qty: 1
          };
          updateCartUI();
          renderKitchens();
        }
      });
    });

    document.querySelectorAll('.btn-qty-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        if (cart[dishId]) {
          cart[dishId].qty += 1;
          updateCartUI();
          renderKitchens();
        }
      });
    });

    document.querySelectorAll('.btn-qty-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dishId = e.currentTarget.getAttribute('data-dish-id');
        if (cart[dishId]) {
          cart[dishId].qty -= 1;
          if (cart[dishId].qty <= 0) {
            delete cart[dishId];
          }
          updateCartUI();
          renderKitchens();
        }
      });
    });
  }

  // ── Cart & The Painful Delivery Math ──────────────────────────────────────────
  function calculateCartMath() {
    let subtotal = 0;
    let itemCount = 0;
    let firstDish = '';
    let firstRest = '';

    for (const id in cart) {
      const entry = cart[id];
      subtotal += entry.item.price * entry.qty;
      itemCount += entry.qty;
      if (!firstDish) firstDish = entry.item.title;
      if (!firstRest && entry.restaurant) firstRest = entry.restaurant.name;
    }

    if (itemCount === 0) {
      return {
        itemCount: 0,
        subtotal: 0,
        delivery: 0,
        platform: 0,
        gst: 0,
        surge: 0,
        total: 0,
        firstDish: '',
        firstRest: ''
      };
    }

    const delivery = 49;
    const platform = 10;
    const gst = Math.round(subtotal * 0.05) + 8; // Packaging + 5% GST
    const surge = 25; // Rain / late night surge
    const total = subtotal + delivery + platform + gst + surge;

    return {
      itemCount,
      subtotal,
      delivery,
      platform,
      gst,
      surge,
      total,
      firstDish,
      firstRest
    };
  }

  function updateCartUI() {
    const math = calculateCartMath();

    // Floating cart bar
    const floatingBar = document.getElementById('floating-cart-bar');
    const fcCount = document.getElementById('fc-count');
    const fcTotal = document.getElementById('fc-total');
    const headerCartBadge = document.getElementById('header-cart-count');

    if (math.itemCount > 0) {
      if (floatingBar) floatingBar.style.display = 'flex';
      if (fcCount) fcCount.textContent = `${math.itemCount} ${math.itemCount === 1 ? 'Item' : 'Items'}`;
      if (fcTotal) fcTotal.textContent = `₹${math.total.toFixed(2)}`;
      if (headerCartBadge) {
        headerCartBadge.textContent = math.itemCount;
        headerCartBadge.style.display = 'flex';
      }
    } else {
      if (floatingBar) floatingBar.style.display = 'none';
      if (headerCartBadge) headerCartBadge.style.display = 'none';
    }

    // Cart Drawer items
    const container = document.getElementById('cart-items-container');
    if (container) {
      if (math.itemCount === 0) {
        container.innerHTML = `
          <div style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
            <span style="font-size: 2.4rem;">🍛</span>
            <p style="margin-top: 10px; font-weight: 700; color: #FFFFFF;">Your cart is empty.</p>
            <p style="font-size: 0.8rem;">Select dishes from midnight kitchens to simulate the bill.</p>
          </div>
        `;
      } else {
        container.innerHTML = Object.keys(cart).map(id => {
          const entry = cart[id];
          return `
            <div class="cart-item-row">
              <div class="ci-info">
                <strong class="ci-title">${escapeHtml(entry.item.title)}</strong>
                <span class="ci-price">₹${entry.item.price} each</span>
              </div>
              <div class="qty-stepper">
                <button class="qty-btn drawer-qty-minus" data-dish-id="${escapeHtml(id)}">−</button>
                <span class="qty-val">${entry.qty}</span>
                <button class="qty-btn drawer-qty-plus" data-dish-id="${escapeHtml(id)}">+</button>
              </div>
            </div>
          `;
        }).join('');

        // Bind drawer buttons
        container.querySelectorAll('.drawer-qty-plus').forEach(btn => {
          btn.addEventListener('click', () => {
            const did = btn.getAttribute('data-dish-id');
            if (cart[did]) { cart[did].qty += 1; updateCartUI(); renderKitchens(); }
          });
        });
        container.querySelectorAll('.drawer-qty-minus').forEach(btn => {
          btn.addEventListener('click', () => {
            const did = btn.getAttribute('data-dish-id');
            if (cart[did]) {
              cart[did].qty -= 1;
              if (cart[did].qty <= 0) delete cart[did];
              updateCartUI();
              renderKitchens();
            }
          });
        });
      }
    }

    // Bill lines
    const billSubtotal = document.getElementById('bill-subtotal');
    const billDelivery = document.getElementById('bill-delivery');
    const billPlatform = document.getElementById('bill-platform');
    const billGst = document.getElementById('bill-gst');
    const billSurge = document.getElementById('bill-surge');
    const billTotal = document.getElementById('bill-total');
    const drawerBtn = document.getElementById('drawer-checkout-btn');

    if (billSubtotal) billSubtotal.textContent = `₹${math.subtotal.toFixed(2)}`;
    if (billDelivery) billDelivery.textContent = `₹${math.delivery.toFixed(2)}`;
    if (billPlatform) billPlatform.textContent = `₹${math.platform.toFixed(2)}`;
    if (billGst) billGst.textContent = `₹${math.gst.toFixed(2)}`;
    if (billSurge) billSurge.textContent = `₹${math.surge.toFixed(2)}`;
    if (billTotal) billTotal.textContent = `₹${math.total.toFixed(2)}`;

    if (drawerBtn) {
      drawerBtn.disabled = (math.itemCount === 0);
    }
  }

  // ── Checkout & The Slam ─────────────────────────────────────────────────────
  function initCheckout() {
    const drawerCheckoutBtn = document.getElementById('drawer-checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeBtn = document.getElementById('co-close-btn');
    const placeOrderBtn = document.getElementById('co-place-order-btn');
    const bigTotalEl = document.getElementById('co-big-total');

    if (drawerCheckoutBtn) {
      drawerCheckoutBtn.addEventListener('click', () => {
        closeCartDrawer();
        const math = calculateCartMath();
        if (bigTotalEl) bigTotalEl.textContent = `₹${math.total.toFixed(2)}`;
        if (checkoutModal) checkoutModal.style.display = 'flex';
      });
    }

    const returnToCart = () => {
      if (checkoutModal) checkoutModal.style.display = 'none';
      openCartDrawer();
    };

    if (closeBtn && checkoutModal) {
      closeBtn.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
      });
    }

    const coBackBtn = document.getElementById('co-back-btn');
    const coCancelBtn = document.getElementById('co-cancel-btn');
    if (coBackBtn) coBackBtn.addEventListener('click', returnToCart);
    if (coCancelBtn) coCancelBtn.addEventListener('click', returnToCart);

    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => {
        const math = calculateCartMath();
        const finalAmount = math.total;
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

        lastOrderSummary = {
          amount: finalAmount,
          dish: math.firstDish || 'Midnight Biryani',
          restaurant: math.firstRest || 'Koramangala Midnight Biryani Club',
          time: timeStr
        };

        // The Laugh: Strike through the bill to ₹0.00
        if (bigTotalEl) {
          bigTotalEl.classList.add('slammed');
          setTimeout(() => {
            bigTotalEl.textContent = '₹0.00 SAVED!';
          }, 200);
        }

        // Transition into tracking mini-movie after brief pause
        setTimeout(() => {
          if (checkoutModal) checkoutModal.style.display = 'none';
          if (bigTotalEl) bigTotalEl.classList.remove('slammed');
          cart = {}; // Clear cart
          updateCartUI();
          renderKitchens();
          startTrackingMovie(lastOrderSummary);
        }, 800);
      });
    }
  }

  let cartReturnFocus = null;

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer) {
      cartReturnFocus = document.activeElement;
      drawer.classList.add('open');
      // Screen readers: expose the open cart and move focus into it
      drawer.setAttribute('aria-hidden', 'false');
      drawer.removeAttribute('inert');
      const firstBtn = drawer.querySelector('button, [href], input, [tabindex]:not([tabindex="-1"])');
      if (firstBtn) setTimeout(() => firstBtn.focus(), 50);
    }
    if (backdrop) backdrop.classList.add('open');
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (drawer) {
      // Move focus out before hiding so it never sits inside an aria-hidden region
      if (drawer.contains(document.activeElement) && cartReturnFocus && cartReturnFocus.focus) {
        cartReturnFocus.focus();
      } else if (drawer.contains(document.activeElement)) {
        document.activeElement.blur();
      }
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('inert', '');
    }
    if (backdrop) backdrop.classList.remove('open');
  }

  document.addEventListener('keydown', (e) => {
    const drawer = document.getElementById('cart-drawer');
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeCartDrawer();
  });

  // ── Tracking Screen — The 11-Minute Rider Mini-Movie ─────────────────────────
  let trackingMap = null;
  let riderMarker = null;
  let trackingTimer = null;
  const DEFAULT_SPEED = 3; // 3x = ~3.5 min ride by default; 1x (full 11 min) still available
  let simSpeedMultiplier = DEFAULT_SPEED; // 1 = 11 mins, 3 = ~3.5 mins, skip = instant
  let ghostRide = null; // set when a friend opened a ghost-order link
  let totalSimSeconds = 660; // 11 minutes
  let elapsedSimSeconds = 0;
  let currentTileLayer = null;

  function getMapTileUrl() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return isDark
      ? 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
      : 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
  }

  function updateMapTiles() {
    if (!trackingMap) return;
    if (currentTileLayer) {
      trackingMap.removeLayer(currentTileLayer);
    }
    currentTileLayer = L.tileLayer(getMapTileUrl(), {
      maxZoom: 19,
      attribution: '&copy; Esri'
    }).addTo(trackingMap);
  }

  function startTrackingMovie(order) {
    const trackingScreen = document.getElementById('tracking-screen');
    const dishNameEl = document.getElementById('track-dish-name');
    const restNameEl = document.getElementById('track-restaurant-name');
    const savedValEl = document.getElementById('track-saved-val');

    if (dishNameEl) dishNameEl.textContent = order.dish;
    if (restNameEl) restNameEl.textContent = order.restaurant;
    if (savedValEl) savedValEl.textContent = `₹${order.amount.toFixed(2)}`;

    if (trackingScreen) trackingScreen.style.display = 'flex';

    // Init or refresh map
    initTrackingMap();

    // Reset timeline & countdown
    elapsedSimSeconds = 0;
    simSpeedMultiplier = order.speed || DEFAULT_SPEED;
    updateSpeedControlsUI();

    if (trackingTimer) clearInterval(trackingTimer);

    trackingTimer = setInterval(() => {
      elapsedSimSeconds += simSpeedMultiplier;
      updateTrackingProgress();

      if (elapsedSimSeconds >= totalSimSeconds) {
        clearInterval(trackingTimer);
        finishTrackingMovie();
      }
    }, 1000);

    updateTrackingProgress();
  }

  function updateSpeedControlsUI() {
    document.querySelectorAll('.speed-btn').forEach(btn => {
      const sp = btn.getAttribute('data-speed');
      if (sp === String(simSpeedMultiplier)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function initTrackingMap() {
    const mapContainer = document.getElementById('tracking-map');
    if (!mapContainer) return;

    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    const start = cityData.kitchens[0].coords;
    const end = cityData.dest;

    if (!trackingMap) {
      trackingMap = L.map('tracking-map', {
        zoomControl: false,
        attributionControl: false
      }).setView(start, 14);

      updateMapTiles();

      // Destination Pin
      const destIcon = L.divIcon({
        className: 'dest-map-pin',
        html: `<div style="font-size: 28px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.6));">📍</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      });
      L.marker(end, { icon: destIcon }).addTo(trackingMap);

      // Rider Marker
      const riderIcon = L.divIcon({
        className: 'rider-map-icon',
        html: `<div style="font-size: 32px; filter: drop-shadow(0 4px 12px rgba(252,128,25,0.6));">🛵</div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      riderMarker = L.marker(start, { icon: riderIcon }).addTo(trackingMap);
    } else {
      updateMapTiles();
      trackingMap.invalidateSize();
      riderMarker.setLatLng(start);
      trackingMap.setView(start, 14);
    }
  }

  function updateTrackingProgress() {
    const remaining = Math.max(0, totalSimSeconds - elapsedSimSeconds);
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    const etaEl = document.getElementById('eta-countdown');
    if (etaEl) etaEl.textContent = timeStr;

    // Move Rider: scooter stays stationary at kitchen until order picked up (progress >= 0.45)
    const cityData = CITIES[currentCityKey] || CITIES.bengaluru;
    const start = cityData.kitchens[0].coords;
    const end = cityData.dest;
    const progress = Math.min(1, elapsedSimSeconds / totalSimSeconds);

    if (progress < 0.45) {
      if (riderMarker) riderMarker.setLatLng(start);
    } else {
      const travelProgress = (progress - 0.45) / 0.55;
      const curLat = start[0] + (end[0] - start[0]) * travelProgress;
      const curLng = start[1] + (end[1] - start[1]) * travelProgress;
      if (riderMarker) riderMarker.setLatLng([curLat, curLng]);
    }

    // Update Staged Timeline Dots & Status
    const headingEl = document.getElementById('track-status-heading');
    const subEl = document.getElementById('track-status-sub');
    const chatBubble = document.getElementById('rider-chat-bubble');
    const chatText = document.getElementById('rc-text');

    const s1 = document.getElementById('tl-step-1');
    const s2 = document.getElementById('tl-step-2');
    const s3 = document.getElementById('tl-step-3');
    const s4 = document.getElementById('tl-step-4');

    [s1, s2, s3, s4].forEach(s => s && s.classList.remove('active'));

    if (progress < 0.15) {
      if (s1) s1.classList.add('active');
      if (headingEl) headingEl.textContent = 'Rahul is assigned';
      if (subEl) subEl.textContent = 'Hero Splendor • 4.8★ (1,420 orders)';
      if (chatBubble) chatBubble.style.display = 'none';
    } else if (progress < 0.45) {
      if (s2) s2.classList.add('active');
      if (headingEl) headingEl.textContent = 'At restaurant. Waiting for food.';
      if (subEl) subEl.textContent = 'Order is being packed in the kitchen';

      // Chat bubble 1
      if (progress >= 0.20 && progress <= 0.40) {
        if (chatBubble) chatBubble.style.display = 'flex';
        if (chatText) chatText.textContent = 'Bhaiya 2 min, kitchen me thoda rush hai.';
      } else {
        if (chatBubble) chatBubble.style.display = 'none';
      }
    } else if (progress < 0.85) {
      if (s3) s3.classList.add('active');
      if (headingEl) headingEl.textContent = 'Order picked up · On the way';
      if (subEl) subEl.textContent = 'Rider moving along your city roads';

      // Chat bubble 2
      if (progress >= 0.55 && progress <= 0.75) {
        if (chatBubble) chatBubble.style.display = 'flex';
        if (chatText) chatText.textContent = 'Bhaiya location main gate pe delivery chalega na?';
      } else {
        if (chatBubble) chatBubble.style.display = 'none';
      }
    } else {
      if (s4) s4.classList.add('active');
      if (headingEl) headingEl.textContent = 'Arriving at your doorstep';
      if (subEl) subEl.textContent = 'Delivery partner is outside your building';
      if (chatBubble) chatBubble.style.display = 'none';
    }
  }

  function finishTrackingMovie() {
    const trackingScreen = document.getElementById('tracking-screen');
    if (trackingScreen) trackingScreen.style.display = 'none';

    // Ghost order opened by a friend: show the ghost reveal, don't log it as their own saving
    if (ghostRide) {
      const g = ghostRide;
      ghostRide = null;
      if (window.BeggyViral && window.BeggyViral.onGhostFinished) window.BeggyViral.onGhostFinished(g);
      return;
    }

    // Log savings to local ledger (daily streak: consecutive days with at least one beaten craving)
    const todayIso = localIsoDate(new Date());
    const yesterdayIso = localIsoDate(new Date(Date.now() - 86400000));
    if (userKeptState.lastKeptDate === todayIso) {
      userKeptState.streak = Math.max(1, userKeptState.streak);
    } else if (userKeptState.lastKeptDate === yesterdayIso) {
      userKeptState.streak += 1;
    } else {
      userKeptState.streak = 1;
    }
    userKeptState.lastKeptDate = todayIso;
    userKeptState.totalKept += lastOrderSummary.amount;
    userKeptState.history.unshift({
      amount: lastOrderSummary.amount,
      dish: lastOrderSummary.dish,
      restaurant: lastOrderSummary.restaurant,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      time: lastOrderSummary.time,
      ts: Date.now()
    });
    userKeptState.history = userKeptState.history.slice(0, 300);
    saveUserKeptState();
    if (window.BeggyViral && window.BeggyViral.track) {
      window.BeggyViral.track('reveal_viewed', { amount: Math.round(lastOrderSummary.amount), dish: lastOrderSummary.dish, city: currentCityKey });
    }

    // POST /api/stats with amount (once)
    fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: lastOrderSummary.amount })
    })
      .then(r => r.json())
      .then(d => {
        if (d && d.ok && typeof d.totalSaved === 'number' && d.totalSaved > 0) {
          const tickerEl = document.getElementById('live-hero-ticker');
          const subtitleEl = document.getElementById('ticker-subtitle');
          if (tickerEl) tickerEl.textContent = Number(d.totalSaved).toLocaleString('en-IN');
          if (subtitleEl) subtitleEl.textContent = 'kept so far';
        }
      })
      .catch(() => {});

    // Trigger Post-Delivery Celebration Modal & Reveal!
    showPostDeliveryModal();
  }

  // ── Share Toast Notification & Safe Synchronous Clipboard Copy ───────────
  function copyTextWithFallback(text) {
    let success = false;
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      ta.style.top = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      success = document.execCommand('copy');
      document.body.removeChild(ta);
    } catch (e) {
      success = false;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    return success;
  }

  let shareToastTimer = null;
  function showShareToast(message) {
    const toast = document.getElementById('share-toast');
    const msgEl = document.getElementById('st-msg');
    if (!toast) return;
    if (msgEl) msgEl.textContent = message;
    toast.style.display = 'flex';
    if (shareToastTimer) clearTimeout(shareToastTimer);
    shareToastTimer = setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }

  // ── Post-Delivery Celebration Modal (Founder Support & Amazon Recipe Kit) ──
  let pdmTipAmount = 10;

  function updatePdmTipUI(amount) {
    let amNum = Number(amount);
    if (isNaN(amNum) || !isFinite(amNum) || amNum <= 0) amNum = 10;
    pdmTipAmount = Math.min(50000, Math.max(1, amNum));
    const uri = `upi://pay?pa=arunking156-2@oksbi&pn=Arunachalam%20Venkatachalapathy&am=${pdmTipAmount}&cu=INR&tn=Fund%20the%20young%20student%20founder`;

    const upiBtn = document.getElementById('pdm-upi-btn');
    const upiMain = document.getElementById('pdm-upi-btn-main');
    const qrImg = document.getElementById('pdm-qr-img');

    if (upiBtn) {
      upiBtn.href = uri;
    }
    if (upiMain) {
      upiMain.textContent = `Fund the Student Founder • ₹${pdmTipAmount.toLocaleString('en-IN')}`;
    }
    if (qrImg) {
      const encoded = encodeURIComponent(uri);
      qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encoded}`;
    }
  }

  function showPostDeliveryModal() {
    const modal = document.getElementById('post-delivery-modal');
    const savedVal = document.getElementById('pdm-saved-val');
    const dishTitle = document.getElementById('pdm-dish-title');
    const dishDesc = document.getElementById('pdm-dish-desc');

    const amt = lastOrderSummary.amount || 458;
    const dish = lastOrderSummary.dish || 'Biryani';

    if (savedVal) savedVal.textContent = `₹${amt.toFixed(2)}`;
    if (dishTitle) dishTitle.textContent = `Cook ${dish} yourself for a fraction of the bill`;
    if (dishDesc) dishDesc.textContent = `The boring-but-smart option: stock up on ingredients for ${dish}. They arrive tomorrow, uncooked. Character building.`;

    const zeptoDesc = document.getElementById('pdm-zepto-desc');
    if (zeptoDesc) zeptoDesc.textContent = `You just skipped a ₹${Math.round(amt)} ${dish}. If you truly need a snack, get something small on Zepto. It actually shows up, unlike our rider.`;
    const rzcDesc = document.getElementById('rzc-dish-desc');
    if (rzcDesc) rzcDesc.textContent = `You beat a ₹${Math.round(amt)} ${dish}. If you truly need a snack, get something small on Zepto. It actually shows up, unlike our rider.`;

    // Reset Founder tip to default ₹10 and sync pills UI
    updatePdmTipUI(10);
    const pdmPillsRow = document.getElementById('pdm-pills-row');
    if (pdmPillsRow) {
      pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => {
        p.classList.toggle('active', p.getAttribute('data-amount') === '10');
      });
    }
    const pdmCustomWrap = document.getElementById('pdm-custom-wrap');
    if (pdmCustomWrap) pdmCustomWrap.style.display = 'none';
    const pdmQrBox = document.getElementById('pdm-qr-box');
    if (pdmQrBox) pdmQrBox.style.display = 'none';

    // Always ensure reveal screen underneath is loaded and populated
    showRevealScreen();

    // Show celebration popup
    if (modal) {
      modal.style.display = 'flex';
    }
  }

  function hidePostDeliveryModal() {
    const modal = document.getElementById('post-delivery-modal');
    if (modal) modal.style.display = 'none';
  }

  // ── Name Sanitizer & Viral Challenge Formatter ──────────────────────────────
  function sanitizeName(s) {
    return String(s || '')
      .replace(/[<>"'&]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 24);
  }

  let activeTemplateTab = 'whatsapp';

  function getChallengeData() {
    const nameInput = document.getElementById('reveal-name-input');
    const rawName = nameInput ? nameInput.value : '';
    const cleanName = sanitizeName(rawName) || (activeDuel && activeDuel.from ? 'Someone' : 'Me');
    const amt = Math.round(lastOrderSummary.amount || 458);
    const dish = lastOrderSummary.dish || 'Biryani';
    const origin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : 'https://beggy.vercel.app';
    const challengeUrl = `${origin}/?c=${amt}&dish=${encodeURIComponent(dish)}&from=${encodeURIComponent(cleanName)}`;

    let whatsappText = '';
    if (activeDuel && activeDuel.from) {
      whatsappText = `🚨 BRO I JUST GOT A 100% DISCOUNT ON ${dish.toUpperCase()}! 🤯\n\nI just beat ${activeDuel.from}'s savings streak!\nTracked a simulated beggy rider for ₹${amt} ${dish}.\nRider arrived. Food was fake. ₹${amt} stayed in my bank account! 💸\n\n0 calories. 100% money kept.\nThink you have better willpower? Beat me here 👇\n${challengeUrl}`;
    } else {
      whatsappText = `🚨 BRO I JUST GOT A 100% DISCOUNT ON ${dish.toUpperCase()}! 🤯\n\nI was literally about to blow ₹${amt} on food delivery.\nWatched the rider cross the city, live on the map.\nPlot twist: THE FOOD WAS FAKE. The rider doesn't exist.\n₹${amt} is STILL sitting in my bank account! 💸\n\nCalories: 0. Bank balance: intact.\nDare you to resist your next 2 AM takeout craving. Duel me 👇\n${challengeUrl}`;
    }

    const twitterText = `🚨 Just unlocked a 100% DISCOUNT on ${dish} 🍗❌\nWatched a fake rider all the way to my door.\nTotal paid: ₹0.00.\nTotal saved with Beggy: ₹${amt}!\n\n${challengeUrl}\n#Beggy #SaveMoney #100PercentOff #Discipline`;

    const instagramText = `100% DISCOUNT ON ${dish.toUpperCase()} 🛵💨\nDelivery bill: ₹0. Bank balance: +₹${amt}. Willpower: 100/100.\nFood was fake, savings are REAL.\nDuel me before your next 2 AM order 👇\n${challengeUrl}\n\n#Beggy #SaveMoney #100PercentOff #Discipline`;

    const linkedinText = `🚨 Just unlocked a 100% DISCOUNT on ${dish} 🍗❌\nWatched a fake rider all the way to my door.\nTotal paid: ₹0.00.\nTotal saved with Beggy: ₹${amt}!\n\n${challengeUrl}\n#Beggy #SaveMoney #100PercentOff #Discipline`;

    return {
      name: cleanName,
      amt,
      dish,
      challengeUrl,
      whatsappText,
      twitterText,
      instagramText,
      linkedinText
    };
  }

  function updateSharePreview() {
    const previewEl = document.getElementById('rtb-preview-text');
    if (!previewEl) return;
    const data = getChallengeData();

    if (activeTemplateTab === 'whatsapp') {
      previewEl.value = data.whatsappText;
    } else if (activeTemplateTab === 'twitter') {
      previewEl.value = data.twitterText;
    } else if (activeTemplateTab === 'instagram') {
      previewEl.value = data.instagramText;
    } else if (activeTemplateTab === 'linkedin') {
      previewEl.value = data.linkedinText;
    }
  }

  function updateWhatsAppLink() {
    const nameInput = document.getElementById('reveal-name-input');
    const waBtn = document.getElementById('btn-reveal-whatsapp');
    if (!waBtn) return;

    const rawName = nameInput ? nameInput.value : '';
    const cleanName = sanitizeName(rawName);

    // Disable / dim the WhatsApp button until the name field has >= 2 letters
    if (cleanName.length < 2) {
      waBtn.classList.add('disabled');
      waBtn.removeAttribute('href');
    } else {
      waBtn.classList.remove('disabled');
      const data = getChallengeData();
      waBtn.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(data.whatsappText)}`;
    }

    updateSharePreview();
  }

  // ── The Reveal Screen ───────────────────────────────────────────────────────
  function showRevealScreen() {
    const reveal = document.getElementById('reveal-screen');
    if (!reveal) return;

    const rupeeVal = document.getElementById('reveal-rupee-val');
    const dishTag = document.getElementById('reveal-dish-tag');
    const timeTag = document.getElementById('reveal-time-tag');
    const receiptAmt = document.getElementById('r-receipt-amt');
    const receiptDishName = document.getElementById('r-receipt-dish-name');
    const receiptOriginal = document.getElementById('r-receipt-original');
    const nameInput = document.getElementById('reveal-name-input');
    const racDishTitle = document.getElementById('rac-dish-title');
    const racDishDesc = document.getElementById('rac-dish-desc');
    const rzcDishDesc = document.getElementById('rzc-dish-desc');

    const amt = Math.round(lastOrderSummary.amount || 458);
    const dish = lastOrderSummary.dish || 'Biryani';

    if (rupeeVal) rupeeVal.textContent = amt;
    if (dishTag) dishTag.textContent = dish;
    if (timeTag) timeTag.textContent = lastOrderSummary.time || '11:42 pm';
    if (receiptAmt) receiptAmt.textContent = `INR ${amt}.00 KEPT IN YOUR ACCOUNT`;
    if (receiptDishName) receiptDishName.textContent = dish;
    if (receiptOriginal) receiptOriginal.textContent = `₹${amt}.00`;

    if (rzcDishDesc) {
      rzcDishDesc.textContent = `You beat a ₹${amt} ${dish}. If you truly need a snack, get something small on Zepto. It actually shows up, unlike our rider.`;
    }
    if (racDishTitle) racDishTitle.textContent = `Cook ${dish} yourself for a fraction of the bill`;
    if (racDishDesc) racDishDesc.textContent = `Stock up on ingredients for ${dish}. Real food, much cheaper, zero delivery fee drama.`;

    if (nameInput) {
      const saved = localStorage.getItem('beggyName') || '';
      if (saved) nameInput.value = saved;
    }

    updateWhatsAppLink();
    updateSharePreview();
    renderReceiptCanvas();
    reveal.style.display = 'flex';
  }

  // ── 100% DISCOUNT SHOCK PROOF CANVAS GENERATOR (9:16 STORY FORMAT) ──────────
  function renderReceiptCanvas() {
    const canvas = document.getElementById('receipt-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = getChallengeData();
    const amt = data.amt;
    const dish = data.dish;
    const cleanName = data.name || 'Discipline Master';
    const restaurant = lastOrderSummary.restaurant || 'Hyderabadi Spice Express';
    const time = lastOrderSummary.time || '11:42 pm';

    // Canvas dimensions: 1080 x 1920 (9:16)
    canvas.width = 1080;
    canvas.height = 1920;

    // 1. Dark Premium Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
    bgGrad.addColorStop(0, '#090D16');
    bgGrad.addColorStop(0.5, '#0E1422');
    bgGrad.addColorStop(1, '#080C14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1920);

    // 2. High-Tech Grid Pattern Accent
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 60; x < 1080; x += 120) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, 1860);
      ctx.stroke();
    }
    for (let y = 60; y < 1920; y += 120) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(1020, y);
      ctx.stroke();
    }

    // 3. Double Outer Border with Glowing Neon Accents
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, 980, 1820);

    ctx.strokeStyle = '#FC8019';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(50, 180);
    ctx.lineTo(50, 50);
    ctx.lineTo(180, 50);
    ctx.stroke();

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(1030, 1740);
    ctx.lineTo(1030, 1870);
    ctx.lineTo(900, 1870);
    ctx.stroke();

    // 4. Brand Header
    ctx.fillStyle = '#FC8019';
    ctx.font = '900 68px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('beggy', 540, 140);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '800 24px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('BEGGY PROTOCOL • ZERO REAL FOOD', 540, 180);

    // 5. Simulated Order Cancellation Notice Pill
    ctx.fillStyle = '#161F30';
    ctx.beginPath();
    ctx.roundRect(120, 220, 840, 90, 45);
    ctx.fill();
    ctx.strokeStyle = 'rgba(252, 128, 25, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 27px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🛵 Delivery Order Ghosted • 100% Retained in Bank', 540, 275);

    // 6. Massive Shock Punchline: ORDER FOOD FOR FREE.
    ctx.fillStyle = '#38BDF8';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText(`USER: ${cleanName.toUpperCase()} // STATEMENT OF NON-PURCHASE`, 540, 370);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 68px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '-1px';
    ctx.fillText('ORDER FOOD FOR FREE.', 540, 440);

    // 7. Giant Glowing Emerald Rupees
    ctx.fillStyle = '#00F59B';
    ctx.font = '900 170px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`+₹${amt}`, 540, 595);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('...FOR THE FOOD THAT NEVER COMES.', 540, 665);

    // 8. Simulated Food Delivery Bill Receipt Box
    ctx.fillStyle = '#111726';
    ctx.beginPath();
    ctx.roundRect(100, 720, 880, 560, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Food Name
    ctx.fillStyle = '#F8FAFC';
    ctx.font = '900 48px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(dish, 540, 800);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${restaurant} • ${time}`, 540, 850);

    // Bill breakdown
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Original Takeout Bill:', 160, 930);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#F1F5F9';
    ctx.fillText(`₹${amt}.00`, 920, 930);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#10B981';
    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Coupon \'WILLPOWER100\':', 160, 990);
    ctx.textAlign = 'right';
    ctx.fillText(`-₹${amt}.00 (100% OFF)`, 920, 990);

    // Divider line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(160, 1030);
    ctx.lineTo(920, 1030);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 36px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('FINAL BILL TO PAY:', 160, 1090);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#10B981';
    ctx.fillText('₹0.00', 920, 1090);

    // Slanted Stamp: CRAVING DEFEATED
    ctx.save();
    ctx.translate(540, 1190);
    ctx.rotate(-0.06);
    ctx.fillStyle = '#EF4444';
    ctx.font = '900 44px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.strokeStyle = '#EF4444';
    ctx.lineWidth = 5;
    ctx.strokeRect(-290, -42, 580, 78);
    ctx.fillText('CRAVING GHOSTED • 0 CALORIES', 0, 12);
    ctx.restore();

    // 9. Shock FOMO Duel Callout
    ctx.textAlign = 'center';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 38px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${cleanName} stood ground and saved ₹${amt}.`, 540, 1370);

    ctx.fillStyle = '#F59E0B';
    ctx.font = '700 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Can your bank balance survive tonight?', 540, 1420);

    // 10. Scannable Duel Target Box & QR Code
    ctx.fillStyle = '#161F30';
    ctx.beginPath();
    ctx.roundRect(200, 1470, 680, 240, 20);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Render live QR Code into target box
    const qrUri = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(data.challengeUrl)}`;
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 230, 1500, 180, 180);
    };
    qrImg.src = qrUri;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SCAN OR TAP TO DUEL', 440, 1560);

    ctx.fillStyle = '#10B981';
    ctx.font = '800 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('beggy.vercel.app', 440, 1610);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Beat my discipline streak!', 440, 1655);

    // 11. Student Founder Footer & Viral Hashtags
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748B';
    ctx.font = '700 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('🎓 Built by Young Student Founder • 100% Free & Zero Ads', 540, 1780);
    ctx.fillStyle = '#00F59B';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('#Beggy #SaveMoney #100PercentOff #Discipline', 540, 1820);
  }

  // ── 1-Tap Download Image Helper ─────────────────────────────────────────────
  function downloadReceiptImage() {
    renderReceiptCanvas();
    const canvas = document.getElementById('receipt-canvas');
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      const amt = Math.round(lastOrderSummary.amount || 458);
      const dishSlug = (lastOrderSummary.dish || 'food').toLowerCase().replace(/[^a-z0-9]/g, '-');
      a.download = `beggy-100-discount-${dishSlug}-₹${amt}.png`;
      a.click();
      showShareToast('✓ 100% Discount Card Downloaded! Ready to post!');
    } catch (e) {
      showShareToast('Screenshot saved! Take a screenshot to post.');
    }
  }

  // ── 1-Tap Share with Image (Web Share API with Blob) ────────────────────────
  async function shareReceiptImageAndChallenge() {
    const data = getChallengeData();
    renderReceiptCanvas();
    const canvas = document.getElementById('receipt-canvas');

    if (navigator.share && canvas) {
      try {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const file = new File([blob], `beggy-100-discount-₹${data.amt}.png`, { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Beggy 100% Discount Craving Challenge',
              text: data.whatsappText,
              files: [file]
            });
            showShareToast('✓ Shared with 100% discount shock proof!');
            return;
          }
        }
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    // Fallback: Download image and open WhatsApp with formatted text
    downloadReceiptImage();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(data.whatsappText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showShareToast('✓ Shock card downloaded & WhatsApp opened!');
  }

  // ── Platform Draft & Share Assistant Modal (LinkedIn & Instagram Story) ─────
  function openDraftAssistantModal(platform) {
    const modal = document.getElementById('draft-modal');
    if (!modal) return;

    const data = getChallengeData();
    const badge = document.getElementById('draft-badge');
    const title = document.getElementById('draft-title');
    const sub = document.getElementById('draft-sub');
    const textarea = document.getElementById('draft-modal-text');
    const step1 = document.getElementById('step-1-text');
    const step2 = document.getElementById('step-2-text');
    const step3 = document.getElementById('step-3-text');
    const proceedBtn = document.getElementById('btn-draft-proceed');
    const copyAgainBtn = document.getElementById('btn-draft-copy-again');

    if (platform === 'linkedin') {
      copyTextWithFallback(data.linkedinText);
      if (badge) {
        badge.textContent = '💼 LINKEDIN DRAFT COPIED';
        badge.style.color = '#38BDF8';
        badge.style.borderColor = 'rgba(56, 189, 248, 0.4)';
        badge.style.background = 'rgba(56, 189, 248, 0.12)';
      }
      if (title) title.textContent = 'Ready to Post on LinkedIn!';
      if (sub) sub.textContent = "LinkedIn requires you to paste your text. We've copied your pre-written post to your clipboard!";
      if (textarea) textarea.value = data.linkedinText;
      if (step1) step1.innerHTML = 'Tap <strong>"Open LinkedIn Composer ➔"</strong> below.';
      if (step2) step2.innerHTML = 'In the LinkedIn box, press <strong>Paste (Ctrl+V / Long-Press)</strong>.';
      if (step3) step3.innerHTML = 'Your post text & the <strong>ORDER FOOD FOR FREE</strong> card appear automatically!';
      if (proceedBtn) {
        proceedBtn.textContent = '🚀 Open LinkedIn Composer ➔';
        proceedBtn.className = 'btn-draft-proceed';
        proceedBtn.onclick = (e) => {
          e.preventDefault();
          const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(data.challengeUrl)}`;
          window.open(url, '_blank', 'noopener,noreferrer');
        };
      }
      if (copyAgainBtn) {
        copyAgainBtn.onclick = () => {
          copyTextWithFallback(data.linkedinText);
          showShareToast('✓ LinkedIn draft copied again!');
        };
      }
    } else if (platform === 'instagram') {
      copyTextWithFallback(data.instagramText);
      if (badge) {
        badge.textContent = '📸 9:16 STORY CARD READY';
        badge.style.color = '#F472B6';
        badge.style.borderColor = 'rgba(244, 114, 182, 0.4)';
        badge.style.background = 'rgba(244, 114, 182, 0.12)';
      }
      if (title) title.textContent = 'Post to Instagram Story!';
      if (sub) sub.textContent = 'Your high-res 9:16 story card is downloaded & caption copied to your clipboard!';
      if (textarea) textarea.value = data.instagramText;
      if (step1) step1.innerHTML = 'Open the Instagram app (or tap <strong>"Open Instagram ➔"</strong> below).';
      if (step2) step2.innerHTML = 'Tap <strong>"+"</strong> ➔ <strong>Story</strong>, then pick the downloaded receipt image.';
      if (step3) step3.innerHTML = 'Tap text/stickers in Instagram and <strong>Paste</strong> your caption!';
      if (proceedBtn) {
        proceedBtn.textContent = '📱 Open Instagram ➔';
        proceedBtn.className = 'btn-draft-proceed insta-btn';
        proceedBtn.onclick = (e) => {
          e.preventDefault();
          window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
        };
      }
      if (copyAgainBtn) {
        copyAgainBtn.onclick = () => {
          downloadReceiptImage();
          copyTextWithFallback(data.instagramText);
          showShareToast('✓ Story card downloaded & caption copied!');
        };
      }
    }

    modal.style.display = 'flex';
  }

  function closeDraftAssistantModal() {
    const modal = document.getElementById('draft-modal');
    if (modal) modal.style.display = 'none';
  }

  // ── "The Bill You Kept" Passbook Modal ──────────────────────────────────────
  function initPassbookModal() {
    const billBtn = document.getElementById('header-bill-btn');
    const modal = document.getElementById('passbook-modal');
    const closeBtn = document.getElementById('pb-close-btn');
    const doneBtn = document.getElementById('pb-done-btn');
    const resetBtn = document.getElementById('pb-reset-btn');
    const copyUpiBtn = document.getElementById('btn-copy-upi');
    const founderChaiBtn = document.getElementById('founder-chai-btn');

    function openModal() {
      const totalEl = document.getElementById('pb-total-val');
      const streakEl = document.getElementById('pb-streak-val');
      const roastEl = document.getElementById('pb-roast-banner');
      const listEl = document.getElementById('pb-history-list');

      if (totalEl) totalEl.textContent = `₹${Math.floor(userKeptState.totalKept)}`;
      const st = liveStreak();
      if (streakEl) streakEl.textContent = `🔥 ${st}-day streak`;

      if (roastEl) {
        const mk = Math.floor(monthKept());
        if (mk > 0) {
          roastEl.textContent = `"This month you didn't spend ₹${mk.toLocaleString('en-IN')} on food that would have been cold anyway. Don't be the clown who opens delivery apps tonight."`;
        } else if (userKeptState.totalKept > 0) {
          roastEl.textContent = `"All-time you've kept ₹${Math.floor(userKeptState.totalKept).toLocaleString('en-IN')}. Nothing yet this month. Tonight's a good night to start."`;
        } else {
          roastEl.textContent = `"Your bill is ₹0. Order your first fake takeout and keep the rupees in your pocket."`;
        }
      }

      if (listEl) {
        if (userKeptState.history.length === 0) {
          listEl.innerHTML = `<p style="font-size:0.75rem; color:var(--text-muted); text-align:center; padding:12px;">No avoided orders yet. Go crave something.</p>`;
        } else {
          listEl.innerHTML = userKeptState.history.slice(0, 15).map(h => `
            <div class="pb-item">
              <div>
                <div class="pb-item-dish">${escapeHtml(h.dish)}</div>
                <div class="pb-item-meta">${escapeHtml(h.restaurant)} • ${escapeHtml(h.date)}</div>
              </div>
              <div class="pb-item-amt">₹${Math.round(h.amount)}</div>
            </div>
          `).join('');
        }
      }

      if (modal) modal.style.display = 'flex';
    }

    if (billBtn) billBtn.addEventListener('click', openModal);
    if (founderChaiBtn) founderChaiBtn.addEventListener('click', openModal);

    const pbBackBtn = document.getElementById('pb-back-btn');
    if (pbBackBtn && modal) pbBackBtn.addEventListener('click', () => modal.style.display = 'none');
    if (closeBtn && modal) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    if (doneBtn && modal) doneBtn.addEventListener('click', () => modal.style.display = 'none');

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset your saved bills and streak?')) {
          userKeptState = { totalKept: 0, streak: 0, lastKeptDate: '', history: [] };
          saveUserKeptState();
          openModal();
        }
      });
    }

    if (copyUpiBtn) {
      copyUpiBtn.addEventListener('click', () => {
        navigator.clipboard.writeText('arunking156-2@oksbi').then(() => {
          copyUpiBtn.textContent = '✓ Copied UPI!';
          setTimeout(() => { copyUpiBtn.textContent = '📋 Copy UPI'; }, 2000);
        }).catch(() => {
          alert('UPI ID: arunking156-2@oksbi');
        });
      });
    }
  }

  // ── Event Handlers & Page Initialization ────────────────────────────────────
  function initEvents() {
    // Craving button scrolls to kitchens
    const cravingBtn = document.getElementById('hero-craving-btn');
    if (cravingBtn) {
      cravingBtn.addEventListener('click', () => {
        const browseSec = document.getElementById('browse-section');
        if (browseSec) browseSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Duel Accept Button
    const duelAcceptBtn = document.getElementById('duel-accept-btn');
    if (duelAcceptBtn) {
      duelAcceptBtn.addEventListener('click', () => {
        const duelScreen = document.getElementById('duel-screen');
        const activeDuelStrip = document.getElementById('active-duel-strip');
        const adsName = document.getElementById('ads-name');
        const adsTarget = document.getElementById('ads-target');

        if (duelScreen) duelScreen.style.display = 'none';

        if (activeDuel && activeDuelStrip) {
          if (adsName) adsName.textContent = activeDuel.from;
          if (adsTarget) adsTarget.textContent = `₹${activeDuel.amount}`;
          activeDuelStrip.style.display = 'flex';
        }

        const browseSec = document.getElementById('browse-section');
        if (browseSec) browseSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Dismiss active duel strip
    const adsDismiss = document.getElementById('ads-dismiss');
    if (adsDismiss) {
      adsDismiss.addEventListener('click', () => {
        const strip = document.getElementById('active-duel-strip');
        if (strip) strip.style.display = 'none';
        activeDuel = null;
      });
    }

    // Skip duel and browse normally
    const duelSkipBtn = document.getElementById('duel-skip-btn');
    if (duelSkipBtn) {
      duelSkipBtn.addEventListener('click', () => {
        const duelScreen = document.getElementById('duel-screen');
        const strip = document.getElementById('active-duel-strip');
        if (duelScreen) duelScreen.style.display = 'none';
        if (strip) strip.style.display = 'none';
        activeDuel = null;
        const browseSec = document.getElementById('browse-section');
        if (browseSec) browseSec.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Search filter
    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        if (searchClear) searchClear.style.display = searchQuery ? 'block' : 'none';
        renderKitchens();
      });
    }
    if (searchClear && searchInput) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        renderKitchens();
      });
    }

    // Cuisine Chips
    document.querySelectorAll('.c-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('.c-chip').forEach(c => c.classList.remove('active'));
        e.currentTarget.classList.add('active');
        activeFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        renderKitchens();
      });
    });

    // Cart Open / Close
    const headerCartBtn = document.getElementById('header-cart-btn');
    const floatingProceedBtn = document.getElementById('fc-proceed-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');

    const cartBackBtn = document.getElementById('cart-back-btn');
    const cartKeepBrowsingBtn = document.getElementById('cart-keep-browsing-btn');

    if (headerCartBtn) headerCartBtn.addEventListener('click', openCartDrawer);
    if (floatingProceedBtn) floatingProceedBtn.addEventListener('click', openCartDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartBackBtn) cartBackBtn.addEventListener('click', closeCartDrawer);
    if (cartKeepBrowsingBtn) cartKeepBrowsingBtn.addEventListener('click', closeCartDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeCartDrawer);

    // Tracking Screen Back / Exit Button
    const trackBackBtn = document.getElementById('track-back-btn');
    if (trackBackBtn) {
      trackBackBtn.addEventListener('click', () => {
        if (confirm('Cancel simulation and return to restaurants?')) {
          if (trackingTimer) {
            clearInterval(trackingTimer);
            trackingTimer = null;
          }
          const trackingScreen = document.getElementById('tracking-screen');
          if (trackingScreen) trackingScreen.style.display = 'none';
          const appMain = document.getElementById('app-main');
          if (appMain) appMain.style.display = 'block';
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showShareToast('Simulation ended. Returned to kitchens.');
        }
      });
    }

    // Tracking Speed Controls
    document.querySelectorAll('.speed-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sp = btn.getAttribute('data-speed');
        if (sp === 'skip') {
          if (trackingTimer) clearInterval(trackingTimer);
          finishTrackingMovie();
        } else {
          simSpeedMultiplier = Number(sp) || 1;
          updateSpeedControlsUI();
        }
      });
    });

    // Reveal Name Input Listener
    const nameInput = document.getElementById('reveal-name-input');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        const val = sanitizeName(e.target.value);
        localStorage.setItem('beggyName', val);
        updateWhatsAppLink();
        renderReceiptCanvas();
      });
    }

    // Panic Button & Modal
    const btnPanic = document.getElementById('btn-panic');
    const panicModal = document.getElementById('panic-modal');
    const panicResume = document.getElementById('panic-resume-btn');
    if (btnPanic && panicModal) {
      btnPanic.addEventListener('click', () => {
        panicModal.style.display = 'flex';
      });
    }
    if (panicResume && panicModal) {
      panicResume.addEventListener('click', () => {
        panicModal.style.display = 'none';
      });
    }

    // Reveal Screen Actions
    const btnDownload = document.getElementById('btn-reveal-download');
    if (btnDownload) {
      btnDownload.addEventListener('click', downloadReceiptImage);
    }

    const btnShareWithImage = document.getElementById('btn-share-with-image');
    if (btnShareWithImage) {
      btnShareWithImage.addEventListener('click', shareReceiptImageAndChallenge);
    }

    const waBtn = document.getElementById('btn-reveal-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', (e) => {
        // If on mobile device with file sharing, share image alongside text
        const canvas = document.getElementById('receipt-canvas');
        if (navigator.share && canvas && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          e.preventDefault();
          shareReceiptImageAndChallenge();
        }
      });
    }

    // Reveal Screen Back & Reset Navigation
    const revealTopBackBtn = document.getElementById('reveal-top-back-btn');
    const btnRestart = document.getElementById('btn-reveal-restart');
    const exitRevealToHome = () => {
      const reveal = document.getElementById('reveal-screen');
      if (reveal) reveal.style.display = 'none';
      const appMain = document.getElementById('app-main');
      if (appMain) appMain.style.display = 'block';
      cart = [];
      updateCartBadge();
      renderCartDrawer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (revealTopBackBtn) revealTopBackBtn.addEventListener('click', exitRevealToHome);
    if (btnRestart) btnRestart.addEventListener('click', exitRevealToHome);

    // Post-Delivery Celebration Modal Controls
    const pdmClose = document.getElementById('pdm-close-btn');
    const pdmNext = document.getElementById('pdm-next-btn');
    const pdmDismiss = document.getElementById('pdm-dismiss-btn');
    const pdmModal = document.getElementById('post-delivery-modal');
    const pdmBackTopBtn = document.getElementById('pdm-back-top-btn');
    const pdmBackHomeBtn = document.getElementById('pdm-back-home-btn');

    const exitPdmToHome = () => {
      hidePostDeliveryModal();
      const reveal = document.getElementById('reveal-screen');
      if (reveal) reveal.style.display = 'none';
      const appMain = document.getElementById('app-main');
      if (appMain) appMain.style.display = 'block';
      cart = [];
      updateCartBadge();
      renderCartDrawer();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (pdmClose) pdmClose.addEventListener('click', hidePostDeliveryModal);
    if (pdmNext) pdmNext.addEventListener('click', hidePostDeliveryModal);
    if (pdmDismiss) pdmDismiss.addEventListener('click', hidePostDeliveryModal);
    if (pdmBackTopBtn) pdmBackTopBtn.addEventListener('click', exitPdmToHome);
    if (pdmBackHomeBtn) pdmBackHomeBtn.addEventListener('click', exitPdmToHome);
    if (pdmModal) {
      pdmModal.addEventListener('click', (e) => {
        if (e.target === pdmModal) hidePostDeliveryModal();
      });
    }

    // Native browser & mobile hardware Back button support
    window.addEventListener('popstate', () => {
      const reveal = document.getElementById('reveal-screen');
      if (reveal && reveal.style.display !== 'none') {
        exitRevealToHome();
        return;
      }
      const pdm = document.getElementById('post-delivery-modal');
      if (pdm && pdm.style.display !== 'none') {
        hidePostDeliveryModal();
        return;
      }
      const pb = document.getElementById('passbook-modal');
      if (pb && pb.style.display !== 'none') {
        pb.style.display = 'none';
        const backdrop = document.getElementById('passbook-backdrop');
        if (backdrop) backdrop.style.display = 'none';
        return;
      }
      const co = document.getElementById('checkout-modal');
      if (co && co.style.display !== 'none') {
        co.style.display = 'none';
        openCartDrawer();
        return;
      }
      const cartDrawer = document.getElementById('cart-drawer');
      if (cartDrawer && cartDrawer.classList.contains('open')) {
        closeCartDrawer();
        return;
      }
      const track = document.getElementById('tracking-screen');
      if (track && track.style.display !== 'none') {
        if (trackingTimer) {
          clearInterval(trackingTimer);
          trackingTimer = null;
        }
        track.style.display = 'none';
        const appMain = document.getElementById('app-main');
        if (appMain) appMain.style.display = 'block';
        return;
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePostDeliveryModal();
    });

    // Post-Delivery Modal Founder Tip Controls
    const pdmPillsRow = document.getElementById('pdm-pills-row');
    const pdmCustomWrap = document.getElementById('pdm-custom-wrap');
    const pdmCustomInput = document.getElementById('pdm-custom-input');
    const pdmCustomApplyBtn = document.getElementById('pdm-custom-apply-btn');
    const pdmAnyToggle = document.getElementById('pdm-any-toggle');

    if (pdmPillsRow) {
      const pills = pdmPillsRow.querySelectorAll('.pdm-pill:not(#pdm-any-toggle)');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          if (pdmCustomWrap) pdmCustomWrap.style.display = 'none';
          const amt = Number(pill.getAttribute('data-amount')) || 10;
          updatePdmTipUI(amt);
        });
      });
    }

    if (pdmAnyToggle) {
      pdmAnyToggle.addEventListener('click', () => {
        if (pdmPillsRow) {
          pdmPillsRow.querySelectorAll('.pdm-pill').forEach(p => p.classList.remove('active'));
        }
        pdmAnyToggle.classList.add('active');
        if (pdmCustomWrap) {
          const isHidden = pdmCustomWrap.style.display === 'none' || !pdmCustomWrap.style.display;
          pdmCustomWrap.style.display = isHidden ? 'flex' : 'none';
          if (isHidden && pdmCustomInput) {
            pdmCustomInput.focus();
            const amt = Number(pdmCustomInput.value) || 500;
            updatePdmTipUI(amt);
          }
        }
      });
    }

    if (pdmCustomApplyBtn && pdmCustomInput) {
      pdmCustomApplyBtn.addEventListener('click', () => {
        const amt = Math.max(1, Math.min(50000, Number(pdmCustomInput.value) || 500));
        pdmCustomInput.value = amt;
        updatePdmTipUI(amt);
      });
      pdmCustomInput.addEventListener('input', () => {
        const val = Number(pdmCustomInput.value);
        if (val && val > 0) updatePdmTipUI(Math.min(50000, val));
      });
    }

    // Desktop QR code toggle in Post-Delivery Modal
    const pdmQrToggleBtn = document.getElementById('pdm-qr-toggle-btn');
    const pdmQrBox = document.getElementById('pdm-qr-box');
    if (pdmQrToggleBtn && pdmQrBox) {
      pdmQrToggleBtn.addEventListener('click', () => {
        const isHidden = pdmQrBox.style.display === 'none' || !pdmQrBox.style.display;
        pdmQrBox.style.display = isHidden ? 'flex' : 'none';
      });
    }

    // Copy UPI ID in Post-Delivery Modal
    const pdmCopyUpiBtn = document.getElementById('pdm-copy-upi-btn');
    if (pdmCopyUpiBtn) {
      pdmCopyUpiBtn.addEventListener('click', () => {
        const idToCopy = 'arunking156-2@oksbi';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(idToCopy).then(() => {
            showShareToast('✓ UPI ID copied: ' + idToCopy);
            pdmCopyUpiBtn.textContent = '✓ Copied to Clipboard!';
            setTimeout(() => { pdmCopyUpiBtn.textContent = '📋 Copy UPI ID'; }, 2500);
          }).catch(() => {
            showShareToast('UPI ID: ' + idToCopy);
          });
        } else {
          showShareToast('UPI ID: ' + idToCopy);
        }
      });
    }

    // UPI Button Click helper (if desktop, automatically show QR)
    const pdmUpiBtn = document.getElementById('pdm-upi-btn');
    if (pdmUpiBtn) {
      pdmUpiBtn.addEventListener('click', () => {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (!isMobile && pdmQrBox) {
          pdmQrBox.style.display = 'flex';
        }
      });
    }

    // Multi-Platform Social Share Buttons
    const twitterBtn = document.getElementById('btn-share-twitter');
    if (twitterBtn) {
      twitterBtn.addEventListener('click', () => {
        const data = getChallengeData();
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(data.twitterText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    const igBtn = document.getElementById('btn-share-instagram');
    if (igBtn) {
      igBtn.addEventListener('click', async () => {
        const data = getChallengeData();
        renderReceiptCanvas();
        const canvas = document.getElementById('receipt-canvas');

        // On mobile, attempt Web Share API with the story receipt image file
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        if (isMobile && navigator.share && canvas) {
          try {
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
            if (blob) {
              const file = new File([blob], `beggy-story-₹${data.amt}.png`, { type: 'image/png' });
              if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                  title: 'Beggy 100% Discount Craving Challenge',
                  text: data.instagramText,
                  files: [file]
                });
                showShareToast('✓ Shared to Stories!');
                return;
              }
            }
          } catch (err) {
            if (err && err.name === 'AbortError') return;
          }
        }

        // Auto-download 9:16 high-res card and open the Draft Assistant Modal
        downloadReceiptImage();
        openDraftAssistantModal('instagram');
      });
    }

    const tgBtn = document.getElementById('btn-share-telegram');
    if (tgBtn) {
      tgBtn.addEventListener('click', () => {
        const data = getChallengeData();
        const url = `https://t.me/share/url?url=${encodeURIComponent(data.challengeUrl)}&text=${encodeURIComponent(data.whatsappText)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
      });
    }

    const liBtn = document.getElementById('btn-share-linkedin');
    if (liBtn) {
      liBtn.addEventListener('click', () => {
        const data = getChallengeData();
        copyTextWithFallback(data.linkedinText);

        // Switch to LinkedIn template tab so user sees the copied text right away
        const rtbTabs = document.querySelectorAll('.rtb-tab');
        const liTab = document.querySelector('.rtb-tab[data-tab="linkedin"]');
        if (liTab && rtbTabs.length) {
          rtbTabs.forEach(t => t.classList.remove('active'));
          liTab.classList.add('active');
          activeTemplateTab = 'linkedin';
          updateSharePreview();
        }

        // Open Draft Assistant Modal with 1-tap composer launcher
        openDraftAssistantModal('linkedin');
      });
    }

    const copyBtn = document.getElementById('btn-share-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const data = getChallengeData();
        copyTextWithFallback(data.challengeUrl);
        showShareToast('📋 Challenge link copied to clipboard!');
      });
    }

    const nativeBtn = document.getElementById('btn-share-native');
    if (nativeBtn) {
      nativeBtn.addEventListener('click', async () => {
        const data = getChallengeData();
        if (navigator.share) {
          try {
            await navigator.share({
              title: 'Beggy Savings Challenge',
              text: data.whatsappText,
              url: data.challengeUrl
            });
          } catch (err) {
            if (err && err.name !== 'AbortError') {
              copyTextWithFallback(data.challengeUrl);
              showShareToast('📋 Challenge link copied!');
            }
          }
        } else {
          copyTextWithFallback(data.challengeUrl);
          showShareToast('📋 Challenge link copied to clipboard!');
        }
      });
    }

    // Easy-to-Paste Template Tabs
    const rtbTabs = document.querySelectorAll('.rtb-tab');
    rtbTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        rtbTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        activeTemplateTab = tab.getAttribute('data-tab') || 'whatsapp';
        updateSharePreview();
      });
    });

    // Easy-to-Paste Copy Button
    const copyTplBtn = document.getElementById('btn-copy-template');
    if (copyTplBtn) {
      copyTplBtn.addEventListener('click', () => {
        const previewEl = document.getElementById('rtb-preview-text');
        if (!previewEl) return;
        const textToCopy = previewEl.value;
        copyTextWithFallback(textToCopy);
        const tabLabel = activeTemplateTab.charAt(0).toUpperCase() + activeTemplateTab.slice(1);
        showShareToast(`✓ ${tabLabel} template copied! Ready to paste!`);
      });
    }

    // Draft Assistant Modal Close Listeners
    const draftModal = document.getElementById('draft-modal');
    const draftCloseBtn = document.getElementById('draft-modal-close');
    if (draftCloseBtn) {
      draftCloseBtn.addEventListener('click', closeDraftAssistantModal);
    }
    if (draftModal) {
      draftModal.addEventListener('click', (e) => {
        if (e.target === draftModal) closeDraftAssistantModal();
      });
    }
  }

  // ── Theme Manager (Light theme is default) ───────────────────────────────────
  function getPreferredTheme() {
    const saved = localStorage.getItem('beggyTheme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light'; // Light theme default
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('beggyTheme', theme);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    const themeBtn = document.getElementById('header-theme-btn');
    if (themeBtn) {
      themeBtn.setAttribute('title', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
      themeBtn.setAttribute('aria-label', theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode');
    }

    updateMapTiles();
  }

  function initTheme() {
    const current = getPreferredTheme();
    applyTheme(current);

    const themeBtn = document.getElementById('header-theme-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const active = document.documentElement.getAttribute('data-theme') || 'light';
        const next = active === 'light' ? 'dark' : 'light';
        applyTheme(next);
      });
    }
  }

  // ── 5-Second Zepto Subtle Bottom Slide Banner ──
  function initZeptoBanner() {
    setTimeout(() => {
      const banner = document.getElementById('zepto-slide-banner');
      if (banner && sessionStorage.getItem('zepto_banner_dismissed') !== 'true') {
        banner.style.display = 'block';
        setTimeout(() => banner.classList.add('show'), 50);
      }
    }, 5000);

    const zsbCloseBtn = document.getElementById('zsb-close-btn');
    if (zsbCloseBtn) {
      zsbCloseBtn.addEventListener('click', () => {
        const banner = document.getElementById('zepto-slide-banner');
        if (banner) {
          banner.classList.remove('show');
          setTimeout(() => banner.style.display = 'none', 400);
          sessionStorage.setItem('zepto_banner_dismissed', 'true');
        }
      });
    }
  }

  // ── Small API for viral.js (ghost orders, leaderboard, analytics) ──────────
  window.BeggyApp = {
    getLastOrder: () => lastOrderSummary,
    getCityKey: () => currentCityKey,
    getCity: () => CITIES[currentCityKey] || CITIES.bengaluru,
    getKept: () => ({ total: userKeptState.totalKept, month: monthKept(), streak: liveStreak() }),
    startGhostRide(order) {
      ghostRide = order;
      startTrackingMovie({ ...order, speed: 6 });
    }
  };

  // ── Initialization Entry Point ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadUserKeptState();
    initLiveTicker();
    initCitySwitcher();
    initCheckout();
    initPassbookModal();
    initEvents();
    initZeptoBanner();

    const isDuel = parseUrlDuel();
    renderKitchens();
    updateCartUI();

    if (!isDuel) {
      // Regular home
      const hero = document.getElementById('hero-ticker-section');
      if (hero) hero.style.display = 'block';
    }
  });

})();
