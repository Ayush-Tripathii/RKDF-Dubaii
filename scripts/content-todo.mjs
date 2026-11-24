import { DUMMY } from '../content/dummy.ts';
// Generates ../CONTENT-TODO.md: every [[PLACEHOLDER]] token in /content and /src, grouped by where it appears.
import fs from 'node:fs';
const groups = {
  'Site-wide (header, footer, contact, persistent UI)': ['content/site.ts', 'src/components/Footer.tsx', 'src/components/PersistentUI.tsx', 'src/app/[locale]/layout.tsx', 'src/app/api/enquiry/route.ts'],
  'Homepage copy & sections': ['content/translations.ts', 'src/components/home/Sections.tsx', 'content/stats.ts', 'content/images.ts'],
  'Schools & faculties (mirror Bhopal list, confirm for Dubai)': ['content/schools.ts'],
  'Programs (×16 placeholder entries — replace with real list)': ['content/programs.ts'],
  'Research centres': ['content/research.ts'],
  'News & events (dates drive the homepage rail)': ['content/news.ts'],
  'People: Chancellor & testimonials (portraits are slots, never stock)': ['content/people.ts'],
  'Admissions: entry requirements & FAQs': ['content/admissions.ts'],
  'Inner pages (route registry — /about, /admissions/*, /student-life/* …)': ['content/routes.ts', 'src/app/[locale]/[...slug]/page.tsx'],
};
const expand = (src) => {
  const s = fs.readFileSync(src, 'utf8');
  const found = new Set(s.match(/\[\[[A-Z0-9_]+\]\]/g) ?? []);
  // template-literal tokens like [[SCHOOL_${n}_NAME]] → expand from counts
  for (const m of s.matchAll(/\[\[([A-Z_]*)\$\{(\w+)\}([A-Z0-9_]*)\]\]/g)) found.add(`[[${m[1]}{n}${m[3]}]]`);
  return [...found];
};
const seen = new Set();
let md = `# CONTENT-TODO — RKDF University Dubai\n\n**Preview mode:** \`DUMMY_MODE = true\` in \`web/content/dummy.ts\`, so every token below currently shows the *dummy* value noted beside it. None of it is verified. Before launch, replace each dummy value with confirmed information, then set \`DUMMY_MODE = false\` — any token still unconfirmed then shows as a visible red placeholder.\n\n**Already real** (from rkdf.ac.in, fetched 23 Nov 2026): the 16 faculties; program names, durations and entry requirements; the Chancellor (Dr. Sadhna Kapoor) and Vice-Chancellor (Prof. Vijay K. Agrawal); the 2012 launch date.\n\n**Dummy content written directly in data files** (not tokens — review each file): program tuition (AED), intakes and summaries in \`content/programs.ts\`; school summaries in \`content/schools.ts\`; news and events in \`content/news.ts\`; research centres in \`content/research.ts\`; testimonials (fictional people, stock portraits) in \`content/people.ts\`; entry requirements by curriculum in \`content/admissions.ts\`; employer names in \`src/components/home/Sections.tsx\`.\n\nRegenerate: \`node scripts/content-todo.mjs\` (from /web).\n\n`;
for (const [title, files] of Object.entries(groups)) {
  const toks = [...new Set(files.flatMap(f => fs.existsSync(f) ? expand(f) : []))].filter(t => !seen.has(t) && !['[[TOKEN]]', '[[PLACEHOLDER]]', '[[TOKENS]]'].includes(t)).sort();
  toks.forEach(t => seen.add(t));
  if (!toks.length) continue;
  md += `## ${title}\n\n_Edit in: ${files.filter(f => fs.existsSync(f)).map(f => '`web/' + f + '`').join(', ')}_\n\n` + toks.map(t => { const v = DUMMY[t.slice(2, -2)]; return `- [ ] \`${t}\`` + (v ? ` — dummy: ${typeof v === 'string' ? v : v.en}` : ''); }).join('\n') + '\n\n';
}
md += `## Hero headline options

Set the live one with \`site.heroHeadline\` (0–2) in \`web/content/site.ts\`. Currently **1**.

0. Bhopal’s rigour, Dubai’s ambition — one university between them.
1. A university of two cities, built for the work of this one.
2. An Indian academic tradition, now teaching at the crossroads of the Gulf.

`;
md += `## Brand & assets (not tokens, but required before launch)\n\n- [ ] **Dubai logo lockup.** The supplied crest reads "NAAC A+" and "BHOPAL". NAAC is an Indian accreditation of the Bhopal campus; showing it on the Dubai site may imply the Dubai campus holds it. Confirm with compliance, or supply a Dubai lockup. File: \`web/public/brand/rkdf-crest.png\`.\n- [ ] Vector (SVG) crest. The supplied PNG is 164×243 px.\n- [ ] Replace all temporary stock photography in \`web/public/images/temp/\` (every image with \`temp: true\` in /content).\n- [ ] Hero video (≤2 MB, MP4/WebM) + poster frame, if wanted. A still is used now.\n- [ ] Chancellor portrait, testimonial portraits (slots).\n- [ ] Employer logos (12 marquee slots) — only for confirmed partners.\n- [ ] Map embed URL (\`site.mapEmbedUrl\`), virtual tour URL (\`site.virtualTourUrl\`), prospectus PDF (\`site.prospectus.href\`), regulator verification URL (\`site.regulator.verifyUrl\`).\n- [ ] Phone (E.164), WhatsApp number, email, social profile URLs in \`web/content/site.ts\`.\n- [ ] Production domain: set \`NEXT_PUBLIC_SITE_URL\` (canonical, hreflang, sitemap, OG).\n- [ ] CRM endpoint for enquiry / tour / RSVP forms (\`web/src/app/api/enquiry/route.ts\`). Submissions are validated but **not stored** yet.\n- [ ] Native-speaker review of all Arabic copy in \`web/content/translations.ts\`.\n- [ ] Legal text for /privacy and /terms.\n`;
fs.writeFileSync('../CONTENT-TODO.md', md);
console.log('tokens:', seen.size);
