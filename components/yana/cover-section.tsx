import Image from "next/image";
import { yanaCover } from "@/lib/yana-content";
import { yanaDisplay } from "@/components/yana/fonts";
import { YanaFrame } from "@/components/yana/frame";

/**
 * The reference cover's particle-face artwork. This is the only source
 * that exists for it: a 612×420px JPEG which the PDF itself already
 * draws at ~2.1× its pixel size across the whole page. It's served as
 * the original file, untouched — `unoptimized` skips Next's re-encode,
 * which could only remove detail from an image this small, and nothing
 * here upscales or sharpens it. A higher-resolution original is needed
 * for it to be fully crisp at desktop sizes.
 */
const COVER_ART = "/images/yana/cover-particle-face.jpg";

/**
 * The artwork's own background color (its edge pixels measure
 * #000326–#060222, top to bottom), so the CSS field and the image meet
 * with no visible seam where the image's left edge is feathered out.
 * Expressed as the --yana-night token darkened in place rather than a
 * new color.
 */
const NIGHT_FIELD = "color-mix(in srgb, var(--yana-night) 30%, #000)";

/**
 * The pill's own two-stop gradient, taken from the reference's vector
 * data (left #515DFF → right #313899). It belongs to this one element
 * on the cover, so it stays local here rather than becoming a token.
 */
const PILL_GRADIENT = "linear-gradient(90deg, #515dff 0%, #313899 100%)";

/**
 * The light portfolio surface the cover panel sits on (--yana-surround,
 * Stack Up's own page color), easing into Yana's cream over the last
 * 48px — inside the panel's bottom margin — so it meets the next section
 * without a visible color step.
 */
const SURROUND =
  "linear-gradient(0deg, var(--yana-bg) 0px, var(--yana-surround) 48px, var(--yana-surround) 100%)";

/**
 * The cover as a framed night panel rather than a full-viewport field:
 * it sits inside the case study's 60 / 40 / 20px content frame on the
 * light portfolio surface, with the same 28px corner as the homepage's
 * Selected Work cards, so the opening reads as part of the portfolio
 * before the case study's own colors take over. On desktop it's ~80% of
 * the viewport tall (never shorter than its content needs); below
 * desktop its height is content-driven so nothing is ever clipped.
 *
 * The top inset clears the fixed "Back home" pill, so the pill sits on
 * the light surface (as on Stack Up) instead of over the artwork.
 */
export function YanaCoverSection() {
  return (
    <section
      className="relative pt-16 pb-5 sm:pt-20 sm:pb-10 lg:pt-20 lg:pb-[60px]"
      style={{ background: SURROUND }}
      aria-label="YANA cover"
    >
      <YanaFrame>
        <div
          className="relative flex flex-col overflow-hidden rounded-[20px] sm:rounded-3xl lg:min-h-[max(80svh,32rem)] lg:rounded-[1.75rem]"
          style={{ background: NIGHT_FIELD }}
        >
          {/* Desktop: the whole artwork, never cropped — fitted to the
              panel's height and anchored right, so the face stays where
              the reference puts it. Its trailing ribbons are feathered
              out on the left into the night field (the image's own dark
              background and NIGHT_FIELD are the same colors), so there's
              no visible image edge behind the title. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden aspect-[612/420] h-full lg:block"
            style={{ maskImage: "linear-gradient(90deg, transparent 0%, #000 26%)" }}
          >
            <Image
              src={COVER_ART}
              alt=""
              fill
              unoptimized
              preload
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-16 lg:py-[60px]">
            {/* Narrow screens: the same artwork as a band above the title
                instead of behind it — the face stays whole and the title
                never sits on top of the brightest ribbons. Bleeds to the
                panel's edges and is feathered at top and bottom into the
                night field rather than ending on a hard image edge. */}
            <div
              aria-hidden="true"
              className="relative -mx-6 mb-8 aspect-[612/420] sm:-mx-10 sm:mb-10 lg:hidden"
              style={{
                maskImage: "linear-gradient(180deg, transparent 0%, #000 14%, #000 82%, transparent 100%)",
              }}
            >
              <Image src={COVER_ART} alt="" fill unoptimized preload sizes="100vw" className="object-cover" />
            </div>

            <div className={`${yanaDisplay.className} flex flex-col items-start`}>
              <p
                className="inline-flex h-9 items-center gap-2.5 rounded-full px-4 text-base text-white sm:h-10 sm:gap-3 sm:px-[18px] sm:text-[19px] lg:h-[46px] lg:px-5 lg:text-[23px]"
                style={{ background: PILL_GRADIENT }}
              >
                <span aria-hidden="true" className="block size-1.5 rounded-full bg-white sm:size-[7px] lg:size-2" />
                {yanaCover.pill}
              </p>

              <h1 className="mt-9 text-[64px] leading-[0.8] font-semibold text-white sm:mt-11 sm:text-[84px] lg:mt-[58px] lg:text-[102px]">
                {yanaCover.title}
              </h1>

              <p className="mt-5 text-lg leading-snug text-white/90 sm:mt-6 sm:text-[21px] lg:mt-7 lg:text-[23px]">
                {yanaCover.tagline}
              </p>
            </div>

            <div className="mt-10 sm:mt-12 lg:mt-[60px]">
              <p className="text-sm text-white uppercase sm:text-base lg:text-lg">{yanaCover.roleLabel}</p>
              <p className="mt-2 text-lg font-semibold text-white sm:text-[21px] lg:mt-2.5 lg:text-[23px]">
                {yanaCover.role}
              </p>
            </div>
          </div>
        </div>
      </YanaFrame>
    </section>
  );
}
