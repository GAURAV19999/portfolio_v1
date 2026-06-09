import React from 'react';
import { useData } from '../../context/DataContext';

const AdminMessages = () => {
  const { messages, markRead, deleteMsg } = useData();
  const sorted = [...(messages || [])].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-inbox"></i> Messages</h1>
          <p>Contact form submissions — {sorted.length} total, {sorted.filter(m => !m.read).length} unread.</p>
        </div>
      </div>
      {sorted.length === 0 ? (
        <div className="admin-card"><p style={{ color: 'var(--text-muted)' }}>No messages yet.</p></div>
      ) : sorted.map(m => (
        <div key={m.id} className={`msg-card ${!m.read ? 'unread' : ''}`}>
          <div className="msg-head">
            <div>
              <div className="msg-from">{m.name}</div>
              <div className="msg-email"><a href={`mailto:${m.email}`} style={{ color: 'var(--accent-light)' }}>{m.email}</a></div>
              {m.projectType && <div className="msg-email" style={{ marginTop: 4 }}>Project: <strong>{m.projectType}</strong>{m.budget && ` · Budget: ${m.budget}`}</div>}
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="msg-date">{new Date(m.timestamp).toLocaleString()}</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                {!m.read && <button className="btn-sm btn-sec" onClick={() => markRead(m.id)}>Mark Read</button>}
                <button className="btn-sm btn-del" onClick={() => window.confirm('Delete?') && deleteMsg(m.id)}>Delete</button>
              </div>
            </div>
          </div>
          <p className="msg-body">{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
