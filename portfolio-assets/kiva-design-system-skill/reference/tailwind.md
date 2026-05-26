# Tailwind Integration (Kiva Preset)

Kiva ships a **Tailwind v3 preset** (`@kiva/kv-tokens`) that reshapes stock Tailwind. This reference documents every deviation.

## Setup

```js
// tailwind.config.js
import { tailwindConfig } from '@kiva/kv-tokens';
export default {
  presets: [tailwindConfig],
  content: ['./src/**/*.{vue,js,ts}'],
};
```

## Critical Differences from Stock Tailwind

| Stock Tailwind | Kiva Preset | Impact |
|---------------|-------------|--------|
| No prefix | `tw-` prefix on all utilities | `tw-flex`, `tw-mb-2`, not `flex`, `mb-2` |
| `p-4` = 16px | `tw-p-4` = 32px | 8px base scale, not 4px |
| `text-lg`, `text-2xl` | Disabled | Use `tw-text-h1`, `tw-text-body` etc |
| `leading-*`, `tracking-*` | Disabled | Bundled into semantic text styles |
| `font-bold` (700) | Does not exist | Max weight: `tw-font-medium` (500) |
| `rounded` = small | `tw-rounded` = 16px | Use `tw-rounded-full` for pills |
| `sm:`, `md:`, `lg:`, `xl:`, `2xl:` | `md:`, `lg:`, `xl:` only | No `sm:` or `2xl:` |
| Named colors (`slate`, `red`) | Semantic tokens (`primary`, `action`) | `tw-bg-slate-500` does not exist |

## Prefix Rules

- Variant sits **before** prefix: `hover:tw-bg-primary`, `md:tw-flex`
- Negative sign sits **before** prefix: `-tw-mt-2`
- Arbitrary values keep prefix: `tw-mt-[3px]`

## Spacing Scale (8px base)

| Class | Value | | Class | Value |
|-------|-------|-|-------|-------|
| `tw-p-0.5` | 4px | | `tw-p-4` | 32px |
| `tw-p-1` | 8px | | `tw-p-5` | 40px |
| `tw-p-1.5` | 12px | | `tw-p-6` | 48px |
| `tw-p-2` | 16px | | `tw-p-8` | 64px |
| `tw-p-2.5` | 20px | | `tw-p-10` | 80px |
| `tw-p-3` | 24px | | `tw-p-12` | 96px |
| `tw-p-3.5` | 28px | | `tw-p-16` | 128px |

Token naming across surfaces: source JSON uses `_` (`2_5`), Tailwind uses `.` (`tw-p-2.5`), Figma uses `-` (`2-5`). Same value, three idioms.

## Semantic Text Styles (replaces fontSize)

| Utility | Maps to |
|---------|---------|
| `tw-text-display` | Display (Dovetail MVB, 44/57 desktop) |
| `tw-text-h1` | Headline 1 (26/36 desktop) |
| `tw-text-h2` | Headline 2 (22/31 desktop) |
| `tw-text-subhead` | Subheadline (20/26, Book) |
| `tw-text-title` | Title (20/26, Medium) |
| `tw-text-body` | Base (16/22) |
| `tw-text-caption` | Caption (14/18, Book) |
| `tw-text-label` | Label (14/18, Medium) |
| `tw-text-button` | Button (16/21, Medium) |

`tw-text-{color}` still works (color is separate from sizing). So `tw-text-primary` = valid color, `tw-text-lg` = does not exist.

## Color Utilities

**Themable (semantic)**: `tw-text-primary`, `tw-bg-action`, `tw-border-danger` etc. Compile to `rgb(var(--token))`, resolve at runtime per theme. **Use by default.**

**Static (non-themed)**: `tw-bg-eco-green-3`, `tw-text-marigold-DEFAULT`, `tw-bg-gray-100`. Fixed values. Use only when color must not change with theme.

Opacity modifiers work on both: `tw-bg-primary/50`.

## Breakpoints

| Screen | Min-width | Usage |
|--------|-----------|-------|
| *(unprefixed)* | 0px | Mobile base (XS + SM tiers) |
| `md:` | 734px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1440px | Large desktop |
| `print:` | print media | Print styles |

## Other Limited Scales

| Category | Available values |
|----------|-----------------|
| z-index | Semantic names: `tw-z-modal`, `tw-z-dropdown`, `tw-z-sticky`, `tw-z-toast` |
| box-shadow | `tw-shadow` (default), `tw-shadow-lg` only |
| opacity | `tw-opacity-0`, `tw-opacity-10`, `tw-opacity-low`, `tw-opacity-full` |
| font-weight | `tw-font-light` (300), `tw-font-normal` (400), `tw-font-medium` (500) |

## Base Layer (auto-applied)

The preset injects global styles: web fonts, `body` typography/color, `h1`-`h5`, `small`, `code`, `blockquote`, links, `hr`, input placeholders, button focus reset.

- `h6` is **not** styled
- `strong`/`b` are set to normal (400) weight
- `@tailwindcss/typography` plugin included: `tw-prose` available for rich text

## Common Mistakes

1. Missing `tw-` prefix (or writing `tw-hover:` instead of `hover:tw-`)
2. Using stock color names (`tw-bg-slate-500`) that don't exist
3. Reaching for `tw-text-lg` / `tw-leading-*` / `tw-tracking-*` (disabled)
4. Expecting `tw-font-bold` (max is `medium`)
5. Treating `tw-rounded` as a small radius (it's 16px)
6. Assuming `sm:` breakpoint exists
7. Assuming spacing numbers match stock Tailwind (`tw-p-4` = 32px here)
8. Incomplete `content` glob causing Tailwind to purge expected classes

## Authoritative Sources

- Token JSON: `@kiva/kv-tokens/tokens/core/*.json`
- Tailwind config: `@kiva/kv-tokens/configs/tailwind.config.js`
- Color helpers: `@kiva/kv-tokens/configs/kivaColors.js`
- Typography helpers: `@kiva/kv-tokens/configs/kivaTypography.js`
- Built output: `@kiva/kv-tokens/dist/js/tokens.js`
- CSS custom properties: `@kiva/kv-tokens/dist/css/tokens.css`
