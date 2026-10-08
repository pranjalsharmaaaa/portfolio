/**
 * Copy for the Sales Coach case study (app/sales-coach), transcribed
 * from the 16-page Sales Coach PDF — the content source of truth — not
 * written for this portfolio. One export per PDF page, in page order.
 * Kept separate from the section components per this codebase's
 * existing convention (see site-content.ts, stackup-content.ts).
 *
 * Wording is the PDF's own. The only edits are obvious typos:
 *   p3  "had to got through"          → "had to go through"
 *   p4  "the account and it's context" → "the account and its context"
 *   p6  "context, response and iteraction" → "…interaction"
 *   p10 "Taking to the salesperson"   → "Talking to the salesperson"
 *   p13 "From know the account to being read for…" → "From knowing the account to being ready for…"
 *   p13 "Relevant the conversation"   → "Rehearse the conversation" (matches p12's identical step)
 *   p13 "He understands the basic"    → "He understands the basics"
 *
 * `accent` is the part of a heading set in Airtel red.
 */

const img = (name: string) => `/images/sales-coach/${name}.webp`;

export type Heading = { plain: string; accent?: string; accentFirst?: boolean };

/* ── 01 · Cover ─────────────────────────────────────────────────────── */
export const scCover = {
  badge: "Sales Coach",
  headline:
    "A voice-first AI experience that helps Airtel KAMs prepare, practise, and act on customer opportunities.",
  body: "AI brings together the right customer context, insights, and next actions so salespeople spend less time searching and more time selling.",
  meta: [
    { label: "My role", lines: ["Sole Product Designer - AI Experience"] },
    { label: "Designed for", lines: ["Airtel KAMs", "Airtel Work - Internal Application"] },
  ],
  phone: { src: img("cover-hand-phone"), alt: "A hand holding a phone showing the Sales Coach home screen: JK Tyres & Industries account, conversation context, recommended next move and Ask coach button", width: 1172, height: 1416 },
  orb: { src: img("cover-ai-orb"), alt: "", width: 1000, height: 671 },
} as const;

/* ── 02 · Understanding the sales environment ──────────────────────── */
export const scEnvironment = {
  heading: { plain: "Understanding the ", accent: "sales environment" } satisfies Heading,
  sub: "Before exploring solutions, I needed to understand what makes B2B selling different",
  image: { src: img("kam-at-desk"), alt: "Illustration of a KAM at her desk thinking, with a notebook, laptop and an Airtel mug", width: 1200, height: 766 },
  points: [
    { n: "01", title: "It’s Account-led", body: "A KAM works with an entire customer account, not a single transaction" },
    { n: "02", title: "Context is everything", body: "Preparation depends on connecting customer details, recent activity, business needs & relevant products" },
    { n: "03", title: "Opportunity is action", body: "Every conversation should move towards relevant solutions and open the next goal" },
  ],
  insight: {
    label: "Insight",
    lines: [{ text: "The meeting starts" }, { text: "before the meeting", accent: true, italic: true }],
    aside: "The Meeting Brief isn’t just a place to find information, It’s the starting point for a customer conversation",
  },
} as const;

/* ── 03 · Finding what matters ──────────────────────────────────────── */
export const scFinding = {
  heading: { plain: "Finding ", accent: "what matters" } satisfies Heading,
  sub: "The initial brief: help salespeople quickly understand what matters before a customer meeting",
  body: "The Meeting Brief already had a lot of valuable information - but salesperson still had to go through multiple sections and pieces everything together to prepare for a customer meeting",
  intent: { label: "Business intent", text: "Help salesperson identify and act on opportunities to grow existing accounts" },
  caption: "Present Airtel Work Application",
  screens: Array.from({ length: 7 }, (_, i) => ({
    src: img(`legacy-screen-${i + 1}`),
    alt: `Existing Airtel Work meeting brief, screen ${i + 1} of 7: long sections of recommended products, external insights, headwinds and tailwinds, key signals and win themes`,
  })),
  callouts: ["Scattered information", "Context gets buried", "Dense Information", "Opportunities are hard to spot", "Too much reading to find the signal"],
  closing: { plain: "The information wasn’t missing, ", accent: "The context was" },
} as const;

/* ── 04 · What if the brief did more? ───────────────────────────────── */
export const scBriefMore = {
  heading: { plain: "What if the brief did ", accent: "more?" } satisfies Heading,
  sub: "I explored different ways to turn a static information brief into something that could actively help a salesperson prepare.",
  steps: [
    { n: "01", title: "Understand", body: "Make sense of the account and its context", src: img("step-understand"), alt: "KAM thinking about account, insights, signals and products" },
    { n: "02", title: "Discover", body: "Identify relevant opportunities across the account", src: img("step-discover"), alt: "KAM spotting opportunities" },
    { n: "03", title: "Prepare", body: "Get ready for the conversation with right context", src: img("step-prepare"), alt: "KAM ticking off a meeting-prep checklist on a tablet" },
    { n: "04", title: "Act", body: "Walk into the meeting with clarity and take the next step", src: img("step-act"), alt: "KAM walking into the meeting, marked ready" },
  ],
} as const;

/* ── 05 · Could AI make this possible? ──────────────────────────────── */
export const scAiPossible = {
  heading: { plain: "Could AI make this ", accent: "possible?" } satisfies Heading,
  sub: "I explored how different AI experiences handle context, conversation, recommendations and action - looking for patterns that could support the salesperson's journey.",
  patterns: [
    {
      title: "Embedded AI",
      body: "AI is integrated within existing product flows to surface relevant insights, recommendations or next actions.",
      logos: [
        { src: img("logo-salesforce"), alt: "Salesforce", w: 400, h: 280, size: "h-10" },
        { src: img("logo-hubspot"), alt: "HubSpot", w: 400, h: 118, size: "h-[18px]" },
        { src: img("logo-oracle"), alt: "Oracle", w: 400, h: 57, size: "h-[13px]" },
        { src: img("logo-verizon"), alt: "Verizon Connect", w: 400, h: 153, size: "h-6" },
      ],
      image: { src: img("ai-embedded"), w: 1000, h: 502 },
      goodFor: ["Surface", "Recommend"],
      highlight: false,
    },
    {
      title: "AI Co Pilots",
      body: "A persistent assistant that helps users completes tasks, find information and make decisions within a workflow.",
      logos: [
        { src: img("logo-servicenow"), alt: "ServiceNow", w: 400, h: 69, size: "h-[22px]" },
        { src: img("logo-zoho"), alt: "Zoho", w: 400, h: 174, size: "h-10" },
      ],
      image: { src: img("ai-copilot"), w: 1000, h: 569 },
      goodFor: ["Ask", "Assist"],
      highlight: false,
    },
    {
      title: "Conversational AI",
      body: "Users interact naturally through conversation to explore information, ask questions and work through a task.",
      logos: [
        { src: img("logo-chatgpt"), alt: "ChatGPT", w: 400, h: 100, size: "h-7" },
        { src: img("logo-gemini"), alt: "Gemini", w: 246, h: 63, size: "h-6" },
        { src: img("logo-claude"), alt: "Claude", w: 312, h: 75, size: "h-[26px]" },
      ],
      image: { src: img("ai-conversational"), w: 1000, h: 611 },
      goodFor: ["Ask", "Explore", "Practice"],
      highlight: true,
    },
  ],
  insight: {
    label: "Insight",
    lines: [
      { text: "Conversational AI felt " },
      { text: "closest", accent: true, italic: true, inline: true },
      { text: "to the experience I wanted to create." },
    ],
    aside: "It could move beyond showing information to working with the salesperson through their journey - helping them understand, discover, prepare and take actions.",
  },
} as const;

/* ── 06 · Learning the patterns behind AI ───────────────────────────── */
export const scPatterns = {
  heading: { plain: "Learning the ", accent: "patterns behind AI." } satisfies Heading,
  sub: "I studied how AI takes input, uses context, responds and works with people.",
  cards: [
    { key: "input", title: "Input", body: "How users communicate with AI", src: img("pattern-input"), w: 1301, h: 828, alt: "Prompt bar with suggestion chips and a listening voice input" },
    { key: "output", title: "Output", body: "How AI responds & structures information", src: img("pattern-output"), w: 1356, h: 793, alt: "AI response listing three ranked opportunities with layout options: cards, list, table, priority" },
    // The PDF repeats Output's subtitle under Iteration verbatim; kept as-is.
    { key: "iteration", title: "Iteration", body: "How AI responds & structures information", src: img("pattern-iteration"), w: 1400, h: 632, alt: "“Can you make this shorter?” with regenerate, edit, compare and copy actions" },
    { key: "system-state", title: "System State", body: "How AI communicates progress and builds trust", src: img("pattern-system-state"), w: 1400, h: 296, alt: "Progress states: analysing account, searching relevant data, thinking, using 3 sources, generating response" },
    { key: "context", title: "Context", body: "How AI understand & remember the situation", src: img("pattern-context"), w: 1400, h: 775, alt: "JK Tyre account connected to past interactions, account details, products and solutions, upcoming meeting" },
  ],
  takeaway: {
    label: "Key takeaway",
    lines: [{ text: "AI UX is " }, { text: "not just a chatbot", accent: true, inline: true }],
    aside: "The patterns around context, response and interaction shape how useful AI feels",
  },
} as const;

/* ── 07 · Defining the experience ───────────────────────────────────── */
export const scPrinciples = {
  heading: { plain: "Defining the ", accent: "experience" } satisfies Heading,
  sub: "I translated the research into three principles for how Sales Coach should work.",
  principles: [
    { n: "01", label: "See first", title: "The brief should be immediate.", body: "A quick, scannable meeting brief helps the salesperson get up to speed in seconds" },
    { n: "02", label: "Ask in context", title: "Voice should be where the work is.", body: "The salesperson can ask questions instantly without leaving the current context" },
    { n: "03", label: "Practise", title: "Preparation can be a conversation", body: "Salesperson can rehearse a realistic conversation with the AI and build confidence before the meeting" },
  ],
  takeaway: {
    label: "Key takeaway",
    lines: [{ text: "The AI shouldn’t be another destination." }, { text: "It should sit " }, { text: "alongside the salesperson as they prepare.", accent: true, inline: true }],
  },
} as const;

/* ── 08 · From ideas to a working prototype ─────────────────────────── */
export const scPrototype = {
  heading: { plain: "From ideas to a ", accent: "working prototype" } satisfies Heading,
  sub: "With design principles in place, I used Claude to rapidly prototype the initial experience and explore how it could work end to end",
  screens: [
    { n: "01", title: "Home", body: "Upcoming conversation at a glance", src: img("proto-home"), alt: "Prototype home: Welcome back Priya, next conversation with JK Tyre & Industries" },
    { n: "02", title: "Meeting Brief", body: "Key information in a scannable format", src: img("proto-brief"), alt: "Prototype meeting brief with key facts and next best action" },
    { n: "03", title: "Ask in context", body: "Voice available right where you are", src: img("proto-ask"), alt: "Prototype voice answer: AWS spend from $40K to $95K, +138%" },
    { n: "04", title: "Practise Simulation", body: "AI simulates a realistic conversation", src: img("proto-practise"), alt: "Prototype practice: Rajesh Menon, your turn to respond" },
  ],
  learnedLabel: "What I learned from prototyping",
  learned: [
    { icon: "rocket", title: "Validated the flow", body: "I could quickly test how the screens connect - from home to brief to voice to practice" },
    { icon: "sliders", title: "Explored different interactions", body: "I tried multiple layouts, voice UI patterns and content formats to see what felt clear and natural" },
    { icon: "people", title: "Identified gaps early", body: "This helped me spot what was working, what felt confusing, and what needed further iteration" },
  ],
  takeaway: {
    label: "Key takeaway",
    lines: [{ text: "Prototyping helped me move from abstract ideas" }, { text: "to a " }, { text: "concrete experience", accent: true, inline: true }, { text: " I could test and refine.", inline: true }],
  },
} as const;

/* ── 09 · I put the idea under scrutiny ─────────────────────────────── */
export const scScrutiny = {
  heading: { plain: "I put the idea under ", accent: "scrutiny." } satisfies Heading,
  sub: "After exploring the experience in Claude and Figma, I shared the direction with senior product designers and product leaders to challenge my approach before talking to KAMs.",
  flow: [
    { icon: "sparkle", title: "EXPLORE - Claude + Figma", body: "I created early concept to explore the experience" },
    { icon: "people", title: "REVIEW - Senior Product Designers & Leaders", body: "I shared the direction for critique and different perspective" },
    { icon: "arrow", title: "ITERATE - Refine the experience", body: "I used the feedback to clarify what AI should do & how the experience should work" },
  ],
  testingLabel: "What I was testing",
  testing: [
    { n: "01", title: "Context", body: "Is the right context available?" },
    { n: "02", title: "Structure", body: "Does the flow make sense?" },
    { n: "03", title: "Interaction", body: "Does AI feel natural?" },
  ],
  takeaway: {
    label: "Key takeaway",
    lines: [{ text: "The concept was taking shape" }, { text: "But I still needed to hear from salespeople.", accent: true }],
  },
} as const;

/* ── 10 · Talking to the salesperson ─────────────────────────────────── */
export const scTalking = {
  heading: { plain: "Talking to the salesperson" } satisfies Heading,
  sub: "I spoke with KAMs to understand how they prepare for customer conversations, what information they rely on, and where the existing workflow gets in the way.",
  stats: { count: "16", countLabel: "KAMs", cities: "Gurugram, Bengaluru, Mumbai", citiesLabel: "Conversations across different experience level" },
  image: { src: img("kam-conversation"), alt: "Illustration of three KAMs in conversation around laptops", width: 1143, height: 352 },
  insightsLabel: "Key insights from the conversation",
  insights: [
    { plain: "Information is everywhere.", accent: "But focus isn’t.", body: "KAMs have a lot of information available, but it’s not always clear what is relevant.", src: img("insight-focus"), w: 476, h: 382 },
    { plain: "The existing brief needs", accent: "interpretation.", body: "KAMs still piece together information to understand what matters for the conversation.", src: img("insight-interpret"), w: 651, h: 329 },
    { plain: "Preparation is different", accent: "for every meeting.", body: "The right context changes based on the account, customer, and purpose of the meeting.", src: img("insight-timing"), w: 567, h: 374 },
  ],
  takeaway: {
    label: "Key takeaway",
    lines: [{ text: "The problem wasn’t the lack of information" }, { text: "It was knowing what mattered for this meeting", accent: true }],
  },
} as const;

/* ── 11 · The conversations sharpened the brief ─────────────────────── */
export const scSharpened = {
  heading: { plain: "The conversations ", accent: "sharpened the brief." } satisfies Heading,
  sub: "The KAM conversations surfaced broader needs, but they also clarified what the Meeting Brief needed to do better.",
  needs: [
    { title: "Discover more", quote: "“What else can i sell?”", body: "Government, industry or account signals could reveal new opportunities.", tag: "Business Need", src: img("need-discover"), w: 666, h: 501, highlight: false },
    { title: "Prepare better", quote: "“What do I actually need to know before the meeting?”", body: "Make the account brief easier to understand and easier to act on.", tag: "Design Problem", src: img("need-prepare"), w: 693, h: 498, highlight: true },
    { title: "Update less", quote: "“Why am I updating this twice”", body: "Airtel Work and Salesforce create duplicate work.", tag: "Process constraint", src: img("need-update"), w: 706, h: 468, highlight: false },
  ],
} as const;

/* ── 12 / 13 · Before → After ───────────────────────────────────────── */
export type BeforeAfter = {
  heading: Heading;
  sub: string;
  before: { title: string; body: string; src: string; alt: string; w: number; h: number; steps: { title: string; body: string }[] };
  after: { title: string; body: string; src: string; alt: string; w: number; h: number; steps: { title: string; body: string }[] };
  takeaway: { label: string; lines: { text: string; accent?: boolean }[] };
};

export const scPartner: BeforeAfter = {
  heading: { plain: "From brief to ", accent: "preparation partner." },
  sub: "I evolved the Meeting Brief into an experience that helps salesperson understand, prepare and act.",
  before: {
    title: "Static Meeting Brief",
    body: "Huge text with lost context to find account information",
    src: img("before-static-brief"),
    alt: "KAM overwhelmed by spreadsheets, PDFs and sticky notes: “So much information… what is relevant for today?”",
    w: 1200, h: 586,
    steps: [
      { title: "Read", body: "Go through multiple sections" },
      { title: "Search", body: "Find relevant information" },
      { title: "Interpret", body: "Figure out what matters for the meeting" },
    ],
  },
  after: {
    title: "Sales Coach",
    body: "A voice-first preparation partner that works with the salesperson",
    src: img("after-sales-coach"),
    alt: "KAM using Sales Coach on her laptop: key points for today, ask anything, and let’s practise the conversation",
    w: 1200, h: 638,
    steps: [
      { title: "Understand", body: "See what matters for this meeting" },
      { title: "Ask", body: "Get relevant answers in context" },
      { title: "Practise", body: "Rehearse the conversation with AI" },
    ],
  },
  takeaway: { label: "Key takeaway", lines: [{ text: "The goal wasn’t more information" }, { text: "It was getting to what matters, faster.", accent: true }] },
};

export const scConfidence: BeforeAfter = {
  heading: { plain: "From knowing the account to ", accent: "being ready for the conversation" },
  sub: "Ajay, a newly joined KAM, has been assigned a new customer account. He understands the basics, but wants to practise the conversation before his first meeting.",
  before: {
    title: "Preparing alone",
    body: "He goes through account information, review products, and tries to think of possible questions on his own.",
    src: img("ajay-alone"),
    alt: "Ajay at his laptop with a pile of books, unsure",
    w: 726, h: 616,
    steps: [
      { title: "Read", body: "Go through multiple sections" },
      { title: "Search", body: "Find relevant information" },
      { title: "Feel unsure", body: "Not confident if he’s ready" },
    ],
  },
  after: {
    title: "Sales Coach",
    body: "This gives Ajay a realistic role play based conversation so he can rehearse, get feedback and build confidence.",
    src: img("ajay-practice"),
    alt: "Ajay confidently rehearsing on a video call with an AI-played customer",
    w: 702, h: 649,
    steps: [
      { title: "Understand", body: "See what matters for this meeting" },
      { title: "Practise", body: "Rehearse the conversation with AI" },
      { title: "Get feedback", body: "See what went well & where to improve" },
    ],
  },
  takeaway: { label: "Key takeaway", lines: [{ text: "The goal wasn’t just preparation." }, { text: "It was building confidence before the conversation.", accent: true }] },
};

/* ── 14 · Understand the Account ────────────────────────────────────── */
export const scUnderstand = {
  heading: { plain: "Understand the Account" } satisfies Heading,
  sub: "Sales Coach brings the upcoming customer conversation, account history and relevant opportunities together so the salesperson knows where to focus.",
  phones: [
    { src: img("phone-home-accounts"), alt: "Sales Coach home: My accounts, JK Tyres & Industries and Tata Consultancy Services with View brief and Ask coach" },
    { src: img("phone-home-expanded"), alt: "Expanded JK Tyres account: conversation context, last discussed AWS evaluation, recommended next move" },
    { src: img("phone-meeting-brief"), alt: "JK Tyres meeting brief: suggested agenda, here’s what matters, AWS spend up 138%, account context" },
  ],
} as const;

/* ── 15 · Ask in Context ────────────────────────────────────────────── */
export const scAsk = {
  heading: { plain: "Ask in Context" } satisfies Heading,
  sub: "Sales Coach lets the salesperson ask questions without leaving the account context.",
  // Supporting copy is lifted from elsewhere in the PDF (principle 02 on
  // p7, prototype screen 03 on p8) — p15 itself is title-only.
  principle: { label: "02 Ask in context", title: "Voice should be where the work is.", body: "The salesperson can ask questions instantly without leaving the current context" },
  video: {
    src: "/videos/sales-coach/ask-in-context.mp4",
    poster: "/videos/sales-coach/ask-in-context-poster.webp",
    width: 1080,
    height: 2346,
    label: "Sales Coach answering “At what rate are JK Tyres taking AWS?” inside the JK Tyres account, then collapsing the transcript to the headline",
  },
} as const;

/* ── 16 · Practise the Conversation ─────────────────────────────────── */
export const scPractise = {
  heading: { plain: "Practise the Conversation" } satisfies Heading,
  sub: "Sales Coach lets salespeople rehearse a real customer conversation before they walk into the meeting.",
  phones: [
    { src: img("phone-practice-accounts"), alt: "Practice Mode: My accounts with a Practice button for JK Tyres & Industries and Tata Consultancy Services" },
    { src: img("phone-practice-prepare"), alt: "Prepare for the conversation: context of two previous meetings with Rajesh, today’s conversation goal, AI will play Rajesh, you lead, Start" },
  ],
  video: {
    src: "/videos/sales-coach/practice-rajesh.mp4",
    poster: "/videos/sales-coach/practice-rajesh-poster.webp",
    width: 860,
    height: 1864,
    label: "Practice mode demo: the AI plays Rajesh Menon, Global IT Head, speaking — then it’s your turn",
  },
} as const;
