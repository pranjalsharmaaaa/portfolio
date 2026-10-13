import Image from "next/image";
import { about } from "@/lib/site-content";

type Photo = { src: string; alt: string; width: number; height: number };

/**
 * One instant-film print: a thin warm-white frame with the deeper bottom
 * margin of a real Polaroid, a hairline edge on the photo itself, and a
 * soft two-layer shadow. Frame and shadow colours come from `.polaroid`
 * in globals.css, so the prints stay a little softer than pure white at
 * night instead of glaring off the slate background.
 */
function Polaroid({ photo, sizes, priority }: { photo: Photo; sizes: string; priority?: boolean }) {
  return (
    <figure className="polaroid m-0 p-[5%] pb-[17%]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={photo.src} alt={photo.alt} fill sizes={sizes} priority={priority} className="object-cover" />
        <span aria-hidden="true" className="polaroid-sheen absolute inset-0" />
      </div>
    </figure>
  );
}

/**
 * The About section's photo collage: the bouquet photograph as the main
 * print in front, with two more prints tucked behind it at different
 * angles — Pranjal's portrait on the left and a detail of the painted
 * wall from the same photograph on the right — so every frame is one of
 * her own photos. Everything is positioned in percentages of one square
 * box, so the composition scales as a unit at any width and every
 * print, rotation included, stays inside the page margins. Static by
 * design: no motion beyond the section's own reveal.
 */
export function PolaroidCollage() {
  const { main, behindLeft, behindRight } = about.photos;
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[30rem]">
      <div className="absolute top-[7%] left-[5%] w-[43%] -rotate-[8deg]">
        <Polaroid photo={behindLeft} sizes="(min-width: 1024px) 200px, 40vw" />
      </div>
      <div className="absolute top-[1%] right-[5%] w-[43%] rotate-[7deg]">
        <Polaroid photo={behindRight} sizes="(min-width: 1024px) 200px, 40vw" />
      </div>
      <div className="absolute bottom-[1%] left-1/2 z-10 w-[58%] -translate-x-1/2 -rotate-[2.5deg]">
        <Polaroid photo={main} sizes="(min-width: 1024px) 280px, 55vw" priority />
      </div>
    </div>
  );
}
