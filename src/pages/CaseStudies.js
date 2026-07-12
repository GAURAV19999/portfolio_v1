import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ── List view: /case-studies ─────────────────────────────────
const CaseStudies = () => {
  const { data } = useData();
  const cs = data?.caseStudies;

  useEffect(() => {
    document.title = 'Case Studies · Freelance Data Analyst | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, []);

  if (!cs?.enabled) return null;

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-tag">{cs.sectionTag}</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              {cs.sectionTitle}
            </h1>
            <p className="section-intro" style={{ marginTop: '1rem' }}>
              {cs.sectionIntro}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '1.75rem' }}>
            {(cs.items || []).map((item) => (
              <Link
                key={item.id}
                to={`/case-studies/${item.slug}`}
                className="cs-card"
              >
                {item.thumbnail && (
                  <div className="cs-card-thumb">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {item.featured && <span className="cs-featured-badge">⭐ Featured</span>}
                  </div>
                )}
                <div className="cs-card-body">
                  <div className="cs-card-meta">
                    <span className="cs-domain">{item.domain}</span>
                    <span className="cs-duration">{item.duration}</span>
                  </div>
                  <h2 className="cs-card-title">{item.title}</h2>
                  <p className="cs-card-tagline">{item.tagline}</p>

                  <div className="cs-stack">
                    {(item.stack || []).slice(0, 6).map((s) => (
                      <span key={s} className="cs-tag">{s}</span>
                    ))}
                    {(item.stack || []).length > 6 && <span className="cs-tag">+{item.stack.length - 6}</span>}
                  </div>

                  <div className="cs-results-row">
                    {(item.results || []).slice(0, 4).map((r, i) => (
                      <div key={i} className="cs-mini-result">
                        <div className="cs-mini-num">{r.metric}</div>
                        <div className="cs-mini-lbl">{r.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="cs-card-cta">
                    Read full case study <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/#contact" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
              <i className="fas fa-calendar-check"></i> Book a Discovery Call
            </Link>
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer data={data.footer} />
    </>
  );
};

// ── Detail view: /case-studies/:slug ─────────────────────────
export const CaseStudyDetail = () => {
  const { data } = useData();
  const { slug } = useParams();
  const cs = data?.caseStudies?.items?.find((c) => c.slug === slug);

  useEffect(() => {
    document.title = cs
      ? `${cs.title} · Case Study | Gaurav Vishvakarma`
      : 'Case Study | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, [cs]);

  if (!cs) {
    return (
      <>
        <Navbar logo={data.settings?.siteName} />
        <section style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Case study not found</h1>
            <Link to="/case-studies" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i> Back to Case Studies
            </Link>
          </div>
        </section>
        <Footer data={data.footer} />
      </>
    );
  }

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <article style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: 920 }}>
          <Link to="/case-studies" className="cs-back">
            <i className="fas fa-arrow-left"></i> All Case Studies
          </Link>

          <div className="cs-detail-meta">
            <span className="cs-domain">{cs.domain}</span>
            <span className="cs-duration">{cs.duration}</span>
          </div>
          <h1 className="cs-detail-title">{cs.title}</h1>
          <p className="cs-detail-tagline">{cs.tagline}</p>

          {cs.thumbnail && (
            <div className="cs-detail-hero">
              <img src={cs.thumbnail} alt={cs.title}
                   onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}

          <div className="cs-info-grid">
            <div>
              <div className="cs-info-label">Client</div>
              <div className="cs-info-value">{cs.client}</div>
            </div>
            <div>
              <div className="cs-info-label">Duration</div>
              <div className="cs-info-value">{cs.duration}</div>
            </div>
            <div>
              <div className="cs-info-label">Domain</div>
              <div className="cs-info-value">{cs.domain}</div>
            </div>
            {cs.liveLink && (
              <div>
                <div className="cs-info-label">Live</div>
                <div className="cs-info-value">
                  <a href={cs.liveLink} target="_blank" rel="noopener noreferrer">
                    {cs.liveLinkLabel || 'Open Link'} <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="cs-stack" style={{ marginBottom: '2rem' }}>
            {(cs.stack || []).map((s) => (
              <span key={s} className="cs-tag">{s}</span>
            ))}
          </div>

          <h2 className="cs-h2"><i className="fas fa-exclamation-circle"></i> The Problem</h2>
          <p className="cs-body" dangerouslySetInnerHTML={{ __html: cs.problem }} />

          <h2 className="cs-h2"><i className="fas fa-tools"></i> The Solution</h2>
          <ul className="cs-solution-list">
            {(cs.solution || []).map((s, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: s }} />
            ))}
          </ul>

          <h2 className="cs-h2"><i className="fas fa-chart-line"></i> Results</h2>
          <div className="cs-results-big">
            {(cs.results || []).map((r, i) => (
              <div key={i} className="cs-result-big-card">
                <div className="cs-result-big-num">{r.metric}</div>
                <div className="cs-result-big-lbl">{r.label}</div>
              </div>
            ))}
          </div>

          <div className="cs-cta-box">
            <h3>Have a similar problem?</h3>
            <p>Let's talk. 20-min discovery call, honest opinion, no pitch.</p>
            <Link to="/#contact" className="btn btn-primary">
              <i className="fas fa-calendar-check"></i> Book a Discovery Call
            </Link>
          </div>
        </div>
      </article>
      <Footer data={data.footer} />
    </>
  );
};

export default CaseStudies;
