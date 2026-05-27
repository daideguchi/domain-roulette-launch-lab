import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [domainA, domainB, domainC] = process.argv.slice(2);

function normalizeDomain(value) {
  const clean = String(value || '')
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '');

  if (!/^[a-z0-9][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+$/.test(clean)) {
    throw new Error(`invalid domain: ${value}`);
  }
  return clean;
}

function replaceRequired(body, pattern, replacement, label) {
  if (!pattern.test(body)) {
    throw new Error(`could not find ${label}`);
  }
  return body.replace(pattern, replacement);
}

const domains = [normalizeDomain(domainA), normalizeDomain(domainB), normalizeDomain(domainC)];

const indexPath = path.join(root, 'index.html');
let indexHtml = await fs.readFile(indexPath, 'utf8');

domains.forEach((domain, index) => {
  const letter = ['A', 'B', 'C'][index];
  indexHtml = replaceRequired(
    indexHtml,
    new RegExp(`(<input id="domain${letter}" value=")[^"]*(" aria-label="domain ${letter}">)`),
    `$1${domain}$2`,
    `index.html domain${letter} input`,
  );
});

await fs.writeFile(indexPath, indexHtml, 'utf8');

const demoPath = path.join(root, 'scripts', 'record_demo.mjs');
let demoScript = await fs.readFile(demoPath, 'utf8');

domains.forEach((domain, index) => {
  const letter = ['A', 'B', 'C'][index];
  const quoted = `'${domain.replaceAll("'", "\\'")}'`;
  demoScript = replaceRequired(
    demoScript,
    new RegExp(`(page\\.locator\\('#domain${letter}'\\)\\.fill\\()(['"])[^'"]*\\2(\\);)`),
    `$1${quoted}$3`,
    `record_demo.mjs domain${letter} fill`,
  );
});

await fs.writeFile(demoPath, demoScript, 'utf8');

console.log('domain_roulette_domains_updated');
console.log(`domainA=${domains[0]}`);
console.log(`domainB=${domains[1]}`);
console.log(`domainC=${domains[2]}`);
console.log('next: npm run verify');
console.log('optional: npm run record-demo');
