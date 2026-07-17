"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CLIENTS } from "@/lib/clients";
import { COASTS } from "@/lib/brand";
import { getPulse, LATEST_EDITION } from "@/lib/pulse";
import ClientLogo from "@/components/ClientLogo";

export default function HomeExplorer() {
  const [coast, setCoast] = useState("All");

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => coast === "All" || c.coast === coast);
  }, [coast]);

  return (
    <>
      <div className="hero-band">
        <div className="hero-dots" aria-hidden />
        <div className="hero-streaks" aria-hidden />
        <div className="container">
          <section className="hero reveal">
            <div className="eyebrow">Metis Strategy · Client Intelligence</div>
            <h1>
              Intelligence on every <span className="accent">client we serve.</span>
            </h1>
            <p>
              A living hub for the whole firm: weekly developments across every account, a briefing
              personalized to your engagements, and audio episodes on demand.
            </p>
            <div className="brandline">
              Driving change. <span className="g">Elevating leaders.</span>
            </div>
          </section>
        </div>
      </div>

      <div className="filterbar">
        <div className="container filterbar-inner">
          <div className="seg" role="tablist" aria-label="Filter clients by coast">
            {["All", ...COASTS].map((c) => {
              const n = c === "All" ? CLIENTS.length : CLIENTS.filter((x) => x.coast === c).length;
              return (
                <button
                  key={c}
                  role="tab"
                  aria-selected={coast === c}
                  className={`seg-btn ${coast === c ? "on" : ""}`}
                  onClick={() => setCoast(c)}
                >
                  {c === "All" ? "All coasts" : c}
                  <span className="seg-n">{n}</span>
                </button>
              );
            })}
          </div>
          <span className="count">
            {filtered.length} client{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="container">
        {filtered.length === 0 ? (
          <div className="empty">No clients match those filters.</div>
        ) : (
          <div className="wall">
            {filtered.map((c, i) => {
              const glance = getPulse(c.id, LATEST_EDITION)?.glance || "";
              return (
                <Link
                  key={c.id}
                  href={`/clients/${c.id}`}
                  className="tile reveal"
                  style={{ "--tile-brand": c.mono, transitionDelay: `${(i % 10) * 45}ms` }}
                >
                  <span className="tile-chip">{c.name}</span>
                  <div className="tile-logo">
                    <ClientLogo client={c} wall />
                  </div>
                  <span className="tile-foot">{c.sector}</span>

                  <div className="tile-preview" aria-hidden>
                    <div className="tp-ticker">{c.ticker} · {c.coast}</div>
                    <div className="tp-name">{c.name}</div>
                    <p className="tp-glance">{glance}</p>
                    <span className="tp-cta">
                      View this week’s pulse <span className="ar">→</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
