import { removeSubscriber } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/unsubscribe?email=  — one-click unsubscribe link used in email footers.
export async function GET(request) {
  const email = new URL(request.url).searchParams.get("email");
  const page = (title, msg) => `<!DOCTYPE html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>
<style>body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f8f8f8;color:#111;
display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;}
.c{background:#fff;border:1px solid #e7e9ee;border-radius:16px;padding:36px 32px;max-width:420px;text-align:center;box-shadow:0 10px 30px rgba(20,21,36,.06);}
h1{font-size:20px;margin:0 0 8px;color:#20216b;font-weight:600;}p{color:#5c6470;font-size:14px;margin:0;}</style>
</head><body><div class="c"><h1>${title}</h1><p>${msg}</p></div></body></html>`;

  if (!email) {
    return new Response(page("Missing email", "This unsubscribe link is invalid."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }
  await removeSubscriber(email);
  return new Response(
    page(
      "You’re unsubscribed",
      `${email} will no longer receive the weekly Client Pulse. You can re-enable it anytime in the Client Hub settings.`
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
