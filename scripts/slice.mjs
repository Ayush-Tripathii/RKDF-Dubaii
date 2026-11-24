// Dev QA: slices a tall screenshot into viewable chunks.
import sharp from 'sharp';
const [,, file, h = '1600', w = '1000'] = process.argv;
const meta = await sharp(file).metadata();
const n = Math.ceil(meta.height / +h);
for (let i = 0; i < n; i++) {
  const top = i * +h; const height = Math.min(+h, meta.height - top);
  await sharp(file).extract({ left: 0, top, width: meta.width, height }).resize({ width: +w }).png().toFile(file.replace('.png', `_${String(i).padStart(2,'0')}.png`));
}
console.log(file, meta.width, meta.height, n);
