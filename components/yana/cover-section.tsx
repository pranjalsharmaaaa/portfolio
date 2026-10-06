import Image from "next/image";
import { yanaCover } from "@/lib/yana-content";
import { yanaDisplay } from "@/components/yana/fonts";
import { YanaFrame, YANA_SCREEN, YANA_SCREEN_Y } from "@/components/yana/frame";

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
 * Two night-sky stops that match the artwork's own edge colors, so the
 * CSS field and the image meet seamlessly wherever the image doesn't
 * reach (it's full-bleed on desktop; a feathered band on narrow
 * screens). The top stop is the --yana-night token darkened in place
 * rather than a new color.
 */
const NIGHT_FIELD =
  "linear-gradient(180deg, color-mix(in srgb, var(--yana-night) 40%, #000) 0%, var(--yana-night) 100%)";

/**
 * The pill's own two-stop gradient, taken from the reference's vector
 * data (left #515DFF → right #313899). It belongs to this one element
 * on the cover, so it stays local here rather than becoming a token.
 */
const PILL_GRADIENT = "linear-gradient(90deg, #515dff 0%, #313899 100%)";

export function YanaCoverSection() {
  return (
    <section
      className={`${YANA_SCREEN} min-h-svh overflow-hidden`}
      style={{ background: NIGHT_FIELD }}
      aria-label="YANA cover"
    >
      {/* Desktop: the artwork is the whole page's background, exactly as
          in the reference — face on the right, its ribbons trailing
          behind the title. Anchored right so the face is never the part
          that gets cropped on wider/shorter viewports. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <Image
          src={COVER_ART}
          alt=""
          fill
          unoptimized
          preload
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "78% 50%" }}
        />
      </div>

      <YanaFrame className={`relative z-10 flex flex-1 flex-col justify-center ${YANA_SCREEN_Y}`}>
        {/* Narrow screens: the same artwork as a full-bleed band above the
            title instead of behind it — the face stays whole and the
            title never sits on top of the brightest ribbons. Feathered at
            top and bottom into the night field rather than ending on a
            hard image edge. */}
        <div
          aria-hidden="true"
          className="relative -mx-5 mb-8 aspect-[612/420] sm:-mx-10 sm:mb-10 lg:hidden"
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
          <p className="mt-2 text-lg font-semibold text-white sm:text-[21px] lg:mt-2.5 lg:text-[23px]">{yanaCover.role}</p>
        </div>
      </YanaFrame>
    </section>
  );
}
