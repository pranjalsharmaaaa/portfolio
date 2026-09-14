"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about, explorationChips } from "@/lib/site-content";
import { ExplorationCard, type CardVariant } from "@/components/about/exploration-card";

const CARD_VARIANTS: CardVariant[] = ["storytelling", "motion", "ai"];
const EASE = [0.22, 1, 0.36, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const reducedReveal: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Per-card entrance variants for the exploration row (spec: "Initial:
 * [ Prototyping + Motion ]" — the middle card establishes the section
 * first, then Storytelling and Design for AI emerge from behind/around
 * it into a clean aligned row). Built as transform/opacity only (never
 * `display`), so the grid's own 1/3-column layout is reserved from the
 * very first paint — no layout jump — and all three cards' text stays
 * in the accessibility tree throughout for keyboard/screen-reader
 * users regardless of where the animation currently is.
 *
 * The middle card (index 1) settles in first with a plain reveal; the
 * two side cards start translated toward the middle's own position (as
 * if tucked behind it) and slide out into their slots with a small
 * stagger — "emerging from behind", not flying in from off-screen.
 */
function cardVariants(index: number, prefersReducedMotion: boolean | null): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.4, delay: index * 0.08 } },
    };
  }
  if (index === 1) {
    return {
      hidden: { opacity: 0, y: 18, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
    };
  }
  const fromX = index === 0 ? "65%" : "-65%";
  const delay = index === 0 ? 0.14 : 0.26;
  return {
    hidden: { opacity: 0, x: fromX, scale: 0.88 },
    visible: { opacity: 1, x: "0%", scale: 1, transition: { duration: 0.65, ease: EASE, delay } },
  };
}

/**
 * What the cloud transition leads into — one continuous story, each
 * piece revealed in view rather than all at once: the intro statement,
 * then the exploration label, then the three cards emerging from
 * behind one another, then the closing belief.
 *
 * Deliberately has no heading — no "A little about me.", no generic
 * substitute. The section introduces itself through composition and a
 * deliberate size hierarchy instead of a labeled header: the intro
 * line is a small, quiet opener; the exploration cards are the
 * section's one playful visual moment; the closing statement is the
 * section's other loud moment — pulled up to overlap the cards above
 * it (a negative margin + higher stacking order, not a card or
 * container) so it reads as coming forward rather than sitting inside
 * a normal stacked block.
 *
 * Background and text are fixed "paper" tokens (--shore-solid /
 * --paper-ink), not the themed --surface/--ink pair used elsewhere:
 * this section is a continuation of the hero's own cloud transition,
 * not a panel that should flip navy in dark mode. The exploration
 * cards are the one deliberate exception — they use --card-blue, which
 * *does* switch with the theme (spec: lighter airy blue by day, denser
 * richer blue by night).
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
            not the section's headline. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display mx-auto max-w-[34rem] text-center text-[clamp(1.05rem,1.7vw,1.5rem)] leading-[1.65] font-normal"
          style={{ color: "var(--paper-ink-muted)" }}
        >
          {about.intro}
        </motion.p>

        {/* Exploration — a small centered label leading into three
            uniform cards, each the same size and the same blue,
            emerging from behind one another rather than all at once. */}
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

          <div className="mt-8 grid w-full max-w-[52rem] grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-3 sm:gap-6">
            {explorationChips.map((card, i) => (
              <motion.div
                key={card.label}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={cardVariants(i, prefersReducedMotion)}
              >
                <ExplorationCard label={card.label} hint={card.hint} variant={CARD_VARIANTS[i]} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* The closing punch — centered, bold, and compact, pulled up
            with a negative margin so it overlaps the cards' own bottom
            edge and sits at a higher stacking order: typography coming
            forward into the composition rather than a text block
            stacked underneath it. No card/container behind it — the
            layering is purely position + z-index + a soft lifted
            shadow on the type itself. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display relative z-10 mx-auto -mt-2 max-w-[40rem] text-center text-[clamp(1.85rem,3.6vw,2.9rem)] leading-[1.25] font-bold italic sm:-mt-3"
          style={{ textShadow: "0 18px 32px rgb(23 23 23 / 12%)" }}
        >
          {about.belief}
        </motion.p>
      </div>
    </section>
  );
}
