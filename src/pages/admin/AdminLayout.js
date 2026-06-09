import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useData, useTheme } from '../../context/DataContext';

const AdminLayout = ({ children }) => {
  const { auth, logout, messages, publishCfg, publishToCloud, publishStatus } = useData();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();
  const loc = useLocation();
  const unread = messages?.filter(m => !m.read).length || 0;
  const [showPublishModal, setShowPublishModal] = useState(false);

  useEffect(() => { if (!auth) nav('/admin'); }, [auth, nav]);
  if (!auth) return null;

  const items = [
    { p: '/admin/dashboard', l: 'Dashboard', i: 'fas fa-chart-pie' },
    { p: '/admin/hero', l: 'Hero', i: 'fas fa-home' },
    { p: '/admin/about', l: 'About', i: 'fas fa-user' },
    { p: '/admin/tools', l: 'Tools', i: 'fas fa-tools' },
    { p: '/admin/skills', l: 'Skills', i: 'fas fa-cogs' },
    { p: '/admin/experience', l: 'Experience', i: 'fas fa-briefcase' },
    { p: '/admin/projects', l: 'Projects', i: 'fas fa-rocket' },
    { p: '/admin/testimonials', l: 'Reviews', i: 'fas fa-star' },
    { p: '/admin/certificates', l: 'Certificates', i: 'fas fa-certificate' },
    { p: '/admin/contact', l: 'Contact Info', i: 'fas fa-envelope' },
    { p: '/admin/messages', l: `Messages${unread > 0 ? ` (${unread})` : ''}`, i: 'fas fa-inbox' },
    { p: '/admin/settings', l: 'Settings', i: 'fas fa-sliders-h' }
  ];

  const tokenReady = !!publishCfg?.token;

  const handlePublish = async () => {
    setShowPublishModal(true);
    await publishToCloud();
  };

  return (
    <div className="admin-layout-root">
      <aside className="admin-side">
        <h2>Admin Panel</h2>

        {/* Publish to Live banner */}
        <div className="publish-banner">
          {tokenReady ? (
            <>
              <button
                className="btn-publish"
                onClick={handlePublish}
                disabled={publishStatus.state === 'publishing'}
                title="Commit all changes to GitHub — Netlify auto-rebuilds the site"
              >
                {publishStatus.state === 'publishing' ? (
                  <><i className="fas fa-spinner fa-spin"></i> Publishing…</>
                ) : (
                  <><i className="fas fa-cloud-upload-alt"></i> Save & Publish Live</>
                )}
              </button>
              <small>Pushes to GitHub → Netlify rebuilds</small>
            </>
          ) : (
            <Link to="/admin/settings" className="btn-publish-setup">
              <i className="fas fa-exclamation-triangle"></i>
              Set up GitHub Publishing
            </Link>
          )}
        </div>

        <ul className="admin-nav-list">
          {items.map(it => (
            <li key={it.p}>
              <Link to={it.p} className={loc.pathname === it.p ? 'active' : ''}>
                <i className={it.i}></i> {it.l}
              </Link>
            </li>
          ))}
        </ul>
        <div className="admin-side-foot">
          <button className="btn-theme" onClick={toggle}>
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Link to="/" target="_blank" className="btn-view">
            <i className="fas fa-eye"></i> View Site
          </Link>
          <button className="btn-logout" onClick={() => { logout(); nav('/'); }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>
      <main className="admin-content">{children}</main>

      {/* Publish status modal */}
      {showPublishModal && publishStatus.state !== 'idle' && (
        <div className="modal-overlay-pub" onClick={() => publishStatus.state !== 'publishing' && setShowPublishModal(false)}>
          <div className="modal-pub" onClick={e => e.stopPropagation()}>
            {publishStatus.state === 'publishing' && (
              <>
                <div className="pub-icon spinning"><i className="fas fa-spinner fa-spin"></i></div>
                <h3>Publishing to GitHub…</h3>
                <p>{publishStatus.message}</p>
              </>
            )}
            {publishStatus.state === 'success' && (
              <>
                <div className="pub-icon success"><i className="fas fa-check-circle"></i></div>
                <h3>Published successfully! 🎉</h3>
                <p>{publishStatus.message}</p>
                {publishStatus.commitUrl && (
                  <a href={publishStatus.commitUrl} target="_blank" rel="noopener noreferrer" className="pub-link">
                    <i className="fab fa-github"></i> View commit on GitHub
                  </a>
                )}
                <p className="pub-tip">
                  💡 Netlify is rebuilding now. Changes appear on <strong>all devices worldwide</strong> in about 1–2 minutes. Hard-refresh (Ctrl+Shift+R) to see them.
                </p>
                <button className="btn-pub-close" onClick={() => setShowPublishModal(false)}>Close</button>
              </>
            )}
            {publishStatus.state === 'error' && (
              <>
                <div className="pub-icon error"><i className="fas fa-exclamation-circle"></i></div>
                <h3>Publish failed</h3>
                <pre className="pub-error">{publishStatus.message}</pre>
                <button className="btn-pub-close" onClick={() => setShowPublishModal(false)}>Close</button>
                <Link to="/admin/settings" className="pub-link" onClick={() => setShowPublishModal(false)}>
                  <i className="fas fa-cog"></i> Check Settings
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
