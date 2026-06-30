# Writing Section Alignment

## Goal

Make the desktop writing-section header read as a deliberate two-column editorial grid.

## Layout

- Retain the existing `md:grid-cols-[1.3fr_1fr]` split in `BlogPreview`.
- Keep the `Writing` eyebrow in the left column only.
- Start the right-column field-notes paragraph on the same horizontal line as the left-column heading, including its `mt-5` offset below the eyebrow.
- Keep the topic pills directly below the paragraph in the right column.
- Preserve the current single-column natural flow below the `md` breakpoint.

## Scope

The change is limited to the writing header in `src/components/blog-preview.tsx`; copy, topic data, typography, and downstream post-list layout stay unchanged.

## Verification

- A component-level source assertion protects the shared top-offset utility on the right column.
- The production build completes successfully.
- Chrome inspection confirms the paragraph top aligns with the heading top on desktop, while mobile remains stacked.
