#!/bin/bash
# Export Reveal.js slides to PDF using decktape
# Usage: ./export-pdf.sh [input-url] [output-file]
#
# Requires: Node.js, npx, and a running local server
# Start server: python3 -m http.server 8080
#
# Examples:
#   ./export-pdf.sh                                    # exports template.html
#   ./export-pdf.sh http://localhost:8080/my-deck.html my-deck.pdf

URL="${1:-http://localhost:8080/template.html}"
OUTPUT="${2:-$(basename "${URL%.html}").pdf}"

echo "Exporting: $URL → $OUTPUT"
npx decktape reveal --size 960x540 "$URL" "$OUTPUT"
echo "Done: $OUTPUT"
