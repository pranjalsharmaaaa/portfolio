import { Children, type ReactNode } from "react";

/**
 * YANA's research-through-prototyping screens, one after another in
 * ordinary document flow: the page scrolls as one continuous document on
 * the browser's own scrollbar, each section moving up and out as the
 * next follows it. No sticky screens, no viewport-height boxes, no
 * scaling — every screen is as tall as its own content and each section
 * uses its own responsive layout. Each screen carries Yana's cream
 * surface; chapter dividers paint their own purple field.
 */
export function YanaStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child) => (
        <div className="relative bg-[var(--yana-bg)]">{child}</div>
      ))}
    </div>
  );
}
