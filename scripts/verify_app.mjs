import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.png': 'image/png',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const relative = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(root, relative));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  try {
    const body = await fs.readFile(filePath);
    res.writeHead(200, { 'content-type': contentTypes[path.extname(filePath)] || 'text/html; charset=utf-8' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

await page.goto(`http://127.0.0.1:${port}/`);
await page.waitForSelector('text=Domain Roulette Launch Lab');
await page.click('#analyzeBtn');

const body = await page.locator('body').innerText();
const rows = await page.locator('#domainTable .domain-row').count();
const copy = await page.locator('#submissionCopy').innerText();

if (rows < 4) throw new Error(`expected table header plus 3 domain rows, got ${rows}`);
for (const marker of ['30秒レビュー手順', 'ドメイン比較', '提出コピー', '主張の境界']) {
  if (!body.includes(marker)) throw new Error(`missing marker: ${marker}`);
}
if (!copy.includes('Domain Roulette Launch Lab selected')) {
  throw new Error('submission copy did not render');
}

await page.getByRole('button', { name: 'EN' }).click();
const english = await page.locator('body').innerText();
for (const marker of ['30-Second Review Path', 'Domain comparison', 'Submission copy', 'Claim boundary']) {
  if (!english.includes(marker)) throw new Error(`missing English marker: ${marker}`);
}

await page.screenshot({ path: path.join(root, 'media', 'domain-roulette-launch-lab-full.png'), fullPage: true });

await browser.close();
server.close();

console.log('domain_roulette_launch_lab_app_verify_ok');
console.log(`domain_rows=${rows}`);
console.log('screenshot=media/domain-roulette-launch-lab-full.png');

