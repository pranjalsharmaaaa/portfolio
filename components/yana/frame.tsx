import type { ReactNode } from "react";

/**
 * YANA's horizontal content frame — the same 20 / 40 / 60px side margins
 * as the rest of the portfolio's case studies (and, like them, no
 * max-width: the margins stay exact at any viewport width). Kept as
 * Yana's own component rather than importing Stack Up's, so neither case
 * study can change the other.
 */
export function YanaFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`w-full px-5 sm:px-10 lg:px-[60px] ${className}`}>{children}</div>;
}

/**
 * The one canvas every YANA screen sits in.
 *
 * The reference PDF's pages are all different heights (853, 694, 651,
 * 193 + 464 — a property of the export, not the design), so each page's
 * composition is placed inside the same full-viewport screen instead of
 * being reproduced at its own height: on landscape desktop/tablet each
 * screen fills exactly one viewport with its content vertically centered
 * (content can still grow it, never clip). Portrait tablets and phones
 * let screens take their natural height, so a short composition never
 * gets stretched into a mostly-empty full-height block.
 *
 * Vertical breathing room is one shared value at every breakpoint
 * (64 / 80 / 60px + centering on desktop), so the space above the first
 * line and below the last is the same on every screen.
 */
export const YANA_SCREEN = "relative flex flex-col lg:landscape:min-h-svh";
export const YANA_SCREEN_Y = "py-16 sm:py-20 lg:py-[60px]";
