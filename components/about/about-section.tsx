"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about, explorationChips } from "@/lib/site-content";
import { ExplorationCard, type CardVariant } from "@/components/about/exploration-card";

const CARD_VARIANTS: CardVariant[] = ["storytelling", "motion", "empathy"];

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const cardContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

/**
 * What the cloud transition leads into — one continuous story
 * (spec §14), each piece revealed in view rather than all at once:
 * the intro statement, then the exploration label, then the three
 * cards staggered, then the closing belief.
 *
 * Deliberately has no heading — no "A little about me.", no generic
 * substitute. The section introduces itself through composition and a
 * deliberate size hierarchy instead of a labeled header: the intro
 * line is a small, quiet opener; the exploration cards are the
 * section's one playful visual moment; the closing statement is the
 * section's other loud moment — smaller than it once was, but still
 * the boldest type on the page, and pulled up to overlap the cards
 * above it (a negative margin + higher stacking order, not a card or
 * container) so it reads as coming forward rather than sitting inside
 * a normal stacked block.
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
      {/* Top padding stays deliberately small: the cloud transition
          itself is what separates the hero from this content, so About
          shouldn't add a second, redundant gap on top of it. */}
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-4 pb-16 sm:px-10 sm:pt-6 sm:pb-20 lg:px-12">
        {/* A quiet, centered opener — a concise personal introduction,
            not the section's headline. Roughly half the size of the
            hierarchy's loudest moment below, and centered rather than
            pinned to the hero's left edge, so it reads as a calm first
            beat rather than a second hero statement. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display mx-auto max-w-[34rem] text-center text-[clamp(1rem,1.6vw,1.4rem)] leading-[1.65] font-normal"
          style={{ color: "var(--paper-ink-muted)" }}
        >
          {about.intro}
        </motion.p>

        {/* Exploration — a small centered label leading into three
            playful, tilted cards, replacing the earlier numbered list.
            Cards get generous room to breathe (padding-block absorbs
            their rotation/hover lift) without a large empty section
            gap on either side of them. */}
        <div className="mt-10 flex flex-col items-center sm:mt-14">
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
            variants={prefersReducedMotion ? reducedReveal : cardContainer}
            className="mt-8 flex w-full max-w-full snap-x snap-mandatory flex-nowrap justify-start gap-5 overflow-x-auto px-6 py-6 sm:mt-10 sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 sm:py-8"
          >
            {explorationChips.map((card, i) => (
              <motion.div key={card.label} variants={variants} className="snap-center">
                <ExplorationCard
                  label={card.label}
                  hint={card.hint}
                  variant={CARD_VARIANTS[i]}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The closing punch — centered, bold, and noticeably more
            compact than before, but pulled up with a negative margin so
            it overlaps the cards' own bottom edge and sits at a higher
            stacking order: typography coming forward into the
            composition rather than a text block stacked underneath it.
            No card/container behind it — the layering is purely
            position + z-index + a soft lifted shadow on the type itself. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display relative z-10 mx-auto -mt-2 max-w-[38rem] text-center text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.2] font-bold italic sm:-mt-3"
          style={{ textShadow: "0 18px 32px rgb(23 23 23 / 12%)" }}
        >
          {about.belief}
        </motion.p>
      </div>
    </section>
  );
}
