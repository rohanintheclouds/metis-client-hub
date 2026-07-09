#!/usr/bin/env node
/**
 * Weekly Client Pulse scraper (pipeline scaffold).
 *
 * This is the job that refreshes src/lib/pulse.js each week. It is intentionally
 * a documented scaffold: with no ANTHROPIC_API_KEY set it prints the plan and
 * exits. Wire the marked step to your LLM/search stack to go live.
 *
 * Intended flow (per client in src/lib/clients.js):
 *   1. Gather this week's news    → web search over the company + ticker
 *   2. Pull market data           → price, mkt cap, 52-wk range, next earnings
 *   3. Summarize into the schema   → { glance, stats[], items[], sources[] }
 *   4. Append as a new edition     → PULSE[clientId][<new-week-id>]
 *
 * Run: npm run scrape
 */
import { CLIENTS } from "../src/lib/clients.js";

const hasKey = Boolean(process.env.ANTHROPIC_API_KEY);

function weekId(d = new Date()) {
  // ISO date of the most recent Monday
  const day = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((day + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

async function researchClient(client) {
  // ── WIRE HERE ────────────────────────────────────────────────────────────
  // const res = await anthropic.messages.create({
  //   model: "claude-opus-4-8",
  //   tools: [{ type: "web_search_20250305", name: "web_search" }],
  //   messages: [{ role: "user", content: buildPrompt(client) }],
  // });
  // return parseIntoSchema(res);
  // ─────────────────────────────────────────────────────────────────────────
  return null;
}

async function main() {
  const wk = weekId();
  console.log(`\n📡 Client Pulse scrape — week ${wk}`);
  console.log(`   ${CLIENTS.length} clients · LLM ${hasKey ? "ENABLED" : "DISABLED (stub)"}\n`);

  if (!hasKey) {
    console.log("   ANTHROPIC_API_KEY not set — nothing fetched.");
    console.log("   Set it in .env.local and wire researchClient() to run live.\n");
    CLIENTS.forEach((c) => console.log(`   • ${c.name.padEnd(22)} ${c.ticker}`));
    console.log("\n   Then persist results as a new edition in src/lib/pulse.js (or your DB).\n");
    return;
  }

  const results = {};
  for (const c of CLIENTS) {
    process.stdout.write(`   • ${c.name} … `);
    results[c.id] = await researchClient(c);
    console.log("done");
  }
  // Persist `results` under edition `wk`. (Write to DB or regenerate pulse.js.)
  console.log(`\n✅ Scraped ${Object.keys(results).length} clients for week ${wk}.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
