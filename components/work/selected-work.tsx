"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { selectedWork, type SelectedWorkProject } from "@/lib/site-content";

/**
 * Same reveal shape as about-section.tsx's own `EASE`/`reveal`/
 * `reducedReveal` (duplicated here rather than imported/shared — see
 * that file's own note on why).
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
 * The one featured project (Stack Up): centered, its image the
 * dominant visual element (~72% of the section's content width on
 * `md:` and up; full width on mobile, where it just stacks first).
 * Otherwise identical mechanics to `SecondaryCard` below — same fixed-
 * height, opacity-only description reveal, same arrow, same hover
 * scale, same single-`<Link>`-is-the-whole-card structure — just
 * larger and center-aligned instead of left-aligned.
 */
function FeaturedProject({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      className="flex flex-col items-center"
    >
      <Link href={project.href} className="group flex w-full flex-col items-center">
        <div className="w-full overflow-hidden rounded-[1.75rem] shadow-[0_32px_64px_-28px_rgb(20_30_50/42%)] md:w-[72%]">
          {/* This crop's own native ratio (see site-content.ts's note
              on how `featured.image` was made) — `object-cover` here
              never has anything to actually crop, since the container
              ratio already matches the image exactly. */}
          <div className="relative aspect-[1004/941] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 72vw, 100vw"
              priority
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] group-focus-within:scale-[1.02]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center gap-1 text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-xs tracking-[0.1em]" style={{ color: "var(--paper-ink-muted)" }}>
              {project.number}
            </span>
            <h3 className="font-display text-2xl leading-tight font-semibold sm:text-3xl" style={{ color: "var(--paper-ink)" }}>
              {project.title}
            </h3>
            <span
              aria-hidden="true"
              className="inline-block text-lg opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:translate-x-0.5 group-focus-within:opacity-100"
              style={{ color: "var(--paper-ink)" }}
            >
              ↗
            </span>
          </div>

          <p
            className="h-[4.25rem] max-w-md translate-y-1 text-sm leading-relaxed opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
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
 * One of the two smaller projects below the featured one — image, then
 * number + name (always visible), then a description that exists in
 * the DOM at all times but is invisible at rest. Its box has a *fixed*
 * height (not auto-driven by its own text) so revealing it never
 * changes the card's height or nudges its sibling in the row.
 */
function SecondaryCard({ project }: { project: SelectedWorkProject }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10% 0px -10% 0px" }} variants={variants}>
      <Link href={project.href} className="group block">
        <div className="overflow-hidden rounded-[1.75rem] shadow-[0_20px_40px_-22px_rgb(20_30_50/38%)]">
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
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
 * Stack Up featured, centered and large; Sales Coach and YANA follow
 * as two equal, smaller cards below it — not three equal cards in a
 * row (an earlier version of this section). Sits directly after
 * AboutSection on the same `--shore-solid` cream surface, no new
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
        <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: "var(--paper-ink)" }}>
          {selectedWork.heading}
        </p>

        <div className="mt-6 sm:mt-8">
          <FeaturedProject project={selectedWork.featured} />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2">
          {selectedWork.secondary.map((project) => (
            <SecondaryCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
