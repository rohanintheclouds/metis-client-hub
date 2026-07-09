"use client";

import { useState } from "react";
import { Play, Pause, Podcast, Sparkles } from "lucide-react";

// Placeholder for the ElevenLabs-generated "Client Pulse Audio" feature.
// Simulates a two-voice podcast episode per client. When ELEVENLABS_API_KEY is
// set, /api/podcast returns a real generated MP3; until then this plays a demo.
export default function PodcastPlayer({ client, editionLabel }) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function handlePlay() {
    if (!generated) {
      setLoading(true);
      try {
        await fetch(`/api/podcast?client=${client.id}&edition=${encodeURIComponent(editionLabel || "")}`);
      } catch {}
      setLoading(false);
      setGenerated(true);
    }
    setPlaying((p) => !p);
  }

  const bars = [10, 18, 24, 14, 22, 8, 20, 16, 26, 12, 19, 9, 23, 15, 21, 11, 25, 13];

  return (
    <div className="card">
      <div className="podcast">
        <div className="podcast-art">
          <Podcast size={30} strokeWidth={2} />
        </div>
        <div className="podcast-body">
          <h3>{client.name} — Weekly Pulse Audio</h3>
          <div className="meta">
            {editionLabel || "Latest edition"} · ~6 min · AI hosts “Alex & Jordan”
          </div>
          <div className="wave" aria-hidden>
            {bars.map((h, i) => (
              <span
                key={i}
                style={{
                  height: playing ? h + (i % 3) * 4 : h,
                  opacity: playing ? 0.9 - (i % 5) * 0.1 : 0.4,
                  transition: "all .3s",
                }}
              />
            ))}
          </div>
        </div>
        <button className="btn primary" onClick={handlePlay} disabled={loading} style={{ flexShrink: 0 }}>
          {loading ? (
            <>
              <Sparkles size={16} /> Generating…
            </>
          ) : playing ? (
            <>
              <Pause size={16} /> Pause
            </>
          ) : (
            <>
              <Play size={16} /> Play episode
            </>
          )}
        </button>
      </div>
      <div style={{ padding: "0 22px 18px" }}>
        <span className="demoflag">Preview</span>{" "}
        <span className="muted" style={{ fontSize: 12.5 }}>
          ElevenLabs voice synthesis stub. Drop ELEVENLABS_API_KEY in .env.local to generate real
          two-host audio from this week’s brief.
        </span>
      </div>
    </div>
  );
}
