"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import InsightHero from "@/components/InsightHero";
import INSIGHTS from "@/data/market-insights.json";

const FIRM_INITIALS = {
  "goldman-sachs": "GS",
  "morgan-stanley": "MS",
  jpmorgan: "JPM",
  bain: "B&C",
  mckinsey: "McK",
};

export default function MarketInsights() {
  const editions = INSIGHTS.editions || [];
  const [week, setWeek] = useState(editions[0]?.id);
  const reports = INSIGHTS.insights?.[week] || [];

  const firms = useMemo(() => {
    const f = new Map();
    reports.forEach((r) => f.set(r.firmId, r.firm));
    return f;
  }, [reports]);

  return (
    <>
      <div className="hero-band">
        <div className="hero-dots" aria-hidden />
        <div className="hero-streaks" aria-hidden />
        <div className="container">
          <section className="hero reveal">
            <div className="eyebrow">Metis Strategy · Market Intelligence</div>
            <h1>
              Research worth reading, <span className="accent">mapped to our clients.</span>
            </h1>
            <p>
              Each week: analyses from Goldman Sachs, Morgan Stanley, J.P. Morgan, Bain and
              McKinsey — kept only when they cover a market one of our clients operates in.
            </p>
          </section>
        </div>
      </div>

      <div className="filterbar">
        <div className="container filterbar-inner">
          <div className="seg" role="tablist" aria-label="Choose week">
            {editions.slice(0, 6).map((e) => (
              <button
                key={e.id}
                role="tab"
                aria-selected={week === e.id}
                className={`seg-btn ${week === e.id ? "on" : ""}`}
                onClick={() => setWeek(e.id)}
              >
                {e.label}
              </button>
            ))}
          </div>
          <span className="count">
            {reports.length} insight{reports.length === 1 ? "" : "s"} · {firms.size} firm
            {firms.size === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="container">
        {reports.length === 0 ? (
          <div className="empty">
            No insights for this week yet — run <code>npm run scrape:insights</code>.
          </div>
        ) : (
          <div className="wall">
            {reports.map((r, i) => {
              const inner = (
                <>
                  <span className="tile-chip itile-chip">{FIRM_INITIALS[r.firmId] || r.firm}</span>
                  <div className="tile-logo itile-art">
                    <InsightHero theme={r.heroTheme} />
                  </div>
                  <span className="tile-foot itile-foot">{r.shortTitle || r.firm}</span>
                  <div className="tile-preview" aria-hidden>
                    <div className="tp-ticker">{r.firm} · {r.date}</div>
                    <div className="tp-name">{r.shortTitle || r.title}</div>
                    <p className="tp-glance">{r.hook || r.summary}</p>
                    <span className="tp-cta">
                      Open the Metis brief <span className="ar">→</span>
                    </span>
                  </div>
                </>
              );
              const style = { transitionDelay: `${(i % 10) * 45}ms` };
              return r.slug ? (
                <Link key={r.url || r.title} href={`/insights/${r.slug}`} className="tile itile reveal" style={style}>
                  {inner}
                </Link>
              ) : (
                <a key={r.url || r.title} href={r.url} target="_blank" rel="noreferrer" className="tile itile reveal" style={style}>
                  {inner}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
