# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The site is deployed continuously from `main`, so entries are grouped by date, not version.

## [Unreleased]

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
