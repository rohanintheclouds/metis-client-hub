import { upsertSubscriber, removeSubscriber, listSubscribers, storeMode } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_DOMAIN = "metisstrategy.com";

// POST /api/subscribers  — register / update a subscription (called by the app
// when someone signs in or changes settings). Body: the subscriber record.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid json" }, { status: 400 });
  }
  const email = String(body.email || "").trim().toLowerCase();
  if (!email.endsWith("@" + ALLOWED_DOMAIN)) {
    return Response.json({ ok: false, error: `email must be @${ALLOWED_DOMAIN}` }, { status: 400 });
  }
  const record = await upsertSubscriber(body);
  return Response.json({ ok: true, store: storeMode(), subscriber: record });
}

// DELETE /api/subscribers?email=  — unsubscribe.
export async function DELETE(request) {
  const email = new URL(request.url).searchParams.get("email");
  if (!email) return Response.json({ ok: false, error: "email required" }, { status: 400 });
  await removeSubscriber(email);
  return Response.json({ ok: true, removed: email.toLowerCase() });
}

// GET /api/subscribers  — count only; full list requires the CRON_SECRET
// (Authorization: Bearer <secret>) since it exposes email addresses.
export async function GET(request) {
  const subs = await listSubscribers();
  const secret = process.env.CRON_SECRET;
  const authed = !secret || request.headers.get("authorization") === `Bearer ${secret}`;
  if (!authed) return Response.json({ ok: true, store: storeMode(), count: subs.length });
  return Response.json({ ok: true, store: storeMode(), count: subs.length, subscribers: subs });
}
