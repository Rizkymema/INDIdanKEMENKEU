import type { Stat } from "@/data/training";
import { BookIcon, CalendarIcon, UsersIcon } from "./Icons";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  stats: Stat[];
};

const ICONS = {
  calendar: CalendarIcon,
  book: BookIcon,
  users: UsersIcon,
} as const;

export default function Overview({ eyebrow, heading, paragraphs, stats }: Props) {
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-brand-red">{eyebrow}</p>
            <h2 id="tentang-title" className="heading-display mt-4 text-3xl text-brand-charcoal sm:text-4xl lg:text-[2.75rem]">
              {heading}
            </h2>
            <span aria-hidden="true" className="mt-6 block h-1 w-20 rounded-full bg-brand-gold" />
          </Reveal>

          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-zinc-700 sm:text-lg lg:col-span-7 lg:pt-8">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>

        {stats.length > 0 ? (
          <ul className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {stats.map((stat, i) => {
              const Icon = ICONS[stat.icon] ?? CalendarIcon;
              const long = stat.value.length > 6;
              return (
                <Reveal
                  as="li"
                  key={stat.label}
                  delay={i * 0.08}
                  className="group relative overflow-hidden rounded-xl bg-brand-light p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg sm:p-7"
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-brand-gold" />
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red text-white shadow-md transition-colors group-hover:bg-brand-bright"
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-brand-red">
                    <span className={`heading-display ${long ? "text-3xl sm:text-[2rem]" : "text-5xl sm:text-6xl"}`}>
                      {stat.value}
                    </span>
                    {stat.suffix ? (
                      <span className="font-heading text-xl font-extrabold uppercase text-brand-charcoal">{stat.suffix}</span>
                    ) : null}
                  </p>
                  <h3 className="mt-3 font-heading text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
                    {stat.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{stat.description}</p>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
