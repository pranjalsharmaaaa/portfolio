"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
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
 * True viewport-width media query (not `prefersReducedMotion`'s kind of
 * capability check): gates the scroll-scrubbed cluster/separate effect
 * to the same `sm:` breakpoint (640px) where the cards row itself
 * switches from a single stacked column to a three-across row. Below
 * that, cards never move horizontally at all, so scrubbing them apart
 * would have nothing meaningful to animate and would only cost the
 * reader extra scroll distance for no visual payoff. Starts `false`
 * (matches the mobile, no-motion baseline) so there's nothing to
 * reconcile between server and first client render.
 */
function useIsDesktop(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/**
 * Each card's starting offset in the clustered stack (spec's own
 * sketch: card 2 on top and centered, card 1 low-left, card 3
 * low-right) — expressed as a scroll-progress-0 pose that eases to
 * exactly `x:"0%", y:0, rotate:0` at progress 1, i.e. to *no* transform
 * at all, so the grid's own `gap-7` (not this animation) is what's
 * actually on screen once scrolling finishes. `x` is a percentage of
 * each card's own width — not a fixed px amount — so "pull toward the
 * middle column" scales correctly however wide the card renders at any
 * viewport width. `z` keeps card 2 painting on top of the other two
 * while they're stacked underneath it, matching the sketch.
 */
const CARD_ENTRANCE: { x: string; y: number; rotate: number; z: number }[] = [
  { x: "58%", y: 14, rotate: -6, z: 20 },
  { x: "0%", y: -10, rotate: 3, z: 30 },
  { x: "-58%", y: 16, rotate: 5, z: 10 },
];

/**
 * One card's position is a direct, un-eased function of `progress` (a
 * scroll-fraction MotionValue owned by AboutSection, shared by all
 * three) — no spring, no time-based transition. That's deliberate: the
 * brief was for the cards' separation to be *continuously controlled*
 * by scroll position, which a spring or duration-based tween would
 * fight (either lagging behind the scroll or overshooting past it).
 * `useTransform` is called here, at this component's own top level —
 * not inline inside the parent's `.map()` — because a hook can't be
 * called a variable number of times per the rules of hooks; splitting
 * each card into its own component is what lets each one call
 * `useTransform` unconditionally while still reading a per-index
 * starting pose.
 */
function ScrollDrivenCard({
  index,
  progress,
  active,
  label,
  hint,
  variant,
}: {
  index: number;
  progress: MotionValue<number>;
  active: boolean;
  label: string;
  hint: string;
  variant: CardVariant;
}) {
  const entrance = CARD_ENTRANCE[index];
  const x = useTransform(progress, [0, 1], [entrance.x, "0%"]);
  const y = useTransform(progress, [0, 1], [entrance.y, 0]);
  const rotate = useTransform(progress, [0, 1], [entrance.rotate, 0]);

  return (
    <motion.div style={active ? { x, y, rotate, zIndex: entrance.z } : undefined}>
      <ExplorationCard label={label} hint={hint} variant={variant} />
    </motion.div>
  );
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

  /**
   * The cards' cluster→separate motion is driven by how far the reader
   * has scrolled through `cardsTrackRef`'s own box, not by whether it
   * has merely entered the viewport once. `offset: ["start start", "end
   * end"]` makes `cardsProgress` run 0→1 across exactly this track's
   * height: 0 the instant its top reaches the top of the viewport, 1
   * once its *bottom* reaches the viewport's *bottom* — not "end start"
   * (bottom reaching the viewport's top), which would need a full
   * extra viewport-height of *trailing* content after the track just
   * to make that scroll position reachable at all. The sticky child
   * pinned inside the track is short (roughly its own content height,
   * nowhere near a full viewport), so it naturally un-sticks — track
   * bottom scrolls above the pin point — well before progress reaches
   * 1 under this formula; the cards simply sit at their now-settled
   * rest pose for the remaining, still-pinned scroll, then scroll away
   * normally once unstuck, with nothing left to animate. This is the
   * same "tall box + sticky child" shape as the Hero/About reveal in
   * app/page.tsx, just an independent instance scoped to this row
   * alone (nothing here touches that file or its mechanism).
   *
   * `isDesktop` gates whether the track/sticky/transform machinery is
   * live at all: below `sm:` the cards already stack in a single
   * column with no horizontal separation to scrub, so the track
   * collapses to auto-height and every card renders at its plain
   * resting transform — no extra scroll distance spent for no visual
   * payoff. Reduced motion does the same, per spec: the final
   * separated layout, with no scroll-linked motion.
   */
  const cardsTrackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsTrackRef,
    offset: ["start start", "end end"],
  });
  const isDesktop = useIsDesktop("(min-width: 640px)");
  const cardsScrubActive = isDesktop && !prefersReducedMotion;

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
            uniform cards, each the same size and the same blue. They
            begin clustered/overlapping and separate into an exactly
            28px-gapped row as a direct, continuous function of scroll
            position through the track below — not a one-time entrance
            triggered by merely scrolling into view.

            This wrapper's own margin-top is the ONLY thing controlling
            the intro-paragraph → heading gap (the heading is its first
            child) — tightened slightly so the heading reads as
            connected to the intro rather than a separate block, without
            touching the heading → cards gap (a separate margin, further
            down on the scroll-track wrapper) or anything about the
            cards themselves. */}
        <div className="mt-4 flex flex-col items-center sm:mt-6">
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

          {/* The scroll track: real, extra document height (not just a
              wrapper) so there's actual scroll distance for
              `cardsProgress` to run across. Collapses to the sticky
              child's own natural height whenever the scrub is
              inactive (mobile / reduced motion), so it costs nothing
              in either scroll distance or layout in those cases.

              Margin-top here is what has to produce a VISIBLE gap
              matching the intro → heading gap above — not just an
              equal margin value, because on desktop (`cardsScrubActive`)
              the topmost card in the clustered stack (index 1, see
              CARD_ENTRANCE) renders `y: -10` at scroll progress 0: it's
              the only moment heading and cards are ever simultaneously
              on screen (past that point the sticky-pinned cards hold
              still while the heading itself scrolls away above), so
              that pre-scroll cluster pose is the one that actually has
              to match, not the fully-settled position the heading can
              no longer be seen next to. Below `sm:`, cardsScrubActive
              is always false (no clustering, no y offset ever
              applied), so `mt-4` there reuses the intro → heading gap's
              own token directly, unmodified.

              `sm:mt-10` (40px) is `sm:mt-6` (24px, the intro → heading
              token) plus what card 1's own `y: -10` rotate+scale pose
              (CARD_ENTRANCE below) visually eats into it at progress 0
              — measured directly (not hand-derived from the raw -10,
              since the card's own rotation/scale at that pose grows
              its rendered bounding box a little beyond a plain
              translate): the visible gap above the cluster's highest
              point comes out to ~24.5px this way, matching within
              well under a pixel. */}
          <div
            ref={cardsTrackRef}
            className="mt-4 w-full sm:mt-10"
            style={{ height: cardsScrubActive ? "160vh" : undefined }}
          >
            {/* Pinned for the track's full height (bar the sliver equal
                to its own height, right at the very end): the cards
                stay put on screen while the reader scrolls through that
                distance, exactly like Hero stays pinned under About in
                app/page.tsx. Static (no sticky, no offset) when the
                scrub is inactive, so mobile/reduced-motion keep the
                plain in-flow stacked layout they already had.

                `pb-10`, not `py-10`: only the bottom half of the old
                padding is kept (preserving the existing cards →
                philosophy gap untouched); the top half is dropped
                because it was stacking on top of this wrapper's own
                margin-top above, which is what created the mismatch
                with the intro → heading gap in the first place. */}
            <div className={cardsScrubActive ? "sticky top-0 flex justify-center pb-10" : "flex justify-center"}>
              {/* gap-7 = 1.75rem = exactly 28px, the spec's required
                  final desktop gap between card edges — the grid alone
                  decides width/height/gap for every card; the scroll
                  transform below only ever offsets *away* from that
                  resting position, reaching precisely x:"0%"/y:0/
                  rotate:0 (i.e. no transform, the grid's own geometry
                  fully in charge) exactly when cardsProgress reaches 1. */}
              <div className="grid w-full max-w-[44rem] grid-cols-1 gap-7 sm:grid-cols-3">
                {explorationChips.map((card, i) => (
                  <ScrollDrivenCard
                    key={card.label}
                    index={i}
                    progress={cardsProgress}
                    active={cardsScrubActive}
                    label={card.label}
                    hint={card.hint}
                    variant={CARD_VARIANTS[i]}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The closing punch — centered, bold, and compact. A visibly
            larger gap than the one above the cards (spec: "slightly
            more vertical space after the cards"), with the foreground
            feeling coming from stacking order + a soft lifted shadow
            on the type itself, not from crowding it against the cards
            with a negative margin. Sits in normal flow directly after
            the cards' scroll track, so it scrolls into view right as
            the cluster→separate scrub finishes. No card/container
            behind it — a manifesto line, not a paragraph in a box. */}
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
