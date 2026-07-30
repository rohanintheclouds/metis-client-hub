"use client";

// Animated hero artwork for insight detail pages. Pure inline SVG + CSS
// keyframes (see globals.css "Insight hero" block); no external assets.
// Animations are disabled under prefers-reduced-motion.

const T = "#08dec5"; // Metis green
const T2 = "#3cdbc0";
const DIM = "rgba(255,255,255,.22)";
const DIM2 = "rgba(255,255,255,.10)";

function Robot() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g className="ih-drift" stroke={DIM2} strokeWidth="1">
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line key={x} x1={x} y1="0" x2={x - 30} y2="260" />
        ))}
      </g>
      <g className="ih-bob">
        {/* head */}
        <rect x="105" y="30" width="90" height="64" rx="14" fill="none" stroke={T} strokeWidth="3" />
        <circle className="ih-blink" cx="132" cy="62" r="7" fill={T} />
        <circle className="ih-blink d2" cx="168" cy="62" r="7" fill={T} />
        <line x1="150" y1="30" x2="150" y2="14" stroke={T} strokeWidth="3" />
        <circle className="ih-pulse" cx="150" cy="10" r="4" fill={T} />
        {/* torso */}
        <rect x="95" y="104" width="110" height="80" rx="16" fill="none" stroke={DIM} strokeWidth="3" />
        <rect x="130" y="124" width="40" height="26" rx="6" fill="none" stroke={T2} strokeWidth="2.5" />
        {/* arms swing */}
        <g className="ih-swing"><rect x="62" y="108" width="22" height="64" rx="11" fill="none" stroke={DIM} strokeWidth="3" /></g>
        <g className="ih-swing d2"><rect x="216" y="108" width="22" height="64" rx="11" fill="none" stroke={DIM} strokeWidth="3" /></g>
        {/* legs */}
        <rect x="112" y="192" width="26" height="48" rx="12" fill="none" stroke={DIM} strokeWidth="3" />
        <rect x="162" y="192" width="26" height="48" rx="12" fill="none" stroke={DIM} strokeWidth="3" />
      </g>
    </svg>
  );
}

function Minerals() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g className="ih-float"><path d="M80 90 L110 60 L140 90 L110 150 Z" fill="none" stroke={T} strokeWidth="3" /></g>
      <g className="ih-float d2"><path d="M180 70 L215 50 L245 80 L225 130 L185 120 Z" fill="none" stroke={DIM} strokeWidth="3" /></g>
      <g className="ih-float d3"><path d="M130 170 L160 150 L190 175 L165 215 L135 205 Z" fill="none" stroke={T2} strokeWidth="2.5" /></g>
      <circle className="ih-pulse" cx="110" cy="100" r="3" fill={T} />
      <circle className="ih-pulse d2" cx="212" cy="88" r="3" fill={T} />
      <circle className="ih-pulse d3" cx="162" cy="182" r="3" fill={T} />
    </svg>
  );
}

function Housing() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g className="ih-drift-x" fill="none" stroke={DIM2} strokeWidth="3">
        <ellipse cx="70" cy="40" rx="28" ry="10" />
        <ellipse cx="230" cy="66" rx="34" ry="11" />
      </g>
      {[
        { x: 40, h: 70 }, { x: 110, h: 96 }, { x: 180, h: 80 },
      ].map((b, i) => (
        <g key={i}>
          <path d={`M${b.x} ${210 - b.h} L${b.x + 40} ${180 - b.h} L${b.x + 80} ${210 - b.h}`} fill="none" stroke={T} strokeWidth="3" />
          <rect x={b.x + 8} y={210 - b.h} width="64" height={b.h} fill="none" stroke={DIM} strokeWidth="3" />
          <rect className={`ih-glow d${i + 1}`} x={b.x + 24} y={230 - b.h} width="14" height="14" fill={T2} opacity=".7" />
        </g>
      ))}
      <line x1="20" y1="210" x2="280" y2="210" stroke={DIM} strokeWidth="3" />
    </svg>
  );
}

function Energy() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <path className="ih-flow" d="M20 200 C80 200 90 120 150 120 S220 60 280 60" fill="none" stroke={T} strokeWidth="3" strokeDasharray="10 8" />
      <path className="ih-flow d2" d="M20 230 C90 230 110 170 170 170 S240 120 280 120" fill="none" stroke={DIM} strokeWidth="2.5" strokeDasharray="8 8" />
      <path className="ih-glow" d="M150 40 L128 100 L148 100 L124 160 L176 88 L152 88 L172 40 Z" fill="none" stroke={T2} strokeWidth="3" />
      <circle className="ih-pulse" cx="150" cy="120" r="5" fill={T} />
      <circle className="ih-pulse d2" cx="280" cy="60" r="5" fill={T} />
    </svg>
  );
}

function Datacenter() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      {[50, 125, 200].map((x, r) => (
        <g key={x}>
          <rect x={x} y="50" width="56" height="160" rx="8" fill="none" stroke={DIM} strokeWidth="3" />
          {[70, 100, 130, 160, 185].map((y, i) => (
            <g key={y}>
              <line x1={x + 10} y1={y} x2={x + 34} y2={y} stroke={DIM2} strokeWidth="3" />
              <circle className={`ih-blink d${((r + i) % 3) + 1}`} cx={x + 44} cy={y} r="3.5" fill={T} />
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

function Payments() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g className="ih-float">
        <rect x="60" y="70" width="130" height="82" rx="12" fill="none" stroke={T} strokeWidth="3" />
        <line x1="60" y1="96" x2="190" y2="96" stroke={T} strokeWidth="3" />
        <line x1="76" y1="126" x2="130" y2="126" stroke={DIM} strokeWidth="3" />
      </g>
      <g className="ih-float d2">
        <rect x="120" y="120" width="130" height="82" rx="12" fill="none" stroke={DIM} strokeWidth="3" />
        <circle cx="222" cy="176" r="11" fill="none" stroke={T2} strokeWidth="2.5" />
        <circle cx="204" cy="176" r="11" fill="none" stroke={T2} strokeWidth="2.5" />
      </g>
      <circle className="ih-pulse" cx="90" cy="200" r="4" fill={T} />
      <circle className="ih-pulse d2" cx="250" cy="80" r="4" fill={T} />
    </svg>
  );
}

function Network() {
  const nodes = [[150, 60], [70, 130], [230, 120], [110, 200], [200, 200]];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2]];
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      {edges.map(([a, b], i) => (
        <line key={i} className={`ih-flow d${(i % 3) + 1}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={DIM} strokeWidth="2" strokeDasharray="6 7" />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="13" fill="none" stroke={i === 0 ? T : DIM} strokeWidth="3" />
          <circle className={`ih-pulse d${(i % 3) + 1}`} cx={x} cy={y} r="4" fill={i === 0 ? T : T2} />
        </g>
      ))}
    </svg>
  );
}

function Markets() {
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g stroke={DIM2} strokeWidth="1">
        {[60, 110, 160, 210].map((y) => <line key={y} x1="20" y1={y} x2="280" y2={y} />)}
      </g>
      <path className="ih-draw" d="M20 190 L60 170 L95 185 L130 120 L165 140 L200 80 L240 100 L280 55" fill="none" stroke={T} strokeWidth="3.5" strokeLinejoin="round" />
      <circle className="ih-pulse" cx="280" cy="55" r="5" fill={T} />
    </svg>
  );
}

function Biotech() {
  const rungs = [40, 68, 96, 124, 152, 180, 208];
  return (
    <svg viewBox="0 0 300 260" className="ih-art" aria-hidden>
      <g className="ih-bob">
        <path d="M110 20 C180 60 80 100 150 140 C220 180 120 220 190 250" fill="none" stroke={T} strokeWidth="3" />
        <path d="M190 20 C120 60 220 100 150 140 C80 180 180 220 110 250" fill="none" stroke={DIM} strokeWidth="3" />
        {rungs.map((y, i) => (
          <line key={y} className={`ih-glow d${(i % 3) + 1}`} x1={125 + (i % 2) * 10} y1={y} x2={175 - (i % 2) * 10} y2={y} stroke={T2} strokeWidth="2.5" />
        ))}
      </g>
    </svg>
  );
}

const ART = {
  robot: Robot,
  minerals: Minerals,
  housing: Housing,
  energy: Energy,
  datacenter: Datacenter,
  payments: Payments,
  network: Network,
  markets: Markets,
  biotech: Biotech,
};

export default function InsightHero({ theme }) {
  const Art = ART[theme] || Network;
  return <Art />;
}
