import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ImageUploader from '../../components/admin/ImageUploader';

const blank = {
  slug: '',
  title: '',
  excerpt: '',
  coverImage: '',
  tags: [],
  author: 'Gaurav Kumar Vishvakarma',
  date: new Date().toISOString().slice(0, 10),
  readingTime: '5 min read',
  featured: false,
  content: '',
};

const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);

const AdminBlog = () => {
  const { data, updateField } = useData();
  const [editing, setEditing] = useState(null);

  const blog = data.blog || {
    enabled: true,
    sectionTag: 'Data & BI Insights',
    sectionTitle: 'Blog',
    sectionIntro: '',
    items: [],
  };
  const items = blog.items || [];

  const saveList = (nextItems) => updateField('blog', { ...blog, items: nextItems });

  const handleSave = () => {
    const ed = {
      ...editing,
      slug: editing.slug || slugify(editing.title),
      tags:
        typeof editing.tags === 'string'
          ? editing.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : editing.tags,
    };
    const existing = items.find((x) => x.id === ed.id);
    const nextItems = existing
      ? items.map((x) => (x.id === ed.id ? ed : x))
      : [...items, ed];
    saveList(nextItems);
    setEditing(null);
  };

  const handleDel = (id) => {
    if (window.confirm('Delete this blog post?')) {
      saveList(items.filter((x) => x.id !== id));
    }
  };

  const handleEdit = (post) =>
    setEditing({
      ...post,
      tags: (post.tags || []).join(', '),
    });

  const handleAdd = () =>
    setEditing({
      ...blank,
      id: Date.now().toString(),
      tags: '',
    });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="far fa-newspaper"></i> Blog</h1>
          <p>Manage blog posts shown at <code>/blog</code> ({items.length} total).</p>
        </div>
        <button className="btn-sm btn-save" onClick={handleAdd}>
          <i className="fas fa-plus"></i> New Post
        </button>
      </div>

      {/* Section-level settings */}
      <div className="admin-card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '0.75rem' }}>Section Copy</h3>
        <div className="afg">
          <label>Section Tag</label>
          <input value={blog.sectionTag || ''} onChange={(e) => updateField('blog', { ...blog, sectionTag: e.target.value })} />
        </div>
        <div className="afg">
          <label>Section Title</label>
          <input value={blog.sectionTitle || ''} onChange={(e) => updateField('blog', { ...blog, sectionTitle: e.target.value })} />
        </div>
        <div className="afg">
          <label>Section Intro</label>
          <textarea value={blog.sectionIntro || ''} onChange={(e) => updateField('blog', { ...blog, sectionIntro: e.target.value })} rows={2} />
        </div>
      </div>

      <div className="admin-card">
        <div className="item-list">
          {items
            .slice()
            .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
            .map((p) => (
              <div className="item-row" key={p.id}>
                {p.coverImage && (
                  <img
                    src={p.coverImage}
                    alt=""
                    style={{ width: 80, height: 50, objectFit: 'cover', borderRadius: 6 }}
                    onError={(e) => (e.target.style.display = 'none')}
                  />
                )}
                <div className="item-info">
                  <h3>
                    {p.title} {p.featured && <span style={{ color: 'var(--accent)' }}>⭐</span>}
                  </h3>
                  <p className="meta">
                    <code>/blog/{p.slug}</code> · {p.date} · {p.readingTime}
                  </p>
                </div>
                <div className="item-acts">
                  <button className="btn-sm btn-sec" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="btn-sm btn-del" onClick={() => handleDel(p.id)}>Delete</button>
                </div>
              </div>
            ))}
          {items.length === 0 && (
            <p style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No posts yet. Click "New Post".
            </p>
          )}
        </div>
      </div>

      {editing && (
        <div className="modal-overlay" onClick={(ev) => ev.target === ev.currentTarget && setEditing(null)}>
          <div className="modal-box" style={{ maxWidth: 820 }}>
            <h2>{items.find((x) => x.id === editing.id) ? 'Edit' : 'New'} Blog Post</h2>

            <div className="frow">
              <div className="afg">
                <label>Title *</label>
                <input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing.slug || slugify(e.target.value) })}
                />
              </div>
              <div className="afg">
                <label>Slug (URL) *</label>
                <input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: slugify(e.target.value) })} placeholder="my-post" />
              </div>
            </div>

            <div className="afg">
              <label>Excerpt (150-200 chars — shown on list)</label>
              <textarea value={editing.excerpt} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={2} />
            </div>

            <ImageUploader
              label="Cover Image"
              value={editing.coverImage}
              onChange={(v) => setEditing({ ...editing, coverImage: v })}
              aspect="16/9"
              maxKB={800}
              folderHint="blog"
            />

            <div className="afg">
              <label>Tags (comma-separated)</label>
              <input value={editing.tags} onChange={(e) => setEditing({ ...editing, tags: e.target.value })} placeholder="Power BI, DAX, Tutorial" />
            </div>

            <div className="frow">
              <div className="afg">
                <label>Author</label>
                <input value={editing.author} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
              </div>
              <div className="afg">
                <label>Date (YYYY-MM-DD)</label>
                <input type="date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
              </div>
            </div>

            <div className="frow">
              <div className="afg">
                <label>Reading Time</label>
                <input value={editing.readingTime} onChange={(e) => setEditing({ ...editing, readingTime: e.target.value })} placeholder="5 min read" />
              </div>
              <div className="afg">
                <label>Featured?</label>
                <select value={editing.featured ? 'yes' : 'no'} onChange={(e) => setEditing({ ...editing, featured: e.target.value === 'yes' })}>
                  <option value="no">No</option>
                  <option value="yes">⭐ Yes (Highlight)</option>
                </select>
              </div>
            </div>

            <div className="afg">
              <label>Content (HTML — use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;pre&gt;&lt;code&gt;, etc.)</label>
              <textarea
                value={editing.content}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                rows={16}
                style={{ fontFamily: "'JetBrains Mono', Consolas, monospace", fontSize: '0.85rem' }}
                placeholder={'<p>Intro paragraph...</p>\n<h2>First Heading</h2>\n<p>Body text...</p>'}
              />
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                Tip: paste HTML from your favourite editor. Code blocks: <code>&lt;pre&gt;&lt;code&gt;...&lt;/code&gt;&lt;/pre&gt;</code>
              </small>
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

export default AdminBlog;
