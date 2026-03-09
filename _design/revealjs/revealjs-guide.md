# Reveal.js Production Guide

How to build Leland-branded Reveal.js slide decks. For brand colors, typography, and general design rules, see `../../leland-design-system.md`.

> **Headline casing:** All `<h2>` text on body slides must use sentence case — capitalize only the first word and proper nouns/acronyms. Never end with a period.

---

## Quick Start

1. Copy `template.html` into your production folder
2. Update asset paths (see Asset Paths below)
3. Replace placeholder content with your slides
4. Open in browser to preview

---

## HTML Document Structure

Every production file must include:

```html
<!DOCTYPE html>
<html lang="en" class="reveal-full-page">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Title</title>

  <!-- Reveal.js Core -->
  <link rel="stylesheet" href="../../../../_design/revealjs/dist/reset.css">
  <link rel="stylesheet" href="../../../../_design/revealjs/dist/reveal.css">

  <!-- Leland Theme -->
  <link rel="stylesheet" href="../../../../_design/revealjs/themes/leland.css">

  <!-- KaTeX (if math is needed) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"
    onload="renderMathInElement(document.body, {
      delimiters: [
        {left: '$$', right: '$$', display: true},
        {left: '$', right: '$', display: false}
      ]
    });"></script>
</head>
```

**Critical**: `class="reveal-full-page"` on `<html>` is required. Without it, slides render incorrectly.

---

## Initialization Config

```html
<script src="../../../../_design/revealjs/dist/reveal.min.js"></script>
<script type="module">
  import RevealNotes from '../../../../_design/revealjs/plugin/notes/notes.esm.js';

  Reveal.initialize({
    width: 960,
    height: 540,
    margin: 0,
    minScale: 0.5,
    maxScale: 3.0,
    hash: true,
    slideNumber: true,
    controls: true,
    progress: true,
    history: true,
    center: false,
    transition: 'none',
    backgroundTransition: 'none',
    disableLayout: false,
    plugins: [ RevealNotes ]
  });
</script>
```

**`center: false` is required.** CSS flexbox on `.title-dark` and `.divider` handles centering. Reveal's JS centering conflicts with our layout.

---

## Slide Dimensions

| Property | Value |
|----------|-------|
| Width | 960px |
| Height | 540px |
| Aspect ratio | 16:9 |
| Padding | 56px top/bottom, 80px left/right |
| Usable content area | 800px wide, 428px tall |
| Footer clearance | 60px from bottom |

---

## Slide Types

### Title Dark (`.title-dark`)

Opening slide with dark green background. Flex-centered vertically.

```html
<section class="title-dark">
  <svg width="110" height="25" fill="white" class="mb-16"><use href="#leland-logo"/></svg>
  <p class="eyebrow">Course Name</p>
  <h1>Slide Title</h1>
  <aside class="notes">0:00 - 0:10 | Opening.</aside>
</section>
```

- White logo inline above eyebrow (not absolutely positioned)
- No footer
- No cards allowed on this slide type

### Content (`.content`)

Standard white-background slide for all teaching content.

```html
<section class="content">
  <div class="slide-header">
    <p class="eyebrow">Section Label</p>
    <h2>Slide Title</h2>
  </div>

  <!-- Content here -->

  <div class="leland-footer">
    <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
  </div>
  <aside class="notes">0:10 - 0:55 | Teaching points.</aside>
</section>
```

- Gray logo footer required on every content slide
- Always use `.slide-header` wrapper for eyebrow + title

### Content Dark (`.content-dark`)

Summary/takeaway slide with dark green background. Top-aligned (not flex-centered).

```html
<section class="content-dark">
  <div class="slide-header">
    <p class="eyebrow">Key Takeaways</p>
    <h2>What to Remember</h2>
  </div>
  <div class="flex-col gap-16">
    <p class="text-lg text-white">First key takeaway point</p>
    <p class="text-lg text-white">Second key takeaway point</p>
  </div>
  <div class="leland-footer">
    <svg width="80" height="18" fill="rgba(255,255,255,0.4)"><use href="#leland-logo"/></svg>
  </div>
  <aside class="notes">4:30 - 5:00 | Summary.</aside>
</section>
```

- White semi-transparent logo footer
- Uses `.slide-header` wrapper like content slides
- Text uses `.text-white` for emphasis
- No cards (use plain text in `flex-col gap-16`)

### Divider (`.divider`)

Section break with dark background and centered text.

```html
<section class="divider">
  <div class="part-number">Part 2</div>
  <h1>Section Title</h1>
  <p>Brief description of what's next</p>
  <aside class="notes">Transition slide.</aside>
</section>
```

- Centered text (handled by CSS)
- No footer, no cards
- Use sparingly between major sections

---

## SVG Logo Pattern

Define the logo SVG once per file using `<symbol>`, then reference with `<use>`:

```html
<body>
  <!-- Define once, right after <body> -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="leland-logo" viewBox="0 0 200 45">
      <path .../><!-- Full SVG path data -->
    </symbol>
  </svg>

  <!-- Reference anywhere -->
  <svg width="110" height="25" fill="white"><use href="#leland-logo"/></svg>  <!-- title -->
  <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg> <!-- footer -->
```

This saves ~2KB per slide versus inlining the full SVG path.

---

## Speaker Notes

Every slide must have speaker notes with timing:

```html
<aside class="notes">
  0:00 - 0:30 | Opening. Introduce the concept of [topic].
  Key points to cover:
  - First important point
  - Second important point
  0:30 - 1:00 | Transition to the next idea.
</aside>
```

- Format: `M:SS - M:SS | Description`
- Include key talking points, not a full script
- Typical duration per slide: 15-60 seconds

---

## Math Support (KaTeX)

Include KaTeX CSS and scripts in `<head>` (see Document Structure above).

| Syntax | Rendering |
|--------|-----------|
| `$\frac{a}{b}$` | Inline math |
| `$$\sqrt{x^2 + y^2}$$` | Display math (centered block) |

Common patterns:
- Answer highlighting: `<span class="ans">$\frac{11}{12}$</span>`
- Negative numbers: `<span class="neg">$-5$</span>`

---

## Fragments (Progressive Reveal)

Use Reveal.js fragments to show content step by step:

```html
<p class="fragment">Appears on first click</p>
<p class="fragment">Appears on second click</p>
```

Fragment styles:
- `fragment` -- fade in (default)
- `fragment fade-up` -- slide up while fading in
- `fragment highlight-green` -- highlight text green

Use fragments sparingly. Most slides should show all content at once for video recording.

---

## Asset Paths

From a production folder like `catalog/<course>/production/self-study/<video>/`:

```
../../../../_design/revealjs/dist/reset.css
../../../../_design/revealjs/dist/reveal.css
../../../../_design/revealjs/themes/leland.css
../../../../_design/revealjs/dist/reveal.min.js
../../../../_design/revealjs/plugin/notes/notes.esm.js
```

Count the directory levels from your HTML file to `courses/` to determine the path prefix.

---

## Zero `<style>` Rule

Production HTML files must contain **zero** `<style>` blocks. All styling goes through:
1. CSS classes in `leland.css`
2. Minimal inline styles (only for one-off positioning that no class covers)

If you need a new pattern, add a class to `leland.css` rather than adding a `<style>` block.

---

## File Naming

| Type | Convention |
|------|-----------|
| Production HTML | `index.html` (current version) |
| Previous versions | `index-v2.html`, `index-v3.html` |
| Images | `ID##_images/figure_N_description.png` |
| Draft scripts | `courses/{course}/drafts/ID##_Topic_Name.md` |

---

## PDF Export (Decktape)

Use `decktape` for pixel-perfect PDF export. Do NOT use the browser's `?print-pdf` mode (it breaks flex layouts).

```bash
# Start a local server first
python3 -m http.server 8080

# Export using decktape
npx decktape reveal --size 960x540 http://localhost:8080/index.html output.pdf
```

A reusable script is available at `_design/revealjs/export-pdf.sh`:

```bash
./export-pdf.sh                                           # exports template.html
./export-pdf.sh http://localhost:8080/my-deck.html my.pdf # custom URL + output
```

For standalone PDF documents (workbooks, reference sheets), use the PDF templates in `formats/pdf/` instead.
