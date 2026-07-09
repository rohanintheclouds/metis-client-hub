"use client";

import { useState } from "react";
import { logoUrl, clearbitUrl } from "@/lib/clients";

// Progressive logo: try logo.dev → Clearbit → monogram tile.
export default function ClientLogo({ client, size = 52 }) {
  const [stage, setStage] = useState(0); // 0=logo.dev, 1=clearbit, 2=monogram
  const src = stage === 0 ? logoUrl(client) : stage === 1 ? clearbitUrl(client) : null;

  if (stage >= 2 || !src) {
    const initials = client.name
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div className="mono" style={{ background: client.mono, height: size, width: size }}>
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${client.name} logo`}
      style={{ maxHeight: size }}
      onError={() => setStage((s) => s + 1)}
    />
  );
}
