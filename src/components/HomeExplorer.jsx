"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CLIENTS } from "@/lib/clients";
import { COASTS, PROJECT_TYPES } from "@/lib/brand";
import ClientLogo from "@/components/ClientLogo";

export default function HomeExplorer() {
  const [coast, setCoast] = useState("All");
  const [tags, setTags] = useState([]);

  function toggleTag(t) {
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  }

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      if (coast !== "All" && c.coast !== coast) return false;
      if (tags.length && !tags.every((t) => c.tags.includes(t))) return false;
      return true;
    });
  }, [coast, tags]);

  return (
    <>
      <div className="container">
        <section className="hero">
          <div className="eyebrow">Metis Strategy · Client Intelligence</div>
          <h1>
            Every client we serve, <span className="accent">one pulse.</span>
          </h1>
          <p>
            A living intelligence hub for the whole firm. Weekly news across all client accounts,
            a personalized briefing for the ones you work on, and audio episodes on demand.
          </p>
        </section>
      </div>

      <div className="filterbar">
        <div className="container">
          <div className="filter-row">
            <span className="filter-label">Coast</span>
            <button className={`chip ${coast === "All" ? "on" : ""}`} onClick={() => setCoast("All")}>
              All coasts
            </button>
            {COASTS.map((c) => (
              <button key={c} className={`chip ${coast === c ? "on" : ""}`} onClick={() => setCoast(c)}>
                {c}
              </button>
            ))}
            <span className="count">
              {filtered.length} client{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="filter-row">
            <span className="filter-label">Project type</span>
            {PROJECT_TYPES.map((t) => (
              <button key={t} className={`chip tag ${tags.includes(t) ? "on" : ""}`} onClick={() => toggleTag(t)}>
                {t}
              </button>
            ))}
            {tags.length > 0 && (
              <button className="linkbtn" onClick={() => setTags([])} style={{ marginLeft: 4 }}>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        {filtered.length === 0 ? (
          <div className="empty">No clients match those filters.</div>
        ) : (
          <div className="wall">
            {filtered.map((c) => (
              <Link key={c.id} href={`/clients/${c.id}`} className="tile">
                {c.ticker === "Private" ? (
                  <span className="tile-badge">Private</span>
                ) : (
                  <span className="tile-coast">{c.coast.replace(" Coast", "")}</span>
                )}
                <div className="tile-logo">
                  <ClientLogo client={c} size={52} />
                </div>
                <div>
                  <div className="tile-name">{c.name}</div>
                  <div className="tile-sub">{c.sector}</div>
                </div>
                <div className="tile-tags">
                  {c.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tile-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
