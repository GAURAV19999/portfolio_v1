import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';

// ─── Silence the harmless "ResizeObserver loop" browser warning ────────────
// This warning is triggered by rapid layout changes (charts, dashboards, admin tables).
// It's a known browser quirk — the loop always resolves on the next frame.
// CRA's dev overlay is over-eager and shows it as an ERROR; we mute it so
// legitimate errors are easier to spot.
const RESIZE_OBSERVER_ERRORS = [
  'ResizeObserver loop completed with undelivered notifications.',
  'ResizeObserver loop limit exceeded',
];

// Suppress in the console
const originalError = window.console.error;
window.console.error = (...args) => {
  if (args.some(a => typeof a === 'string' && RESIZE_OBSERVER_ERRORS.some(msg => a.includes(msg)))) return;
  originalError(...args);
};

// Suppress CRA's dev-overlay
window.addEventListener('error', (e) => {
  if (e.message && RESIZE_OBSERVER_ERRORS.some(msg => e.message.includes(msg))) {
    e.stopImmediatePropagation();
    e.preventDefault();
    // Hide the CRA dev-error overlay iframe if it's already mounted
    const iframe = document.getElementById('webpack-dev-server-client-overlay');
    if (iframe) iframe.style.display = 'none';
  }
});
window.addEventListener('unhandledrejection', (e) => {
  if (e.reason && e.reason.message && RESIZE_OBSERVER_ERRORS.some(msg => e.reason.message.includes(msg))) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);
