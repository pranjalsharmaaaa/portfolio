import { stackupFirstInvestment as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 420, 780, 1140];
const Y = [183.07, 183.07, 183.6, 183.07];
const CAPTION_CX = [180.45, 515.35, 852.45, 1187.9];

/** Screen 23 — "First Investment": four phones, one caption each. */
export function FirstInvestmentSection() {
  return (
    <AppFlowSection
      label={content.label}
      labelX={61}
      body={content.body}
      phones={content.phones.map((alt, i) => ({
        src: `/images/stackup/app-first-investment-${i + 1}.webp`,
        alt,
        x: X[i],
        y: Y[i],
        // The review screen's Invest button sits past the device's bottom edge.
        overlay: i === 2 ? { src: "/images/stackup/app-first-investment-3-overlay.webp", x: 795.6, y: 639.43, w: 208.8, h: 60.34 } : undefined,
      }))}
      arrows={X.slice(1).map((x) => ({ x: x - 84, y: 417.11, w: 49.33 }))}
      captions={content.captions.map((text, i) => ({ text, cx: CAPTION_CX[i], y: 721.9, f: i / 3, after: i }))}
    />
  );
}
