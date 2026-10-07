import { yanaHmw } from "@/lib/yana-define-content";
import { YanaFrame, YANA_SCREEN_Y } from "@/components/yana/frame";
import { YanaSectionHeading } from "@/components/yana/section-heading";

/**
 * "Problem Framing Through HMW": the four questions as editorial rows —
 * the purple category label in a narrow left column, the question large
 * on the right, hairline rules between — rather than four boxed cards.
 */
export function YanaHmwSection() {
  const { heading, items } = yanaHmw;
  return (
    <section aria-label="Problem framing through HMW" className={YANA_SCREEN_Y}>
      <YanaFrame>
        <YanaSectionHeading>{heading}</YanaSectionHeading>

        <ol className="mt-10 max-w-[1180px] lg:mt-12">
          {items.map((item) => (
            <li
              key={item.label}
              className="grid gap-2 py-6 sm:gap-3 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10 lg:py-7"
              style={{ borderTop: "1px solid color-mix(in srgb, var(--yana-purple) 18%, transparent)" }}
            >
              <p className="text-[13px] font-semibold tracking-[0.08em] uppercase lg:pt-1.5 lg:text-sm" style={{ color: "var(--yana-purple)" }}>
                {item.label}
              </p>
              <p className="text-[20px] leading-snug sm:text-[22px] lg:text-[26px]" style={{ color: "var(--yana-ink)" }}>
                {item.question}
              </p>
            </li>
          ))}
        </ol>
      </YanaFrame>
    </section>
  );
}
