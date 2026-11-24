// Dev QA: full-page screenshots via the system Edge (playwright-core). Reduced motion so reveals are visible.
import { chromium } from 'playwright-core';
const [,, base, outDir, ...pages] = process.argv;
const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
for (const spec of pages) {
  const [path, w = '1440', name = path.replace(/\W+/g, '_') + '_' + w, sel] = spec.split('|');
  const ctx = await browser.newContext({ viewport: { width: +w, height: +w > 800 ? 900 : 844 }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', e => errs.push(String(e)));
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(800);
  const checks = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    hashLinks: [...document.querySelectorAll('a[href="#"]')].length,
    zeroStats: [...document.querySelectorAll('dd')].filter(d => /^\s*0[+%]?\s*$/.test(d.textContent)).length,
    noAlt: [...document.querySelectorAll('img:not([alt])')].length,
    dir: document.documentElement.dir, lang: document.documentElement.lang,
    overflowX: document.documentElement.scrollWidth > window.innerWidth,
    culprits: [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1); }).filter(e => !e.closest('[aria-roledescription=carousel] .no-scrollbar, .marquee, .no-scrollbar')).slice(0, 6).map(e => e.tagName + '.' + String(e.className).slice(0, 80)),
  }));
  if (sel) await page.locator(sel).first().screenshot({ path: `${outDir}/${name}.png` });
  else await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: !name.endsWith('_vp') });
  console.log(name, JSON.stringify(checks), errs.length ? 'ERRORS: ' + errs.join(' | ').slice(0, 600) : '');
  await ctx.close();
}
await browser.close();
