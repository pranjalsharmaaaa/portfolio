import Image from "next/image";
import { stackupHypothesis } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";

export function HypothesisSection() {
  return (
    <section
      className={`relative ${SECTION_Y}`}
      style={{ background: "var(--stackup-bg)" }}
      aria-label="An initial hypothesis"
    >
      <Container className="flex flex-col gap-10">
        <div>
          <p className="text-xl font-bold tracking-wide uppercase sm:text-2xl lg:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupHypothesis.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupHypothesis.headingPlain}
            <span style={{ color: "var(--stackup-green)" }}>{stackupHypothesis.headingAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stackupHypothesis.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center gap-4 rounded-2xl px-6 py-8 text-center shadow-[0_2px_10px_-4px_rgb(0_0_0/10%)]"
              style={{ background: "var(--stackup-card)" }}
            >
              <h3 className="text-xl font-bold" style={{ color: "var(--stackup-ink)" }}>
                {pillar.title}
              </h3>
              <div className="relative aspect-[285/270] w-full max-w-[16rem]">
                <Image
                  src={pillar.image}
                  alt={`Illustration for ${pillar.title}`}
                  fill
                  sizes="(min-width: 640px) 30vw, 70vw"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
