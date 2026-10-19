import React, { useEffect, useState } from 'react';

/**
 * Minimal GDPR cookie-consent banner for GA4 Consent Mode.
 *
 * Analytics is denied by default (set in index.html). This banner is the only
 * thing that flips analytics_storage to 'granted', and only after the visitor
 * clicks Accept. The choice is remembered in localStorage so the banner shows
 * once. Declining keeps analytics denied (GA4 still models traffic cookielessly).
 *
 * Styling uses the site's existing CSS variables so it matches both themes and
 * introduces no new design language.
 */

const STORAGE_KEY = 'cookie-consent-v1';

function gtagUpdate(granted) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let choice = null;
    try { choice = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    if (choice === 'granted') {
      gtagUpdate(true);
    } else if (choice === 'denied') {
      gtagUpdate(false);
    } else {
      setVisible(true);
    }
  }, []);

  const decide = (granted) => {
    try { localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied'); } catch (e) { /* ignore */ }
    gtagUpdate(granted);
    setVisible(false);
  };

  if (!visible) return null;

  const wrap = {
    position: 'fixed',
    left: '16px',
    right: '16px',
    bottom: '16px',
    zIndex: 9999,
    maxWidth: '620px',
    margin: '0 auto',
    background: 'var(--bg-card, #1a1f2e)',
    color: 'var(--text-secondary, #94a3b8)',
    border: '1px solid var(--border-light, #334155)',
    borderRadius: '14px',
    padding: '16px 18px',
    boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  };
  const text = { flex: '1 1 260px', minWidth: 0 };
  const btnRow = { display: 'flex', gap: '10px', flex: '0 0 auto' };
  const btnBase = {
    border: 'none',
    cursor: 'pointer',
    borderRadius: '9px',
    padding: '9px 16px',
    fontSize: '0.85rem',
    fontWeight: 700,
    fontFamily: 'inherit',
  };
  const accept = {
    ...btnBase,
    color: '#fff',
    background: 'linear-gradient(90deg, var(--accent-gradient-start, #0ea5e9), var(--accent-gradient-end, #6366f1))',
  };
  const decline = {
    ...btnBase,
    color: 'var(--text-primary, #f0f4f8)',
    background: 'transparent',
    border: '1px solid var(--border-light, #334155)',
  };

  return (
    <div style={wrap} role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div style={text}>
        This site uses cookies for anonymous analytics to understand how visitors
        use it. No personal data is sold or shared.
      </div>
      <div style={btnRow}>
        <button type="button" style={decline} onClick={() => decide(false)}>Decline</button>
        <button type="button" style={accept} onClick={() => decide(true)}>Accept</button>
      </div>
    </div>
  );
};

export default CookieConsent;
