import { stackupFundSelection as content } from "@/lib/stackup-content";
import { AppFlowSection } from "@/components/stackup/app-flow";

const X = [60, 600, 1140];

/**
 * Screen 22 — "Mutual Fund Selection": three phones with long arrows in
 * the wide gaps between them (that negative space is the composition).
 * "compare alternatives" sits under the second pair.
 */
export function FundSelectionSection() {
  const [recommended, compare] = content.captions;
  return (
    <AppFlowSection
      label={content.label}
      labelX={61}
      body={content.body}
      phones={content.phones.map((alt, i) => ({ src: `/images/stackup/app-fund-selection-${i + 1}.webp`, alt, x: X[i], y: 188.4 }))}
      arrows={[
        { x: 378, y: 421.91, w: 145.33 },
        { x: 918, y: 420.71, w: 145.33 },
      ]}
      captions={[
        { text: recommended, cx: 179.35, y: 696.7, f: 0, after: 0 },
        { text: compare, cx: 989.9, y: 696.7, f: 0.75, after: 2 },
      ]}
    />
  );
}
