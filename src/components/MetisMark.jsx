// Metis Strategy logo lockup.
//
// The mark is the letter "M" split at the horizontal midline: the top half is
// the black M (two thin stems + a central V), the bottom half is its vertical
// mirror in teal (reads as a W), the halves pinching at the exact centre. Thin
// stems + large white counters match the official Metis mark. It doubles as the
// "M" of METIS; "STRATEGY" is right-aligned beneath.
//
// Props:
//   height        — rendered height in px
//   showWordmark  — false renders just the M/W mark
//   variant       — "dark" (black, for light backgrounds) | "light" (white)
export default function MetisMark({ height = 30, showWordmark = true, variant = "dark" }) {
  const body = variant === "light" ? "#ffffff" : "#111111";
  const sub = variant === "light" ? "#c9cbf0" : "#7b8692";
  const teal = "#08dec5";

  // Mark polygons in a 0..100 (x) × 0..96 (y) box, midline y=48.
  const polys = (
    <>
      {/* black top: stem-tops + central V */}
      <polygon points="0,0 15,0 15,48 0,48" fill={body} />
      <polygon points="85,0 100,0 100,48 85,48" fill={body} />
      <polygon points="15,0 30,0 50,30 70,0 85,0 50,48" fill={body} />
      {/* teal bottom: stem-bottoms + central peak (mirror) */}
      <polygon points="0,48 15,48 15,96 0,96" fill={teal} />
      <polygon points="85,48 100,48 100,96 85,96" fill={teal} />
      <polygon points="15,96 30,96 50,66 70,96 85,96 50,48" fill={teal} />
    </>
  );

  if (!showWordmark) {
    return (
      <svg height={height} viewBox="0 0 100 96" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
        {polys}
      </svg>
    );
  }

  return (
    <svg height={height} viewBox="0 0 348 108" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
      <g transform="translate(2,8) scale(0.8)">{polys}</g>
      <text
        x="92"
        y="86"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="108"
        fontWeight="800"
        letterSpacing="1"
        fill={body}
      >
        ETIS
      </text>
      <text
        x="336"
        y="103"
        textAnchor="end"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="20"
        fontWeight="600"
        letterSpacing="6"
        fill={sub}
      >
        STRATEGY
      </text>
    </svg>
  );
}
