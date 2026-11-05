import Image from "next/image";
import type { Logo } from "@/data/training";
import CurvePattern from "./CurvePattern";
import { ArrowDownIcon, BuildingIcon, CalendarIcon, MapPinIcon } from "./Icons";
import LogoSlot from "./LogoSlot";
import Reveal from "./Reveal";

type Props = {
  event: {
    eyebrow: string;
    title: string;
    subtitle: string;
    organizer: string;
    location: string;
    date: string;
    hashtag: string;
    heroImage: string;
    heroImageAlt: string;
    ctaLabel: string;
  };
  clientLogo: Logo;
  partners: Logo[];
  /** Anchor tujuan tombol CTA, mis. "day-1". */
  ctaTarget: string;
};

export default function Hero({ event, clientLogo, partners, ctaTarget }: Props) {
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      tabIndex={-1}
      className="relative isolate outline-none flex min-h-[100svh] flex-col overflow-hidden bg-brand-charcoal text-white"
    >
      {/* Latar: foto (jika ada) atau placeholder bergaya tema */}
      {event.heroImage ? (
        <Image
          src={event.heroImage}
          alt={event.heroImageAlt}
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-linear-to-br from-[#2a0a0e] via-brand-charcoal to-brand-dark">
          <CurvePattern className="text-brand-red opacity-30" />
        </div>
      )}
      {/* Overlay gelap → merah */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-b from-black/75 via-black/55 to-brand-dark/85"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pt-24 pb-36 sm:px-6 sm:pt-28 sm:pb-44 lg:px-8">
        {/* Baris logo partner */}
        {partners.length > 0 ? (
          <Reveal className="mb-8 flex flex-wrap items-center gap-2.5 sm:mb-10 sm:gap-4">
            <span className="w-full text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:mr-1 sm:w-auto">
              Didukung oleh
            </span>
            {partners.map((logo) => (
              <LogoSlot key={logo.name} logo={logo} className="h-10 w-[6.5rem] sm:h-12 sm:w-32" tone="dark" />
            ))}
          </Reveal>
        ) : null}

        <Reveal delay={0.05}>
          <LogoSlot logo={clientLogo} className="h-12 w-36 sm:h-14 sm:w-44" tone="dark" sizes="200px" />
          <p className="mt-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold sm:text-sm">
            <span aria-hidden="true" className="h-0.5 w-10 bg-brand-gold" />
            {event.eyebrow}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 id="hero-title" className="mt-5">
            <span className="heading-display block text-[clamp(2.6rem,9.5vw,6.5rem)] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
              {event.title}
            </span>
            <span className="clip-parallelogram mt-4 inline-block bg-brand-red py-2 pr-8 pl-6 font-heading text-[clamp(1.1rem,3.6vw,2.4rem)] font-extrabold uppercase tracking-wide text-white shadow-xl">
              {event.subtitle}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <ul className="mt-7 flex flex-col gap-2.5 text-sm text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:text-base">
            <li className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-brand-gold" />
              <span>{event.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-brand-gold" />
              <span>{event.date}</span>
            </li>
            <li className="flex items-center gap-2">
              <BuildingIcon className="h-5 w-5 text-brand-gold" />
              <span>{event.organizer}</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={`#${ctaTarget}`}
              className="group inline-flex items-center gap-3 rounded-lg bg-brand-gold px-6 py-3.5 font-heading text-sm font-extrabold uppercase tracking-wider text-brand-charcoal shadow-lg shadow-black/30 transition-colors hover:bg-white"
            >
              {event.ctaLabel}
              <ArrowDownIcon className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#tentang"
              className="inline-flex items-center rounded-lg px-5 py-3.5 font-heading text-sm font-bold uppercase tracking-wider text-white ring-1 ring-white/40 transition-colors hover:bg-white/10"
            >
              Tentang Program
            </a>
          </div>
        </Reveal>
      </div>

      {/* Band merah diagonal di bagian bawah hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-44">
        <div className="absolute inset-0 bg-brand-gold [clip-path:polygon(0_52%,100%_0,100%_100%,0_100%)]" />
        <div className="absolute inset-0 overflow-hidden bg-brand-red [clip-path:polygon(0_60%,100%_8%,100%_100%,0_100%)]">
          <CurvePattern className="text-brand-dark opacity-60" lines={8} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-brand-dark [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
      </div>
      <p className="pointer-events-none absolute right-4 bottom-4 font-heading text-sm font-black tracking-wide text-white sm:right-8 sm:bottom-6 sm:text-lg">
        {event.hashtag}
      </p>
    </section>
  );
}
