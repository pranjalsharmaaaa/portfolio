import Image from "next/image";
import { stackupProblem } from "@/lib/stackup-content";
import { Container, SECTION_Y_COMPACT } from "@/components/stackup/container";

export function ProblemSection() {
  return (
    <section
      className={`relative ${SECTION_Y_COMPACT}`}
      style={{ background: "var(--stackup-bg)" }}
      aria-label="Understanding the problem"
    >
      <Container className="flex flex-col gap-8 sm:gap-4">
        <div className="w-full">
          <p className="text-xl font-bold tracking-wide uppercase sm:text-2xl lg:text-3xl" style={{ color: "var(--stackup-label)" }}>
            {stackupProblem.label}
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupProblem.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--stackup-ink)" }}>
            {stackupProblem.brief}
          </p>
        </div>

        <div className="relative mx-auto aspect-[1112/723] w-full max-w-md">
          <Image
            src="/images/stackup/illustration-stressed.webp"
            alt="Illustration: a person overwhelmed at a laptop, surrounded by speech bubbles of financial app names and confusing terms, captioned 'Too much information, so little clarity'"
            fill
            sizes="(min-width: 640px) 28rem, 90vw"
            quality={95}
            className="object-contain"
          />
        </div>

        <div className="flex w-full flex-col gap-4">
          {stackupProblem.paragraphs.map((segments, i) => (
            <p key={i} className="text-base leading-relaxed sm:text-lg" style={{ color: "var(--stackup-ink)" }}>
              {segments.map((segment, j) => (
                <span key={j} className={segment.bold ? "font-bold" : undefined}>
                  {segment.text}
                </span>
              ))}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
