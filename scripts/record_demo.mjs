import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs/promises';
import { spawn } from 'child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mediaDir = path.join(root, 'media');
const tempVideoDir = path.join(mediaDir, '.demo-video-tmp');
const outputWebm = path.join(mediaDir, 'domain-roulette-launch-lab-demo.webm');
const outputMp4 = path.join(mediaDir, 'domain-roulette-launch-lab-demo.mp4');

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

const run = (cmd, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited ${code}: ${stderr.slice(-1200)}`));
    });
  });

await fs.rm(tempVideoDir, { recursive: true, force: true });
await fs.mkdir(tempVideoDir, { recursive: true });
await fs.mkdir(mediaDir, { recursive: true });

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  recordVideo: { dir: tempVideoDir, size: { width: 1280, height: 720 } },
});
const page = await context.newPage();

await page.goto(`http://127.0.0.1:${port}/`);
await page.waitForSelector('text=Domain Roulette Launch Lab');
await page.getByRole('button', { name: 'EN' }).click();
await page.waitForTimeout(1800);
await page.locator('#domainA').fill('quietcart.com');
await page.locator('#domainB').fill('petledger.ai');
await page.locator('#domainC').fill('citypause.app');
await page.waitForTimeout(900);
await page.locator('#analyzeBtn').click();
await page.waitForTimeout(2500);
await page.getByRole('tab', { name: 'Judge fit' }).click();
await page.waitForTimeout(3200);
await page.getByRole('tab', { name: 'MVP' }).click();
await page.waitForTimeout(2600);
await page.getByRole('tab', { name: 'Submission copy' }).click();
await page.waitForTimeout(3600);
await page.locator('#copyBtn').click();
await page.waitForTimeout(1800);

const video = page.video();
await context.close();
await browser.close();
server.close();

const recordedPath = await video.path();
await fs.copyFile(recordedPath, outputWebm);
await run('ffmpeg', [
  '-y',
  '-i',
  outputWebm,
  '-vf',
  'format=yuv420p',
  '-movflags',
  '+faststart',
  outputMp4,
]);

console.log('domain_roulette_demo_video_ok');
console.log(`webm=media/${path.basename(outputWebm)}`);
console.log(`mp4=media/${path.basename(outputMp4)}`);
