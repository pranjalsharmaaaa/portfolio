/**
 * Professional Experience for the /about page (rendered by
 * components/about-page/experience-section.tsx). The rest of the
 * page's copy and photos live in lib/site-content.ts's `aboutPage`.
 */

export type ExperienceRole = {
  company: string;
  role: string;
  /** Free text, e.g. "2022". */
  start: string;
  /** Free text, e.g. "Present". */
  end: string;
  location?: string;
  summary?: string;
};

/**
 * Newest first. Deliberately empty: the owner's work history isn't in
 * the repository yet, and nothing here should be invented. While empty,
 * the section shows only its heading.
 */
export const experience: ExperienceRole[] = [];
