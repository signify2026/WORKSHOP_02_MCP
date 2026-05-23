---
mode: agent
description: "Navigate the live app, read the accessibility tree, and generate resilient Playwright e2e tests for each acceptance criterion in the user story."
tools:
  - mcp_playwright
  - read_file
  - write_file
  - run_in_terminal
---

# Generate E2E Tests from Acceptance Criteria

Use Playwright MCP to navigate the running app, read the accessibility tree of the implemented feature, and generate a `@playwright/test` spec file that verifies each acceptance criterion from the user story.

This prompt is the **test generation** step. It pairs with:
- `.github/instructions/playwright-testing.instructions.md` — always-on selector and framework rules
- `/validate-ui` — the prior visual validation step (design fidelity)
- `/repair-locators` — for fixing tests when selectors break

## Steps

### 1. Read the User Story
- Read `.github/demo/user-story.md`
- Extract the **feature name**, **component name**, and all **acceptance criteria** (AC-1, AC-2, …)
- For each AC, identify:
  - What UI state to verify (visible element, attribute, count, text)
  - What interaction is needed to trigger it (navigate, click, type)

### 2. Start the Dev Server (if not already running)
- Run `npm start` as a background process
- Wait until `http://localhost:3000` responds before proceeding

### 3. Navigate and Snapshot
- Use `browser_navigate` to go to the route where the feature lives
- Use `browser_snapshot` to read the **accessibility tree** — this is the source of all selectors
- If the feature is not visible at root, navigate to the correct route or interact (click a menu, scroll) and snapshot again
- Do **not** use `browser_screenshot` for selector discovery — it returns pixels, not selectors

### 4. Map Acceptance Criteria to Selectors
For each AC from Step 1:
- Find the relevant element(s) in the accessibility tree from Step 3
- Choose selectors in this priority order (from `.github/instructions/playwright-testing.instructions.md`):
  1. `getByRole(role, { name })` — ARIA role + visible label
  2. `getByLabel(text)` — form label text
  3. `getByText(text, { exact: true })` — visible copy
  4. `getByTestId(id)` — only if the `data-testid` attribute actually exists in the snapshot
  - **Never** use CSS class selectors, element IDs, or XPath
- If an AC requires an interaction (clicking a tab, selecting a filter), use `browser_click` then snapshot again to verify the resulting state

### 5. Generate the Test File
- Create a `@playwright/test` spec at `tests/e2e/<component-name>.spec.ts`
- Structure:
  ```typescript
  import { test, expect } from '@playwright/test';

  test.describe('<ComponentName>', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/<route>');
    });

    // One test per AC
    test('AC-1: <what it verifies>', async ({ page }) => { ... });
    test('AC-2: <what it verifies>', async ({ page }) => { ... });
    // ...
  });
  ```
- Each test covers exactly one AC — do not bundle multiple ACs into one test
- Test names use imperative form: `'shows 4 filter tabs on load'`, not `'test tab rendering'`
- Every assertion must reflect what a user would notice if the feature broke

### 6. Run the Tests
- Run `npx playwright test tests/e2e/<component-name>.spec.ts --reporter=line`
- Report the pass/fail result for each test
- If any test fails:
  - Re-snapshot the relevant page state
  - Check whether the selector is wrong or the assertion is wrong
  - Fix only the selector if the AC is correct; flag for review if the AC assertion needs changing
  - Re-run until all tests pass

### 7. Report
Present a summary:
```
## Test Generation Report

**Feature**: <feature name>
**Story**: <user story ID>
**File**: tests/e2e/<component-name>.spec.ts

| AC   | Test name                              | Status  | Selector used              |
|------|----------------------------------------|---------|----------------------------|
| AC-1 | renders all 4 filter tabs              | ✅ PASS | getByRole('tab', …)        |
| AC-2 | All tab is selected by default         | ✅ PASS | toHaveAttribute(…)         |
| AC-3 | clicking Current updates active tab    | ✅ PASS | getByRole + click          |
```

## Rules

- Selectors come from the **live accessibility tree** — never invent them from memory
- One test per AC — not one test for everything
- Do not add `page.waitForTimeout` — use `expect(...).toBeVisible()` to await state
- Do not test mock data values — test what the user sees in the real rendered app
- If an element has no accessible role or label, add a `// QUESTION: no accessible role — consider adding data-testid="x"` comment and move on
- Follow `.github/instructions/playwright-testing.instructions.md` for all conventions
