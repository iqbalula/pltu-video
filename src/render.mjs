#!/usr/bin/env node
import { renderMedia, getCompositions, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    // Get compositions from the bundled output
    const bundlePath = path.resolve(__dirname, "../bundle");
    console.log(`Bundle path: ${bundlePath}`);
    
    const compositions = await getCompositions(bundlePath, {
      inputProps: {},
    });

    console.log(`Found ${compositions.length} compositions:`);
    compositions.forEach(c => console.log(`  - ${c.id}`));

    // Select the PLTUComposition
    const composition = selectComposition({
      compositions,
      id: "PLTUComposition",
    });

    await renderMedia({
      composition,
      serveUrl: `file://${bundlePath}`,
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