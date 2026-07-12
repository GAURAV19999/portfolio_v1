import React, { useState } from 'react';

const FAQ = ({ data }) => {
  const [openId, setOpenId] = useState(null);

  if (!data?.enabled) return null;

  const toggle = (id) => setOpenId(openId === id ? null : id);

  // JSON-LD FAQ Schema for SEO (rich results)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (data.items || []).map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: (q.answer || '').replace(/<[^>]+>/g, ''),
      },
    })),
  };

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2 className="section-title" dangerouslySetInnerHTML={{ __html: data.sectionTitle }} />
          {data.sectionDesc && <p className="section-intro">{data.sectionDesc}</p>}
        </div>

        <div className="faq-list reveal">
          {(data.items || []).map((q) => {
            const open = openId === q.id;
            return (
              <div key={q.id} className={`faq-item ${open ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => toggle(q.id)}
                  aria-expanded={open}
                  aria-controls={`faq-a-${q.id}`}
                >
                  <span>{q.question}</span>
                  <i className={`fas ${open ? 'fa-minus' : 'fa-plus'}`}></i>
                </button>
                <div
                  id={`faq-a-${q.id}`}
                  className="faq-answer"
                  style={{ maxHeight: open ? '500px' : '0' }}
                >
                  <div
                    className="faq-answer-inner"
                    dangerouslySetInnerHTML={{ __html: q.answer }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Structured data for Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </div>
    </section>
  );
};

export default FAQ;
