# Gaurav Kumar Vishvakarma — Portfolio (v2 fresh copy)

**Same React app as your live portfolio** (`iamgaurav.netlify.app`), copied into a
separate folder so you can safely test locally before deploying.

All the rebrand changes from earlier are already included:
- 🔵 "Independent Data Analyst & BI Consultant" branding
- 🔵 New **Services** section (6 tiers with pricing)
- 🔵 Discovery Call CTAs + WhatsApp button
- 🔵 Phone fixed to `+91-8130676651`
- 🔵 AI crawlers unblocked in `robots.txt`
- 🔵 Sitemap expanded to 13 URLs
- 🔵 Meta tags / OG / JSON-LD updated

The **original** portfolio in `C:\Users\gaura\Downloads\portfolio_V1\portfolio` is
untouched — this is a clean testing copy.

---

## 🧪 Test locally (Windows PowerShell / CMD)

### 1. Install dependencies (first time only, ~2 min)
```powershell
cd portfolio-v2
npm install
```

### 2. Run dev server
```powershell
npm start
```
- Browser auto-opens → **http://localhost:3000**
- Live-reload on every save
- Edit `src/data/portfolioData.json` → see changes instantly

### 3. Production build (optional — test the final bundle)
```powershell
npm run build
npx serve -s build
```

---

## 📝 What to edit where

| Task | File |
|---|---|
| Hero text, CTAs, stats | `src/data/portfolioData.json` → `hero` |
| About paragraphs, highlights | `src/data/portfolioData.json` → `about` |
| Services & pricing | `src/data/portfolioData.json` → `services` |
| Tools marquee icons | `src/data/portfolioData.json` → `tools` |
| Skills categories | `src/data/portfolioData.json` → `skills` |
| Experience timeline | `src/data/portfolioData.json` → `experience` |
| Projects (9 items) | `src/data/portfolioData.json` → `projects` |
| Certificates | `src/data/portfolioData.json` → `certificates` |
| Testimonials | `src/data/portfolioData.json` → `testimonials` |
| Contact info | `src/data/portfolioData.json` → `contact` |
| Footer copyright | `src/data/portfolioData.json` → `footer` |
| Colors / spacing / animations | `src/styles/App.css` (2587 lines) |
| Component logic | `src/components/*.js` |
| Routes & pages | `src/App.js`, `src/pages/*.js` |
| Country landing pages | `src/pages/CountryLanding.js` (/in, /uk, /de, /nl) |
| Admin panel | `src/pages/admin/*.js` (login: `/admin`) |
| SEO tags, JSON-LD | `public/index.html` |
| robots / sitemap | `public/robots.txt`, `public/sitemap.xml` |

---

## 🚀 Deploy

### A) Netlify — same as current setup (recommended)

**Drag & drop (quickest first test):**
```powershell
npm run build
```
Then go to https://app.netlify.com/drop → drag the `build/` folder.

**Via Git (auto-deploy on push):**
```powershell
git init
git add .
git commit -m "🚀 portfolio v2 fresh copy — Independent BI Consultant rebrand"
git remote add origin https://github.com/GAURAV19999/portfolio-v2.git
git push -u origin main
```
Then Netlify → New Site from Git → connect this repo.
Netlify auto-detects React CRA (build: `npm run build`, publish: `build`).

### B) Overwrite the existing `iamgaurav.netlify.app` site
Once you're happy with local testing:
1. Netlify Dashboard → `iamgaurav` site → **Deploys** tab
2. Drag your fresh `build/` folder onto the deploys area
3. Live in ~30 seconds

---

## 📦 Folder structure

```
portfolio-v2/
├── public/
│   ├── index.html              ← SEO meta + JSON-LD (updated)
│   ├── robots.txt              ← AI crawlers allowed
│   ├── sitemap.xml             ← 13 URLs
│   ├── manifest.json
│   ├── favicon.* / og-image.png
│   ├── _redirects              ← Netlify SPA fallback
│   ├── downloads/              ← PowerBI-DAX-Quickstart-Pack.pdf
│   └── images/
│       ├── Gaurav.png
│       ├── companies/  (3 logos)
│       ├── projects/   (9 project images)
│       └── certificates/ (12 cert images)
├── src/
│   ├── App.js                  ← Router: /, /in, /uk, /de, /nl, /admin/*
│   ├── index.js
│   ├── pages/
│   │   ├── Home.js             ← main page composition
│   │   ├── CountryLanding.js   ← geo-targeted landing pages
│   │   ├── AdminLogin.js
│   │   └── admin/              ← 9 admin pages (Dashboard, Hero, About, ...)
│   ├── components/
│   │   ├── Navbar.js           ← "Services" link added
│   │   ├── Hero.js
│   │   ├── About.js
│   │   ├── Services.js         ← NEW section
│   │   ├── Tools.js
│   │   ├── Skills.js
│   │   ├── Experience.js
│   │   ├── Projects.js
│   │   ├── Certificates.js
│   │   ├── Testimonials.js
│   │   ├── Contact.js
│   │   ├── Footer.js
│   │   └── admin/ImageUploader.js
│   ├── context/DataContext.js  ← global portfolio data + admin state
│   ├── data/
│   │   ├── portfolioData.json  ← 12 sections, ALL content
│   │   └── initialData.js      ← seed defaults
│   ├── utils/githubPublish.js  ← admin → GitHub publish helper
│   └── styles/App.css          ← 2587 lines (all styling)
├── package.json
├── package-lock.json
├── netlify.toml                ← deploy config
├── .gitignore / .gitattributes / .nvmrc
└── README.md                   ← this file
```

---

## 🔐 Admin panel

- Route: `/admin` → login page
- Credentials: (whatever you set — check `src/pages/AdminLogin.js`)
- Sections: Hero / About / Services (add if not there) / Tools / Skills / Experience / Projects / Certificates / Testimonials / Contact / Messages / Settings
- Publishes changes to GitHub via `src/utils/githubPublish.js`

---

## 🐛 Troubleshooting

**"npm start" errors out with a Node version issue**
→ Use Node 18 or 20 (`.nvmrc` says 20). Run `nvm use 20`.

**Missing icons / broken images**
→ Check console. Font Awesome loads via CDN (in `public/index.html`).

**Port 3000 already in use**
→ Set another: `set PORT=3005 && npm start` (Windows CMD).

**Contact form not sending**
→ Backend is a Google Apps Script Web App:
`https://script.google.com/macros/s/AKfycbwVKs9wNwwOlqSaZU-yu-gT_JkgFl3hyO5CK0wciHDeyMS9s_Nmrixtq_npnUQUCIk4/exec`

**Want to revert to pre-rebrand data**
→ Backup lives in the *original* portfolio folder at
`portfolio/src/data/portfolioData.json.BACKUP_20260712_0409`.

---

## ✅ Sanity check checklist (before deploying)

- [ ] `npm install` completes without errors
- [ ] `npm start` opens the app on localhost:3000
- [ ] Hero shows "Independent Data Analyst & BI Consultant"
- [ ] Services section shows 6 cards with pricing (Retainer marked "Most Popular")
- [ ] Navbar has a "Services" link
- [ ] Phone shows `+91-8130676651` (in Contact section)
- [ ] WhatsApp button works → `https://wa.me/918130676651`
- [ ] Country landings load: `/in`, `/uk`, `/de`, `/nl`
- [ ] Contact form submits successfully
- [ ] Dark/Light toggle works (if applicable in your theme)
- [ ] `npm run build` completes without warnings
- [ ] Test build with `npx serve -s build`

Once all green → deploy 🚀

---

**Built:** 2026-07-12 · Fresh clone of production React portfolio
**Author:** Gaurav Kumar Vishvakarma
**Original live site:** https://iamgaurav.netlify.app
