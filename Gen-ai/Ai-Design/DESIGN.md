---
name: Velvet Dating
description: Where Intimacy Meets Elegance.
colors:
  primary: "#A32136"
  accent-gold: "#D4B254"
  surface-dark: "#161616"
  surface-card: "#222222"
  text-primary: "#FFFFFF"
  text-muted: "#A0A0A0"
typography:
  display:
    fontFamily: "Playfair Display, serif"
    fontWeight: 600
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
rounded:
  sm: "4px"
  md: "8px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    padding: "12px 32px"
---

# Design System: Velvet Dating

## 1. Overview

**Creative North Star: "The Exclusive Enclave"**

A highly curated, premium environment for discerning individuals. The design philosophy is rooted in elegance, intimacy, and restraint. It leverages a deep, immersive dark mode to make high-quality photography and gold/burgundy accents stand out. The interface should feel like stepping into a private, exclusive members-only club—quiet, sophisticated, and secure. We explicitly reject bright, loud, gamified UI or generic SaaS patterns.

**Key Characteristics:**
- Deep, immersive dark surfaces.
- High-contrast elegant serif typography for headings.
- Restrained use of rich color (burgundy and gold).
- Premium, photography-forward layouts.

## 2. Colors

The palette is anchored in deep dark tones, using rich velvet crimson and gold sparingly for interaction and hierarchy.

### Primary
- **Velvet Crimson** (#A32136): Used for primary calls to action (like the "Apply to Join" button). It commands attention but remains sophisticated.

### Secondary
- **Enclave Gold** (#D4B254): Used for refined highlights, verified badges, and subtle section headers.

### Neutral
- **Deep Surface** (#161616): The primary background color. Never pure black, but a very dark, rich charcoal.
- **Card Surface** (#222222): Elevated surfaces for profiles and content cards.
- **Primary Ink** (#FFFFFF): High-contrast white for primary reading.
- **Muted Ink** (#A0A0A0): For secondary text and subtle borders.

### Named Rules
**The Restrained Glow Rule.** The deep dark surface is the canvas. Accent colors (crimson and gold) must never compete; use them on ≤10% of the screen.

## 3. Typography

**Display Font:** Playfair Display (with serif fallback)
**Body Font:** Inter (with sans-serif fallback)
**Label/Mono Font:** Inter (uppercase, wide tracking)

**Character:** The pairing creates a deliberate tension between timeless elegance (serif display) and modern, legible utility (sans-serif body).

### Hierarchy
- **Display** (600, clamp(2.5rem, 5vw, 4rem), 1.1): Hero headlines ("Where Intimacy Meets Elegance").
- **Headline** (600, 2rem, 1.2): Section titles ("The Velvet Society").
- **Title** (500, 1.25rem, 1.3): Card titles and names.
- **Body** (400, 1rem, 1.5): Standard prose and descriptions.
- **Label** (500, 0.75rem, 0.1em tracking, uppercase): Eyebrows, small CTA text ("AN EXCLUSIVE ENCLAVE").

### Named Rules
**The Editorial Serif Rule.** Serif is strictly reserved for display and major headings. All functional text, buttons, and metadata must use the clean sans-serif for legibility.

## 4. Elevation

The system uses subtle tonal layering rather than heavy drop shadows. Depth is achieved by lightening the surface color for cards against the deep background, often paired with a very subtle 1px border for crispness.

### Shadow Vocabulary
- **Card Border** (`border: 1px solid rgba(255,255,255,0.08)`): Creates definition without relying on shadow in dark mode.

### Named Rules
**The Shadowless Dark Rule.** Avoid heavy box-shadows in dark mode; use surface lightness (tonal elevation) and faint borders to separate overlapping elements.

## 5. Components

### Buttons
- **Shape:** Full pill (9999px radius) for primary CTAs, giving a polished, tactile feel.
- **Primary:** Velvet Crimson background, white text, 12px 32px padding.
- **Hover / Focus:** Slight brightness increase on background, smooth ease-out transition.
- **Ghost:** Gold text, transparent background, used for secondary actions like "Sign In" with a delicate border.

### Cards / Containers
- **Corner Style:** 8px radius (subtle rounding, not overly playful).
- **Background:** Card Surface (#222222).
- **Border:** 1px solid rgba(255,255,255,0.08).
- **Internal Padding:** 24px.

### Navigation
- **Style:** Transparent background, white sans-serif links, gold active states.

## 6. Do's and Don'ts

### Do:
- **Do** use Playfair Display (or similar elegant serif) for large, impactful headlines.
- **Do** ensure high-quality photography takes center stage, bleeding to the edges of cards.
- **Do** use uppercase sans-serif with wide tracking for small eyebrow labels.

### Don't:
- **Don't** use pure black (`#000000`) for backgrounds; always use a rich dark charcoal.
- **Don't** use bright, neon gradients or glassmorphism.
- **Don't** use heavily rounded corners (greater than 12px) on content cards.
- **Don't** use side-stripe borders as colored accents on cards.
