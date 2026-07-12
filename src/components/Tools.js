import React from 'react';

const Tools = ({ data }) => {
  if (!data?.enabled) return null;
  const items = [...data.items, ...data.items]; // duplicate for seamless loop
  return (
    <section className="marquee-section" id="tools">
      <div className="marquee-title">{data.title}</div>
      <div className="marquee-track" id="toolsTrack">
        {items.map((t, i) => (
          <div key={`${t.id}-${i}`} className="marquee-item">
            <img src={t.icon} alt={`${t.name} — data analytics tool`} loading="lazy" onError={(e) => { e.target.style.opacity = 0.3; }} />
            <span>{t.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Tools;
