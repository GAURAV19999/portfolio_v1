import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable country-specific landing page for SEO.
 * Renders a hero, value props, projects, and CTA tailored per country.
 *
 * Usage:
 *   <CountryLanding country="india" />
 *   <CountryLanding country="uk" />
 *   <CountryLanding country="germany" />
 *   <CountryLanding country="netherlands" />
 */

const COUNTRY_CONFIG = {
  india: {
    code: 'IN',
    flag: '🇮🇳',
    country: 'India',
    region: 'India',
    cities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'],
    currency: 'INR',
    timezone: 'IST (UTC+5:30)',
    headline: 'Freelance Data Analyst & Power BI Developer in India',
    subheadline: 'Bengaluru-based · Remote across India · 4+ Years · 200+ Clients · BFSI Expert',
    metaTitle: 'Freelance Data Analyst & Power BI Developer in India | Hire Gaurav | Bengaluru',
    metaDescription: 'Hire Gaurav Kumar Vishvakarma — Freelance Data Analyst & Power BI Developer in Bengaluru, India. 4+ years building dashboards, SQL/Python pipelines, and AI analytics for 200+ BFSI clients. Available immediately for remote freelance & full-time roles across India.',
    keywords: 'freelance data analyst India, Power BI developer India, Power BI freelancer Bengaluru, data analyst Bengaluru, SQL developer India, BI consultant India, hire data analyst India, freelance Power BI Mumbai, freelance data analyst Hyderabad',
    domains: ['BFSI & Financial Services', 'Capital Markets & Asset Management', 'Indian e-commerce & SaaS', 'Market Research', 'Healthcare Analytics'],
    rateNote: '₹1,500–₹2,500/hour or fixed-price project quotes',
    intro: 'I help Indian businesses turn messy data into clean, decision-ready dashboards using Power BI, SQL, and Python. Over 4 years at Acuity Knowledge Partners, I delivered enterprise BI for 200+ buy-side and sell-side clients across the Indian financial services landscape — and now I bring the same rigor to startups, SMEs, and enterprises directly.',
    cta: 'Hire me for your next Power BI or BI project — Bengaluru remote, India-wide.',
  },
  uk: {
    code: 'GB',
    flag: '🇬🇧',
    country: 'United Kingdom',
    region: 'UK',
    cities: ['London', 'Manchester', 'Edinburgh', 'Bristol', 'Birmingham'],
    currency: 'GBP',
    timezone: 'BST/GMT (UTC+0/+1) — overlap with IST mornings',
    headline: 'Freelance Data Analyst & Power BI Developer for UK Clients',
    subheadline: 'Remote-first · UK-friendly hours · 4+ Years · BFSI & Fintech Specialist',
    metaTitle: 'Freelance Power BI Developer & Data Analyst for UK | Remote India | Hire Gaurav',
    metaDescription: 'Hire a Freelance Data Analyst & Power BI Developer for UK projects. 4+ years building BI dashboards, SQL pipelines, and AI analytics. Remote-first, UK-friendly hours, 50-70% cost-effective vs UK-local rates. BFSI, fintech, retail experience. Available immediately.',
    keywords: 'freelance data analyst UK, Power BI developer UK remote, hire data analyst London, freelance BI consultant UK, Power BI freelancer remote UK, SQL developer UK contractor, data analyst freelancer London, IR35 outside scope BI developer',
    domains: ['Financial Services & Fintech', 'Retail & e-Commerce', 'SaaS & Startups', 'Insurance Analytics', 'Healthcare BI'],
    rateNote: '£25–£45/hour or fixed-project pricing · 50–70% cost-effective vs UK-local rates',
    intro: 'I work remotely with UK-based startups, SMEs, and enterprises building Power BI dashboards, SQL data pipelines, and AI-augmented analytics. With 4+ years of experience supporting global BFSI clients (incl. UK financial services), I deliver UK-standard quality at India-friendly rates — typically saving 50-70% versus London-local contractors.',
    cta: 'Hire a remote Power BI developer for your UK team — London-quality, India rates.',
  },
  germany: {
    code: 'DE',
    flag: '🇩🇪',
    country: 'Germany',
    region: 'Germany',
    cities: ['Berlin', 'Munich', 'Frankfurt', 'Hamburg', 'Cologne', 'Düsseldorf'],
    currency: 'EUR',
    timezone: 'CET (UTC+1) — overlap with IST mornings & afternoons',
    headline: 'Freelance Data Analyst & Power BI Developer for German Clients',
    subheadline: 'Remote-first · DACH-friendly hours · GDPR-aware · 4+ Years · Enterprise BFSI Background',
    metaTitle: 'Freelance Power BI Developer & Data Analyst for Germany | Remote | Hire Gaurav',
    metaDescription: 'Hire a Freelance Data Analyst & Power BI Developer for German (DACH) projects. 4+ years of enterprise BI, SQL, Snowflake, and AI analytics. Remote-first, GDPR-aware, DACH-friendly hours. 50-70% cost-effective vs German-local rates. Available for SAP-adjacent and BFSI projects.',
    keywords: 'freelance data analyst Germany, Power BI developer Berlin remote, freelance BI consultant Munich, hire data analyst Germany, Power BI freelancer DACH, SAP analytics freelancer, freelance Snowflake developer Germany',
    domains: ['SAP-adjacent Analytics', 'Manufacturing & Industrial BI', 'Financial Services & Insurance', 'Automotive Analytics', 'GDPR-compliant Reporting'],
    rateNote: '€30–€55/hour or fixed-project quotes · 50–70% cost-effective vs DACH-local rates',
    intro: 'I support German (DACH) businesses with remote Power BI development, SQL data engineering, and Snowflake migrations. With 4+ years of enterprise BI experience and strong familiarity with European data protection standards (GDPR-aware reporting design), I help DACH startups, SMEs, and enterprises ship dashboards faster and more cost-effectively than local-only resourcing.',
    cta: 'Hire a remote Power BI developer for your German team — DACH-friendly hours, EUR rates.',
  },
  netherlands: {
    code: 'NL',
    flag: '🇳🇱',
    country: 'Netherlands',
    region: 'Netherlands',
    cities: ['Amsterdam', 'Rotterdam', 'Utrecht', 'The Hague', 'Eindhoven'],
    currency: 'EUR',
    timezone: 'CET (UTC+1) — overlap with IST mornings & afternoons',
    headline: 'Freelance Data Analyst & Power BI Developer for Dutch Clients',
    subheadline: 'Remote-first · EU hours · English-fluent · 4+ Years · Fintech & E-commerce',
    metaTitle: 'Freelance Power BI Developer for Netherlands | Remote India | Hire Gaurav',
    metaDescription: 'Hire a Freelance Data Analyst & Power BI Developer for Dutch projects. 4+ years of BI, SQL, Snowflake, and AI analytics. Remote-first, NL-friendly hours, GDPR-aware. 50-70% cost-effective vs NL-local rates. Strong fit for Amsterdam fintech, e-commerce, and SaaS clients.',
    keywords: 'freelance data analyst Netherlands, Power BI developer Amsterdam remote, freelance BI consultant Netherlands, hire data analyst Amsterdam, Power BI freelancer NL, freelance Snowflake developer Netherlands',
    domains: ['Fintech & Payments (e.g., Adyen-style)', 'E-commerce & Marketplaces', 'Travel & Booking Platforms', 'Banking & Insurance', 'SaaS Analytics'],
    rateNote: '€30–€55/hour or fixed-project quotes · 50–70% cost-effective vs NL-local rates',
    intro: 'I work remotely with Dutch businesses delivering Power BI dashboards, SQL pipelines, and AI-augmented analytics. With strong English fluency and 4+ years of enterprise BI experience for global clients, I integrate smoothly into Amsterdam-based fintech, e-commerce, and SaaS teams — at India-friendly rates that scale well for project-based engagements.',
    cta: 'Hire a remote Power BI developer for your Dutch team — EU hours, EUR rates.',
  },
};

const CountryLanding = ({ country = 'india' }) => {
  const cfg = COUNTRY_CONFIG[country] || COUNTRY_CONFIG.india;

  // Inject SEO meta tags + JSON-LD into document head
  useEffect(() => {
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;

    document.title = cfg.metaTitle;

    // Helper: set or update a meta tag
    const setMeta = (selector, attrs) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        document.head.appendChild(el);
      } else {
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      }
      return el;
    };

    setMeta('meta[name="description-country"]', {
      name: 'description-country', content: cfg.metaDescription,
    });
    // Override the main description for this page view
    const mainDesc = document.querySelector('meta[name="description"]');
    if (mainDesc) mainDesc.setAttribute('content', cfg.metaDescription);

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) keywords.setAttribute('content', cfg.keywords);

    // OG tags override
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', cfg.metaTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', cfg.metaDescription);

    // Inject JSON-LD ProfessionalService schema with areaServed
    const ldId = 'country-landing-ld';
    let ldScript = document.getElementById(ldId);
    if (ldScript) ldScript.remove();
    ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.id = ldId;
    ldScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": `Gaurav Kumar Vishvakarma — Freelance Data Analyst & Power BI Developer (${cfg.country})`,
      "description": cfg.metaDescription,
      "url": `https://iamgaurav.netlify.app/${country === 'india' ? 'in' : country === 'uk' ? 'uk' : country === 'germany' ? 'de' : 'nl'}`,
      "image": "https://iamgaurav.netlify.app/og-image.png",
      "telephone": "+91-8130676651",
      "email": "gauravkumarvishwakarma@gmail.com",
      "priceRange": cfg.rateNote,
      "areaServed": {
        "@type": "Country",
        "name": cfg.country,
      },
      "provider": {
        "@type": "Person",
        "name": "Gaurav Kumar Vishvakarma",
        "url": "https://iamgaurav.netlify.app/",
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "addressCountry": "IN",
      },
      "knowsAbout": [
        "Power BI", "DAX", "Power Query", "Data Modeling", "SQL", "Snowflake",
        "Python", "Tableau", "ETL", "Generative AI", "LangChain", "RAG",
        "Business Intelligence", "Data Visualization", "KPI Reporting",
      ],
    });
    document.head.appendChild(ldScript);

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      const ld = document.getElementById(ldId);
      if (ld) ld.remove();
    };
  }, [cfg, country]);

  return (
    <div className="country-landing" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', padding: '4rem 1.5rem' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>›</span>
          <span>Hire for {cfg.country}</span>
        </div>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-block', padding: '0.4rem 1rem',
            background: 'rgba(14,165,233,0.1)', color: 'var(--accent-light)',
            borderRadius: 99, fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem',
            border: '1px solid rgba(14,165,233,0.3)',
          }}>
            {cfg.flag} Now serving clients in {cfg.country}
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1rem' }}>
            {cfg.headline}
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {cfg.subheadline}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://iamgaurav.netlify.app/#contact" className="btn btn-primary" style={{
              padding: '0.9rem 1.8rem', background: 'var(--accent)', color: '#fff',
              borderRadius: 10, textDecoration: 'none', fontWeight: 600,
            }}>
              📩 Hire Me — Free 15-min Call
            </a>
            <Link to="/" className="btn btn-secondary" style={{
              padding: '0.9rem 1.8rem', background: 'transparent', color: 'var(--accent-light)',
              borderRadius: 10, textDecoration: 'none', fontWeight: 600,
              border: '2px solid var(--accent)',
            }}>
              📂 View Full Portfolio →
            </Link>
          </div>
        </div>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            {cfg.intro}
          </p>
        </section>

        {/* Stats Grid */}
        <section style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem', marginBottom: '3rem',
        }}>
          {[
            { num: '4+', label: 'Years Experience' },
            { num: '200+', label: 'Clients Served' },
            { num: '99.5%', label: 'Data Accuracy' },
            { num: '45%', label: 'Avg Reporting Time Saved' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'var(--bg-card)', borderRadius: 14, padding: '1.5rem',
              border: '1px solid var(--border)', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-light)', lineHeight: 1 }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Why Hire Me */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Why hire me for your {cfg.country} project?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
            {[
              { i: '⚡', t: 'Fast Turnaround', d: 'Most projects delivered in 3–14 days. Daily progress updates.' },
              { i: '🛡️', t: 'Quality-First', d: '99.5% data accuracy with built-in validation & reconciliation.' },
              { i: '💼', t: 'Enterprise Pedigree', d: '3+ years at Acuity Knowledge Partners serving 200+ BFSI clients.' },
              { i: '🤝', t: 'Clear Communication', d: `Excellent English (written + verbal), responsive within 2 hours.` },
              { i: '💰', t: 'Transparent Pricing', d: cfg.rateNote },
              { i: '⏰', t: 'Time Zone Fit', d: cfg.timezone },
            ].map(card => (
              <div key={card.t} style={{
                background: 'var(--bg-card)', borderRadius: 14, padding: '1.5rem',
                border: '1px solid var(--border)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{card.i}</div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{card.t}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {card.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', textAlign: 'center' }}>Tech Stack</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
            {[
              'Power BI', 'DAX', 'Power Query', 'Tableau', 'Looker Studio',
              'SQL', 'MySQL', 'SQL Server', 'Snowflake', 'PostgreSQL',
              'Python', 'Pandas', 'PySpark', 'R',
              'ETL', 'Alteryx', 'Azure Data Factory',
              'GenAI', 'LangChain', 'RAG', 'LLMs', 'Hugging Face',
              'Streamlit', 'Flask', 'Git', 'GitHub',
            ].map(t => (
              <span key={t} style={{
                padding: '0.4rem 0.9rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 99,
                fontSize: '0.82rem',
                color: 'var(--text-primary)',
              }}>{t}</span>
            ))}
          </div>
        </section>

        {/* Domain Strength */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '1rem', textAlign: 'center' }}>
            Domain Strength in {cfg.country}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, maxWidth: 600, margin: '0 auto' }}>
            {cfg.domains.map(d => (
              <li key={d} style={{
                padding: '0.8rem 1.2rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                marginBottom: '0.5rem',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
              }}>
                ✓ {d}
              </li>
            ))}
          </ul>
        </section>

        {/* Cities */}
        <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Available remotely for clients in:
          </h3>
          <p style={{ color: 'var(--accent-light)', fontSize: '1rem', fontWeight: 500 }}>
            {cfg.cities.join(' · ')}
          </p>
        </section>

        {/* Free Lead Magnet */}
        <section style={{
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(99,102,241,0.1))',
          border: '1px solid rgba(14,165,233,0.4)',
          borderRadius: 16,
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-light)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>
            🎁 Free Download
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Power BI DAX Quickstart Pack</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            7 production-ready DAX patterns + 5 performance tuning tricks + pre-launch checklist. No email signup required.
          </p>
          <a
            href="/downloads/PowerBI-DAX-Quickstart-Pack.pdf"
            download
            style={{
              display: 'inline-block',
              padding: '0.9rem 1.8rem',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: 10,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ⬇️ Download Free PDF (15 KB)
          </a>
        </section>

        {/* CTA Footer */}
        <section style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          background: 'var(--bg-card)',
          borderRadius: 14,
          border: '1px solid var(--border)',
        }}>
          <h2 style={{ fontSize: '1.6rem', marginBottom: '0.8rem' }}>{cfg.cta}</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            DMs open. Free 15-minute discovery call. No obligation.
          </p>
          <a href="mailto:gauravkumarvishwakarma@gmail.com" style={{
            display: 'inline-block',
            padding: '1rem 2.2rem',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '1rem',
          }}>
            📩 gauravkumarvishwakarma@gmail.com
          </a>
          <div style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <a href="https://linkedin.com/in/gauravkumarvishwakarma" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-light)', textDecoration: 'none', marginRight: '1rem' }}>
              💼 LinkedIn
            </a>
            <a href="https://github.com/GAURAV19999" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-light)', textDecoration: 'none', marginRight: '1rem' }}>
              💻 GitHub
            </a>
            <Link to="/" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>
              🌐 Full Portfolio
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CountryLanding;
