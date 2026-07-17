// Client roster for the Metis Client Hub.
// coast   — used by the landing-page filter (East Coast / Central / West Coast)
// tags    — project-type taxonomy (drives personalized-newsletter filtering)
// domain  — used to resolve a logo (logo.dev / Clearbit), with monogram fallback
// mono    — brand-ish tile color for the monogram fallback

import LogoAflac from "@/assets/logos/aflac.png";
import LogoFordCredit from "@/assets/logos/ford-credit.png";
import LogoLumen from "@/assets/logos/lumen-technologies.png";
import LogoAdp from "@/assets/logos/adp.png";
import LogoUkg from "@/assets/logos/ukg.svg";
import LogoGenerac from "@/assets/logos/generac-power-systems.png";
import LogoNrg from "@/assets/logos/nrg-energy.png";
import LogoRegalRexnord from "@/assets/logos/regal-rexnord.png";
import LogoVulcan from "@/assets/logos/vulcan-materials.svg";
import LogoLoandepot from "@/assets/logos/loandepot.png";
import LogoRockwell from "@/assets/logos/rockwell-automation.png";
import LogoWorkday from "@/assets/logos/workday.png";
import LogoIntuitive from "@/assets/logos/intuitive-surgical.png";

export const CLIENTS = [
  // ── East Coast ──────────────────────────────────────────────────────────
  {
    id: "aflac",
    logo: LogoAflac,
    name: "Aflac",
    legalName: "Aflac Incorporated",
    ticker: "NYSE: AFL",
    coast: "East Coast",
    sector: "Insurance",
    domain: "aflac.com",
    hq: "Columbus, Georgia",
    founded: "1955",
    about:
      "Aflac is the largest provider of supplemental health insurance in the United States, best known for cash-benefit policies covering cancer, accidents and disability that are sold largely through workplace payroll deduction. Roughly two-thirds of its earnings come from Aflac Japan, one of that country's biggest insurers, and the duck-branded company has raised its dividend for 43 straight years.",
    model:
      "Collects premiums on supplemental health and life policies in Japan (~two-thirds of earnings) and the U.S., profiting from the underwriting margin plus investment income earned on the float.",
    mono: "#0033a0",
    tags: ["Digital Transformation", "Customer Experience", "Data & Analytics"],
  },
  {
    id: "ford-credit",
    logo: LogoFordCredit,
    name: "Ford Credit",
    legalName: "Ford Motor Credit Company",
    ticker: "NYSE: F",
    coast: "East Coast",
    sector: "Auto Finance",
    domain: "ford.com",
    hq: "Dearborn, Michigan",
    founded: "1959",
    about:
      "Ford Credit is the captive financing arm of Ford Motor Company, providing retail auto loans and leases to customers and floorplan financing to Ford and Lincoln dealers worldwide. With a managed portfolio well north of $130B, it is a major profit contributor to Ford and is standing up an FDIC-insured industrial bank to fund lending with cheaper retail deposits.",
    model:
      "Earns the spread between its funding costs and the interest on a ~$130B book of retail auto loans, leases and dealer floorplan lines — plus lease residual gains — and upstreams distributions to Ford.",
    mono: "#00095b",
    tags: ["Digital Transformation", "Data & Analytics", "Operating Model & Org"],
  },
  {
    id: "lumen-technologies",
    logo: LogoLumen,
    name: "Lumen",
    legalName: "Lumen Technologies, Inc.",
    ticker: "NYSE: LUMN",
    coast: "East Coast",
    sector: "Telecom / AI Infrastructure",
    domain: "lumen.com",
    hq: "Monroe, Louisiana",
    founded: "1930 · rebranded 2020",
    about:
      "Lumen Technologies (formerly CenturyLink) operates one of the largest fiber networks in North America, selling enterprise connectivity, edge cloud and security services. The company is repositioning itself as the network backbone for the AI era, signing multi-billion-dollar deals to connect hyperscaler data centers.",
    model:
      "Sells connectivity under multi-year enterprise and wholesale contracts — dark fiber, IP, edge and security — including multi-billion-dollar Private Connectivity Fabric deals with hyperscalers, against a declining legacy copper/voice base.",
    mono: "#0d2a5c",
    tags: ["Cloud & Infrastructure", "AI & Automation", "Operating Model & Org"],
  },
  {
    id: "adp",
    logo: LogoAdp,
    name: "ADP",
    legalName: "Automatic Data Processing, Inc.",
    ticker: "NASDAQ: ADP",
    coast: "East Coast",
    sector: "HCM / Payroll",
    domain: "adp.com",
    hq: "Roseland, New Jersey",
    founded: "1949",
    about:
      "ADP is the world's largest payroll and human-capital-management provider, paying about one in six private-sector workers in the U.S. and serving over 1.1 million clients in 140 countries. Its platforms span payroll, HR, tax, benefits and workforce analytics, and its monthly National Employment Report is a closely watched economic indicator.",
    model:
      "Charges recurring per-employee-per-month fees for payroll and HCM services, adds PEO revenue, and earns 'client funds interest' — float income on payroll cash held between pay cycles.",
    mono: "#cc0000",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Product & Engineering"],
  },
  {
    id: "ukg",
    logo: LogoUkg,
    name: "UKG",
    legalName: "Ultimate Kronos Group",
    ticker: "Private",
    coast: "East Coast",
    sector: "HCM / Workforce",
    domain: "ukg.com",
    hq: "Lowell, MA & Weston, FL",
    founded: "2020 (merger)",
    about:
      "UKG (Ultimate Kronos Group) is one of the largest private software companies in the U.S., formed by the 2020 merger of Ultimate Software and Kronos. Its UKG Pro and UKG Ready suites cover HR, payroll and workforce management for tens of thousands of organizations, with a heavy push into AI-driven scheduling and people analytics.",
    model:
      "Sells multi-year SaaS subscriptions to its UKG Pro and UKG Ready HR/workforce suites plus implementation and support services; privately held by Hellman & Friedman.",
    mono: "#005151",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Product & Engineering"],
  },

  // ── Central ─────────────────────────────────────────────────────────────
  {
    id: "generac-power-systems",
    logo: LogoGenerac,
    name: "Generac",
    legalName: "Generac Holdings Inc.",
    ticker: "NYSE: GNRC",
    coast: "Central",
    sector: "Energy / Power",
    domain: "generac.com",
    hq: "Waukesha, Wisconsin",
    founded: "1959",
    about:
      "Generac is North America's leading maker of home standby generators and a growing energy-technology company spanning commercial & industrial power, batteries, solar storage and grid services. It pioneered the residential standby category and still commands roughly three-quarters of that market.",
    model:
      "Sells home standby generators through a large dealer network, bigger C&I gensets, and a growing energy-tech line (batteries, microgrids, grid services); aftermarket parts and service add a recurring layer.",
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
    hq: "Dallas, Texas",
    founded: "2014",
    about:
      "Take Command is a Dallas-based health-benefits platform and the leading administrator of ICHRAs — reimbursement accounts that let employers fund employees' individual health insurance instead of buying group plans. The venture-backed company rides one of the fastest-growing shifts in U.S. employer health coverage.",
    model:
      "Charges employers per-employee-per-month administration fees for ICHRA/QSEHRA reimbursement accounts and earns commissions on the individual health plans employees choose.",
    mono: "#1f6feb",
    tags: ["Digital Transformation", "Product & Engineering", "Customer Experience"],
  },
  {
    id: "nrg-energy",
    logo: LogoNrg,
    name: "NRG",
    legalName: "NRG Energy, Inc.",
    ticker: "NYSE: NRG",
    coast: "Central",
    sector: "Energy / Utilities",
    domain: "nrg.com",
    hq: "Houston, Texas",
    founded: "1989",
    about:
      "NRG Energy is one of the largest consumer energy companies in the U.S., selling electricity and natural gas to about 8 million retail customers under brands like Reliant and Direct Energy, backed by its own generation fleet. Through Vivint Smart Home it is building an integrated home-energy and automation offering.",
    model:
      "Makes money on the margin between retail electricity and gas plans (Reliant, Direct Energy, Green Mountain) and its ~25 GW generation fleet, plus Vivint smart-home subscriptions.",
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
    hq: "Chicago, Illinois",
    founded: "1931",
    about:
      "Baker Tilly is a top-10 U.S. advisory, tax and assurance firm and the largest member of the global Baker Tilly International network. Following its 2024 private-equity investment and merger with Moss Adams, it serves middle-market clients across audit, consulting, and digital transformation.",
    model:
      "Bills professional fees across assurance, tax and advisory engagements; the PE-backed alternative-practice structure separates the attest firm (Baker Tilly US) from the advisory group.",
    mono: "#e4002b",
    tags: ["Operating Model & Org", "M&A / Integration", "Digital Transformation"],
  },
  {
    id: "regal-rexnord",
    logo: LogoRegalRexnord,
    name: "Regal Rexnord",
    legalName: "Regal Rexnord Corporation",
    ticker: "NYSE: RRX",
    coast: "Central",
    sector: "Industrial / Automation",
    domain: "regalrexnord.com",
    hq: "Milwaukee, Wisconsin",
    founded: "1955 · merger 2021",
    about:
      "Regal Rexnord makes the motors, bearings, gearboxes and power-transmission components that keep factories, HVAC systems and conveyors running — the 2021 merger of Regal Beloit and Rexnord created an industrial powertrain leader. Its products sit inside everything from data-center cooling to food processing lines.",
    model:
      "Sells engineered motors, bearings, gearboxes and power-transmission components to OEMs and distributors across four segments, with aftermarket replacement demand providing a recurring base.",
    mono: "#0b2d71",
    tags: ["Operating Model & Org", "Data & Analytics", "M&A / Integration"],
  },
  {
    id: "vulcan-materials",
    logo: LogoVulcan,
    name: "Vulcan Materials",
    legalName: "Vulcan Materials Company",
    ticker: "NYSE: VMC",
    coast: "Central",
    sector: "Construction Materials",
    domain: "vulcanmaterials.com",
    hq: "Birmingham, Alabama",
    founded: "1909",
    about:
      "Vulcan Materials is the largest U.S. producer of construction aggregates — the crushed stone, sand and gravel underneath roads, bridges and buildings — plus downstream asphalt and ready-mixed concrete. Its 400+ quarries across fast-growing Sun Belt states make it a prime beneficiary of infrastructure spending.",
    model:
      "Sells aggregates by the ton from 400+ quarries — pricing power comes from local scarcity and freight economics — plus downstream asphalt and ready-mixed concrete.",
    mono: "#00539b",
    tags: ["Operating Model & Org", "M&A / Integration", "Data & Analytics"],
  },

  // ── West Coast ────────────────────────────────────────────────────────────
  {
    id: "loandepot",
    logo: LogoLoandepot,
    name: "loanDepot",
    legalName: "loanDepot, Inc.",
    ticker: "NYSE: LDI",
    coast: "West Coast",
    sector: "Mortgage / Fintech",
    domain: "loandepot.com",
    hq: "Irvine, California",
    founded: "2010",
    about:
      "loanDepot is one of the largest nonbank mortgage lenders in the U.S., originating home loans through its digital mello platform, a national retail sales force, and joint ventures with homebuilders. It also runs a large servicing book and is pushing an ambitious cost-reset under its Vision 2027 plan.",
    model:
      "Earns gain-on-sale margin from originating and selling mortgages into the secondary market, plus recurring servicing fees on a large servicing portfolio.",
    mono: "#00a3a1",
    tags: ["Digital Transformation", "AI & Automation", "Cost & Efficiency"],
  },
  {
    id: "rockwell-automation",
    logo: LogoRockwell,
    name: "Rockwell Automation",
    legalName: "Rockwell Automation, Inc.",
    ticker: "NYSE: ROK",
    coast: "West Coast",
    sector: "Industrial Automation",
    domain: "rockwellautomation.com",
    hq: "Milwaukee, Wisconsin",
    founded: "1903",
    about:
      "Rockwell Automation is the world's largest company dedicated to industrial automation, best known for its Allen-Bradley controllers and FactoryTalk software that run production lines across autos, food, life sciences and logistics. It is central to the reshoring and smart-manufacturing wave in North America.",
    model:
      "Sells Allen-Bradley control hardware, FactoryTalk software licenses and subscriptions, and lifecycle services — largely through distributors — with software and services the growing recurring layer.",
    mono: "#cc0000",
    tags: ["AI & Automation", "Cloud & Infrastructure", "Product & Engineering"],
  },
  {
    id: "workday",
    logo: LogoWorkday,
    name: "Workday",
    legalName: "Workday, Inc.",
    ticker: "NASDAQ: WDAY",
    coast: "West Coast",
    sector: "Enterprise SaaS",
    domain: "workday.com",
    hq: "Pleasanton, California",
    founded: "2005",
    about:
      "Workday is the leading cloud platform for enterprise HR and finance, used by more than 10,000 organizations including over half of the Fortune 500. Founded by PeopleSoft veterans Dave Duffield and Aneel Bhusri, it is expanding aggressively from HCM into financial management and AI agents for the back office.",
    model:
      "Sells multi-year cloud subscriptions for HCM and financial management (the vast majority of revenue is subscription), plus professional services for deployments.",
    mono: "#005cb9",
    tags: ["AI & Automation", "ERP & Enterprise Apps", "Cloud & Infrastructure"],
  },
  {
    id: "intuitive-surgical",
    logo: LogoIntuitive,
    name: "Intuitive Surgical",
    legalName: "Intuitive Surgical, Inc.",
    ticker: "NASDAQ: ISRG",
    coast: "West Coast",
    sector: "Medtech / Robotics",
    domain: "intuitive.com",
    hq: "Sunnyvale, California",
    founded: "1995",
    about:
      "Intuitive Surgical created the robotic-surgery category with its da Vinci system, which has performed tens of millions of minimally invasive procedures worldwide. With the fifth-generation da Vinci 5 and its Ion lung-biopsy platform, it remains the dominant player in surgical robotics.",
    model:
      "Classic razor-and-blades: sells or leases da Vinci and Ion systems, then earns most revenue from per-procedure instruments, accessories and service contracts.",
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
