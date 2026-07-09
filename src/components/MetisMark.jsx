// Metis Strategy logomark (matches the Client Pulse newsletter SVG).
export default function MetisMark({ height = 30, showWordmark = true }) {
  const viewBox = showWordmark ? "0 0 430 92" : "0 0 92 92";
  return (
    <svg height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" aria-label="Metis Strategy">
      <polygon points="8,84 8,10 27,10 46,47 65,10 84,10 84,84 65,84 65,41 54,63 38,63 27,41 27,84" fill="#111111" />
      <polygon points="8,84 27,84 8,62" fill="#3FC9BE" />
      <polygon points="84,84 65,84 84,62" fill="#3FC9BE" />
      {showWordmark && (
        <>
          <text x="112" y="52" fontFamily="Arial,Helvetica,sans-serif" fontSize="46" fontWeight="800" letterSpacing="4" fill="#111111">METIS</text>
          <text x="114" y="78" fontFamily="Arial,Helvetica,sans-serif" fontSize="19" letterSpacing="9" fill="#444444">STRATEGY</text>
        </>
      )}
    </svg>
  );
}
