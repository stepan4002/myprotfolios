# Nikolas Stepan — Unified AI Engineering Portfolio

One Next.js 16 / React 19 / TypeScript / Tailwind 4 app, deployed from `apps/main`.

## Develop and verify

- `npm run dev:main`
- `npm run build:main`
- `npm --prefix apps/main run lint`
- `node scripts/mobile-smoke.mjs`
- `node scripts/main-audit.mjs`

Audit scripts default to `http://127.0.0.1:4317`; override with `PORTFOLIO_URL` and `PORTFOLIO_QA_DIR`.

## Structure

- `/`: Forward Deployed AI Engineer / AI Solutions Architect positioning and featured work.
- `/work`: Unified case studies, architecture, operational impact, and wider project catalogue.
- `/about`: Technical capabilities, founder/operator background, languages, and Budapest location.
- `/web`, `/projects`, `/business`: Permanent redirects to `/work`.
- `/sales`, `/events`, `/ipa`, `/ipam`: Removed; return 404.

## Content and design

`src/data/work.ts` contains curated case studies. Original Main projects, migrated Web projects, and Sales business context remain under `src/data`. `business-source.json` retains the extracted Sales text for future editing; it is not imported into the website bundle.

Migrated procedural SVG artwork uses Main's CSS tokens. Global styling lives in `src/app/globals.css`; Tailwind 4 uses the existing PostCSS configuration.

Claims come from the previous portfolio. GroupOps pod maturity and Marketing Lab's single-test result are stated explicitly. Add independently verified evidence before strengthening outcome claims.

## Deployment

Vercel project: `nikolasstepan-main`. Main domain: `nikolasstepan.com`.
Sales, Events and IPA Vercel projects were deleted during migration. Web is retired after the unified Main deployment is verified.

Original Sales and Web source backups are in the sibling `Portfolio Migration Archive` directory and in Git history. The archive is outside the deployed app.
