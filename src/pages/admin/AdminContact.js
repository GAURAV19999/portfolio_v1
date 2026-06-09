import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const AdminContact = () => {
  const { data, updateField } = useData();
  const [c, setC] = useState(data.contact);
  const [saved, setSaved] = useState(false);

  const save = () => { updateField('contact', c); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const upd = (id, f, v) => setC({ ...c, items: c.items.map(i => i.id === id ? { ...i, [f]: v } : i) });
  const add = () => setC({ ...c, items: [...c.items, { id: Date.now().toString(), icon: 'fas fa-link', label: '', value: '', link: '' }] });
  const del = (id) => setC({ ...c, items: c.items.filter(i => i.id !== id) });

  const updB = (id, f, v) => setC({ ...c, ctaButtons: (c.ctaButtons || []).map(b => b.id === id ? { ...b, [f]: v } : b) });
  const addB = () => setC({ ...c, ctaButtons: [...(c.ctaButtons || []), { id: Date.now().toString(), icon: 'fas fa-link', text: '', link: '', primary: false }] });
  const delB = (id) => setC({ ...c, ctaButtons: (c.ctaButtons || []).filter(b => b.id !== id) });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-envelope"></i> Contact Info</h1>
          <p>Manage contact section content.</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
      </div>
      <div className="admin-card">
        <h2>Headings & Text</h2>
        <div className="frow">
          <div className="afg"><label>Section Tag</label><input value={c.sectionTag} onChange={e => setC({ ...c, sectionTag: e.target.value })} /></div>
          <div className="afg"><label>Section Title</label><input value={c.sectionTitle} onChange={e => setC({ ...c, sectionTitle: e.target.value })} /></div>
        </div>
        <div className="afg"><label>Form Heading</label><input value={c.formHeading} onChange={e => setC({ ...c, formHeading: e.target.value })} /></div>
        <div className="afg"><label>Form Intro</label><input value={c.formIntro} onChange={e => setC({ ...c, formIntro: e.target.value })} /></div>
        <div className="afg"><label>Side Heading</label><input value={c.sideHeading} onChange={e => setC({ ...c, sideHeading: e.target.value })} /></div>
        <div className="afg"><label>Side Intro (HTML allowed)</label><textarea value={c.sideIntro} onChange={e => setC({ ...c, sideIntro: e.target.value })} rows={3} /></div>
      </div>
      <div className="admin-card">
        <h2>Contact Items</h2>
        {c.items.map(it => (
          <div key={it.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', marginBottom: '0.5rem' }}>
            <div className="frow">
              <div className="afg"><label>FA Icon Class</label><input value={it.icon} onChange={e => upd(it.id, 'icon', e.target.value)} /></div>
              <div className="afg"><label>Label</label><input value={it.label} onChange={e => upd(it.id, 'label', e.target.value)} /></div>
            </div>
            <div className="frow">
              <div className="afg"><label>Value (displayed)</label><input value={it.value} onChange={e => upd(it.id, 'value', e.target.value)} /></div>
              <div className="afg"><label>Link URL (optional)</label><input value={it.link} onChange={e => upd(it.id, 'link', e.target.value)} /></div>
            </div>
            <button className="btn-sm btn-del" onClick={() => del(it.id)}>Remove</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={add}>+ Add Contact Item</button>
      </div>
      <div className="admin-card">
        <h2>📊 Google Sheet Integration</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Paste your Google Apps Script Web App URL here to automatically save contact form submissions to your Google Sheet. Leave empty to disable.
        </p>
        <div className="afg">
          <label>Google Apps Script URL</label>
          <input value={c.googleSheetUrl || ''} onChange={e => setC({ ...c, googleSheetUrl: e.target.value })} placeholder="https://script.google.com/macros/s/.../exec" />
          <small>Form submissions are <strong>always</strong> saved to the admin Messages inbox. If a URL is set here, they're also POSTed to your Google Sheet.</small>
        </div>
      </div>
      <div className="admin-card">
        <h2>"Have a Role or Project?" CTA Box</h2>
        <div className="afg"><label>Heading</label><input value={c.ctaHeading} onChange={e => setC({ ...c, ctaHeading: e.target.value })} /></div>
        <div className="afg"><label>Description Text</label><textarea value={c.ctaText} onChange={e => setC({ ...c, ctaText: e.target.value })} rows={2} /></div>
        <h3 style={{ fontSize: '0.95rem', margin: '1rem 0 0.75rem' }}>CTA Buttons</h3>
        {(c.ctaButtons || []).map(b => (
          <div key={b.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', marginBottom: '0.5rem' }}>
            <div className="frow">
              <div className="afg"><label>FA Icon Class</label><input value={b.icon} onChange={e => updB(b.id, 'icon', e.target.value)} placeholder="fas fa-paper-plane" /></div>
              <div className="afg"><label>Button Text</label><input value={b.text} onChange={e => updB(b.id, 'text', e.target.value)} /></div>
            </div>
            <div className="afg"><label>Link URL</label><input value={b.link} onChange={e => updB(b.id, 'link', e.target.value)} placeholder="https://... or mailto:..." /></div>
            <div className="toggle-row">
              <label>Primary Style (filled white)</label>
              <label className="ts"><input type="checkbox" checked={!!b.primary} onChange={e => updB(b.id, 'primary', e.target.checked)} /><span className="sl"></span></label>
            </div>
            <button className="btn-sm btn-del" onClick={() => delB(b.id)}>Remove</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={addB}>+ Add CTA Button</button>
      </div>
      <div className="facts"><button className="btn-sm btn-save" onClick={save}><i className="fas fa-save"></i> Save Changes</button></div>
    </div>
  );
};

export default AdminContact;
