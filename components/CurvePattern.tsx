/**
 * Pola garis lengkung ala banner korporat — SVG inline, dekoratif.
 * Atur warna lewat `text-*` dan transparansi lewat `opacity-*`.
 */
type Props = {
  className?: string;
  /** Jumlah garis lengkung. */
  lines?: number;
  /** Balik arah lengkungan secara horizontal. */
  flip?: boolean;
};

export default function CurvePattern({ className = "", lines = 14, flip = false }: Props) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const y = 60 + i * 52;
    return `M -120 ${y} C 260 ${y - 240}, 640 ${y + 280}, 1320 ${y - 120}`;
  });

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        transform={flip ? "translate(1200 0) scale(-1 1)" : undefined}
      >
        {paths.map((d, i) => (
          <path key={i} d={d} strokeOpacity={i % 3 === 0 ? 1 : 0.55} />
        ))}
      </g>
    </svg>
  );
}
