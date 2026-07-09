// Metis Strategy logo lockup.
//
// The stylized "M" (black body, teal triangular feet, white centre notch) is
// the first letter of METIS; "STRATEGY" is right-aligned beneath. This matches
// the official Metis Strategy wordmark.
//
// Props:
//   height        — rendered height in px
//   showWordmark  — false renders just the M glyph
//   variant       — "dark" (black text, for light backgrounds) | "light" (white text)
export default function MetisMark({ height = 30, showWordmark = true, variant = "dark" }) {
  const body = variant === "light" ? "#ffffff" : "#111111";
  const sub = variant === "light" ? "#d6d9ff" : "#444444";
  const teal = "#3FC9BE";

  // M glyph, framed in a 64×80 box (cap height 8→72).
  const glyph = (
    <g>
      <polygon
        points="0,72 0,8 16,8 32,40 48,8 64,8 64,72 48,72 48,34 40,52 24,52 16,34 16,72"
        fill={body}
      />
      {/* teal feet */}
      <polygon points="0,72 16,72 0,40" fill={teal} />
      <polygon points="64,72 48,72 64,40" fill={teal} />
    </g>
  );

  if (!showWordmark) {
    return (
      <svg height={height} viewBox="-3 4 70 72" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
        {glyph}
      </svg>
    );
  }

  return (
    <svg height={height} viewBox="0 0 274 104" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
      {glyph}
      <text
        x="70"
        y="72"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="86"
        fontWeight="800"
        letterSpacing="1"
        fill={body}
      >
        ETIS
      </text>
      <text
        x="262"
        y="96"
        textAnchor="end"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="18"
        fontWeight="600"
        letterSpacing="7"
        fill={sub}
      >
        STRATEGY
      </text>
    </svg>
  );
}
