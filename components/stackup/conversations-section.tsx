import { stackupConversations } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/** Card origins (CSS px at 1440x810) — a 3 + 3 + 2 grid of 414x136.8 cards, as placed in the PDF. */
const CARDS = [
  { x: 60, y: 150 },
  { x: 512.4, y: 150 },
  { x: 964.8, y: 150 },
  { x: 60, y: 334.8 },
  { x: 512.4, y: 334.8 },
  { x: 964.8, y: 334.8 },
  { x: 60, y: 519.6 },
  { x: 514.2, y: 519.6 },
] as const;

/** Screen 12 — "23 User Conversations". */
export function ConversationsSection() {
  return (
    <Slide label="23 user conversations">
      <Container>
        <p
          className={`text-sm font-semibold @min-[640px]:text-base ${slide.abs} ${slide.type}`}
          style={{ color: "rgb(0 0 0 / 50%)", ...at({ x: 60, y: 54, fs: 21, lh: 26 }) }}
        >
          {stackupConversations.label}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 @min-[640px]:grid-cols-2">
          {stackupConversations.quotes.map((quote, i) => (
            <blockquote
              key={i}
              className={`rounded-3xl px-5 py-5 text-center text-lg leading-normal ${slide.abs} ${slide.w} ${slide.h} ${slide.type}`}
              style={{ background: "#e2e5dc", color: "#000", borderRadius: "calc(24 * var(--u, 1px))", ...at({ ...CARDS[i], w: 414, h: 136.8, fs: 24, lh: 36 }) }}
            >
              <span className={slide.slideOnly} style={{ height: "calc(13.5 * var(--u))" }} aria-hidden="true" />
              <Lines lines={quote} />
            </blockquote>
          ))}
        </div>

        <p
          className={`mt-8 text-2xl font-bold @min-[640px]:text-3xl ${slide.abs} ${slide.type}`}
          style={{ color: "#3a3a3a", ...at({ x: 60, y: 718, fs: 31.2, lh: 38 }) }}
        >
          {stackupConversations.closing}
        </p>
      </Container>
    </Slide>
  );
}
