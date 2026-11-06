import type { Day } from "@/data/training";
import CurvePattern from "./CurvePattern";
import { CalendarIcon } from "./Icons";
import Reveal from "./Reveal";
import SessionGallery from "./SessionGallery";

type Props = {
  day: Day;
  /** Urutan hari (dimulai dari 0) — menentukan latar isi putih/abu muda selang-seling. */
  index: number;
};

/**
 * Section satu hari kegiatan: header merah ala halaman dokumen INDI,
 * lalu daftar sesi beserta galeri fotonya.
 */
export default function DaySection({ day, index }: Props) {
  const totalPhotos = day.sessions.reduce((sum, s) => sum + s.photos.length, 0);
  const bodyBg = index % 2 === 0 ? "bg-white" : "bg-brand-light";

  return (
    <section id={day.id} aria-labelledby={`${day.id}-title`} className={bodyBg}>
      {/* Header hari */}
      <header data-surface="dark" className="bg-brand-gradient relative isolate overflow-hidden text-white">
        <CurvePattern className="-z-10 text-white opacity-20" lines={30} />
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow flex items-center gap-2 text-white/85">
                <CalendarIcon className="h-3.5 w-3.5" />
                {day.date || day.label}
              </p>
              <h2 id={`${day.id}-title`} className="heading-display mt-3 text-4xl sm:text-5xl">
                {day.title}
              </h2>
              {day.summary ? (
                <p className="mt-4 text-[15px] leading-relaxed text-white/90 sm:text-base">{day.summary}</p>
              ) : null}
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 md:items-end md:text-right">
              <span className="rounded-sm bg-white px-2.5 py-1 text-[11px] font-extrabold tracking-[0.18em] text-brand-red uppercase">
                {day.label}
              </span>
              <span className="text-sm font-bold">
                {day.sessions.length} sesi · {totalPhotos} foto
              </span>
            </div>
          </Reveal>

          {/* Navigasi cepat antar sesi */}
          {day.sessions.length > 1 ? (
            <nav aria-label={`Sesi ${day.label}`} className="mt-8 border-t border-white/20 pt-5">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {day.sessions.map((session, i) => (
                  <li key={session.id}>
                    <a
                      href={`#${day.id}-${session.id}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white"
                    >
                      <span className="text-[11px] font-bold text-white/60">{String(i + 1).padStart(2, "0")}</span>
                      <span className="underline-offset-4 hover:underline">{session.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </div>
      </header>

      {/* Isi: sesi & galeri */}
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16 sm:space-y-20 sm:px-6 sm:py-20 lg:px-8">
        {day.sessions.map((session, i) => (
          <SessionGallery
            key={session.id}
            session={session}
            anchorId={`${day.id}-${session.id}`}
            order={i}
            dayLabel={day.label}
          />
        ))}
      </div>
    </section>
  );
}
