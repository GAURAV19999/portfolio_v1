import React from 'react';

const Footer = ({ data }) => (
  <footer>
    <div className="footer-inner">
      <p>{data.text}</p>
      <div className="footer-socials">
        {(data.socials || []).map(s => (
          <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title} aria-label={s.title}>
            <i className={s.icon}></i>
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
