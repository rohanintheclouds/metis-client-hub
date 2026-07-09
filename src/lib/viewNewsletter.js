"use client";

import { renderNewsletter } from "@/lib/newsletter";

// Build the Client Pulse email HTML in the browser and open it in a new tab.
// Keeps "View as email" working with no server round-trip, so the app runs the
// same locally, on Vercel, and as the static GitHub Pages demo.
export function openNewsletter({ clientIds, edition, recipient }) {
  const html = renderNewsletter({ clientIds, edition, recipient });
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank", "noopener");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
