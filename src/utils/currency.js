// Currency detection + conversion for the Services pricing section.
// Detects visitor country via browser locale + timezone (privacy-friendly, no API calls).

const RATES = {
  // Approximate mid-market rates (Jul 2026 baseline). Update anytime — admin can override too.
  USD: { code: 'USD', symbol: '$', locale: 'en-US', rate: 1 },
  EUR: { code: 'EUR', symbol: '€', locale: 'de-DE', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', rate: 0.78 },
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN', rate: 83 },
  AUD: { code: 'AUD', symbol: 'A$', locale: 'en-AU', rate: 1.52 },
  CAD: { code: 'CAD', symbol: 'C$', locale: 'en-CA', rate: 1.37 },
};

// Timezone → currency map (safer than IP lookup)
const TZ_TO_CURRENCY = {
  'Asia/Kolkata': 'INR',
  'Asia/Calcutta': 'INR',
  'Europe/London': 'GBP',
  'Europe/Dublin': 'EUR',
  'Europe/Berlin': 'EUR',
  'Europe/Amsterdam': 'EUR',
  'Europe/Paris': 'EUR',
  'Europe/Madrid': 'EUR',
  'Europe/Rome': 'EUR',
  'Europe/Vienna': 'EUR',
  'Europe/Brussels': 'EUR',
  'Europe/Warsaw': 'EUR',
  'Europe/Stockholm': 'EUR',
  'Europe/Zurich': 'EUR',
  'Europe/Lisbon': 'EUR',
  'Australia/Sydney': 'AUD',
  'Australia/Melbourne': 'AUD',
  'Australia/Perth': 'AUD',
  'America/Toronto': 'CAD',
  'America/Vancouver': 'CAD',
};

export const AVAILABLE_CURRENCIES = Object.values(RATES);

export function detectCurrency() {
  // 1. Manual override via localStorage (user picks from switcher)
  try {
    const saved = localStorage.getItem('gkv_currency');
    if (saved && RATES[saved]) return RATES[saved];
  } catch {}

  // 2. Try timezone
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const code = TZ_TO_CURRENCY[tz];
    if (code && RATES[code]) return RATES[code];
  } catch {}

  // 3. Try locale
  try {
    const loc = (navigator.language || 'en-US').toLowerCase();
    if (loc.startsWith('en-in') || loc.startsWith('hi')) return RATES.INR;
    if (loc.startsWith('en-gb')) return RATES.GBP;
    if (loc.startsWith('de') || loc.startsWith('fr') || loc.startsWith('nl') ||
        loc.startsWith('es') || loc.startsWith('it')) return RATES.EUR;
    if (loc.startsWith('en-au')) return RATES.AUD;
    if (loc.startsWith('en-ca')) return RATES.CAD;
  } catch {}

  // 4. Default
  return RATES.USD;
}

export function setCurrency(code) {
  try { localStorage.setItem('gkv_currency', code); } catch {}
}

const formatNumber = (n, code) => {
  // Nice rounding: USD/EUR/GBP/CAD/AUD → nearest 50; INR → nearest 500
  if (code === 'INR') {
    const rounded = Math.round(n / 500) * 500;
    return new Intl.NumberFormat('en-IN').format(rounded);
  }
  const rounded = Math.round(n / 50) * 50;
  return new Intl.NumberFormat('en-US').format(rounded);
};

// Parse a USD price string like "$800 – $2,800" or "$1,200 – $1,700 / mo" or "$80 – $120 / hr"
// Returns the same format converted to the target currency.
export function convertPriceString(usdPriceStr, currency) {
  if (!usdPriceStr) return '';
  if (currency.code === 'USD') return usdPriceStr;

  // Extract all dollar-amounts and remember non-numeric bits
  const numbers = [...usdPriceStr.matchAll(/\$([\d,]+(?:\.\d+)?)/g)].map((m) =>
    parseFloat(m[1].replace(/,/g, ''))
  );
  if (numbers.length === 0) return usdPriceStr;

  const converted = numbers.map((n) => formatNumber(n * currency.rate, currency.code));

  let idx = 0;
  return usdPriceStr.replace(/\$[\d,]+(?:\.\d+)?/g, () =>
    `${currency.symbol}${converted[idx++]}`
  );
}
