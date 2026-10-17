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
    for (const route of ['/', '/work', '/about', '/work/cadema-voice-agent', '/work/upgates-translator', '/work/catalogue-migration', '/work/cadema-configurator', '/work/groupops', '/work/n8n-pipelines', '/work/marketing-lab']) {
      const response = await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      check(response.status() === 200, `${width} ${route} renders`);
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width} ${route} has no horizontal overflow`);
      check(await page.locator('h1').count() === 1, `${width} ${route} has one primary heading`);
      check(await page.getByRole('link', { name: 'GitHub ↗', exact: true }).last().getAttribute('href') === 'https://github.com/stepan4002', `${width} ${route} GitHub profile`);
      check(await page.getByRole('link', { name: 'LinkedIn ↗', exact: true }).last().getAttribute('href') === 'https://www.linkedin.com/in/nikolas-stepan-545417221/', `${width} ${route} LinkedIn profile`);
      const badLinks = await page.locator('a[href]').evaluateAll(links => links.map(link => link.getAttribute('href')).filter(href => /^\/(sales|events|web|business|projects)([/?#]|$)/.test(href) || /^(https?:\/\/)(sales|events|ipa|ipam|web)\.nikolasstepan\.com/.test(href)));
      check(!badLinks.length, `${width} ${route} no obsolete portal links`);
      const visibleText = await page.locator('main').innerText();
      check(!/Senior|PIN 1234/.test(visibleText), `${width} ${route} no unsupported seniority or published PIN`);
      if (route === '/' || route === '/work') {
        const links = await page.locator('.featured-grid .work-card h3 a').evaluateAll(items => items.map(item => item.getAttribute('href')));
        check(JSON.stringify(links) === JSON.stringify(['/work/cadema-voice-agent','/work/upgates-translator','/work/catalogue-migration']), `${width} ${route} evidence-first project order and dedicated pages`);
        check(!visibleText.includes('70+'), `${width} ${route} no agent-count headline`);
      }
      if (route === '/') {
        check(await page.getByRole('link', { name: 'Download CV ↓', exact: true }).first().getAttribute('href') === '/downloads/Nikolas-Stepan-CV.pdf', `${width} CV download near introduction`);
        if (width < 768) check((await page.locator('.work-card').first().boundingBox()).y < 1050, `${width} first project appears sooner on mobile`);
      }
      if (route === '/work/cadema-voice-agent') {
        await page.getByRole('button', { name: 'Custom quote', exact: true }).click();
        check(await page.locator('.route-result').innerText().then(text => text.includes('Escalate to a person')), `${width} custom quote escalates`);
        await page.getByRole('button', { name: 'Uncertain answer', exact: true }).click();
        check(await page.locator('.route-result').innerText().then(text => text.includes('unverified date')), `${width} unknown date is not promised`);
      }
      if (route === '/work/upgates-translator') {
        const write = page.getByRole('button', { name: 'Simulate write', exact: true });
        check(await write.isDisabled(), `${width} write blocked before preview`);
        await page.getByRole('button', { name: 'Translate sample', exact: true }).click();
        check(await write.isDisabled(), `${width} write blocked before approval`);
        check((await page.locator('.demo-code').last().innerText()).includes('{{delivery_days}}'), `${width} translation retains placeholder`);
        await page.getByRole('button', { name: 'Approve preview', exact: true }).click();
        check(await write.isEnabled(), `${width} approval enables simulated write`);
        await write.click();
        check((await page.locator('.demo-code').last().innerText()).includes('no external API was called'), `${width} simulated write accurately disclosed`);
        await page.getByRole('button', { name: 'Reset', exact: true }).click();
        check(await write.isDisabled(), `${width} reset revokes simulated approval`);
      }
      if (route === '/work/catalogue-migration') {
        await page.getByRole('button', { name: 'Run sample reconciliation', exact: true }).click();
        check((await page.locator('.route-result').innerText()).includes('2 matched · 1 review · 1 unmatched'), `${width} reconciliation handles ambiguous and missing records`);
      }
      if (route.startsWith('/work/')) {
        check(await page.getByRole('heading', { name: 'My contribution', exact: true }).count() === 1, `${width} ${route} contribution is explicit`);
        check(await page.getByRole('heading', { name: 'Results & measurement gaps', exact: true }).count() === 1, `${width} ${route} measurements are scoped`);
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
  for (const asset of ['/downloads/Nikolas-Stepan-CV.pdf', '/evidence/portfolio_reference.py', '/evidence/test_portfolio_reference.py', '/evidence/README.md']) { const response = await page.request.get(base + asset); check(response.status() === 200, `${asset} downloadable`); if (asset.endsWith('.pdf')) check((await response.body()).subarray(0,4).toString() === '%PDF', 'CV response is an actual PDF'); }
  for (const route of ['/sales', '/events', '/ipa', '/ipam', '/work/not-a-project']) check((await page.request.get(base + route)).status() === 404, `${route} removed`);
} finally { await browser.close(); }
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, 'migration-checks.json'), JSON.stringify({ base, checks: results.length, failures, results }, null, 2));
console.log(`${results.length} checks, ${failures.length} failures`);
for (const failure of failures) console.error(failure);
process.exitCode = failures.length ? 1 : 0;
