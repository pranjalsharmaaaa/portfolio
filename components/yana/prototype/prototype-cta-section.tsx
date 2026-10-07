import { yanaPrototype } from "@/lib/yana-prototype-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";

/** The feature screens' headline ink: Yana indigo, deepened. */
export const YANA_DEEP = "color-mix(in srgb, var(--yana-indigo) 72%, black)";

/**
 * "See Yana in Action": an open, centred editorial screen — headline,
 * one sentence, one call to action — set over two faint glows of Yana
 * pink and periwinkle, each fading out inside the section's own height
 * so neither is ever cut off by its edge. The CTA is a real link only
 * once a prototype URL exists (lib/yana-prototype-content.ts); until
 * then it renders as the same button, inert, rather than pointing
 * anywhere invented.
 */
export function YanaPrototypeCtaSection() {
  const { heading, body, cta, href } = yanaPrototype;
  const buttonClass =
    "inline-flex items-center gap-3 rounded-full px-8 py-4 text-[18px] font-semibold text-white sm:px-10 sm:py-5 sm:text-[20px]";
  const buttonStyle = {
    background: "linear-gradient(100deg, var(--yana-purple) 0%, #8a5cf0 55%, var(--yana-pink) 130%)",
    boxShadow: "0 18px 40px -18px color-mix(in srgb, var(--yana-purple) 70%, transparent)",
  };
  const arrow = (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 sm:size-6" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );

  return (
    <section aria-label="See Yana in action" className={`relative overflow-x-clip ${YANA_SCREEN_Y}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-6 -left-32 size-[300px] rounded-full opacity-60 sm:size-[440px]"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--yana-pink-light) 60%, transparent), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-6 size-[320px] rounded-full opacity-60 sm:size-[500px]"
        style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--yana-periwinkle) 55%, transparent), transparent)" }}
      />
      <YanaFrame className="relative flex flex-col items-center py-10 text-center sm:py-16 lg:py-24">
        <h2 className="text-[40px] leading-[1.05] font-bold tracking-[-0.02em] sm:text-[56px] lg:text-[72px]" style={{ color: YANA_DEEP }}>
          {heading}
        </h2>
        <p className="mt-6 max-w-[760px] text-[18px] leading-relaxed sm:text-[21px] lg:mt-8 lg:text-[23px]" style={{ color: "var(--yana-muted)" }}>
          {body}
        </p>
        <div className="mt-10 lg:mt-14">
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={`${buttonClass} transition-[filter] hover:brightness-110`} style={buttonStyle}>
              {cta}
              {arrow}
            </a>
          ) : (
            <span aria-disabled="true" data-yana-prototype-cta="" className={buttonClass} style={buttonStyle}>
              {cta}
              {arrow}
            </span>
          )}
        </div>
      </YanaFrame>
    </section>
  );
}
