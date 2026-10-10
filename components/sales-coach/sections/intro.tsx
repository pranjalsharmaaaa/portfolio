import Image from "next/image";
import { scBriefMore, scCover, scEnvironment, scFinding } from "@/lib/sales-coach-content";
import { Card, Container, SCREEN_Y, SectionTitle, Takeaway } from "@/components/sales-coach/primitives";

/* ── PDF p1 · Cover ─────────────────────────────────────────────────── */
export function CoverScreen() {
  const c = scCover;
  return (
    <section className={SCREEN_Y} aria-labelledby="sc-title">
      <Container>
        <h1
          id="sc-title"
          className="inline-block rounded-[22px] bg-[linear-gradient(90deg,#7a0202,#4b0000_55%,#1f0000)] px-7 py-3 text-[40px] leading-tight font-medium tracking-[-0.01em] text-white shadow-[0_18px_40px_-14px_rgba(80,0,0,0.55)] @min-[640px]:px-8 @min-[640px]:py-4 @min-[640px]:text-[56px]"
        >
          {c.badge}
        </h1>
        <p className="mt-10 max-w-[1500px] text-[26px] leading-[1.35] font-medium tracking-[-0.015em] text-[var(--sc-ink)] @min-[640px]:text-[36px] @min-[1024px]:mt-14 @min-[1024px]:text-[40px]">
          {c.headline}
        </p>

        <div className="mt-8 grid gap-10 @min-[1024px]:mt-6 @min-[1024px]:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] @min-[1024px]:gap-6">
          <div className="@min-[1024px]:pt-4">
            <p className="max-w-[640px] text-[18px] leading-[1.55] text-[var(--sc-ink)] @min-[640px]:text-[24px]">{c.body}</p>
            <dl className="mt-10 grid gap-8 @min-[640px]:grid-cols-2 @min-[1024px]:mt-16 @min-[1024px]:grid-cols-1 @min-[1024px]:gap-12">
              {c.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[14px] font-medium tracking-[0.06em] text-[var(--sc-muted)] uppercase @min-[640px]:text-[18px]">{m.label}</dt>
                  {m.lines.map((l) => (
                    <dd key={l} className="mt-2 text-[19px] leading-snug text-[var(--sc-ink)] @min-[640px]:text-[24px]">
                      {l}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-[640px] @min-[1024px]:mx-0 @min-[1024px]:max-w-none">
            <Image
              src={c.orb.src}
              alt={c.orb.alt}
              width={c.orb.width}
              height={c.orb.height}
              priority
              className="absolute top-[-6%] right-0 w-[48%] max-w-[360px] @min-[1024px]:top-[-12%] @min-[1024px]:right-0"
            />
            <Image
              src={c.phone.src}
              alt={c.phone.alt}
              width={c.phone.width}
              height={c.phone.height}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="relative w-[78%] max-w-[560px] @min-[1024px]:ml-[2%] @min-[1024px]:h-[600px] @min-[1024px]:w-auto @min-[1024px]:max-w-none"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p2 · Understanding the sales environment ──────────────────── */
export function EnvironmentScreen() {
  const c = scEnvironment;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <div className="mt-6 grid items-center gap-8 @min-[1024px]:mt-6 @min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @min-[1024px]:gap-16">
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 50vw, 100vw" className="mx-auto h-auto w-full max-w-[680px]" />
          <ol className="flex flex-col gap-5 @min-[1024px]:mr-[2%]">
            {c.points.map((p) => (
              <li key={p.n}>
                <Card className="px-6 py-5 @min-[640px]:px-7 @min-[640px]:py-6">
                  <h3 className="text-[22px] leading-tight font-medium text-[var(--sc-ink)] @min-[640px]:text-[30px]">
                    <span className="mr-1.5 text-[0.75em] font-semibold tabular-nums">{p.n}</span>
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.55] text-[var(--sc-muted)] @min-[640px]:text-[20px]">{p.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8 @min-[1024px]:mt-8">
          <Takeaway {...c.insight} />
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p3 · Finding what matters ──────────────────────────────────── */
export function FindingScreen() {
  const c = scFinding;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <p className="mt-4 max-w-[1200px] text-[17px] leading-[1.6] text-[var(--sc-ink)] @min-[640px]:text-[21px]">{c.body}</p>
        <p className="mt-5 text-[17px] leading-[1.5] text-[var(--sc-ink)] @min-[640px]:text-[22px]">
          <span className="text-[var(--sc-red)]">{c.intent.label}</span> - {c.intent.text}
        </p>

        <figure className="mt-6 @min-[1024px]:mt-7">
          <figcaption className="text-center text-[18px] text-[var(--sc-ink)] italic @min-[640px]:text-[24px]">{c.caption}</figcaption>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2" aria-label="What the existing brief felt like">
            {c.callouts.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full bg-[var(--sc-pink)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--sc-ink)] @min-[640px]:text-[16px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sc-red)]" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <ol className="mx-auto mt-6 grid max-w-[1080px] grid-cols-4 gap-2.5 @min-[640px]:gap-4 @min-[1024px]:grid-cols-7">
            {c.screens.map((s) => (
              <li key={s.src} className="overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)] @min-[640px]:rounded-[14px]">
                <Image src={s.src} alt={s.alt} width={600} height={1298} sizes="(min-width: 1024px) 13vw, 25vw" className="block h-auto w-full" />
              </li>
            ))}
          </ol>
        </figure>

        <p className="mt-8 text-center text-[26px] leading-tight font-medium tracking-[-0.015em] text-[var(--sc-ink)] @min-[640px]:text-[36px] @min-[1024px]:mt-8 @min-[1024px]:text-[40px]">
          {c.closing.plain}
          <span className="font-semibold text-[var(--sc-red)] italic">{c.closing.accent}</span>
        </p>
      </Container>
    </section>
  );
}

/* ── PDF p4 · What if the brief did more? ───────────────────────────── */
export function BriefMoreScreen() {
  const c = scBriefMore;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ol className="mt-10 grid grid-cols-1 gap-10 @min-[640px]:grid-cols-2 @min-[640px]:gap-x-6 @min-[1024px]:mt-14 @min-[1024px]:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] @min-[1024px]:gap-x-4">
          {c.steps.map((s, i) => (
            <li key={s.n} className="contents">
              {i > 0 && (
                <span aria-hidden className="hidden self-start pt-[17%] text-[var(--sc-red)] @min-[1024px]:block">
                  <svg viewBox="0 0 48 16" className="w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 8h42M37 2l7 6-7 6" />
                  </svg>
                </span>
              )}
              <div className="text-center">
                <Image src={s.src} alt={s.alt} width={900} height={750} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="w-full rounded-[24px] shadow-[0_6px_24px_-14px_rgba(0,0,0,0.25)]" />
                <h3 className="mt-6 text-[30px] leading-none font-semibold tracking-[-0.01em] text-[var(--sc-ink)] @min-[640px]:text-[40px]">
                  <span className="mr-2 align-[0.12em] text-[0.62em] font-normal text-[var(--sc-muted)] tabular-nums">{s.n}</span>
                  {s.title}
                </h3>
                <p className="mx-auto mt-4 max-w-[300px] text-[17px] leading-[1.55] text-[var(--sc-muted)] @min-[640px]:text-[20px]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
