#!/usr/bin/env node
import { renderMedia } from "@remotion/renderer";

async function main() {
  try {
    await renderMedia({
      composition: {
        id: "PLTUComposition",
        fps: 30,
        width: 1080,
        height: 1920,
        durationInFrames: 3018,
      },
      outputLocation: "render/pltu-final.mp4",
      codec: "h264",
      imageFormat: "jpeg",
      jpegQuality: 85,
      concurrency: 2,
    });
    console.log("Render completed!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();