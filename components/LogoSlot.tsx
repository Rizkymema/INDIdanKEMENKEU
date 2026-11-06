import Image from "next/image";
import type { Logo } from "@/data/training";

type Props = {
  logo: Logo;
  /** Kelas ukuran wadah, mis. "h-10 w-28". Logo ditampilkan `object-contain`. */
  className?: string;
  /**
   * Gaya placeholder bila `src` kosong:
   * - "wordmark": tulisan logo (nama tebal + subjudul kecil), mis. untuk INDI
   * - "chip": label kecil bergaris tipis
   * - "box": kotak bergaris tipis seukuran logo
   */
  variant?: "wordmark" | "chip" | "box";
  /** Warna placeholder: "light" untuk latar merah/gelap, "dark" untuk latar putih. */
  tone?: "light" | "dark";
  sizes?: string;
};

/**
 * Slot logo: menampilkan file logo jika `src` diisi, atau placeholder
 * bergaya minimalis jika masih kosong.
 */
export default function LogoSlot({
  logo,
  className = "h-10 w-28",
  variant = "box",
  tone = "light",
  sizes = "160px",
}: Props) {
  if (logo.src) {
    return (
      <span className={`relative inline-block shrink-0 ${className}`}>
        <Image src={logo.src} alt={`Logo ${logo.name}`} fill sizes={sizes} className="object-contain" />
      </span>
    );
  }

  const light = tone === "light";

  if (variant === "wordmark") {
    const words = (logo.subtitle ?? "").split(/\s+/).filter(Boolean);
    return (
      <span
        role="img"
        aria-label={`Logo ${logo.name}`}
        className={`inline-flex shrink-0 items-center gap-2 ${light ? "text-white" : "text-brand-red"}`}
      >
        <span className="text-[1.65rem] leading-none font-extrabold tracking-[-0.06em]">{logo.name}</span>
        {words.length > 0 ? (
          <span className={`text-[7px] leading-[1.15] font-semibold tracking-[0.08em] uppercase ${light ? "text-white/90" : "text-brand-charcoal/70"}`}>
            {words.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </span>
        ) : null}
      </span>
    );
  }

  if (variant === "chip") {
    return (
      <span
        role="img"
        aria-label={`Logo ${logo.name} (placeholder)`}
        className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide ${
          light ? "border-white/35 text-white/90" : "border-zinc-300 text-zinc-600"
        }`}
      >
        {logo.name}
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={`Logo ${logo.name} (placeholder)`}
      className={`inline-flex shrink-0 items-center justify-center rounded-md border px-3 text-center text-xs font-bold tracking-wide ${
        light ? "border-white/35 text-white" : "border-zinc-300 text-zinc-600"
      } ${className}`}
    >
      {logo.name}
    </span>
  );
}
