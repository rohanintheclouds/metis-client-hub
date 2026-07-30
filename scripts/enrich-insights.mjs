#!/usr/bin/env node
/**
 * Editorial pass for Market Insights, week 2026-07-27: gives every report a
 * slug, an animated hero theme, and a full Metis brief (sections, figures,
 * charts, Metis angle) for its detail page at /insights/[slug].
 *
 * Grounding: all numbers and claims are transcribed from the fetched article
 * texts (scratch corpus pulled from each firm's page on 2026-07-30). Charts
 * carry only figures stated by the source. The McKinsey entry is thinner
 * because their site blocks non-browser fetches; its brief uses only the RSS
 * summary. Once ANTHROPIC_API_KEY is set, scrape-insights.mjs can automate
 * this weekly.
 *
 * Run: node scripts/enrich-insights.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const WK = "2026-07-27";
const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "market-insights.json");

const DROP_URLS = ["going-green-with-digital-workers"];

const BRIEFS = {
  "The Humanoid 100": {
    slug: "humanoid-100",
    heroTheme: "robot",
  },
  "Mine-to-Magnet": {
    slug: "rare-earths-mine-to-magnet",
    heroTheme: "minerals",
    detail: {
      sections: [
        {
          heading: "What Goldman is saying",
          body: "Goldman's Americas metals-and-mining co-heads, Andrew Timbers and Nicholas Smith, argue that critical minerals now sit at the intersection of electrification, AI-driven power demand, and supply-chain security. What was a quiet industry has become a priority for institutional investors, with deal activity spanning M&A, IPOs, and direct investment from the US government as Washington races to close the gap with China, the global leader in critical minerals and rare earths.",
        },
        {
          heading: "Copper and the data-center bill of materials",
          body: "Copper anchors the story: a single gigawatt-scale data center requires up to 50,000 metric tons for cabling and grid upgrades, and developing a new copper mine can take 15 years or more from discovery to production. That timeline mismatch makes acquiring existing projects the fastest route to supply, so Goldman expects continued consolidation as mining majors buy junior developers. Lithium is back in focus for battery backup that keeps data centers running around the clock.",
        },
        {
          heading: "The mine-to-magnet shift",
          body: "The rare-earth landscape is shifting toward vertical integration: to capture downstream value and bypass processing bottlenecks, companies are pursuing a mine-to-magnet strategy, triggering strategic M&A and joint ventures, some heavily backed by Western governments, targeting heavy rare earths like dysprosium and terbium hit by tightening export restrictions.",
        },
      ],
      figures: [
        { v: "50,000t", l: "Copper per GW-scale data center" },
        { v: "15+ yrs", l: "New copper mine, discovery to production" },
        { v: "US gov't", l: "Now a direct investor in the sector" },
      ],
      charts: [],
      metisAngle:
        "Rare-earth magnets and copper sit inside every electric motor and actuator Regal Rexnord ships, and the same minerals equation shapes Ford's EV cost base through its battery and motor supply chain. For Baker Tilly, a sector where M&A, IPOs, and government-backed joint ventures are accelerating is precisely the deal-advisory demand the piece describes. Supply-chain security has become a board-level strategy topic for every industrial client we serve.",
    },
  },
  "AI transformations": {
    slug: "mckinsey-ai-transformations",
    heroTheme: "network",
    detail: {
      sections: [
        {
          heading: "What McKinsey published",
          body: "McKinsey convened executives from AMD, Dell, Liquid AI, and Mercedes-Benz on how to structure processes with AI in mind. The through-line of the conversation: enterprise-wide AI transformation is about people, not just technology, and companies that redesign processes around AI outperform those that bolt tools onto existing workflows.",
        },
        {
          heading: "A note on sourcing",
          body: "McKinsey's site blocks automated retrieval, so this brief is built from the article's published summary rather than its full text. The full interview is at the source link below.",
        },
      ],
      figures: [],
      charts: [],
      metisAngle:
        "This is the same argument Metis makes in every AI engagement: the operating model, not the model, is the constraint. Workday's positioning (AI agents for the back office) makes it the client most directly in this conversation, and the executive interviews are useful ammunition for change-management discussions with any client whose AI pilots are stuck at the tool stage.",
    },
  },
  "US Housing Market Outlook": {
    slug: "us-housing-outlook",
    heroTheme: "housing",
    detail: {
      sections: [
        {
          heading: "The affordability wall",
          body: "J.P. Morgan Research describes a deepening affordability crisis: median home prices have risen for 36 straight months to an all-time high of $440,600 in July, up 1.8% year over year. The cost-to-income ratio for buying sits at 35%, and buying is cheaper than renting in only about 2% of US metropolitan areas, a historic imbalance between owning and renting economics.",
        },
        {
          heading: "Why supply stays broken",
          body: "Prices stay high because of a chronic shortage of affordable homes rooted in more than a decade of underbuilding since the 2008 financial crisis, compounded by zoning laws, land-use restrictions, and high labor costs. Construction has picked up recently, with parts of the West Coast and Sun Belt even seeing a glut of new homes, but overall inventory remains tight.",
        },
        {
          heading: "Demand is buckling too",
          body: "Affordability is now visibly weighing on volume: existing-home sales fell 2.4% in June to a 4.09 million seasonally adjusted annual rate, down 4.2% over the first half of 2026. The lock-in effect compounds the shortage, since owners holding pandemic-era mortgages cannot carry those rates to a new home with current rates around 6.6%, so listings were up just 1.3% year over year in June. J.P. Morgan's Richard Shane warns origination growth could stall if elevated rates persist, with industry forecasts already moving lower.",
        },
        {
          heading: "The policy response and the forecast",
          body: "The bipartisan 21st Century ROAD to Housing Act, signed July 11 as the most significant federal housing legislation in decades, carries more than 40 supply-side provisions: streamlined environmental reviews, zoning-reform incentives for municipalities, and a potentially consequential change to manufactured-home rules (removing the permanent-chassis requirement). It only takes effect January 7, 2027, and its impact depends on implementation. J.P. Morgan's base case: home prices flat in 2026, up 3% in 2027, with affordability staying strained.",
        },
      ],
      figures: [
        { v: "$440,600", l: "Median US home price, all-time high" },
        { v: "6.6%", l: "Current mortgage rates (lock-in effect)" },
        { v: "-4.2%", l: "Existing-home sales, H1 2026" },
        { v: "~2%", l: "Metros where buying beats renting" },
      ],
      charts: [
        {
          kind: "cat-bars",
          title: "J.P. Morgan home-price forecast (annual change)",
          source: "J.P. Morgan Global Research",
          unit: "%",
          max: 5,
          rows: [["2026 (forecast)", 0], ["2027 (forecast)", 3]],
        },
      ],
      metisAngle:
        "This is loanDepot's operating environment in one page: originations stay suppressed while affordability is this stretched, which is why the company's story is cost reset and channel efficiency rather than volume growth. The ROAD to Housing Act is the variable to watch, and any supply-side thaw changes the demand curve loanDepot's Vision 2027 plan is built against.",
    },
  },
  "$560 Billion Energy Question": {
    slug: "energy-560-billion-question",
    heroTheme: "energy",
    detail: {
      sections: [
        {
          heading: "The end of flat",
          body: "For decades US electricity prices were remarkably stable: efficiency gains, flat demand, and periodic government support kept costs in check. Bain argues that era is over. Utilities' total revenue requirement was an estimated $540 billion in 2025 and is on track to reach $1.1 trillion by 2035, moving from roughly 1.5% of US GDP to 2.5%.",
        },
        {
          heading: "The $560 billion gap",
          body: "Deferred infrastructure investment, regional service gaps, data-center power demand, and the rollback of federal subsidies are hitting at once, leaving utilities facing a $560 billion funding gap. Rate increases alone cannot cover it: operational efficiency and smarter capital deployment address only $60 to $140 billion. The bigger levers are making large new users pay their true cost of service, bringing in outside partners to fund infrastructure, and building the regulatory and public case for value-tied rate increases.",
        },
        {
          heading: "The narrative problem",
          body: "Bain's most consulting-shaped point: utilities have struggled to tell a compelling story. Customers do not connect higher bills to reliability and cleaner energy, or to offsetting savings like cheaper EV charging versus gasoline. Every year of delay steepens the curve and makes the eventual price increases harder for consumers to accept.",
        },
      ],
      figures: [
        { v: "$560B", l: "Utility funding gap to 2035" },
        { v: "1.5%→2.5%", l: "Utility revenue as share of US GDP" },
        { v: "$60-140B", l: "Max gap addressable by efficiency alone" },
      ],
      charts: [
        {
          kind: "cat-bars",
          title: "US utilities' total revenue requirement ($bn)",
          source: "Bain & Company",
          unit: "$bn",
          rows: [["2025 (estimated)", 540], ["2035 (projected)", 1100]],
        },
      ],
      metisAngle:
        "NRG lives on both sides of this equation: rising power demand lifts its generation economics while capacity-price spikes invite the regulatory scrutiny Morningstar flagged this same week. Generac is a direct beneficiary of the reliability anxiety Bain describes, from home standby through its new hyperscale data-center backup business. The cost-allocation fight over large new users is literally a fight about data centers, which also touches Lumen's buildout economics.",
    },
  },
  "Working Capital Strategies": {
    slug: "ai-datacenter-working-capital",
    heroTheme: "datacenter",
    detail: {
      sections: [
        {
          heading: "The growth-liquidity paradox",
          body: "J.P. Morgan describes AI data-center construction as one of the largest capital-expenditure cycles in a generation, with hyperscalers projected to invest a combined $600 billion in 2026. For the industrial suppliers of power, cooling, and infrastructure, the order books are transformative, but the cash mechanics are punishing: manufacturing cycles run 12 to 18 months, inventory is procured earlier and held longer, and revenue recognition hinges on milestone schedules subject to construction and power-infrastructure delays.",
        },
        {
          heading: "The power shift, made explicit",
          body: "J.P. Morgan describes a systematic transfer of working capital upstream: hyperscalers are larger, better capitalized, and increasingly able to dictate terms, expecting guaranteed inventory, reserved capacity, flexible delivery, and extended payment windows. Suppliers procure materials months before purchase orders, absorb construction-delay schedule risk, and extend credit, often without compensation for the capital deployed. The piece's sharpest line: for many suppliers, the constraint is no longer demand, but balance-sheet capacity.",
        },
        {
          heading: "Why early discipline pays",
          body: "Once data-center infrastructure is installed, contracts tend to be long-term, so suppliers that solve the cash-cycle problem early lock in durable returns. Speed and scale of execution become the differentiator, and payment-term flexibility is increasingly a competitive weapon rather than a finance afterthought.",
        },
        {
          heading: "The financing toolkit",
          body: "The piece positions working capital as a strategic and commercial lever, not just treasury hygiene: inventory finance, receivables financing, and core trade solutions let suppliers fund growth without starving operations. The CFO challenge is managing competing priorities: capacity investment, liquidity buffers, and commercial terms that win milestone-driven contracts.",
        },
      ],
      figures: [
        { v: "$600B", l: "Projected hyperscaler capex, 2026" },
        { v: "12-18 mo", l: "Typical data-center equipment manufacturing cycle" },
      ],
      charts: [],
      metisAngle:
        "This is the finance-side mirror of what our industrial clients are living. Generac is standing up data-center backup-power capacity against exactly these milestone-driven order books, and Lumen's Private Connectivity Fabric deals share the same long-cycle cash profile. When a client's growth story runs ahead of its cash conversion, operating-model and working-capital design become the engagement.",
    },
  },
  "Embedded Virtual Card": {
    slug: "embedded-virtual-cards",
    heroTheme: "payments",
    detail: {
      sections: [
        {
          heading: "The pitch",
          body: "J.P. Morgan's payments team argues that supplier payments remain surprisingly manual: disconnected systems, reconciliation burden, and fraud risk. Virtual cards generate a unique card number per transaction with custom controls (spend limits, supplier restrictions, defined usage windows), making payments more secure and automated.",
        },
        {
          heading: "Why 'embedded' is the operative word",
          body: "The value unlock comes from embedding virtual cards inside the ERP and procurement platforms teams already use: payments become part of the workflow rather than a separate step, eliminating screen-switching and duplicate entry, and increasing rebate revenue as card usage grows. J.P. Morgan pairs this with supplier enablement, identifying which suppliers suit card payment and supporting onboarding.",
        },
      ],
      figures: [],
      charts: [],
      metisAngle:
        "The strategic signal is where this lives: inside ERP and procurement platforms. That is Workday's home turf, and the EarnIn integration this same week shows Workday actively opening its payroll and payments rails to partners. For clients weighing finance-transformation roadmaps, embedded B2B payments is becoming a standard module of the stack rather than an add-on.",
    },
  },
  "Agentic AI": {
    slug: "agentic-ai-enterprises",
    heroTheme: "network",
    detail: {
      sections: [
        {
          heading: "Bain's definition",
          body: "Agentic AI is artificial intelligence that pursues a defined goal on its own: planning steps, using tools and systems, and adjusting course as conditions change. Where generative AI gave enterprises copilots that assist a human in control, agentic AI executes complex, multistep, nondeterministic workflows spanning business domains, with minimal human input.",
        },
        {
          heading: "The organizational consequence",
          body: "Bain's core claim is organizational: people become AI supervisors rather than task executors. Agentic AI shifts roles and decision rights, democratizes technical skills, increases employee autonomy, and accelerates decision cycles. Leaders must treat it as a business transformation, marrying business and technology expertise, not a technology rollout, and real ROI comes from business redesign rather than deploying tools.",
        },
        {
          heading: "Where it lands first",
          body: "Bain maps early enterprise use to customer experience, retail and commerce, marketing, sales, banking and financial services, and insurance, the functions with high-volume, multistep workflows where autonomous execution pays fastest.",
        },
      ],
      figures: [],
      charts: [],
      metisAngle:
        "The maturity framing maps directly onto client conversations: most of our clients are at the copilot stage while their boards ask about agents. Workday is building the agentic back office this piece describes; ADP and UKG will face the same architecture questions in payroll and workforce management; and the insurance use cases put Aflac's claims operations in scope. Bain's redesign-over-rollout argument is the Metis operating-model thesis stated by a competitor, which makes it useful validation in proposals.",
    },
  },
  "Three New Stock Themes": {
    slug: "ai-trade-three-themes",
    heroTheme: "markets",
    detail: {
      sections: [
        {
          heading: "The AI trade is wobbling",
          body: "Goldman's momentum factor, which largely reflects the AI trade, just recorded its highest realized volatility in its 45-year history outside of recessions. Chief US Equity Strategist Ben Snider warns extreme volatility encourages position cuts, creating a vicious cycle, and expects only modest near-term revisions to hyperscaler capex estimates since it is too early for 2027 guidance.",
        },
        {
          heading: "Three places to hide",
          body: "With most sectors now trading in strong correlation to AI and momentum, Goldman identifies three ideas with minimal AI correlation: consumer-experience stocks (secular growth in spending on experiences at undemanding valuations), 'compounders' (strong earnings growth and balance sheets, with median EPS growth more than twice the median S&P 500 stock over three years, now at a historically large valuation discount), and M&A candidates that have not priced in the deal surge, with announced US M&A up 32% year over year to $1.2 trillion in 2026.",
        },
      ],
      figures: [
        { v: "45-yr high", l: "Momentum volatility outside recessions" },
        { v: "+32%", l: "US announced M&A, YoY" },
        { v: "$1.2T", l: "US M&A volume, 2026 YTD (Jul 17)" },
      ],
      charts: [],
      metisAngle:
        "Two direct reads for our roster. Lumen's stock trades inside the AI-infrastructure complex whose volatility Goldman describes, so the client's narrative work matters as much as its execution this quarter. And a 32% M&A surge is demand fuel for Baker Tilly's transaction advisory practice, while several industrial clients fit Goldman's 'compounder' profile, useful framing for how their boards think about the next leg of value creation.",
    },
  },
  "Biotech Stocks": {
    slug: "biotech-rally",
    heroTheme: "biotech",
    detail: {
      sections: [
        {
          heading: "A rally with fundamentals",
          body: "The NYSE Arca Biotechnology and Nasdaq Biotechnology indices both returned more than 56% in the twelve months to July 7, nearly double the Nasdaq 100's 29%. Goldman's healthcare heads Asad Haider and Salveen Richter argue the rally can extend: key clinical data in cardiovascular disease, cancer, and Alzheimer's lands from the second half onward, and the mood at Goldman's 47th Annual Global Healthcare Conference was outright bullish after a guarded 2025.",
        },
        {
          heading: "Obesity goes oral",
          body: "A new generation of oral obesity drugs is set to accelerate one of healthcare's fastest-growing markets. Goldman raised its 2030 global obesity-drug sales forecast 15% to $114 billion, with oral medications expected to make up 40% of the market. Strikingly, the analysts describe a market driven by consumers as much as patients: 'behaving like no other pharmaceutical market we have ever seen.'",
        },
        {
          heading: "M&A as the release valve",
          body: "Large-cap biopharma leaned into dealmaking at the June conference, needing innovation to refill pipelines and offset losses of exclusivity. Small- and mid-cap biotechs stand to benefit, with oncology, immunology, neuroscience, and cardiometabolic health the hot zones.",
        },
      ],
      figures: [
        { v: "+56%", l: "Biotech indices, 12-mo return (to Jul 7)" },
        { v: "$114B", l: "GS 2030 obesity-drug sales forecast (+15%)" },
        { v: "40%", l: "Expected oral share of obesity market" },
      ],
      charts: [
        {
          kind: "cat-bars",
          title: "12-month index returns (to July 7, 2026)",
          source: "Goldman Sachs Research",
          unit: "%",
          rows: [["Biotech indices (Arca / Nasdaq Biotech)", 56], ["Nasdaq 100", 29]],
        },
      ],
      metisAngle:
        "Healthcare capital flowing toward innovation is the demand backdrop for Intuitive Surgical: a sector rewarded for product cycles is one that funds robotic-surgery expansion, and the procedure-growth scare in ISRG's own print contrasts with a sector tape this strong. The M&A appetite also matters to Baker Tilly's healthcare advisory work. Worth noting the consumer-driven obesity market as a case study in healthcare demand behaving like consumer demand.",
    },
  },
};

const store = JSON.parse(readFileSync(FILE, "utf8"));
const week = store.insights[WK] || [];
store.insights[WK] = week.filter((r) => !DROP_URLS.some((u) => (r.url || "").includes(u)));

let matched = 0;
for (const r of store.insights[WK]) {
  const brief = Object.entries(BRIEFS).find(([key]) => r.title.includes(key))?.[1];
  if (!brief) { console.log(`  ⚠ no brief for: ${r.title.slice(0, 60)}`); continue; }
  r.slug = brief.slug;
  r.heroTheme = brief.heroTheme;
  if (brief.detail) {
    r.detail = brief.detail;
    if (!r.detail.metisAngle && r.analysis) r.detail.metisAngle = r.analysis;
  } else if (r.detail && r.analysis && !r.detail.metisAngle) {
    r.detail.metisAngle = r.analysis; // humanoid-100 keeps its existing charts/sections
  }
  matched++;
}
writeFileSync(FILE, JSON.stringify(store, null, 2) + "\n");
console.log(`✅ ${matched}/${store.insights[WK].length} insights enriched with briefs.`);
