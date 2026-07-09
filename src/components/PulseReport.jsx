// In-app rendering of a Client Pulse edition (mirrors the emailed HTML).
// Used on the client-detail page and inside the personalized "My Pulse" digest.

function Stat({ v, l, dir }) {
  return (
    <div className="stat">
      <div className={`v ${dir || ""}`}>{v}</div>
      <div className="l">{l}</div>
    </div>
  );
}

export function PulseSection({ client, data, open = false, lead = false }) {
  const priv = client.ticker === "Private";
  return (
    <section className={`pulse-sec ${lead ? "lead-card" : ""}`} id={client.id}>
      <details open={open}>
        <summary>
          <span className="tick">
            {client.name} <span className="sub">{client.ticker}</span>
          </span>
          {lead && <span className="pill lead">Priority</span>}
          {priv && !lead && <span className="pill priv">Private</span>}
          <span className="chev">▶</span>
        </summary>
        {data.stats?.length > 0 && (
          <div className="quote">
            {data.stats.map((s, i) => (
              <Stat key={i} {...s} />
            ))}
          </div>
        )}
        <ul className="items">
          {data.items.map((it, i) => (
            <li key={i}>
              <b>{it.headline}</b> {it.body} <span className="ctx">{it.ctx}</span>
            </li>
          ))}
        </ul>
        {data.sources?.length > 0 && (
          <p className="srcline">
            Sources:{" "}
            {data.sources.map((s, i) => (
              <span key={i}>
                {i > 0 && " · "}
                <a className="src" href={s.url} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </span>
            ))}
          </p>
        )}
      </details>
    </section>
  );
}

// Full framed report (header + summary + one-or-many sections)
export default function PulseReport({ title = "Client Pulse", editionLabel, glance, sections }) {
  return (
    <div className="pulse">
      <div className="pulse-head">
        <h2>
          {title.split(" ")[0]} <span className="accent">{title.split(" ").slice(1).join(" ")}</span>
        </h2>
        {editionLabel && <div className="pulse-date">{editionLabel}</div>}
      </div>
      {glance && (
        <div className="pulse-summary">
          <b>At a glance:</b> {glance}
        </div>
      )}
      {sections.map((s, i) => (
        <PulseSection key={s.client.id} client={s.client} data={s.data} open={s.open ?? i === 0} lead={s.lead ?? i === 0} />
      ))}
    </div>
  );
}
