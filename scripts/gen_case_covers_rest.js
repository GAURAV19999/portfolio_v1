const fs = require("fs");
const OUT = "/home/claude/portfolio_v1/public/images/case-studies";
fs.mkdirSync(OUT, { recursive: true });
const W = 1200, H = 630;

// Identical frame to gen_case_covers.js so all 9 covers match exactly.
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

// person icon (head + torso)
function person(x, y, s, fill, op) {
  return `<g transform="translate(${x},${y})" opacity="${op}"><circle cx="0" cy="${-18*s}" r="${13*s}" fill="${fill}"/><path d="M${-20*s} ${18*s} a${20*s} ${20*s} 0 0 1 ${40*s} 0 z" fill="${fill}"/></g>`;
}

const M = {
  // HR / attrition — row of people, some faded (attrition), + descending bars
  hr: (id, a, b) => `
    <g transform="translate(-200,-150)">
      ${person(0,0,1.5,b,0.9)}${person(70,0,1.5,b,0.9)}${person(140,0,1.5,a,1)}${person(210,0,1.5,'#33466b',0.8)}${person(280,0,1.5,'#33466b',0.5)}
    </g>
    <g transform="translate(-200,40)">
      <rect x="0" y="0" width="56" height="120" rx="7" fill="url(#acc${id})"/>
      <rect x="86" y="30" width="56" height="90" rx="7" fill="${b}" opacity="0.7"/>
      <rect x="172" y="60" width="56" height="60" rx="7" fill="${b}" opacity="0.5"/>
      <rect x="258" y="86" width="56" height="34" rx="7" fill="${b}" opacity="0.35"/>
      <polyline points="28,12 114,46 200,74 286,100" fill="none" stroke="#F3F7FF" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 10"/>
    </g>`,

  // Media intelligence — document feed + broadcast signal nodes
  media: (id, a, b) => `
    <g transform="translate(-200,-120)">
      <rect x="0" y="0" width="170" height="220" rx="12" fill="#0e1830" stroke="${a}" stroke-width="2.5"/>
      <rect x="22" y="22" width="80" height="14" rx="7" fill="${a}" opacity="0.85"/>
      ${[52,80,108,136,164,192].map((y,i)=>`<rect x="22" y="${y}" width="${i%2?90:126}" height="9" rx="4" fill="#33466b"/>`).join('')}
    </g>
    <g transform="translate(150,-10)">
      <circle cx="0" cy="0" r="16" fill="url(#acc${id})"/>
      ${[40,80,120].map((r,i)=>`<path d="M${r*0.2} ${-r} A ${r} ${r} 0 0 1 ${r} 0 A ${r} ${r} 0 0 1 ${r*0.2} ${r}" fill="none" stroke="${a}" stroke-width="4" opacity="${0.6-i*0.15}"/>`).join('')}
      ${[40,80,120].map((r,i)=>`<path d="M${-r*0.2} ${-r} A ${r} ${r} 0 0 0 ${-r} 0 A ${r} ${r} 0 0 0 ${-r*0.2} ${r}" fill="none" stroke="${b}" stroke-width="4" opacity="${0.6-i*0.15}"/>`).join('')}
    </g>`,

  // Political campaign / elections — ballot box with ballot + vote bars
  election: (id, a, b) => `
    <g transform="translate(-150,-130)">
      <rect x="0" y="70" width="230" height="150" rx="12" fill="#0e1830" stroke="${a}" stroke-width="2.5"/>
      <rect x="55" y="58" width="120" height="26" rx="6" fill="#0B1222" stroke="${a}" stroke-width="2"/>
      <g transform="translate(70,-40) rotate(-14)">
        <rect x="0" y="0" width="100" height="120" rx="8" fill="#F3F7FF"/>
        <path d="M18 54 l22 24 l44 -52" fill="none" stroke="${a}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="18" y="96" width="64" height="8" rx="4" fill="#9fb2d6"/>
      </g>
    </g>
    <g transform="translate(120,60)">
      <rect x="0" y="40" width="46" height="90" rx="6" fill="${b}" opacity="0.6"/>
      <rect x="64" y="0" width="46" height="130" rx="6" fill="url(#acc${id})"/>
      <rect x="128" y="64" width="46" height="66" rx="6" fill="${b}" opacity="0.45"/>
    </g>`,

  // Sentiment + forecast — semicircle gauge + rising forecast line w/ projection
  sentiment: (id, a, b) => `
    <g transform="translate(-110,-40)">
      <path d="M0 0 A 120 120 0 0 1 240 0" fill="none" stroke="#1f2d4a" stroke-width="22" stroke-linecap="round"/>
      <path d="M0 0 A 120 120 0 0 1 180 -94" fill="none" stroke="url(#acc${id})" stroke-width="22" stroke-linecap="round"/>
      <circle cx="120" cy="0" r="12" fill="#F3F7FF"/>
      <line x1="120" y1="0" x2="196" y2="-66" stroke="#F3F7FF" stroke-width="7" stroke-linecap="round"/>
    </g>
    <g transform="translate(-110,60)">
      <polyline points="0,70 50,50 100,58 150,24 200,30" fill="none" stroke="${a}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="200,30 250,2 300,-20" fill="none" stroke="${b}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 9"/>
      ${[[0,70],[50,50],[100,58],[150,24],[200,30]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="${a}"/>`).join('')}
    </g>`,

  // E-commerce — shopping cart + sales bars
  ecom: (id, a, b) => `
    <g transform="translate(-180,-120)">
      <path d="M0 0 h26 l24 120 h120 l22 -86 H60" fill="none" stroke="${a}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="70" cy="150" r="15" fill="url(#acc${id})"/>
      <circle cx="165" cy="150" r="15" fill="url(#acc${id})"/>
      <circle cx="150" cy="-6" r="22" fill="#0e1830" stroke="${b}" stroke-width="3"/>
      <text x="150" y="6" font-family="Inter, Arial, sans-serif" font-size="26" font-weight="800" fill="${b}" text-anchor="middle">$</text>
    </g>
    <g transform="translate(110,50)">
      <rect x="0" y="60" width="44" height="90" rx="6" fill="${b}" opacity="0.5"/>
      <rect x="60" y="24" width="44" height="126" rx="6" fill="${b}" opacity="0.7"/>
      <rect x="120" y="-18" width="44" height="168" rx="6" fill="url(#acc${id})"/>
      <polyline points="22,66 82,30 142,-12 210,-54" fill="none" stroke="#F3F7FF" stroke-width="4" stroke-linecap="round"/>
      <path d="M210 -54 l-30 2 l12 -26 z" fill="#F3F7FF"/>
    </g>`,

  // Supply chain — kanban columns with cards + stacked crates
  supply: (id, a, b) => `
    <g transform="translate(-200,-140)">
      ${[0,1,2].map(col=>`
        <rect x="${col*120}" y="0" width="104" height="250" rx="12" fill="#0e1830" stroke="${col===1?a:'#2b3c5c'}" stroke-width="2.5"/>
        <rect x="${col*120+16}" y="18" width="60" height="10" rx="5" fill="${col===1?a:'#33466b'}"/>
        ${[48,96,144].slice(0,3-col).map(y=>`<rect x="${col*120+16}" y="${y}" width="72" height="34" rx="6" fill="${col===1?'url(#acc'+id+')':b}" opacity="${col===1?1:0.5}"/>`).join('')}
      `).join('')}
    </g>
    <g transform="translate(70,130)">
      <path d="M0 0 h150" stroke="${a}" stroke-width="4" stroke-dasharray="2 9" stroke-linecap="round"/>
      <path d="M150 0 l-22 -11 v22 z" fill="${a}"/>
    </g>`,
};

const COVERS = [
  { file: "cs-hr-attrition.svg",     a: "#2DD4BF", b: "#6366F1", kicker: "CASE STUDY · HR ANALYTICS", title: "People &amp; Attrition",     motif: M.hr },
  { file: "cs-media-intelligence.svg", a: "#F59E0B", b: "#0A80FF", kicker: "CASE STUDY · MEDIA AI",      title: "Media Intelligence",     motif: M.media },
  { file: "cs-election-analytics.svg", a: "#38BDF8", b: "#8B5CF6", kicker: "CASE STUDY · ELECTIONS",     title: "Campaign Analytics",     motif: M.election },
  { file: "cs-sentiment-forecast.svg", a: "#8B5CF6", b: "#38BDF8", kicker: "CASE STUDY · NLP",           title: "Sentiment &amp; Forecast",   motif: M.sentiment },
  { file: "cs-ecommerce-sales.svg",  a: "#22C55E", b: "#0A80FF", kicker: "CASE STUDY · E-COMMERCE",    title: "Retail Sales Analytics", motif: M.ecom },
  { file: "cs-supply-chain.svg",     a: "#38BDF8", b: "#14B8A6", kicker: "CASE STUDY · SUPPLY CHAIN",  title: "Sprint Tracking",        motif: M.supply },
];

COVERS.forEach((c, i) => {
  fs.writeFileSync(OUT + "/" + c.file, frame(100 + i, c.a, c.b, c.kicker, c.title, c.motif));
  console.log("wrote", c.file);
});
