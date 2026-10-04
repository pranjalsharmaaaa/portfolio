import { stackupPrototype as content } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/**
 * Screen 18 — "See Stackup in Action". Its PDF page is only 355px tall
 * (at 1440 wide), so the frame is that height, centred like every other
 * screen's. The prototype button stays centred on the canvas (f: 0.5).
 */
export function PrototypeSection() {
  return (
    <Slide label="See Stackup in action" frameHeight={355.2} flowClassName="pt-10 pb-16 @min-[640px]:py-14">
      <Container>
        <h2
          className={`text-sm font-semibold uppercase @min-[640px]:text-base ${slide.abs} ${slide.type}`}
          style={{ color: "#7c7c7b", ...at({ x: 64, y: 51.2, fs: 24, lh: 29 }) }}
        >
          {content.label}
        </h2>
        <p
          className={`mt-3 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 102.9, fs: 24, lh: 36 }) }}
        >
          <Lines lines={content.body} />
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={content.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-lg font-medium underline underline-offset-4 transition-[filter] hover:brightness-95 ${slide.abs} ${slide.w} ${slide.h} ${slide.type}`}
            style={{
              background: "rgb(5 161 65 / 20%)",
              color: "var(--stackup-green)",
              borderRadius: "calc(24 * var(--u, 0.667px))",
              ...at({ x: 466.8, y: 218.4, w: 506.4, h: 84, fs: 33.6, lh: 40, f: 0.5 }),
            }}
          >
            {content.cta}
          </a>
        </div>
      </Container>
    </Slide>
  );
}
