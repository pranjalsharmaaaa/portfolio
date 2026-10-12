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
 * The cassette player in the hero: "Designer Brain", the rap made in
 * Suno, served from /public/audio.
 */
export const cassette = {
  title: "My design journey, rapped",
  src: "/audio/designer-rap.mp3",
  playLabel: "Play “My design journey, rapped”",
  pauseLabel: "Pause “My design journey, rapped”",
  errorLabel: "“My design journey, rapped” couldn’t be loaded",
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
  { label: "Design for AI", hint: "Exploring what's next" },
];

export type SelectedWorkProject = {
  number: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
};

/**
 * Stack Up is the featured project (larger, centered image); Sales
 * Coach and YANA follow as two smaller, equal cards below it. Order is
 * fixed. `description` stays out of each card's default state
 * entirely (rendered but invisible until hover/focus, as an overlay on
 * the image itself — see selected-work.tsx) rather than shown as
 * permanent copy. None of these three case studies exist yet — each
 * `href` route renders the same placeholder shell already used
 * elsewhere in this codebase for not-yet-designed sections (see
 * app/work, app/wrap).
 *
 * `featured.image` is the original three-screen cover at its own
 * native resolution (1672×941) — this repo has no higher-resolution or
 * individual per-screen source asset to reconstruct from, so this
 * flattened cover already *is* the best available source; an earlier
 * round's 2-screen crop of it has been dropped in favor of showing all
 * three screens again.
 */
export const selectedWork = {
  heading: "Selected Work",
  featured: {
    number: "01",
    title: "Stack Up",
    description:
      "An app for first-time investors to build investing confidence and manage their money for a stronger financial future.",
    href: "/stackup",
    image: "/images/work/stack-up-cover.webp",
    imageAlt:
      "Stack Up app screens: onboarding, a practice wallet with virtual money, and a mutual funds explainer",
  },
  secondary: [
    {
      number: "02",
      title: "Sales Coach",
      description:
        "An AI-powered voice assistant and practice simulator that simplifies meeting briefs and saves sales teams time.",
      href: "/sales-coach",
      image: "/images/work/sales-coach-cover.webp",
      imageAlt:
        "Sales Coach app screens: account context, a guided question prompt, and conversation preparation",
    },
    {
      number: "03",
      title: "YANA",
      description:
        "A mental well-being platform that helps people find the right support, from self-care to individual and group therapy.",
      href: "/yana",
      image: "/images/work/yana-cover.webp",
      imageAlt:
        "YANA app screens: mood relaxer suggestions, a therapist-matching form, and upcoming group therapy sessions",
    },
  ],
} as const satisfies {
  heading: string;
  featured: SelectedWorkProject;
  secondary: SelectedWorkProject[];
};

/**
 * The closing "Let's grow your next idea" section at the very end of
 * the homepage (components/contact/grow-section.tsx). `headline.lines`
 * is the deliberate two-line composition from `sm` up; `emphasis` is
 * the one word inside it set in italic. Contact details are the
 * owner's own — LinkedIn opens in a new tab, email/phone use
 * `mailto:`/`tel:`.
 */
export const growContact = {
  intro:
    "From early ideas to refined experiences, I design thoughtful digital products that earn trust, solve real problems, and help businesses grow.",
  headline: { lines: ["Let’s grow your", "next idea."], emphasis: "grow" },
  supporting:
    "Have a product idea, a challenge to solve, or an opportunity to discuss? Let’s connect.",
  links: {
    linkedin: { label: "LinkedIn", href: "https://www.linkedin.com/in/pranjal-sharmaaa/" },
    email: { label: "pranjallsharmaa23@gmail.com", href: "mailto:pranjallsharmaa23@gmail.com" },
    phone: { label: "+91 93544 14884", href: "tel:+919354414884" },
  },
  gardenHint: { pointer: "Click a flower to water it", touch: "Tap a flower to water it" },
} as const;
