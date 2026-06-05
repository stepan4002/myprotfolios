// Full visual audit of the main site at desktop + mobile widths.
// Captures screenshots and detects:
//  - horizontal overflow
//  - elements that overflow their parents
//  - text-on-text overlap
//  - empty or invisible content
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("scripts/main-audit");
await fs.mkdir(OUT, { recursive: true });

const PAGES = [
  { name: "home",     url: "https://nikolasstepan.com" },
  { name: "about",    url: "https://nikolasstepan.com/about" },
  { name: "events",   url: "https://nikolasstepan.com/events" },
  { name: "web",      url: "https://nikolasstepan.com/web" },
  { name: "sales",    url: "https://nikolasstepan.com/sales" },
  { name: "projects", url: "https://nikolasstepan.com/projects" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900, dpr: 1 },
  { name: "mobile",  width: 390,  height: 844, dpr: 2 },
];

const browser = await chromium.launch({ headless: true });

let totalIssues = 0;
const report = [];

for (const vp of VIEWPORTS) {
  console.log(`\n┌───────── ${vp.name.toUpperCase()} ${vp.width}x${vp.height} ─────────`);
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.dpr,
    ignoreHTTPSErrors: true,
    isMobile: vp.name === "mobile",
    hasTouch: vp.name === "mobile",
  });

  for (const p of PAGES) {
    const page = await ctx.newPage();
    const pageReport = { viewport: vp.name, page: p.name, url: p.url, issues: [] };

    try {
      console.log(`│ ${p.name} (${p.url})`);
      await page.goto(p.url, { waitUntil: "networkidle", timeout: 35000 });
      await page.waitForTimeout(1200);

      // Scroll through to trigger any IntersectionObserver reveals
      const h = await page.evaluate(() => document.documentElement.scrollHeight);
      for (let y = 0; y < h; y += 500) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(80);
      }
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(300);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      // Screenshot
      const file = path.join(OUT, `${vp.name}-${p.name}.png`);
      await page.screenshot({ path: file, fullPage: true });

      // 1) Horizontal overflow
      const overflow = await page.evaluate(() => ({
        scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        innerWidth: window.innerWidth,
        scrollHeight: document.documentElement.scrollHeight,
      }));
      if (overflow.scrollWidth > overflow.innerWidth + 2) {
        pageReport.issues.push(`H-overflow: ${overflow.scrollWidth}px > ${overflow.innerWidth}px`);
      }

      // 2) Element-level overflow / extreme width
      const wideElements = await page.evaluate((vw) => {
        const out = [];
        document.querySelectorAll("*").forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.right > vw + 4 && r.width < 9999 && r.width > 0 && r.height > 0) {
            const cs = getComputedStyle(el);
            if (cs.position === "fixed" || cs.display === "none") return;
            out.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className?.toString?.() ?? "").slice(0, 60),
              w: Math.round(r.width),
              right: Math.round(r.right),
              text: (el.textContent ?? "").trim().slice(0, 40),
            });
          }
        });
        const seen = new Set();
        return out.filter((x) => {
          const k = x.tag + "|" + x.cls + "|" + x.w;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        }).slice(0, 5);
      }, vp.width);
      wideElements.forEach((e) => {
        pageReport.issues.push(`Wide: <${e.tag}.${e.cls.slice(0, 40)}> w=${e.w} right=${e.right} "${e.text}"`);
      });

      // 3) Detect text overlapping non-trivially with other text
      const overlaps = await page.evaluate(() => {
        // pick visible leaf text elements
        const texts = [];
        document.querySelectorAll("h1, h2, h3, h4, p, a, span, em, strong, blockquote, li").forEach((el) => {
          if (el.children.length > 0) return;
          const txt = (el.textContent ?? "").trim();
          if (txt.length < 3) return;
          const r = el.getBoundingClientRect();
          if (r.width < 20 || r.height < 10) return;
          const cs = getComputedStyle(el);
          if (cs.position === "fixed" || cs.opacity === "0" || cs.display === "none" || cs.visibility === "hidden") return;
          texts.push({ el, r, txt });
        });
        const issues = [];
        for (let i = 0; i < texts.length; i++) {
          for (let j = i + 1; j < texts.length; j++) {
            const a = texts[i], b = texts[j];
            // skip if one is descendant/ancestor of the other
            if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
            const ax1 = a.r.left, ax2 = a.r.right, ay1 = a.r.top, ay2 = a.r.bottom;
            const bx1 = b.r.left, bx2 = b.r.right, by1 = b.r.top, by2 = b.r.bottom;
            const ix = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
            const iy = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
            const iarea = ix * iy;
            const aarea = a.r.width * a.r.height;
            const barea = b.r.width * b.r.height;
            const overlap = iarea / Math.min(aarea, barea);
            if (overlap > 0.35) {
              issues.push({
                a: a.txt.slice(0, 30),
                b: b.txt.slice(0, 30),
                pct: Math.round(overlap * 100),
              });
              if (issues.length >= 8) return issues;
            }
          }
        }
        return issues;
      });
      overlaps.forEach((o) => {
        pageReport.issues.push(`Overlap ${o.pct}%: "${o.a}" ↔ "${o.b}"`);
      });

      // 4) Empty sections (sections that take vertical space but contain no visible text)
      const ghostSections = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll("section").forEach((sec) => {
          const r = sec.getBoundingClientRect();
          if (r.height < 100) return;
          const txt = (sec.textContent ?? "").trim();
          if (txt.length < 6) {
            out.push({ h: Math.round(r.height) });
          }
        });
        return out;
      });
      ghostSections.forEach((g) => {
        pageReport.issues.push(`Empty section: h=${g.h}px`);
      });

      // 5) Check that the page rendered (not blank)
      const bodyText = await page.evaluate(() => (document.body.textContent ?? "").trim().length);
      if (bodyText < 200) {
        pageReport.issues.push(`Body text too short (${bodyText} chars) — possible blank page`);
      }

      // Summary
      console.log(`│   ${overflow.innerWidth}x${overflow.scrollHeight} · ${bodyText} chars · ${pageReport.issues.length} issue(s)`);
      pageReport.issues.forEach((i) => console.log(`│     • ${i}`));

      totalIssues += pageReport.issues.length;
    } catch (e) {
      console.log(`│   ✗ ERROR: ${e.message}`);
      pageReport.issues.push("EXCEPTION: " + e.message);
      totalIssues++;
    }

    report.push(pageReport);
    await page.close();
  }

  await ctx.close();
}

await browser.close();
await fs.writeFile(path.join(OUT, "report.json"), JSON.stringify(report, null, 2));

console.log(`\n└───────── ${totalIssues} total issue(s) flagged across ${PAGES.length * VIEWPORTS.length} renders`);
console.log(`Screenshots: ${OUT}`);
console.log(`Report: ${path.join(OUT, "report.json")}`);
