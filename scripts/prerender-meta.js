/**
 * Post-build static-meta generator.
 *
 * CRA ships one index.html for every route, so crawlers and (JS-less) social
 * scrapers see the homepage's title/description/canonical/OG tags on every URL.
 * This script writes a per-route build/<path>/index.html whose <head> carries
 * that page's own meta. Netlify serves these static files before the SPA
 * fallback redirect, so /blog/<slug>, /de, etc. get correct previews; the same
 * JS bundle then boots and the router renders the right page as before.
 *
 * Safe by design: no browser, no runtime changes. Wrapped so any failure logs
 * and exits 0 — the normal CSR build (build/index.html) always still deploys.
 *
 * Blog & case-study meta are read live from portfolioData.json (admin edits
 * stay in sync). Country-page copy mirrors src/pages/CountryLanding.js — update
 * both if those strings change.
 */

const fs = require('fs');
const path = require('path');

try {
  const BUILD = path.join(__dirname, '..', 'build');
  const SITE = 'https://iamgaurav.netlify.app';
  const templatePath = path.join(BUILD, 'index.html');

  if (!fs.existsSync(templatePath)) {
    console.log('[prerender-meta] build/index.html not found — skipping.');
    process.exit(0);
  }
  const template = fs.readFileSync(templatePath, 'utf8');
  const data = require(path.join(__dirname, '..', 'src', 'data', 'portfolioData.json'));

  const escAttr = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  const escText = (s) =>
    String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  const clip = (s, n) => {
    s = String(s || '').replace(/<[^>]*>/g, '').trim();
    return s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;
  };

  // Country-page meta — mirrors COUNTRY_CONFIG in src/pages/CountryLanding.js
  const COUNTRY = {
    india: {
      title: 'Freelance Data Analyst & Power BI Developer in India | Hire Gaurav | Bengaluru',
      desc: 'Hire Gaurav Kumar Vishvakarma — Freelance Data Analyst & Power BI Developer in Bengaluru, India. 5+ years building dashboards, SQL/Python pipelines, and AI analytics for 200+ BFSI clients. Available immediately for remote freelance & full-time roles across India.',
    },
    uk: {
      title: 'Freelance Power BI Developer & Data Analyst for UK | Remote India | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for UK projects. 5+ years building BI dashboards, SQL pipelines, and AI analytics. Remote-first, UK-friendly hours, 50-70% cost-effective vs UK-local rates. BFSI, fintech, retail experience. Available immediately.',
    },
    germany: {
      title: 'Freelance Power BI Developer & Data Analyst for Germany | Remote | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for German (DACH) projects. 5+ years of enterprise BI, SQL, Snowflake, and AI analytics. Remote-first, GDPR-aware, DACH-friendly hours. 50-70% cost-effective vs German-local rates. Available for SAP-adjacent and BFSI projects.',
    },
    netherlands: {
      title: 'Freelance Power BI Developer for Netherlands | Remote India | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for Dutch projects. 5+ years of BI, SQL, Snowflake, and AI analytics. Remote-first, NL-friendly hours, GDPR-aware. 50-70% cost-effective vs NL-local rates. Strong fit for Amsterdam fintech, e-commerce, and SaaS clients.',
    },
    usa: {
      title: 'Freelance Power BI Developer & Data Analyst for USA | Remote | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for US projects. 5+ years building BI dashboards, SQL/Snowflake pipelines, and AI/RAG analytics. Remote-first, US-hours overlap, 50-70% cost-effective vs US-local rates. BFSI, SaaS, e-commerce experience.',
    },
    australia: {
      title: 'Freelance Power BI Developer & Data Analyst for Australia | Remote | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for Australian projects. 5+ years of BI, SQL, Snowflake, and AI analytics. Remote-first, strong AEST overlap, English-fluent. Cost-effective vs AU-local rates. Great fit for Sydney & Melbourne fintech, retail, and SaaS.',
    },
    canada: {
      title: 'Freelance Power BI Developer & Data Analyst for Canada | Remote | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for Canadian projects. 5+ years of BI, SQL, Snowflake, and AI analytics. Remote-first, US/Canada-hours overlap, English-fluent. Cost-effective vs CA-local rates. Strong fit for Toronto & Vancouver fintech, retail, and SaaS.',
    },
    uae: {
      title: 'Freelance Power BI Developer & Data Analyst for UAE & Dubai | Hire Gaurav',
      desc: 'Hire a Freelance Data Analyst & Power BI Developer for UAE & Gulf projects. 5+ years of BI, SQL, Snowflake, and AI analytics. Remote-first, near-identical timezone (GST), English-fluent. Strong fit for Dubai & Abu Dhabi trading, retail, real estate, and logistics.',
    },
  };

  // route -> { title, desc, canonical } ; canonical defaults to the route itself
  const routes = {};

  // Country routes (aliases canonicalise to the primary path)
  routes['/in'] = { ...COUNTRY.india };
  routes['/india'] = { ...COUNTRY.india, canonical: '/in' };
  routes['/uk'] = { ...COUNTRY.uk };
  routes['/de'] = { ...COUNTRY.germany };
  routes['/germany'] = { ...COUNTRY.germany, canonical: '/de' };
  routes['/nl'] = { ...COUNTRY.netherlands };
  routes['/netherlands'] = { ...COUNTRY.netherlands, canonical: '/nl' };
  routes['/us'] = { ...COUNTRY.usa };
  routes['/usa'] = { ...COUNTRY.usa, canonical: '/us' };
  routes['/au'] = { ...COUNTRY.australia };
  routes['/australia'] = { ...COUNTRY.australia, canonical: '/au' };
  routes['/ca'] = { ...COUNTRY.canada };
  routes['/canada'] = { ...COUNTRY.canada, canonical: '/ca' };
  routes['/ae'] = { ...COUNTRY.uae };
  routes['/uae'] = { ...COUNTRY.uae, canonical: '/ae' };
  routes['/dubai'] = { ...COUNTRY.uae, canonical: '/ae' };

  // Section pages (titles mirror each page's document.title)
  routes['/case-studies'] = {
    title: 'Case Studies · Freelance Data Analyst | Gaurav Vishvakarma',
    desc: 'Real freelance data analytics & Power BI case studies — problem, approach, tools, and measurable results across media intelligence, e-commerce, and supply chain.',
  };
  routes['/blog'] = {
    title: 'Blog · Data & BI Insights | Gaurav Vishvakarma',
    desc: 'Practical Power BI, SQL, DAX, and freelance data-analytics insights from 5+ years of enterprise BI work.',
  };
  routes['/faq'] = {
    title: 'FAQ · Frequently Asked Questions | Gaurav Vishvakarma',
    desc: 'Answers to the questions clients ask most about freelance Power BI & data-analytics engagements — scope, pricing, timelines, and working style.',
  };

  // Dynamic: blog posts
  (data.blog && Array.isArray(data.blog.items) ? data.blog.items : []).forEach((p) => {
    if (!p || !p.slug) return;
    routes['/blog/' + p.slug] = {
      title: `${p.title} | Gaurav Vishvakarma`,
      desc: clip(p.excerpt || p.summary || p.title, 160),
    };
  });

  // Dynamic: case studies
  (data.caseStudies && Array.isArray(data.caseStudies.items) ? data.caseStudies.items : []).forEach((c) => {
    if (!c || !c.slug) return;
    routes['/case-studies/' + c.slug] = {
      title: `${c.title} — Case Study | Gaurav Vishvakarma`,
      desc: clip(c.tagline || c.problem || c.title, 160),
    };
  });

  const applyMeta = (html, { title, desc, url }) => {
    let out = html;
    const t = escText(title);
    const dA = escAttr(desc);
    const tA = escAttr(title);
    out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>`);
    out = out.replace(/(<meta\s+name="description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${dA}$2`);
    out = out.replace(/(<meta\s+name="title"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${tA}$2`);
    out = out.replace(/(<meta\s+property="og:title"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${tA}$2`);
    out = out.replace(/(<meta\s+property="og:description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${dA}$2`);
    out = out.replace(/(<meta\s+name="twitter:title"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${tA}$2`);
    out = out.replace(/(<meta\s+name="twitter:description"\s+content=")[\s\S]*?("\s*\/?>)/i, `$1${dA}$2`);
    out = out.replace(/(<link\s+rel="canonical"\s+href=")[\s\S]*?(")/i, `$1${url}$2`);
    out = out.replace(/(<meta\s+property="og:url"\s+content=")[\s\S]*?(")/i, `$1${url}$2`);
    out = out.replace(/(<meta\s+name="twitter:url"\s+content=")[\s\S]*?(")/i, `$1${url}$2`);
    return out;
  };

  let written = 0;
  Object.entries(routes).forEach(([route, meta]) => {
    const canonicalPath = meta.canonical || route;
    const url = SITE + canonicalPath;
    const html = applyMeta(template, { title: meta.title, desc: meta.desc, url });
    const outDir = path.join(BUILD, route.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    written++;
  });

  console.log(`[prerender-meta] wrote ${written} per-route index.html files.`);
} catch (err) {
  console.log('[prerender-meta] skipped (non-fatal):', err && err.message);
  process.exit(0);
}
