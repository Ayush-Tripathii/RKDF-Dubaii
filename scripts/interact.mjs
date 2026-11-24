// Dev QA: interaction states — mega menu, enquiry modal (with validation), search, mobile menu.
import { chromium } from 'playwright-core';
const [,, base, out] = process.argv;
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
const d = await b.newPage({ viewport: { width: 1440, height: 900 } });
await d.goto(base + '/en', { waitUntil: 'networkidle' });
await d.hover('#nav-btn-academics'); await d.waitForTimeout(500);
await d.screenshot({ path: out + '/i_mega.png' });
await d.keyboard.press('Escape');
await d.getByRole('button', { name: 'Enquire' }).first().click(); await d.waitForTimeout(500);
await d.getByRole('button', { name: 'Send enquiry' }).click(); await d.waitForTimeout(300);
await d.screenshot({ path: out + '/i_enquiry_err.png' });
const focused = await d.evaluate(() => document.activeElement?.outerHTML.slice(0, 120));
await d.keyboard.press('Escape'); await d.waitForTimeout(300);
await d.keyboard.press('/'); await d.waitForTimeout(300); await d.keyboard.type('program'); await d.waitForTimeout(300);
await d.screenshot({ path: out + '/i_search.png' });
// API round trip
const api = await d.evaluate(async () => (await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'visit', name: 'Test User', email: 't@example.com', phone: '501234567', consent: true, date: '2030-01-01' }) })).json());
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto(base + '/ar', { waitUntil: 'networkidle' });
await m.screenshot({ path: out + '/i_m_ar.png' });
await m.getByRole('button', { name: 'فتح القائمة' }).click(); await m.waitForTimeout(900);
await m.screenshot({ path: out + '/i_m_menu.png' });
const ovf = await m.evaluate(() => document.documentElement.scrollWidth - innerWidth);
console.log(JSON.stringify({ focused, api, ovfMobileAr: ovf }));
await b.close();
