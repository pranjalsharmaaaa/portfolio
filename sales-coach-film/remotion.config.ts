import { Config } from "@remotion/cli/config";

// Lossless PNG frames: avoids JPEG artefacts and lets the encoder output
// standard-range yuv420p (JPEG frames come out tagged full-range yuvj420p).
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
// Use the container's pre-installed Chromium when present (no download needed).
if (process.env.REMOTION_BROWSER) Config.setBrowserExecutable(process.env.REMOTION_BROWSER);
// Standard-range 4:2:0 for the widest player/editor compatibility.
Config.setPixelFormat("yuv420p");
