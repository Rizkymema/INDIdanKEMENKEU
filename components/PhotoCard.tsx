"use client";

import Image from "next/image";
import type { Photo } from "@/data/training";
import CurvePattern from "./CurvePattern";
import { CameraIcon, ZoomIcon } from "./Icons";

type Props = {
  photo: Photo;
  /** Nomor urut foto dalam sesi (dimulai dari 0). */
  index: number;
  /** Label kecil di atas foto, mis. nama sesi. */
  label?: string;
  /** Foto unggulan: tampil lebih besar di grid. */
  featured?: boolean;
  tone?: "light" | "dark";
  onOpen?: () => void;
};

/** Kotak placeholder bergaya tema saat `src` foto masih kosong. */
export function PhotoPlaceholder({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-linear-to-br from-brand-dark via-[#6d0710] to-brand-charcoal text-white"
    >
      <CurvePattern className="text-brand-red opacity-40" lines={10} />
      <span
        className={`relative flex items-center justify-center rounded-full border-2 border-brand-gold/70 bg-black/20 text-brand-gold ${
          large ? "h-20 w-20" : "h-14 w-14"
        }`}
      >
        <CameraIcon className={large ? "h-9 w-9" : "h-6 w-6"} />
      </span>
      <span
        className={`relative font-heading font-bold uppercase tracking-widest text-white/90 ${
          large ? "text-sm" : "text-[11px]"
        }`}
      >
        Foto akan ditambahkan
      </span>
    </span>
  );
}

export default function PhotoCard({ photo, index, label, featured = false, tone = "light", onOpen }: Props) {
  const isDark = tone === "dark";
  const number = String(index + 1).padStart(2, "0");

  return (
    <figure
      className={`group flex h-full flex-col overflow-hidden rounded-xl shadow-lg shadow-black/10 ring-1 transition-shadow duration-300 hover:shadow-xl ${
        isDark ? "bg-white/[0.06] ring-white/10 hover:shadow-black/30" : "bg-white ring-black/5 hover:shadow-black/15"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Perbesar foto ${index + 1}${label ? ` sesi ${label}` : ""}: ${photo.alt || photo.caption}`}
        className={`relative block w-full cursor-zoom-in overflow-hidden bg-brand-charcoal focus-visible:outline-offset-[-3px] ${
          featured
            ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:min-h-[22rem] lg:flex-1"
            : "aspect-[4/3]"
        }`}
      >
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 66vw, 100vw"
                : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <PhotoPlaceholder large={featured} />
        )}

        {/* Overlay gradient gelap → merah di bagian bawah */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-brand-dark/95 via-brand-dark/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        />

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left">
          <span className="flex items-center gap-2">
            <span className="h-4 w-1 rounded-full bg-brand-gold" />
            <span className="font-heading text-xs font-extrabold uppercase tracking-widest text-white">
              {label ? `${label} · ` : ""}
              {number}
            </span>
          </span>
          <span className="flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand-gold text-brand-charcoal opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ZoomIcon className="h-4 w-4" />
          </span>
        </span>
      </button>

      {photo.caption ? (
        <figcaption
          className={`flex-none px-4 py-3.5 text-sm leading-relaxed ${
            isDark ? "text-white/85" : "text-zinc-600"
          }`}
        >
          {photo.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
