# Leland Brand Fonts

Place the following Calibre font files in this directory:

## Required Files

| File | Usage |
|------|-------|
| `Calibre-Regular.otf` | Body text, descriptions |
| `Calibre-Medium.otf` | Subheadings, labels |
| `Calibre-Semibold.otf` | Titles, headlines |
| `Calibre-Bold.otf` | Strong emphasis |
| `Calibre-RegularItalic.otf` | Emphasized body text |
| `Calibre-MediumItalic.otf` | Emphasized subheadings |

## Obtaining Calibre

Calibre is a commercial typeface by Klim Type Foundry. If you don't have access to Calibre:

1. **Check your organization's font library** - Leland may have a license
2. **Use Inter as a fallback** - Free Google Font that works well as a substitute
3. **Contact design team** - They may be able to provide the files

## Fallback Fonts

If Calibre is not available, the templates will use:
- **Inter** (Google Fonts) - Primary fallback
- **Arial** - System fallback

## Installation

1. Copy font files to this directory
2. Run the PPTX generation script - it will embed fonts automatically
3. For HTML templates, fonts will be loaded via CSS @font-face rules
