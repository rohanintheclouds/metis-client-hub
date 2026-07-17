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
  { id: "2026-06-15", label: "Week of June 15, 2026", date: "June 15, 2026" },
  { id: "2026-06-08", label: "Week of June 8, 2026", date: "June 8, 2026" },
  { id: "2026-06-01", label: "Week of June 1, 2026", date: "June 1, 2026" },
];

export const LATEST_EDITION = EDITIONS[0].id;

export const PULSE = {
  // ─────────────────────────── AFLAC ────────────────────────────
  aflac: {
    "2026-07-06": {
      glance:
        "Aflac is scaling its U.S. group-benefits build-out and refreshing Japan's cancer-insurance channel while working through the 2025 cyber-incident cleanup — a strategic-execution quarter ahead of early-August filings.",
      stats: [
        { v: "$120.47", l: "Price · Jul 6", dir: "up" },
        { v: "~+9%", l: "YTD growth", dir: "up" },
        { v: "~$60B", l: "Market cap", dir: null },
        { v: "$96.95–$120.88", l: "52-wk range", dir: "up" },
        { v: "Early Aug", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Group benefits build-out gathers pace.", body: "Aflac has spent the past several quarters pushing beyond its core worksite cancer and accident policies into a fuller group-benefits suite — group life, absence management, dental and vision — largely by scaling capacity it has acquired rather than building from scratch. The logic is that once Aflac is already inside a company's open-enrollment system through payroll deduction, adding adjacent coverages is cheaper to sell than winning a brand-new employer relationship. It puts Aflac in more direct competition with Unum, MetLife and Guardian for the same HR benefits-fair real estate, and gives Aflac's U.S. sales force more products to bundle during the fall enrollment season.", ctx: "Broader employer bundles defend the payroll-deduction channel and open cross-sell against Unum and MetLife.", url: "https://www.aflac.com/about-aflac/newsroom.aspx" },
        { headline: "Japan channel stays the profit engine.", body: "Aflac Japan — roughly two-thirds of consolidated earnings — keeps refreshing its cancer-insurance lineup sold through Japan Post's network of about 20,000 post offices, a distribution alliance that gives Aflac reach no competitor can easily replicate, alongside a bancassurance tie-up with Dai-ichi Life. First-quarter 2026 sales in Japan jumped roughly 25.5% year over year, a strong signal that the post-office channel and newer product refreshes (dementia and medical riders layered onto the classic cancer policy) are still finding demand in a market where Aflac has sold cancer insurance for decades and built dominant share. Yen movements affect how those Japan profits translate back into U.S.-dollar earnings, which is why currency commentary tends to swing the stock as much as underlying sales trends do.", ctx: "Japan drives roughly two-thirds of earnings; channel health there matters more than any single U.S. quarter.", url: "https://www.aflac.com/investors/default.aspx" },
        { headline: "Cyber-incident remediation continues.", body: "Aflac is still working through the fallout of a June 2025 breach in which the hacking group Scattered Spider used social-engineering tactics to gain unauthorized access to its U.S. network. The company has said it contained the intrusion within hours and that no ransomware was involved, but the attackers exfiltrated claims information, health information, Social Security numbers and other personal data belonging to a substantial number of customers, beneficiaries, employees and agents. Aflac is offering free credit monitoring, identity-theft protection and a dedicated medical-identity shield for 24 months to anyone affected who contacts its call center, and continues to face the slower-moving costs of state-by-state regulatory inquiries and potential litigation that typically follow a breach of this size in the insurance sector.", ctx: "Regulatory follow-through and brand trust are the watch items for a company whose product is a promise to pay at the worst moment.", url: "https://www.forbes.com/sites/steveweisman/2025/06/21/aflac-data-breach-by-scattered-spider-hackers-is-no-quacking-matter/" },
        { headline: "Q2 filings land early August.", body: "Aflac's 10-Q and earnings call, expected in early August, will be the next real test of whether U.S. premium growth is reaccelerating after a soft stretch, and how yen hedging costs are tracking given the currency's recent volatility. The company enters the print with one of the more consistent capital-return records in insurance — 43 consecutive years of dividend increases — so the market's attention will likely fall less on the dividend itself and more on management's commentary about U.S. platform investment, since that spending signals where the next phase of digital and AI-enabled claims processing is headed.", ctx: "For engagement planning, watch U.S. platform-investment commentary — it signals where transformation budgets go next.", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000004977&type=10-Q" },
      ],
      sources: [
        { label: "Forbes — Scattered Spider breach", url: "https://www.forbes.com/sites/steveweisman/2025/06/21/aflac-data-breach-by-scattered-spider-hackers-is-no-quacking-matter/" },
        { label: "Bloomberg — data-breach disclosure", url: "https://www.bloomberg.com/news/articles/2025-06-20/aflac-reports-potential-leak-of-personal-data-in-cyber-breach" },
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
        { v: "~+8%", l: "YTD growth (F)", dir: "up" },
        { v: "~$54.5B", l: "Market cap (F)", dir: null },
        { v: "$8.5–$10.5B", l: "FY26 adj. EBIT guide", dir: "up" },
        { v: "Jul 28", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "FDIC clears Ford Credit Bank.", body: "The FDIC approved deposit insurance for a new Ford Credit Bank industrial-loan charter based in Salt Lake City, giving Ford up to a year to stand up the bank and begin accepting insured retail deposits it can lend against for vehicle purchases. Utah's industrial-bank charter has long been the go-to structure for non-bank companies that want deposit-funded lending without becoming a full bank-holding company subject to Federal Reserve supervision — GM Financial has pursued the same path. For Ford Credit, it's a strategic funding shift: instead of relying entirely on commercial paper, unsecured bonds and securitizations to fund the loans and leases it originates, it can now tap a cheaper, stickier pool of FDIC-insured deposits, similar to how captive-finance peers and fintech lenders have been racing to get bank charters over the past two years.", ctx: "A retail-deposit funding base is more stable and cheaper than unsecured debt and securitizations.", url: "https://www.fdic.gov/news/press-releases/2026/fdic-approves-deposit-insurance-applications-ford-credit-bank-salt-lake" },
        { headline: "Moody's calls it credit positive.", body: "Moody's flagged the new Ford Credit and GM Financial industrial banks as credit positive for both captive lenders, arguing that a federally insured deposit base gives them a more stable, lower-cost source of funds than wholesale capital markets, which can reprice sharply during periods of stress. That matters most in a downturn: unsecured debt and securitization markets can seize up or get expensive exactly when an auto lender needs funding most, while insured deposits are comparatively sticky. Rating agencies watching the space see this as the start of a broader shift in how captive auto finance arms fund their books over the next several years.", ctx: "Cheaper funding supports Ford Credit's earnings contribution and lending competitiveness.", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { headline: "Lease penetration shifting.", body: "Ford Credit's lease share of retail sales came in at 15% in the most recent quarter, up from 14% a year earlier but down from 18% the quarter before, reflecting Ford's ongoing balancing act between using leases to hit monthly-payment targets for price-sensitive buyers and managing its exposure to used-vehicle residual values. Every lease Ford Credit writes carries an assumption about what the vehicle will be worth when it comes back off-lease; if used-vehicle prices soften as more off-lease supply hits the market, that residual-value risk shows up directly in Ford Credit's earnings.", ctx: "Lease mix drives residual-value exposure and future used-vehicle risk for the finance arm.", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { headline: "Parent raised guidance twice this year.", body: "Ford lifted its full-year 2026 adjusted EBIT guidance after beating first-quarter expectations, helped by a one-time $1.3 billion benefit tied to a Supreme Court ruling that struck down a slice of the prior administration's tariffs, alongside roughly $1 billion of ongoing tariff costs and about $2 billion of commodity headwinds, led by aluminum. On the EV side, Ford's Model e unit narrowed its loss from $849 million to $777 million even as EV sales volume fell sharply year over year, and executives said on the earnings call that the EV strategy is being actively adapted to changing federal policy. Q2 U.S. sales fell 10% to about 549,200 units, largely a deliberate consequence of phasing out low-margin fleet and rental volume rather than a demand problem, setting up the July 28 report as a read on whether the pricing and mix cleanup is sticking.", ctx: "Higher guidance plus deliberate mix cleanup frames the July 28 report.", url: "https://www.cnbc.com/amp/2026/04/29/ford-motor-f-earnings-q1-2026.html" },
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
        "Lumen is repositioning its long-haul fiber as a 'data supply chain' for AI workloads — nearly $13B of hyperscaler connectivity deals signed — while selling non-core assets to work down heavy debt.",
      stats: [
        { v: "$6.48", l: "Price · Jul 8", dir: "down" },
        { v: "~-15%", l: "YTD growth", dir: "down" },
        { v: "~$6.6B", l: "Market cap (approx.)", dir: null },
        { v: "$3.37–$11.95", l: "52-wk range", dir: null },
        { v: "Aug 4", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "AI fiber backlog building.", body: "Lumen's Private Connectivity Fabric (PCF) program — custom, dedicated fiber routes built to hyperscaler specifications — has grown to nearly $13 billion in signed deals, including roughly $2.5 billion of new agreements this year with hyperscalers and AI labs such as Anthropic, alongside earlier marquee wins connecting Amazon, Google Cloud, Meta and Microsoft data centers. Lumen has also stood up a dedicated Custom Networks division to manage the PCF portfolio and field the wave of additional hyperscaler interest, and it struck an agreement with Corning to be a preferred partner for next-generation, ultra-dense fiber cable that can carry the volume of traffic AI training and inference workloads require. The company's long-term plan is to more than double its intercity network to roughly 58 million fiber miles by 2031, effectively repositioning decades-old long-haul fiber as the physical backbone of the AI buildout.", ctx: "PCF is the core monetization thesis for turning legacy fiber into AI-infrastructure revenue.", url: "https://www.cnbc.com/2026/04/15/from-near-bankruptcy-to-ai-tailwinds-lumens-high-stakes-fiber-bet-could-pay-off.html" },
        { headline: "Balance-sheet cleanup underway.", body: "Lumen closed the $5.75 billion sale of its consumer fiber business to AT&T in February, directing roughly $4.8 billion of proceeds toward paying down debt, and has followed that with a further debt exchange worth roughly $1.4 billion. The deleveraging push matters because Lumen's legacy copper and voice businesses continue to shrink every quarter — the AI-fiber story only works if the balance sheet survives long enough for PCF revenue to scale to a size that offsets that legacy decline, and Lumen's near-bankruptcy scare a few years ago is still fresh enough that credit investors are watching the debt paydown closely.", ctx: "Deleveraging is critical given persistent legacy-revenue declines.", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Marks-New-Phase-of-Transformation-at-2026-Investor-Day/default.aspx" },
        { headline: "Network expansion for AI.", body: "Lumen launched NorthLine, a new low-latency route between Seattle and Minneapolis built specifically to move AI training data between data-center campuses, and is connecting 16 additional QTS AI data-center sites onto its roughly 340,000-route-mile backbone. Network-as-a-Service customers — companies buying bandwidth on demand rather than through fixed long-term contracts — grew about 29% as enterprises increasingly want flexible, software-defined connectivity rather than legacy dedicated circuits. Taken together, the AWS interconnect role Lumen won earlier this year and the steady drumbeat of new hyperscaler routes are the clearest evidence yet that the strategic pivot away from consumer telecom and toward AI-era infrastructure is gaining real commercial traction, not just investor-day slides.", ctx: "New routes and NaaS adoption aim to offset shrinking legacy services.", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Expands-its-U-S--Network-with-NorthLine-a-New-Northern-Fiber-Route-Built-for-AI-Data-Movement/default.aspx" },
      ],
      sources: [
        { label: "CNBC — Lumen's AI turnaround", url: "https://www.cnbc.com/2026/04/15/from-near-bankruptcy-to-ai-tailwinds-lumens-high-stakes-fiber-bet-could-pay-off.html" },
        { label: "Bloomberg — AWS fiber deal", url: "https://www.bloomberg.com/news/articles/2024-10-30/lumen-will-link-amazon-data-centers-in-latest-ai-fiber-deal" },
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
        "The HCM and payroll giant is leaning hard into agentic AI — a curated AI-agent marketplace, ADP Assist scaled across the base — and raised FY2026 guidance on the momentum.",
      stats: [
        { v: "$242.27", l: "Price · prev. close", dir: null },
        { v: "~+4%", l: "YTD growth", dir: "up" },
        { v: "~$96.8B", l: "Market cap", dir: null },
        { v: "$2.59", l: "Q4 EPS est. (+14.6% YoY)", dir: "up" },
        { v: "Jul 29", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "Raised FY2026 guidance on AI momentum.", body: "Management now targets 6–7% revenue growth and 10–11% adjusted EPS growth for fiscal 2026, pointing to continued strength in the core HCM platform plus early payback from its AI investments. ADP has created a shared data architecture and a dedicated AI Office to coordinate efforts across the company, the idea being that a single, consistent set of AI tools and services can be reused across payroll, tax, benefits and workforce-analytics products rather than each team building its own point solution. That coordination is part of why management is comfortable raising guidance rather than just holding it — they're seeing AI reduce internal cost-to-serve at the same time it's opening new product lines to sell.", ctx: "Signals confidence that AI investment is translating into durable margin and top-line expansion, not just cost.", url: "https://www.forbes.com/sites/randybean/2026/02/09/how-ai-is-transforming-customer-and-employee-experience-at-adp/" },
        { headline: "ADP Assist scaling across the base.", body: "ADP Assist, the company's suite of AI agents, is now built around specific 'moments that matter' in the payroll and HR workflow — the points where practitioners routinely face manual, high-stakes or repetitive work, like auditing a payroll run for anomalies, answering a tax-compliance question, or generating a report. The payroll agents automatically flag variances between pay periods, explain what changed, and suggest a fix, all while keeping a human in the loop for final sign-off rather than acting autonomously. With roughly 4 million logged interactions, 12,000 service associates using the tools, and adoption across 40%-plus of the sales organization and effectively all of engineering, ADP is treating its own workforce as the first proving ground before pushing features out to clients.", ctx: "Internal AI enablement is a leading indicator of the productivity story ADP is selling to clients.", url: "https://www.forbes.com/sites/randybean/2026/02/09/how-ai-is-transforming-customer-and-employee-experience-at-adp/" },
        { headline: "AI-agent Marketplace launched.", body: "ADP opened a curated AI-agent storefront inside ADP Marketplace, its existing app-integration ecosystem, bringing in partners like Absorb (learning management), G-P (global employment), Employ (recruiting), Salary.com (compensation benchmarking), Payactiv (earned-wage access) and Tapcheck to let clients chain together multi-step HR and payroll tasks without custom integration work. The move positions ADP less as a single payroll vendor and more as an orchestration layer that other HR-tech companies build on top of — the same platform strategy Salesforce and ServiceNow have used to deepen switching costs, applied here to compete directly against Workday's and UKG's own AI-agent pushes for the same enterprise HR budget.", ctx: "Positions ADP as an orchestration layer, deepening ecosystem lock-in against Workday and UKG.", url: "https://mediacenter.adp.com/2026-03-02-ADP-Marketplace-Launches-AI-Agents-to-Help-Make-Work-Easier,-Smarter" },
      ],
      sources: [
        { label: "Forbes — AI at ADP", url: "https://www.forbes.com/sites/randybean/2026/02/09/how-ai-is-transforming-customer-and-employee-experience-at-adp/" },
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
        { v: "~$5B", l: "Est. annual revenue", dir: "up" },
        { v: "370", l: "Tech & service partners", dir: "up" },
        { v: "$6.5T", l: "Frontline-work market", dir: null },
      ],
      items: [
        { headline: "Workforce Operating Platform is the flagship bet.", body: "Under CEO Jennifer Morgan, UKG has repositioned itself away from being 'the payroll and time-clock company' and toward what it calls a Workforce Operating Platform — unifying HR, scheduling and pay around what it markets as 'People-First AI.' The pitch is that UKG's People Fabric data layer processes billions of workforce signals (shift patterns, tenure, engagement survey responses, overtime trends) so that agentic and assistive AI can surface specific, actionable recommendations, like flagging which hourly employees are at elevated flight risk or automatically rebalancing a schedule to avoid unplanned overtime. Analyst Josh Bersin has framed this as UKG staking out leadership in the roughly $6.5 trillion global market for frontline and hourly work, a segment historically underserved by HR software built primarily for salaried knowledge workers.", ctx: "Reframes UKG from a payroll/time vendor into a decision-intelligence layer for hourly and frontline labor.", url: "https://joshbersin.com/2026/01/ukg-stakes-out-leadership-position-in-6-5-trillion-market-for-frontline-work/" },
        { headline: "Agent-to-agent pact with ServiceNow.", body: "UKG and ServiceNow announced a collaboration allowing their respective AI agents to hand off multi-step workflows to one another automatically — for example, a scheduling issue flagged by UKG's People Fabric AI could trigger a case automatically opened and routed inside ServiceNow's AI Agent Fabric, without a human manually re-entering the request into a second system. Interoperable, agent-to-agent partnerships like this are quickly becoming the new competitive battleground in enterprise software broadly (ServiceNow has struck similar deals with Anthropic and OpenAI), since the value of any single company's AI agent increases sharply once it can talk directly to agents from other vendors an enterprise already uses.", ctx: "Interoperable-agent partnerships are becoming the competitive battleground in enterprise HR tech.", url: "https://www.ukg.com/company/newsroom" },
        { headline: "Leadership bench rebuilt for a scaling phase.", body: "UKG has been visibly reloading its executive ranks over the past several months: Suresh Vittal joined as Chief Product Officer in January 2026, Jay Dettling was named the company's first-ever Chief Partner Officer, and a dedicated CTO role is being carved out separately from product, all reporting into CEO Jennifer Morgan. Bringing in senior operators from established public SaaS companies to backfill these seats — rather than promoting internally — is often read by industry observers as a signal that a large private company is professionalizing its bench ahead of either a much bigger growth push or, eventually, a public offering, though UKG (majority owned by Hellman & Friedman since the 2020 Ultimate Software–Kronos merger) has not announced any IPO timeline.", ctx: "A deliberate infusion of top-tier SaaS operators signals a scaling phase, possibly pre-IPO positioning.", url: "https://brandonhall.com/meet-the-new-ukg/" },
        { headline: "Launched UKG Ventures.", body: "UKG stood up a strategic corporate venture arm to make early- and growth-stage investments in 'worktech' startups, giving the company both a financial stake and an early look at emerging tools in areas like frontline communication, skills-based scheduling and workforce analytics before those startups get acquired by a competitor or grow into standalone rivals. It's a common late-stage-private-company playbook — Workday and Salesforce both run similar venture arms — that extends UKG's ecosystem reach and innovation pipeline beyond what its own R&D organization can build organically.", ctx: "Extends UKG's ecosystem reach and gives it an innovation pipeline outside organic R&D.", url: "https://www.ukg.com/company/newsroom/ukg-launches-venture-fund" },
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
        "Generac is scaling large-generator capacity for data-center and C&I demand — including a new Belvidere, Illinois packaging facility — while the core residential standby business funds the expansion.",
      stats: [
        { v: "$252.66", l: "Price · Jul 4", dir: "up" },
        { v: "~+38%", l: "YTD growth", dir: "up" },
        { v: "~$15B", l: "Market cap", dir: null },
        { v: "+69.2%", l: "52-wk return", dir: "up" },
        { v: "Jul 29", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Belvidere, IL facility expands large-generator capacity.", body: "Generac is investing roughly $130 million in new equipment and a Belvidere, Illinois facility dedicated to packaging larger, megawatt-class generators, according to CEO Aaron Jagdfeld — a direct response to demand from AI data centers, which each require substantial backup-power capacity as a condition of being built at all. The company has already begun shipping some of its larger generators internationally to data-center customers, a new buyer category for a business that built its reputation on residential storm-backup units. Jagdfeld has been blunt about the strain: 'this has become a massively critical discussion point,' he's said of grid capacity, adding that the problem is 'only going to get worse' as more data centers come online faster than utilities can add generation.", ctx: "Directly targets surging data-center and mission-critical demand, the key driver of the stock's re-rating.", url: "https://www.bloomberg.com/news/articles/2025-05-14/ai-boom-has-generac-looking-to-data-centers-for-growth" },
        { headline: "International leadership shuffle.", body: "Generac promoted Niccolo Borracchini to EVP-International, giving him oversight of both the Generac- and Pramac-branded businesses outside the U.S. and Canada, consolidating what had been a more fragmented regional structure under a single global commercial leader. The reorganization comes as Generac pushes its energy-storage and commercial-and-industrial product lines into international markets, extending a growth strategy that in the U.S. has increasingly meant selling into data centers and other mission-critical facilities rather than relying solely on the storm-driven residential-generator demand that built the company.", ctx: "Consolidates global commercial leadership as Generac pushes energy-storage and C&I growth abroad.", url: "https://www.stocktitan.net/news/GNRC/" },
      ],
      sources: [
        { label: "Bloomberg — Generac eyes data centers", url: "https://www.bloomberg.com/news/articles/2025-05-14/ai-boom-has-generac-looking-to-data-centers-for-growth" },
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
        { headline: "Landed $25M growth investment led by Edison Partners.", body: "Take Command closed a $25 million growth round led by Edison Partners, with LiveOak Venture Partners and SJF Ventures also participating, to keep scaling its ICHRA and QSEHRA administration platform. ICHRAs (Individual Coverage Health Reimbursement Arrangements) let an employer give each employee a fixed, tax-advantaged reimbursement amount to buy their own individual health plan on the marketplace, instead of the employer choosing and funding one group plan for everyone — a defined-contribution model closer to how 401(k)s replaced traditional pensions. Take Command administers the compliance, enrollment and reimbursement mechanics that make ICHRA workable for employers who don't want to build that infrastructure themselves, and the new capital is earmarked for continuing to build out that administrative layer as adoption accelerates.", ctx: "Capital signals investor conviction that individual-coverage HRAs are moving from niche to mainstream.", url: "https://www.takecommandhealth.com/press" },
        { headline: "ICHRA enrollment tripled in 2026.", body: "Take Command reports its own ICHRA enrollment roughly tripled year over year, broadly in line with industry-wide data showing ICHRA adoption among large employers up about 34% in 2025 and total individuals offered ICHRA coverage up roughly 50% to around 450,000 nationally, according to the HRA Council. The catalyst is straightforward: traditional group health-plan premiums are rising sharply again in 2026, and ICHRA gives employers a way to cap their own healthcare cost exposure at a fixed dollar amount per employee rather than absorbing whatever the insurer charges next renewal. ICHRA still represents a small slice of the roughly 154 million Americans covered through employer-sponsored insurance, but it's the fastest-growing slice.", ctx: "Rising group-plan costs structurally push employers toward defined-contribution health models.", url: "https://www.washingtonpost.com/business/2025/06/18/employer-health-insurance-ichra/c09d86f8-4c5c-11f0-8fff-262d6ec54ab9_story.html" },
        { headline: "Published 2026 State of Employee Health Benefits report.", body: "Take Command's annual benefits survey found that 51% of respondents believe employees should have full control over their own health-insurance choices rather than being assigned a single employer-selected plan, evidence the company points to as validation of the ICHRA model's underlying premise. Publishing original survey research each year is also a deliberate positioning move — it lets a private, venture-backed company establish itself as the category's thought leader and reference source for a still-emerging benefits structure that most HR leaders are only beginning to understand.", ctx: "Positions Take Command as a category thought leader as the defined-contribution narrative gains traction.", url: "https://www.takecommandhealth.com/press" },
        { headline: "Guiding employers through extended 2026 open enrollment.", body: "Take Command is running enrollment, compliance and employee support across state-by-state extended open-enrollment windows that stretch through mid-January for February 1 coverage effective dates, since individual-market enrollment deadlines vary by state exchange in ways group plans never had to account for. Executing this cleanly matters more than usual this cycle: the company's enrollment book has roughly tripled, so open enrollment is effectively the first real stress test of whether its operations and support infrastructure can scale with the growth it has already booked.", ctx: "Open-enrollment execution is the operational proving ground for retaining the tripled book of business.", url: "https://www.takecommandhealth.com/press" },
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
        "NRG doubled its generation fleet with the $12B LS Power acquisition and is signing long-dated data-center supply contracts scaling to 445 MW by 2032 — the integration is now the story.",
      stats: [
        { v: "$137.48", l: "Price · Jul 8", dir: "down" },
        { v: "~+3%", l: "YTD growth", dir: "up" },
        { v: "$29.0B", l: "Market cap", dir: "down" },
        { v: "158.8", l: "P/E ratio", dir: null },
        { v: "Aug 4", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Closed $12B LS Power acquisition, doubling generation to ~25 GW.", body: "NRG completed its roughly $12 billion purchase of 18 natural-gas-fired power plants (about 13 GW of capacity) plus CPower's commercial-and-industrial virtual-power-plant platform from LS Power on January 30, 2026, effectively doubling NRG's own generation fleet to about 25.8 GW spread across nine states. Bloomberg described the deal at signing as 'a window into AI's race for power' — a bet that the U.S. will need vastly more electricity generation to support data-center growth, and that owning gas plants outright, rather than just signing power-purchase agreements, is the more defensible position as that demand materializes. NRG is now integrating the acquired fleet's operations, maintenance contracts and trading books into its existing platform, which is the main execution risk analysts are watching into the back half of 2026.", ctx: "The deal reshapes NRG into a scaled generator positioned to serve surging data-center and electrification load.", url: "https://www.bloomberg.com/news/articles/2025-05-12/nrg-energy-acquire-gas-power-assets-from-ls-for-12-billion" },
        { headline: "Reaffirmed 2026 EPS guidance of $7.55–$8.15.", body: "Alongside first-quarter results that missed on EPS ($1.48 versus $1.73 expected), management held its full-year adjusted EPS outlook unchanged, pointing to accelerating demand from data centers, electrification and manufacturing as the reasons it isn't worried about the near-term miss. Reaffirming guidance rather than cutting it after a quarterly shortfall is itself a signal — it tells the market that management views the miss as timing or integration noise from the LS Power close rather than a sign that the underlying demand thesis is weakening, though the market's below-average reaction to a similarly framed data-center announcement in August 2025 (shares fell 16% on what investors judged too small a contract) shows how skeptical some investors remain until the contracted volumes actually show up in reported revenue.", ctx: "Reaffirmed guidance steadies the story ahead of the Aug 4 Q2 print despite a Q1 EPS miss ($1.48 vs. $1.73 expected).", url: "https://www.investing.com/news/company-news/nrg-energy-q1-2026-slides-reaffirms-guidance-despite-earnings-decline-93CH-4664397" },
        { headline: "Data-center contracts ramping toward 445 MW by 2032.", body: "NRG has signed retail data-center power agreements that start at just 5 MW in 2026 but are contracted to scale to 445 MW by 2032, priced above $80 per megawatt-hour with retail margins exceeding $25 per megawatt-hour — materially richer economics than NRG's traditional residential and small-business retail-electricity business. The strategy is to convert the broader AI-driven power-demand story into long-dated, contractually locked-in cash flow rather than relying on spot-market power prices, which is also why the LS Power acquisition matters: owning the generation fleet that ultimately serves those contracts reduces NRG's exposure to buying wholesale power at a loss if prices spike.", ctx: "Long-dated hyperscaler contracts convert the data-center demand supercycle into predictable cash flow.", url: "https://finance.yahoo.com/news/data-center-growth-lifts-nrg-001234664.html" },
      ],
      sources: [
        { label: "Bloomberg — $12B LS Power deal", url: "https://www.bloomberg.com/news/articles/2025-05-12/nrg-energy-acquire-gas-power-assets-from-ls-for-12-billion" },
        { label: "Bloomberg Opinion — AI's power race", url: "https://www.bloomberg.com/opinion/articles/2025-05-13/nrg-energy-deal-is-a-window-into-ai-s-race-for-power" },
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
        { headline: "Operating as one firm after the Moss Adams combination.", body: "Baker Tilly's push to scale nationally began in earnest in 2024, when Hellman & Friedman and Valeas Capital Partners paid roughly $1 billion for just over 50% of the firm — the largest private-equity investment ever made in a U.S. accounting firm at the time — splitting the business into Baker Tilly U.S., LLP, a licensed CPA firm handling audit and attest work with no PE ownership (to satisfy auditor-independence rules), and Baker Tilly Advisory Group, LP, holding the faster-growing tax and consulting business that private equity actually invested in. The subsequent combination with Moss Adams added meaningfully to that base, and the firm is targeting several billion dollars of revenue by decade's end as it builds toward being able to compete nationally against the largest advisory platforms for enterprise-scale mandates.", ctx: "Creates the scale to compete nationally against the largest advisory platforms and win larger enterprise mandates.", url: "https://www.bakertilly.com/baker-tilly-moss-adams-now-one" },
        { headline: "Eric Miles took the CEO seat in January 2026.", body: "Former Moss Adams CEO Eric Miles became CEO of the combined firm, succeeding Jeff Ferro, who remains on the board — a leadership choice that gave the acquired firm's chief executive the top job at the merged entity, a signal of how much weight Moss Adams carries in the combined organization's go-forward strategy rather than simply being absorbed into Baker Tilly's existing structure.", ctx: "Leadership continuity from the acquired firm underscores Moss Adams' weight in the merged entity's strategy.", url: "https://www.consulting.us/news/12810/baker-tilly-appoints-eric-miles-as-chief-executive-officer" },
        { headline: "Named a new senior leadership team.", body: "Fred Massanova was named North American Managing Principal and COO, Rebecca Pomering became Chief Growth Officer, and Michael Herman joined as Chief Digital and Information Officer reporting directly to the CEO — a newly created seat. Elevating a dedicated digital and AI executive into the C-suite, rather than leaving technology strategy under a traditional CIO reporting further down the chain, signals that Baker Tilly views modernizing audit and advisory delivery through AI as a core competitive lever for winning larger clients away from the Big Four, not just a back-office IT function.", ctx: "The elevation of a digital/AI chief signals technology transformation as a core competitive lever.", url: "https://www.bakertilly.com/news/baker-tilly-announces-new-senior-leadership-team" },
        { headline: "Spun off wealth unit as Threadline Wealth.", body: "In March 2026, the legacy Moss Adams wealth-management business was carved out as an independent registered investment adviser called Threadline Wealth, backed by Cynosure Group and managing roughly $5.8 billion in client assets. Divesting wealth management lets Baker Tilly concentrate its integration effort on the core audit, tax and advisory lines the Moss Adams deal was actually built around, rather than also trying to fold in a wealth-management business with a different regulatory regime, client base and economics.", ctx: "Portfolio pruning sharpens Baker Tilly's focus on core audit, tax, and advisory as it integrates the merger.", url: "https://www.accountingtoday.com/news/moss-adams-spins-off-wealth-management-unit-after-baker-tilly-deal" },
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
        "Regal Rexnord's data-center power business is surging — roughly $735M of E-Pod orders and ~54% order growth — while broader industrial end-markets show early signs of recovery.",
      stats: [
        { v: "~$218", l: "Price · early Jul", dir: "up" },
        { v: "~+42%", l: "YTD growth", dir: "up" },
        { v: "$14.5B", l: "Market cap", dir: null },
        { v: "$127.96–$247.80", l: "52-wk range", dir: null },
        { v: "Aug 3", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Data-center orders surge on E-Pod wins.", body: "Data-center power-management orders jumped roughly 54% year over year, including about $735 million in orders for Regal Rexnord's plug-and-play E-Pod power system — a modular, factory-built power and switchgear unit that lets data-center developers add capacity faster than building custom electrical infrastructure on-site. Initial E-Pod shipments are expected to begin in early 2027, and the segment that houses this business (Automation & Motion Control) saw orders up more than 34% in the most recent quarter, aided by data centers among other end markets. Regal Rexnord executives have said the data-center product line alone could grow into roughly a $1 billion revenue business, which would make it one of the largest single growth vectors in the company's portfolio.", ctx: "Positions Regal Rexnord as a direct beneficiary of the AI data-center capex cycle; the business could reach ~$1B in revenue.", url: "https://biztimes.com/regal-rexnord-secures-735-million-worth-of-orders-for-new-data-center-product/" },
        { headline: "End-markets firming beyond data centers.", body: "Beyond the data-center surge, Regal Rexnord is seeing early signs of recovery in food & beverage and general industrial demand, two end markets that had been soft for several quarters as customers worked down excess inventory built up during the post-pandemic ordering cycle. A broader-based industrial recovery, on top of the data-center tailwind, would reduce the company's reliance on a single hot end market and de-risk the back half of 2026 — a meaningful distinction for a company whose stock has already re-rated sharply on the data-center story alone.", ctx: "A wider industrial recovery would de-risk the second half.", url: "https://www.sahmcapital.com/news/content/regal-rexnord-rrx-data-center-wins-put-its-valuation-back-in-focus-2026-07-03" },
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
        "Vulcan keeps executing its aggregates-led strategy: exiting California ready-mix, buying Colorado and Dallas-Fort Worth assets, and reaffirming full-year growth plans.",
      stats: [
        { v: "~$307", l: "Price · early Jul", dir: "up" },
        { v: "~+17%", l: "YTD growth", dir: "up" },
        { v: "$38.8B", l: "Market cap", dir: null },
        { v: "$252.35–$331.09", l: "52-wk range", dir: null },
        { v: "Jul 30", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "Portfolio reshaping via bolt-on M&A.", body: "Vulcan completed the divestiture of its California ready-mixed concrete operations and used the proceeds, alongside fresh capital, to acquire Brannan Sand & Gravel's southern Colorado and Dallas-Fort Worth assets, including a rail-connected quarry in Lamar, Colorado. The logic behind both moves is the same: aggregates — the crushed stone, sand and gravel that go into virtually every road, bridge and building foundation — carry materially higher margins than downstream ready-mix concrete because local quarry ownership creates a de facto regional monopoly (aggregates are heavy and expensive to ship, so whoever owns the nearest quarry has pricing power). Exiting California ready-mix while buying rail-connected quarry capacity in fast-growing Sun Belt and mountain-west markets sharpens Vulcan's focus on the highest-margin, most defensible part of its business.", ctx: "Sharpens focus on higher-margin aggregates and expands reach into high-growth Sun Belt and mountain-west markets.", url: "https://www.investing.com/news/company-news/vulcan-materials-completes-california-exit-colorado-acquisition-93CH-4730425" },
        { headline: "Full-year guidance reaffirmed on a strong Q1.", body: "First-quarter 2026 revenue rose 7% year over year to $1.76 billion, with aggregates-segment gross profit up 12% to $400 million and gross margin expanding 90 basis points to 27.6%, driven by aggregates shipments up 5%, asphalt-mix volume up 2%, and ready-mixed concrete up 6%, alongside freight-adjusted pricing gains of roughly 4% on a mix-adjusted basis. Management reaffirmed full-year 2026 adjusted EBITDA guidance of $2.4–$2.6 billion and flagged additional growth projects and bolt-on acquisitions ahead, while the board declared a $0.52-per-share quarterly dividend. Roughly 41% of the $853 billion Infrastructure Investment and Jobs Act is earmarked for aggregates-intensive projects like highways and bridges, which is the multi-year public-spending tailwind underpinning the Street's broadly bullish view of the stock.", ctx: "Stable outlook and disciplined capital returns underpin the Street's overall Buy rating (avg. target ~$327).", url: "https://stockstory.org/us/stocks/nyse/vmc/news/buy-or-sell/vulcan-materials-vmc-buy-sell-or-hold-post-q1-earnings" },
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
        "loanDepot heads into its first full quarter reflecting the wholesale re-entry and Project North Star cost reset, with mortgage-rate direction still setting the tempo for origination volume.",
      stats: [
        { v: "~$1.16", l: "Price · wk", dir: "down" },
        { v: "~-24%", l: "YTD growth", dir: "down" },
        { v: "6.61%", l: "30Y fixed (Jul 7)", dir: "up" },
        { v: "~$372M", l: "Market cap", dir: null },
        { v: "Early Aug", l: "Q2 report", dir: null },
      ],
      items: [
        { headline: "Rates rebound off six-week lows, pressuring purchase demand.", body: "After Freddie Mac's 30-year average dipped to 6.43% for the week ending July 2, the national 30-year rate climbed back to roughly 6.61% by July 7, up from the 2026 low of 6.09% reached earlier in the year. loanDepot's origination volume and gain-on-sale margins move closely with rate direction — Q1 revenue fell 8% to $286 million on the same rate volatility, and originations came in at $7.7 billion with lock volume of $8.3 billion, though pull-through-weighted gain-on-sale margin slipped to 2.71%. Every basis point the 30-year rate moves changes how many homeowners have an economic incentive to refinance and how much home buyers can afford, which is why the company's fortunes are unusually tethered to a macro variable almost entirely outside its own control.", ctx: "loanDepot's origination volume and gain-on-sale margins track rate direction closely; Q1 revenue fell 8% to $286M on rate volatility.", url: "https://www.bankrate.com/mortgages/todays-rates/mortgage-rates-for-wednesday-july-8-2026/" },
        { headline: "Q2 setup: first clean read on North Star and wholesale.", body: "The coming print will be the first full quarter to reflect the $100 million ATM equity program, the return to wholesale origination (loanDepot re-entered the wholesale channel in early 2026, about three and a half years after exiting it), and continued Project North Star cost discipline — the turnaround plan built around first-time homebuyers, expanded purchase-lending partnerships, servicing-retention scale and operating-leverage improvements to cut loan turn times. Watch two figures specifically: the consumer-direct refinance recapture rate, which stood at 73% in Q1, and total expenses, which were $342 million in Q1 as marketing spend fell 12% year over year. The company also recently struck a partnership with Figure Technology Solutions intended to lower production costs and speed loan closings, another piece of the broader cost-reset story.", ctx: "Management has framed North Star around purchase lending, servicing retention, operating leverage and talent as the path back to profitability.", url: "https://www.housingwire.com/articles/loandepot-returns-to-profitability-announces-new-strategic-plan/" },
      ],
      sources: [
        { label: "Bankrate — mortgage rates, Jul 8", url: "https://www.bankrate.com/mortgages/todays-rates/mortgage-rates-for-wednesday-july-8-2026/" },
        { label: "Yahoo Finance — LDI", url: "https://finance.yahoo.com/quote/LDI/" },
        { label: "MarketBeat — LDI earnings", url: "https://www.marketbeat.com/stocks/NYSE/LDI/earnings/" },
      ],
    },
    "2026-06-29": {
      glance:
        "Quarter-end finds LDI firmer near $1.24 as mortgage rates ease toward six-week lows, aided by falling oil prices after the US-Iran peace deal. The tape is constructive into the July 4 holiday, but sticky inflation (May PCE +3.4% y/y) caps optimism. The narrative pivots from the Grassi leadership refresh toward Q2 earnings math.",
      stats: [
        { v: "~$1.24", l: "Price · wk", dir: "up" },
        { v: "6.43%", l: "30Y fixed", dir: "down" },
        { v: "73%", l: "Recapture (Q1)", dir: null },
        { v: "1.39%", l: "Mkt share", dir: null },
      ],
      items: [
        { headline: "Rates drift to six-week lows as oil retreats.", body: "The 30-year fixed eased toward the 6.4% area into quarter-end, its lowest in roughly six weeks, as oil prices fell following the US-Iran peace deal.", ctx: "A friendlier rate backdrop directly supports loanDepot's consumer-direct recapture engine, which hit 73% in Q1, up from 71% in Q4 2025." },
        { headline: "LDI firms into quarter-end.", body: "Shares traded up toward the mid-$1.20s, recovering from mid-June softness as the rate move improved sentiment across mortgage originators.", ctx: "The $100M ATM program with BTIG remains active, so equity issuance can temper upside even on constructive rate days." },
        { headline: "Focus turns to Q2 earnings math.", body: "With the quarter closing, the market began sizing the Q2 print due in early August: whether volume recovered from Q1's $7.66B and whether North Star cost actions narrowed the loss from Q1's $55M.", ctx: "Q1 marked a sequential deterioration (net loss widened from $33M), keeping the profitability timeline in focus." },
      ],
      sources: [
        { label: "Bankrate — mortgage rates, Jul 1", url: "https://www.bankrate.com/mortgages/todays-rates/mortgage-rates-for-wednesday-july-1-2026/" },
        { label: "loanDepot — Q1 2026 results", url: "https://media.loandepot.com/news-releases/press-release-details/2026/loanDepot-Announces-First-Quarter-2026-Financial-Results/default.aspx" },
        { label: "Norada — 90-day rate forecast", url: "https://www.noradarealestate.com/blog/mortgage-rates-forecast-next-90-days-may-to-july-2026/" },
      ],
    },
    "2026-06-22": {
      glance:
        "LDI trades around $1.19 in a choppy mid-quarter tape, with 30-year rates hovering in the 6.5%–6.6% zone. The story is execution: Project North Star's purchase and servicing-retention priorities against a still-pressured margin environment. The ATM program continues to backstop the balance sheet ahead of the Q2 report.",
      stats: [
        { v: "~$1.19", l: "Price · wk", dir: "up" },
        { v: "~6.55%", l: "30Y fixed", dir: null },
        { v: "$100M", l: "ATM capacity", dir: null },
        { v: "$342M", l: "Q1 expenses", dir: null },
      ],
      items: [
        { headline: "North Star execution takes center stage.", body: "With leadership settled after the Grassi promotion, the market focused on Project North Star's pillars: first-time homebuyers, purchase lending via expanded partnerships, servicing scale and retention, and operating leverage to cut turn times.", ctx: "North Star is management's roadmap back to durable profitability after a string of quarterly losses." },
        { headline: "ATM program keeps de-levering in view.", body: "The $100M at-the-market equity facility with BTIG, launched May 15, continues to let loanDepot sell Class A shares opportunistically, with net proceeds earmarked to reduce debt.", ctx: "The gradual issuance structure lets the company tap markets without a single dilutive block." },
        { headline: "Margins remain the swing factor.", body: "Rates stuck in the mid-6% range kept gain-on-sale margins under pressure, the same dynamic that drove the Q1 revenue decline to $286M.", ctx: "Q1 expenses held roughly flat at $342M as marketing fell 12%, evidence of ongoing cost discipline." },
      ],
      sources: [
        { label: "HousingWire — North Star plan", url: "https://www.housingwire.com/articles/loandepot-returns-to-profitability-announces-new-strategic-plan/" },
        { label: "StockTitan — $100M ATM program", url: "https://www.stocktitan.net/sec-filings/LDI/8-k-loan-depot-inc-reports-material-event-65145f4ea85e.html" },
        { label: "Investing.com — Q1 2026 slides", url: "https://www.investing.com/news/company-news/loandepot-q1-2026-slides-losses-widen-despite-volume-gains-93CH-4661366" },
      ],
    },
    "2026-06-15": {
      glance:
        "LDI eases to about $1.13, near the low end of its recent band, after printing $1.16 mid-week. The Grassi leadership refresh is absorbed; the tape now reflects rate uncertainty and the persistent dilution overhang from the ATM program. Recapture strength (73% in Q1) and marketing efficiency are the constructive counterweights.",
      stats: [
        { v: "~$1.13", l: "Price · wk", dir: "down" },
        { v: "$1.16", l: "Mid-wk (Jun 11)", dir: null },
        { v: "~6.5%", l: "30Y fixed", dir: null },
        { v: "−12%", l: "Q1 mktg spend", dir: null },
      ],
      items: [
        { headline: "Shares soften despite operational progress.", body: "LDI printed $1.16 on June 11 before drifting toward the low-$1.10s, keeping the stock pinned near multi-year lows even as management points to recapture gains and cost discipline.", ctx: "The 52-week range spans $1.10 to $5.05, underscoring how far the equity has de-rated through the down-cycle." },
        { headline: "Recapture and marketing efficiency reinforce North Star.", body: "Q1's 73% organic refinance recapture rate (up from 71%) and a 12% cut in marketing spend illustrate the productivity thrust behind Project North Star.", ctx: "Higher retention protects servicing value and lowers customer-acquisition cost, both central to the turnaround thesis." },
        { headline: "ATM issuance remains a soft cap on the stock.", body: "The active $100M ATM facility means opportunistic equity sales can absorb rallies, a structural headwind while the balance-sheet repair continues.", ctx: "Proceeds are directed at debt reduction, supporting credit quality at the cost of near-term dilution." },
      ],
      sources: [
        { label: "Yahoo Finance — LDI", url: "https://finance.yahoo.com/quote/LDI/" },
        { label: "loanDepot — Q1 2026 results", url: "https://media.loandepot.com/news-releases/press-release-details/2026/loanDepot-Announces-First-Quarter-2026-Financial-Results/default.aspx" },
        { label: "Macrotrends — LDI price history", url: "https://www.macrotrends.net/stocks/charts/LDI/loandepot/stock-price-history" },
      ],
    },
    "2026-06-08": {
      glance:
        "LDI trades near $1.16 as the market digests the June 2 elevation of Joseph Grassi to Chief Legal and Risk Officer, a governance signal amid the turnaround. With 30-year rates in the low-6.5% range, the debate stays fixed on margin recovery and the pace of ATM issuance. Q1's widened loss keeps the profitability clock ticking.",
      stats: [
        { v: "~$1.16", l: "Price · wk", dir: "down" },
        { v: "6.3–6.6%", l: "30Y fixed", dir: null },
        { v: "$7.66B", l: "Q1 originations", dir: null },
        { v: "−$55M", l: "Q1 net loss", dir: "down" },
      ],
      items: [
        { headline: "Grassi promotion frames the governance narrative.", body: "loanDepot promoted Joseph Grassi, CRO since 2022, to Chief Legal and Risk Officer effective June 2, consolidating legal strategy, corporate governance, regulatory compliance, loan quality and enterprise risk under one leader reporting to founder-CEO Anthony Hsieh.", ctx: "Grassi brings 35+ years across consumer-lending law and mortgage regulation, including roles at HUD, Freddie Mac and Guaranteed Rate." },
        { headline: "Rates hold in the low-6.5% zone.", body: "Early-June 30-year fixed rates ranged roughly 6.3%–6.6%, a range that keeps refi economics marginal and purchase affordability stretched.", ctx: "Rate direction remains the primary driver of loanDepot's volume and gain-on-sale margin, both pressured in Q1." },
        { headline: "Q1 loss keeps the turnaround on the clock.", body: "The most recent quarter showed a $55M net loss (adjusted loss $34M) on $286M revenue and $7.66B in originations, with market share up to 1.39%.", ctx: "The sequential widening from a $33M loss underscores why cost actions and recapture gains dominate the equity story." },
      ],
      sources: [
        { label: "Businesswire — Grassi promotion", url: "https://www.businesswire.com/news/home/20260602476673/en/loanDepot-Promotes-Joseph-Grassi-to-Chief-Legal-and-Risk-Officer" },
        { label: "HousingWire — Grassi appointment", url: "https://www.housingwire.com/articles/loandepot-grassi-chief-legal-risk/" },
        { label: "StockTitan — Q1 2026 8-K", url: "https://www.stocktitan.net/sec-filings/LDI/8-k-loan-depot-inc-reports-material-event-2ef76635cf60.html" },
      ],
    },
    "2026-06-01": {
      glance:
        "The month opens with two headlines: the May 15 launch of a $100M at-the-market equity program and the June 2 promotion of Joseph Grassi to Chief Legal and Risk Officer. LDI hovers near $1.21 as investors weigh balance-sheet repair against dilution. The Q1 loss and margin pressure remain the backdrop as management leans on Project North Star.",
      stats: [
        { v: "~$1.21", l: "Price · wk", dir: null },
        { v: "$100M", l: "ATM program", dir: null },
        { v: "2.0%", l: "Agent commission", dir: null },
        { v: "$286.4M", l: "Q1 revenue", dir: null },
      ],
      items: [
        { headline: "$100M ATM equity program takes effect.", body: "loanDepot's May 15 sales agreement with BTIG lets it sell up to $100M of Class A common stock over time, with an agent commission of up to 2.0% and net proceeds aimed at reducing indebtedness and general corporate purposes.", ctx: "The ATM structure gives loanDepot incremental capital flexibility off its existing shelf rather than a single dilutive raise." },
        { headline: "Grassi elevated to Chief Legal and Risk Officer.", body: "Effective June 2, CRO Joseph Grassi added legal, governance and compliance oversight to his risk mandate, reporting to founder-CEO Anthony Hsieh. He brings 35+ years spanning HUD, Freddie Mac and multiple lenders.", ctx: "The move centralizes legal and risk leadership as loanDepot navigates a demanding regulatory and rate environment." },
        { headline: "Q1 aftermath still shapes the tape.", body: "Fresh off a $55M net loss on $286.4M revenue (down 8%) and $7.66B in originations, the market stays focused on whether North Star cost discipline and 73% recapture can bend the loss curve.", ctx: "loanDepot also re-entered wholesale origination earlier in 2026, roughly 3.5 years after exiting the channel." },
      ],
      sources: [
        { label: "TipRanks — $100M ATM program", url: "https://www.tipranks.com/news/company-announcements/loandepot-launches-100-million-at-the-market-equity-program" },
        { label: "loanDepot IR — Grassi promotion", url: "https://investors.loandepot.com/news/corporate-and-financial-news/corporate-and-financial-news-details/2026/loanDepot-Promotes-Joseph-Grassi-to-Chief-Legal-and-Risk-Officer/default.aspx" },
        { label: "National Mortgage News — wholesale return", url: "https://www.nationalmortgagenews.com/news/loandepot-adds-wholesale-production-three-years-after-exit" },
      ],
    },
  },

  // ─────────────────────────── ROCKWELL AUTOMATION ────────────────────────────
  "rockwell-automation": {
    "2026-07-06": {
      glance:
        "Rockwell raised full-year guidance for the second time on strong smart-manufacturing and reshoring demand, with growing software and services mix driving the profitability step-up.",
      stats: [
        { v: "$471.70", l: "Price · Jul 4", dir: "up" },
        { v: "~+30%", l: "YTD growth", dir: "up" },
        { v: "$53.7B", l: "Market cap", dir: null },
        { v: "$305–$490", l: "52-wk range", dir: "up" },
        { v: "Aug 4", l: "Next earnings (Q3)", dir: null },
      ],
      items: [
        { headline: "Guidance raised a second time this fiscal year.", body: "Management lifted FY2026 organic growth guidance to 5–9% and adjusted EPS guidance to $12.50–$13.10 — the second upward revision of the fiscal year, which is unusual for an industrial company still operating in a mixed global manufacturing environment. CEO Blake Moret has attributed the strength partly to a policy-driven wave of reshoring: in a CNBC interview he said the company is 'seeing optimism around the focus on American manufacturing,' as customers accelerate plans to bring production back onshore and automate it more heavily than the plants they're replacing, which plays directly to Rockwell's core Allen-Bradley controls and FactoryTalk software business.", ctx: "A rare mid-year double raise underscores confidence in order momentum and pricing.", url: "https://www.cnbc.com/video/2026/05/05/rockwell-automation-ceo-blake-moret-were-seeing-optimism-around-the-focus-on-american-manufacturing.html" },
        { headline: "Margins and cash flow expand sharply.", body: "Pre-tax margin climbed to 19.7% from 14.9% a year earlier, enterprise operating margin reached 22.5%, and free cash flow surged 61% year over year to $275 million — a profitability step-up that's coming disproportionately from Rockwell's growing mix of recurring software and services revenue (subscriptions and long-term service contracts) layered on top of its traditional hardware sales, since software carries substantially higher margin than shipping physical controllers and drives. That mix shift is the main reason the market is willing to pay a premium multiple for Rockwell relative to purely hardware-driven industrial peers.", ctx: "Cost discipline and mix are converting revenue growth into outsized profitability.", url: "https://stockstory.org/us/stocks/nyse/rok/news/buy-or-sell/rockwell-automation-rok-buy-sell-or-hold-post-q1-earnings" },
      ],
      sources: [
        { label: "CNBC — CEO on reshoring momentum", url: "https://www.cnbc.com/video/2026/05/05/rockwell-automation-ceo-blake-moret-were-seeing-optimism-around-the-focus-on-american-manufacturing.html" },
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
        "Workday is betting on AI agents — 4,000+ customers already use one and AI-related ACV grew 200% — while an 8.5% workforce reset aims to prove the efficiency case on its own P&L.",
      stats: [
        { v: "$137.41", l: "Price · Jul 8", dir: "down" },
        { v: "~-26%", l: "YTD growth", dir: "down" },
        { v: "$33.9B", l: "Market cap", dir: null },
        { v: "$110–$250", l: "52-wk range", dir: "down" },
        { v: "Aug 20", l: "Next earnings", dir: null },
      ],
      items: [
        { headline: "AI agents scaling fast.", body: "Roughly 4,000 customers now use at least one of Workday's organic AI agents, and AI-related annual contract value grew more than 200% year over year, aided by integrations with Sana (an AI-native learning and knowledge platform Workday acquired) and Paradox (conversational-AI recruiting). Workday needs this to work: it entered 2026 in the middle of a punishing stretch for its stock, and management's core argument to investors is that AI-agent adoption inside HCM and financials workflows — not just cost-cutting — is what reaccelerates subscription revenue growth from here.", ctx: "AI monetization is the core bull thesis for reaccelerating subscription growth.", url: "https://www.quiverquant.com/news/Workday+Shares+Climb+as+Investors+Reassess+Earnings+Strength+and+AI+Product+Momentum" },
        { headline: "Workforce cuts continue as AI substitutes for headcount.", body: "Workday cut about 8.5% of its workforce — roughly 1,750 roles — in a prior reduction and trimmed a further approximately 400 customer-support jobs in February 2026, framing both moves as automating functions with AI rather than pure cost-cutting, and using the savings to lift full-year non-GAAP operating-margin guidance to 30.5%. The company is also defending a federal lawsuit alleging its AI-powered job-screening tools produced discriminatory hiring outcomes; Workday has denied the claims, saying its technology evaluates only job qualifications and does not make hiring decisions itself. Broader context matters here too: AI was cited as a factor in roughly 40% of announced U.S. job cuts by May 2026, up from just 7% in January, so Workday's own reductions are part of a much larger corporate pattern its own customers are living through — which is also, not coincidentally, the exact pitch behind the AI-agent products it's selling them.", ctx: "The efficiency drive aims to prove AI leverage on its own P&L, not just customers'.", url: "https://www.bloomberg.com/news/articles/2026-02-04/workday-to-cut-about-400-employees-focused-on-customer-support" },
      ],
      sources: [
        { label: "Bloomberg — Workday cuts 400 jobs", url: "https://www.bloomberg.com/news/articles/2026-02-04/workday-to-cut-about-400-employees-focused-on-customer-support" },
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
        "Intuitive's da Vinci 5 rollout is accelerating — 232 units placed last quarter, procedures up 17% — and full-year procedure-growth guidance moved higher ahead of mid-July results.",
      stats: [
        { v: "$427.25", l: "Price · latest", dir: "down" },
        { v: "~-12%", l: "YTD growth", dir: "down" },
        { v: "$151.3B", l: "Market cap", dir: null },
        { v: "$397–$604", l: "52-wk range", dir: "down" },
        { v: "Jul 16", l: "Next earnings (Q2)", dir: null },
      ],
      items: [
        { headline: "da Vinci 5 rollout accelerating.", body: "First-quarter 2026 revenue rose 23% to $2.77 billion, with combined da Vinci and Ion procedure volume up 17% and the company placing 431 new systems in the quarter, 232 of them the next-generation da Vinci 5. The da Vinci 5, FDA-cleared in March 2024, is the first in the line with force-sensing capability — surgeons can feel resistance through the instruments in a way earlier da Vinci generations couldn't replicate, since previous systems transmitted no tactile feedback at all — and it already made up about 85% of U.S. system placements in the most recent quarter. Because Intuitive makes most of its money on a razor-and-blade model (selling or leasing the system, then earning recurring revenue on the disposable instruments and service contracts used in every procedure), each da Vinci 5 placement effectively locks in years of high-margin follow-on revenue.", ctx: "Next-gen platform adoption drives high-margin recurring instrument and service revenue.", url: "https://www.sec.gov/Archives/edgar/data/0001035267/000103526726000029/q126ex-991earningsrelease.htm" },
        { headline: "Procedure guidance raised despite tariff pressure.", body: "Intuitive lifted its full-year 2026 da Vinci procedure-growth outlook to 13.5%–15.5% and guided non-GAAP gross margin of 67.5%–68.5%, even as management has flagged that tariffs could weigh on results later in the year — a concern that has kept the stock trading well below its 52-week high despite the strong underlying procedure growth. Procedure volume, not system placements, is the metric that ultimately matters most for the long-term thesis, since it's what drives the recurring instrument and service revenue that makes up the bulk of Intuitive's profit once a hospital already owns a system.", ctx: "Procedure volume is the primary long-term value driver for the razor-and-blade model.", url: "https://www.forbes.com/sites/greatspeculations/2026/04/23/the-biggest-takeaway-from-isrg-earnings/" },
      ],
      sources: [
        { label: "Forbes — ISRG earnings takeaway", url: "https://www.forbes.com/sites/greatspeculations/2026/04/23/the-biggest-takeaway-from-isrg-earnings/" },
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
