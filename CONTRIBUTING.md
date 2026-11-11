# Contributing

Thanks for helping keep the ENT website up to date. Most changes are content updates
(members, events, ventures); the [README](README.md#update-the-content) says which file to
edit for each.

## Setup

```sh
nvm use                 # Node version from .nvmrc
npm ci
git config commit.template .gitmessage
npm run hooks:install   # commit guard: blocks .env files, build output, AI attribution
npm run dev             # http://localhost:3000
```

## Workflow

1. Branch from `main`: `git switch -c <type>/<short-kebab-desc>`
   (e.g. `feat/fall-2026-members`).
2. Commit with [Conventional Commits](https://www.conventionalcommits.org/):
   `<type>(<scope>): <summary>`, e.g. `feat(brothers): add Nu class members`.
3. Before pushing: `npm run check && npm run build`. Never weaken a lint or test rule to
   make it pass; fix the code. Never bypass the commit guard with `--no-verify`.
4. `git push -u origin HEAD` and open a pull request. Fill in the PR template, pasting the
   real check output under **Proof**.
5. CI must be green. Open the **Vercel preview** linked on the PR and check the pages you
   changed.
6. Merge with **squash**.

## `main` is production

- Every merge to `main` deploys to [www.entcornell.com](https://www.entcornell.com). A merge
  is a release; a draft PR is never merged.
- To undo a bad merge, open a new PR that fixes or reverts it. Don't use GitHub's Revert
  button (bringing the work back later needs a revert of the revert).

## Standards

- English everywhere in the repo.
- Compress images before adding them (see [README, Images](README.md#images)).
- Update the README and CHANGELOG (`[Unreleased]`) in the same PR as the change.
- Bug fixes include a test that would have caught the bug.
