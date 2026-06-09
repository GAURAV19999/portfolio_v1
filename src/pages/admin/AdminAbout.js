import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const AdminAbout = () => {
  const { data, updateField } = useData();
  const [a, setA] = useState(data.about);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateField('about', a);
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  };

  const updP = (i, v) => setA({ ...a, paragraphs: a.paragraphs.map((p, idx) => idx === i ? v : p) });
  const addP = () => setA({ ...a, paragraphs: [...a.paragraphs, ''] });
  const delP = (i) => setA({ ...a, paragraphs: a.paragraphs.filter((_, idx) => idx !== i) });

  const updS = (id, f, v) => setA({ ...a, socials: a.socials.map(s => s.id === id ? { ...s, [f]: v } : s) });
  const addS = () => setA({ ...a, socials: [...a.socials, { id: Date.now().toString(), icon: '', title: '', url: '' }] });
  const delS = (id) => setA({ ...a, socials: a.socials.filter(s => s.id !== id) });

  const updH = (id, f, v) => setA({ ...a, highlights: a.highlights.map(h => h.id === id ? { ...h, [f]: v } : h) });
  const addH = () => setA({ ...a, highlights: [...a.highlights, { id: Date.now().toString(), icon: '', title: '', desc: '' }] });
  const delH = (id) => setA({ ...a, highlights: a.highlights.filter(h => h.id !== id) });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-user"></i> About Section</h1>
          <p>Manage your About content, photo, socials, and highlights.</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
      </div>
      <div className="admin-card">
        <div className="toggle-row">
          <label>Section Enabled</label>
          <label className="ts"><input type="checkbox" checked={a.enabled} onChange={e => setA({ ...a, enabled: e.target.checked })} /><span className="sl"></span></label>
        </div>
        <div className="frow">
          <div className="afg"><label>Section Tag</label><input value={a.sectionTag} onChange={e => setA({ ...a, sectionTag: e.target.value })} /></div>
          <div className="afg"><label>Photo Badge</label><input value={a.photoBadge} onChange={e => setA({ ...a, photoBadge: e.target.value })} /></div>
        </div>
        <div className="afg"><label>Section Title (use &lt;br&gt; for line break)</label><input value={a.sectionTitle} onChange={e => setA({ ...a, sectionTitle: e.target.value })} /></div>
        <ImageUploader
          label="Profile Photo"
          value={a.photoUrl}
          onChange={(v) => setA({ ...a, photoUrl: v })}
          aspect="4/5"
          maxKB={800}
          folderHint=""
        />
        <div className="afg"><label>Greeting</label><input value={a.greeting} onChange={e => setA({ ...a, greeting: e.target.value })} /></div>
      </div>
      <div className="admin-card">
        <h2>Paragraphs</h2>
        {a.paragraphs.map((p, i) => (
          <div className="afg" key={i}>
            <label>Paragraph {i + 1} <button className="btn-sm btn-del" onClick={() => delP(i)} style={{ marginLeft: 8 }}>✕</button></label>
            <textarea value={p} onChange={e => updP(i, e.target.value)} rows={3} />
            <small>HTML supported (e.g., &lt;strong&gt;)</small>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addP}>+ Add Paragraph</button>
      </div>
      <div className="admin-card">
        <h2>Social Links</h2>
        {a.socials.map(s => (
          <div key={s.id} className="frow" style={{ alignItems: 'end', marginBottom: '0.5rem' }}>
            <div className="afg"><label>FA Icon Class</label><input value={s.icon} onChange={e => updS(s.id, 'icon', e.target.value)} /></div>
            <div className="afg"><label>Title</label><input value={s.title} onChange={e => updS(s.id, 'title', e.target.value)} /></div>
            <div className="afg" style={{ display: 'flex', gap: 6 }}>
              <div style={{ flex: 1 }}><label>URL</label><input value={s.url} onChange={e => updS(s.id, 'url', e.target.value)} /></div>
              <button className="btn-sm btn-del" style={{ marginBottom: 1, height: 38 }} onClick={() => delS(s.id)}>✕</button>
            </div>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addS}>+ Add Social</button>
      </div>
      <div className="admin-card">
        <h2>Highlight Cards</h2>
        {a.highlights.map(h => (
          <div key={h.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
            <div className="frow">
              <div className="afg"><label>FA Icon Class</label><input value={h.icon} onChange={e => updH(h.id, 'icon', e.target.value)} /></div>
              <div className="afg"><label>Title</label><input value={h.title} onChange={e => updH(h.id, 'title', e.target.value)} /></div>
            </div>
            <div className="afg"><label>Description</label><textarea value={h.desc} onChange={e => updH(h.id, 'desc', e.target.value)} rows={2} /></div>
            <button className="btn-sm btn-del" onClick={() => delH(h.id)}>Remove</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addH}>+ Add Highlight</button>
      </div>
      <div className="facts"><button className="btn-sm btn-save" onClick={save}><i className="fas fa-save"></i> Save All Changes</button></div>
    </div>
  );
};

export default AdminAbout;
