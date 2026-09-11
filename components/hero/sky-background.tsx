/**
 * The hero's sky environment — an illustrated world, not a gradient.
 *
 * One SVG canvas carries the whole scene (sun/moon, three depths of
 * cloud drifting at different speeds, a night horizon, stars, and an
 * occasional shooting star) so the composition scales fluidly
 * with the hero instead of being assembled from separately-positioned
 * divs. Sun and moon share the same position: day and night are two
 * states of one world, not two different backgrounds (spec: "do not
 * simply darken the daytime background").
 *
 * Visibility between themes is toggled in CSS (`.sun-layer` /
 * `.moon-layer`, keyed off the existing `.dark` class), so this stays
 * a plain server component — no theme-detection JS, no hydration
 * flash. Entirely decorative, hidden from assistive tech.
 */

const CLOUD_PATH =
  "M20,65 C13,45 35,26 60,31 C67,12 101,7 116,25 C132,8 166,15 169,36 C191,33 201,53 185,65 C193,77 174,85 157,78 C144,89 88,89 71,78 C54,87 24,83 20,65 Z";

type CloudInstance = { x: number; y: number; scale: number; opacity?: number };

const FAR_CLOUDS: CloudInstance[] = [
  { x: 120, y: 120, scale: 0.55 },
  { x: 520, y: 90, scale: 0.4 },
  { x: 980, y: 140, scale: 0.5 },
  { x: 1360, y: 100, scale: 0.42 },
];

const MID_CLOUDS: CloudInstance[] = [
  { x: -40, y: 300, scale: 0.9 },
  { x: 420, y: 340, scale: 0.7 },
  { x: 1100, y: 310, scale: 0.85 },
];

const NEAR_CLOUDS: CloudInstance[] = [
  { x: -80, y: 560, scale: 1.4 },
  { x: 620, y: 610, scale: 1.15 },
  { x: 1240, y: 580, scale: 1.3 },
];

const STARS = [
  { x: 90, y: 90, r: 2 },
  { x: 260, y: 220, r: 1.6 },
  { x: 60, y: 340, r: 1.6 },
  { x: 460, y: 60, r: 1.6 },
  { x: 720, y: 190, r: 2 },
  { x: 880, y: 70, r: 1.6 },
  { x: 1420, y: 130, r: 1.6 },
  { x: 1540, y: 260, r: 2 },
  { x: 1500, y: 400, r: 1.4 },
  { x: 1300, y: 470, r: 1.4 },
  { x: 210, y: 470, r: 1.4 },
  { x: 380, y: 160, r: 1.4 },
  { x: 950, y: 420, r: 1.2 },
  { x: 1050, y: 240, r: 1.4 },
] as const;

const SPARKLES = [
  { x: 1080, y: 130, size: 10 },
  { x: 1290, y: 260, size: 7 },
] as const;

function Sparkle({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <path
      className="star-el"
      d={`M${x},${y - size} L${x + size * 0.22},${y - size * 0.22} L${x + size},${y} L${x + size * 0.22},${y + size * 0.22} L${x},${y + size} L${x - size * 0.22},${y + size * 0.22} L${x - size},${y} L${x - size * 0.22},${y - size * 0.22} Z`}
      fill="var(--star)"
    />
  );
}

export function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base gradient — the atmosphere the illustration sits inside. */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background:
            "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 58%, var(--sky-bottom) 100%)",
        }}
      />

      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <symbol id="cloud-shape" viewBox="0 0 210 95">
            <path d={CLOUD_PATH} />
          </symbol>
          <filter id="soft-blur-lg" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="34" />
          </filter>
          <filter id="soft-blur-md" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="soft-blur-sm" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          {/* The moon's phase is a real cutout, not a flat-colored
              overlay — whatever sits behind it (its own glow, the sky)
              shows through the "dark" side, so it never reads as a
              solid eclipse disc. */}
          <mask id="moon-phase">
            <circle cx="1180" cy="200" r="52" fill="white" />
            <circle cx="1202" cy="185" r="45" fill="black" />
          </mask>
          {/* Keyed off --star, so this fades away in daylight with no
              extra logic — same trick the stars themselves use. */}
          <linearGradient id="shooting-tail" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--star)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--star)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---------------- sun (day) / moon (night) ---------------- */}
        {/* parallax-glow: a faint drift toward the cursor, as if the
            light source itself has a little atmosphere of its own. */}
        <g className="sun-layer parallax-glow">
          <circle cx="1180" cy="200" r="150" fill="var(--sun-glow)" filter="url(#soft-blur-lg)" />
          <circle
            cx="1180"
            cy="200"
            r="86"
            fill="none"
            stroke="var(--sun-ray)"
            strokeWidth="10"
            filter="url(#soft-blur-md)"
          />
          <circle cx="1180" cy="200" r="58" fill="var(--sun-mid)" filter="url(#soft-blur-sm)" />
          <circle cx="1180" cy="200" r="44" fill="var(--sun-core)" />
        </g>

        <g className="moon-layer parallax-glow">
          <circle cx="1180" cy="200" r="140" fill="var(--moon-glow)" filter="url(#soft-blur-lg)" />
          <g mask="url(#moon-phase)">
            <circle cx="1180" cy="200" r="52" fill="var(--moon-body)" />
            <circle cx="1163" cy="212" r="7" fill="var(--moon-shade)" />
            <circle cx="1178" cy="182" r="4.5" fill="var(--moon-shade)" />
            <circle cx="1195" cy="222" r="3.5" fill="var(--moon-shade)" />
          </g>
        </g>

        {/* ---------------- stars (night only via --star token) ---------------- */}
        <g>
          {STARS.map((s, i) => (
            <circle
              key={i}
              className="star-el motion-safe:animate-twinkle"
              cx={s.x}
              cy={s.y}
              r={s.r}
              fill="var(--star)"
              style={{ animationDelay: `${(i % 7) * 0.5}s` }}
            />
          ))}
          {SPARKLES.map((s, i) => (
            <Sparkle key={i} {...s} />
          ))}

          {/* A shooting star — one brief crossing every ~23s, timed so
              it reads as a small discovery rather than a loop you'd
              consciously wait for. Travels behind the headline's
              on-screen position, gated to night by the --star token
              like everything else here. */}
          <g className="opacity-0 motion-safe:animate-shooting-star">
            <line
              x1="792"
              y1="112"
              x2="742"
              y2="152"
              stroke="url(#shooting-tail)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="742" cy="152" r="2.4" fill="var(--star)" />
          </g>
        </g>

        {/* ---------------- cloud strata ---------------- */}
        <g opacity="0.9">
          {FAR_CLOUDS.map((c, i) => (
            <use
              key={i}
              href="#cloud-shape"
              x={c.x}
              y={c.y}
              width={210 * c.scale}
              height={95 * c.scale}
              fill="var(--cloud-far)"
            />
          ))}
        </g>

        <g className="motion-safe:animate-drift-slower">
          {MID_CLOUDS.map((c, i) => (
            <g key={i}>
              <use
                href="#cloud-shape"
                x={c.x}
                y={c.y + 10}
                width={210 * c.scale}
                height={95 * c.scale}
                fill="var(--cloud-shadow)"
                filter="url(#soft-blur-sm)"
              />
              <use
                href="#cloud-shape"
                x={c.x}
                y={c.y}
                width={210 * c.scale}
                height={95 * c.scale}
                fill="var(--cloud-mid)"
              />
            </g>
          ))}
        </g>

        {/* Two independent transforms compose here rather than fight —
            the drift keyframe on the inner group, the cursor parallax
            on the outer one. Putting both on one element would let
            whichever runs as a CSS animation silently own `transform`
            and discard the other. */}
        <g className="parallax-near">
          <g className="motion-safe:animate-drift-slow">
            {NEAR_CLOUDS.map((c, i) => (
              <g key={i}>
                <use
                  href="#cloud-shape"
                  x={c.x}
                  y={c.y + 16}
                  width={210 * c.scale}
                  height={95 * c.scale}
                  fill="var(--cloud-shadow)"
                  filter="url(#soft-blur-md)"
                />
                <use
                  href="#cloud-shape"
                  x={c.x}
                  y={c.y}
                  width={210 * c.scale}
                  height={95 * c.scale}
                  fill="var(--cloud-near)"
                />
              </g>
            ))}
          </g>
        </g>

        {/* ---------------- night horizon (transparent by day) ---------------- */}
        <path
          d="M0,900 L0,760 C220,700 380,790 620,750 C860,712 980,800 1180,770 C1360,745 1480,800 1600,760 L1600,900 Z"
          fill="var(--hill)"
          filter="url(#soft-blur-sm)"
          className="transition-colors duration-700"
        />
      </svg>

      {/* Grain — a hair of texture so nothing reads as a flat vector fill. */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Horizon line — a quiet edge where sky meets the content ground (day). */}
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-40"
        style={{ background: "var(--ink-quiet)" }}
      />
    </div>
  );
}
