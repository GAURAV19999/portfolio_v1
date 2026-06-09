import React, { useRef, useState } from 'react';

/**
 * Reusable image uploader for the admin dashboard.
 *
 * Three ways to set an image:
 *   1. Upload a file from your computer (converted to base64, stored in localStorage)
 *   2. Paste a URL (https://...)
 *   3. Reference a file in /public/images/  (e.g. /images/photo.jpg)
 *
 * Props:
 *   value         — current image src (string)
 *   onChange(src) — called with the new src
 *   maxKB         — max file size in KB (default 1024 = 1MB)
 *   aspect        — preview aspect ratio "16/9" | "1/1" | "4/3" (default "16/9")
 *   label         — input label text
 *   folderHint    — hint folder for /public/images (e.g. "projects" or "certificates")
 */
const ImageUploader = ({ value, onChange, maxKB = 1024, aspect = '16/9', label = 'Image', folderHint }) => {
  const fileRef = useRef();
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleFile = (file) => {
    setError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    const sizeKB = file.size / 1024;
    if (sizeKB > maxKB) {
      setError(`File too large (${Math.round(sizeKB)} KB). Max ${maxKB} KB. Try compressing it first.`);
      return;
    }
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange(ev.target.result);
      setUploading(false);
    };
    reader.onerror = () => {
      setError('Failed to read file.');
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const clear = () => {
    onChange('');
    setError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const isBase64 = value && value.startsWith('data:');
  const sizeKB = isBase64 ? Math.round((value.length * 3) / 4 / 1024) : null;

  const placeholder = folderHint
    ? `https://... or /images/${folderHint}/your-file.jpg`
    : 'https://... or /images/your-file.jpg';

  return (
    <div className="image-uploader">
      <label className="iu-label">{label}</label>

      {/* Preview */}
      <div
        className="iu-preview"
        style={{ aspectRatio: aspect }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onClick={() => fileRef.current && fileRef.current.click()}
      >
        {value ? (
          <>
            <img src={value} alt="preview" onError={(e) => { e.target.style.display = 'none'; }} />
            <button
              type="button"
              className="iu-clear"
              onClick={(e) => { e.stopPropagation(); clear(); }}
              title="Remove image"
            >
              ✕
            </button>
          </>
        ) : (
          <div className="iu-empty">
            <i className="fas fa-cloud-upload-alt"></i>
            <span>{uploading ? 'Uploading...' : 'Click or drag image here'}</span>
            <small>JPG, PNG, GIF, WebP · max {maxKB} KB</small>
          </div>
        )}
      </div>

      {/* URL/path input */}
      <input
        className="iu-url"
        type="text"
        value={value && !isBase64 ? value : ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* File picker button */}
      <div className="iu-actions">
        <button type="button" className="btn-sm btn-sec" onClick={() => fileRef.current.click()}>
          <i className="fas fa-upload"></i> Upload from computer
        </button>
        {isBase64 && <span className="iu-info">📦 Uploaded · ~{sizeKB} KB</span>}
        {!isBase64 && value && <span className="iu-info">🔗 URL/Path</span>}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {error && <div className="iu-error">{error}</div>}
      <small className="iu-hint">
        💡 Tip: Drop files into <code>public/images/{folderHint || ''}/</code> and reference them as <code>/images/{folderHint ? folderHint + '/' : ''}your-file.jpg</code> for best performance.
      </small>
    </div>
  );
};

export default ImageUploader;
