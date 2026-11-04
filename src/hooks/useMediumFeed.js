/**
 * useMediumFeed — fetches the Medium RSS feed for @gauravkrvish via
 * rss2json.com (CORS-safe) and returns a normalised list of posts that
 * matches the shape used in portfolioData.json.
 *
 * Results are cached in localStorage for 1 hour to avoid hammering the
 * free-tier API limit on every page visit.
 */

import { useState, useEffect } from 'react';

const MEDIUM_USERNAME = 'gauravkrvish';
const RSS_URL        = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const API_URL        = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=20`;
const CACHE_KEY      = 'medium_feed_cache_v1';
const CACHE_TTL_MS   = 60 * 60 * 1000; // 1 hour

/** Pull the first <img> src from an HTML string. */
function extractFirstImage(html) {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

/** Strip all HTML tags and return plain text. */
function stripHtml(html) {
  return (html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Rough reading-time estimate at 200 wpm. */
function estimateReadTime(html) {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/** Build a URL-safe slug from a title. */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

/** Map one rss2json item → blog-card shape. */
function mapItem(item) {
  const plainExcerpt = stripHtml(item.description || item.content || '');
  return {
    id:          `medium-${item.guid}`,
    slug:        `medium-${slugify(item.title || '')}`,
    title:       item.title || 'Untitled',
    excerpt:     plainExcerpt.slice(0, 200) + (plainExcerpt.length > 200 ? '…' : ''),
    tags:        (item.categories || []).slice(0, 5),
    author:      item.author || 'Gaurav Kumar Vishvakarma',
    date:        (item.pubDate || '').slice(0, 10),
    readingTime: estimateReadTime(item.content || item.description),
    coverImage:  extractFirstImage(item.content || item.description),
    mediumUrl:   item.link,
    source:      'medium',
  };
}

export default function useMediumFeed() {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    // Try the cache first
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw);
        if (cached?.ts && Date.now() - cached.ts < CACHE_TTL_MS) {
          setPosts(cached.posts || []);
          setLoading(false);
          return;
        }
      }
    } catch { /* ignore */ }

    let cancelled = false;

    fetch(API_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        if (data.status !== 'ok') throw new Error(data.message || 'Feed error');

        const items = (data.items || []).map(mapItem);

        // Persist to cache
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), posts: items }));
        } catch { /* quota exceeded – skip */ }

        setPosts(items);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        console.warn('[useMediumFeed] fetch failed:', err.message);
        setError(err.message);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { posts, loading, error };
}
