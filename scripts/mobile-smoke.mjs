// Mobile smoke test — render each site at iPhone width, screenshot, check for overflow.
import { chromium, devices } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("scripts/mobile-screenshots");
await fs.mkdir(OUT, { recursive: true });

const PAGES = [
  { name: "main",            url: "https://nikolasstepan.com" },
  { name: "main-about",      url: "https://nikolasstepan.com/about" },
  { name: "main-events-tab", url: "https://nikolasstepan.com/events" },
  { name: "main-web-tab",    url: "https://nikolasstepan.com/web" },
  { name: "main-sales-tab",  url: "https://nikolasstepan.com/sales" },
  { name: "events",          url: "https://events.nikolasstepan.com" },
  { name: "web",             url: "https://web.nikolasstepan.com" },
  { name: "sales",           url: "https://sales.nikolasstepan.com" },
];

const browser = await chromium.launch({ headless: true });

const ctx = await browser.newContext({
  ...devices["iPhone 13"],          // 390x844, scale 3
  ignoreHTTPSErrors: true,
});

let totalIssues = 0;
for (const p of PAGES) {
  const page = await ctx.newPage();
  try {
    console.log(`\n— ${p.name} (${p.url})`);
    await page.goto(p.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(800);

    // Scroll through the page to trigger any IntersectionObserver-based reveal animations.
    // Without this, fullPage screenshots capture sections that are still at opacity:0.
    const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = 600;
    for (let y = 0; y < totalHeight; y += step) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(120);
    }
    // Bottom and back to top
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // Capture full page screenshot
    const file = path.join(OUT, `${p.name}.png`);
    await page.screenshot({ path: file, fullPage: true });

    // Check for horizontal overflow — common mobile bug
    const overflow = await page.evaluate(() => {
      const html = document.documentElement;
      const body = document.body;
      return {
        scrollWidth: Math.max(html.scrollWidth, body.scrollWidth),
        innerWidth: window.innerWidth,
        ratio: Math.max(html.scrollWidth, body.scrollWidth) / window.innerWidth,
      };
    });
    const hasHOverflow = overflow.scrollWidth > overflow.innerWidth + 2;
    console.log(`  viewport ${overflow.innerWidth} · scrollW ${overflow.scrollWidth} ${hasHOverflow ? '⚠️  OVERFLOW' : '✓'}`);
    if (hasHOverflow) totalIssues++;

    // Find any elements wider than viewport
    if (hasHOverflow) {
      const culprits = await page.evaluate(() => {
        const vw = window.innerWidth;
        const out = [];
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 2 && r.width < 9999) {
            out.push({
              tag: el.tagName.toLowerCase(),
              cls: el.className?.toString?.()?.slice(0, 80) ?? "",
              w: Math.round(r.width),
              right: Math.round(r.right),
            });
          }
        });
        // dedupe by class
        const seen = new Set();
        return out.filter((x) => {
          const k = x.tag + "|" + x.cls;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        }).slice(0, 8);
      });
      console.log("  Overflow culprits:");
      culprits.forEach((c) => console.log(`    ${c.tag}.${c.cls.slice(0, 50)} → w=${c.w}, right=${c.right}`));
    }

    console.log(`  screenshot → ${path.relative(process.cwd(), file)}`);
  } catch (e) {
    console.log(`  ✗ error: ${e.message}`);
    totalIssues++;
  } finally {
    await page.close();
  }
}

await browser.close();
console.log(`\nDone. ${totalIssues} issues across ${PAGES.length} pages.`);
process.exit(totalIssues === 0 ? 0 : 1);
