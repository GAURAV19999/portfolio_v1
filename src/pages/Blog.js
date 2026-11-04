import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useMediumFeed from '../hooks/useMediumFeed';

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return iso;
  }
};

// ── Medium source badge ───────────────────────────────────────
const MediumBadge = () => (
  <span className="blog-medium-badge" title="Read on Medium">
    <svg width="12" height="12" viewBox="0 0 1043 592" aria-hidden="true">
      <ellipse cx="221" cy="296" rx="221" ry="296" fill="currentColor" />
      <path d="M565 0h313L1043 592H730L565 0z" fill="currentColor" />
      <ellipse cx="943" cy="296" rx="100" ry="296" fill="currentColor" />
    </svg>
    Medium
  </span>
);

// ── Skeleton card shown while Medium feed loads ───────────────
const SkeletonCard = () => (
  <div className="blog-card blog-skeleton" aria-hidden="true">
    <div className="blog-card-cover blog-skeleton-img" />
    <div className="blog-card-body">
      <div className="blog-skeleton-line short" />
      <div className="blog-skeleton-line" />
      <div className="blog-skeleton-line medium" />
      <div className="blog-skeleton-line short" />
    </div>
  </div>
);

// ── Filter bar ────────────────────────────────────────────────
const FILTERS = ['All', 'Medium', 'Articles'];

// ── List view: /blog ─────────────────────────────────────────
const Blog = () => {
  const { data }                        = useData();
  const blog                            = data?.blog;
  const { posts: mediumPosts, loading } = useMediumFeed();
  const [filter, setFilter]             = useState('All');

  useEffect(() => {
    document.title = 'Blog · Data & BI Insights | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, []);

  if (!blog?.enabled) return null;

  // Local blog posts tagged as source:'local'
  const localPosts = (blog.items || []).map((p) => ({ ...p, source: 'local' }));

  // All posts merged and sorted newest-first
  const allPosts = [...localPosts, ...mediumPosts].sort(
    (a, b) => (b.date || '').localeCompare(a.date || '')
  );

  const visible = allPosts.filter((p) => {
    if (filter === 'Medium')   return p.source === 'medium';
    if (filter === 'Articles') return p.source === 'local';
    return true;
  });

  const mediumCount = mediumPosts.length;
  const localCount  = localPosts.length;

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <span className="section-tag">{blog.sectionTag}</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              {blog.sectionTitle}
            </h1>
            <p className="section-intro" style={{ marginTop: '1rem' }}>
              {blog.sectionIntro}
            </p>
          </div>

          {/* Filter tabs */}
          <div className="blog-filter-bar">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`blog-filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
                <span className="blog-filter-count">
                  {f === 'All'      ? allPosts.length
                   : f === 'Medium' ? mediumCount
                   :                  localCount}
                </span>
              </button>
            ))}

            <a
              href={`https://medium.com/@gauravkrvish`}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-medium-cta"
            >
              <svg width="13" height="13" viewBox="0 0 1043 592" aria-hidden="true">
                <ellipse cx="221" cy="296" rx="221" ry="296" fill="currentColor" />
                <path d="M565 0h313L1043 592H730L565 0z" fill="currentColor" />
                <ellipse cx="943" cy="296" rx="100" ry="296" fill="currentColor" />
              </svg>
              Follow on Medium
            </a>
          </div>

          <div className="blog-grid">
            {/* Loading skeletons for Medium articles */}
            {loading && filter !== 'Articles' && [1, 2, 3].map((n) => (
              <SkeletonCard key={`sk-${n}`} />
            ))}

            {visible.map((post) => {
              const isMedium = post.source === 'medium';

              // Medium posts → external <a>; local posts → React <Link>
              const CardWrapper = ({ children }) =>
                isMedium ? (
                  <a
                    href={post.mediumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`blog-card${post.featured ? ' featured' : ''}`}
                  >
                    {children}
                  </a>
                ) : (
                  <Link
                    to={`/blog/${post.slug}`}
                    className={`blog-card${post.featured ? ' featured' : ''}`}
                  >
                    {children}
                  </Link>
                );

              return (
                <CardWrapper key={post.id}>
                  {post.coverImage && (
                    <div className="blog-card-cover">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      {post.featured && <span className="blog-featured-badge">⭐ Featured</span>}
                      {isMedium && <MediumBadge />}
                    </div>
                  )}
                  {/* Badge when no cover image */}
                  {!post.coverImage && isMedium && (
                    <div className="blog-card-cover blog-card-cover--placeholder">
                      <MediumBadge />
                    </div>
                  )}
                  <div className="blog-card-body">
                    <div className="blog-card-tags">
                      {(post.tags || []).slice(0, 3).map((t) => (
                        <span key={t} className="blog-tag">{t}</span>
                      ))}
                    </div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span><i className="far fa-calendar" />&nbsp;{fmtDate(post.date)}</span>
                      <span><i className="far fa-clock" />&nbsp;{post.readingTime}</span>
                      {isMedium && (
                        <span className="blog-read-on-medium">
                          Read on Medium <i className="fas fa-external-link-alt" style={{ fontSize: '0.65rem' }} />
                        </span>
                      )}
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>

          {!loading && visible.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 0' }}>
              No posts yet. Check back soon.
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-arrow-left" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
      <Footer data={data.footer} />
    </>
  );
};

// ── Detail view: /blog/:slug ─────────────────────────────────
export const BlogPost = () => {
  const { data }  = useData();
  const { slug }  = useParams();
  const post      = data?.blog?.items?.find((p) => p.slug === slug);

  useEffect(() => {
    document.title = post
      ? `${post.title} | Gaurav Vishvakarma`
      : 'Blog | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <>
        <Navbar logo={data.settings?.siteName} />
        <section style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Post not found</h1>
            <Link to="/blog" className="btn btn-primary">
              <i className="fas fa-arrow-left" /> All Posts
            </Link>
          </div>
        </section>
        <Footer data={data.footer} />
      </>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage ? `https://iamgaurav.netlify.app${post.coverImage}` : undefined,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Gaurav Kumar Vishvakarma',
      url: 'https://iamgaurav.netlify.app/',
    },
    publisher: {
      '@type': 'Person',
      name: 'Gaurav Kumar Vishvakarma',
    },
    mainEntityOfPage: `https://iamgaurav.netlify.app/blog/${post.slug}`,
    keywords: (post.tags || []).join(', '),
  };

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <article style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-primary)' }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <Link to="/blog" className="cs-back">
            <i className="fas fa-arrow-left" /> All Posts
          </Link>

          <div className="blog-post-tags">
            {(post.tags || []).map((t) => (
              <span key={t} className="blog-tag">{t}</span>
            ))}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span><i className="far fa-user" /> {post.author || 'Gaurav Kumar Vishvakarma'}</span>
            <span><i className="far fa-calendar" /> {fmtDate(post.date)}</span>
            <span><i className="far fa-clock" /> {post.readingTime}</span>
          </div>

          {post.coverImage && (
            <div className="blog-post-cover">
              <img src={post.coverImage} alt={post.title}
                   onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
          )}

          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          <div className="cs-cta-box" style={{ marginTop: '3rem' }}>
            <h3>Enjoyed this?</h3>
            <p>Follow me on LinkedIn for more field-notes on BI, Power BI &amp; freelance analytics.</p>
            <a href="https://linkedin.com/in/gauravkumarvishwakarma/" target="_blank" rel="noopener noreferrer"
               className="btn btn-primary">
              <i className="fab fa-linkedin" /> Connect on LinkedIn
            </a>
          </div>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Footer data={data.footer} />
    </>
  );
};

export default Blog;
