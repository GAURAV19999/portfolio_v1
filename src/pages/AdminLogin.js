import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData, useTheme } from '../context/DataContext';

const AdminLogin = () => {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const { login } = useData();
  const { theme, toggle } = useTheme();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (login(pw)) nav('/admin/dashboard');
    else setErr('Incorrect password.');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '2rem' }}>
      <button onClick={toggle} className="theme-toggle" style={{ position: 'absolute', top: 20, right: 20 }}>
        <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
      </button>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: '2.5rem', maxWidth: 420, width: '100%', boxShadow: 'var(--shadow-lg)' }}>
        <h1 style={{ background: 'linear-gradient(135deg, var(--accent-gradient-start), var(--accent-gradient-end))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textAlign: 'center', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
          GK.Vishvakarma
        </h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Admin Portal</p>
        <form onSubmit={submit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label htmlFor="adminpw">Password</label>
            <input id="adminpw" type="password" value={pw} onChange={e => { setPw(e.target.value); setErr(''); }} placeholder="Enter password" autoFocus />
          </div>
          {err && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>{err}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <i className="fas fa-lock"></i> Login
          </button>
        </form>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '1rem' }}>
          Default: admin2024 (change in Settings)
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
