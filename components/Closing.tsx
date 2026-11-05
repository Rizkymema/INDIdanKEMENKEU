import { Fragment } from "react";
import CurvePattern from "./CurvePattern";
import { SteeringWheelIcon } from "./Icons";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  /** Teks hashtag; tanda "|" menjadi titik pindah baris (tidak ditampilkan). */
  hashtag: string;
  message: string;
};

/** Banner penutup merah besar dengan hashtag kampanye. */
export default function Closing({ eyebrow, hashtag, message }: Props) {
  return (
    <section
      id="penutup"
      aria-labelledby="penutup-title"
      className="clip-diagonal-top relative -mt-12 overflow-hidden bg-brand-red pt-36 pb-28 text-white [--diagonal:3rem] sm:-mt-16 sm:pt-44 sm:pb-36 sm:[--diagonal:4rem]"
    >
      <CurvePattern className="text-brand-dark opacity-50" />
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full bg-brand-gold [clip-path:polygon(0_var(--diagonal),100%_0,100%_5px,0_calc(var(--diagonal)_+_5px))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-24 bg-brand-dark/70 [clip-path:polygon(0_70%,100%_0,100%_100%,0_100%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-brand-charcoal shadow-xl">
            <SteeringWheelIcon className="h-8 w-8" />
          </span>
          <p className="mt-6 font-heading text-xs font-bold uppercase tracking-[0.3em] text-brand-gold sm:text-sm">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="penutup-title"
            aria-label={hashtag.replaceAll("|", "")}
            className="heading-display mt-5 text-[clamp(2rem,9vw,7rem)] [overflow-wrap:anywhere] drop-shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
          >
            {hashtag.split("|").map((part, i) => (
              <Fragment key={i}>
                {i > 0 ? <wbr /> : null}
                {part}
              </Fragment>
            ))}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-6 block h-1 w-24 rounded-full bg-brand-gold" />
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/95 sm:text-lg">{message}</p>
        </Reveal>
      </div>
    </section>
  );
}
