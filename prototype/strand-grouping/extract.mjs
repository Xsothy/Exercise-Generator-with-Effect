// PROTOTYPE: turns the inventory markdown into data.js for strands.html. Run: node prototype/strand-grouping/extract.mjs
import { readFileSync, writeFileSync } from 'node:fs'
const dir = new URL('.', import.meta.url)
const md = readFileSync(new URL('inventory.md', dir), 'utf8').split('\n')
const end = md.findIndex(l => l.startsWith('## Existing app topics'))
let area = null, section = null
const rows = []
for (const l of md.slice(0, end)) {
  if (l.startsWith('### ')) { area = l.slice(4).trim(); section = area === 'Mechanics' ? '8 Mechanics' : null; continue }
  if (l.startsWith('#### ')) { section = l.slice(5).trim(); continue }
  if (!area || !section || !l.startsWith('| ') || l.startsWith('| Topic') || l.startsWith('|---')) continue
  const c = l.split('|').slice(1, -1).map(s => s.trim())
  rows.push({ area, section, topic: c[0], grades: (c[3] || '').split(' (')[0], check: c[4], existing: c[6].replace(/`/g, '') })
}
writeFileSync(new URL('data.js', dir), 'window.ROWS = ' + JSON.stringify(rows) + ';\n')
console.log(rows.length, 'rows')
