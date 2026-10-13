"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";

const OPTIONS = [
  {
    value: "light",
    label: "Light mode",
    icon: (
      <>
        <circle cx="12" cy="12" r="4.2" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </g>
      </>
    ),
  },
  {
    value: "dark",
    label: "Dark mode",
    icon: <path d="M20.5 14.5a8.5 8.5 0 1 1-9-13 7 7 0 0 0 9 13Z" fill="currentColor" />,
  },
] as const;

/**
 * The /about page's theme controls: two small separate circles, sun and
 * moon, at the top right — the page's own take on the toggle that lives
 * inside the nav pill on the homepage. Same next-themes state, so the
 * choice carries across pages. The current theme's circle is filled in
 * (`aria-pressed`); the other one is the way to switch.
 */
export function ThemeControls() {
  const { resolvedTheme, setTheme } = useTheme();
  // Nothing is marked as current until mounted: the server can't know
  // the visitor's theme, so this keeps the first render identical.
  const mounted = useMounted();

  return (
    <div role="group" aria-label="Color theme" className="flex items-center gap-2">
      {OPTIONS.map((option) => {
        const active = mounted && resolvedTheme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-label={option.label}
            aria-pressed={active}
            onClick={() => setTheme(option.value)}
            className="theme-dot flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-xl"
            data-active={active || undefined}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
              {option.icon}
            </svg>
          </button>
        );
      })}
    </div>
  );
}
