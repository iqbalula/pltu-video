import { renderMedia, selectComposition } from "@remotion/renderer";
import { getCompositions } from "@remotion/cli";
import fs from "fs";

async function main() {
  const compositions = await getCompositions("./src/Root.tsx", {
    // Pass any input props if needed
    inputProps: {},
  });

  const composition = selectComposition({
    compositions,
    id: "PLTUComposition",
  });

  await renderMedia({
    composition,
    serveUrl: new URL("./src/Root.tsx", import.meta.url).toString(),
    codec: "h264",
    outputLocation: "render/pltu-final.mp4",
    inputProps: {},
    imageFormat: "jpeg",
    jpegQuality: 85,
    concurrency: 2,
    onProgress: ({ overallProgress }) => {
      console.log(`Progress: ${Math.round(overallProgress * 100)}%`);
    },
  });

  console.log("Render completed!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});