"use client";

// Expandable "full brief" content for a Market Insight: summary sections and
// small single-hue SVG bar charts with an interactive hover layer (tooltip +
// highlighted mark, full-column hit targets). Data lives on the insight's
// `detail` field in src/data/market-insights.json — every number is
// transcribed from the underlying report, never computed or invented here.

import { useState } from "react";

const INK = "var(--ink)";
const MUTED = "var(--muted)";
const BAR = "var(--blue)";
const ACCENT = "var(--green-2)";

function useTooltip() {
  const [tip, setTip] = useState(null); // { x, y, label, value }
  const show = (e, label, value) => {
    const box = e.currentTarget.closest(".id-chart-plot").getBoundingClientRect();
    setTip({ x: e.clientX - box.left, y: e.clientY - box.top, label, value });
  };
  const hide = () => setTip(null);
  return { tip, show, hide };
}

function Tooltip({ tip }) {
  if (!tip) return null;
  return (
    <div
      className="id-tip"
      style={{ left: Math.min(Math.max(tip.x, 60), 580), top: Math.max(tip.y - 14, 8) }}
      role="status"
    >
      <span className="id-tip-l">{tip.label}</span>
      <span className="id-tip-v">{tip.value}</span>
    </div>
  );
}

function TimeBars({ chart }) {
  const { tip, show, hide } = useTooltip();
  const [hov, setHov] = useState(-1);
  const W = 640, H = 190, PAD = { t: 16, r: 8, b: 26, l: 8 };
  const n = chart.values.length;
  const max = Math.max(...chart.values);
  const iw = (W - PAD.l - PAD.r) / n;
  const bw = Math.min(28, iw - 2);
  const fmtV = (v) => (v >= 1000 ? `$${(v / 1000).toFixed(2)}T` : `$${v}B`);
  return (
    <div className="id-chart-plot">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.title} style={{ width: "100%", height: "auto", display: "block" }}>
        {chart.values.map((v, i) => {
          const x = PAD.l + i * iw + (iw - bw) / 2;
          const marked = chart.mark?.includes(chart.labels[i]);
          const active = hov === i;
          const h = Math.max(H - PAD.b - (PAD.t + (H - PAD.t - PAD.b) * (1 - v / max)), v > 0 ? 3 : 1);
          return (
            <g key={i}>
              <rect
                x={x} y={H - PAD.b - h} width={bw} height={h} rx="4"
                fill={active ? "var(--green)" : marked ? ACCENT : BAR}
                stroke={active ? "#fff" : "none"} strokeWidth="2"
              />
              {(marked || active) && (
                <text x={x + bw / 2} y={H - PAD.b - h - 6} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>
                  {fmtV(v)}
                </text>
              )}
              {(i === 0 || marked || i === n - 1 || active) && (
                <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize="10.5" fontWeight={active ? "700" : "400"} fill={active ? INK : MUTED}>
                  {chart.labels[i]}
                </text>
              )}
              {/* full-column hit target */}
              <rect
                x={PAD.l + i * iw} y={PAD.t} width={iw} height={H - PAD.t - PAD.b}
                fill="transparent" style={{ cursor: "crosshair" }}
                onMouseEnter={(e) => { setHov(i); show(e, chart.labels[i], fmtV(v)); }}
                onMouseMove={(e) => show(e, chart.labels[i], fmtV(v))}
                onMouseLeave={() => { setHov(-1); hide(); }}
              />
            </g>
          );
        })}
        <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="var(--line)" strokeWidth="1" />
      </svg>
      <Tooltip tip={tip} />
    </div>
  );
}

function CatBars({ chart }) {
  const { tip, show, hide } = useTooltip();
  const [hov, setHov] = useState(-1);
  const W = 640, ROW = 30, LABEL = 220, VAL = 56;
  const H = chart.rows.length * ROW + 6;
  const max = chart.max || Math.max(...chart.rows.map((r) => r[1]));
  const span = W - LABEL - VAL;
  const fmtV = (v) => `${v}${chart.unit === "%" ? "%" : ` ${chart.unit}`}`;
  return (
    <div className="id-chart-plot">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.title} style={{ width: "100%", height: "auto", display: "block" }}>
        {chart.rows.map(([label, v], i) => {
          const yy = i * ROW + 4;
          const w = Math.max((v / max) * span, 3);
          const active = hov === i;
          return (
            <g key={label}>
              {active && <rect x="0" y={yy - 1} width={W} height={ROW - 4} rx="6" fill="rgba(8,222,197,.08)" />}
              <text x={LABEL - 10} y={yy + 15} textAnchor="end" fontSize="12" fontWeight={active ? "700" : "400"} fill={INK}>{label}</text>
              <rect
                x={LABEL} y={yy + 4} width={w} height={14} rx="4"
                fill={active ? "var(--green)" : BAR}
                stroke={active ? "#fff" : "none"} strokeWidth="2"
              />
              <text x={LABEL + w + 8} y={yy + 15} fontSize="12" fontWeight="700" fill={INK}>
                {v}{chart.unit === "%" ? "%" : ""}
              </text>
              {/* full-row hit target */}
              <rect
                x="0" y={yy - 1} width={W} height={ROW - 2}
                fill="transparent" style={{ cursor: "crosshair" }}
                onMouseEnter={(e) => { setHov(i); show(e, label, fmtV(v)); }}
                onMouseMove={(e) => show(e, label, fmtV(v))}
                onMouseLeave={() => { setHov(-1); hide(); }}
              />
            </g>
          );
        })}
      </svg>
      <Tooltip tip={tip} />
    </div>
  );
}

export default function InsightDetail({ detail }) {
  if (!detail) return null;
  return (
    <div className="id-body">
      {detail.sections?.map((s) => (
        <section key={s.heading} className="id-section">
          <h4>{s.heading}</h4>
          <p>{s.body}</p>
        </section>
      ))}
      {detail.charts?.map((c) => (
        <figure key={c.title} className="id-chart">
          <figcaption>
            {c.title}
            {c.source && <span className="id-chart-src"> · {c.source}</span>}
          </figcaption>
          {c.kind === "time-bars" ? <TimeBars chart={c} /> : <CatBars chart={c} />}
        </figure>
      ))}
    </div>
  );
}
