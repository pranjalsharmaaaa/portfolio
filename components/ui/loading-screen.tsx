"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const SHOW_MS = 760;
const FADE_MS = 320;
const DOTS = [0, 1, 2, 3, 4, 5];

/**
 * A short, original introduction before the sky appears — a warm dot
 * (the same accent that lights the sun/moon in the hero) travels a
 * row of small marks, dimming each as it passes. It nods to a
 * classic "something is eating the dots" loading idiom without
 * reproducing any specific character or brand, and it's gone in well
 * under a second and a half.
 *
 * Skipped entirely under prefers-reduced-motion — its only job is a
 * playful flourish, so for that preference it's pure unearned delay.
 */
export function LoadingScreen() {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const t1 = window.setTimeout(() => setPhase("exiting"), SHOW_MS);
    const t2 = window.setTimeout(() => setPhase("done"), SHOW_MS + FADE_MS);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [prefersReducedMotion]);

  if (phase === "done" || prefersReducedMotion) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity ease-out"
      style={{
        background: "var(--sky-bottom)",
        opacity: phase === "exiting" ? 0 : 1,
        transitionDuration: `${FADE_MS}ms`,
      }}
    >
      <span className="sr-only">Loading portfolio…</span>

      <div className="relative flex items-center gap-3" aria-hidden="true">
        {DOTS.map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full"
            style={{
              background: "var(--ink-quiet)",
              opacity: 0.35,
              animation: "loader-eat 760ms ease-in-out forwards",
              animationDelay: `${i * 90}ms`,
            }}
          />
        ))}
        <span
          className="absolute top-1/2 left-0 h-4 w-4 rounded-full"
          style={{
            background: "var(--accent)",
            animation: "loader-slide 760ms ease-in-out forwards",
          }}
        />
      </div>
    </div>
  );
}
