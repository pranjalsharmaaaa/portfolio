/**
 * YANA case study, reference PDF part 3: the two user personas, the
 * "02 DEFINE" chapter (problem statement, HMW framing) and the
 * "03 Ideation" chapter (brainstorming, insights). Copy is verbatim
 * from the PDF — including the source's own wording in Aniket's persona
 * ("her own emotions", "her children") — only the typographic quote
 * marks around the persona quotes are normalized.
 */

export type YanaPersona = {
  name: string;
  demographics: string[];
  quote: string;
  photo: { src: string; width: number; height: number; alt: string; position: string };
  groups: { title: string; points: string[] }[];
};

export const yanaPersonas: YanaPersona[] = [
  {
    name: "Ayushi Sen",
    demographics: ["20 years, Female, Pune", "(Maharashtra)"],
    quote: "“Healing begins the moment you feel safe to be yourself”",
    photo: {
      src: "/images/yana/persona-ayushi.jpg",
      width: 417,
      height: 626,
      alt: "Ayushi Sen, smiling and looking to the side, seated indoors in a pink outfit",
      position: "50% 30%",
    },
    groups: [
      {
        title: "Personality",
        points: [
          "Ask for other’s validation.",
          "Go to different websites to find like minded people and often disappoints herself.",
          "Make it difficult for people to know real her.",
          "Often forgets things as a lot goes on in her mind",
        ],
      },
      {
        title: "Goals",
        points: [
          "To lead a happy and stress free life.",
          "Be emotionally strong and not depend on others for her own wellness.",
          "Do good in professional life and be financially independent.",
        ],
      },
      {
        title: "Frustrations",
        points: [
          "Difficulty in taking decisions on her own always have a fear of being judged because of which developed self doubt.",
          "Mood often make it difficult for her to achieve deadlines",
          "Give lot of love to others but do not receive the same which makes her unhappy.",
          "Got betrayed in love and friendship",
        ],
      },
      {
        title: "Behaviors and Strategies",
        points: [
          "Needs a person who understand her.",
          "Need to have her confidence built up once again.",
          "Need to open up to people.",
        ],
      },
    ],
  },
  {
    name: "Aniket Singh",
    demographics: ["27 years, Male, Gurugram", "(Haryana)"],
    quote: "“Seeking Safety in Silence: A Journey Toward Emotional Freedom.”",
    photo: {
      src: "/images/yana/persona-aniket.jpg",
      width: 600,
      height: 400,
      alt: "Aniket Singh, smiling with arms crossed, standing outdoors in a striped shirt",
      position: "47% 30%",
    },
    groups: [
      {
        title: "Personality",
        points: [
          "Desires to feel genuinely heard and understood.",
          "Struggles to express feelings due to limited emotional vocabulary.",
          "Needs guidance from someone who truly knows how to support.",
          "Craves clarity in understanding her own emotions.",
          "Financial security is also an important concern.",
        ],
      },
      {
        title: "Goals",
        points: [
          "Gain control over emotional well-being.",
          "Lead a happy, stress-free life.",
          "Build connections with supportive and non-judgmental people.",
          "Provide a better future for her children.",
        ],
      },
      {
        title: "Frustrations",
        points: [
          "Unsure how to express mental health struggles.",
          "Fear of social judgment and stigma.",
          "Experiences frequent emotional breakdowns.",
          "Seeks help but feels resources are inaccessible or too expensive.",
        ],
      },
      {
        title: "Behaviors and Strategies",
        points: [
          "Build a safe community where he can openly share feelings.",
          "Need affordable therapy options.",
          "Create spaces with like-minded, empathetic peers who accepts without judgment.",
        ],
      },
    ],
  },
];

export const yanaDefineChapter = { number: "02", title: "DEFINE" } as const;
export const yanaIdeationChapter = { number: "03", title: "Ideation" } as const;

/** Each statement as runs of plain / emphasized text, exactly where the PDF sets them in bold. */
export type YanaRun = { text: string; strong?: boolean };

export const yanaProblemStatement = {
  heading: "Problem Statement",
  statements: [
    [
      { text: "Young people in India " },
      { text: "(aged 18–29)", strong: true },
      { text: " often struggle to recognize, express, and manage their mental health challenges due to " },
      { text: "stigma, limited mental health literacy, high costs, and inaccessible professional support.", strong: true },
    ],
    [
      { text: "There is a " },
      { text: "lack of safe, affordable, and relatable pathways", strong: true },
      { text: " that guide users from " },
      { text: "self-help to community support to professional care in a stigma-free environment.", strong: true },
    ],
  ] satisfies YanaRun[][],
  /** The pathway the second statement names, drawn as its own small diagram (words from the statement itself). */
  pathway: ["self-help", "community support", "professional care"],
} as const;

export const yanaHmw = {
  heading: "Problem Framing Through HMW",
  items: [
    {
      label: "Self-Help & Early Recognition",
      question: "How might we encourage young adults to recognize and reflect on their mental health struggles early?",
    },
    {
      label: "Community & Stigma-Free Sharing",
      question: "How might we design a digital space that promotes safe, stigma-free sharing of lived experiences?",
    },
    {
      label: "Group Therapy Integration",
      question: "HMW make group therapy more approachable, inclusive, and accessible to young people in India?",
    },
    {
      label: "Access to Therapy & Support",
      question: "HMW create a seamless journey from self-help to peer support to professional care within one platform?",
    },
  ],
} as const;

export const yanaBrainstorm = {
  heading: "Brainstorming Session",
  photos: [
    {
      src: "/images/yana/brainstorm-workshop.jpg",
      width: 1280,
      height: 960,
      alt: "Brainstorming workshop: a group of students around a table facing a projected screen, with two people presenting at the front of the room",
    },
    {
      src: "/images/yana/brainstorm-whiteboard.jpg",
      width: 2400,
      height: 1800,
      alt: "Digital whiteboard from the session, photographed on screen: handwritten clusters of ideas on a teal canvas, including mental health awareness reels and videos, content creation, ease of access, personalization, group sessions, school and college, community, privacy, LGBTQ+ section, NGO collab and a suggestion dashboard",
    },
  ],
} as const;

export const yanaIdeationInsights = {
  heading: "Insights",
  rows: [
    ["Therapy feels inaccessible", "Stigma", "Booking should be easy", "Community Building", "Group Therapy"],
    ["Self Help Tools", "Mood Tracking", "Chat based support", "Modern UI", "Privacy First"],
  ],
} as const;
