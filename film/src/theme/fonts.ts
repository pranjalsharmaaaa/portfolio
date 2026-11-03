import { continueRender, delayRender, staticFile } from "remotion";

/** Inter variable — the same file the case study ships. */
let loaded = false;
export const ensureInter = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Loading Inter");
  const face = new FontFace("Inter", `url(${staticFile("fonts/inter-latin-variable.woff2")}) format("woff2")`, {
    weight: "100 900",
    style: "normal",
  });
  // Italic is synthesised from the variable roman for the annotation style.
  face
    .load()
    .then((f) => {
      (document.fonts as unknown as { add: (f: FontFace) => void }).add(f);
      continueRender(handle);
    })
    .catch(() => continueRender(handle));
};
