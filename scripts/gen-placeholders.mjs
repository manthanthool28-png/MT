/**
 * Generates branded placeholder graphics for every asset that is still missing.
 * Delete a file here and drop the real screenshot in with the same name to
 * replace it — then flip `pending: false` in src/data/assets.js.
 *
 *   node scripts/gen-placeholders.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { assets } from '../src/data/assets.js'

const OUT = new URL('../public/assets/', import.meta.url)
mkdirSync(OUT, { recursive: true })

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function svg({ w, h, title, note }) {
  const cx = w / 2
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${esc(title)} — placeholder">
  <defs>
    <pattern id="p" width="26" height="26" patternUnits="userSpaceOnUse">
      <path d="M0 26 L13 0 L26 26 Z" fill="none" stroke="#96918A" stroke-width="0.6" opacity="0.14"/>
    </pattern>
  </defs>
  <rect width="${w}" height="${h}" fill="#191817"/>
  <rect width="${w}" height="${h}" fill="url(#p)"/>
  <path d="M${w} 0 L${w} ${h * 0.34} L${w - h * 0.34} 0 Z" fill="#F0EEEA" opacity="0.05"/>
  <path d="M0 ${h} L${h * 0.22} ${h} L0 ${h - h * 0.22} Z" fill="#F0EEEA" opacity="0.04"/>
  <g transform="translate(${cx} ${h / 2 - 26})">
    <path d="M-17 14 L0 -15 L17 14 Z" fill="none" stroke="#96918A" stroke-width="1.6" stroke-linejoin="round" opacity="0.75"/>
    <path d="M0 -15 L17 14 L0 14 Z" fill="#C9C5BE" opacity="0.7"/>
  </g>
  <text x="${cx}" y="${h / 2 + 22}" text-anchor="middle" font-family="'Space Grotesk',Inter,sans-serif" font-size="${Math.max(13, Math.round(w / 34))}" font-weight="600" fill="#C9C5BE">${esc(title)}</text>
  <text x="${cx}" y="${h / 2 + 22 + Math.max(19, Math.round(w / 26))}" text-anchor="middle" font-family="ui-monospace,Menlo,monospace" font-size="${Math.max(10, Math.round(w / 52))}" fill="#96918A">${esc(note)}</text>
</svg>
`
}

let n = 0
for (const a of assets) {
  if (!a.pending) continue
  const file = a.src.replace('./assets/', '')
  writeFileSync(new URL(file, OUT), svg({ w: a.w, h: a.h, title: a.title, note: `placeholder · needs ${a.w}×${a.h} ${a.kind}` }))
  n++
}
console.log(`Wrote ${n} placeholder graphics to public/assets/`)
