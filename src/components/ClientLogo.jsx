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

// Higher-resolution favicon for the big wall tiles (up to 256px).
function bigIconUrl(domain) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
}

export default function ClientLogo({ client, size = 54, framed = true, wall = false }) {
  const [failed, setFailed] = useState(false);
  // Wall tiles degrade in stages: full logo → favicon in a white
  // app-icon frame → white monogram on the brand color.
  const [wallStage, setWallStage] = useState(0);

  const initials = client.name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (wall) {
    // Big logo filling the white tile. Prefers a self-hosted file
    // (src/assets/logos/<id>.png|svg, imported so the build pipeline applies
    // the GitHub Pages basePath), then the hi-res favicon, then the low-res
    // icon service, then a brand-colored monogram.
    const localLogo = client.logo && (client.logo.src || client.logo);
    const sources = [localLogo, bigIconUrl(client.domain), iconUrl(client.domain)].filter(Boolean);
    if (wallStage >= sources.length) return <span className="wall-mono">{initials}</span>;
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        className={client.logoFull && wallStage === 0 ? "wall-logo full" : "wall-logo"}
        src={sources[wallStage]}
        alt={`${client.name} logo`}
        loading="lazy"
        onError={() => setWallStage(wallStage + 1)}
      />
    );
  }

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
