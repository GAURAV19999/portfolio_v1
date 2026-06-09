import React, { useState, useRef } from 'react';
import { useData } from '../../context/DataContext';

const AdminSettings = () => {
  const {
    data, updateField, exportData, importData, resetData,
    publishCfg, updatePublishCfg, publishToCloud,
  } = useData();

  const [pw, setPw] = useState(data.settings.adminPassword);
  const [siteName, setSiteName] = useState(data.settings.siteName);
  const [footerText, setFooterText] = useState(data.footer.text);
  const [msg, setMsg] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const fileRef = useRef();

  const note = (t) => { setMsg(t); setTimeout(() => setMsg(''), 3000); };

  const saveSettings = () => {
    updateField('settings.adminPassword', pw);
    updateField('settings.siteName', siteName);
    updateField('footer.text', footerText);
    note('Settings saved!');
  };

  const onImport = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = (ev) => importData(ev.target.result) ? note('Data imported!') : note('Import failed.');
    r.readAsText(f);
  };

  const handleReset = () => {
    if (window.confirm('Reset ALL data to defaults? Cannot be undone.')) {
      resetData(); note('Data reset!');
    }
  };

  const handleTestPublish = async () => {
    setTesting(true);
    setTestResult(null);
    const result = await publishToCloud('Test publish from admin Settings');
    setTesting(false);
    setTestResult(result);
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1><i className="fas fa-sliders-h"></i> Settings</h1>
          <p>Admin password, GitHub publishing, backup &amp; restore.</p>
          {msg && <div className="save-note">✓ {msg}</div>}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
           GITHUB PUBLISHING — THE BIG ONE
           ════════════════════════════════════════════════════════════ */}
      <div className="admin-card" style={{ borderColor: 'var(--accent)', borderWidth: '2px' }}>
        <h2 style={{ color: 'var(--accent-light)' }}>
          <i className="fab fa-github"></i> GitHub Publishing
          {publishCfg.token && <span className="badge-on">CONFIGURED</span>}
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Admin changes are saved locally to your browser only. To make changes visible to <strong>everyone on every device</strong>,
          set up GitHub publishing once. Then "Save &amp; Publish Live" commits your changes to GitHub →
          Netlify automatically rebuilds the site → live worldwide in ~1–2 min.
        </p>

        <details className="setup-guide">
          <summary><strong>📋 First-time setup (one minute)</strong></summary>
          <ol style={{ fontSize: '0.85rem', lineHeight: 1.7, marginTop: '0.75rem', paddingLeft: '1.2rem' }}>
            <li>
              Open <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">
                <strong>github.com/settings/personal-access-tokens/new</strong></a>
            </li>
            <li><strong>Token name:</strong> Portfolio Admin Publish</li>
            <li><strong>Expiration:</strong> 1 year (or longer)</li>
            <li><strong>Repository access:</strong> Only select repositories → choose <code>{publishCfg.owner}/{publishCfg.repo}</code></li>
            <li><strong>Repository permissions:</strong> scroll down → <strong>Contents</strong> → set to <strong>Read and write</strong></li>
            <li>Click <strong>Generate token</strong> → copy it (starts with <code>github_pat_…</code>)</li>
            <li>Paste it in the field below ↓ and click <strong>Save</strong></li>
            <li>Click <strong>Test Publish</strong> to verify it works</li>
          </ol>
        </details>

        <div className="frow" style={{ marginTop: '1rem' }}>
          <div className="afg">
            <label>GitHub Owner</label>
            <input value={publishCfg.owner} onChange={e => updatePublishCfg({ owner: e.target.value })} />
          </div>
          <div className="afg">
            <label>Repository Name</label>
            <input value={publishCfg.repo} onChange={e => updatePublishCfg({ repo: e.target.value })} />
          </div>
        </div>
        <div className="frow">
          <div className="afg">
            <label>Branch</label>
            <input value={publishCfg.branch} onChange={e => updatePublishCfg({ branch: e.target.value })} />
          </div>
          <div className="afg">
            <label>File Path</label>
            <input value={publishCfg.path} onChange={e => updatePublishCfg({ path: e.target.value })} />
          </div>
        </div>

        <div className="afg">
          <label>
            GitHub Personal Access Token
            <button
              type="button"
              onClick={() => setShowToken(s => !s)}
              style={{ marginLeft: 8, background: 'none', border: 'none', color: 'var(--accent-light)', cursor: 'pointer', fontSize: '0.78rem' }}
            >
              <i className={`fas fa-${showToken ? 'eye-slash' : 'eye'}`}></i> {showToken ? 'Hide' : 'Show'}
            </button>
          </label>
          <input
            type={showToken ? 'text' : 'password'}
            value={publishCfg.token}
            onChange={e => updatePublishCfg({ token: e.target.value.trim() })}
            placeholder="github_pat_… (paste your token here)"
            autoComplete="off"
          />
          <small>
            🔒 This token is stored only in your browser's localStorage. It is sent only to api.github.com. Never share it.
          </small>
        </div>

        <div className="facts">
          <button
            className="btn-sm btn-save"
            onClick={handleTestPublish}
            disabled={!publishCfg.token || testing}
          >
            {testing ? (<><i className="fas fa-spinner fa-spin"></i> Testing…</>) : (<><i className="fas fa-vial"></i> Test Publish</>)}
          </button>
        </div>

        {testResult && (
          <div className={`publish-result ${testResult.ok ? 'ok' : 'err'}`} style={{ marginTop: '1rem' }}>
            {testResult.ok ? (
              <>
                <strong>✅ Test publish successful!</strong>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem' }}>
                  Your token works. Future "Save & Publish Live" clicks will commit to your repo. <br />
                  Netlify rebuilds automatically — site live worldwide in ~1–2 min.
                </p>
                {testResult.commitUrl && (
                  <a href={testResult.commitUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    <i className="fab fa-github"></i> View commit
                  </a>
                )}
              </>
            ) : (
              <>
                <strong>❌ Test publish failed</strong>
                <pre style={{ marginTop: '0.5rem', fontSize: '0.78rem', whiteSpace: 'pre-wrap' }}>{testResult.error}</pre>
              </>
            )}
          </div>
        )}
      </div>

      {/* ════════════════════════════════════════════════════════════
           GENERAL SETTINGS
           ════════════════════════════════════════════════════════════ */}
      <div className="admin-card">
        <h2>General</h2>
        <div className="afg"><label>Site / Logo Name</label><input value={siteName} onChange={e => setSiteName(e.target.value)} /></div>
        <div className="afg"><label>Footer Text</label><input value={footerText} onChange={e => setFooterText(e.target.value)} /></div>
        <div className="afg"><label>Admin Password</label><input type="text" value={pw} onChange={e => setPw(e.target.value)} /></div>
        <button className="btn-sm btn-save" onClick={saveSettings}><i className="fas fa-save"></i> Save Settings</button>
      </div>

      {/* ════════════════════════════════════════════════════════════
           BACKUP
           ════════════════════════════════════════════════════════════ */}
      <div className="admin-card">
        <h2>Data Backup</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Export your portfolio as JSON, or import a backup.</p>
        <div className="facts">
          <button className="btn-sm btn-save" onClick={exportData}><i className="fas fa-download"></i> Export Data</button>
          <button className="btn-sm btn-sec" onClick={() => fileRef.current.click()}><i className="fas fa-upload"></i> Import Data</button>
          <input ref={fileRef} type="file" accept=".json" hidden onChange={onImport} />
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
           DANGER ZONE
           ════════════════════════════════════════════════════════════ */}
      <div className="admin-card" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
        <h2 style={{ color: 'var(--danger)' }}><i className="fas fa-exclamation-triangle"></i> Danger Zone</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Reset all portfolio content to defaults. This will erase all customizations.</p>
        <button className="btn-sm btn-del" onClick={handleReset}><i className="fas fa-redo"></i> Reset to Defaults</button>
      </div>
    </div>
  );
};

export default AdminSettings;
