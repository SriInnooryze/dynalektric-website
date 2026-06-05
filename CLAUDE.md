# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **static HTML + React prototype** for the Dynalektric B2B industrial website — a supplier qualification and RFQ platform targeting European OEMs, EPC companies, utilities, railways, and industrial buyers. It was developed in Claude Design (the "omelette" platform) and is being handed over for continuation and refinement.

The approved design direction is Prototype 4: premium white/bone background (`#F6F4EF`), teal/navy accent system replaced with copper (`#B8602C`) + ink-blue (`#1F3A5F`), editorial spacing, and engineering-inspired visual cues. **Do not redesign — refine only what is needed.**

## Running the Prototype

There is **no build step**. JSX is transpiled in-browser via Babel Standalone.

To run, serve the project root over HTTP (not file://):

```
npx serve .
# or
python -m http.server 8080
```

Then open `http://localhost:8080/index.html`. The `src/` JSX files are loaded via `<script type="text/babel" src="...">` and won't work over `file://` due to CORS.

The file `Dynalektric Standalone.html` (and `uploads/Dynalektric _Standalone_ Final.html`) are fully self-contained exports with all fonts, CSS, and JS inlined — these open directly in a browser without a server.

## Architecture

### How the SPA works

`index.html` is the shell. It embeds all CSS inline and loads scripts in this exact order:

1. `src/image-slot.js` — custom web component (no dependencies)
2. React 18 + ReactDOM (CDN)
3. Babel Standalone (CDN, transpiles JSX at runtime)
4. `src/tweaks-panel.jsx` — exposes `useTweaks`, `TweaksPanel`, and all `Tweak*` controls to `window`
5. `src/shared.jsx` — exposes data constants and shared React components to `window`
6. `src/page-*.jsx` — each page component, depends on `window` globals from shared.jsx
7. `src/app.jsx` — mounts `ReactDOM.createRoot('#app').render(<App />)`

**All inter-file sharing is via `window`** (e.g., `Object.assign(window, { PRODUCTS, Footer, ... })`). There is no module system. Load order is critical.

### Routing

Client-side only, via `React.useState('home')` in `app.jsx`. No URL changes. `navigate(pageId, focusId)` scrolls to top and renders the new page. The `focusId` prop lets a page know to highlight a specific product or section on mount.

### Key data — all in `src/shared.jsx`

- `PRODUCTS` — 4 product groups (Magnetics, Control Panel Assemblies, Power Electronics Systems, Cross-Segment Solutions), each with subcategories, specs placeholders, and industry mappings
- `SUBCAT_DETAIL` — keyed by code (e.g., `'01.1'`), contains per-subcategory description, applications, spec rows, and industry links
- `INDUSTRIES` — 6 industries (Railway & Traction, Renewable Sectors, Power & Utilities, Heavy Industries, Material Handling & Warehousing, Data Centers)
- `CASE_STUDIES` — 6 anonymous application examples (no client or project names)
- `STATS`, `CERTIFICATIONS`, `HERO_HEADLINES`, `QUALIFICATION` — supporting copy

### Design tokens — CSS custom properties in `index.html`

```css
--bg: #F6F4EF          /* bone-white page background */
--ink: #0E1116         /* primary text */
--accent: #B8602C      /* copper — primary CTA, numbered labels */
--accent-2: #1F3A5F    /* ink-blue — secondary accents */
--container-max: 1360px
--gutter: 64px         /* 48px at <1200px, 24px at <768px */
--section-y: 120px     /* 80px at <768px or [data-density="compact"] */
```

### Tweaks panel

`TWEAK_DEFAULTS` in `app.jsx` (between `/*EDITMODE-BEGIN*/` and `/*EDITMODE-END*/`) stores the live design settings. The panel offers: accent palette pair, type pairing (Söhne+Inter default), hero headline variant, background texture, and spacing density. These are prototype-only controls, not production settings.

### Image slots

`<image-slot id="...">` is a custom web component that accepts drag-and-drop images. Dropped images are encoded as WebP data URLs and persisted to `.image-slots.state.json`. This file should not be committed — it is a local design sidecar.

## Navigation and Pages

Navigation order (as per approved brief):

| Route ID     | Label                       | File                     |
|--------------|-----------------------------|--------------------------|
| `home`       | Home                        | `src/page-home.jsx`      |
| `about`      | About                       | `src/page-about.jsx`     |
| `products`   | Products & Solutions        | `src/page-products.jsx`  |
| `rnd`        | Innovation Portfolio        | `src/page-rnd.jsx`       |
| `industries` | Industries & Applications   | `src/page-industries.jsx`|
| `export`     | Export                      | `src/page-export.jsx`    |
| `contact`    | Contact                     | `src/page-contact.jsx`   |

## Copywriting Rules

These are locked requirements from the client brief:

- No em dashes anywhere. Use commas, periods, or colons instead.
- Primary CTA label: **Submit RFQ**. Secondary: **Send Enquiry** or **Contact Sales**.
- No WhatsApp CTA, button, icon, or floating action — anywhere.
- No calculator or estimator on the R&D/Innovation page.
- Avoid: "best in class", "world class", "industry leading", "cutting edge", "global leader", "one-stop solution", "revolutionary", "future-proof", "unmatched", "superior".
- Use qualifying phrases where appropriate: "where applicable", "based on product category", "subject to engineering review".
- Write for procurement, SCM, and engineering buyers — practical and specific.

## SEO Requirements

- One `<h1>` per page. Sections use `<h2>`. Subsections use `<h3>`.
- Do not use heading tags purely for styling.
- `updateDocumentMeta(pageId)` in `app.jsx` updates `<title>`, meta description, OG tags, and canonical URL on every route change. Page metadata is in the `PAGE_META` constant.

## Known Issues to Check

Before marking any product-page work complete:

- Products page must have no horizontal scroll at any viewport width
- All product subcategories must be visible and interactive (clickable, showing detail panel)
- No content should be truncated or hidden inside a collapsed element without user action
- Mobile layout must be clean and usable (test at 375px and 768px widths)
