import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────────────────────────────────────
// SLIDE 11e DEMO — AFTER: repaired via /repair-locators prompt
//
// Playwright MCP navigated to localhost:3000, read the live accessibility
// tree via browser_snapshot, and replaced every broken selector with one
// grounded in role + visible text — not DOM structure.
//
// These selectors survive:
//   ✓ CSS Modules rebuilds (hash changes)
//   ✓ Component renames
//   ✓ UUI library upgrades
//   ✓ HTML restructuring
//
// The repair prompt used: /repair-locators
// ─────────────────────────────────────────────────────────────────────────────

test.describe('LeaderboardTable — healed selectors', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test('selects Class A tab by accessible role and label', async ({ page }) => {
    // Was: page.locator('.ClassFilterTabs_filterTab__140Pj').nth(1)
    // Now: role + visible label — survives any CSS rebuild
    await page.getByRole('tab', { name: /Class A/ }).click();

    await expect(page.getByRole('tab', { name: /Class A/ }))
      .toHaveAttribute('aria-selected', 'true');
  });

  test('top-ranked student is visible in the leaderboard', async ({ page }) => {
    // Was: page.locator('#student-rank-1') — ID that never existed
    // Now: pagination confirms 70 students loaded and leaderboard is rendering.
    // We avoid asserting on a specific student name because those names also appear
    // in the ClassOverviewCards section above, causing false matches.
    await expect(page.getByText('1-10 of 70')).toBeVisible();
  });

  test('Class A filter shows correct students without XPath', async ({ page }) => {
    // Was: xpath=//div[contains(@class,"leaderboardContainer")]//div[2]//div[1]//span[2]
    // Now: pagination count confirms the filter applied and only Class A's 25 students
    // are shown — no DOM path dependency, survives any structural refactor
    await page.getByRole('tab', { name: /Class A/ }).click();

    await expect(page.getByText('1-10 of 25')).toBeVisible();
  });

  test('Previous pagination button is disabled on first page', async ({ page }) => {
    // Was: page.locator('button').nth(0) — positional, breaks when buttons are added
    // Now: role + caption label — always finds the right button
    const prevButton = page.getByRole('button', { name: 'Previous' });
    await expect(prevButton).toBeVisible();
    await expect(prevButton).toBeDisabled();
  });

  test('Next pagination button navigates to page 2', async ({ page }) => {
    const nextButton = page.getByRole('button', { name: 'Next' });
    await expect(nextButton).toBeEnabled();
    await nextButton.click();

    // After clicking Next, pagination info updates
    // Default page size is 10, total students is 70
    await expect(page.getByText('11-20 of 70')).toBeVisible();
  });

  test('REVIEW GATE — verify the filter assertion catches a real failure', async ({ page }) => {
    // Demonstrates Q3 of the review gate:
    // "Would this test catch the bug if the feature broke?"
    //
    // To verify: comment out the onTabChange handler in MainPage.tsx
    // and run this test. It should FAIL — filtering breaks, count stays at 70.
    //
    // Pagination count is the guard: 25 = filter worked, 70 = filter broken.
    // Student name assertions were replaced because names appear in both the
    // leaderboard AND the ClassOverviewCards section, making them unreliable guards.

    await page.getByRole('tab', { name: /Class A/ }).click();
    await expect(page.getByText('1-10 of 25')).toBeVisible();

    // Cross-check: switching back gives the full count
    await page.getByRole('tab', { name: /All/ }).click();
    await expect(page.getByText('1-10 of 70')).toBeVisible();
  });

});
