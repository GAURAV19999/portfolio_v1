import React from 'react';

const About = ({ data }) => {
  if (!data?.enabled) return null;
  return (
    <section id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
        </div>
        <div className="about-grid">
          <div className="about-photo-wrapper reveal">
            <div className="about-photo-frame">
              <div className="about-photo-inner">
                <img
                  src={data.photoUrl}
                  alt="Gaurav Kumar Vishvakarma — Freelance Power BI Consultant & Data Analyst"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }}
                />
                <div className="about-photo-placeholder" style={{ display: 'none' }}>
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="about-photo-badge">
                <i className="fas fa-check-circle" style={{ color: 'var(--success)' }}></i> {data.photoBadge}
              </div>
            </div>
          </div>
          <div className="about-text-content reveal">
            <h3>{data.greeting}</h3>
            {data.paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
            <div className="social-links">
              {data.socials.map(s => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="social-link" title={s.title}>
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="about-highlights reveal">
          {data.highlights.map(h => (
            <div key={h.id} className="highlight-card">
              <div className="highlight-icon"><i className={h.icon}></i></div>
              <div>
                <h4>{h.title}</h4>
                <p>{h.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
