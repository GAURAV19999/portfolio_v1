import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Keeps <link rel="canonical"> and <meta property="og:url"> in sync with the
 * current route. Without this, every SPA route inherits the homepage canonical
 * from index.html, which tells Google the blog/country/case-study pages are
 * duplicates of "/". Purely head-level — no visual output.
 */

const SITE = 'https://iamgaurav.netlify.app';

// Collapse alias routes onto one canonical URL so they aren't seen as duplicates.
const CANONICAL_ALIASES = {
  '/india': '/in',
  '/germany': '/de',
  '/netherlands': '/nl',
};

function canonicalPath(pathname) {
  // Normalise: strip trailing slash (keep root as "/")
  let p = pathname.replace(/\/+$/, '') || '/';
  if (CANONICAL_ALIASES[p]) p = CANONICAL_ALIASES[p];
  return p;
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

const CanonicalManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = SITE + canonicalPath(pathname);
    setLink('canonical', url === SITE + '/' ? SITE + '/' : url);
    setMeta('og:url', url);
  }, [pathname]);

  return null;
};

export default CanonicalManager;
