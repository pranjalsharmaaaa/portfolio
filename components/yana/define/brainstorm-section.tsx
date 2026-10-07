import Image from "next/image";
import { yanaBrainstorm } from "@/lib/yana-define-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * "Brainstorming Session": the workshop photo and the digital
 * whiteboard from the session, side by side at their own 4:3 ratio
 * (stacked on smaller screens) — shown whole, never cropped or
 * stretched. The workshop photo is the source's 1280×960 as-is; the
 * whiteboard photo is the source's 4032×3024 original downscaled to 2400px.
 */
export function YanaBrainstormSection() {
  const { heading, photos } = yanaBrainstorm;
  return (
    <section aria-label="Brainstorming session" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-2 lg:gap-10">
          {photos.map((photo) => (
            <figure
              key={photo.src}
              className="overflow-hidden rounded-2xl lg:rounded-[24px]"
              style={{ boxShadow: "0 22px 48px -26px color-mix(in srgb, var(--yana-indigo) 45%, transparent)" }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="block h-auto w-full"
              />
            </figure>
          ))}
        </div>
      </YanaFrame>
    </section>
  );
}
