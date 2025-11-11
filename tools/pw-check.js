const { chromium } = require('playwright');
(async () => {
  const url = process.argv[2] || 'https://garyohosu.github.io/';
  const out = process.argv[3] || 'tmp_site.png';
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  page.on('console', msg => console.log('console:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('pageerror:', err.message));
  const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  const status = resp ? resp.status() : 'no-response';
  await page.waitForTimeout(2000);
  await page.screenshot({ path: out, fullPage: true });
  const title = await page.title();
  console.log(JSON.stringify({ url, status, title, out }));
  await browser.close();
})();
