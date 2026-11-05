/**
 * Visual tokens — taken from the live Sales Coach case study
 * (app/sales-coach/page.tsx --sc-* properties, components/sales-coach/*),
 * not invented. Type is Inter, as on the portfolio.
 */
export const color = {
  bg: "#f8f8f6", // --sc-bg
  card: "#fafaf8", // --sc-card
  ink: "#0b0b0b", // --sc-ink
  muted: "#5c5c5c", // --sc-muted
  label: "#857c79", // --sc-label
  red: "#c60a18", // --sc-red (Airtel red)
  redBright: "#ee1133", // --sc-red-bright
  redLine: "#e9979c", // --sc-red-line
  pink: "#fdf3f2", // --sc-pink
  pinkStrong: "#fde5e4", // --sc-pink-strong
  chip: "#f9ced1", // --sc-chip
  num: "#ffe1de", // --sc-num
  white: "#ffffff",
} as const;

/** The cover title badge: "Sales Coach" in white on a deep Airtel-red gradient. */
export const badgeGradient = "linear-gradient(90deg,#7a0202,#4b0000 55%,#1f0000)";

export const font = { family: "Inter, system-ui, sans-serif" } as const;

/** The case study's type, scaled for a 1920×1080 frame. */
export const type = {
  eyebrow: { fontSize: 22, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: color.label },
  title: { fontSize: 64, lineHeight: "72px", fontWeight: 500, letterSpacing: "-0.02em", color: color.ink },
  body: { fontSize: 28, lineHeight: "40px", fontWeight: 400, color: color.ink },
  card: { fontSize: 26, lineHeight: "34px", fontWeight: 500, color: color.ink },
} as const;

export const stage = { width: 1920, height: 1080, fps: 30, margin: 120 } as const;
