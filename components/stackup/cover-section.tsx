import Image from "next/image";
import { stackupCover } from "@/lib/stackup-content";

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
 * "confidence-jar" and "wallet" are cropped exactly as far as the
 * source screenshot itself shows them — the reference frame cuts the
 * first off at its right edge and the second at its bottom edge, so
 * there is no more of either phone to recover without a fresh export.
 */
const PHONES = [
  { src: "/images/stackup/cover-phone-onboarding.webp", box: { left: 0, top: 16.5, width: 29.9, height: 64.2 }, z: 3 },
  { src: "/images/stackup/cover-phone-starting-point.webp", box: { left: 30.5, top: 0, width: 29.4, height: 50.1 }, z: 2 },
  { src: "/images/stackup/cover-phone-confidence-jar.webp", box: { left: 63.3, top: 19.0, width: 36.7, height: 60.5 }, z: 1 },
  { src: "/images/stackup/cover-phone-wallet.webp", box: { left: 30.5, top: 58.1, width: 29.4, height: 41.9 }, z: 2 },
] as const;

export function CoverSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Stack Up cover"
    >
      {/* Decorative bottom-left rings from the reference cover — plain
          CSS circles, not an image, since they're flat solid shapes.
          Sized and offset to only clip the section's own bottom-left
          corner, well below the text column, matching the reference. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-56 w-56 rounded-full sm:-bottom-36 sm:-left-20 sm:h-72 sm:w-72"
        style={{ background: "#3a3a3a" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -left-16 h-40 w-40 rounded-full sm:-bottom-36 sm:-left-20 sm:h-52 sm:w-52"
        style={{ background: "var(--stackup-green)" }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:items-center lg:gap-8 lg:px-16 lg:py-28">
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

        <div className="relative z-10 aspect-[885/818] w-full max-w-md sm:max-w-lg lg:max-w-none lg:flex-1">
          {PHONES.map((phone) => (
            <div
              key={phone.src}
              className="absolute drop-shadow-xl"
              style={{
                left: `${phone.box.left}%`,
                top: `${phone.box.top}%`,
                width: `${phone.box.width}%`,
                height: `${phone.box.height}%`,
                zIndex: phone.z,
              }}
            >
              <Image src={phone.src} alt="" fill sizes="40vw" className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
