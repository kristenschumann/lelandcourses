# QA Rules for Reveal.js Slides

Programmatic validation rules for the Checker agent. Each rule has an ID, description, and how to detect violations.

## Severity Levels

Each rule has a severity that determines how urgently it must be fixed:

| Severity | Meaning | Action |
|----------|---------|--------|
| **P0 (Critical)** | Visually broken or factually wrong. Must fix before production. | Fix immediately |
| **P1 (Important)** | Noticeable quality issue. Fix in current QA pass. | Fix before shipping |
| **P2 (Minor)** | Cosmetic preference or edge case. Fix if time allows. | Report, optional fix |

### Quick Severity Reference

| P0 Critical | P1 Important | P2 Minor |
|-------------|-------------|----------|
| QA-02 (no style blocks) | QA-09 (slide-header wrapper) | QA-21b (balanced card content) |
| QA-05 (slide type class) | QA-22 (no em dashes) | QA-30 (eyebrow != h2) |
| QA-06 (footer on with-footer) | QA-31 (callout icon-xl) | QA-32 (colored card bg preference) |
| QA-24 (eyebrow topic labels) | QA-33 (compact card styling) | QA-36 (colon-led labels) |
| QA-55 (pie chart arc endpoints) | QA-33b (4-item icon text-md) | QA-53 (exhibit class) |
| QA-27 (icon mask pattern) | QA-39 (icon color variety) | QA-44 (fraction notation) |
| QA-28 (dark footer color) | QA-40 (icon-card color match) | QA-45 (orphan prevention) |
| QA-42 (summary plus-list) | QA-47 (badge color class) | QA-46 (math-step class) |
| QA-43 (no display overrides) | QA-48 (badge text length) | QA-54 (coach-bio pattern) |
| QA-49 (table fragments) | QA-50 (one layout per slide) | QA-56 (axis label gap) |
| QA-50 (layout stacking) | QA-51 (no badges in grid-3) | QA-57 (example bold question) |
| QA-52 (logos in tables only) | QA-58 (no border-left) | |
| | QA-59 (h2 sentence case) | |

---

## Document Structure

**QA-01** `reveal-full-page` class required
- Check: `<html>` tag must contain `class="reveal-full-page"`
- Fix: Add `class="reveal-full-page"` to `<html>` tag

**QA-02** No `<style>` blocks
- Check: Zero `<style>` elements in the document
- Fix: Move all styling to CSS classes in `leland.css`

**QA-03** Correct Reveal.js init config
- Check: `center: false` in `Reveal.initialize()`
- Fix: Change `center: true` to `center: false`

**QA-04** Required CSS files linked
- Check: `reset.css`, `reveal.css`, and `leland.css` all present in `<head>`
- Fix: Add missing `<link>` tags

---

## Slide Structure

**QA-05** Every `<section>` has a slide type class
- Check: Each `<section>` has one of: `title-dark`, `content-dark`, `divider`, `content`
- Fix: Add appropriate class

**QA-06** Footer consistency on content slides
- The default is **no footer** on content slides. Footer is opt-in via `.with-footer`.
- Check: Each `section.content.with-footer` contains `<div class="leland-footer">`
- Check: `section.content` WITHOUT `.with-footer` should NOT contain `<div class="leland-footer">`
- Fix: **Remove** the `<div class="leland-footer">` from content slides that lack `.with-footer`. Do NOT add `.with-footer` — the standard convention is no footer on content slides.
- Note: `content-dark` summary slides typically have a white semi-transparent footer per QA-28; this is the expected pattern.

**QA-07** Every slide has speaker notes
- Check: Each `<section>` contains `<aside class="notes">`
- Fix: Add speaker notes with timing format `0:00 - 0:30 | Description`

**QA-08** Title slide has inline SVG logo
- Check: `section.title-dark` contains an inline `<svg>` with `<use href="#leland-logo"/>` and `class="mb-16"`
- Fix: Add `<svg width="110" height="25" fill="white" class="mb-16"><use href="#leland-logo"/></svg>` before the eyebrow

**QA-09** Slide header uses `.slide-header`
- Check: Eyebrow + title wrapped in `<div class="slide-header">`, not `<div class="mb-24">`
- Severity: Warning (cosmetic, not breaking)

---

## Typography

**QA-10** No centered headers
- Check: No `<h1>`, `<h2>`, or `<h3>` with `class="text-center"` or `style="text-align: center"`
- Exception: `.divider` slides center by design (via CSS)
- Fix: Remove `text-center` class from headings

**QA-11** No inline font-size overrides
- Check: No `style="font-size:..."` on elements
- Fix: Use utility classes: `.text-lg` (22px), `.text-md` (20px), `.text-sm` (16px), `.text-xs` (14px)

---

## Cards & Components

**QA-12** No borders on colored cards
- Check: No `style="border:..."` on `.card-green-bg`, `.card-alt`, `.card-alt-green`, `.timeline-block`, `.study-block`
- Fix: Remove border styles (CSS handles `border: none`)

**QA-13** No `.callout-green` class
- Check: Zero elements with `class="callout-green"`
- Fix: Replace with `class="card-alt-green"`

**QA-14** No `.callout-dark` class
- Check: Zero elements with `class="callout-dark"`
- Fix: Replace with `class="card-alt compact"`

**QA-15** No inline green backgrounds on `.card-alt`
- Check: No `style="background: rgba(21, 176, 120..."` on `.card-alt` elements
- Fix: Replace `class="card-alt" style="background: rgba(21, 176, 120, 0.06);"` with `class="card-alt-green"`

**QA-16** No box-shadows
- Check: No `style="box-shadow:..."` anywhere
- Fix: Remove box-shadow styles

**QA-17** No dark backgrounds on cards
- Check: No `style="background: #113A2D"` or `background: #185440` on `.card` or `.card-alt`
- Fix: Dark greens are for full-slide backgrounds only

**QA-18** No cards on title-dark or divider slides
- Check: `.title-dark` and `.divider` sections contain no `.card`, `.card-alt`, `.card-grid-*`
- Exception: `.content-dark` may contain `.card-alt` elements
- Fix: Move card content to a `.content` or `.content-dark` slide

---

## Layout

**QA-19** Footer protection
- Check: Card grids use `.card-grid-2` or `.card-grid-3` (which have built-in padding)
- Check: Or grid containers have `padding-bottom: 40px`
- Severity: Warning

**QA-20** No `data-background-color` overrides
- Check: No `<section data-background-color="...">` attributes
- Fix: Use slide type classes instead (`.title-dark`, `.divider`, `.content`)

**QA-21** Badge alignment in flex containers
- Check: `.badge` elements inside flex-column cards have `class="self-start"`
- Fix: Add `self-start` class to badge elements

**QA-21b** Balanced content in card grids
- Check: In 2x2 grids, all four cards have similar content length (same number of sentences, similar word counts) so rows appear equal height
- Check: Multi-row box layouts use `.card-grid-2` or `.card-grid-3` (not inline flex containers)
- Severity: Warning

---

## Content

**QA-22** No em dashes
- Check: No `—` (U+2014) or `&mdash;` in visible text
- Fix: Replace with comma, period, or colon

**QA-23** No CTA slides
- Check: Last slide is not a "Get Started", "Now Practice!", or similar CTA
- Fix: End on final content slide (summary or key takeaways)

**QA-24** Eyebrow uses meaningful topic labels
- Check: Title slide eyebrow uses the canonical course name (e.g., "MBA Admissions Course")
- Check: Content slide eyebrows use short topic labels that tell the viewer what section they're in (e.g., "Essay Openings," "School-Specific Strategy," "Common Pitfalls")
- Check: Eyebrows change across the deck as topics change (same label is fine for 2-3 consecutive slides on the same topic)
- Check: Eyebrows are NOT the course name repeated on every slide (adds zero information)
- Check: Eyebrows are NOT lesson numbers, module names, or full lesson titles (e.g., "Week 1 | Arithmetic," "Module 3: Number Properties")
- Check: Summary/takeaway slide eyebrow uses "Key Takeaways"
- Severity: P0 (Critical) — monotonous eyebrows degrade the viewing experience across an entire deck

**QA-25** All CSS classes exist in leland.css
- Check: Every class used in HTML exists in the theme CSS
- Fix: Replace unknown classes with approved alternatives

---

## SVG Optimization

**QA-26** Logo defined with `<symbol>` pattern
- Check: SVG logo paths defined once with `<symbol id="leland-logo">`, referenced via `<use href="#leland-logo"/>`
- Severity: Warning (works without, but saves ~2KB per slide)

---

## Icons

**QA-27** Icons use `<span>` with mask pattern (not `<img>`)
- Check: Icon elements are `<span class="icon ...">` with `style="--icon: url(...)"`, not `<img>` tags
- Check: Icon file extensions are `.svg` (not `.png`)
- Fix: Replace `<img src="path/icon.png" class="icon icon-lg icon-green" alt="">` with `<span class="icon icon-lg icon-green" style="--icon: url(path/icon.svg)"></span>`

---

## Content Dark Slides

**QA-28** `content-dark` slides have white footer logo
- Check: `section.content-dark` contains `.leland-footer` with `fill="rgba(255,255,255,0.4)"`
- Fix: Add `<div class="leland-footer"><svg width="80" height="18" fill="rgba(255,255,255,0.4)"><use href="#leland-logo"/></svg></div>`

**QA-29** `content-dark` slides use `.slide-header` wrapper
- Check: `section.content-dark` with eyebrow + heading uses `<div class="slide-header">` wrapper
- Fix: Wrap eyebrow + title in `<div class="slide-header">`

---

## Visual Design

**QA-30** Eyebrow and h2 must not be identical
- Check: `.eyebrow` text content !== sibling `h2` text content within the same `.slide-header`
- Fix: Change h2 to a more descriptive or action-oriented title

**QA-31** Callout icons use `icon-xl` with `flex-shrink: 0`
- Check: Icons inside `.card-alt-green` flex layouts use `icon-xl` (not `icon-md` or `icon-lg`)
- Check: Icon `style` attribute includes `flex-shrink: 0`
- Fix: Change icon class to `icon-xl` and add `flex-shrink: 0` to the style

**QA-32** Prefer colored card backgrounds over plain white
- Check: Card grids with 3+ plain `.card` elements (no `card-*-bg` class) on non-data slides
- Severity: Warning (visual preference, not a hard error)
- Fix: Add colored background classes (`card-green-bg`, `card-blue-bg`, `card-orange-bg`, `card-purple-bg`)

**QA-33** Dense card grids need reduced padding
- Check: `.card-grid-2` with 4 cards each containing `.badge` + `h3` + `p` — cards should have `padding: 16px` and badge/h3 should use `mb-8` not `mb-16`
- Severity: Warning
- Fix: Add `style="padding: 16px"` to cards, change `mb-16` to `mb-8` on badges and h3 elements

**QA-33b** 4-item icon lists must use `text-md` not `text-lg`
- Check: `.icon-list.text-lg` with 4+ `<li>` children
- Severity: P1 (causes footer clipping)
- Fix: Change `text-lg` to `text-md` on the `<ul>` element

---

## Math Content

**QA-34** `.content-dark` card-alt must not have default white background
- Check: `.content-dark .card-alt` has no `background: #F8F8F8` or `background: var(--leland-offwhite)` inline styles
- Check: CSS override for `.content-dark .card-alt` is loaded (transparent bg)
- Fix: Remove any inline background overrides; rely on CSS dark card override

**QA-35** MC answer choices must use `.answer-choices` grid
- Check: Multiple choice answers are inside `<div class="answer-choices">`, not inline `(A)...(E)` text
- Fix: Convert to `.answer-choices` grid with `.choice` items and `.choice-letter` spans

**QA-36** No colon-led labels
- Check: No visible text matching pattern `>[A-Z][a-z]+:</` (e.g., "GRE Trap:", "Remember:", "Speed Tip:")
- Fix: Replace with `<span class="badge badge-{color}">Label</span>` elements

**QA-37** Max 5 fragment steps per solution card
- Check: Each `.card.fragment` or solution container has ≤ 5 child elements with `data-fragment-index`
- Fix: Split solution across two slides if > 5 steps

**QA-37b** Solution steps must use black text
- Check: Solution step elements (`<p>` inside `.card.fragment` or `.solution-steps`) do not use `text-sm text-light` or `text-light`
- Check: Solution steps use `text-md` (20px, black) for readability
- Fix: Replace `text-sm text-light` with `text-md`

**QA-38** No stacked two-column example pairs
- Check: No slide contains two or more `.two-column` divs both containing problem + solution content
- Fix: Split into separate slides (one example per slide)

---

## Icon Color Validation

**QA-39** Icon color variety in card grids
- Check: In `.card-grid-2` and `.card-grid-3`, icons should not all use the same color class
- Fix: Use different icon colors per card, matching card background colors
- Severity: Warning

**QA-40** Icon color matches card background
- Check: In `.card.card-green-bg`, icons should use `icon-green` (not `icon-blue`, etc.). Same for other color pairings.
- Fix: Change icon color class to match the card's background color
- Severity: Warning

**QA-41** All 7 icon colors are valid
- Check: Icon color classes must be one of: `icon-green`, `icon-blue`, `icon-orange`, `icon-purple`, `icon-white`, `icon-dark`, `icon-red`
- Fix: Replace any undefined icon color class with one from the approved list
- Severity: Error (undefined classes make icons invisible)

---

## Technical Content

**QA-42** Summary dark slides use plus-list (not tables)
- Check: `section.content-dark` summary slides use `<ul class="plus-list">` for takeaways, not `<table>` or `.card-alt` containers
- Fix: Replace table/card summary content with a `plus-list` of 4-6 items
- Severity: Error

**QA-43** `.content` sections have flex layout
- Check: Do not add inline `display: flex` overrides to `section.content` (the CSS already sets `display: flex; flex-direction: column`)
- Check: Do not add inline `display: block` that would undo the flex layout
- Fix: Remove any inline display overrides on `.content` sections
- Severity: Error

**QA-44** Division uses fraction bar notation (not ÷)
- Check: Simple division expressions use `\frac{a}{b}` instead of `a \div b`
- Exception: PEMDAS inline expressions, operation shorthand, calculator ops, and "fraction-as-division" teaching moments may keep `\div`
- Fix: Replace `\div` with `\frac{}{}` where appropriate
- Severity: Warning

**QA-45** Solution steps use `&nbsp;` to prevent orphans
- Check: Solution step labels (e.g., `Step 1:`, `Answer:`, `Solve:`) are followed by `&nbsp;` before trailing math expressions
- Check: Connecting words (`then`, `so`, `giving`) before trailing math use `&nbsp;`
- Fix: Add `&nbsp;` between the label/word and the math expression
- Severity: Warning

**QA-46** Fraction-heavy steps use `math-step` class
- Check: Solution steps containing KaTeX fractions use `class="text-md math-step"` (not `class="text-md mb-16"`)
- Fix: Replace `mb-16` with `math-step` on fraction-heavy solution lines
- Severity: Warning

**QA-47** Badges must have a color class
- Check: Every `.badge` element has a color class: `badge-green`, `badge-orange`, `badge-red`, `badge-blue`, or `badge-purple`
- Fix: Add the appropriate color class (default to `badge-green` for tips/concepts, `badge-orange` for warnings)
- Severity: Warning

---

## Badges & Layout

**QA-48** Badge text must be 1-3 words
- Check: `.badge` visible text is a short categorical label (1-3 words). No full sentences, descriptions, or taglines.
- Fix: Shorten badge text to a category label (e.g., "Key Term", "Pro Tip", "Warning")
- Severity: Error

**QA-49** Table fragments on `<tr>` only, header always visible
- Check: `data-fragment-index` attributes appear only on `<tr>` elements inside `<tbody>`, never on `<td>`, `<th>`, or `<thead>`
- Fix: Move fragment attributes from cells to their parent `<tr>`. Remove fragments from `<thead>`.
- Severity: Error

**QA-50** No stacked layout components on one slide
- Check: Each `<section>` contains at most one major layout component (`.card-grid-2`, `.card-grid-3`, `.icon-list`, `table`, `.workflow`). No slide has two or more of these.
- Check: No `.card-alt`, `.card-alt-green`, or `.card` elements nested inside another `.card`
- Fix: Split content across two slides, or choose a single layout component
- Severity: Error

**QA-51** No badges inside `card-grid-3` cards
- Check: `.card-grid-3 .card .badge` — no badge elements inside 3-column card grid cards
- Fix: Remove badges from 3-column cards (columns are too narrow for badge + heading + description)
- Severity: Warning

---

## School Logos

**QA-52** School logos only in table cells
- Check: `<img>` tags referencing `MBA program logos/` appear only inside `<td>` or `<th>` elements, never inside `.card`, `.card-alt`, `.card-alt-green`, `.icon-list`, or `.plus-list`
- Fix: Remove logo `<img>` tags from non-table contexts. Logos are data-table visual anchors only.
- Severity: Error

---

## Charts & Exhibits

**QA-53** Exhibit slides must use `.exhibit` class
- Check: Slides with a single large chart or image use `section.content.exhibit` (not cramming charts into cards)
- Fix: Add `exhibit` class to the section and use `.exhibit-visual` wrapper
- Severity: Warning

**QA-54** Coach bio slides must have `.coach-bio` with photo + credentials
- Check: Coach introduction slides use `section.content.coach-bio` with `.coach-photo` and `.coach-credentials`
- Fix: Use the coach-bio snippet pattern
- Severity: Warning

**QA-55** Pie chart arc endpoints must be on the circle
- Check: SVG pie chart `<path>` arc endpoints use correct trigonometry: `x = cx + r*sin(θ)`, `y = cy - r*cos(θ)`
- Check: All `text-anchor="middle"` on pie labels; labels placed at ~55% radius at slice midpoint angle
- Fix: Recalculate arc endpoints using correct formula
- Severity: Error

**QA-56** SVG axis labels must have minimum 10px gap from axis lines
- Check: Chart axis value labels have at least 10px gap from the axis line
- Check: X-axis title has 14px gap below value labels
- Fix: Adjust label positioning to maintain minimum gaps
- Severity: Warning

**QA-57** Every example/problem slide must have a bold question
- Check: Slides with worked examples or practice problems have a bold, specific question (not a generic "Problem" heading)
- Fix: Replace "Problem" with the actual question text in bold
- Severity: Warning

---

## Borders

**QA-58** No sidebar borders (`border-left`)
- Check: No `border-left` in any inline `style` attribute. No CSS classes that produce a left border on cards, callouts, or content blocks.
- Check: Elements using `.quote-block` or `.example-box` should NOT have any inline `border-left` override
- Fix: Replace with tinted background (`card-alt-green` or `card-alt`) for visual differentiation
- Severity: P1

---

## Headline Casing

**QA-59** h2 text on body slides must use sentence case
- Check: h2 text on body slides (`section.content`, `section.content-dark`, `section.engagement`, etc.) uses sentence case — only the first word and proper nouns/acronyms are capitalized
- Check: h2 text does not end with a period
- Exception: Quoted headlines (starting with `"`), h1 on `title-dark`/`divider` slides, h3 card titles
- Fix: Convert to sentence case, preserving proper nouns and acronyms. Remove trailing period if present.
- Severity: P1

---

## Summary Counts

After running all rules, report:
- Total violations (errors)
- Total warnings
- Per-rule breakdown with slide numbers and fix hints

---

## QA Process Notes

### Batch Size Limits
When running Content QA or Design QA on production HTML files, **limit each QA session to 3-4 HTML files maximum**. Production HTML files are large (500-700 lines each), and reading more than 4 at once can exceed context limits, causing the QA agent to fail with "Prompt is too long" errors. Split larger modules into batches (e.g., files 1-3 and files 4-6).

### Known Recurring Issues (Check First)
These issues appeared in nearly every wave of the VC course build (48 videos). Check for them early:
1. **Eyebrow values (QA-24)** — Builders frequently repeat the course name on every slide (adding zero information) or use generic labels like "Example." Eyebrows should use meaningful topic labels that change as the content changes (e.g., "Essay Openings," "Common Pitfalls"). The course name goes on the title slide only.
2. **Callout text classes (QA-31)** — `text-light mt-16` used instead of `text-sm text-light mt-8`.
3. **Icon-list icon sizes (QA-27/31)** — `icon-lg` used instead of `icon-xl` with `flex-shrink: 0`.
4. **4-card compact styling (QA-33)** — Missing `padding: 16px` on cards or `mb-8` on h3 elements.
5. **content-dark misuse** — Used for mid-deck callout slides instead of only the final Key Takeaways slide.
