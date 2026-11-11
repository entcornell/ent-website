# ENT website

The public website of Epsilon Nu Tau, Cornell (www.entcornell.com): a static React SPA built
with Vite and deployed by Vercel.

**It is not:** an application system, a member portal or a backend. All content lives in
`src/components/*Data.js` and `recruitmentEvents.js`.

Follows `~/.claude/standards/engineering.md`; anything below wins over it.

## Hard rules

1. English everywhere in the repo. We talk in Spanish.
2. `main` is production (Vercel). Never push to it: branch → PR → squash. Merge only on the
   owner's go-ahead.
3. `npm run check && npm run build` pass before any PR.
4. README and CHANGELOG are updated in the same PR as the change.
5. Authorship: the person making the change. No Claude attribution anywhere.
6. This is the club's shared repo: other members edit content through GitHub. Keep data
   files simple to edit by hand.
7. Images go through `npm run images` before they are committed and are referenced with
   absolute paths (`/images/x.webp`). Tests enforce both.

## Where things are

| What                     | Where                                                                     |
| ------------------------ | ------------------------------------------------------------------------- |
| Routes and shared layout | `src/App.jsx`                                                             |
| Pages and components     | `src/components/*.jsx` (each with its `.css`)                             |
| Content                  | `src/components/*Data.js`, `recruitmentEvents.js`, `applicationConfig.js` |
| Static files and images  | `public/`                                                                 |
| Hosting config           | `vercel.json`                                                             |
| Decisions                | `docs/decisions/`                                                         |

## Commands

`npm run dev` · `npm run check` · `npm run build` · `npm test` · `npm run images`
