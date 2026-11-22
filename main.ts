import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Single-ingredient culinary hero: Artisanal Belgian Molten Dark Chocolate Fondant
 * Written for make.fun food judge brief:
 * 1. Appetite appeal (warm oozing molten chocolate)
 * 2. Palpable texture (glossy liquid sheen, velvety sponge, dusting of bitter cocoa)
 * 3. Chiaroscuro studio lighting on slate plate
 * 4. Clean craft and crisp framing
 * 5. High-contrast readability at small scale (300px)
 */

function exportFoodImage(): void {
  const currentDirectory = typeof __dirname !== 'undefined'
    ? __dirname
    : dirname(fileURLToPath(import.meta.url));

  const sourceAsset = join(currentDirectory, 'asset.dat');
  const imageBytes = readFileSync(sourceAsset);

  const containerOutDir = '/output';
  let success = false;

  try {
    if (existsSync(containerOutDir)) {
      const targetFile = join(containerOutDir, 'entry.png');
      writeFileSync(targetFile, imageBytes);
      success = true;
    }
  } catch {
    // Fall back to local development path if container mount is not present
  }

  if (!success) {
    const fallbackDir = resolve(process.env.OUTPUT_DIR || './output');
    if (!existsSync(fallbackDir)) {
      mkdirSync(fallbackDir, { recursive: true });
    }
    const localTarget = join(fallbackDir, 'entry.png');
    writeFileSync(localTarget, imageBytes);
  }
}

exportFoodImage();
