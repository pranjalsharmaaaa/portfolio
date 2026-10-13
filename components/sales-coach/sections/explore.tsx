import Image from "next/image";
import { Fragment } from "react";
import { scAiPossible, scPatterns, scPrinciples, scPrototype } from "@/lib/sales-coach-content";
import { Card, Container, Eyebrow, IconDisc, NumberDisc, SCREEN_Y, SectionTitle, Takeaway } from "@/components/sales-coach/primitives";

/* ── PDF p5 · Could AI make this possible? ──────────────────────────── */
export function AiPossibleScreen() {
  const c = scAiPossible;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <div className="mt-8 grid gap-6 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-8">
          {c.patterns.map((p) => (
            <Card key={p.title} highlight={p.highlight} className={`flex flex-col items-center px-6 pt-6 pb-6 text-center ${p.highlight ? "!border-transparent" : ""}`}>
              <h3 className="text-[22px] leading-tight font-medium tracking-[-0.01em] text-[var(--sc-ink)] @min-[640px]:text-[24px]">{p.title}</h3>
              <p className="mt-2 max-w-[380px] text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{p.body}</p>
              <ul className="mt-4 flex h-10 flex-nowrap items-center justify-center gap-x-4" aria-label="Examples">
                {p.logos.map((l) => (
                  <li key={l.alt}>
                    <Image src={l.src} alt={l.alt} width={l.w} height={l.h} className={`w-auto ${l.size}`} />
                  </li>
                ))}
              </ul>
              <Image src={p.image.src} alt="" width={p.image.w} height={p.image.h} sizes="(min-width: 1024px) 28vw, 90vw" className="mt-3 h-[140px] w-auto max-w-full object-contain" />
              <p className="mt-auto flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2 whitespace-nowrap pt-4 text-[14px] @min-[640px]:text-[15px]">
                <span className="mr-1 text-[var(--sc-muted)]">Good for</span>
                {p.goodFor.map((g, i) => (
                  <Fragment key={g}>
                    {i > 0 && <span aria-hidden className="text-[var(--sc-ink)]">→</span>}
                    <span className="rounded-full bg-[var(--sc-pink)] px-2.5 py-1 text-[var(--sc-red)]">{g}</span>
                  </Fragment>
                ))}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Takeaway {...c.insight} />
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p6 · Learning the patterns behind AI ───────────────────────── */
export function PatternsScreen() {
  const c = scPatterns;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <div className="mt-8 grid gap-4 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-6 @min-[1024px]:gap-5">
          {c.cards.map((card, i) => (
            <Card
              key={card.key}
              className={`flex flex-col items-center px-6 pt-5 pb-5 text-center ${
                i < 3 ? "@min-[1024px]:col-span-2" : i === 3 ? "@min-[640px]:order-last @min-[640px]:col-span-2 @min-[1024px]:order-none @min-[1024px]:col-span-4" : "@min-[1024px]:col-span-2"
              }`}
            >
              <h3 className="text-[20px] leading-tight font-medium text-[var(--sc-ink)] @min-[640px]:text-[22px]">{card.title}</h3>
              <p className="mt-1 max-w-[360px] text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{card.body}</p>
              <div className="mt-4 flex w-full flex-1 items-center justify-center">
                <Image
                  src={card.src}
                  alt={card.alt}
                  width={card.w}
                  height={card.h}
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className={`w-auto max-w-full object-contain ${card.key === "system-state" ? "h-[110px]" : "h-[135px]"}`}
                />
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-8">
          <Takeaway {...c.takeaway} />
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p7 · Defining the experience ───────────────────────────────── */
export function PrinciplesScreen() {
  const c = scPrinciples;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ol className="mt-8 grid gap-5 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-8">
          {c.principles.map((p) => (
            <li key={p.n}>
              <Card className="h-full px-6 py-6 @min-[640px]:px-7 @min-[640px]:py-7">
                <p className="text-[13px] font-medium tracking-[0.06em] text-[var(--sc-muted)] uppercase @min-[640px]:text-[14px]">
                  {p.n} {p.label}
                </p>
                <h3 className="mt-3 text-[22px] leading-[1.25] font-medium text-[#4a4a4a] @min-[640px]:text-[24px]">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{p.body}</p>
              </Card>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Takeaway {...c.takeaway} />
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p8 · From ideas to a working prototype ─────────────────────── */
export function PrototypeScreen() {
  const c = scPrototype;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ol className="mx-auto mt-8 grid max-w-[1080px] grid-cols-2 gap-x-4 gap-y-8 @min-[1024px]:grid-cols-4 @min-[1024px]:gap-x-8">
          {c.screens.map((s) => (
            <li key={s.n} className="flex flex-col items-center text-center">
              <Image
                src={s.src}
                alt={s.alt}
                width={375}
                height={812}
                sizes="(min-width: 1024px) 15vw, 40vw"
                className="h-auto w-full max-w-[150px] drop-shadow-[0_14px_22px_rgba(0,0,0,0.18)] @min-[1024px]:max-w-[128px]"
              />
              <h3 className="mt-4 flex items-center gap-2.5 text-[16px] font-medium text-[var(--sc-ink)] @min-[640px]:text-[18px]">
                <NumberDisc n={s.n} size="sm" />
                {s.title}
              </h3>
              <p className="mt-1.5 max-w-[220px] text-[14px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[15px]">{s.body}</p>
            </li>
          ))}
        </ol>

        <Eyebrow className="mt-10 !text-[14px] !tracking-[0.06em] !text-[#4a4a4a] @min-[640px]:!text-[15px]">{c.learnedLabel}</Eyebrow>
        <ul className="mt-4 grid gap-5 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-8">
          {c.learned.map((l) => (
            <li key={l.title} className="flex items-start gap-4">
              <IconDisc name={l.icon as "rocket"} className="h-11 w-11 @min-[640px]:h-12 @min-[640px]:w-12" />
              <div>
                <h3 className="text-[16px] font-medium text-[var(--sc-ink)] @min-[640px]:text-[18px]">{l.title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{l.body}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Takeaway {...c.takeaway} />
        </div>
      </Container>
    </section>
  );
}
