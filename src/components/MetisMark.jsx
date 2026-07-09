// Metis Strategy logo lockup.
//
// The mark is the letter "M" split across the horizontal midline: the top half
// is the black M (two legs + a central V), the bottom half is its vertical
// mirror rendered in teal (reads as a W), the two halves pinching at the
// centre. It doubles as the "M" of METIS; "STRATEGY" is right-aligned beneath.
//
// Props:
//   height        — rendered height in px
//   showWordmark  — false renders just the M/W mark
//   variant       — "dark" (black, for light backgrounds) | "light" (white)
export default function MetisMark({ height = 30, showWordmark = true, variant = "dark" }) {
  const body = variant === "light" ? "#ffffff" : "#111111";
  const sub = variant === "light" ? "#d6d9ff" : "#444444";
  const teal = "#3FC9BE";

  // Mark authored in a 0..100 box; scaled/positioned via the group transform.
  const mark = (
    <g transform="translate(2,8) scale(0.8)">
      {/* black top half: two leg-tops + central V */}
      <polygon points="0,0 20,0 20,50 0,50" fill={body} />
      <polygon points="80,0 100,0 100,50 80,50" fill={body} />
      <polygon points="20,0 36,0 50,24 64,0 80,0 50,50" fill={body} />
      {/* teal bottom half: two leg-bottoms + central peak (mirror of top) */}
      <polygon points="0,50 20,50 20,100 0,100" fill={teal} />
      <polygon points="80,50 100,50 100,100 80,100" fill={teal} />
      <polygon points="20,100 36,100 50,76 64,100 80,100 50,50" fill={teal} />
    </g>
  );

  if (!showWordmark) {
    return (
      <svg height={height} viewBox="0 0 88 100" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
        {mark}
      </svg>
    );
  }

  return (
    <svg height={height} viewBox="0 0 356 108" xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
      {mark}
      <text
        x="92"
        y="88"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="112"
        fontWeight="800"
        letterSpacing="1"
        fill={body}
      >
        ETIS
      </text>
      <text
        x="347"
        y="104"
        textAnchor="end"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="21"
        fontWeight="600"
        letterSpacing="6"
        fill={sub}
      >
        STRATEGY
      </text>
    </svg>
  );
}
