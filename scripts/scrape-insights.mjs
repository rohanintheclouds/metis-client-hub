#!/usr/bin/env node
/**
 * Weekly Market Insights scrape.
 *
 * Pulls recent research from the big banks and consultancies (McKinsey RSS;
 * Goldman Sachs / Bain / Morgan Stanley / J.P. Morgan via sitemaps + page
 * metadata), keeps ONLY reports that map to a market one of our clients
 * operates in (scripts/lib/marketMap.mjs), and writes the week's edition to
 * src/data/market-insights.json for the /insights tab.
 *
 * Grounding: title, summary, URL, and date are all fetched. With
 * ANTHROPIC_API_KEY set, Claude writes a short "why it matters for our
 * clients" tie-back using only the fetched title+summary; without it, the
 * fetched summary stands alone.
 *
 * Run: npm run scrape:insights
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { gatherInsights } from "./lib/insightSources.mjs";
import { mapToClients } from "./lib/marketMap.mjs";
import { ROSTER } from "../src/lib/roster.js";

const DATA_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "market-insights.json");
const MAX_PER_WEEK = 10;
const MODEL = process.env.PULSE_MODEL || "claude-sonnet-5";

function weekId(d = new Date()) {
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  // Build from local parts — toISOString() is UTC and can roll the date.
  return `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, "0")}-${String(monday.getDate()).padStart(2, "0")}`;
}

function weekLabel(id) {
  const d = new Date(`${id}T12:00:00Z`);
  const label = d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  return { label: `Week of ${label}`, date: label };
}

async function tieBack(report, clientNames) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  const prompt = `A ${report.firm} research piece:
Title: ${report.title}
Summary: ${report.summary || "(none)"}

Metis Strategy consults for these clients operating in this market: ${clientNames.join(", ")}.

In 2-3 sentences, explain why this analysis matters for engagements with those clients. Use ONLY facts from the title/summary above — do not add numbers, events, or claims from memory. Plain text, no preamble.`;
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 300, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.content?.map((b) => b.text || "").join("").trim() || null;
}

async function main() {
  const wk = weekId();
  console.log(`\n📚 Market Insights scrape — week ${wk}`);
  const { reports, errors } = await gatherInsights();
  errors.forEach((e) => console.log(`   ⚠ ${e}`));
  console.log(`   ${reports.length} reports fetched across firms`);

  const byName = Object.fromEntries(ROSTER.map((c) => [c.id, c.name]));
  const seen = new Set();
  const kept = [];
  for (const r of reports) {
    if (seen.has(r.url)) continue;
    seen.add(r.url);
    const { clients, themes } = mapToClients(`${r.title} ${r.summary || ""}`);
    if (!clients.length) continue; // outside the markets our clients are in
    kept.push({ ...r, relatedClients: clients, themes });
  }
  kept.sort((a, b) => (a.date < b.date ? 1 : -1));
  const top = kept.slice(0, MAX_PER_WEEK);
  console.log(`   ${kept.length} match client markets · keeping ${top.length}`);

  for (const r of top) {
    const names = r.relatedClients.map((id) => byName[id]).filter(Boolean);
    const tb = await tieBack(r, names);
    if (tb) r.tieBack = tb;
    console.log(`   • [${r.firm}] ${r.title.slice(0, 60)}… → ${names.join(", ")}`);
  }

  const store = JSON.parse(readFileSync(DATA_FILE, "utf8"));
  // Hand-added reports (manual: true) survive re-scrapes.
  const manual = (store.insights[wk] || []).filter((r) => r.manual);
  const manualUrls = new Set(manual.map((r) => r.url).filter(Boolean));
  store.insights[wk] = [...manual, ...top.filter((r) => !manualUrls.has(r.url))];
  if (!store.editions.some((e) => e.id === wk)) {
    store.editions.unshift({ id: wk, ...weekLabel(wk) });
    store.editions.sort((a, b) => (a.id < b.id ? 1 : -1));
  }
  writeFileSync(DATA_FILE, JSON.stringify(store, null, 2) + "\n");
  console.log(`\n✅ Week ${wk}: ${top.length} insights written to src/data/market-insights.json.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
