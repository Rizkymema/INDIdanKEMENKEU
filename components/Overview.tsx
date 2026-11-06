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

/** Warna kartu bertingkat (gelap → merah terang), seperti skala nilai di form INDI. */
const TILE_COLORS = [
  "bg-brand-charcoal",
  "bg-brand-maroon",
  "bg-brand-dark",
  "bg-[#b3121f]",
  "bg-brand-bright",
];

export default function Overview({ eyebrow, heading, paragraphs, stats }: Props) {
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-brand-red">{eyebrow}</p>
            <h2 id="tentang-title" className="heading-display mt-4 text-3xl text-brand-charcoal sm:text-4xl">
              {heading}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="space-y-4 text-base leading-relaxed text-zinc-600 sm:text-[17px] lg:col-span-7 lg:pt-9">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
        </div>

        {stats.length > 0 ? (
          <ul className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, i) => {
              const Icon = ICONS[stat.icon] ?? CalendarIcon;
              const long = stat.value.length > 6;
              return (
                <Reveal
                  as="li"
                  key={stat.label}
                  delay={i * 0.06}
                  className={`relative flex min-h-48 flex-col overflow-hidden rounded-lg p-6 text-white ${
                    TILE_COLORS[i % TILE_COLORS.length]
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="flex flex-wrap items-baseline gap-x-2">
                      <span className={`heading-display ${long ? "text-[1.75rem]" : "text-5xl"}`}>{stat.value}</span>
                      {stat.suffix ? <span className="text-lg font-bold">{stat.suffix}</span> : null}
                    </p>
                    <Icon className="h-5 w-5 shrink-0 text-white/60" />
                  </div>
                  <h3 className="mt-auto pt-6 text-[15px] font-bold">{stat.label}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-white/80">{stat.description}</p>
                </Reveal>
              );
            })}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
