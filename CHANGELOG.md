# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
The site is deployed continuously from `main`, so entries are grouped by date, not version.

## [Unreleased]

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
