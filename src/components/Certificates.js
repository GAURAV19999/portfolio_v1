import React from 'react';

const Certificates = ({ data }) => {
  if (!data || data.length === 0) return null;
  const items = [...data, ...data]; // duplicate for seamless loop
  return (
    <section id="certificates">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Certifications</span>
          <h2 className="section-title">Verified Credentials</h2>
          <p className="section-desc">Industry-recognized certifications with verification links. Click any certificate to verify authenticity.</p>
        </div>
      </div>
      <div className="certificates-marquee">
        <div className="cert-track" id="certTrack">
          {items.map((c, i) => (
            <a key={`${c.id}-${i}`} href={c.link} target="_blank" rel="noopener noreferrer" className="cert-card">
              <div className="cert-image">
                <img src={c.image} alt={`${c.title} — issued by ${c.issuer || 'certification body'}`} loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.querySelector('.cert-image-placeholder').style.display = 'flex'; }} />
                <div className="cert-image-placeholder" style={{ display: 'none' }}><i className="fas fa-certificate"></i></div>
                <div className="cert-verify-badge"><i className="fas fa-check-circle"></i> Verified</div>
              </div>
              <div className="cert-info">
                <h4>{c.title}</h4>
                <div className="cert-issuer">{c.issuer}</div>
                <div className="cert-date">{c.date}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
