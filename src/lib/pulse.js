// ─────────────────────────────────────────────────────────────────────────
// Client Pulse content store.
//
// In production this is populated by the weekly scrape job (scripts/scrape.mjs
// → data store). For the prototype it is seeded with real, sourced research
// (week of July 6, 2026) plus condensed prior editions so the per-client
// archive ("newest first, browse previous weeks") is fully navigable.
//
// Shape:
//   PULSE[clientId][editionId] = { glance, stats[], items[], sources[] }
//   stat  = { v, l, dir: 'up'|'down'|null }
//   item  = { headline, body, ctx }
//   src   = { label, url }
// ─────────────────────────────────────────────────────────────────────────

export const EDITIONS = [
  { id: "2026-07-06", label: "Week of July 6, 2026", date: "July 6, 2026" },
  { id: "2026-06-29", label: "Week of June 29, 2026", date: "June 29, 2026" },
  { id: "2026-06-22", label: "Week of June 22, 2026", date: "June 22, 2026" },
];

export const LATEST_EDITION = EDITIONS[0].id;

export const PULSE = {
  // ─────────────────────────── AFLAC ────────────────────────────
  aflac: {
    "2026-07-06": {
      glance:
        "Aflac shares are trading near all-time highs on the strength of its Japan and U.S. supplemental-insurance franchise, though analysts flag soft premium growth and weaker investment income heading into Q2 earnings.",
      stats: [
        { v: "$120.47", l: "Price · Jul 6", dir: "up" },
        { v: "~$60B", l: "Market cap", dir: null },
        { v: "$96.95–$120.88", l: "52-wk range", dir: "up" },
        { v: "Early Aug", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Stock hit a record.", body: "AFL closed at $120.47 on July 6, just off its all-time closing high of $120.88 set July 2, 2026.", ctx: "Momentum reflects investor confidence in the Japan/U.S. supplemental model despite a soft macro backdrop." },
        { headline: "Analyst targets raised.", body: "Piper Sandler lifted its price target to $130 and Morgan Stanley to $125, even as shares dipped ~0.9% after the last report on weaker revenue and investment income.", ctx: "Sell-side sees upside, but revenue quality and net investment income are the debate." },
        { headline: "Q1 2026 was mixed.", body: "Adjusted EPS of $1.75 missed the $1.80 consensus, but revenue of ~$4.3B beat and rose sharply year over year; net earnings were ~$1.0B ($1.98/diluted share).", ctx: "Top-line beat vs. EPS miss frames the setup for Q2." },
        { headline: "Capital return continues.", body: "Aflac returned $1.3B to shareholders in Q1 ($1.0B buybacks + $0.315B dividends), held the $0.61 Q2 dividend, and extended its streak to 43 consecutive years of increases.", ctx: "Consistent buybacks and dividend growth remain a core part of the equity story." },
      ],
      sources: [
        { label: "Yahoo Finance — AFL", url: "https://finance.yahoo.com/quote/AFL/" },
        { label: "MacroTrends — AFL price history", url: "https://www.macrotrends.net/stocks/charts/AFL/aflac/stock-price-history" },
        { label: "Aflac Q1 2026 8-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/0000004977/000162828026028396/aflex991-q12026new.htm" },
        { label: "MarketBeat — AFL", url: "https://www.marketbeat.com/stocks/NYSE/AFL/" },
      ],
    },
    "2026-06-29": {
      glance: "Aflac grinds toward record territory as investors reward the defensive supplemental-insurance model and steady capital return ahead of Q2.",
      stats: [
        { v: "~$118", l: "Price · late Jun", dir: "up" },
        { v: "43 yrs", l: "Consecutive dividend hikes", dir: "up" },
        { v: "Hold→Buy", l: "Analyst tone", dir: null },
      ],
      items: [
        { headline: "Defensive bid intact.", body: "AFL continued to climb through late June as investors rotated toward stable-cash-flow insurers amid rate uncertainty.", ctx: "The Japan block and yen dynamics remain the key swing factor for reported results." },
        { headline: "Buyback cadence steady.", body: "Management reiterated its capital-return framework, keeping buybacks running alongside the quarterly dividend.", ctx: "Return of capital is doing much of the per-share growth work while premium growth stays soft." },
      ],
      sources: [{ label: "MarketBeat — AFL", url: "https://www.marketbeat.com/stocks/NYSE/AFL/" }],
    },
  },

  // ─────────────────────────── FORD CREDIT ────────────────────────────
  "ford-credit": {
    "2026-07-06": {
      glance:
        "Ford's financing arm is gaining a lower-cost funding channel via FDIC approval of a new Utah industrial bank, while parent Ford reports Q2 2026 results on July 28 after raising full-year EBIT guidance despite a planned drop in low-margin sales.",
      stats: [
        { v: "$13.83", l: "Price · latest (F)", dir: null },
        { v: "~$54.5B", l: "Market cap (F)", dir: null },
        { v: "$8.5–$10.5B", l: "FY26 adj. EBIT guide", dir: "up" },
        { v: "Jul 28", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "FDIC clears Ford Credit Bank.", body: "The FDIC approved deposit insurance for a Ford Credit Bank industrial charter in Salt Lake City, giving Ford up to a year to stand it up and begin accepting insured deposits for vehicle purchases.", ctx: "A retail-deposit funding base is more stable and cheaper than unsecured debt and securitizations." },
        { headline: "Moody's calls it credit positive.", body: "Moody's said the Ford Credit (and GM Financial) industrial banks are credit positive, expecting lower funding costs from an FDIC-guaranteed, more stable source of funds.", ctx: "Cheaper funding supports Ford Credit's earnings contribution and lending competitiveness." },
        { headline: "Lease penetration shifting.", body: "Ford Credit's lease share of retail sales was 15% in Q4, up from 14% a year earlier but down from 18% in Q3.", ctx: "Lease mix drives residual-value exposure and future used-vehicle risk for the finance arm." },
        { headline: "Parent raised guidance.", body: "Ford lifted FY2026 adjusted EBIT guidance to $8.5B–$10.5B and confirmed a $0.15 Q2 dividend; Q2 U.S. sales fell 10% to 549,200 units, largely from planned phase-outs and a 69% cut in low-margin rental volume.", ctx: "Higher guidance plus deliberate mix cleanup frames the July 28 report." },
      ],
      sources: [
        { label: "FDIC — Ford Credit Bank", url: "https://www.fdic.gov/news/press-releases/2026/fdic-approves-deposit-insurance-applications-ford-credit-bank-salt-lake" },
        { label: "Auto Finance News — Moody's", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { label: "StockTitan — Ford Q2 date", url: "https://www.stocktitan.net/news/F/ford-motor-company-announces-details-for-q2-2026-earnings-conference-69cgm54uabld.html" },
        { label: "Yahoo Finance — F", url: "https://finance.yahoo.com/quote/F/" },
      ],
    },
    "2026-06-29": {
      glance: "Ford Credit's funding-cost story firms up as the industrial-bank charter advances; parent Ford works through a deliberate low-margin sales cleanup.",
      stats: [
        { v: "~$14", l: "Price · late Jun (F)", dir: "down" },
        { v: "15%", l: "Lease share of retail", dir: null },
        { v: "Jul 28", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Industrial-bank push advances.", body: "Ford continued to progress its Salt Lake City industrial-bank plan aimed at cheaper, deposit-based funding for auto lending.", ctx: "A structural funding-cost improvement for the captive finance arm." },
        { headline: "Recall overhang on parent.", body: "A string of recalls kept pressure on Ford shares even as the finance arm's credit metrics held steady.", ctx: "Consumer-credit performance is the watch item if the labor market softens." },
      ],
      sources: [{ label: "Yahoo Finance — F", url: "https://finance.yahoo.com/quote/F/" }],
    },
    "2026-06-22": {
      glance: "Ford under pressure on a fresh recall and soft May sales; the finance arm remains a relative bright spot on stable credit and funding progress.",
      stats: [
        { v: "$13.65", l: "Price · Jul 2 (F)", dir: "down" },
        { v: "−13.6%", l: "May U.S. sales YoY", dir: "down" },
        { v: "~750K", l: "Latest recall (units)", dir: null },
      ],
      items: [
        { headline: "Fresh ~750K-vehicle recall.", body: "Ford recalled roughly 750,000 vehicles over a transmission defect that can let cars roll while in park, spanning 2018–2021 Navigators, 2020–2021 Explorers, and 2021 F-150s.", ctx: "Adds to a string of recall headlines weighing on sentiment." },
        { headline: "Quality counterweight.", body: "Ford ranked No. 1 among mass-market brands in J.D. Power's 2026 Initial Quality Study (152 problems/100 vehicles vs. 177 segment avg).", ctx: "Supports the longer-term quality-push narrative." },
      ],
      sources: [{ label: "GuruFocus — recall", url: "https://www.gurufocus.com/news/8939133/ford-f-issues-major-recall-affecting-nearly-750000-vehicles" }],
    },
  },

  // ─────────────────────────── LUMEN ────────────────────────────
  "lumen-technologies": {
    "2026-07-06": {
      glance:
        "Lumen is repositioning its long-haul fiber as a 'data supply chain' for AI workloads, signing multibillion-dollar hyperscaler connectivity deals while working down heavy debt, but the stock stays volatile after a Russell growth-index removal.",
      stats: [
        { v: "$6.48", l: "Price · Jul 8", dir: "down" },
        { v: "~$6.6B", l: "Market cap (approx.)", dir: null },
        { v: "$3.37–$11.95", l: "52-wk range", dir: null },
        { v: "Aug 4", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Russell index removal hit shares.", body: "In late June 2026 Lumen was dropped from the Russell 3000 Growth, 2000 Growth and 2500 Growth indexes, and the stock fell about 18.6% around the news.", ctx: "Index exclusion can shrink passive/institutional ownership and pressure liquidity." },
        { headline: "AI fiber backlog building.", body: "Private Connectivity Fabric (PCF) deals total nearly $13B, including ~$2.5B of recent new agreements with hyperscalers and AI leaders such as Anthropic; Lumen plans ~58 million fiber miles by 2031.", ctx: "PCF is the core monetization thesis for turning legacy fiber into AI-infrastructure revenue." },
        { headline: "Balance-sheet cleanup underway.", body: "The $5.75B sale of consumer fiber to AT&T closed in February, with ~$4.8B of proceeds earmarked for debt paydown, alongside a recent ~$1.38B debt exchange.", ctx: "Deleveraging is critical given persistent legacy-revenue declines." },
        { headline: "Network expansion for AI.", body: "Lumen launched NorthLine, a low-latency Seattle–Minneapolis route, and is connecting 16 new QTS AI data-center campuses to its ~340,000-route-mile backbone; NaaS customers grew ~29%.", ctx: "New routes and NaaS adoption aim to offset shrinking legacy services." },
      ],
      sources: [
        { label: "Simply Wall St — index removal", url: "https://simplywall.st/stocks/us/telecom/nyse-lumn/lumen-technologies/news/lumen-technologies-lumn-is-down-186-after-broad-russell-grow" },
        { label: "Lumen IR — 2026 Investor Day", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Marks-New-Phase-of-Transformation-at-2026-Investor-Day/default.aspx" },
        { label: "Lumen IR — NorthLine", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Expands-its-U-S--Network-with-NorthLine-a-New-Northern-Fiber-Route-Built-for-AI-Data-Movement/default.aspx" },
        { label: "Yahoo Finance — LUMN", url: "https://finance.yahoo.com/quote/LUMN/" },
      ],
    },
    "2026-06-29": {
      glance: "Lumen shares eased into its late-July print with the AI-infrastructure story intact via the pending $475M Alkira deal and its AWS Interconnect role.",
      stats: [
        { v: "$7.69", l: "Price · Jul 2", dir: null },
        { v: "$11.95", l: "52-wk high", dir: null },
        { v: "Jul 30", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "$475M Alkira acquisition (pending).", body: "Lumen is buying cloud-networking firm Alkira for $475M all-cash, pairing Alkira's cloud-native control plane with Lumen's fiber to deliver 'cloud-like' enterprise networking.", ctx: "The clearest recent proof point of the digital-platform strategy; expected to close Q3 2026." },
        { headline: "AWS Interconnect role.", body: "Lumen was selected as the initial network operator to collaborate with AWS on its Interconnect service for high-speed cloud connectivity.", ctx: "Extends the 'physical layer of AI' thesis alongside the ~$13B in PCF deals." },
      ],
      sources: [{ label: "Lumen IR (Alkira)", url: "https://ir.lumen.com/news/news-details/2026/Lumen-to-Acquire-Alkira-Establishing-the-Control-Plane-for-Cloud-Connectivity/default.aspx" }],
    },
    "2026-06-22": {
      glance: "Lumen keeps stacking AI-infrastructure wins — an Anthropic fiber buildout and the $475M Alkira deal — while shares hold near $8.",
      stats: [
        { v: "$8.06", l: "Price · Jun 24", dir: null },
        { v: "$13B", l: "Total PCF contracts", dir: "up" },
        { v: "Jul 30", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "AI infrastructure momentum.", body: "Lumen was selected to expand Anthropic's fiber network across North America — part of nearly $13B in total Private Connectivity Fabric contracts.", ctx: "The core of the 'physical layer of AI' thesis driving the turnaround story." },
        { headline: "NorthLine fiber route.", body: "New low-latency Seattle–Minneapolis route supporting 100G/400G wavelengths, targeting AI/cloud data movement; live by end of 2026.", ctx: "Capacity aimed squarely at AI data movement." },
      ],
      sources: [{ label: "StockTitan — LUMN", url: "https://www.stocktitan.net/news/LUMN/" }],
    },
  },

  // ─────────────────────────── ADP ────────────────────────────
  adp: {
    "2026-07-06": {
      glance:
        "The HCM and payroll giant is leaning hard into agentic AI across its platform while raising FY2026 guidance, though the stock trades near the middle of its 52-week range ahead of a fiscal Q4 print.",
      stats: [
        { v: "$242.27", l: "Price · prev. close", dir: null },
        { v: "~$96.8B", l: "Market cap", dir: null },
        { v: "$2.59", l: "Q4 EPS est. (+14.6% YoY)", dir: "up" },
        { v: "Jul 29", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Raised FY2026 guidance on AI momentum.", body: "Management now targets 6–7% revenue growth and 10–11% adjusted EPS growth for fiscal 2026, citing HCM platform strength and AI adoption.", ctx: "Signals confidence that AI investment is translating into durable margin and top-line expansion, not just cost." },
        { headline: "ADP Assist scaling across the base.", body: "The company reported ~4M interactions on ADP Assist, with 12,000 service associates, 40%+ of sales, and 100% of developers enabled with AI tools.", ctx: "Internal AI enablement is a leading indicator of the productivity story ADP is selling to clients." },
        { headline: "AI-agent Marketplace launched.", body: "ADP opened a curated AI-agent destination in ADP Marketplace with partners including Absorb, G-P, Employ, Salary.com, Payactiv and Tapcheck to automate multi-step HR/payroll tasks.", ctx: "Positions ADP as an orchestration layer, deepening ecosystem lock-in against Workday and UKG." },
        { headline: "Q4 print due July 29.", body: "Analysts expect $2.59 diluted EPS, up from $2.26 a year ago; ADP has beaten EPS estimates in each of the last four quarters.", ctx: "A fifth straight beat would reinforce the reliability premium the stock has historically commanded." },
      ],
      sources: [
        { label: "Barchart — Q4 preview", url: "https://www.barchart.com/story/news/3138035/automatic-data-processing-s-q4-2026-earnings-what-to-expect" },
        { label: "ADP Media Center — AI Agents", url: "https://mediacenter.adp.com/2026-03-02-ADP-Marketplace-Launches-AI-Agents-to-Help-Make-Work-Easier,-Smarter" },
        { label: "Sahm Capital — HCM/AI strategy", url: "https://www.sahmcapital.com/news/content/adp-publishes-investor-presentation-outlining-hcm-strategy-and-ai-agent-rollout-2026-05-04" },
        { label: "ADP Investor Relations", url: "https://investors.adp.com/" },
      ],
    },
    "2026-06-29": {
      glance: "ADP steadied near $224 after locking in $9.2B in new credit facilities and posting a soft June jobs read (+98K); Q4 earnings land July 29.",
      stats: [
        { v: "$223.95", l: "Price · Jul 2", dir: null },
        { v: "$246.80", l: "12-mo target (avg)", dir: null },
        { v: "Jul 29", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "$9.2B in new credit facilities.", body: "ADP secured fresh financing on June 26, boosting liquidity ahead of earnings.", ctx: "Watch how it's deployed — buybacks, M&A, or client-funds positioning." },
        { headline: "Soft June jobs read.", body: "ADP's National Employment Report showed private payrolls up just 98K in June vs. ~117K expected.", ctx: "A weaker labor signal that markets read into Fed expectations." },
      ],
      sources: [{ label: "CNBC — ADP", url: "https://www.cnbc.com/quotes/ADP" }],
    },
    "2026-06-22": {
      glance: "ADP holds a Hold consensus with a $246.80 target; management flags early AI-driven efficiency supporting margin expansion.",
      stats: [
        { v: "$246.80", l: "12-mo target (avg)", dir: null },
        { v: "Hold", l: "Analyst consensus", dir: null },
        { v: "Jul 28", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Analyst tone steady.", body: "Wells Fargo reiterated Hold; the 18-analyst consensus is Hold with a $246.80 target.", ctx: "The reliability premium keeps a lid on upside surprises." },
        { headline: "AI efficiency gains.", body: "Management flags early AI-driven efficiency supporting margin expansion, with continued sales & marketing investment.", ctx: "FY2025: $20.56B revenue, $4.08B earnings." },
      ],
      sources: [{ label: "StockAnalysis — ADP", url: "https://stockanalysis.com/stocks/adp/" }],
    },
  },

  // ─────────────────────────── UKG ────────────────────────────
  ukg: {
    "2026-07-06": {
      glance:
        "Under CEO Jennifer Morgan, UKG has recast itself as an AI-first 'Workforce Operating Platform' player targeting frontline and hourly work, pairing agentic-AI product launches with a fresh venture arm and a marquee ServiceNow tie-up.",
      stats: [
        { v: "~80K", l: "Organizations served", dir: null },
        { v: "~$5B", l: "Est. annual revenue", dir: null },
        { v: "370", l: "Tech & service partners", dir: "up" },
        { v: "$6.5T", l: "Frontline-work market", dir: null },
      ],
      items: [
        { headline: "Workforce Operating Platform is the flagship bet.", body: "UKG unifies HR, workforce management and pay around 'People-First AI,' using agentic and assistive AI atop its People Fabric to process billions of signals for outcomes like overtime and attrition-risk optimization.", ctx: "Reframes UKG from a payroll/time vendor into a decision-intelligence layer for hourly and frontline labor." },
        { headline: "Agent-to-agent pact with ServiceNow.", body: "UKG announced a multi-step agent-to-agent collaboration integrating its People Fabric-powered AI with ServiceNow's AI Agent Fabric to modernize digital employee experiences.", ctx: "Interoperable-agent partnerships are becoming the competitive battleground in enterprise HR tech." },
        { headline: "Leadership bench rebuilt.", body: "Suresh Vittal joined as Chief Product Officer in January 2026, Jay Dettling was named inaugural Chief Partner Officer, and a dedicated CTO role is being carved out, all under CEO Jennifer Morgan.", ctx: "A deliberate infusion of top-tier SaaS operators signals a scaling phase, possibly pre-IPO positioning." },
        { headline: "Launched UKG Ventures.", body: "UKG stood up a strategic investment arm backing early- to growth-stage 'worktech' disruptors to give customers early access to emerging solutions.", ctx: "Extends UKG's ecosystem reach and gives it an innovation pipeline outside organic R&D." },
      ],
      sources: [
        { label: "UKG Newsroom", url: "https://www.ukg.com/company/newsroom" },
        { label: "Josh Bersin — frontline leadership", url: "https://joshbersin.com/2026/01/ukg-stakes-out-leadership-position-in-6-5-trillion-market-for-frontline-work/" },
        { label: "Brandon Hall — Meet the New UKG", url: "https://brandonhall.com/meet-the-new-ukg/" },
        { label: "UKG — Venture Fund", url: "https://www.ukg.com/company/newsroom/ukg-launches-venture-fund" },
      ],
    },
    "2026-06-29": {
      glance: "UKG keeps pushing agentic AI, unveiling new platform innovations and an OMNIA Partners GPO deal that opens a public-sector distribution channel.",
      stats: [
        { v: "~70K", l: "Organizations served", dir: null },
        { v: "Private", l: "Ownership", dir: null },
      ],
      items: [
        { headline: "Agentic AI platform push.", body: "UKG unveiled Quarterly Platform Innovations — an agentic orchestration layer surfacing frontline insights via the new Workforce Intelligence Hub and Dynamic Workforce Operations.", ctx: "Continues the pivot to an 'AI-first workforce operating platform.'" },
        { headline: "OMNIA Partners GPO deal.", body: "UKG announced a strategic partnership with OMNIA Partners — the largest U.S. group purchasing organization — giving members faster procurement access to the Workforce Operating Platform.", ctx: "A go-to-market channel play into public sector and member networks." },
      ],
      sources: [{ label: "UKG Newsroom", url: "https://www.ukg.com/company/newsroom" }],
    },
  },

  // ─────────────────────────── GENERAC ────────────────────────────
  "generac-power-systems": {
    "2026-07-06": {
      glance:
        "Generac has been one of 2026's standout industrials, up nearly 70% over the past year as investors reprice it around AI-data-center power demand alongside its core residential backup and energy-storage business.",
      stats: [
        { v: "$252.66", l: "Price · Jul 4", dir: "up" },
        { v: "~$15B", l: "Market cap", dir: null },
        { v: "+69.2%", l: "52-wk return", dir: "up" },
        { v: "Jul 29", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Belvidere, IL facility expands large-generator capacity.", body: "In June 2026 Generac announced a new Belvidere, Illinois facility to significantly expand packaging capacity for large-megawatt generators, supporting Commercial & Industrial growth.", ctx: "Directly targets surging data-center and mission-critical demand, the key driver of the stock's re-rating." },
        { headline: "Analyst targets climbing.", body: "Citi raised its price target to $300 from $263 on July 2, and Barclays lifted its target to $285 from $228 on June 30.", ctx: "Sell-side is increasingly underwriting the AI-power narrative, though targets now imply the stock has run ahead of fundamentals." },
        { headline: "International leadership shuffle.", body: "Generac promoted Niccolo Borracchini to EVP-International, overseeing Generac- and Pramac-branded businesses outside the U.S. and Canada.", ctx: "Consolidates global commercial leadership as Generac pushes energy-storage and C&I growth abroad." },
        { headline: "Q2 earnings due July 29.", body: "Consensus calls for roughly $1.95–$1.99 adjusted EPS, an ~18% year-over-year increase, on strength in commercial and data-center-linked demand.", ctx: "After a ~70% run, execution needs to keep pace with elevated expectations or the multiple is exposed." },
      ],
      sources: [
        { label: "StockTitan — GNRC", url: "https://www.stocktitan.net/news/GNRC/" },
        { label: "Yahoo Finance — GNRC preview", url: "https://finance.yahoo.com/markets/stocks/articles/know-ahead-generac-holdings-earnings-124804411.html" },
        { label: "Macrotrends — GNRC market cap", url: "https://www.macrotrends.net/stocks/charts/GNRC/generac-holdings/market-cap" },
      ],
    },
    "2026-06-29": {
      glance: "Generac extends its AI-power re-rating as sell-side targets climb and data-center demand underpins the Commercial & Industrial pipeline.",
      stats: [
        { v: "~$248", l: "Price · late Jun", dir: "up" },
        { v: "$300", l: "Citi target", dir: "up" },
        { v: "Jul 29", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Data-center demand thesis firms.", body: "Generac's mission-critical and C&I backlog continued to build on AI-data-center power needs.", ctx: "The re-rating hinges on converting that demand into large-generator revenue." },
        { headline: "Residential backup steady.", body: "Core home-standby demand held up through storm season, providing ballast to the growth story.", ctx: "Residential remains the cash engine funding the C&I expansion." },
      ],
      sources: [{ label: "StockTitan — GNRC", url: "https://www.stocktitan.net/news/GNRC/" }],
    },
  },

  // ─────────────────────────── TAKE COMMAND ────────────────────────────
  "take-command": {
    "2026-07-06": {
      glance:
        "The country's largest ICHRA administrator, Take Command is riding a surge in individual-coverage health reimbursement arrangements as employers flee double-digit group-plan inflation. Fresh growth capital and tripling enrollment mark it as a breakout health-benefits fintech.",
      stats: [
        { v: "$25M", l: "Growth round (Edison-led)", dir: "up" },
        { v: "3x", l: "ICHRA enrollment growth", dir: "up" },
        { v: "#1", l: "Largest U.S. ICHRA admin", dir: null },
        { v: "10.9%", l: "2026 medical-inflation tailwind", dir: "up" },
      ],
      items: [
        { headline: "Landed $25M growth investment led by Edison Partners.", body: "Take Command closed a $25M growth round led by Edison Partners, with LiveOak Venture Partners and SJF Ventures participating, to scale its ICHRA/QSEHRA administration platform.", ctx: "Capital signals investor conviction that individual-coverage HRAs are moving from niche to mainstream." },
        { headline: "ICHRA enrollment tripled in 2026.", body: "The company reports individual-coverage HRA enrollment tripled year over year as employers seek alternatives to group plans facing an estimated 10.9% medical-inflation increase.", ctx: "Rising group-plan costs structurally push employers toward defined-contribution health models." },
        { headline: "Published 2026 State of Employee Health Benefits report.", body: "Its annual report found 51% of respondents believe employees should have full control over their own health-insurance choices.", ctx: "Positions Take Command as a category thought leader as the defined-contribution narrative gains traction." },
        { headline: "Guiding employers through extended 2026 open enrollment.", body: "The platform is administering enrollment, compliance, and employee support across state-by-state extended windows running through mid-January for February 1 effective dates.", ctx: "Open-enrollment execution is the operational proving ground for retaining the tripled book of business." },
      ],
      sources: [
        { label: "Take Command — Press", url: "https://www.takecommandhealth.com/press" },
        { label: "Take Command — ICHRA growth", url: "https://www.takecommandhealth.com/blog/aca-changes-medical-inflation-ichra-growth" },
        { label: "CB Insights — profile", url: "https://www.cbinsights.com/company/take-command-health" },
      ],
    },
    "2026-06-29": {
      glance: "Take Command scales ICHRA administration into the 2026 plan year as employers pivot to defined-contribution health benefits.",
      stats: [
        { v: "3x", l: "Enrollment growth", dir: "up" },
        { v: "Private", l: "Ownership", dir: null },
      ],
      items: [
        { headline: "Defined-contribution momentum.", body: "Employer interest in ICHRA/QSEHRA arrangements accelerated ahead of open enrollment on double-digit group-plan cost increases.", ctx: "The structural tailwind behind Take Command's platform growth." },
        { headline: "Platform investment.", body: "The company continued investing in compliance automation and employee-support tooling to handle the larger book.", ctx: "Operational scalability is the key retention lever." },
      ],
      sources: [{ label: "Take Command — Press", url: "https://www.takecommandhealth.com/press" }],
    },
  },

  // ─────────────────────────── NRG ────────────────────────────
  "nrg-energy": {
    "2026-07-06": {
      glance:
        "NRG has transformed itself into a power-and-data-center growth story, doubling its generation fleet via a $12B LS Power acquisition and courting hyperscaler demand in Texas. Shares trade off 52-week highs as investors weigh a rich valuation against an in-progress capacity ramp.",
      stats: [
        { v: "$137.48", l: "Price · Jul 8", dir: "down" },
        { v: "$29.0B", l: "Market cap", dir: "down" },
        { v: "158.8", l: "P/E ratio", dir: null },
        { v: "Aug 4", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Closed $12B LS Power acquisition, doubling generation to ~25 GW.", body: "On Jan 30, 2026 NRG completed its ~$12.0B enterprise-value purchase of 13 GW of natural-gas generation plus CPower's C&I virtual-power-plant platform, roughly doubling its fleet to ~25.8 GW across nine states.", ctx: "The deal reshapes NRG into a scaled generator positioned to serve surging data-center and electrification load." },
        { headline: "Reaffirmed 2026 EPS guidance of $7.55–$8.15.", body: "Alongside Q1 results, management held its full-year adjusted EPS outlook, citing accelerating demand from data centers, electrification, and manufacturing.", ctx: "Reaffirmed guidance steadies the story ahead of the Aug 4 Q2 print despite a Q1 EPS miss ($1.48 vs. $1.73 expected)." },
        { headline: "Data-center contracts ramping toward 445 MW by 2032.", body: "NRG has executed retail data-center agreements scaling from 5 MW in 2026 to a contracted 445 MW by 2032, at target pricing above $80/MWh and retail margins exceeding $25/MWh.", ctx: "Long-dated hyperscaler contracts convert the data-center demand supercycle into predictable cash flow." },
        { headline: "Shares off 52-week highs on valuation.", body: "NRG closed at $137.48, well below its 52-week high of $189.96, with the stock carrying a stretched ~159x P/E.", ctx: "The pullback reflects investor caution on valuation while the acquired capacity and contracts are still ramping." },
      ],
      sources: [
        { label: "StockAnalysis — NRG", url: "https://stockanalysis.com/stocks/nrg/" },
        { label: "NRG Investors — LS Power close", url: "https://investors.nrg.com/news-releases/news-release-details/nrg-energy-completes-acquisition-13-gw-power-generation-and-ci" },
        { label: "Investing.com — Q1 guidance", url: "https://www.investing.com/news/company-news/nrg-energy-q1-2026-slides-reaffirms-guidance-despite-earnings-decline-93CH-4664397" },
        { label: "Yahoo Finance — data-center outlook", url: "https://finance.yahoo.com/news/data-center-growth-lifts-nrg-001234664.html" },
      ],
    },
    "2026-06-29": {
      glance: "NRG's data-center demand story builds as the LS Power fleet integrates; investors watch valuation into the Aug 4 print.",
      stats: [
        { v: "~$140", l: "Price · late Jun", dir: null },
        { v: "~25.8 GW", l: "Generation fleet", dir: "up" },
        { v: "Aug 4", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Fleet integration underway.", body: "NRG progressed integration of the 13 GW of gas generation acquired from LS Power across nine states.", ctx: "Execution on the integration is key to hitting guidance." },
        { headline: "Texas load growth.", body: "Data-center and electrification demand in ERCOT continued to support the retail and generation outlook.", ctx: "The demand backdrop underpins the long-dated contract pipeline." },
      ],
      sources: [{ label: "StockAnalysis — NRG", url: "https://stockanalysis.com/stocks/nrg/" }],
    },
  },

  // ─────────────────────────── BAKER TILLY ────────────────────────────
  "baker-tilly": {
    "2026-07-06": {
      glance:
        "Now the sixth-largest U.S. advisory and accounting firm following its $7B Moss Adams combination, Baker Tilly is executing a private-equity-fueled national push under new CEO Eric Miles, with a fresh leadership team and portfolio reshuffling signaling an aggressive scale-and-digitize agenda.",
      stats: [
        { v: "$7B", l: "Moss Adams merger value", dir: null },
        { v: "#6", l: "Largest U.S. CPA firm", dir: "up" },
        { v: "~11,500", l: "Combined headcount", dir: "up" },
        { v: "$6B", l: "Targeted revenue by 2030", dir: "up" },
      ],
      items: [
        { headline: "Operating as one firm after $7B Moss Adams combination.", body: "The Hellman & Friedman-backed merger added ~4,800 people across 30 U.S. locations, splitting into Baker Tilly US, LLP (audit) and Baker Tilly Advisory Group, LP (tax and consulting), targeting ~$6B revenue by 2030.", ctx: "Creates the scale to compete nationally against the largest advisory platforms and win larger enterprise mandates." },
        { headline: "Eric Miles took the CEO seat in January 2026.", body: "Former Moss Adams CEO Eric Miles became CEO of the combined firm, succeeding Jeff Ferro, who remains on the board.", ctx: "Leadership continuity from the acquired firm underscores Moss Adams' weight in the merged entity's strategy." },
        { headline: "Named a new senior leadership team.", body: "Fred Massanova was named North American Managing Principal and COO, Rebecca Pomering became Chief Growth Officer, and Michael Herman joined as Chief Digital and Information Officer reporting to the CEO.", ctx: "The elevation of a digital/AI chief signals technology transformation as a core competitive lever." },
        { headline: "Spun off wealth unit as Threadline Wealth.", body: "In March 2026, the legacy Moss Adams wealth-management business was carved out as independent RIA Threadline Wealth, backed by Cynosure Group, with ~$5.8B in client assets.", ctx: "Portfolio pruning sharpens Baker Tilly's focus on core audit, tax, and advisory as it integrates the merger." },
      ],
      sources: [
        { label: "Baker Tilly — now one firm", url: "https://www.bakertilly.com/baker-tilly-moss-adams-now-one" },
        { label: "Baker Tilly — leadership team", url: "https://www.bakertilly.com/news/baker-tilly-announces-new-senior-leadership-team" },
        { label: "Consulting.us — CEO appointment", url: "https://www.consulting.us/news/12810/baker-tilly-appoints-eric-miles-as-chief-executive-officer" },
        { label: "Accounting Today — wealth spin-off", url: "https://www.accountingtoday.com/news/moss-adams-spins-off-wealth-management-unit-after-baker-tilly-deal" },
      ],
    },
    "2026-06-29": {
      glance: "Baker Tilly integrates Moss Adams into a top-6 national advisory platform, standing up new leadership and a digital-transformation mandate.",
      stats: [
        { v: "#6", l: "Largest U.S. CPA firm", dir: "up" },
        { v: "~11,500", l: "Headcount", dir: "up" },
      ],
      items: [
        { headline: "Integration in motion.", body: "The combined firm began operating under one brand across audit, tax, and advisory following the Moss Adams close.", ctx: "Integration execution is the near-term value driver." },
        { headline: "Digital chief seated.", body: "A new Chief Digital and Information Officer role signals technology and AI as core to the growth agenda.", ctx: "Positions the firm to modernize delivery as it scales." },
      ],
      sources: [{ label: "Baker Tilly — now one firm", url: "https://www.bakertilly.com/baker-tilly-moss-adams-now-one" }],
    },
  },

  // ─────────────────────────── REGAL REXNORD ────────────────────────────
  "regal-rexnord": {
    "2026-07-06": {
      glance:
        "Industrial automation and power-management maker riding a data-center order surge, with shares near all-time highs into its Aug. 3 Q2 print. Momentum in Automation & Motion Control and Industrial Powertrain Solutions is fueling a bullish analyst re-rating.",
      stats: [
        { v: "~$218", l: "Price · early Jul", dir: "up" },
        { v: "$14.5B", l: "Market cap", dir: null },
        { v: "$127.96–$247.80", l: "52-wk range", dir: null },
        { v: "Aug 3", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Data-center order surge sends shares to record.", body: "Data-center power-management orders jumped ~54% YoY, including roughly $735M in orders for its plug-and-play E-Pod power system; stock closed up 8.3% at a record $238.19 on July 1 before easing to ~$218.", ctx: "Positions RRX as a direct beneficiary of the AI-driven data-center capex cycle; the data-center business could reach ~$1B in revenue." },
        { headline: "Q2 earnings on deck August 3.", body: "Consensus calls for EPS of ~$2.60 (up 4.8% YoY) on revenue of ~$1.58B (up 5.4% YoY), aided by recovery in food & beverage and general industrial end-markets.", ctx: "First read on whether data-center momentum is translating to margin and cash-flow upside versus a still-mixed industrial backdrop." },
        { headline: "Analysts raise targets on re-rating.", body: "Baird lifted its RRX price target to $300 from $253, maintaining an Outperform rating, citing secular growth from data centers and discrete automation.", ctx: "Signals Street conviction that the valuation multiple can expand further as the order backlog converts to revenue." },
      ],
      sources: [
        { label: "Sahm Capital — data-center wins", url: "https://www.sahmcapital.com/news/content/regal-rexnord-rrx-data-center-wins-put-its-valuation-back-in-focus-2026-07-03" },
        { label: "BizTimes — $735M orders", url: "https://biztimes.com/regal-rexnord-secures-735-million-worth-of-orders-for-new-data-center-product/" },
        { label: "Yahoo Finance — RRX", url: "https://finance.yahoo.com/quote/RRX/" },
      ],
    },
    "2026-06-29": {
      glance: "Regal Rexnord's data-center product momentum drives a valuation re-rating ahead of its August print.",
      stats: [
        { v: "~$210", l: "Price · late Jun", dir: "up" },
        { v: "+54%", l: "Data-center orders YoY", dir: "up" },
        { v: "Aug 3", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "E-Pod traction.", body: "Orders for the plug-and-play E-Pod power system built through late June on AI-data-center demand.", ctx: "A concrete product tie to the data-center capex cycle." },
        { headline: "End-market recovery.", body: "Food & beverage and general industrial demand showed signs of firming.", ctx: "A broader recovery would de-risk the back half." },
      ],
      sources: [{ label: "Yahoo Finance — RRX", url: "https://finance.yahoo.com/quote/RRX/" }],
    },
  },

  // ─────────────────────────── VULCAN MATERIALS ────────────────────────────
  "vulcan-materials": {
    "2026-07-06": {
      glance:
        "The largest U.S. producer of construction aggregates, executing an aggregates-led growth strategy through bolt-on M&A and portfolio pruning. Shares trade near record levels ahead of its July 30 Q2 report.",
      stats: [
        { v: "~$307", l: "Price · early Jul", dir: "up" },
        { v: "$38.8B", l: "Market cap", dir: null },
        { v: "$252.35–$331.09", l: "52-wk range", dir: null },
        { v: "Jul 30", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Strong Q1 beat sets a high bar.", body: "Q1 2026 revenue rose 7.4% YoY to $1.76B (about 5% above consensus) with EPS of $1.35, topping estimates by 22%.", ctx: "Demonstrates continued aggregates pricing power despite softer construction volumes, supporting the premium valuation." },
        { headline: "Portfolio reshaping via bolt-on M&A.", body: "Vulcan completed the divestiture of its California ready-mixed concrete operations and acquired Brannan Sand & Gravel's southern Colorado and Dallas-Fort Worth assets, including a rail-connected quarry in Lamar, CO.", ctx: "Sharpens focus on higher-margin aggregates and expands reach into high-growth Sun Belt and mountain-west markets." },
        { headline: "Full-year guidance reaffirmed.", body: "Management reaffirmed 2026 adjusted EBITDA guidance of $2.4B–$2.6B and flagged additional growth projects and bolt-on deals; the Board declared a $0.52/share quarterly dividend.", ctx: "Stable outlook and disciplined capital returns underpin the Street's overall Buy rating (avg. target ~$327)." },
      ],
      sources: [
        { label: "StockStory — post-Q1", url: "https://stockstory.org/us/stocks/nyse/vmc/news/buy-or-sell/vulcan-materials-vmc-buy-sell-or-hold-post-q1-earnings" },
        { label: "Investing.com — CA exit / CO deal", url: "https://www.investing.com/news/company-news/vulcan-materials-completes-california-exit-colorado-acquisition-93CH-4730425" },
        { label: "StockAnalysis — VMC", url: "https://stockanalysis.com/stocks/vmc/" },
      ],
    },
    "2026-06-29": {
      glance: "Vulcan's aggregates-led strategy and disciplined M&A keep the stock near records into its July 30 print.",
      stats: [
        { v: "~$300", l: "Price · late Jun", dir: "up" },
        { v: "$2.4–$2.6B", l: "FY26 EBITDA guide", dir: null },
        { v: "Jul 30", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Pricing power holds.", body: "Aggregates pricing continued to offset softer volumes across key markets.", ctx: "Price/mix is the durable margin lever in the model." },
        { headline: "Sun Belt expansion.", body: "Recent bolt-ons extended Vulcan's footprint in high-growth southern and mountain-west markets.", ctx: "Geographic mix supports above-market volume growth." },
      ],
      sources: [{ label: "StockAnalysis — VMC", url: "https://stockanalysis.com/stocks/vmc/" }],
    },
  },

  // ─────────────────────────── LOANDEPOT ────────────────────────────
  loandepot: {
    "2026-07-06": {
      glance:
        "Retail mortgage lender navigating margin compression and a high-rate environment, trading near penny-stock levels while improving market share and recapture. Q2 results are due August 4.",
      stats: [
        { v: "~$1.16", l: "Price · mid-Jun", dir: "down" },
        { v: "~$780M", l: "Market cap", dir: null },
        { v: "$1.10–$5.05", l: "52-wk range", dir: "down" },
        { v: "Aug 4", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Q1 loss persists amid rate volatility.", body: "Q1 2026 posted a net loss of $55.0M (adjusted net loss $33.6M) on total revenue of $286.4M; origination volume was $7.66B (down 5% QoQ) with market share of 1.39%.", ctx: "Underscores continued pressure on gain-on-sale margins, though improving recapture rates offer a partial offset." },
        { headline: "Leadership consolidation under new CLRO.", body: "loanDepot promoted Joseph Grassi to Chief Legal and Risk Officer on June 2, consolidating oversight of legal, compliance, governance, loan quality and enterprise risk.", ctx: "Streamlines risk governance as the lender pushes cost discipline and digital/AI-driven efficiency gains." },
        { headline: "Capital-raising and rate-cut watch.", body: "The company launched a $100M at-the-market equity program on May 15; its head economist noted the 30-year fixed eased to ~6.17% in late June.", ctx: "Any Fed easing that lifts refi demand is the key swing factor for LDI's origination volumes and margins." },
      ],
      sources: [
        { label: "StockTitan — LDI", url: "https://www.stocktitan.net/news/LDI/" },
        { label: "MarketBeat — LDI earnings", url: "https://www.marketbeat.com/stocks/NYSE/LDI/earnings/" },
        { label: "StockAnalysis — LDI", url: "https://stockanalysis.com/stocks/ldi/" },
      ],
    },
    "2026-06-29": {
      glance: "loanDepot leans on cost discipline and recapture gains while it waits for a rate-driven refi catalyst.",
      stats: [
        { v: "~$1.20", l: "Price · late Jun", dir: "down" },
        { v: "1.39%", l: "Market share", dir: null },
        { v: "Aug 4", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Cost program continues.", body: "The lender continued its 'Project North Star' efficiency and digital-investment agenda to right-size the cost base.", ctx: "Operating leverage is the near-term lever while volumes stay pressured." },
        { headline: "Rate sensitivity.", body: "Mortgage rates drifting toward the low-6% area kept a potential refi catalyst in view.", ctx: "Origination volume is highly geared to any decline in rates." },
      ],
      sources: [{ label: "StockTitan — LDI", url: "https://www.stocktitan.net/news/LDI/" }],
    },
  },

  // ─────────────────────────── ROCKWELL AUTOMATION ────────────────────────────
  "rockwell-automation": {
    "2026-07-06": {
      glance:
        "The industrial-automation leader is riding a strong FY2026, having beaten Q2 estimates handily and raised full-year guidance for the second time. Shares trade near their 52-week high as smart-manufacturing demand and margin expansion drive a broad analyst 'Buy' consensus.",
      stats: [
        { v: "$471.70", l: "Price · Jul 4", dir: "up" },
        { v: "$53.7B", l: "Market cap", dir: null },
        { v: "$305–$490", l: "52-wk range", dir: "up" },
        { v: "Aug 4", l: "Next earnings (Q3)", dir: null },
      ],
      items: [
        { headline: "Q2 FY26 blows past estimates.", body: "Sales rose 12% YoY to $2.24B (vs $2.16B consensus) and adjusted EPS hit $3.30 against $2.89 expected, an ~11.8% earnings surprise.", ctx: "Signals resilient capital-spending demand in factory automation despite macro caution." },
        { headline: "Guidance raised a second time.", body: "Management lifted FY2026 organic growth to 5–9% and adjusted EPS to $12.50–$13.10, the second upward revision this fiscal year.", ctx: "A rare mid-year double raise underscores confidence in order momentum and pricing." },
        { headline: "Margins and cash flow expand sharply.", body: "Pre-tax margin climbed to 19.7% from 14.9% and enterprise operating margin reached 22.5%, while free cash flow surged 61% YoY to $275M.", ctx: "Cost discipline and mix are converting revenue growth into outsized profitability." },
        { headline: "Stock outperforms into Q3 print.", body: "ROK has beaten the S&P 500 by ~15% over six months and trades near its $490 52-week high, carrying a 'Buy' rating from 28 analysts.", ctx: "A premium valuation raises the bar for the Aug 4 Q3 report (est. EPS $3.37)." },
      ],
      sources: [
        { label: "StockStory — post-Q analysis", url: "https://stockstory.org/us/stocks/nyse/rok/news/buy-or-sell/rockwell-automation-rok-buy-sell-or-hold-post-q1-earnings" },
        { label: "MarketBeat — ROK", url: "https://www.marketbeat.com/stocks/NYSE/ROK/" },
        { label: "Rockwell Q2 FY26 8-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/0001024478/000102447826000020/q2fy26ex99.htm" },
        { label: "TipRanks — ROK earnings", url: "https://www.tipranks.com/stocks/rok/earnings" },
      ],
    },
    "2026-06-29": {
      glance: "Rockwell's smart-manufacturing demand and margin gains keep the stock near highs into its Aug 4 print.",
      stats: [
        { v: "~$465", l: "Price · late Jun", dir: "up" },
        { v: "$12.50–$13.10", l: "FY26 EPS guide", dir: "up" },
        { v: "Aug 4", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Order momentum.", body: "Factory-automation and discrete-manufacturing orders stayed firm through late June.", ctx: "Backlog conversion supports the raised guidance." },
        { headline: "Software mix.", body: "Growth in recurring software and services aided the margin story.", ctx: "Higher-margin software is central to the re-rating." },
      ],
      sources: [{ label: "MarketBeat — ROK", url: "https://www.marketbeat.com/stocks/NYSE/ROK/" }],
    },
  },

  // ─────────────────────────── WORKDAY ────────────────────────────
  workday: {
    "2026-07-06": {
      glance:
        "After a punishing year that left shares down roughly 30% YTD, Workday is staging a sharp relief rally on analyst upgrades and AI-product optimism. The HCM/financials SaaS leader is cutting headcount and leaning hard into AI agents to expand margins.",
      stats: [
        { v: "$137.41", l: "Price · Jul 8", dir: "down" },
        { v: "$33.9B", l: "Market cap", dir: null },
        { v: "$110–$250", l: "52-wk range", dir: "down" },
        { v: "Aug 20", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Shares rebound ~17% in a week.", body: "A 7-day gain of 17.3% has revived investor attention, though WDAY is still down ~30% YTD and ~40% on a 1-year total-return basis.", ctx: "The rally is sentiment-driven off deeply depressed levels, not yet a fundamental re-rating." },
        { headline: "AI agents scaling fast.", body: "Roughly 4,000 customers now use at least one organic AI agent and AI-related ACV grew over 200% YoY, aided by the Sana and Paradox integrations.", ctx: "AI monetization is the core bull thesis for reaccelerating subscription growth." },
        { headline: "8.5% headcount cut for margin gains.", body: "Workday is reducing headcount ~8.5% and automating functions with AI, lifting full-year non-GAAP operating-margin guidance to 30.5%.", ctx: "The efficiency drive aims to prove AI leverage on its own P&L, not just customers'." },
        { headline: "Q1 FY27 tops estimates.", body: "Total revenue of ~$2.54B with subscription revenue near $2.35B; EPS beat consensus meaningfully.", ctx: "Steady double-digit growth supports the ~$196 average analyst price target vs a Buy consensus." },
      ],
      sources: [
        { label: "QuiverQuant — WDAY rally", url: "https://www.quiverquant.com/news/Workday+Shares+Climb+as+Investors+Reassess+Earnings+Strength+and+AI+Product+Momentum" },
        { label: "Simply Wall St — valuation", url: "https://simplywall.st/stocks/us/software/nasdaq-wday/workday/news/workday-wday-could-be-16-undervalued-on-analyst-upgrades-and" },
        { label: "Workday Q1 FY27 8-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/0001327811/000132781126000024/wday-04302026x991.htm" },
        { label: "Public.com — WDAY forecast", url: "https://public.com/stocks/wday/forecast-price-target" },
      ],
    },
    "2026-06-29": {
      glance: "Workday's AI-agent traction and efficiency drive start to shift sentiment after a rough first half.",
      stats: [
        { v: "~$120", l: "Price · late Jun", dir: "down" },
        { v: "+200%", l: "AI ACV growth YoY", dir: "up" },
        { v: "Aug 20", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "AI adoption broadening.", body: "Customer adoption of Workday's organic AI agents continued to expand across HCM and financials.", ctx: "Monetization is the key to reaccelerating growth." },
        { headline: "Cost reset.", body: "The workforce reduction and automation push aimed to lift operating margins.", ctx: "Proof of AI leverage on Workday's own P&L." },
      ],
      sources: [{ label: "Public.com — WDAY", url: "https://public.com/stocks/wday/forecast-price-target" }],
    },
  },

  // ─────────────────────────── INTUITIVE SURGICAL ────────────────────────────
  "intuitive-surgical": {
    "2026-07-06": {
      glance:
        "The robotic-surgery pioneer heads into a July 16 Q2 print with shares near 52-week lows despite robust procedure growth and a rapid da Vinci 5 rollout. Investors are positioning for the report even as at least one analyst trims its price target.",
      stats: [
        { v: "$427.25", l: "Price · latest", dir: "down" },
        { v: "$151.3B", l: "Market cap", dir: null },
        { v: "$397–$604", l: "52-wk range", dir: "down" },
        { v: "Jul 16", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Q2 earnings due July 16.", body: "Consensus calls for EPS of ~$2.48 on revenue of ~$2.81B, a ~15% YoY increase; shares rose ~4% recently as investors positioned ahead of the print.", ctx: "The first key catalyst after a steep pullback from the $604 high." },
        { headline: "da Vinci 5 rollout accelerating.", body: "Q1 2026 revenue rose 23% to $2.77B with combined da Vinci and Ion procedures up 17%; the company placed 431 systems, including 232 da Vinci 5 units.", ctx: "Next-gen platform adoption drives high-margin recurring instrument and service revenue." },
        { headline: "Procedure guidance raised.", body: "Intuitive lifted its 2026 da Vinci procedure-growth outlook to 13.5%–15.5% and guided non-GAAP gross margin of 67.5%–68.5%.", ctx: "Procedure volume is the primary long-term value driver for the razor-and-blade model." },
        { headline: "Analyst trims target.", body: "On July 6, Evercore ISI cut its ISRG price target to $430 from $480 while shares hover near the low end of the 52-week range.", ctx: "The valuation reset reflects tariff, margin, and growth-durability concerns ahead of Q2." },
      ],
      sources: [
        { label: "Intuitive Q1 2026 8-K (SEC)", url: "https://www.sec.gov/Archives/edgar/data/0001035267/000103526726000029/q126ex-991earningsrelease.htm" },
        { label: "QuiverQuant — pre-earnings", url: "https://www.quiverquant.com/news/Intuitive+Surgical+Gains+as+Investors+Appear+to+Position+for+Mid-July+Earnings" },
        { label: "TipRanks — ISRG earnings", url: "https://www.tipranks.com/stocks/isrg/earnings" },
        { label: "StockAnalysis — ISRG", url: "https://stockanalysis.com/stocks/isrg/" },
      ],
    },
    "2026-06-29": {
      glance: "Intuitive's da Vinci 5 momentum builds into the July 16 print even as the stock sits near 52-week lows.",
      stats: [
        { v: "~$420", l: "Price · late Jun", dir: "down" },
        { v: "+17%", l: "Procedure growth", dir: "up" },
        { v: "Jul 16", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "System placements strong.", body: "da Vinci 5 placements continued at a healthy clip, expanding the installed base.", ctx: "Installed base drives the recurring-revenue flywheel." },
        { headline: "Valuation reset.", body: "Shares stayed near the low end of the range on margin and tariff concerns.", ctx: "Sets up an attractive risk/reward if procedures hold." },
      ],
      sources: [{ label: "StockAnalysis — ISRG", url: "https://stockanalysis.com/stocks/isrg/" }],
    },
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────
export function editionsForClient(clientId) {
  const byClient = PULSE[clientId] || {};
  return EDITIONS.filter((e) => byClient[e.id]).map((e) => ({
    ...e,
    data: byClient[e.id],
  }));
}

export function getPulse(clientId, editionId = LATEST_EDITION) {
  const byClient = PULSE[clientId] || {};
  if (byClient[editionId]) return byClient[editionId];
  const avail = editionsForClient(clientId);
  return avail.length ? avail[0].data : null;
}

export function editionMeta(editionId) {
  return EDITIONS.find((e) => e.id === editionId) || EDITIONS[0];
}
