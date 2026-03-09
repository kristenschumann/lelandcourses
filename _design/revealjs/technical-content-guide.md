# Technical Content Guide — Slide Authoring

Patterns for technical content slides: GRE math, test prep (GMAT, LSAT logic), and technical finance courses. For general slide authoring, see `slide-type-catalog.md` and `production-rules.md`. For CSS details, see `css-reference.md`.

> **Headline casing:** All `<h2>` text on body slides must use sentence case — capitalize only the first word and proper nouns/acronyms. Never end with a period.

---

## When to Use `math-content`

Add `math-content` to any `content` slide with **more than one major content block**:

```html
<section class="content math-content">
```

Use it when a slide has:
- Table + callout card
- Two-column layout with dense content in both columns
- Strategy explanation + worked example
- 4+ row table + any additional content below

**Do NOT use it** on:
- Title-dark, divider, or content-dark slides
- Problem walkthrough slides (standard `content` with flex gives them room)
- Slides with a single content block that fits comfortably

### What `math-content` Changes

| Property | Standard | Math Content |
|----------|----------|-------------|
| Top padding | 56px | 48px |
| Bottom padding | 82px | 64px |
| Available content height | ~310px | ~344px |
| Card padding | 24px | 12px 20px |
| Table cell padding | 12px 16px | 8px 12px |
| Column gap | 32px | 24px |
| Line-height (paragraphs) | 1.5 | 1.4 |
| Header margin | 20px | 12px |

---

## Text Color Rules

| Element | Color | Class |
|---------|-------|-------|
| All body text | Black (#333) | `text-md` (default) |
| Solution steps | Black (#333) | `text-md` |
| Correct answers | Green (#15B078) | `<span class="ans">` |
| Incorrect examples | Red (#FB5A42) | `<span class="neg">` |
| Green highlights | Green (#15B078) | `<span class="hl">` or `<span class="hl-bold">` |

**Never use `text-light` or `text-sm text-light` on solution steps.** All teaching content should be readable at `text-md` size in black.

---

## Division Notation

The GRE uses **fraction bar notation** for division, not the ÷ (obelus) symbol. Follow this convention in all slides.

| Context | Notation | Example |
|---------|----------|---------|
| Simple division | Fraction bar | `$\frac{6}{3}$` not `$6 \div 3$` |
| Dividing fractions | ÷ between fractions | `$\frac{a}{b} \div \frac{c}{d}$` (shows the operation being performed) |
| PEMDAS inline expressions | ÷ | `$24 \div 4 \times 2$` (fraction bar would imply grouping and change the problem) |
| Operation shorthand in rules | ÷ | `$\div 100$` in tables showing an operation |
| Fraction-as-division explanation | ÷ | `$\frac{3}{8} = 3 \div 8$` (explicitly teaching that fractions ARE division) |
| Calculator operations | ÷ | `$847 \div 7$` (showing what to type) |

**Why PEMDAS keeps ÷:** Fraction bars act as grouping symbols (like parentheses). Writing `$\frac{24}{4} \times 2$` visually groups `24/4` first, which defeats the purpose of testing left-to-right evaluation.

---

## Orphan Prevention

Prevent single numbers, variables, or short math expressions from wrapping to a new line alone. Use `&nbsp;` (non-breaking space) before trailing math expressions in solution steps.

**Patterns to fix:**
- `Step 1: $expression$` → `Step 1:&nbsp;$expression$`
- `Answer: <span class="ans">` → `Answer:&nbsp;<span class="ans">`
- `then $expression$` → `then&nbsp;$expression$`
- `$expr_1 =$&nbsp;$expr_2$` (keep equals sign with result)

**When to use `math-step` class:** For solution steps containing KaTeX fractions (which render taller than regular text), use `class="text-md math-step"` instead of `class="text-md mb-16"`. The `math-step` class provides extra margin (20px) and line-height (1.8) to prevent fraction overlap.

---

## Slide Templates

### 1. Problem Walkthrough (Two-Column, Fragments)

The standard pattern for worked examples. Two cards side by side: left = problem, right = solution with fragment reveals.

```html
<section class="content">
  <div class="slide-header">
    <p class="eyebrow">Example 1</p>
    <h2>Problem Title</h2>
  </div>

  <div class="two-column">
    <div class="card">
      <h3 class="text-md mb-16">Problem</h3>
      <p class="text-md">Problem statement with $\LaTeX$</p>
      <div class="answer-choices mt-16">
        <div class="choice"><span class="choice-letter">(A)</span> 10</div>
        <div class="choice"><span class="choice-letter">(B)</span> 20</div>
        <div class="choice"><span class="choice-letter">(C)</span> 30</div>
        <div class="choice"><span class="choice-letter">(D)</span> 40</div>
        <div class="choice"><span class="choice-letter">(E)</span> 50</div>
      </div>
    </div>
    <div class="card fragment" data-fragment-index="1">
      <h3 class="text-md mb-16">Solution</h3>
      <p class="text-md mb-16 fragment" data-fragment-index="2">Step 1:&nbsp;$math$</p>
      <p class="text-md mb-16 fragment" data-fragment-index="3">Step 2:&nbsp;$math$</p>
      <p class="text-lg mt-16 fragment" data-fragment-index="4">Answer:&nbsp;<span class="ans">(C) 30</span></p>
    </div>
  </div>

  <div class="leland-footer">
    <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
  </div>

  <aside class="notes">Speaker notes here.</aside>
</section>
```

**Key points:**
- Use standard `content` (NOT `math-content`) for walkthroughs. The flex layout on `.content` makes `.two-column` fill available height, so cards expand naturally.
- All text is `text-md` (black). Only answers get `<span class="ans">`.
- Fragment indices are sequential: outer card = 1, inner steps = 2, 3, 4...
- Max 5 fragment steps per solution card (split across slides if more).

### 2. QC (Quantitative Comparison) Problem

```html
<section class="content">
  <div class="slide-header">
    <p class="eyebrow">Example 2</p>
    <h2>QC Problem Title</h2>
  </div>

  <div class="two-column">
    <div class="card">
      <h3 class="text-md mb-16">Problem</h3>
      <p class="text-md mb-16">Setup text</p>
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
    </div>
    <div class="card fragment" data-fragment-index="1">
      <h3 class="text-md mb-16">Solution</h3>
      <p class="text-md mb-16 fragment" data-fragment-index="2">Analysis step</p>
      <p class="text-lg mt-16 fragment" data-fragment-index="3">Answer: <span class="ans">Quantity A is greater</span></p>
    </div>
  </div>

  <div class="leland-footer">
    <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
  </div>

  <aside class="notes">Speaker notes here.</aside>
</section>
```

### 3. Strategy / Concept Slide

Use `math-content` when the slide has both a strategy explanation AND a worked example or dense supporting content.

```html
<section class="content math-content">
  <div class="slide-header">
    <p class="eyebrow">Strategy 1</p>
    <h2>Strategy Name</h2>
  </div>

  <p class="text-md mb-16">Strategy explanation text...</p>

  <div class="two-column">
    <div class="card">
      <h3 class="text-md mb-16">Example A</h3>
      <p class="text-md mb-8">Problem statement</p>
      <p class="text-md mb-8 fragment" data-fragment-index="1">Solution step</p>
      <p class="text-md fragment" data-fragment-index="2">Result with <span class="ans">answer</span></p>
    </div>
    <div class="card">
      <h3 class="text-md mb-16">Example B</h3>
      <p class="text-md mb-8">Problem statement</p>
      <p class="text-md mb-8 fragment" data-fragment-index="3">Solution step</p>
      <p class="text-md fragment" data-fragment-index="4">Result with <span class="ans">answer</span></p>
    </div>
  </div>

  <div class="leland-footer">
    <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
  </div>

  <aside class="notes">Speaker notes here.</aside>
</section>
```

### 4. Reference Table Slide

For dense reference tables, use `math-content` for tighter cell padding. Add a callout only if it fits.

```html
<section class="content math-content">
  <div class="slide-header">
    <p class="eyebrow">Reference</p>
    <h2>Table Title</h2>
  </div>

  <table>
    <thead>
      <tr><th>Column 1</th><th>Column 2</th><th>Column 3</th></tr>
    </thead>
    <tbody>
      <tr><td>Data</td><td>Data</td><td>Data</td></tr>
      <!-- Up to 6 rows fit comfortably -->
    </tbody>
  </table>

  <div class="card-alt-green compact mt-16">
    <span class="badge badge-green self-start">Tip</span>
    <p class="text-sm">Callout text below the table.</p>
  </div>

  <div class="leland-footer">
    <svg width="80" height="18" fill="#9B9B9B"><use href="#leland-logo"/></svg>
  </div>

  <aside class="notes">Speaker notes here.</aside>
</section>
```

**When to skip the callout:** If the table has 5+ rows and the callout would crowd the footer, remove the callout. The table content is more important.

### 5. Summary Slide (Dark, Plus-List)

The final slide of every video. Simple text on dark background.

```html
<section class="content-dark">
  <div class="slide-header">
    <p class="eyebrow">Summary</p>
    <h2>Topic Name</h2>
  </div>

  <ul class="plus-list">
    <li><strong>Key concept</strong> — brief explanation of the takeaway</li>
    <li><strong>Second point</strong> — what students should remember</li>
    <li><strong>Third point</strong> — practical application or rule</li>
    <li><strong>Fourth point</strong> — common mistake to avoid or tip</li>
    <li><strong>Fifth point</strong> — final reinforcement</li>
  </ul>

  <div class="leland-footer">
    <svg width="80" height="18" fill="rgba(255,255,255,0.4)"><use href="#leland-logo"/></svg>
  </div>

  <aside class="notes">Speaker notes here.</aside>
</section>
```

**Key points:**
- Use `plus-list` with 4-6 items. No tables, no cards.
- White semi-transparent footer logo: `fill="rgba(255,255,255,0.4)"`
- Do not preview the next video or include CTAs.
- Each item: bold concept name + em dash + brief explanation.

---

## Fragment Rules

1. **Outer container** (usually `.card`): `class="card fragment" data-fragment-index="1"`
2. **Inner steps**: sequential indices starting at 2
3. **Final answer**: use `<span class="ans">` wrapper
4. Indices must be unique within a slide and sequential
5. Max 5 fragment steps per solution card. Split across slides if more.
6. Strategy slides can have fragments directly on `<p>` elements (no outer card fragment needed if both cards are always visible).

---

## Component Height Cheat Sheet

| Component | Height (standard) | Height (math-content) |
|-----------|-------------------|----------------------|
| **Available content area** | **310px** | **344px** |
| Slide header (eyebrow + h2 + margin) | 92px | 84px |
| Table header row | 38px | 30px |
| Table data row | 40px | 32px |
| 4-row table total | 198px | 158px |
| `.card` (empty) | 48px padding | 24px padding |
| `.card-alt-green compact` with badge + 1 line | ~68px | ~52px |
| `p` (1 line, 18px font) | 27px | 25px |
| `.two-column` gap | 32px horizontal | 24px horizontal |

---

## Production Workflow (per video)

### Build Steps

1. **Pull script/outline** from Notion or draft markdown
2. **Build HTML slide deck** following templates above
3. **Add speaker notes** with timing format: `M:SS - M:SS | Description`
4. **Run QA validation** against `qa-rules.md`
5. **Visual review** in browser at localhost

### Standard Slide Sequence (math/technical videos)

```
Title (dark) → Concept/overview slides → Divider → Strategy/example slides → Divider → Worked examples → Summary (dark)
```

### Non-math Videos (Reading, Vocab, Writing, Strategy)

- Use standard `content` slides (no `math-content` needed)
- No KaTeX needed
- Same card/fragment/summary patterns still apply
- Summary still uses `content-dark` with `plus-list`

### GRE Course Build Order (52 remaining videos)

Follow the 8-week course sequence:

| Priority | Topic | Videos | Density |
|----------|-------|--------|---------|
| 1 | Number Properties | 8 | Same as Arithmetic |
| 2 | Algebra | 4 | Equation-heavy |
| 3 | Ratios & Word Problems | 8 | Mixed density |
| 4 | Data/Stats | 7 | Chart/table heavy |
| 5 | Counting/Probability | 4 | Formula-heavy |
| 6 | Geometry | 4 | May need diagrams |
| 7 | Reading & Evidence | 8 | Text-heavy, standard layout |
| 8 | Vocab | 3 | Word lists, standard layout |
| 9 | Writing, Strategy, Final Review | 10 | Standard layout |

**Batch execution:** Build 4-8 videos per session from the same topic, QA all together, review, then next batch.
