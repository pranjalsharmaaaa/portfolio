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
      "Designed a simulated finance experience that helps young earners learn money management through real-world decisions and build confidence for a more secure financial future.",
      "Designed a voice-first AI Sales Coach that helps sales teams understand complex customer and product information through contextual, actionable guidance.",
      "Worked on Airtel’s design legacy, documenting UX principles, interaction guidelines, and design patterns to support a consistent experience across Airtel products.",
    ],
  },
  {
    company: "IIT Delhi – UX Lab",
    role: "UI/UX Intern",
    start: "Sep 2025",
    end: "Nov 2025",
    details: [
      "Designed augmented reality (AR) learning cards for young children in Anganwadi settings, helping children around 3–6 years old explore and learn more independently, with less reliance on Sahyikas.",
    ],
  },
  {
    company: "2nd Foundation Software",
    role: "UI/UX and React Intern",
    start: "Jun 2025",
    end: "Aug 2025",
    details: [
      "Worked with stakeholders to identify workflow gaps, redesigned enterprise dashboards, and collaborated with developers to create simpler user experiences. Also worked with React during the implementation process.",
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
