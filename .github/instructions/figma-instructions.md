## Instructions
You may receive two Figma links: one for the full page and one for a specific widget. Download the whole page image first to understand placement, then retrieve the widget image for implementation-level detail. Analyze layout, dimensions, spacing, styling, and interactions with zero tolerance for inaccuracies.

## Steps to Follow

1. Understand the Figma Layout:
   - Parse structure and hierarchy
   - Extract dimensions, positions, spacing, and alignment
   - Verify margins, paddings, and typography details

2. Component Analysis:
   - Determine role of each component (button, input, table, tab, card, etc.)
   - Analyze style tokens (color, font, border radius, shadows)
   - Identify interactions (hover, active, click)

3. Ask for Clarifications:
   - Ask user when position, spacing, or style is unclear
   - Confirm interpretation before implementation

4. Generate Components:
   - Produce code or structured component plan
   - Ensure compliance with design details and project standards
   - Keep consistency in layout and alignment configuration

5. Iterative Approval:
   - Share interpreted layout
   - Ask user to approve or refine
   - Apply feedback before finalizing

## Constraints
- Pixel-accurate replication is required
- If uncertainty exists, always request clarification
- Keep accessibility in scope while implementing the design
- Generate UI strictly with UUI library packages (`@epam/uui`, `@epam/uui-components`, `@epam/uui-core`) and component guidance under `.github/instructions/uui-library`
- Do not introduce alternate UI libraries unless explicitly approved by the user