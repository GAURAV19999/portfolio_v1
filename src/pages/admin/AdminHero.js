import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const AdminHero = () => {
  const { data, updateField } = useData();
  const [h, setH] = useState(data.hero);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateField('hero', h);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const updStat = (id, f, v) => setH({ ...h, stats: h.stats.map(s => s.id === id ? { ...s, [f]: v } : s) });
  const addStat = () => setH({ ...h, stats: [...h.stats, { id: Date.now().toString(), number: '', label: '' }] });
  const delStat = (id) => setH({ ...h, stats: h.stats.filter(s => s.id !== id) });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-home"></i> Hero Section</h1>
          <p>Edit your homepage hero content.</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
      </div>
      <div className="admin-card">
        <h2>Main Content</h2>
        <div className="afg"><label>Badge Text</label><input value={h.badge} onChange={e => setH({ ...h, badge: e.target.value })} /></div>
        <div className="frow">
          <div className="afg"><label>Title Prefix</label><input value={h.titlePrefix} onChange={e => setH({ ...h, titlePrefix: e.target.value })} /></div>
          <div className="afg"><label>Title Accent (gradient)</label><input value={h.titleAccent} onChange={e => setH({ ...h, titleAccent: e.target.value })} /></div>
        </div>
        <div className="afg"><label>Title Suffix</label><input value={h.titleSuffix} onChange={e => setH({ ...h, titleSuffix: e.target.value })} /></div>
        <div className="afg"><label>Subtitle</label><input value={h.subtitle} onChange={e => setH({ ...h, subtitle: e.target.value })} /></div>
        <div className="afg"><label>Description (HTML allowed)</label><textarea value={h.description} onChange={e => setH({ ...h, description: e.target.value })} rows={4} /></div>
      </div>
      <div className="admin-card">
        <h2>Call-To-Action Buttons</h2>
        <div className="frow">
          <div className="afg"><label>Primary Button Text</label><input value={h.primaryCtaText} onChange={e => setH({ ...h, primaryCtaText: e.target.value })} /></div>
          <div className="afg"><label>Primary Button Icon (FA class)</label><input value={h.primaryCtaIcon} onChange={e => setH({ ...h, primaryCtaIcon: e.target.value })} /></div>
        </div>
        <div className="afg"><label>Primary Button Link</label><input value={h.primaryCtaLink} onChange={e => setH({ ...h, primaryCtaLink: e.target.value })} /></div>
        <div className="frow">
          <div className="afg"><label>Secondary Button Text</label><input value={h.secondaryCtaText} onChange={e => setH({ ...h, secondaryCtaText: e.target.value })} /></div>
          <div className="afg"><label>Secondary Button Icon</label><input value={h.secondaryCtaIcon} onChange={e => setH({ ...h, secondaryCtaIcon: e.target.value })} /></div>
        </div>
        <div className="afg"><label>Secondary Button Link</label><input value={h.secondaryCtaLink} onChange={e => setH({ ...h, secondaryCtaLink: e.target.value })} /></div>
      </div>
      <div className="admin-card">
        <h2>Statistics</h2>
        {h.stats.map(s => (
          <div key={s.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
            <div className="frow">
              <div className="afg"><label>Number</label><input value={s.number} onChange={e => updStat(s.id, 'number', e.target.value)} /></div>
              <div className="afg"><label>Label</label><input value={s.label} onChange={e => updStat(s.id, 'label', e.target.value)} /></div>
            </div>
            <button className="btn-sm btn-del" onClick={() => delStat(s.id)}>Remove</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addStat}>+ Add Stat</button>
      </div>
      <div className="admin-card">
        <h2>Visual</h2>
        <div className="afg"><label>Visual Icon (FA class)</label><input value={h.visualIcon} onChange={e => setH({ ...h, visualIcon: e.target.value })} /></div>
      </div>
      <div className="facts"><button className="btn-sm btn-save" onClick={save}><i className="fas fa-save"></i> Save All Changes</button></div>
    </div>
  );
};

export default AdminHero;
