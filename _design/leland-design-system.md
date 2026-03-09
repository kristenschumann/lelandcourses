# Leland Design System

The single source of truth for all Leland visual content. Format-agnostic -- applies equally to Reveal.js slides, PDFs, and PowerPoint decks. For format-specific implementation, see guides in `formats/`.

---

## Brand Colors

### Primary
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Leland Green | `#15B078` | `--leland-green` | Primary accent, CTAs, highlights, eyebrow labels |
| Darkest Green | `#113A2D` | `--leland-dark` | Full-slide dark backgrounds only (title, divider) |
| Medium Green | `#185440` | `--leland-medium` | Secondary dark accent (timeline-block.dark) |

### Neutrals
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| White | `#FFFFFF` | `--leland-white` | Slide backgrounds, card backgrounds |
| Off-White | `#F8F8F8` | `--leland-offwhite` | Nested cards (`.card-alt`) only |
| Black | `#000000` | `--leland-black` | Headlines |
| Dark | `#333333` | `--leland-text-dark` | Body text |
| Light | `#707070` | `--leland-text-light` | Secondary text, descriptions |
| Muted | `#9B9B9B` | `--leland-text-muted` | Captions, labels, footer logos |
| Stroke | `#E5E5E5` | `--leland-stroke` | Borders, divider lines |

### Secondary Accents
| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| Orange | `#EF8509` | `--leland-orange` | Alerts, warnings |
| Red | `#FB5A42` | `--leland-red` | Errors, incorrect answers |
| Blue | `#3B7DFD` | `--leland-blue` | Informational |
| Purple | `#2D25A6` | `--leland-purple` | Special features |

### Opacity Rules
| Context | Opacity | Example |
|---------|---------|---------|
| Text / icons | 100% | `color: var(--leland-orange)` |
| Card backgrounds | 12% | `var(--leland-orange-bg)` / `rgba(239, 133, 9, 0.12)` |
| Subtle emphasis | 6% | `.card-alt-green` / `rgba(21, 176, 120, 0.06)` |
| Text on dark bg | 70% | `rgba(255, 255, 255, 0.7)` |

---

## Typography

### Font Stack
**Calibre** (Regular, Medium, Semibold + Italics) is the primary brand font. Fallback: **Inter** (Google Fonts), then **Arial**.

Font files: `_design/fonts/Calibre-OTF/`

### Hierarchy
| Level | Size | Weight | Color |
|-------|------|--------|-------|
| H1 (slide title) | 48px | Bold (700) | Black |
| H1 on title-dark | 56px | Bold (700) | White |
| H2 (section header) | 32px | Bold (700) | Black |
| H3 (card title) | 20px | Semibold (600) | Black |
| Body | 18px | Regular (400) | Dark (#333) |
| Small text | 16px | Regular (400) | Light (#707070) |
| Eyebrow label | 14px | Bold (700), uppercase, 12px bottom margin | Green (#15B078) |
| Caption | 14px | Regular (400) | Muted (#9B9B9B) |

### Text Rules
- Headlines: bold, black, **always left-aligned**
- Headlines (h2): use **sentence case** — capitalize only the first word and proper nouns/acronyms. Never end a headline with a period.
- Eyebrow labels: uppercase, green, `letter-spacing: 0.1em`
- Body text: left-aligned (never center paragraphs)
- Use green (`<span class="hl">`) to highlight key phrases within sentences
- Avoid em dashes. Use commas or periods instead.

---

## Spacing

All spacing follows a **4px base grid**: 8, 12, 16, 20, 24, 32.

| Context | Value |
|---------|-------|
| Slide padding | 56px top/bottom, 80px left/right |
| Card padding | 24px (standard), 14px 24px (compact) |
| Gap between cards | 16-20px |
| Section spacing | 20-24px |
| Footer clearance | 60px from bottom |

---

## Cards

Two styles. **Pick one per slide -- never mix.**

### Option A: White + Border (`.card`)
- Background: white
- Border: `1px solid #E5E5E5`
- Border-radius: 12px, padding: 24px

### Option B: Pastel + No Border (`.card.card-{color}-bg`)
- Background: accent color at 12% opacity
- No border (CSS enforces `border: none`)
- Same radius and padding

### Nested Card (`.card-alt`)
- Off-white `#F8F8F8`, no border
- Use **inside** a white `.card` for secondary content
- For light green emphasis: use `.card-alt-green` (6% green)

### Card Preferences
- **Default to Option B** (colored backgrounds) over Option A (white+border). Colored cards are more visually engaging and help distinguish concepts at a glance.
- Add icons before card titles for visual anchoring on card-grid-3 slides.

### Card Don'ts
- No box-shadows on any card
- No `border-left` accents
- No dark green backgrounds (`#113A2D`, `#185440`) on cards
- No cards on dark slides (`.title-dark`, `.divider`)
- No mixing Option A and Option B on the same slide

---

## Component Decision Tree

| Content Pattern | Use This |
|----------------|----------|
| 3 equal concepts | `.card-grid-3` with `.card` |
| 2x2 grid | `.card-grid-2` with `.card` |
| Numbered items (01, 02) | `.type-box` |
| Sequential process | `.workflow` with `.workflow-step` + `.workflow-arrow` |
| Timeline / phases | `.timeline-block` (`.light`, `.dark`, `.highlight`) |
| Study activities | `.study-block` |
| Side-by-side content | `.two-column` |
| Right vs wrong | `.two-column` + `.status-correct` / `.status-incorrect` |
| Data comparison | `<table>` |
| Short vs long text comparison | `<table>` (better than two-column for uneven text) |
| Bullet list | `.plus-list` |
| Items with unique icons | `.icon-list` with 32px icon per item |
| Pro tip / callout | `.card-alt-green` (green) or `.card-alt.compact` (grey) |
| Math problem | `.card` in `.two-column` (problem left, solution right) |
| Key stat | Large number + label text |
| Section intro (green/white split) | `.split-section` |
| Coach bio / about me | `.coach-bio` |
| Case prompt / scenario text | `.prompt-block` |
| Strong vs average comparison | `.comparison-cards` |
| Full-width chart / exhibit | `.content.exhibit` |
| 6-item grid (2x3) | `.card-grid-2x3` |
| Audience engagement / question | `.engagement` |
| Scoring rubric / criteria | `table.rubric-table` |
| Screenshot / photo / diagram | `.slide-image` |

---

## Logo Usage

### Files
Located in `courses/_design/logos/`:
- `leland-logo-{white,green,gray}.svg` -- Full wordmark
- `leland-compass-{white,green,gray}.svg` -- Compass icon only

### Placement Rules
| Context | Logo | Color | Position |
|---------|------|-------|----------|
| Dark title slide | Full wordmark | White | Top-left (`leland-logo-top`) |
| Content slide footer | Full wordmark | Gray (#9B9B9B) | Bottom-left (`leland-footer`) |
| PDF header | Full wordmark | Green | Top-left |

### SVG Optimization
Define logos once per file using `<symbol>` + `<use>`:
```html
<svg style="display:none"><symbol id="leland-logo" viewBox="0 0 200 45">...</symbol></svg>
<!-- Then reference: -->
<svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
```

### Footer Treatment (Updated)
- **Content slides**: No footer by default. Add `.with-footer` to `<section>` to opt in.
- **Title dark / Divider**: Footer shown via their HTML (no change).
- **Content with footer**: Add `with-footer` class and include the footer HTML.
- Logo only. No "Powered by Leland" text anywhere.

---

## Icon Library

**Location**: `courses/_design/icons/` (144+ SVG icons)

Sizes: 16px (xs), 20px (sm), 24px (md), 32px (lg), 40px (xl)

Color filters: `.icon-green`, `.icon-white`, `.icon-dark`, `.icon-red`, `.icon-blue`, `.icon-orange`, `.icon-purple`

---

## Charts & Data Visualization

### SVG Chart Standards
All charts are inline SVG for crisp rendering at any resolution.

| Chart Size | viewBox | Use For |
|-----------|---------|---------|
| Small | `0 0 340 150` | In-card charts |
| Medium | `0 0 750 130` | Half-width charts |
| Full | `0 0 750 190` | Full-width exhibits |

### Color Sequence
| Order | Color | Hex | Use |
|-------|-------|-----|-----|
| 1st | Green | `#15B078` | Primary series |
| 2nd | Dark | `#113A2D` | Secondary series |
| 3rd | Blue | `#3B7DFD` | Tertiary series |
| 4th | Medium | `#185440` | Quaternary series |

### Typography in SVG
- Axis labels: 12px, `fill="#707070"`
- Axis titles: 13px bold, `fill="#333333"`
- Data labels: 14px bold, `fill="#333333"`
- All text: `font-family="Calibre, Inter, Arial, sans-serif"`

See `revealjs/chart-patterns.md` for detailed chart construction guidelines.

---

## Image Usage

### Image Classes
| Class | Effect |
|-------|--------|
| `.slide-image` | Base: `max-width: 100%; border-radius: 8px` |
| `.slide-image.rounded` | `border-radius: 12px` |
| `.slide-image.shadow` | Subtle drop shadow |
| `.slide-image.full-width` | `width: 100%` |

### Embedding Screenshots
```html
<img src="path/to/screenshot.png" alt="Description" class="slide-image shadow full-width">
<p class="text-xs text-muted mt-16">Caption text</p>
```

### Photo Utilities
- `.rounded-full` — circular crop (`border-radius: 50%`)
- `.object-cover` — `object-fit: cover` for image cropping

---

## Do / Don't

## Links

| Property | Value |
|----------|-------|
| Color | `var(--leland-green)` / `#15B078` |
| Text decoration | None (underline on hover) |
| Usage | Resource titles in primers, joinleland.com CTA |

---

### Do
- Use white backgrounds for all content slides
- Apply green sparingly for emphasis
- Use `.with-footer` only when footer branding is needed
- Use `+` icons for bullet lists (`.plus-list`)
- Include eyebrow labels to categorize content
- Leave breathing room (white space)
- Use general course name in eyebrows ("GRE Self-Study Course")

### Don't
- Use more than 2-3 accent colors per slide
- Center body text or headers (`text-center` on headings)
- Use box-shadows anywhere
- Use dark green as a card background
- Put cards on dark slides
- Include closing CTA slides in videos
- Use em dashes
- Add `<style>` blocks in production HTML
- Use `border-left` as decorative accent (including on callouts in primers)
- Use plain `.card` (white + border) in primers — always use `.card.card-green-bg` or similar
- Use page numbers in PDFs ("Page 1 of 2")
- Use week/topic labels in eyebrows ("Week 1 | Arithmetic")
