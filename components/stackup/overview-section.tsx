import Image from "next/image";
import { stackupOverview } from "@/lib/stackup-content";

export function OverviewSection() {
  return (
    <section
      className="relative"
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Project overview"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-20 sm:px-10 lg:flex-row lg:items-center lg:gap-16 lg:px-16 lg:py-28">
        <div className="flex-1">
          <p className="text-sm font-bold tracking-wide uppercase" style={{ color: "var(--stackup-label)" }}>
            {stackupOverview.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupOverview.headingPlain}
            <span style={{ color: "var(--stackup-green)" }}>{stackupOverview.headingAccent}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupOverview.body}
          </p>

          <div className="mt-8 flex flex-col gap-4">
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
        </div>

        <div className="relative aspect-[590/395] w-full flex-1">
          <Image
            src="/images/stackup/illustration-steps.webp"
            alt="Illustration: a person climbing steps labeled Understand, Practise, and Build Confidence toward a flag reading A More Confident You"
            fill
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
