import Image from "next/image";
import { scAsk, scPractise, scUnderstand } from "@/lib/sales-coach-content";
import { Card, Container, SCREEN_Y, SectionTitle } from "@/components/sales-coach/primitives";
import { DemoVideo } from "@/components/sales-coach/demo-video";

/** The PDF's own phone renders are 800×1650 (bezel included). */
const PHONE = { w: 800, h: 1650 };

/* ── PDF p14 · Understand the Account ───────────────────────────────── */
export function UnderstandScreen() {
  const c = scUnderstand;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ul className="mx-auto mt-8 grid max-w-[1000px] grid-cols-1 justify-items-center gap-8 @min-[640px]:grid-cols-3 @min-[640px]:gap-6 @min-[1024px]:gap-10">
          {c.phones.map((p) => (
            <li key={p.src} className="w-full max-w-[240px]">
              <Image
                src={p.src}
                alt={p.alt}
                width={PHONE.w}
                height={PHONE.h}
                sizes="(min-width: 640px) 240px, 70vw"
                className="h-auto w-full drop-shadow-[0_24px_32px_rgba(60,10,20,0.18)]"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ── PDF p15 · Ask in Context ───────────────────────────────────────── */
/**
 * The PDF page is the title and nothing else: the product screen *is*
 * the demo. So the "Ask in context" recording plays as the screen of a
 * phone built to the same proportions as the PDF's phone renders (see
 * PhoneShell), sized like the product phones elsewhere in the study so
 * it reads as the product, not a video card — and balanced against
 * principle 02 from p7, the idea this screen delivers.
 */
export function AskScreen() {
  const c = scAsk;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <div className="grid items-center gap-8 @min-[1024px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] @min-[1024px]:gap-12">
          <div>
            <SectionTitle heading={c.heading} sub={c.sub} />
            <Card className="mt-8 max-w-[480px] px-6 py-6 @min-[640px]:px-7">
              <p className="text-[13px] font-medium tracking-[0.06em] text-[var(--sc-muted)] uppercase @min-[640px]:text-[14px]">{c.principle.label}</p>
              <p className="mt-3 text-[22px] leading-[1.25] font-medium text-[#4a4a4a] @min-[640px]:text-[24px]">{c.principle.title}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--sc-muted)] @min-[640px]:text-[16px]">{c.principle.body}</p>
            </Card>
          </div>
          <div className="mx-auto w-full max-w-[220px] @min-[640px]:max-w-[240px] @min-[1024px]:mr-[8%]">
            <DemoVideo {...c.video} />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── PDF p16 · Practise the Conversation ────────────────────────────── */
/**
 * One row of three phones, all the same size, shadow and frame: the
 * PDF's two product screens on the left (Practice Mode → Prepare for
 * the conversation) and, on the right, the next step in that same flow
 * running live — Rajesh speaking, then "Your turn" — in a CSS bezel
 * matched to the renders. It reads as one product showcase: these are
 * the screens, and this is what happens when you tap Start.
 */
export function PractiseScreen() {
  const c = scPractise;
  return (
    <section className={SCREEN_Y}>
      <Container>
        <SectionTitle heading={c.heading} sub={c.sub} />
        <ul className="mx-auto mt-8 grid max-w-[1000px] grid-cols-2 items-start gap-x-4 gap-y-8 @min-[640px]:grid-cols-3 @min-[640px]:gap-x-6 @min-[1024px]:gap-x-10">
          {c.phones.map((p) => (
            <li key={p.src} className="flex justify-center">
              <Image
                src={p.src}
                alt={p.alt}
                width={PHONE.w}
                height={PHONE.h}
                sizes="(min-width: 640px) 240px, 45vw"
                className="h-auto w-full max-w-[240px] drop-shadow-[0_24px_32px_rgba(60,10,20,0.18)]"
              />
            </li>
          ))}
          <li className="col-span-2 flex justify-center @min-[640px]:col-span-1">
            <div className="w-[62%] max-w-[240px] @min-[640px]:w-full">
              <DemoVideo {...c.video} />
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
