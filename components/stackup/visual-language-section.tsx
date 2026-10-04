import Image from "next/image";
import { stackupVisualLanguage } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, at, slide } from "@/components/stackup/slide";

/**
 * The moodboard tiles, in reading order. Each asset is cropped (at its
 * native resolution, never resampled up) to exactly the region the PDF
 * clips it to, and placed at that region's frame position (CSS px at
 * 1440x810). `px` is the asset's own pixel size; `z` is the PDF's own
 * paint order (tile 06's top edge sits under the bottoms of 01 and 02).
 *
 * `f` is the tile's share of spare width on canvases wider than the frame
 * (see slide.module.css). The collage falls into four vertical groups in
 * the PDF: A (01, 02, 06), B (03, 07), C (04, 08), D (05, 09, 10). Each
 * group moves as one (0, 1/3, 2/3, 1), so the spare width only widens the
 * three gaps between groups and group D ends on the 60px right margin —
 * within a group, sizes, crops, stacking and the 06 bleed are untouched.
 */
const TILES = [
  { n: "01", f: 0, z: 5, x: 60, y: 159.6, w: 177.6, h: 380.2, px: [464, 994], alt: "Liven app welcome screen: Life comes without a manual" },
  { n: "02", f: 0, z: 8, x: 272.4, y: 159.6, w: 178.5, h: 380.4, px: [818, 1742], alt: "Habit-selection screen asking which habits you'd like to quit" },
  { n: "03", f: 1 / 3, z: 1, x: 492, y: 159.6, w: 321.6, h: 241.2, px: [720, 540], alt: "Three job-board app screens with bold lime-green headlines" },
  { n: "04", f: 2 / 3, z: 3, x: 850.8, y: 128.4, w: 204, h: 361.2, px: [416, 736], alt: "Hand holding a phone showing a security score of 87%" },
  { n: "05", f: 1, z: 9, x: 1092, y: 224.4, w: 289.2, h: 250.8, px: [716, 620], alt: "Duolingo, Headspace and Notion onboarding screens with hero illustrations" },
  { n: "06", f: 0, z: 2, x: 16.8, y: 508.8, w: 427.2, h: 301.2, px: [1200, 846], alt: "Three workout-app screens in soft pink gradients" },
  { n: "07", f: 1 / 3, z: 4, x: 475.2, y: 430.8, w: 162.7, h: 351.6, px: [542, 1170], alt: "Reminder app screen: Create Reminders in Seconds" },
  { n: "08", f: 2 / 3, z: 0, x: 670.3, y: 501.9, w: 392.9, h: 281.7, px: [1200, 860], alt: "Habit-tracker onboarding screens with emoji mood selection" },
  { n: "09", f: 1, z: 6, x: 1101.3, y: 514.8, w: 118.5, h: 269.3, px: [1125, 2556], alt: "Appointment-reminders permission screen" },
  { n: "10", f: 1, z: 7, x: 1245.6, y: 514.8, w: 133.6, h: 267.8, px: [424, 849], alt: "Phone showing an illustrated community app: Together, we can" },
] as const;

/**
 * Pill frames (CSS px at 1440x810): 48px tall, 19.2px corner radius. They
 * move with collage group D (f: 1), keeping the PDF's right-edge alignment
 * between the pills and the collage.
 */
const PILLS = [
  { x: 818.4, w: 142.8 },
  { x: 1000.2, w: 164.4 },
  { x: 1202.4, w: 176.4 },
] as const;

/** Screen 17 — "From Inspiration to System": the visual-language moodboard. */
export function VisualLanguageSection() {
  return (
    <Slide label="Building Stack Up's visual language">
      <Container>
        <p
          className={`text-base font-semibold uppercase @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "var(--stackup-green)", ...at({ x: 60, y: 51.2, fs: 24, lh: 29 }) }}
        >
          {stackupVisualLanguage.label}
        </p>
        <h2
          className={`mt-2 text-2xl leading-snug font-semibold @min-[640px]:text-3xl ${slide.abs} ${slide.type}`}
          style={{ color: "#000", ...at({ x: 60, y: 91, fs: 38.4, lh: 47 }) }}
        >
          {stackupVisualLanguage.heading}
        </h2>

        <ul className="mt-5 flex flex-wrap gap-2.5">
          {stackupVisualLanguage.pills.map((pill, i) => (
            <li
              key={pill}
              className={`flex items-center justify-center rounded-[0.9rem] px-4 py-2 text-sm font-medium @min-[640px]:text-base ${slide.abs} ${slide.w} ${slide.h} ${slide.type}`}
              style={{
                background: "var(--stackup-green)",
                color: "#f8f8f6",
                borderRadius: "calc(19.2 * var(--u, 0.75px))",
                ...at({ x: PILLS[i].x, y: 55.2, w: PILLS[i].w, h: 48, fs: 19.2, lh: 23, f: 1 }),
              }}
            >
              {pill}
            </li>
          ))}
        </ul>

        <div className="mt-8 columns-2 gap-3 @min-[640px]:columns-3 sm:[@media(min-height:520px)]:columns-auto">
          {TILES.map((tile) => (
            <div
              key={tile.n}
              className={`relative mb-3 w-full break-inside-avoid overflow-hidden ${slide.abs} ${slide.w} ${slide.h}`}
              style={{ aspectRatio: `${tile.px[0]} / ${tile.px[1]}`, zIndex: tile.z, ...at(tile) }}
            >
              <Image
                src={`/images/stackup/moodboard-${tile.n}.webp`}
                alt={tile.alt}
                fill
                sizes={`(min-width: 640px) ${Math.ceil(tile.w / 14.4)}vw, 50vw`}
                quality={95}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Container>
    </Slide>
  );
}
