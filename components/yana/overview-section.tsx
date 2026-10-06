import Image from "next/image";
import { yanaOverview } from "@/lib/yana-content";
import { YanaFrame, YANA_SCREEN, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * The splash-screen phone is a genuine alpha cutout (the reference's own
 * JPEG + its soft mask, recombined losslessly — 915×967px including the
 * floor shadow). Its width is capped so it never displays above its
 * native resolution on a 2× screen: 458 CSS px ≈ 915 device px. The
 * slight counter-clockwise tilt is the reference's own placement
 * (−8.76°), applied as a CSS transform so the pixels are never
 * resampled into the file itself.
 */
const PHONE = { src: "/images/yana/phone-splash.webp", width: 915, height: 967 } as const;

export function YanaOverviewSection() {
  return (
    <section
      className={`${YANA_SCREEN} overflow-hidden`}
      style={{ background: "var(--yana-bg)" }}
      aria-label="Project overview"
    >
      <YanaFrame
        className={`flex flex-1 flex-col justify-center gap-14 sm:gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12 ${YANA_SCREEN_Y}`}
      >
        <div>
          <YanaSectionHeading>{yanaOverview.heading}</YanaSectionHeading>

          <ul className="mt-12 flex flex-col gap-9 sm:mt-14 sm:gap-11 lg:mt-[76px] lg:gap-[50px]">
            {yanaOverview.items.map((item) => (
              <li key={item.title}>
                <h3 className="flex items-start gap-[0.45em] text-xl leading-snug sm:text-2xl lg:text-[24px]" style={{ color: "var(--yana-ink)" }}>
                  {/* Drawn rather than typed: Inter's own "→" sits low on
                      the math axis, while the reference's arrow is a
                      full-size mark centered on the cap height. Pinned to
                      the first line so a title that wraps on a phone
                      doesn't pull its arrow down between two lines. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="mt-[0.3em] size-[0.8em] shrink-0"
                    style={{ color: "var(--yana-purple)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 12h16M13 5l7 7-7 7" />
                  </svg>
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed sm:text-[17px] lg:mt-2.5 lg:text-[17px]"
                  style={{ color: "var(--yana-muted)" }}
                >
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Centered against the text column but lifted above its middle,
            as in the reference, where the phone rides noticeably higher
            than the list beside it. */}
        <div className="relative mx-auto w-[min(78%,300px)] sm:w-[340px] lg:mx-0 lg:mr-[2%] lg:w-[min(32vw,458px)] lg:shrink-0 lg:-translate-y-[7%]">
          {/* A soft lavender halo behind the phone — the one trace of the
              reference's purple atmosphere on this otherwise cream page,
              so the splash screen still sits in Yana's own light. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[12%]"
            style={{ background: "radial-gradient(closest-side, var(--yana-purple-light), transparent)" }}
          />
          <Image
            src={PHONE.src}
            alt="YANA app splash screen: a cheerful brain mascot lifting dumbbells above the words “YANA — You Are Not Alone!”"
            width={PHONE.width}
            height={PHONE.height}
            unoptimized
            className="relative h-auto w-full"
            style={{ transform: "rotate(-8.76deg)" }}
          />
        </div>
      </YanaFrame>
    </section>
  );
}
