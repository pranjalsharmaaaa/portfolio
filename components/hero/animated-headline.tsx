"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  headlineIntervalMs,
  headlineStaticSentence,
  headlineTransitionMs,
  headlineWords,
} from "@/lib/site-content";

const DESIGNER_WHO = "Designer who";

const containerVariants: Variants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.022, delayChildren: 0.01 } },
  exit: { transition: { staggerChildren: 0.016, staggerDirection: -1 } },
};

const letterVariants: Variants = {
  initial: { opacity: 0, y: 28, rotate: -6 },
  animate: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -22,
    rotate: 5,
    transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
  },
};

const reducedContainerVariants: Variants = { initial: {}, animate: {}, exit: {} };

const reducedLetterVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: headlineTransitionMs / 2000 } },
  exit: { opacity: 0, transition: { duration: headlineTransitionMs / 2000 } },
};

/**
 * Per-letter swap animation. Each rendered letter also carries a
 * plain-CSS hover rule (see globals.css) that only ever touches
 * `color`/`font-style`/`font-family`, never `transform`, specifically
 * so it can't collide with the `transform` these variants are actively
 * animating on the very same elements (an animated property beats a
 * stylesheet rule for that property for as long as the animation holds
 * it — the exact bug already found twice elsewhere in this file's
 * history). `letterClassName` lets the two callers below hand this the
 * same stagger animation while hooking two different hover treatments
 * to it: `.letter-char` (per-letter, "Designer who") vs
 * `.cycling-letter` (whole-word, the cycling word).
 */
function Letters({
  word,
  variants,
  letterClassName,
}: {
  word: string;
  variants: Variants;
  letterClassName: string;
}) {
  return (
    <>
      {word.split("").map((ch, i) =>
        ch === " " ? (
          <motion.span
            key={i}
            variants={variants}
            aria-hidden="true"
            style={{ display: "inline-block", width: "0.32em" }}
          />
        ) : (
          <motion.span key={i} variants={variants} className={letterClassName}>
            {ch}
          </motion.span>
        ),
      )}
    </>
  );
}

/**
 * Keyboard focus and touch can't trigger a per-letter `:hover`, so
 * both flip one `active` flag instead, which a CSS descendant rule
 * (`.all-active .letter-char`) applies to every letter at once — a
 * whole-line fallback, not a literal per-letter equivalent, because
 * making every character its own tab stop would turn one heading into
 * dozens of stops for a purely decorative flourish.
 */
function useKeyboardTouchFallback() {
  const [active, setActive] = useState(false);
  const touchTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

  return {
    active,
    onFocus: () => setActive(true),
    onBlur: () => setActive(false),
    onTouchStart: () => {
      setActive(true);
      window.clearTimeout(touchTimer.current);
      touchTimer.current = window.setTimeout(() => setActive(false), 1400);
    },
  };
}

/**
 * "Designer who" — every letter is its own hover target (plain CSS
 * `:hover` on `.letter-char`, no JS in the loop): only the letter
 * under the cursor turns the accent color and italic, the rest stay
 * white and upright. Color is set once here and inherited by every
 * letter, so "at rest" needs no per-letter styling at all — only the
 * hovered one overrides it.
 */
export function DesignerWhoLine() {
  const { active, onFocus, onBlur, onTouchStart } = useKeyboardTouchFallback();

  return (
    <h1 className="max-w-4xl font-display leading-[1] font-semibold">
      {/* Heading-navigation mode (e.g. a screen reader's "jump by
          heading" command) gets the complete sentence, including the
          word that's currently cycling elsewhere on the page. */}
      <span className="sr-only">{headlineStaticSentence}</span>

      <span
        tabIndex={0}
        aria-label="Designer who"
        onFocus={onFocus}
        onBlur={onBlur}
        onTouchStart={onTouchStart}
        className={`inline-block cursor-default text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] ${active ? "all-active" : ""}`}
        style={{ color: "var(--hero-text)", textShadow: "0 4px 24px rgb(0 0 0 / 18%)" }}
      >
        <span aria-hidden="true">
          {[...DESIGNER_WHO].map((ch, i) =>
            ch === " " ? (
              <span key={i} className="inline-block" style={{ width: "0.3em" }} />
            ) : (
              <span key={i} className="letter-char">
                {ch}
              </span>
            ),
          )}
        </span>
      </span>
    </h1>
  );
}

/**
 * The cycling word — solves → builds → vibe codes. Two independent
 * things happen here:
 *
 * A) The automatic swap: each letter stages in/out with its own
 *    stagger when the word changes (Framer Motion variants).
 * B) The hover rule: hovering the word (`.cycling-word:hover
 *    .cycling-letter` in globals.css) shifts every one of its letters
 *    together from the editorial serif into a warm handwritten mark,
 *    plus the accent color and a small lift — deliberately a
 *    whole-word treatment, not per-letter like "Designer who": a
 *    font-family swap can change a letter's width, and doing that per
 *    letter would jostle its neighbors mid-word. Grouping it at the
 *    word level means only the word's own box grows, which is safe —
 *    it sits after the cassette in the row, so it never pushes it.
 *
 * These compose without conflict only because (A) animates `transform`
 * on the per-letter entrance/exit and (B) only ever touches
 * `color`/`font-family`/a *different*, small `transform` at the group
 * level — see the note on `Letters` above for why that split matters.
 */
export function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { active, onFocus, onBlur, onTouchStart } = useKeyboardTouchFallback();

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % headlineWords.length);
    }, headlineIntervalMs);
    return () => window.clearInterval(id);
  }, [paused]);

  const word = headlineWords[index];
  const container = prefersReducedMotion ? reducedContainerVariants : containerVariants;
  const letter = prefersReducedMotion ? reducedLetterVariants : letterVariants;

  return (
    <span
      tabIndex={0}
      aria-label={headlineStaticSentence}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => {
        setPaused(true);
        onFocus();
      }}
      onBlur={() => {
        setPaused(false);
        onBlur();
      }}
      onTouchStart={() => {
        setPaused(true);
        onTouchStart();
      }}
      // font-display (Lora): matches "Designer who" so the two read as
      // one sentence in one typeface at rest — the hover transition
      // below then genuinely goes *from* that editorial serif *into*
      // the handwritten mark, not from the body's default sans.
      className={`cycling-word font-display relative inline-block w-fit min-w-[1ch] cursor-default text-[clamp(3rem,7vw,6rem)] leading-[0.95] ${active ? "all-active" : ""}`}
      style={{ color: "var(--hero-text)", textShadow: "0 4px 24px rgb(0 0 0 / 18%)", perspective: 600 }}
    >
      {/* No reserved "longest word" box here on purpose: the cassette
          sits flush beside this word, so its box must track whatever's
          actually showing, not a phantom width sized for "vibe codes".
          `popLayout` does exactly that — it pops the *exiting* word out
          of flow for its exit animation, so the container's width
          follows the incoming word immediately instead of holding open. */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="inline-block whitespace-nowrap"
          variants={container}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Letters word={word} variants={letter} letterClassName="cycling-letter" />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
