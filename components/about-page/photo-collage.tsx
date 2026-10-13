"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import type { CollagePhoto } from "@/lib/about-content";
import styles from "./about-page.module.css";

export type CollageItem = CollagePhoto & {
  /** Whether the file exists in /public (checked on the server). */
  available: boolean;
};

/**
 * An overlapping stack of real photographs. Click, tap, or focus +
 * Enter/Space on a photo to bring it to the front; it settles flat and
 * lifts slightly. The list's own order is the initial stack (last =
 * front), so the bouquet starts on top.
 *
 * Purely CSS transitions on transform/box-shadow — no layout change,
 * so bringing a photo forward never reflows the page. Reduced motion
 * keeps the re-ordering but drops the movement (about-page.module.css).
 *
 * A photo whose file isn't in /public yet renders as an empty frame
 * labelled with the exact path it expects — never a stand-in image.
 */
export function PhotoCollage({ photos }: { photos: CollageItem[] }) {
  const [order, setOrder] = useState(() => photos.map((p) => p.id));
  const frontId = order[order.length - 1];

  function bringToFront(id: string) {
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  }

  return (
    <div role="group" aria-label="Photo collage. Select a photo to bring it to the front." className={styles.collage}>
      {photos.map((photo) => {
        const isFront = photo.id === frontId;
        return (
          <button
            key={photo.id}
            type="button"
            className={styles.photo}
            data-front={isFront}
            aria-pressed={isFront}
            aria-label={isFront ? `${photo.alt} (in front)` : `Bring ${photo.alt} to the front`}
            onClick={() => bringToFront(photo.id)}
            style={
              {
                left: `${photo.left}%`,
                top: `${photo.top}%`,
                width: `${photo.width}%`,
                aspectRatio: photo.aspect,
                zIndex: order.indexOf(photo.id) + 1,
                "--tilt": `${photo.rotate}deg`,
              } as CSSProperties
            }
          >
            <span className={styles.photoInner}>
              <span className={styles.photoClip}>
                {photo.available ? (
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 40vw, 60vw"
                    className="object-cover"
                    preload={photo.id === "bouquet"}
                  />
                ) : (
                  <span className={styles.photoEmpty}>
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <rect x="3" y="6" width="18" height="13" rx="2.5" />
                      <circle cx="12" cy="12.5" r="3.2" />
                      <path d="M8.5 6 10 4h4l1.5 2" strokeLinejoin="round" />
                    </svg>
                    <span>public{photo.src}</span>
                  </span>
                )}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
