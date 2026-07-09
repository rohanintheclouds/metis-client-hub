import { renderNewsletter } from "@/lib/newsletter";
import { LATEST_EDITION } from "@/lib/pulse";

// Weekly digest job.
//
// Production: schedule via Vercel Cron (see vercel.json) or a GitHub Action for
// Mondays 07:00 ET. It should (1) load every user + their followed clients from
// the DB, (2) render a personalized newsletter, (3) send via the email provider
// (Resend/SendGrid/SES). Authorized with the CRON_SECRET header.
//
// Prototype: with no RESEND_API_KEY set it does NOT send. It renders the message
// and returns a JSON receipt so you can see exactly what each user would get.
// Called with ?preview=1 from the "Send me a preview" button in My Pulse.

async function sendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { delivered: false, mode: "stub", reason: "RESEND_API_KEY not set" };
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Metis Client Pulse <pulse@metisstrategy.com>",
      to,
      subject,
      html,
    }),
  });
  return { delivered: res.ok, mode: "live", status: res.status };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const preview = searchParams.get("preview") === "1";

  // Authorize non-preview (real) cron runs with the shared secret.
  if (!preview) {
    const secret = process.env.CRON_SECRET;
    const auth = request.headers.get("authorization");
    if (secret && auth !== `Bearer ${secret}`) {
      return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  const to = searchParams.get("to") || "";
  const recipient = searchParams.get("toName") || to.split("@")[0] || "Metis Strategy";
  const edition = searchParams.get("edition") || LATEST_EDITION;
  const clientIds = (searchParams.get("clients") || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (preview) {
    // Single-recipient preview (the signed-in user asked for it).
    const html = renderNewsletter({ clientIds, edition, recipient });
    const result = await sendEmail({ to, subject: "Your Client Pulse (preview)", html });
    return Response.json({
      ok: true,
      preview: true,
      to,
      clients: clientIds,
      ...result,
      note: result.delivered
        ? "Preview emailed."
        : "Stub mode: email not sent. Set RESEND_API_KEY to deliver for real.",
    });
  }

  // Real weekly run: in production iterate over all users from the DB.
  // Here we return a scheduling receipt describing the job.
  return Response.json({
    ok: true,
    job: "weekly-client-pulse",
    edition,
    scheduledFor: "Mondays 07:00 America/New_York",
    note: "Wire a users table + RESEND_API_KEY to fan out personalized sends.",
  });
}
