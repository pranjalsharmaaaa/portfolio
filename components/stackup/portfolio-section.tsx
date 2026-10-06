import { stackupPortfolio as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 420, 780, 1140];

/** The two middle screens continue past the device's bottom edge. */
const OVERLAYS = {
  1: { src: "/images/stackup/app-portfolio-2-overlay.webp", x: 433.72, y: 607.61, w: 212.92, h: 177.28 },
  2: { src: "/images/stackup/app-portfolio-3-overlay.webp", x: 793.9, y: 605.39, w: 212.19, h: 97.03 },
} as const;

/**
 * Screen 24 — "Learning Through Your Portfolio": four phones; the middle
 * pair shares "assets → details".
 */
export function PortfolioSection() {
  const [confidence, details, practice] = content.captions;
  return (
    <AppFlowSection
      label={content.label}
      labelX={62}
      body={content.body}
      phones={content.phones.map((alt, i) => ({
        src: `/images/stackup/app-portfolio-${i + 1}.webp`,
        alt,
        x: X[i],
        y: 183.6,
        overlay: i === 1 || i === 2 ? OVERLAYS[i] : undefined,
      }))}
      arrows={X.slice(1).map((x) => ({ x: x - 84, y: 417.11, w: 49.33 }))}
      captions={[
        { text: confidence, cx: 179.9, y: 721.9, f: 0, after: 0 },
        { text: details, cx: 746.9, y: 725.5, f: 0.5, after: 2 },
        { text: practice, cx: 1259.9, y: 725.5, f: 1, after: 3 },
      ]}
    />
  );
}
