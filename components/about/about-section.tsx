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
 * substitute. The section introduces itself through composition and a
 * deliberate size hierarchy instead of a labeled header: the intro
 * line is a secondary, thoughtful opener (~42-58px); the exploration
 * label is the smallest thing on the page; the closing statement is
 * the section's one loud moment (~58-80px) — scale doing the work a
 * heading normally would, at the *end* of the section rather than the
 * start of it.
 *
 * Background and text are fixed "paper" tokens (--shore-solid /
 * --paper-ink), not the themed --surface/--ink pair used elsewhere:
 * this section is a continuation of the hero's own fixed-cream cloud,
 * not a panel that should flip navy in dark mode. The theme toggle
 * keeps working for the hero above; About stays one warm, legible page
 * either way.
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
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      {/* Same outer grid as the hero (px-6 sm:px-10 lg:px-12, same
          max-width) so the intro statement's left edge lands exactly
          under "Designer who"'s — the continuation the hero's own
          cloud transition promises, not a differently-aligned section
          bolted on after it. Top padding is deliberately small: the
          cloud transition itself is what separates the hero from this
          content, so About shouldn't add a second, redundant gap on
          top of it. */}
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-6 pb-20 sm:px-10 sm:pt-8 sm:pb-28 lg:px-12">
        {/* A thoughtful introduction, not the headline — secondary in
            scale to the closing statement below, sized like a
            confident opening line rather than the section's main
            event. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display max-w-[50rem] text-[clamp(1.75rem,3.2vw,2.9rem)] leading-[1.35] font-medium"
        >
          {about.intro}
        </motion.p>

        {/* Indented relative to the intro line above — an asymmetric
            second beat rather than a second column repeating the same
            left edge, so the composition has more than one alignment
            doing work. An editorial numbered list, not a row of chips:
            no pills, no borders, no card backgrounds. */}
        <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:ml-[8%] lg:ml-[14%]">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={variants}
            className="text-xs font-semibold tracking-[0.25em] uppercase"
            style={{ color: "var(--paper-ink-muted)" }}
          >
            {about.exploringLabel}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={prefersReducedMotion ? reducedReveal : chipContainer}
            className="flex flex-col gap-2.5 sm:gap-3"
          >
            {explorationChips.map((chip, i) => (
              <motion.div key={chip.label} variants={variants}>
                <ExplorationChip
                  label={chip.label}
                  hint={chip.hint}
                  variant={CHIP_VARIANTS[i]}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The closing punch — the strongest, largest typographic
            moment in the section, pushed to the right of the intro
            statement's edge (the opposite direction from the list's
            indent above) so the section resolves on a different beat
            than it opened on. No quotation marks, no card, no quote
            icon — a manifesto line, not a testimonial. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display mt-10 ml-auto max-w-[42rem] text-right text-[clamp(2.25rem,6vw,5rem)] leading-[1.1] font-semibold italic sm:mt-14"
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
