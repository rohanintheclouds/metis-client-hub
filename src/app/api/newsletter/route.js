import { renderNewsletter } from "@/lib/newsletter";
import { LATEST_EDITION } from "@/lib/pulse";
import { CLIENTS } from "@/lib/clients";

// GET /api/newsletter?clients=adp,lumen-technologies&edition=2026-07-06&to=Rohan
// Returns the exact HTML that would be emailed — viewable/downloadable in-app.
export function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientsParam = searchParams.get("clients");
  const edition = searchParams.get("edition") || LATEST_EDITION;
  const recipient = searchParams.get("to") || "Metis Strategy";

  const clientIds = clientsParam
    ? clientsParam.split(",").map((s) => s.trim()).filter(Boolean)
    : CLIENTS.map((c) => c.id);

  const html = renderNewsletter({ clientIds, edition, recipient });

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
