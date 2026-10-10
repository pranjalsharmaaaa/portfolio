import { stackupPrototype as content } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/**
 * Screen 18 — "See Stackup in Action". Its PDF page is only 355px tall
 * (at 1440 wide), so the frame is that height, centred like every other
 * screen's. The prototype button stays centred on the canvas.
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
            // Yana's CTA proportions in Stack Up's green; position and size
            // on tablets and up come from slide.module.css (.cta).
            className={`inline-flex items-center justify-center rounded-2xl px-8 py-4 text-[18px] font-semibold whitespace-nowrap underline underline-offset-4 transition-[filter] hover:brightness-95 ${slide.abs} ${slide.cta}`}
            style={{ background: "rgb(5 161 65 / 20%)", color: "var(--stackup-green)" }}
          >
            {content.cta}
          </a>
        </div>
      </Container>
    </Slide>
  );
}
