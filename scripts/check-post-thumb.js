const { chromium } = require('playwright');

(async () => {
  const url = 'https://garyohosu.github.io/posts/note-genspark-super-ai-agent-3d-printer-stl/';
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  const deadline = Date.now() + 180000; // 3 minutes
  let last = null;
  while (Date.now() < deadline) {
    await page.goto(url + '?t=' + Date.now(), { waitUntil: 'networkidle' });
    const handle = await page.$('article.post img, main img');
    const src = handle ? (await handle.getAttribute('src')) : null;
    const naturalWidth = handle ? await handle.evaluate(img => img.naturalWidth || 0) : 0;
    last = { src, naturalWidth };
    if (src && naturalWidth > 0) {
      await handle.screenshot({ path: 'tmp_thumb.png' });
      break;
    }
    await new Promise(r => setTimeout(r, 5000));
  }

  console.log(JSON.stringify({ url, ok: last && last.naturalWidth > 0, last }, null, 2));
  await browser.close();
})();
