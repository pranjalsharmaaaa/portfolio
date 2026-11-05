/**
 * Visual tokens — taken from the live YANA case study (app/yana/page.tsx
 * --yana-* properties, components/yana/*), not invented. Type is Nunito,
 * YANA's own rounded display face (components/yana/fonts.ts).
 */
export const color = {
  bg: "#fffaf2", // --yana-bg (warm cream)
  card: "#ffffff", // --yana-card
  purple: "#6a4ad8", // --yana-purple
  purpleLight: "#e6e6fa", // --yana-purple-light
  ink: "#171717", // --yana-ink
  muted: "#6b6b6b", // --yana-muted
  night: "#09086f", // --yana-night
  indigo: "#49408f", // --yana-indigo
  periwinkle: "#a3b5f1", // --yana-periwinkle
  pinkLight: "#ffabf9", // --yana-pink-light
  /** the welcome illustration's own lavender, sampled from screen-onboarding-welcome */
  lavender: "#f7ebff",
  white: "#ffffff",
} as const;

/** The splash screen's own violet gradient (phone-splash.webp, top → bottom). */
export const splashGradient = "linear-gradient(180deg,#7556ec 0%,#8e5fe2 45%,#c56fd6 100%)";

export const font = { family: "Nunito, system-ui, sans-serif" } as const;

/** The case study's type, scaled for a 1920×1080 frame. */
export const type = {
  heading: { fontSize: 50, lineHeight: "60px", fontWeight: 700, letterSpacing: "-0.01em", color: color.purple },
  body: { fontSize: 30, lineHeight: "42px", fontWeight: 400, color: color.ink },
} as const;

export const stage = { width: 1920, height: 1080, fps: 30, margin: 120 } as const;
