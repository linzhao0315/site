---
name: kiva-design-system
description: Kiva design system token reference and usage rules. Use when building any Kiva UI, selecting tokens, resolving token questions, or generating components that must align with Kiva's design language. Triggers on: kiva tokens, design system, color theme, typography scale, font, spacing, radius, elevation, shadow, grid, button spec, tailwind.
user-invocable: true
argument-hint: "[question or component to build]"
---

Kiva's design system uses a 3-tier variable architecture (Global > Alias > Mapped) exported from Figma in DTCG format.

## Quick Reference: Building a Component

1. Confirm breakpoint: mobile (sm), tablet (md), or desktop (lg, default)
2. Confirm theme: default, green-dark, green-light, marigold, or stone
3. Typography -> [reference/typography.md](reference/typography.md)
4. Colors -> [reference/color.md](reference/color.md) (Mapped first, then Alias)
5. Spacing -> [reference/spacing-layout.md](reference/spacing-layout.md)
6. Radius/elevation/border -> [reference/radius-elevation-border.md](reference/radius-elevation-border.md)
7. Component specs -> [reference/components.md](reference/components.md)
8. **Cross-check**: Every visual property must trace to a named token. Zero hardcoded values.

Missing token? **Stop and flag it** rather than inventing a value.

## Architecture

```
Global (raw values) -> Alias (semantic, mode-switchable) -> Mapped (component-level binding)
```

**Rule**: Always reference Alias or Mapped tokens in UI code. Never Global directly.

## Token Selection

1. **Identify semantic intent**: "What is this element's role?" Map to Alias token. (`link text -> text.action`, `card bg -> background.primary`)
2. **Check Mapped tokens**: Known components (buttons) have Mapped tokens that override Alias.
3. **Never hardcode**: No raw hex, no Global-tier names in UI code. Missing? Flag + propose closest match.
4. **Responsive**: Typography/spacing change across breakpoints. Always specify which.

## Tailwind Integration

When writing Tailwind classes with the Kiva preset, load [reference/tailwind.md](reference/tailwind.md) for the full mapping.

Critical reminders:
- All utilities carry the `tw-` prefix (`tw-flex`, not `flex`)
- Spacing is 8px base (`tw-p-4` = 32px, not 16px)
- No `tw-text-lg` / `tw-leading-*` / `tw-tracking-*` (disabled plugins)
- No `tw-font-bold` (max is `tw-font-medium`, 500)
- `tw-rounded` = 16px (not a small radius)
- Only `md:`, `lg:`, `xl:` breakpoints (no `sm:`)

## Edge Cases

| Case | Rule |
|------|------|
| Theme switching | Swap only Alias-Color mode. Typography/spacing stay same. |
| Dual-role elements | Card uses `background.primary`; CTA inside uses `background.action` |
| Disabled states | Use dedicated disabled tokens (30% opacity baked in), NOT manual opacity |
| Token ambiguity | Pick more specific. Card heading = `title` (Medium), not `subheadline` (Book) |
| Cross-theme contrast | Dark themes invert primary/inverse. Verify text-on-background in `green-dark` |
| Tablet | No tablet-specific component tokens. Use desktop (lg) unless spacing says otherwise |
| Accessibility | Check [color.md](reference/color.md) accessibility section for dangerous pairings per theme |

## Common Mistakes

| Mistake | Correct |
|---------|---------|
| `text.secondary` for button labels | `text.secondary-button` |
| `border.secondary` for button outlines | `border.secondary-button` |
| `background.action` for secondary button | `background.action-secondary` |
| subheadline for card heading | title (Medium) for card heading |
| display for page headings | display = marketing heroes; headline 1 = pages |
| Desktop spacing on mobile | Check mobile (sm) values |
| `text.primary` for links | `text.action` |
| Hardcoded 16px for radius | Use `base` token |
| `tw-text-lg` for font sizing | Use `tw-text-h2`, `tw-text-body` etc |
| `tw-font-bold` for emphasis | Use `tw-font-medium` (500 max) |
| `tw-p-4` expecting 16px | It's 32px in Kiva preset |
| `sm:` breakpoint | Does not exist; mobile is unprefixed |

## Reference Modules

| File | Content |
|------|---------|
| [reference/color.md](reference/color.md) | 12 text, 14 bg, 12 border tokens, 5 themes, primitives, accessibility, discrepancies |
| [reference/typography.md](reference/typography.md) | 10 type styles, 2 families, responsive breakpoints, Tailwind text style mapping |
| [reference/spacing-layout.md](reference/spacing-layout.md) | Structure + component spacing, 4-breakpoint grid, Tailwind spacing scale |
| [reference/radius-elevation-border.md](reference/radius-elevation-border.md) | Border radius scale, shadow system, stroke weights, concentric formula |
| [reference/components.md](reference/components.md) | Button full-state specs with Tailwind classes |
| [reference/tailwind.md](reference/tailwind.md) | Complete Kiva Tailwind preset deviations from stock Tailwind |
| [reference/figma-to-skill-process.md](reference/figma-to-skill-process.md) | Reusable process for extracting new Figma sections into skill files |

## Source of Truth

- **Figma**: `TPmBUB4olYPMF6glEhBGDG` (Ecosystem 2026 WIP)
- **JSON exports**: `kiva/design-system/DS jsons copy/`
- **Code tokens**: `@kiva/kv-tokens/tokens/core/*.json`
- **Tailwind config**: `@kiva/kv-tokens/configs/tailwind.config.js`
- **Last verified**: 2026-05-26

If mismatch suspected, re-read JSON or use Figma MCP (`get_variable_defs`).
