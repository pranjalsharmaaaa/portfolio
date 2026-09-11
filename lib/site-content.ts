/**
 * Hero copy, kept separate from presentation so it can be edited
 * without touching component/animation logic (spec §14).
 */

export const site = {
  name: "Pranjal Sharma",
  role: "Product Designer",
  location: "India",
} as const;

/** Small kicker line above the headline. */
export const kicker = "HI, I'M PRANJAL.";

/**
 * The three facets that cycle inside the headline:
 * "Designer who {word}".
 */
export const headlineWords = ["solves", "builds", "vibe codes"] as const;

/** Static, screen-reader-only equivalent of the animated headline. */
export const headlineStaticSentence =
  "Designer who solves, builds, and vibe codes.";

/** Horizontal editorial label under the headline, one line, always. */
export const sideVocabulary = ["DESIGN", "DETAILS", "VIBE CODING"] as const;

export type NavItem = {
  label: string;
  href: string;
  emphasized?: boolean;
};

/**
 * Primary navigation. Routes for not-yet-designed sections still exist
 * (see app/work, app/about, app/playground, app/wrap, app/contact) so
 * links are never dead — they render clearly-marked placeholders.
 * "Wrap" is a future section; its placeholder exists so nav doesn't
 * need restructuring once it's designed.
 */
export const navItems: NavItem[] = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Playground", href: "/playground" },
  { label: "Wrap", href: "/wrap" },
  { label: "Work with me", href: "/contact", emphasized: true },
];

/** Timing for the "Designer who {word}" cycle — quick and alive, not a slideshow. */
export const headlineIntervalMs = 1400;
export const headlineTransitionMs = 500;
