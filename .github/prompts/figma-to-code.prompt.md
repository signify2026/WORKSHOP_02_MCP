---
agent: agent
description: "Convert Figma design into implemented React components using UUI library."
---

# Figma to Code

Convert a Figma design into a fully implemented React component using the UUI library.

## Inputs

Accepts any of the following as starting context:
- A Figma URL (design link)
- A reference to local design images (e.g., from `src/assets/figma-analysis/`)
- Context from a prior `/get-user-story` run (which contains design references)

If none are available, ask the user for design details using the fallback template below.

## Steps

1. **Resolve design source**:
   - If a Figma URL is provided → use `Framelink Figma MCP` server to retrieve design data.
   - If local image paths are referenced → read and analyze those images.
   - If neither → ask for manual design details.
2. **Analyze the design**:
   - Parse layout structure and component hierarchy.
   - Extract dimensions, spacing, padding, margins, and alignment.
   - Identify typography (font family, size, weight, color).
   - Map UI elements to UUI components.
3. **Present implementation plan**:
   - Layout interpretation with component tree.
   - UUI component mapping (reference `.github/instructions/uui-library/` docs).
   - File structure plan (component file, SCSS module, test file, index barrel).
   - Ask for user confirmation before generating code.
4. **Generate code**:
   - Create the component, styles, and tests.
   - Wire into existing page structure if applicable.
5. **Confirm spacing and alignment**:
   - Request final user sign-off on any ambiguous positioning decisions.

## Fallback Design Template

If no Figma link or image is available, ask user to provide:
- Page section structure
- Widget dimensions
- Spacing / padding / margins
- Fonts and sizes
- Colors
- Interactions (hover, click, active states)

## Rules

- Follow `.github/instructions/figma-instructions.md` for design accuracy.
- Generate implementation strictly with UUI library (`@epam/uui`, `@epam/uui-components`, `@epam/uui-core`).
- Before custom markup, search `.github/instructions/uui-library/` for the closest matching UUI component.
- Keep design replication pixel-accurate.
- Ask clarifying questions for ambiguous placement or style.