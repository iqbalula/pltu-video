#!/usr/bin/env node
import { renderMedia, getCompositions, selectComposition } from "@remotion/renderer";

async function main() {
  try {
    // Get compositions from the entry point
    const compositions = await getCompositions("./src/Root.tsx", {
      inputProps: {},
    });

    // Select the PLTUComposition
    const composition = selectComposition({
      compositions,
      id: "PLTUComposition",
    });

    await renderMedia({
      composition,
      serveUrl: new URL("./src/Root.tsx", import.meta.url).toString(),
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