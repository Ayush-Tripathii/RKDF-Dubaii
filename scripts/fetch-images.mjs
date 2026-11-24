// Downloads TEMPORARY stock images (Unsplash) and converts to WebP. Replace before launch.
import sharp from 'sharp';
import fs from 'node:fs/promises';
const ids = process.argv.slice(2);
const out = 'public/images/temp';
for (const id of ids) {
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=1800&q=80&auto=format&fm=jpg`);
  if (!res.ok) { console.log('fail', id); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 72 }).toFile(`${out}/${id}.webp`);
}
// contact sheet
const files = (await fs.readdir(out)).filter(f => f.endsWith('.webp')).sort();
const tiles = await Promise.all(files.map(async (f, i) => ({
  input: await sharp(`${out}/${f}`).resize(240, 160, { fit: 'cover' }).toBuffer(),
  left: (i % 7) * 250, top: Math.floor(i / 7) * 190,
})));
const labels = files.map((f, i) => `<text x="${(i%7)*250+4}" y="${Math.floor(i/7)*190+178}" font-size="13" font-family="Arial">${i}:${f.slice(0,13)}</text>`).join('');
const H = Math.ceil(files.length / 7) * 190;
await sharp({ create: { width: 1750, height: H, channels: 3, background: '#fff' } })
  .composite([...tiles, { input: Buffer.from(`<svg width="1750" height="${H}">${labels}</svg>`), left: 0, top: 0 }])
  .png().toFile(process.env.SHEET);
console.log(files.length, 'images');
