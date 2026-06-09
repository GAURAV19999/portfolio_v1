import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/DataContext';

const Navbar = ({ logo = 'GK.Vishvakarma' }) => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      if (cur) setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleClick = (href, e) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <div className="logo">{logo}</div>
        <ul className="nav-links" style={mobileOpen ? {
          display: 'flex', position: 'absolute', top: '100%', left: 0, right: 0,
          flexDirection: 'column', background: 'var(--bg-primary)', backdropFilter: 'blur(16px)',
          padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', gap: '1.2rem',
          boxShadow: 'var(--shadow-lg)', zIndex: 999
        } : {}}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={`#${activeId}` === l.href ? 'active' : ''} onClick={(e) => handleClick(l.href, e)}>{l.label}</a>
            </li>
          ))}
          <li>
            <button className="theme-toggle" onClick={toggle} title="Toggle Dark/Light Mode">
              <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
          </li>
        </ul>
        <button className="mobile-menu-btn" onClick={() => setMobileOpen(o => !o)}>
          <i className={mobileOpen ? 'fas fa-times' : 'fas fa-bars'}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
