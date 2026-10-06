import { Nunito } from "next/font/google";

/**
 * YANA's own rounded display face — the reference PDF sets the cover's
 * pill, "YANA" wordmark and tagline in Nunito (identified from the
 * outlined glyphs: rounded terminals, single-storey shapes). Loaded here
 * rather than in app/layout.tsx so it exists only on /yana: everything
 * else in the case study stays on the portfolio's own Inter.
 */
export const yanaDisplay = Nunito({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});
