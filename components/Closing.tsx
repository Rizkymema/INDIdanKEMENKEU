import { Fragment } from "react";
import CurvePattern from "./CurvePattern";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  /** Teks hashtag; tanda "|" menjadi titik pindah baris (tidak ditampilkan). */
  hashtag: string;
  message: string;
};

/** Banner penutup merah dengan hashtag kampanye. */
export default function Closing({ eyebrow, hashtag, message }: Props) {
  return (
    <section
      id="penutup"
      aria-labelledby="penutup-title"
      data-surface="dark"
      className="bg-brand-gradient relative isolate overflow-hidden py-24 text-white sm:py-32"
    >
      <CurvePattern className="-z-10 text-white opacity-25" lines={40} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="eyebrow text-white/85">{eyebrow}</p>
          <h2
            id="penutup-title"
            aria-label={hashtag.replaceAll("|", "")}
            className="heading-display mt-5 max-w-5xl text-[clamp(2.4rem,9vw,6.5rem)] [overflow-wrap:anywhere]"
          >
            {hashtag.split("|").map((part, i) => (
              <Fragment key={i}>
                {i > 0 ? <wbr /> : null}
                {part}
              </Fragment>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">{message}</p>
        </Reveal>
      </div>
    </section>
  );
}
