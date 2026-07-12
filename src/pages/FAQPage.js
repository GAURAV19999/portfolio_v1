import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const FAQPage = () => {
  const { data } = useData();

  useEffect(() => {
    document.title = 'FAQ · Frequently Asked Questions | Gaurav Vishvakarma';
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <div style={{ paddingTop: '6rem' }}>
        <FAQ data={data.faq} />
        <div style={{ textAlign: 'center', paddingBottom: '4rem' }}>
          <Link to="/#contact" className="btn btn-primary" style={{ marginRight: '0.5rem' }}>
            <i className="fas fa-calendar-check"></i> Book a Discovery Call
          </Link>
          <Link to="/" className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Back to Home
          </Link>
        </div>
      </div>
      <Footer data={data.footer} />
    </>
  );
};

export default FAQPage;
