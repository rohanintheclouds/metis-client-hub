// ─────────────────────────────────────────────────────────────────────────
// Market ↔ client mapping for the Market Insights feature.
//
// A research report is kept only if it matches at least one client's market
// keywords — that's the "stay within the markets we're involved in" rule.
// Keywords describe the MARKET a client operates in, never the client name,
// so a Goldman piece on data-center power demand maps to Lumen and NRG even
// if neither is mentioned.
// ─────────────────────────────────────────────────────────────────────────

export const CLIENT_MARKETS = {
  aflac: ["insurance", "insurer", "supplemental health", "life insurance", "underwriting"],
  "ford-credit": ["auto", "automotive", "vehicle", "car market", "ev ", "electric vehicle", "auto lending", "captive finance", "consumer credit"],
  "lumen-technologies": ["ai infrastructure", "data center", "datacenter", "connectivity", "fiber", "telecom", "network infrastructure", "bandwidth", "cloud infrastructure", "hyperscaler"],
  adp: ["payroll", "labor market", "workforce", "employment", "hiring", "hr tech", "human capital", "future of work"],
  ukg: ["workforce management", "hr tech", "human capital", "labor market", "scheduling", "future of work"],
  "generac-power-systems": ["power generation", "grid", "energy resilience", "backup power", "electrification", "energy storage", "battery", "microgrid"],
  "take-command": ["health benefits", "health insurance", "healthcare cost", "employer health", "ichra", "benefits"],
  "nrg-energy": ["electricity", "power market", "utilities", "energy demand", "retail energy", "grid", "natural gas", "data center power"],
  "baker-tilly": ["m&a", "mergers", "acquisitions", "private equity", "dealmaking", "deal activity", "tax policy", "accounting", "audit", "middle market"],
  "regal-rexnord": ["manufacturing", "industrial", "supply chain", "factory", "machinery", "reshoring", "automation"],
  "vulcan-materials": ["infrastructure spending", "construction", "aggregates", "housing starts", "public works", "cement", "roads"],
  loandepot: ["mortgage", "housing market", "home price", "real estate", "interest rate", "homebuyer", "refinancing"],
  "rockwell-automation": ["industrial automation", "robotics", "manufacturing", "smart factory", "reshoring", "iiot", "supply chain"],
  workday: ["enterprise software", "saas", "hr tech", "cloud software", "erp", "ai agents", "back office", "future of work"],
  "intuitive-surgical": ["medtech", "medical device", "robotic surgery", "healthcare", "hospital", "surgical", "life sciences"],
};

// Cross-cutting themes shown as chips on the insight card.
export const THEMES = {
  "AI & Automation": ["artificial intelligence", " ai ", "ai ", "generative", "automation", "machine learning", "ai agents", "robotics"],
  "Energy & Power": ["energy", "power", "grid", "electricity", "renewables", "nuclear"],
  "Workforce & HR": ["workforce", "labor", "talent", "employment", "payroll", "hr "],
  "Industrials & Supply Chain": ["manufacturing", "industrial", "supply chain", "reshoring", "factory"],
  "Financial Services": ["insurance", "banking", "credit", "mortgage", "lending", "private equity", "m&a"],
  "Healthcare": ["health", "medical", "medtech", "hospital", "care "],
  "Tech & Cloud": ["software", "cloud", "data center", "saas", "digital", "connectivity", "telecom"],
  "Macro & Markets": ["economy", "gdp", "inflation", "interest rate", "outlook", "markets", "tariff"],
};

function hits(text, words) {
  return words.some((w) => text.includes(w));
}

/** Returns { clients: [clientId], themes: [label] } for a report's text. */
export function mapToClients(text) {
  const t = ` ${text.toLowerCase()} `;
  const clients = Object.keys(CLIENT_MARKETS).filter((id) => hits(t, CLIENT_MARKETS[id]));
  const themes = Object.keys(THEMES).filter((label) => hits(t, THEMES[label]));
  return { clients, themes };
}
