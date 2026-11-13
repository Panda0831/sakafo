import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = join(process.cwd(), 'src');
const FAIL = [];

const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      walk(p);
      continue;
    }
    if (!['.ts', '.tsx', '.css'].includes(extname(p))) continue;
    const text = readFileSync(p, 'utf8');
    const lines = text.split('\n');
    lines.forEach((line, i) => {
      if (line.includes('border-radius: 0') || line.includes('rounded-none') || line.includes('rounded-[0')) {
        FAIL.push(`${p}:${i + 1}  coin franc interdit`);
      }
      const m = line.match(/border-radius:\s*(\d+)px/);
      if (m && Number(m[1]) < 8 && Number(m[1]) !== 50) {
        FAIL.push(`${p}:${i + 1}  rayon ${m[1]}px < 8px`);
      }
    });
  }
};

walk(ROOT);
if (FAIL.length) {
  console.error('check-radius : angles droits détectés\n' + FAIL.join('\n'));
  process.exit(1);
}
console.log('check-radius : aucun angle droit.');
