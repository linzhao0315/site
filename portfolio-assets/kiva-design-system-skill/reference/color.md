# Color Tokens (Alias - Color)

## 5 Theme Modes

| Mode | Primary BG | Primary Text | Brand Accent | Character |
|------|-----------|-------------|-------------|-----------|
| default | #FFFFFF | #223829 | #276A43 eco-green/3 | Standard, white base |
| green-light | #EDF4F1 | #223829 | #276A43 | Eco-tinted, warm green base |
| green-dark | #223829 | #EDF4F1 | #2AA967 | Dark mode, inverted |
| marigold | #F8F2E6 | #593207 | #996210 | Warm/caution theme |
| stone | #F3F1EF | #2E271E | #2E271E | Neutral, muted |

### Theme Names: Figma vs Code

| Figma name | Code name | Notes |
|-----------|-----------|-------|
| Default | `DEFAULT` | |
| Green Light | `green-light` | |
| Green Dark | `green-dark` | |
| Marigold | `marigold-light` | Code adds `-light` suffix |
| Stone Light | `stone-light` | |

Legacy code themes (`dark`, `dark-green`, `dark-mint`, `dark-stone`, `mint`, `stone-dark`) predate the 5-theme system. Do not use for new work.

## Primitive Palettes

Components should never reach past the semantic layer into primitives. Use only when defining new semantic tokens.

| Family | Step | Hex | | Family | Step | Hex |
|--------|------|-----|-|--------|------|-----|
| **eco-green** | 1 | #EDF4F1 | | **stone** | 1 | #F3F1EF |
| | 2 | #78C79F | | | default | #DFD0BC |
| | default | #2AA967 | | | 2 | #AA9E8D |
| | 3 | #276A43 | | | 3 | #635544 |
| | 4 | #223829 | | | 4 | #2E271E |
| **marigold** | 1 | #F8F2E6 | | **gray** | 50 | #FAFAFA |
| | 2 | #F8CD69 | | | 100 | #F5F5F5 |
| | default | #F4B539 | | | 200 | #E0E0E0 |
| | 3 | #996210 | | | 300 | #C4C4C4 |
| | 4 | #593207 | | | 400 | #9E9E9E |
| **desert-rose** | 1 | #F9F0EF | | | 500 | #757575 |
| | 2 | #E0988D | | | 600 | #505050 |
| | default | #C45F4F | | | 700 | #454545 |
| | 3 | #A24536 | | | 800 | #212121 |
| | 4 | #5C2A22 | | **neutral** | white | #FFFFFF |
| | | | | | black | #000000 |

Note: stone family uses out-of-order step naming (`1`, `default`, `2`, `3`, `4`). This is intentional.

Figma label typo: eco-green/2 panel shows `#C7EDD7` but actual fill is `#78C79F`. Use `#78C79F`.

## Text Colors (12 tokens)

| Token | Default Hex | Usage | Scope |
|-------|-------------|-------|-------|
| text.primary | #223829 | Body text, titles, headlines, primary icons | ALL_SCOPES |
| text.primary-inverse | #EDF4F1 | Text on dark backgrounds and primary buttons | TEXT_FILL |
| text.secondary | #505050 | Subtitles, metadata, placeholder text | TEXT_FILL |
| text.secondary-button | #212121 | Secondary button label text | TEXT_FILL |
| text.tertiary | #757575 | Hints, non-essential decorative text | TEXT_FILL |
| text.action | #276A43 | Links, clickable labels, active nav items | TEXT_FILL |
| text.action-highlight | #223829 | Link hover/pressed state | TEXT_FILL |
| text.action-disabled | #212121 30% | Disabled button/link text | TEXT_FILL |
| text.caution | #593207 | Warning messages, status labels | TEXT_FILL |
| text.caution-highlight | #996210 | Warning hover state | TEXT_FILL |
| text.danger | #5C2A22 | Error messages, critical alerts | TEXT_FILL |
| text.danger-highlight | #A24536 | Error hover state | TEXT_FILL |

## Background Colors (14 tokens)

| Token | Default Hex | Usage |
|-------|-------------|-------|
| background.primary | #FFFFFF | Main page surface |
| background.primary-inverse | #223829 | Dark headers, hero cards, sidebars |
| background.secondary | #EDF4F1 | Section backgrounds, form inputs, card differentiation |
| background.tertiary | #C4C4C4 | Progress bar tracks, disabled surfaces (component-level only) |
| background.action | #276A43 | Primary button default |
| background.action-highlight | #223829 | Primary button hover |
| background.action-secondary | #FFFFFF | Secondary button default |
| background.action-secondary-highlight | #EDF4F1 | Secondary button hover |
| background.primary-disabled | #276A43 30% | Disabled primary button |
| background.caution | #F8CD69 | Warning banners, alert callouts |
| background.caution-highlight | #F8F2E6 | Warning hover state |
| background.danger | #E0988D | Error banners, invalid states |
| background.danger-highlight | #F9F0EF | Danger hover state |

## Border Colors (12 tokens)

| Token | Default Hex | Usage |
|-------|-------------|-------|
| border.primary | #505050 | Component outlines, input borders, strong dividers |
| border.primary-inverse | #FFFFFF | Borders on dark surfaces |
| border.secondary | #757575 | Card borders, table dividers, secondary outlines |
| border.secondary-button | #212121 | Secondary button outline stroke |
| border.secondary-disabled | #212121 30% | Disabled secondary button border |
| border.tertiary | #C4C4C4 | Low-emphasis decorative lines |
| border.action | #276A43 | Focus rings, selection borders, brand outlines |
| border.action-highlight | #223829 | Brand border hover state |
| border.caution | #F8CD69 | Warning banner borders |
| border.caution-highlight | #F8F2E6 | Warning border hover |
| border.danger | #E0988D | Error input borders, alert containers |
| border.danger-highlight | #F9F0EF | Error border hover |

## Other Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| heading-underline.primary | #2AA967 | Decorative underline beneath main titles |
| shadow.default | #000 8% | Card/container resting state shadows |
| shadow.hover | #000 16% | Elevated hover state shadows |
| shadow.click-active | #000 8% | Pressed state (push-down effect) |

## Disabled State Pattern

Disabled tokens are an existing primitive at reduced opacity, not a separate color:
- `text/action-disabled` = `#212121` at 30%
- `background/primary-disabled` = `#276A43` at 30%
- `border/secondary-disabled` = `#212121` at 30%

## Accessibility (WCAG 2.1)

| Badge | Contrast Ratio | Safe for |
|-------|---------------|----------|
| **Pass** | >= 7:1 (AA + AAA) | All text, all sizes |
| **AA only** | 4.5:1 - 7:1 | Normal body text; not for extended reading at small sizes |
| **Large only** | 3:1 - 4.5:1 | Large text (>= 18pt or >= 14pt bold), icons only |
| **Fail** | < 4.5:1 | Non-text decorative use only |

### Dangerous Pairings (per theme)

| Theme | Pairing | Ratio | Rating | Rule |
|-------|---------|-------|--------|------|
| Default | text.tertiary on background.secondary | 4.1:1 | Fail | Do not use for readable text |
| Default | text.tertiary on background.tertiary | 2.6:1 | Fail | Do not use for readable text |
| Green Dark | text.primary on background.tertiary | 1.5:1 | Fail | Must never be used |
| Marigold | text.tertiary on body surfaces | varies | Large only / Fail | Keep tertiary off Marigold surfaces |
| Stone Light | text.tertiary on background.primary | varies | Large only | Not for body copy |
| Stone Light | text.tertiary on background.tertiary | varies | Fail | Do not use |

Alert tokens (caution, danger) pass AA on their paired alert backgrounds across all themes.

### Theme Inheritance

- **Green Light** inherits Default's text/action/caution accessibility ratings
- **Alert tokens** are defined on Default only, used unchanged across all themes
- Dark themes invert primary/inverse; verify text-on-background in `green-dark`

## Tailwind Color Mapping

Themable: `tw-text-{slot}`, `tw-bg-{slot}`, `tw-border-{slot}`, `tw-divide-{slot}`, `tw-ring-{slot}`
Static: `tw-bg-eco-green-3`, `tw-text-marigold-DEFAULT`, `tw-bg-gray-100` etc.

See [tailwind.md](tailwind.md) for full mapping details.

## Figma vs Code Discrepancies

### Tokens in Figma but not yet shipped in code:
- `text/action-disabled` (all themes)
- `background/action-secondary`, `background/action-secondary-highlight`, `background/primary-disabled` (all themes except Green Light)
- `border/secondary-disabled`, `border/tertiary` (Green Dark, Marigold, Stone Light)
- `text/secondary`, `text/tertiary`, `background/tertiary`, `border/tertiary` (Green Dark, Marigold, Stone Light)

### Other gaps:
- `heading-underline/primary` only defined on Default, Marigold, Stone Light; other themes fall back to parent
- Shadow tokens (`shadow/default`, `shadow/hover`, `shadow/click-active`) have no code entry yet; `boxShadow` in tailwind.config.js is hardcoded `rgb(0 0 0 / 0.08)`

These are additive (non-breaking) and part of ongoing token sync work.
