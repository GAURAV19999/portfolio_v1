import React from 'react';

const Hero = ({ data }) => (
  <section className="hero" id="home">
    <div className="hero-bg"></div>
    <div className="hero-grid"></div>
    <div className="hero-content">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="dot"></span>
          {data.badge}
        </div>
        <h1>
          {data.titlePrefix} <span className="gradient-text">{data.titleAccent}</span><br />
          {data.titleSuffix}
        </h1>
        <p className="hero-subtitle">{data.subtitle}</p>
        <p className="hero-desc" dangerouslySetInnerHTML={{ __html: data.description }} />
        <div className="hero-cta">
          <a href={data.primaryCtaLink} className="btn btn-primary">
            <i className={data.primaryCtaIcon}></i>
            {data.primaryCtaText}
          </a>
          <a href={data.secondaryCtaLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <i className={data.secondaryCtaIcon}></i>
            {data.secondaryCtaText}
          </a>
          {data.resumeCtaLink && (
            <a href={data.resumeCtaLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <i className={data.resumeCtaIcon || 'fas fa-file-download'}></i>
              {data.resumeCtaText || 'Download Resume'}
            </a>
          )}
        </div>
        <div className="hero-stats">
          {data.stats.map(s => (
            <div key={s.id} className="stat-card">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-visual-inner">
          <i className={data.visualIcon}></i>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
