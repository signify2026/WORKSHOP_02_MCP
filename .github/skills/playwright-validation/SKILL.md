---
name: playwright-validation
description: "Validate rendered UI against Figma designs using Playwright MCP. Use when: checking design fidelity, comparing screenshots to mockups, running visual regression, fixing layout or styling issues, verifying component rendering after code generation."
argument-hint: "URL or route to validate (e.g., http://localhost:3000)"
---

# Playwright UI Validation

Validate that implemented UI components match their design specifications by pairing this skill (validation methodology) with the Playwright MCP server (browser automation).

## When to Use

- After generating a component with `/figma-to-code` — verify the output matches the design
- When a visual bug is reported — inspect rendered state against the spec
- During code review — validate a UI change before approving
- For regression checks — confirm existing screens still render correctly

## Procedure

### Phase 1: Environment Setup

1. **Start the dev server** in the background:
   ```
   npm start
   ```
2. **Wait for readiness** — confirm `http://localhost:3000` responds before proceeding.
3. **Navigate** to the target route using Playwright MCP. Default to root (`/`) unless a specific route is provided.

### Phase 2: Snapshot and Inspect

1. **Take a full-page snapshot** — captures the accessibility tree and visual state.
2. **Inspect the DOM structure**:
   - Verify component hierarchy matches expected structure.
   - Check that expected elements are present (buttons, tabs, tables, cards, etc.).
   - Confirm correct ARIA roles and labels for accessibility.
3. **Capture a screenshot** for visual reference.

### Phase 3: Design Comparison

Compare the rendered output against the design reference (Figma image, local PNG, or design spec) across these dimensions:

| Dimension        | What to Check                                                    |
|------------------|------------------------------------------------------------------|
| **Layout**       | Component placement, flex direction, grid structure, ordering    |
| **Spacing**      | Margins, paddings, gaps between elements (use computed styles)   |
| **Typography**   | Font family, size, weight, line-height, color                    |
| **Colors**       | Background, text, border, and accent colors against design tokens|
| **Sizing**       | Width, height, min/max constraints, aspect ratios                |
| **Alignment**    | Horizontal/vertical centering, text alignment, baseline alignment|
| **States**       | Hover, active, focus, disabled — test via Playwright interactions|
| **Responsive**   | Resize viewport and check breakpoint behavior if applicable      |

### Phase 4: Structured Reporting

Report findings in this format:

```markdown
## UI Validation Report

**Route**: /path
**Design Fidelity**: High | Medium | Low

### Issues Found

| # | Category   | Element          | Expected                | Actual                  | Severity |
|---|-----------|------------------|-------------------------|-------------------------|----------|
| 1 | Spacing   | .tab-container   | 16px gap between tabs   | 8px gap                 | Medium   |
| 2 | Color     | .active-tab      | #1565C0 underline       | No underline visible    | High     |

### Passing Checks
- ✓ Component hierarchy matches design
- ✓ Typography correct
- ✓ All tab labels present with counts
```

### Phase 5: Fix-and-Revalidate Loop

1. **Propose fix**: For each issue, suggest a specific code change (file, line, what to change).
2. **Get confirmation**: Ask user before applying.
3. **Apply fix**: Edit the source file.
4. **Re-validate**: Reload the page in Playwright, take a new screenshot, confirm the fix resolved the issue.
5. **Repeat**: Continue until all issues are resolved or user is satisfied.

### Phase 6: Interactive Testing (Optional)

If time permits or user requests:
- **Click interactions**: Verify tab switching, button clicks, navigation.
- **Hover states**: Check tooltip appearance, color changes on hover.
- **Form interactions**: Test inputs, dropdowns, checkboxes.
- **Navigation flow**: Move between routes and verify transitions.

## Severity Definitions

| Severity   | Meaning                                                        |
|-----------|----------------------------------------------------------------|
| **High**   | Visually broken or functionally incorrect — must fix           |
| **Medium** | Noticeable deviation from design — should fix                  |
| **Low**    | Minor spacing or color difference — nice to fix                |

## Best Practices

- Always take a **before screenshot** first, then compare, then take an **after screenshot** post-fix.
- Do a **full-page scan** before reporting — don't stop at the first issue.
- Check **computed styles** (via DOM inspection) rather than guessing from screenshots alone.
- When the design reference is a Figma link, use the Framelink Figma MCP to pull structured design data — it gives precise values for spacing, colors, and typography.
- When the design reference is a local image, compare visually and note differences by region.
- For UUI components, verify against the component documentation in `.github/instructions/uui-library/` to confirm correct prop usage.
