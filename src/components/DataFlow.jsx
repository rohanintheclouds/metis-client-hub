"use client";

import { useEffect, useRef } from "react";

// Animated "data cable" decorations for the landing page: glowing conduits
// with light pulses that carry the eye (and the data) from section to section.
// Purely decorative — every export is aria-hidden and respects reduced motion
// via the .lp-cable / .lp-spine CSS.

// Cable geometry shared by the divider and the section backgrounds.
// viewBox is 1200x200 and stretched (preserveAspectRatio="none"), so curves
// stay smooth at any width.
const CABLES = [
  { d: "M 90 0 C 90 90, 330 110, 335 200", dur: 3.2, begin: 0 },
  { d: "M 420 0 C 420 130, 545 70, 548 200", dur: 2.5, begin: -1.1 },
  { d: "M 700 0 C 700 80, 662 120, 665 200", dur: 3.8, begin: -0.4 },
  { d: "M 980 0 C 980 110, 858 90, 855 200", dur: 2.9, begin: -2.0 },
  { d: "M 1130 0 C 1130 140, 1058 120, 1055 200", dur: 3.5, begin: -1.6 },
];

function endpoints(d) {
  const n = d.match(/-?[\d.]+/g).map(Number);
  return { x1: n[0], x2: n[n.length - 2], y2: n[n.length - 1] };
}

// A horizontal strip of cables flowing from one section into the next.
export function CableDivider({ tone = "light", flip = false }) {
  return (
    <svg
      className={`lp-cable reveal ${tone} ${flip ? "flip" : ""}`}
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      aria-hidden
    >
      {CABLES.map((c, i) => {
        const p = endpoints(c.d);
        return (
          <g key={i}>
            <path className="base" d={c.d} />
            <path className="flow" d={c.d} style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.begin}s` }} />
            <circle className="port" cx={p.x1} cy="3" r="3" style={{ animationDelay: `${i * 0.35}s` }} />
            <circle className="port" cx={p.x2} cy={p.y2 - 3} r="3" style={{ animationDelay: `${i * 0.35 + 0.5}s` }} />
            <circle className="dot" r="2.6">
              <animateMotion dur={`${c.dur}s`} begin={`${c.begin}s`} repeatCount="indefinite" path={c.d} />
            </circle>
          </g>
        );
      })}
    </svg>
  );
}

// Faint full-bleed circuitry behind dark sections.
export function CircuitBg() {
  return (
    <svg className="lp-circuit" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden>
      {CABLES.map((c, i) => (
        <g key={i}>
          <path className="base" d={c.d} />
          <path className="flow" d={c.d} style={{ animationDuration: `${c.dur * 1.8}s`, animationDelay: `${c.begin}s` }} />
        </g>
      ))}
    </svg>
  );
}

// Radial "data tunnel" behind the final CTA: spokes of light racing inward.
export function TunnelBg() {
  const SPOKES = 26;
  const cx = 600;
  const cy = 300;
  const lines = Array.from({ length: SPOKES }, (_, i) => {
    const a = (i / SPOKES) * Math.PI * 2;
    // Long enough to leave the 1200x600 box from the center at any angle.
    return {
      x2: cx + Math.cos(a) * 750,
      y2: cy + Math.sin(a) * 750,
      dur: 2 + ((i * 7) % 9) * 0.35,
      begin: -((i * 13) % 17) * 0.3,
    };
  });
  return (
    <svg className="lp-tunnel" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" aria-hidden>
      {lines.map((l, i) => (
        <line
          key={i}
          className="spoke"
          x1={cx}
          y1={cy}
          x2={l.x2}
          y2={l.y2}
          style={{ animationDuration: `${l.dur}s`, animationDelay: `${l.begin}s` }}
        />
      ))}
      {[70, 150, 240].map((r, i) => (
        <ellipse key={r} className="ring" cx={cx} cy={cy} rx={r * 2} ry={r} style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
    </svg>
  );
}

// Fixed scroll-progress "conduit" along the left edge: fills as you read,
// with a glowing packet marking how far down the page you are.
export function ScrollSpine() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      el.style.setProperty("--sp", max > 0 ? (h.scrollTop / max).toFixed(4) : "0");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="lp-spine" ref={ref} aria-hidden>
      <span className="fill" />
      <span className="head" />
    </div>
  );
}
