"use client";

import { useState } from "react";

// Real brand logo in a uniform frame, resolved from the company domain. Falls
// back to a colored monogram tile if the icon can't load (offline, blocked).
//
// Uses DuckDuckGo's icon service (no API key, returns the real brand mark).
// To upgrade to full wordmark logos later, swap `iconUrl` for a logo.dev or
// Brandfetch URL with a key — the frame + fallback stay the same.
function iconUrl(domain) {
  return `https://icons.duckduckgo.com/ip3/${domain}.ico`;
}

export default function ClientLogo({ client, size = 54, framed = true }) {
  const [failed, setFailed] = useState(false);

  const initials = client.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <div className="mono" style={{ background: client.mono, height: size, width: size }}>
        {initials}
      </div>
    );
  }

  return (
    <div className={framed ? "logo-frame" : ""} style={{ height: size, width: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconUrl(client.domain)}
        alt={`${client.name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
