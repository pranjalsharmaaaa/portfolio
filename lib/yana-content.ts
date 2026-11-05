/**
 * YANA case-study copy, reproduced verbatim from the supplied reference
 * PDF (pages 1–5). Two source typos are corrected on purpose and nowhere
 * else is the wording changed: "Reduced Sigma" → "Reduced Stigma", and
 * "Develope" → "Develop".
 */

export const yanaCover = {
  pill: "You Are Not Alone",
  title: "YANA",
  tagline: "A Friend for Your Mental Health - Anytime, Anywhere",
  roleLabel: "MY ROLE",
  role: "Sole Product Designer",
} as const;

export type YanaOverviewItem = {
  title: string;
  description: string;
};

export const yanaOverview = {
  heading: "Project Overview",
  items: [
    { title: "Engaging UI", description: "Employed clean visual design & intuitive." },
    { title: "Affordable Therapy", description: "Offering Minis, Affordable Support group Therapies." },
    {
      title: "Self Emotional State Awareness",
      description: "We designed engaging mood check-ins, along with self-help tools",
    },
    {
      title: "Reduced Stigma around asking help",
      description: "Added open journaling, peer-shared stories & relatable therapist intros.",
    },
  ] satisfies YanaOverviewItem[],
} as const;

export type YanaProcessStep = {
  label: string;
  /** Exact blob + icon vectors lifted from the reference PDF (public/images/yana/process-*.svg). */
  icon: string;
};

/* ── Film · the 60-second product film (after the overview) ─────────── */
// Built in yana-film/ (Remotion) from this case study's own illustrations
// and app screens. Captions are burned in.
export const yanaFilm = {
  heading: "YANA in 60 seconds",
  sub: "From finding the words to finding support: check in at your own pace, reflect and connect, and explore therapy when you're ready.",
  video: {
    src: "/videos/yana/yana-film.mp4",
    poster: "/videos/yana/yana-film-poster.webp",
    width: 1920,
    height: 1080,
    duration: "1:00",
    title: "YANA — a 60-second narrated product film",
  },
  meta: ["1:00", "Narrated", "Captions on screen"],
} as const;

export const yanaProcess = {
  heading: "Design Process",
  steps: [
    { label: "Discover", icon: "/images/yana/process-discover.svg" },
    { label: "Define", icon: "/images/yana/process-define.svg" },
    { label: "Design", icon: "/images/yana/process-design.svg" },
    { label: "Develop", icon: "/images/yana/process-develop.svg" },
    { label: "Deliver", icon: "/images/yana/process-deliver.svg" },
  ] satisfies YanaProcessStep[],
} as const;

export const yanaDiscoverChapter = {
  number: "01",
  title: "DISCOVER",
} as const;

export const yanaDiscover = {
  whatIs: {
    heading: "What is Mental Health?",
    body: "Mental health is a state of well-being where individuals can cope with everyday stresses, recognize their abilities, work productively, and contribute to their communities",
  },
  whyMatters: {
    heading: "Why GOOD mental health matters?",
    body: "Good mental health supports well-being, strong relationships, and meaningful contributions to society by helping individuals cope with challenges and work productively.",
    emphasis:
      "Ignoring it can lead to stress, anxiety, burnout, poor performance, and strained relationships. It also causes significant social and economic losses, with productivity costs often exceeding the cost of care.",
  },
  policies: {
    heading: "Mental Health Policies and Initiatives",
    points: [
      "The National Mental Health Policy of 2014 aims to promote mental health, ensure access to mental health care, and reduce stigma associated with mental illness.",
      "Initiatives like Tele MANAS and the National Suicide Prevention Strategy have been launched to enhance access to mental health services.",
    ],
  },
} as const;
