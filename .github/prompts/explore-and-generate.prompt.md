---
mode: agent
description: "Open the running app in a browser, explore a named feature, and generate a Playwright test using resilient selectors."
tools:
  - mcp_playwright
---

# Explore and Generate Playwright Test

Use Playwright MCP to navigate the live app, read the accessibility tree, and generate a test for the feature described below.

## Steps

1. **Navigate** to `http://localhost:3000` using `browser_navigate`.
2. **Snapshot** the page using `browser_snapshot` to read the accessibility tree — not the HTML source.
3. **Locate the feature** described in the prompt input. If navigation is needed (scroll, click a tab), do it and snapshot again.
4. **Generate a `@playwright/test` spec** for the feature. Follow these selector rules:
   - Use `getByRole` with an explicit `name` as first choice
   - Use `getByText` with `{ exact: true }` for visible copy
   - Use `getByLabel` for form inputs
   - Never use CSS class selectors, element IDs, or XPath
5. **Run the test** using `browser_action` to confirm it passes against the live app.
6. **Report** the generated test code and pass/fail result.

## Rules

- Read selectors from the live accessibility tree — do not invent selectors from memory.
- If an element has no accessible role or label, note it as a QUESTION and suggest adding a `data-testid` attribute.
- Follow `.github/instructions/playwright-testing.instructions.md` for all selector and assertion conventions.
- One test file per feature — do not bundle unrelated features.

## Input

Describe the feature to test:

```
{{feature_description}}
```

Example: "The ClassFilterTabs component — verify that clicking Class A filters the leaderboard to Class A students only, and clicking All restores all students."
