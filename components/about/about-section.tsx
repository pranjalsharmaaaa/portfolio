"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about, explorationChips } from "@/lib/site-content";
import { ExplorationChip, type ChipVariant } from "@/components/about/exploration-chip";

const CHIP_VARIANTS: ChipVariant[] = ["storytelling", "motion", "empathy"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
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
 * (spec §12), each piece revealed in view rather than all at once:
 * the heading, then the one-sentence intro, then the exploration
 * label, then the three chips staggered, then the closing belief.
 * `whileInView` + `viewport={{ once: true }}` is the same "reveal on
 * scroll, never re-trigger" idiom already used sparingly elsewhere in
 * this codebase's motion language — no custom scroll math needed here
 * (unlike the cloud transition itself, which genuinely is scroll-
 * position-linked).
 */
export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;
  const viewport = { once: true, margin: "-15% 0px -15% 0px" } as const;

  return (
    <section
      id="about"
      aria-label="About"
      className="relative px-6 py-20 sm:px-10 sm:py-28 lg:px-12"
      style={{ background: "var(--surface)", color: "var(--ink)" }}
    >
      <div className="mx-auto flex w-full max-w-[52rem] flex-col gap-16 sm:gap-20">
        <div className="flex flex-col gap-5">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="font-display text-4xl font-semibold sm:text-5xl"
          >
            {about.eyebrow}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            transition={{ delay: 0.1 }}
            className="max-w-[38rem] text-lg leading-relaxed sm:text-xl"
            style={{ color: "var(--ink-muted)" }}
          >
            {about.intro}
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
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

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          transition={{ delay: 0.15 }}
          className="font-display max-w-[34rem] py-4 text-2xl leading-snug font-medium italic sm:text-3xl"
        >
          &ldquo;{about.belief}&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
