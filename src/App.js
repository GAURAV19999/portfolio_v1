import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider, ThemeProvider } from './context/DataContext';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Home from './pages/Home';
import CountryLanding from './pages/CountryLanding';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminHero from './pages/admin/AdminHero';
import AdminAbout from './pages/admin/AdminAbout';
import AdminTools from './pages/admin/AdminTools';
import AdminSkills from './pages/admin/AdminSkills';
import AdminExperience from './pages/admin/AdminExperience';
import AdminProjects from './pages/admin/AdminProjects';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminContact from './pages/admin/AdminContact';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';

const wrap = (C) => <AdminLayout><C /></AdminLayout>;

const App = () => (
  <ThemeProvider>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Country-specific SEO landing pages */}
          <Route path="/in" element={<CountryLanding country="india" />} />
          <Route path="/india" element={<CountryLanding country="india" />} />
          <Route path="/uk" element={<CountryLanding country="uk" />} />
          <Route path="/de" element={<CountryLanding country="germany" />} />
          <Route path="/germany" element={<CountryLanding country="germany" />} />
          <Route path="/nl" element={<CountryLanding country="netherlands" />} />
          <Route path="/netherlands" element={<CountryLanding country="netherlands" />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={wrap(Dashboard)} />
          <Route path="/admin/hero" element={wrap(AdminHero)} />
          <Route path="/admin/about" element={wrap(AdminAbout)} />
          <Route path="/admin/tools" element={wrap(AdminTools)} />
          <Route path="/admin/skills" element={wrap(AdminSkills)} />
          <Route path="/admin/experience" element={wrap(AdminExperience)} />
          <Route path="/admin/projects" element={wrap(AdminProjects)} />
          <Route path="/admin/testimonials" element={wrap(AdminTestimonials)} />
          <Route path="/admin/certificates" element={wrap(AdminCertificates)} />
          <Route path="/admin/contact" element={wrap(AdminContact)} />
          <Route path="/admin/messages" element={wrap(AdminMessages)} />
          <Route path="/admin/settings" element={wrap(AdminSettings)} />
        </Routes>
        <SpeedInsights />
      </BrowserRouter>
    </DataProvider>
  </ThemeProvider>
);

export default App;
