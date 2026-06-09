import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialData } from '../data/initialData';
import { publishToGitHub, fetchPublishedData } from '../utils/githubPublish';

const DataCtx = createContext();
const ThemeCtx = createContext();

const STORAGE = 'gkv_data_v6';      // bumped — correct repo name (portfolio_v1)
const AUTH = 'gkv_auth';
const THEME = 'gkv_theme_v2';
const MSGS = 'gkv_msgs';
const PUBLISH_CFG = 'gkv_publish_cfg';

// Clean up old localStorage keys from previous schema versions
if (typeof window !== 'undefined') {
  ['gkv_data', 'gkv_data_v2', 'gkv_data_v3', 'gkv_data_v4', 'gkv_data_v5', 'gkv_theme'].forEach(k => {
    try { localStorage.removeItem(k); } catch {}
  });
  // Migrate publish config — if owner/repo matches old defaults, reset them
  try {
    const raw = localStorage.getItem('gkv_publish_cfg');
    if (raw) {
      const cfg = JSON.parse(raw);
      if (cfg.repo === 'portfolio' || !cfg.repo) {
        cfg.owner = 'GAURAV19999';
        cfg.repo = 'portfolio_v1';
        localStorage.setItem('gkv_publish_cfg', JSON.stringify(cfg));
      }
    }
  } catch {}
}

// Default GitHub publish config (the token field stays empty until user adds it in Settings)
const DEFAULT_PUBLISH_CFG = {
  enabled: false,
  owner: 'GAURAV19999',
  repo: 'portfolio_v1',
  branch: 'main',
  path: 'src/data/portfolioData.json',
  token: '', // never shipped — user enters it in admin → Settings (stored only in their browser)
};

export const DataProvider = ({ children }) => {
  // Start with bundled defaults so first paint is instant
  const [data, setData] = useState(() => {
    try { const s = localStorage.getItem(STORAGE); return s ? JSON.parse(s) : initialData; }
    catch { return initialData; }
  });
  const [auth, setAuth] = useState(() => sessionStorage.getItem(AUTH) === 'true');
  const [messages, setMessages] = useState(() => {
    try { const s = localStorage.getItem(MSGS); return s ? JSON.parse(s) : []; } catch { return []; }
  });
  const [publishCfg, setPublishCfg] = useState(() => {
    try {
      const s = localStorage.getItem(PUBLISH_CFG);
      return s ? { ...DEFAULT_PUBLISH_CFG, ...JSON.parse(s) } : DEFAULT_PUBLISH_CFG;
    } catch { return DEFAULT_PUBLISH_CFG; }
  });
  const [publishStatus, setPublishStatus] = useState({ state: 'idle', message: '' });
  const [remoteLoaded, setRemoteLoaded] = useState(false);

  // ─── Load latest published data from GitHub on mount (so all devices see the same thing) ───
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchPublishedData({
        owner: DEFAULT_PUBLISH_CFG.owner,
        repo: DEFAULT_PUBLISH_CFG.repo,
        branch: DEFAULT_PUBLISH_CFG.branch,
        path: DEFAULT_PUBLISH_CFG.path,
      });
      if (cancelled) return;
      if (remote && typeof remote === 'object') {
        setData(remote);
        try { localStorage.setItem(STORAGE, JSON.stringify(remote)); } catch {}
      }
      setRemoteLoaded(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Persist data to localStorage for offline / fast-load fallback
  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify(data)); }
    catch (err) { console.warn('localStorage save failed:', err.message); }
  }, [data]);

  useEffect(() => {
    try { localStorage.setItem(MSGS, JSON.stringify(messages)); } catch {}
  }, [messages]);

  useEffect(() => {
    try {
      // Save publish cfg BUT never persist the token to long-term localStorage if user opts out.
      // For simplicity we keep it in localStorage (browser-only, never sent anywhere except GitHub API).
      localStorage.setItem(PUBLISH_CFG, JSON.stringify(publishCfg));
    } catch {}
  }, [publishCfg]);

  const login = useCallback((pw) => {
    if (pw === data.settings.adminPassword) {
      setAuth(true); sessionStorage.setItem(AUTH, 'true'); return true;
    }
    return false;
  }, [data.settings.adminPassword]);

  const logout = useCallback(() => { setAuth(false); sessionStorage.removeItem(AUTH); }, []);

  const updateField = useCallback((path, value) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  }, []);

  const addItem = useCallback((path, item) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      const arr = cur[parts[parts.length - 1]] || [];
      arr.push({ ...item, id: Date.now().toString() });
      cur[parts[parts.length - 1]] = arr;
      return next;
    });
  }, []);

  const updateItem = useCallback((path, id, updates) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = cur[parts[parts.length - 1]].map(it =>
        it.id === id ? { ...it, ...updates } : it
      );
      return next;
    });
  }, []);

  const removeItem = useCallback((path, id) => {
    setData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = cur[parts[parts.length - 1]].filter(it => it.id !== id);
      return next;
    });
  }, []);

  const addMessage = useCallback((msg) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now().toString(), timestamp: new Date().toISOString(), read: false }]);
  }, []);
  const markRead = useCallback((id) => setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m)), []);
  const deleteMsg = useCallback((id) => setMessages(prev => prev.filter(m => m.id !== id)), []);

  const resetData = useCallback(() => {
    setData(initialData);
    localStorage.setItem(STORAGE, JSON.stringify(initialData));
  }, []);

  const exportData = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [data]);

  const importData = useCallback((json) => {
    try { setData(JSON.parse(json)); return true; } catch { return false; }
  }, []);

  // ─── Publish current data to GitHub (triggers Netlify rebuild) ───
  const publishToCloud = useCallback(async (message) => {
    setPublishStatus({ state: 'publishing', message: 'Committing to GitHub…' });
    const result = await publishToGitHub({
      token: publishCfg.token,
      owner: publishCfg.owner,
      repo: publishCfg.repo,
      branch: publishCfg.branch,
      path: publishCfg.path,
      data,
      message,
    });
    if (result.ok) {
      setPublishStatus({
        state: 'success',
        message: `Published! Netlify is rebuilding now. Live in ~1–2 min.`,
        commitUrl: result.commitUrl,
      });
    } else {
      setPublishStatus({ state: 'error', message: result.error });
    }
    return result;
  }, [data, publishCfg]);

  const updatePublishCfg = useCallback((updates) => {
    setPublishCfg(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <DataCtx.Provider value={{
      data, auth, login, logout, updateField, addItem, updateItem, removeItem,
      messages, addMessage, markRead, deleteMsg, resetData, exportData, importData,
      publishCfg, updatePublishCfg, publishToCloud, publishStatus, remoteLoaded
    }}>
      {children}
    </DataCtx.Provider>
  );
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME);
    if (saved === 'light' || saved === 'dark') return saved;
    localStorage.removeItem('gkv_theme');
    return 'dark';
  });
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME, theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme(t => t === 'dark' ? 'light' : 'dark'), []);
  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
};

export const useData = () => useContext(DataCtx);
export const useTheme = () => useContext(ThemeCtx);
