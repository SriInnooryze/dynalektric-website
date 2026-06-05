# Dynalektric Website Handover

## Overview

This repository contains two complete website design variants created for Dynalektric, an engineering-led manufacturer specializing in electrical, power electronics, magnetics, and industrial control solutions.

Both versions contain the same business content, navigation structure, and image assets while providing different visual design approaches.

---

# Website Variants

## 1. Industrial Theme (Primary Version)

**Entry File**

```text
index.html
```

### Design Characteristics

* Industrial manufacturing aesthetic
* Warm off-white background
* Dark typography
* Orange accent color
* Product-focused visual presentation

### Pages

* Home
* About
* Products & Solutions
* Innovation Portfolio
* Industries & Applications
* Export
* Contact

---

## 2. Corporate Theme (Alternative Version)

**Entry File**

```text
dynalektric_corporate_theme.html
```

### Design Characteristics

* Corporate enterprise aesthetic
* Light grey background
* Navy blue typography
* Blue accent color
* Professional B2B presentation

### Pages

* Home
* About
* Products & Solutions
* Innovation Portfolio
* Industries & Applications
* Export
* Contact

---

# Project Structure

```text
Dynalektric Website Handover
│
├── index.html
├── dynalektric_corporate_theme.html
├── dynalektric_corporate_theme_src.html
├── Dynalektric Standalone.html
├── CLAUDE.md
│
├── src/
│   ├── assets/
│   ├── page-home.jsx
│   ├── page-about.jsx
│   ├── page-products.jsx
│   ├── page-rnd.jsx
│   ├── page-industries.jsx
│   ├── page-export.jsx
│   ├── page-contact.jsx
│   ├── shared.jsx
│   └── image-slot.js
│
├── theme-corporate/
├── vendor/
└── uploads/
```

---

# Image Assets

The following assets are used across both website variants:

| Image                 | Purpose                   |
| --------------------- | ------------------------- |
| logo.png              | Navigation Logo           |
| facility-teaser.jpg   | Home Hero Banner          |
| facility-wide.jpg     | About Facility Overview   |
| winding-floor.jpg     | Manufacturing Section     |
| test-bay.jpg          | Testing Facility          |
| rnd-bench.jpg         | Innovation & R&D          |
| magnetics.jpg         | Magnetics Product         |
| control-panel.jpg     | Control Panel Assemblies  |
| power-electronics.jpg | Power Electronics Systems |
| cross-segment.jpg     | Cross-Segment Solutions   |

---

# Running the Project

## Option 1: Open Directly

Open either file in a browser:

```text
index.html
```

or

```text
dynalektric_corporate_theme.html
```

---

## Option 2: Local Development Server

Using VS Code Live Server:

```text
Right Click → Open with Live Server
```

or

```bash
npx serve .
```

Then open:

```text
http://localhost:3000
```

or

```text
http://localhost:8080
```

---

# Development Notes

* Industrial Theme serves as the primary implementation.
* Corporate Theme is an alternate design variant.
* Both versions share the same content and imagery.
* Product and facility images are located in `src/assets`.
* Navigation and page structures are synchronized between both themes.

---

# Technologies Used

* HTML5
* CSS3
* JavaScript
* React-style JSX Components
* Responsive Layout Design

---

# Handover Notes

This repository contains:

* Complete website source code
* Industrial Theme variant
* Corporate Theme variant
* Product imagery and facility visuals
* Standalone preview files

Both themes are ready for stakeholder review and further development.

