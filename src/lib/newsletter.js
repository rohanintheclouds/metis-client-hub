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

// Official Metis Strategy lockup (from metisstrategy.com), black wordmark + green mark.
const LOGO_SVG = `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640.66 253.05" width="118" height="46" aria-label="Metis Strategy">
  <polygon points="122.26 3.12 84.41 126.49 142.41 22.63 142.41 126.17 168.82 126.17 168.82 3.12 122.26 3.12" fill="#000" fill-rule="evenodd"/>
  <polygon points="0 3.12 0 126.17 26.41 126.17 26.41 22.63 84.41 126.49 46.56 3.12 0 3.12" fill="#000" fill-rule="evenodd"/>
  <polygon points="26.41 130 0 130 0 253.05 46.56 253.05 84.41 129.68 26.41 233.54 26.41 130" fill="#49d8c3" fill-rule="evenodd"/>
  <polygon points="142.41 130 142.41 233.54 84.41 129.68 122.26 253.05 168.82 253.05 168.82 130 142.41 130" fill="#49d8c3" fill-rule="evenodd"/>
  <path fill="#000" fill-rule="evenodd" d="M623.68,29.11c-2.6-3.04-6.28-5.58-11.03-7.63-4.75-2.05-9.53-3.07-14.35-3.07-2.86,0-5.72.32-8.59.97-2.86.64-5.47,1.64-7.81,2.98-2.34,1.35-4.26,3.1-5.76,5.26-1.5,2.16-2.24,4.77-2.24,7.8,0,2.81.65,5.2,1.95,7.19,1.3,1.99,3.09,3.68,5.37,5.09,2.28,1.4,5.04,2.63,8.29,3.68l10.74,3.16,13.76,4.39c4.75,1.64,9.11,3.8,13.08,6.49,3.97,2.69,7.22,6.08,9.76,10.17,2.54,4.09,3.81,9.18,3.81,15.26,0,6.67-1.37,12.48-4.1,17.45-2.73,4.97-6.38,9.09-10.93,12.36-4.55,3.27-9.89,5.73-16.01,7.37-6.12,1.64-12.56,2.46-19.32,2.46-8.98,0-17.76-1.49-26.35-4.47-8.59-2.98-15.61-7.4-21.08-13.24l17.57-14.73c3.38,4.21,7.9,7.54,13.57,10,5.66,2.46,11.22,3.68,16.69,3.68,2.86,0,5.79-.32,8.78-.96,2.99-.64,5.69-1.73,8.1-3.25,2.41-1.52,4.36-3.42,5.86-5.7,1.5-2.28,2.24-5.11,2.24-8.51s-.85-5.99-2.54-8.15c-1.69-2.16-3.97-4.04-6.83-5.61s-6.25-2.95-10.15-4.12l-12.3-3.68c-4.16-1.17-8.33-2.57-12.49-4.21-4.16-1.64-7.91-3.8-11.22-6.49-3.32-2.69-6.02-5.99-8.1-9.91-2.08-3.92-3.12-8.8-3.12-14.64,0-6.31,1.46-11.75,4.39-16.31,2.93-4.56,6.77-8.33,11.52-11.31,4.75-2.98,10.15-5.2,16.2-6.66,6.05-1.46,12.2-2.19,18.45-2.19,7.03,0,14.15,1.11,21.37,3.33,7.22,2.22,13.5,5.55,18.84,10l-16.01,15.78M478.64,3.16h24.59v124.16h-24.59V3.16ZM376.16,22.45h-42.36V3.16h109.31v19.29h-42.36v104.87h-24.59V22.45ZM209.64,3.16h91.55v19.29h-66.95v31.57h63.44v18.59h-63.44v35.07h70.47v19.64h-95.06V3.16ZM612.95,186.51h-4.46v-12.74l-11.82-16.74h5.44l8.75,13.33,8.79-13.33h5.13l-11.82,16.74v12.74ZM587.43,163.11c-.95-.97-2.16-1.75-3.64-2.33-1.47-.58-3.11-.87-4.93-.87s-3.51.31-4.99.94c-1.49.62-2.75,1.48-3.79,2.56-1.04,1.08-1.84,2.34-2.41,3.77-.57,1.43-.85,2.95-.85,4.56s.28,3.18.85,4.62c.57,1.44,1.37,2.7,2.41,3.77,1.04,1.07,2.32,1.91,3.84,2.52,1.52.61,3.21.92,5.09.92,1.49,0,2.86-.13,4.1-.37,1.25-.25,2.33-.61,3.26-1.08v-8.2h-7v-3.5h11.38v14.28c-1.67.83-3.48,1.47-5.44,1.92-1.96.44-4.1.67-6.42.67-2.47,0-4.74-.38-6.8-1.15-2.07-.76-3.84-1.83-5.33-3.21-1.49-1.37-2.65-3.01-3.48-4.91-.83-1.9-1.25-3.99-1.25-6.27s.42-4.41,1.27-6.31c.85-1.9,2.02-3.52,3.52-4.87,1.5-1.35,3.28-2.39,5.33-3.14,2.05-.75,4.28-1.12,6.69-1.12,2.53,0,4.78.35,6.76,1.04,1.98.69,3.62,1.62,4.93,2.79l-3.08,3ZM536.74,182.85h16.51v3.66h-20.92v-29.48h20.25v3.62h-15.84v8.83h14.9v3.54h-14.9v9.83ZM513.53,186.51h-4.42v-25.86h-10.13v-3.62h24.67v3.62h-10.13v25.86ZM474.98,175.65h11.82l-5.89-13.82-5.93,13.82ZM470.25,186.51h-4.91l13.7-29.48h4.01l13.56,29.48h-5l-3.21-7.25h-14.99l-3.17,7.25ZM441.51,169.94h5.09c1.04,0,2.01-.08,2.9-.25.89-.17,1.67-.44,2.34-.81.67-.37,1.2-.86,1.58-1.46.39-.6.58-1.34.58-2.23s-.19-1.63-.58-2.23c-.39-.6-.9-1.07-1.54-1.44-.64-.36-1.39-.62-2.25-.77-.86-.15-1.77-.23-2.72-.23h-5.4v9.41ZM441.51,186.51h-4.42v-29.48h10.13c1.52,0,2.96.15,4.33.44,1.37.29,2.57.76,3.59,1.39,1.03.64,1.84,1.48,2.43,2.52.59,1.04.89,2.31.89,3.81,0,2.16-.71,3.91-2.14,5.25-1.43,1.33-3.27,2.18-5.53,2.54l8.83,13.53h-5.35l-8.03-13.12h-4.73v13.12ZM418.31,186.51h-4.42v-25.86h-10.13v-3.62h24.67v3.62h-10.13v25.86ZM393.81,162.49c-.63-.8-1.47-1.46-2.54-1.98-1.07-.51-2.27-.77-3.61-.77-.71,0-1.44.09-2.17.27-.73.18-1.39.47-1.98.87-.59.4-1.08.9-1.45,1.5-.37.6-.56,1.31-.56,2.15s.17,1.48.51,2.02c.34.54.8,1,1.38,1.38.58.37,1.26.69,2.05.96l2.52.81c1.07.3,2.16.65,3.26,1.04,1.1.39,2.1.9,2.99,1.54s1.62,1.44,2.19,2.39c.56.96.85,2.17.85,3.64s-.3,2.85-.91,3.98c-.61,1.12-1.42,2.05-2.43,2.79-1.01.74-2.18,1.28-3.5,1.64-1.32.36-2.68.54-4.08.54-1.99,0-3.92-.36-5.78-1.08-1.86-.72-3.4-1.79-4.62-3.21l3.43-2.71c.74,1.03,1.74,1.86,2.99,2.5,1.25.64,2.6.96,4.06.96.74,0,1.49-.1,2.23-.29.74-.19,1.42-.5,2.03-.92.61-.42,1.11-.94,1.5-1.56.39-.63.58-1.38.58-2.27s-.2-1.63-.6-2.23c-.4-.6-.94-1.1-1.63-1.52-.68-.42-1.48-.77-2.39-1.06l-2.88-.89c-1.01-.28-2.01-.62-2.99-1.02-.98-.4-1.86-.92-2.63-1.54-.77-.62-1.4-1.39-1.87-2.31-.48-.92-.71-2.05-.71-3.41,0-1.47.32-2.73.96-3.79.64-1.06,1.47-1.93,2.5-2.62,1.03-.69,2.18-1.2,3.48-1.52,1.29-.32,2.59-.48,3.9-.48,1.84,0,3.57.31,5.18.92,1.6.61,2.9,1.43,3.88,2.46l-3.12,2.83Z"/>
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
export function renderNewsletter({ clientIds, edition, recipient = "Metis Strategy", glance, email }) {
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
      Prepared for ${esc(recipient)} · Metis Strategy Client Research · Delivered weekly
      ${
        email
          ? `<div style="margin-top:6px;"><a class="src" href="${esc(
              (process.env.NEXT_PUBLIC_APP_URL || "") + "/api/unsubscribe?email=" + encodeURIComponent(email)
            )}">Unsubscribe</a> · <a class="src" href="${esc(
              (process.env.NEXT_PUBLIC_APP_URL || "") + "/settings"
            )}">Manage subscription</a></div>`
          : ""
      }
      <div class="disc">Market data is point-in-time and may lag. Figures are summarized from public sources for informational purposes only and are not investment advice.</div>
    </footer>
  </div>
</div>
</body>
</html>`;
}
