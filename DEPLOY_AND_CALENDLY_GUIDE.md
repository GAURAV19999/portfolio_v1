# 🚀 Final Deploy Guide + Calendly Setup

**Date:** 2026-07-12
**Status:** ✅ Build passing · Zero warnings · Ready for production

---

## 📋 Pre-Deploy Checklist (all ✅)

- [x] **Build compiles cleanly** — `npm run build` → 0 warnings, 0 errors
- [x] **SEO title**: 53 chars (ideal: 40–60)
- [x] **Meta description**: 142 chars (ideal: 120–160)
- [x] **Currency dropdown visible** — `overflow: visible` on services section, `z-index: 9999` on dropdown
- [x] **16 unique JSON-LD schema types** (Person, ProfessionalService, FAQPage, BlogPosting, etc.)
- [x] **24 URLs in sitemap** — home, sections, case studies, blog, FAQ, downloads
- [x] **AI crawlers allowed** — GPTBot, ClaudeBot, PerplexityBot in robots.txt
- [x] **All images have alt tags + lazy loading**
- [x] **Google Search Console verified** token in place
- [x] **Canonical + hreflang** tags present
- [x] **6 pages** (Home, Blog, Case Studies, FAQ, Country Landing, Admin)
- [x] **15 admin pages** (all sections editable)
- [x] **Responsive** — 4 breakpoints (1024, 860, 640, 400px)

---

## 📅 Part 1 — Calendly Setup (5 minutes)

### Step 1: Sign up
1. Go to **https://calendly.com/signup**
2. Use `gauravkumarvishwakarma@gmail.com`
3. Pick username: **`gauravkv`** (URL becomes `calendly.com/gauravkv`)
4. Choose **Free plan** (enough for 1 event type)

### Step 2: Set up your Discovery Call event
1. After login → **"Create New Event Type"** → **"One-on-One"**
2. Fill in:

   | Field | Value |
   |---|---|
   | **Event name** | `Discovery Call — Power BI / BI Consulting` |
   | **Location** | `Google Meet` (auto-generates link) OR `Zoom` |
   | **Description** | *20-minute call to understand your data challenges — no pitch, just honest advice. If we're a good fit, I'll send scope + fixed-price quote within 24 hrs.* |
   | **Duration** | `20 min` |
   | **Event link (slug)** | `discovery-call` (URL becomes `calendly.com/gauravkv/discovery-call`) |
   | **Color** | Sky blue |

3. **Availability**:
   - Mon–Sat, 10 AM – 8 PM IST
   - Buffer: 15 min before/after
   - Notice: min 4 hours

4. **Questions to ask invitee** (add these):
   - What's your role & company?
   - Briefly describe the data challenge (2-3 lines)
   - What tools are you currently using? (Excel / Power BI / Tableau / other)
   - Preferred timezone for the call?

5. **Save** → copy the URL. Example: `https://calendly.com/gauravkv/discovery-call`

### Step 3: Plug it into your portfolio

Open `src/data/portfolioData.json` and replace **two** places:

**A) Hero primary CTA:**
```json
"primaryCtaLink": "https://calendly.com/gauravkv/discovery-call",
```

**B) Contact CTA button:**
```json
"ctaButtons": [
  {
    "id": "cb1",
    "text": "Book Discovery Call",
    "icon": "fas fa-calendar-check",
    "link": "https://calendly.com/gauravkv/discovery-call",
    "primary": true
  },
  ...
]
```

Then run:
```powershell
python scripts\sync_initial_data.py
```

That's it — every "Book Discovery Call" button now opens Calendly.

### Step 4 (optional but recommended) — Email notifications
In Calendly → **Account Settings → Notifications**:
- ✅ Email when booked
- ✅ Reminder 1 hr before
- ✅ SMS reminders (link your phone)

---

## 🚀 Part 2 — Git Push to Deploy

### If you have NOT set up git remote yet:

```powershell
cd C:\Users\gaura\Downloads\portfolio-v2

# Initialize
git init
git branch -M main

# Add remote — using your existing repo `portfolio_v1`
git remote add origin https://github.com/GAURAV19999/portfolio_v1.git

# First commit
git add .
git commit -m "🚀 Portfolio v2: Direct-client rebrand + Services + FAQ + Blog + Case Studies + Currency switcher + Full responsive"

# Push (may prompt for GitHub credentials — use a PAT, not password)
git push -u origin main --force
```

> ⚠️ `--force` overwrites the old repo. If you want to preserve the old commits, skip `--force` and merge manually.

### If git is already set up:

```powershell
cd C:\Users\gaura\Downloads\portfolio-v2
git add .
git commit -m "🚀 Direct-client rebrand: Services + FAQ + Blog + Case Studies + Currency + Responsive polish"
git push origin main
```

### Netlify — auto-deploy triggers

1. Netlify already watches this repo (via existing `iamgaurav` site)
2. Push triggers → Netlify builds → live in ~2 min
3. Check status: https://app.netlify.com/sites/iamgaurav/deploys

### If Netlify site is NOT connected:

1. https://app.netlify.com → **"Add new site" → "Import from GitHub"**
2. Choose repo `portfolio_v1`
3. Build settings (Netlify auto-detects CRA):
   - Build command: `npm run build`
   - Publish directory: `build`
4. Deploy → get URL

---

## 🔍 Part 3 — Post-Deploy SEO Actions (do within 24 hrs)

### 1. Google Search Console
- URL: https://search.google.com/search-console
- Site already verified (token `Ts1BjL0Ih5HZdyrwpT_7SliEJz7bsr5F4zAwoGgw0Uc` in `<head>`)
- **Sitemaps** → Add: `https://iamgaurav.netlify.app/sitemap.xml`
- **URL Inspection** → paste each new URL, click "Request Indexing":
  - `/case-studies`
  - `/blog`
  - `/faq`
  - `/case-studies/patrakaar-ai-media-intelligence`
  - `/blog/power-bi-dax-patterns-2026`

### 2. Bing Webmaster Tools
- URL: https://www.bing.com/webmasters
- Add site → verify with same meta tag
- Submit sitemap

### 3. LinkedIn — publish first blog post
- Copy content from `/blog/power-bi-dax-patterns-2026`
- Publish on LinkedIn Articles → link back to portfolio
- Update LinkedIn headline: *"Freelance Power BI Consultant | Helping Businesses Cut Reporting Time by 45%"*

### 4. Verify rich results (2-3 days after deploy)
- https://search.google.com/test/rich-results
- Paste your URL — should show: Person, ProfessionalService, FAQPage, BlogPosting

---

## ✅ Post-Deploy Verification (5 min after Netlify build)

Open **incognito window** and verify at `https://iamgaurav.netlify.app`:

| Test | Expected |
|---|---|
| Homepage loads | Hero shows "Independent Data Analyst & Power BI Consultant" |
| Navbar | About · Services · Skills · Experience · Projects · Certificates · Contact · **Blog** |
| Nav link click | URL bar stays clean (no `#skills`) |
| Services section | Currency badge visible; click → dropdown opens fully (not clipped) |
| "View Case Studies" button | Opens `/case-studies` |
| `/case-studies` | 5 cards including Patrakaar.AI ⭐ |
| `/blog` | 2 posts, DAX post ⭐ |
| `/faq` | 8 questions expand/collapse |
| `/downloads/Gaurav-Vishvakarma-Service-Deck.pdf` | Downloads |
| Contact form | Submits successfully (check `/admin/messages`) |
| Mobile (F12 → Toggle device) | Everything single-column, buttons stack, footer centered |
| Currency test | On Bengaluru location: dropdown auto-shows "INR" |
| Booking button | Opens Calendly (once you swap the link) |

---

## 🐛 Troubleshooting

**Netlify build fails**
- Check build log for the actual error
- Common: missing `node_modules` cache — clear it and retry
- Force rebuild: Netlify → Deploys → "Trigger deploy" → "Clear cache and deploy site"

**Old content still showing after deploy**
- Netlify serves cached HTML — wait 2-3 minutes
- Or hard refresh: `Ctrl + Shift + R`
- Or open in incognito

**GitHub push rejected**
- Set up a Personal Access Token: https://github.com/settings/tokens
- Use it as password when git prompts

**Calendly booking not showing on portfolio**
- Verify link starts with `https://` (not just `calendly.com/...`)
- Clear browser localStorage: DevTools → Application → Local Storage → clear all
- Refresh page

---

## 📊 What's Live After Push

| URL | Purpose |
|---|---|
| `/` | Home (Hero, About, Services, Tools, Skills, Experience, Projects, Testimonials, Certificates, Contact) |
| `/case-studies` | All 5 case studies (Patrakaar, Political, Sentiment, E-comm, SCM) |
| `/case-studies/:slug` | Individual case study detail |
| `/blog` | Blog listing (2 posts) |
| `/blog/:slug` | Individual blog post |
| `/faq` | FAQ page (8 Q&A) |
| `/in` `/uk` `/de` `/nl` | Country-targeted landing pages |
| `/admin` | Admin login → 15 editable sections |
| `/sitemap.xml` | 24 URLs |
| `/robots.txt` | AI crawlers allowed |
| `/downloads/Gaurav-Vishvakarma-Service-Deck.pdf` | 4-page service deck |
| `/downloads/PowerBI-DAX-Quickstart-Pack.pdf` | Lead magnet |

---

## 🎯 Weekly Actions After Launch

**Every Monday:**
- Post 1 case study snippet on LinkedIn (30 min)
- Send 20 personalised connect requests to EU founders

**Every Wednesday:**
- Publish 1 educational tip from your DAX pack

**Every Friday:**
- Recap: 1 client win or lesson

**Every Sunday:**
- Review inbound Calendly bookings + follow up

---

**You're all set, bhai. Push kar, deploy hone de, aur Calendly setup karke live ho ja. 🚀**
