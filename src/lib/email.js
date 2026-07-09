// Transactional email sender (Resend).
//
// When RESEND_API_KEY is set, delivers for real. Otherwise returns a "stub"
// receipt so the app runs end-to-end with no key (nothing is sent). Swapping
// providers (SendGrid/SES) means changing only this file.
export async function sendEmail({ to, subject, html, from }) {
  const key = process.env.RESEND_API_KEY;
  const sender = from || process.env.EMAIL_FROM || "Metis Client Pulse <pulse@metisstrategy.com>";

  if (!key) {
    return { to, delivered: false, mode: "stub", reason: "RESEND_API_KEY not set" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: sender, to: [to], subject, html }),
    });
    const data = await res.json().catch(() => ({}));
    return {
      to,
      delivered: res.ok,
      mode: "live",
      status: res.status,
      id: data?.id,
      error: res.ok ? undefined : data,
    };
  } catch (e) {
    return { to, delivered: false, mode: "live", error: String(e) };
  }
}
