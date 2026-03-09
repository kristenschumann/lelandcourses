# CSS Class Reference

Complete reference for every class in `leland.css`. For brand colors, typography hierarchy, and design principles, see `../../leland-design-system.md`.

---

## Slide Type Classes

Applied to `<section>` elements. Every section must have exactly one.

| Class | Background | Text Color | Layout |
|-------|-----------|------------|--------|
| `.title-dark` | `#113A2D` | White | Flex column, centered vertically |
| `.content-dark` | `#113A2D` | White | Default flow (top-left, dark background) |
| `.divider` | `#113A2D` | White | Flex column, centered vertically + horizontally |
| `.content` | `#FFFFFF` | `#333333` | Flex column (top-left, `.two-column` fills remaining height) |
| `.content.math-content` | `#FFFFFF` | `#333333` | Flex column, tighter padding (48/80/64) |
| `.split-section` | Left 40% `#113A2D`, Right 60% white | Left: white, Right: dark | Flex row, zero padding |
| `.content.exhibit` | `#FFFFFF` | `#333333` | Flex column, reduced padding (40px 48px 60px) |
| `.engagement` | `#FFFFFF` | `#333333` | Flex column, centered vertically + horizontally |
| `.content.coach-bio` | `#FFFFFF` | `#333333` | Flex row, 40px gap, items centered |

---

## Typography

### Headings

| Element | Size | Weight | Line-height | Color |
|---------|------|--------|-------------|-------|
| `h1` | 48px | 700 | 1.15 | Black |
| `.title-dark h1` | 56px | 700 | 1.1 | White |
| `.divider h1` | 42px | 700 | — | White |
| `h2` | 32px | 700 | 1.2 | Black |
| `h3` | 20px | 600 | 1.3 | Black |

All headings: `text-align: left`, `text-transform: none`, zero bottom margin except h1 (16px), h2/h3 (8px).

**h2 casing:** Sentence case — capitalize only the first word and proper nouns/acronyms. Never end with a period.

### Eyebrow

```css
.eyebrow { color: #15B078; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
```

On `.title-dark`, eyebrow stays green (readable on dark background).

### Text Size Utilities

| Class | Size | Use For |
|-------|------|---------|
| `.text-lg` | 22px | Large body text, key statements |
| `.text-md` | 20px | Card titles when using h3 feels too heavy |
| `.text-sm` | 16px | Card descriptions, secondary text |
| `.text-xs` | 14px | Captions, fine print |

### Text Color Utilities

| Class | Color | Use For |
|-------|-------|---------|
| `.text-dark` | `#333333` | Primary body text |
| `.text-light` | `#707070` | Secondary descriptions |
| `.text-muted` | `#9B9B9B` | Captions, labels |
| `.text-green` | `#15B078` | Accent text |
| `.text-white` | `#FFFFFF` | Text on dark backgrounds |

### Inline Highlights

| Class | Effect |
|-------|--------|
| `.hl` | Green text (`#15B078`) |
| `.hl-bold` | Green text, bold |
| `.neg` | Red text (`#FB5A42`) for incorrect/negative |
| `.ans` | Green text for correct answers |

### Alignment

| Class | Effect |
|-------|--------|
| `.text-center` | Center text. **Never use on headings.** |

---

## Spacing Utilities

### Margin Top

| Class | Value |
|-------|-------|
| `.mt-16` | 16px |
| `.mt-20` | 20px |
| `.mt-24` | 24px |
| `.mt-32` | 32px |

### Margin Bottom

| Class | Value |
|-------|-------|
| `.mb-8` | 8px |
| `.mb-16` | 16px |
| `.mb-20` | 20px |
| `.mb-24` | 24px |
| `.mb-32` | 32px |
| `.mb-40` | 40px |

### Gap (for flex/grid containers)

| Class | Value |
|-------|-------|
| `.gap-12` | 12px |
| `.gap-16` | 16px |
| `.gap-20` | 20px |
| `.gap-24` | 24px |
| `.gap-32` | 32px |

---

## Layout

### Two Column

```css
.two-column { display: flex; gap: 32px; }
.two-column > * { flex: 1; }
```

Use for: side-by-side content, problem+solution, do/don't comparisons.

### Grid

| Class | Columns | Gap |
|-------|---------|-----|
| `.grid-2` | 2 equal | 20px |
| `.grid-3` | 3 equal | 20px |

### Flex Utilities

| Class | Effect |
|-------|--------|
| `.flex-col` | `display: flex; flex-direction: column` |
| `.flex-1` | `flex: 1` |
| `.flex-center` | Flex with items centered both axes |
| `.self-start` | `align-self: flex-start` (prevents stretching in flex) |

### Width Utilities

| Class | Value |
|-------|-------|
| `.w-40` | `width: 40%` |
| `.w-50` | `width: 50%` |
| `.w-60` | `width: 60%` |

### Additional Utilities

| Class | Effect |
|-------|--------|
| `.rounded-full` | `border-radius: 50%` |
| `.object-cover` | `object-fit: cover` |

---

## Cards

### Standard Card (`.card`)

White background, 1px border, 12px radius, 24px padding.

```html
<div class="card">
  <h3>Title</h3>
  <p class="text-sm text-light">Description</p>
</div>
```

### Colored Card Variants

Add to `.card` to replace white background with 12% opacity tint. Border is automatically removed.

| Class | Background |
|-------|-----------|
| `.card.card-green-bg` | `rgba(21, 176, 120, 0.12)` |
| `.card.card-orange-bg` | `rgba(239, 133, 9, 0.12)` |
| `.card.card-red-bg` | `rgba(251, 90, 66, 0.12)` |
| `.card.card-blue-bg` | `rgba(59, 125, 253, 0.12)` |
| `.card.card-purple-bg` | `rgba(45, 37, 166, 0.12)` |

**Rule**: Never mix `.card` (white+border) and `.card.card-*-bg` (tinted) on the same slide.

### Alternate Card (`.card-alt`)

Off-white `#F8F8F8`, no border, 12px radius, 24px padding. Use inside a white `.card` for nested content.

### Green Alternate Card (`.card-alt-green`)

Light green `rgba(21, 176, 120, 0.06)`, no border, 12px radius, 24px padding. Use for pro tips, best practices, positive callouts.

### Compact Modifier (`.compact`)

Reduces padding to `14px 24px`, radius to 8px. Add to any card or card-alt.

```html
<div class="card-alt compact">
  <p>Compact grey callout for notes or context.</p>
</div>
```

---

## Card Grids

Grids with built-in `padding-bottom: 40px` for footer protection.

| Class | Columns | Gap |
|-------|---------|-----|
| `.card-grid-2` | 2 equal | 16px |
| `.card-grid-3` | 3 equal | 16px |
| `.card-grid-2x3` | 3 equal | 12px |
| `.card-grid-auto` | auto-fill (min 220px) | 16px |

`.card-grid-2x3` children get compact 16px padding by default.

Children (`.card` or `.type-box`) get `display: flex; flex-direction: column` automatically.

**Equal sizing**: All columns are equal width (`1fr`). Items in the same row are automatically equal height (CSS grid default). To keep a 2x2 grid looking symmetrical, balance content length across all four cards (same number of sentences, similar word counts). The `padding-bottom: 40px` protects the footer — do not force equal cross-row heights, as this can push the bottom row into the footer area.

**Auto-centering with icons:** Cards whose first child is an `.icon` element are automatically centered (text and alignment) via a CSS `:has()` rule. This means icon-topped cards don't need manual centering classes.

---

## Components

### Slide Header (`.slide-header`)

Wraps eyebrow + title with consistent `margin-bottom: 20px`.

```html
<div class="slide-header">
  <p class="eyebrow">Section Label</p>
  <h2>Slide Title</h2>
</div>
```

### Type Box (`.type-box`)

Numbered concept box with large green number.

```html
<div class="type-box">
  <div class="type-num">01</div>
  <div>
    <h3>Concept Name</h3>
    <p>Brief description of the concept.</p>
  </div>
</div>
```

Properties: off-white background, 20px padding, 12px radius, 16px gap. `h3` is 20px, `p` is 16px with `#707070` color.

### Icon List (`.icon-list`)

List with unique icons per item (32-40px icons aligned with text). Use `icon-xl` (40px) when paired with `.text-lg` for better proportion.

```html
<ul class="icon-list text-lg">
  <li>
    <span class="icon icon-lg icon-green" style="--icon: url({{ICON_PATH}}/ops-tools.svg)"></span>
    <span>Item text here</span>
  </li>
</ul>
```

Properties: no bullets, 16px gap between icon and text, 20px gap between items.

**4-item variant:** Use `.text-md` instead of `.text-lg` when the list has 4+ items. The extra 2px per item prevents the last item from clipping into the footer zone on standard content slides.

### Plus List (`.plus-list`)

Bulleted list with green `+` markers instead of dots.

```html
<ul class="plus-list">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

### Workflow (`.workflow`)

Horizontal process flow with numbered steps and arrows.

```html
<div class="workflow">
  <div class="workflow-step">
    <div class="step-num mb-16">1</div>
    <h3 class="text-md">Step Name</h3>
    <p class="text-sm text-light">Description</p>
  </div>
  <div class="workflow-arrow">→</div>
  <div class="workflow-step">...</div>
</div>
```

- `.workflow`: flex row with 8px gap, `align-items: stretch` (equal height boxes)
- `.workflow-step`: white, bordered, 12px radius, centered text, flex-column layout
- `.workflow-arrow`: centered icon container, use `arrow-right.png` icon instead of text arrows
- `.step-num`: 36px green circle with white number

### Timeline Block (`.timeline-block`)

Phase/period container with label.

```html
<div class="timeline-block light">
  <div class="timeline-label">Week 1-2</div>
  <h3>Phase Name</h3>
  <p class="text-sm text-light">Description</p>
</div>
```

| Variant | Background | Text |
|---------|-----------|------|
| `.light` | `#F8F8F8` | Dark |
| `.dark` | `#185440` | White |
| `.highlight` | `rgba(21,176,120,0.12)` | Dark |
| (no modifier) | White | Dark |

### Study Block (`.study-block`)

Activity card for study plans. Off-white background, 20px padding, 12px radius, `flex: 1`.

| Variant | Background |
|---------|-----------|
| (default) | `#F8F8F8` |
| `.highlight` | `rgba(21,176,120,0.08)` |

### Panel Box (`.panel-box`)

Container with green uppercase title label.

```html
<div class="panel-box">
  <div class="panel-title">Section Title</div>
  <p>Content here</p>
</div>
```

### Split Section (`.split-section`)

Two-panel section intro. Green left panel (40%), white right panel (60%).

```html
<section class="split-section">
  <div class="split-left">
    <p class="eyebrow">Part 2</p>
    <h1>Section Title</h1>
  </div>
  <div class="split-right">
    <h3>What You'll Learn</h3>
    <p>Description text</p>
  </div>
</section>
```

Properties: `.split-left` has `var(--leland-dark)` background, white text, 56px/40px padding, flex-center. `.split-right` has white background, 56px/48px padding, flex-center.

### Coach Bio (`.coach-bio`)

Two-column layout: circular photo + credentials.

```html
<section class="content coach-bio">
  <div class="coach-photo"><img src="photo.jpg" alt="Name"></div>
  <div class="coach-credentials">
    <p class="eyebrow">Your Coach</p>
    <h2>Coach Name</h2>
    <p class="text-lg text-light">Title and credentials</p>
    <div class="credential-logos"><!-- logos --></div>
  </div>
</section>
```

Properties: `.coach-photo` is 180x180px circle with 4px dark border, overflow hidden. `.coach-credentials` is flex: 1. `.credential-logos` is flex row with 12px gap.

### Comparison Cards (`.comparison-cards`)

Side-by-side quality comparison panels.

```html
<div class="comparison-cards">
  <div class="comparison-panel strong">
    <div class="panel-label">Strong Candidate</div>
    <h3>Title</h3>
    <p class="text-sm text-light">Description</p>
  </div>
  <div class="comparison-panel average">
    <div class="panel-label">Average Candidate</div>
    <h3>Title</h3>
    <p class="text-sm text-light">Description</p>
  </div>
</div>
```

Properties: flex row, 20px gap, flex: 1. `.strong` has green 6% bg, green label. `.average` has off-white bg, muted label. Each panel: 24px padding, 12px radius.

### Prompt Block (`.prompt-block`)

Gray background block for case prompts and scenarios.

```html
<div class="prompt-block">
  <div class="prompt-label">Case Prompt</div>
  <p>Scenario text goes here...</p>
</div>
```

Properties: off-white bg, 12px radius, 24px padding, 1.7 line-height. `.prompt-label` is 12px uppercase muted with 8px bottom margin.

### Exhibit (`.exhibit`)

Full-width chart/image slide with maximized content area.

```html
<section class="content exhibit">
  <div class="slide-header">...</div>
  <div class="exhibit-visual"><!-- chart/image --></div>
  <p class="exhibit-caption">Caption text</p>
</section>
```

Properties: reduced padding (40px 48px 60px). `.exhibit-visual` is flex-centered, flex: 1. `.exhibit-caption` is 14px muted.

### Engagement (`.engagement`)

Centered question prompt for audience interaction.

```html
<section class="engagement">
  <p class="eyebrow">Discussion</p>
  <h2>Think About It</h2>
  <p class="engagement-prompt">What would you recommend?</p>
  <p class="text-light">Supporting text</p>
</section>
```

Properties: flex column, centered both axes. `h2` is centered, max-width 720px. `.engagement-prompt` is 28px semibold green.

---

## Badges

Pill-shaped labels. Always add `.self-start` in flex containers to prevent stretching.

```html
<span class="badge badge-green self-start">Label</span>
```

| Class | Background | Text Color |
|-------|-----------|------------|
| `.badge-green` | Green 12% | `#15B078` |
| `.badge-orange` | Orange 12% | `#EF8509` |
| `.badge-red` | Red 12% | `#FB5A42` |
| `.badge-blue` | Blue 12% | `#3B7DFD` |
| `.badge-purple` | Purple 12% | `#2D25A6` |

Properties: 100px border-radius, 4px/12px padding, 12px font, 600 weight, uppercase, 0.05em spacing.

---

## Tables

Tables are auto-styled by the theme:
- Dark green header row (`#113A2D`, white text, uppercase)
- Alternating row stripes (white / `#EFEFEF` on even rows for visible contrast)
- 8px top-left and top-right border-radius on header
- 12px/16px padding on cells

No classes needed beyond standard `<table>`, `<thead>`, `<tbody>` HTML. Do not add inline `style="background: #EFEFEF;"` to rows — the CSS handles striping automatically.

### Rubric Table (`.rubric-table`)

Alternative table styling for scoring rubrics and evaluation criteria.

| Property | Value |
|----------|-------|
| `th` background | `var(--leland-offwhite)` (not dark green) |
| `th` text color | `var(--leland-text-dark)` |
| `td:first-child` | Bold text, off-white background |

---

## Status Indicators

| Class | Color | Use For |
|-------|-------|---------|
| `.status-correct` | Green, semibold | Correct answers, good practices |
| `.status-incorrect` | Red, semibold | Wrong answers, bad practices |

---

## Positioning

| Class | Position |
|-------|----------|
| `.leland-footer` | Absolute, bottom: 24px, left: 48px |

Footer is hidden on `.content` and `.content-dark` slides by default. Add `.with-footer` to the `<section>` to opt in. Content slides without `.with-footer` use reduced bottom padding (64px instead of 82px).

### Content Protection

| Class | Effect |
|-------|--------|
| `.slide-content` | `max-height: 424px; overflow: hidden` |
| `.card-grid-2`, `.card-grid-3` | Include `padding-bottom: 40px` |

---

## Icons

### Size Classes

| Class | Dimensions |
|-------|-----------|
| `.icon-xs` | 16x16px |
| `.icon-sm` | 20x20px |
| `.icon-md` | 24x24px |
| `.icon-lg` | 32x32px |
| `.icon-xl` | 40x40px |

### Color Classes

Icons use CSS `mask-image` with `background-color` for exact brand colors (not CSS filters).

| Class | Color |
|-------|-------|
| `.icon-green` | `#15B078` (brand green) |
| `.icon-blue` | `#3B7DFD` (brand blue) |
| `.icon-orange` | `#EF8509` (brand orange) |
| `.icon-purple` | `#2D25A6` (brand purple) |
| `.icon-white` | `#FFFFFF` (white) |
| `.icon-dark` | `#113A2D` (dark green) |
| `.icon-red` | `#FB5A42` (brand red) |

**Color matching:** When cards use colored backgrounds (`card-green-bg`, `card-blue-bg`, etc.), match the icon color to the card's background color. Example: a `card-green-bg` card should use `icon-green`, a `card-blue-bg` card should use `icon-blue`. Never use all-green icons across differently-colored cards.

Icons are `<span>` elements with explicit inline `mask-image` styles (both prefixed and unprefixed for Safari compatibility):

```html
<span class="icon icon-md icon-green" style="-webkit-mask-image: url({{ICON_PATH}}/check.svg); mask-image: url({{ICON_PATH}}/check.svg)"></span>
```

**Important:** Do NOT use the `--icon` CSS custom property pattern (`style="--icon: url(...)"`). While the CSS defines `mask-image: var(--icon)`, the `-webkit-mask-image` prefix required by Safari cannot resolve through CSS custom properties. Always inline both `-webkit-mask-image` and `mask-image` directly for cross-browser compatibility.

The color class sets `background-color`, and the mask renders the SVG shape in that color.

---

## Image Placeholder

Dashed border container for layout prototyping:

```html
<div class="image-placeholder">
  <span class="text-sm">Image: 400 x 240</span>
</div>
```

### Image Utilities

| Class | Effect |
|-------|--------|
| `.slide-image` | `max-width: 100%; height: auto; border-radius: 8px; display: block` |
| `.slide-image.rounded` | `border-radius: 12px` |
| `.slide-image.shadow` | `box-shadow: 0 2px 12px rgba(0,0,0,0.1)` |
| `.slide-image.full-width` | `width: 100%` |

---

## Dark Slide Overrides

On `.title-dark`, `.content-dark`, and `.divider`:
- `h1`, `h2`, `h3` → white
- `p` → `rgba(255,255,255,0.7)`
- `.text-muted` → `rgba(255,255,255,0.5)`
- `.text-light` → `rgba(255,255,255,0.6)`
- `.eyebrow` → stays green
- `.text-white` → white (use on `.content-dark` for emphasis text)
- `.card-alt`, `.card-alt p` → white text (on `.content-dark` only; avoid cards on `.title-dark`/`.divider`)
- `.card-alt`, `.card-alt.compact` → semi-transparent white bg + border on `.content-dark`
- `.card` → semi-transparent white bg, white border on `.content-dark`
- `.card-alt-green` → 15% green bg on `.content-dark`
- Tables on `.content-dark` → transparent header, white-alpha borders, light text

---

## Approved Inline Styles

Only these inline styles are acceptable in production HTML:

| Pattern | When |
|---------|------|
| `style="display: none;"` | On SVG symbol definitions |
| `fill="white"` / `fill="#9B9B9B"` / `fill="rgba(255,255,255,0.4)"` | On SVG `<use>` references |
| `width="..."` / `height="..."` | On SVG elements and images |
| `style="--icon: url(path/to/icon.svg)"` | On `<span class="icon">` elements |
| `style="display: flex; align-items: flex-start; gap: 12px;"` | Callout icon + text layout |
| `style="display: flex; gap: 16px;"` | Timeline/study-block containers |
| `style="flex: 1;"` | Children of inline flex containers |
| `style="padding: 16px"` | Compact card override for footer clearance on dense 2x2 grids |
| `style="padding: 24px"` | Outer colored card when nesting a card-alt inside |
| `style="margin-top: 16px;"` | On `.card-alt` nested inside a colored card, to ensure spacing from content above |
| `style="margin-top: 16px; padding: 16px;"` | Combined spacing + padding on nested `.card-alt` |
| `flex-shrink: 0` (in `--icon` style) | Prevent icon compression in flex callout layouts |

Everything else should use CSS classes. If you need a style that doesn't exist, request it be added to `leland.css`.

---

## Technical Content Components

### Math Content Layer (`.math-content`)

Opt-in tighter spacing for math-heavy slides. Add to `<section class="content math-content">`.

| Property | Standard | Math Content |
|----------|----------|-------------|
| Section padding | 56px 80px 82px | 48px 80px 64px |
| Card padding | 24px | 12px 20px |
| Table cell padding | 12px 16px | 8px 12px |
| Column gap (`.two-column`) | 32px | 24px |
| `p` line-height | 1.5 | 1.4 |
| `.slide-header` margin | 20px | 12px |
| `.compact` padding | 14px 24px | 8px 16px |
| `.slide-content` max-height | 402px | 428px |

### Content Section Flex Layout

`.content` sections have `display: flex; flex-direction: column` in base CSS. This means:
- `.two-column` inside `.content` gets `flex: 1` and fills remaining vertical space
- Cards inside `.two-column` expand to use available height
- Do NOT add inline `display` overrides to `.content` sections

### Answer Choices (`.answer-choices`)

2-column grid for multiple choice options.

```html
<div class="answer-choices">
  <div class="choice"><span class="choice-letter">(A)</span> Option text</div>
  <div class="choice"><span class="choice-letter">(B)</span> Option text</div>
  <div class="choice"><span class="choice-letter">(C)</span> Option text</div>
  <div class="choice"><span class="choice-letter">(D)</span> Option text</div>
  <div class="choice"><span class="choice-letter">(E)</span> Option text</div>
</div>
```

Properties: 2-column grid, 8px/32px gap, 12px top margin. `.choice-letter` is bold and flex-shrink: 0.

### QC Comparison Columns (`.qc-columns`)

3-column grid for Quantitative Comparison problems.

```html
<div class="qc-columns">
  <div class="qc-col">
    <p class="text-sm text-muted mb-8">Quantity A</p>
    <p class="text-md">$expression$</p>
  </div>
  <div class="qc-vs">vs</div>
  <div class="qc-col">
    <p class="text-sm text-muted mb-8">Quantity B</p>
    <p class="text-md">$expression$</p>
  </div>
</div>
```

Properties: 3-column grid (1fr auto 1fr), left column has light green bg, right column has off-white bg. Middle "vs" column is white with bold text.

### Example Box (`.example-box`)

Green left-border container for worked examples within strategy slides.

```html
<div class="example-box">
  <p class="example-label">Example</p>
  <p>$3 \times (-4) = -12$</p>
</div>
```

Properties: 3px green left border, 16px left padding, 12px top margin. `.example-label` is 12px uppercase green.

### Solution Steps (`.solution-steps`)

Flex column container for step-by-step reveal in problem walkthroughs.

```html
<div class="solution-steps">
  <p class="step fragment" data-fragment-index="2">Step 1</p>
  <p class="step fragment" data-fragment-index="3">Step 2</p>
  <p class="step-final fragment" data-fragment-index="4"><span class="ans">Answer</span></p>
</div>
```

Properties: flex column, 8px gap. `.step` has line-height 1.5. `.step-final` is 20px bold with 4px top margin.

### Math Step (`.math-step`)

Standalone spacing class for individual math steps outside `.solution-steps`.

Properties: 12px bottom margin, 1.6 line-height. Last child has 0 bottom margin.

### Summary List (`.summary-list`)

Alternative to `.plus-list` for dark slides with separator lines.

Properties: No bullets/padding, 8px vertical padding per item, 1px white-alpha bottom border, flex layout with 12px gap.

### Quote Block (`.quote-block`)

Essay excerpt display with source attribution. Green left border, off-white background, italic text.

```html
<div class="quote-block">
  <p>"The moment I stopped optimizing for my resume and started listening to what actually scared me..."</p>
  <p class="quote-source">Real Essay Excerpt | Stanford GSB | Accepted</p>
</div>
```

Properties: off-white `#F8F8F8` bg, 4px green left border, `0 12px 12px 0` border-radius, 20px/24px padding, 16px top margin. `p` is italic with 1.6 line-height. `.quote-source` is 13px uppercase muted with 12px top margin.

On `.content-dark`: semi-transparent white bg (`rgba(255,255,255,0.08)`), green left border preserved, light text.
