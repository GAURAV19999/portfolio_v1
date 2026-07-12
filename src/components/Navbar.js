import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/DataContext';

const Navbar = ({ logo = 'Gaurav KR Vishvakarma' }) => {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('about');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (!isHome) return;
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      if (cur) setActiveId(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Same nav links as original portfolio (only in-page anchors)
  const anchorLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#certificates', label: 'Certificates' },
    { href: '#contact', label: 'Contact' },
  ];

  const pageLinks = [
    { to: '/blog', label: 'Blog' },
  ];

  const handleAnchor = (href, e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (!isHome) {
      navigate('/' + href);
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        // Clean URL — remove the hash after scroll
        setTimeout(() => {
          window.history.replaceState(null, '', '/');
        }, 600);
      }, 100);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    // Clean URL — remove the hash after scroll (smoother URL bar)
    setTimeout(() => {
      window.history.replaceState(null, '', window.location.pathname);
    }, 600);
  };

  const mobileStyle = mobileOpen ? {
    display: 'flex', position: 'absolute', top: '100%', left: 0, right: 0,
    flexDirection: 'column', background: 'var(--bg-primary)', backdropFilter: 'blur(16px)',
    padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', gap: '1.2rem',
    boxShadow: 'var(--shadow-lg)', zIndex: 999
  } : {};

  return (
    <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          {logo}
        </Link>
        <ul className="nav-links" style={mobileStyle}>
          {anchorLinks.map(l => (
            <li key={l.href}>
              <a
                href={l.href}
                className={isHome && `#${activeId}` === l.href ? 'active' : ''}
                onClick={(e) => handleAnchor(l.href, e)}
              >
                {l.label}
              </a>
            </li>
          ))}
          {pageLinks.map(l => (
            <li key={l.to}>
              <Link
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={location.pathname.startsWith(l.to) ? 'active' : ''}
              >
                {l.label}
              </Link>
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
