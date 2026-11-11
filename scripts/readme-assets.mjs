#!/usr/bin/env node
// Regenerates the README images in docs/readme/: the banner and the page screenshots.
//
//   npm run readme:assets
//
// Run it after any visual change so the README shows the site as it is. It builds the
// site, serves it locally and screenshots it with headless Chrome (set CHROME_PATH if
// Chrome is not in the default location).
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "docs", "readme");
const PORT = 4321;
const BASE = `http://localhost:${PORT}`;

// What the README shows. Width and height are the browser window in CSS pixels.
const SHOTS = [
  { name: "banner", url: `file://${join(OUT, "banner.html")}`, width: 1280, height: 400 },
  { name: "home", url: `${BASE}/`, width: 1440, height: 900 },
  { name: "recruitment", url: `${BASE}/recruitment`, width: 1440, height: 900 },
  { name: "brothers", url: `${BASE}/brothers`, width: 1440, height: 900 },
  { name: "ventures", url: `${BASE}/studentVentures`, width: 1440, height: 900 },
  { name: "home-mobile", url: `${BASE}/`, width: 390, height: 844, mobile: true },
];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

function findChrome() {
  const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));
  if (!chrome) throw new Error("Chrome not found; set CHROME_PATH to its executable");
  return chrome;
}

async function waitForServer(url, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`preview server did not start on ${url}`);
}

// Chrome won't open a window narrower than ~500 px, so a phone-sized page is rendered
// inside an iframe of the exact width and cropped out afterwards.
const MOBILE_WINDOW_WIDTH = 600;

function mobileFrame(shot, dir) {
  const file = join(dir, `${shot.name}.html`);
  writeFileSync(
    file,
    `<body style="margin:0"><iframe src="${shot.url}" width="${shot.width}" ` +
      `height="${shot.height}" style="border:0;display:block"></iframe></body>`,
  );
  return { ...shot, url: `file://${file}`, width: MOBILE_WINDOW_WIDTH };
}

function screenshot(chrome, shot, file) {
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      `--window-size=${shot.width},${shot.height}`,
      // Lets web fonts and above-the-fold images load; short enough that the
      // site's 10-second event popup never appears.
      "--virtual-time-budget=5000",
      `--screenshot=${file}`,
      shot.url,
    ],
    { stdio: "ignore" },
  );
}

async function main() {
  const chrome = findChrome();
  execFileSync("npm", ["run", "build"], { cwd: ROOT, stdio: "inherit" });
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
    cwd: ROOT,
    stdio: "ignore",
  });
  const tmp = mkdtempSync(join(tmpdir(), "readme-assets-"));

  try {
    await waitForServer(BASE);
    for (const shot of SHOTS) {
      const png = join(tmp, `${shot.name}.png`);
      screenshot(chrome, shot.mobile ? mobileFrame(shot, tmp) : shot, png);
      // Desktop shots are shown at most ~900 px wide in the README: 1600 keeps them sharp.
      const width = shot.width > 1000 ? 1600 : shot.width * 2;
      const crop = { left: 0, top: 0, width: shot.width * 2, height: shot.height * 2 };
      await sharp(png)
        .extract(crop)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(join(OUT, `${shot.name}.webp`));
      process.stdout.write(`docs/readme/${shot.name}.webp\n`);
    }
  } finally {
    server.kill();
    rmSync(tmp, { recursive: true, force: true });
  }
}

main().catch((error) => {
  process.stderr.write(`readme-assets: ${error.message}\n`);
  process.exit(1);
});
