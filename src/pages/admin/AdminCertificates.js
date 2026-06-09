import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const blank = { title: '', issuer: '', date: '', image: '', link: '' };

const AdminCertificates = () => {
  const { data, addItem, updateItem, removeItem } = useData();
  const [editing, setEditing] = useState(null);

  const handleSave = () => {
    if (data.certificates.find(c => c.id === editing.id)) updateItem('certificates', editing.id, editing);
    else addItem('certificates', editing);
    setEditing(null);
  };
  const handleDel = (id) => { if (window.confirm('Delete?')) removeItem('certificates', id); };
  const handleAdd = () => setEditing({ ...blank, id: Date.now().toString() });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-certificate"></i> Certificates</h1>
          <p>Manage certifications & verification links.</p>
        </div>
        <button className="btn-sm btn-save" onClick={handleAdd}><i className="fas fa-plus"></i> Add Certificate</button>
      </div>
      <div className="admin-card">
        <div className="item-list">
          {data.certificates.map(c => (
            <div className="item-row" key={c.id}>
              {c.image && <img src={c.image} alt="" style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }} onError={e => e.target.style.display = 'none'} />}
              <div className="item-info">
                <h3>{c.title}</h3>
                <p style={{ color: 'var(--accent-light)' }}>{c.issuer}</p>
                <p className="meta">{c.date}</p>
              </div>
              <div className="item-acts">
                <button className="btn-sm btn-sec" onClick={() => setEditing(c)}>Edit</button>
                <button className="btn-sm btn-del" onClick={() => handleDel(c.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editing && (
        <div className="modal-overlay" onClick={ev => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box">
            <h2>{data.certificates.find(c => c.id === editing.id) ? 'Edit' : 'Add'} Certificate</h2>
            <div className="afg"><label>Title</label><input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} /></div>
            <div className="afg"><label>Issuer</label><input value={editing.issuer} onChange={e => setEditing({ ...editing, issuer: e.target.value })} /></div>
            <div className="afg"><label>Date</label><input value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} placeholder="e.g., Issued 2021" /></div>
            <ImageUploader
              label="Certificate Image"
              value={editing.image}
              onChange={(v) => setEditing({ ...editing, image: v })}
              aspect="3/2"
              maxKB={800}
              folderHint="certificates"
            />
            <div className="afg"><label>Verification Link</label><input value={editing.link} onChange={e => setEditing({ ...editing, link: e.target.value })} placeholder="https://credly.com/..." /></div>
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

export default AdminCertificates;
