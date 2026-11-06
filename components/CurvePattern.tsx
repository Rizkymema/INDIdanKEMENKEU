/**
 * Pola garis halus bergelombang ala header dokumen INDI — SVG inline, dekoratif.
 * Atur warna lewat `text-*` dan transparansi lewat `opacity-*`.
 * Garis memudar ke kiri sehingga teks di sisi kiri tetap bersih.
 */
type Props = {
  className?: string;
  /** Jumlah garis. */
  lines?: number;
  /** Matikan efek memudar ke kiri (garis tampil penuh). */
  full?: boolean;
};

export default function CurvePattern({ className = "", lines = 36, full = false }: Props) {
  const paths = Array.from({ length: lines }, (_, i) => {
    const y = -220 + i * 15;
    return `M 380 ${y} C 640 ${y + 30}, 760 ${y + 250}, 960 ${y + 300} S 1180 ${y + 430}, 1280 ${y + 560}`;
  });

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${
        full ? "" : "[mask-image:linear-gradient(to_left,black_35%,transparent_85%)]"
      } ${className}`}
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMaxYMid slice"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke">
        {paths.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" strokeOpacity={i % 4 === 0 ? 1 : 0.55} />
        ))}
      </g>
    </svg>
  );
}
