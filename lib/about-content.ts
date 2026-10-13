/**
 * Professional Experience for the /about page (rendered by
 * components/about-page/experience-section.tsx). The rest of the
 * page's copy and photos live in lib/site-content.ts's `aboutPage`.
 */

export type ExperienceRole = {
  company: string;
  role: string;
  /** Display text, e.g. "Dec 2025". */
  start: string;
  /** Display text, e.g. "Present". */
  end: string;
  /** One entry per paragraph; more than one renders as a list. */
  details: string[];
};

/** The owner's own roles, newest first. */
export const experience: ExperienceRole[] = [
  {
    company: "Airtel",
    role: "Product Design Intern",
    start: "Dec 2025",
    end: "Present",
    details: [
      "Designed a simulated finance experience for young earners to learn through real-world decisions.",
      "Designed a voice-first Sales Coach to provide contextual guidance to sales teams.",
      "Codified Airtel’s design legacy into UX principles and interaction guidelines.",
    ],
  },
  {
    company: "IIT Delhi – UX Lab",
    role: "UI/UX Intern",
    start: "Sep 2025",
    end: "Nov 2025",
    details: [
      "Designed an independent learning experience for Anganwadi children, helping them learn and explore with less reliance on Sahyikas.",
    ],
  },
  {
    company: "2nd Foundation Software",
    role: "UI/UX and React Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    details: [
      "Worked with stakeholders to uncover workflow gaps, redesigned enterprise dashboards, and collaborated with developers to bring simpler experiences to life.",
    ],
  },
  {
    company: "CollegeDekho",
    role: "UI/UX Intern",
    start: "Jan 2025",
    end: "Mar 2025",
    details: [
      "Researched student needs and redesigned college websites to make information easier to find and navigate.",
    ],
  },
];
