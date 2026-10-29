# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page website for the floorball (Unihockey) club Baboons United Hedingen, built with Nuxt 4 + Nuxt UI 4 (Tailwind CSS 4) and deployed to Netlify (https://baboons-united.netlify.app/). Site content is in German (`lang: 'de'`, dates formatted with `de-CH`).

## Commands

Node version is pinned in `.nvmrc` (24.x, matching Netlify).

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run lint` / `npm run lint:fix` — ESLint (config comes from `@nuxt/eslint`)
- `npm run test` — run all Vitest tests once
- `npx vitest run test/netlify/functions/games.test.ts` — run a single test file (add `-t "<name>"` to filter by test name)
- `npm run upgrade-nuxt` / `npm run upgrade-interactive` — dependency upgrades; afterwards run `build` and `lint`

CI (`.github/workflows/workflow.yml`) runs `npm ci`, then lint, build and test on pushes to `main`/`develop` and on PRs.

## Architecture

- **Frontend**: the whole site is `app/app.vue` (no pages/router directory). It uses Nuxt UI components (`UApp`, `UFooter`, `UButton`, …) and `NuxtImg` for images in `public/`. Theme colors are set via `--ui-*` CSS variables in `app/assets/css/main.css`; color mode switching is disabled in `nuxt.config.ts`.
- **Backend**: a Netlify Function at `netlify/functions/games.ts`, called client-side from `app.vue` via `useFetch('/.netlify/functions/games', { server: false })`. It queries the Swiss Unihockey API (`https://api-v2.swissunihockey.ch/api`) for the team's games of the current season (falling back to the previous season if there are no played games yet), fetches per-game details for team IDs/logos, and returns a `GamesOverview` split into `past` (has a result, newest first) and `future`.
- **Shared types**: `shared/types.ts` holds the team ID (`TEAM_ID`), the raw Swiss Unihockey response shapes (`Su*` types) and the app-facing `Game`/`GamesOverview` types. It is imported from the app as `#shared/types` and from the function via relative path.
- The Swiss Unihockey API returns table-like `regions → rows → cells → text[]` structures; parsing in `games.ts` relies on cell positions (date/time, location, home, guest, result) and on German relative dates like `heute`/`morgen`.
- `etc/swissunihockey.http` contains example API requests for exploring the Swiss Unihockey API.

## Tests

Tests live in `test/`, mirroring the source path (e.g. `test/netlify/functions/games.test.ts`). They mock `global.fetch` with `vi.fn()` and route responses by URL substring, so no network access is needed.
