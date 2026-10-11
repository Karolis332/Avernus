---
name: Booklet PDF rendering pipeline
description: How to convert styled multi-page HTML booklets to print-ready PDFs on this Windows machine
type: reference
originSessionId: 00b6dc82-24db-4cdc-803b-0a1f287b229d
---
Pipeline that works on Karolis's machine (no weasyprint, no playwright, no wkhtmltopdf):

1. **Renderer**: Chrome headless at `C:\Program Files\Google\Chrome\Application\chrome.exe` (Edge at `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` also works).
   ```
   chrome.exe --headless=new --disable-gpu --no-sandbox --no-pdf-header-footer --no-margins \
     --print-to-pdf="out.pdf" --print-to-pdf-no-header "file:///C:/path/to/in.html"
   ```

2. **Aggressive print CSS is required** for booklets designed for screen (the kind with styled `.page` divs at max-width 820px and no height limit). Without it, each `.page` overflows A4 producing half-empty spillover pages. Required rules inside `@media print`:
   - `@page { size: A4 portrait; margin: 0; }`
   - `.page { width:210mm !important; height:297mm !important; overflow:hidden !important; page-break-after:always !important; padding:10mm 11mm 12mm !important; }`
   - Shrink fonts globally (`body { font-size: 9pt }`) and per-element overrides for `.stat-hex`, `.combat-cell`, `.attack-table`, `.lvl-banner`, etc.

3. **Image embedding**: when injecting portraits into HTML for PDF render, use base64 data URIs and explicit `max-width:170mm; max-height:240mm` — NOT `vh` units (broken in print).

4. **Verifying output**: install pymupdf (`pip install pymupdf`) and render sample pages to PNG via `doc[i].get_pixmap(dpi=110).save(...)`. Use `len(doc)` not `file` command for page count — `file` reports the leaf-tree /Count which can lie. Use pypdf as alternative.

5. **D&D 5e fillable sheets**: all official WotC/D&D Beyond hosted URLs are dead/gated (403/404 or HTML stubs). Build the sheet from scratch as HTML and render to PDF — Chrome's print preserves layout but does NOT produce AcroForm fillable fields (it's print-to-fill on paper). For real AcroForm PDFs, would need different tooling.

**How to apply:** When asked to "make a PDF" from any booklet/character sheet/handout HTML, use this exact pipeline. Don't try weasyprint/playwright/pandoc — none are installed and adding them is heavier than just using Chrome.
