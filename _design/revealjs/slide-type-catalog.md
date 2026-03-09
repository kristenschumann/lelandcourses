# Slide Type Catalog

Quick reference for the Planner agent. Maps content patterns to approved slide templates. For full CSS details, see `css-reference.md`.

---

## Decision Framework

| Content Pattern | Use This Template | Max Items |
|----------------|-------------------|-----------|
| 3 equal concepts/features | Card Grid 3-Col | 3 cards |
| 2x2 grid of concepts | Card Grid 2-Col | 4 cards |
| Numbered items (01, 02, 03) | Type Box Grid | 4 items |
| Sequential process/steps | Workflow | 4 steps |
| Timeline / phases | Timeline | 4-5 blocks |
| Side-by-side content | Two Column | 2 panels |
| Right vs wrong / do vs don't | Two Column + Status | 2 panels |
| Short vs long text comparison | Table | 4-6 rows |
| Bullet list of points | Plus List | 5-6 items |
| Items with unique icons | Icon List | 3-5 items |
| Data comparison | Table | 5-6 rows |
| Pro tip / key insight | Callout (green) | 1 callout |
| Note / context | Callout (grey) | 1 callout |
| Math problem + solution | Two Column Cards | 2 cards |
| Image + text | Two Column (image left) | 1 image + text |
| Study plan / activities | Study Blocks | 3-4 blocks |
| Key stat or metric | Large Number + Label | 1-2 stats |
| Section break | Divider | Title + description |
| Opening | Title Dark | Course name + title |
| Summary / takeaways | Content Dark (Plus-List) | 4-6 points |
| GRE/math worked example | Problem Walkthrough | 2 cards (problem + solution fragments) |
| Strategy + inline examples | Strategy Slide (Technical) | Concept + example cards |
| GRE QC problem | QC Problem | Problem with QC columns + solution |
| Section intro (bootcamp) | Split Section | Title + body |
| Coach introduction | Coach Bio | Photo + credentials |
| Case prompt / scenario | Case Prompt | 1 prompt block |
| Strong vs average quality | Comparison Cards | 2 panels |
| Full-width chart / exhibit | Exhibit | 1 visual |
| 6-item overview | Card Grid 2x3 | 6 cards |
| Audience question / pause | Engagement | 1 question |
| Evaluation criteria | Scoring Rubric | 4-6 rows |
| Screenshot / diagram | Screenshot | 1 image |
| Tip callout with badge | Tip Callout | 1 callout + list |

---

## Template Details

### 1. Title Dark
- Class: `section.title-dark`
- Contains: inline SVG logo, eyebrow (course name only — never a lesson title), h1
- Notes: First slide only. No footer, no cards.

### 2. Content + Plus List
- Class: `section.content`
- Contains: slide-header, `ul.plus-list`
- Capacity: 5-6 items, each under 15 words
- Notes: Add `.text-lg` to list for emphasis

### 3. Content + Table
- Class: `section.content`
- Contains: slide-header, `<table>`
- Capacity: Header + 5 data rows max
- Notes: Tables auto-styled by theme
- **School logos**: When table rows list school names, add logo `<img>` tags inside `<td>` (22px) or `<th>` (24px) before the school name. Logos go in tables ONLY, never in cards or other components. See `production-rules.md` for the full filename mapping.

### 4. Card Grid (3-Column)
- Class: `section.content`
- Contains: slide-header, `.card-grid-3` with 3x `.card`
- Capacity: 3 cards, each with title (3-5 words) + description (1-2 sentences)
- Notes: Built-in footer protection via padding-bottom
- **Prefer colored backgrounds** (`.card-green-bg`, `.card-blue-bg`, etc.) over plain white cards for visual variety
- **Add icons** before h3 for visual anchoring: `<span class="icon icon-lg icon-green mb-16" style="--icon: url(...)"></span>`

### 5. Card Grid (2-Column)
- Class: `section.content`
- Contains: slide-header, `.card-grid-2` with 2-4x `.card`
- Capacity: 4 cards (2x2), each with title + description
- Notes: Built-in footer protection
- **Prefer colored backgrounds** over plain white cards when cards represent distinct categories
- For dense cards with badge + h3 + text: use `style="padding: 16px"` and `mb-8` (instead of `mb-16`) on badges and h3 to prevent footer crowding

### 6. Type Box Grid
- Class: `section.content`
- Contains: slide-header, `.card-grid-2` with `.type-box` children
- Capacity: 4 type boxes numbered 01-04
- Each box: `.type-num` + h3 title + p description

### 7. Workflow
- Class: `section.content`
- Contains: slide-header, `.workflow` with `.workflow-step` + `.workflow-arrow`
- Capacity: 4 steps max
- Each step: `.step-num` circle + h3 title + p description

### 8. Timeline
- Class: `section.content`
- Contains: slide-header, flex container with `.timeline-block` children
- Capacity: 4-5 blocks
- Variants: `.light`, `.dark`, `.highlight`

### 9. Two Column (Text)
- Class: `section.content`
- Contains: slide-header, `.two-column` with 2 children
- Capacity: 3-4 items per side
- Notes: Use `.gap-32` for wider spacing

### 10. Two Column (Cards + Status)
- Class: `section.content`
- Contains: slide-header, `.two-column` with 2x `.card`
- Left card: `.status-incorrect` header + content
- Right card: `.status-correct` header + content
- Notes: Use nested `.card-alt` or `.card-alt-green` for quoted examples

### 11. Two Column (Image + Text)
- Class: `section.content`
- Contains: slide-header, `.two-column` with `.image-placeholder` + text div
- Notes: Image on left, text on right with h3 + description + optional plus-list

### 12. Math Problem
- Class: `section.content`
- Contains: slide-header, `.two-column` with 2x `.card`
- Left card: Problem statement with KaTeX
- Right card: Solution steps with KaTeX
- Notes: Use `.ans` for answer highlighting

### 13. Callout Slide
- Class: `section.content`
- Contains: slide-header, `.card-alt-green` (tip) or `.card-alt` (note), additional text
- Notes: Green for positive advice, grey for supplementary info
- **Size up to fill space**: use `text-lg` (not `text-md`) for callout text and supporting paragraph
- **Icon sizing**: use `icon-xl` (40px) for callout icons paired with `text-lg` text; always add `flex-shrink: 0` to icons in flex layouts to prevent compression by long text

### 14. Study Blocks
- Class: `section.content`
- Contains: slide-header, flex container with `.study-block` children
- Capacity: 3-4 blocks
- Variant: `.highlight` for emphasis

### 15. Icon List
- Class: `section.content`
- Contains: slide-header, `ul.icon-list` with `<li>` items each having a 32-40px icon + text
- Capacity: 3-5 items
- Icons: choose from `_design/icons/` (production path: `{{ICON_PATH}}/filename.svg`)
- Icon HTML: `<span class="icon icon-xl icon-green" style="--icon: url({{ICON_PATH}}/filename.svg)"></span>` (not `<img>`)
- Notes: Use `.text-lg` on lists with 3 items. For 4+ items, use `.text-md` to prevent footer clipping. Each item has a unique icon. Use `icon-xl` (40px) for better visual presence.

### 16. Divider
- Class: `section.divider`
- Contains: `.part-number`, h1, optional p
- Notes: Between major sections only. No footer, no cards.

### 17. Summary (Dark Background)
- Class: `section.content-dark`
- Contains: `.slide-header` with eyebrow ("Key Takeaways") + h2, `flex-col gap-16` with `.text-lg.text-white` items
- Footer: White semi-transparent logo (`fill="rgba(255,255,255,0.4)"`)
- Notes: Use plain text, not card-alt boxes. Top-aligned layout (not flex-centered like title-dark).
- Do not include "what's up next" or preview the next video. The summary should stand alone.

### 18. Badges in Cards
- Class: `section.content`
- Contains: slide-header, `.card-grid-2` with `.card` children containing `.badge`
- Notes: Always add `.self-start` to badges in flex-column cards

---

## Text Length Limits

| Element | Max Length |
|---------|-----------|
| Eyebrow | 2-4 words |
| Slide title (h2) | 3-7 words, sentence case |
| Card title (h3) | 3-5 words |
| Card description | 1-2 sentences (under 25 words) |
| Plus list item | 1 line (under 15 words) |
| Type box description | 1-2 sentences |

---

## Layout and Visual Design Principles

### Prefer Color Over Plain White
- Default to colored card backgrounds (`card-green-bg`, `card-blue-bg`, `card-orange-bg`, `card-purple-bg`) rather than plain white-bordered cards. Colored backgrounds add visual variety and help distinguish concepts at a glance.
- Add icons before card h3 elements for visual anchoring, especially on card-grid-3 slides that would otherwise be text-heavy.

### Choose the Right Layout for Content Shape
- **Tables over two-column** when comparing items with uneven text lengths (e.g., short "Avoid" phrases vs. long "Say Instead" alternatives). Tables naturally balance columns; two-column plus-lists look lopsided.
- **Card-grid-2 over plus-list** when 4 items each deserve a label + description. Cards fill more visual space and add color variety.

### Combine Thin Slides
- When two consecutive slides cover the same topic and each feels sparse, merge them into one richer slide. Add the secondary content as a supporting `<p class="text-md text-light">` or `<p class="text-lg text-light">` below the primary content.
- Merge speaker notes with combined timing ranges.

### Fill the Page
- Callout slides (green box + supporting text) can look sparse. Size up: use `text-lg` for callout text and supporting paragraphs.
- Icon lists: use `icon-xl` (40px) instead of `icon-lg` (32px) when paired with `text-lg` text.
- Icons in callout flex layouts must have `flex-shrink: 0` to prevent compression by long adjacent text.

### Manage Footer Clearance on Dense Slides
- 2x2 card grids with badge + h3 + description can crowd the footer zone. Reduce card padding to 16px inline (`style="padding: 16px"`) and use `mb-8` (instead of `mb-16`) on badges and h3 elements. This reclaims ~40px of vertical space.

### Avoid Redundant Headers
- Never repeat the eyebrow text in the h2. The eyebrow categorizes; the h2 should add meaning. Example: eyebrow "Goals Red Flags" + h2 "Watch for These Warning Signs" (not "Goals Red Flags" twice).
| Workflow step description | 1 sentence |

---

## Technical Content Templates

See `technical-content-guide.md` for full details and code samples.

### 19. Problem Walkthrough (Technical)
- Class: `section.content` (standard, NOT math-content)
- Contains: slide-header, `.two-column` with 2x `.card`
- Left card: Problem statement + `.answer-choices` grid (MC) or `.qc-columns` (QC)
- Right card: `class="card fragment" data-fragment-index="1"` with solution steps
- Solution steps: `text-md` (black), sequential fragment indices, `<span class="ans">` for final answer
- Cards expand to fill height via CSS flex on `.content .two-column`

### 20. Strategy Slide (Technical)
- Class: `section.content math-content`
- Contains: slide-header, explanatory `<p class="text-md">`, `.two-column` with 2x `.card`
- Each card: Example with inline fragment steps
- Use `math-content` because the slide has concept text + two example cards (2+ content blocks)

### 21. Summary (Plus-List)
- Class: `section.content-dark`
- Contains: `.slide-header` with eyebrow ("Summary") + h2, `<ul class="plus-list">` with 4-6 items
- Footer: White semi-transparent logo (`fill="rgba(255,255,255,0.4)"`)
- Each item: `<strong>Concept</strong> — explanation`
- No tables, no cards, no CTAs, no "what's next" preview

### 22. Split Section
- Class: `section.split-section`
- Contains: `.split-left` (green bg, 40% width) + `.split-right` (white bg, 60% width)
- Left panel: eyebrow + h1 title
- Right panel: h3 + body text + optional plus-list
- Notes: Section intro for bootcamp decks. No footer.

### 23. Coach Bio
- Class: `section.content.coach-bio`
- Contains: `.coach-photo` (circular 180px) + `.coach-credentials`
- Credentials: eyebrow + h2 name + title + credential logos + testimonial card
- Notes: Use `card-alt-green` for testimonial quote.

### 24. Screenshot / Full-width Image
- Class: `section.content`
- Contains: slide-header, `<img class="slide-image shadow full-width">`, caption `<p class="text-xs text-muted">`
- Notes: Use `.shadow` for screenshots, `.rounded` for photos.

### 25. Exhibit (Chart)
- Class: `section.content.exhibit`
- Contains: slide-header, `.exhibit-visual` (centered flex container), `.exhibit-caption`
- Notes: Reduced padding (40px 48px 60px) maximizes chart area. Use inline SVG or `<img>`.

### 26. Comparison Cards
- Class: `section.content`
- Contains: slide-header, `.comparison-cards` with `.comparison-panel.strong` + `.comparison-panel.average`
- Each panel: `.panel-label` + h3 + description
- Notes: For quality comparisons beyond simple right/wrong. Green bg for strong, off-white for average.

### 27. Case Prompt
- Class: `section.content`
- Contains: slide-header, `.prompt-block` with `.prompt-label` + body text
- Notes: Gray background block for scenarios, reading passages, case prompts.

### 28. Card Grid 2x3
- Class: `section.content`
- Contains: slide-header, `.card-grid-2x3` with 6x `.card`
- Capacity: 6 cards (3 columns, 2 rows)
- Notes: Cards have compact 16px padding. Use `.text-xs` for descriptions. Built-in footer protection.

### 29. Engagement / Interactive
- Class: `section.engagement`
- Contains: eyebrow, h2, `.engagement-prompt` (28px green text), supporting text
- Notes: Centered layout for audience questions and discussion prompts. No slide-header wrapper.

### 30. Scoring Rubric
- Class: `section.content`
- Contains: slide-header, `table.rubric-table`
- Notes: Off-white header row (not dark green). First column bold with off-white background for criteria names.

### 31. Tip Callout with Badge
- Class: `section.content`
- Contains: slide-header, `.card-alt-green` with sparkle icon + badge + text, plus-list below
- Notes: Badge inside callout for categorized tips. Use `icon-xl` with `flex-shrink: 0`.
