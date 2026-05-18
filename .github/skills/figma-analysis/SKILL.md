---
name: figma-analysis
description: "Analyze Figma designs and map to UUI components. Use when: interpreting Figma files, extracting layout and spacing, mapping design elements to React components, planning component structure from mockups."
argument-hint: "Figma URL or local design image path"
---

# Figma Design Analysis

Analyze a Figma design (via URL or local image) and produce a structured component implementation plan mapped to UUI library components.

## When to Use

- Converting a Figma design into a React component implementation plan
- Extracting layout, spacing, typography, and color tokens from a design
- Mapping visual elements to UUI components before writing code
- Planning component hierarchy and file structure from a mockup

## Procedure

### Phase 1: Retrieve the Design

1. **Figma URL provided** → use `Framelink Figma MCP` to fetch structured design data (nodes, styles, layout properties).
2. **Local image path provided** (e.g., `src/assets/figma-analysis/*.png`) → read and analyze visually.
3. **Two links provided** (full page + widget) → fetch the full page first for placement context, then the widget for implementation detail.
4. **No design available** → ask the user using the fallback template:
   - Page section structure
   - Widget dimensions
   - Spacing / padding / margins
   - Fonts and sizes
   - Colors
   - Interactions (hover, click, active states)

### Phase 2: Analyze Layout and Structure

Extract these properties from the design:

| Property         | What to Extract                                              |
|------------------|--------------------------------------------------------------|
| **Hierarchy**    | Parent-child nesting, component tree structure               |
| **Layout**       | Flex direction, grid columns, alignment, ordering            |
| **Dimensions**   | Width, height, min/max constraints                           |
| **Spacing**      | Margins, paddings, gaps between children                     |
| **Typography**   | Font family, size, weight, line-height, color                |
| **Colors**       | Background, text, border, accent — expressed as tokens/hex   |
| **Borders**      | Border radius, width, style, color                           |
| **Shadows**      | Box shadow values                                            |
| **States**       | Hover, active, focus, disabled visual changes                |

### Phase 3: Map to UUI Components

For each visual element, find the closest UUI component:

1. Check `.github/instructions/uui-library/` for matching component docs.
2. Map element → UUI component with specific props:
   - Button → `Button` with `color`, `size`, `caption`
   - Tab → `TabButton` with `caption`, `isLinkActive`, `count`
   - Table → `DataTable` with columns config
   - Input → `TextInput`, `SearchInput`, `PickerInput` as appropriate
   - Card → `Panel` or custom layout with `FlexRow`/`FlexCell`
3. If no UUI component matches, note it as "custom markup needed" with the design spec.

Present the mapping as a table:

```markdown
| Design Element    | UUI Component    | Key Props                          |
|-------------------|------------------|------------------------------------|
| Filter tabs       | TabButton        | caption, count, isLinkActive       |
| Search field      | SearchInput      | value, onValueChange, placeholder  |
| Data grid         | DataTable        | columns, dataSource                |
```

### Phase 4: Produce Implementation Plan

Present a structured plan for user approval:

1. **Component tree** — nested hierarchy showing parent/child relationships
2. **File structure**:
   - `ComponentName.tsx` — main component
   - `ComponentName.module.scss` — CSS module styles
   - `ComponentName.test.tsx` — unit tests
   - `index.ts` — barrel export
3. **UUI component mapping table** (from Phase 3)
4. **Spacing and alignment decisions** — explicitly note any values that needed interpretation
5. **Open questions** — anything ambiguous that needs user input

### Phase 5: Iterate

- Ask the user to **approve or refine** the plan before generating code.
- For any ambiguous spacing, alignment, or style decisions — present your interpretation and ask for confirmation.
- Apply feedback and re-present until the plan is approved.

## Integration

This skill produces the implementation plan. Code generation happens in the `/figma-to-code` prompt or `@snap-code` agent, which reference this skill's methodology.

The constraints from `.github/instructions/figma-instructions.md` (UUI-only, pixel-accurate, accessibility) apply automatically via `applyTo` when generating `.tsx` and `.scss` files.
