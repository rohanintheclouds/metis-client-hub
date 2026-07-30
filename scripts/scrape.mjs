#!/usr/bin/env node
/**
 * Weekly Client Pulse scraper — LIVE pipeline.
 *
 * For each client in src/lib/clients.js:
 *   1. Gather real data from every configured channel (scripts/lib/channels.mjs):
 *        • Google News RSS      — no key
 *        • SEC EDGAR filings    — no key
 *        • Stooq market data    — no key
 *        • Finnhub market data  — FINNHUB_API_KEY (richer: mkt cap, earnings date)
 *        • NYT Article Search   — NYT_API_KEY
 *        • Tavily news search   — SEARCH_API_KEY
 *   2. Summarize ONLY the fetched material (scripts/lib/summarize.mjs):
 *        • ANTHROPIC_API_KEY set → Claude writes the brief, hard-constrained to
 *          fetched facts; items citing unfetched URLs are dropped in validation.
 *        • no key → deterministic edition assembled straight from the fetched
 *          headlines and market data. Zero model, zero hallucination.
 *   3. Persist as a new edition in src/data/generated-pulse.json, which
 *      src/lib/pulse.js merges with the seeded archive at build time.
 *
 * Run: npm run scrape            (all clients)
 *      npm run scrape -- aflac   (one client)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ROSTER as CLIENTS } from "../src/lib/roster.js";
import { gatherClient } from "./lib/channels.mjs";
import { summarizeEdition } from "./lib/summarize.mjs";

const DATA_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "generated-pulse.json");

function weekId(d = new Date()) {
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return monday.toISOString().slice(0, 10);
}

function weekLabel(id) {
  const d = new Date(`${id}T12:00:00Z`);
  const label = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return { label: `Week of ${label}`, date: label };
}

async function main() {
  const only = process.argv[2];
  const clients = only ? CLIENTS.filter((c) => c.id === only) : CLIENTS;
  if (!clients.length) throw new Error(`No client with id "${only}"`);

  const wk = weekId();
  const llm = Boolean(process.env.ANTHROPIC_API_KEY);
  const channels = [
    "google-news", "sec-edgar", "yahoo-finance",
    process.env.FINNHUB_API_KEY && "finnhub",
    process.env.NYT_API_KEY && "nyt",
    process.env.SEARCH_API_KEY && "tavily",
  ].filter(Boolean);

  console.log(`\n📡 Client Pulse scrape — week ${wk}`);
  console.log(`   ${clients.length} client(s) · channels: ${channels.join(", ")} · summarizer: ${llm ? "Claude (grounded)" : "deterministic (no LLM)"}\n`);

  const store = JSON.parse(readFileSync(DATA_FILE, "utf8"));
  let ok = 0;

  for (const c of clients) {
    process.stdout.write(`   • ${c.name.padEnd(22)} `);
    try {
      const gathered = await gatherClient(c);
      const edition = await summarizeEdition(c, gathered);
      store.pulse[c.id] = store.pulse[c.id] || {};
      store.pulse[c.id][wk] = edition;
      ok++;
      const note = gathered.errors.length ? `  (channel errors: ${gathered.errors.join("; ")})` : "";
      console.log(`✓ ${gathered.articles.length} articles, ${gathered.filings.length} filings, market ${gathered.market ? "✓" : "—"}${note}`);
    } catch (e) {
      console.log(`✗ ${e.message}`);
    }
  }

  if (!store.editions.some((e) => e.id === wk)) {
    store.editions.unshift({ id: wk, ...weekLabel(wk) });
    store.editions.sort((a, b) => (a.id < b.id ? 1 : -1));
  }
  writeFileSync(DATA_FILE, JSON.stringify(store, null, 2) + "\n");
  console.log(`\n✅ ${ok}/${clients.length} clients written to src/data/generated-pulse.json (edition ${wk}).`);
  console.log(`   Rebuild/redeploy the app to publish.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
