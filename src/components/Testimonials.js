import React from 'react';

const Stars = ({ count }) => (
  <div className="review-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <i key={i} className={i < count ? 'fas fa-star' : 'far fa-star'}></i>
    ))}
  </div>
);

const Testimonials = ({ data }) => {
  if (!data?.enabled || !data.items?.length) return null;
  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2 className="section-title">{data.sectionTitle}</h2>
          {data.sectionDesc && <p className="section-desc">{data.sectionDesc}</p>}
        </div>
        <div className="reviews-grid">
          {data.items.map((r, i) => (
            <div key={r.id} className={`review-card reveal stagger-${(i % 4) + 1}`}>
              <div className="review-top">
                <Stars count={r.rating || 5} />
                {r.platform && <span className="review-platform">{r.platform}</span>}
              </div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{r.avatar || r.name?.[0]}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-role">{r.role}{r.company && <> · <span>{r.company}</span></>}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
