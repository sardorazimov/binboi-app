# Visual Components

This folder contains the shared visual building blocks for the Binboi frontend.

Use these components when a page needs a premium dark shell, framed panel, controlled section lighting, or reusable CTA/hero composition.

Components:

- `surface-shell.tsx`
Purpose: section-level framed shell that separates the dark surface from optional accent lighting.

- `panel-frame.tsx`
Purpose: reusable panel frame primitive for cards, tables, and dashboard shells.

- `section-glow.tsx`
Purpose: subtle localized blue/orange lighting layer that can be added without muddy full-surface overlays.

- `accent-orb.tsx`
Purpose: small premium orb accent for logos, status marks, and visual punctuation.

- `hero-stage.tsx`
Purpose: reusable hero layout that pairs narrative copy with a framed stage panel.

- `card-surface.tsx`
Purpose: smaller inset card surface for nested content blocks inside larger shells.

- `cta-band.tsx`
Purpose: reusable CTA wrapper for split layout call-to-action sections.

Guidelines:

- Start with `PanelFrame` or `SurfaceShell` for the base surface.
- Add `SectionGlow` only when a section benefits from controlled accent light.
- Prefer `CardSurface` for nested blocks instead of rewriting inset card classes.
- Use `AccentOrb` for small blue/dual accent moments instead of custom radial spans.

