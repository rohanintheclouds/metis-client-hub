// Client roster for the Metis Client Hub.
// coast   — used by the landing-page filter (East Coast / Central / West Coast)
// tags    — project-type taxonomy (drives personalized-newsletter filtering)
// domain  — used to resolve a logo (logo.dev / Clearbit), with monogram fallback
// mono    — brand-ish tile color for the monogram fallback
export const CLIENTS = [
  // ── East Coast ──────────────────────────────────────────────────────────
  {
    id: "aflac",
    name: "Aflac",
    legalName: "Aflac Incorporated",
    ticker: "NYSE: AFL",
    coast: "East Coast",
    sector: "Insurance",
    domain: "aflac.com",
    mono: "#0033a0",
    tags: ["Digital Transformation", "Customer Experience", "Data & Analytics"],
  },
  {
    id: "ford-credit",
    name: "Ford Credit",
    legalName: "Ford Motor Credit Company",
    ticker: "NYSE: F",
    coast: "East Coast",
    sector: "Auto Finance",
    domain: "ford.com",
    mono: "#00095b",
    tags: ["Digital Transformation", "Data & Analytics", "Operating Model & Org"],
  },
  {
    id: "lumen-technologies",
    name: "Lumen",
    legalName: "Lumen Technologies, Inc.",
    ticker: "NYSE: LUMN",
    coast: "East Coast",
    sector: "Telecom / AI Infrastructure",
    domain: "lumen.com",
    mono: "#0d2a5c",
    tags: ["Cloud & Infrastructure", "AI & Automation", "Operating Model & Org"],
  },
  {
    id: "adp",
    name: "ADP",
    legalName: "Automatic Data Processing, Inc.",
    ticker: "NASDAQ: ADP",
    coast: "East Coast",
    sector: "HCM / Payroll",
    domain: "adp.com",
    mono: "#cc0000",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Product & Engineering"],
  },
  {
    id: "ukg",
    name: "UKG",
    legalName: "Ultimate Kronos Group",
    ticker: "Private",
    coast: "East Coast",
    sector: "HCM / Workforce",
    domain: "ukg.com",
    mono: "#005151",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Product & Engineering"],
  },

  // ── Central ─────────────────────────────────────────────────────────────
  {
    id: "generac-power-systems",
    name: "Generac",
    legalName: "Generac Holdings Inc.",
    ticker: "NYSE: GNRC",
    coast: "Central",
    sector: "Energy / Power",
    domain: "generac.com",
    mono: "#f37021",
    tags: ["Data & Analytics", "Operating Model & Org", "Product & Engineering"],
  },
  {
    id: "take-command",
    name: "Take Command",
    legalName: "Take Command Health",
    ticker: "Private",
    coast: "Central",
    sector: "Health Benefits / Fintech",
    domain: "takecommandhealth.com",
    mono: "#1f6feb",
    tags: ["Digital Transformation", "Product & Engineering", "Customer Experience"],
  },
  {
    id: "nrg-energy",
    name: "NRG",
    legalName: "NRG Energy, Inc.",
    ticker: "NYSE: NRG",
    coast: "Central",
    sector: "Energy / Utilities",
    domain: "nrg.com",
    mono: "#00a94f",
    tags: ["Digital Transformation", "Data & Analytics", "Customer Experience"],
  },
  {
    id: "baker-tilly",
    name: "Baker Tilly",
    legalName: "Baker Tilly",
    ticker: "Private",
    coast: "Central",
    sector: "Advisory / Accounting",
    domain: "bakertilly.com",
    mono: "#e4002b",
    tags: ["Operating Model & Org", "M&A / Integration", "Digital Transformation"],
  },
  {
    id: "regal-rexnord",
    name: "Regal Rexnord",
    legalName: "Regal Rexnord Corporation",
    ticker: "NYSE: RRX",
    coast: "Central",
    sector: "Industrial / Automation",
    domain: "regalrexnord.com",
    mono: "#0b2d71",
    tags: ["Operating Model & Org", "Data & Analytics", "M&A / Integration"],
  },
  {
    id: "vulcan-materials",
    name: "Vulcan Materials",
    legalName: "Vulcan Materials Company",
    ticker: "NYSE: VMC",
    coast: "Central",
    sector: "Construction Materials",
    domain: "vulcanmaterials.com",
    mono: "#00539b",
    tags: ["Operating Model & Org", "M&A / Integration", "Data & Analytics"],
  },

  // ── West Coast ────────────────────────────────────────────────────────────
  {
    id: "loandepot",
    name: "loanDepot",
    legalName: "loanDepot, Inc.",
    ticker: "NYSE: LDI",
    coast: "West Coast",
    sector: "Mortgage / Fintech",
    domain: "loandepot.com",
    mono: "#00a3a1",
    tags: ["Digital Transformation", "AI & Automation", "Cost & Efficiency"],
  },
  {
    id: "rockwell-automation",
    name: "Rockwell Automation",
    legalName: "Rockwell Automation, Inc.",
    ticker: "NYSE: ROK",
    coast: "West Coast",
    sector: "Industrial Automation",
    domain: "rockwellautomation.com",
    mono: "#cc0000",
    tags: ["AI & Automation", "Cloud & Infrastructure", "Product & Engineering"],
  },
  {
    id: "workday",
    name: "Workday",
    legalName: "Workday, Inc.",
    ticker: "NASDAQ: WDAY",
    coast: "West Coast",
    sector: "Enterprise SaaS",
    domain: "workday.com",
    mono: "#005cb9",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Cloud & Infrastructure"],
  },
  {
    id: "intuitive-surgical",
    name: "Intuitive Surgical",
    legalName: "Intuitive Surgical, Inc.",
    ticker: "NASDAQ: ISRG",
    coast: "West Coast",
    sector: "Medtech / Robotics",
    domain: "intuitive.com",
    mono: "#7a2f8f",
    tags: ["Product & Engineering", "Data & Analytics", "AI & Automation"],
  },
];

export const CLIENTS_BY_ID = Object.fromEntries(CLIENTS.map((c) => [c.id, c]));

export function getClient(id) {
  return CLIENTS_BY_ID[id];
}

export function logoUrl(client) {
  // logo.dev public token-free CDN path; falls back to monogram on error.
  return `https://img.logo.dev/${client.domain}?token=pk_demo&size=200&format=png&retina=true`;
}

export function clearbitUrl(client) {
  return `https://logo.clearbit.com/${client.domain}`;
}
