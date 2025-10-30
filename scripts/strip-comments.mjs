import fs from 'fs';
import path from 'path';
import decomment from 'decomment';

const ROOT = path.resolve(process.cwd());
const INCLUDE_EXT = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.html']);
const EXCLUDE_DIRS = new Set(['node_modules', '.git', 'dist', 'build', '.next', '.vite']);

function strip(content, ext) {
  try {
    if (ext === '.html' || ext === '.htm') return decomment.html(content);
    if (ext === '.css' || ext === '.scss') return decomment.css(content);
    return decomment.text(content);
  } catch {
    return content;
  }
}

function processFile(filePath) {
  const ext = path.extname(filePath);
  const original = fs.readFileSync(filePath, 'utf8');
  const stripped = strip(original, ext);
  if (stripped !== original) {
    fs.writeFileSync(filePath, stripped, 'utf8');
    return true;
  }
  return false;
}

function walk(dir, changed = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, changed);
    } else {
      const ext = path.extname(entry.name);
      if (INCLUDE_EXT.has(ext)) {
        if (processFile(full)) changed.push(full);
      }
    }
  }
  return changed;
}

const changedFiles = walk(ROOT, []);
console.log(JSON.stringify(changedFiles, null, 2));


