import Image from "next/image";
import type { ReactNode } from "react";
import type { YanaScreen } from "@/lib/yana-prototype-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YANA_DEEP } from "@/components/yana/prototype/prototype-cta-section";

/**
 * How the four screens' captions read:
 * - "none": phones only (the onboarding screen has its own feature row)
 * - "timeline": names under dots on one connected track (reflection → progress)
 * - "steps": numbered steps with arrows between screens (a journey)
 * - "hub": names as pills, the first filled — the screen the rest lead from
 */
export type YanaShowcaseCaptions = "none" | "timeline" | "steps" | "hub";

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
 * The shared composition of the five prototype walkthrough screens: a
 * large headline and its lavender sub-line from the reference, any
 * section-specific intro (`children`), then the four phone screens in
 * one row on desktop — two per row on tablets, one per row on phones.
 * `stage` sets the screens on a soft lavender platform.
 */
export function YanaPhoneShowcase({
  label,
  heading,
  body,
  screens,
  captions = "none",
  stage = false,
  children,
}: {
  label: string;
  heading: string;
  body?: string;
  screens: readonly YanaScreen[];
  captions?: YanaShowcaseCaptions;
  stage?: boolean;
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

        <div className="relative mt-10 lg:mt-12">
          {stage ? (
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[22%] -bottom-6 rounded-[36px] lg:-bottom-8 lg:rounded-[48px]"
              style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--yana-purple-light) 85%, transparent) 0%, color-mix(in srgb, var(--yana-purple-light) 25%, transparent) 100%)" }}
            />
          ) : null}
          <ol className="relative grid grid-cols-1 justify-items-center gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-x-10 xl:gap-x-14">
            {screens.map((screen, i) => (
              <li key={screen.src} className="relative flex w-full flex-col items-center">
                <Phone screen={screen} />
                {captions === "steps" && i < screens.length - 1 ? <StepArrow /> : null}
                {captions === "timeline" && screen.caption ? (
                  <div className="relative mt-6 flex w-full justify-center">
                    {i < screens.length - 1 ? (
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 hidden h-px w-[calc(100%+2.5rem)] lg:block xl:w-[calc(100%+3.5rem)]"
                        style={{ background: "linear-gradient(90deg, var(--yana-purple), color-mix(in srgb, var(--yana-purple) 45%, var(--yana-pink)))" }}
                      />
                    ) : null}
                    <span
                      aria-hidden="true"
                      className="relative size-3 rounded-full ring-4 ring-[var(--yana-bg)]"
                      style={{ background: i === screens.length - 1 ? "var(--yana-pink)" : "var(--yana-purple)" }}
                    />
                  </div>
                ) : null}
                {captions !== "none" && screen.caption ? (
                  <p
                    className={`flex items-center gap-2.5 text-center text-[15px] font-semibold sm:text-[16px] ${captions === "timeline" ? "mt-3" : "mt-5"}`}
                    style={{ color: YANA_DEEP }}
                  >
                    {captions === "steps" ? (
                      <span
                        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-[13px] font-bold text-white"
                        style={{ background: "var(--yana-purple)" }}
                      >
                        {i + 1}
                      </span>
                    ) : null}
                    {captions === "hub" ? (
                      <span
                        className="rounded-full border px-4 py-1.5"
                        style={
                          i === 0
                            ? { background: "var(--yana-purple)", borderColor: "var(--yana-purple)", color: "#ffffff" }
                            : { background: "var(--yana-card)", borderColor: "color-mix(in srgb, var(--yana-purple) 30%, transparent)" }
                        }
                      >
                        {screen.caption}
                      </span>
                    ) : (
                      screen.caption
                    )}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </YanaFrame>
    </section>
  );
}
