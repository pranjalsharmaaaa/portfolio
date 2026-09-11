"use client";

import { useState } from "react";
import { cassette } from "@/lib/site-content";

function Reel() {
  return (
    <div
      className="cassette-reel relative flex aspect-square w-[clamp(3.25rem,5.5vw,4.25rem)] shrink-0 items-center justify-center rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #4b5266 0%, #2b303e 55%, #1c2029 100%)",
        boxShadow: "inset 0 0 0 1px rgb(255 255 255 / 8%)",
      }}
    >
      {/* A few spokes so the spin actually reads as motion, not just a blur. */}
      {[0, 60, 120].map((deg) => (
        <span
          key={deg}
          className="absolute h-[70%] w-[2px] rounded-full"
          style={{ background: "rgb(255 255 255 / 10%)", transform: `rotate(${deg}deg)` }}
        />
      ))}
      <span
        className="relative h-[38%] w-[38%] rounded-full"
        style={{
          background: "radial-gradient(circle at 40% 35%, #c9945a 0%, #8a5f34 70%, #6e4a29 100%)",
          boxShadow: "0 0 0 3px rgb(0 0 0 / 15%)",
        }}
      />
    </div>
  );
}

/**
 * A reserved, honest placeholder for a future audio piece — built as
 * an original cream cassette object (two reels, a recessed playback
 * window, a play control, a progress track) rather than a generic
 * audio-player bar, because that object is deliberately part of this
 * portfolio's visual identity.
 *
 * No audio exists yet. The play control is real and responds to
 * interaction (hover, focus, click), but a click gives a small,
 * honest "not yet" shake rather than pretending to play something —
 * clicking it must never imply audio that doesn't exist.
 *
 * To wire up a real recording later: replace the progress track and
 * play handler with an actual `<audio>`-backed player; everything
 * around it (the reels, the window, where this sits in the hero)
 * can stay exactly as it is.
 */
export function Cassette() {
  const [nudgeKey, setNudgeKey] = useState(0);

  return (
    <div
      className="cassette flex w-[clamp(23rem,29vw,31rem)] items-center gap-3 rounded-[1.75rem] p-3"
      style={{
        background: "linear-gradient(160deg, #fffaf0 0%, #f6e9cf 100%)",
        boxShadow:
          "0 24px 48px -12px rgb(28 34 48 / 22%), inset 0 0 0 1px rgb(255 255 255 / 60%)",
      }}
    >
      <Reel />

      <div
        className="flex min-w-0 flex-1 flex-col gap-2 rounded-2xl px-3.5 py-3"
        style={{
          background: "rgb(28 34 48 / 6%)",
          boxShadow: "inset 0 2px 4px rgb(28 34 48 / 12%)",
        }}
      >
        {/* Every color in here is a fixed value, never a theme token.
            The cassette is a physical object that doesn't repaint
            itself for dark mode any more than a real one would — but
            that means its own text/controls must never borrow a token
            that DOES flip (text-ink, var(--accent-strong), …), or
            dark mode quietly turns them into light-on-light. Verified
            by screenshotting dark mode specifically, not assumed. */}
        <p className="truncate text-[0.85rem] font-semibold" style={{ color: "#1c2230" }}>
          {cassette.title}
        </p>

        <div className="flex items-center gap-2.5">
          <button
            key={nudgeKey}
            type="button"
            aria-label={cassette.playLabel}
            onClick={() => setNudgeKey((k) => k + 1)}
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform hover:scale-105 ${
              nudgeKey ? "cassette-nudge" : ""
            }`}
            style={{ background: "#1c2230", color: "#fbf3e6" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" opacity="0.6" />
            </svg>
          </button>

          <div
            className="relative h-1 flex-1 overflow-hidden rounded-full"
            style={{ background: "rgb(28 34 48 / 12%)" }}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: "3%", background: "#6b7688" }}
            />
          </div>

          <p
            className="shrink-0 text-[0.58rem] font-bold tracking-[0.12em] uppercase"
            style={{ color: "#6b7688" }}
          >
            {cassette.status}
          </p>
        </div>
      </div>

      <Reel />
    </div>
  );
}
