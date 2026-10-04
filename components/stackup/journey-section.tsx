import { stackupJourney as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 328.8, 597.6, 866.4, 1135.2];

/**
 * Screen 20 — "Your Journey Begins": five phones under three captions —
 * the first phone, then phones 2-3 and phones 4-5 as pairs (each pair's
 * caption takes the share of the pair's midpoint).
 */
export function JourneySection() {
  const [single, concept, questions] = content.captions;
  return (
    <AppFlowSection
      label={content.label}
      body={content.body}
      phones={content.phones.map((alt, i) => ({ src: `/images/stackup/app-journey-${i + 1}.webp`, alt, x: X[i], y: 183.6 }))}
      arrows={X.slice(1).map((x) => ({ x: x - 28.8, y: 427.31, w: 30.13 }))}
      captions={[
        { text: single, cx: 182.1, y: 691.9, f: 0, after: 0 },
        { text: concept, cx: 582.4, y: 691.9, f: 1.5 / 4, after: 2 },
        { text: questions, cx: 1119.95, y: 691.9, f: 3.5 / 4, after: 4 },
      ]}
    />
  );
}
