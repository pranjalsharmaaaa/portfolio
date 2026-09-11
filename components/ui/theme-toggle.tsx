"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/lib/use-mounted";

/**
 * A theme control that reads as part of the editorial interface rather
 * than a settings switch (spec §07A) — a small pill that swaps a sun
 * glyph for a moon, living right inside the glass nav.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoid rendering theme-dependent UI until mounted, so the server-
  // rendered markup (which doesn't know the visitor's preference) never
  // mismatches the client.
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title="Same sky, different mood"
      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/10"
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
      {mounted && (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[1.05rem] w-[1.05rem] motion-safe:transition-transform motion-safe:duration-500"
          style={{ transform: isDark ? "rotate(40deg)" : "rotate(0deg)" }}
          fill="none"
        >
          {isDark ? (
            <path
              d="M20.5 14.5a8.5 8.5 0 1 1-9-13 7 7 0 0 0 9 13Z"
              fill="currentColor"
            />
          ) : (
            <>
              <circle cx="12" cy="12" r="4.2" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
              </g>
            </>
          )}
        </svg>
      )}
    </button>
  );
}
