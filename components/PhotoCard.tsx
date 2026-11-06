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
  onOpen?: () => void;
};

/** Kotak placeholder bergaya tema saat `src` foto masih kosong. */
export function PhotoPlaceholder({ large = false }: { large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="bg-brand-gradient absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden text-white"
    >
      <CurvePattern className="text-white opacity-20" lines={large ? 34 : 26} />
      <span
        className={`relative flex items-center justify-center rounded-full border border-white/50 ${
          large ? "h-16 w-16" : "h-12 w-12"
        }`}
      >
        <CameraIcon className={large ? "h-7 w-7" : "h-5 w-5"} strokeWidth={1.6} />
      </span>
      <span className={`relative font-semibold text-white/90 ${large ? "text-sm" : "text-xs"}`}>
        Foto akan ditambahkan
      </span>
    </span>
  );
}

export default function PhotoCard({ photo, index, label, featured = false, onOpen }: Props) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <figure className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition-[border-color,box-shadow] duration-300 hover:border-zinc-300 hover:shadow-lg hover:shadow-black/5">
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
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <PhotoPlaceholder large={featured} />
        )}

        {/* Overlay gradient gelap → merah di bagian bawah */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-brand-dark/85 via-brand-dark/25 to-transparent"
        />

        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 text-left">
          <span className="text-xs font-semibold text-white">
            {label ? `${label} · ` : ""}
            {number}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-red opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
            <ZoomIcon className="h-4 w-4" />
          </span>
        </span>
      </button>

      {photo.caption ? (
        <figcaption className="flex-none px-4 py-3 text-sm leading-relaxed text-zinc-600">{photo.caption}</figcaption>
      ) : null}
    </figure>
  );
}
