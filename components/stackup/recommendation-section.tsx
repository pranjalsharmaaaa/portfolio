import { stackupRecommendation as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 420, 780, 1140];
const CAPTION_CX = [179.3, 515.9, 851.2, 1187.3];

/** Screen 21 — "Personalised Recommendation": four phones, one caption each. */
export function RecommendationSection() {
  return (
    <AppFlowSection
      label={content.label}
      body={content.body}
      phones={content.phones.map((alt, i) => ({
        src: `/images/stackup/app-recommendation-${i + 1}.webp`,
        alt,
        x: X[i],
        y: 183.6,
        // The last phone's list continues past the device's bottom edge.
        overlay: i === 3 ? { src: "/images/stackup/app-recommendation-4-overlay.webp", x: 1153.54, y: 574.51, w: 213.66, h: 145.07 } : undefined,
      }))}
      arrows={X.slice(1).map((x) => ({ x: x - 84, y: 417.11, w: 49.33 }))}
      captions={content.captions.map((text, i) => ({ text, cx: CAPTION_CX[i], y: 737.5, f: i / 3, after: i }))}
    />
  );
}
