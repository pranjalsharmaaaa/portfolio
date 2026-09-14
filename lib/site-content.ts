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

/**
 * The vertical editorial annotation beside the headline on desktop —
 * one continuous string, not three separately-positioned words, so
 * font/size/spacing/weight are identical by construction rather than
 * matched by hand across separate elements. Rendered as a single
 * writing-mode block rotated 180° as one object; reflows into a
 * horizontal row on narrow screens rather than disappearing.
 */
export const sideVocabulary = "DESIGN / DETAILS / SIMPLY";

/**
 * The cassette: a reserved, inactive slot for a future audio piece.
 * No audio exists yet — swap `Cassette`'s inner content for a real
 * player without touching where it sits in the hero.
 */
export const cassette = {
  title: "My design journey, rapped",
  playLabel: "Play “My design journey, rapped” — no audio yet",
} as const;

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

/**
 * The About section that follows the hero — reached by scrolling
 * through the cloud transition, not a separate route. No heading here
 * on purpose (no "A little about me.", no generic substitute like
 * "About Me" or "Who I Am") — the section introduces itself through
 * the intro line's own scale and composition instead of a labeled
 * header. Copy stays this short and specific: one sentence of
 * introduction, three concrete current interests, one personal
 * belief — not a second biography paragraph restating the same ground.
 */
export const about = {
  intro:
    "Someone who enjoys learning, exploring new ideas and finding the little details that make an experience feel just right.",
  exploringLabel: "Things I'm exploring lately",
  belief:
    "I think every good design starts with a question. I'm here to keep asking better ones.",
} as const;

export type ExplorationChip = {
  label: string;
  hint: string;
};

/** Each card's `hint` describes its own hover character — read by assistive tech in place of a generic "hover for more". */
export const explorationChips: ExplorationChip[] = [
  { label: "Storytelling", hint: "Told like a title card" },
  { label: "Prototyping + Motion", hint: "Built to move" },
  { label: "Design for Empathy", hint: "Made with care" },
];
