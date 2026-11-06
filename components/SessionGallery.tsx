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
};

/** Satu sesi: judul, deskripsi, dan galeri foto + lightbox. */
export default function SessionGallery({ session, anchorId, order, dayLabel }: Props) {
  const [view, setView] = useState<{ index: number | null; direction: number }>({
    index: null,
    direction: 1,
  });
  const photos = session.photos;
  const hasFeatured = photos.length >= 3;
  const number = String(order + 1).padStart(2, "0");

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
      <Reveal>
        {/* Label sesi + garis tipis, seperti judul blok di form INDI */}
        <div className="flex items-center gap-4">
          <span className="eyebrow text-brand-red">Sesi {number}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-zinc-200" />
          <span className="text-xs font-semibold text-zinc-500">{photos.length} foto</span>
        </div>

        <div className="mt-5 mb-8 grid gap-3 md:grid-cols-12 md:gap-10">
          <div className="flex items-center gap-3 md:col-span-4">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-charcoal text-xs font-bold text-white"
            >
              {order + 1}
            </span>
            <h3 id={`${anchorId}-title`} className="heading-display text-2xl text-brand-charcoal sm:text-[1.75rem]">
              {session.title}
            </h3>
          </div>
          <p className="text-[15px] leading-relaxed text-zinc-600 md:col-span-8">{session.description}</p>
        </div>
      </Reveal>

      {photos.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
          aria-label={`Galeri foto ${session.title}`}
        >
          {photos.map((photo, i) => {
            const featured = hasFeatured && i === 0;
            return (
              <Reveal
                as="li"
                key={`${photo.src || "placeholder"}-${i}`}
                delay={Math.min(i, 5) * 0.05}
                className={featured ? "sm:col-span-2 lg:row-span-2" : undefined}
              >
                <PhotoCard
                  photo={photo}
                  index={i}
                  label={session.title}
                  featured={featured}
                  onOpen={() => setView({ index: i, direction: 1 })}
                />
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-300 p-6 text-sm text-zinc-500">
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
