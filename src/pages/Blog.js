import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  } catch {
    return iso;
  }
};

// ── List view: /blog ─────────────────────────────────────────
const Blog = () => {
  const { data } = useData();
  const blog = data?.blog;

  useEffect(() => {
    document.title = 'Blog · Data & BI Insights | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, []);

  if (!blog?.enabled) return null;

  const items = [...(blog.items || [])].sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', background: 'var(--bg-primary)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '3rem' }}>
            <span className="section-tag">{blog.sectionTag}</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
              {blog.sectionTitle}
            </h1>
            <p className="section-intro" style={{ marginTop: '1rem' }}>
              {blog.sectionIntro}
            </p>
          </div>

          <div className="blog-grid">
            {items.map((post) => (
              <Link
                to={`/blog/${post.slug}`}
                key={post.id}
                className={`blog-card ${post.featured ? 'featured' : ''}`}
              >
                {post.coverImage && (
                  <div className="blog-card-cover">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    {post.featured && <span className="blog-featured-badge">⭐ Featured</span>}
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
                    <span><i className="far fa-calendar"></i> {fmtDate(post.date)}</span>
                    <span><i className="far fa-clock"></i> {post.readingTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {items.length === 0 && (
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem 0' }}>
              No posts yet. Check back soon.
            </p>
          )}

          <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
            <Link to="/" className="btn btn-secondary">
              <i className="fas fa-arrow-left"></i> Back to Home
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
  const { data } = useData();
  const { slug } = useParams();
  const post = data?.blog?.items?.find((p) => p.slug === slug);

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
              <i className="fas fa-arrow-left"></i> All Posts
            </Link>
          </div>
        </section>
        <Footer data={data.footer} />
      </>
    );
  }

  // Structured data for Article rich results
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
            <i className="fas fa-arrow-left"></i> All Posts
          </Link>

          <div className="blog-post-tags">
            {(post.tags || []).map((t) => (
              <span key={t} className="blog-tag">{t}</span>
            ))}
          </div>
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <span><i className="far fa-user"></i> {post.author || 'Gaurav Kumar Vishvakarma'}</span>
            <span><i className="far fa-calendar"></i> {fmtDate(post.date)}</span>
            <span><i className="far fa-clock"></i> {post.readingTime}</span>
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
              <i className="fab fa-linkedin"></i> Connect on LinkedIn
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
