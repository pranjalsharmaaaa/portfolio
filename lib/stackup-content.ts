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

export const stackupEcosystem = {
  label: "Exploring the Ecosystem",
  intro:
    "Beyond features, I wanted to understand what each product assumed about its users and how it presented financial information.",
  cards: [
    { title: "Investments", description: "How investing is introduced to users." },
    { title: "Payments", description: "How everyday financial behaviour is prioritised." },
    { title: "Credit Cards", description: "How spending, debt and rewards are communicated." },
    { title: "Net Worth", description: "How overall financial health is presented and explained." },
    { title: "Paper Trading", description: "How do they teach investing without financial risk?" },
  ],
  outro:
    "This exploration helped me build a broad understanding of today's financial ecosystem before narrowing my research into representative products.",
} as const;

export type BenchmarkProduct = { name: string; logo: string; description: string };

export const stackupBenchmark = {
  label: "Narrowing the Benchmark",
  body: "Every product informed the research. The applications shown here are the ones referenced throughout the case study to explain the key findings and design decisions.",
  left: [
    { name: "Groww", logo: "/images/stackup/logo-groww.webp", description: "Popular investing platform for beginners" },
    { name: "Kuvera", logo: "/images/stackup/logo-kuvera.webp", description: "Mutual fund focused for long term investing" },
    { name: "IND Money", logo: "/images/stackup/logo-indmoney.webp", description: "Combines investment with net worth tracking and financial overview" },
  ] satisfies BenchmarkProduct[],
  right: [
    { name: "Frontpage", logo: "/images/stackup/logo-frontpage.webp", description: "Let users learn market and invest in virtual stocks" },
    { name: "Money Bhai", logo: "/images/stackup/logo-moneybhai.webp", description: "Gamified paper trading application to practice trading strategies" },
  ] satisfies BenchmarkProduct[],
} as const;

/**
 * `displayWidth` (px, desktop) caps how large a shot renders, independent
 * of however wide its flex column is. These screenshots are cropped
 * straight from a 1920x1080 reference capture, so each one's native
 * pixel width is small (the widest here, Money Bhai, is 348px); letting
 * a shot stretch to fill a wide column can upscale it 3x+ and look soft.
 * Left unset, a shot just fills its column (the pages-01/02 behavior,
 * where every example's column is already a similar width).
 */
export type InsightShot = { src: string; alt: string; aspect: number; caption?: string; displayWidth?: number };
export type InsightExample = { name: string; logo: string; shots: InsightShot[]; caption?: string };
export type InsightCard = { label: string; heading: string; body: string };

export const stackupBenchmarkInsights = [
  {
    index: "01",
    headline: "Existing Products are built for investment-ready users",
    subheading: "Most investing platforms move quickly towards discovering, selecting and investing in financial products",
    examples: [
      {
        name: "Groww",
        logo: "/images/stackup/logo-groww.webp",
        shots: [{ src: "/images/stackup/benchmark-groww-investready.webp", alt: "Groww mutual funds screen prompting account setup to start investing", aspect: 173 / 227, caption: "Fund discovery and start investing becomes the primary thing" }],
      },
      {
        name: "IND Money",
        logo: "/images/stackup/logo-indmoney.webp",
        shots: [{ src: "/images/stackup/benchmark-indmoney-investready.webp", alt: "IND Money screen prompting mutual fund account setup and SIP actions", aspect: 176 / 233, caption: "Users are shown actions first thing on the page" }],
      },
      {
        name: "Kuvera",
        logo: "/images/stackup/logo-kuvera.webp",
        shots: [{ src: "/images/stackup/benchmark-kuvera-investready.webp", alt: "Kuvera mutual fund collections and most-bought funds screen", aspect: 153 / 239, caption: "Assumes users already know how to invest." }],
      },
    ] satisfies InsightExample[],
    observed: { label: "What I Observed", heading: "Investment comes first.", body: "Portfolios, returns, fund discovery and investment actions form the core experience across most platforms studied." },
    opportunity: { label: "The Opportunity", heading: "But what about users who aren't ready to invest yet?", body: "Create a space where beginners can understand and practise financial decisions before putting real money at risk." },
  },
  {
    index: "02",
    headline: "Learning, when available, sits outside the investing journey.",
    subheading: "Across investment platforms, learning often sits separately from financial actions.",
    examples: [
      {
        name: "Kuvera",
        logo: "/images/stackup/logo-kuvera.webp",
        shots: [{ src: "/images/stackup/benchmark-kuvera-learning.webp", alt: "Kuvera FAQ screen answering mutual fund questions", aspect: 163 / 218, caption: "Learning is down in FAQ which are not part of the journey" }],
      },
      {
        name: "IND Money",
        logo: "/images/stackup/logo-indmoney.webp",
        shots: [{ src: "/images/stackup/benchmark-indmoney-learning.webp", alt: "IND Money dedicated finance course screen", aspect: 179 / 215, caption: "Education exists, but as a separate learning destination wherein user are expected to complete course" }],
      },
      {
        name: "Groww",
        logo: "/images/stackup/logo-groww.webp",
        shots: [],
        caption: "No dedicated learning experience identified",
      },
    ] satisfies InsightExample[],
    observed: { label: "What I Observed", heading: "Learning is separated from action.", body: "Users can access educational resources, but they often have to intentionally seek them out rather than encountering guidance while making a financial decision." },
    opportunity: { label: "The Opportunity", heading: "What if learning happened while users were doing?", body: "Embed guidance within financial actions, allowing beginners to understand concepts in context and practise them before making decisions independently." },
  },
  {
    index: "03",
    headline: "Practice platforms remove the money risk, not the complexity.",
    subheading: "Simulation platforms remove real-money risk, but still expect users to understand finance before they begin.",
    examples: [
      {
        name: "Money Bhai",
        logo: "/images/stackup/logo-moneybhai.webp",
        shots: [{ src: "/images/stackup/benchmark-moneybhai-practice.webp", alt: "Money Bhai gamified paper-trading portfolio dashboard", aspect: 348 / 249, caption: "Even if it is risk free practice it still assumes prior knowledge which give a lot of cognitive load", displayWidth: 420 }],
      },
      {
        name: "Frontpage",
        logo: "/images/stackup/logo-frontpage.webp",
        shots: [
          { src: "/images/stackup/benchmark-frontpage-practice-1.webp", alt: "Frontpage community feed with market discussion posts", aspect: 133 / 274, caption: "Through community feature with different experience between users gets overwhelming for someone to learn", displayWidth: 190 },
          { src: "/images/stackup/benchmark-frontpage-practice-2.webp", alt: "Frontpage watchlist screen with live stock prices", aspect: 128 / 255, caption: "Information is provided without any guidance leaving the user to figure out themselves the first step.", displayWidth: 190 },
        ],
      },
    ] satisfies InsightExample[],
    observed: { label: "What I Observed", heading: "Practice still assumes prior knowledge.", body: "Virtual money removes the consequence of making a wrong decision, but users still need to understand what to buy, why to buy it and how the interface works." },
    opportunity: { label: "The Opportunity", heading: "What if practice simplified the decision itself?", body: "Introduce concepts progressively and let beginners practise one financial decision at a time, before exposing them to the complexity of real investing." },
  },
] as const;
