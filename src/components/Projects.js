import React from 'react';

const Projects = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Featured Work</span>
          <h2 className="section-title">Professional Projects</h2>
          <p className="section-desc">Production-grade analytics solutions with live dashboards and automated pipelines.</p>
        </div>
        <div className="projects-grid">
          {data.map((p, i) => (
            <div key={p.id} className={`project-card reveal stagger-${(i % 4) + 1}`}>
              <div className="project-snapshot">
                <img src={p.image} alt={p.title} loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.querySelector('.project-snapshot-placeholder').style.display = 'flex'; }} />
                <div className="project-snapshot-placeholder" style={{ display: 'none' }}>
                  <i className={p.icon}></i>
                </div>
                {p.link && (
                  <div className="project-snapshot-overlay">
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-small">
                      <i className={p.linkIcon}></i> {p.linkLabel}
                    </a>
                  </div>
                )}
              </div>
              <div className="project-header">
                <div className="project-icon"><i className={p.icon}></i></div>
                <div className="project-links">
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="project-link" title={p.linkLabel}>
                      <i className={p.linkIcon}></i>
                    </a>
                  )}
                </div>
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: p.description }} />
                <ul>
                  {p.bullets.map((b, bi) => <li key={bi} dangerouslySetInnerHTML={{ __html: b }} />)}
                </ul>
              </div>
              <div className="project-footer">
                {p.tags.map((t, ti) => <span key={ti} className="project-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
