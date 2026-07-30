"use client";

// Expandable "full brief" for a Market Insight: summary sections plus small
// single-hue SVG bar charts. Data lives on the insight's `detail` field in
// src/data/market-insights.json — every number is transcribed from the
// underlying report, never computed or invented here.

const INK = "var(--ink)";
const MUTED = "var(--muted)";
const BAR = "var(--blue)";
const ACCENT = "var(--green-2)";

function TimeBars({ chart }) {
  const W = 640, H = 190, PAD = { t: 16, r: 8, b: 26, l: 8 };
  const n = chart.values.length;
  const max = Math.max(...chart.values);
  const iw = (W - PAD.l - PAD.r) / n;
  const bw = Math.min(28, iw - 2);
  const y = (v) => PAD.t + (H - PAD.t - PAD.b) * (1 - v / max);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.title} style={{ width: "100%", height: "auto" }}>
      {chart.values.map((v, i) => {
        const x = PAD.l + i * iw + (iw - bw) / 2;
        const marked = chart.mark?.includes(chart.labels[i]);
        const h = Math.max(H - PAD.b - y(v), v > 0 ? 3 : 1);
        return (
          <g key={i}>
            <rect x={x} y={H - PAD.b - h} width={bw} height={h} rx="4" fill={marked ? ACCENT : BAR}>
              <title>{`${chart.labels[i]}: ${v} ${chart.unit}`}</title>
            </rect>
            {marked && (
              <text x={x + bw / 2} y={H - PAD.b - h - 6} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={INK}>
                {v >= 1000 ? `$${(v / 1000).toFixed(1)}T` : `$${v}B`}
              </text>
            )}
            {(i === 0 || marked || i === n - 1) && (
              <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize="10.5" fill={MUTED}>
                {chart.labels[i]}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PAD.l} y1={H - PAD.b} x2={W - PAD.r} y2={H - PAD.b} stroke="var(--line)" strokeWidth="1" />
    </svg>
  );
}

function CatBars({ chart }) {
  const W = 640, ROW = 30, LABEL = 220, VAL = 56;
  const H = chart.rows.length * ROW + 6;
  const max = chart.max || Math.max(...chart.rows.map((r) => r[1]));
  const span = W - LABEL - VAL;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.title} style={{ width: "100%", height: "auto" }}>
      {chart.rows.map(([label, v], i) => {
        const yy = i * ROW + 4;
        const w = Math.max((v / max) * span, 3);
        return (
          <g key={label}>
            <text x={LABEL - 10} y={yy + 15} textAnchor="end" fontSize="12" fill={INK}>{label}</text>
            <rect x={LABEL} y={yy + 4} width={w} height={14} rx="4" fill={BAR}>
              <title>{`${label}: ${v} ${chart.unit}`}</title>
            </rect>
            <text x={LABEL + w + 8} y={yy + 15} fontSize="12" fontWeight="700" fill={INK}>
              {v}{chart.unit === "%" ? "%" : ""}
            </text>
          </g>
        );
      })}
    </svg>
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
            {c.source && <span className="id-chart-src"> · {c.source}, Morgan Stanley Research</span>}
          </figcaption>
          {c.kind === "time-bars" ? <TimeBars chart={c} /> : <CatBars chart={c} />}
        </figure>
      ))}
    </div>
  );
}
