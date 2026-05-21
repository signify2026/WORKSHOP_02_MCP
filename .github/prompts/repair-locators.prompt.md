---
mode: agent
description: "Repair a failing Playwright test by navigating the live app, reading the current accessibility tree, and replacing broken selectors."
tools:
  - mcp_playwright
---

# Repair Broken Playwright Locators

A Playwright test is failing because UI selectors no longer match the current DOM.
Use Playwright MCP to navigate the live page, read the accessibility tree, and propose updated selectors.

## Steps

1. **Navigate** to the URL used in the failing test using `browser_navigate`.
2. **Snapshot** the page using `browser_snapshot` to read the current accessibility tree.
3. **Identify each broken selector** in the failing test below.
4. For each broken selector, find the replacement in the accessibility tree:
   - Prefer `getByRole` with `name` — check the snapshot for role + accessible name
   - Fall back to `getByText` with `{ exact: true }` for visible text
   - Fall back to `getByLabel` for inputs
   - Add a `// QUESTION: no accessible role found — consider adding data-testid="x"` comment if nothing works
5. **Return the full repaired test** with only selector changes — do not alter test logic, descriptions, or assertions.
6. **Run the repaired test** using `browser_action` to confirm it passes.

## Rules

- Change ONLY selectors — do not rewrite assertions, rename tests, or restructure the file.
- If the accessible name of an element changed (e.g. a button was relabelled), flag it as a QUESTION before changing — the assertion intent may need review.
- Never introduce CSS class selectors, element IDs, or XPath in the repair.
- Follow `.github/instructions/playwright-testing.instructions.md`.

## Failing test to repair

```typescript
{{paste_failing_test_here}}
```
