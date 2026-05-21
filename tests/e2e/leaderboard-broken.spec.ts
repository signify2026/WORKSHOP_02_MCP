import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11e DEMO — BEFORE: fragile selectors that break on UI changes
//
// This file shows the kind of test a code recorder (e.g. Playwright codegen
// without Playwright MCP) would produce. These selectors are coupled to
// implementation detail and will fail when:
//   - CSS Modules rebuilds (hash suffix changes: __140Pj → __9xKm2)
//   - Component is renamed or restructured
//   - An element ID is removed or changed
//   - UUI library upgrades its internal markup
//
// DO NOT commit this style of test to your codebase.
// Use leaderboard-healed.spec.ts instead.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('LeaderboardTable — BROKEN selectors (demo only)', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('BREAKS: selects tab by CSS class with hash suffix', async ({ page }) => {
    test.fail(); // intentional — demonstrates fragile CSS Module selector for Slide 11e
    const classATab = page.locator('.ClassFilterTabs_filterTab__140Pj').nth(1);
    // Short timeout so it fails fast, not after the full 30s test timeout
    await expect(classATab).toBeVisible({ timeout: 3000 });
    await classATab.click();
    await expect(classATab).toHaveAttribute('aria-selected', 'true');
  });

  test('BREAKS: selects leaderboard row by generated element ID', async ({ page }) => {
    test.fail(); // intentional — ID was invented, never existed in the DOM
    const firstRow = page.locator('#student-rank-1');
    await expect(firstRow).toBeVisible({ timeout: 3000 });
  });

  test('BREAKS: selects leaderboard row by XPath tied to DOM position', async ({ page }) => {
    test.fail(); // intentional — XPath breaks on any structural change
    const firstStudentName = page.locator(
      'xpath=//div[contains(@class,"leaderboardContainer")]//div[2]//div[1]//span[2]'
    );
    await expect(firstStudentName).toHaveText('Emily Rodriguez', { timeout: 3000 });
  });

  test('BREAKS: pagination button selected by index, not label', async ({ page }) => {
    test.fail(); // intentional — nth(0) breaks if any button is added before Previous
    const prevButton = page.locator('button').nth(0);
    await prevButton.click();
    await expect(prevButton).toBeDisabled(); // wrong button — assertion will fail
  });

});
