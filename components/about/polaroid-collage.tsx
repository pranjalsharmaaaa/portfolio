"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { aboutPage, type AboutPhoto } from "@/lib/site-content";

/**
 * Where each print rests in the collage, back to front (same order as
 * `aboutPage.photos`): left/top/width as percentages of the collage box,
 * plus its tilt. The last one, the bouquet, is the print on top.
 *
 * `wide` (from `sm`) fans the prints out in a 2:1 band, the portrait
 * and the bridge to the left of the bouquet and the puppy to its right;
 * `narrow` (phones) stacks them in a taller 4:5 box so each print can
 * be larger. In both, every photo's subject stays in view.
 */
const PLACEMENTS = [
  { wide: { left: 7, top: 22, width: 24 }, narrow: { left: 0, top: 6, width: 40 }, rotate: -8 },
  { wide: { left: 24, top: 1, width: 24 }, narrow: { left: 56, top: 0, width: 40 }, rotate: 3 },
  { wide: { left: 69, top: 21, width: 24 }, narrow: { left: 58, top: 51, width: 40 }, rotate: 6 },
  { wide: { left: 44, top: 11, width: 30 }, narrow: { left: 12, top: 34, width: 52 }, rotate: -4 },
] as const;

/** How much of the viewport an enlarged print may fill, and its upper limit. */
const FILL_W = 0.86;
const FILL_H = 0.84;
const MAX_SCALE = 3.2;

type Lift = { x: number; y: number; scale: number };

/**
 * One instant-film print: a thin warm-white frame with the deeper bottom
 * margin of a real Polaroid, a hairline edge on the photo and a soft
 * shadow (`.polaroid` in globals.css). The photo keeps its own aspect
 * ratio, so nothing is cropped.
 */
function Print({ photo, sizes, priority }: { photo: AboutPhoto; sizes: string; priority?: boolean }) {
  return (
    <span className="polaroid block p-[5%] pb-[17%]">
      <span className="relative block overflow-hidden">
        <Image
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
          className="block h-auto w-full"
        />
        <span aria-hidden="true" className="polaroid-sheen absolute inset-0" />
      </span>
    </span>
  );
}

/**
 * The /about page's Polaroid collage: four of Pranjal's own photos as
 * layered prints, the bouquet photograph on top.
 *
 * Each print is a button. Clicking or tapping one (or Enter/Space) lifts
 * it to the front, straightens it and smoothly enlarges it to the middle
 * of the screen over a soft scrim. Clicking it again, clicking anywhere
 * outside, pressing Escape, moving focus elsewhere, or scrolling/resizing
 * puts it back exactly where and how it was. Prints are positioned in
 * percentages of one box, so the composition scales as a unit. Under
 * reduced motion the print simply appears enlarged, with no travel.
 *
 * The enlarged print and the scrim rely on z-index against the whole
 * page, so nothing around the collage should create a stacking context
 * (no transform/opacity animation or `isolate` on its ancestors).
 */
export function PolaroidCollage() {
  const photos = aboutPage.photos;
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);
  const [lift, setLift] = useState<Lift | null>(null);
  // Stays set while the print travels back, so it doesn't slip behind
  // the others before it has landed.
  const [raised, setRaised] = useState<number | null>(null);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function open(i: number) {
    const el = refs.current[i];
    if (!el) return;
    // Rotation turns about the centre, so the bounding box's centre is
    // the print's own centre; offsetWidth/Height are its unrotated size.
    const rect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.min((vw * FILL_W) / el.offsetWidth, (vh * FILL_H) / el.offsetHeight, MAX_SCALE);
    setLift({
      x: vw / 2 - (rect.left + rect.width / 2),
      y: vh / 2 - (rect.top + rect.height / 2),
      scale: Math.max(1, scale),
    });
    setActive(i);
    setRaised(i);
  }

  function close() {
    setActive(null);
  }

  function toggle(i: number) {
    if (active === i) close();
    else open(i);
  }

  // Escape, scrolling and resizing all put the print back.
  useEffect(() => {
    if (active === null) return;
    const startY = window.scrollY;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) > 40) setActive(null);
    };
    const onResize = () => setActive(null);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  const travel = reduceMotion
    ? { duration: 0 }
    : ({ type: "spring", stiffness: 260, damping: 30, mass: 0.9 } as const);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[26rem] sm:aspect-[2/1] sm:max-w-[60rem]">
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="scrim"
            aria-hidden="true"
            className="about-scrim fixed inset-0 z-[55] backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.3 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {photos.map((photo, i) => {
        const place = PLACEMENTS[i];
        const isActive = active === i;
        const front = i === photos.length - 1;
        return (
          <motion.button
            key={photo.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            aria-pressed={isActive}
            aria-label={`${isActive ? "Close" : "View larger"}: ${photo.alt}`}
            onClick={() => toggle(i)}
            onBlur={(e) => {
              // Focus moving to something else closes it; the window
              // itself losing focus (relatedTarget null) doesn't.
              if (isActive && e.relatedTarget) close();
            }}
            className={`polaroid-button absolute top-[var(--t)] left-[var(--l)] block w-[var(--w)] sm:top-[var(--t-sm)] sm:left-[var(--l-sm)] sm:w-[var(--w-sm)] ${
              isActive ? "cursor-zoom-out" : "cursor-zoom-in"
            }`}
            style={
              {
                "--l": `${place.narrow.left}%`,
                "--t": `${place.narrow.top}%`,
                "--w": `${place.narrow.width}%`,
                "--l-sm": `${place.wide.left}%`,
                "--t-sm": `${place.wide.top}%`,
                "--w-sm": `${place.wide.width}%`,
                zIndex: raised === i ? 60 : i + 1,
              } as CSSProperties
            }
            initial={false}
            animate={
              isActive && lift
                ? { x: lift.x, y: lift.y, scale: lift.scale, rotate: 0 }
                : { x: 0, y: 0, scale: 1, rotate: place.rotate }
            }
            whileHover={active === null && !reduceMotion ? { y: -6, rotate: place.rotate * 0.6 } : undefined}
            transition={travel}
            onAnimationComplete={() => {
              if (!isActive && raised === i) setRaised(null);
            }}
          >
            <Print
              photo={photo}
              priority={front}
              sizes="(min-width: 1024px) 640px, 90vw"
            />
          </motion.button>
        );
      })}
    </div>
  );
}
