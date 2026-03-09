# Production Rules for Reveal.js Slides

Content and formatting conventions for production-ready slide decks. These rules apply to all courses.

---

## Builder Pre-Flight Checklist

Before submitting any production HTML, verify all of the following. These are the 5 most common errors found during QA across 48+ video builds:

- [ ] **Eyebrows use meaningful topic labels** that change across the deck. The course name goes on the title slide only. Content slides use short topic labels (e.g., "Essay Openings," "Common Pitfalls," "School-Specific Strategy"). The same label can repeat across 2-3 slides on the same topic, then must change. Never repeat the course name on every slide. Never use lesson numbers or module names.
- [ ] **`content-dark` is ONLY on the final Key Takeaways slide.** All mid-deck callout/emphasis slides must use regular `content` with gray footer.
- [ ] **Icon-list icons use `icon-xl` with `flex-shrink: 0`** (not `icon-lg`). Pattern: `<span class="icon icon-xl icon-green" style="flex-shrink: 0; -webkit-mask-image: url(...); mask-image: url(...)"></span>` — always use explicit `mask-image` + `-webkit-mask-image`, never the `--icon` custom property.
- [ ] **Callout secondary text uses `text-sm text-light mt-8`** (not `text-light mt-16`). Pattern: `<p class="text-sm text-light mt-8">Supporting text.</p>`
- [ ] **4-card `card-grid-2` layouts have compact styling and NO icons.** Cards need `style="padding: 16px"`, h3 needs `class="mb-8"`, and no `<span class="icon">` elements inside the cards.

---

## Available Icons

144 SVG icons are available at `_design/icons/`. Use ONLY icons from this list. Do not reference icons that do not exist.

**Full list:** achievements.svg, activity.svg, add-plus.svg, add.svg, AI-Generate.svg, airplane.svg, application-edit.svg, archive.svg, arrow-down.svg, arrow-left.svg, arrow-recurring.svg, arrow-right.svg, arrow-round.svg, arrow-up-chart-growth.svg, arrow-up-right.svg, arrow-up.svg, attachment.svg, audio-mute.svg, audio-volume.svg, bar-chart.svg, bell.svg, bookmark-remove.svg, bookmark.svg, build-your-career.svg, calendar-alt.svg, calendar-arrow.svg, calendar-check.svg, calendar-turning.svg, calendar.svg, cancel.svg, casper-test.svg, certificate.svg, chat-bubbles.svg, chat.svg, check.svg, checkmark-badge.svg, chevron-back.svg, chevron-double.svg, chevron-down.svg, chevron-over.svg, chevron-up.svg, clock-add-plus.svg, clock-alt.svg, clock.svg, copy.svg, deal-execution.svg, discord.svg, discount.svg, document-file.svg, dots-horizontal.svg, dots-vertical.svg, download.svg, earnings.svg, edit.svg, editing.svg, expand.svg, experiences.svg, eye-closed.svg, eye-open.svg, facebook.svg, filter-levels.svg, filter.svg, folder-plus.svg, gift.svg, globe-lock.svg, globe.svg, graduate-hat.svg, group.svg, heart-filled.svg, heart.svg, home-small.svg, home.svg, hourglass-time.svg, image.svg, inbox.svg, info-filled.svg, info.svg, instagram.svg, letters-of-evaluation.svg, lightning.svg, link-external.svg, link.svg, linkedin.svg, lock.svg, mail.svg, md-phd-essay.svg, menu-burger.svg, microphone.svg, modules.svg, money-chat.svg, money.svg, networking.svg, onboarding.svg, ops-tools.svg, partnerships.svg, phone.svg, pin.svg, profile.svg, question.svg, refund.svg, search-document.svg, search.svg, settings.svg, shapes.svg, share.svg, shield-check-filled.svg, shield.svg, sign-out.svg, slack-black.svg, slack.svg, sort.svg, sparkle.svg, specialization-strategy.svg, spreadsheet.svg, star-yellow.svg, star.svg, stop-octagon-minus.svg, store.svg, super-coach.svg, switch.svg, tag.svg, test.svg, text.svg, threads.svg, thumbs-down_filled.svg, thumbs-down.svg, thumbs-up_filled.svg, thumbs-up-1.svg, thumbs-up.svg, tiktok-black.svg, tiktok.svg, trash-alt.svg, trash.svg, upload.svg, user-group.svg, user.svg, video-async.svg, video.svg, warning-triangle.svg, warning.svg, write.svg, x-twitter.svg, x.svg, zoom.svg

**Common non-existent icons people try to use:** `target.svg` (use `achievements.svg`), `lightbulb.svg` (use `sparkle.svg`), `brain.svg` (use `AI-Generate.svg`), `rocket.svg` (use `arrow-up-chart-growth.svg`)

---

## Footer Treatment

### Default: No Footer on Content Slides
- Content slides (`.content`, `.content-dark`) **do not show a footer by default**. The CSS hides `.leland-footer` on these slides.
- Content slides get reduced bottom padding (64px instead of 82px), reclaiming 18px of content space.

### Opt-in Footer
- To show the Leland logo on a content slide, add `.with-footer` to the `<section>`:
  ```html
  <section class="content with-footer">
    <!-- slide content -->
    <div class="leland-footer">
      <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
    </div>
  </section>
  ```
- Slides with `.with-footer` get the original 82px bottom padding.

### Title & Divider Slides
- Title dark and divider slides show their branding via inline HTML (Leland logo at top of title slide). No footer div needed.

### Dark Slides with Footer
- If a `content-dark` slide opts in with `.with-footer`, use white semi-transparent logo:
  ```html
  <section class="content-dark with-footer">
    <!-- content -->
    <div class="leland-footer">
      <svg width="80" height="18" fill="rgba(255,255,255,0.4)"><use href="#leland-logo"/></svg>
    </div>
  </section>
  ```

### Rules
- Logo only. **No "Powered by Leland" text** anywhere.
- No slide numbers visible in final output (Reveal.js `slideNumber` is for authoring only).

### PDF Export
- Use `decktape` for pixel-perfect PDF export (not browser `?print-pdf` mode)
- Command: `npx decktape reveal --size 960x540 --fragments http://localhost:8080/index.html output.pdf`
- The `--fragments` flag captures each animation step as a separate page.

### Local Preview
- Use `/preview` to launch a local server and open slides in browser
- Server runs from `Claude_code/` root to resolve both asset path depths
- Press `S` in browser to open speaker notes popup
- Always preview before recording

---

## Images & Screenshots

### Image Classes
Use `.slide-image` as the base class for all embedded images:

```html
<img src="path/to/image.png" alt="Description" class="slide-image shadow full-width">
<p class="text-xs text-muted mt-16">Caption text here</p>
```

| Class | Effect |
|-------|--------|
| `.slide-image` | Base styling: max-width 100%, 8px radius |
| `.slide-image.rounded` | 12px border-radius |
| `.slide-image.shadow` | Subtle drop shadow (for screenshots) |
| `.slide-image.full-width` | 100% width |
| `.rounded-full` | Circular crop (for photos) |

### When to Use Each
- **Screenshots**: `.slide-image.shadow.full-width` (shadow helps distinguish from slide background)
- **Diagrams**: `.slide-image.full-width` (no shadow needed)
- **Photos**: `.slide-image.rounded` or `.rounded-full` for circular crops
- **In two-column**: `.slide-image` with no full-width (respects column width)

---

## SVG Charts

### Standard Sizes
| Context | viewBox | Use |
|---------|---------|-----|
| In-card | `0 0 340 150` | Charts inside `.card` elements |
| Half-width | `0 0 750 130` | Charts in `.two-column` |
| Full-width | `0 0 750 190` | Charts in `.exhibit` slides |

### Color Palette
Use these colors in order for multi-series data:
1. `#15B078` (green) — primary
2. `#113A2D` (dark) — secondary
3. `#3B7DFD` (blue) — tertiary
4. `#185440` (medium) — quaternary

### Typography
- Axis labels: `font-size="12"`, `fill="#707070"`
- Axis titles: `font-size="13"`, `font-weight="bold"`, `fill="#333333"`
- Data labels: `font-size="14"`, `font-weight="bold"`, `fill="#333333"`

### Key Rules
- All charts use inline SVG with `.chart-svg` class
- Axis labels must have minimum 10px gap from axis lines
- X-axis title 14px below value labels
- Pie chart labels: `text-anchor="middle"`, placed at ~55% radius

See `chart-patterns.md` for detailed construction guidelines.

---

## End Screens

- **Do not include** closing CTA slides ("Now Practice!", "Get Started Today", "Subscribe")
- Videos end on the final content slide (usually a summary or key takeaways)
- Do not preview the next video or say "what's up next" on the final slide. The last slide should stand alone as a summary of the current video's content.
- Summary slides on dark background: use `.content-dark` class with `flex-col gap-16` plain text, white footer logo (`fill="rgba(255,255,255,0.4)"`)

---

## Punctuation

- **No em dashes** (---). Use commas or periods instead
- Use colons sparingly. Avoid unnecessary lead phrases ("Key Insight:", "Remember:")
- Keep sentences concise and scannable
- Favor short sentences over compound constructions
- **Punctuation consistency within groups:** If items in a list, card group, or set of workflow steps use complete sentences, every item must end with a period. If items use fragments or labels, none should have periods. Never mix punctuated and unpunctuated items within the same group. Common mistake: icon-list or plus-list items with two sentences where the first ends with a period but the second doesn't.

---

## Eyebrow Labels

- **Title slide eyebrow**: Uses the canonical course name (e.g., "MBA Admissions Course," "GRE Self-Study Course," "VC Recruiting Course").
- **Content slide eyebrows**: Use short topic labels that tell the viewer what section they're in. These should be 2-4 words describing the current topic (e.g., "Essay Openings," "School-Specific Strategy," "Common Pitfalls," "Word Count Math," "Portfolio Planning").
- **Eyebrows change across the deck** as topics change. The same label is fine for 2-3 consecutive slides covering the same topic, then it must change when the topic shifts.
- **Summary slide eyebrow**: Always "Key Takeaways."
- **Never**: Repeat the course name on every content slide (adds zero information). Never use lesson numbers, module names, or full lesson titles (e.g., "Week 1 | Arithmetic," "Module 3: Number Properties," "Session 2").
- **Exception**: "Example 1", "Practice Problem" style labels for worked examples

---

## Leland Plus (L+) Content Guidelines

All Leland Plus essays are from admitted applicants. When using L+ content in slides or PDF resources:

- **L+ content = positive examples only.** Always present L+ essays as models to learn from. Attribution: "Admitted [School] Applicant."
- **Never frame L+ content as weak, bad, or a negative example.** If a student sees that an admitted applicant's essay is labeled "weak," it undermines L+ value and confuses the student.
- **For "what not to do" examples, use synthetic text.** Generate fictional examples that illustrate common mistakes. These should be clearly synthetic (no school attribution, no quote-source label).
- **Frame contrasts as "good vs. great" or "approach A vs. approach B,"** not "bad vs. good." When comparing two admitted essays, show how different approaches suit different prompt types.
- **Before-after panels:** The "draft" panel (with strikethrough CSS) should only contain synthetic text or the student's own hypothetical draft. Never put real L+ content in the draft/strikethrough panel.

---

## Content Density Limits

| Slide Type | Max Items | Notes |
|-----------|-----------|-------|
| Card grid (3-col) | 3 cards | One card per column |
| Card grid (2-col) | 4 cards | 2x2 layout, balance content length across all 4 cards |
| Plus list | 5-6 items | Shorten text if more than 5 |
| Table rows | 5-6 rows | Header + 5 data rows max |
| Workflow steps | 4 steps | With arrows between |
| Type boxes | 4 items | Numbered 01-04 |
| Two-column text | 3-4 items per side | Balance both columns |
| Card grid (2x3) | 6 cards | 3 columns, compact padding |
| Comparison panels | 2 panels | Strong vs average |
| Prompt block | 1 block | Case scenarios, reading passages |

### Layout Stacking
- **One major layout component per slide.** Use a card-grid OR an icon-list OR a table, not multiple. If content needs two grids, split into two slides.
- **Never nest cards inside cards** (e.g., no `card-alt-green` inside a `.card`).
- **Spacing between stacked components:** When stacking layout components vertically (panel-box + callout, two-column + card-alt), add `mb-24` to the upper component for visible separation.

### Nested Card-Alt Inside Colored Cards
When placing a `.card-alt` (white box) inside a colored card (`.card-green-bg`, `.card-blue-bg`, etc.), the flex layout on `.card` can collapse margin between sibling elements. To ensure visible spacing between content (e.g., a formula or label) and the nested white box:
- Add `style="margin-top: 16px;"` to the `.card-alt` element
- Add `style="padding: 24px;"` to the outer colored card for breathing room
- Add `style="padding: 16px;"` to the `.card-alt` for comfortable inner spacing
- The `mb-*` utility classes on preceding elements may not produce visible space inside flex cards; use `margin-top` on the card-alt instead

### Text Length Guidelines
- Card title (h3): 3-5 words
- Card description: 1-2 sentences (under 25 words)
- Plus list items: 1 line each (under 15 words)
- Eyebrow: 2-4 words
- Slide title (h2): 3-7 words, **sentence case** (capitalize first word + proper nouns/acronyms only; no trailing period)
- Icon-list items: bold key phrase + 1 short clause, under 100 characters total
- Icon-list items with 4+ items: use `.text-md` (20px) instead of `.text-lg` (22px) to prevent footer clipping. 3-item icon lists can use `.text-lg`.

---

## Speaker Notes Format

Every slide must include speaker notes with timing:

```html
<aside class="notes">
  0:00 - 0:30 | Opening. Introduce the concept of [topic].
  Key points to cover:
  - First important point
  - Second important point
  0:30 - 1:00 | Transition to the next idea.
</aside>
```

- Use `M:SS - M:SS |` format for timestamps
- Include key talking points, not a full script
- Total duration per slide: 15-60 seconds typical

---

## Visual Design Preferences

### No Sidebar Borders
- **Never use `border-left` on any element.** No sidebar accent borders on cards, callouts, quote blocks, or example boxes. Use tinted backgrounds (`card-alt-green`, `card-alt`, colored card variants) for visual differentiation instead.

### Card Backgrounds
- **Default to colored backgrounds** (`card-green-bg`, `card-blue-bg`, `card-orange-bg`, `card-purple-bg`) over plain white-bordered cards. Plain white cards look flat and boring.
- Add icons before card h3 elements for visual anchoring: `<span class="icon icon-lg icon-green mb-16" style="--icon: url(...)"></span>`
- Use a different color per card to help distinguish concepts at a glance.
- **Icon color variety:** Use a different icon color for each card in a card grid. Match icon color to the card's background color (e.g., `icon-green` with `card-green-bg`, `icon-blue` with `card-blue-bg`). Never use `icon-green` for all cards — this makes them visually monotonous and harder to distinguish.

### Layout Selection
- Use **tables** instead of two-column plus-lists when comparing items with uneven text lengths (e.g., "Avoid" vs "Say Instead"). Tables balance columns naturally.
- Use **card-grid-2 with colored backgrounds** instead of plus-lists when items each deserve a label + description. Cards fill more visual space.
- When two consecutive slides feel thin and cover the same topic, **merge them** into one richer slide with a supporting `<p>` element.

### Filling the Page
- Callout slides should use `text-lg` for both the callout text and the supporting paragraph.
- Callout icons should use `icon-xl` (40px) to stay proportional with `text-lg` text. Always add `flex-shrink: 0` to prevent flex compression.
- Icon lists should use `icon-xl` (40px) when paired with `text-lg`.
- Paragraphs below callouts: use `margin-top: 24px` (not 40px). The 40px gap pushes content into the footer zone on callout + paragraph slides.
- Paragraphs below icon-lists or card-grids: use `margin-top: 8px` when the component above already has bottom padding.

### Footer Clearance on Dense Cards
- 2x2 card grids with badge + h3 + description can crowd the footer. Apply `style="padding: 16px"` to cards and use `mb-8` (instead of `mb-16`) on badges and h3 elements.

### Avoiding Redundancy
- Never repeat the eyebrow label text in the h2. The eyebrow categorizes; the h2 should describe the slide's specific point.

---

## Slide Ordering Conventions

1. **Title slide** (`.title-dark`) -- course name + topic title
2. **Agenda/overview** (`.content`) -- what this video covers (optional for short videos)
3. **Content slides** (`.content`) -- main teaching content
4. **Divider** (`.divider`) -- only between major sections (optional)
5. **Summary slide** (`.content-dark`) -- key takeaways on dark background, final slide

**Body content slides must use `.content`** (white background). Only use `.title-dark` for the opening title slide, `.divider` for section breaks, and `.content-dark` for the final summary. Never use `.title-dark` or `.divider` for regular teaching content.

**New slide types for bootcamp/non-self-study content:**
- **Split section** (`.split-section`) — section intro with green/white split panels
- **Coach bio** (`.coach-bio`) — coach introduction after title slide
- **Engagement** (`.engagement`) — pause for audience reflection
- **Exhibit** (`.content.exhibit`) — full-width data visualization

---

## File Naming

- Production HTML: `index.html` (current version)
- Versioned: `index-v2.html`, `index-v3.html` (keep previous versions)
- Images: `ID##_images/figure_N_description.png`
- Draft scripts: `courses/{course}/drafts/ID##_Topic_Name.md`

---

## Asset Paths

From a production folder like `catalog/<course>/production/self-study/<video>/`:

```html
<link rel="stylesheet" href="../../../../_design/revealjs/dist/reset.css">
<link rel="stylesheet" href="../../../../_design/revealjs/dist/reveal.css">
<link rel="stylesheet" href="../../../../_design/revealjs/themes/leland.css">
<script src="../../../../_design/revealjs/dist/reveal.min.js"></script>
```

Count the directory levels from your HTML file to `courses/` to determine the path prefix.

---

## Technical Content Rules (GRE, Test Prep, Finance)

For full templates and code samples, see `technical-content-guide.md`.

### Text Color
- **All body text must be black** (`text-md`, 20px). This includes solution steps, strategy explanations, and card descriptions.
- **Never use `text-light` or `text-sm text-light` on solution steps.** Grey text is hard to read in presentation mode.
- **Green for answers only:** Use `<span class="ans">` to highlight correct answers. Green should not appear on regular content text.

### Fragment Convention
- Outer solution card: `data-fragment-index="1"` (card appears on first click)
- Inner solution steps: sequential indices starting at 2
- Max 5 fragment steps per card. Split across slides if more.
- Strategy slides may have fragments directly on `<p>` elements without an outer card fragment.

### When to Apply `math-content`
- Use on slides with 2+ major content blocks (table + callout, rules + table, strategy + examples)
- Do NOT use on problem walkthrough slides (standard `.content` flex gives cards room to expand)
- Do NOT use on title-dark, divider, or content-dark slides

### Summary Slide Format
- Always use `content-dark` with `<ul class="plus-list">` for 4-6 takeaways
- No tables, no card-alt containers, no CTAs
- White semi-transparent footer: `fill="rgba(255,255,255,0.4)"`
- Do not preview the next video

### Division Notation
- **Use fraction bars** for division (GRE convention), not the ÷ symbol
- **Exceptions where ÷ is appropriate:** PEMDAS inline expressions (fraction bar would imply grouping), operation shorthand in rules (`$\div 100$`), calculator operations, and when explicitly teaching that fractions ARE division
- See `technical-content-guide.md` for the full decision table

### Orphan Prevention
- Use `&nbsp;` before trailing math expressions in solution steps to prevent single numbers wrapping alone
- Pattern: `Step 1:&nbsp;$expression$`, `Answer:&nbsp;<span class="ans">`, `then&nbsp;$expression$`
- For steps with KaTeX fractions, use `class="text-md math-step"` for extra spacing (20px margin, 1.8 line-height)

### Badge Colors
- Every `.badge` must have a color class (`badge-green`, `badge-orange`, `badge-red`, `badge-blue`, `badge-purple`)
- Default to `badge-green` for tips and concepts, `badge-orange` for warnings
- **Badge content must be 1-3 words** (short categorical labels only). Never use badges for descriptions, taglines, or full sentences.
- **No badges inside `card-grid-3` cards** — columns are too narrow for badge + heading + description.

---

## Table Conventions

### Row Striping
- CSS handles alternating row stripes automatically (`tbody tr:nth-child(even)` uses `#EFEFEF`). Do not add inline `style="background: #EFEFEF;"` to table rows.

### Table Fragments
- Table fragments go on `<tr>` elements (row-by-row reveal). Never put `data-fragment-index` on individual `<td>` cells.
- The header `<thead>` row is always visible (no fragments on `<thead>` or its children).
- Fragment indices start at 1 for the first body row to reveal.

---

## School Logos

### Usage Rules
- School logos go in **table cells** (`<td>`) and **table headers** (`<th>`) ONLY
- **Never** place logos in cards, callouts, icon-lists, or plus-lists
- Logos are small visual anchors for data tables, not decorative elements

### HTML Pattern
```html
<!-- In table body cells (22px) -->
<td><img src="../MBA program logos/school-name.png" height="22" style="vertical-align: middle; margin-right: 6px;"><strong>School Name</strong></td>

<!-- In table headers (24px) -->
<th><img src="../MBA program logos/school-name.png" height="24" style="vertical-align: middle; margin-right: 4px;"> School Name</th>
```

### Available Logos
Source directory: `courses/mba/MBA program logos/` (30 school PNGs)

| School | Filename |
|--------|----------|
| Harvard / HBS | `harvard-hbs.png` |
| Stanford GSB | `stanford-gsb.png` |
| Wharton | `upenn-wharton.png` |
| Booth | `chicago-booth.png` |
| Kellogg | `northwestern-kellogg.png` |
| Columbia | `cbs_corrected.png` |
| MIT Sloan | `mit-sloan.png` |
| Darden | `darden-corrected.jpeg` |
| Tuck | `dartmouth-tuck.png` |
| INSEAD | `insead.png` |
| Haas | `berkeley-haas-corrected.png` |
| Yale SOM | `yale-som.png` |
| Fuqua / Duke | `duke-fuqua.png` |
| Ross / Michigan | `michigan-ross.png` |
| Stern / NYU | `nyu-stern.png` |
| Anderson / UCLA | `ucla-anderson.png` |
| Cornell Johnson | `cornell-johnson.png` |
| LBS | `lbs.png` |
| IESE | `iese.png` |
| HEC Paris | `hec-paris.png` |

---

## Migration Notes

Existing production files may contain deprecated patterns. When rebuilding slides:
- Replace `.callout-green` with `.card-alt-green` (88 occurrences across production)
- Replace `.callout-dark` with `.card-alt.compact` (21 occurrences)
- Replace inline `style="background: rgba(21, 176, 120, 0.06);"` on `.card-alt` with `.card-alt-green` (97 occurrences)
- Change `center: true` to `center: false` in init blocks (17 occurrences)
- Replace `<div class="mb-24">` slide headers with `<div class="slide-header">`
- Replace `<img>` icon elements with `<span class="icon" style="--icon: url(...)">` pattern
- Replace `.png` icon references with `.svg`
- Replace `section.title-dark` summary slides with `section.content-dark`
- Replace `<div class="leland-logo-top">` with inline `<svg class="mb-16">` on title slides
