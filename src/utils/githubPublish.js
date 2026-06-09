/**
 * GitHub Publishing Utility
 *
 * Commits the current portfolio data to your GitHub repo as a Base64-encoded
 * JSON file (src/data/portfolioData.json). Netlify watches the repo, sees the
 * new commit, and auto-rebuilds the site within ~1 minute.
 *
 * Setup required (one-time):
 *   1. Generate a fine-grained Personal Access Token at:
 *      https://github.com/settings/personal-access-tokens/new
 *      - Repository access: only GAURAV19999/portfolio
 *      - Permissions: Contents → Read and write
 *   2. Open admin → Settings → paste token into "GitHub Publish Token" field
 *   3. Click "Save & Publish" from any admin page to commit changes live
 */

const GH_API = 'https://api.github.com';

// Browser-safe base64 encoder for UTF-8 strings (emoji-safe)
function b64encode(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (m, p) =>
      String.fromCharCode('0x' + p)
    )
  );
}

/**
 * Publish portfolio data to GitHub.
 * @param {Object}  args
 * @param {string}  args.token       — GitHub PAT (fine-grained)
 * @param {string}  args.owner       — e.g., 'GAURAV19999'
 * @param {string}  args.repo        — e.g., 'portfolio'
 * @param {string}  args.branch      — e.g., 'main'
 * @param {string}  args.path        — e.g., 'src/data/portfolioData.json'
 * @param {Object}  args.data        — the data object to commit
 * @param {string}  [args.message]   — optional commit message
 * @returns {Promise<{ok:boolean, sha?:string, url?:string, error?:string}>}
 */
export async function publishToGitHub({
  token,
  owner,
  repo,
  branch = 'main',
  path = 'src/data/portfolioData.json',
  data,
  message,
}) {
  if (!token) return { ok: false, error: 'No GitHub token configured. Open Settings → GitHub Publishing.' };
  if (!owner || !repo) return { ok: false, error: 'Owner/repo not configured.' };

  const apiBase = `${GH_API}/repos/${owner}/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // 1) Fetch existing file SHA (needed to update). 404 = file doesn't exist yet.
  let sha;
  try {
    const getResp = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, { headers });
    if (getResp.ok) {
      const existing = await getResp.json();
      sha = existing.sha;
    } else if (getResp.status !== 404) {
      const errBody = await getResp.text();
      return { ok: false, error: `Failed to read current file (${getResp.status}): ${errBody.slice(0, 200)}` };
    }
  } catch (err) {
    return { ok: false, error: `Network error reading file: ${err.message}` };
  }

  // 2) PUT the new file content
  const body = {
    message: message || `Update portfolio content via admin — ${new Date().toISOString()}`,
    content: b64encode(JSON.stringify(data, null, 2)),
    branch,
    ...(sha ? { sha } : {}),
    committer: {
      name: 'Portfolio Admin',
      email: 'admin@iamgaurav.netlify.app',
    },
  };

  try {
    const putResp = await fetch(apiBase, {
      method: 'PUT',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!putResp.ok) {
      const errBody = await putResp.text();
      let msg = `GitHub returned ${putResp.status}`;
      try { msg += `: ${JSON.parse(errBody).message}`; } catch { msg += `: ${errBody.slice(0, 200)}`; }
      if (putResp.status === 401) msg += '\n→ Your token is invalid or expired.';
      if (putResp.status === 403) msg += '\n→ Token lacks "Contents: Read and write" permission for this repo.';
      if (putResp.status === 404) msg += '\n→ Repo not found OR token does not have access to it.';
      return { ok: false, error: msg };
    }
    const json = await putResp.json();
    return {
      ok: true,
      sha: json.content?.sha,
      url: json.content?.html_url,
      commitUrl: json.commit?.html_url,
    };
  } catch (err) {
    return { ok: false, error: `Network error writing file: ${err.message}` };
  }
}

/**
 * Fetch the latest published data from GitHub (raw URL — fast, cached by jsDelivr-like CDN).
 * This is used by the public site to load the most-recent committed data.
 */
export async function fetchPublishedData({ owner, repo, branch = 'main', path = 'src/data/portfolioData.json' }) {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
  try {
    const resp = await fetch(url, { cache: 'no-cache' });
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}
