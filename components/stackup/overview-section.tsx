import Image from "next/image";
import { stackupOverview } from "@/lib/stackup-content";
import { Container, SECTION_Y } from "@/components/stackup/container";

export function OverviewSection() {
  return (
    <section
      className={`relative ${SECTION_Y}`}
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Project overview"
    >
      <Container className="flex flex-col gap-10">
        <div className="max-w-3xl">
          <p className="text-xl font-bold tracking-wide uppercase @min-[640px]:text-2xl @min-[1024px]:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupOverview.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold @min-[640px]:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupOverview.headingPlain}
            <span style={{ color: "var(--stackup-green)" }}>{stackupOverview.headingAccent}</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed @min-[640px]:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupOverview.body}
          </p>
        </div>

        <div className="flex flex-col gap-10 @min-[1024px]:flex-row @min-[1024px]:items-center @min-[1024px]:justify-between @min-[1024px]:gap-16">
          <div className="flex w-full flex-col gap-4 @min-[1024px]:max-w-md">
            {stackupOverview.pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl px-6 py-5 shadow-[0_2px_10px_-4px_rgb(0_0_0/10%)]"
                style={{ background: "var(--stackup-card)" }}
              >
                <h3 className="text-lg font-bold" style={{ color: "var(--stackup-green)" }}>
                  {pillar.title}
                </h3>
                <p className="mt-1 text-base" style={{ color: "var(--stackup-ink)" }}>
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative aspect-[1332/922] w-full max-w-md @min-[1024px]:max-w-lg">
            <Image
              src="/images/stackup/illustration-steps.webp"
              alt="Illustration: a person climbing steps labeled Understand, Practise, and Build Confidence toward a flag reading A More Confident You"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              quality={95}
              className="object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
