import Image from "next/image";
import { scConfidence, scPartner, scScrutiny, scSharpened, scTalking, type BeforeAfter } from "@/lib/sales-coach-content";
import { Card, Container, Eyebrow, IconDisc, NumberDisc, SCREEN_Y, SectionTitle, StateTag, Takeaway } from "@/components/sales-coach/primitives";

/* ── PDF p9 · I put the idea under scrutiny ─────────────────────────── */
export function ScrutinyScreen() {
  const c = scScrutiny;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ol className="mt-8 grid gap-4 @min-[1024px]:grid-cols-[1fr_auto_1fr_auto_1fr] @min-[1024px]:items-stretch @min-[1024px]:gap-4">
          {c.flow.map((f, i) => (
            <li key={f.title} className="contents">
              {i > 0 && (
                <span aria-hidden className="flex items-center justify-center text-[#a8a8a8]">
                  <svg viewBox="0 0 48 16" className="w-8 rotate-90 @min-[1024px]:w-9 @min-[1024px]:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M2 8h42M38 3l6 5-6 5" />
                  </svg>
                </span>
              )}
              <Card className="flex h-full items-center gap-4 px-5 py-5 !bg-white @min-[640px]:px-6 @min-[640px]:py-5">
                <IconDisc name={f.icon as "sparkle"} className="h-11 w-11 @min-[640px]:h-12 @min-[640px]:w-12" />
                <div>
                  <h3 className="text-[16px] leading-snug font-medium text-[var(--sc-ink)] @min-[640px]:text-[18px]">{f.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{f.body}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>

        <Eyebrow className="mt-10 !text-[14px] !tracking-[0.06em] !text-[#4a4a4a] @min-[640px]:!text-[15px]">{c.testingLabel}</Eyebrow>
        <ol className="mt-4 grid gap-5 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-0">
          {c.testing.map((t, i) => (
            <li
              key={t.n}
              className={`flex items-center gap-4 @min-[1024px]:py-5 ${i > 0 ? "@min-[1024px]:border-l-2 @min-[1024px]:border-[var(--sc-red)] @min-[1024px]:pl-[8%]" : ""}`}
            >
              <NumberDisc n={t.n} />
              <div>
                <h3 className="text-[18px] font-medium text-[var(--sc-ink)] @min-[640px]:text-[20px]">{t.title}</h3>
                <p className="mt-0.5 text-[15px] text-[var(--sc-ink)] @min-[640px]:text-[16px]">{t.body}</p>
              </div>
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

/* ── PDF p10 · Talking to the salesperson ───────────────────────────── */
export function TalkingScreen() {
  const c = scTalking;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <div className="mt-8 grid items-center gap-6 @min-[1024px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] @min-[1024px]:gap-10">
          <div className="grid grid-cols-[auto_1fr] gap-3 max-[479px]:grid-cols-1 @min-[640px]:gap-4">
            <Card className="flex items-center gap-4 !bg-white px-5 py-4 @min-[640px]:px-6 @min-[640px]:py-5">
              <IconDisc name="people" className="h-11 w-11 @min-[640px]:h-12 @min-[640px]:w-12" />
              <p className="text-center leading-none">
                <span className="block text-[32px] font-semibold text-[var(--sc-red)] @min-[640px]:text-[36px]">{c.stats.count}</span>
                <span className="mt-1 block text-[14px] text-[var(--sc-muted)] @min-[640px]:text-[15px]">{c.stats.countLabel}</span>
              </p>
            </Card>
            <Card className="flex items-center gap-4 !bg-white px-5 py-4 @min-[640px]:px-6 @min-[640px]:py-5">
              <IconDisc name="pin" className="h-11 w-11 @min-[640px]:h-12 @min-[640px]:w-12" />
              <p>
                <span className="block text-[17px] leading-tight font-medium text-[var(--sc-ink)] @min-[640px]:text-[20px]">{c.stats.cities}</span>
                <span className="mt-1.5 block text-[14px] leading-snug text-[var(--sc-muted)] @min-[640px]:text-[15px]">{c.stats.citiesLabel}</span>
              </p>
            </Card>
          </div>
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(min-width: 1024px) 40vw, 100vw" className="mx-auto h-auto w-full max-w-[520px]" />
        </div>

        <Eyebrow className="mt-10 !text-[14px] !tracking-[0.06em] !text-[#4a4a4a] @min-[640px]:!text-[15px]">{c.insightsLabel}</Eyebrow>
        <ul className="mt-4 grid gap-4 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-6">
          {c.insights.map((ins) => (
            <li key={ins.plain}>
              <Card className="flex h-full items-center gap-4 !bg-white px-5 py-5 @min-[640px]:gap-5">
                <Image src={ins.src} alt="" width={ins.w} height={ins.h} sizes="(min-width: 1024px) 10vw, 30vw" className="h-auto w-[34%] max-w-[140px] shrink-0" />
                <div>
                  <h3 className="text-[16px] leading-snug font-medium text-[var(--sc-ink)] @min-[640px]:text-[18px]">
                    {ins.plain}
                    <span className="block font-semibold text-[var(--sc-red)]">{ins.accent}</span>
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[15px]">{ins.body}</p>
                </div>
              </Card>
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

/* ── PDF p11 · The conversations sharpened the brief ────────────────── */
export function SharpenedScreen() {
  const c = scSharpened;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ul className="mt-8 grid gap-5 @min-[1024px]:grid-cols-3 @min-[1024px]:gap-8">
          {c.needs.map((n) => (
            <li key={n.title}>
              <Card highlight={n.highlight} className={`flex h-full flex-col items-center px-5 pt-6 pb-5 text-center ${n.highlight ? "!border-[1.5px] !border-[var(--sc-red)]" : "!bg-white"}`}>
                <h3 className="text-[20px] font-medium tracking-[0.02em] text-[#2b2b2b] uppercase @min-[640px]:text-[22px]">{n.title}</h3>
                <p className="mt-3 text-[16px] leading-snug text-[var(--sc-ink)] @min-[640px]:text-[17px]">{n.quote}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{n.body}</p>
                <div className="mt-4 flex w-full flex-1 items-center justify-center">
                  <Image src={n.src} alt="" width={n.w} height={n.h} sizes="(min-width: 1024px) 22vw, 80vw" className="h-auto w-[86%] max-w-[300px]" />
                </div>
                <span
                  className={`mt-5 w-full rounded-[12px] py-2.5 text-[14px] @min-[640px]:text-[15px] ${
                    n.highlight ? "bg-[var(--sc-chip)] text-[var(--sc-red)]" : "bg-[#e8e8e8] text-[#2b2b2b]"
                  }`}
                >
                  {n.tag}
                </span>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ── PDF p12 / p13 · Before → After ─────────────────────────────────── */
function BeforeAfterScreen({ c }: { c: BeforeAfter }) {
  const sides = [
    { key: "before", tag: "Before", tone: "grey" as const, data: c.before },
    { key: "after", tag: "After", tone: "pink" as const, data: c.after },
  ];
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <div className="mt-8 grid gap-5 @min-[1024px]:grid-cols-2 @min-[1024px]:gap-8">
          {sides.map(({ key, tag, tone, data }) => (
            <Card key={key} highlight={tone === "pink"} className={`flex flex-col px-5 pt-5 pb-5 @min-[640px]:px-6 ${tone === "pink" ? "!border-[1.5px] !border-[var(--sc-red)]" : ""}`}>
              <div>
                <StateTag tone={tone}>{tag}</StateTag>
              </div>
              <h3 className={`mt-4 text-[20px] font-medium @min-[640px]:text-[22px] ${tone === "pink" ? "tracking-[0.02em] text-[#2b2b2b] uppercase" : "text-[#2b2b2b]"}`}>{data.title}</h3>
              <p className="mt-1.5 max-w-[560px] text-[15px] leading-relaxed text-[var(--sc-ink)] @min-[640px]:text-[16px]">{data.body}</p>
              <div className="my-4 flex flex-1 items-center justify-center">
                <Image src={data.src} alt={data.alt} width={data.w} height={data.h} sizes="(min-width: 1024px) 34vw, 90vw" className="h-[180px] w-auto max-w-full object-contain @min-[640px]:h-[200px]" />
              </div>
              <ol className="grid grid-cols-1 gap-4 @min-[640px]:grid-cols-3 @min-[640px]:gap-3">
                {data.steps.map((s, i) => (
                  // 1024–1279px: two cards side by side leave each step too
                  // narrow for its disc and words in one row, so the disc
                  // sits above its text there.
                  <li key={s.title} className="flex items-start gap-3 @min-[1024px]:flex-col @min-[1024px]:gap-2 @min-[1280px]:flex-row @min-[1280px]:gap-3">
                    <NumberDisc n={String(i + 1).padStart(2, "0")} size="sm" tone={tone === "pink" ? "pink" : "grey"} />
                    <p className="text-[14px] leading-[1.4] @min-[640px]:text-[15px]">
                      <span className="block font-medium text-[var(--sc-ink)]">{s.title}</span>
                      <span className="text-[var(--sc-muted)]">{s.body}</span>
                    </p>
                  </li>
                ))}
              </ol>
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

export const PartnerScreen = () => <BeforeAfterScreen c={scPartner} />;
export const ConfidenceScreen = () => <BeforeAfterScreen c={scConfidence} />;
