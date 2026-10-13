"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { useAnimate, useReducedMotion } from "framer-motion";
import { aboutPage, type AboutPhoto } from "@/lib/site-content";

/**
 * Where each print rests in the stack, in the same order as
 * `aboutPage.photos` (portrait, bridge, puppy, bouquet): left/top as
 * percentages of the collage box, and its tilt. Every print is the same
 * size (72% of the box's width), and each one behind the bouquet peeks
 * out on a different side — the bridge above, the portrait to the left,
 * the puppy below right — so the edges of the stack read clearly and
 * stay large enough to tap. A print keeps its spot when it comes to the
 * front; only the stacking order changes.
 */
const SLOTS = [
  { left: 2.9, top: 14, rotate: -6 },
  { left: 23, top: 1.2, rotate: 3.5 },
  { left: 22.3, top: 16.4, rotate: 4.5 },
  { left: 13.7, top: 7, rotate: -2.5 },
] as const;

/** Back-to-front order on first load: the bridge at the very back, the bouquet on top. */
const INITIAL_ORDER = [1, 0, 2, 3];

/**
 * One instant-film print: a warm-white frame with the deeper bottom
 * margin of a real Polaroid, a hairline edge on the photo and a soft
 * shadow (`.polaroid` in globals.css). Every frame holds a 3:4 photo;
 * the puppy photo (a touch taller) loses only a sliver top and bottom.
 *
 * Coming to the front, it lifts a little and settles back down, like a
 * print pulled from a pile and dropped on top.
 */
function Print({
  photo,
  slot,
  z,
  isTop,
  priority,
  onSelect,
}: {
  photo: AboutPhoto;
  slot: (typeof SLOTS)[number];
  z: number;
  isTop: boolean;
  priority?: boolean;
  onSelect: () => void;
}) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();

  function select() {
    if (isTop) return;
    onSelect();
    if (!reduceMotion) {
      animate(scope.current, { y: [0, -14, 0], scale: [1, 1.035, 1] }, { duration: 0.42, ease: "easeOut" });
    }
  }

  return (
    <button
      type="button"
      onClick={select}
      aria-label={isTop ? photo.alt : `Bring to front: ${photo.alt}`}
      aria-pressed={isTop}
      // `rotate`/`translate` are their own CSS properties here, so the
      // tilt, the hover nudge and the lift (a transform on the inner
      // span) never overwrite one another.
      className={`polaroid-button absolute block w-[72%] transition-[translate] duration-200 ease-out ${
        isTop ? "cursor-default" : "cursor-pointer hover:-translate-y-1.5"
      }`}
      style={
        {
          left: `${slot.left}%`,
          top: `${slot.top}%`,
          rotate: `${slot.rotate}deg`,
          zIndex: z,
        } as CSSProperties
      }
    >
      <span ref={scope} className="polaroid block p-[5%] pb-[17%]">
        <span className="relative block aspect-[3/4] overflow-hidden">
          <Image src={photo.src} alt="" fill sizes="(min-width: 640px) 320px, 60vw" priority={priority} className="object-cover" />
          <span aria-hidden="true" className="polaroid-sheen absolute inset-0" />
        </span>
      </span>
    </button>
  );
}

/**
 * The /about page's Polaroid stack: four of Pranjal's own photos piled
 * on top of each other, the bouquet photograph in front. Clicking or
 * tapping (or Enter/Space on) a print behind brings it to the top of the
 * same pile, right where it lies; the others stay as they were beneath
 * it. No overlay, no zoom. Positions are percentages of one box, so the
 * pile scales as a unit and keeps its overlaps at every width.
 */
export function PolaroidCollage() {
  const photos = aboutPage.photos;
  // Photo indexes, back to front.
  const [order, setOrder] = useState(INITIAL_ORDER);
  const top = order[order.length - 1];

  return (
    <div className="relative mx-auto aspect-[139/171] w-full max-w-[22rem] sm:max-w-[26rem]">
      {photos.map((photo, i) => (
        <Print
          key={photo.src}
          photo={photo}
          slot={SLOTS[i]}
          z={order.indexOf(i) + 1}
          isTop={i === top}
          priority={i === photos.length - 1}
          onSelect={() => setOrder((o) => [...o.filter((n) => n !== i), i])}
        />
      ))}
    </div>
  );
}
