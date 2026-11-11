#!/usr/bin/env node
// Resizes and converts photos in public/ to WebP, then updates every reference in the code.
//
//   npm run images                    # every JPEG/PNG in public/
//   npm run images -- public/headshots-fall2026/NewPerson.jpg
//
// Phone photos are 3-15 MB; a WebP at the size the page actually shows is 50-300 KB.
// Originals are deleted: git history keeps them.
import {
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");
const QUALITY = 78;

// Widest size each folder is shown at (2x for sharp screens), in CSS pixels × 2.
const MAX_WIDTH = [
  ["headshots", 800],
  ["studentbusinesses", 1200],
  ["endeavors", 1200],
  ["newsletters", 1600],
  ["", 2000], // heroes and gallery photos
];

// Kept as-is: browser and home-screen icons, and the logo used for link previews
// (some link-preview crawlers don't read WebP).
const KEEP = new Set([
  "favicon.ico",
  "apple-touch-icon.png",
  "ENTLogo192.png",
  "ENTLogo512.png",
  "ENTTransparentLogo.png",
  "images/ENTTransparentLogo.png",
]);

const CONVERTIBLE = /\.(jpe?g|png)$/i;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile())
    .map((entry) => join(entry.parentPath, entry.name));
}

function publicPath(file) {
  return relative(PUBLIC, file).split(sep).join("/");
}

function maxWidthFor(path) {
  const match = MAX_WIDTH.find(([prefix]) => path.startsWith(prefix));
  return match ? match[1] : 2000;
}

async function convert(file) {
  const path = publicPath(file);
  const target = file.replace(CONVERTIBLE, ".webp");
  if (existsSync(target)) throw new Error(`${publicPath(target)} already exists`);

  const before = statSync(file).size;
  await sharp(file)
    .rotate() // apply the phone's EXIF orientation before the metadata is dropped
    .resize({ width: maxWidthFor(path), withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(target);
  unlinkSync(file);

  return { from: path, to: publicPath(target), before, after: statSync(target).size };
}

// Source files that may name an image: code, styles and the HTML shell.
function referencingFiles() {
  return [...walk(join(ROOT, "src")), join(ROOT, "index.html")].filter((file) =>
    /\.(jsx?|css|html)$/.test(file),
  );
}

function rewriteReferences(renames) {
  let changed = 0;
  for (const file of referencingFiles()) {
    const text = readFileSync(file, "utf8");
    let next = text;
    for (const { from, to } of renames) next = next.replaceAll(from, to);
    if (next !== text) {
      writeFileSync(file, next);
      changed++;
    }
  }
  return changed;
}

const mb = (bytes) => `${(bytes / 1e6).toFixed(1)} MB`;

async function main() {
  const args = process.argv.slice(2);
  const files = (args.length > 0 ? args.map((arg) => join(ROOT, arg)) : walk(PUBLIC))
    .filter((file) => CONVERTIBLE.test(file))
    .filter((file) => !KEEP.has(publicPath(file)));

  const renames = [];
  for (const file of files) renames.push(await convert(file));

  const before = renames.reduce((sum, r) => sum + r.before, 0);
  const after = renames.reduce((sum, r) => sum + r.after, 0);
  const changed = rewriteReferences(renames);
  process.stdout.write(
    `Converted ${renames.length} images: ${mb(before)} -> ${mb(after)}. ` +
      `Updated references in ${changed} files.\n`,
  );
}

main().catch((error) => {
  console.error(`optimize-images: ${error.message}`);
  process.exit(1);
});
