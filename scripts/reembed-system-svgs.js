/**
 * Re-inlines gsSystemBlank.svg and bgSystem.svg into src/gamesystems.html.
 * Run after editing those files: node scripts/reembed-system-svgs.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const htmlPath = path.join(root, 'src/gamesystems.html');
const gsPath = path.join(root, 'src/images/gameSuite/gsSystemBlank.svg');
const bgPath = path.join(root, 'src/images/gameSuite/bgSystem.svg');

function stripSvgHeader(s) {
  return s.replace(/^<\?xml[^>]*>\s*/u, '').replace(/<!--[\s\S]*?-->\s*/u, '');
}

function maxStIndex(svg) {
  let max = 0;
  const re = /\bst(\d+)\b/g;
  let m;
  while ((m = re.exec(svg)) !== null) {
    max = Math.max(max, parseInt(m[1], 10));
  }
  return max;
}

function renameStToBgSt(svg) {
  const max = maxStIndex(svg);
  for (let n = max; n >= 0; n--) {
    svg = svg.replace(new RegExp(`\\.st${n}\\b`, 'g'), `.bgSt${n}`);
    svg = svg.replace(new RegExp(`\\bst${n}\\b`, 'g'), `bgSt${n}`);
  }
  return svg;
}

function addSvgFontStyle(s) {
  return s.replace(
    /style="(enable-background:new 0 0 \d+ \d+);"/u,
    'style="$1;font-family:Arial,Helvetica,sans-serif;"'
  );
}

function prepareGs(svgRaw) {
  let s = stripSvgHeader(svgRaw);
  s = s.replace(/<svg\s/u, '<svg class="imageFull thumb" ');
  s = addSvgFontStyle(s);
  s = s.replace(/\.st7\{font-family:'ArialMT';\}/u, '.st7{font-family:Arial,Helvetica,sans-serif;}');
  s = s.replace(/font-family:'ArialMT'/g, 'font-family:Arial,Helvetica,sans-serif');
  return s;
}

function prepareBg(svgRaw) {
  let s = stripSvgHeader(svgRaw);
  s = renameStToBgSt(s);
  s = s.replace(/<svg\s/u, '<svg class="imageFull thumb" ');
  s = addSvgFontStyle(s);
  s = s.replace(/\.bgSt8\{font-family:'ArialMT';\}/u, '.bgSt8{font-family:Arial,Helvetica,sans-serif;}');
  s = s.replace(/font-family:'ArialMT'/g, 'font-family:Arial,Helvetica,sans-serif');
  return s;
}

function indent(s) {
  return s
    .split(/\r?\n/)
    .map((line) => '          ' + line)
    .join('\n');
}

function wrapImageCont(svgBody) {
  return `        <div class="imageCont">\n${indent(svgBody)}\n        </div>`;
}

let html = fs.readFileSync(htmlPath, 'utf8');
const gs = wrapImageCont(prepareGs(fs.readFileSync(gsPath, 'utf8')));
const bg = wrapImageCont(prepareBg(fs.readFileSync(bgPath, 'utf8')));

const blockRe =
  /        <div class="imageCont">\r?\n          <svg class="imageFull thumb"[\s\S]*?<\/svg>\r?\n          \r?\n        <\/div>/g;

const matches = [...html.matchAll(blockRe)];
if (matches.length !== 2) {
  console.error('Expected exactly 2 inline system SVG blocks, found', matches.length);
  process.exit(1);
}

let i = 0;
html = html.replace(blockRe, () => {
  i += 1;
  return i === 1 ? gs : bg;
});

fs.writeFileSync(htmlPath, html);
console.log('Re-embedded gsSystemBlank.svg and bgSystem.svg into gamesystems.html');
