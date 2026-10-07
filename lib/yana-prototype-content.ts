/**
 * YANA case study, reference PDF part 4: the information architecture,
 * the DASS-21 assessment, and the "04 Prototyping" chapter (the
 * prototype link and five feature walkthroughs). Copy is verbatim from
 * the PDF. The IA diagram's three misspelt labels ("Assesment",
 * "Communitty", "Attent") are corrected; nothing else is reworded.
 *
 * Phone screens are the PDF's own embedded images. Most are full-size
 * exports (1066–1368px wide, kept at 840px); the onboarding screens and
 * the wellbeing snapshot only exist inside a 1536×1024 slide mockup, so
 * they're cut from it at their native ~230–285px width and never shown
 * larger than that.
 */

/* ---------------------------------------------------------------- IA */

/**
 * One IA node for the phone flow: a single child continues the same
 * sequence ("A ↓ B"), several children branch into an indented group.
 */
export type YanaIaNode = { label: string; children?: YanaIaNode[] };

const chain = (...labels: string[]): YanaIaNode => {
  const [label, ...rest] = labels;
  return rest.length ? { label, children: [chain(...rest)] } : { label };
};

export const yanaIa = {
  heading: "Information Architecture",
  /** Entry sequence, top of the diagram. */
  entry: { root: "YANA", options: ["Take Assessment", "Skip"], snapshot: "Your Wellbeing Snapshot", home: "Home Screen" },
  /** The five top-level destinations and everything under each. */
  sections: [
    {
      label: "Home Screen",
      children: [
        chain("Notification", "Receive Notification"),
        { label: "Community", children: [chain("Search Community", "Join Community"), { label: "Start Community" }] },
        {
          label: "Share Thoughts",
          children: [{ label: "Draw Something" }, chain("Write Your Thoughts", "Post / Draft", "Search Others Post", "Like/Share")],
        },
        chain("Mood Relaxer", "Watch Videos"),
      ],
    },
    { label: "Minis", children: [chain("Short Videos", "Connect with Therapists")] },
    {
      label: "Therapy",
      children: [
        chain("Group Therapy", "Upcoming Therapies", "Pay and Confirm Booking"),
        chain("Individual Therapy", "Filter Option", "Choose Therapist", "Attend Free Session", "Confirm Therapist", "Proceed Further"),
      ],
    },
    { label: "Journal", children: [{ label: "New Journal" }, { label: "Search Previous" }] },
    {
      label: "Profile",
      children: [
        {
          label: "Settings",
          children: [
            { label: "Edit Profile" },
            { label: "Change Password" },
            { label: "Languages" },
            { label: "Legal and Policies" },
            { label: "Help and Support" },
            { label: "Logout" },
          ],
        },
        { label: "Your Posts" },
        { label: "Progress Report" },
        { label: "Take Assessment" },
        { label: "Message Therapist" },
      ],
    },
  ] satisfies YanaIaNode[],
} as const;

/* ----------------------------------------------------------- DASS-21 */

export const yanaDass = {
  heading: "Mental Health Assessment using DASS-21",
  what: {
    title: "What is DASS-21?",
    points: [
      "A standardized tool that measures Depression, Anxiety and Stress using 21 self- reported questions. It helps us understand where the users mentally and what kind of support and guidance they need.",
      "The DASS-21 was developed at the University of South Wales (UNSW), Australia, by Sidney Lovibond and Peter Lovibond",
    ],
  },
  why: {
    title: "Why DASS-21 in YANA",
    points: [
      "Quick & Validated assessment.",
      "Gives us a psychological snapshot.",
      "Helps personalize self-help or therapy suggestions.",
      "Non - invasive & easy to take.",
    ],
  },
  how: {
    title: "How we Used it?",
    points: [
      "Shown at the start of User onboarding or mental health check - in.",
      "Results stored securely and used to recommend self - help tools or therapist sessions.",
      "Retaken periodically to track progress.",
    ],
  },
  table: {
    columns: ["Depression", "Anxiety", "Stress"],
    rows: [
      { level: "Normal", values: ["0-9", "0-7", "0-14"] },
      { level: "Mild", values: ["10-13", "8-9", "15-18"] },
      { level: "Moderate", values: ["14-20", "10-14", "19-25"] },
      { level: "Severe", values: ["21-27", "15-19", "26-33"] },
      { level: "Extremely Severe", values: ["28+", "20+", "34+"] },
    ],
  },
  note: "NB Scores on the DASS-21 will need to be multiplied by 2 to calculate the final score.",
} as const;

/* ------------------------------------------------------- Prototyping */

export const yanaPrototypingChapter = { number: "04", title: "Prototyping" } as const;

export const yanaPrototype = {
  heading: "See Yana in Action",
  body: "A mental wellbeing experience designed to help people understand how they feel, explore the right support, and take small steps towards feeling better.",
  cta: "Open Interactive Prototype",
  /** No prototype link has been supplied yet — set it here and the CTA becomes a live link. */
  href: null as string | null,
};

export type YanaScreen = { src: string; width: number; height: number; alt: string; caption?: string };

const hi = (name: string, alt: string, caption?: string, height = 1736): YanaScreen => ({
  src: `/images/yana/screen-${name}.webp`,
  width: 840,
  height,
  alt,
  caption,
});

export const yanaOnboarding = {
  heading: "A more personal starting point",
  features: [
    { icon: "heart", title: "A safe space", body: "Answer at your own pace" },
    { icon: "sliders", title: "Personalized Experience", body: "Content and support adapted to you" },
    { icon: "lock", title: "Private and Confidential", body: "Your responses are always safe with us" },
  ],
  screens: [
    {
      src: "/images/yana/screen-onboarding-welcome.webp",
      width: 283,
      height: 649,
      alt: "YANA welcome screen: an illustrated woman with plants growing from her head, “We’re so glad you’re here!”, and a Get Started button",
    },
    {
      src: "/images/yana/screen-onboarding-feeling.webp",
      width: 249,
      height: 571,
      alt: "Onboarding step 2 of 8, “How have you been feeling lately?”, with mood options from Really good to Not great and Overwhelmed selected",
    },
    {
      src: "/images/yana/screen-onboarding-areas.webp",
      width: 245,
      height: 563,
      alt: "Onboarding step 4 of 8, “What areas would you like support with?”, a grid of topics with Anxiety selected",
    },
    {
      src: "/images/yana/screen-onboarding-allset.webp",
      width: 233,
      height: 539,
      alt: "“All set!” screen: YANA will now personalise curated content, recommended tools, therapist suggestions and community, with a Take me to YANA button",
    },
  ] satisfies YanaScreen[],
};

export const yanaHomeFeature = {
  heading: "A home that meets you where you are",
  body: "YANA adapts to your mood, interests and needs - bringing personalized content, tools and a supportive community, all in one place",
  screens: [
    hi("home-mood-relaxer", "Home screen on the Mood Relaxer tab: Mood Relaxer Suggestions with a meditation video and a therapist video", undefined, 1732),
    hi("home-express", "Home screen on the Share Your Thought tab: a drawing canvas and an Express Yourself text box, with Connect with the world", undefined, 1732),
    hi("home-feed", "Community feed: Connect, Share, Be seen & See others, mood and people filters, and a post from Nancy Singh", undefined, 1736),
    hi("home-community", "Community screen: search, recent searches and Your Communities — Anxiety, Depression, LGBTQ+ Support and Mental Health Awareness", undefined, 1718),
  ],
};

export const yanaJournalFeature = {
  heading: "Small moments, big progress",
  body: "Journal explore bite-sized content and build habits - designed to help you reflect, learn and feel a little better everyday, along with therapist led mini’s",
  screens: [
    hi("journal-calendar", "Journal Calendar for March 2026 with short notes on several days", "Journal Calendar"),
    hi("journal-entry", "Journal entry “Finding Self” from 27 May 2025, with a week strip below", "Journal Entry"),
    hi("journal-minis", "Minis: a short vertical video from psychologist Rachel Green, with like and share actions", "Minis"),
    {
      src: "/images/yana/screen-journal-snapshot.webp",
      width: 254,
      height: 575,
      alt: "Your Wellbeing Snapshot for the week: 3 journal entries, 5 minis watched, more calm than last week, mood improving",
      caption: "Your Wellbeing Snapshot",
    },
  ] satisfies YanaScreen[],
};

export const yanaTherapyFeature = {
  heading: "Find the right support for you",
  body: "YANA helps you discover qualified therapists and group sessions that matches your preferences and comfort level",
  screens: [
    hi("therapy-style", "Choose your Therapy Style: Individual Therapy or Group Therapy cards", "Choose Your Therapy Style"),
    hi("therapy-preferences", "Find your Perfect Therapist: concerns, preferred gender, experience, price per session and therapist approach", "Find Your Perfect Therapist"),
    hi("therapy-suggested", "Suggested Therapists: four therapist cards, each with specialty, years in practice and a Free Call button", "Suggested Therapists"),
    hi("therapy-group", "Group Therapy: upcoming group sessions with host, time, seats joined, price per person and Join Now", "Group Therapy"),
  ],
};

export const yanaProfileFeature = {
  heading: "Everything in one place",
  body: "Your profile is more than just settings - it’s your personal space to manage your wellbeing, connect with your therapist, and keep track of your journey",
  screens: [
    hi("profile-home", "Profile: Settings, Your Posts, Progress Report, Mental Wellbeing with Take Assessment, and Your Therapist with a Message button", "Profile"),
    hi("profile-chat", "Chat with Dr. Kanika Singh, CBT Specialist: a supportive conversation thread", "Therapist Chat"),
    hi("profile-edit", "Edit Profile: name, phone number, email and gender fields", "Edit Profile"),
    hi("profile-settings", "Profile settings: Edit Profile, Change Password, Languages, Legal and Policies, Help and Support, Logout", "Settings"),
  ],
};
