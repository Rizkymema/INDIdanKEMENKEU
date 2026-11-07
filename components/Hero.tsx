import Image from "next/image";
import type { Logo } from "@/data/training";
import CurvePattern from "./CurvePattern";
import { ArrowDownIcon, ChevronRightIcon } from "./Icons";
import LogoSlot from "./LogoSlot";
import Reveal from "./Reveal";

type Detail = { label: string; value: string; note?: string };

type AgendaItem = {
  id: string;
  label: string;
  title: string;
  sessions: string[];
  photos: number;
};

type Props = {
  event: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tagline: string;
    client: string;
    location: string;
    heroImage: string;
    heroImageAlt: string;
    ctaLabel: string;
    details: Detail[];
  };
  clientLogo: Logo;
  partners: Logo[];
  /** Daftar isi (agenda per hari) di panel putih hero. */
  agenda: AgendaItem[];
};

/**
 * Hero bergaya sampul dokumen INDI: header merah gradien dengan garis halus,
 * lalu panel putih berisi info kegiatan dan daftar isi.
 */
export default function Hero({ event, clientLogo, partners, agenda }: Props) {
  const ctaTarget = agenda[0]?.id ?? "tentang";

  return (
    <section id="beranda" aria-labelledby="hero-title" tabIndex={-1} className="outline-none">
      {/* Header merah */}
      <div data-surface="dark" className="bg-brand-gradient relative isolate overflow-hidden text-white">
        {event.heroImage ? (
          <>
            <Image
              src={event.heroImage}
              alt={event.heroImageAlt}
              fill
              preload
              sizes="100vw"
              className="-z-20 object-cover"
            />
            <div aria-hidden="true" className="bg-brand-gradient absolute inset-0 -z-10 opacity-[0.88]" />
          </>
        ) : null}
        <CurvePattern className="-z-10 text-white opacity-25" />

        <div className="mx-auto flex min-h-[72svh] max-w-6xl flex-col justify-end px-4 pt-28 pb-14 sm:px-6 sm:pb-16 lg:px-8 xl:px-15">
          {partners.length > 0 ? (
            <Reveal className="mb-auto flex flex-wrap items-center gap-2 pb-10">
              <span className="eyebrow mr-2 w-full text-white/75 sm:w-auto">Didukung oleh</span>
              {partners.map((logo) => (
                <LogoSlot key={logo.name} logo={logo} variant="chip" className="h-8 w-24" />
              ))}
            </Reveal>
          ) : null}

          <Reveal delay={0.05}>
            <LogoSlot logo={clientLogo} variant="box" className="h-11 w-36" sizes="360px" />
            <p className="eyebrow mt-8 text-white/90">{event.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 id="hero-title" className="heading-display mt-4 max-w-5xl text-[clamp(2.4rem,6.4vw,4.75rem)]">
              <span className="block">{event.title}</span>
              <span className="block">{event.subtitle}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base font-medium text-white/90 sm:text-lg">{event.tagline}</p>
            <p className="mt-2 text-sm text-white/75">
              {event.client} · {event.location}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`#${ctaTarget}`}
                className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-brand-red shadow-sm transition-colors hover:bg-brand-light"
              >
                {event.ctaLabel}
                <ArrowDownIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#tentang"
                className="inline-flex items-center rounded-md px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/45 transition-colors ring-inset hover:bg-white/10"
              >
                Tentang Program
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Panel putih: info kegiatan + daftar isi */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-12 lg:gap-12 lg:px-8 xl:px-15">
          <Reveal className="lg:col-span-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-7">
              {event.details.map((d) => (
                <div key={d.label}>
                  <dt className="eyebrow text-[0.625rem] text-zinc-500">{d.label}</dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-bold text-brand-charcoal">{d.value}</dd>
                  {d.note ? <dd className="mt-0.5 text-xs text-zinc-500">{d.note}</dd> : null}
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <nav aria-labelledby="isi-halaman">
              <p id="isi-halaman" className="eyebrow text-[0.625rem] text-zinc-500">
                Isi halaman
              </p>
              <ol className="mt-3 divide-y divide-zinc-200 border-t border-zinc-200">
                {agenda.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 py-3 transition-colors hover:bg-brand-light/70"
                    >
                      <span className="pl-1 text-xs font-bold text-brand-red">{item.label}</span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-brand-charcoal">{item.title}</span>
                        <span className="block truncate text-xs text-zinc-500">{item.sessions.join(" · ")}</span>
                      </span>
                      <span className="flex items-center gap-1 pr-1 text-xs font-semibold text-zinc-500 group-hover:text-brand-red">
                        {item.photos} foto
                        <ChevronRightIcon className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
