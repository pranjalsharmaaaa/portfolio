/**
 * The hero's sky environment — an illustrated world, not a gradient.
 *
 * One SVG canvas carries the whole scene (sun/moon, three depths of
 * cloud drifting at different speeds, a night horizon, stars, and an
 * occasional shooting star) so the composition scales fluidly
 * with the hero instead of being assembled from separately-positioned
 * divs. Phones get the same world rearranged for a portrait screen
 * (see "Phone composition" below). Sun and moon share the same position: day and night are two
 * states of one world, not two different backgrounds (spec: "do not
 * simply darken the daytime background").
 *
 * Visibility between themes is toggled in CSS (`.sun-layer` /
 * `.moon-layer`, keyed off the existing `.dark` class), so this stays
 * a plain server component — no theme-detection JS, no hydration
 * flash. Entirely decorative, hidden from assistive tech.
 */

export const CLOUD_PATH =
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
  // Was y:560 — with the vertical vocabulary now sharing a row with
  // the cassette/cycling word (rather than its own tall grid track),
  // that y put this cloud's bright, high-opacity fill directly behind
  // "VIBE CODING" and washed it out (near-white on near-white). Moved
  // down clear of that row instead of shrinking or dimming it, so the
  // cloud itself is unchanged, just relocated.
  { x: -80, y: 700, scale: 1.4 },
  // Was y:610 — on phone-width viewports the sky's slice-crop centers
  // on a narrow vertical strip of this same viewBox, and x:620 sits
  // squarely inside it, so this bright, high-opacity cloud landed
  // right behind the cycling word (washing it out, same class of bug
  // as the vocab fix above). Moved down clear of that text on both
  // mobile and desktop.
  { x: 620, y: 700, scale: 1.15 },
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

/**
 * A decorative flowing pattern along the hero's bottom edge — the same
 * illustrated world continuing to its lower border rather than trailing
 * off into flat empty space. Each instance reuses one tapered ribbon
 * shape (`#swoosh-shape`) at a different position/size/rotation, the
 * same layering trick as the cloud strata above. Fixed cream in both
 * themes (see `--shore`) so it reads as one consistent motif whether
 * it's sitting on the day gradient or the night horizon, exactly like
 * `--hero-text` staying white in both.
 */
type SwooshInstance = { x: number; y: number; scale: number; rotate: number; opacity?: number };

const SHORE_SWOOSHES: SwooshInstance[] = [
  { x: -60, y: 792, scale: 1.5, rotate: -5 },
  { x: 240, y: 838, scale: 1.05, rotate: 4 },
  { x: 470, y: 788, scale: 1.65, rotate: -3 },
  { x: 760, y: 832, scale: 1.15, rotate: 7 },
  { x: 1010, y: 782, scale: 1.5, rotate: -6 },
  { x: 1280, y: 828, scale: 1.25, rotate: 5 },
  { x: 1500, y: 786, scale: 1.4, rotate: -8 },
];

/* ------------------------------------------------------------------ */
/* Phone composition                                                    */
/*                                                                      */
/* The desktop canvas is a 16:9 landscape slice-cropped to fill the    */
/* hero, so on a portrait phone only its centre strip survives: the sun */
/* (far right) and most clouds fall outside the crop. Instead of        */
/* cropping, phones get the same world rearranged for a narrow screen:  */
/* the same sun/moon, cloud shape, three cloud depths, stars and        */
/* animations, laid out on portrait canvases that scale with the        */
/* screen's width (so nothing is ever cropped away):                     */
/*   - the sky, pinned to the top: sun upper right, clouds entering    */
/*     from both edges, stars at night;                                  */
/*   - the near clouds and night horizon, pinned to where the cream     */
/*     hills begin (16vh up, 20vh from sm: components/about/            */
/*     about-cloud.tsx), so                                              */
/*     they always rise from behind the hills whatever the phone's      */
/*     height.                                                           */
/* The text sits on the left, so the sun and the denser clouds keep to  */
/* the right and the top.                                                */
/* ------------------------------------------------------------------ */

const MOBILE_SUN = { cx: 318, cy: 172 } as const;

const MOBILE_FAR_CLOUDS: CloudInstance[] = [
  { x: 168, y: 118, scale: 0.3 },
  { x: 92, y: 26, scale: 0.26 },
  { x: 336, y: 14, scale: 0.28 },
];

const MOBILE_MID_CLOUDS: CloudInstance[] = [
  // Kept high (just under the nav): short phones bring the copy up to
  // ~y 190, and any lower this would sit behind the eyebrow line.
  { x: -46, y: 116, scale: 0.5 },
  { x: 322, y: 222, scale: 0.46 },
];

const MOBILE_NEAR_CLOUDS: CloudInstance[] = [
  { x: -62, y: 74, scale: 1 },
  { x: 140, y: 112, scale: 0.55 },
  { x: 262, y: 86, scale: 0.86 },
];

const MOBILE_STARS = [
  { x: 26, y: 118, r: 1.6 },
  { x: 132, y: 136, r: 1.3 },
  { x: 236, y: 26, r: 1.4 },
  { x: 384, y: 98, r: 1.6 },
  { x: 222, y: 210, r: 1.2 },
  { x: 378, y: 300, r: 1.3 },
  { x: 44, y: 22, r: 1.3 },
  { x: 300, y: 330, r: 1.1 },
] as const;

const MOBILE_SPARKLES = [
  { x: 262, y: 118, size: 6 },
  { x: 384, y: 236, size: 5 },
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

/** One cloud: a soft blurred shadow a little below, the cloud on top. */
function ShadowedCloud({
  c,
  id,
  fill,
  shadowY,
  blur,
}: {
  c: CloudInstance;
  id: string;
  fill: string;
  shadowY: number;
  blur: string;
}) {
  return (
    <g>
      <use
        href={`#${id}cloud-shape`}
        x={c.x}
        y={c.y + shadowY}
        width={210 * c.scale}
        height={95 * c.scale}
        fill="var(--cloud-shadow)"
        filter={`url(#${id}${blur})`}
      />
      <use
        href={`#${id}cloud-shape`}
        x={c.x}
        y={c.y}
        width={210 * c.scale}
        height={95 * c.scale}
        fill={fill}
      />
    </g>
  );
}

/**
 * The shared cloud shape and blurs, at a given scale. Each canvas needs
 * its own copy under its own id prefix: a canvas that's hidden at the
 * current breakpoint is `display: none`, and anything defined inside
 * one stops rendering for the canvases that point at it.
 */
function SkyDefs({ id, blur }: { id: string; blur: [number, number, number] }) {
  return (
    <>
      <symbol id={`${id}cloud-shape`} viewBox="0 0 210 95">
        <path d={CLOUD_PATH} />
      </symbol>
      <filter id={`${id}soft-blur-lg`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation={blur[0]} />
      </filter>
      <filter id={`${id}soft-blur-md`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation={blur[1]} />
      </filter>
      <filter id={`${id}soft-blur-sm`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation={blur[2]} />
      </filter>
    </>
  );
}

/**
 * Phones: the sky itself, scaled to the screen's width from its top
 * edge (a 400-unit-wide canvas, ~1 unit per pixel on a typical phone).
 * Past 28rem (large phones turned sideways, small tablets) it stops
 * growing and stays in the top right, so the sun and the clouds keep a
 * phone's proportions instead of swelling into the copy on the left.
 */
function MobileSky() {
  const id = "m-sky-";
  const { cx, cy } = MOBILE_SUN;
  return (
    <svg
      viewBox="0 0 400 420"
      className="absolute top-0 right-0 h-auto w-full max-w-[28rem] overflow-visible md:hidden"
    >
      <defs>
        <SkyDefs id={id} blur={[17, 7, 3]} />
        <mask id={`${id}moon-phase`}>
          <circle cx={cx} cy={cy} r="31" fill="white" />
          <circle cx={cx + 12} cy={cy - 9} r="27" fill="black" />
        </mask>
        <linearGradient id={`${id}shooting-tail`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--star)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--star)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sun: the desktop sun's glow → mid → core, at a phone's scale,
          upper right with room to breathe from the edge and the nav. */}
      <g className="sun-layer">
        <circle cx={cx} cy={cy} r="96" fill="var(--sun-glow)" filter={`url(#${id}soft-blur-lg)`} />
        <circle cx={cx} cy={cy} r="57" fill="var(--sun-glow)" filter={`url(#${id}soft-blur-md)`} opacity="0.7" />
        <circle cx={cx} cy={cy} r="35" fill="var(--sun-mid)" filter={`url(#${id}soft-blur-sm)`} />
        <circle cx={cx} cy={cy} r="27" fill="var(--sun-core)" />
      </g>

      <g className="moon-layer">
        <circle cx={cx} cy={cy} r="90" fill="var(--moon-glow)" filter={`url(#${id}soft-blur-lg)`} />
        <g mask={`url(#${id}moon-phase)`}>
          <circle cx={cx} cy={cy} r="31" fill="var(--moon-body)" />
          <circle cx={cx - 10} cy={cy + 7} r="4" fill="var(--moon-shade)" />
          <circle cx={cx - 1} cy={cy - 10} r="2.6" fill="var(--moon-shade)" />
          <circle cx={cx + 9} cy={cy + 11} r="2" fill="var(--moon-shade)" />
        </g>
      </g>

      <g>
        {MOBILE_STARS.map((s, i) => (
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
        {MOBILE_SPARKLES.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
        <g className="opacity-0 motion-safe:animate-shooting-star">
          <line
            x1="232"
            y1="40"
            x2="206"
            y2="61"
            stroke={`url(#${id}shooting-tail)`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="206" cy="61" r="1.8" fill="var(--star)" />
        </g>
      </g>

      <g opacity="0.9">
        {MOBILE_FAR_CLOUDS.map((c, i) => (
          <use
            key={i}
            href={`#${id}cloud-shape`}
            x={c.x}
            y={c.y}
            width={210 * c.scale}
            height={95 * c.scale}
            fill="var(--cloud-far)"
          />
        ))}
      </g>

      <g className="motion-safe:animate-drift-slower">
        {MOBILE_MID_CLOUDS.map((c, i) => (
          <ShadowedCloud key={i} c={c} id={id} fill="var(--cloud-mid)" shadowY={5} blur="soft-blur-sm" />
        ))}
      </g>
    </svg>
  );
}

/**
 * Phones: the near clouds and the night horizon, standing on the line
 * where the hills begin. The canvas's bottom edge is that line; the
 * clouds and horizon carry on below it (overflow visible), behind the
 * hills, so they always read as rising from behind them.
 */
function MobileHorizon() {
  const id = "m-near-";
  return (
    <svg
      viewBox="0 0 400 120"
      className="absolute inset-x-0 bottom-[16vh] h-auto w-full overflow-visible sm:bottom-[20vh] md:hidden"
    >
      <defs>
        <SkyDefs id={id} blur={[17, 7, 3]} />
      </defs>

      <g className="motion-safe:animate-drift-slow">
        {MOBILE_NEAR_CLOUDS.map((c, i) => (
          <ShadowedCloud key={i} c={c} id={id} fill="var(--cloud-near)" shadowY={8} blur="soft-blur-md" />
        ))}
      </g>

      <path
        d="M0,400 L0,150 C70,130 130,162 210,146 C290,130 340,158 400,140 L400,400 Z"
        fill="var(--hill)"
        filter={`url(#${id}soft-blur-sm)`}
        className="transition-colors duration-700"
      />
    </svg>
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
            "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 72%, var(--sky-bottom) 100%)",
        }}
      />

      {/* Desktop and tablet (md up): the landscape canvas. Phones get
          their own composition below. */}
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full max-md:hidden"
      >
        <defs>
          <SkyDefs id="" blur={[34, 14, 6]} />
          {/* A tapered, comma-like ribbon — the unit shape behind the
              bottom-edge pattern. Original geometry, not traced from
              any reference: several bezier lobes so it reads as a
              flowing brush stroke rather than a simple oval. */}
          <symbol id="swoosh-shape" viewBox="0 0 200 60">
            <path d="M4,40 C18,12 52,4 88,13 C111,19 118,36 145,35 C166,34 177,17 196,21 C184,42 159,53 130,51 C103,49 82,35 55,40 C33,44 13,52 4,40 Z" />
          </symbol>
          {/* The moon's phase is a real cutout, not a flat-colored
              overlay — whatever sits behind it (its own glow, the sky)
              shows through the "dark" side, so it never reads as a
              solid eclipse disc. */}
          <mask id="moon-phase">
            <circle cx="1300" cy="200" r="60" fill="white" />
            <circle cx="1324" cy="183" r="52" fill="black" />
          </mask>
          {/* Keyed off --star, so this fades away in daylight with no
              extra logic — same trick the stars themselves use. */}
          <linearGradient id="shooting-tail" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--star)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--star)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ---------------- sun (day) / moon (night) ---------------- */}
        {/* Sits farther right than the headline ever reaches — clear of
            "Designer who" and the cycling word at every breakpoint —
            rather than crowding the main typography.
            parallax-glow: a faint drift toward the cursor, as if the
            light source itself has a little atmosphere of its own. */}
        <g className="sun-layer parallax-glow">
          {/* A large, clean warm disc with a soft atmosphere around
              it — no hard-edged ring, just glow → mid → core, so it
              reads as one illustrated light source rather than a
              generic CSS gradient circle. */}
          <circle cx="1300" cy="200" r="185" fill="var(--sun-glow)" filter="url(#soft-blur-lg)" />
          <circle cx="1300" cy="200" r="110" fill="var(--sun-glow)" filter="url(#soft-blur-md)" opacity="0.7" />
          <circle cx="1300" cy="200" r="68" fill="var(--sun-mid)" filter="url(#soft-blur-sm)" />
          <circle cx="1300" cy="200" r="52" fill="var(--sun-core)" />
        </g>

        <g className="moon-layer parallax-glow">
          <circle cx="1300" cy="200" r="175" fill="var(--moon-glow)" filter="url(#soft-blur-lg)" />
          <g mask="url(#moon-phase)">
            <circle cx="1300" cy="200" r="60" fill="var(--moon-body)" />
            <circle cx="1281" cy="214" r="8" fill="var(--moon-shade)" />
            <circle cx="1298" cy="180" r="5" fill="var(--moon-shade)" />
            <circle cx="1317" cy="222" r="4" fill="var(--moon-shade)" />
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

        {/* ---------------- bottom-edge decorative pattern ---------------- */}
        {/* Sits on top of the horizon so the hero's lower edge keeps
            going rather than fading into flat space — the same barely-
            perceptible breathing motion as the cloud strata, at a scale
            too slow to distract from it being decorative. */}
        <g className="motion-safe:animate-drift-slower" opacity="0.92">
          {SHORE_SWOOSHES.map((s, i) => (
            <use
              key={i}
              href="#swoosh-shape"
              x={s.x}
              y={s.y}
              width={200 * s.scale}
              height={60 * s.scale}
              opacity={s.opacity ?? 1}
              transform={`rotate(${s.rotate} ${s.x + 100 * s.scale} ${s.y + 30 * s.scale})`}
              fill="var(--shore)"
            />
          ))}
        </g>
      </svg>

      <MobileSky />
      <MobileHorizon />

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
