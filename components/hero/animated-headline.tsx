"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  headlineIntervalMs,
  headlineStaticSentence,
  headlineTransitionMs,
  headlineWords,
} from "@/lib/site-content";

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

function Letters({ word, variants }: { word: string; variants: Variants }) {
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
          <motion.span key={i} variants={variants} style={{ display: "inline-block" }}>
            {ch}
          </motion.span>
        ),
      )}
    </>
  );
}

/**
 * The one hover rule both hero text elements share: white and upright
 * at rest, the accent color and italic on interaction — a visible
 * transform of the type itself, not a fade or a scale.
 *
 * Mouse hover drives it directly (instant, no JS in the loop). Focus
 * and touch — neither of which can trigger `:hover` — flip the same
 * `active` state by hand, so keyboard and touch users get the same
 * transform rather than losing the interaction entirely.
 */
function useHoverFlip() {
  const [active, setActive] = useState(false);
  const touchTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

  return {
    active,
    handlers: {
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
      onFocus: () => setActive(true),
      onBlur: () => setActive(false),
      onTouchStart: () => {
        setActive(true);
        window.clearTimeout(touchTimer.current);
        touchTimer.current = window.setTimeout(() => setActive(false), 1400);
      },
    },
  };
}

const HOVER_STYLE = { color: "var(--accent)", fontStyle: "italic" as const };
const REST_STYLE = { color: "#fffaf2", fontStyle: "normal" as const };

/**
 * "Designer who" — white and upright at rest; the accent color and
 * italic under mouse hover, keyboard focus, or touch.
 */
export function DesignerWhoLine() {
  const { active, handlers } = useHoverFlip();

  return (
    <h1 className="max-w-4xl font-display leading-[1] font-semibold">
      {/* Heading-navigation mode (e.g. a screen reader's "jump by
          heading" command) gets the complete sentence, including the
          word that's currently cycling elsewhere on the page. */}
      <span className="sr-only">{headlineStaticSentence}</span>

      <span
        tabIndex={0}
        aria-label="Designer who"
        {...handlers}
        className="inline-block cursor-default text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.95] transition-colors duration-300"
        style={{ ...(active ? HOVER_STYLE : REST_STYLE), textShadow: "0 4px 24px rgb(0 0 0 / 18%)" }}
      >
        Designer who
      </span>
    </h1>
  );
}

/**
 * The cycling word — solves → builds → vibe codes — white and upright
 * at rest, sharing the same hover/focus/touch → accent+italic rule as
 * "Designer who" above, but as its own independent region: hovering
 * one does not affect the other.
 *
 * The word swap itself (interaction A) is a separate concern from the
 * hover rule (interaction B): each letter stages in/out on a swap,
 * regardless of whether the word happens to be in its hovered state
 * at that moment — the two run independently and just compose.
 */
export function CyclingWord() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { active, handlers } = useHoverFlip();

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
      onMouseEnter={() => {
        setPaused(true);
        handlers.onMouseEnter();
      }}
      onMouseLeave={() => {
        setPaused(false);
        handlers.onMouseLeave();
      }}
      onFocus={() => {
        setPaused(true);
        handlers.onFocus();
      }}
      onBlur={() => {
        setPaused(false);
        handlers.onBlur();
      }}
      onTouchStart={handlers.onTouchStart}
      className="relative inline-block w-fit min-w-[1ch] cursor-default text-[clamp(4.5rem,11vw,9rem)] leading-[0.95] transition-colors duration-300"
      style={{
        ...(active ? HOVER_STYLE : REST_STYLE),
        textShadow: "0 4px 24px rgb(0 0 0 / 18%)",
        perspective: 600,
      }}
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
          <Letters word={word} variants={letter} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
