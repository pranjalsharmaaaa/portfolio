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
        shots: [{ src: "/images/stackup/benchmark-groww-investready.webp", alt: "Groww mutual funds screen prompting account setup to start investing", aspect: 740 / 1278, caption: "Fund discovery and start investing becomes the primary thing" }],
      },
      {
        name: "IND Money",
        logo: "/images/stackup/logo-indmoney.webp",
        shots: [{ src: "/images/stackup/benchmark-indmoney-investready.webp", alt: "IND Money screen prompting mutual fund account setup and SIP actions", aspect: 740 / 1228, caption: "Users are shown actions first thing on the page" }],
      },
      {
        name: "Kuvera",
        logo: "/images/stackup/logo-kuvera.webp",
        shots: [{ src: "/images/stackup/benchmark-kuvera-investready.webp", alt: "Kuvera mutual fund collections and most-bought funds screen", aspect: 592 / 1129, caption: "Assumes users already know how to invest." }],
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
        shots: [{ src: "/images/stackup/benchmark-kuvera-learning.webp", alt: "Kuvera FAQ screen answering mutual fund questions", aspect: 592 / 1074, caption: "Learning is down in FAQ which are not part of the journey" }],
      },
      {
        name: "IND Money",
        logo: "/images/stackup/logo-indmoney.webp",
        shots: [{ src: "/images/stackup/benchmark-indmoney-learning.webp", alt: "IND Money dedicated finance course screen", aspect: 321 / 556, caption: "Education exists, but as a separate learning destination wherein user are expected to complete course" }],
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
        shots: [{ src: "/images/stackup/benchmark-moneybhai-practice.webp", alt: "Money Bhai gamified paper-trading portfolio dashboard", aspect: 348 / 249, caption: "Even if it is risk free practice it still assumes prior knowledge which give a lot of cognitive load", displayWidth: 348 }],
      },
      {
        name: "Frontpage",
        logo: "/images/stackup/logo-frontpage.webp",
        shots: [
          { src: "/images/stackup/benchmark-frontpage-practice-1.webp", alt: "Frontpage community feed with market discussion posts", aspect: 133 / 274, caption: "Through community feature with different experience between users gets overwhelming for someone to learn", displayWidth: 133 },
          { src: "/images/stackup/benchmark-frontpage-practice-2.webp", alt: "Frontpage watchlist screen with live stock prices", aspect: 128 / 255, caption: "Information is provided without any guidance leaving the user to figure out themselves the first step.", displayWidth: 128 },
        ],
      },
    ] satisfies InsightExample[],
    observed: { label: "What I Observed", heading: "Practice still assumes prior knowledge.", body: "Virtual money removes the consequence of making a wrong decision, but users still need to understand what to buy, why to buy it and how the interface works." },
    opportunity: { label: "The Opportunity", heading: "What if practice simplified the decision itself?", body: "Introduce concepts progressively and let beginners practise one financial decision at a time, before exposing them to the complexity of real investing." },
  },
] as const;

/**
 * Research screens (11-17), transcribed verbatim from the second
 * reference PDF ("User_1_merged"). Running text is stored as the PDF's
 * own lines (RichLine[]) so the 1440x810 slide can break exactly where
 * the frame does; in phone/flow layout the same lines simply wrap.
 */
export type RichSegment = { text: string; bold?: boolean; accent?: boolean };
export type RichLine = readonly RichSegment[];

export const stackupResearchIntro = {
  headingPlain: "Understanding how",
  headingAccent: "People actually manage their money",
  body: [
    [{ text: "I conducted conversations with " }, { text: "40+ people", bold: true }, { text: " across different levels of financial experience. It was " }, { text: "first-time", bold: true }],
    [{ text: "earners in their 20s", bold: true }, { text: " whose experiences most closely validated my initial hypothesis and shaped the direction" }],
    [{ text: "of this project." }],
  ] satisfies RichLine[],
} as const;

export const stackupConversations = {
  label: "23 USER CONVERSATIONS - Early-career professionals aged 21–26, managing money independently",
  quotes: [
    [
      [{ text: "“I learnt through " }, { text: "external", bold: true }],
      [{ text: "websites, youtube channels", bold: true }, { text: " and" }],
      [{ text: "then do the investment”" }],
    ],
    [
      [{ text: "\"Even after managing my own" }],
      [{ text: "money, I " }, { text: "still don't understand", bold: true }],
      [{ text: "many financial terms.", bold: true }, { text: "\"" }],
    ],
    [
      [{ text: "“There are a lot of financial tools" }],
      [{ text: "overall i " }, { text: "don’t know where to", bold: true }],
      [{ text: "start from", bold: true }, { text: "”" }],
    ],
    [
      [{ text: "“Online Websites se " }, { text: "smjh aajata h", bold: true }],
      [{ text: "mgr jb krne lgti hun manage toh" }],
      [{ text: "confidence nhi aata", bold: true }, { text: "”" }],
    ],
    [
      [{ text: "“Bohot " }, { text: "time consuming hota h", bold: true }],
      [{ text: "khudse seekhna", bold: true }, { text: " Financial tools" }],
      [{ text: "ke bare mein”" }],
    ],
    [
      [{ text: "“Mentally I " }, { text: "need to calculate my", bold: true }],
      [{ text: "Financial Worth", bold: true }, { text: "”" }],
    ],
    [
      [{ text: "“I’m " }, { text: "scared of being judged", bold: true }, { text: " for" }],
      [{ text: "not knowing basic terms." }],
    ],
    [
      [{ text: "“I " }, { text: "depend on my friend", bold: true }, { text: " who" }],
      [{ text: "manages my finances”" }],
    ],
  ] satisfies RichLine[][],
  closing: "A few patterns kept repeating",
} as const;

export const stackupInsights = {
  label: "Insights",
  heading: "People weren’t struggling in the same way.",
  subheading: "Although participants had different experiences, their behaviours consistently fell into four patterns.",
  patterns: [
    { lines: ["DEPEND ON OTHERS"], image: "/images/stackup/insight-depend.webp", alt: "Illustration: a person resting their arms on a table, looking unsure, with a question mark" },
    { lines: ["FIGURE IT OUT", "THEMSELVES"], image: "/images/stackup/insight-figure-out.webp", alt: "Illustration: a person at a laptop with YouTube and Google icons floating beside them" },
    { lines: ["MANAGE IT", "IN FRAGMENTS"], image: "/images/stackup/insight-fragments.webp", alt: "Illustration: a person holding a phone and a notebook, with question marks in a thought bubble" },
    { lines: ["HESITATE TO ASK"], image: "/images/stackup/insight-hesitate.webp", alt: "Illustration: a person with folded arms beside a warning shield" },
  ],
  closing: [{ text: "Different behaviours pointed to the same underlying need: " }, { text: "guidance before action.", bold: true }] satisfies RichLine,
} as const;

export const stackupProblemStatement = {
  label: "Problem Statement",
  statement: [
    [{ text: "Financial products help people execute decisions," }],
    [{ text: "but do little to build the " }, { text: "understanding and confidence", accent: true }, { text: " needed to" }],
    [{ text: "make those decisions independently." }],
  ] satisfies RichLine[],
  paragraphs: [
    [
      [{ text: "Complex terminology, fragmented financial information, and limited guidance", bold: true }, { text: " make it difficult " }, { text: "for first-time", bold: true }],
      [{ text: "earners", bold: true }, { text: " to understand where they stand, learn through action, and make informed decisions." }],
    ],
    [[{ text: "As a result, the " }, { text: "fear of losing money", bold: true }, { text: " often prevents people from taking their first step with confidence." }]],
  ] satisfies RichLine[][],
} as const;

export const stackupDesignOpportunity = {
  label: "Design Opportunity",
  opportunities: [
    { title: "Start", question: "How might we make the first financial step feel simple and judgment-free?" },
    { title: "Understand", question: "How might we make the overall financial picture easier to understand?" },
    { title: "Experience", question: "How might people learn from financial decisions without risking real consequences?" },
    { title: "Confidence", question: "How might we build confidence to move from learning to real financial decisions?" },
  ],
} as const;

export const stackupResearchToDesign = {
  heading: "From Research to Design",
  body: [
    [{ text: "The research defined the problem. The next step was translating those insights into an interface that felt" }],
    [{ text: "simple, trustworthy and encouraging.", bold: true }],
  ] satisfies RichLine[],
} as const;

export const stackupVisualLanguage = {
  label: "From Inspiration to System",
  heading: "Building Stack Up's visual language",
  pills: ["Bold Heading", "Calm Interfaces", "Hero Illustrations"],
} as const;

/*
 * Screens 18-24 — the product walkthrough (third reference PDF). Copy is
 * verbatim from the PDF, split into its own lines; phone screenshots are
 * the PDF's embedded images, listed left to right.
 */
export const stackupPrototype = {
  label: "See Stackup in Action",
  body: [
    [{ text: "A guided financial journey designed to help first-time earners understand, practise, and build confidence before" }],
    [{ text: "investing real money." }],
  ] satisfies RichLine[],
  cta: "Open Interactive Prototype",
  href: "https://www.figma.com/proto/qv5yeiq6zjTMy87nvgYxdk/Team-project?node-id=1626-2000&p=f&t=WaPCjpAtxQseqVkY-1&scaling=scale-down&content-scaling=fixed&page-id=1592%3A3749",
} as const;

export const stackupOnboarding = {
  label: "Onboarding Experience",
  body: [
    [{ text: "The onboarding gradually introduces the core ideas behind Stack Up from " }, { text: "understanding the user's confidence", bold: true }],
    [{ text: "level", bold: true }, { text: " to " }, { text: "creating a safe space for practice.", bold: true }],
  ] satisfies RichLine[],
  phones: [
    "Welcome screen: Stack Up logo, a photo of a smiling woman at a laptop, 'Finances Made Easy' and a Get Started button",
    "Know You Better: 'When it comes to money, which feels most like you?' with the options 'I'm still building my confidence' and 'I'm confident with money'",
    "Learn Without Risk: investing can feel risky, so your first decisions happen without real money",
    "Meet Your Practice Wallet: virtual money to explore investments without risking real money",
    "You're All Set: a Practice Wallet balance of ₹25,000 and a Let's Begin Journey button",
  ],
  captions: ["Welcome", "Understand You", "Learn Safely", "Practice Wallet", "Start Journey"],
} as const;

export const stackupJourney = {
  label: "Your Journey Begins",
  body: [
    [{ text: "After onboarding, users enter a " }, { text: "guided journey", bold: true }, { text: " where financial concepts are introduced progressively through" }],
    [{ text: "learning and decision-making.", bold: true }],
  ] satisfies RichLine[],
  phones: [
    "Home screen: a ₹25,000 practice wallet and a 'First Step Starts Here' journey card",
    "First Move: the easiest way to start growing your money is with a Mutual Fund, shown as an unlocked card",
    "Mutual Funds explained: a mutual fund spreads your money across many companies, tagged Beginner Friendly, Many Companies and Lower Risk",
    "Question: 'How do you feel about changes in your investment value?' with three comfort options",
    "Question: 'How long would you feel comfortable leaving this money invested?' with less than 3, 3–7 and more than 7 years",
  ],
  captions: ["single guided journey", "one financial concept at a time", "discover the right choice through guided questions"],
} as const;

export const stackupRecommendation = {
  label: "Personalised Recommendation",
  body: [
    [{ text: "Based on users' responses, the app recommends a " }, { text: "beginner-friendly mutual fund type", bold: true }, { text: " and explains the" }],
    [{ text: "reasoning behind every recommendation.", bold: true }],
  ] satisfies RichLine[],
  phones: [
    "Loading screen: 'Finding your best starting point…' matching your preferences to a Mutual Fund category",
    "Best Starting Point: a Hybrid Mutual Fund card listing why it matches your answers",
    "Why Hybrid?: part of your money aims for growth while another part focuses on stability, with growth, stability and risk ratings",
    "Meet the Three Categories: Equity, Hybrid (recommended) and Debt, with a Continue button",
  ],
  captions: ["finding a match", "recommendation", "understanding the recommendation", "explore alternatives"],
} as const;

export const stackupFundSelection = {
  label: "Mutual Fund Selection",
  body: [
    [{ text: "Users receive a " }, { text: "personalized recommendation", bold: true }, { text: ", but can " }, { text: "compare alternatives", bold: true }, { text: " before making their decision." }],
  ] satisfies RichLine[],
  phones: [
    "Choose Mutual Fund: ICICI Prudential Balanced Advantage Fund marked Your Best Match, with a Start with this fund button",
    "Choose Mutual Fund: SBI Equity Hybrid Fund marked More Growth — more growth potential, less stability",
    "Choose Mutual Fund: HDFC Balanced Advantage Fund marked More Stable — less growth potential, more stability",
  ],
  captions: ["recommended", "compare alternatives"],
} as const;

export const stackupFirstInvestment = {
  label: "First Investment",
  body: [
    [{ text: "The first investment is broken into " }, { text: "small, guided decisions.", bold: true }, { text: " Every step " }, { text: "builds confidence", bold: true }, { text: " before rewarding" }],
    [{ text: "progress." }],
  ] satisfies RichLine[],
  phones: [
    "How to Invest: choose between a One-Time Investment and a Monthly SIP",
    "One-Time Investment: entering ₹5,000 on a number pad",
    "Ready to Invest?: a review of ₹5,000 moving from the Practice Wallet into the ICICI Prudential Balanced Advantage Fund, with an Invest ₹5000 button",
    "First Investment Complete!: confidence increased from 0% to 10%",
  ],
  captions: ["choose how to invest", "enter amount", "review before confirming", "build confidence"],
} as const;

export const stackupPortfolio = {
  label: "Learning Through Your Portfolio",
  body: [
    [{ text: "Instead of only showing performance, the portfolio helps users understand " }, { text: "what they own, how it behaves, and", bold: true }],
    [{ text: "how their confidence grows over time.", bold: true }],
  ] satisfies RichLine[],
  phones: [
    "Your Confidence Jar: confidence grows with every financial challenge; reach 100% to start investing with real money",
    "Assets: a ₹25,000 asset portfolio split between the practice wallet and mutual funds, with Stocks still locked",
    "Asset Portfolio: total assets of ₹25,000 and how the mutual fund investment has performed",
    "Practice Mode: small market changes amplified 100× so they're easier to notice",
  ],
  captions: ["build confidence", "assets → details", "practice mode"],
} as const;
