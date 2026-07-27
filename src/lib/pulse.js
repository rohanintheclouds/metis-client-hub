// ─────────────────────────────────────────────────────────────────────────
// Client Pulse content store.
//
// In production this is populated by the scrape job (scripts/scrape.mjs → data
// store). Each edition is a research snapshot, not a "this-week" news cycle —
// every item carries its own `date` (when it actually happened, which is often
// weeks or months before the edition date) so nothing implies false recency.
//
// Shape:
//   PULSE[clientId][editionId] = { glance, stats[], items[], sources[] }
//   stat  = { v, l, dir: 'up'|'down'|null }
//   item  = { headline, body, ctx, date, url }
//   src   = { label, url, paywall: true? }
//
// Sourcing note: content is compiled from public reporting (company IR/SEC
// filings and press coverage), summarized via search-result snippets, not by
// reading full paywalled articles. Paywalled sources are flagged. Always
// verify before citing to a client.
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
        { headline: "Group benefits build-out continues.", date: "Ongoing", body: "Aflac has been pushing beyond its core worksite cancer and accident policies into a fuller group-benefits suite: group life, absence management, dental and vision. Much of this has come through acquired capacity rather than building products from scratch. The idea is simple: once Aflac is already inside a company's open-enrollment system through payroll deduction, adding adjacent coverages costs less than winning a brand-new employer relationship. It puts Aflac in more direct competition with Unum, MetLife and Guardian for the same benefits-fair real estate.", ctx: "Broader employer bundles defend the payroll-deduction channel and open cross-sell against Unum and MetLife.", url: "https://www.aflac.com/about-aflac/newsroom.aspx" },
        { headline: "Japan sales grew 25.5% in Q1.", date: "Q1 2026, reported May 2026", body: "Aflac Japan — roughly two-thirds of consolidated earnings — reported first-quarter 2026 sales up about 25.5% year over year. Distribution runs through two separate channels: Japan Post's roughly 20,000 post offices, and a sales-force partnership with Dai-ichi Life (in place since 2001, under which Dai-ichi's own agents sell Aflac cancer products). Aflac also sells through a separate bancassurance network of about 358 banks, close to 90% of all banks in Japan. Yen movements affect how Japan's profits translate into U.S.-dollar earnings, which is part of why currency commentary tends to move the stock alongside underlying sales trends.", ctx: "Japan drives roughly two-thirds of earnings; channel health there matters more than any single U.S. quarter.", url: "https://www.aflac.com/investors/default.aspx" },
        { headline: "Cyber-incident remediation still running.", date: "Breach: Jun 2025", body: "Aflac is still working through the fallout of a June 2025 breach in which the group known as Scattered Spider used social-engineering tactics to gain unauthorized access to its U.S. network. Aflac has said it contained the intrusion within hours and that no ransomware was involved, but the attackers took claims information, health information, Social Security numbers and other personal data belonging to a substantial number of customers, beneficiaries, employees and agents. Aflac is offering free credit monitoring, identity-theft protection and a medical-identity shield for 24 months to anyone affected who contacts its call center. The slower-moving costs — state regulatory inquiries and potential litigation typical of a breach this size — are still working their way through.", ctx: "Regulatory follow-through and brand trust are the watch items for a company whose product is a promise to pay at the worst moment.", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000004977&type=10-Q" },
        { headline: "Q2 filings due early August.", date: "Expected early Aug 2026", body: "The 10-Q and earnings call will be the next real read on whether U.S. premium growth is picking back up and how yen hedging costs are tracking. Aflac carries one of the more consistent capital-return records in insurance, with 43 consecutive years of dividend increases, so the more interesting line to watch is likely management's commentary on U.S. platform investment — that spending signals where the next phase of digital claims processing is headed.", ctx: "For engagement planning, watch U.S. platform-investment commentary — it signals where transformation budgets go next.", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000004977&type=10-Q" },
      ],
      sources: [
        { label: "Forbes — Scattered Spider breach", url: "https://www.forbes.com/sites/steveweisman/2025/06/21/aflac-data-breach-by-scattered-spider-hackers-is-no-quacking-matter/", paywall: true },
        { label: "Bloomberg — data-breach disclosure", url: "https://www.bloomberg.com/news/articles/2025-06-20/aflac-reports-potential-leak-of-personal-data-in-cyber-breach", paywall: true },
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
        { headline: "FDIC cleared Ford Credit Bank.", date: "Jan 2026", body: "The FDIC approved deposit insurance for a new Ford Credit Bank industrial-loan charter based in Salt Lake City, giving Ford up to a year to stand up the bank and begin accepting insured retail deposits it can lend against for vehicle purchases. Utah's industrial-bank charter is the standard structure for non-bank companies that want deposit-funded lending without becoming a full bank-holding company subject to Federal Reserve supervision — GM Financial has pursued the same path. It's a funding shift: instead of relying entirely on commercial paper, unsecured bonds and securitizations, Ford Credit can tap a cheaper, stickier pool of FDIC-insured deposits.", ctx: "A retail-deposit funding base is more stable and cheaper than unsecured debt and securitizations.", url: "https://www.fdic.gov/news/press-releases/2026/fdic-approves-deposit-insurance-applications-ford-credit-bank-salt-lake" },
        { headline: "Moody's called it credit positive.", date: "Jan 2026", body: "Moody's flagged the new Ford Credit and GM Financial industrial banks as credit positive for both captive lenders, on the reasoning that a federally insured deposit base is a more stable, lower-cost source of funds than wholesale capital markets, which can reprice sharply during periods of stress. Unsecured debt and securitization markets can seize up or get expensive exactly when an auto lender needs funding most, while insured deposits tend to be stickier.", ctx: "Cheaper funding supports Ford Credit's earnings contribution and lending competitiveness.", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { headline: "Lease share at 16% in Q1.", date: "Q1 2026", body: "Ford Credit's lease share of retail sales was about 16% in the first quarter of 2026, part of an ongoing balancing act between using leases to hit monthly-payment targets for price-sensitive buyers and managing exposure to used-vehicle residual values. Every lease Ford Credit writes carries an assumption about what the vehicle will be worth when it comes back off-lease; if used-vehicle prices soften as more off-lease supply hits the market, that residual-value risk shows up directly in Ford Credit's earnings.", ctx: "Lease mix drives residual-value exposure and future used-vehicle risk for the finance arm.", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { headline: "Parent raised full-year guidance.", date: "Apr 29, 2026", body: "Ford lifted its full-year 2026 adjusted EBIT guidance to $8.5–$10.5 billion after beating first-quarter expectations, helped by a one-time $1.3 billion benefit tied to a Supreme Court ruling that struck down a slice of tariffs, alongside roughly $1 billion of ongoing tariff costs and about $2 billion of commodity headwinds led by aluminum. On the EV side, Ford's Model e unit narrowed its loss from $849 million to $777 million even as EV sales volume fell sharply year over year, and executives said the EV strategy is being adapted to changing federal policy. Q2 U.S. sales fell 10% to about 549,200 units, largely a deliberate result of phasing out low-margin fleet and rental volume rather than a demand problem.", ctx: "Higher guidance plus deliberate mix cleanup frames the July 28 report.", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000037996&type=8-K" },
      ],
      sources: [
        { label: "FDIC — Ford Credit Bank", url: "https://www.fdic.gov/news/press-releases/2026/fdic-approves-deposit-insurance-applications-ford-credit-bank-salt-lake" },
        { label: "Auto Finance News — Moody's", url: "https://www.autofinancenews.net/allposts/capital-funding/ford-credit-gm-financial-industrial-banks-to-be-credit-positive-moodys-says/" },
        { label: "CNBC — Q1 2026 earnings", url: "https://www.cnbc.com/amp/2026/04/29/ford-motor-f-earnings-q1-2026.html" },
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
        { headline: "PCF backlog near $13B.", date: "Feb 2026 Investor Day", body: "Lumen's Private Connectivity Fabric (PCF) program — custom, dedicated fiber routes built to hyperscaler specifications — has grown to nearly $13 billion in signed deals, including agreements with hyperscalers and AI labs such as Anthropic, plus earlier wins connecting Amazon, Google Cloud, Meta and Microsoft data centers (the AWS deal dates to October 2024). Lumen has stood up a dedicated Custom Networks division to manage the PCF portfolio, and struck an agreement with Corning to be a preferred partner for next-generation fiber cable built for AI-scale traffic. The long-term plan, laid out at Lumen's February 2026 Investor Day, is to more than double its intercity network to roughly 58 million fiber miles by 2031.", ctx: "PCF is the core monetization thesis for turning legacy fiber into AI-infrastructure revenue.", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Marks-New-Phase-of-Transformation-at-2026-Investor-Day/default.aspx" },
        { headline: "Balance sheet cleanup underway.", date: "Closed Feb 2026", body: "Lumen closed the $5.75 billion sale of its consumer fiber business to AT&T in February 2026, directing roughly $4.8 billion of proceeds toward debt paydown, on top of an earlier debt exchange worth roughly $1.4 billion. Lumen's legacy copper and voice businesses keep shrinking every quarter, so the AI-fiber story only works if the balance sheet holds up long enough for PCF revenue to scale to a size that offsets that decline — which is why credit investors are still watching the debt paydown closely after the company's near-bankruptcy scare a few years ago.", ctx: "Deleveraging is critical given persistent legacy-revenue declines.", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Marks-New-Phase-of-Transformation-at-2026-Investor-Day/default.aspx" },
        { headline: "NaaS customers up 25% sequentially.", date: "Q1 2026, reported Apr 2026", body: "Lumen's Q1 2026 report showed Network-as-a-Service customers up about 25% sequentially and active ports up 35%, taking the company to roughly 2,500 NaaS customers — its most recent disclosed figure (an earlier 29% year-over-year growth stat from the Q4 2025 report has since been superseded). NaaS lets enterprises buy bandwidth on demand rather than through fixed long-term contracts. Lumen also launched NorthLine, a low-latency Seattle–Minneapolis route built for AI training-data movement, and is connecting QTS data-center sites (a deal first announced in October 2025) onto its roughly 340,000-route-mile backbone.", ctx: "New routes and NaaS adoption aim to offset shrinking legacy services.", url: "https://ir.lumen.com/news/news-details/2026/Lumen-Expands-its-U-S--Network-with-NorthLine-a-New-Northern-Fiber-Route-Built-for-AI-Data-Movement/default.aspx" },
      ],
      sources: [
        { label: "CNBC — Lumen's AI turnaround", url: "https://www.cnbc.com/2026/04/15/from-near-bankruptcy-to-ai-tailwinds-lumens-high-stakes-fiber-bet-could-pay-off.html", paywall: true },
        { label: "Bloomberg — AWS fiber deal", url: "https://www.bloomberg.com/news/articles/2024-10-30/lumen-will-link-amazon-data-centers-in-latest-ai-fiber-deal", paywall: true },
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
        { headline: "Raised FY2026 guidance on AI momentum.", date: "May 2026 investor presentation", body: "Management targets 6–7% revenue growth and 10–11% adjusted EPS growth for fiscal 2026, pointing to continued strength in the core HCM platform plus early payback from AI investment. ADP has built a shared data architecture and a dedicated AI Office to coordinate efforts across the company, so a consistent set of AI tools can be reused across payroll, tax, benefits and workforce-analytics products rather than each team building its own point solution.", ctx: "Signals confidence that AI investment is translating into durable margin and top-line expansion, not just cost.", url: "https://www.sahmcapital.com/news/content/adp-publishes-investor-presentation-outlining-hcm-strategy-and-ai-agent-rollout-2026-05-04" },
        { headline: "ADP Assist has powered 10M+ conversations.", date: "As of Feb 2026", body: "ADP Assist, the company's suite of AI agents, is built around specific moments in the payroll and HR workflow where practitioners face manual or repetitive work — auditing a payroll run for anomalies, answering a tax-compliance question, generating a report. The payroll agents flag variances between pay periods, explain what changed, and suggest a fix, with a human in the loop for final sign-off. ADP's data platform has now powered more than 10 million ADP Assist conversations, with adoption across a large share of its own sales and engineering staff — the company is using its own workforce as the proving ground before pushing features out to clients.", ctx: "Internal AI enablement is a leading indicator of the productivity story ADP is selling to clients.", url: "https://www.forbes.com/sites/randybean/2026/02/09/how-ai-is-transforming-customer-and-employee-experience-at-adp/" },
        { headline: "AI-agent Marketplace launched.", date: "Mar 2026", body: "ADP opened a curated AI-agent storefront inside ADP Marketplace, its existing app-integration ecosystem, bringing in partners like Absorb (learning management), G-P (global employment), Employ (recruiting), Salary.com (compensation benchmarking), Payactiv (earned-wage access) and Tapcheck to let clients chain together multi-step HR and payroll tasks without custom integration work. It positions ADP less as a single payroll vendor and more as an orchestration layer other HR-tech companies build on top of, competing directly against Workday's and UKG's own AI-agent pushes for the same enterprise HR budget.", ctx: "Positions ADP as an orchestration layer, deepening ecosystem lock-in against Workday and UKG.", url: "https://mediacenter.adp.com/2026-03-02-ADP-Marketplace-Launches-AI-Agents-to-Help-Make-Work-Easier,-Smarter" },
      ],
      sources: [
        { label: "Forbes — AI at ADP", url: "https://www.forbes.com/sites/randybean/2026/02/09/how-ai-is-transforming-customer-and-employee-experience-at-adp/", paywall: true },
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
        "UKG is pushing an AI-first 'Workforce Operating Platform' pitch for frontline and hourly work, even as it cut roughly 950 jobs — about 14% of headcount — in April 2026 citing AI-driven shifts in how software companies compete.",
      stats: [
        { v: "~80K", l: "Organizations served", dir: null },
        { v: "~$5B", l: "Est. annual revenue", dir: "up" },
        { v: "370", l: "Tech & service partners", dir: "up" },
        { v: "$6.5T", l: "Frontline-work market", dir: null },
      ],
      items: [
        { headline: "Cut about 950 jobs, citing AI-driven shifts.", date: "Apr 16, 2026", body: "UKG eliminated roughly 950 positions, about 14% of its global workforce, mostly out of its South Florida offices. The company pointed to 'rapidly evolving market shifts, including changes in technology driven by AI, customer expectations, and how software companies compete' as the reason. Around 600 employees left immediately, with another 350 kept on for a transition period. It's UKG's largest cut in a string of reductions over 2025–2026, and sits oddly alongside the company's public messaging about AI as a growth story rather than a cost one.", ctx: "Worth raising directly with UKG contacts — the AI-efficiency narrative and the headcount reduction are two sides of the same coin.", url: "https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/" },
        { headline: "Positioning around a 'Workforce Operating Platform.'", date: "Framing from Jan 2026", body: "UKG has been repositioning itself away from being seen as just a payroll and time-clock vendor, toward what it calls a Workforce Operating Platform — unifying HR, scheduling and pay around AI it markets as 'People-First AI.' The pitch: UKG's People Fabric data layer processes workforce signals (shift patterns, tenure, overtime trends) so AI can surface recommendations like flagging which hourly employees are at flight risk. Analyst Josh Bersin wrote in January 2026 that this stakes out a leadership position in the roughly $6.5 trillion global market for frontline and hourly work, a segment historically underserved by HR software built for salaried knowledge workers.", ctx: "Reframes UKG from a payroll/time vendor into a decision-intelligence layer for hourly and frontline labor.", url: "https://joshbersin.com/2026/01/ukg-stakes-out-leadership-position-in-6-5-trillion-market-for-frontline-work/" },
        { headline: "Leadership additions from the past 18 months.", date: "Jan 2025 – Aug 2025", body: "UKG has reloaded parts of its executive team: Suresh Vittal joined as Chief Product Officer in January 2025, Jim Joudrey was brought in as CTO in August 2025, and Jay Dettling was named the company's first Chief Partner Officer. Bringing in senior operators from established public SaaS companies, rather than promoting internally, is often read as a large private company professionalizing its bench ahead of a bigger growth push — though UKG (majority owned by Hellman & Friedman since the 2020 Ultimate Software–Kronos merger) hasn't announced any IPO plans.", ctx: "A deliberate infusion of senior SaaS operators, worth understanding before an engagement conversation with UKG leadership.", url: "https://brandonhall.com/meet-the-new-ukg/" },
        { headline: "ServiceNow agent-to-agent partnership.", date: "Announced May 2025", body: "UKG and ServiceNow struck a partnership letting their respective AI agents hand off multi-step workflows to each other — a scheduling issue flagged by UKG's AI could open and route a case inside ServiceNow's Agent Fabric without a human re-entering it into a second system. UKG Ventures, a corporate venture arm making early-stage bets on 'worktech' startups, followed in October 2025. Both moves predate this edition by several months but remain part of UKG's current ecosystem strategy.", ctx: "Interoperable-agent partnerships are becoming a competitive battleground in enterprise HR tech.", url: "https://www.ukg.com/company/newsroom" },
      ],
      sources: [
        { label: "HR Executive — 950 jobs cut", url: "https://hrexecutive.com/ukg-cuts-950-jobs-in-latest-round-of-restructuring/" },
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
        { headline: "Bought a Belvidere, IL facility for $23M.", date: "Jun 15, 2026", body: "Generac acquired a one-story industrial building at 675 Corporate Parkway in Belvidere, Illinois from Becknell Industrial for $23 million, to expand assembly and packaging capacity for large-megawatt generator systems. The site builds on capabilities from Generac's earlier acquisition of Enercon Engineering, a specialist in generator enclosures, and its northern Illinois location gives it easy access to interstate routes for shipping large equipment. Generac expects the facility to add more than 100 jobs once operations begin in Q1 2027.", ctx: "Directly targets surging data-center and mission-critical demand, the key driver of the stock's re-rating.", url: "https://www.prnewswire.com/news-releases/generac-acquires-belvidere-illinois-facility-to-expand-large-megawatt-generator-packaging-capacity-302799769.html" },
        { headline: "CEO has flagged data-center power strain.", date: "May 2025", body: "CEO Aaron Jagdfeld has said Generac is investing to meet demand from AI data centers, which each need substantial backup-power capacity, and that the company had already begun shipping some larger generators internationally to data-center customers — a newer buyer category for a business built on residential storm backup. He's called grid capacity 'a massively critical discussion point' that's 'only going to get worse' as data centers come online faster than utilities can add generation.", ctx: "Directly targets surging data-center and mission-critical demand, the key driver of the stock's re-rating.", url: "https://www.bloomberg.com/news/articles/2025-05-14/ai-boom-has-generac-looking-to-data-centers-for-growth" },
        { headline: "International leadership shuffle.", date: "2026", body: "Generac promoted Niccolo Borracchini to EVP-International, giving him oversight of both the Generac- and Pramac-branded businesses outside the U.S. and Canada, consolidating a previously more fragmented regional structure under one global commercial leader. It comes as Generac pushes its energy-storage and commercial-and-industrial lines into international markets, extending a growth strategy that in the U.S. increasingly means selling into data centers and other mission-critical facilities.", ctx: "Consolidates global commercial leadership as Generac pushes energy-storage and C&I growth abroad.", url: "https://www.stocktitan.net/news/GNRC/" },
      ],
      sources: [
        { label: "PR Newswire — Belvidere acquisition", url: "https://www.prnewswire.com/news-releases/generac-acquires-belvidere-illinois-facility-to-expand-large-megawatt-generator-packaging-capacity-302799769.html" },
        { label: "Bloomberg — Generac eyes data centers", url: "https://www.bloomberg.com/news/articles/2025-05-14/ai-boom-has-generac-looking-to-data-centers-for-growth", paywall: true },
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
        "Take Command, which describes itself as the country's largest ICHRA administrator, is highlighting steep proposed 2026 ACA premium increases as the case for employers to shift to individual-coverage health reimbursement arrangements.",
      stats: [
        { v: "$25M", l: "Growth round (2023, Edison-led)", dir: null },
        { v: "~20%", l: "Proposed 2026 ACA premium increase", dir: "up" },
        { v: "#1", l: "Self-described largest U.S. ICHRA admin", dir: null },
      ],
      items: [
        { headline: "Flagging steep proposed 2026 ACA premium hikes.", date: "2026", body: "Take Command's own research points to preliminary 2026 ACA marketplace filings showing roughly a 20% average proposed premium increase — the largest since 2018 — and is using that to make its case to employers that ICHRA (an arrangement where the employer funds a fixed reimbursement toward an employee's own individual plan, instead of buying one group plan for everyone) caps cost exposure in a way a traditional group plan can't. Congress may also revisit the CHOICE Arrangement Act, which would codify and expand the ICHRA framework.", ctx: "A concrete, current cost pressure to raise directly with clients evaluating group vs. defined-contribution benefits.", url: "https://www.takecommandhealth.com/blog/proposed-2026-aca-premium-increases-ichra" },
        { headline: "ICHRA adoption is growing industry-wide.", date: "Data through mid-2025", body: "The most recent solid third-party figures we have, from the HRA Council via a June 2025 Washington Post report, showed ICHRA adoption among large employers up about 34% and the total number of individuals offered ICHRA coverage up roughly 50% to around 450,000 nationally — still a small slice of the roughly 154 million Americans on employer-sponsored insurance, but the fastest-growing slice. More current 2026 estimates put the ICHRA population higher, though we don't have a verified updated figure. Take Command says its own enrollment has grown sharply over the same period; we haven't independently verified that company-specific figure.", ctx: "Rising group-plan costs are the structural tailwind pushing employers toward defined-contribution health models.", url: "https://www.washingtonpost.com/business/2025/06/18/employer-health-insurance-ichra/c09d86f8-4c5c-11f0-8fff-262d6ec54ab9_story.html" },
        { headline: "Raised a $25M growth round.", date: "Sep 2023", body: "For background: Take Command closed a $25 million growth round led by Edison Partners, with LiveOak Venture Partners and SJF Ventures also participating, to build out its ICHRA and QSEHRA administration platform. This is the company's most recent disclosed funding round; we found no more recent capital raise.", ctx: "Capital history worth knowing before a conversation with the company, though it's not new news.", url: "https://www.takecommandhealth.com/blog/series-b" },
      ],
      sources: [
        { label: "Take Command — 2026 ACA premium increases", url: "https://www.takecommandhealth.com/blog/proposed-2026-aca-premium-increases-ichra" },
        { label: "Take Command — Press", url: "https://www.takecommandhealth.com/press" },
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
        { headline: "Closed $12B LS Power acquisition, doubling generation.", date: "Closed Jan 30, 2026", body: "NRG completed its roughly $12 billion purchase of 18 natural-gas-fired power plants (about 13 GW of capacity) plus CPower's commercial-and-industrial virtual-power-plant platform from LS Power, roughly doubling NRG's own generation fleet to about 25.8 GW across nine states. Bloomberg called the deal, first announced in May 2025, 'a window into AI's race for power' — a bet that owning gas plants outright, rather than just signing power-purchase agreements, is the more defensible position as data-center demand grows. NRG is now integrating the acquired fleet's operations, maintenance contracts and trading books, which is the main execution risk to watch through the back half of 2026.", ctx: "The deal reshapes NRG into a scaled generator positioned to serve surging data-center and electrification load.", url: "https://www.bloomberg.com/news/articles/2025-05-12/nrg-energy-acquire-gas-power-assets-from-ls-for-12-billion" },
        { headline: "Reaffirmed 2026 EPS guidance of $7.90–$9.90.", date: "Q1 2026, reported May 6, 2026", body: "Alongside first-quarter results that missed on EPS ($1.48 versus roughly $1.73–$1.78 expected), management held its full-year 2026 adjusted EPS guidance at $7.90–$9.90, pointing to accelerating demand from data centers, electrification and manufacturing. Holding guidance rather than cutting it after a quarterly miss suggests management views the shortfall as integration noise from the LS Power close rather than a weakening of the underlying demand thesis — though the market stayed skeptical of the data-center story once already, when shares fell about 16% in August 2025 on a contract investors judged too small.", ctx: "Reaffirmed guidance steadies the story ahead of the Aug 4 Q2 print despite the Q1 EPS miss.", url: "https://www.investing.com/news/company-news/nrg-energy-q1-2026-slides-reaffirms-guidance-despite-earnings-decline-93CH-4664397" },
        { headline: "Data-center contracts ramping toward 445 MW by 2032.", date: "Ongoing", body: "NRG has signed retail data-center power agreements that start at just 5 MW in 2026 but are contracted to scale to 445 MW by 2032, priced above $80 per megawatt-hour with retail margins exceeding $25 per megawatt-hour — materially richer than NRG's traditional residential and small-business retail-electricity business. The idea is to convert the AI-driven power-demand story into long-dated, contracted cash flow rather than relying on spot-market prices, which is also why owning the LS Power fleet matters: it reduces NRG's exposure to buying wholesale power at a loss if prices spike.", ctx: "Long-dated hyperscaler contracts convert the data-center demand supercycle into predictable cash flow.", url: "https://finance.yahoo.com/news/data-center-growth-lifts-nrg-001234664.html" },
      ],
      sources: [
        { label: "Bloomberg — $12B LS Power deal", url: "https://www.bloomberg.com/news/articles/2025-05-12/nrg-energy-acquire-gas-power-assets-from-ls-for-12-billion", paywall: true },
        { label: "Bloomberg Opinion — AI's power race", url: "https://www.bloomberg.com/opinion/articles/2025-05-13/nrg-energy-deal-is-a-window-into-ai-s-race-for-power", paywall: true },
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
        { headline: "Operating as one firm after the Moss Adams combination.", date: "PE deal 2024; merger 2026", body: "Baker Tilly's national push began in 2024, when Hellman & Friedman and Valeas Capital Partners paid roughly $1 billion for just over 50% of the firm — at the time the largest private-equity investment in a U.S. accounting firm. The deal split the business into Baker Tilly U.S., LLP, a licensed CPA firm handling audit work with no PE ownership (to satisfy auditor-independence rules), and Baker Tilly Advisory Group, LP, holding the tax and consulting business PE actually invested in. The subsequent combination with Moss Adams added to that base, and the firm is targeting several billion dollars of revenue by decade's end.", ctx: "Creates the scale to compete nationally against the largest advisory platforms and win larger enterprise mandates.", url: "https://www.bakertilly.com/baker-tilly-moss-adams-now-one" },
        { headline: "Eric Miles took the CEO seat.", date: "Jan 2026", body: "Former Moss Adams CEO Eric Miles became CEO of the combined firm, succeeding Jeff Ferro, who remains on the board. Giving the acquired firm's chief executive the top job, rather than folding Moss Adams into Baker Tilly's existing structure, signals how much weight Moss Adams carries in the merged entity's go-forward strategy.", ctx: "Leadership continuity from the acquired firm underscores Moss Adams' weight in the merged entity's strategy.", url: "https://www.consulting.us/news/12810/baker-tilly-appoints-eric-miles-as-chief-executive-officer" },
        { headline: "Named a new senior leadership team.", date: "2026", body: "Fred Massanova was named North American Managing Principal and COO, Rebecca Pomering became Chief Growth Officer, and Michael Herman joined as Chief Digital and Information Officer reporting directly to the CEO — a newly created seat. Putting a dedicated digital and AI executive in the C-suite, rather than under a traditional CIO further down the chain, suggests Baker Tilly sees modernizing audit and advisory delivery through AI as a competitive lever for winning larger clients from the Big Four.", ctx: "The elevation of a digital/AI chief signals technology transformation as a core competitive lever.", url: "https://www.bakertilly.com/news/baker-tilly-announces-new-senior-leadership-team" },
        { headline: "Spun off wealth unit as Threadline Wealth.", date: "Mar 2026", body: "The legacy Moss Adams wealth-management business was carved out as an independent registered investment adviser called Threadline Wealth, backed by Cynosure Group and managing roughly $5.8 billion in client assets. Divesting wealth management lets Baker Tilly concentrate its integration effort on the core audit, tax and advisory lines the Moss Adams deal was actually built around.", ctx: "Portfolio pruning sharpens Baker Tilly's focus on core audit, tax, and advisory as it integrates the merger.", url: "https://www.accountingtoday.com/news/moss-adams-spins-off-wealth-management-unit-after-baker-tilly-deal" },
      ],
      sources: [
        { label: "Baker Tilly — now one firm", url: "https://www.bakertilly.com/baker-tilly-moss-adams-now-one" },
        { label: "Baker Tilly — leadership team", url: "https://www.bakertilly.com/news/baker-tilly-announces-new-senior-leadership-team" },
        { label: "Consulting.us — CEO appointment", url: "https://www.consulting.us/news/12810/baker-tilly-appoints-eric-miles-as-chief-executive-officer" },
        { label: "Accounting Today — wealth spin-off", url: "https://www.accountingtoday.com/news/moss-adams-spins-off-wealth-management-unit-after-baker-tilly-deal", paywall: true },
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
        { headline: "$735M of E-Pod orders booked.", date: "Q4 2025, reported Feb 2026", body: "Regal Rexnord booked about $735 million in orders for its plug-and-play E-Pod power system — a modular, factory-built power and switchgear unit that lets data-center developers add capacity faster than building custom electrical infrastructure on-site. Initial E-Pod shipments are expected to begin in early 2027. Regal Rexnord executives have said the data-center product line alone could grow into roughly a $1 billion revenue business.", ctx: "Positions Regal Rexnord as a direct beneficiary of the AI data-center capex cycle; the business could reach ~$1B in revenue.", url: "https://biztimes.com/regal-rexnord-secures-735-million-worth-of-orders-for-new-data-center-product/", paywall: true },
        { headline: "Automation & Motion Control orders up 34%.", date: "Q1 2026, reported May 2026", body: "The segment housing the data-center business, Automation & Motion Control, saw orders up more than 34% in the first quarter of 2026, aided by data centers among other end markets. Separately, food & beverage and general industrial demand — two markets that had been soft for several quarters as customers worked down excess inventory — are showing early signs of recovery. A broader industrial recovery on top of the data-center tailwind would reduce the company's reliance on a single hot end market.", ctx: "A wider industrial recovery would de-risk the second half.", url: "https://www.sahmcapital.com/news/content/regal-rexnord-rrx-data-center-wins-put-its-valuation-back-in-focus-2026-07-03" },
      ],
      sources: [
        { label: "Sahm Capital — data-center wins", url: "https://www.sahmcapital.com/news/content/regal-rexnord-rrx-data-center-wins-put-its-valuation-back-in-focus-2026-07-03" },
        { label: "BizTimes — $735M orders", url: "https://biztimes.com/regal-rexnord-secures-735-million-worth-of-orders-for-new-data-center-product/", paywall: true },
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
        { headline: "Portfolio reshaping via bolt-on M&A.", date: "2026", body: "Vulcan completed the divestiture of its California ready-mixed concrete operations and used the proceeds, alongside fresh capital, to acquire Brannan Sand & Gravel's southern Colorado and Dallas-Fort Worth assets, including a rail-connected quarry in Lamar, Colorado. The logic behind both moves is the same: aggregates — the crushed stone, sand and gravel that go into virtually every road, bridge and building foundation — carry materially higher margins than downstream ready-mix concrete because local quarry ownership creates a de facto regional monopoly (aggregates are heavy and expensive to ship, so whoever owns the nearest quarry has pricing power). Exiting California ready-mix while buying rail-connected quarry capacity in fast-growing Sun Belt and mountain-west markets sharpens Vulcan's focus on the highest-margin, most defensible part of its business.", ctx: "Sharpens focus on higher-margin aggregates and expands reach into high-growth Sun Belt and mountain-west markets.", url: "https://www.investing.com/news/company-news/vulcan-materials-completes-california-exit-colorado-acquisition-93CH-4730425" },
        { headline: "Full-year guidance reaffirmed on a strong Q1.", date: "Q1 2026, reported May 2026", body: "First-quarter 2026 revenue rose 7% year over year to $1.76 billion, with aggregates-segment gross profit up 12% to $400 million and gross margin expanding 90 basis points to 27.6%, driven by aggregates shipments up 5%, asphalt-mix volume up 2%, and ready-mixed concrete up 6%, alongside freight-adjusted pricing gains of roughly 4% on a mix-adjusted basis. Management reaffirmed full-year 2026 adjusted EBITDA guidance of $2.4–$2.6 billion and flagged additional growth projects and bolt-on acquisitions ahead, while the board declared a $0.52-per-share quarterly dividend. Federal infrastructure spending under the $1.2 trillion Infrastructure Investment and Jobs Act continues to fund highway, bridge and road projects that consume aggregates, a multi-year public-spending tailwind behind the Street's broadly bullish view of the stock — though we don't have a verified figure for exactly what share of that spending is aggregates-related.", ctx: "Stable outlook and disciplined capital returns underpin the Street's overall Buy rating (avg. target ~$327).", url: "https://stockstory.org/us/stocks/nyse/vmc/news/buy-or-sell/vulcan-materials-vmc-buy-sell-or-hold-post-q1-earnings" },
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
        { v: "6.54%", l: "30Y fixed (Jul 8)", dir: "up" },
        { v: "~$372M", l: "Market cap", dir: null },
        { v: "Early Aug", l: "Q2 report", dir: null },
      ],
      items: [
        { headline: "Rates rebound off seven-week lows, pressuring purchase demand.", date: "Week of Jul 8, 2026", body: "After Freddie Mac's 30-year average dipped to 6.43% for the week ending July 2, Bankrate's national 30-year average climbed back to 6.54% by July 8, up from the 2026 low of 6.09% reached earlier in the year. loanDepot's origination volume and gain-on-sale margins move closely with rate direction — Q1 revenue fell 8% to $286 million on the same rate volatility, with originations at $7.7 billion and pull-through-weighted gain-on-sale margin slipping to 2.71%. Every basis point the 30-year rate moves changes how many homeowners have an incentive to refinance and how much buyers can afford, which is why the company's results are unusually tied to a macro variable it doesn't control.", ctx: "loanDepot's origination volume and gain-on-sale margins track rate direction closely; Q1 revenue fell 8% to $286M on rate volatility.", url: "https://www.bankrate.com/mortgages/todays-rates/mortgage-rates-for-wednesday-july-8-2026/" },
        { headline: "Q2 setup: first clean read on North Star and wholesale.", date: "Ahead of early-Aug report", body: "The coming print will be the first full quarter to reflect the $100 million ATM equity program, the return to wholesale origination (loanDepot re-entered the wholesale channel in early 2026, about three and a half years after exiting it), and Project North Star cost discipline — a turnaround plan first laid out in November 2024, built around first-time homebuyers, purchase-lending partnerships, servicing-retention scale, and operating-leverage improvements to cut loan turn times. Watch two figures: the consumer-direct refinance recapture rate (73% in Q1) and total expenses ($342 million in Q1, with marketing spend down about 12% versus Q4 2025). The company also struck a partnership with Figure Technology Solutions aimed at lowering production costs and speeding loan closings.", ctx: "Management has framed North Star around purchase lending, servicing retention, operating leverage and talent as the path back to profitability.", url: "https://www.housingwire.com/articles/loandepot-returns-to-profitability-announces-new-strategic-plan/" },
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
        { headline: "Guidance raised a second time this fiscal year.", date: "Q2 FY26, reported May 2026", body: "Management lifted FY2026 organic growth guidance to 5–9% and adjusted EPS guidance to $12.50–$13.10, the second upward revision of the fiscal year — unusual for an industrial company in a mixed global manufacturing environment. CEO Blake Moret pointed to reshoring as part of the strength, telling CNBC the company was 'seeing optimism around the focus on American manufacturing.' (That's from a CNBC video interview; we're going by its published headline and summary, not a transcript, so treat the exact wording as approximate.)", ctx: "A rare mid-year double raise underscores confidence in order momentum and pricing.", url: "https://www.cnbc.com/video/2026/05/05/rockwell-automation-ceo-blake-moret-were-seeing-optimism-around-the-focus-on-american-manufacturing.html" },
        { headline: "Margins and cash flow expand sharply.", date: "Q2 FY26, reported May 2026", body: "Pre-tax margin climbed to 19.7% from 14.9% a year earlier, enterprise operating margin reached 22.5%, and free cash flow surged 61% year over year to $275 million — a profitability step-up that's coming disproportionately from Rockwell's growing mix of recurring software and services revenue (subscriptions and long-term service contracts) layered on top of its traditional hardware sales, since software carries substantially higher margin than shipping physical controllers and drives. That mix shift is the main reason the market is willing to pay a premium multiple for Rockwell relative to purely hardware-driven industrial peers.", ctx: "Cost discipline and mix are converting revenue growth into outsized profitability.", url: "https://stockstory.org/us/stocks/nyse/rok/news/buy-or-sell/rockwell-automation-rok-buy-sell-or-hold-post-q1-earnings" },
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
        { headline: "AI agents scaling fast.", date: "As of mid-2026", body: "Roughly 4,000 customers now use at least one of Workday's organic AI agents, and AI-related annual contract value grew more than 200% year over year, aided by integrations with Sana (an AI-native learning and knowledge platform Workday acquired) and Paradox (conversational-AI recruiting). Workday entered 2026 in the middle of a punishing stretch for its stock, and management's core argument to investors is that AI-agent adoption inside HCM and financials workflows — not just cost-cutting — is what reaccelerates subscription revenue growth from here.", ctx: "AI monetization is the core bull thesis for reaccelerating subscription growth.", url: "https://www.quiverquant.com/news/Workday+Shares+Climb+as+Investors+Reassess+Earnings+Strength+and+AI+Product+Momentum" },
        { headline: "Two rounds of job cuts, different framing.", date: "2025 cut and Feb 2026 cut", body: "Workday cut about 8.5% of its workforce, roughly 1,750 roles, in 2025, framing that reduction explicitly around automating functions with AI. It followed with a smaller cut of about 400 customer-support jobs in February 2026, which the company and Bloomberg's reporting describe as reallocating resources to priority areas rather than an AI-specific move — worth not conflating the two. Full-year non-GAAP operating-margin guidance is 30.5%. Workday is also defending a federal lawsuit alleging its AI-powered job-screening tools produced discriminatory hiring outcomes; it denies the claims, saying the technology evaluates only job qualifications and doesn't make hiring decisions itself. For context, AI was cited as a factor in roughly 40% of announced U.S. job cuts by May 2026, up from about 7% in January — Workday's own reductions sit inside that broader pattern.", ctx: "The efficiency drive aims to prove AI leverage on its own P&L, not just customers'.", url: "https://www.bloomberg.com/news/articles/2026-02-04/workday-to-cut-about-400-employees-focused-on-customer-support" },
      ],
      sources: [
        { label: "Bloomberg — Workday cuts 400 jobs", url: "https://www.bloomberg.com/news/articles/2026-02-04/workday-to-cut-about-400-employees-focused-on-customer-support", paywall: true },
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
        { headline: "da Vinci 5 rollout accelerating.", date: "Q1 2026, reported Apr 2026", body: "First-quarter 2026 revenue rose 23% to $2.77 billion, with combined da Vinci and Ion procedure volume up 17% and the company placing 431 new systems in the quarter, 232 of them the next-generation da Vinci 5. The da Vinci 5, FDA-cleared in March 2024, is the first in the line with force-sensing capability — surgeons can feel resistance through the instruments in a way earlier da Vinci generations couldn't replicate, since previous systems transmitted no tactile feedback at all — and it already made up about 85% of U.S. system placements in the most recent quarter. Because Intuitive makes most of its money on a razor-and-blade model (selling or leasing the system, then earning recurring revenue on the disposable instruments and service contracts used in every procedure), each da Vinci 5 placement effectively locks in years of high-margin follow-on revenue.", ctx: "Next-gen platform adoption drives high-margin recurring instrument and service revenue.", url: "https://www.sec.gov/Archives/edgar/data/0001035267/000103526726000029/q126ex-991earningsrelease.htm" },
        { headline: "Procedure guidance raised despite tariff pressure.", date: "Q1 2026, reported Apr 2026", body: "Intuitive lifted its full-year 2026 da Vinci procedure-growth outlook to 13.5%–15.5% and guided non-GAAP gross margin of 67.5%–68.5%, even as management has flagged that tariffs could weigh on results later in the year — a concern that has kept the stock trading well below its 52-week high despite the strong underlying procedure growth. Procedure volume, not system placements, is the metric that ultimately matters most for the long-term thesis, since it's what drives the recurring instrument and service revenue that makes up the bulk of Intuitive's profit once a hospital already owns a system.", ctx: "Procedure volume is the primary long-term value driver for the razor-and-blade model.", url: "https://www.forbes.com/sites/greatspeculations/2026/04/23/the-biggest-takeaway-from-isrg-earnings/" },
      ],
      sources: [
        { label: "Forbes — ISRG earnings takeaway", url: "https://www.forbes.com/sites/greatspeculations/2026/04/23/the-biggest-takeaway-from-isrg-earnings/", paywall: true },
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
