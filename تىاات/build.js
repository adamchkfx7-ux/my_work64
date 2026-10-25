import { mkdirSync, copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const dist = './dist';
if (!existsSync(dist)) mkdirSync(dist, { recursive: true });

const files = ['index.html', 'style.css', 'main.js'];
files.forEach(f => {
  copyFileSync(join('.', f), join(dist, f));
  console.log(`copied ${f} -> dist/${f}`);
});

console.log('Build completed successfully.');
