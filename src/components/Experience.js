import React from 'react';

const Experience = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
    <section id="experience">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Career Journey</span>
          <h2 className="section-title">Work Experience</h2>
        </div>
        <div className="timeline">
          {data.map(exp => (
            <div key={exp.id} className="timeline-item reveal">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <div className="timeline-company-info">
                    <div className="company-logo" title={exp.company}>
                      {exp.logo ? (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (e.target.nextElementSibling) e.target.nextElementSibling.style.display = 'inline-block';
                          }}
                        />
                      ) : null}
                      <i
                        className={exp.companyIcon || 'fas fa-building'}
                        style={{ display: exp.logo ? 'none' : 'inline-block' }}
                      ></i>
                    </div>
                    <div className="timeline-title">
                      <h3>{exp.title}</h3>
                      <span className="company">
                        {exp.company}
                        {exp.companyLink && (
                          <a href={exp.companyLink} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-external-link-alt"></i> {exp.companyLinkText}
                          </a>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="timeline-meta">
                    <span className="timeline-date"><i className="fas fa-calendar"></i> {exp.date}</span>
                    <div className="timeline-location"><i className="fas fa-map-marker-alt"></i> {exp.location}</div>
                  </div>
                </div>
                <ul>
                  {exp.bullets.map((b, i) => <li key={i} dangerouslySetInnerHTML={{ __html: b }} />)}
                </ul>
                <div className="timeline-tools">
                  {exp.tools.map((t, i) => <span key={i} className="tool-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
