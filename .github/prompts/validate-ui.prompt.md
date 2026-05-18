---
description: "Launch the app, validate rendered UI against Figma design using Playwright, and fix discrepancies."
agent: agent
argument-hint: "URL or route to validate (default: http://localhost:3000)"
tools:
  - read
  - edit
  - search
  - execute
  - playwright/*
  - Framelink Figma MCP/*
---

# Validate UI with Playwright

Start the dev server, open the app in a browser via Playwright MCP, visually validate the rendered UI against the design, and fix any discrepancies — all live.

This prompt pairs with the **Playwright Validation** skill (`.github/skills/playwright-validation/SKILL.md`) which provides best-practice patterns for UI validation.

## Steps

1. **Start the dev server**:
   - Run `npm start` as a background process.
   - Wait for `http://localhost:3000` to be ready.

2. **Open the app in the browser**:
   - Use Playwright MCP tools to navigate to the app URL.
   - If a specific route is provided, navigate there; otherwise open the root.

3. **Capture the current state**:
   - Take a snapshot/screenshot of the rendered page.
   - Inspect the DOM structure for component hierarchy and layout.

4. **Compare against the design**:
   - If a Figma link is available (from prior `/get-user-story` or `/figma-to-code` context), fetch the design via `Framelink Figma MCP`.
   - If local design images exist in `src/assets/figma-analysis/`, use those as reference.
   - If neither is available, ask the user for a reference or skip comparison.
   - Compare: layout, spacing, colors, typography, component placement, alignment.

5. **Report findings**:
   - Present a structured discrepancy summary:
     - Layout / positioning issues
     - Spacing / padding / margin mismatches
     - Color or typography differences
     - Missing or extra elements
   - Rate overall design fidelity: **High** / **Medium** / **Low**

6. **Fix and re-validate** (iterative):
   - For each issue, propose a code fix.
   - Ask user for confirmation before applying.
   - After applying, reload the browser and take a new screenshot.
   - Compare again. Repeat until all issues are resolved or user is satisfied.

7. **Interactive testing** (optional):
   - Navigate to other routes/screens and repeat validation.
   - Test hover states, click interactions, and navigation flows.

## Rules

- Design constraints from `.github/instructions/figma-instructions.md` apply automatically for `.tsx`/`.scss` edits.
- Follow `.github/skills/playwright-validation/SKILL.md` for validation patterns.
- Use Playwright MCP tools for all browser interactions (navigate, snapshot, click, screenshot).
- Fix UI using UUI library components (`@epam/uui`, `@epam/uui-components`, `@epam/uui-core`).
- Do a full-page scan before reporting — do not stop at the first issue.
- Always screenshot before and after fixes to confirm resolution.
