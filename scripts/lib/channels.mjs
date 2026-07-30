// ─────────────────────────────────────────────────────────────────────────
// Data channels for the weekly Client Pulse scrape.
//
// Every function here returns ONLY data fetched from a real source, each
// item carrying the URL it came from. Channels that need a key return []
// when the key is absent, so the pipeline degrades gracefully.
//
// No-key channels:   googleNewsRss, secEdgarFilings, yahooMarketData
// Key-gated channels: finnhubMarketData (FINNHUB_API_KEY),
//                     nytArticles (NYT_API_KEY),
//                     tavilyNews (SEARCH_API_KEY)
// ─────────────────────────────────────────────────────────────────────────

// SEC (Akamai) and Yahoo both 403 Node's default fetch fingerprint; a
// browser-like header set passes. Verified 2026-07-29.
const HEADERS = {
  "user-agent":
    process.env.EDGAR_USER_AGENT ||
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  accept: "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

/** "NYSE: AFL" → "AFL"; "Private" → null */
export function tickerSymbol(client) {
  const m = /:\s*([A-Z.]+)\s*$/.exec(client.ticker || "");
  return m ? m[1] : null;
}

function decodeEntities(s) {
  return (s || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/<[^>]+>/g, "")
    .trim();
}

async function getText(url, headers = {}) {
  const res = await fetch(url, { headers: { ...HEADERS, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.text();
}

async function getJson(url, headers = {}) {
  const res = await fetch(url, { headers: { ...HEADERS, ...headers } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  return res.json();
}

function isoDate(s) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

// Finance-SEO churn that adds noise, not news: institutional stake-change
// posts, auto-generated forecast/valuation pages, old earnings-page recrawls.
const JUNK_SOURCES = /marketbeat|tipranks|tradingview|tradingkey|simply wall|zacks|benzinga|etf daily|defense world|stock ?titan|gurufocus|insider monkey|stock traders daily|morningstar|investing\.com|openpr|quiver|acquirer'?s multiple/i;
const JUNK_TITLES = /shares? (sold|bought|acquired)|(trims|boosts|raises|lowers|increases|decreases|cuts) (its )?(stake|position|holdings)|stock forecasts?|revenue breakdown|price target|q[1-4] 20\d\d earnings report - |short interest|13F|dividend announcement|bond (coupon|risk) profile|form 4 |institutional confidence|technical analysis|risk assessment|valuation: p[eb]|financial health|stock (under|out)performs|options market|fantasy football|adp risers|- (marketbeat|tradingview|tradingkey)|price:\d|top-ranked|lobbying update|beneficial stake|smart money|stock price, news, quote/i;

// ── Google News RSS (no key) ─────────────────────────────────────────────
// Real headlines with publisher + link, last N days.
export async function googleNewsRss(client, { days = 8, max = 10 } = {}) {
  const q = encodeURIComponent(`"${client.legalName || client.name}" when:${days}d`);
  const xml = await getText(`https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`);
  const items = [];
  const seen = new Set();
  for (const b of xml.split("<item>").slice(1)) {
    const pick = (tag) => decodeEntities((b.split(`<${tag}>`)[1] || "").split(`</${tag}>`)[0]);
    const title = pick("title");
    const link = pick("link");
    const date = isoDate(pick("pubDate"));
    const source = pick("source");
    if (!title || !link) continue;
    if (JUNK_SOURCES.test(source) || JUNK_TITLES.test(title)) continue;
    const key = title.toLowerCase().replace(/\W+/g, " ").trim();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ channel: "google-news", title, url: link, source, date });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, max);
}

// ── Bing News RSS (no key) ───────────────────────────────────────────────
// Unlike Google News, Bing's feed carries real article snippets, and the
// publisher URL is recoverable from the apiclick redirect's url= param.
export async function bingNewsRss(client, { days = 8, max = 10 } = {}) {
  const q = encodeURIComponent(`"${client.newsQuery || client.name}"`);
  const xml = await getText(`https://www.bing.com/news/search?q=${q}&format=rss`);
  const cutoff = new Date(Date.now() - days * 864e5);
  const items = [];
  const seen = new Set();
  for (const b of xml.split("<item>").slice(1)) {
    const pick = (tag) => decodeEntities((b.split(`<${tag}>`)[1] || "").split(`</${tag}>`)[0]);
    const title = pick("title");
    let url = pick("link");
    const m = /[?&]url=([^&]+)/.exec(url);
    if (m) { try { url = decodeURIComponent(m[1]); } catch { /* keep redirect */ } }
    const d = new Date(pick("pubDate"));
    if (Number.isNaN(d.getTime()) || d < cutoff) continue;
    let source = "";
    try { source = new URL(url).hostname.replace(/^www\./, ""); } catch { /* leave blank */ }
    if (!title || !url) continue;
    if (JUNK_SOURCES.test(source) || JUNK_TITLES.test(title)) continue;
    const key = title.toLowerCase().replace(/\W+/g, " ").trim();
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ channel: "bing-news", title, url, source, date: isoDate(d), snippet: pick("description") });
  }
  return items.sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, max);
}

// ── SEC EDGAR filings (no key) ───────────────────────────────────────────
let _cikMap = null;
async function cikForTicker(symbol) {
  if (!_cikMap) {
    const data = await getJson("https://www.sec.gov/files/company_tickers.json");
    _cikMap = {};
    for (const row of Object.values(data)) _cikMap[row.ticker] = String(row.cik_str).padStart(10, "0");
  }
  return _cikMap[symbol] || null;
}

export async function secEdgarFilings(client, { days = 30, max = 6 } = {}) {
  const symbol = tickerSymbol(client);
  if (!symbol) return [];
  const cik = await cikForTicker(symbol);
  if (!cik) return [];
  const sub = await getJson(`https://data.sec.gov/submissions/CIK${cik}.json`);
  const r = sub.filings?.recent;
  if (!r) return [];
  const cutoff = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  const out = [];
  for (let i = 0; i < r.form.length && out.length < max; i++) {
    if (r.filingDate[i] < cutoff) continue;
    if (!["8-K", "10-Q", "10-K", "8-K/A", "10-Q/A"].includes(r.form[i])) continue;
    const acc = r.accessionNumber[i].replace(/-/g, "");
    out.push({
      channel: "sec-edgar",
      title: `${r.form[i]} filed ${r.filingDate[i]}${r.items?.[i] ? ` — items ${r.items[i]}` : ""}`,
      url: `https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${acc}/${r.primaryDocument[i]}`,
      source: "SEC EDGAR",
      date: r.filingDate[i],
      form: r.form[i],
    });
  }
  return out;
}

// ── Market data — Yahoo Finance chart API (no key) ───────────────────────
export async function yahooMarketData(client) {
  const symbol = tickerSymbol(client);
  if (!symbol) return null;
  const data = await getJson(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1y&interval=1d`);
  const result = data.chart?.result?.[0];
  if (!result?.meta?.regularMarketPrice) return null;
  const meta = result.meta;
  const closes = (result.indicators?.quote?.[0]?.close || []).filter(Number.isFinite);
  const stamps = result.timestamp || [];
  const price = meta.regularMarketPrice;
  const year = new Date().getUTCFullYear();
  const firstIdxOfYear = stamps.findIndex((t) => new Date(t * 1000).getUTCFullYear() === year);
  const ytd = firstIdxOfYear >= 0 && closes[firstIdxOfYear] ? (price / closes[firstIdxOfYear] - 1) * 100 : null;
  return {
    channel: "yahoo",
    symbol,
    price,
    priceDate: isoDate(new Date((meta.regularMarketTime || 0) * 1000)) || isoDate(new Date()),
    wk52Low: meta.fiftyTwoWeekLow ?? (closes.length ? Math.min(...closes) : null),
    wk52High: meta.fiftyTwoWeekHigh ?? (closes.length ? Math.max(...closes) : null),
    ytdPct: ytd,
    sourceUrl: `https://finance.yahoo.com/quote/${symbol}/`,
  };
}

// ── Market data — Finnhub (FINNHUB_API_KEY) ──────────────────────────────
export async function finnhubMarketData(client) {
  const key = process.env.FINNHUB_API_KEY;
  const symbol = tickerSymbol(client);
  if (!key || !symbol) return null;
  const base = "https://finnhub.io/api/v1";
  const [quote, profile] = await Promise.all([
    getJson(`${base}/quote?symbol=${symbol}&token=${key}`),
    getJson(`${base}/stock/profile2?symbol=${symbol}&token=${key}`),
  ]);
  if (!quote?.c) return null;
  let nextEarnings = null;
  try {
    const d2 = new Date(Date.now() + 100 * 864e5).toISOString().slice(0, 10);
    const d1 = new Date().toISOString().slice(0, 10);
    const cal = await getJson(`${base}/calendar/earnings?from=${d1}&to=${d2}&symbol=${symbol}&token=${key}`);
    nextEarnings = cal?.earningsCalendar?.[0]?.date || null;
  } catch { /* earnings calendar is a paid endpoint on some plans */ }
  return {
    channel: "finnhub",
    symbol,
    price: quote.c,
    priceDate: new Date().toISOString().slice(0, 10),
    marketCapM: profile?.marketCapitalization || null,
    nextEarnings,
    sourceUrl: `https://finnhub.io/quote/${symbol}`,
  };
}

// ── NYT Article Search (NYT_API_KEY) ─────────────────────────────────────
// Free key at https://developer.nytimes.com (separate from the reader login).
export async function nytArticles(client, { days = 8, max = 6 } = {}) {
  const key = process.env.NYT_API_KEY;
  if (!key) return [];
  const begin = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10).replace(/-/g, "");
  const q = encodeURIComponent(`"${client.legalName || client.name}"`);
  const data = await getJson(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&begin_date=${begin}&sort=newest&api-key=${key}`
  );
  return (data.response?.docs || []).slice(0, max).map((d) => ({
    channel: "nyt",
    title: d.headline?.main,
    url: d.web_url,
    source: "The New York Times",
    date: d.pub_date,
    snippet: d.abstract || d.snippet || "",
  })).filter((x) => x.title && x.url);
}

// ── Guardian Open Platform (GUARDIAN_API_KEY) ────────────────────────────
// Free developer key at https://open-platform.theguardian.com (500 calls/day).
// The most generous major-outlet API: returns full article standfirsts.
export async function guardianArticles(client, { days = 8, max = 6 } = {}) {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];
  const from = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  // Guardian copy uses short names ("Workday"), never legal names ("Workday, Inc.").
  // Clients with generic-phrase names set roster.newsQuery to disambiguate.
  const q = encodeURIComponent(`"${client.newsQuery || client.name}"`);
  const data = await getJson(
    `https://content.guardianapis.com/search?q=${q}&from-date=${from}&order-by=newest&show-fields=trailText&page-size=${max}&api-key=${key}`
  );
  return (data.response?.results || []).map((r) => ({
    channel: "guardian",
    title: decodeEntities(r.webTitle),
    url: r.webUrl,
    source: "The Guardian",
    date: isoDate(r.webPublicationDate),
    snippet: decodeEntities(r.fields?.trailText || ""),
  })).filter((x) => x.title && x.url);
}

// ── Tavily news search (SEARCH_API_KEY) ──────────────────────────────────
export async function tavilyNews(client, { days = 8, max = 8 } = {}) {
  const key = process.env.SEARCH_API_KEY;
  if (!key) return [];
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      api_key: key,
      query: `${client.legalName || client.name} news`,
      topic: "news",
      days,
      max_results: max,
    }),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}`);
  const data = await res.json();
  return (data.results || []).map((r) => ({
    channel: "tavily",
    title: r.title,
    url: r.url,
    source: new URL(r.url).hostname.replace(/^www\./, ""),
    date: r.published_date || "",
    snippet: r.content || "",
  }));
}

// ── Aggregate all channels for one client ────────────────────────────────
export async function gatherClient(client) {
  const settle = (p) => p.then((v) => v).catch((e) => ({ __error: String(e.message || e) }));
  const [bing, news, nyt, guardian, tavily, filings, finnhub, yahoo] = await Promise.all([
    settle(bingNewsRss(client)),
    settle(googleNewsRss(client)),
    settle(nytArticles(client)),
    settle(guardianArticles(client)),
    settle(tavilyNews(client)),
    settle(secEdgarFilings(client)),
    settle(finnhubMarketData(client)),
    settle(yahooMarketData(client)),
  ]);
  const errs = [];
  const arr = (x, name) => (Array.isArray(x) ? x : (x?.__error && errs.push(`${name}: ${x.__error}`), []));
  const obj = (x, name) => (x && !x.__error ? x : (x?.__error && errs.push(`${name}: ${x.__error}`), null));
  // Snippet-bearing channels first, then dedupe by normalized title so the
  // readable version of a story wins over a bare-headline duplicate.
  const merged = [];
  const seen = new Set();
  for (const a of [...arr(bing, "bing-news"), ...arr(nyt, "nyt"), ...arr(guardian, "guardian"), ...arr(tavily, "tavily"), ...arr(news, "google-news")]) {
    const key = a.title.toLowerCase().replace(/\W+/g, " ").trim().slice(0, 60);
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(a);
  }
  return {
    articles: merged,
    filings: arr(filings, "sec-edgar"),
    market: obj(finnhub, "finnhub") || obj(yahoo, "yahoo"),
    errors: errs,
  };
}
