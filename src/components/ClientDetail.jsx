"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Star,
  ExternalLink,
  ChevronDown,
  MapPin,
  CalendarClock,
  Globe,
  Zap,
  TrendingUp,
} from "lucide-react";
import { getClient } from "@/lib/clients";
import { editionsForClient } from "@/lib/pulse";
import { useProfile } from "@/lib/profile";
import ClientLogo from "@/components/ClientLogo";
import PodcastPlayer from "@/components/PodcastPlayer";
import { openNewsletter } from "@/lib/viewNewsletter";

function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ClientDetail({ id }) {
  const client = getClient(id);
  const editions = editionsForClient(id);
  const [sel, setSel] = useState(editions[0]?.id);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { profile, toggleClient, ready } = useProfile();

  if (!client) {
    return (
      <div className="container">
        <div className="empty">Client not found.</div>
      </div>
    );
  }

  const current = editions.find((e) => e.id === sel) || editions[0];
  const d = current?.data;
  const following = ready && profile.followedClients.includes(id);

  return (
    <>
      {/* brand-tinted hero band */}
      <div className="detail-band" style={{ "--brand": client.mono }}>
        <div className="container">
          <Link href="/clients" className="back light">
            <ArrowLeft size={15} /> All clients
          </Link>

          <div className="detail-head">
            <div className="detail-logocard">
              <ClientLogo client={client} wall />
            </div>
            <div className="detail-title">
              <button
                className={`detail-name ${aboutOpen ? "open" : ""}`}
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
                title={`What is ${client.name}? Click for a quick overview`}
              >
                <h1>{client.name}</h1>
                <span className="dn-chev" aria-hidden>
                  <ChevronDown size={18} />
                </span>
              </button>
              <div className="detail-meta">
                <span className="badge">{client.ticker}</span>
                <span className="badge">{client.coast}</span>
                <span>{client.sector}</span>
                <button className="about-hint" onClick={() => setAboutOpen((v) => !v)}>
                  {aboutOpen ? "Hide overview" : "New to this client? Read the 20-second overview"}
                </button>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
              <button className={`btn ${following ? "teal" : ""}`} onClick={() => toggleClient(id)}>
                <Star size={16} fill={following ? "#08312e" : "none"} />
                {following ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          {/* expanding company overview */}
          <div className={`about-panel ${aboutOpen ? "open" : ""}`}>
            <div className="about-inner">
              <p>{client.about}</p>
              <div className="about-facts">
                <span>
                  <MapPin size={13} /> {client.hq}
                </span>
                <span>
                  <CalendarClock size={13} /> Founded {client.founded}
                </span>
                <a href={`https://www.${client.domain}`} target="_blank" rel="noreferrer">
                  <Globe size={13} /> {client.domain} <ExternalLink size={11} />
                </a>
                <span className="af-legal">{client.legalName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid-2 reveal" style={{ padding: "30px 0 60px" }}>
          {/* left rail: archive + tags + podcast */}
          <div className="stack">
            <div className="card" style={{ padding: 18 }}>
              <p className="section-title">Weekly editions</p>
              <div className="follow-list">
                {editions.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSel(e.id)}
                    className="follow-row"
                    style={{
                      textAlign: "left",
                      border: 0,
                      background: e.id === sel ? "#e2f6f3" : "transparent",
                    }}
                  >
                    <div>
                      <div className="nm">{e.label}</div>
                      <div className="sb">{e.id === editions[0].id ? "Latest scrape" : "Archived"}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <p className="section-title">Project focus</p>
              <div className="tile-tags">
                {client.tags.map((t) => (
                  <span key={t} className="tile-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {client.model && (
              <div className="card model-card" style={{ padding: 18 }}>
                <p className="section-title">Main revenue stream</p>
                <p className="model-txt">{client.model}</p>
              </div>
            )}

            <div>
              <p className="section-title" style={{ marginLeft: 2 }}>
                Listen
              </p>
              <PodcastPlayer client={client} editionLabel={current?.label} />
            </div>
          </div>

          {/* right: this week's story */}
          <div>
            <div className="toolbar">
              <div className="pulse-date" style={{ fontSize: 13 }}>
                {current?.label}
              </div>
              <button
                className="btn sm"
                style={{ marginLeft: "auto" }}
                onClick={() =>
                  openNewsletter({ clientIds: [client.id], edition: current?.id, recipient: client.name })
                }
              >
                <Download size={14} /> View as email
              </button>
            </div>

            {/* market snapshot — collapsed dropdown, up top */}
            {d?.stats?.length > 0 && (
              <details className="snap-strip">
                <summary>
                  <span className="snap-label">
                    <TrendingUp size={13} /> Market snapshot
                  </span>
                  <span className="snap-preview">
                    {d.stats[0].v} <i>{d.stats[0].l}</i>
                  </span>
                  <ChevronDown size={15} className="snap-chev" aria-hidden />
                </summary>
                <div className="snap-grid">
                  {d.stats.map((s, i) => (
                    <div className="stat" key={i}>
                      <div className={`v ${s.dir || ""}`}>{s.v}</div>
                      <div className="l">{s.l}</div>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* this week at a glance — bullets that expand into the full story */}
            <div className="glance-card">
              <div className="gc-head">
                <Zap size={15} /> This week at a glance
                <span className="gc-sub">click "More on this" for the full story</span>
              </div>
              <div className="gc-list">
                {d?.items.map((it, i) => (
                  <div className="gc-item" key={`${current?.id}-${i}`} style={{ "--i": i }}>
                    <span className="gc-dot" aria-hidden />
                    <div className="gc-main">
                      <span className="gc-hl">{it.headline.replace(/\.$/, "")}</span>
                      <p className="gc-lead">{it.body}</p>
                      {(it.ctx || it.url) && (
                        <details className="gc-more">
                          <summary>
                            More on this <ChevronDown size={13} className="gc-chev" aria-hidden />
                          </summary>
                          <div className="gc-body">
                            {it.ctx && (
                              <p className="gc-why">
                                <b>Why it matters:</b> {it.ctx}
                              </p>
                            )}
                            {it.url && (
                              <a className="gc-src" href={it.url} target="_blank" rel="noreferrer">
                                Read the source <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* current news links */}
            {d?.sources?.length > 0 && (
              <div className="news-sec">
                <p className="section-title">In the news</p>
                <div className="news-grid">
                  {d.sources.map((s, i) => (
                    <a key={i} className="news-card" href={s.url} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${hostOf(s.url)}&sz=64`}
                        alt=""
                        loading="lazy"
                      />
                      <span className="nc-txt">
                        <b>{s.label}</b>
                        <small>{hostOf(s.url)}</small>
                      </span>
                      <ExternalLink size={14} className="nc-ext" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
