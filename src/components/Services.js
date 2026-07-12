import React, { useState, useEffect } from 'react';
import {
  detectCurrency,
  setCurrency as persistCurrency,
  convertPriceString,
  AVAILABLE_CURRENCIES,
} from '../utils/currency';

const Services = ({ data }) => {
  const [currency, setCurrencyState] = useState(() => detectCurrency());

  useEffect(() => {
    // Re-detect on mount in case timezone changed etc.
    setCurrencyState(detectCurrency());
  }, []);

  const pickCurrency = (c) => {
    setCurrencyState(c);
    persistCurrency(c.code);
  };

  if (!data?.enabled) return null;

  return (
    <section id="services" className="services-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">{data.sectionTag}</span>
          <h2
            className="section-title"
            dangerouslySetInnerHTML={{ __html: data.sectionTitle }}
          />
          <p className="section-intro">{data.sectionIntro}</p>

          {/* Currency pill switcher — all options visible inline */}
          <div className="currency-pills-wrap">
            <span className="currency-pills-label">
              <i className="fas fa-globe"></i> View pricing in:
            </span>
            <div className="currency-pills" role="tablist" aria-label="Select currency">
              {AVAILABLE_CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  role="tab"
                  aria-selected={c.code === currency.code}
                  className={`currency-pill ${c.code === currency.code ? 'active' : ''}`}
                  onClick={() => pickCurrency(c)}
                  title={`Show prices in ${c.code}`}
                >
                  <span className="pill-sym">{c.symbol}</span>
                  <span className="pill-code">{c.code}</span>
                </button>
              ))}
            </div>
            {currency.code !== 'USD' && (
              <small className="currency-note">
                Approx conversion from USD · exact quote in {currency.code} on request
              </small>
            )}
          </div>
        </div>

        <div className="services-grid">
          {data.items?.map((service) => (
            <div
              key={service.id}
              className={`service-card reveal ${service.featured ? 'featured' : ''}`}
            >
              {service.featured && service.featuredLabel && (
                <div className="service-featured-badge">
                  {service.featuredLabel}
                </div>
              )}
              <div className="service-icon">
                <i className={service.icon}></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-pricing">
                <div className="service-price">
                  {convertPriceString(service.priceRange, currency)}
                </div>
                <div className="service-timeline">
                  <i className="fas fa-clock"></i> {service.timeline}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.ctaText && (
          <div className="services-cta reveal">
            <p className="services-cta-text">{data.ctaText}</p>
            <a
              href={data.ctaLink || '#contact'}
              className="btn btn-primary btn-large"
            >
              {data.ctaButton}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
