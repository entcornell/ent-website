import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// The README is the manual for whoever maintains the site next. These tests fail CI when
// the code gains something the README doesn't mention, so it can't silently go stale.
const ROOT = join(import.meta.dirname, "..");
const readme = readFileSync(join(ROOT, "README.md"), "utf8");
const read = (path) => readFileSync(join(ROOT, path), "utf8");

describe("README", () => {
  it("documents every route", () => {
    const routes = [...read("src/App.jsx").matchAll(/path="([^"]+)"/g)].map(([, path]) => path);
    expect(routes.length).toBeGreaterThan(5);
    expect(routes.filter((route) => !readme.includes(`\`${route}\``))).toEqual([]);
  });

  it("documents every content file", () => {
    // Content lives in src/components and in the home's own folder (founders/).
    const contentFiles = ["", "founders/"].flatMap((dir) =>
      readdirSync(join(ROOT, "src/components", dir))
        .filter(
          (name) =>
            /Data\.js$/.test(name) ||
            ["recruitmentEvents.js", "applicationConfig.js"].includes(name),
        )
        .map((name) => dir + name),
    );
    expect(contentFiles.length).toBeGreaterThan(5);
    expect(contentFiles.filter((name) => !readme.includes(`src/components/${name}`))).toEqual([]);
  });

  it("documents every npm script", () => {
    const { scripts } = JSON.parse(read("package.json"));
    const missing = Object.keys(scripts).filter((name) => {
      const command = name === "test" ? "npm test" : `npm run ${name}`;
      return !readme.includes(`\`${command}\``) && !readme.includes(`${command} `);
    });
    expect(missing).toEqual([]);
  });

  it("links only images that exist, and shows every screenshot in docs/readme/", () => {
    const linked = [...readme.matchAll(/src="((?:docs|public)\/[^"]+)"/g)].map(([, path]) => path);
    expect(linked.filter((path) => !existsSync(join(ROOT, path)))).toEqual([]);

    const screenshots = readdirSync(join(ROOT, "docs/readme"))
      .filter((name) => name.endsWith(".webp"))
      .map((name) => `docs/readme/${name}`);
    expect(screenshots.filter((path) => !linked.includes(path))).toEqual([]);
  });
});
