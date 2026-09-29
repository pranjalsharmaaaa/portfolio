import { stackupQuestion } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";

/**
 * The concentric-rings background from the reference is a flat radial
 * gradient of the page's own background color at varying opacity, not
 * an image — reproduced directly with CSS rather than as an asset.
 */
export function QuestionSection() {
  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
      style={{ background: "var(--stackup-bg)" }}
      aria-label="It all started with a question"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "repeating-radial-gradient(circle, rgb(0 0 0 / 3%) 0, rgb(0 0 0 / 3%) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <Container className="relative flex flex-col items-center gap-6 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-bold tracking-wide uppercase" style={{ color: "var(--stackup-label)" }}>
            {stackupQuestion.label}
          </p>
          <p className="mt-6 text-3xl sm:text-4xl" style={{ color: "var(--stackup-ink)" }}>
            {stackupQuestion.lineOne}
          </p>
          <p className="mt-2 text-4xl font-extrabold sm:text-6xl" style={{ color: "var(--stackup-green)" }}>
            {stackupQuestion.lineTwo}
          </p>
        </div>
      </Container>
    </section>
  );
}
