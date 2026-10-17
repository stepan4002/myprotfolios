# Nikolas Stepan — Unified AI Engineering Portfolio

One Next.js 16 / React 19 / TypeScript / Tailwind 4 app, deployed from `apps/main`.

## Develop and verify

- `npm run dev:main`
- `npm run build:main`
- `npm --prefix apps/main run lint`
- `node scripts/mobile-smoke.mjs`
- `node scripts/main-audit.mjs`

For browser checks, run `npm install` and `npx playwright install chromium` at the repository root. `npm run test:migration` runs the 415 migration checks.

Audit scripts default to `http://127.0.0.1:4317`; override with `PORTFOLIO_URL` and `PORTFOLIO_QA_DIR`.

## Structure

- `/`: Forward Deployed AI Engineer / AI Solutions Architect positioning and featured work.
- `/work`: Unified case studies, architecture, operational impact, and wider project catalogue.
- `/about`: Technical capabilities, founder/operator background, languages, and Budapest location.
- `/work/[slug]`: Seven dedicated case studies with contribution, architecture, failure paths, delivery scope and measurement gaps.
- `/downloads/Nikolas-Stepan-CV.pdf`: Public CV generated from the shared profile.
- `/evidence/`: Clearly labelled synthetic reference examples, Python tests and run instructions.
- `/web`, `/projects`, `/business`: Permanent redirects to `/work`.
- `/sales`, `/events`, `/ipa`, `/ipam`: Removed; return 404.

## Content and design

`src/data/work.ts` contains curated case studies. Original Main projects, migrated Web projects, and Sales business context remain under `src/data`. `business-source.json` retains the extracted Sales text for future editing; it is not imported into the website bundle.

Migrated procedural SVG artwork uses Main's CSS tokens. Global styling lives in `src/app/globals.css`; Tailwind 4 uses the existing PostCSS configuration.

Claims come from the previous portfolio. GroupOps pod maturity and Marketing Lab's single-test result are stated explicitly. Add independently verified evidence before strengthening outcome claims.

## Deployment

Vercel project: `nikolasstepan-main`. Main domain: `nikolasstepan.com`.
Sales, Events, IPA and Web Vercel projects were deleted during migration. The Web subdomain now permanently redirects to Main. Sales, Events and IPA subdomains return 404.

Production build and lint pass. All 415 migration checks passed both locally and against production; twelve desktop/mobile visual renders reported no layout issues.

Original Sales and Web source backups are in the sibling `Portfolio Migration Archive` directory and in Git history. The archive is outside the deployed app.

## Evidence and public-profile maintenance

The homepage prioritises Voice Agent, Upgates Translator and Catalogue Automation. Project cards link to dedicated pages. The broad archive is no longer rendered; Paperclip/Postiz are explicitly attributed as third-party platforms.

`src/data/profile.json` supplies the shared public profile. Generate the one-page CV with `python scripts/build-public-cv.py` (ReportLab required). Education titles remain conservative because existing source drafts disagree; see `docs/evidence-needed.md`.

Reference examples use synthetic fixtures and make no production service calls. Run their nine tests with `python -B -m unittest discover -s apps/main/public/evidence -p test_portfolio_reference.py`. They do not substantiate production reliability, throughput or business outcomes.

`docs/linkedin-profile-update.md` is paste-ready copy only; no LinkedIn profile edit was performed. The published museum default PIN is removed from current source. Runtime credential changes require the museum application/deployment, which is not part of this repository.
