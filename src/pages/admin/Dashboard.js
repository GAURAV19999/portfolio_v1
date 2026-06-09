import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

const Dashboard = () => {
  const { data, messages } = useData();
  const stats = [
    { i: 'fas fa-rocket', v: data.projects?.length || 0, l: 'Projects', to: '/admin/projects' },
    { i: 'fas fa-briefcase', v: data.experience?.length || 0, l: 'Experience', to: '/admin/experience' },
    { i: 'fas fa-cogs', v: data.skills?.categories?.length || 0, l: 'Skill Categories', to: '/admin/skills' },
    { i: 'fas fa-tools', v: data.tools?.items?.length || 0, l: 'Tools', to: '/admin/tools' },
    { i: 'fas fa-certificate', v: data.certificates?.length || 0, l: 'Certificates', to: '/admin/certificates' },
    { i: 'fas fa-inbox', v: messages?.filter(m => !m.read).length || 0, l: 'New Messages', to: '/admin/messages' }
  ];
  const recent = [...(messages || [])].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back! Here's your portfolio overview.</p>
        </div>
      </div>
      <div className="stats-grid-admin">
        {stats.map((s, i) => (
          <Link key={i} to={s.to} className="stat-card-admin">
            <i className={s.i}></i>
            <div>
              <span className="stat-val">{s.v}</span>
              <span className="stat-lbl">{s.l}</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="admin-card">
        <h2><i className="fas fa-inbox"></i> Recent Messages</h2>
        {recent.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No messages yet. They'll appear here when visitors submit the contact form.</p>
        ) : recent.map(m => (
          <div key={m.id} className={`msg-card ${!m.read ? 'unread' : ''}`}>
            <div className="msg-head">
              <div>
                <div className="msg-from">{m.name}</div>
                <div className="msg-email">{m.email}</div>
              </div>
              <div className="msg-date">{new Date(m.timestamp).toLocaleDateString()}</div>
            </div>
            <p className="msg-body">{m.message.substring(0, 150)}{m.message.length > 150 ? '...' : ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
