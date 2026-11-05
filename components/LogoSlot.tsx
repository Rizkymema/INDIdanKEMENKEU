import Image from "next/image";
import type { Logo } from "@/data/training";

type Props = {
  logo: Logo;
  /** Kelas ukuran wadah, mis. "h-10 w-28". Logo ditampilkan `object-contain`. */
  className?: string;
  /** Warna placeholder: "dark" untuk latar gelap, "light" untuk latar terang. */
  tone?: "dark" | "light";
  sizes?: string;
};

/**
 * Slot logo: menampilkan file logo jika `src` diisi, atau kotak placeholder
 * bertuliskan nama lembaga jika masih kosong.
 */
export default function LogoSlot({ logo, className = "h-10 w-28", tone = "dark", sizes = "160px" }: Props) {
  if (logo.src) {
    return (
      <span className={`relative inline-block shrink-0 ${className}`}>
        <Image src={logo.src} alt={`Logo ${logo.name}`} fill sizes={sizes} className="object-contain" />
      </span>
    );
  }

  const toneClass =
    tone === "dark"
      ? "border-white/35 bg-white/5 text-white/80"
      : "border-brand-charcoal/25 bg-white text-brand-charcoal/70";

  return (
    <span
      role="img"
      aria-label={`Logo ${logo.name} (placeholder)`}
      className={`inline-flex shrink-0 items-center justify-center rounded-md border border-dashed px-2 text-center font-heading text-[10px] font-bold uppercase leading-tight tracking-wider ${toneClass} ${className}`}
    >
      {logo.name}
    </span>
  );
}
