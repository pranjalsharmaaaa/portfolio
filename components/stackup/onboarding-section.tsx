import { stackupOnboarding as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 328.8, 597.6, 866.4, 1135.2];
const CAPTION_CX = [179, 448.75, 716.95, 985.7, 1254.5];

/** Screen 19 — "Onboarding Experience": five phones, one caption each. */
export function OnboardingSection() {
  return (
    <AppFlowSection
      label={content.label}
      body={content.body}
      shadow
      phones={content.phones.map((alt, i) => ({ src: `/images/stackup/app-onboarding-${i + 1}.webp`, alt, x: X[i], y: 183.6 }))}
      arrows={X.slice(1).map((x) => ({ x: x - 28.8, y: 399.71, w: 30.13 }))}
      captions={content.captions.map((text, i) => ({ text, cx: CAPTION_CX[i], y: 691.9, f: i / 4, after: i }))}
    />
  );
}
