import type { CSSProperties } from "react";
import Image from "next/image";
import type { RichLine } from "@/lib/stackup-content";
import { Container } from "@/components/stackup/container";
import { Slide, Lines, at, slide } from "@/components/stackup/slide";

/**
 * Shared layout for the product-walkthrough screens (19-24): a label, a
 * statement, and a left-to-right sequence of phone screenshots joined by
 * arrows, with captions beneath.
 *
 * Geometry is the PDF frame's own (CSS px at 1440x810, see slide.tsx).
 * Every phone in the PDF is 240x486; `y` is its top edge. On canvases
 * wider than the frame, phone i of n takes an i/(n-1) share of the spare
 * width and each arrow sits halfway between its two phones, so the
 * sequence spreads across the 60px content frame — the last phone moves
 * with the right margin, nothing is resized. Captions carry their own
 * share (the phone, or the midpoint of the phones, they sit under).
 *
 * Screenshots are the PDF's embedded images at their native 1312x2656,
 * served as-is (`unoptimized`): the image optimizer would re-encode them
 * at quality 75, the only quality next.config allows.
 *
 * Outside the page-stack (phones) the same elements reflow into one
 * column: phone, its caption(s), a downward arrow, the next phone.
 */

const PHONE_W = 240;
const PHONE_H = 486;
const PHONE_PX = "1312 / 2656";
const CAPTION_W = 520;

export type FlowPhone = {
  src: string;
  alt: string;
  x: number;
  y: number;
  /**
   * A second embedded image the PDF paints over the phone's lower edge,
   * continuing its screen below the device (CSS px, frame coordinates).
   */
  overlay?: { src: string; x: number; y: number; w: number; h: number };
};

export type FlowArrow = { x: number; y: number; w: number };

/** `after` is the index of the phone the caption follows in phone layout. */
export type FlowCaption = { text: string; cx: number; y: number; f: number; after: number };

export function AppFlowSection({
  label,
  body,
  phones,
  arrows,
  captions,
  shadow = false,
  labelX = 60,
}: {
  label: string;
  body: readonly RichLine[];
  phones: readonly FlowPhone[];
  arrows: readonly FlowArrow[];
  captions: readonly FlowCaption[];
  /** Screen 19's phones sit on a soft drop shadow; the others don't. */
  shadow?: boolean;
  /** The label's left edge, where the PDF sets it a px or two in from 60. */
  labelX?: number;
}) {
  const share = (i: number) => i / (phones.length - 1);

  return (
    <Slide label={label} flowClassName="pt-10 pb-16 @min-[640px]:py-14">
      <Container>
        <h2
          className={`text-sm font-semibold uppercase @min-[640px]:text-base ${slide.abs} ${slide.type}`}
          style={{ color: "#7c7c7b", ...at({ x: labelX, y: 51.2, fs: 24, lh: 29 }) }}
        >
          {label}
        </h2>
        <p
          className={`mt-3 text-base leading-relaxed @min-[640px]:text-lg ${slide.abs} ${slide.type}`}
          style={{ color: "#3a3a3a", ...at({ x: 60, y: 93.3, fs: 24, lh: 36 }) }}
        >
          <Lines lines={body} boldClassName="font-semibold" />
        </p>

        <div className="mt-10 flex flex-col items-center">
          {phones.map((phone, i) => (
            <PhoneStep
              key={phone.src}
              phone={phone}
              f={share(i)}
              shadow={shadow}
              captions={captions.filter((caption) => caption.after === i)}
              arrow={arrows[i]}
              arrowF={(share(i) + share(i + 1)) / 2}
            />
          ))}
        </div>
      </Container>
    </Slide>
  );
}

function PhoneStep({
  phone,
  f,
  shadow,
  captions,
  arrow,
  arrowF,
}: {
  phone: FlowPhone;
  f: number;
  shadow: boolean;
  captions: readonly FlowCaption[];
  arrow?: FlowArrow;
  arrowF: number;
}) {
  const { overlay } = phone;
  // Positions inside the phone box are percentages of the 240x486 box, so
  // they hold at any rendered size (slide or flow).
  const inPhone = (box: { x: number; y: number; w: number; h: number }) => ({
    left: `${((box.x - phone.x) / PHONE_W) * 100}%`,
    top: `${((box.y - phone.y) / PHONE_H) * 100}%`,
    width: `${(box.w / PHONE_W) * 100}%`,
    height: `${(box.h / PHONE_H) * 100}%`,
  });

  return (
    <>
      <div
        className={`relative w-[15rem] max-w-full ${slide.abs} ${slide.w} ${slide.h}`}
        style={{ aspectRatio: PHONE_PX, ...at({ x: phone.x, y: phone.y, w: PHONE_W, h: PHONE_H, f }) }}
      >
        {shadow ? (
          // The PDF's shadow image: 336x582 at (-48, -43.2) from the phone.
          <div aria-hidden="true" className="pointer-events-none absolute" style={inPhone({ x: phone.x - 48, y: phone.y - 43.2, w: 336, h: 582 })}>
            <Image src="/images/stackup/app-phone-shadow.webp" alt="" fill unoptimized className="object-fill" />
          </div>
        ) : null}
        <Image src={phone.src} alt={phone.alt} fill unoptimized className="object-contain" />
        {overlay ? (
          <div aria-hidden="true" className="absolute" style={inPhone(overlay)}>
            <Image src={overlay.src} alt="" fill unoptimized className="object-fill" />
          </div>
        ) : null}
      </div>
      {overlay ? (
        // Flow layout only: room for the overlay's part below the phone.
        <div
          aria-hidden="true"
          className={`w-[15rem] max-w-full ${slide.flowOnly}`}
          style={{ aspectRatio: `${PHONE_W} / ${overlay.y + overlay.h - (phone.y + PHONE_H)}` }}
        />
      ) : null}

      {captions.map((caption) => (
        <p
          key={caption.text}
          className={`mt-4 text-center text-base @min-[640px]:text-lg ${slide.abs} ${slide.w} ${slide.type}`}
          style={{ color: "#6b6b6b", ...at({ x: caption.cx - CAPTION_W / 2, y: caption.y, w: CAPTION_W, fs: 19.2, lh: 23, f: caption.f }) }}
        >
          <span className={slide.line}>{caption.text}</span>
        </p>
      ))}

      {arrow ? (
        <>
          <Arrow
            w={arrow.w}
            className={`${slide.slideOnly} ${slide.abs} ${slide.w} ${slide.h}`}
            style={at({ x: arrow.x, y: arrow.y, w: arrow.w, h: ARROW_H, f: arrowF })}
          />
          <Arrow w={30.13} className={`my-6 h-[18px] w-[30px] rotate-90 ${slide.flowOnly}`} />
        </>
      ) : null}
    </>
  );
}

const ARROW_H = 17.91;

/**
 * The PDF's arrow, as vector: a 2.4px shaft and a round-cornered chevron,
 * #6b6b6b. Figma drew it as a slightly rotated line, so the shaft's left
 * end sits a little lower than its tip (by 0.885% of its length).
 */
function Arrow({ w, className, style }: { w: number; className: string; style?: CSSProperties }) {
  const dx = w - 30.13;
  const tip = w - 1.31;
  const left = 8.889 + 0.00885 * tip;
  const c = (x: number) => (x + dx).toFixed(3);
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${w} ${ARROW_H}`} className={className} style={style} fill="#6b6b6b">
      <path d={`M0 ${(left - 1.2).toFixed(3)}L${tip.toFixed(3)} 7.689V10.089L0 ${(left + 1.2).toFixed(3)}Z`} />
      <path
        d={`M${c(29.666)} 9.73C${c(30.13)} 9.258 ${c(30.123)} 8.498 ${c(29.65)} 8.033L${c(21.946)} 0.464C${c(21.474)} 0 ${c(20.714)} 0.007 ${c(20.249)} 0.479C${c(19.785)} 0.952 ${c(19.792)} 1.712 ${c(20.264)} 2.176L${c(27.113)} 8.904L${c(20.385)} 15.752C${c(19.92)} 16.225 ${c(19.927)} 16.985 ${c(20.4)} 17.449C${c(20.872)} 17.914 ${c(21.632)} 17.907 ${c(22.097)} 17.434Z`}
      />
    </svg>
  );
}
