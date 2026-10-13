import Image from "next/image";

/**
 * Small circular photo used in the glass nav: Pranjal's full portrait
 * (public/images/pranjal-portrait.jpg — the uploaded photo, downscaled,
 * uncropped), shown whole rather than zoomed to the face.
 *
 * A 3:4 photo can only fit entirely inside a circle at 60% × 80% of its
 * diameter (its corners then sit exactly on the edge), so the image is
 * sized to that box with `object-contain` — never cropped or stretched —
 * and the rest of the 34px circle is filled with the photo's own edge
 * colours, so the disc reads as one picture against the translucent nav.
 */
export function Avatar() {
  return (
    <span
      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-ink/15"
      // The photo's own edge colours, top to bottom (wall, then the
      // coat), so the portrait's border melts into the disc.
      style={{ background: "linear-gradient(to bottom, #e5e4e2 0%, #d8d6d4 40%, #cfcdcb 72%, #c4b4aa 100%)" }}
    >
      <Image
        src="/images/pranjal-portrait.jpg"
        alt="Pranjal"
        width={360}
        height={480}
        sizes="28px"
        priority
        className="h-[80%] w-[60%] object-contain"
      />
    </span>
  );
}
