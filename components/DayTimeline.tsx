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
            <ol className="flex flex-col items-center rounded-full bg-brand-charcoal/90 px-2 py-3 shadow-xl ring-1 ring-white/10 backdrop-blur">
              <li aria-hidden="true" className="mb-2 font-heading text-[9px] font-extrabold tracking-[0.2em] text-brand-gold">
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
                        className={`group relative flex h-9 w-9 items-center justify-center rounded-full font-heading text-sm font-black transition-colors duration-300 ${
                          state === "active"
                            ? "bg-brand-gold text-brand-charcoal"
                            : state === "done"
                              ? "bg-brand-red text-white hover:bg-brand-bright"
                              : "text-white/70 ring-1 ring-white/30 hover:text-white hover:ring-white/60"
                        }`}
                      >
                        {i + 1}
                        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-brand-charcoal px-2.5 py-1 font-sans text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                          {day.label} · {day.title}
                        </span>
                      </a>
                    </li>
                    {i < days.length - 1 ? (
                      <li aria-hidden="true" className="relative my-1 h-10 w-[3px] overflow-hidden rounded-full bg-white/15">
                        <span
                          className="absolute inset-0 origin-top bg-brand-gold transition-transform duration-150 ease-out"
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
            className="fixed inset-x-0 top-16 z-40 bg-brand-charcoal/95 shadow-md backdrop-blur xl:hidden"
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
                    className={`relative block truncate px-1 pt-2 pb-2.5 text-center font-heading text-[11px] font-extrabold uppercase tracking-widest transition-colors ${
                      i === index ? "text-brand-gold" : i < index ? "text-white" : "text-white/60"
                    }`}
                  >
                    {day.label}
                    <span aria-hidden="true" className="absolute inset-x-1 bottom-0 h-[3px] overflow-hidden rounded-full bg-white/15">
                      <span
                        className="absolute inset-0 origin-left bg-brand-gold transition-transform duration-150 ease-out"
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
