"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Fragment } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

type TimelineDay = { id: string; label: string; title: string };

/**
 * Penunjuk posisi Day 1 – Day N yang ikut bergerak saat scroll.
 * - Desktop (≥1280px): timeline vertikal kecil di sisi kiri.
 * - Mobile/tablet: progress bar di bawah navbar.
 * Hanya tampil saat pengguna berada di area section hari.
 */
export default function DayTimeline({ days }: { days: TimelineDay[] }) {
  const ids = days.map((d) => d.id);
  const { index, fraction, pastEnd } = useScrollSpy(ids, { trackProgress: true, offset: 0.4 });
  const visible = index >= 0 && !(index === days.length - 1 && pastEnd);

  /** Isi garis/segmen ke-i: penuh jika sudah lewat, sebagian jika sedang dibaca. */
  const fillFor = (i: number) => (i < index ? 1 : i === index ? fraction : 0);

  if (days.length === 0) return null;

  return (
    <>
      {/* Desktop: timeline vertikal */}
      <AnimatePresence>
        {visible ? (
          <motion.nav
            key="timeline-desktop"
            aria-label="Timeline kegiatan"
            className="fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3 }}
          >
            <ol className="flex flex-col items-center rounded-full border border-zinc-200 bg-white/95 px-1.5 py-3 shadow-lg shadow-black/5 backdrop-blur">
              <li aria-hidden="true" className="mb-2 text-[9px] font-bold tracking-[0.2em] text-zinc-500">
                DAY
              </li>
              {days.map((day, i) => {
                const state = i === index ? "active" : i < index ? "done" : "todo";
                return (
                  <Fragment key={day.id}>
                    <li>
                      <a
                        href={`#${day.id}`}
                        aria-label={`${day.label} – ${day.title}`}
                        aria-current={state === "active" ? "step" : undefined}
                        className={`group relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                          state === "active"
                            ? "bg-brand-red text-white"
                            : state === "done"
                              ? "bg-red-50 text-brand-red hover:bg-red-100"
                              : "text-zinc-500 ring-1 ring-zinc-200 ring-inset hover:text-brand-charcoal"
                        }`}
                      >
                        {i + 1}
                        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-brand-charcoal px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                          {day.label} · {day.title}
                        </span>
                      </a>
                    </li>
                    {i < days.length - 1 ? (
                      <li aria-hidden="true" className="relative my-1 h-9 w-0.5 overflow-hidden rounded-full bg-zinc-200">
                        <span
                          className="absolute inset-0 origin-top bg-brand-red transition-transform duration-150 ease-out"
                          style={{ transform: `scaleY(${fillFor(i)})` }}
                        />
                      </li>
                    ) : null}
                  </Fragment>
                );
              })}
            </ol>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      {/* Mobile & tablet: progress bar di atas */}
      <AnimatePresence>
        {visible ? (
          <motion.nav
            key="timeline-mobile"
            aria-label="Progres kegiatan"
            className="fixed inset-x-0 top-16 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <ol className="mx-auto flex max-w-6xl px-2 sm:px-4">
              {days.map((day, i) => (
                <li key={day.id} className="min-w-0 flex-1">
                  <a
                    href={`#${day.id}`}
                    aria-current={i === index ? "step" : undefined}
                    className={`relative block truncate px-1 pt-2 pb-2.5 text-center text-[11px] font-bold tracking-[0.14em] uppercase transition-colors ${
                      i === index ? "text-brand-red" : i < index ? "text-brand-charcoal" : "text-zinc-500"
                    }`}
                  >
                    {day.label}
                    <span aria-hidden="true" className="absolute inset-x-1 bottom-0 h-0.5 overflow-hidden rounded-full bg-zinc-200">
                      <span
                        className="absolute inset-0 origin-left bg-brand-red transition-transform duration-150 ease-out"
                        style={{ transform: `scaleX(${fillFor(i)})` }}
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </>
  );
}
