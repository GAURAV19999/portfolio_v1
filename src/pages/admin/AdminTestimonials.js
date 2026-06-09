import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const blank = { name: '', role: '', company: '', text: '', rating: 5, avatar: '', platform: '' };

const AdminTestimonials = () => {
  const { data, updateField } = useData();
  const t = data.testimonials || { enabled: true, sectionTag: 'Client Feedback', sectionTitle: '', sectionDesc: '', items: [] };
  const [editing, setEditing] = useState(null);
  const [saved, setSaved] = useState(false);

  const persist = (next) => { updateField('testimonials', next); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const updMeta = (f, v) => persist({ ...t, [f]: v });

  const handleSave = () => {
    const e2 = { ...editing, rating: parseInt(editing.rating, 10) || 5 };
    let items;
    if (t.items.find(x => x.id === e2.id)) {
      items = t.items.map(x => x.id === e2.id ? e2 : x);
    } else {
      items = [...t.items, { ...e2, id: Date.now().toString() }];
    }
    persist({ ...t, items });
    setEditing(null);
  };

  const handleDel = (id) => {
    if (window.confirm('Delete this review?')) {
      persist({ ...t, items: t.items.filter(x => x.id !== id) });
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-star"></i> Client Reviews</h1>
          <p>Manage testimonials and client feedback ({t.items?.length || 0} reviews).</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
        <button className="btn-sm btn-save" onClick={() => setEditing({ ...blank, id: Date.now().toString() })}>
          <i className="fas fa-plus"></i> Add Review
        </button>
      </div>

      <div className="admin-card">
        <div className="toggle-row">
          <label>Section Enabled</label>
          <label className="ts"><input type="checkbox" checked={!!t.enabled} onChange={e => updMeta('enabled', e.target.checked)} /><span className="sl"></span></label>
        </div>
        <div className="frow">
          <div className="afg"><label>Section Tag</label><input value={t.sectionTag || ''} onChange={e => updMeta('sectionTag', e.target.value)} /></div>
          <div className="afg"><label>Section Title</label><input value={t.sectionTitle || ''} onChange={e => updMeta('sectionTitle', e.target.value)} /></div>
        </div>
        <div className="afg"><label>Section Description</label><textarea value={t.sectionDesc || ''} onChange={e => updMeta('sectionDesc', e.target.value)} rows={2} /></div>
      </div>

      <div className="admin-card">
        <h2>Reviews</h2>
        <div className="item-list">
          {(t.items || []).map(r => (
            <div className="item-row" key={r.id}>
              <div className="item-info">
                <h3>{r.name} <span style={{ color: '#fbbf24', marginLeft: 8 }}>{'★'.repeat(r.rating || 5)}</span></h3>
                <p style={{ color: 'var(--accent-light)' }}>{r.role}{r.company ? ` · ${r.company}` : ''}</p>
                <p className="meta">"{(r.text || '').substring(0, 100)}..."</p>
                {r.platform && <p className="meta">Source: {r.platform}</p>}
              </div>
              <div className="item-acts">
                <button className="btn-sm btn-sec" onClick={() => setEditing(r)}>Edit</button>
                <button className="btn-sm btn-del" onClick={() => handleDel(r.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={ev => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box">
            <h2>{t.items.find(x => x.id === editing.id) ? 'Edit' : 'Add'} Review</h2>
            <div className="frow">
              <div className="afg"><label>Name</label><input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} /></div>
              <div className="afg"><label>Avatar Initials (e.g., SM)</label><input value={editing.avatar} maxLength={3} onChange={e => setEditing({ ...editing, avatar: e.target.value })} /></div>
            </div>
            <div className="frow">
              <div className="afg"><label>Role / Title</label><input value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} /></div>
              <div className="afg"><label>Company / Location</label><input value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} /></div>
            </div>
            <div className="frow">
              <div className="afg">
                <label>Rating (1-5)</label>
                <select value={editing.rating} onChange={e => setEditing({ ...editing, rating: e.target.value })}>
                  {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{'★'.repeat(n)} ({n})</option>)}
                </select>
              </div>
              <div className="afg"><label>Platform / Source</label><input value={editing.platform} onChange={e => setEditing({ ...editing, platform: e.target.value })} placeholder="e.g., Freelancer.com" /></div>
            </div>
            <div className="afg"><label>Review Text</label><textarea value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} rows={5} /></div>
            <div className="facts">
              <button className="btn-sm btn-save" onClick={handleSave}><i className="fas fa-save"></i> Save</button>
              <button className="btn-sm btn-sec" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;
