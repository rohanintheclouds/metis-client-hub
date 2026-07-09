import { renderNewsletter } from "@/lib/newsletter";
import { LATEST_EDITION } from "@/lib/pulse";
import { resolveFollowedClientIds } from "@/lib/follow";
import { listSubscribers, storeMode } from "@/lib/store";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SUBJECT = "Your weekly Client Pulse";

// Current weekday name in America/New_York (so cadence honors ET, not server TZ).
function todayInET() {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/New_York",
  }).format(new Date());
}

// GET /api/cron/weekly
//   • Scheduled run (Vercel Cron / GitHub Action): authorize with
//     Authorization: Bearer <CRON_SECRET>. Sends to every subscriber whose
//     cadence is weekly and whose digestDay === today (ET). Pass ?force=1 to
//     ignore the day match (useful for a manual send / testing).
//   • Preview (?preview=1&to=&clients=&edition=): renders and sends a single
//     message to `to` — used by the "Send me a preview" button.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get("preview") === "1";
  const edition = searchParams.get("edition") || LATEST_EDITION;

  if (preview) {
    const to = searchParams.get("to");
    const recipient = searchParams.get("toName") || (to ? to.split("@")[0] : "Metis Strategy");
    const clientIds = (searchParams.get("clients") || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!to || !clientIds.length) {
      return Response.json({ ok: false, error: "to and clients required" }, { status: 400 });
    }
    const html = renderNewsletter({ clientIds, edition, recipient });
    const result = await sendEmail({ to, subject: `${SUBJECT} (preview)`, html });
    return Response.json({ ok: true, preview: true, ...result });
  }

  // Scheduled run — authorize.
  const secret = process.env.CRON_SECRET;
  if (secret && request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const force = searchParams.get("force") === "1";
  const day = searchParams.get("day") || todayInET();
  const subs = await listSubscribers();

  const due = subs.filter((s) => s.emailCadence !== "off" && (force || s.digestDay === day));
  const results = [];
  for (const s of due) {
    const clientIds = resolveFollowedClientIds(s);
    if (!clientIds.length) {
      results.push({ to: s.email, skipped: "no clients followed" });
      continue;
    }
    const html = renderNewsletter({ clientIds, edition, recipient: s.name, email: s.email });
    const r = await sendEmail({ to: s.email, subject: SUBJECT, html });
    results.push(r);
  }

  return Response.json({
    ok: true,
    store: storeMode(),
    day,
    edition,
    totalSubscribers: subs.length,
    due: due.length,
    sent: results.filter((r) => r.delivered).length,
    stubbed: results.filter((r) => r.mode === "stub").length,
    failed: results.filter((r) => r.mode === "live" && !r.delivered).length,
    results,
  });
}
