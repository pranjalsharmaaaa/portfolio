import Image from "next/image";
import { scBriefMore, scCover, scEnvironment, scFinding } from "@/lib/sales-coach-content";
import { Card, Container, SCREEN_Y, SectionTitle, Takeaway } from "@/components/sales-coach/primitives";

/* ── PDF p1 · Cover ─────────────────────────────────────────────────── */
/**
 * From 1024px the cover is two columns that start at the same line: the
 * title, headline, body and role on the left, the phone + AI orb on the
 * right. The headline, body and phone are sized by the viewport's height
 * as well as its width (`svh`), so the whole cover fits one desktop
 * screen — 1440×900 and 1280×800 alike — without clipping anything:
 * nothing is forced to `100vh`, it's simply sized to fit. The phone is
 * capped by its column's width too (`max-w-full`), so it can never run
 * into the right margin. Role and audience sit side by side, each on
 * one line, and drop to their own rows only when the column is too
 * narrow for both. Below 1024px it stacks, as tall as it needs.
 */
export function CoverScreen() {
  const c = scCover;
  return (
    <section className="pt-20 pb-10 @min-[640px]:pt-[72px] @min-[640px]:pb-14 @min-[1024px]:pb-[60px]" aria-labelledby="sc-title">
      <Container>
        <div className="grid gap-10 @min-[1024px]:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] @min-[1024px]:items-start @min-[1024px]:gap-12">
          <div>
            <h1
              id="sc-title"
              className="inline-block rounded-[20px] bg-[linear-gradient(90deg,#7a0202,#4b0000_55%,#1f0000)] px-6 py-2.5 text-[36px] leading-tight font-medium tracking-[-0.01em] text-white shadow-[0_18px_40px_-14px_rgba(80,0,0,0.55)] @min-[640px]:px-7 @min-[640px]:py-3 @min-[640px]:text-[48px]"
            >
              {c.badge}
            </h1>
            <p className="mt-8 max-w-[640px] text-[22px] leading-[1.3] font-medium tracking-[-0.01em] text-[var(--sc-ink)] @min-[640px]:text-[28px] @min-[1024px]:mt-[max(1.5rem,4svh)] @min-[1024px]:text-[clamp(24px,min(2.1vw,3.6svh),30px)]">
              {c.headline}
            </p>
            <p className="mt-6 max-w-[560px] text-[16px] leading-relaxed text-[var(--sc-ink)] @min-[640px]:text-[18px] @min-[1024px]:mt-[max(1rem,2.5svh)] @min-[1024px]:text-[clamp(16px,min(1.4vw,2.3svh),20px)]">
              {c.body}
            </p>
            <dl className="mt-8 grid gap-6 @min-[640px]:grid-cols-2 @min-[1024px]:mt-[max(1.5rem,4svh)] @min-[1024px]:flex @min-[1024px]:flex-wrap @min-[1024px]:gap-x-12 @min-[1024px]:gap-y-4">
              {c.meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-[13px] font-medium tracking-[0.08em] text-[var(--sc-muted)] uppercase @min-[640px]:text-[14px]">{m.label}</dt>
                  {m.lines.map((l) => (
                    <dd key={l} className="mt-1.5 text-[16px] leading-snug text-[var(--sc-ink)] @min-[640px]:text-[18px] @min-[1024px]:whitespace-nowrap">
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
              className="absolute top-[-6%] right-0 w-[44%] max-w-[300px] @min-[1024px]:top-[2%] @min-[1024px]:w-[44%]"
            />
            <Image
              src={c.phone.src}
              alt={c.phone.alt}
              width={c.phone.width}
              height={c.phone.height}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="relative w-[70%] max-w-[420px] @min-[1024px]:h-auto @min-[1024px]:max-h-[min(500px,calc(100svh-150px))] @min-[1024px]:w-auto @min-[1024px]:max-w-full"
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
        <div className="mt-8 grid items-center gap-8 @min-[1024px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] @min-[1024px]:gap-12">
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 40vw, 100vw" className="mx-auto h-auto w-full max-w-[520px]" />
          <ol className="flex flex-col gap-4">
            {c.points.map((p) => (
              <li key={p.n}>
                <Card className="px-5 py-4 @min-[640px]:px-6 @min-[640px]:py-5">
                  <h3 className="text-[18px] leading-tight font-medium text-[var(--sc-ink)] @min-[640px]:text-[22px]">
                    <span className="mr-1.5 text-[0.75em] font-semibold tabular-nums">{p.n}</span>
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{p.body}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-8">
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
        <p className="mt-4 max-w-[960px] text-[16px] leading-relaxed text-[var(--sc-ink)] @min-[640px]:text-[18px]">{c.body}</p>
        <p className="mt-4 text-[16px] leading-relaxed text-[var(--sc-ink)] @min-[640px]:text-[18px]">
          <span className="text-[var(--sc-red)]">{c.intent.label}</span> - {c.intent.text}
        </p>

        <figure className="mt-8">
          <figcaption className="text-center text-[16px] text-[var(--sc-ink)] italic @min-[640px]:text-[20px]">{c.caption}</figcaption>
          <ul className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2" aria-label="What the existing brief felt like">
            {c.callouts.map((t) => (
              <li key={t} className="inline-flex items-center gap-2 rounded-full bg-[var(--sc-pink)] px-3 py-1 text-[13px] font-medium text-[var(--sc-ink)] @min-[640px]:text-[14px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--sc-red)]" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <ol className="mx-auto mt-6 grid max-w-[920px] grid-cols-4 gap-2.5 @min-[640px]:gap-4 @min-[1024px]:grid-cols-7">
            {c.screens.map((s) => (
              <li key={s.src} className="overflow-hidden rounded-[10px] bg-white ring-1 ring-black/10 shadow-[0_10px_24px_-14px_rgba(0,0,0,0.35)] @min-[640px]:rounded-[14px]">
                <Image src={s.src} alt={s.alt} width={600} height={1298} sizes="(min-width: 1024px) 13vw, 25vw" className="block h-auto w-full" />
              </li>
            ))}
          </ol>
        </figure>

        <p className="mt-8 text-center text-[22px] leading-tight font-medium tracking-[-0.01em] text-[var(--sc-ink)] @min-[640px]:text-[28px]">
          {c.closing.plain}
          <span className="font-semibold text-[var(--sc-red)] italic">{c.closing.accent}</span>
        </p>
      </Container>
    </section>
  );
}

/* ── PDF p4 · What if the brief did more? ───────────────────────────── */
/* At Stack Up's scale (24px step titles) the four steps + arrows fit in
   one row from 1024px; below that they pair up. */
export function BriefMoreScreen() {
  const c = scBriefMore;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ol className="mx-auto mt-8 grid max-w-[1180px] grid-cols-1 gap-8 @min-[640px]:grid-cols-2 @min-[640px]:gap-x-6 @min-[1024px]:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] @min-[1024px]:gap-x-3">
          {c.steps.map((s, i) => (
            <li key={s.n} className="contents">
              {i > 0 && (
                <span aria-hidden className="hidden self-start pt-[17%] text-[var(--sc-red)] @min-[1024px]:block">
                  <svg viewBox="0 0 48 16" className="w-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 8h42M37 2l7 6-7 6" />
                  </svg>
                </span>
              )}
              <div className="text-center">
                <Image src={s.src} alt={s.alt} width={900} height={750} sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw" className="mx-auto w-full max-w-[320px] rounded-[20px] shadow-[0_6px_24px_-14px_rgba(0,0,0,0.25)]" />
                <h3 className="mt-4 text-[22px] leading-none font-semibold tracking-[-0.01em] text-[var(--sc-ink)] @min-[640px]:text-[24px]">
                  <span className="mr-2 align-[0.12em] text-[0.62em] font-normal text-[var(--sc-muted)] tabular-nums">{s.n}</span>
                  {s.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[260px] text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
