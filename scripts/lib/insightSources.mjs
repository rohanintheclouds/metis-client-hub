// ─────────────────────────────────────────────────────────────────────────
// Research-report sources for the Market Insights tab.
//
// Strategy per firm:
//   • McKinsey  — real RSS feed (title, link, description, date)
//   • Goldman Sachs, Bain, Morgan Stanley, J.P. Morgan — their insight
//     listing pages are JS-rendered, so we read their sitemaps instead
//     (URL + lastmod), then fetch each candidate page's <title> and meta
//     description. Everything returned is fetched, never invented.
// ─────────────────────────────────────────────────────────────────────────

const HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  accept: "text/html,application/xml,application/rss+xml;q=0.9,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.9",
};

function decode(s) {
  return (s || "")
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;|&#x27;|&rsquo;/g, "'")
    .replace(/&nbsp;/g, " ").replace(/&#\d+;/g, " ")
    .replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

async function getText(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`${res.status} — ${url}`);
  return res.text();
}

function parseSitemap(xml) {
  const out = [];
  for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:[\s\S]*?<lastmod>([^<]+)<\/lastmod>)?[\s\S]*?<\/url>/g)) {
    out.push({ url: m[1].trim(), lastmod: (m[2] || "").slice(0, 10) });
  }
  return out;
}

async function pageMeta(url) {
  const html = await getText(url);
  const pick = (re) => decode((html.match(re) || [])[1] || "");
  const title =
    pick(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i) ||
    pick(/<title[^>]*>([^<]+)<\/title>/i);
  const description =
    pick(/<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i) ||
    pick(/<meta[^>]+name="description"[^>]+content="([^"]+)"/i);
  return { title, description };
}

// Hub/landing pages that match the URL patterns but are not reports.
const HUB_SLUGS = /\/(insights|ideas|articles|reports|topics|featured-topics|industry-insights|consulting-services-insights|our-insights)\/?$/;

async function fromSitemap({ firm, firmId, sitemapUrl, pattern, days, max }) {
  const cutoff = new Date(Date.now() - days * 864e5).toISOString().slice(0, 10);
  const entries = parseSitemap(await getText(sitemapUrl));
  // lastmod tracks page edits, not publication — a slug naming an old year
  // (e.g. "…-2024-how-to-invest") betrays recycled content; drop it.
  const staleYear = new RegExp(`(?:^|-)((?:19|20)\\d\\d)(?:-|$)`);
  const minYear = new Date().getFullYear() - 1;
  const candidates = entries
    .filter((e) => pattern.test(e.url) && !HUB_SLUGS.test(e.url))
    .filter((e) => {
      const m = staleYear.exec(e.url.split("/").pop() || "");
      return !m || Number(m[1]) >= minYear;
    })
    .filter((e) => e.lastmod && e.lastmod >= cutoff)
    .sort((a, b) => (a.lastmod < b.lastmod ? 1 : -1))
    .slice(0, max);
  const out = [];
  for (const c of candidates) {
    try {
      const meta = await pageMeta(c.url);
      if (!meta.title) continue;
      out.push({ firm, firmId, title: meta.title, summary: meta.description, url: c.url, date: c.lastmod });
    } catch { /* page fetch failed — skip, never fabricate */ }
  }
  return out;
}

export async function mckinseyReports({ days = 30, max = 8 } = {}) {
  const xml = await getText("https://www.mckinsey.com/insights/rss");
  const cutoff = new Date(Date.now() - days * 864e5);
  const out = [];
  for (const b of xml.split("<item>").slice(1)) {
    const pick = (tag) => decode((b.split(`<${tag}>`)[1] || "").split(`</${tag}>`)[0]);
    const date = new Date(pick("pubDate"));
    if (Number.isNaN(date.getTime()) || date < cutoff) continue;
    out.push({
      firm: "McKinsey & Company",
      firmId: "mckinsey",
      title: pick("title"),
      summary: pick("description"),
      url: pick("link"),
      date: date.toISOString().slice(0, 10),
    });
    if (out.length >= max) break;
  }
  return out;
}

export function goldmanReports(opts = {}) {
  return fromSitemap({
    firm: "Goldman Sachs", firmId: "goldman-sachs",
    sitemapUrl: "https://www.goldmansachs.com/sitemap-1.xml",
    pattern: /goldmansachs\.com\/insights\/articles\/[a-z0-9-]+/,
    days: opts.days ?? 30, max: opts.max ?? 8,
  });
}

export function bainReports(opts = {}) {
  return fromSitemap({
    firm: "Bain & Company", firmId: "bain",
    sitemapUrl: "https://www.bain.com/sitemap.xml",
    pattern: /bain\.com\/insights\/[a-z0-9-]+\/?$/,
    days: opts.days ?? 30, max: opts.max ?? 8,
  });
}

export function morganStanleyReports(opts = {}) {
  return fromSitemap({
    firm: "Morgan Stanley", firmId: "morgan-stanley",
    sitemapUrl: "https://www.morganstanley.com/sitemap.xml",
    pattern: /morganstanley\.com\/(ideas|insights)\/[a-z0-9-]+$/,
    days: opts.days ?? 30, max: opts.max ?? 8,
  });
}

export function jpmorganReports(opts = {}) {
  return fromSitemap({
    firm: "J.P. Morgan", firmId: "jpmorgan",
    sitemapUrl: "https://www.jpmorgan.com/US/en/sitemap.xml",
    pattern: /jpmorgan\.com\/(?:US\/en\/)?insights\/[a-z0-9\/-]+$/,
    days: opts.days ?? 30, max: opts.max ?? 8,
  });
}

export async function gatherInsights(opts = {}) {
  const settle = (p) => p.then((v) => v).catch((e) => ({ __error: String(e.message || e) }));
  const results = await Promise.all([
    settle(mckinseyReports(opts)),
    settle(goldmanReports(opts)),
    settle(bainReports(opts)),
    settle(morganStanleyReports(opts)),
    settle(jpmorganReports(opts)),
  ]);
  const errors = [];
  const reports = results.flatMap((r, i) => {
    if (Array.isArray(r)) return r;
    errors.push(["mckinsey", "goldman", "bain", "morgan-stanley", "jpmorgan"][i] + ": " + r.__error);
    return [];
  });
  return { reports, errors };
}
