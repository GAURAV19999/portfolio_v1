import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const AdminSkills = () => {
  const { data, updateField } = useData();
  const [s, setS] = useState(data.skills);
  const [saved, setSaved] = useState(false);

  const save = () => { updateField('skills', s); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const updCat = (id, f, v) => setS({ ...s, categories: s.categories.map(c => c.id === id ? { ...c, [f]: v } : c) });
  const updTags = (id, str) => updCat(id, 'tags', str.split(',').map(t => t.trim()).filter(Boolean));
  const addCat = () => setS({ ...s, categories: [...s.categories, { id: Date.now().toString(), icon: 'fas fa-star', title: '', tags: [], secondary: false }] });
  const delCat = (id) => setS({ ...s, categories: s.categories.filter(c => c.id !== id) });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-cogs"></i> Skills</h1>
          <p>Manage technical skills categories.</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
      </div>
      <div className="admin-card">
        <div className="toggle-row">
          <label>Section Enabled</label>
          <label className="ts"><input type="checkbox" checked={s.enabled} onChange={e => setS({ ...s, enabled: e.target.checked })} /><span className="sl"></span></label>
        </div>
        <div className="afg"><label>Section Tag</label><input value={s.sectionTag} onChange={e => setS({ ...s, sectionTag: e.target.value })} /></div>
        <div className="afg"><label>Section Title</label><input value={s.sectionTitle} onChange={e => setS({ ...s, sectionTitle: e.target.value })} /></div>
        <div className="afg"><label>Section Description</label><textarea value={s.sectionDesc} onChange={e => setS({ ...s, sectionDesc: e.target.value })} rows={2} /></div>
      </div>
      <div className="admin-card">
        <h2>Skill Categories</h2>
        {s.categories.map(c => (
          <div key={c.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1.25rem', marginBottom: '0.75rem' }}>
            <div className="frow">
              <div className="afg"><label>FA Icon Class</label><input value={c.icon} onChange={e => updCat(c.id, 'icon', e.target.value)} placeholder="fas fa-chart-bar" /></div>
              <div className="afg"><label>Title</label><input value={c.title} onChange={e => updCat(c.id, 'title', e.target.value)} /></div>
            </div>
            <div className="afg"><label>Tags (comma-separated)</label><input value={c.tags.join(', ')} onChange={e => updTags(c.id, e.target.value)} /></div>
            <div className="toggle-row">
              <label>Use Secondary Style</label>
              <label className="ts"><input type="checkbox" checked={!!c.secondary} onChange={e => updCat(c.id, 'secondary', e.target.checked)} /><span className="sl"></span></label>
            </div>
            <button className="btn-sm btn-del" onClick={() => delCat(c.id)}>Remove Category</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addCat}>+ Add Category</button>
      </div>
      <div className="facts"><button className="btn-sm btn-save" onClick={save}><i className="fas fa-save"></i> Save Changes</button></div>
    </div>
  );
};

export default AdminSkills;
