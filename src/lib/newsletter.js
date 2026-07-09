// ─────────────────────────────────────────────────────────────────────────
// Standalone Client Pulse newsletter renderer.
//
// Produces the exact self-contained HTML used in the uploaded Client Pulse
// briefings. Shared by:
//   • GET /api/newsletter  (in-app "view / download this week's email")
//   • the weekly cron job   (the message actually emailed to each user)
//
// Pure function, no framework deps, so it renders identically server-side and
// inside a transactional-email body.
// ─────────────────────────────────────────────────────────────────────────

import { getClient } from "@/lib/clients";
import { getPulse, editionMeta } from "@/lib/pulse";

function esc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const LOGO_SVG = `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 348 108" aria-label="Metis Strategy">
  <g transform="translate(2,8) scale(0.8)">
    <polygon points="0,0 15,0 15,48 0,48" fill="#111111"/>
    <polygon points="85,0 100,0 100,48 85,48" fill="#111111"/>
    <polygon points="15,0 30,0 50,30 70,0 85,0 50,48" fill="#111111"/>
    <polygon points="0,48 15,48 15,96 0,96" fill="#3FC9BE"/>
    <polygon points="85,48 100,48 100,96 85,96" fill="#3FC9BE"/>
    <polygon points="15,96 30,96 50,66 70,96 85,96 50,48" fill="#3FC9BE"/>
  </g>
  <text x="92" y="86" font-family="Arial,Helvetica,sans-serif" font-size="108" font-weight="800" letter-spacing="1" fill="#111111">ETIS</text>
  <text x="336" y="103" text-anchor="end" font-family="Arial,Helvetica,sans-serif" font-size="20" font-weight="600" letter-spacing="6" fill="#444444">STRATEGY</text>
</svg>`;

function statHtml(s) {
  const cls = s.dir === "up" ? " up" : s.dir === "down" ? " down" : "";
  return `<div class="stat"><div class="v${cls}">${esc(s.v)}</div><div class="l">${esc(s.l)}</div></div>`;
}

function itemHtml(it) {
  return `<li><b>${esc(it.headline)}</b> ${esc(it.body)} <span class="ctx">${esc(it.ctx)}</span></li>`;
}

function sourceHtml(sources = []) {
  if (!sources.length) return "";
  const links = sources
    .map((s) => `<a class="src" href="${esc(s.url)}">${esc(s.label)}</a>`)
    .join(" · ");
  return `<p style="font-size:13px;margin:12px 0 0;">Sources: ${links}</p>`;
}

function sectionHtml(client, edition, isLead) {
  const data = getPulse(client.id, edition);
  if (!data) return "";
  const priv = client.ticker === "Private";
  const stats = (data.stats || []).map(statHtml).join("");
  const items = (data.items || []).map(itemHtml).join("");
  return `
    <section id="${client.id}"${isLead ? ' class="lead-card"' : ""}>
      <details${isLead ? " open" : ""}>
        <summary>
          <span class="tick">${esc(client.name)} <span class="sub">${esc(client.ticker)}</span></span>
          ${isLead ? '<span class="pill lead">Priority</span>' : ""}
          ${priv && !isLead ? '<span class="pill priv">Private</span>' : ""}
          <span class="chev">&#9654;</span>
        </summary>
        ${stats ? `<div class="quote">${stats}</div>` : ""}
        <ul class="items">${items}</ul>
        ${sourceHtml(data.sources)}
      </details>
    </section>`;
}

/**
 * @param {object}   opts
 * @param {string[]} opts.clientIds  clients to include (order preserved; first = lead)
 * @param {string}   opts.edition    edition id, e.g. "2026-07-06"
 * @param {string}   opts.recipient  name for the footer ("Prepared for …")
 * @param {string}   opts.glance     optional override for the "at a glance" summary
 * @returns {string} full HTML document
 */
export function renderNewsletter({ clientIds, edition, recipient = "Metis Strategy", glance }) {
  const meta = editionMeta(edition);
  const clients = clientIds.map(getClient).filter(Boolean);

  const nav = clients
    .map((c, i) => `<a${i === 0 ? ' class="lead"' : ""} href="#${c.id}">${esc(c.name)}</a>`)
    .join("\n      ");

  const sections = clients.map((c, i) => sectionHtml(c, edition, i === 0)).join("\n");

  const glanceText =
    glance ||
    `Your personalized Client Pulse for ${meta.label.toLowerCase()} covers ${clients
      .map((c) => c.name)
      .join(", ")}. Expand any client below for the week's key developments, market data, and sources.`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Client Pulse — ${esc(meta.label)}</title>
<style>
  :root{--ink:#111111;--teal:#3FC9BE;--teal-d:#1f9d93;--muted:#5c6470;--line:#e6e8eb;--bg:#f4f6f7;--card:#ffffff;--up:#137a4b;--down:#c0392b;}
  *{box-sizing:border-box;}
  body{margin:0;background:var(--bg);font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:var(--ink);line-height:1.55;}
  .wrap{max-width:680px;margin:0 auto;padding:24px 16px 56px;}
  .card{background:var(--card);border:1px solid var(--line);border-radius:14px;overflow:hidden;}
  header{padding:26px 28px 20px;border-bottom:3px solid var(--teal);}
  .logo{height:46px;display:block;}
  .kicker{display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:8px;margin-top:20px;}
  h1{font-size:26px;margin:0;letter-spacing:-.3px;}
  h1 .accent{color:var(--teal-d);}
  .date{color:var(--muted);font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;}
  .nav{display:flex;flex-wrap:wrap;gap:8px;padding:16px 28px;background:#fafbfb;border-bottom:1px solid var(--line);}
  .nav a{text-decoration:none;font-size:13px;font-weight:600;color:var(--ink);background:#eef1f1;padding:6px 12px;border-radius:999px;border:1px solid var(--line);}
  .nav a.lead{background:var(--ink);color:#fff;}
  .nav a:hover{background:var(--teal);color:#08312e;border-color:var(--teal);}
  .summary{padding:18px 28px;background:#fbfdfd;border-bottom:1px solid var(--line);font-size:14.5px;color:#2a2f36;}
  section{padding:6px 28px 4px;border-bottom:1px solid var(--line);}
  details{padding:14px 0;}
  details[open]{padding-bottom:18px;}
  summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;outline:none;}
  summary::-webkit-details-marker{display:none;}
  .tick{font-weight:800;font-size:18px;}
  .tick .sub{font-weight:500;color:var(--muted);font-size:13px;margin-left:6px;}
  .chev{margin-left:auto;color:var(--muted);transition:transform .2s;font-size:13px;}
  details[open] .chev{transform:rotate(90deg);}
  .pill{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;padding:3px 9px;border-radius:999px;}
  .pill.lead{background:var(--teal);color:#08312e;}
  .pill.priv{background:#ece7fb;color:#5b3fb5;}
  .quote{display:flex;gap:18px;flex-wrap:wrap;margin:14px 0 4px;}
  .stat{min-width:120px;}
  .stat .v{font-size:22px;font-weight:800;}
  .stat .l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.6px;}
  .up{color:var(--up);} .down{color:var(--down);}
  ul.items{margin:10px 0 0;padding-left:0;list-style:none;}
  ul.items li{position:relative;padding:9px 0 9px 22px;border-top:1px dashed var(--line);font-size:14.5px;}
  ul.items li:before{content:"";position:absolute;left:2px;top:16px;width:8px;height:8px;border-radius:2px;background:var(--teal);}
  ul.items li b{color:var(--ink);}
  .ctx{color:var(--muted);}
  a.src{color:var(--teal-d);text-decoration:none;border-bottom:1px solid #bfe9e4;font-weight:600;}
  footer{padding:22px 28px;color:var(--muted);font-size:12.5px;}
  footer .disc{margin-top:8px;font-size:11.5px;color:#9aa1a9;}
  .lead-card{box-shadow:inset 4px 0 0 var(--teal);}
</style>
</head>
<body>
<div class="wrap">
  <div class="card">
    <header>
      ${LOGO_SVG}
      <div class="kicker">
        <h1>Client <span class="accent">Pulse</span></h1>
        <div class="date">${esc(meta.label)}</div>
      </div>
    </header>
    <nav class="nav">
      ${nav}
    </nav>
    <div class="summary"><b>This week at a glance:</b> ${esc(glanceText)}</div>
    ${sections}
    <footer>
      Prepared for ${esc(recipient)} · Metis Strategy Client Research · Delivered weekly, Mondays at 7:00 AM ET
      <div class="disc">Market data is point-in-time and may lag. Figures are summarized from public sources for informational purposes only and are not investment advice.</div>
    </footer>
  </div>
</div>
</body>
</html>`;
}
