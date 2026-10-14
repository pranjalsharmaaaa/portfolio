"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CLOUD_PATH } from "@/components/hero/sky-background";
import { explorationChips } from "@/lib/site-content";

/**
 * Phones only (below `sm`): the three things Pranjal is exploring, set as
 * words drifting in the sky rather than as cards. Desktop keeps the
 * card row in about-section.tsx; this replaces it below 640px.
 *
 * They're plain text, so the markup is a plain list: no buttons, no
 * tab stops, no hover, no pointer cursor. Each word sits on a faint
 * cloud cut from the hero sky's own cloud shape, in the cards' blue as
 * an accent (a deeper shade of it for the words, so they read clearly
 * on the cream; a lighter one at night), loosely staggered left, right,
 * centre with a slight tilt each and a small step in size.
 *
 * Motion: each word rises and fades in as the list scrolls into view, a
 * beat apart, then bobs a few pixels on its own slow cycle (two nested
 * elements, so the entrance and the bob never fight over `transform`).
 * Reduced motion: a plain fade, no bob.
 */
const LAYOUT = [
  { align: "self-start ml-[2%]", rotate: -4, size: "text-[1.75rem]", float: "7.5s", delay: "0s" },
  // mr-6: its cloud reaches 28px past the word, which must stay on screen.
  { align: "self-end mr-6", rotate: 2.5, size: "text-[1.45rem]", float: "9s", delay: "-3s" },
  { align: "self-center ml-[8%]", rotate: -1.5, size: "text-[1.6rem]", float: "8s", delay: "-5.5s" },
] as const;

const EASE = [0.22, 1, 0.36, 1] as const;

export function FloatingTopics({ label }: { label: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <ul aria-label={label} className="floating-topics mx-auto flex w-full max-w-[22rem] flex-col gap-9 py-4">
      {explorationChips.map((topic, i) => {
        const l = LAYOUT[i];
        return (
          <motion.li
            key={topic.label}
            className={`relative ${l.align}`}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: reduceMotion ? 0.4 : 0.9, ease: EASE, delay: reduceMotion ? 0 : i * 0.16 }}
          >
            <div
              className="topic-float relative isolate px-2"
              style={{ rotate: `${l.rotate}deg`, animationDuration: l.float, animationDelay: l.delay }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 210 95"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -top-5 -left-7 -z-10 h-[calc(100%+2.5rem)] w-[calc(100%+3.5rem)]"
              >
                <path d={CLOUD_PATH} fill="var(--ft-cloud)" />
              </svg>
              <span className={`font-display block leading-[1.15] font-medium ${l.size}`} style={{ color: "var(--ft-ink)" }}>
                {topic.label}
              </span>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
