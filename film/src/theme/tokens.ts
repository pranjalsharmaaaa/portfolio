/**
 * Visual tokens — extracted from the Stack Up case study and product,
 * never invented. See docs/stackup-film/01-analysis-and-directions.md.
 */
export const color = {
  // Surfaces
  paper: "#fcfaf5", // between the UI background (#fdfbf7) and the kit sheet (#fefaf4)
  ground: "#e2e5dc", // case-study quote cards — the sage ground plane
  card: "#ffffff",
  tint: "#e8f0e8", // opportunity cards / UI chips

  // Greens
  brand: "#006326", // --stackup-green
  deep: "#035422", // research headings
  ctaFrom: "#005028",
  ctaTo: "#007840",
  olive: "#8a9c72", // character shirt
  oliveShade: "#6c8a66",

  // Logo bars (sampled from logo.webp, bottom → top)
  logo: ["#2e543c", "#4f8a4f", "#7faa66", "#9fc054"] as const,
  logoInk: "#10201b",
  logoUp: "#4d7a45",

  // Ink
  ink: "#262626", // --stackup-ink
  slate: "#3a3a3a",
  muted: "#8e8e8c", // --stackup-muted
  label: "#9c9c99",

  // Accent — reserved for "?" marks, exactly as in the illustrations
  question: "#e0703a",

  // Coin (matches the product's cream/sage 3D coins)
  coinFace: "#e9ebd6",
  coinSide: "#a9b98f",
  coinGlyph: "#5d7a4f",
} as const;

export const font = {
  family: "Inter, system-ui, sans-serif",
} as const;

/** Type scale at 1920×1080. */
export const type = {
  label: { fontSize: 22, letterSpacing: "0.08em", fontWeight: 600, color: color.muted, textTransform: "uppercase" as const },
  display: { fontSize: 96, lineHeight: "104px", fontWeight: 700, letterSpacing: "-0.02em" },
  statement: { fontSize: 48, lineHeight: "60px", fontWeight: 600, letterSpacing: "-0.01em" },
  body: { fontSize: 30, lineHeight: "42px", fontWeight: 400 },
  chip: { fontSize: 24, fontWeight: 500 },
  annotation: { fontSize: 24, fontWeight: 500, fontStyle: "italic" as const, color: color.deep },
  caption: { fontSize: 30, fontWeight: 500 },
} as const;

export const stage = {
  width: 1920,
  height: 1080,
  fps: 30,
  /** The ink ground line that runs through the whole film. */
  groundY: 780,
  /** Standard 60px case-study margin, scaled to 1080p. */
  margin: 120,
} as const;
