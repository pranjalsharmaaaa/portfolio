/**
 * Copy for the Stack Up case study (app/stackup), transcribed verbatim
 * from the Figma reference screenshots — not written for this
 * portfolio. Kept separate from the section components per this
 * codebase's existing convention (see site-content.ts).
 *
 * This is the first batch of sections (cover through "An initial
 * hypothesis"); more will be appended here as later screens arrive.
 */

export const stackupCover = {
  eyebrow: "Finances",
  headline: "Made Easy",
  subhead: "One App. Different Financial Journeys.",
  body: "Practise with virtual money, build confidence, and invest when you're ready.",
} as const;

export const stackupOverview = {
  label: "Project Overview",
  headingPlain: "Make managing money ",
  headingAccent: "feel less intimidating",
  body: "Created a financial experience that help first-time earners build understanding and confidence by learning through safe, guided practice before making real financial decisions.",
  pillars: [
    { title: "Understand", description: "Make financial concepts simple" },
    { title: "Practice", description: "Allow risk-free experimentation" },
    {
      title: "Build Confidence",
      description: "Help users move toward informed decisions",
    },
  ],
} as const;

export const stackupQuestion = {
  label: "It all started with a question",
  lineOne: "You earn money",
  lineTwo: "But how do you manage it?",
} as const;

export type CopySegment = { text: string; bold?: boolean };

export const stackupProblem = {
  label: "Understanding the Problem",
  heading: "The brief seemed straightforward",
  brief:
    "Design a Personal Finance Management experience that helps people manage their overall net worth.",
  paragraphs: [
    [
      { text: "Before exploring solutions, I realised I first needed to " },
      { text: "understand the financial ecosystem myself.", bold: true },
      { text: " As someone just beginning to manage my own money, I found myself asking many of the same questions as " },
      { text: "first-time earners.", bold: true },
    ],
    [
      { text: "I immersed myself in the world of personal finance - " },
      {
        text: "exploring products, learning core concepts and trying to make sense of how it all connects.",
        bold: true,
      },
    ],
  ] satisfies CopySegment[][],
} as const;

export const stackupHypothesis = {
  label: "An Initial Hypothesis",
  headingPlain: "Earning money doesn't automatically mean ",
  headingAccent: "knowing how to manage it.",
  pillars: [
    { title: "Knowledge", image: "/images/stackup/illustration-knowledge.webp" },
    { title: "Confidence", image: "/images/stackup/illustration-confidence.webp" },
    { title: "Experience", image: "/images/stackup/illustration-experience.webp" },
  ],
} as const;
