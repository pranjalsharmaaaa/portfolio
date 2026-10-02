import { stackupEcosystem } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";

export function EcosystemSection() {
  return (
    <section
      className={`relative overflow-clip ${SECTION_Y}`}
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Exploring the ecosystem"
    >
      {/* Mirrors the cover's bottom-left decorative corner shape, anchored
          to the bottom-right instead. Same -50%/50% translate trick so
          each circle always shows a clean quarter-circle bleeding from
          its corner regardless of the two circles' different sizes. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-48 w-48 rounded-full"
        style={{ background: "#3a3a3a", transform: "translate(50%, 50%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-36 w-36 rounded-full"
        style={{ background: "var(--stackup-green)", transform: "translate(50%, 50%)" }}
      />

      <Container className="relative flex flex-col gap-8">
        <div className="w-full">
          <p className="text-xl font-bold tracking-wide uppercase @min-[640px]:text-2xl @min-[1024px]:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupEcosystem.label}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed @min-[640px]:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupEcosystem.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3">
          {stackupEcosystem.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl px-6 py-5 shadow-[0_2px_10px_-4px_rgb(0_0_0/10%)]"
              style={{ background: "var(--stackup-card)" }}
            >
              <h3 className="text-lg font-bold" style={{ color: "var(--stackup-green)" }}>
                {card.title}
              </h3>
              <p className="mt-1 text-base" style={{ color: "var(--stackup-ink)" }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <p className="max-w-3xl text-base leading-relaxed @min-[640px]:text-lg" style={{ color: "var(--stackup-ink)" }}>
          {stackupEcosystem.outro}
        </p>
      </Container>
    </section>
  );
}
