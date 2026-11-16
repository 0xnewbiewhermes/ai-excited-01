// Latte Swan Breakout: a latte-art swan bursting out of a coffee cup.
// Copies image/latte-swan.jpg byte for byte to <MAKEFUN_OUTPUT_DIR or /output>/entry.png, after checking it
// passes the gate: a whole JPEG (SOI ... EOI), at most 1 MiB, at most 1024 x 1024 pixels.
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

function fail(why: string): never {
  console.error(`latte-swan.jpg rejected: ${why}`);
  process.exit(1);
}

// Walk the marker segments up to the first SOFn and return its frame size.
function jpegSize(b: Buffer): { width: number; height: number } {
  let i = 2;
  while (i + 4 <= b.length) {
    if (b[i] !== 0xff) fail(`expected a marker at byte ${i}`);
    const marker = b[i + 1];
    if (marker === 0xff) { i++; continue; } // fill byte
    const len = b.readUInt16BE(i + 2);
    // SOF0..SOF15, except DHT (C4), JPG (C8) and DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
    }
    if (marker === 0xda) break; // scan data reached without a frame header
    i += 2 + len;
  }
  fail('no SOF frame header found');
}

const bytes = readFileSync(new URL('./image/latte-swan.jpg', import.meta.url));

if (bytes.length > MAX_BYTES) fail(`${bytes.length} bytes, over ${MAX_BYTES}`);
if (bytes[0] !== 0xff || bytes[1] !== 0xd8) fail('does not start with FF D8 (SOI)');
if (bytes.at(-2) !== 0xff || bytes.at(-1) !== 0xd9) fail('does not end with FF D9 (EOI): truncated');

const { width, height } = jpegSize(bytes);
if (width < 1 || height < 1 || width > MAX_SIDE || height > MAX_SIDE) fail(`${width}x${height}, over ${MAX_SIDE}x${MAX_SIDE}`);

const out = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
writeFileSync(out, bytes);
console.log(`wrote ${out}: ${width}x${height} JPEG, ${bytes.length} bytes`);
