"use client";

import { Star } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/profile";
import { CLIENTS } from "@/lib/clients";
import { COASTS, PROJECT_TYPES } from "@/lib/brand";
import ClientLogo from "@/components/ClientLogo";

export default function SettingsPage() {
  const { user } = useAuth();
  const { profile, ready, toggleClient, toggleTag, setCadence, setDigestDay } = useProfile();
  if (!ready) return null;

  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="narrow" style={{ paddingBottom: 60 }}>
      <div className="pagehead">
        <h1>Settings</h1>
        <p>Choose the clients you care about. Your My Pulse page and weekly email follow these.</p>
      </div>

      {/* Weekly email */}
      <div className="card" style={{ padding: 22, marginTop: 18 }}>
        <p className="section-title">Weekly newsletter</p>
        <div className="follow-row" style={{ padding: "6px 0" }}>
          <div>
            <div className="nm">Email me the Client Pulse</div>
            <div className="sb">
              {profile.emailCadence === "weekly"
                ? `Delivered to ${user.email} · every ${profile.digestDay} at 7:00 AM ET`
                : `Paused · no emails to ${user.email}`}
            </div>
          </div>
          <div className="switch" style={{ display: "flex", gap: 8 }}>
            <button
              className={`chip ${profile.emailCadence === "weekly" ? "on" : ""}`}
              onClick={() => setCadence("weekly")}
            >
              Weekly
            </button>
            <button
              className={`chip ${profile.emailCadence === "off" ? "on" : ""}`}
              onClick={() => setCadence("off")}
            >
              Off
            </button>
          </div>
        </div>
        {profile.emailCadence === "weekly" && (
          <div style={{ marginTop: 14 }}>
            <div className="sb" style={{ marginBottom: 8 }}>Delivery day</div>
            <div className="filter-row">
              {DAYS.map((d) => (
                <button
                  key={d}
                  className={`chip tag ${profile.digestDay === d ? "on" : ""}`}
                  onClick={() => setDigestDay(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Follow by project type */}
      <div className="card" style={{ padding: 22, marginTop: 18 }}>
        <p className="section-title">Follow by project type</p>
        <p className="muted" style={{ fontSize: 13, margin: "0 0 14px" }}>
          Auto-include every client tagged with a project type you select.
        </p>
        <div className="filter-row">
          {PROJECT_TYPES.map((t) => (
            <button
              key={t}
              className={`chip tag ${profile.followedTags.includes(t) ? "on" : ""}`}
              onClick={() => toggleTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Follow individual clients, grouped by coast */}
      {COASTS.map((coast) => (
        <div key={coast} className="card" style={{ padding: 22, marginTop: 18 }}>
          <p className="section-title">{coast}</p>
          <div className="follow-list">
            {CLIENTS.filter((c) => c.coast === coast).map((c) => {
              const on = profile.followedClients.includes(c.id);
              return (
                <div key={c.id} className="follow-row">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <ClientLogo client={c} size={34} />
                    <div>
                      <div className="nm">{c.name}</div>
                      <div className="sb">
                        {c.ticker} · {c.sector}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`btn sm switch ${on ? "teal" : ""}`}
                    onClick={() => toggleClient(c.id)}
                  >
                    <Star size={14} fill={on ? "#08312e" : "none"} />
                    {on ? "Following" : "Follow"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
