import Image from "next/image";
import { stackupCover } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";

/**
 * The four onboarding-flow screens from the reference cover, positioned
 * as a fluid, percentage-based collage rather than four independently
 * breakpointed layouts — the box for each phone below is that phone's
 * own crop, expressed as a percentage of the full cluster's bounding
 * box (measured directly off the reference screenshot), so the whole
 * collage scales as one unit and keeps the reference's relative
 * composition at any width instead of drifting apart on smaller
 * screens.
 *
 * Each phone renders inside a rounded, clipped, `overflow-hidden`
 * frame with its own `box-shadow` rather than a CSS `drop-shadow`
 * filter on the raw image: these source crops are fully opaque
 * (no alpha channel), so a `drop-shadow` filter shadows the entire
 * rectangular bounding box, not the phone's silhouette — which is
 * exactly what made the earlier version look like flat rectangular
 * cards instead of floating phones. Clipping to a rounded corner and
 * shadowing the clipped container instead reads as a phone, not a box.
 *
 * Every crop is now pixel-tight to the phone's own bezel on all four
 * sides — found by scanning the source screenshot for the bezel's
 * actual dark pixels (not just "anything that differs from the page
 * background", which also catches each phone's soft drop shadow and
 * so would have left a crop padded with shadow-tail background). There
 * is zero background margin left inside any of these four images.
 *
 * "confidence-jar" and "wallet" are still cropped exactly as far as
 * the source screenshot itself shows them — the reference frame cuts
 * the first off at its own right edge and the second at its own
 * bottom edge (confirmed by inspecting the pixels right at each
 * screenshot edge: real phone bezel right up to the last row/column,
 * not fading background), so there is no more of either phone to
 * recover without a fresh export.
 */
const PHONES = [
  { src: "/images/stackup/cover-phone-onboarding.webp", box: { left: 0, top: 16.1, width: 32.6, height: 63.1 }, z: 3 },
  { src: "/images/stackup/cover-phone-starting-point.webp", box: { left: 35.7, top: 0, width: 32.9, height: 48.8 }, z: 2 },
  { src: "/images/stackup/cover-phone-confidence-jar.webp", box: { left: 72.1, top: 15.9, width: 27.9, height: 63.1 }, z: 1 },
  { src: "/images/stackup/cover-phone-wallet.webp", box: { left: 35.8, top: 57.7, width: 32.4, height: 42.3 }, z: 2 },
] as const;

export function CoverSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Stack Up cover"
    >
      {/* Decorative bottom-left rings from the reference cover — plain
          CSS circles, not an image, since they're flat solid shapes.
          Kept deliberately small and pushed well below the section's
          own content edge so they clear the text column's tallest
          wrap at any breakpoint, including the awkward viewport widths
          right at the stacked/side-by-side layout boundary where the
          text block is at its widest (and thus shortest) while the
          circles' own container is still using the larger, non-`lg:`
          layout. A single fixed size avoids the breakpoint-dependent
          growth that used to let them grow into the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-16 h-48 w-48 rounded-full"
        style={{ background: "#3a3a3a" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-16 h-36 w-36 rounded-full"
        style={{ background: "var(--stackup-green)" }}
      />

      <Container className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-8">
        <div className="relative z-10 flex max-w-md flex-col items-center text-center lg:items-start lg:text-left">
          <Image
            src="/images/stackup/logo.webp"
            alt="Stack Up"
            width={176}
            height={80}
            className="h-16 w-auto sm:h-20"
          />

          <h1 className="mt-8 text-4xl font-bold sm:text-5xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupCover.eyebrow}
          </h1>
          <div
            className="mt-2 inline-block rounded-2xl px-6 py-2 text-4xl font-extrabold text-white sm:text-5xl"
            style={{ background: "var(--stackup-green)" }}
          >
            {stackupCover.headline}
          </div>

          <p className="mt-8 text-lg font-semibold sm:text-xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupCover.subhead}
          </p>
          <p className="mt-3 text-base leading-relaxed sm:text-lg" style={{ color: "var(--stackup-muted)" }}>
            {stackupCover.body}
          </p>
        </div>

        <div className="relative z-10 aspect-[754/807] w-full max-w-md sm:max-w-lg lg:max-w-none lg:flex-1">
          {PHONES.map((phone) => (
            <div
              key={phone.src}
              className="absolute overflow-hidden rounded-[1.75rem] shadow-[0_24px_48px_-16px_rgb(20_30_20/45%)] sm:rounded-[2.25rem]"
              style={{
                left: `${phone.box.left}%`,
                top: `${phone.box.top}%`,
                width: `${phone.box.width}%`,
                height: `${phone.box.height}%`,
                zIndex: phone.z,
              }}
            >
              <Image src={phone.src} alt="" fill sizes="40vw" className="object-cover" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
