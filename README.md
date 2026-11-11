# Epsilon Nu Tau — Cornell website

The public website of **Epsilon Nu Tau (ENT), Tau Chapter at Cornell University**, the
nation's first entrepreneurship fraternity.

**Live:** [www.entcornell.com](https://www.entcornell.com)

**What it is:** a static React site that presents ENT to prospective members, partners and
alumni: who we are, our values, our members, student ventures and the recruitment timeline.

**What it is not:** an application system or a member portal. Applications go through a
Google Form, and there is no backend, database or login. All content lives in the source
code.

---

## Contents

- [Pages](#pages)
- [Run it locally](#run-it-locally)
- [Update the content](#update-the-content)
- [Images](#images)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Known issues and roadmap](#known-issues-and-roadmap)

## Pages

| Route                            | File                                                  | What it shows                                                                        |
| -------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `/`                              | `src/components/Home.jsx`                             | Hero, about blurb, ENT endeavors (popups), photo gallery                             |
| `/about`                         | `src/components/About.jsx`                            | History and mission                                                                  |
| `/Values`                        | `src/components/Values.jsx`                           | Core values                                                                          |
| `/studentVentures`               | `src/components/StudentVentures.jsx`                  | Member-founded businesses, filterable by category                                    |
| `/SBC`                           | `src/components/SBC.jsx`                              | Small Business Collective, links to [sbc.entcornell.com](https://sbc.entcornell.com) |
| `/recruitment`                   | `src/components/Recruitment.jsx`                      | Recruitment timeline and application rounds                                          |
| `/brothers`                      | `src/components/Brothers.jsx`                         | Executive board, members by pledge class, alumni                                     |
| `/newsletter`, `/newsletter/:id` | `src/components/Newsletter.jsx`, `NewsletterPage.jsx` | Newsletter archive (hidden from the navbar, linked from the footer)                  |

`/members` redirects to `/brothers`. Every page shares the navbar, the footer and the
upcoming-event popup (`src/App.jsx`).

## Run it locally

You need [Node.js](https://nodejs.org) 24 (the version is pinned in `.nvmrc`; with
[nvm](https://github.com/nvm-sh/nvm), run `nvm use`).

```sh
git clone https://github.com/entcornell/ent-website.git
cd ent-website
npm ci          # install the exact dependency versions from package-lock.json
npm run dev     # dev server at http://localhost:3000, reloads on save
```

| Command                 | What it does                                                    |
| ----------------------- | --------------------------------------------------------------- |
| `npm run dev`           | Development server with hot reload                              |
| `npm run build`         | Production build into `dist/`                                   |
| `npm run preview`       | Serves the production build locally                             |
| `npm test`              | Runs the tests once (`npm run test:watch` re-runs them on save) |
| `npm run check`         | Everything CI checks: lint, format, tests and dead code         |
| `npm run format`        | Formats every file with Prettier                                |
| `npm run hooks:install` | Enables the commit guard (blocks `.env` files and build output) |

## Update the content

Almost every update is a change to one data file. You don't need to touch page layout.

| To change…               | Edit                                    | Notes                                                                                            |
| ------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Members, e-board, alumni | `src/components/BrothersData.js`        | Arrays `eboard`, `brotherhood` (one entry per pledge class) and `alumni`                         |
| Recruitment events       | `src/components/recruitmentEvents.js`   | Timeline events, application rounds and `RECRUITMENT_YEAR`; also feeds the site-wide event popup |
| Application form link    | `src/components/applicationConfig.js`   | Used by every "Apply Here" button, including Round One                                           |
| Student ventures         | `src/components/StudentVenturesData.js` | Categories in the filter bar come from the `category` field                                      |
| Home page endeavors      | `src/components/EndeavorsData.js`       | Cards and popups on the home page                                                                |
| Newsletter issues        | `src/components/NewsletterData.js`      | Newest issue first; page images in `public/newsletters/issueN/`                                  |

### Add a member

1. Add their headshot to `public/headshots-fall2026/` and run
   `npm run images -- public/headshots-fall2026/FirstLast-Headshot.jpg` to turn it into a
   small `.webp` (see [Images](#images)).
2. Add an entry to the right pledge class in `src/components/BrothersData.js`:

   ```js
   {
     name: "First Last",
     email: "netid@cornell.edu",
     year: "2029",
     major: "Computer Science",
     involvement: "Clubs, teams",
     hobbies: "Hobbies",
     image: "/headshots-fall2026/FirstLast-Headshot.webp",
     style: { objectPosition: "center 30%" }, // optional: moves the crop up or down
   },
   ```

   E-board entries also take a `role`, for example `"VP Recruitment"`.

3. Run `npm run dev` and check the card on `/brothers`. `npm test` fails if the image path
   doesn't match a file in `public/`.

### Update recruitment for a new season

1. In `src/components/recruitmentEvents.js`, set `RECRUITMENT_YEAR` and replace
   `recruitmentEvents` and `applicationRounds`. Dates are written like `"Sep 9"` (a test
   checks that every date can be read). The popup shows the next event that hasn't happened
   yet, and hides itself when every event is in the past.
2. Update the application link in `src/components/applicationConfig.js`.
3. Update the season title (`FALL 2026`) at the top of `src/components/Recruitment.jsx`.

## Images

Everything in `public/` is served as-is, so `public/images/home1.webp` is available at
`/images/home1.webp`. In the code, always write the path with a leading `/`; without it the
image breaks on nested pages like `/newsletter/3` (a test enforces this).

| Folder                                                            | Contents                                    |
| ----------------------------------------------------------------- | ------------------------------------------- |
| `public/images/`                                                  | Page heroes, backgrounds and gallery photos |
| `public/headshots-fall2026/`, `headshots-fall2025/`, `headshots/` | Member headshots by season                  |
| `public/group-pics/`                                              | Group photos                                |
| `public/studentbusinesses/`                                       | Student venture logos and photos            |
| `public/endeavors/`                                               | Home page endeavor images                   |
| `public/newsletters/issueN/`                                      | Newsletter pages and headline image         |

**Every photo goes through `npm run images` before it is committed.** Phone photos are
3–15 MB and make the site slow on mobile. The script (`scripts/optimize-images.mjs`):

- resizes to the size the page shows (800 px wide for headshots, 1200 for ventures and
  endeavors, 1600 for newsletter pages, 2000 for heroes), keeping the phone's rotation;
- converts to WebP and deletes the original (git history keeps it);
- updates every reference in the code from `.jpg`/`.png` to `.webp`.

```sh
npm run images -- public/headshots-fall2026/FirstLast-Headshot.jpg   # one or more files
npm run images                                                       # everything in public/
```

A test fails if any image in `public/` is over 1 MB. Logos and icons
(`ENTTransparentLogo.png`, `favicon.ico`, `apple-touch-icon.png`, `ENTLogo*.png`) stay as
PNG on purpose: link previews on some apps don't read WebP.

Name files `FirstLast-Headshot.jpg`, without spaces. When you replace a photo, delete the
old one.

## Project structure

```
ent-website/
├── index.html           Page title, description and link-preview (Open Graph) tags
├── public/              Static files served as-is: favicon, images
├── src/
│   ├── index.jsx        Entry point, mounts <App />
│   ├── App.jsx          Routes and the shared layout (navbar, footer, event popup)
│   ├── index.css        Global styles
│   ├── components/      One .jsx per page or component, each with its own .css, the
│   │                    *Data.js content files listed above, and their *.test.* files
│   └── test/setup.js    Test setup (Vitest + Testing Library)
├── docs/decisions/      Why the project is set up the way it is
├── .github/             CI workflow, PR and issue templates, Dependabot
├── vite.config.js       Build and test config
└── vercel.json          Hosting config
```

Built with [React 19](https://react.dev), [React Router 7](https://reactrouter.com),
[Font Awesome](https://fontawesome.com) icons and [Vite](https://vite.dev). Checked with
[oxlint](https://oxc.rs), [Prettier](https://prettier.io), [Vitest](https://vitest.dev) and
[knip](https://knip.dev).

## Deployment

The site is hosted on **[Vercel](https://vercel.com)**, connected to this GitHub repo.

- **`main` is production.** Every push or merge to `main` deploys to
  www.entcornell.com within a couple of minutes. `entcornell.com` redirects to `www`.
- Every other branch and pull request gets a **preview URL** from Vercel, posted on the
  PR. Check your change there before merging.
- `vercel.json` tells Vercel how to build (`npm run build` into `dist/`) and rewrites every
  route to `index.html`, so links like `/brothers` work when opened directly. Real files in
  `public/` are served before the rewrite applies.
- GitHub Actions runs `.github/workflows/ci.yml` on every pull request: lint, format,
  tests, dead-code check and the production build.

## Contributing

1. Create a branch from `main`: `git switch -c feat/fall-2026-members`.
2. Make the change and check it with `npm run dev`.
3. Run `npm run check` and `npm run build`.
4. Push and open a pull request. Wait for CI, check the Vercel preview, then merge.

The full workflow, commit format and rules are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Known issues and roadmap

- [ ] Give each page its own `<title>` and description.
- [ ] Convert the code to TypeScript.
- [x] Compress every image (358 MB → 21 MB) and use absolute image paths.
- [x] Make the recruitment dropdowns, venture cards and About menu keyboard-accessible.
- [x] Move off Create React App to Vite, with lint, tests and CI on every pull request.

---

© Epsilon Nu Tau, Tau Chapter at Cornell University. All rights reserved.
