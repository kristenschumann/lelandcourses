# Keynote & PowerPoint Template Guide

A reference for creating Leland presentations using Keynote or PowerPoint. For brand colors, typography, and general design rules, see `../../leland-design-system.md`.

---

## Primary Template Files

| File | Purpose |
|------|---------|
| `leland-multi-use-template.key` | Primary editable template (Keynote) |
| `leland-multi-use-template.pptx` | Export for PowerPoint/Google Slides |

---

## How to Use

1. **Open the template** in Keynote
2. **Add new slides** using the slide layouts (View > Navigator, then Insert > Choose Slide Layout)
3. **Select a layout** from the 20 available master slides
4. **Replace placeholder text** with your content
5. **Export when done**: File > Export To > PowerPoint (.pptx) or PDF

---

## Available Layouts (20 Total)

| # | Layout | Best For |
|---|--------|----------|
| 1 | Title Dark | Opening slides, course titles |
| 2 | Section Divider | Chapter/part breaks |
| 3 | Agenda | Session overview, table of contents |
| 4 | Statement | Key takeaways, bold messages |
| 5 | Question | Engagement prompts, quiz questions |
| 6 | Two Column | Side-by-side lists, pros/cons |
| 7 | Content + Image | Text with supporting visual |
| 8 | Three Cards | Features, profiles, options |
| 9 | Stats Display | Key metrics, numbers |
| 10 | Timeline | Process steps, chronology |
| 11 | Comparison | Do vs Don't, before/after |
| 12 | Quote | Testimonials, featured quotes |
| 13 | Logo Grid | Partners, clients, schools |
| 14 | Math Problem | GRE/GMAT practice problems |
| 15 | Framework | Case trees, org charts |
| 16 | Principles | Numbered concepts with details |
| 17 | Chart | Data visualization slides |
| 18 | Milestones | Progress indicators, tiers |
| 19 | Team | Staff photos and bios |
| 20 | Closing CTA | Final call-to-action |

---

## Font Requirement

The template uses **Calibre** as the primary font. Install from:
`_design/fonts/Calibre-OTF/`

If Calibre is not installed, text will fall back to Arial.

---

## Detailed Specifications

See `slide-templates/KEYNOTE-TEMPLATE-SPECS.md` for exact dimensions, colors, and positioning for each layout.

---

## Generating Slides from YAML

Use the `generate_slides.py` script with YAML content files:

```bash
python scripts/generate_slides.py content.yaml output.pptx
```

### Token Syntax for Inline Colors

In YAML content, use tokens for colored text:

| Token | Color | Usage |
|-------|-------|-------|
| `{{neg:-5}}` | Red (#FB5A42) | Negative numbers |
| `{{ans:9}}` | Green (#15B078) | Correct answers |
| `{{hl:text}}` | Green (#15B078) | Emphasized text |

Example:
```yaml
problem: "{{neg:-5}} + ({{neg:-6}}) = {{ans:-11}}"
```

---

## File Locations

### Templates
- **Multi-Use Template (Keynote)**: `slide-templates/leland-multi-use-template.key` - 20 master slide layouts
- **Multi-Use Template (PPTX)**: `slide-templates/leland-multi-use-template.pptx` - Export for wider compatibility
- **Template Specifications**: `slide-templates/KEYNOTE-TEMPLATE-SPECS.md` - Detailed build specs
- **Legacy PPTX Template**: `slide-templates/leland-master-template.pptx` - Previous 12-layout version

### Scripts
- **Generate Slides**: `scripts/generate_slides.py` - Create PPTX from YAML content
- **Create Template**: `scripts/create_master_template.py` - Regenerate master template
- **Convert Logos**: `scripts/convert_logos.py` - SVG to PNG conversion

### Assets
- **Fonts**: `fonts/` directory (Calibre family - see fonts/README.md)
- **Logos**: `logos/` directory
  - SVG source files: `leland-logo-{white,green,gray}.svg`
  - Compass only: `leland-compass-{white,green,gray}.svg`
  - PNG exports: Convert SVGs using scripts/convert_logos.py

---

*For HTML-based presentations, see `../revealjs/revealjs-guide.md`.*
