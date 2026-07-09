import { getClient } from "@/lib/clients";
import { getPulse, LATEST_EDITION } from "@/lib/pulse";

// Podcast generation stub (ElevenLabs).
//
// Production: build a two-host script from the week's Pulse, then call the
// ElevenLabs text-to-speech / dialogue API with two voices, stitch, and cache
// the MP3 to storage. Returns the audio URL.
//
// Prototype: returns the generated script + a stub audio reference so the UI
// player has something to render. No API call is made without ELEVENLABS_API_KEY.
export function GET(request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client");
  const client = getClient(clientId);
  const data = client ? getPulse(clientId, LATEST_EDITION) : null;

  if (!client || !data) {
    return Response.json({ ok: false, error: "unknown client" }, { status: 404 });
  }

  // Draft a lightweight two-host dialogue from the brief.
  const script = [
    { speaker: "Alex", line: `Welcome back to the Metis Client Pulse. Today: ${client.name}.` },
    { speaker: "Jordan", line: data.glance },
    ...data.items.slice(0, 3).flatMap((it) => [
      { speaker: "Alex", line: `${it.headline} ${it.body}` },
      { speaker: "Jordan", line: it.ctx },
    ]),
    { speaker: "Alex", line: "That's the pulse on this one. More next week." },
  ];

  const enabled = Boolean(process.env.ELEVENLABS_API_KEY);

  return Response.json({
    ok: true,
    client: client.name,
    mode: enabled ? "live" : "stub",
    voices: {
      host: process.env.ELEVENLABS_VOICE_HOST || "Alex (default)",
      guest: process.env.ELEVENLABS_VOICE_GUEST || "Jordan (default)",
    },
    durationEstimateSec: script.length * 12,
    audioUrl: enabled ? `/podcasts/${clientId}-${LATEST_EDITION}.mp3` : null,
    script,
    note: enabled
      ? "Generate and stream via ElevenLabs."
      : "Stub mode: set ELEVENLABS_API_KEY to synthesize real audio.",
  });
}
