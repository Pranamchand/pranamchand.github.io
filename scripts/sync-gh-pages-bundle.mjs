import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const outDir = path.join(rootDir, 'gh-pages-bundle');

if (fs.existsSync(distAssetsDir)) {
  fs.mkdirSync(outDir, { recursive: true });
  const files = fs.readdirSync(distAssetsDir);

  const jsFile = files.find((f) => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = files.find((f) => f.startsWith('index-') && f.endsWith('.css'));

  if (jsFile) {
    const rawJs = fs.readFileSync(path.join(distAssetsDir, jsFile), 'utf8');
    // Rewrite root-relative "/assets/..." and '/assets/...' to "./public/assets/..."
    // so static branch deployments serving repository root resolve files inside /public/assets/
    const patchedJs = rawJs
      .replaceAll('"/assets/', '"./public/assets/')
      .replaceAll("'/assets/", "'./public/assets/")
      .replaceAll('`/assets/', '`./public/assets/');
    fs.writeFileSync(path.join(outDir, 'app.js'), patchedJs, 'utf8');
  }

  if (cssFile) {
    const rawCss = fs.readFileSync(path.join(distAssetsDir, cssFile), 'utf8');
    const patchedCss = rawCss.replaceAll('/assets/', '../public/assets/');
    fs.writeFileSync(path.join(outDir, 'app.css'), patchedCss, 'utf8');
  }
}
