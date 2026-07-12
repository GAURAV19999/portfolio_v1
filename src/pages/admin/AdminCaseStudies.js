import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const blank = {
  slug: '',
  title: '',
  tagline: '',
  client: '',
  domain: '',
  duration: '',
  stack: [],
  thumbnail: '',
  liveLink: '',
  liveLinkLabel: 'View Live',
  problem: '',
  solution: [],
  results: [],
  featured: false,
};

const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

const AdminCaseStudies = () => {
  const { data, updateField } = useData();
  const [editing, setEditing] = useState(null);

  const cs = data.caseStudies || { enabled: true, sectionTag: 'Real Client Work', sectionTitle: 'Case Studies', sectionIntro: '', items: [] };
  const items = cs.items || [];

  const saveList = (nextItems) =>
    updateField('caseStudies', { ...cs, items: nextItems });

  const handleSave = () => {
    const ed = {
      ...editing,
      slug: editing.slug || slugify(editing.title),
      stack:
        typeof editing.stack === 'string'
          ? editing.stack.split(',').map((s) => s.trim()).filter(Boolean)
          : editing.stack,
      solution:
        typeof editing.solution === 'string'
          ? editing.solution.split('\n').filter((s) => s.trim())
          : editing.solution,
      results:
        typeof editing.results === 'string'
          ? editing.results
              .split('\n')
              .map((line) => {
                const [metric, ...rest] = line.split('|').map((x) => x.trim());
                return metric ? { metric, label: rest.join('|') || '' } : null;
              })
              .filter(Boolean)
          : editing.results,
    };
    const existing = items.find((x) => x.id === ed.id);
    const nextItems = existing
      ? items.map((x) => (x.id === ed.id ? ed : x))
      : [...items, ed];
    saveList(nextItems);
    setEditing(null);
  };

  const handleDel = (id) => {
    if (window.confirm('Delete this case study?')) {
      saveList(items.filter((x) => x.id !== id));
    }
  };

  const handleEdit = (cs) =>
    setEditing({
      ...cs,
      stack: (cs.stack || []).join(', '),
      solution: (cs.solution || []).join('\n'),
      results: (cs.results || []).map((r) => `${r.metric} | ${r.label}`).join('\n'),
    });

  const handleAdd = () =>
    setEditing({
      ...blank,
      id: Date.now().toString(),
      stack: '',
      solution: '',
      results: '',
    });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-book-open"></i> Case Studies</h1>
          <p>Manage detailed case studies shown at <code>/case-studies</code> ({items.length} total).</p>
        </div>
        <button className="btn-sm btn-save" onClick={handleAdd}>
          <i className="fas fa-plus"></i> Add Case Study
        </button>
      </div>

      {/* Section-level settings */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Section Copy</h3>
        <div className="afg">
          <label>Section Tag</label>
          <input
            value={cs.sectionTag || ''}
            onChange={(e) => updateField('caseStudies', { ...cs, sectionTag: e.target.value })}
          />
        </div>
        <div className="afg">
          <label>Section Title</label>
          <input
            value={cs.sectionTitle || ''}
            onChange={(e) => updateField('caseStudies', { ...cs, sectionTitle: e.target.value })}
          />
        </div>
        <div className="afg">
          <label>Section Intro</label>
          <textarea
            value={cs.sectionIntro || ''}
            onChange={(e) => updateField('caseStudies', { ...cs, sectionIntro: e.target.value })}
            rows={2}
          />
        </div>
      </div>

      <div className="admin-card">
        <div className="item-list">
          {items.map((c) => (
            <div className="item-row" key={c.id}>
              {c.thumbnail && (
                <img
                  src={c.thumbnail}
                  alt=""
                  style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }}
                  onError={(e) => (e.target.style.display = 'none')}
                />
              )}
              <div className="item-info">
                <h3>
                  {c.title} {c.featured && <span style={{ color: 'var(--accent)' }}>⭐</span>}
                </h3>
                <p className="meta">
                  <code>/case-studies/{c.slug}</code> · {c.domain} · {c.duration}
                </p>
              </div>
              <div className="item-acts">
                <button className="btn-sm btn-sec" onClick={() => handleEdit(c)}>Edit</button>
                <button className="btn-sm btn-del" onClick={() => handleDel(c.id)}>Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No case studies yet. Click "Add Case Study".
            </p>
          )}
        </div>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={(ev) => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box" style={{ maxWidth: 780 }}>
            <h2>{items.find((x) => x.id === editing.id) ? 'Edit' : 'Add'} Case Study</h2>

            <div className="frow">
              <div className="afg">
                <label>Title *</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })} />
              </div>
              <div className="afg">
                <label>Slug (URL) *</label>
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} placeholder="my-case-study" />
              </div>
            </div>

            <div className="afg">
              <label>Tagline (short one-liner)</label>
              <input value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} />
            </div>

            <div className="frow">
              <div className="afg">
                <label>Client</label>
                <input value={editing.client} onChange={(e) => setEditing({ ...editing, client: e.target.value })} />
              </div>
              <div className="afg">
                <label>Domain / Industry</label>
                <input value={editing.domain} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} placeholder="Media Intelligence · AI" />
              </div>
            </div>

            <div className="frow">
              <div className="afg">
                <label>Duration</label>
                <input value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} placeholder="3 months" />
              </div>
              <div className="afg">
                <label>Featured?</label>
                <select value={editing.featured ? 'yes' : 'no'} onChange={(e) => setEditing({ ...editing, featured: e.target.value === 'yes' })}>
                  <option value="no">No</option>
                  <option value="yes">⭐ Yes (Highlight)</option>
                </select>
              </div>
            </div>

            <ImageUploader
              label="Thumbnail Image"
              value={editing.thumbnail}
              onChange={(v) => setEditing({ ...editing, thumbnail: v })}
              aspect="16/9"
              maxKB={800}
              folderHint="case-studies"
            />

            <div className="afg">
              <label>Tech Stack (comma-separated)</label>
              <input value={editing.stack} onChange={(e) => setEditing({ ...editing, stack: e.target.value })} placeholder="Python, Power BI, SQL" />
            </div>

            <div className="frow">
              <div className="afg">
                <label>Live Link (optional URL)</label>
                <input value={editing.liveLink} onChange={(e) => setEditing({ ...editing, liveLink: e.target.value })} />
              </div>
              <div className="afg">
                <label>Live Link Label</label>
                <input value={editing.liveLinkLabel} onChange={(e) => setEditing({ ...editing, liveLinkLabel: e.target.value })} placeholder="View Live Dashboard" />
              </div>
            </div>

            <div className="afg">
              <label>Problem (HTML allowed)</label>
              <textarea value={editing.problem} onChange={(e) => setEditing({ ...editing, problem: e.target.value })} rows={4} />
            </div>

            <div className="afg">
              <label>Solution — one bullet per line (HTML allowed)</label>
              <textarea value={editing.solution} onChange={(e) => setEditing({ ...editing, solution: e.target.value })} rows={6} />
            </div>

            <div className="afg">
              <label>Results — one per line, format: <code>METRIC | LABEL</code></label>
              <textarea
                value={editing.results}
                onChange={(e) => setEditing({ ...editing, results: e.target.value })}
                rows={5}
                placeholder={'45% | Reporting time saved\n99.5% | Data accuracy'}
              />
            </div>

            <div className="facts">
              <button className="btn-sm btn-save" onClick={handleSave}>
                <i className="fas fa-save"></i> Save
              </button>
              <button className="btn-sm btn-sec" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCaseStudies;
