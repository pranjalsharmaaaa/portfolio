import { continueRender, delayRender, staticFile } from "remotion";

/** Nunito (400/600/700/800, latin) — YANA's display face, from @fontsource/nunito. */
let loaded = false;
export const ensureNunito = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Loading Nunito");
  Promise.all(
    [400, 600, 700, 800].map((w) =>
      new FontFace("Nunito", `url(${staticFile(`fonts/nunito-latin-${w}-normal.woff2`)}) format("woff2")`, { weight: String(w), style: "normal" })
        .load()
        .then((f) => (document.fonts as unknown as { add: (f: FontFace) => void }).add(f)),
    ),
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
};
