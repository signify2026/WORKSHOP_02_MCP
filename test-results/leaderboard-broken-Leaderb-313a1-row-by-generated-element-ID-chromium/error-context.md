# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leaderboard-broken.spec.ts >> LeaderboardTable — BROKEN selectors (demo only) >> BREAKS: selects leaderboard row by generated element ID
- Location: tests/e2e/leaderboard-broken.spec.ts:33:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('#student-rank-1')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('#student-rank-1')

```

```yaml
- main:
  - img
  - heading "EPAM Campus leaderboard" [level=1]
  - paragraph: Digital Platform
  - button "Settings":
    - img
  - button "Pin":
    - img
  - button "Help":
    - img
  - img "Campus User"
  - img
  - button "Global menu":
    - img
  - complementary:
    - navigation:
      - list:
        - listitem:
          - button "Home": 🏠 Home
        - listitem:
          - button "Awards": 🏆 Awards
        - listitem:
          - button "Leaderboard": 📊 Leaderboard
        - listitem:
          - button "Blogs": 📝 Blogs
      - text: More
      - list:
        - listitem:
          - button "Resources": 📚 Resources
        - listitem:
          - button "FAQs": ❓ FAQs
    - button "Collapse sidebar": ‹
  - heading "Class Overview" [level=2]
  - paragraph: Track performance across all your classes
  - button "📚 Class A 25 students enrolled 25 Help for Class A":
    - text: 📚
    - heading "Class A" [level=3]
    - text: 25 students enrolled 25
    - button "Help for Class A":
      - img
  - text: 🥇
  - img "Emily Rodriguez"
  - text: Emily Rodriguez Lead Software Architect 98% 🥈
  - img "Aisha Patel"
  - text: Aisha Patel Principal Engineer 97%
  - button "📚 Class B 25 students enrolled 25 Help for Class B":
    - text: 📚
    - heading "Class B" [level=3]
    - text: 25 students enrolled 25
    - button "Help for Class B":
      - img
  - text: 🥇
  - img "Benjamin Scott"
  - text: Benjamin Scott Senior Developer 92% 🥈
  - img "Avery Nelson"
  - text: Avery Nelson Data Engineer 91%
  - button "📚 Class C 20 students enrolled 20 Help for Class C":
    - text: 📚
    - heading "Class C" [level=3]
    - text: 20 students enrolled 20
    - button "Help for Class C":
      - img
  - text: 🥇
  - img "Logan Reed"
  - text: Logan Reed Junior Developer 91% 🥈
  - img "Jeremiah Ward"
  - text: Jeremiah Ward Graduate Engineer 90%
  - tablist:
    - tab "All 70" [selected]
    - tab "Class A 25"
    - tab "Class B 25"
    - tab "Class C 20"
  - text: All
  - table:
    - row "Rank Student Name Class Score Percentage":
      - columnheader "Rank":
        - text: Rank
        - button:
          - img
      - columnheader "Student Name":
        - text: Student Name
        - button:
          - img
      - columnheader "Class":
        - text: Class
        - button:
          - img
      - columnheader "Score":
        - text: Score
        - button:
          - img
      - columnheader "Percentage":
        - text: Percentage
        - button:
          - img
    - rowgroup:
      - row "1 Emily Rodriguez Emily Rodriguez Class A 98 98%" [expanded]:
        - cell "1"
        - cell "Emily Rodriguez Emily Rodriguez":
          - img "Emily Rodriguez"
          - text: Emily Rodriguez
        - cell "Class A"
        - cell "98"
        - cell "98%"
      - row "2 Aisha Patel Aisha Patel Class A 97 97%" [expanded]:
        - cell "2"
        - cell "Aisha Patel Aisha Patel":
          - img "Aisha Patel"
          - text: Aisha Patel
        - cell "Class A"
        - cell "97"
        - cell "97%"
      - row "3 Sarah Chen Sarah Chen Class A 96 96%" [expanded]:
        - cell "3"
        - cell "Sarah Chen Sarah Chen":
          - img "Sarah Chen"
          - text: Sarah Chen
        - cell "Class A"
        - cell "96"
        - cell "96%"
      - row "4 Lisa Wang Lisa Wang Class A 95 95%" [expanded]:
        - cell "4"
        - cell "Lisa Wang Lisa Wang":
          - img "Lisa Wang"
          - text: Lisa Wang
        - cell "Class A"
        - cell "95"
        - cell "95%"
      - row "5 Marcus Johnson Marcus Johnson Class A 94 94%" [expanded]:
        - cell "5"
        - cell "Marcus Johnson Marcus Johnson":
          - img "Marcus Johnson"
          - text: Marcus Johnson
        - cell "Class A"
        - cell "94"
        - cell "94%"
      - row "6 Chris Anderson Chris Anderson Class A 93 93%" [expanded]:
        - cell "6"
        - cell "Chris Anderson Chris Anderson":
          - img "Chris Anderson"
          - text: Chris Anderson
        - cell "Class A"
        - cell "93"
        - cell "93%"
      - row "7 David Kim David Kim Class A 92 92%" [expanded]:
        - cell "7"
        - cell "David Kim David Kim":
          - img "David Kim"
          - text: David Kim
        - cell "Class A"
        - cell "92"
        - cell "92%"
      - row "8 Benjamin Scott Benjamin Scott Class B 92 92%" [expanded]:
        - cell "8"
        - cell "Benjamin Scott Benjamin Scott":
          - img "Benjamin Scott"
          - text: Benjamin Scott
        - cell "Class B"
        - cell "92"
        - cell "92%"
      - row "9 Alex Thompson Alex Thompson Class A 91 91%" [expanded]:
        - cell "9"
        - cell "Alex Thompson Alex Thompson":
          - img "Alex Thompson"
          - text: Alex Thompson
        - cell "Class A"
        - cell "91"
        - cell "91%"
      - row "10 Isabella White Isabella White Class A 91 91%" [expanded]:
        - cell "10"
        - cell "Isabella White Isabella White":
          - img "Isabella White"
          - text: Isabella White
        - cell "Class A"
        - cell "91"
        - cell "91%"
  - status
  - button "Previous" [disabled]
  - button "Next"
  - text: 1-10 of 70
  - combobox:
    - option "10" [selected]
    - option "25"
    - option "50"
    - option "100"
  - text: Learning Programme 6h 01m JavaScript 25% 1h 31m Java 25% 1h 30m Microsoft 50% 3h
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
> 36 |     await expect(firstRow).toBeVisible({ timeout: 3000 });
     |                            ^ Error: expect(locator).toBeVisible() failed
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
  51 |     await expect(prevButton).toBeDisabled(); // wrong button — assertion will fail
  52 |   });
  53 | 
  54 | });
  55 | 
```