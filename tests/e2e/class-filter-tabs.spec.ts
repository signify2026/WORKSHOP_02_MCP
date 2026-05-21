import { test, expect } from '@playwright/test';

// Generated via /explore-and-generate prompt — Slide 11b/11c demo
// Selectors read from accessibility tree by Playwright MCP, not written from memory.
// Every selector follows: getByRole > getByText > getByLabel (never CSS IDs or XPath)

test.describe('ClassFilterTabs — leaderboard filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the tablist to be visible before each test
    await expect(page.getByRole('tablist')).toBeVisible();
  });

  test('renders all four filter tabs on load', async ({ page }) => {
    const tablist = page.getByRole('tablist');
    await expect(tablist).toBeVisible();

    await expect(page.getByRole('tab', { name: /All/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Class A/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Class B/ })).toBeVisible();
    await expect(page.getByRole('tab', { name: /Class C/ })).toBeVisible();
  });

  test('All tab is selected by default', async ({ page }) => {
    const allTab = page.getByRole('tab', { name: /All/ });
    await expect(allTab).toHaveAttribute('aria-selected', 'true');

    const classATab = page.getByRole('tab', { name: /Class A/ });
    await expect(classATab).toHaveAttribute('aria-selected', 'false');
  });

  test('selecting Class A tab updates aria-selected state', async ({ page }) => {
    await page.getByRole('tab', { name: /Class A/ }).click();

    await expect(page.getByRole('tab', { name: /Class A/ })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tab', { name: /All/ })).toHaveAttribute('aria-selected', 'false');
  });

  test('Class A tab shows only Class A students in the leaderboard', async ({ page }) => {
    await page.getByRole('tab', { name: /Class A/ }).click();

    // Class A has 25 students — pagination count is unique to the leaderboard
    // and confirms filtering worked without coupling to student names that also
    // appear in the ClassOverviewCards section above
    await expect(page.getByText('1-10 of 25')).toBeVisible();
  });

  test('switching back to All tab restores all students', async ({ page }) => {
    await page.getByRole('tab', { name: /Class A/ }).click();
    await expect(page.getByText('1-10 of 25')).toBeVisible();

    await page.getByRole('tab', { name: /All/ }).click();
    await expect(page.getByRole('tab', { name: /All/ })).toHaveAttribute('aria-selected', 'true');

    // All tab shows 70 students across all classes
    await expect(page.getByText('1-10 of 70')).toBeVisible();
  });

  test('clicking the already-active tab does not change state', async ({ page }) => {
    // All is active by default — click it again
    await page.getByRole('tab', { name: /All/ }).click();

    // Should remain active, no error, no state change
    await expect(page.getByRole('tab', { name: /All/ })).toHaveAttribute('aria-selected', 'true');
  });

});
