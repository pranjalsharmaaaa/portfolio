/**
 * About's own foreground cloud — the top edge of `<section id="about">`
 * itself (rendered as its first child, anchored with `bottom-full` so
 * its box sits entirely above that section, flush against the
 * section's own top edge), not a decoration belonging to the hero and
 * not a separate component sitting between the two. Since it's a plain
 * child of About, it moves with About automatically under the
 * sticky-reveal mechanism in app/page.tsx — no scroll listener of its
 * own, no independent animation, nothing that could compete with that
 * mechanism.
 *
 * A single continuous SVG silhouette — one <path>, not a cluster of
 * independently-positioned circles (an earlier version of this file
 * used a dozen `rounded-full` divs, which read as isolated floating
 * bubbles rather than one cloud edge). The path is authored to fill
 * all the way down to its own viewBox bottom regardless of how the
 * wave above it moves, so its bottom edge is always flush with the
 * wrapper's bottom — no gap between the cloud and the cream `About`
 * background below it, at any width.
 *
 * `preserveAspectRatio="none"` stretches that path to exactly fill the
 * wrapper at whatever aspect ratio the viewport happens to be, rather
 * than cropping ("xMidYMid slice", used in a still-earlier version of
 * this file) — cropping meant the visible slice of the wave shifted
 * unpredictably across breakpoints; a soft cloud edge reads fine very
 * slightly stretched, and "none" guarantees zero gap-risk regardless
 * of viewport size, which matters more here than pixel-perfect curves.
 *
 * The wrapper's own height matches the depth this cloud's circle-based
 * predecessor was tuned and verified to reach without ever covering
 * the hero's own content (its side-vocabulary strip, cassette, and
 * cycling word never sit lower than this) — swapping the visual
 * treatment doesn't reopen that.
 */
export function AboutCloud() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-full h-[16vh] sm:h-[20vh]"
    >
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d="M0,150 C80,60 160,60 240,110 C320,160 380,170 460,120 C540,70 600,70 680,130 C760,190 820,190 900,140 C980,90 1040,90 1120,150 C1200,210 1260,200 1340,140 C1380,110 1410,100 1440,120 L1440,240 L0,240 Z"
          fill="var(--shore-solid)"
        />
      </svg>
    </div>
  );
}
