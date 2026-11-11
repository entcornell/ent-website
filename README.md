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

| Route | File | What it shows |
|---|---|---|
| `/` | `src/components/Home.js` | Hero, about blurb, ENT endeavors (popups), photo gallery |
| `/about` | `src/components/About.js` | History and mission |
| `/Values` | `src/components/Values.js` | Core values |
| `/studentVentures` | `src/components/StudentVentures.js` | Member-founded businesses, filterable by category |
| `/SBC` | `src/components/SBC.js` | Small Business Collective, links to [sbc.entcornell.com](https://sbc.entcornell.com) |
| `/recruitment` | `src/components/Recruitment.js` | Recruitment timeline and application rounds |
| `/brothers` | `src/components/Brothers.js` | Executive board, members by pledge class, alumni |
| `/newsletter`, `/newsletter/:id` | `src/components/Newsletter.js`, `NewsletterPage.js` | Newsletter archive (hidden from the navbar, linked from the footer) |

`/members` redirects to `/brothers`. Every page shares the navbar, the footer and the
upcoming-event popup (`src/App.js`).

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```sh
git clone https://github.com/entcornell/ent-website.git
cd ent-website
npm ci          # install the exact dependency versions from package-lock.json
npm start       # dev server at http://localhost:3000, reloads on save
```

| Command | What it does |
|---|---|
| `npm start` | Development server with hot reload |
| `npm run build` | Production build into `build/` (run it before opening a PR) |

## Update the content

Almost every update is a change to one data file. You don't need to touch page layout.

| To change… | Edit | Notes |
|---|---|---|
| Members, e-board, alumni | `src/components/Brothers.js` | Arrays `eboard`, `brotherhood` (one entry per pledge class) and `alumni` at the top of the file |
| Recruitment events | `src/components/recruitmentEvents.js` | Shared by the Recruitment page and the site-wide event popup. Update `RECRUITMENT_YEAR` each season |
| Application form link | `src/components/applicationConfig.js` | Used by every "Apply Here" button. Also update the link in the rounds section of `Recruitment.js` |
| Student ventures | `src/components/StudentVenturesData.js` | Categories in the filter bar come from the `category` field |
| Home page endeavors | `src/components/EndeavorsData.js` | Cards and popups on the home page |
| Newsletter issues | `src/components/NewsletterData.js` | Newest issue first; page images in `public/newsletters/issueN/` |

### Add a member

1. Add their headshot to `public/headshots-fall2026/` (see [Images](#images)).
2. Add an entry to the right pledge class in `src/components/Brothers.js`:

   ```js
   {
     name: "First Last",
     email: "netid@cornell.edu",
     year: "2029",
     major: "Computer Science",
     involvement: "Clubs, teams",
     hobbies: "Hobbies",
     image: "headshots-fall2026/FirstLast-Headshot.jpg",
     style: { objectPosition: "center 30%" }, // optional: moves the crop up or down
   },
   ```

   E-board entries also take a `role`, for example `"VP Recruitment"`.

3. Run `npm start` and check the card on `/brothers`.

### Update recruitment for a new season

1. Set `RECRUITMENT_YEAR` and replace the events in `src/components/recruitmentEvents.js`.
   Dates are written like `"Sep 9"`. The popup shows the next event that hasn't happened yet,
   and hides itself when every event is in the past.
2. Update the application link in `src/components/applicationConfig.js` and in the rounds
   section of `src/components/Recruitment.js`.
3. Update the season title (`FALL 2026`) at the top of `Recruitment.js`.

## Images

Everything in `public/` is served as-is, so `public/images/home1.jpg` is available at
`/images/home1.jpg`.

| Folder | Contents |
|---|---|
| `public/images/` | Page heroes, backgrounds and gallery photos |
| `public/headshots-fall2026/`, `headshots-fall2025/`, `headshots/` | Member headshots by season |
| `public/group-pics/` | Group photos |
| `public/studentbusinesses/` | Student venture logos and photos |
| `public/endeavors/` | Home page endeavor images |
| `public/newsletters/issueN/` | Newsletter pages and headline image |

**Before adding a photo, make it small.** Phone photos are 3–15 MB and make the site slow
on mobile. Aim for **under 300 KB**: about 800 px wide for headshots and cards, and
2000 px for full-width heroes. [Squoosh](https://squoosh.app) does this in the browser
(choose WebP or MozJPEG, quality ~75).

Name files `FirstLast-Headshot.jpg`, without spaces. When you replace a photo, delete the
old one; git keeps it in the history anyway.

## Project structure

```
ent-website/
├── public/              Static files served as-is: index.html, favicon, images
│   └── index.html       Page title, description and link-preview (Open Graph) tags
├── src/
│   ├── index.js         Entry point, mounts <App />
│   ├── App.js           Routes and the shared layout (navbar, footer, event popup)
│   ├── index.css        Global styles
│   └── components/      One file per page or component, each with its own .css,
│                        plus the *Data.js / *Config.js content files listed above
└── package.json
```

Built with [React 19](https://react.dev), [React Router 7](https://reactrouter.com),
[Font Awesome](https://fontawesome.com) icons and
[Create React App](https://create-react-app.dev) (`react-scripts`).

## Deployment

The site is hosted on **[Vercel](https://vercel.com)**, connected to this GitHub repo.

- **`main` is production.** Every push or merge to `main` deploys to
  www.entcornell.com within a couple of minutes. `entcornell.com` redirects to `www`.
- Every other branch and pull request gets a **preview URL** from Vercel, posted on the
  PR. Check your change there before merging.
- Vercel serves `index.html` for every route, so links like `/brothers` work when opened
  directly.

## Contributing

1. Create a branch from `main`: `git switch -c update/fall-2026-members`.
2. Make the change and check it with `npm start`.
3. Run `npm run build` and make sure it finishes without errors.
4. Push and open a pull request. Check the Vercel preview, then merge.

Write commit messages that say what changed, for example
`feat(brothers): add Nu class members` or `fix(recruitment): correct info session room`.

## Known issues and roadmap

- [ ] Compress the existing images (about 350 MB today); several are over 5 MB.
- [ ] Use absolute image paths (`/images/...`). Relative paths break on nested routes like
      `/newsletter/3`.
- [ ] Give each page its own `<title>` and description.
- [ ] Make the recruitment dropdowns keyboard-accessible.
- [ ] Move off Create React App, which is no longer maintained, to Vite. Add automated
      checks (lint and tests) on every pull request.

---

© Epsilon Nu Tau, Tau Chapter at Cornell University. All rights reserved.
