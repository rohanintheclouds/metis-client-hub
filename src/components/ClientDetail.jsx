"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Star, ExternalLink } from "lucide-react";
import { getClient } from "@/lib/clients";
import { editionsForClient } from "@/lib/pulse";
import { useProfile } from "@/lib/profile";
import ClientLogo from "@/components/ClientLogo";
import { PulseSection } from "@/components/PulseReport";
import PodcastPlayer from "@/components/PodcastPlayer";
import { openNewsletter } from "@/lib/viewNewsletter";

export default function ClientDetail({ id }) {
  const client = getClient(id);
  const editions = editionsForClient(id);
  const [sel, setSel] = useState(editions[0]?.id);
  const { profile, toggleClient, ready } = useProfile();

  if (!client) {
    return (
      <div className="container">
        <div className="empty">Client not found.</div>
      </div>
    );
  }

  const current = editions.find((e) => e.id === sel) || editions[0];
  const following = ready && profile.followedClients.includes(id);

  return (
    <div className="container">
      <Link href="/" className="back">
        <ArrowLeft size={15} /> All clients
      </Link>

      <div className="detail-head reveal">
        <div className="detail-logo">
          <ClientLogo client={client} size={64} />
        </div>
        <div className="detail-title">
          <h1>{client.name}</h1>
          <div className="detail-meta">
            <span className="badge">{client.ticker}</span>
            <span className="badge">{client.coast}</span>
            <span>{client.sector}</span>
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className={`btn ${following ? "teal" : ""}`} onClick={() => toggleClient(id)}>
            <Star size={16} fill={following ? "#08312e" : "none"} />
            {following ? "Following" : "Follow"}
          </button>
        </div>
      </div>

      <div className="grid-2 reveal" style={{ paddingBottom: 60 }}>
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

          <div>
            <p className="section-title" style={{ marginLeft: 2 }}>
              Listen
            </p>
            <PodcastPlayer client={client} editionLabel={current?.label} />
          </div>
        </div>

        {/* right: the selected edition, rendered as an in-app Pulse */}
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
          <div className="pulse">
            <div className="pulse-summary">
              <b>At a glance:</b> {current?.data.glance}
            </div>
            <PulseSection client={client} data={current.data} open lead />
          </div>
        </div>
      </div>
    </div>
  );
}
