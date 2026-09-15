"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { about, explorationChips } from "@/lib/site-content";
import { AboutCloud } from "@/components/about/about-cloud";
import { ExplorationCard, type CardVariant } from "@/components/about/exploration-card";

const CARD_VARIANTS: CardVariant[] = ["storytelling", "motion", "empathy"];
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
 * Per-card entrance variants for the exploration row (spec: cards begin
 * closer together / slightly clustered, then animate outward into
 * their final row — never flying in from off-screen, never changing
 * the grid's own layout). Built as transform/opacity only, so the
 * grid's 1/3-column layout — and its exact 28px gap, which comes
 * entirely from the grid's own `gap-7`, not from this animation — is
 * reserved from the very first paint. The "visible" target is always
 * `x: "0%"` / no transform at all: the grid alone ever decides each
 * card's resting x/y, this animation only offsets *away* from that on
 * the way in. All three cards' text stays in the accessibility tree
 * throughout regardless of where the animation currently is.
 *
 * The middle card (index 1) settles in first with a plain reveal; the
 * two side cards start translated toward the middle's own slot (as if
 * clustered against it) and spread out into their final positions with
 * a small stagger. Kept short (well under half a second, end to end)
 * so the row reaches its real, non-overlapping grid position almost as
 * soon as it scrolls into view — this row can become visible mid-scroll
 * (see AboutSection's own note on the sticky reveal above), so a long
 * settle time left a wide window where a reader arriving mid-animation
 * would see the clustered start as if it were the resting layout.
 */
function cardVariants(index: number, prefersReducedMotion: boolean | null): Variants {
  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.22, delay: index * 0.04 } },
    };
  }
  if (index === 1) {
    return {
      hidden: { opacity: 0, y: 12, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE } },
    };
  }
  const fromX = index === 0 ? "58%" : "-58%";
  const delay = index === 0 ? 0.03 : 0.07;
  return {
    hidden: { opacity: 0, x: fromX, scale: 0.9 },
    visible: { opacity: 1, x: "0%", scale: 1, transition: { duration: 0.3, ease: EASE, delay } },
  };
}

/**
 * The foreground layer that rises up and over the hero's sky while
 * scrolling. The scroll-coupled part of that (Hero pinned via `sticky`
 * for one Hero-height of scrolling while this section's own
 * `margin-top: -1 * HeroHeight` pulls it up to meet it) lives in
 * app/page.tsx, not here — this component only needs `z-10` to make
 * sure it paints in front of Hero wherever the two overlap (Hero's own
 * `isolate` + `overflow-hidden` only clip Hero's *own* children, so a
 * later, higher-stacking sibling rendered at the same screen
 * coordinates simply paints over it regardless). `AboutCloud` — an
 * absolutely positioned child anchored to this section's own top edge
 * — is what makes that overlap read as an organic cloud mass rather
 * than a straight edge. The cloud belongs to About, not to the hero:
 * it lives inside this section, moves with it (including the page.tsx
 * margin that repositions the section itself), and is the section's
 * own top edge, not a separate component sitting between the two.
 *
 * Deliberately has no heading — no "A little about me.", no generic
 * substitute. The section introduces itself through composition and a
 * deliberate size hierarchy instead of a labeled header: the intro
 * line is a small, quiet opener; the exploration cards are the
 * section's one playful visual moment; the closing statement is the
 * section's other loud moment.
 *
 * Background and text are fixed "paper" tokens (--shore-solid /
 * --paper-ink), not the themed --surface/--ink pair used elsewhere:
 * this section is a continuation of the hero's own sky, not a panel
 * that should flip navy in dark mode. The exploration cards are the
 * one deliberate exception — they use --card-blue, which *does* switch
 * with the theme (a light, airy blue by day; a denser, richer one at
 * night).
 */
export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedReveal : reveal;
  const viewport = { once: true, margin: "-15% 0px -15% 0px" } as const;

  return (
    <section
      id="about"
      aria-label="About"
      className="relative z-10"
      style={{ background: "var(--shore-solid)", color: "var(--paper-ink)" }}
    >
      <AboutCloud />

      {/* Top padding stays deliberately small: the cloud above is what
          separates the hero from this content, so About shouldn't add
          a second, redundant gap on top of it. */}
      <div className="mx-auto flex w-full max-w-[100rem] flex-col px-6 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-12 lg:px-12">
        {/* A quiet, centered opener — a concise personal introduction,
            not the section's headline. Sized and margined to read as
            one compact editorial composition with the label/cards/
            belief below it, not four separately-spaced sections
            requiring their own scroll. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display mx-auto max-w-[28rem] text-center text-[clamp(0.95rem,1.3vw,1.15rem)] leading-[1.5] font-normal"
          style={{ color: "var(--paper-ink-muted)" }}
        >
          {about.intro}
        </motion.p>

        {/* Exploration — a small centered label leading into three
            uniform cards, each the same size and the same blue,
            clustered together at rest and spreading into an exactly
            28px-gapped row as they come into view. */}
        <div className="mt-6 flex flex-col items-center sm:mt-8">
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

          {/* gap-7 = 1.75rem = exactly 28px, the spec's required
              final desktop gap between card edges — the grid's own gap
              is the single source of truth for that spacing, never the
              entrance animation. max-w-[44rem] (down from 52rem) is
              what shrinks the cards themselves: three equal grid
              columns divide whatever width this box has, so narrowing
              the box narrows every card by the same amount without
              touching the grid/gap mechanics. */}
          <div className="mt-5 grid w-full max-w-[44rem] grid-cols-1 gap-7 sm:mt-6 sm:grid-cols-3">
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

        {/* The closing punch — centered, bold, and compact. Still a
            visibly larger gap than the one above the cards (spec:
            "slightly more vertical space after the cards"), with the
            foreground feeling coming from stacking order + a soft
            lifted shadow on the type itself, not from crowding it
            against the cards with a negative margin — just both the
            gap and the type scaled down together with everything else
            in this section so the whole composition (intro through
            belief) settles inside one desktop viewport. No
            card/container behind it — a manifesto line, not a
            paragraph in a box. */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={variants}
          className="font-display relative z-10 mx-auto mt-8 max-w-[30rem] text-center text-[clamp(1.15rem,1.8vw,1.5rem)] leading-[1.35] font-bold italic sm:mt-10"
          style={{ textShadow: "0 18px 32px rgb(23 23 23 / 12%)" }}
        >
          {about.belief}
        </motion.p>
      </div>
    </section>
  );
}
