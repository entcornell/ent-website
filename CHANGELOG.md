# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The site is deployed continuously from `main`, so entries are grouped by date, not version.

## [Unreleased]

### Removed

- The old home page (`Home.jsx`, `EndeavorsPopup.jsx`, `EndeavorsData.js`), replaced by the
  new one.

### Changed

- **README redesigned** in ENT's colors: banner, live screenshots (desktop and phone),
  diagrams of how the site works, how content flows to pages, the image pipeline and the
  path from a change to production, step-by-step guides, brand reference and
  troubleshooting.

### Added

- **New home at `/`**, in a rose-copper metal identity with Playfair Display and DM Mono:
  - a pinned, scroll-driven hero: Paul Graham's "Live in the future, then build what's
    missing." turns into "ENT turns Cornell students into founders." and "With real
    companies.", then spotlights Stride, BUZZ, N1X and Hotake with their founders, and
    ends on a wall of every ENT venture's logo;
  - "A year at ENT": a pinned film strip of real chapter moments, fall to spring;
  - "Builders, and friends.": four drifting rows of chapter photos;
  - recruitment with ENT's 3D rocket (three.js, loaded only near the section, desktop only)
    and a footer.
    Photos come from the ENT media library, converted to WebP. Every other page keeps its
    original design; the old preview link `/new` redirects to `/`.
- `scripts/optimize-model.mjs` shrinks 3D models for the web (the rocket went from 58 MB to
  0.9 MB).
- Taglines for every venture in `StudentVenturesData.js`; Kate Stiens added as Stride's
  co-founder.
- `npm run readme:assets` regenerates the README banner and screenshots with headless
  Chrome.
- `src/readme.test.js` fails CI when the README misses a route, content file, npm script or
  screenshot.

## 2026-11-10 (images)

### Changed

- **Images are 94% smaller.** All 231 photos were resized to the size the page shows and
  converted to WebP: `public/` went from 358 MB to 21 MB, so pages load far faster on
  phones. Logos and icons are unchanged.
- **Image paths are absolute** (`/images/...`), so they keep working on nested pages such
  as `/newsletter/3`.

### Added

- `npm run images` (`scripts/optimize-images.mjs`) to optimize new photos and update their
  references.
- Tests that fail on relative image paths and on any image over 1 MB.

### Removed

- Dependabot. The site has two pinned CI actions; they are bumped by hand.

## 2026-11-10 (Vite migration)

### Changed

- **Build tool: Create React App → Vite.** Faster dev server and builds, and off an
  unmaintained toolchain. Vercel now builds with `vercel.json` (output `dist/`).
- **Accessibility.** Recruitment timeline items, application rounds, venture cards and the
  About menu work with the keyboard; the venture and newsletter modals use native dialogs.
- **Recruitment dates are parsed the same way in every browser**, and invalid dates (like
  "TBD") no longer count as January 1.
- **Member data moved to `src/components/BrothersData.js`.**

### Added

- CI on every pull request: lint (oxlint), format (Prettier), tests (Vitest), dead-code
  check (knip) and the production build.
- Tests for the recruitment timeline, every route, and every image path referenced by the
  site.
- Repo docs: CONTRIBUTING, SECURITY, CLAUDE.md, PR and issue templates, commit guard.

## 2026-11-10

### Removed

- Dead code and 49 unused images (~55 MB). README rewritten.
