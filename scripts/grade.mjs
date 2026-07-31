#!/usr/bin/env node
// Grade the latest Client Pulse edition against the quality contract.
//
//   npm run grade            → grades the newest edition, prints the report card
//   npm run grade -- 2026-07-27  → grades a specific edition
//
// Exit code 1 when any client falls below A in any dimension — this is the CI
// gate that keeps every scrape at top-tier level.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { ROSTER } from "../src/lib/roster.js";
import { gradeStore } from "./lib/quality.mjs";
import { lintRoster } from "./lib/roster-lint.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const store = JSON.parse(readFileSync(path.join(root, "src", "data", "generated-pulse.json"), "utf8"));

// ── Roster lint first: a new client must carry everything the pipeline
// needs to produce A-grade content for it before content is even graded.
const { errors: rosterErrors, warnings: rosterWarnings } = lintRoster(ROSTER);
for (const w of rosterWarnings) console.log(`  ⚠ roster: ${w}`);
if (rosterErrors.length) {
  console.error("\n❌ Roster lint failed — fix these entries before scraping:\n");
  for (const e of rosterErrors) console.error(`  ✗ ${e}`);
  console.error("");
  process.exit(1);
}

const weekId = process.argv[2] || store.editions?.[0]?.id;
if (!weekId) {
  console.error("No editions found in generated-pulse.json");
  process.exit(1);
}

const { rows, overall, allA } = gradeStore(store, ROSTER, weekId);

console.log(`\n📋 Client Pulse report card — edition ${weekId}\n`);
console.log("client".padEnd(26), "accuracy", "mix", "relevancy", "readability");
for (const r of rows) {
  const g = r.grades;
  const flag = Object.values(g).every((x) => x === "A") ? " " : "✗";
  console.log(
    `${flag} ${r.id.padEnd(24)}`,
    g.accuracy.padEnd(8),
    g.mix.padEnd(3),
    g.relevancy.padEnd(9),
    g.readability
  );
}
console.log("\noverall (worst client):", JSON.stringify(overall));

if (!allA) {
  console.log("\nFailures:\n");
  for (const r of rows) {
    if (!r.failures.length) continue;
    console.log(`  ${r.id}`);
    for (const f of r.failures) console.log(`    ✗ ${f}`);
  }
  console.log("\n❌ Below A. Fix the failures above before publishing.\n");
  process.exit(1);
}
console.log("\n✅ All clients at A across all four dimensions.\n");
