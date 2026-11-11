import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Every image path written in the source or index.html must exist in public/.
// A typo or a deleted photo otherwise ships as a broken image with no warning.
const ROOT = join(import.meta.dirname, "..");
const IMAGE_PATH = /["'`(](\/?)([\w\-./ ']+\.(?:png|jpe?g|gif|svg|webp|ico))["'`)]/gi;
// Phone photos are 3-15 MB; `npm run images` brings them to well under this.
const MAX_IMAGE_BYTES = 1_000_000;

function sourceFiles(dir) {
  return readdirSync(dir, { withFileTypes: true, recursive: true })
    .filter((entry) => entry.isFile() && /\.(jsx?|css)$/.test(entry.name))
    .filter((entry) => !entry.name.includes(".test."))
    .map((entry) => join(entry.parentPath, entry.name));
}

function referencedImages() {
  const files = [...sourceFiles(join(ROOT, "src")), join(ROOT, "index.html")];
  const refs = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8").replaceAll("https://www.entcornell.com/", "/");
    for (const [, slash, path] of text.matchAll(IMAGE_PATH)) {
      refs.push({ file: file.slice(ROOT.length + 1), path, absolute: slash === "/" });
    }
  }
  return refs;
}

describe("content", () => {
  it("finds the image references it is meant to check", () => {
    expect(referencedImages().length).toBeGreaterThan(100);
  });

  it("uses absolute image paths, which keep working on nested routes like /newsletter/3", () => {
    const relative = referencedImages().filter(({ absolute }) => !absolute);
    expect(relative).toEqual([]);
  });

  it("keeps every image in public/ under 1 MB (run `npm run images`)", () => {
    const heavy = readdirSync(join(ROOT, "public"), { withFileTypes: true, recursive: true })
      .filter((entry) => entry.isFile())
      .map((entry) => join(entry.parentPath, entry.name))
      .filter((file) => statSync(file).size > MAX_IMAGE_BYTES)
      .map((file) => file.slice(ROOT.length + 1));
    expect(heavy).toEqual([]);
  });

  it("only references images that exist in public/", () => {
    const missing = referencedImages().filter(
      ({ path }) => !existsSync(join(ROOT, "public", path)),
    );
    expect(missing).toEqual([]);
  });
});
