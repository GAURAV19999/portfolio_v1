/**
 * Sync portfolioData.json -> initialData.js  (Node port of sync_initial_data.py)
 *
 * The React app bundles initialData.js at build time (FETCH_REMOTE_DATA=false),
 * while the admin panel's "Publish" writes to portfolioData.json. Without this
 * sync, admin edits never reach the live site. Wired as an npm `prebuild` step
 * so it runs automatically on every build (incl. Netlify) — no Python needed.
 *
 * Run manually: node scripts/sync-initial-data.js
 */
const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '..', 'src', 'data', 'portfolioData.json');
const JS_PATH = path.join(__dirname, '..', 'src', 'data', 'initialData.js');

try {
  if (!fs.existsSync(JSON_PATH)) {
    console.log('[sync-initial-data] portfolioData.json not found — skipping (keeping existing initialData.js).');
    process.exit(0);
  }

  const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

  let js = '// AUTO-GENERATED from portfolioData.json — do not edit manually\n';
  js += '// Regenerate with: node scripts/sync-initial-data.js (runs automatically on build via prebuild)\n\n';
  js += 'export const initialData = ';
  js += JSON.stringify(data, null, 2);
  js += ';\n';

  fs.writeFileSync(JS_PATH, js, 'utf8');
  console.log(`[sync-initial-data] regenerated initialData.js from portfolioData.json (sections: ${Object.keys(data).join(', ')}).`);
} catch (err) {
  // Non-fatal: if anything goes wrong, keep the existing initialData.js so the build still succeeds.
  console.log('[sync-initial-data] skipped (non-fatal):', err && err.message);
  process.exit(0);
}
