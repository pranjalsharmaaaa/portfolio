/**
 * Copy and assets for the /about page (app/about/page.tsx), kept apart
 * from presentation the same way lib/site-content.ts is for the
 * homepage. The homepage's own About section keeps using
 * `site-content.ts`'s `about` export — nothing here replaces it.
 */

export const aboutPage = {
  headline: {
    lead: "Curious about the why.",
    emphasis: "Obsessed with the little things.",
  },
  intro:
    "Part logic, part creativity, always asking questions. I love untangling complex problems, understanding people, and exploring how technology and AI can create experiences that feel more human.",
} as const;

export type CollagePhoto = {
  /** Stable key, also the default stacking order (first = back). */
  id: string;
  /** Path under /public. A missing file renders a labelled empty frame. */
  src: string;
  alt: string;
  /** Frame aspect ratio (width / height); the photo is cropped to fit. */
  aspect: number;
  /** Placement inside the collage box, in percent of its width/height. */
  left: number;
  top: number;
  width: number;
  /** Resting tilt in degrees. */
  rotate: number;
};

/**
 * The collage's real photographs — files go in public/images/about/.
 * Listed back-to-front; the bouquet is last so it starts in front.
 * `alt` text is a neutral placeholder until the owner describes each
 * photo — replace it along with the file.
 */
export const collagePhotos: CollagePhoto[] = [
  { id: "photo-2", src: "/images/about/photo-2.jpg", alt: "Photo 2", aspect: 3 / 4, left: 0, top: 4, width: 38, rotate: -7 },
  { id: "photo-3", src: "/images/about/photo-3.jpg", alt: "Photo 3", aspect: 1, left: 62, top: 0, width: 36, rotate: 6 },
  { id: "photo-4", src: "/images/about/photo-4.jpg", alt: "Photo 4", aspect: 5 / 4, left: 2, top: 58, width: 40, rotate: 4 },
  { id: "photo-5", src: "/images/about/photo-5.jpg", alt: "Photo 5", aspect: 4 / 5, left: 64, top: 46, width: 34, rotate: -5 },
  { id: "bouquet", src: "/images/about/bouquet.jpg", alt: "Bouquet photo", aspect: 4 / 5, left: 28, top: 12, width: 44, rotate: -2 },
];

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
 * Professional Experience, newest first. Deliberately empty: the
 * owner's work history isn't in the repository yet, and nothing here
 * should be invented. While empty, the section renders its heading and
 * a quiet outline of the row layout (experience-section.tsx).
 */
export const experience: ExperienceRole[] = [];
