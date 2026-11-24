// 1) Trims empty transparent canvas around the supplied crest (mark itself untouched, no recolour/redraw).
// 2) Renames TEMPORARY stock images to semantic slot names and removes unused ones.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const src = '../brand/rkdf-logo-original.png';
const { info } = await sharp(src).trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
await sharp(src).trim({ threshold: 1 }).extend({ top: 4, bottom: 4, left: 4, right: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile('public/brand/rkdf-crest.png');
console.log('crest', info.width, info.height);
const map = {
  '1580674684081-7617fbf3d745': 'hero-dubai', '1562774053-701939374585': 'campus-heritage', '1541339907198-e08756dedf3f': 'graduation',
  '1581091226825-a6a2a5aee158': 'school-1', '1531482615713-2afd69097998': 'school-2', '1532094349884-543bc11b234d': 'school-3',
  '1507679799987-c73779587ccf': 'school-4', '1589829545856-d10d557cf95f': 'school-5', '1558769132-cb1aea458c5e': 'school-6',
  '1512453979798-5ea266f8880c': 'life-skyline', '1518684079-3c830dcef090': 'life-coast', '1528605248644-14dd04022da1': 'life-students',
  '1461896836934-ffe607ba8211': 'life-sport', '1555854877-bab0e564b8d5': 'life-accommodation', '1546412414-e1885259563a': 'life-landmark',
  '1573164713988-8665fc963095': 'research-1', '1576091160550-2173dba999ef': 'research-2', '1519389950473-47ba0277781c': 'research-3',
  '1517245386807-bb43f82c33c4': 'careers-1', '1522202176988-66273c2fd55f': 'careers-2',
  '1571260899304-425eee4c7efc': 'news-1', '1524178232363-1fb2b075b655': 'news-2', '1544531586-fde5298cdd40': 'news-3',
  '1606761568499-6d2451b23c66': 'news-4', '1517486808906-6ca8b3f04846': 'news-5',
  '1497366216548-37526070297c': 'visit-campus', '1504384308090-c894fdcc538d': 'campus-study',
};
const dir = 'public/images/temp';
for (const f of await fs.readdir(dir)) {
  const id = f.replace('.webp', '');
  if (map[id]) await fs.rename(`${dir}/${f}`, `${dir}/${map[id]}.webp`); else if (!Object.values(map).includes(id)) await fs.unlink(`${dir}/${f}`);
}
for (const f of (await fs.readdir(dir)).sort()) { const m = await sharp(`${dir}/${f}`).metadata(); console.log(f, m.width, m.height); }
