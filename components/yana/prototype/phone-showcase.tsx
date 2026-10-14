import Image from "next/image";
import type { ReactNode } from "react";
import type { YanaScreen } from "@/lib/yana-prototype-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YANA_DEEP } from "@/components/yana/prototype/prototype-cta-section";

/**
 * One phone screen. Every screen file already includes its device frame
 * (transparent outside it), so it's shown as-is: no added frame, no
 * shadow, never cropped. On desktop all four share one height (--ph,
 * set by the section) and take their own width from their aspect ratio;
 * below that each is width-led, capped at 300px — or at its native
 * width, for the few screens that only exist as small crops.
 */
function Phone({ screen }: { screen: YanaScreen }) {
  return (
    <Image
      src={screen.src}
      alt={screen.alt}
      width={screen.width}
      height={screen.height}
      unoptimized
      className="block h-auto w-[min(100%,var(--mw))] lg:w-[min(100%,calc(var(--ph)*var(--r)))]"
      style={{ "--r": screen.width / screen.height, "--mw": `${Math.min(300, screen.width)}px` } as React.CSSProperties}
    />
  );
}

function StepArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="absolute top-1/2 -right-[20px] hidden size-6 -translate-y-1/2 translate-x-1/2 lg:block xl:-right-[28px]"
      fill="none"
      stroke="var(--yana-purple)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h16M13 5l7 7-7 7" />
    </svg>
  );
}

/**
 * The one caption style every walkthrough screen uses: a centred title a
 * fixed distance under its phone, and, where a screen has one, a short
 * description beneath it. Same family (the page's), size, weight, colour,
 * line height and spacing in every section, so no screen's name reads
 * differently from another's.
 */
function ScreenCaption({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mt-6 flex max-w-[18rem] flex-col items-center text-center">
      <p className="text-[16px] leading-snug font-semibold text-balance sm:text-[17px]" style={{ color: YANA_DEEP }}>
        {title}
      </p>
      {description ? (
        <p className="mt-1.5 text-[14px] leading-relaxed text-pretty sm:text-[15px]" style={{ color: "var(--yana-muted)" }}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

/**
 * The shared composition of the five prototype walkthrough screens: a
 * large headline and its lavender sub-line from the reference, any
 * section-specific intro (`children`), then the four phone screens in
 * one row on desktop — two per row on tablets, one per row on phones —
 * straight on the page's cream, each captioned by ScreenCaption when it
 * has a caption. `sequence` adds arrows between the screens on desktop,
 * for a step-by-step journey (therapy discovery).
 */
export function YanaPhoneShowcase({
  label,
  heading,
  body,
  screens,
  sequence = false,
  children,
}: {
  label: string;
  heading: string;
  body?: string;
  screens: readonly YanaScreen[];
  sequence?: boolean;
  children?: ReactNode;
}) {
  return (
    <section aria-label={label} className={`${YANA_SCREEN_Y} lg:[--ph:clamp(400px,56svh,580px)]`}>
      <YanaFrame>
        <h2 className="text-[36px] leading-[1.08] font-bold tracking-[-0.02em] sm:text-[48px] lg:text-[58px]" style={{ color: YANA_DEEP }}>
          {heading}
        </h2>
        {body ? (
          <p
            className="mt-4 max-w-[1080px] text-[18px] leading-snug font-medium sm:text-[20px] lg:text-[22px]"
            style={{ color: "color-mix(in srgb, var(--yana-purple) 88%, white)" }}
          >
            {body}
          </p>
        ) : null}
        {children}

        <ol className="mt-10 grid grid-cols-1 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:items-start lg:gap-x-10 xl:gap-x-14">
          {screens.map((screen, i) => (
            <li key={screen.src} className="relative flex w-full flex-col items-center">
              <div className="relative flex w-full justify-center lg:h-[var(--ph)] lg:items-end">
                <Phone screen={screen} />
                {sequence && i < screens.length - 1 ? <StepArrow /> : null}
              </div>
              {screen.caption ? <ScreenCaption title={screen.caption} description={screen.description} /> : null}
            </li>
          ))}
        </ol>
      </YanaFrame>
    </section>
  );
}
