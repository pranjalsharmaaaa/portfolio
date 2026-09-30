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
