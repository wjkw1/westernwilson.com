// Runs axe-core (WCAG 2.0–2.2 A/AA plus best practices) on every page in the
// built site's sitemap, once in light mode and once in dark mode, and exits
// non-zero if anything fails.
//
// Usage (from the repo root, after `hugo --minify` and serving public/):
//   node tests/check-a11y.mjs http://localhost:8080
//
// Browser: BROWSER=chrome (default) or firefox, BROWSER_PATH=/path/to/binary.

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

const base = (process.argv[2] ?? 'http://localhost:8080').replace(/\/$/, '');
const browserName = process.env.BROWSER ?? 'chrome';
const executablePath = process.env.BROWSER_PATH;
if (!executablePath) {
  console.error('Set BROWSER_PATH to a Chrome or Firefox binary.');
  process.exit(2);
}

const sitemap = readFileSync('public/sitemap.xml', 'utf8');
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
if (paths.length === 0) {
  console.error('No pages found in public/sitemap.xml. Build the site first.');
  process.exit(2);
}

async function waitForServer() {
  for (let attempt = 0; attempt < 20; attempt++) {
    try {
      if ((await fetch(base + '/')).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Nothing is serving ${base}`);
}

await waitForServer();

const browser = await puppeteer.launch({
  browser: browserName,
  executablePath,
  headless: true,
  // CI runners restrict the user namespaces Chrome's sandbox needs; the pages are our own build output.
  args: browserName === 'chrome' ? ['--no-sandbox'] : [],
});

let failures = 0;
for (const scheme of ['light', 'dark']) {
  for (const path of paths) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(base + path, { waitUntil: 'load' });
    await page.evaluate((s) => localStorage.setItem('color-scheme', s), scheme);
    await page.reload({ waitUntil: 'load' });
    await page.evaluate(axeSource);
    const { violations } = await page.evaluate(() =>
      axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
      })
    );
    for (const v of violations) {
      failures += v.nodes.length;
      console.log(`✗ [${scheme}] ${path} — ${v.id} (${v.impact}): ${v.help}`);
      for (const node of v.nodes) console.log(`    ${node.target.join(' ')}`);
    }
    await page.close();
  }
}
await browser.close();

const checked = paths.length * 2;
if (failures) {
  console.log(`\n${failures} accessibility violation(s) across ${checked} page checks.`);
  process.exit(1);
}
console.log(`✓ No accessibility violations across ${checked} page checks (${paths.length} pages × light/dark).`);
