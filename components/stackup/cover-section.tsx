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
 * Each asset (`phone-*-cutout.webp`) is a genuine alpha-transparent
 * cutout, not an opaque rectangle relying on a CSS border-radius mask
 * to hide its background: the phone was cropped pixel-tight to its own
 * bezel from the source screenshot, then everything outside a
 * rounded-rect matching that bezel's own curvature was made fully
 * transparent (verified by compositing onto a contrasting color —
 * zero background pixels remain). Because there's now a real alpha
 * channel, a plain CSS `drop-shadow` filter correctly follows the
 * phone's silhouette instead of shadowing a rectangular bounding box.
 *
 * "confidence-jar" and "wallet" are still cropped exactly as far as
 * the source screenshot itself shows them — it cuts the first off at
 * its own right edge and the second at its own bottom edge, so there
 * is no more of either phone to recover without a fresh export.
 *
 * The cluster's own wrapper is capped with `lg:max-w-[30rem]` rather
 * than left to grow via `flex-1`: this bounding box's aspect ratio
 * (754:807) is nearly square, so letting it consume whatever width a
 * wide page grid leaves over inflates its *height* just as much,
 * which is what previously forced the whole cover well past one
 * viewport. Capping its width keeps the composition — and the
 * section's overall height — proportional at any page width.
 */
const PHONES = [
  { src: "/images/stackup/phone-onboarding-cutout.webp", box: { left: 0, top: 16.1, width: 32.6, height: 63.1 }, z: 3 },
  { src: "/images/stackup/phone-starting-point-cutout.webp", box: { left: 35.7, top: 0, width: 32.9, height: 48.8 }, z: 2 },
  { src: "/images/stackup/phone-confidence-jar-cutout.webp", box: { left: 72.1, top: 15.9, width: 27.9, height: 63.1 }, z: 1 },
  { src: "/images/stackup/phone-wallet-cutout.webp", box: { left: 35.8, top: 57.7, width: 32.4, height: 42.3 }, z: 2 },
] as const;

export function CoverSection() {
  return (
    <section
      className="relative overflow-hidden py-14 sm:py-16 lg:py-20"
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Stack Up cover"
    >
      {/* Decorative bottom-left rings from the reference cover — plain
          CSS circles, not an image, since they're flat solid shapes.
          Kept deliberately small and pushed well below the section's
          own content edge so they clear the text column's tallest
          wrap at any breakpoint. */}
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

      <Container className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center lg:gap-16 xl:gap-24">
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

        <div className="relative z-10 aspect-[754/807] w-full max-w-xs sm:max-w-sm lg:max-w-[30rem]">
          {PHONES.map((phone) => (
            <div
              key={phone.src}
              className="absolute"
              style={{
                left: `${phone.box.left}%`,
                top: `${phone.box.top}%`,
                width: `${phone.box.width}%`,
                height: `${phone.box.height}%`,
                zIndex: phone.z,
              }}
            >
              <Image
                src={phone.src}
                alt=""
                fill
                sizes="20rem"
                className="object-contain"
                style={{ filter: "drop-shadow(0 20px 32px rgb(20 30 20 / 40%))" }}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
