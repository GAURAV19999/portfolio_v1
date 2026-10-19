const fs = require('fs');
const P = '/home/claude/portfolio_v1/src/data/portfolioData.json';
const data = JSON.parse(fs.readFileSync(P, 'utf8'));
const have = new Set(data.caseStudies.items.map(c => c.slug));

const cases = [
  {
    id: 'cs7', slug: 'excel-to-power-bi-migration',
    title: 'Excel → Power BI Migration for an SME',
    tagline: 'Replaced a fragile multi-file Excel reporting setup with one automated Power BI dashboard — a full morning of manual reporting became a few minutes.',
    client: 'Confidential · Services SME',
    domain: 'Operations · Reporting Automation',
    duration: '2 weeks',
    stack: ['Power BI', 'Power Query', 'DAX', 'SQL', 'Data Modelling'],
    thumbnail: '/images/case-studies/cs-excel-powerbi.svg',
    liveLink: '', liveLinkLabel: 'Confidential',
    problem: "The team's entire weekly reporting ran on half a dozen Excel files, each maintained by hand. The numbers rarely agreed — sales and finance quoted different figures from \"the same sheet\" — and one person lost most of a morning every week stitching it all together. When someone asked a follow-up question, the answer took days.",
    solution: [
      'Audited every existing report first — who read it and the exact definition of each metric. About a quarter of them were duplicates and got retired on the spot',
      'Rebuilt the data as a proper <strong>star schema</strong> (facts + dimensions) instead of one giant flat sheet, so the model would actually hold up',
      'Moved all the cleaning into <strong>Power Query</strong> with scheduled refresh — the report now re-cleans itself instead of someone fixing cells by hand',
      'Built one governed dashboard with drill-through (region → detail) so follow-up questions are answered in a click, not a meeting',
      'Ran it in parallel with the old Excel for two weeks until the numbers matched exactly, then did a short handoff so the team owns it',
    ],
    results: [
      { metric: '~90%', label: 'Weekly reporting time cut' },
      { metric: '1', label: 'Source of truth (was 6 files)' },
      { metric: '2 wks', label: 'From messy files to live' },
      { metric: '0', label: 'Manual refreshes after' },
    ],
    featured: false,
  },
  {
    id: 'cs8', slug: 'bfsi-financial-reporting-automation',
    title: 'BFSI Reporting Automation at Enterprise Scale',
    tagline: 'Automated reporting pipelines and self-serve dashboards powering media-intelligence and financial reports for 200+ enterprise clients — 45% less manual effort at 99.5% accuracy.',
    client: 'Acuity Knowledge Partners · Financial Services',
    domain: 'BFSI · Media Intelligence',
    duration: '3+ years (enterprise role)',
    stack: ['SQL', 'Power BI', 'Python', 'ETL', 'Data Quality', 'Excel'],
    thumbnail: '/images/case-studies/cs-bfsi-reporting.svg',
    liveLink: '', liveLinkLabel: 'Confidential',
    problem: "In financial services, a wrong number isn't a cosmetic problem — it goes into a client's decision. I spent 3+ years building and managing the data behind media-intelligence and financial reports for 200+ buy-side and sell-side clients, where the bar was non-negotiable: accurate, on time, every time. A lot of the process was still manual, which made it slow and risky at that scale.",
    solution: [
      'Built and managed the <strong>data foundations</strong> feeding reporting across 200+ enterprise client engagements',
      'Automated repetitive reporting with <strong>SQL/ETL pipelines</strong> and Python, cutting the manual effort that slowed everything down',
      'Put a <strong>validation and reconciliation framework</strong> in front of delivery so errors were caught before they ever reached a client — holding ~99.5% data accuracy',
      'Moved recurring outputs into <strong>Power BI</strong> self-serve dashboards so stakeholders stopped waiting on manual pulls',
      'Standardised definitions and QA so different reports finally agreed with each other',
    ],
    results: [
      { metric: '200+', label: 'Enterprise clients served' },
      { metric: '45%', label: 'Manual effort reduced' },
      { metric: '99.5%', label: 'Data accuracy held' },
      { metric: '3+ yrs', label: 'BFSI reporting at scale' },
    ],
    featured: true,
  },
  {
    id: 'cs9', slug: 'rag-document-assistant',
    title: 'RAG-Powered Document Assistant',
    tagline: 'A retrieval-augmented (RAG) assistant that answers plain-English questions over a company’s own documents — with sourced, grounded answers instead of guesses.',
    client: 'Personal Build · Live Prototype',
    domain: 'Generative AI · NLP',
    duration: 'Ongoing project',
    stack: ['Python', 'LangChain', 'RAG', 'Vector Search', 'LLMs', 'Streamlit'],
    thumbnail: '/images/case-studies/cs-genai-rag.svg',
    liveLink: 'https://github.com/GAURAV19999', liveLinkLabel: 'View on GitHub',
    problem: "Every team sits on a pile of PDFs, reports and policy docs, and finding one answer means someone hunting through all of it. Plain keyword search is useless the moment the question is phrased naturally — and handing the raw docs to a chatbot just invites confident, made-up answers. I wanted to build the honest version: an assistant that only answers from your actual documents, and shows its sources.",
    solution: [
      'Ingest and <strong>chunk</strong> the source documents, then embed them into a <strong>vector store</strong> for semantic retrieval',
      'On each question, retrieve the most relevant passages and feed them to the LLM as grounded context (classic <strong>RAG</strong>)',
      'Return answers <strong>with their source citations</strong>, so you can trace every claim back to the document it came from',
      'Guardrails so the assistant says “I don’t know” instead of hallucinating when the answer isn’t in the documents',
      'Simple <strong>Streamlit</strong> chat interface — runs on your own documents, nothing leaves your control',
    ],
    results: [
      { metric: 'Plain English', label: 'Ask, don’t keyword-search' },
      { metric: 'Source-cited', label: 'Every answer traceable' },
      { metric: 'Seconds', label: 'To find a buried answer' },
      { metric: 'Grounded', label: 'No made-up answers' },
    ],
    featured: false,
  },
];

const toAdd = cases.filter(c => !have.has(c.slug));
// unshift in reverse so final order = excel, bfsi, genai, ...rest
[...toAdd].reverse().forEach(c => data.caseStudies.items.unshift(c));
fs.writeFileSync(P, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log('Added case studies:', toAdd.map(c => c.slug));
console.log('Total case studies now:', data.caseStudies.items.length);
