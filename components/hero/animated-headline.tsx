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
 * "Designer who", letter by letter. Each letter reacts to a mouse
 * hovering directly over it (plain CSS `:hover` — no JS, so it costs
 * nothing and can't lag). The caller remounts this component (via its
 * own `key`) to replay the `.letter-wave` CSS animation across every
 * letter at once — the equivalent for keyboard focus and touch, since
 * neither can trigger a per-letter `:hover`.
 */
function DesignerWho() {
  return (
    <span aria-hidden="true">
      {[...DESIGNER_WHO].map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block" style={{ width: "0.3em" }} />
        ) : (
          <span
            key={i}
            className="letter-hoverable letter-wave"
            style={{ animationDelay: `${i * 26}ms` }}
          >
            {ch}
          </span>
        ),
      )}
    </span>
  );
}

/**
 * "Designer who {solves → builds → vibe codes}" — the hero's primary
 * visual element.
 *
 * Two deliberately separate interactions live here, per spec:
 *
 * A) The automatic loop (solves → builds → vibe codes) animates each
 *    word swap per letter — a staggered "reveal" in, "collapse" out —
 *    rather than a flat crossfade.
 * B) "Designer who" has its own, different reaction: hovering a
 *    letter tilts it italic in the accent color (pure CSS); keyboard
 *    focus or a touch replays that same transform as a wave across
 *    every letter, since neither can trigger per-letter `:hover`.
 *
 * Focusing or touching the headline also pauses the loop — a small
 * courtesy so the text holds still while it's being read — but that's
 * a side effect, not the interaction itself.
 *
 * One focusable element carries both: aria-hidden decorative glyphs
 * nested under a properly-labeled ancestor, never the reverse (an
 * earlier draft made the animated word itself both aria-hidden and
 * tabbable — a real WCAG violation — before landing on this shape).
 */
export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [designerWaveKey, setDesignerWaveKey] = useState(0);
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

  // Mouse hover directly over the cycling word: pause only. Its own
  // reaction is interaction A's transitions, already in motion.
  const pauseOnHover = () => setPaused(true);
  const releaseHover = () => setPaused(false);

  // Focus/touch on the whole headline: pause, and play interaction B
  // (the "Designer who" wave) since :hover can't reach either input.
  const engage = () => {
    setPaused(true);
    if (!prefersReducedMotion) setDesignerWaveKey((k) => k + 1);
  };
  const disengage = () => setPaused(false);
  const handleTouchStart = () => {
    engage();
    window.clearTimeout(touchReleaseTimer.current);
    touchReleaseTimer.current = window.setTimeout(disengage, 1400);
  };

  const word = headlineWords[index];
  const container = prefersReducedMotion ? reducedContainerVariants : containerVariants;
  const letter = prefersReducedMotion ? reducedLetterVariants : letterVariants;

  return (
    <h1 className="max-w-4xl font-display leading-[1] font-semibold text-ink">
      {/* Heading-navigation mode (e.g. a screen reader's "jump by
          heading" command) gets one static, complete sentence. */}
      <span className="sr-only">{headlineStaticSentence}</span>

      <span
        tabIndex={0}
        aria-label={headlineStaticSentence}
        onFocus={engage}
        onBlur={disengage}
        onTouchStart={handleTouchStart}
        className="flex w-fit flex-col gap-1 sm:gap-2"
      >
        <span className="text-[clamp(2.75rem,6vw,4.5rem)] leading-tight">
          <DesignerWho key={designerWaveKey} />
        </span>

        <span
          onMouseEnter={pauseOnHover}
          onMouseLeave={releaseHover}
          aria-hidden="true"
          className="inline-block w-fit min-w-[1ch] cursor-default text-[clamp(4.5rem,11vw,9rem)] leading-[0.95] italic"
          style={{ perspective: 600 }}
        >
          {/* No reserved "longest word" box here on purpose: the
              cassette sits flush beside this word (spec), so its box
              must track whatever's actually showing, not a phantom
              width sized for "vibe codes". `popLayout` does exactly
              that — it pops the *exiting* word out of flow for its
              exit animation, so the container's width follows the
              incoming word immediately instead of holding open. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={word}
              className="inline-block whitespace-nowrap"
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
