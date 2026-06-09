import React from 'react';

const Skills = ({ data }) => {
  if (!data?.enabled) return null;
  return (
    <section id="skills" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2 className="section-title">{data.sectionTitle}</h2>
          <p className="section-desc">{data.sectionDesc}</p>
        </div>
        <div className="skills-container">
          {data.categories.map((cat, i) => (
            <div key={cat.id} className={`skill-category reveal stagger-${(i % 4) + 1}`}>
              <h3><i className={cat.icon}></i> {cat.title}</h3>
              <div className="skill-tags">
                {cat.tags.map((t, ti) => (
                  <span key={ti} className={`skill-tag ${cat.secondary ? 'secondary' : ''}`}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
