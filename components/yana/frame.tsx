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
 * The one canvas every YANA screen sits in: a plain block as tall as its
 * own content, so the page scrolls as one continuous document and no
 * composition is stretched into a mostly-empty full-height block.
 *
 * Vertical breathing room is one shared value at every breakpoint
 * (64 / 80 / 60px), so the space above the first line and below the
 * last is the same on every screen.
 */
export const YANA_SCREEN = "relative flex flex-col";
export const YANA_SCREEN_Y = "py-16 sm:py-20 lg:py-[60px]";
