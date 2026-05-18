---
description: "Design-to-code constraints for UI implementation. Ensures pixel accuracy, UUI-only components, and accessibility."
applyTo: "**/*.{tsx,scss}"
---

# Figma Design Constraints

These rules apply whenever implementing or modifying UI components.

## Component Library

- Generate UI **strictly** with UUI library packages: `@epam/uui`, `@epam/uui-components`, `@epam/uui-core`
- Before creating custom markup, check `.github/instructions/uui-library/` for the closest matching UUI component
- Do not introduce alternate UI libraries unless explicitly approved by the user

## Design Accuracy

- Pixel-accurate replication of the design is required
- When two Figma links are provided (full page + widget), use the full page for placement context and the widget for implementation detail
- Zero tolerance for inaccuracies in layout, spacing, dimensions, and typography

## Ambiguity Handling

- If position, spacing, color, or style is unclear, **ask for clarification** before implementing
- Confirm interpretation with the user before generating code
- Never fabricate or guess design values

## Accessibility

- Keep accessibility in scope: proper ARIA roles, labels, keyboard navigation, and contrast
- Use semantic HTML elements where appropriate