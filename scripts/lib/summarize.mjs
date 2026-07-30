// ─────────────────────────────────────────────────────────────────────────
// Turn fetched channel data into a Pulse edition — WITHOUT hallucination.
//
// Two modes:
//   1. ANTHROPIC_API_KEY set  → Claude summarizes ONLY the fetched material.
//      Hard rules in the prompt: every item must cite a fetched URL; stats
//      come only from the market-data block; anything uncited is dropped.
//      The result is then post-validated: items whose url is not in the
//      fetched set are discarded.
//   2. No key                 → deterministic edition assembled directly
//      from fetched headlines + market data. No model involved at all.
// ─────────────────────────────────────────────────────────────────────────

const MODEL = process.env.PULSE_MODEL || "claude-sonnet-5";

function marketStats(market) {
  if (!market) return [];
  const stats = [];
  const fmt = (n) => (n >= 100 ? n.toFixed(2) : n.toFixed(2));
  if (Number.isFinite(market.price))
    stats.push({ v: `$${fmt(market.price)}`, l: `Price · ${market.priceDate || "latest"}`, dir: null });
  if (Number.isFinite(market.ytdPct))
    stats.push({ v: `${market.ytdPct >= 0 ? "+" : ""}${market.ytdPct.toFixed(1)}%`, l: "YTD", dir: market.ytdPct >= 0 ? "up" : "down" });
  if (Number.isFinite(market.wk52Low) && Number.isFinite(market.wk52High))
    stats.push({ v: `$${fmt(market.wk52Low)}–$${fmt(market.wk52High)}`, l: "52-wk range", dir: null });
  if (Number.isFinite(market.marketCapM))
    stats.push({ v: `~$${(market.marketCapM / 1000).toFixed(1)}B`, l: "Market cap", dir: null });
  if (market.nextEarnings)
    stats.push({ v: market.nextEarnings, l: "Next earnings", dir: null });
  return stats;
}

// ── Mode 2: deterministic, zero-LLM ──────────────────────────────────────
export function assembleEdition(client, gathered) {
  const { articles, filings, market } = gathered;
  const items = [];
  for (const f of filings.slice(0, 2)) {
    items.push({ headline: `${client.name}: ${f.title}.`, body: `Official filing published on SEC EDGAR.`, ctx: "Primary-source disclosure.", url: f.url });
  }
  for (const a of articles.slice(0, 5 - items.length)) {
    items.push({
      headline: a.title.endsWith(".") ? a.title : `${a.title}.`,
      body: a.snippet || `Reported by ${a.source || "the press"}${a.date ? ` on ${a.date}` : ""}.`,
      ctx: a.source ? `Via ${a.source}.` : "",
      url: a.url,
    });
  }
  const sources = [
    ...filings.map((f) => ({ label: `SEC EDGAR — ${f.form}`, url: f.url })),
    ...articles.slice(0, 8).map((a) => ({ label: `${a.source || "News"} — ${a.title.slice(0, 60)}`, url: a.url })),
  ];
  if (market?.sourceUrl) sources.push({ label: `Market data — ${market.symbol}`, url: market.sourceUrl });
  return {
    glance: items.length
      ? `${items.length} sourced update${items.length > 1 ? "s" : ""} this week for ${client.name} across news${filings.length ? " and SEC filings" : ""}.`
      : `No fresh sourced coverage found for ${client.name} this week.`,
    stats: marketStats(market),
    items,
    sources,
  };
}

// ── Mode 1: LLM summarization over fetched material only ─────────────────
export async function summarizeEdition(client, gathered) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return assembleEdition(client, gathered);
  const { articles, filings, market } = gathered;
  if (!articles.length && !filings.length) return assembleEdition(client, gathered);

  const corpus = [
    ...articles.map((a, i) => `[A${i}] ${a.title}\n    url: ${a.url}\n    source: ${a.source} ${a.date}\n    ${a.snippet || ""}`),
    ...filings.map((f, i) => `[F${i}] ${f.title}\n    url: ${f.url}\n    source: SEC EDGAR ${f.date}`),
  ].join("\n\n");

  const prompt = `You are compiling the weekly "Client Pulse" brief for ${client.legalName || client.name} (${client.ticker}), a ${client.sector} client of Metis Strategy.

Below is the ONLY material you may use. It was fetched this week from real channels.

<fetched_material>
${corpus}
</fetched_material>

Rules — these are hard constraints:
- Use ONLY facts stated in the fetched material above. Do not add anything from memory: no numbers, dates, names, or events that do not appear above.
- Every item's "url" MUST be copied exactly from one of the urls above. An item without a supporting url must be omitted.
- Do not invent statistics. The stats block is handled separately; do not produce one.
- If the material is thin, return fewer items (even 1). Never pad.
- "ctx" is one sentence on why this matters for a consulting engagement with this client.

Return ONLY JSON, no markdown fences:
{"glance": "1-2 sentence week-at-a-glance grounded in the material",
 "items": [{"headline": "...", "body": "2-4 sentences, only fetched facts", "ctx": "...", "url": "..."}],
 "sources": [{"label": "Publisher — short title", "url": "..."}]}
Aim for 3-4 items when the material supports it.`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 3000, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const text = data.content?.map((b) => b.text || "").join("") || "";
  const parsed = JSON.parse(text.replace(/^```(json)?|```$/gm, "").trim());

  // Post-validate: discard anything citing a URL we did not fetch.
  const fetchedUrls = new Set([...articles.map((a) => a.url), ...filings.map((f) => f.url)]);
  const items = (parsed.items || []).filter((it) => it.url && fetchedUrls.has(it.url));
  const sources = (parsed.sources || []).filter((s) => s.url && fetchedUrls.has(s.url));
  const dropped = (parsed.items || []).length - items.length;
  if (dropped > 0) console.log(`     ⚠ dropped ${dropped} item(s) with uncited/unfetched URLs`);
  if (!items.length) return assembleEdition(client, gathered);
  if (market?.sourceUrl && !sources.some((s) => s.url === market.sourceUrl))
    sources.push({ label: `Market data — ${market.symbol}`, url: market.sourceUrl });

  return { glance: parsed.glance || "", stats: marketStats(market), items, sources };
}
