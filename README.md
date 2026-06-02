# nikolasstepan.com — Portfolio Monorepo

Four-app monorepo backing `nikolasstepan.com` and its three subdomains.

## Apps

| Path | Stack | Deployed at |
|---|---|---|
| [`apps/main`](apps/main) | Next.js 16 + React 19 + Three.js | https://nikolasstepan.com |
| [`apps/events`](apps/events) | Static HTML | https://events.nikolasstepan.com |
| [`apps/web`](apps/web) | Vite + React 18 + Three.js | https://web.nikolasstepan.com |
| [`apps/sales`](apps/sales) | Static HTML (custom) | https://sales.nikolasstepan.com |

Each app is its own Vercel project, all pointing at this repo with a different "Root Directory" setting. Pushes to `main` auto-deploy.

## Local development

Each app is self-contained — `cd` into it and run its own scripts.

```bash
# Main (Next.js)
cd apps/main && npm install && npm run dev      # → http://localhost:3000

# Events (static)
# Open apps/events/index.html in browser, or:
cd apps/events && npx serve .                   # → http://localhost:3000

# Web (Vite)
cd apps/web && npm install && npm run dev       # → http://localhost:5173

# Sales (static)
cd apps/sales && npx serve .                    # → http://localhost:3000
```

## Layout philosophy

- The **main domain** (`nikolasstepan.com`) gives the full picture — tabbed view with a dashboard plus condensed sections for each track. Each section links out to its full specialized portfolio.
- Each **subdomain** is a focused, single-purpose portfolio. Send the relevant subdomain when you want someone to see only one aspect of the work.

## Deployment

Vercel auto-detects the framework per `apps/<name>` and rebuilds only the apps whose files changed on each push.
