#!/usr/bin/env node
/**
 * One-off editorial pass for the 2026-07-27 edition: hand-written
 * week-at-a-glance paragraphs, each grounded ONLY in the items fetched by
 * scrape.mjs (headlines/snippets in generated-pulse.json) and the stats row.
 *
 * This is the manual stand-in for the LLM summarizer, once ANTHROPIC_API_KEY
 * is set, scrape.mjs writes these automatically each week and this script is
 * not needed.
 *
 * Run: node scripts/enrich-glances.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const WK = "2026-07-27";
const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "generated-pulse.json");

const GLANCES = {
  aflac:
    "A mixed week for Aflac: the company disclosed that hackers breached systems at its Japanese subsidiary and accessed bank-account details belonging to 4.38 million customers, reported in an SEC filing, even as the stock held near the top of its 52-week range at roughly +15% year to date. Off the tape, Aflac expanded its WNBPA partnership with a bigger All-Star Weekend prize structure, and valuation commentary flagged the shares as potentially ~10% above fair value on shrinking revenue views.",
  "ford-credit":
    "Earnings week at the parent: Ford reported second-quarter 2026 results (the 8-K landed July 28, with Ford Credit's own 10-Q following July 29), and the stock sits about +12% year to date. In Europe, Ford named Maria Grazia Davino VP of Sales for Ford of Europe and announced a partnership with Geely to produce next-generation multi-energy vehicles in Spain, a notable strategic move for the region's product and volume outlook.",
  "lumen-technologies":
    "A set-up week for Lumen: earnings previews frame the Q2 print around AI-driven Private Connectivity Fabric and NaaS momentum on one side, and legacy revenue declines plus a heavy debt load on the other. The stock trades at $6.49, down roughly 16% year to date, so the quarter's evidence on the AI-infrastructure pivot carries real weight.",
  adp:
    "ADP closed out its fiscal year with a beat: fourth-quarter FY2026 adjusted EPS and revenue both topped Wall Street estimates, and the company introduced its fiscal 2027 outlook alongside the print (8-K filed July 29). Shares jumped about 5% on the morning of the report before giving some of it back in the following session, the classic strong-print, high-expectations pattern for a stock still trading mid-range on the year.",
  ukg:
    "A quiet week in the channels we track: nothing first-party from UKG crossed the wire, only third-party market-research promotion around multi-country payroll and pay-management software categories UKG competes in. No fetched news is a data point too: attention in HR tech sat with ADP's earnings this week.",
  "generac-power-systems":
    "A blowout quarter: Generac posted $2.91 adjusted EPS against a $2.01 consensus (a ~45% beat), with the data-center backup-power business up 29%, backlog reaching $1.6 billion, and hyperscale orders hitting $1 billion as the company accelerates a plant opening for its data-center unit. CEO Aaron Jagdfeld took the AI-data-center story to CNBC's Squawk Box, and the stock, up ~37% year to date, reflects the pivot from home standby toward powering AI infrastructure.",
  "nrg-energy":
    "A quiet tape week for NRG: the freshest primary-source item is a July 15 8-K, with earnings-expectation commentary building ahead of the next print. Shares sit at ~$134, down about 19% year to date, so the upcoming quarter is the near-term catalyst to watch.",
  "baker-tilly":
    "The week's story was the competitive landscape, not Baker Tilly itself: Grant Thornton sealed a $5 billion takeover of CBIZ, described by the Financial Times as the accounting sector's largest in a generation, expanding its US reach squarely in the middle market where Baker Tilly competes. Consolidation among PE-backed accounting platforms keeps accelerating.",
  "regal-rexnord":
    "No major first-party news crossed the wire this week, but the market kept moving: shares trade near $202, up roughly 38% year to date and well off the 52-week low of $128, a strong run for the motors, gearing, and actuator portfolio that Morgan Stanley's Humanoid 100 flagged as exposed to the humanoid-robotics build-out (see Market Insights).",
  "vulcan-materials":
    "Vulcan beat and reaffirmed: second-quarter revenue came in at $2.16 billion (up from $2.10 billion a year ago) with earnings ahead of estimates, as pricing gains, higher aggregates volumes, and cost control offset energy inflation. The company reaffirmed its 2026 outlook on infrastructure-driven demand and filed both its 10-Q and 8-K on July 29.",
  loandepot:
    "One real strategic move this week: loanDepot picked Miami for a new corporate center opening September 2026, supporting technology, marketing, recruiting, and mortgage fulfillment across channels. The backdrop remains harsh, shares trade around $1.01, down over 50% year to date, which makes cost-conscious footprint decisions like this one the story to follow.",
  "rockwell-automation":
    "An expansion week for Rockwell: New Berlin's council approved zoning and land use for its proposed $200M+, 830,000-square-foot facility (with a possible 425,000-square-foot second phase) despite neighbor opposition, and Luminus selected Rockwell's SecureOT platform for industrial-cybersecurity resilience across its energy operations. With Street previews building toward the Q3 print, the stock sits near its 52-week high, +19% year to date.",
  workday:
    "An AI-narrative week for Workday: its new research found 89% of Indian employees say AI improves daily work but only 32% see it embedded in core systems, the integration gap Workday sells into, while EarnIn announced it will integrate earnings-management tools into Workday's Enhanced Direct Deposit Switching platform. The stock also jumped ~10% in a single session as enterprise software rebounded on an AI rotation, though it remains down ~24% year to date.",
  "intuitive-surgical":
    "A post-earnings reset: Intuitive posted its fifth consecutive earnings beat, yet the stock plunged on slowing domestic procedure-growth concerns and now sits at ~$352, down 37% year to date near its 52-week low, with commentary noting management began buying back shares above current prices and one analyst maintaining a $685 target. The company also overhauled its bylaws (8-K filed July 27), reshaping how shareholders nominate directors and call special meetings.",
};

const store = JSON.parse(readFileSync(FILE, "utf8"));
let n = 0;
for (const [id, glance] of Object.entries(GLANCES)) {
  const ed = store.pulse[id]?.[WK];
  if (!ed) continue;
  ed.glance = glance;
  n++;
}
writeFileSync(FILE, JSON.stringify(store, null, 2) + "\n");
console.log(`✅ ${n} glances written for ${WK}.`);
