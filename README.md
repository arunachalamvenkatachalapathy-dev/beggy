# Beggy — Crave It. Simulate It. Save the Bill.

[![Live Demo](https://img.shields.io/badge/Try%20it%20Live-beggy.app-FF5200?style=for-the-badge&logo=vercel)](https://beggy.vercel.app/)

> **The only food delivery app that actually delivers savings.** 

Beggy is a parody food-delivery web app that gives you the full dopamine thrill of ordering takeout at 11 PM—scrolling menus, adding to your cart, and watching the rider approach on a live GPS map. But just as the food "arrives", the app reveals the twist: **the food was never ordered, and the exact bill amount is redirected into your personal savings.**

![Beggy Hero GIF](https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80) 
*(Note: Imagine a hero GIF of the UI and twist here!)*

---

### 💡 Why does this exist?
People don't share tools; they share moments. Late-night cravings often lead to impulsive, expensive food delivery orders. Beggy uses **dopamine substitution**: you get the mechanical satisfaction and anticipation of ordering, but the climax is a proud realization that you conquered your craving and kept your money. 

## 🚀 How it Works (The 45-Second Craving Killer)
1. **Browse or Quick Crave**: Explore 8 iconic Bengaluru kitchens or tap a "Quick Craving" chip (e.g., *₹340 Biryani*).
2. **Checkout (₹0)**: Apply the `BEGGY100` coupon. Your total becomes ₹0.
3. **Live GPS Tracking**: Watch "Manjunath K." navigate Koramangala / Indiranagar streets with an animated scooter marker.
4. **The Reveal**: Just as the rider arrives, confetti explodes! You get a simulated bank SMS confirming the exact amount was "saved", updating your digital passbook and streak counter.

## ✨ Features
- **Authentic Indian Payment Simulation**: Supports UPI (GPay, PhonePe, Paytm), Net Banking, and COD.
- **Dynamic 2D Share Cards**: Generates high-res 1080×1920 Instagram Story / WhatsApp cards of your "saved" amount with a single tap.
- **Friend Challenges**: Send a prank URL to a friend challenging them to resist a craving.
- **Passbook & Streaks**: LocalStorage-powered streak tracker with badges (*First Defeat*, *Midnight Warrior*, *₹5,000 Club*).
- **Cook-at-Home Engine**: Offers a quick recipe to cook your craving at home for a fraction of the cost, complete with Amazon Fresh ingredient links.

---

## 🛡️ Trust & Privacy Notice
**Beggy is a simulation.** 
- No real orders are placed. 
- No real payments are processed. We never ask for your card details or UPI PIN. 
- All data (streaks, passbook) stays entirely local on your device (`localStorage`).
- *As an Amazon Associate I earn from qualifying purchases.*

---

## 💻 Tech Stack & Architecture

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+). Zero build-step for the UI.
- **Mapping**: Leaflet.js with OpenStreetMap tiles.
- **Backend (Optional / API)**: TypeScript, Express, SQLite (`better-sqlite3`).
- **Cryptography**: `secp256k1` signatures and SHA-256 for a tamper-evident savings ledger.

### Local Setup & Tests

1. **Clone the repo**:
   ```bash
   git clone https://github.com/arunachalamvenkatachalapathy-dev/beggy.git
   cd beggy
   ```
2. **Run Frontend**:
   Simply open `docs/index.html` in your browser.
3. **Run Backend (Node or Bun)**:
   ```bash
   bun install
   bun run dev
   ```
4. **Run Tests**:
   ```bash
   bun test
   ```

## 🗺️ Roadmap
- [x] Phase 0: Trust & Polish (Fix design, generic bank SMS, link previews)
- [x] Phase 1: Personalization & Shareable Cards
- [x] Phase 2: Reactivate Passbook & Streaks
- [x] Phase 3a: Weekly city & all-India leaderboards
- [ ] Phase 3b: "Beggy Wrapped"
- [ ] Phase 4: Localization (Hindi, Tamil, Kannada)

## 📄 License
MIT © 2026 arunachalamvenkatachalapathy-dev
