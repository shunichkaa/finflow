import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const INCLUDE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html', '.json', '.md']);
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.vite']);

function toHex(n) {
  const v = Math.max(0, Math.min(255, Math.round(Number(n))));
  return v.toString(16).toUpperCase().padStart(2, '0');
}

function alphaToHex(a) {
  const v = Math.round(Math.max(0, Math.min(1, Number(a))) * 255);
  return v.toString(16).toUpperCase().padStart(2, '0');
}

function rgbaToHex(match, r, g, b, a) {
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}${alphaToHex(a)}`;
  return hex;
}

function rgbToHex(match, r, g, b) {
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return hex;
}

const rgbaRegex = /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]?(?:\.\d+)?)\s*\)/gi;
const rgbRegex = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/gi;

function processFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let content = original;
  content = content.replace(rgbaRegex, rgbaToHex);
  content = content.replace(rgbRegex, rgbToHex);
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let changed = 0;
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      changed += walk(full);
    } else {
      const ext = path.extname(entry.name);
      if (INCLUDE_EXT.has(ext)) {
        if (processFile(full)) changed += 1;
      }
    }
  }
  return changed;
}

const changedCount = walk(ROOT);
console.log(`Converted colors in ${changedCount} files.`);


