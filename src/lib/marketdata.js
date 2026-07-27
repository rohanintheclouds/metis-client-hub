"use client";

// ─────────────────────────────────────────────────────────────────────────
// Live market data via a published Google Sheet running =GOOGLEFINANCE().
//
// No API key, no paywall, no scraping: GOOGLEFINANCE is an official Google
// Sheets feature. Set up once:
//   1. Create a Sheet with one row per ticker and these formulas:
//        A: ticker, e.g. "NYSE:AFL"
//        B: =GOOGLEFINANCE(A2,"price")
//        C: =GOOGLEFINANCE(A2,"marketcap")
//        D: =GOOGLEFINANCE(A2,"high52")
//        E: =GOOGLEFINANCE(A2,"low52")
//        F: =GOOGLEFINANCE(A2,"pe")
//        G: =INDEX(GOOGLEFINANCE(A2,"price",DATE(YEAR(TODAY()),1,2)),2,2)
//        H: =IFERROR((B2-G2)/G2,"")
//   2. File → Share → Publish to web → this sheet → CSV → copy the URL.
//   3. Set NEXT_PUBLIC_MARKET_DATA_CSV_URL to that URL in .env.local.
//
// Client-side only (the URL is public once published, so no secret to
// protect) — this is a progressive enhancement over the static research
// snapshot in pulse.js, not a replacement for it. If the fetch fails or the
// env var isn't set, callers should fall back to the seeded stats.
// ─────────────────────────────────────────────────────────────────────────

// clientId -> ticker exactly as it appears in column A of the Sheet.
export const TICKER_MAP = {
  aflac: "NYSE:AFL",
  "ford-credit": "NYSE:F",
  "lumen-technologies": "NYSE:LUMN",
  adp: "NASDAQ:ADP",
  "generac-power-systems": "NYSE:GNRC",
  "nrg-energy": "NYSE:NRG",
  "regal-rexnord": "NYSE:RRX",
  "vulcan-materials": "NYSE:VMC",
  loandepot: "NYSE:LDI",
  "rockwell-automation": "NYSE:ROK",
  workday: "NASDAQ:WDAY",
  "intuitive-surgical": "NASDAQ:ISRG",
};

function parseCsv(text) {
  const rows = text
    .trim()
    .split("\n")
    .map((line) => line.split(",").map((cell) => cell.replace(/^"|"$/g, "").trim()));
  const [, ...body] = rows; // drop header row
  const byTicker = {};
  for (const [ticker, price, marketCap, high52, low52, pe, , ytdPct] of body) {
    if (!ticker) continue;
    byTicker[ticker] = {
      price: Number(price) || null,
      marketCap: Number(marketCap) || null,
      high52: Number(high52) || null,
      low52: Number(low52) || null,
      pe: Number(pe) || null,
      ytdPct: ytdPct === "" || ytdPct == null ? null : Number(ytdPct),
    };
  }
  return byTicker;
}

function fmtMoney(n) {
  if (n == null) return null;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toFixed(2)}`;
}

/**
 * Fetch and shape live stats for one client's ticker.
 * Returns null (fall back to the seeded snapshot) if unconfigured, unreachable,
 * or the ticker isn't a row in the sheet — never throws.
 */
export async function fetchLiveStats(clientId) {
  const url = process.env.NEXT_PUBLIC_MARKET_DATA_CSV_URL;
  const ticker = TICKER_MAP[clientId];
  if (!url || !ticker) return null;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const row = parseCsv(await res.text())[ticker];
    if (!row?.price) return null;

    const stats = [
      { v: `$${row.price.toFixed(2)}`, l: "Price · live", dir: null },
      row.ytdPct != null && {
        v: `${row.ytdPct >= 0 ? "+" : ""}${(row.ytdPct * 100).toFixed(1)}%`,
        l: "YTD growth",
        dir: row.ytdPct >= 0 ? "up" : "down",
      },
      row.marketCap && { v: fmtMoney(row.marketCap), l: "Market cap", dir: null },
      row.low52 && row.high52 && { v: `$${row.low52.toFixed(2)}–$${row.high52.toFixed(2)}`, l: "52-wk range", dir: null },
      row.pe && { v: row.pe.toFixed(1), l: "P/E ratio", dir: null },
    ].filter(Boolean);

    return { stats, fetchedAt: new Date().toISOString() };
  } catch {
    return null;
  }
}
