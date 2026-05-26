# Figma Design-System to Skill Process

Reusable process for extracting a Figma design-system section into a portable agent skill file.

## What This Produces

A single self-contained Markdown skill file with:
- YAML frontmatter (`name`, `description`, `when_to_use`)
- Figma-canonical design intent (tables, rules, principles)
- Code-facing sections: Tailwind mapping + outstanding Figma-vs-code discrepancies
- One-line index entry

## Inputs Required

1. **Figma node links** for each panel (Overview, Scales/Tokens, Guidelines)
2. **Screenshots** of each panel
3. **Section name** (kebab-case, confirmed before writing)

## Data Source Decision

| Panel type | Use | Reason |
|-----------|-----|--------|
| Conceptual (overview, principles, do/don't) | Screenshots | Faster, sufficient for prose content |
| Dense token tables (>10 rows, description columns) | `get_metadata` MCP tool | Screenshots miss tokens; metadata returns coordinates for exact table reconstruction |
| Fallback for styled/nested content | `get_design_context` + parser | Parse `data-name` attributes, group by `row-N` class |

## Standard Skill Structure

```
---
name: <kebab-name>
description: <one sentence>
when_to_use: <concrete triggers>
---

# Kiva <Section Title>

## Source of truth
## Why <section> matters
## Design principles
## <Main spec tables>
## Best practices / Usage rules
## (optional) Worked examples, lookup tables
## How to use in Figma
## Using with Tailwind
## Outstanding discrepancies
## Figma source references
```

## When to Split Into Two Files

Split into umbrella + companion when:
- Total table rows exceed ~50
- Data is organized per-X (per-theme, per-tier) and each X is independently useful
- Figma source itself has discrete sub-sections

Naming: `<topic>.md` (umbrella) + `<topic>-<axis>.md` (companion).

## Code Verification (before writing code-facing sections)

1. `@kiva/kv-tokens/tokens/core/*.json` - canonical token source
2. `@kiva/kv-tokens/configs/tailwind.config.js` - how tokens become Tailwind utilities
3. `@kiva/kv-tokens/configs/kiva*.js` - helper modules
4. `@kiva/kv-tokens/dist/js/tokens.js` - built output (fallback)
5. Component wrappers in `@kiva/kv-components/src/vue/` - only if relevant

### Real Gaps vs Intentional Differences

Not every mismatch is a gap. Intentional differences:
- `default` vs `base` (radius): same token, surface-native names
- Separator conventions: JSON uses `_`, Tailwind `.`, Figma `-`
- Theme identifiers: Figma "Marigold" = code `marigold-light`

List concrete missing token names. "Several tokens are missing" is not actionable.

## Voice Rules

- Semantic intent first, concrete values second
- Tables for structured data
- Do/Don't as boldface inline pairs
- Cross-link related skills with relative links
- No emojis
- No hedge words ("typically", "generally")
- Silently correct Figma typos; don't transcribe them

## Process Steps

1. Confirm inputs (section name, node links, screenshots)
2. Skim existing skills for voice/structure pattern
3. Decide data source per panel
4. Decide umbrella-only vs umbrella+companion split
5. Verify code state (token JSON, Tailwind config)
6. Draft the skill file(s)
7. Update index (SKILLS.md)
8. Self-verify against canonical Figma data
9. Brief the user on what's new + any divergences flagged

## Kickoff Template

```
Time to extract the <SECTION> section of our design system into a new skill.

Figma node links:
- <Panel 1>: <URL>
- <Panel 2>: <URL>
- <Panel 3>: <URL>

Screenshots attached: <count>
```
