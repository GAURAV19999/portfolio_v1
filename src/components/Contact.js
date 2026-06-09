import React, { useState } from 'react';

const Contact = ({ data, addMessage }) => {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.projectType || !form.message) return;
    setSubmitting(true);

    // 1) Always save to admin inbox (localStorage)
    if (addMessage) addMessage({ ...form });

    // 2) If a Google Sheet Apps Script URL is configured, POST the data
    if (data.googleSheetUrl) {
      try {
        const payload = new FormData();
        Object.entries(form).forEach(([k, v]) => payload.append(k, v));
        payload.append('timestamp', new Date().toISOString());
        await fetch(data.googleSheetUrl, { method: 'POST', mode: 'no-cors', body: payload });
      } catch (err) {
        // Silently continue — message is already in admin inbox
        console.warn('Google Sheet sync failed:', err);
      }
    }

    setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
    setShowSuccess(true);
    setSubmitting(false);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  if (!data) return null;

  return (
    <section id="contact" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2 className="section-title">{data.sectionTitle}</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-form-wrapper reveal">
            <h3>{data.formHeading}</h3>
            <p>{data.formIntro}</p>
            <form onSubmit={submit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" value={form.name} onChange={change} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" name="email" placeholder="john@company.com" value={form.email} onChange={change} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="projectType">Project Type</label>
                  <select id="projectType" name="projectType" value={form.projectType} onChange={change} required>
                    <option value="" disabled>Select project type</option>
                    <option value="dashboard">Power BI / Tableau Dashboard</option>
                    <option value="etl">ETL Pipeline & Data Automation</option>
                    <option value="reporting">Reporting & Analytics</option>
                    <option value="data-cleaning">Data Cleaning & Validation</option>
                    <option value="consulting">Data Consulting & Strategy</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="budget">Budget Range (USD)</label>
                  <select id="budget" name="budget" value={form.budget} onChange={change}>
                    <option value="" disabled>Select budget</option>
                    <option value="500-1000">$500 – $1,000</option>
                    <option value="1000-3000">$1,000 – $3,000</option>
                    <option value="3000-5000">$3,000 – $5,000</option>
                    <option value="5000+">$5,000+</option>
                    <option value="discuss">Let's Discuss</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea id="message" name="message" placeholder="Tell me about your project, timeline, and data sources..." value={form.message} onChange={change} required />
              </div>
              <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
                {submitting ? <><i className="fas fa-spinner fa-spin"></i> Sending...</> : <><i className="fas fa-paper-plane"></i> Send Message</>}
              </button>
            </form>
            {showSuccess && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid var(--success)', borderRadius: 10, color: 'var(--success)', textAlign: 'center', fontWeight: 600 }}>
                <i className="fas fa-check-circle"></i> Message sent successfully! I'll reply within 24 hours.
              </div>
            )}
          </div>
          <div className="contact-info-side reveal">
            <h3>{data.sideHeading}</h3>
            <p dangerouslySetInnerHTML={{ __html: data.sideIntro }} />
            <div className="contact-items">
              {data.items.map(it => {
                const Tag = it.link ? 'a' : 'div';
                const props = it.link ? { href: it.link, target: it.link.startsWith('http') ? '_blank' : undefined, rel: 'noopener noreferrer' } : { style: { cursor: 'default' } };
                return (
                  <Tag key={it.id} className="contact-item" {...props}>
                    <i className={it.icon}></i>
                    <div>
                      <span className="label">{it.label}</span>
                      <span className="value">{it.value}</span>
                    </div>
                  </Tag>
                );
              })}
            </div>
            <div className="contact-cta-box">
              <h3>{data.ctaHeading}</h3>
              <p>{data.ctaText}</p>
              <div className="cta-btn-group">
                {(data.ctaButtons || []).map(b => (
                  <a
                    key={b.id}
                    href={b.link}
                    target={b.link?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className={b.primary ? 'btn-white' : 'btn-white-outline'}
                  >
                    <i className={b.icon}></i> {b.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
