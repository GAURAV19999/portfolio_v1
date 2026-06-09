import React, { useEffect } from 'react';
import { useData } from '../context/DataContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Tools from '../components/Tools';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  const { data, addMessage } = useData();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);

  return (
    <>
      <Navbar logo={data.settings?.siteName} />
      <Hero data={data.hero} />
      <About data={data.about} />
      <Tools data={data.tools} />
      <Skills data={data.skills} />
      <Experience data={data.experience} />
      <Projects data={data.projects} />
      <Testimonials data={data.testimonials} />
      <Certificates data={data.certificates} />
      <Contact data={data.contact} addMessage={addMessage} />
      <Footer data={data.footer} />
    </>
  );
};

export default Home;
