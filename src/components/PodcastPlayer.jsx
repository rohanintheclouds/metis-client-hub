"use client";

import { useState } from "react";
import { Play, Pause, Mic, Sparkles, Clock } from "lucide-react";

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
        await fetch(`/api/podcast?client=${client.id}`);
      } catch {}
      setLoading(false);
      setGenerated(true);
    }
    setPlaying((p) => !p);
  }

  const bars = [8, 14, 20, 12, 22, 10, 26, 16, 24, 12, 18, 9, 23, 15, 21, 11, 19, 13, 25, 10, 17, 14];

  return (
    <div className="pcast">
      <div className="pcast-top">
        <div className="pcast-art">
          <Mic size={26} strokeWidth={2} />
        </div>
        <div className="pcast-head">
          <h3>Weekly Pulse Audio</h3>
          <div className="pcast-meta">
            <Clock size={12} /> ~6 min · {editionLabel || "Latest"}
          </div>
          <div className="pcast-hosts">AI hosts · Alex &amp; Jordan</div>
        </div>
      </div>

      <div className={`wave ${playing ? "on" : ""}`} aria-hidden>
        {bars.map((h, i) => (
          <span key={i} style={{ height: playing ? h + (i % 3) * 3 : Math.max(4, h - 6) }} />
        ))}
      </div>

      <button className="pcast-play" onClick={handlePlay} disabled={loading}>
        {loading ? (
          <>
            <Sparkles size={16} /> Generating audio…
          </>
        ) : playing ? (
          <>
            <Pause size={16} fill="currentColor" /> Pause episode
          </>
        ) : (
          <>
            <Play size={16} fill="currentColor" /> Play episode
          </>
        )}
      </button>

      <div className="pcast-note">
        <span className="demoflag">Preview</span>
        <span>ElevenLabs voice stub. Add a key to generate real two-host audio.</span>
      </div>
    </div>
  );
}
