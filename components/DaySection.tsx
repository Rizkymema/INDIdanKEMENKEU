import type { Day } from "@/data/training";
import CurvePattern from "./CurvePattern";
import { CalendarIcon, CameraIcon } from "./Icons";
import Reveal from "./Reveal";
import SessionGallery from "./SessionGallery";

type Props = {
  day: Day;
  /** Urutan hari (dimulai dari 0) — menentukan latar terang/gelap selang-seling. */
  index: number;
};

/** Section satu hari kegiatan: header + daftar sesi beserta galeri fotonya. */
export default function DaySection({ day, index }: Props) {
  const isDark = index % 2 === 1;
  const tone = isDark ? "dark" : "light";
  const number = String(index + 1).padStart(2, "0");
  const totalPhotos = day.sessions.reduce((sum, s) => sum + s.photos.length, 0);

  return (
    <section
      id={day.id}
      aria-labelledby={`${day.id}-title`}
      className={`relative overflow-hidden ${
        isDark
          ? "clip-diagonal-top -mt-12 bg-brand-dark pt-32 pb-24 text-white [--diagonal:3rem] sm:-mt-16 sm:pt-40 sm:pb-28 sm:[--diagonal:4rem]"
          : "bg-brand-light py-20 text-brand-charcoal sm:py-28"
      }`}
    >
      {isDark ? (
        <>
          <CurvePattern className="text-black opacity-[0.18]" />
          <CurvePattern className="text-brand-red opacity-25" flip lines={9} />
          {/* Garis emas tipis mengikuti potongan diagonal */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-full bg-brand-gold [clip-path:polygon(0_var(--diagonal),100%_0,100%_5px,0_calc(var(--diagonal)_+_5px))]"
          />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/3 bg-linear-to-l from-zinc-200/70 to-transparent"
        />
      )}

      {/* Angka besar transparan sebagai watermark */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-3 select-none font-heading text-[7rem] font-black leading-none tracking-tighter sm:text-[13rem] lg:text-[17rem] ${
          isDark ? "top-20 text-white/[0.06] sm:top-24" : "top-8 text-brand-red/[0.06] sm:top-12"
        }`}
      >
        {number}
      </span>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header hari */}
        <Reveal as="header" className="mb-14 max-w-3xl sm:mb-16">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="clip-parallelogram inline-flex items-center gap-2 bg-brand-red py-2 pr-7 pl-6 font-heading text-xl font-black uppercase tracking-wider text-brand-gold shadow-lg ring-1 ring-brand-gold/40">
              {day.label}
            </span>
            {day.date ? (
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  isDark ? "text-white/85" : "text-zinc-600"
                }`}
              >
                <CalendarIcon className={`h-4 w-4 ${isDark ? "text-brand-gold" : "text-brand-red"}`} />
                {day.date}
              </span>
            ) : null}
          </div>

          <h2 id={`${day.id}-title`} className="heading-display mt-6 text-4xl sm:text-5xl lg:text-6xl">
            {day.title}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-1 w-20 rounded-full bg-brand-gold" />
          {day.summary ? (
            <p className={`mt-6 text-base leading-relaxed sm:text-lg ${isDark ? "text-white/90" : "text-zinc-700"}`}>
              {day.summary}
            </p>
          ) : null}

          {/* Navigasi cepat antar sesi */}
          {day.sessions.length > 1 ? (
            <nav aria-label={`Sesi ${day.label}`} className="mt-7">
              <ul className="flex flex-wrap gap-2">
                {day.sessions.map((session) => (
                  <li key={session.id}>
                    <a
                      href={`#${day.id}-${session.id}`}
                      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                        isDark
                          ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-brand-gold hover:text-brand-charcoal"
                          : "bg-white text-brand-charcoal ring-1 ring-black/10 hover:bg-brand-red hover:text-white"
                      }`}
                    >
                      {session.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <p
            className={`mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest ${
              isDark ? "text-white/70" : "text-zinc-500"
            }`}
          >
            <CameraIcon className="h-4 w-4" />
            {day.sessions.length} sesi · {totalPhotos} foto
          </p>
        </Reveal>

        <div className="space-y-20 sm:space-y-24">
          {day.sessions.map((session, i) => (
            <SessionGallery
              key={session.id}
              session={session}
              anchorId={`${day.id}-${session.id}`}
              order={i}
              dayLabel={day.label}
              tone={tone}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
