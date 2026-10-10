import { Children, type ReactNode } from "react";

/**
 * The Sales Coach screens (one per page of the 16-page PDF), one after
 * another in ordinary document flow: the page scrolls as one continuous
 * document on the browser's own scrollbar, each screen moving up and
 * out as the next follows it. No sticky screens, no viewport-height
 * boxes, no scaling — every screen is as tall as its own content.
 *
 * Each screen is an inline-size container, so its sections lay out by
 * their own container breakpoints (`@min-[640px]:` / `@min-[1024px]:`):
 * 20px gutters on phones, 40px on tablets, 60px on desktop.
 * `data-sc-screen` marks the screen boundaries DemoVideo uses to pause a
 * demo once the following screen has scrolled up past it.
 */
export function ScreenStack({ children }: { children: ReactNode }) {
  return (
    <div>
      {Children.map(children, (child, i) => (
        <div data-sc-screen={i} className="@container relative bg-[var(--sc-bg)]">
          {child}
        </div>
      ))}
    </div>
  );
}
