# Migrate from Create React App to Vite

## Context

The site was built with Create React App (`react-scripts` 5). CRA is no longer maintained:
`npm audit` reported 69 vulnerabilities in its build toolchain that cannot be fixed without
leaving it, and its Jest setup could no longer resolve React Router 7, so the test suite
did not run. There was no lint, formatting or CI.

## Options

1. **Stay on CRA** and patch around it. No effort now, but the toolchain keeps rotting.
2. **Vite.** The standard React setup today; the code barely changes (JSX files renamed to
   `.jsx`, `process.env.PUBLIC_URL` replaced, `index.html` moved to the root).
3. **Next.js.** Server rendering would help link previews, but it changes routing and
   hosting for a site that is fully static.

## Decision

Vite, with oxlint, Prettier, Vitest and knip, matching the personal engineering standard.
Vercel builds it through `vercel.json`, which also rewrites every route to `index.html`
(CRA's Vercel preset did that implicitly).

TypeScript and image compression come in separate pull requests so each change is easy to
review and deploy on its own.

## Consequences

- `npm start` became `npm run dev`; the dev server stays on port 3000.
- Content editors are unaffected: data files keep the same shape.
- Every PR now runs CI, and a broken image path fails the tests.
