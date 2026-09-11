"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { headlineStaticSentence, headlineWords } from "@/lib/site-content";

const INTERVAL_MS = 2400;

/**
 * "Designer who {solves → builds → vibe codes}" — the hero's main
 * living element (spec §04).
 *
 * A visually-hidden static sentence carries the meaning for assistive
 * tech and search engines; the animated word beneath it is purely
 * presentational (aria-hidden) so screen readers aren't interrupted
 * every 2.4s by a loop that never actually finishes.
 */
export function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % headlineWords.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [paused]);

  // Pause the loop for anyone hovering or keyboard-focusing the word —
  // a small courtesy so the text holds still while it's being read.
  const holdStill = () => setPaused(true);
  const release = () => setPaused(false);

  const word = headlineWords[index];

  return (
    <h1 className="max-w-3xl font-display text-[clamp(2.75rem,7vw,6rem)] leading-[1.05] font-semibold text-ink">
      <span className="sr-only">{headlineStaticSentence}</span>

      <span aria-hidden="true">
        Designer who
        <br />
        <span
          ref={containerRef}
          onMouseEnter={holdStill}
          onMouseLeave={release}
          onFocus={holdStill}
          onBlur={release}
          tabIndex={-1}
          className="relative inline-block min-w-[1ch] align-top italic"
          style={{ perspective: 600 }}
        >
          {/* Reserve space using the longest word so surrounding layout
              never jumps as the word changes. */}
          <span className="invisible" aria-hidden="true">
            vibe codes
          </span>

          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={word}
              className="absolute inset-0"
              style={{ color: "var(--accent)" }}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -24 }
              }
              transition={{
                duration: prefersReducedMotion ? 0.25 : 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </h1>
  );
}
