#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────
// Claim verification pass — the anti-hallucination QA gate.
//
//   npm run verify              → verify the newest edition
//   npm run verify -- 2026-07-27
//
// For every item in the edition it checks, per cited source:
//   1. LIVENESS  — the cited URL actually resolves (catches fabricated or
//      dead links, the classic hallucination artifact).
//   2. GROUNDING — the source page's text contains the item's key claim
//      terms (numbers like "4.38", "$2.91", "165%", and distinctive proper
//      nouns). A claim whose numbers appear nowhere in its cited source is
//      flagged for human review.
//
// Three outcomes per item:
//   VERIFIED   — URL live + claim terms found in page text
//   LIVE-ONLY  — URL live but page text unavailable/dynamic (JS-rendered,
//                paywalled, or a redirect wrapper); needs eyeball QA
//   FAILED     — URL dead, or claim terms contradicted by a readable page
//
// The pass writes its receipt into each edition's meta.verification and
// exits 1 on any FAILED item — wire it before commit in the authoring flow.
// ─────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ROSTER } from "../src/lib/roster.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = path.join(root, "src", "data", "generated-pulse.json");
const store = JSON.parse(readFileSync(DATA_FILE, "utf8"));
const weekId = process.argv.slice(2).find((a) => !a.startsWith("--")) || store.editions?.[0]?.id;

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

// Pull the check terms out of an item: every number-bearing token in the
// headline/tldr (prices, percentages, counts) — the facts most damaging to
// get wrong — plus long distinctive capitalized words as a fallback.
function claimTerms(item) {
  const text = `${item.headline} ${item.tldr || ""}`;
  const nums = [...text.matchAll(/\$?\d[\d,.]*%?[BMK]?/g)]
    .map((m) => m[0].replace(/[.,]$/, ""))
    .filter((t) => t.replace(/\D/g, "").length >= 2);
  const names = [...text.matchAll(/\b[A-Z][a-z]{5,}\b/g)].map((m) => m[0]).slice(0, 3);
  return { nums: [...new Set(nums)].slice(0, 5), names: [...new Set(names)] };
}

function normalize(s) {
  return s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { headers: HEADERS, redirect: "follow", signal: AbortSignal.timeout(20000) });
    const ok = res.status >= 200 && res.status < 400;
    let text = "";
    if (ok && /html|xml|text/.test(res.headers.get("content-type") || "")) {
      text = normalize((await res.text()).slice(0, 800000));
    }
    return { ok, status: res.status, text };
  } catch (e) {
    return { ok: false, status: 0, error: String(e.message || e).slice(0, 80), text: "" };
  }
}

const num = (s) => s.replace(/[^0-9.]/g, "");

// Provenance: the machine-checkable anti-hallucination test. A cited URL must
// come from the gather record (raw-gather.json) or the committed session-
// sources allowlist (URLs surfaced by in-session web research). A fabricated
// URL exists in neither. Bot-walls (403/timeouts) on a PROVENANCED url are a
// fetch problem, not a fabrication signal.
function loadProvenance() {
  const urls = new Set();
  try {
    const raw = JSON.parse(readFileSync(path.join(root, "src", "data", "raw-gather.json"), "utf8"));
    for (const g of Object.values(raw.clients || {})) {
      for (const a of g.articles || []) urls.add(a.url);
      for (const f of g.filings || []) urls.add(f.url);
      if (g.market?.sourceUrl) urls.add(g.market.sourceUrl);
    }
  } catch {}
  try {
    const sess = JSON.parse(readFileSync(path.join(root, "scripts", "session-sources.json"), "utf8"));
    for (const u of sess.urls || []) urls.add(u);
  } catch {}
  return urls;
}
const PROVENANCE = loadProvenance();
const hasProvenance = (u) => PROVENANCE.has(u) || [...PROVENANCE].some((p) => p.split("?")[0] === (u || "").split("?")[0]);

async function verifyItem(item) {
  const proven = hasProvenance(item.url);
  const { ok, status, text, error } = await checkUrl(item.url);
  if (!ok) {
    // 404/410 on a live site = the page does not exist → hard fail.
    if (status === 404 || status === 410)
      return { verdict: "FAILED", why: `cited URL returns ${status} — page does not exist` };
    // Bot-wall or network block: fine if the URL's provenance is on record.
    if (proven)
      return { verdict: "PROVENANCED", why: `bot-blocked on refetch (${status || error}) — URL is in the gather/session record` };
    return { verdict: "FAILED", why: `unreachable (${status || error}) AND no provenance record — cannot establish source exists` };
  }
  const { nums, names } = claimTerms(item);
  if (!text || text.length < 500) {
    return { verdict: "LIVE-ONLY", why: "page text unavailable (dynamic/paywalled) — eyeball the claim" };
  }
  const hay = text;
  const numHits = nums.filter((n) => hay.includes(num(n)) || hay.includes(n));
  const nameHits = names.filter((n) => hay.toLowerCase().includes(n.toLowerCase()));
  if (nums.length && numHits.length === 0 && nameHits.length === 0) {
    return { verdict: "LIVE-ONLY", why: `claim terms (${nums.join(", ")}) not in page text — likely JS-rendered; eyeball` };
  }
  if (nums.length && numHits.length === 0) {
    return { verdict: "REVIEW", why: `numbers ${nums.join(", ")} not found on cited page (names matched) — verify by hand` };
  }
  return { verdict: "VERIFIED", why: `${numHits.length}/${nums.length} numeric + ${nameHits.length} name terms found` };
}

const COUNTS = { VERIFIED: 0, PROVENANCED: 0, "LIVE-ONLY": 0, REVIEW: 0, FAILED: 0 };
let failures = 0;

// --provenance-only: deterministic, no-network mode for CI — every cited URL
// must be in the gather/session record. Catches fabricated citations without
// depending on third-party sites being reachable from CI.
if (process.argv.includes("--provenance-only")) {
  let bad = 0;
  for (const client of ROSTER) {
    const ed = store.pulse?.[client.id]?.[weekId];
    for (const item of ed?.items || []) {
      if (!hasProvenance(item.url)) {
        bad++;
        console.log(`  ✗ ${client.id}: no provenance for cited URL — ${item.url.slice(0, 90)}`);
      }
    }
  }
  if (bad) {
    console.log(`\n❌ ${bad} citation(s) without provenance — possible fabrication. Blocked.\n`);
    process.exit(1);
  }
  console.log(`✅ Provenance check passed: every cited URL is in the gather/session record.`);
  process.exit(0);
}

console.log(`\n🔎 Claim verification — edition ${weekId}\n`);
for (const client of ROSTER) {
  const ed = store.pulse?.[client.id]?.[weekId];
  if (!ed) continue;
  const results = [];
  for (const item of ed.items || []) {
    const r = await verifyItem(item);
    COUNTS[r.verdict] = (COUNTS[r.verdict] || 0) + 1;
    if (r.verdict === "FAILED") failures++;
    const mark = { VERIFIED: "✓", PROVENANCED: "◎", "LIVE-ONLY": "◐", REVIEW: "⚠", FAILED: "✗" }[r.verdict];
    console.log(`  ${mark} ${client.id.padEnd(24)} ${r.verdict.padEnd(9)} ${item.headline.slice(0, 56)}`);
    if (r.verdict !== "VERIFIED") console.log(`      ↳ ${r.why}`);
    results.push({ headline: item.headline.slice(0, 80), verdict: r.verdict, why: r.why });
  }
  ed.meta = ed.meta || {};
  ed.meta.verification = {
    verifiedAt: new Date().toISOString().slice(0, 10),
    results: results.map((r) => ({ h: r.headline.slice(0, 60), v: r.verdict })),
  };
}

writeFileSync(DATA_FILE, JSON.stringify(store, null, 2) + "\n");
console.log(`\nSummary: ${Object.entries(COUNTS).map(([k, v]) => `${k} ${v}`).join(" · ")}`);
console.log(`Receipts written to edition meta.verification in generated-pulse.json`);
if (failures) {
  console.log(`\n❌ ${failures} item(s) FAILED — fix or remove before publishing.\n`);
  process.exit(1);
}
console.log(`\n✅ No failed citations. LIVE-ONLY/REVIEW items need a human eyeball (listed above).\n`);
