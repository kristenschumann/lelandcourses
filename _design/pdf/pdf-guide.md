# PDF Production Guide

How to create Leland-branded PDF documents: workbooks and reference sheets. For brand colors, typography, and general design rules, see `../../leland-design-system.md`.

---

## Templates

| Template | File | Purpose |
|----------|------|---------|
| Workbook | `workbook-template.html` | Multi-page study guides, exercises, practice problems |
| Reference | `reference-template.html` | 1-2 page condensed cheat sheets, formula summaries |
| Primer | `primer-template.html` | Multi-page industry primers for interview prep |
| Stylesheet | `leland-pdf.css` | Shared styles (can be linked or embedded) |

---

## PDF vs Slide Differences

| Property | Slides (Reveal.js) | PDF |
|----------|-------------------|-----|
| Page size | 960x540px | US Letter (8.5" x 11") |
| Margins | 56px / 80px | 0.6" top/bottom, 0.75" left/right |
| Base font | 16px | 11pt (workbook), 9pt (reference) |
| Card padding | 24px | 16px |
| Gap | 20px | 16px |
| Border-radius | 12px | 8px |
| Line-height | 1.5 | 1.5 (workbook), 1.4 (reference) |

---

## Workflow

1. Open the HTML template in a browser
2. Print (Cmd+P / Ctrl+P)
3. Select "Save as PDF"
4. Set margins to "None" (CSS handles margins)
5. Enable "Background graphics" for card colors
6. Save

---

## Workbook Structure

```
Header (logo + "WORKBOOK" label)
────────────────────────────────
Title + Subtitle

Introduction / Key Concepts
├── Callout boxes for tips
├── Numbered concept cards (type-num: 01, 02, 03, 04)
└── Grid layouts (.grid-2, .grid-3)

Practice Section
├── Exercise boxes with problem text
├── "Show your work" area
├── Answer lines / answer boxes
└── Page breaks between sections

Answer Key (final pages)

Footer (Leland logo)
```

### Key Classes
- `.exercise-box` -- bordered container for practice problems
- `.answer-line` -- dotted line for written answers
- `.answer-box` -- bordered area for showing work
- `.page-break` -- forces new page in print
- `.key-points` -- highlighted callout for important info

---

## Reference Sheet Structure

```
Header (logo + "REFERENCE SHEET" label)
────────────────────────────────
Title + Subtitle

Formula Grid (.three-col)
├── .card-compact with formula titles
├── Centered LaTeX formulas
└── Color-coded: green (key), red (common mistakes), blue (tips)

Quick Reference Tables
├── Compact tables (8-9pt font)
└── Two-column layout for comparison data

Footer (Leland logo, final page only)
```

### Key Classes
- `.card-compact` -- tighter padding, smaller text
- `.three-col` -- 3-column flexbox layout
- `.compact-table` -- smaller font tables
- `.reference-sheet` -- root class for reference-specific overrides

---

## Primer Structure

```
SVG Definitions (<symbol id="leland-logo"> — define once)

Cover Page (dark bg, logo, eyebrow, title, subtitle, date)

TOC + Key Stats (.toc, .metrics-row)

Sections 01-13 (page-break between each, except last 2)
├── 01 Industry Overview
├── 02 Current Trends & Outlook (8 cards in grid-2)
├── 03 Industry Jargon (2-3 tables of terms)
├── 04 Sub-Sectors
├── 05 Major Players
├── 06 Key Metrics & Benchmarks
├── 07 Valuation Methodologies
├── 08 Investment Thesis Themes
├── 09 Deal Activity & Transactions
├── 10 Regulatory & Risk Considerations
├── 11 Interview Talking Points
├── 12 Resources & Further Reading (no page-break)
└── 13 Leland Resources (no page-break)

Footer (gray logo only, final page)
```

### Key Classes
- `.cover` / `.cover-dark` -- full-page dark cover
- `.sector-title` -- large cover title (36pt)
- `.toc` / `.toc-item` / `.toc-number` / `.toc-title` -- table of contents
- `.metrics-row` / `.metric-box` / `.metric-value` / `.metric-label` -- key stats grid
- `.section-header` / `.section-number` -- numbered section headers
- `.lead` -- opening paragraph emphasis
- `.interview-question` -- styled question prompt (green-tinted bg)
- `.document-footer` -- logo-only footer

### Primer Patterns
- Logo defined once via `<symbol>` + `<use>` (not inlined multiple times)
- Use `.card.card-green-bg` / `.card.card-orange-bg` for colored callouts (not border-left)
- No plain `.card` (white + border) in primers — always use `.card.card-green-bg` or other colored bg
- Use `.two-col` for side-by-side layouts (not `.two-column`)
- Use `.highlight` for inline emphasis (not `.hl`)
- Use `.plus-list` or standard `ul`/`ol` for lists (not `.leland-list`)
- Footer: gray logo only, no text like "Prepared by Leland"
- Combine short end-sections: no `page-break` on sections 12 and 13 (Resources + Leland Resources)

### Resource Links
- Resource URLs are clickable `<a href>` links, not plain text
- Pattern: `<strong><a href="https://url.com/path">Title</a></strong>: Description`
- Link color inherits from CSS (`var(--leland-green)`, no underline, underline on hover)

### Leland Resources
- Callout-dark includes a subtle link to joinleland.com
- Pattern: `Visit <a href="https://www.joinleland.com">joinleland.com</a> to connect with coaches...`

---

## Footer Rules

- **Videos**: Logo only, no text
- **PDFs**: Logo only, no page numbers
- **Multi-page PDFs**: Footer on final page only
- Logo color: gray (`#9B9B9B`) on light backgrounds

---

## Math Support

Both templates include KaTeX for math rendering:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
```

Inline: `$\frac{a}{b}$` | Display: `$$\sqrt{x^2 + y^2}$$`

---

## CSS Classes Available

The PDF stylesheet (`leland-pdf.css`) provides all standard Leland classes:
- Cards: `.card`, `.card-alt`, `.card-compact`, `.card-{color}-bg`
- Typography: `.text-lg/md/sm/xs`, `.text-dark/light/muted/green`
- Layout: `.two-col`, `.three-col`, `.grid-2/3/4`
- Badges: `.badge.badge-{color}`
- Spacing: `.mb-4/8/12/16/24/32`, `.mt-8/12/16/24`, `.gap-8/12/16/24`

See `leland-pdf.css` for the full class list.

---

## Technical Content Formatting

These conventions align PDF content with the slide design system for GRE, test prep, and technical finance courses.

### Text Color Rules
- **All body text must be black** (default color). This includes solutions, explanations, and answer walkthroughs.
- **Never use `text-light` on solution or answer content.** Grey text is hard to read in print.
- **Green for answers only:** Use `.ans` or `.highlight` to mark correct answers in green. Green should not appear on regular content text.

### Problem / Solution Formatting
- Use `.exercise-box` for problem statements
- Show solutions with clear answer formatting: green highlight on the final answer
- Solution steps should use default (black) text color

### Summary Sections
- Use `.plus-list` or `.key-points` for summary/takeaway sections
- Keep summaries to 4-6 concise points
- Avoid complex table layouts for summary content
