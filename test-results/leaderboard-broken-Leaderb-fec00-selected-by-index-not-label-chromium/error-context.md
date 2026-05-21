# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leaderboard-broken.spec.ts >> LeaderboardTable — BROKEN selectors (demo only) >> BREAKS: pagination button selected by index, not label
- Location: tests/e2e/leaderboard-broken.spec.ts:47:7

# Error details

```
Error: expect(locator).toBeDisabled() failed

Locator:  locator('button').first()
Expected: disabled
Received: enabled
Timeout:  5000ms

Call log:
  - Expect "toBeDisabled" with timeout 5000ms
  - waiting for locator('button').first()
    14 × locator resolved to <button tabindex="0" type="button" title="Settings" aria-label="Settings" class="uui-button-box uui-enabled -clickable -EAUM9 uui-icon_button uui-color-neutral CEL7km MainNavigationHeader_actionButton__JFBYD">…</button>
       - unexpected value "enabled"

```

```yaml
- button "Settings":
  - img
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // ─────────────────────────────────────────────────────────────────────────────
  4  | // SLIDE 11e DEMO — BEFORE: fragile selectors that break on UI changes
  5  | //
  6  | // This file shows the kind of test a code recorder (e.g. Playwright codegen
  7  | // without Playwright MCP) would produce. These selectors are coupled to
  8  | // implementation detail and will fail when:
  9  | //   - CSS Modules rebuilds (hash suffix changes: __140Pj → __9xKm2)
  10 | //   - Component is renamed or restructured
  11 | //   - An element ID is removed or changed
  12 | //   - UUI library upgrades its internal markup
  13 | //
  14 | // DO NOT commit this style of test to your codebase.
  15 | // Use leaderboard-healed.spec.ts instead.
  16 | // ─────────────────────────────────────────────────────────────────────────────
  17 | 
  18 | test.describe('LeaderboardTable — BROKEN selectors (demo only)', () => {
  19 | 
  20 |   test.beforeEach(async ({ page }) => {
  21 |     await page.goto('/');
  22 |   });
  23 | 
  24 |   test('BREAKS: selects tab by CSS class with hash suffix', async ({ page }) => {
  25 |     test.fail(); // intentional — demonstrates fragile CSS Module selector for Slide 11e
  26 |     const classATab = page.locator('.ClassFilterTabs_filterTab__140Pj').nth(1);
  27 |     // Short timeout so it fails fast, not after the full 30s test timeout
  28 |     await expect(classATab).toBeVisible({ timeout: 3000 });
  29 |     await classATab.click();
  30 |     await expect(classATab).toHaveAttribute('aria-selected', 'true');
  31 |   });
  32 | 
  33 |   test('BREAKS: selects leaderboard row by generated element ID', async ({ page }) => {
  34 |     test.fail(); // intentional — ID was invented, never existed in the DOM
  35 |     const firstRow = page.locator('#student-rank-1');
  36 |     await expect(firstRow).toBeVisible({ timeout: 3000 });
  37 |   });
  38 | 
  39 |   test('BREAKS: selects leaderboard row by XPath tied to DOM position', async ({ page }) => {
  40 |     test.fail(); // intentional — XPath breaks on any structural change
  41 |     const firstStudentName = page.locator(
  42 |       'xpath=//div[contains(@class,"leaderboardContainer")]//div[2]//div[1]//span[2]'
  43 |     );
  44 |     await expect(firstStudentName).toHaveText('Emily Rodriguez', { timeout: 3000 });
  45 |   });
  46 | 
  47 |   test('BREAKS: pagination button selected by index, not label', async ({ page }) => {
  48 |     test.fail(); // intentional — nth(0) breaks if any button is added before Previous
  49 |     const prevButton = page.locator('button').nth(0);
  50 |     await prevButton.click();
> 51 |     await expect(prevButton).toBeDisabled(); // wrong button — assertion will fail
     |                              ^ Error: expect(locator).toBeDisabled() failed
  52 |   });
  53 | 
  54 | });
  55 | 
```