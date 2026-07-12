# Final Round of Changes — 2026-07-12

## ✅ 1. Navbar — FAQ removed, Blog added

**Before:** About · Services · Skills · Experience · Projects · Certificates · **FAQ** · Contact
**After:** About · Services · Skills · Experience · Projects · Certificates · Contact · **Blog**

FAQ page still exists at `/faq` (accessible via footer, cross-links) — just not in nav.

## ✅ 2. FAQ now on its own page

- Removed from `Home.js` render tree
- New route: `/faq` → `src/pages/FAQPage.js` (uses same FAQ component)
- FAQPage schema (JSON-LD) still emits — SEO intact

## ✅ 3. Currency switcher on Services pricing

- New util: `src/utils/currency.js`
- Auto-detects from browser timezone (Asia/Kolkata → INR, Europe/* → EUR, etc.)
- Manual override dropdown showing: USD · EUR · GBP · INR · AUD · CAD
- Choice persists in `localStorage` (`gkv_currency`)
- Rates baked in (USD 1, EUR 0.92, GBP 0.78, INR 83, AUD 1.52, CAD 1.37) — easy to bump later
- Prices auto-round: nearest 50 for USD/EUR/GBP/CAD/AUD; nearest 500 for INR
- Small "Converted from USD..." note appears when non-USD is active

## ✅ 4. Clean URL bar on nav clicks

- Before: clicking "Skills" put `#skills` in address bar
- After: after smooth-scroll, URL is cleaned back to `/` (via `history.replaceState`)
- Works cross-page too (Blog → Home + auto-scroll + URL cleanup)

## ✅ 5. "Ready to Start?" CTA buttons centered

- `.contact-cta-box` → `text-align: center`
- `.cta-btn-group` → `justify-content: center; align-items: center`
- On mobile: stacks vertically with full-width buttons

## ✅ 6. Full responsive polish

New responsive breakpoints in `src/styles/App.css`:

- **1024px:** Reduced hero gap, tighter card spacing
- **860px:** Hero → single column, About → single column, Contact → single column, Timeline padding fixed, Hero visual hidden
- **640px** (mobile): Everything single-column, buttons full-width, cards 1.25rem padding, section padding 3rem, font sizes reduced sensibly, footer stacked, CTA buttons vertical stack, FAQ text smaller
- **400px** (small phones): Hero stats 2x2 grid, case-study results 2-column, blog post code blocks smaller

Tested layouts on:
- ✅ Desktop 1440px
- ✅ Tablet 900px
- ✅ Mobile 375px

---

## Build stats

```
File sizes after gzip:
  98.65 kB   build/static/js/main.bceb8731.js
  11.6 kB    build/static/css/main.3a67e946.css
```

Compiled successfully — 0 warnings, 0 errors.

---

## Ready for git push

```powershell
cd C:\Users\gaura\Downloads\portfolio-v2

# One-time init if not done
git init
git remote add origin https://github.com/GAURAV19999/portfolio_v1.git
git branch -M main

# Every push cycle
git add .
git commit -m "🚀 Direct-client rebrand: Services + FAQ + Blog + Case Studies + Currency + Responsive"
git push -u origin main
```

Netlify auto-deploys ~2 min after push.
