import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const blank = { title: '', icon: 'fas fa-rocket', image: '', description: '', bullets: [], tags: [], link: '', linkLabel: 'View Code', linkIcon: 'fab fa-github' };

const AdminProjects = () => {
  const { data, addItem, updateItem, removeItem } = useData();
  const [editing, setEditing] = useState(null);

  const handleSave = () => {
    const ed = {
      ...editing,
      bullets: typeof editing.bullets === 'string' ? editing.bullets.split('\n').filter(b => b.trim()) : editing.bullets,
      tags: typeof editing.tags === 'string' ? editing.tags.split(',').map(t => t.trim()).filter(Boolean) : editing.tags
    };
    if (data.projects.find(p => p.id === ed.id)) updateItem('projects', ed.id, ed);
    else addItem('projects', ed);
    setEditing(null);
  };
  const handleDel = (id) => { if (window.confirm('Delete this project?')) removeItem('projects', id); };
  const handleEdit = (p) => setEditing({ ...p, bullets: (p.bullets || []).join('\n'), tags: (p.tags || []).join(', ') });
  const handleAdd = () => setEditing({ ...blank, id: Date.now().toString(), bullets: '', tags: '' });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-rocket"></i> Projects</h1>
          <p>Manage portfolio projects ({data.projects.length} total).</p>
        </div>
        <button className="btn-sm btn-save" onClick={handleAdd}><i className="fas fa-plus"></i> Add Project</button>
      </div>
      <div className="admin-card">
        <div className="item-list">
          {data.projects.map(p => (
            <div className="item-row" key={p.id}>
              {p.image && <img src={p.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }} onError={e => e.target.style.display = 'none'} />}
              <div className="item-info">
                <h3>{p.title}</h3>
                <p className="meta">{(p.description || '').replace(/<[^>]*>/g, '').substring(0, 100)}...</p>
              </div>
              <div className="item-acts">
                <button className="btn-sm btn-sec" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn-sm btn-del" onClick={() => handleDel(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="modal-overlay" onClick={ev => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box">
            <h2>{data.projects.find(p => p.id === editing.id) ? 'Edit' : 'Add'} Project</h2>
            <div className="afg"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div className="afg"><label>FA Icon Class</label><input value={editing.icon} onChange={e => setEditing({ ...editing, icon: e.target.value })} placeholder="fas fa-rocket" /></div>
            <ImageUploader
              label="Project Snapshot"
              value={editing.image}
              onChange={(v) => setEditing({ ...editing, image: v })}
              aspect="16/9"
              maxKB={800}
              folderHint="projects"
            />
            <div className="afg"><label>Description (HTML allowed)</label><textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} /></div>
            <div className="afg"><label>Bullets (one per line, HTML allowed)</label><textarea value={editing.bullets} onChange={e => setEditing({ ...editing, bullets: e.target.value })} rows={4} /></div>
            <div className="afg"><label>Tags (comma-separated)</label><input value={editing.tags} onChange={e => setEditing({ ...editing, tags: e.target.value })} /></div>
            <div className="frow">
              <div className="afg"><label>Link URL</label><input value={editing.link} onChange={e => setEditing({ ...editing, link: e.target.value })} /></div>
              <div className="afg"><label>Link Label</label><input value={editing.linkLabel} onChange={e => setEditing({ ...editing, linkLabel: e.target.value })} /></div>
            </div>
            <div className="afg"><label>Link Icon (FA class)</label><input value={editing.linkIcon} onChange={e => setEditing({ ...editing, linkIcon: e.target.value })} /></div>
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

export default AdminProjects;
