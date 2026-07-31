// ─────────────────────────────────────────────────────────────────────────
// Client Pulse quality contract + scorecard.
//
// This file IS the definition of "A-grade content". Every edition — whether
// written by the in-session Claude workflow, the API summarizer, or by hand —
// is graded against the same deterministic checks, across the four dimensions
// the firm grades content on:
//
//   accuracy    — dated, sourced, verified, no filler, honest windows
//   mix         — coverage floor met, strategy > market chatter, taxonomy mix
//   relevancy   — a Metis lens on every item, tied to the client's work
//   readability — takeaway headlines, TL;DRs, capped bodies, ordered by weight
//
// `npm run grade` runs this over src/data/generated-pulse.json and fails CI
// when any dimension of any client falls below A. The grade gate is what
// keeps the hub at top-tier level on every future scrape.
// ─────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  "Leadership",
  "Tech & AI",
  "M&A",
  "Cost & Ops",
  "Regulatory",
  "Product",
  "Financial",
  "Brand",
  "Risk",
  "Context",
];

// Strategy-class categories a consulting reader actually acts on.
const STRATEGY = new Set(["Leadership", "Tech & AI", "M&A", "Cost & Ops", "Regulatory", "Product", "Risk"]);

export const TIERS = ["primary", "tier1", "trade", "financial", "aggregator"];

const wc = (s) => (s || "").trim().split(/\s+/).filter(Boolean).length;

function letter(pct) {
  if (pct >= 0.92) return "A";
  if (pct >= 0.82) return "B";
  if (pct >= 0.7) return "C";
  if (pct >= 0.55) return "D";
  return "F";
}

/**
 * Grade one client's edition. Returns { grades: {accuracy, mix, relevancy,
 * readability}, failures: [ "dimension: what failed" ] }.
 *
 * @param {object} client   roster entry (needs ticker, tags, name)
 * @param {object} edition  { glance, delta, stats, items[], sources[], meta }
 * @param {string} weekId   e.g. "2026-07-27" (Monday of the edition week)
 */
export function gradeEdition(client, edition, weekId) {
  const checks = { accuracy: [], mix: [], relevancy: [], readability: [] };
  const add = (dim, ok, label) => checks[dim].push({ ok: Boolean(ok), label });
  const items = edition?.items || [];
  const isPrivate = client.ticker === "Private";
  const weekStart = new Date(`${weekId}T00:00:00Z`);

  // ── accuracy ─────────────────────────────────────────────────────────
  add("accuracy", items.length && items.every((i) => i.url), "every item cites a URL");
  add("accuracy", items.every((i) => i.date && !Number.isNaN(new Date(i.date).getTime())), "every item carries a valid event date");
  // Date honesty: anything older than the edition's declared gather window
  // must be labeled Context. The window (8d default, widened for thin weeks)
  // is stamped in meta and shown to readers — no month-old news dressed as
  // this week's. Age is measured from the end of the edition week.
  const windowDays = Math.max(8, edition.meta?.windowDays || 8);
  const weekEnd = new Date(weekStart.getTime() + 7 * 864e5);
  const stale = items.filter((i) => {
    if (!i.date) return false;
    const age = (weekEnd - new Date(i.date)) / 864e5;
    // Primary-source regulatory filings follow the EDGAR channel's 30-day
    // window — a dated SEC disclosure rendered with its filing date is not
    // "stale news dressed as fresh".
    const allowed = i.tier === "primary" && i.category === "Regulatory" ? 30 : windowDays;
    return age > allowed + 7 && i.category !== "Context";
  });
  add("accuracy", stale.length === 0, `in-window dating (stale-as-fresh: ${stale.length})`);
  // No "a filing exists" filler: filing items must say what the filing contains.
  const filler = items.filter(
    (i) => /\b(8-K|10-Q|10-K)\b.*\bfiled\b/i.test(i.headline || "") && wc(i.body) < 45
  );
  add("accuracy", filler.length === 0, "no filing-exists filler");
  add("accuracy", isPrivate || (edition.stats || []).length >= 3, "market stats present (public co)");
  // Clean labels: composed ("Publisher — short title"), bounded length. The
  // ≤70 cap is what catches the old mid-word truncation bug.
  add(
    "accuracy",
    (edition.sources || []).every((s) => (s.label || "").length >= 6 && s.label.length <= 70),
    "source labels are clean (6–70 chars, composed)"
  );
  add("accuracy", Boolean(edition.meta?.generatedAt), "edition stamped with generation date");
  add("accuracy", items.every((i) => i.tier && TIERS.includes(i.tier)), "every item tiered by source quality");
  add("accuracy", !items.length || items.filter((i) => i.tier === "aggregator").length <= 1, "≤1 aggregator-tier item");

  // ── mix ──────────────────────────────────────────────────────────────
  add("mix", items.length >= 3, `coverage floor ≥3 items (got ${items.length})`);
  add("mix", items.length <= 6, "≤6 items (no padding)");
  add("mix", items.every((i) => CATEGORIES.includes(i.category)), "every item categorized");
  add("mix", items.some((i) => STRATEGY.has(i.category)), "≥1 strategy-class item");
  const chatter = items.filter((i) => i.category === "Financial").length;
  add("mix", chatter <= 1, `≤1 market-chatter item (got ${chatter})`);
  add("mix", new Set(items.map((i) => i.category)).size >= Math.min(2, items.length), "category diversity");

  // ── relevancy ────────────────────────────────────────────────────────
  add("relevancy", items.every((i) => wc(i.lens) >= 8), "Metis lens on every item (≥8 words)");
  add(
    "relevancy",
    items.every((i) => !i.lens || i.lens.trim() !== (i.ctx || "").trim()),
    "lens is distinct from ctx"
  );
  add("relevancy", wc(edition.glance) >= 25, "substantive glance (≥25 words)");
  // At least one item should speak to the client's tagged project types.
  const tagWords = (client.tags || []).join(" ").toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
  const lensBlob = items.map((i) => `${i.lens || ""} ${i.ctx || ""}`).join(" ").toLowerCase();
  add(
    "relevancy",
    !items.length || tagWords.some((w) => lensBlob.includes(w)) || /transformation|engagement|operating model|advisor|roadmap|budget|initiative/.test(lensBlob),
    "ties to the client's project-type focus"
  );

  // ── readability ──────────────────────────────────────────────────────
  add("readability", items.every((i) => (i.headline || "").length <= 100), "headlines ≤100 chars");
  add(
    "readability",
    items.every((i) => !/ - [A-Z][\w.]+$| \| /.test(i.headline || "")),
    "headlines are takeaways, not raw titles with source suffixes"
  );
  add("readability", items.every((i) => i.tldr && (i.tldr || "").length <= 200), "TL;DR on every item (≤200 chars)");
  add("readability", items.every((i) => wc(i.body) <= 160), "bodies ≤160 words");
  add("readability", items.every((i) => wc(i.body) >= 30 || i.category === "Context"), "bodies substantive (≥30 words)");
  const priorities = items.map((i) => i.priority ?? 99);
  add(
    "readability",
    priorities.every((p, i) => i === 0 || p >= priorities[i - 1]),
    "items ordered by materiality (priority ascending)"
  );
  add("readability", wc(edition.delta) >= 8 || items.length === 0, "what-changed-since-last-week present");

  const grades = {};
  const failures = [];
  for (const dim of Object.keys(checks)) {
    const list = checks[dim];
    const passed = list.filter((c) => c.ok).length;
    grades[dim] = letter(list.length ? passed / list.length : 1);
    for (const c of list) if (!c.ok) failures.push(`${dim}: ${c.label}`);
  }
  return { grades, failures };
}

/** Grade every client in a store for one edition. */
export function gradeStore(store, roster, weekId) {
  const rows = [];
  for (const client of roster) {
    const edition = store.pulse?.[client.id]?.[weekId];
    if (!edition) {
      rows.push({
        id: client.id,
        grades: { accuracy: "F", mix: "F", relevancy: "F", readability: "F" },
        failures: ["missing: no edition for this week"],
      });
      continue;
    }
    rows.push({ id: client.id, ...gradeEdition(client, edition, weekId) });
  }
  const order = { A: 4, B: 3, C: 2, D: 1, F: 0 };
  const overall = {};
  for (const dim of ["accuracy", "mix", "relevancy", "readability"]) {
    overall[dim] = rows.reduce((worst, r) => (order[r.grades[dim]] < order[worst] ? r.grades[dim] : worst), "A");
  }
  return { rows, overall, allA: Object.values(overall).every((g) => g === "A") };
}
