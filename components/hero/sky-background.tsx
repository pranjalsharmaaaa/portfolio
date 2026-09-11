/**
 * The hero's sky environment.
 *
 * Built from layered gradients, soft blurred cloud shapes and a whisper
 * of grain — a designed environment rather than a photo pasted behind
 * the content (spec §03). Entirely decorative, so it's hidden from
 * assistive tech; the words carry the meaning.
 *
 * Fixed star/cloud positions are pre-computed (not Math.random() at
 * render time) so server and client markup match exactly.
 */

const STARS = [
  { top: "12%", left: "8%", size: 2, delay: "0s" },
  { top: "22%", left: "22%", size: 1.5, delay: "0.6s" },
  { top: "9%", left: "38%", size: 1.5, delay: "1.4s" },
  { top: "30%", left: "52%", size: 2, delay: "2.1s" },
  { top: "16%", left: "66%", size: 1.5, delay: "0.9s" },
  { top: "27%", left: "78%", size: 1.5, delay: "1.8s" },
  { top: "6%", left: "88%", size: 2, delay: "0.3s" },
  { top: "38%", left: "12%", size: 1.5, delay: "2.6s" },
  { top: "44%", left: "34%", size: 1, delay: "1.1s" },
  { top: "35%", left: "92%", size: 1, delay: "2.9s" },
  { top: "50%", left: "60%", size: 1, delay: "0.4s" },
  { top: "18%", left: "95%", size: 1, delay: "1.6s" },
] as const;

export function SkyBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Base sky gradient — shifts smoothly between light/dark via the
          CSS custom properties defined in globals.css. */}
      <div
        className="absolute inset-0 transition-colors duration-700 ease-out"
        style={{
          background:
            "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 55%, var(--sky-bottom) 100%)",
        }}
      />

      {/* Soft glow — a diffuse light source rather than a literal sun/moon disc.
          A radial gradient fades all the way to transparent, so it reads as
          atmosphere rather than a hard-edged tinted blob. */}
      <div
        className="absolute -top-32 right-[4%] h-[34rem] w-[34rem] rounded-full transition-colors duration-700 sm:h-[42rem] sm:w-[42rem]"
        style={{
          background:
            "radial-gradient(circle, var(--glow) 0%, transparent 68%)",
        }}
      />

      {/* Cloud strata — large, soft, asymmetric radial forms that fade
          to nothing at their edges rather than reading as flat ovals. */}
      <div
        className="absolute top-[26%] left-[-12%] h-48 w-[60%]"
        style={{
          background:
            "radial-gradient(ellipse, var(--cloud) 0%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[44%] right-[-10%] h-40 w-[46%]"
        style={{
          background:
            "radial-gradient(ellipse, var(--cloud) 0%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[60%] left-[16%] h-32 w-[40%]"
        style={{
          background:
            "radial-gradient(ellipse, var(--cloud) 0%, transparent 72%)",
        }}
      />

      {/* Stars — only meaningfully visible in dark mode (--star is
          transparent in light mode via the token). */}
      <div className="absolute inset-0">
        {STARS.map((star, i) => (
          <span
            key={i}
            className="absolute rounded-full motion-safe:animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              background: "var(--star)",
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Grain — a hair of texture so the gradient doesn't read as flat. */}
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

      {/* Horizon line — a quiet edge where sky meets the content ground. */}
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-40"
        style={{ background: "var(--ink-quiet)" }}
      />
    </div>
  );
}
