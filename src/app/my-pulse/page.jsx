"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Download, Settings2, Send, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProfile, resolveFollowedClientIds } from "@/lib/profile";
import { getClient } from "@/lib/clients";
import { getPulse, LATEST_EDITION, editionMeta } from "@/lib/pulse";
import { PulseSection } from "@/components/PulseReport";
import { openNewsletter } from "@/lib/viewNewsletter";

export default function MyPulsePage() {
  const { user } = useAuth();
  const { profile, ready } = useProfile();
  const [sent, setSent] = useState(false);

  if (!ready) return null;

  const ids = resolveFollowedClientIds(profile);
  const clients = ids.map(getClient).filter(Boolean);
  const meta = editionMeta(LATEST_EDITION);

  function viewEmail() {
    openNewsletter({ clientIds: ids, edition: LATEST_EDITION, recipient: user.name });
  }

  function sendPreview() {
    // In the deployed app this calls /api/cron/weekly (Resend). In the demo it
    // just confirms — the same HTML is one click away via "View as email".
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <div className="container" style={{ paddingBottom: 60 }}>
      <div className="pagehead reveal">
        <h1>My Pulse</h1>
        <p>
          Your personalized briefing for {meta.label.toLowerCase()} — built from the {clients.length}{" "}
          client{clients.length === 1 ? "" : "s"} you follow.
        </p>
      </div>

      <div className="toolbar" style={{ marginTop: 18 }}>
        <span
          className="chip"
          style={{ background: profile.emailCadence === "weekly" ? "#e2f6f3" : "#fff" }}
        >
          <Mail size={14} />
          {profile.emailCadence === "weekly"
            ? `Emailed weekly · ${profile.digestDay}s 7:00 AM ET`
            : "Weekly email off"}
        </span>
        <Link href="/settings" className="btn sm">
          <Settings2 size={14} /> Edit interests
        </Link>
        <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
          <button className="btn sm" onClick={viewEmail}>
            <Download size={14} /> View as email
          </button>
          <button className="btn sm primary" onClick={sendPreview}>
            {sent ? (
              <>
                <CheckCircle2 size={14} /> Preview queued
              </>
            ) : (
              <>
                <Send size={14} /> Send me a preview
              </>
            )}
          </button>
        </div>
      </div>

      {clients.length === 0 ? (
        <div className="card empty">
          You’re not following any clients yet.{" "}
          <Link href="/settings" className="src">
            Pick your clients →
          </Link>
        </div>
      ) : (
        <div className="pulse">
          <div className="pulse-head">
            <h2>
              Client <span className="accent">Pulse</span>
            </h2>
            <div className="pulse-date">{meta.label}</div>
          </div>
          <div className="pulse-summary">
            <b>This week at a glance:</b> Your briefing covers {clients.map((c) => c.name).join(", ")}.
            Expand any client for the week’s developments, market data, and sources.
          </div>
          {clients.map((c, i) => {
            const data = getPulse(c.id, LATEST_EDITION);
            if (!data) return null;
            return <PulseSection key={c.id} client={c} data={data} open={i === 0} lead={i === 0} />;
          })}
        </div>
      )}
    </div>
  );
}
