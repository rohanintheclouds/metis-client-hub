"use client";

// Full detail page for one Market Insight — mirrors the client-page pattern:
// dark hero with animated themed artwork, then the Metis brief (figures,
// sections, charts), the "why this matters for us" callout with client
// chips, and the source link last.

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getClient } from "@/lib/clients";
import InsightHero from "@/components/InsightHero";
import InsightDetail from "@/components/InsightDetail";
import INSIGHTS from "@/data/market-insights.json";

export function findInsight(slug) {
  for (const week of Object.values(INSIGHTS.insights || {})) {
    const hit = week.find((r) => r.slug === slug);
    if (hit) return hit;
  }
  return null;
}

export default function InsightPage({ slug }) {
  const r = findInsight(slug);
  if (!r) {
    return (
      <div className="container" style={{ padding: "80px 32px" }}>
        <div className="empty">Insight not found.</div>
      </div>
    );
  }
  const detail = r.detail || {};

  return (
    <>
      <div className="ihero">
        <div className="container ihero-inner">
          <div className="ihero-copy">
            <Link href="/insights" className="ihero-back">
              <ArrowLeft size={14} /> All insights
            </Link>
            <div className="ihero-firm">
              <span className="ihero-badge">{r.firm}</span>
              <span className="ihero-date">{r.date}</span>
              {r.themes?.map((t) => (
                <span key={t} className="ihero-theme">{t}</span>
              ))}
            </div>
            <h1>{r.title}</h1>
            {r.sourceNote && <div className="ihero-note">{r.sourceNote}</div>}
          </div>
          <div className="ihero-artwrap">
            <InsightHero theme={r.heroTheme} />
          </div>
        </div>
      </div>

      <div className="container ipage">
        {r.summary && <p className="ipage-lead">{r.summary}</p>}

        {detail.figures?.length > 0 && (
          <div className="fig-grid">
            {detail.figures.map((f) => (
              <div key={f.l} className="fig-tile">
                <div className="fig-v">{f.v}</div>
                <div className="fig-l">{f.l}</div>
              </div>
            ))}
          </div>
        )}

        <InsightDetail detail={{ sections: detail.sections, charts: detail.charts }} />

        {(detail.metisAngle || r.relatedClients?.length > 0) && (
          <div className="ipage-metis">
            <h3>Why this matters for Metis</h3>
            {detail.metisAngle && <p>{detail.metisAngle}</p>}
            {r.relatedClients?.length > 0 && (
              <div className="ic-clients" style={{ borderTop: "none", paddingTop: 4 }}>
                <span className="ic-clients-label">Clients in this market:</span>
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
            )}
          </div>
        )}

        {r.url && (
          <div className="ipage-src">
            <a className="btn" href={r.url} target="_blank" rel="noreferrer">
              Read the original report <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>
    </>
  );
}
