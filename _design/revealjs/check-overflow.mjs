#!/usr/bin/env node

/**
 * GRE Slide Overflow Checker
 *
 * Puppeteer-based tool that renders every slide in a real browser,
 * measures actual content heights, detects footer overlap, and
 * generates a report with screenshots of problem slides.
 *
 * Usage:
 *   node check-overflow.mjs                          # Check all GRE decks
 *   node check-overflow.mjs --path courses/gre/production/videos/ID12_Integers_Order_Ops
 *   node check-overflow.mjs --warn-threshold 24      # Custom warning zone (default 16px)
 *   node check-overflow.mjs --no-screenshots          # Skip screenshot capture
 */

import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Config ──────────────────────────────────────────────────────────────────

const DEFAULTS = {
  videosPath: 'courses/gre/production/videos',
  screenshotDir: 'courses/gre/production/videos/_qa-screenshots',
  warnThreshold: 16,   // px before footer zone to flag as WARNING
  screenshots: true,
  serverPort: 9876,
  viewport: { width: 960, height: 540 },
};

// Footer zone boundaries (from leland.css)
// section padding-bottom: 82px → content must stay above 540 - 82 = 458px
// section.math-content padding-bottom: 64px → content must stay above 540 - 64 = 476px
const FOOTER_ZONES = {
  default: 458,      // 540 - 82
  mathContent: 476,  // 540 - 64
};

// ─── CLI Args ────────────────────────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const config = { ...DEFAULTS };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--path':
        config.videosPath = args[++i];
        break;
      case '--warn-threshold':
        config.warnThreshold = parseInt(args[++i], 10);
        break;
      case '--no-screenshots':
        config.screenshots = false;
        break;
      case '--port':
        config.serverPort = parseInt(args[++i], 10);
        break;
      case '--help':
        console.log(`
Usage: node check-overflow.mjs [options]

Options:
  --path <dir>           Path to videos directory (relative to project root)
                         Default: courses/gre/production/videos
  --warn-threshold <px>  Pixels before footer zone to flag as WARNING (default: 16)
  --no-screenshots       Skip screenshot capture for problem slides
  --port <num>           Local server port (default: 9876)
  --help                 Show this help
`);
        process.exit(0);
    }
  }

  return config;
}

// ─── Static File Server ──────────────────────────────────────────────────────

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
};

function createServer(rootDir, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const filePath = path.join(rootDir, urlPath);

      fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      });
    });

    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
    server.on('error', reject);
  });
}

// ─── Slide Measurement ──────────────────────────────────────────────────────

async function measureSlide(page) {
  return page.evaluate(() => {
    const section = document.querySelector('.reveal .slides section.present');
    if (!section) return null;

    const sectionRect = section.getBoundingClientRect();
    const classList = Array.from(section.classList);
    const isMathContent = classList.includes('math-content');
    const isTitleDark = classList.includes('title-dark');
    const isDivider = classList.includes('divider');
    const isContentDark = classList.includes('content-dark');
    const isContent = classList.includes('content');

    // Determine slide type label
    let slideType = 'content';
    if (isTitleDark) slideType = 'title-dark';
    else if (isDivider) slideType = 'divider';
    else if (isContentDark) slideType = 'content-dark';
    if (isMathContent) slideType += ' math-content';

    // Skip title-dark and divider (centered content, rarely overflow)
    if (isTitleDark || isDivider) {
      return { slideType, skip: true };
    }

    // Footer zone top edge
    const footerZoneTop = isMathContent ? 476 : 458;

    // Get all direct content children (exclude footer and speaker notes)
    const children = section.querySelectorAll(':scope > *:not(.leland-footer):not(aside.notes):not(aside)');
    let maxBottom = 0;
    let overflowElement = null;

    children.forEach(child => {
      const rect = child.getBoundingClientRect();
      const relativeBottom = rect.bottom - sectionRect.top;
      if (relativeBottom > maxBottom) {
        maxBottom = relativeBottom;
        // Get a description of the overflowing element
        const tag = child.tagName.toLowerCase();
        const cls = child.className ? `.${child.className.split(' ').join('.')}` : '';
        overflowElement = `${tag}${cls}`;
      }
    });

    // Also check nested content that might overflow (KaTeX, deeply nested cards)
    const allContent = section.querySelectorAll(':scope > *:not(.leland-footer):not(aside.notes):not(aside) *');
    allContent.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Only count visible elements with actual dimensions
      if (rect.height === 0 || rect.width === 0) return;
      const relativeBottom = rect.bottom - sectionRect.top;
      if (relativeBottom > maxBottom) {
        maxBottom = relativeBottom;
        const tag = el.tagName.toLowerCase();
        const cls = el.className ? `.${String(el.className).split(' ').slice(0, 2).join('.')}` : '';
        overflowElement = `${tag}${cls}`;
      }
    });

    return {
      slideType,
      skip: false,
      footerZoneTop,
      contentBottom: Math.round(maxBottom),
      overflow: Math.round(maxBottom - footerZoneTop),
      overflowElement,
    };
  });
}

// ─── Process a Single Deck ──────────────────────────────────────────────────

async function processDeck(page, deckUrl, deckName, config, results) {
  try {
    await page.goto(deckUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for KaTeX to finish rendering
    await page.evaluate(() => {
      return new Promise(resolve => {
        // Give KaTeX auto-render time to complete
        setTimeout(resolve, 1500);
      });
    });

    // Wait for Reveal.js to be ready
    await page.evaluate(() => {
      return new Promise((resolve, reject) => {
        const maxWait = 10000;
        const start = Date.now();
        const check = () => {
          if (typeof Reveal !== 'undefined' && Reveal.isReady && Reveal.isReady()) {
            resolve();
          } else if (Date.now() - start > maxWait) {
            reject(new Error('Reveal.js did not initialize'));
          } else {
            setTimeout(check, 200);
          }
        };
        check();
      });
    });

    // Get total slide count
    const totalSlides = await page.evaluate(() => {
      return Reveal.getTotalSlides();
    });

    results.totalSlides += totalSlides;
    const deckIssues = [];

    // Navigate through each slide
    for (let slideIdx = 0; slideIdx < totalSlides; slideIdx++) {
      // Navigate to the slide (horizontal index, vertical index 0)
      await page.evaluate((idx) => {
        // Get the indices for the Nth slide (flat index)
        const slides = Reveal.getSlides();
        if (idx < slides.length) {
          const indices = Reveal.getIndices(slides[idx]);
          Reveal.slide(indices.h, indices.v || 0);
        }
      }, slideIdx);

      // Brief wait for layout
      await page.evaluate(() => new Promise(r => setTimeout(r, 300)));

      // Advance through all fragments to reveal full content
      const fragmentCount = await page.evaluate(() => {
        const slide = Reveal.getCurrentSlide();
        const fragments = slide.querySelectorAll('.fragment');
        return fragments.length;
      });

      if (fragmentCount > 0) {
        // Show all fragments at once
        await page.evaluate(() => {
          const slide = Reveal.getCurrentSlide();
          const fragments = slide.querySelectorAll('.fragment');
          fragments.forEach(f => {
            f.classList.add('visible', 'current-fragment');
          });
        });
        await page.evaluate(() => new Promise(r => setTimeout(r, 300)));
      }

      // Measure the slide
      const measurement = await measureSlide(page);
      if (!measurement || measurement.skip) continue;

      const { slideType, footerZoneTop, contentBottom, overflow, overflowElement } = measurement;
      const slideNum = slideIdx + 1;

      if (overflow > 0) {
        // ERROR: content overlaps footer zone
        const issue = {
          level: 'ERROR',
          deck: deckName,
          slide: slideNum,
          slideType,
          contentBottom,
          footerZoneTop,
          overflow,
          overflowElement,
        };

        // Take screenshot
        if (config.screenshots) {
          const screenshotPath = path.join(config.projectRoot, config.screenshotDir, `${deckName}_slide${slideNum}.png`);
          await page.screenshot({ path: screenshotPath, type: 'png' });
          issue.screenshot = path.relative(config.projectRoot, screenshotPath);
        }

        deckIssues.push(issue);
        results.errors.push(issue);
      } else if (overflow > -config.warnThreshold) {
        // WARNING: content is close to footer zone
        const issue = {
          level: 'WARNING',
          deck: deckName,
          slide: slideNum,
          slideType,
          contentBottom,
          footerZoneTop,
          overflow,
          gap: -overflow,
          overflowElement,
        };

        if (config.screenshots) {
          const screenshotPath = path.join(config.projectRoot, config.screenshotDir, `${deckName}_slide${slideNum}_warn.png`);
          await page.screenshot({ path: screenshotPath, type: 'png' });
          issue.screenshot = path.relative(config.projectRoot, screenshotPath);
        }

        deckIssues.push(issue);
        results.warnings.push(issue);
      }
    }

    if (deckIssues.length === 0) {
      results.cleanDecks++;
    }

    return { totalSlides, issues: deckIssues };
  } catch (err) {
    console.error(`  [SKIP] ${deckName}: ${err.message}`);
    results.skipped.push({ deck: deckName, error: err.message });
    return { totalSlides: 0, issues: [] };
  }
}

// ─── Report ──────────────────────────────────────────────────────────────────

function printReport(results, config) {
  const totalDecks = results.cleanDecks + results.errors.length + results.warnings.length > 0
    ? results.decksChecked
    : results.decksChecked;

  console.log('\n');
  console.log('='.repeat(60));
  console.log('  OVERFLOW REPORT');
  console.log('='.repeat(60));
  console.log(`  Checked: ${results.decksChecked} decks, ${results.totalSlides} slides total`);
  console.log(`  Errors:  ${results.errors.length} slides with overflow`);
  console.log(`  Warnings: ${results.warnings.length} slides within ${config.warnThreshold}px of footer`);
  if (results.skipped.length > 0) {
    console.log(`  Skipped: ${results.skipped.length} decks (errors loading)`);
  }
  console.log('='.repeat(60));

  // Group issues by deck
  const issuesByDeck = {};
  [...results.errors, ...results.warnings].forEach(issue => {
    if (!issuesByDeck[issue.deck]) issuesByDeck[issue.deck] = [];
    issuesByDeck[issue.deck].push(issue);
  });

  // Print per-deck details
  for (const [deck, issues] of Object.entries(issuesByDeck)) {
    console.log(`\n--- ${deck} ---`);
    issues.sort((a, b) => a.slide - b.slide);
    for (const issue of issues) {
      if (issue.level === 'ERROR') {
        console.log(`  Slide ${issue.slide} (${issue.slideType}): OVERFLOW by ${issue.overflow}px`);
        console.log(`    Content bottom: ${issue.contentBottom}px, footer zone: ${issue.footerZoneTop}px`);
        if (issue.overflowElement) {
          console.log(`    Overflow element: ${issue.overflowElement}`);
        }
      } else {
        console.log(`  Slide ${issue.slide} (${issue.slideType}): WARNING - only ${issue.gap}px gap to footer`);
        console.log(`    Content bottom: ${issue.contentBottom}px, footer zone: ${issue.footerZoneTop}px`);
      }
      if (issue.screenshot) {
        console.log(`    Screenshot: ${issue.screenshot}`);
      }
    }
  }

  // Skipped decks
  if (results.skipped.length > 0) {
    console.log('\n--- Skipped Decks ---');
    for (const s of results.skipped) {
      console.log(`  ${s.deck}: ${s.error}`);
    }
  }

  // Summary
  const problemDeckCount = Object.keys(issuesByDeck).length;
  console.log('\n' + '='.repeat(60));
  console.log('  SUMMARY');
  console.log('='.repeat(60));
  console.log(`  Clean decks: ${results.cleanDecks}/${results.decksChecked}`);
  console.log(`  Problem decks: ${problemDeckCount}`);
  console.log(`  Error slides: ${results.errors.length}`);
  console.log(`  Warning slides: ${results.warnings.length}`);

  if (results.errors.length > 0) {
    const overflows = results.errors.map(e => e.overflow);
    const avg = Math.round(overflows.reduce((a, b) => a + b, 0) / overflows.length);
    const max = Math.max(...overflows);
    const maxIssue = results.errors.find(e => e.overflow === max);
    console.log(`  Avg overflow: ${avg}px`);
    console.log(`  Max overflow: ${max}px (${maxIssue.deck} slide ${maxIssue.slide})`);
  }

  console.log('='.repeat(60));
  console.log('');
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const config = parseArgs();

  // Determine project root (2 levels up from this script location)
  // Script: _design/revealjs/check-overflow.mjs
  // Root:   courses/
  config.projectRoot = path.resolve(__dirname, '../../');

  const videosDir = path.join(config.projectRoot, config.videosPath);
  const screenshotDir = path.join(config.projectRoot, config.screenshotDir);

  // Verify videos directory exists
  if (!fs.existsSync(videosDir)) {
    console.error(`Videos directory not found: ${videosDir}`);
    console.error('Run this script from the courses/ directory or use --path');
    process.exit(1);
  }

  // Create screenshot directory
  if (config.screenshots) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Find all video folders with index.html
  const entries = fs.readdirSync(videosDir, { withFileTypes: true });
  const decks = entries
    .filter(e => e.isDirectory() && e.name.startsWith('ID'))
    .filter(e => fs.existsSync(path.join(videosDir, e.name, 'index.html')))
    .map(e => e.name)
    .sort((a, b) => {
      const numA = parseInt(a.match(/ID(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/ID(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  if (decks.length === 0) {
    console.error('No slide decks found (no ID*/index.html files)');
    process.exit(1);
  }

  console.log(`Found ${decks.length} slide decks to check`);
  console.log(`Warning threshold: ${config.warnThreshold}px`);
  console.log(`Screenshots: ${config.screenshots ? 'enabled' : 'disabled'}`);
  console.log('');

  // Start local server
  const server = await createServer(config.projectRoot, config.serverPort);
  console.log(`Server running at http://127.0.0.1:${config.serverPort}`);

  // Launch browser
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport(config.viewport);

  // Suppress console messages from the page
  page.on('console', () => {});
  page.on('pageerror', () => {});

  const results = {
    decksChecked: decks.length,
    totalSlides: 0,
    cleanDecks: 0,
    errors: [],
    warnings: [],
    skipped: [],
  };

  // Process each deck
  for (let i = 0; i < decks.length; i++) {
    const deckName = decks[i];
    const deckUrl = `http://127.0.0.1:${config.serverPort}/${config.videosPath}/${deckName}/index.html`;

    process.stdout.write(`  [${i + 1}/${decks.length}] ${deckName}...`);

    const { totalSlides, issues } = await processDeck(page, deckUrl, deckName, config, results);

    if (issues.length > 0) {
      const errorCount = issues.filter(i => i.level === 'ERROR').length;
      const warnCount = issues.filter(i => i.level === 'WARNING').length;
      const parts = [];
      if (errorCount > 0) parts.push(`${errorCount} error${errorCount > 1 ? 's' : ''}`);
      if (warnCount > 0) parts.push(`${warnCount} warning${warnCount > 1 ? 's' : ''}`);
      console.log(` ${totalSlides} slides, ${parts.join(', ')}`);
    } else {
      console.log(` ${totalSlides} slides, clean`);
    }
  }

  // Print report
  printReport(results, config);

  // Cleanup
  await browser.close();
  server.close();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
