import Image from "next/image";
import { yanaProcess } from "@/lib/yana-content";
import { YanaFrame, YANA_SCREEN } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * Yana's signature transition: the wave that carries this page into the
 * Discover chapter, drawn in Yana purple so it flows straight into the
 * purple chapter band below it (the source drew it pink). Traced from
 * the reference's own wave (sub-pixel edge detection across its full
 * width, then a smooth Catmull-Rom → cubic Bézier fit) so it's a
 * resolution-independent vector instead of the source's 625px raster. Drawn in a 1200 × 211
 * box — the reference page's own width and the wave band's own height
 * — and always scaled uniformly with the page width, never stretched.
 */
const WAVE_PATH =
  "M0 41.3C12 41.9 50 44.7 75 45.4C100 46.0 125 46.5 150 45.2C175 43.8 200 38.9 225 37.3C250 35.6 275 30.8 300 35.1C325 39.5 350 50.1 375 63.4C400 76.6 425 100.4 450 114.6C475 128.9 500 144.5 525 148.8C550 153.0 575 146.5 600 140.1C625 133.6 650 119.4 675 110.0C700 100.5 725 91.3 750 83.4C775 75.4 800 69.2 825 62.4C850 55.6 875 48.8 900 42.5C925 36.1 950 28.8 975 24.3C1000 19.8 1025 16.4 1050 15.5C1075 14.5 1100 16.7 1125 18.8C1150 20.9 1188 26.6 1200 28.1V211H0Z";

export function YanaProcessSection() {
  return (
    <section className={YANA_SCREEN} style={{ background: "var(--yana-bg)" }} aria-label="Design process">
      <YanaFrame className="flex flex-1 flex-col justify-center pt-16 pb-12 sm:pt-20 sm:pb-14 lg:pt-[60px] lg:pb-10">
        <YanaSectionHeading>{yanaProcess.heading}</YanaSectionHeading>

        {/* Five steps spanning the full content frame, first blob on the
            left edge and last on the right, as in the reference. Phones
            wrap them into a centered 3 + 2 rather than shrinking five
            labels into one cramped row. */}
        <ol className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-10 sm:mt-16 sm:flex-nowrap sm:justify-between sm:gap-x-4 lg:mt-[84px]">
          {yanaProcess.steps.map((step) => (
            <li key={step.label} className="flex w-[84px] flex-col items-center sm:w-[92px] lg:w-[104px]">
              {/* Exact blob + icon vectors from the reference: blobs in
                  the source's own light pink (the same accent as the
                  "01" chapter tile), icons recolored to Yana purple. The
                  soft glow under each blob is rebuilt as a CSS shadow
                  that follows the blob's own outline — the reference
                  only had it as a separate blurred raster. */}
              <Image
                src={step.icon}
                alt=""
                width={100}
                height={114}
                className="h-auto w-full"
                style={{
                  filter:
                    "drop-shadow(0 8px 14px color-mix(in srgb, var(--yana-pink-light) 60%, transparent))",
                }}
              />
              <span className="mt-6 text-[15px] sm:mt-10 sm:text-[17px] lg:mt-[60px] lg:text-[19px]" style={{ color: "var(--yana-ink)" }}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </YanaFrame>

      <svg
        aria-hidden="true"
        viewBox="0 0 1200 211"
        className="relative z-10 -mb-px block h-auto w-full"
        focusable="false"
      >
        <path d={WAVE_PATH} fill="var(--yana-purple)" />
      </svg>
    </section>
  );
}
