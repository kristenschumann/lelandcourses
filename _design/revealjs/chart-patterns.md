# Chart Patterns — SVG Design Guide

Detailed construction guidelines for inline SVG charts in Leland slides. For quick reference, see the chart section in `production-rules.md`.

---

## Standard viewBox Sizes

| Context | viewBox | Use |
|---------|---------|-----|
| In-card chart | `0 0 340 150` | Charts inside `.card` elements |
| Half-width | `0 0 750 130` | Charts in `.two-column` layouts |
| Full-width exhibit | `0 0 750 190` | Charts in `.content.exhibit` slides |

Always use `class="chart-svg"` on the `<svg>` element.

---

## Color Sequence

Use these colors in order for multi-series data:

| Order | Name | Hex | CSS Variable |
|-------|------|-----|-------------|
| 1st | Green | `#15B078` | `--leland-green` |
| 2nd | Dark | `#113A2D` | `--leland-dark` |
| 3rd | Blue | `#3B7DFD` | `--leland-blue` |
| 4th | Medium | `#185440` | `--leland-medium` |

For single-series charts, use `#15B078` (green) as the primary color.

---

## Typography in SVG

All text elements must include:
```
font-family="Calibre, Inter, Arial, sans-serif"
```

| Element | font-size | font-weight | fill |
|---------|-----------|-------------|------|
| Axis value labels | `12` | normal | `#707070` |
| Axis titles | `13` | `bold` | `#333333` |
| Data labels | `14` | `bold` | `#333333` |
| Legend text | `12` | normal | `#707070` |

---

## Axis Spacing Rules

### Gaps
- Axis value labels: **minimum 10px gap** from the axis line
- X-axis title: **14px gap** below the last row of value labels
- Y-axis title: **14px gap** left of the value labels

### Axis Lines
- Color: `#E5E5E5` (stroke)
- Width: `1` or `1.5`
- Grid lines (optional): `#E5E5E5`, `stroke-dasharray="4 4"`

---

## Bar Charts

### Construction
```xml
<rect x="..." y="..." width="..." height="..." rx="4" fill="#15B078"/>
```

- Corner radius: `rx="4"` on all bars
- Bar width: 40-120px depending on chart size and number of bars
- Gap between bars: 20-40px
- Data labels: centered above each bar, 10px gap

### Grouped Bars
- Group gap: 32px between groups
- Bar gap within group: 4px
- Use different colors per series (follow color sequence)

---

## Pie Charts

### Arc Math Reference

Pie chart arcs use polar coordinates from the top (12 o'clock position):

```
x = cx + r * sin(θ)
y = cy - r * cos(θ)
```

Where:
- `cx, cy` = center point of the pie
- `r` = radius
- `θ` = angle in radians from 12 o'clock (clockwise)

### SVG Arc Path
```
M cx cy                          (move to center)
L startX startY                  (line to arc start)
A r r 0 largeArcFlag 1 endX endY  (arc to end)
Z                                (close path)
```

- `largeArcFlag`: `0` if arc < 180 degrees, `1` if arc >= 180 degrees
- Sweep flag: always `1` (clockwise)

### Label Placement
- All labels: `text-anchor="middle"`
- Position: ~55% of radius from center, at the midpoint angle of each slice
- Label coordinates:
  ```
  labelX = cx + (r * 0.55) * sin(midAngle)
  labelY = cy - (r * 0.55) * cos(midAngle)
  ```

### Common Mistakes
- Wrong arc endpoints: double-check sin/cos application (sin for x, -cos for y)
- Missing `text-anchor="middle"` on labels (causes misalignment)
- Labels too close to edges (use 55% radius, not 70%+)

---

## Line Charts

### Construction
```xml
<polyline points="x1,y1 x2,y2 x3,y3" fill="none" stroke="#15B078" stroke-width="2.5"/>
```

- Stroke width: `2.5` for primary line, `2` for secondary
- Data points: `<circle cx="..." cy="..." r="4" fill="#15B078"/>` at each vertex
- Hover labels: `<circle r="6">` with data value text above

### Grid
- Horizontal grid lines: `stroke="#E5E5E5"`, `stroke-dasharray="4 4"`
- No vertical grid lines unless comparing time periods

---

## Coordinate Grids

### Avoiding Ellipses
When drawing circles on coordinate grids, the chart's aspect ratio can distort circles into ellipses. Solutions:

1. **Nested SVG**: Use a nested `<svg>` with `preserveAspectRatio="xMidYMid meet"` for the grid area
2. **Equal scaling**: Ensure the x and y scales use the same pixels-per-unit ratio

### Axis Label Alignment
- Y-axis labels: `text-anchor="end"`, positioned 10px left of the axis
- X-axis labels: `text-anchor="middle"`, positioned 10px below the axis

---

## Chart Containers

### Standalone Chart
```html
<svg class="chart-svg" viewBox="0 0 750 190" xmlns="http://www.w3.org/2000/svg">
  <!-- chart content -->
</svg>
```

### Chart with Legend
```html
<div class="chart-container">
  <svg class="chart-svg" viewBox="0 0 750 190">...</svg>
  <div style="display: flex; gap: 24px; justify-content: center;">
    <span class="text-xs text-muted">
      <span style="display: inline-block; width: 12px; height: 12px; background: #15B078; border-radius: 2px; vertical-align: middle; margin-right: 6px;"></span>
      Label 1
    </span>
    <!-- more legend items -->
  </div>
</div>
```

### Side-by-Side Charts
```html
<div class="chart-pair">
  <div class="chart-container"><!-- chart 1 --></div>
  <div class="chart-container"><!-- chart 2 --></div>
</div>
```

---

## Exhibit Slides

For full-width chart slides, use the `.exhibit` class:

```html
<section class="content exhibit">
  <div class="slide-header">
    <p class="eyebrow">Data Analysis</p>
    <h2>Chart Title</h2>
  </div>
  <div class="exhibit-visual">
    <svg class="chart-svg" viewBox="0 0 750 190">...</svg>
  </div>
  <p class="exhibit-caption">Source: description of data</p>
</section>
```

The `.exhibit` class reduces padding to maximize chart area:
- Padding: `40px 48px 60px` (vs standard `56px 80px 64px`)

---

## Design Rules

1. Charts should NOT be inside `.card` wrappers unless the card background adds meaning
2. Every example/problem slide with a chart needs a **bold question**, not a generic "Problem" heading
3. Use `.chart-pair` for side-by-side chart comparisons
4. Inline SVG only (no external image files for charts)
5. All text in SVG must use the Calibre font stack
6. Maintain consistent axis spacing across all charts in a deck
