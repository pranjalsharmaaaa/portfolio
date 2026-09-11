"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import {
  headlineIntervalMs,
  headlineStaticSentence,
  headlineTransitionMs,
  headlineWords,
} from "@/lib/site-content";

/** Longest word in the loop — reserves layout space so nothing jumps. */
const LONGEST_WORD = headlineWords.reduce((a, b) => (b.length > a.length ? b : a));

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

const reducedContainerVariants: Variants = {
  initial: {},
  animate: {},
  exit: {},
};

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
 * "Designer who {solves → builds → vibe codes}" — the hero's primary
 * visual element, not a small typographic detail.
 *
 * The word swap animates per letter (a brief staggered "reveal" in,
 * "collapse" out) rather than a flat crossfade, so it reads as a
 * designed transformation. Hovering, focusing, or touching the word
 * replays that same per-letter choreography in place — the text
 * visibly responds to attention instead of sitting inert — and pauses
 * the loop so it holds still while being read.
 */
export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [waveKey, setWaveKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const touchReleaseTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % headlineWords.length);
    }, headlineIntervalMs);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => () => window.clearTimeout(touchReleaseTimer.current), []);

  const triggerWave = () => {
    if (!prefersReducedMotion) setWaveKey((k) => k + 1);
  };

  const holdStill = () => {
    setPaused(true);
    triggerWave();
  };
  const release = () => setPaused(false);

  const handleTouchStart = () => {
    setPaused(true);
    triggerWave();
    window.clearTimeout(touchReleaseTimer.current);
    touchReleaseTimer.current = window.setTimeout(() => setPaused(false), 1400);
  };

  const word = headlineWords[index];
  const container = prefersReducedMotion ? reducedContainerVariants : containerVariants;
  const letter = prefersReducedMotion ? reducedLetterVariants : letterVariants;

  return (
    <h1 className="max-w-4xl font-display leading-[1] font-semibold text-ink">
      {/* Heading-navigation mode (e.g. a screen reader's "jump by
          heading" command) gets one static, complete sentence. */}
      <span className="sr-only">{headlineStaticSentence}</span>

      <span className="flex flex-col gap-1 sm:gap-2">
        <span aria-hidden="true" className="text-[clamp(1.75rem,4vw,3rem)] leading-tight">
          Designer who
        </span>

        {/* Tab-navigation mode gets its own focusable stop with the same
            sentence as its accessible name — NOT aria-hidden, since a
            focusable element that's invisible to assistive tech is the
            one thing worse than no interaction at all. Its letter
            glyphs are purely decorative and stay aria-hidden. */}
        <span
          onMouseEnter={holdStill}
          onMouseLeave={release}
          onFocus={holdStill}
          onBlur={release}
          onTouchStart={handleTouchStart}
          tabIndex={0}
          aria-label={headlineStaticSentence}
          className="relative inline-block w-fit min-w-[1ch] cursor-default text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.95] italic"
          style={{ perspective: 600 }}
        >
          {/* Reserve space using the longest word so layout never jumps. */}
          <span className="invisible" aria-hidden="true">
            {LONGEST_WORD}
          </span>

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={`${word}-${waveKey}`}
              aria-hidden="true"
              className="absolute inset-0 whitespace-nowrap"
              style={{ color: "var(--accent)" }}
              variants={container}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Letters word={word} variants={letter} />
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </h1>
  );
}
