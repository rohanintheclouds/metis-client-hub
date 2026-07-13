"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowDown,
  BrainCircuit,
  Database,
  Rocket,
  LayoutGrid,
  Newspaper,
  UserRound,
  Headphones,
} from "lucide-react";
import { CLIENTS } from "@/lib/clients";
import { PROJECT_TYPES } from "@/lib/brand";

// Statically imported so the GitHub Pages basePath is applied automatically.
import heroImg from "@/assets/landing/hero.jpg";
import aiImg from "@/assets/landing/ai.jpg";
import dataImg from "@/assets/landing/data.jpg";
import transformImg from "@/assets/landing/transform.jpg";

// The export build's trailing-slash assetPrefix ("/metis-client-hub/") yields
// "//_next/..." in imported image URLs; collapse it so every host serves them.
const src = (img) => img.src.replace("//_next", "/_next");

/* ── Small hooks ─────────────────────────────────────────── */

// Count from 0 to `target` once `run` flips true (eased, ~1.2s).
function useCountUp(target, run) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / 1200, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

// True once the ref'd element scrolls into view.
function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return seen;
}

/* ── Hero ────────────────────────────────────────────────── */

const HEADLINE = ["Client", "intelligence,", "brought", "to", "life."];

function Stat({ value, suffix, label, run }) {
  const n = useCountUp(value, run);
  return (
    <div className="lp-stat">
      <div className="v">
        {n}
        {suffix}
      </div>
      <div className="l">{label}</div>
    </div>
  );
}

function Hero() {
  const [go, setGo] = useState(false);
  const statsRef = useRef(null);
  const statsSeen = useInView(statsRef);

  useEffect(() => {
    const id = requestAnimationFrame(() => setGo(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    e.currentTarget.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  }

  return (
    <section className={`lp-hero ${go ? "go" : ""}`} onMouseMove={onMove}>
      <div className="lp-hero-img" style={{ backgroundImage: `url(${src(heroImg)})` }} aria-hidden />
      <div className="lp-hero-shade" aria-hidden />
      <div className="lp-hero-glow" aria-hidden />
      <div className="hero-dots" aria-hidden />

      <div className="container lp-hero-inner">
        <div className="eyebrow">Metis Strategy · Client Intelligence Hub</div>
        <h1 className="lp-headline" aria-label={HEADLINE.join(" ")}>
          {HEADLINE.map((w, i) => (
            <span key={i} className="w" style={{ "--i": i }} aria-hidden>
              {i >= HEADLINE.length - 3 ? <em>{w}</em> : w}{" "}
            </span>
          ))}
        </h1>
        <p className="lp-sub">
          The firm&apos;s living picture of every account we serve — a weekly pulse on each client,
          a briefing personalized to your engagements, and audio episodes on demand.
        </p>
        <div className="lp-cta-row">
          <Link href="/clients" className="btn teal lg">
            Explore the client wall <ArrowRight size={17} />
          </Link>
          <Link href="/my-pulse" className="btn ghost lg">
            Read my pulse
          </Link>
        </div>

        <div className="lp-stats" ref={statsRef}>
          <Stat value={CLIENTS.length} label="Clients tracked" run={statsSeen} />
          <Stat value={3} label="Coasts covered" run={statsSeen} />
          <Stat value={PROJECT_TYPES.length} label="Practice areas" run={statsSeen} />
          <Stat value={52} label="Pulses a year" run={statsSeen} />
        </div>
      </div>

      <div className="lp-scrollcue" aria-hidden>
        <ArrowDown size={16} />
      </div>
    </section>
  );
}

/* ── Client marquee ──────────────────────────────────────── */

function Marquee() {
  // Content is rendered twice so the CSS loop (translateX -50%) is seamless.
  const row = (prefix) =>
    CLIENTS.map((c) => (
      <span key={`${prefix}-${c.id}`} className="lp-mq-item">
        <span className="dot" style={{ background: c.mono }} aria-hidden />
        {c.name}
        <span className="sec">{c.sector}</span>
      </span>
    ));
  return (
    <div className="lp-marquee" aria-hidden>
      <div className="lp-mq-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ── Focus areas (tilt cards) ────────────────────────────── */

const FOCUS = [
  {
    icon: BrainCircuit,
    img: aiImg,
    title: "AI & Automation",
    body: "From AI strategy and governance to embedded copilots and agents — we help leadership teams move from pilots to production, responsibly and at scale.",
    tags: ["AI & Automation", "Product & Engineering"],
  },
  {
    icon: Database,
    img: dataImg,
    title: "Data & Analytics",
    body: "Data strategy, platforms, and governance that turn scattered signals into a durable advantage — and make every AI ambition actually possible.",
    tags: ["Data & Analytics", "Cloud & Infrastructure"],
  },
  {
    icon: Rocket,
    img: transformImg,
    title: "Digital Transformation",
    body: "Operating models, product organizations, and executive roadmaps that convert technology investment into business outcomes.",
    tags: ["Digital Transformation", "Operating Model & Org"],
  },
];

function TiltCard({ item }) {
  const Icon = item.icon;
  function onMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * 7).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 9).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
  }
  function onLeave(e) {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  }
  return (
    <article className="lp-tilt reveal" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="lp-tilt-img">
        <img src={src(item.img)} alt="" loading="lazy" />
        <span className="lp-tilt-icon">
          <Icon size={20} />
        </span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
      <div className="tile-tags">
        {item.tags.map((t) => (
          <span key={t} className="tile-tag">
            {t}
          </span>
        ))}
      </div>
      <div className="lp-tilt-glare" aria-hidden />
    </article>
  );
}

/* ── Inside the hub (auto-rotating showcase) ─────────────── */

const FEATURES = [
  {
    icon: LayoutGrid,
    title: "The client wall",
    body: "Every account on one wall, filterable by coast and project type. Hover a tile for this week's glance; click through for the full story.",
    href: "/clients",
    cta: "Open the wall",
  },
  {
    icon: Newspaper,
    title: "Weekly Client Pulse",
    body: "A sourced briefing per client, every week — market stats, deals, leadership moves, and why each one matters to our work.",
    href: "/clients",
    cta: "Browse pulses",
  },
  {
    icon: UserRound,
    title: "My Pulse",
    body: "Follow clients or whole project types and get a digest built just for your engagements — in the hub, or in your inbox each week.",
    href: "/my-pulse",
    cta: "Build my digest",
  },
  {
    icon: Headphones,
    title: "AI podcast, per client",
    body: "Two hosts, a few minutes, one client — the week's developments as an audio episode, generated on demand.",
    href: "/clients",
    cta: "Pick a client",
  },
];

function FeaturePreview({ i }) {
  if (i === 0)
    return (
      <div className="lp-mock lp-mock-wall">
        {CLIENTS.slice(0, 8).map((c) => (
          <span key={c.id} className="cell" style={{ background: c.mono }}>
            {c.name[0]}
          </span>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="lp-mock lp-mock-pulse">
        <div className="ph" />
        <div className="row">
          <span className="big up">+4.2%</span>
          <span className="big">$182B</span>
          <span className="big dn">-1.1%</span>
        </div>
        <div className="ln w9" />
        <div className="ln w7" />
        <div className="ln w8" />
      </div>
    );
  if (i === 2)
    return (
      <div className="lp-mock lp-mock-my">
        <div className="chips">
          <span className="c on">AI &amp; Automation</span>
          <span className="c">Data &amp; Analytics</span>
          <span className="c on">M&amp;A</span>
        </div>
        <div className="ln w8" />
        <div className="ln w9" />
        <div className="ln w6" />
      </div>
    );
  return (
    <div className="lp-mock lp-mock-pod">
      <div className="art">▶</div>
      <div className="eq">
        {Array.from({ length: 14 }).map((_, k) => (
          <span key={k} style={{ "--k": k }} />
        ))}
      </div>
    </div>
  );
}

function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % FEATURES.length), 5000);
    return () => clearInterval(id);
  }, [paused, active]);

  const f = FEATURES[active];
  return (
    <div
      className="lp-show reveal"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="lp-show-list" role="tablist" aria-label="Hub features">
        {FEATURES.map((it, i) => {
          const Icon = it.icon;
          return (
            <button
              key={it.title}
              role="tab"
              aria-selected={i === active}
              className={`lp-show-item ${i === active ? "on" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="ic">
                <Icon size={18} />
              </span>
              <span className="tx">
                <b>{it.title}</b>
                <small>{it.body}</small>
              </span>
              {i === active && !paused && <span className="bar" key={active} aria-hidden />}
            </button>
          );
        })}
      </div>
      <div className="lp-show-stage" key={active}>
        <FeaturePreview i={active} />
        <Link href={f.href} className="btn primary sm">
          {f.cta} <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────── */

export default function Landing() {
  return (
    <div className="lp">
      <Hero />
      <Marquee />

      <section className="container lp-about">
        <div className="lp-about-text reveal">
          <h2 className="lp-h2">
            Who we are<span className="accent">.</span>
          </h2>
          <p className="lead">
            Since 2001, <b>Metis Strategy</b> has been the trusted advisor to CIOs and technology
            executives at the world&apos;s leading companies — helping them turn digital, data, and
            AI strategy into competitive advantage.
          </p>
          <p>
            The Client Hub is how that work compounds: one place where the whole firm sees what is
            happening across every account we serve, every week — so every conversation starts
            informed.
          </p>
          <div className="brandline dark">
            Driving change. <span className="g">Elevating leaders.</span>
          </div>
        </div>
        <div className="lp-about-img reveal">
          <img src={src(transformImg)} alt="Abstract visualization of transformation" loading="lazy" />
        </div>
      </section>

      <section className="lp-band">
        <div className="container">
          <h2 className="lp-h2 light reveal">
            What we focus on<span className="accent">.</span>
          </h2>
          <div className="lp-focus">
            {FOCUS.map((f) => (
              <TiltCard key={f.title} item={f} />
            ))}
          </div>
        </div>
      </section>

      <section className="container lp-inside">
        <h2 className="lp-h2 reveal">
          Inside the hub<span className="accent">.</span>
        </h2>
        <p className="lp-inside-sub reveal">
          Four ways to stay ahead of every account — pick yours.
        </p>
        <Showcase />
      </section>

      <section className="lp-final">
        <div className="hero-dots" aria-hidden />
        <div className="container lp-final-inner reveal">
          <h2>
            Step into the wall<span className="accent">.</span>
          </h2>
          <p>{CLIENTS.length} clients. Three coasts. One pulse.</p>
          <Link href="/clients" className="btn teal lg">
            Explore clients <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
