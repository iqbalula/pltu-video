#!/usr/bin/env node
import { renderMedia, getCompositions, selectComposition } from "@remotion/renderer";

async function main() {
  try {
    // Get compositions from the bundled output
    const compositions = await getCompositions("./bundle", {
      inputProps: {},
    });

    // Select the PLTUComposition
    const composition = selectComposition({
      compositions,
      id: "PLTUComposition",
    });

    await renderMedia({
      composition,
      serveUrl: `file://${process.cwd()}/bundle`,
      outputLocation: "render/pltu-final.mp4",
      codec: "h264",
      imageFormat: "jpeg",
      jpegQuality: 85,
      concurrency: 2,
      onProgress: ({ overallProgress }) => {
        console.log(`Progress: ${Math.round(overallProgress * 100)}%`);
      },
    });

    console.log("Render completed!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();