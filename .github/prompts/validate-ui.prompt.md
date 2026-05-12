---
agent: agent
description: Launch the app, open it in the browser, navigate to a screen, visually validate UI against Figma design, and fix issues.
---

Command: /validate-ui <optional-url-or-route>

Objective:
- Start the project dev server, open the app in the browser, visually validate the rendered UI against the Figma design, and fix any discrepancies.

Process:
1. **Start the dev server**:
   - Run `npm start` in the terminal (background process).
   - Wait for the server to be ready (default: `http://localhost:3000`).
2. **Open the app in the browser**:
   - Use the Playwright browser tools to open the app URL.
   - If a specific route or URL is provided as parameter, navigate to it.
   - Otherwise, open the root URL.
3. **Capture the current state**:
   - Take a screenshot of the rendered page.
   - Read the page DOM structure using `read_page`.
4. **Compare against Figma design**:
   - If a Figma link is available (from prior `/get-ado-details` or `/figma-to-code` context), fetch the Figma design using the `Framelink Figma MCP` server.
   - If no Figma link is available, ask the user for one or skip design comparison.
   - Compare layout, spacing, colors, typography, component placement, and alignment.
5. **Report findings**:
   - Present a side-by-side summary of discrepancies:
     - Layout/positioning issues
     - Spacing/padding/margin mismatches
     - Color or typography differences
     - Missing or extra elements
     - Responsive behavior issues
   - Rate overall fidelity (High / Medium / Low)
6. **Fix issues**:
   - For each identified issue, propose a code fix.
   - Ask user for confirmation before applying fixes.
   - After applying fixes, reload the browser and re-validate.
   - Repeat until user is satisfied or no issues remain.
7. **Interactive navigation** (optional):
   - If user requests, navigate to other routes/screens and repeat validation.
   - Test hover states, click interactions, and navigation flows.

Inputs:
- URL or route to validate (optional, defaults to `http://localhost:3000`)
- Figma link for comparison (optional, can be inherited from prior workflow)

Use these rules:
- Follow `.github/instructions/figma-instructions.md` for design accuracy standards.
- Use Playwright browser tools (`open_browser_page`, `navigate_page`, `screenshot_page`, `read_page`) for browser interaction.
- Use `Framelink Figma MCP` server for fetching design context when Figma links are available.
- Fix UI using UUI library components (`@epam/uui`, `@epam/uui-components`, `@epam/uui-core`).
- Do not stop at first issue — do a full-page scan before reporting.
- Always screenshot before and after fixes to confirm resolution.
