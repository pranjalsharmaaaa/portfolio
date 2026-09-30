import type { ReactNode } from "react";

/**
 * The one horizontal content grid every Stack Up section shares.
 *
 * Deliberately has NO max-width: side margins are exactly 60px on
 * desktop, ~20px on mobile, at any viewport width — not a centered
 * box that happens to leave 60px at one particular width. Content
 * width is always `100vw - 120px` on desktop (`- 40px` on mobile),
 * per spec. A centered inner element (e.g. the question section's
 * pull-quote) adds its own `mx-auto max-w-*` wrapper *inside* this
 * container rather than this container itself being narrowed — that
 * keeps its section's own edges on the same 60px grid as every other
 * section while still centering that one piece of content.
 */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full px-5 sm:px-10 lg:px-[60px] ${className}`}>
      {children}
    </div>
  );
}

/**
 * The one vertical rhythm every Stack Up section shares, applied to the
 * `<section>` element itself (padding-top/bottom, not a margin — margins
 * on adjacent sections would collapse/stack unpredictably).
 *
 * Every section owns exactly this much inset above and below its own
 * content, so two adjacent sections are always separated by exactly
 * `2 × 60px = 120px` at desktop — not a random per-section value that
 * happened to be typed differently in each file, and not doubled by an
 * extra margin stacked on top of this padding.
 */
export const SECTION_Y = "py-10 sm:py-14 lg:py-[60px]";
