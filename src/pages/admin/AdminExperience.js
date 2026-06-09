import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const blank = { title: '', company: '', companyLink: '', companyLinkText: '', companyIcon: 'fas fa-building', date: '', location: '', bullets: [], tools: [] };

const AdminExperience = () => {
  const { data, addItem, updateItem, removeItem } = useData();
  const [editing, setEditing] = useState(null);

  const handleSave = () => {
    const ed = {
      ...editing,
      bullets: typeof editing.bullets === 'string' ? editing.bullets.split('\n').filter(b => b.trim()) : editing.bullets,
      tools: typeof editing.tools === 'string' ? editing.tools.split(',').map(t => t.trim()).filter(Boolean) : editing.tools
    };
    if (data.experience.find(e => e.id === ed.id)) updateItem('experience', ed.id, ed);
    else addItem('experience', ed);
    setEditing(null);
  };
  const handleDel = (id) => { if (window.confirm('Delete this entry?')) removeItem('experience', id); };
  const handleEdit = (e) => setEditing({ ...e, bullets: (e.bullets || []).join('\n'), tools: (e.tools || []).join(', ') });
  const handleAdd = () => setEditing({ ...blank, id: Date.now().toString(), bullets: '', tools: '' });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-briefcase"></i> Experience</h1>
          <p>Manage work experience entries.</p>
        </div>
        <button className="btn-sm btn-save" onClick={handleAdd}><i className="fas fa-plus"></i> Add Experience</button>
      </div>
      <div className="admin-card">
        <div className="item-list">
          {data.experience.map(e => (
            <div className="item-row" key={e.id}>
              <div className="item-info">
                <h3>{e.title}</h3>
                <p style={{ color: 'var(--accent-light)' }}>{e.company}</p>
                <p className="meta">{e.date} · {e.location}</p>
              </div>
              <div className="item-acts">
                <button className="btn-sm btn-sec" onClick={() => handleEdit(e)}>Edit</button>
                <button className="btn-sm btn-del" onClick={() => handleDel(e.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="modal-overlay" onClick={ev => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box">
            <h2>{data.experience.find(e => e.id === editing.id) ? 'Edit' : 'Add'} Experience</h2>
            <div className="afg"><label>Job Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div className="frow">
              <div className="afg"><label>Company</label><input value={editing.company} onChange={e => setEditing({ ...editing, company: e.target.value })} /></div>
              <div className="afg"><label>Company FA Icon</label><input value={editing.companyIcon} onChange={e => setEditing({ ...editing, companyIcon: e.target.value })} /></div>
            </div>
            <div className="frow">
              <div className="afg"><label>Company Link URL</label><input value={editing.companyLink} onChange={e => setEditing({ ...editing, companyLink: e.target.value })} /></div>
              <div className="afg"><label>Company Link Label</label><input value={editing.companyLinkText} onChange={e => setEditing({ ...editing, companyLinkText: e.target.value })} /></div>
            </div>
            <div className="frow">
              <div className="afg"><label>Date Range</label><input value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} placeholder="e.g., Aug 2025 – Present" /></div>
              <div className="afg"><label>Location</label><input value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} /></div>
            </div>
            <div className="afg"><label>Bullets (one per line, HTML allowed)</label><textarea value={editing.bullets} onChange={e => setEditing({ ...editing, bullets: e.target.value })} rows={6} /></div>
            <div className="afg"><label>Tools (comma-separated)</label><input value={editing.tools} onChange={e => setEditing({ ...editing, tools: e.target.value })} /></div>
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

export default AdminExperience;
