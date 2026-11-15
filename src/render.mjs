#!/usr/bin/env node
import { renderMedia, getCompositions } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const bundlePath = path.resolve(__dirname, "../bundle");
    console.log(`Bundle path: ${bundlePath}`);

    // 1. Ambil daftar komposisi dari folder hasil bundle
    const compositions = await getCompositions(bundlePath, {
      inputProps: {},
    });

    console.log(`Found ${compositions.length} compositions:`);
    compositions.forEach((c) => console.log(`  - ${c.id}`));

    // 2. Pilih komposisi PLTUComposition menggunakan .find()
    const composition = compositions.find((c) => c.id === "PLTUComposition");

    if (!composition) {
      throw new Error("Composition 'PLTUComposition' tidak ditemukan!");
    }

    // 3. Pastikan folder output 'render/' tersedia
    const outputDir = path.resolve(__dirname, "../render");
    fs.mkdirSync(outputDir, { recursive: true });
    const outputLocation = path.join(outputDir, "pltu-final.mp4");

    // 4. Render media (gunakan bundlePath langsung tanpa prefix file://)
    await renderMedia({
      composition,
      serveUrl: bundlePath,
      outputLocation,
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
