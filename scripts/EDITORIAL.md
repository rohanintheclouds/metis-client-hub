# Client Pulse — Editorial Contract

This is the standard every edition must meet, whoever writes it: the in-session
Claude workflow, the API summarizer (`scripts/lib/summarize.mjs`), or a human.
`npm run grade` (scripts/lib/quality.mjs) enforces it deterministically — an
edition below A in any dimension for any client does not ship.

## Workflow (no-API mode)

1. `npm run gather` — fetches dated, tiered raw material per client into
   `src/data/raw-gather.json` (Google/Bing News, SEC EDGAR, Yahoo market data;
   window widens 8→21→45 days until ≥4 articles).
2. Author the edition in `src/data/generated-pulse.json` from that material
   only, following the rules below. (In Claude Code: "author this week's Pulse
   from the raw gather, per scripts/EDITORIAL.md".)
3. `npm run grade` — iterate until every client is A across all dimensions.
4. Commit. CI re-runs the grade and blocks anything below A.

## Adding a new client

The pipeline is roster-driven: add an entry to `src/lib/roster.js` and the
client is automatically gathered, authored, and graded on the next scrape —
same channels, same contract, same A-or-block gate. The grade FAILS for any
roster client missing an edition, so a new client can't silently ship empty.

A roster lint runs at the top of `npm run grade` (and in CI) and rejects
entries that would degrade content quality. Requirements:

- `id` (kebab-case), `name`, `legalName` (news channels query it), `sector`,
  `domain`, `coast`, and ≥2 project-type `tags` (they drive Metis-lens
  grading and My Pulse personalization).
- `ticker` — `"NYSE: XYZ"` style (enables SEC EDGAR filings + market data)
  or `"Private"` (no stats; qualitative items instead).
- `newsQuery` — REQUIRED when the name is generic ("Take Command" would
  return military articles); set it to the unambiguous legal name.
- `feeds` (optional, high leverage) — `[{ url, source? }]` RSS/Atom feeds
  fetched first in every gather. Add the company newsroom or IR feed and the
  client gets primary-source coverage from day one.
- `about` / `model` blurbs for the client page (lint warns if missing).

After adding: `npm run gather -- <id>` to pull material, author per this
contract, `npm run grade`, push.

## Grounding (accuracy)

- Use ONLY fetched material: the raw gather, or pages you actually opened this
  session. Every item cites the URL it came from. No memory, no invention.
- Every item carries the **event/publication date** from its source.
- **Date honesty:** an item older than the 8-day window must have
  `category: "Context"` — never dress older material as this week's news.
- Filings: say what the filing *contains* (parse it), or leave it out.
  "An 8-K was filed" is banned filler.
- Stats come only from the market-data channel. Private companies get no
  invented stats (qualitative facts belong in items, cited).
- Prefer original publishers over syndicators (msn/aol/yahoo re-hosts). At most
  one aggregator-tier item per client; never the lead.

## Item schema

```json
{
  "headline":  "Takeaway, ≤100 chars, verb-led, number-bearing. Never a raw article title.",
  "tldr":      "One-line so-what, ≤200 chars.",
  "body":      "30–160 words. Fetched facts only. What happened + why + mechanics.",
  "ctx":       "One sentence: why this matters for the client's situation.",
  "lens":      "One sentence: the Metis angle — what it means for our work / the client's transformation agenda. ≥8 words, distinct from ctx, tied to the client's project-type tags.",
  "url":       "exact fetched URL",
  "source":    "Publisher name",
  "tier":      "primary | tier1 | trade | financial | aggregator",
  "date":      "YYYY-MM-DD (event/publication)",
  "category":  "Leadership | Tech & AI | M&A | Cost & Ops | Regulatory | Product | Financial | Brand | Risk | Context",
  "priority":  1
}
```

## Edition schema

```json
{
  "glance":  "2-3 sentences, ≥25 words: the week's story in brief.",
  "delta":   "1-2 sentences: what changed vs last week's edition.",
  "stats":   [ ...market-channel stats only... ],
  "items":   [ ...3–6 items, priority ascending (1 = most material)... ],
  "sources": [ { "label": "Publisher — short title (≤70 chars)", "url": "..." } ],
  "meta":    { "generatedAt": "ISO date", "windowDays": 8, "author": "session|api" }
}
```

## Mix rules

- **3–6 items per client, every week.** The widened gather window plus honest
  Context items makes the floor reachable even in quiet weeks.
- ≥1 strategy-class item (Leadership / Tech & AI / M&A / Cost & Ops /
  Regulatory / Product / Risk). ≤1 Financial (market-chatter) item.
- Categorize every item; diversify categories.

## Relevancy rules (the Metis lens)

- Every item's `lens` answers "so what for our work with this client" in the
  language of the client's project-type tags (see src/lib/roster.js). The
  standard is the Humanoid-100 insight ("two of our clients are on this list,
  Regal Rexnord in four Body categories") — a concrete tie, not a platitude.
- The glance is written for a consultant walking into a client meeting, not an
  investor.

## Readability rules

- Headlines state the insight ("Hackers stole bank details of 4.38M Aflac Japan
  customers"), never source-suffixed raw titles ("… - Reuters").
- TL;DR on every item; bodies capped at 160 words; bold key figures in the
  renderer, not with markdown in data.
- Items ordered by materiality (`priority` ascending). Breach beats sponsorship.
- `delta` tells the reader what moved since last week.
