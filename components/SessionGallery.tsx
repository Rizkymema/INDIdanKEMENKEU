"use client";

import { useCallback, useState } from "react";
import type { Session } from "@/data/training";
import { CameraIcon } from "./Icons";
import Lightbox from "./Lightbox";
import PhotoCard from "./PhotoCard";
import Reveal from "./Reveal";

type Props = {
  session: Session;
  /** Anchor unik sesi, mis. "day-2-praktik-a". */
  anchorId: string;
  /** Urutan sesi di dalam hari (dimulai dari 0). */
  order: number;
  /** Label hari, mis. "DAY 2" — dipakai di judul lightbox. */
  dayLabel: string;
  tone?: "light" | "dark";
};

/** Satu sesi: judul, deskripsi, dan galeri foto + lightbox. */
export default function SessionGallery({ session, anchorId, order, dayLabel, tone = "light" }: Props) {
  const [view, setView] = useState<{ index: number | null; direction: number }>({
    index: null,
    direction: 1,
  });
  const isDark = tone === "dark";
  const photos = session.photos;
  const hasFeatured = photos.length >= 3;

  const close = useCallback(() => setView((v) => ({ ...v, index: null })), []);
  const navigate = useCallback(
    (step: 1 | -1) =>
      setView((v) =>
        v.index === null
          ? v
          : { index: (v.index + step + photos.length) % photos.length, direction: step },
      ),
    [photos.length],
  );

  return (
    <article id={anchorId} aria-labelledby={`${anchorId}-title`} className="scroll-mt-28 xl:scroll-mt-20">
      <Reveal className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex items-start gap-4">
          <span
            aria-hidden="true"
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg font-heading text-lg font-black shadow-md ${
              isDark ? "bg-brand-gold text-brand-charcoal" : "bg-brand-red text-white"
            }`}
          >
            {String(order + 1).padStart(2, "0")}
          </span>
          <div>
            <p
              className={`font-heading text-xs font-bold uppercase tracking-[0.2em] ${
                isDark ? "text-brand-gold" : "text-brand-red"
              }`}
            >
              Sesi {order + 1}
            </p>
            <h3
              id={`${anchorId}-title`}
              className={`heading-display mt-1 text-2xl sm:text-3xl ${isDark ? "text-white" : "text-brand-charcoal"}`}
            >
              {session.title}
            </h3>
          </div>
        </div>
        <p
          className={`max-w-xl text-[15px] leading-relaxed md:text-right ${
            isDark ? "text-white/85" : "text-zinc-600"
          }`}
        >
          {session.description}
        </p>
      </Reveal>

      {photos.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          aria-label={`Galeri foto ${session.title}`}
        >
          {photos.map((photo, i) => {
            const featured = hasFeatured && i === 0;
            return (
              <Reveal
                as="li"
                key={`${photo.src || "placeholder"}-${i}`}
                delay={Math.min(i, 5) * 0.06}
                className={featured ? "sm:col-span-2 lg:row-span-2" : undefined}
              >
                <PhotoCard
                  photo={photo}
                  index={i}
                  label={session.title}
                  featured={featured}
                  tone={tone}
                  onOpen={() => setView({ index: i, direction: 1 })}
                />
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <div
          className={`flex items-center gap-3 rounded-xl border border-dashed p-6 text-sm ${
            isDark ? "border-white/25 text-white/75" : "border-zinc-300 text-zinc-500"
          }`}
        >
          <CameraIcon className="h-5 w-5 shrink-0" />
          Foto untuk sesi ini belum ditambahkan.
        </div>
      )}

      <Lightbox
        photos={photos}
        index={view.index}
        direction={view.direction}
        title={`${dayLabel} · ${session.title}`}
        onClose={close}
        onNavigate={navigate}
      />
    </article>
  );
}
