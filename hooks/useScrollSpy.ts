"use client";

import { useEffect, useState } from "react";

export type ScrollSpyState = {
  /** Index section yang sedang aktif (-1 = belum mencapai section pertama). */
  index: number;
  /** Seberapa jauh section aktif sudah discroll (0–1). Hanya dihitung jika `trackProgress`. */
  fraction: number;
  /** true jika garis acuan sudah melewati bagian bawah section terakhir. */
  pastEnd: boolean;
};

type Options = {
  /** Posisi garis acuan dari atas viewport (0–1). Default 0.35. */
  offset?: number;
  /** Hitung progres di dalam section aktif. */
  trackProgress?: boolean;
  /** Paksa section terakhir aktif saat halaman mentok di bawah. */
  activateLastAtBottom?: boolean;
};

const INITIAL: ScrollSpyState = { index: -1, fraction: 0, pastEnd: false };

/**
 * Scroll-spy ringan: menentukan section mana yang sedang dibaca berdasarkan
 * garis acuan horizontal di viewport. Dipakai oleh Navbar & DayTimeline.
 */
export function useScrollSpy(ids: string[], options: Options = {}) {
  const { offset = 0.35, trackProgress = false, activateLastAtBottom = false } = options;
  const [state, setState] = useState<ScrollSpyState>(INITIAL);
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key ? key.split("|") : [];
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = window.innerHeight * offset;
      let index = -1;
      let fraction = 0;
      let pastEnd = false;

      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) {
          index = i;
          pastEnd = rect.bottom < line;
          fraction = trackProgress
            ? Math.min(1, Math.max(0, (line - rect.top) / Math.max(rect.height, 1)))
            : 0;
        }
      });

      if (activateLastAtBottom && sectionIds.length > 0) {
        const atBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom) {
          index = sectionIds.length - 1;
          pastEnd = false;
        }
      }

      setState((prev) =>
        prev.index === index &&
        prev.pastEnd === pastEnd &&
        Math.abs(prev.fraction - fraction) < 0.002
          ? prev
          : { index, fraction, pastEnd },
      );
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(compute);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [key, offset, trackProgress, activateLastAtBottom]);

  return state;
}
