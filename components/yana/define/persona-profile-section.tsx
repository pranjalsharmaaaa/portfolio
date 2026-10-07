import Image from "next/image";
import type { YanaPersona } from "@/lib/yana-define-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";

/**
 * The translucent identity panel over the bottom of each portrait. The
 * two personas share the shape but not the tint — Ayushi's leans orchid
 * (the reference's own violet), Aniket's leans Yana purple — so the pair
 * reads as one system without being identical.
 */
const OVERLAYS = [
  "linear-gradient(180deg, color-mix(in srgb, #a25fc8 82%, transparent) 0%, color-mix(in srgb, var(--yana-indigo) 92%, transparent) 100%)",
  "linear-gradient(180deg, color-mix(in srgb, var(--yana-purple) 80%, transparent) 0%, color-mix(in srgb, var(--yana-indigo) 94%, transparent) 100%)",
];

/**
 * One user persona, as the reference composes it: a portrait on the
 * left with the persona's name and demographics on a translucent purple
 * panel across its foot, and the quote and four profile groups on a
 * white card to the right (in a 2 × 2 grid on desktop, so the whole
 * profile reads as one screen).
 *
 * The portraits are the source's own photos at their native size
 * (`unoptimized`, never re-encoded or enlarged in the file); the panel
 * crops them like the reference does.
 */
export function YanaPersonaProfileSection({ persona, index }: { persona: YanaPersona; index: number }) {
  return (
    <section aria-label={`User persona: ${persona.name}`} className={YANA_SCREEN_Y}>
      <YanaFrame>
        <article
          className="grid overflow-hidden rounded-[24px] sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:grid-cols-[minmax(0,33fr)_minmax(0,67fr)] lg:rounded-[28px]"
          style={{
            background: "var(--yana-card)",
            boxShadow: "0 24px 60px -28px color-mix(in srgb, var(--yana-indigo) 38%, transparent)",
          }}
        >
          <div className="relative aspect-[4/5] sm:aspect-auto sm:min-h-[520px] lg:min-h-0">
            <Image
              src={persona.photo.src}
              alt={persona.photo.alt}
              fill
              unoptimized
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: persona.photo.position }}
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-[56px] px-6 pt-7 pb-8 text-center text-white backdrop-blur-[2px] lg:rounded-t-[72px] lg:pt-8 lg:pb-10"
              style={{ background: OVERLAYS[index % OVERLAYS.length] }}
            >
              <h2 className="text-[30px] leading-tight font-semibold tracking-[-0.01em] lg:text-[36px]">{persona.name}</h2>
              <span aria-hidden="true" className="mx-auto mt-3 block h-0.5 w-[58%] max-w-[220px] rounded-full bg-white/90" />
              <p className="mt-3 text-base leading-snug text-white/95 lg:text-[19px]">
                {persona.demographics.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-11">
            <p className="text-[22px] leading-snug font-semibold tracking-[-0.01em] sm:text-[24px] lg:text-[28px]" style={{ color: "var(--yana-purple)" }}>
              {persona.quote}
            </p>

            <div className="mt-8 grid gap-x-12 gap-y-7 lg:mt-10 lg:grid-cols-2 lg:gap-y-8">
              {persona.groups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[18px] font-medium lg:text-[19px]" style={{ color: "var(--yana-ink)" }}>
                    {group.title}
                  </h3>
                  <ul className="mt-2.5 flex list-disc flex-col gap-1 pl-5 text-[15px] leading-relaxed lg:text-[15.5px]" style={{ color: "var(--yana-muted)" }}>
                    {group.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </article>
      </YanaFrame>
    </section>
  );
}
