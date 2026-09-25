"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { selectedWork, type SelectedWorkProject } from "@/lib/site-content";

/**
 * Same reveal shape as about-section.tsx's own `EASE`/`reveal`/
 * `reducedReveal` (duplicated here rather than imported/shared —
 * they're small, private constants in that file, not something this
 * section should couple itself to just to avoid repeating three
 * lines). Kept identical on purpose: rows should fade up the same way
 * the intro/heading/philosophy text already does, not introduce a new
 * animation idea into a page that already has one.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * One large editorial row: a dominant product image (~60% of the row
 * on desktop) beside a deliberately spare text block (number, title,
 * one line, a case-study link) — never a card, never boxed. The whole
 * row is a single `<Link>`, not a link nested inside a clickable card,
 * so the entire row — image included — is one clickable target with
 * one focus stop.
 *
 * `imagePosition` only ever changes which grid column the image lands
 * in on desktop (`md:order-*`); the DOM order is always image-then-text,
 * which is exactly the order mobile needs too (image first, full width,
 * then the text stack) — no separate mobile markup, one layout that
 * degrades correctly.
 */
function ProjectRow({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;
  const imageLeft = project.imagePosition === "left";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      <Link
        href={project.href}
        className="group grid grid-cols-1 items-center gap-x-10 gap-y-6 md:grid-cols-[3fr_2fr] md:gap-x-12 lg:gap-x-16"
      >
        {/* `overflow-hidden` + rounded corners on this wrapper (not the
            `<Image>` itself) is what lets the image scale slightly on
            hover without spilling past the rounded edge — the classic
            "clipped zoom" pattern, one radius value shared with the
            cassette elsewhere in this codebase (`rounded-[1.75rem]`)
            for a consistent "premium rounded surface" language. */}
        <div
          className={`overflow-hidden rounded-[1.75rem] shadow-[0_28px_56px_-28px_rgb(20_30_50/40%)] ${
            imageLeft ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* All three covers share ~the same native aspect ratio
              (1672:941 / 1671:941 — within a fraction of a percent of
              each other), so one fixed ratio here shows every image at
              its own true proportions with no visible crop or
              stretch — `object-cover` never needs to trim anything
              meaningful off any of the three. */}
          <div className="relative aspect-[1672/941] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className={`flex flex-col items-start gap-3 ${imageLeft ? "md:order-2" : "md:order-1"}`}>
          <span
            className="font-display text-sm tracking-[0.15em]"
            style={{ color: "var(--paper-ink-muted)" }}
          >
            {project.number}
          </span>

          <h3
            className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-semibold"
            style={{ color: "var(--paper-ink)" }}
          >
            {project.title}
          </h3>

          <p
            className="max-w-sm text-base leading-relaxed"
            style={{ color: "var(--paper-ink-muted)" }}
          >
            {project.description}
          </p>

          <span
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            View case study
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * Three large full-width rows, not a card grid — a grid built for four
 * projects would leave this one's three feeling like a gap, not a
 * choice. Sits directly after AboutSection on the same `--shore-solid`
 * cream surface (no new background, no seam), so the page reads as one
 * continuous "paper" world from the intro through here rather than a
 * new section starting over visually.
 */
export function SelectedWork() {
  return (
    <section
      aria-label="Selected work"
      className="relative"
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-4 pb-20 sm:px-10 sm:pb-28 lg:px-12">
        <p
          className="text-xs font-semibold tracking-[0.25em] uppercase"
          style={{ color: "var(--paper-ink-muted)" }}
        >
          {selectedWork.heading}
        </p>

        {/* Generous, deliberately uneven-feeling gaps between rows —
            each project reads as its own piece of work, not a row in a
            table. */}
        <div className="mt-16 flex flex-col gap-24 sm:mt-20 sm:gap-32 lg:gap-40">
          {selectedWork.projects.map((project) => (
            <ProjectRow key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
