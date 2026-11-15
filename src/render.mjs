#!/usr/bin/env node
import { bundle } from "@remotion/bundler";
import { renderMedia, getCompositions } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const entryPoint = path.resolve(__dirname, "./Root.tsx");
    console.log(`Bundling entry point: ${entryPoint}`);

    // 1. Lakukan bundling langsung lewat API (otomatis return path folder valid)
    const bundleLocation = await bundle({
      entryPoint,
    });
    console.log(`Bundle created at: ${bundleLocation}`);

    // 2. Ambil daftar komposisi dari bundleLocation
    const compositions = await getCompositions(bundleLocation, {
      inputProps: {},
    });

    console.log(`Found ${compositions.length} compositions:`);
    compositions.forEach((c) => console.log(`  - ${c.id}`));

    // 3. Pilih komposisi PLTUComposition
    const composition = compositions.find((c) => c.id === "PLTUComposition");

    if (!composition) {
      throw new Error("Composition 'PLTUComposition' tidak ditemukan!");
    }

    // 4. Pastikan folder output 'render/' tersedia
    const outputDir = path.resolve(__dirname, "../render");
    fs.mkdirSync(outputDir, { recursive: true });
    const outputLocation = path.join(outputDir, "pltu-final.mp4");

    // 5. Render media menggunakan bundleLocation DENGAN AUDIO
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      outputLocation,
      codec: "h264",
      imageFormat: "jpeg",
      jpegQuality: 85,
      concurrency: 2,
      inputProps: {},
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
