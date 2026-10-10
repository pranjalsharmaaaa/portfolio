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
        <ul className="mt-10 grid grid-cols-1 justify-items-center gap-10 @min-[640px]:grid-cols-3 @min-[640px]:gap-6 @min-[1024px]:mt-12 @min-[1024px]:justify-between @min-[1024px]:gap-10">
          {c.phones.map((p) => (
            <li key={p.src} className="w-full max-w-[300px] @min-[640px]:max-w-[330px]">
              <Image
                src={p.src}
                alt={p.alt}
                width={PHONE.w}
                height={PHONE.h}
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 30vw, 80vw"
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
        <div className="grid items-center gap-12 @min-[1024px]:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] @min-[1024px]:gap-16">
          <div>
            <SectionTitle heading={c.heading} sub={c.sub} />
            <Card className="mt-8 max-w-[560px] px-6 py-7 @min-[640px]:px-7 @min-[1024px]:mt-12">
              <p className="text-[16px] font-medium tracking-[0.03em] text-[var(--sc-muted)] uppercase @min-[640px]:text-[19px]">{c.principle.label}</p>
              <p className="mt-4 text-[24px] leading-[1.25] font-medium text-[#4a4a4a] @min-[640px]:text-[32px]">{c.principle.title}</p>
              <p className="mt-4 text-[16px] leading-[1.55] text-[var(--sc-muted)] @min-[640px]:text-[20px]">{c.principle.body}</p>
            </Card>
          </div>
          <div className="mx-auto w-full max-w-[270px] @min-[640px]:max-w-[290px] @min-[1024px]:mr-0 @min-[1024px]:max-w-[300px]">
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
        <ul className="mx-auto mt-10 grid max-w-[1180px] grid-cols-2 items-start gap-x-4 gap-y-10 @min-[640px]:grid-cols-3 @min-[640px]:gap-x-6 @min-[1024px]:mt-12 @min-[1024px]:max-w-none @min-[1024px]:gap-x-12">
          {c.phones.map((p) => (
            <li key={p.src} className="flex justify-center">
              <Image
                src={p.src}
                alt={p.alt}
                width={PHONE.w}
                height={PHONE.h}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
                className="h-auto w-full max-w-[300px] drop-shadow-[0_24px_32px_rgba(60,10,20,0.18)]"
              />
            </li>
          ))}
          <li className="col-span-2 flex justify-center @min-[640px]:col-span-1">
            <div className="w-[62%] max-w-[300px] @min-[640px]:w-full">
              <DemoVideo {...c.video} />
            </div>
          </li>
        </ul>
      </Container>
    </section>
  );
}
