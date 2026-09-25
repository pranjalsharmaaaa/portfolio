"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { selectedWork, type SelectedWorkProject } from "@/lib/site-content";

/**
 * Same reveal shape as about-section.tsx's own `EASE`/`reveal`/
 * `reducedReveal` (duplicated here rather than imported/shared — see
 * that file's own note on why). A smaller `y` than About's own 32px:
 * these are compact cards, not full editorial rows, so the same size
 * entrance would read as oversized for what's moving.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * One card: image, then number + name (always visible), then a
 * description that exists in the DOM at all times but is invisible at
 * rest — `group-hover`/`group-focus-within` fade it in rather than
 * mounting/unmounting it, and its box has a *fixed* height (not
 * auto-driven by its own text) so revealing it never changes the
 * card's height or nudges its neighbors in the row. That fixed height
 * is what makes "all three cards visually identical in structure"
 * hold even though the three descriptions are different lengths.
 *
 * The whole card is one `<Link>` — image, name and description are
 * all inside the same anchor, not a card shell with a separate link
 * buried in it — so hover/focus/click all target one element with one
 * tab stop.
 */
function ProjectCard({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px -10% 0px" }} variants={variants}>
      <Link href={project.href} className="group block">
        {/* `overflow-hidden` + rounded corners live on this wrapper
            (not the `<Image>` itself) so the slight hover zoom clips
            to the rounded edge instead of spilling past it — same
            "clipped zoom" pattern as before, same radius token
            (`rounded-[1.75rem]`) as the cassette elsewhere in this
            codebase. `aspect-[4/3]` is a fixed container shared by all
            three cards regardless of each cover's own native ratio —
            `object-cover` fills it identically for every project, per
            spec ("EXACTLY the same dimensions and aspect ratio"). */}
        <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_40px_-22px_rgb(20_30_50/38%)]">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col items-start gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xs tracking-[0.1em]" style={{ color: "var(--paper-ink-muted)" }}>
              {project.number}
            </span>
            <h3 className="font-display text-xl leading-tight font-semibold" style={{ color: "var(--paper-ink)" }}>
              {project.title}
            </h3>
            <span
              aria-hidden="true"
              className="inline-block text-base opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:translate-x-0.5 group-focus-within:opacity-100"
              style={{ color: "var(--paper-ink)" }}
            >
              ↗
            </span>
          </div>

          {/* Fixed height, always rendered, opacity/translate-only —
              never `hidden`/height-driven — so it never reflows the
              card or its row. */}
          <p
            className="h-[4.25rem] translate-y-1 text-sm leading-relaxed opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
            style={{ color: "var(--paper-ink-muted)" }}
          >
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

/**
 * A compact 3/2/1-column grid — three uniform cards, not editorial
 * full-width rows (an earlier version of this section). Sits directly
 * after AboutSection on the same `--shore-solid` cream surface, no new
 * background, minimal padding so it reads as a tight continuation of
 * the page rather than a new section starting over.
 */
export function SelectedWork() {
  return (
    <section
      aria-label="Selected work"
      className="relative"
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-0 pb-16 sm:px-10 sm:pb-20 lg:px-12">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "var(--paper-ink)" }}>
          {selectedWork.heading}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 md:grid-cols-2 lg:grid-cols-3">
          {selectedWork.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
