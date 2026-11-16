// Latte Swan Breakout: copies image/latte-swan.jpg to <MAKEFUN_OUTPUT_DIR or /output>/entry.png.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const bytes = readFileSync(new URL('./image/latte-swan.jpg', import.meta.url));

if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error('not a JPEG');
if (bytes.length > 1048576) throw new Error('too big');

writeFileSync(join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'), bytes);
