# Leland Multi-Use Keynote Template Specifications

This document provides exact specifications for building the Leland multi-use template in Keynote.

---

## Prerequisites

### Install Calibre Font

1. Navigate to `_global/templates:assets/Calibre-OTF/`
2. Double-click each `.otf` file to open Font Book:
   - Calibre-Regular.otf
   - Calibre-Medium.otf
   - Calibre-Semibold.otf
   - Calibre-RegularItalic.otf
   - Calibre-MediumItalic.otf
   - Calibre-SemiboldItalic.otf
3. Click "Install Font" for each
4. Restart Keynote for fonts to appear

---

## Setup Instructions

### Step 1: Open Starting File

Open `example pptx leland style good.key` in Keynote as your starting point.

### Step 2: Configure Theme Colors

Go to **Format > Advanced > Define Custom Colors** and add:

| Swatch Name | Hex Code | RGB |
|-------------|----------|-----|
| Leland Green | #15B078 | 21, 176, 120 |
| Darkest Green | #113A2D | 17, 58, 45 |
| Medium Green | #185440 | 24, 84, 64 |
| Orange | #EF8509 | 239, 133, 9 |
| Red | #FB5A42 | 251, 90, 66 |
| Blue | #3B7DFD | 59, 125, 253 |
| Off-White | #F8F8F8 | 248, 248, 248 |
| Dark Gray | #333333 | 51, 51, 51 |
| Light Gray | #707070 | 112, 112, 112 |
| Extra Light | #9B9B9B | 155, 155, 155 |
| Stroke | #E5E5E5 | 229, 229, 229 |

### Step 3: Edit Master Slides

Go to **View > Edit Master Slides**

### Step 4: Set Default Text Styles

For each master slide:
- **Title font**: Calibre Semibold (fallback: Arial Bold)
- **Body font**: Calibre Regular (fallback: Arial)
- **Eyebrow labels**: Calibre Semibold, UPPERCASE, letter-spacing 0.1em

---

## Slide Dimensions

- **Width**: 960px (10 inches at 96 DPI)
- **Height**: 540px (5.625 inches at 96 DPI)
- **Aspect Ratio**: 16:9 widescreen
- **Margins**: 48-80px (0.5-0.83 inches)

---

## 20 Master Slide Layouts

### Layout 1: Title Dark

**Purpose**: Opening/closing slides with dark green background

| Element | Specification |
|---------|---------------|
| Background | #113A2D (Darkest Green) |
| Logo | White Leland logo, top-left, 48px from edges |
| Title | 52pt, Calibre Semibold, White, centered vertically |
| Subtitle | 20pt, Calibre Regular, #9B9B9B |
| Highlight text | #15B078 (Leland Green) |
| Footer | Coach name + joinleland.com, #9B9B9B, 14pt |
| Decorative | Radial gradient bottom-right (optional) |

**Placeholder positions**:
- Title: x=80, y=200, width=800, height=120
- Subtitle: x=80, y=340, width=800, height=40

---

### Layout 2: Section Divider

**Purpose**: Section breaks with part numbers

| Element | Specification |
|---------|---------------|
| Background | #15B078 (Leland Green) |
| Part label | 14pt, Calibre Semibold, White 70% opacity, UPPERCASE |
| Section title | 48pt, Calibre Semibold, White, centered |

**Placeholder positions**:
- Part label: centered, y=200
- Title: centered, y=240, width=800

---

### Layout 3: Agenda

**Purpose**: Session overview with split panel

| Element | Specification |
|---------|---------------|
| Left panel | 40% width, #185440 (Medium Green) |
| Left headline | 28pt, Calibre Semibold, White |
| Right area | 60% width, White background |
| List items | 16pt, Calibre Regular, numbered 01-05 |
| Dividers | Dotted line, #E5E5E5 |

**Panel dimensions**:
- Left: x=0, y=0, width=384, height=540
- Right: x=384, y=0, width=576, height=540

---

### Layout 4: Statement

**Purpose**: Bold statement slides for impact

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Statement | 40pt, Calibre Semibold, Black, centered |
| Highlight word | #15B078 (Leland Green) |
| Padding | 80px all sides |

---

### Layout 5: Question

**Purpose**: Interactive prompts for engagement

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Eyebrow | "QUESTION", 13pt, #15B078, UPPERCASE |
| Question text | 36pt, Calibre Semibold, Black |
| Icon | Question mark or thought bubble (optional) |

---

### Layout 6: Two Column

**Purpose**: 2-column bullet lists (6 items)

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Eyebrow | 13pt, #15B078, UPPERCASE |
| Title | 32pt, Calibre Semibold, Black |
| Columns | 2 columns, 24px gap |
| Bullets | Green "+" icons, 16pt |
| Body | 16pt, Calibre Regular, #333333 |

**Column widths**: Each 400px with 24px gap

---

### Layout 7: Content + Image

**Purpose**: Text left, image right

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Left side | Eyebrow → Title → Bullets |
| Right side | Image placeholder |
| Left width | 55% |
| Right width | 45% |
| Bullets | Green "+" icons |

---

### Layout 8: Three Cards

**Purpose**: Feature/profile grid

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Cards | 3 across, white background |
| Card border | 1px #E5E5E5 |
| Card corners | 12px radius |
| Card content | Image → Title → Description |
| Card padding | 20px |

**Card dimensions**: Each 280px wide, 24px gaps

---

### Layout 9: Stats Display

**Purpose**: Key metrics with large numbers

| Element | Specification |
|---------|---------------|
| Background | White |
| Numbers | 48pt, Calibre Semibold, #15B078 |
| Labels | 14pt, Calibre Medium, UPPERCASE, #707070 |
| Layout | 3-column grid |
| Alignment | Center each stat block |

---

### Layout 10: Timeline

**Purpose**: Numbered process steps

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Step circles | 32px diameter, #15B078, white numbers |
| Step titles | 16pt, Calibre Semibold, #333333 |
| Descriptions | 14pt, Calibre Regular, #707070 |
| Connector | 2px line, #E5E5E5 |

---

### Layout 11: Comparison

**Purpose**: Side-by-side options

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Column headers | 20pt, Calibre Semibold |
| Left header bg | #FB5A42 (Red) for "Don't" |
| Right header bg | #15B078 (Green) for "Do" |
| List items | 16pt, checkmarks or X icons |

---

### Layout 12: Quote

**Purpose**: Testimonials with attribution

| Element | Specification |
|---------|---------------|
| Background | White |
| Quote marks | 72pt, #15B078, top-left |
| Quote text | 28pt, Calibre Regular Italic, #333333 |
| Attribution | 16pt, Calibre Semibold, #707070 |
| Role/title | 14pt, Calibre Regular, #9B9B9B |

---

### Layout 13: Logo Grid

**Purpose**: Partner/company logos

| Element | Specification |
|---------|---------------|
| Background | White |
| Title | 24pt, Calibre Semibold, centered |
| Grid | 4x2 or 3x3 |
| Logos | Grayscale, centered in cells |
| Cell size | ~180px x 100px |

---

### Layout 14: Math Problem

**Purpose**: Question + solution walkthrough

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 (Off-White) |
| Left card | "Question" - white bg, border |
| Right area | "Solution" - numbered steps |
| Step numbers | Green circles with white numbers |
| Answer box | #15B078 background, white text |

**Layout**: 50/50 split or 45/55

---

### Layout 15: Framework

**Purpose**: Case interview structure / tree diagrams

| Element | Specification |
|---------|---------------|
| Background | White |
| Top box | #113A2D (Darkest Green), white text |
| Branch boxes | #15B078 or #185440, white text |
| Leaf boxes | #F8F8F8, gray text |
| Connectors | 2px lines, #E5E5E5 |

---

### Layout 16: Principles

**Purpose**: Numbered list with descriptions (5 items)

| Element | Specification |
|---------|---------------|
| Background | White |
| Grid | 2x3 (5 items + 1 highlighted) |
| Number | 24pt, #15B078 |
| Title | 18pt, Calibre Semibold, #333333 |
| Description | 14pt, Calibre Regular, #707070 |
| Card bg | #F8F8F8 |
| Highlight card | Green tint border |

---

### Layout 17: Chart

**Purpose**: Data visualization placeholder

| Element | Specification |
|---------|---------------|
| Background | White |
| Eyebrow | 13pt, #15B078, UPPERCASE |
| Title | 28pt, Calibre Semibold |
| Chart area | Centered, 700px wide |
| Legend | Below chart, 12pt |

---

### Layout 18: Milestones

**Purpose**: Achievement tiers / progress

| Element | Specification |
|---------|---------------|
| Background | #F8F8F8 |
| Milestone boxes | Vertical stack |
| Active state | #15B078 background |
| Inactive state | White with border |
| Icons | Checkmarks for completed |

---

### Layout 19: Team

**Purpose**: Photo grid with names/roles

| Element | Specification |
|---------|---------------|
| Background | White |
| Photos | Circular, 100px diameter |
| Names | 16pt, Calibre Semibold, #333333 |
| Roles | 14pt, Calibre Regular, #707070 |
| Grid | 4 across typical |

---

### Layout 20: Closing CTA

**Purpose**: Final call-to-action

| Element | Specification |
|---------|---------------|
| Background | #113A2D (Darkest Green) |
| Logo | White Leland logo, centered top |
| Headline | 44pt, Calibre Semibold, White |
| Subtext | 18pt, Calibre Regular, #9B9B9B |
| CTA button | #15B078 bg, white text, 8px radius |
| Footer | joinleland.com + @joinleland |

---

## Standard Footer (Add to All Layouts)

| Element | Specification |
|---------|---------------|
| Position | Bottom of slide, 40px from edge |
| Left | Gray compass logo (optional) |
| Right | "© 2026 JOINLELAND.COM" in #9B9B9B, 12pt |
| Divider | Thin line #E5E5E5 above footer (optional) |

---

## Export Instructions

### Export to PowerPoint

1. **File > Export To > PowerPoint**
2. Format: .pptx
3. Save as: `leland-multi-use-template.pptx`

### Verify Export

1. Open PPTX in Google Slides or PowerPoint
2. Check that layouts appear in slide master
3. Verify colors match
4. Note: Calibre font will fall back to Arial on systems without it installed

---

## Checklist

- [ ] Calibre font installed
- [ ] Theme colors defined
- [ ] All 20 master slides created
- [ ] Footer added to each layout
- [ ] Sample slide for each layout (in presentation)
- [ ] Saved as `leland-multi-use-template.key`
- [ ] Exported to `leland-multi-use-template.pptx`
- [ ] Tested in Google Slides

---

## File Output

| File | Location |
|------|----------|
| `leland-multi-use-template.key` | slide-templates/ |
| `leland-multi-use-template.pptx` | slide-templates/ |

