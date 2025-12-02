import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const candidates = [
  path.join(projectRoot, '.prisma', 'client'),
  path.join(projectRoot, 'node_modules', '.prisma', 'client'),
  path.join(projectRoot, 'src', 'generated', 'prisma'),
];
const outDir = path.join(projectRoot, '.next', 'server', 'chunks');

function findEngine(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  const match = files.find(f => f.startsWith('libquery_engine-') && f.endsWith('.so.node'));
  return match ? path.join(dir, match) : null;
}

function copyEngine(src) {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const filename = path.basename(src);
  const dest = path.join(outDir, filename);
  fs.copyFileSync(src, dest);
  console.log(`Copied Prisma engine: ${filename} -> ${dest}`);
}

for (const dir of candidates) {
  const engine = findEngine(dir);
  if (engine) {
    copyEngine(engine);
    process.exit(0);
  }
}

console.warn('Prisma engine not found in expected locations:', candidates);