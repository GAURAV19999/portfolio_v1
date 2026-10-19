import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Google Analytics 4 (GA4) helper for this single-page app.
 *
 * The base gtag.js snippet lives in public/index.html with
 * `send_page_view:false`, so the initial automatic page_view is suppressed and
 * ALL page views are fired from here instead — once on mount and again on every
 * client-side route change. Without this, GA4 only ever records the first load
 * and every in-app navigation (blog posts, case studies, country pages) is lost.
 *
 * It also records the handful of conversions that actually matter via a single
 * delegated click listener: booking a discovery call (Calendly), WhatsApp,
 * email, and PDF / service-deck / resume downloads. Purely measurement — no
 * visual output, no layout change.
 */

const GA_ID = 'G-0VH5YVDE1N';

function gtag() {
  // Mirror the global gtag defined in index.html; stay safe if GA is blocked.
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

const Analytics = () => {
  const { pathname } = useLocation();

  // Fire a page_view on first mount and on every route change.
  useEffect(() => {
    const page_path = pathname + window.location.search;
    gtag('event', 'page_view', {
      page_path,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_ID,
    });
  }, [pathname]);

  // Track key conversions via one delegated listener (set up once).
  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      if (!target || !target.closest) return;
      const a = target.closest('a');
      if (!a) return;
      const href = (a.getAttribute('href') || '').toLowerCase();
      if (!href) return;

      if (href.includes('calendly.com')) {
        gtag('event', 'discovery_call_click', { link_url: href, send_to: GA_ID });
      } else if (href.includes('wa.me') || href.includes('whatsapp') || href.includes('api.whatsapp')) {
        gtag('event', 'whatsapp_click', { link_url: href, send_to: GA_ID });
      } else if (href.startsWith('mailto:')) {
        gtag('event', 'email_click', { link_url: href, send_to: GA_ID });
      } else if (href.startsWith('tel:')) {
        gtag('event', 'phone_click', { link_url: href, send_to: GA_ID });
      } else if (href.endsWith('.pdf') || href.includes('/downloads/')) {
        const file_name = href.split('/').pop();
        gtag('event', 'file_download', { link_url: href, file_name, send_to: GA_ID });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default Analytics;
