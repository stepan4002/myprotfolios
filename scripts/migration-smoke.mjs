import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:4317';
const out = process.env.PORTFOLIO_QA_DIR || path.resolve('scripts/migration-qa');
const browser = await chromium.launch();
const results = [];
const failures = [];
const check = (ok, label) => { results.push({ label, passed: !!ok }); if (!ok) failures.push(label); };
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/work', '/about']) {
      const response = await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      check(response.status() === 200, `${width} ${route} renders`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width} ${route} has no horizontal overflow`);
      check(await page.locator('h1').count() === 1, `${width} ${route} has one primary heading`);
      check(await page.getByRole('link', { name: 'GitHub ↗', exact: true }).last().getAttribute('href') === 'https://github.com/stepan4002', `${width} ${route} GitHub profile`);
      check(await page.getByRole('link', { name: 'LinkedIn ↗', exact: true }).last().getAttribute('href') === 'https://www.linkedin.com/in/nikolas-stepan-545417221/', `${width} ${route} LinkedIn profile`);
      const badLinks = await page.locator('a[href]').evaluateAll(links => links.map(link => link.getAttribute('href')).filter(href => /^\/(sales|events|web|business|projects)([/?#]|$)/.test(href) || /^(https?:\/\/)(sales|events|ipa|ipam|web)\.nikolasstepan\.com/.test(href)));
      check(!badLinks.length, `${width} ${route} no obsolete portal links`);
      if (route === '/work') {
        check(await page.locator('.case-study-grid article').count() === 6, `${width} six architecture-and-impact case studies`);
        for (const slug of ['groupops', 'cadema-voice-agent', 'n8n-pipelines']) check(await page.locator(`#${slug}`).count() === 1, `${width} featured ${slug} exists`);
        const first = page.locator('.project-log details').first();
        await first.locator('summary').click();
        check(await first.getAttribute('open') !== null && await first.locator('p').first().isVisible(), `${width} project details expand`);
        await first.locator('summary').click();
      }
      if (route === '/' && width < 768) {
        await page.getByRole('button', { name: 'Menu +' }).click();
        check(await page.locator('#mobile-menu').isVisible(), `${width} mobile menu opens`);
        await page.locator('#mobile-menu').getByRole('link', { name: 'Work ↗' }).click();
        await page.waitForURL('**/work');
        check(await page.locator('#mobile-menu').count() === 0, `${width} mobile menu closes after navigation`);
      }
    }
    check(!errors.length, `${width} no browser runtime errors: ${errors.join('; ')}`);
    await context.close();
  }
  const page = await browser.newPage();
  for (const route of ['/web', '/projects', '/business']) {
    const response = await page.request.get(base + route, { maxRedirects: 0 });
    check(response.status() === 308 && response.headers().location === '/work', `${route} permanently redirects to unified Work`);
  }
  for (const route of ['/sales', '/events', '/ipa', '/ipam']) check((await page.request.get(base + route)).status() === 404, `${route} removed`);
} finally { await browser.close(); }
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, 'migration-checks.json'), JSON.stringify({ base, checks: results.length, failures, results }, null, 2));
console.log(`${results.length} checks, ${failures.length} failures`);
for (const failure of failures) console.error(failure);
process.exitCode = failures.length ? 1 : 0;
