# Component Specs (Mapped Tokens)

## Primary Button

| Property | Default | Hover | Active | Disabled |
|----------|---------|-------|--------|----------|
| Background | #276A43 (action) | #223829 (action-highlight) | #223829 | #276A43 30% |
| Text | #EDF4F1 (primary-inverse) | #EDF4F1 | #EDF4F1 | #EDF4F1 |
| Border color | transparent | transparent | transparent | transparent |
| Border weight | 0 | 0 | 0 | 0 |
| Radius | lg:16, md:16, sm:8 | | | |
| Inset (padding) | lg:14, md:14, sm:8 | | | |
| Typography | button (Kiva Post Grot Medium 16/21) | | | |

Tailwind: `tw-bg-action`, `tw-text-primary-inverse`, `tw-rounded` (16px), hover: `hover:tw-bg-action-highlight`

## Secondary Button

| Property | Default | Hover | Active | Disabled |
|----------|---------|-------|--------|----------|
| Background | #FFFFFF (action-secondary) | #EDF4F1 | #EDF4F1 | #FFFFFF |
| Text | #212121 (secondary-button) | #212121 | #212121 | #212121 30% |
| Border color | #212121 (secondary-button) | #212121 | #212121 | #212121 30% |
| Border weight | 1px | 1.2px | 1.2px | 1px |
| Radius | lg:16, md:16, sm:16 | | | |
| Inset (padding) | lg:14, md:14, sm:8 | | | |
| Typography | button (Kiva Post Grot Medium 16/21) | | | |

Tailwind: `tw-bg-action-secondary`, `tw-text-secondary-button`, `tw-border-secondary-button`, hover: `hover:tw-bg-action-secondary-highlight`
