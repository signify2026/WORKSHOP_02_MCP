---
description: "Playwright MCP test generation rules — selector hierarchy, framework conventions, and review gate."
applyTo: "tests/e2e/**/*.spec.ts"
---

# Playwright Testing Constraints

These rules apply whenever generating or modifying Playwright e2e tests, including via Playwright MCP.

## Selector Hierarchy — mandatory order

Always use the highest-priority selector that uniquely identifies the element.
Never skip levels unless the higher level is genuinely unavailable.

1. `getByRole(role, { name })` — tied to ARIA role + visible label. First choice always.
2. `getByLabel(text)` — tied to form label. Use for all inputs.
3. `getByText(text, { exact: true })` — tied to visible copy. Add `exact: true` to prevent substring collisions.
4. `getByTestId(id)` — use only when roles/labels are insufficient. The `data-testid` attribute must already exist in the DOM — never ask the AI to invent a value.
5. CSS selectors, element IDs, XPath — **never use**. These are coupled to implementation and break on every CSS Modules rebuild, component rename, or HTML restructure.

## Framework

- Test runner: `@playwright/test`
- Import: `import { test, expect } from '@playwright/test'`
- Base URL: `http://localhost:3000`
- Do not use `page.$`, `page.$$`, `page.evaluate` for element selection — use Locator API only.

## Test structure

- One `test.describe` block per feature area
- Test names in imperative form: `'shows Class A students when Class A tab is selected'`
- `beforeEach`: navigate to the page under test
- Each test asserts one behaviour — not multiple unrelated things in a single test

## Assertions

- Prefer `toBeVisible()`, `toHaveText()`, `toHaveAttribute()` over `toBeTruthy()` / `toBeDefined()`
- For counts: `expect(await page.getByRole('row').count()).toBe(n)` — never assert on a selector that might match zero elements
- Always assert the thing the user would notice if the feature broke

## What NOT to generate

- Tests that only assert mock data values without exercising UI interaction
- Tests with `page.waitForTimeout` — use `waitForSelector` or `expect(...).toBeVisible()` instead
- Tests that reference CSS class names containing hashes (e.g. `LeaderboardTable_row__140Pj`)
- Tests that reference internal `data-v-*` or framework-generated attributes
