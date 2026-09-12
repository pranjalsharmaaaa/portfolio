"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about, explorationChips } from "@/lib/site-content";
import { ExplorationChip, type ChipVariant } from "@/components/about/exploration-chip";

const CHIP_VARIANTS: ChipVariant[] = ["storytelling", "motion", "empathy"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const chipContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/**
 * What the cloud transition leads into — one continuous story
 * (spec §14), each piece revealed in view rather than all at once:
 * the intro statement, then the exploration label, then the three
 * chips staggered, then the closing belief. `whileInView` + `viewport
 * ={{ once: true }}` is the same "reveal on scroll, never re-trigger"
 * idiom already used sparingly elsewhere in this codebase's motion
 * language — no custom scroll math needed here (unlike the cloud
 * transition itself, which genuinely is scroll-position-linked).
 *
 * Deliberately has no heading — no "A little about me.", no generic
 * substitute. The section introduces itself through the intro line's
 * own scale (a 42-64px editorial statement, not a body paragraph) and
 * an asymmetric composition, rather than a labeled header sitting
 * above a small centered block of text.
 */
export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;
  const viewport = { once: true, margin: "-15% 0px -15% 0px" } as const;

  return (
    <section
      id="about"
      aria-label="About"
      className="relative"
      style={{ background: "var(--surface)", color: "var(--ink)" }}
    >
      {/* Same outer grid as the hero (px-6 sm:px-10 lg:px-12, same
          max-width) so the intro statement's left edge lands exactly
          under "Designer who"'s — the continuation the hero's own
          cloud transition promises, not a differently-aligned section
          bolted on after it. */}
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 py-24 sm:px-10 sm:py-32 lg:px-12">
        {/* The intro line carries the weight a heading normally would —
            large, confident, left-aligned, width-constrained for a
            controlled line length rather than running the section's
            full measure like a body paragraph would. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display max-w-[46rem] text-[clamp(2.625rem,4.5vw,4rem)] leading-[1.15] font-semibold"
        >
          {about.intro}
        </motion.p>

        {/* Indented relative to the intro line above — an asymmetric
            second beat rather than a second column repeating the same
            left edge, so the composition has more than one alignment
            doing work. */}
        <div className="mt-20 flex flex-col gap-6 sm:mt-28 sm:ml-[8%] lg:ml-[14%]">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--ink-quiet)" }}
          >
            {about.exploringLabel}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedReveal : chipContainer}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            {explorationChips.map((chip, i) => (
              <motion.div key={chip.label} variants={variants}>
                <ExplorationChip label={chip.label} hint={chip.hint} variant={CHIP_VARIANTS[i]} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The closing punch — pushed to the right of the intro
            statement's edge (the opposite direction from the chips'
            indent above) so the section resolves on a different beat
            than it opened on, rather than settling back onto one
            centered column. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display mt-24 ml-auto max-w-[36rem] text-right text-[clamp(1.75rem,3vw,2.5rem)] leading-snug font-medium italic sm:mt-32"
        >
          {about.belief.replace(". ", ".\n")
            .split("\n")
            .map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
        </motion.p>
      </div>
    </section>
  );
}
