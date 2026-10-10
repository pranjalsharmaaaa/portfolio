import { Children, type ReactNode } from "react";

/**
 * The Stack Up screens, one after another in ordinary document flow:
 * the page scrolls as one continuous document on the browser's own
 * scrollbar, each section moving up and out as the next follows it. No
 * sticky screens, no viewport-height boxes, no scaling.
 *
 * Each screen is its own inline-size container, so sections respond to
 * the width they're laid out at through container queries
 * (`@min-[640px]:` / `@min-[1024px]:`), and the fixed-composition
 * research screens (slide.tsx) size themselves from that width.
 */
export function PageStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child) => (
        <div className="@container relative" style={{ background: "var(--stackup-bg)" }}>
          {child}
        </div>
      ))}
    </div>
  );
}
