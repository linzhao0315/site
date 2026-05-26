# Typography (Alias - Text/Spacing/Layout)

## 2 Font Families

| Role | Font | Global Variable |
|------|------|----------------|
| Serif (headings) | **Dovetail MVB** | type/font-family/serif |
| Sans (body/UI) | **Kiva Post Grot** | type/font-family/sans |

## 10 Type Styles (Responsive)

| Style | Font | Weight | Desktop (lg) | Mobile (sm) | Usage |
|-------|------|--------|-------------|-------------|-------|
| display | Dovetail MVB | Medium | 44/57, ls:-0.88 | 36/47, ls:-0.72 | Hero headlines, landing pages |
| headline 1 | Dovetail MVB | Medium | 26/36, ls:-0.52 | 22/31, ls:-0.22 | Page titles, H1 |
| headline 2 | Dovetail MVB | Medium | 22/31, ls:-0.22 | 20/28, ls:-0.2 | Subsection headings, H2 |
| subheadline | Kiva Post Grot | Book | 20/26, ls:0 | 18/24, ls:0 | Tertiary headings, lead text, H3 |
| title | Kiva Post Grot | Medium | 20/26, ls:0 | 18/24, ls:0 | Card titles, modal headers |
| base | Kiva Post Grot | Book | 16/22, ls:0 | 16/22, ls:0 | Body paragraphs |
| button | Kiva Post Grot | Medium | 16/21, ls:0 | 16/21, ls:0 | Button labels |
| upper | Kiva Post Grot | Medium | 14/18, ls:0 | 14/18, ls:0 | Tags, badges, overlines (uppercase) |
| label | Kiva Post Grot | Medium | 14/18, ls:0 | 14/18, ls:0 | Form labels, metadata |
| caption | Kiva Post Grot | Book | 14/18, ls:0 | 14/18, ls:0 | Captions, timestamps, helper text |

Format: `font-size/line-height, ls:letter-spacing`

## Key Distinctions (Common AI Errors)

- **subheadline vs title**: Same size, but subheadline is Book (lighter) for lead text; title is Medium (heavier) for card headings
- **upper vs label**: Same size and weight, but upper is always UPPERCASE (text-transform); label is sentence case
- **label vs caption**: Same size, but label is Medium weight for form inputs; caption is Book weight for supplementary text
- **display vs headline 1**: display uses serif Dovetail at 44px for marketing; headline 1 is also serif but 26px for page-level H1

## Tailwind Text Style Mapping

The preset **disables** `fontSize`, `lineHeight`, and `letterSpacing` core plugins. Stock utilities like `tw-text-lg`, `tw-leading-*`, `tw-tracking-*` do not exist.

Use semantic text style utilities instead:

| Tailwind utility | Maps to | HTML element |
|-----------------|---------|-------------|
| `tw-text-display` | display | Marketing hero `<h1>` only |
| `tw-text-h1` | headline 1 | `<h1>` |
| `tw-text-h2` | headline 2 | `<h2>` |
| `tw-text-subhead` | subheadline | `<h3>` or lead `<p>` |
| `tw-text-title` | title | Card/modal heading |
| `tw-text-body` | base | `<p>` |
| `tw-text-button` | button | `<button>` label |
| `tw-text-caption` | caption | Helper text, timestamps |
| `tw-text-label` | label | `<label>` |

Font weight max: `tw-font-medium` (500). No `tw-font-bold` or `tw-font-semibold`.

`tw-text-{color}` still works (color is a separate concern). So `tw-text-primary` is valid; `tw-text-lg` is not.

### Rules

- Apply text style tokens completely. Do not write custom CSS for font family, size, weight, line height, or letter spacing
- Use semantic HTML first (`<h1>`-`<h4>`, `<p>`, `<label>`) with corresponding Tailwind classes
- Limit display to one per page, marketing contexts only
- Never use `<h5>` or `<h6>`. For deeper hierarchy, apply type tokens to `<p>` elements

See [tailwind.md](tailwind.md) for full preset details.
