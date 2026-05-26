# Radius, Elevation & Border

## Border Radius

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| none | 0px | tw-rounded-none | Marketing images, table cells |
| xs | 4px | tw-rounded-xs | Form inputs, dropdowns, text areas |
| sm | 8px | tw-rounded-sm | Chips, table frames, large badges |
| md | 12px | tw-rounded-md | Tooltips, stat tiles, sticky banners, mobile images |
| base | 16px | tw-rounded | Buttons, modals, toast, bottom sheets, mini cards |
| lg | 20px | tw-rounded-lg | Standard card outer corners, loan cards, desktop images |
| xl | 24px | tw-rounded-xl | Section frames |
| full | 9999px | tw-rounded-full | Icon buttons, tags, avatars, toggles |

### Concentric Corner Formula

When nesting rounded elements: `inner radius = outer radius - gap`

This prevents visual inversion where inner corners appear larger than outer ones.

### Key Gotcha

`tw-rounded` (unsuffixed) = **16px**, not a small radius. This is the most common porting bug from stock Tailwind. Use `tw-rounded-full` for pills/circles.

### Figma vs Code Naming

| Figma | Code (Tailwind DEFAULT key) | Notes |
|-------|---------------------------|-------|
| `base` | `default` | Same token, two surface-native names. Tailwind `DEFAULT` key generates the unsuffixed `tw-rounded` utility |
| `xs/sm/md/lg/xl` | Same | Consistent across surfaces |

## Elevation (Shadow System)

Composed of 4 sub-tokens per level: blur, y-offset, spread, opacity.

| Level | Blur | Y | Spread | Opacity | Usage |
|-------|------|---|--------|---------|-------|
| rest | 2px | 1px | 0 | 10% | Default cards, inputs, search bars (Layer 1) |
| raised | 6px | 4px | -1px | 15% | Hover states, dropdowns, popovers (Layer 2) |
| overlay | 16px | 8px | -4px | 20% | Modals, dialogs, bottom sheets (Layer 3) |

Shadow color: use `shadow.default` (#000 8%), `shadow.hover` (#000 16%), `shadow.click-active` (#000 8%).

### Tailwind Shadow Mapping

Only two shadow utilities ship: `tw-shadow` (default) and `tw-shadow-lg`. No `tw-shadow-md` or `tw-shadow-xl`.

## Border Stroke Weight

| Token | Value | Context |
|-------|-------|---------|
| default | 1px | All resting border states |
| hover | 1.2px | Secondary button hover |
| active | 1.2px | Secondary button active/pressed |

## Figma vs Code Discrepancies

- **Shadow tokens not yet code-tokenized.** `boxShadow.DEFAULT` and `boxShadow.lg` in tailwind.config.js are hardcoded `rgb(0 0 0 / 0.08)`; the semantic `shadow/default`, `shadow/hover`, `shadow/click-active` tokens from Figma have no code entry
- **Radius `base` vs `default` naming.** Figma renamed to `base` (consistent with xs/sm/md/lg/xl scale); code still uses `default` (Tailwind's `DEFAULT` key). Same token, same value. Not a gap to close, just a naming-convention difference
