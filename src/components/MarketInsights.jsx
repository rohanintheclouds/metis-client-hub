"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getClient } from "@/lib/clients";
import InsightDetail from "@/components/InsightDetail";
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
          <div className="insight-list">
            {reports.map((r, i) => (
              <article key={r.url} className="insight-card reveal" style={{ transitionDelay: `${(i % 8) * 45}ms` }}>
                <div className="ic-head">
                  <span className="ic-firm">{FIRM_INITIALS[r.firmId] || "•"}</span>
                  <div className="ic-meta">
                    <span className="ic-firm-name">{r.firm}</span>
                    <span className="ic-date">{r.date}</span>
                  </div>
                  {r.themes?.length > 0 && (
                    <div className="ic-themes">
                      {r.themes.map((t) => (
                        <span key={t} className="ic-theme">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <h3 className="ic-title">
                  {r.url ? (
                    <a href={r.url} target="_blank" rel="noreferrer">
                      {r.title} <span className="ar">↗</span>
                    </a>
                  ) : (
                    <span>{r.title}</span>
                  )}
                </h3>
                {r.sourceNote && <div className="ic-source-note">{r.sourceNote}</div>}
                {r.summary && <p className="ic-summary">{r.summary}</p>}
                {r.analysis && <p className="ic-tieback">{r.analysis}</p>}
                {r.tieBack && <p className="ic-tieback">{r.tieBack}</p>}
                {r.detail && (
                  <details className="id-details">
                    <summary>Open the full brief — summary &amp; charts</summary>
                    <InsightDetail detail={r.detail} />
                  </details>
                )}
                <div className="ic-clients">
                  <span className="ic-clients-label">In this market:</span>
                  {r.relatedClients.map((id) => {
                    const c = getClient(id);
                    if (!c) return null;
                    return (
                      <Link key={id} href={`/clients/${id}`} className="ic-client-chip" style={{ "--chip-brand": c.mono }}>
                        {c.name}
                      </Link>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
