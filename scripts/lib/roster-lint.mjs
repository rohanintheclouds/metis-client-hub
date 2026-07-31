// ─────────────────────────────────────────────────────────────────────────
// Roster lint — makes content quality a PRECONDITION of adding a client.
//
// The gather/author/grade pipeline is roster-driven: any client added to
// src/lib/roster.js is automatically scraped, authored, and graded. This lint
// validates that a new entry carries everything the pipeline needs to produce
// A-grade content for it, so a sloppy roster entry fails `npm run grade`
// (and CI) BEFORE it produces weak content.
// ─────────────────────────────────────────────────────────────────────────

const TICKER_RE = /^(NYSE|NASDAQ|AMEX|OTC):\s*[A-Z.]{1,6}$|^Private$/;
const COASTS = ["East Coast", "Central", "West Coast"];

// Words so generic that a bare-name news query will drown in noise.
const GENERIC_WORDS = /^(take|command|first|general|national|united|standard|global|american)$/i;

/**
 * Validate roster entries. Returns { errors: [], warnings: [] }.
 * Errors fail the grade; warnings print but pass.
 */
export function lintRoster(roster) {
  const errors = [];
  const warnings = [];
  const seen = new Set();

  for (const c of roster) {
    const who = c.id || c.name || "<unnamed>";
    const err = (m) => errors.push(`${who}: ${m}`);
    const warn = (m) => warnings.push(`${who}: ${m}`);

    if (!c.id || !/^[a-z0-9-]+$/.test(c.id)) err("id must be kebab-case");
    if (seen.has(c.id)) err("duplicate id");
    seen.add(c.id);

    if (!c.name) err("name required");
    if (!c.legalName) err("legalName required — news channels query it for precision");
    if (!c.ticker || !TICKER_RE.test(c.ticker))
      err(`ticker must be "NYSE: XXX" style or "Private" (got "${c.ticker}") — drives EDGAR + market data`);
    if (!COASTS.includes(c.coast)) err(`coast must be one of ${COASTS.join(" / ")}`);
    if (!c.sector) err("sector required");
    if (!c.domain || !/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(c.domain)) err("domain required (e.g. aflac.com) — used for logo + source matching");
    if (!Array.isArray(c.tags) || c.tags.length < 2)
      err("at least 2 project-type tags required — they drive the Metis-lens relevancy grading and My Pulse personalization");
    if (!c.about || c.about.length < 80) warn("about blurb missing/short — client page overview will be thin");
    if (!c.model) warn("model (revenue-stream) blurb missing — client page card will be empty");
    if (!c.mono || !/^#[0-9a-f]{6}$/i.test(c.mono)) warn("mono fallback color missing/invalid");

    // Ambiguous-name check: multi-word names built from generic words need a
    // newsQuery so Google/Bing don't return noise ("Take Command" → military
    // articles). legalName-based channels are fine; name-based ones are not.
    const words = (c.name || "").split(/\s+/);
    if (!c.newsQuery && words.length >= 2 && words.some((w) => GENERIC_WORDS.test(w)))
      err(`name "${c.name}" is ambiguous for news search — set newsQuery (e.g. "${c.legalName}")`);

    // Optional per-client feeds must be well-formed if present.
    if (c.feeds) {
      if (!Array.isArray(c.feeds)) err("feeds must be an array of {url, source?}");
      else
        for (const f of c.feeds)
          if (!f?.url || !/^https?:\/\//.test(f.url)) err(`feeds entry missing valid url: ${JSON.stringify(f)}`);
    }
  }
  return { errors, warnings };
}
