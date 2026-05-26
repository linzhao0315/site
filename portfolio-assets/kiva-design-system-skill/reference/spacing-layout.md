# Spacing & Layout

## Structure Spacing (between sections)

| Token | Desktop (lg) | Mobile (sm) | Usage |
|-------|-------------|-------------|-------|
| spacing.structure.XL | 32px | 24px | Major page section gaps |
| spacing.structure.L | 24px | 16px | Content block separation |
| spacing.structure.M | 16px | 16px | Related module grouping |
| spacing.structure.S | 8px | 8px | Text element gaps |

## Component Gap (inside components)

| Token | Value | Usage |
|-------|-------|-------|
| spacing.component.gap.L | 16px | Card body-to-footer, major internal divisions |
| spacing.component.gap.M | 8px | Icon-to-label, standard internal spacing |
| spacing.component.gap.S | 4px | Tight alignments, subtle spacing |

## Component Inset (padding)

| Token | Desktop (lg) | Mobile (sm) | Usage |
|-------|-------------|-------------|-------|
| spacing.component.inset.XL | 32px | 20px | Hero cards, large containers |
| spacing.component.inset.L | 24px | 20px | Standard cards, containers |
| spacing.component.inset.M | 16px | 16px | Small cards, banners, buttons |
| spacing.component.inset.S | 8px | 8px | Tags, compact buttons |
| spacing.component.inset.XS | 4px | 4px | Tooltips, smallest elements |

## Micro

| Token | Value | Usage |
|-------|-------|-------|
| spacing.micro.micro | 4px | Hairline alignments, atomic precision |

## Layout Grid (Responsive)

| Token | mobile (sm) | tablet (md) | desktop (lg) | desktop (xl) |
|-------|------------|-------------|-------------|--------------|
| breakpoint | 390px | 734px | 1024px | 1440px |
| grid-columns | 4 | 8 | 12 | 12 |
| grid-margin | 20px | 32px | 64px | 120px |
| grid-gutter | 16px | 24px | 32px | 32px |
| content-max-width | 350px | 670px | 896px | 1200px |

## Tailwind Spacing Mapping

Every value is a 4px multiple. Scale: N = N x 8px; half-steps at 4px granularity.

| Tailwind class | Value | | Tailwind class | Value |
|---------------|-------|-|---------------|-------|
| `tw-p-0.5` | 4px | | `tw-p-4` | 32px |
| `tw-p-1` | 8px | | `tw-p-6` | 48px |
| `tw-p-1.5` | 12px | | `tw-p-8` | 64px |
| `tw-p-2` | 16px | | `tw-p-10` | 80px |
| `tw-p-3` | 24px | | `tw-p-16` | 128px |

**Important**: `tw-p-4` = 32px in Kiva, not 16px like stock Tailwind.

Mobile is unprefixed default (no `sm:` screen). See [tailwind.md](tailwind.md).

## Figma vs Code Discrepancies

- **XS/SM tiers are not named breakpoints in code.** Mobile is the unprefixed Tailwind default; both XS and SM design tiers fall under "no prefix"
- **No shipped semantic spacing tokens.** Code uses the raw spacing ramp (`tw-p-2`, `tw-gap-3`) but no semantic `structure.XL` or `component.inset.L` tokens exist in code. Responsive shifts require manual Tailwind responsive prefixes
- **KvGrid hard-codes gap values** as `tw-gap-2 md:tw-gap-3 lg:tw-gap-3.5`, which does not match the Figma tier gutters (16 / 16 / 24 / 32 / 32 px)
- **Margins (20/32/64/120 px) and 1200px max-width lack named tokens** in code
