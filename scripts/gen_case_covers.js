const fs = require("fs");
const OUT = "/home/claude/portfolio_v1/public/images/case-studies";
fs.mkdirSync(OUT, { recursive: true });
const W = 1200, H = 630;

function frame(id, a, b, kicker, title, motif) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0B1222"/><stop offset="1" stop-color="#070B16"/></linearGradient>
    <radialGradient id="g1${id}" cx="0.82" cy="0.2" r="0.6"><stop offset="0" stop-color="${a}" stop-opacity="0.26"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2${id}" cx="0.1" cy="0.95" r="0.6"><stop offset="0" stop-color="${b}" stop-opacity="0.2"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient>
    <linearGradient id="acc${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <pattern id="grid${id}" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1b2740" stroke-width="1" stroke-opacity="0.5"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg${id})"/>
  <rect width="${W}" height="${H}" fill="url(#grid${id})"/>
  <rect width="${W}" height="${H}" fill="url(#g1${id})"/>
  <rect width="${W}" height="${H}" fill="url(#g2${id})"/>
  <rect x="2" y="2" width="${W-4}" height="${H-4}" rx="22" fill="none" stroke="#223049" stroke-width="2"/>
  <rect x="80" y="150" width="14" height="14" rx="3" fill="url(#acc${id})"/>
  <text x="108" y="162" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="${a}">${kicker}</text>
  <text x="80" y="250" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="50" font-weight="800" fill="#F3F7FF">${title}</text>
  <text x="80" y="560" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="24" font-weight="700" fill="#AFC3E6">Gaurav Kumar Vishvakarma</text>
  <text x="80" y="590" font-family="Inter, Segoe UI, Arial, sans-serif" font-size="19" font-weight="500" fill="#5f7399">Freelance Power BI Consultant &amp; Data Analyst</text>
  <g transform="translate(775,305)">${motif(id, a, b)}</g>
</svg>`;
}

const M = {
  excelpbi: (id, a, b) => `
    <g transform="translate(-180,-120)" opacity="0.9">
      ${[0,1,2,3].map(r=>[0,1,2].map(c=>`<rect x="${c*44}" y="${r*44}" width="40" height="40" rx="5" fill="none" stroke="#3a4d70" stroke-width="2"/>`).join('')).join('')}
      <rect x="0" y="0" width="128" height="40" rx="5" fill="#1f7a3f" opacity="0.45"/>
    </g>
    <path d="M10 -10 L120 -10 M120 -10 l-26 -18 M120 -10 l-26 18" fill="none" stroke="${a}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(150,-130)">
      <rect x="0" y="0" width="210" height="155" rx="12" fill="#0e1830" stroke="${b}" stroke-width="2.5"/>
      <rect x="16" y="95" width="28" height="46" rx="4" fill="${b}" opacity="0.5"/>
      <rect x="54" y="66" width="28" height="75" rx="4" fill="${b}" opacity="0.7"/>
      <rect x="92" y="40" width="28" height="101" rx="4" fill="url(#acc${id})"/>
      <circle cx="166" cy="52" r="28" fill="none" stroke="${a}" stroke-width="10"/>
      <path d="M166 52 L166 24 A28 28 0 0 1 190 64 Z" fill="${a}"/>
      <rect x="16" y="16" width="95" height="10" rx="5" fill="#2b3c5c"/>
    </g>`,
  bfsi: (id, a, b) => `
    <g>
      <rect x="-60" y="60" width="44" height="90" rx="6" fill="${b}" opacity="0.4"/>
      <rect x="0" y="20" width="44" height="130" rx="6" fill="${b}" opacity="0.6"/>
      <rect x="60" y="-30" width="44" height="180" rx="6" fill="url(#acc${id})"/>
      <polyline points="-60,70 0,30 60,-20 150,-110 250,-150" fill="none" stroke="#F3F7FF" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M250 -150 l-34 4 l16 -30 z" fill="#F3F7FF"/>
      <circle cx="245" cy="-150" r="42" fill="#0e1830" stroke="${a}" stroke-width="3"/>
      <text x="245" y="-135" font-family="Inter, Arial, sans-serif" font-size="46" font-weight="800" fill="${a}" text-anchor="middle">&#8377;</text>
    </g>`,
  genai: (id, a, b) => `
    <g>
      <g transform="translate(-170,-110)">
        <rect x="0" y="0" width="150" height="200" rx="12" fill="#0e1830" stroke="${a}" stroke-width="2.5"/>
        ${[30,60,90,120,150].map((y,i)=>`<rect x="22" y="${y}" width="${i%2?70:106}" height="9" rx="4" fill="#33466b"/>`).join('')}
        <rect x="22" y="22" width="60" height="12" rx="6" fill="${a}" opacity="0.8"/>
      </g>
      <path d="M0 -10 L120 -10 M120 -10 l-26 -18 M120 -10 l-26 18" fill="none" stroke="${b}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
      <g transform="translate(210,-20)">
        ${[[0,-70],[70,-30],[40,60],[-40,30]].map(([x,y])=>`<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${a}" stroke-width="2" opacity="0.5"/>`).join('')}
        ${[[0,-70],[70,-30],[40,60],[-40,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="11" fill="#0e1830" stroke="${a}" stroke-width="2.5"/>`).join('')}
        <circle cx="0" cy="0" r="26" fill="url(#acc${id})"/>
        <path d="M-9 -4 l6 -10 l6 10 l9 2 l-9 3 l-6 10 l-6 -10 l-9 -3 z" transform="translate(0,0) scale(0.9)" fill="#fff"/>
      </g>
    </g>`,
};

const COVERS = [
  { file: "cs-excel-powerbi.svg", a: "#22C55E", b: "#0A80FF", kicker: "CASE STUDY · MIGRATION", title: "Excel → Power BI", motif: M.excelpbi },
  { file: "cs-bfsi-reporting.svg", a: "#38BDF8", b: "#6366F1", kicker: "CASE STUDY · BFSI", title: "Financial Reporting", motif: M.bfsi },
  { file: "cs-genai-rag.svg", a: "#8B5CF6", b: "#0A80FF", kicker: "CASE STUDY · GENAI", title: "RAG AI Assistant", motif: M.genai },
];
COVERS.forEach((c, i) => { fs.writeFileSync(OUT + "/" + c.file, frame(i, c.a, c.b, c.kicker, c.title, c.motif)); console.log("wrote", c.file); });
