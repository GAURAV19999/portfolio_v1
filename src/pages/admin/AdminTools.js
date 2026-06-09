import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const AdminTools = () => {
  const { data, updateField } = useData();
  const [t, setT] = useState(data.tools);
  const [saved, setSaved] = useState(false);

  const save = () => { updateField('tools', t); setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const upd = (id, f, v) => setT({ ...t, items: t.items.map(i => i.id === id ? { ...i, [f]: v } : i) });
  const add = () => setT({ ...t, items: [...t.items, { id: Date.now().toString(), name: '', icon: '' }] });
  const del = (id) => setT({ ...t, items: t.items.filter(i => i.id !== id) });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-tools"></i> Tools Marquee</h1>
          <p>Manage the auto-scrolling tools/technologies bar.</p>
          {saved && <div className="save-note">✓ Saved!</div>}
        </div>
      </div>
      <div className="admin-card">
        <div className="toggle-row">
          <label>Section Enabled</label>
          <label className="ts"><input type="checkbox" checked={t.enabled} onChange={e => setT({ ...t, enabled: e.target.checked })} /><span className="sl"></span></label>
        </div>
        <div className="afg"><label>Section Title</label><input value={t.title} onChange={e => setT({ ...t, title: e.target.value })} /></div>
      </div>
      <div className="admin-card">
        <h2>Tools ({t.items.length})</h2>
        {t.items.map(it => (
          <div key={it.id} style={{ border: '1px solid var(--border)', borderRadius: 8, padding: '1rem', marginBottom: '0.75rem' }}>
            <div className="afg"><label>Tool Name</label><input value={it.name} onChange={e => upd(it.id, 'name', e.target.value)} /></div>
            <ImageUploader
              label="Tool Icon"
              value={it.icon}
              onChange={(v) => upd(it.id, 'icon', v)}
              aspect="1/1"
              maxKB={200}
              folderHint="tools"
            />
            <button className="btn-sm btn-del" onClick={() => del(it.id)}>Remove Tool</button>
          </div>
        ))}
        <button className="btn-sm btn-sec" onClick={add}>+ Add Tool</button>
      </div>
      <div className="facts"><button className="btn-sm btn-save" onClick={save}><i className="fas fa-save"></i> Save Changes</button></div>
    </div>
  );
};

export default AdminTools;
