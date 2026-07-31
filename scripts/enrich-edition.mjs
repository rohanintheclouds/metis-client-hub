#!/usr/bin/env node
/**
 * Editorial pass for the 2026-07-27 edition (supersedes enrich-glances.mjs).
 *
 * Grounding: every news fact below comes from the fetched corpus (article
 * snippets, opening paragraphs, SEC filing metadata, market stats gathered by
 * scrape.mjs on 2026-07-30). Stable company background (business model,
 * segment mix) comes from the roster and the seeded archive. Nothing is from
 * model memory.
 *
 * Once ANTHROPIC_API_KEY is set, scrape.mjs writes this automatically each
 * week and this script retires.
 *
 * Run: node scripts/enrich-edition.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const WK = "2026-07-27";
const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "generated-pulse.json");

// Items to remove: duplicates, false positives, and low-value SEO pieces.
const DROPS = {
  "lumen-technologies": ["Backflipt", "stock price, news, quote"],
  adp: ["44% Five Year Run"],
  ukg: ["IIM Ahmedabad"],
  "nrg-energy": ["GF Score"],
  "baker-tilly": ["Council weighs", "Austin spirits", "Lancs expert"],
  loandepot: ["GF Value", "loanDepot to open Miami corporate center in September", "LoanDepot Expands to Miami - Orange County"],
  "rockwell-automation": ["New Berlin OKs zoning"],
  workday: ["trending stock", "CXMT"],
};

// Expanded bodies + "why it matters" lines, matched by headline substring.
const EDITS = {
  aflac: [
    {
      match: "8-K filed 2026-06-30",
      body: "Aflac published an 8-K under Item 8.01, the catch-all for voluntary disclosures a company deems material to shareholders, dated to the end of June and available on EDGAR. Voluntary 8.01 filings are worth opening precisely because they are unscheduled: they carry whatever management decided could not wait for the next quarterly report.",
      ctx: "Unscheduled disclosures are often the earliest primary-source signal of events that later dominate the narrative.",
    },
    {
      match: "10% Above Fair Value",
      body: "With the stock closing at $129.55 near the very top of its $96.95 to $130.22 52-week range, and returns positive over the past month, three months, and year, valuation commentary has turned cautious: one widely-circulated analysis pegs the shares as roughly 10% above fair value on shrinking revenue views. The tension is a familiar one for Aflac, whose supplemental-insurance model produces dependable capital returns but limited top-line growth, so the multiple does the heavy lifting when sentiment is strong.",
      ctx: "A stock priced for perfection raises the stakes on every operational headline, including the breach disclosure below.",
    },
    {
      match: "hackers stole bank details",
      body: "Aflac disclosed that hackers broke into systems at its Japanese subsidiary and accessed bank-account details belonging to 4.38 million customers, reporting the incident to regulators in a Form 8-K. The location makes this more serious than a typical breach headline: Aflac Japan is the company's profit engine, contributing roughly two-thirds of consolidated earnings, and this is the second major cyber incident to hit the company after the June 2025 Scattered Spider intrusion into its U.S. network. Japanese financial regulators take customer-data protection seriously, and bank-account details are more directly monetizable than the claims data exposed last time.",
      ctx: "For a company whose product is a promise to pay at the worst moment, repeated breaches strike at brand trust in its most important market, and remediation spending tends to become transformation budget.",
    },
    {
      match: "WNBPA",
      body: "On a lighter note, Aflac expanded its partnership with the WNBA players' association, adding a tiered structure of increased supplemental prize awards for players competing in the Friday events of All-Star Weekend in Chicago. The deal extends Aflac's long-running strategy of high-visibility sponsorships that keep the duck brand in front of consumers who never think about supplemental insurance until enrollment season.",
      ctx: "Brand spend aimed at younger audiences signals where Aflac sees its next generation of worksite customers.",
    },
  ],
  "ford-credit": [
    {
      match: "10-Q filed 2026-07-29",
      body: "Ford Motor Credit filed its own 10-Q for the quarter ended June 30, a day after the parent's results. The finance arm's quarterly is the primary source on the metrics that matter most for this account: the size and credit quality of the loan and lease book, funding costs, and lease residual assumptions, none of which get more than a summary line in the parent's release.",
      ctx: "The 10-Q is where to verify how the captive's funding-cost story is evolving as the industrial-bank plan progresses.",
    },
    {
      match: "8-K filed 2026-07-28",
      body: "The 8-K under Items 2.02 and 9.01 is the formal wrapper for Ford's second-quarter 2026 earnings release, filed July 28. Item 2.02 designates results of operations, meaning the exhibit attached under 9.01 is the full press release with the quarter's financials.",
      ctx: "Anchor document for the week: everything else in this edition orbits the Q2 print.",
    },
    {
      match: "MARIA GRAZIA DAVINO",
      body: "Ford named Maria Grazia Davino Vice President of Sales for Ford of Europe, announced through a formal company disclosure carried by the Financial Times. Sales leadership changes in Europe land at a sensitive moment: the region is where Ford has been restructuring hardest, and where this week's Geely partnership (below) redraws the product plan.",
      ctx: "New sales leadership plus a new production alliance suggests Europe strategy is actively in motion, worth tracking for org-design implications.",
    },
    {
      match: "Second-Quarter 2026 Financial Results",
      body: "Ford published its second-quarter 2026 results on July 28 via Business Wire, with the details in the 8-K exhibit above. The print matters double for this account: Ford Credit's earnings contribution and the parent's volume and pricing trajectory both flow from it, and the quarter is the first full one since the FDIC cleared the Ford Credit Bank industrial charter that promises cheaper deposit funding for the lending book.",
      ctx: "Read the captive-finance segment commentary first: funding costs and credit performance drive Ford Credit's story more than vehicle volumes do.",
    },
    {
      match: "GEELY",
      body: "Ford and Geely, the Chinese group that also controls Volvo Cars, announced they will join forces in Europe to produce next-generation multi-energy vehicles in Spain. For Ford of Europe this is a significant strategic turn: sharing production with a Chinese partner on multi-energy platforms is the kind of capital-light arrangement Western automakers are increasingly reaching for as they balance EV investment against soft European demand.",
      ctx: "Partnership structures like this reshape the manufacturing footprint and supplier web that Ford Credit ultimately finances.",
    },
  ],
  "lumen-technologies": [
    {
      match: "Q2 Earnings",
      body: "Lumen heads into its second-quarter print with the bull and bear cases in unusually sharp relief. Earnings previews frame the quarter around momentum in the AI-driven Private Connectivity Fabric business and Network-as-a-Service adoption on one side, against continued legacy revenue declines and a heavy debt load on the other. The stock trades at $6.49, down about 16% year to date and far below the 52-week high of $11.95, so the market is waiting for evidence that the AI-infrastructure pivot can outrun the copper-era erosion.",
      ctx: "The PCF pipeline is the number to watch: it is the proof point for the entire repositioning story our engagement supports.",
    },
  ],
  adp: [
    {
      match: "8-K filed 2026-07-29",
      body: "ADP's 8-K under Items 2.02 and 9.01 formally delivers the fiscal fourth-quarter and full-year 2026 results release to the SEC. As always with ADP, the release doubles as a macro artifact: the company pays one in six U.S. private-sector workers, so its pays-per-control and bookings commentary is read as a labor-market signal well beyond the HCM industry.",
      ctx: "Primary source for the FY2027 guidance that framed the week's trading.",
    },
    {
      match: "Beat Expectations",
      body: "ADP closed its fiscal year strong: fourth-quarter and full-year 2026 results exceeded consensus expectations on both revenue and earnings, and the company introduced its fiscal 2027 outlook alongside the print. The debate immediately shifted to valuation, with commentary asking whether a stock that has compounded steadily for years was already pricing in the beat, a question sharpened by shares still trading mid-range on the year at around $263.",
      ctx: "Strong prints keep transformation budgets healthy; the valuation debate matters mainly to how aggressively management invests the surplus.",
    },
    {
      match: "Earnings Call Transcript",
      body: "The fiscal Q4 call on July 29 featured CEO Maria Black and CFO Peter Hadley walking through the quarter, with the full transcript now public. Analyst attention on the call spanned the usual ADP battlegrounds: Employer Services bookings, PEO momentum, and what the fiscal 2027 outlook embeds for client-funds interest income as rates drift.",
      ctx: "The call transcript is the richest single source for management's own framing of FY27 priorities, useful ahead of any engagement-planning conversation.",
    },
    {
      match: "stock gains after Q4",
      body: "The market's verdict on the print was immediate: ADP stock climbed 5.2% in Wednesday morning trading after the stronger-than-expected fiscal Q4 earnings and the introduction of solid FY2027 guidance, before giving back some of the pop in the following session. That pattern, an enthusiastic open faded by profit-taking, is the classic signature of a good report meeting already-high expectations.",
      ctx: "Post-earnings strength confirms investor confidence in the multi-year HCM demand story ADP is riding.",
    },
  ],
  ukg: [
    {
      match: "Multi-Country Payroll",
      body: "The only UKG-adjacent items to cross the wire this week were third-party market-research promotions, this one sizing the multi-country payroll solutions market in which UKG competes alongside ADP, Workday, and regional specialists. No first-party UKG news was fetched from any channel this week.",
      ctx: "A quiet week from a private company is normal; the interesting signal was next door, where rival ADP posted its fiscal-year beat.",
    },
    {
      match: "Bundled Pay Management",
      body: "A second market-research promotion projected the bundled pay-management software category expanding to $7.29 billion through 2030. Category-sizing PR is thin evidence on its own, but the steady drumbeat of pay-tech market reports reflects where HCM vendors, UKG included, are concentrating product investment.",
      ctx: "Pay and workforce-management convergence is the competitive backdrop for UKG's Pro and Ready roadmaps.",
    },
  ],
  "generac-power-systems": [
    {
      match: "8-K filed 2026-07-29",
      body: "Generac's 8-K under Items 2.02 and 9.01 carries the second-quarter earnings release into the record, the formal companion to the blowout numbers that dominated the week.",
      ctx: "Primary source for the quarter's segment detail behind the headlines below.",
    },
    {
      match: "pivots toward data centers",
      body: "The Milwaukee Business Journal reported that Generac is accelerating the opening of an area plant and evaluating additional sites for its data-center unit as hyperscale orders reach $1 billion. This is the structural story underneath the quarter: a company built on residential standby generators is standing up industrial-scale capacity to serve AI data-center backup power, a segment that barely existed in its mix two years ago.",
      ctx: "Capacity decisions are being made now; operating-model and supply-chain implications follow close behind for any engagement.",
    },
    {
      match: "Undervalued On Its Q2",
      body: "Even after the print, valuation commentary asked whether the stock remains undervalued given the earnings beat and a reaffirmed full-year net sales growth outlook. The shares are up roughly 37% year to date at $192.69 but remain far below the 52-week high of $296, so the market is still discounting how durable the data-center order surge will prove.",
      ctx: "The valuation gap between the AI-power narrative and the residential-generator history is exactly where strategy work earns its keep.",
    },
    {
      match: "Q2 2026 Earnings",
      body: "The numbers were emphatic: $2.91 in adjusted EPS against a $2.01 consensus, a beat of roughly 45%, with the data-center backup-power business surging 29% and backlog reaching $1.6 billion. Beats of this magnitude are rare for an industrial with Generac's profile and reflect demand arriving faster than the Street modeled.",
      ctx: "Backlog of $1.6B gives unusual revenue visibility; the execution question shifts from demand to delivery.",
    },
    {
      match: "Jagdfeld",
      body: "CEO Aaron Jagdfeld took the story to CNBC's Squawk Box, discussing the quarter, the economics of powering AI data centers, and the growth outlook. When a mid-cap industrial CEO gets a national morning-show slot, the narrative has crossed from sector coverage into the mainstream AI-infrastructure conversation.",
      ctx: "Management is actively repositioning the company's public identity around AI power, a shift worth mirroring in how we frame engagement value.",
    },
  ],
  "nrg-energy": [
    {
      match: "8-K filed 2026-07-15",
      body: "NRG's most recent primary-source item is a July 15 8-K under Item 8.01, the voluntary-disclosure category, published on EDGAR ahead of the upcoming earnings print.",
      ctx: "Worth opening: unscheduled disclosures from utilities often concern capacity auctions, regulatory matters, or portfolio moves.",
    },
    {
      match: "ascends while market falls",
      body: "In one notable session this week NRG rose 2.15% to $142.99 while the S&P 500 fell 1.21% and the Dow lost about 1%, the kind of counter-tape strength that suggests investors treating the name defensively. The bigger picture is less kind: at $134 the stock is down roughly 19% year to date, well off its 52-week high of $190.",
      ctx: "Counter-market sessions hint at rotation into power names on AI-demand narratives, a theme NRG's generation fleet sits squarely inside.",
    },
    {
      match: "Earnings Expected to Grow",
      body: "Preview coverage flagged NRG as a company whose earnings are expected to grow into the upcoming report, positioning the print as the near-term catalyst for a stock that has lagged all year.",
      ctx: "Expectations are being set publicly; the quarter will test whether the retail-plus-generation model converts power demand into margin.",
    },
    {
      match: "Mid-Atlantic Capacity",
      body: "Morningstar flagged that Mid-Atlantic capacity-market prices are heightening regulatory concerns. Capacity auctions in that region have produced dramatic price outcomes as data-center demand collides with tight supply, and when capacity prices spike, political and regulatory scrutiny of generators like NRG reliably follows.",
      ctx: "Regulatory response to capacity pricing is a genuine strategic risk vector, worth a standing line in any NRG engagement radar.",
    },
  ],
  "baker-tilly": [
    {
      match: "largest takeover in a generation",
      body: "The Financial Times reported that Grant Thornton sealed the accounting sector's largest takeover in a generation. For Baker Tilly, itself the product of a landmark PE-backed combination with Moss Adams, the deal confirms that scale consolidation among mid-tier firms is not slowing: the firms directly flanking it in the league table are getting bigger, faster.",
      ctx: "Every major rival combination resets the competitive math on talent, technology investment, and client coverage that drives Baker Tilly's own strategy agenda.",
    },
    {
      match: "CBIZ in $5 billion",
      body: "Reuters put numbers on it: Grant Thornton Advisors agreed to buy CBIZ in a $5 billion deal that expands its US accounting reach. The transaction consolidates two sizable players squarely in the middle market where Baker Tilly competes for both clients and acquisition targets, and it extends the run of private-equity-fueled dealmaking that has been redrawing the sector since 2024.",
      ctx: "A $5B competitor combination shrinks the acquisition pipeline and raises the bar on integration capability, both core themes for our work with the firm.",
    },
  ],
  "regal-rexnord": [
    {
      match: "Fairly Priced As Cash Flow",
      body: "The week's only substantive coverage was analytical: Regal Rexnord has returned 58.8% over the past five years, and a discounted-cash-flow read now pegs the stock as roughly fairly priced as cash flow holds up. The shares trade near $202, up about 38% year to date and well off the 52-week low of $128, a strong run for the motors, gearing, and actuator portfolio. Notably, that same portfolio appears in four component categories of Morgan Stanley's Humanoid 100 mapping of the humanoid-robot value chain (see the Market Insights tab).",
      ctx: "A fairly-valued stock after a 38% run means the next leg depends on new demand narratives, and humanoid-robotics exposure is the freshest one available.",
    },
  ],
  "vulcan-materials": [
    {
      match: "10-Q filed 2026-07-29",
      body: "Vulcan filed its 10-Q for the June quarter on July 29, the same day as the results 8-K, putting the full financial detail behind the earnings release into the record.",
      ctx: "Segment-level pricing and volume detail lives here, not in the press release.",
    },
    {
      match: "8-K filed 2026-07-29",
      body: "The results 8-K under Items 2.02 and 9.01 delivers the second-quarter earnings release, the formal companion to the beat covered below.",
      ctx: "Anchor filing for the week.",
    },
    {
      match: "Reaffirms 2026 Outlook",
      body: "Vulcan, the largest U.S. producer of construction aggregates, reported second-quarter revenue of $2.16 billion, up from $2.10 billion a year earlier, with net earnings edging higher to $323.4 million and adjusted diluted EPS rising to $2.59 from $2.45. Management reaffirmed its 2026 outlook, with infrastructure projects continuing to drive aggregates growth from its 400-plus quarries.",
      ctx: "Reaffirmed guidance on public-works demand supports the multi-year infrastructure thesis underpinning this account.",
    },
    {
      match: "Beat Estimates, Stock Up",
      body: "The quarter beat consensus on both earnings and revenue, with pricing gains, higher aggregates volumes, and cost control offsetting energy inflation, and the stock rose on the print. Price-over-volume discipline has been Vulcan's signature: local scarcity and freight economics give aggregates unusual pricing power even when volumes wobble.",
      ctx: "Pricing power plus cost control is the operating playbook; the beat validates it for another quarter.",
    },
  ],
  loandepot: [
    {
      match: "Come To NEXA",
      body: "NEXA Mortgage CEO Mike Kortas publicly courted loanDepot's loan officers in a social-media post that called the company a \"sinking ship\" while promoting NEXA's recruiting package, an unusually open raid given that the two companies remain embroiled in litigation. Loan officers are the revenue-producing asset in retail mortgage, and public poaching campaigns tend to accelerate exactly when a target's stock price makes equity-based retention hardest.",
      ctx: "Talent flight risk is now a public storyline; retention economics belong on the radar for any loanDepot operating-model conversation.",
    },
    {
      match: "Miami Corporate Center",
      body: "loanDepot announced plans to open a new corporate center in Miami, expanding its national footprint with a strategic hub supporting technology, marketing, recruiting, and mortgage fulfillment across channels, with coverage indicating a September 2026 opening. Against a stock trading around $1.01, down more than half this year, footprint moves read as part of the broader Vision 2027 cost-and-growth reset rather than expansion for its own sake.",
      ctx: "Where the company concentrates technology and fulfillment capacity signals which parts of the Vision 2027 plan have real budget behind them.",
    },
  ],
  "rockwell-automation": [
    {
      match: "Seeking Clues",
      body: "Street previews are building toward Rockwell's fiscal third-quarter print, with analysts looking past the headline estimates toward the key operating metrics, segment organic growth, margins, and order intake, that will reveal whether the industrial-automation demand recovery is broadening. The stock enters the report near its 52-week high at $473, up about 19% year to date.",
      ctx: "A stock at highs into earnings means expectations are loaded; the order-intake commentary matters more than the EPS line.",
    },
    {
      match: "New Berlin council approves",
      body: "New Berlin's council approved the zoning and land-use changes for Rockwell's proposed $200 million-plus facility, clearing the project to proceed despite neighbor opposition. The plans describe an 830,000-square-foot facility with a possible 425,000-square-foot second phase, a major capacity commitment in Wisconsin that lands squarely in the reshoring wave Rockwell both rides and enables.",
      ctx: "A physical-capacity bet of this scale is a statement about multi-year demand conviction, useful context for any growth-strategy conversation.",
    },
    {
      match: "Honeywell vs. Rockwell",
      body: "Comparison coverage weighed Honeywell against Rockwell on which industrial-automation stock has greater upside, a framing that reflects how investors now bucket the two as the principal US-listed ways to play factory automation. The rivalry framing matters commercially too: the same comparison happens in customers' vendor-selection processes.",
      ctx: "Competitive positioning versus Honeywell is a live question in both capital markets and customer accounts.",
    },
    {
      match: "SecureOT",
      body: "Rockwell announced that Luminus selected its SecureOT platform to support industrial-cybersecurity resilience, a deployment intended to strengthen operational-technology visibility and risk management across a diverse energy-production environment. OT security is one of the clearest expansion lanes for Rockwell's software-and-services layer beyond its hardware installed base.",
      ctx: "Every SecureOT win validates the sensors-to-software strategy that also earned Rockwell its place in Morgan Stanley's Humanoid 100.",
    },
  ],
  workday: [
    {
      match: "EarnIn",
      body: "EarnIn announced it will integrate its earnings-management tools into Workday's Enhanced Direct Deposit Switching platform, aiming to streamline payroll enrollment and improve data integrity. It is a small partnership with a telling direction: Workday keeps opening its payroll rails to fintech partners, deepening the platform's role as the system of record that everything else must plug into.",
      ctx: "Each payroll-adjacent integration raises switching costs and extends Workday's claim on the paycheck workflow.",
    },
    {
      match: "Software Rebounds on AI Rotation",
      body: "Workday jumped 10% in a single session as enterprise software staged one of its sharpest reversals of the year, with Salesforce up 7% and ServiceNow up 8% alongside. Notably, coverage attributed the move less to the companies' own fundamentals than to a rotation into software as the AI trade broadened, a reminder of how much of Workday's tape action is currently macro-thematic. Even after the pop, the stock remains down about 24% year to date.",
      ctx: "Sentiment toward AI-era software is the swing factor on the stock right now, more than quarter-to-quarter execution.",
    },
    {
      match: "Mobley",
      body: "Courts have begun reaching the merits of the first wave of AI-discrimination cases, and Mobley v. Workday is the bellwether: the class action alleges Workday's AI-driven hiring tools, including HiredScore AI and Candidate Skills Match, discriminated on the basis of race, age, and disability. The court has conditionally certified an Age Discrimination in Employment Act class covering applicants aged 40 and over whose applications were processed by Workday's AI recommendation system since September 2020, and has allowed a California FEHA claim to proceed. HR-industry legal analysis calls the case far-reaching for any employer deploying AI in hiring.",
      ctx: "This case shapes the compliance envelope for AI-in-HR everywhere, directly relevant to Workday's product roadmap and to every client deploying AI hiring tools.",
    },
  ],
  "intuitive-surgical": [
    {
      match: "8-K filed 2026-07-27",
      body: "Intuitive filed an 8-K under Items 5.03 and 9.01 on July 27. Item 5.03 designates amendments to articles of incorporation or bylaws, making this the formal record of the governance overhaul covered below.",
      ctx: "The filing itself defines exactly what changed in shareholder rights; the commentary interprets it.",
    },
    {
      match: "10-Q filed 2026-07-21",
      body: "The second-quarter 10-Q, filed July 21, carries the full detail behind the earnings story: procedure volumes, system placements, and the recurring instruments-and-services revenue that drives the razor-and-blade model.",
      ctx: "Domestic procedure-growth trends, the market's current obsession, are quantified here.",
    },
    {
      match: "Bylaw Changes",
      body: "Intuitive overhauled its bylaws, reshaping how shareholders can nominate directors, submit proposals, and call special meetings, changes formally recorded in the July 27 8-K. The governance tightening arrives while the shares sit near 52-week lows, and at least one valuation analysis argues the stock could be roughly 43% undervalued at these levels, a combination that tends to draw activist and governance-watcher attention.",
      ctx: "Bylaw defenses plus a depressed stock is a pattern worth monitoring: it often precedes shareholder pressure campaigns.",
    },
    {
      match: "post-earnings selloff",
      body: "Intuitive reported strong second-quarter 2026 results, beating consensus on both the top and bottom line, yet the stock plunged on concerns about slowing domestic procedure growth. Procedure volume is the metric the razor-and-blade model lives on: hospitals buying systems matters far less than how often the installed base gets used, so even a modest domestic deceleration reframes the growth story.",
      ctx: "The selloff prices a procedure-growth scare, not a broken model; the distinction is the crux of the investment and strategy debate.",
    },
    {
      match: "Calling for $685",
      body: "The whiplash in expectations is stark: after a fifth consecutive earnings beat, the stock sits at roughly $352, down 37% year to date and near its $328 52-week low, while management has begun buying back shares above current prices and at least one Wall Street analyst maintains a $685 target. The gap between the buyback signal, the analyst view, and the market price frames just how contested the name has become.",
      ctx: "Management buying stock above market is the strongest internal-confidence signal available; the market is calling their bluff on procedure growth.",
    },
  ],
};

// Updated glances where this pass changed the story mix.
const GLANCE_UPDATES = {
  workday:
    "A consequential week beneath a thematic tape: courts began reaching the merits in Mobley v. Workday, the bellwether AI-hiring-discrimination case with a conditionally certified age-discrimination class, while EarnIn announced an integration into Workday's payroll rails. The stock jumped ~10% in a single session as software rebounded on an AI rotation, though it remains down ~24% year to date.",
  "nrg-energy":
    "A watchful week for NRG: a July 15 8-K is the freshest primary-source item, earnings-growth previews are building ahead of the print, and Morningstar flagged Mid-Atlantic capacity-market prices heightening regulatory concerns. Shares showed counter-market strength in one session but sit at ~$134, down about 19% year to date.",
  loandepot:
    "Two very different storylines: loanDepot announced a new Miami corporate center opening September 2026 to house technology, marketing, recruiting, and fulfillment, while NEXA's CEO publicly courted its loan officers, calling the company a \"sinking ship\" amid ongoing litigation between the firms. With shares around $1.01, down over half this year, both stories are really about the same thing: executing Vision 2027 while defending the talent base.",
  "lumen-technologies":
    "A set-up week for Lumen: earnings previews frame the Q2 print around AI-driven Private Connectivity Fabric and NaaS momentum on one side, and legacy revenue declines plus a heavy debt load on the other. The stock trades at $6.49, down roughly 16% year to date, so the quarter's evidence on the AI-infrastructure pivot carries real weight.",
};

const store = JSON.parse(readFileSync(FILE, "utf8"));
let dropped = 0, edited = 0, glanced = 0;
for (const [id, eds] of Object.entries(store.pulse)) {
  const ed = eds[WK];
  if (!ed) continue;
  if (DROPS[id]) {
    const before = ed.items.length;
    ed.items = ed.items.filter((it) => !DROPS[id].some((s) => it.headline.includes(s)));
    dropped += before - ed.items.length;
  }
  for (const patch of EDITS[id] || []) {
    const it = ed.items.find((x) => x.headline.includes(patch.match));
    if (!it) { console.log(`  ⚠ no match for [${id}] "${patch.match}"`); continue; }
    it.body = patch.body;
    it.ctx = patch.ctx;
    edited++;
  }
  if (GLANCE_UPDATES[id]) { ed.glance = GLANCE_UPDATES[id]; glanced++; }
}
writeFileSync(FILE, JSON.stringify(store, null, 2) + "\n");
console.log(`✅ ${edited} items rewritten, ${dropped} dropped, ${glanced} glances updated for ${WK}.`);
