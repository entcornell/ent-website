import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Every image path written in the source or index.html must exist in public/.
// A typo or a deleted photo otherwise ships as a broken image with no warning.
const ROOT = join(import.meta.dirname, "..");
const IMAGE_PATH = /["'`(]\/?([\w\-./ ']+\.(?:png|jpe?g|gif|svg|webp|ico))["'`)]/gi;

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
    for (const [, path] of text.matchAll(IMAGE_PATH)) {
      refs.push({ file: file.slice(ROOT.length + 1), path });
    }
  }
  return refs;
}

describe("content", () => {
  it("finds the image references it is meant to check", () => {
    expect(referencedImages().length).toBeGreaterThan(100);
  });

  it("only references images that exist in public/", () => {
    const missing = referencedImages().filter(
      ({ path }) => !existsSync(join(ROOT, "public", path)),
    );
    expect(missing).toEqual([]);
  });
});
