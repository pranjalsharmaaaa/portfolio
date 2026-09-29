import { stackupQuestion } from "@/lib/stackup-content";

/**
 * The concentric-rings background from the reference is a flat radial
 * gradient of the page's own background color at varying opacity, not
 * an image — reproduced directly with CSS rather than as an asset.
 */
export function QuestionSection() {
  return (
    <section
      className="relative overflow-hidden"
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

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center sm:px-10 sm:py-32">
        <p className="text-sm font-bold tracking-wide uppercase" style={{ color: "var(--stackup-label)" }}>
          {stackupQuestion.label}
        </p>
        <p className="text-3xl sm:text-4xl" style={{ color: "var(--stackup-ink)" }}>
          {stackupQuestion.lineOne}
        </p>
        <p className="text-4xl font-extrabold sm:text-6xl" style={{ color: "var(--stackup-green)" }}>
          {stackupQuestion.lineTwo}
        </p>
      </div>
    </section>
  );
}
