---
agent: agent
description: Convert Figma design to implementation, preferring Figma links from ADO details and falling back to manual input.
---

Command: /figma-to-code <optional-ado-link-or-figma-link>

Objective:
- Build UI from Figma with strong traceability to ADO context.

Process:
1. If parameter is ADO link/ID:
   - Use `ado` MCP server to fetch work item details.
   - Search description/comments/attachments for Figma URLs.
2. If parameter is directly a Figma URL:
   - Use it as primary design source.
3. If no Figma link is available from ADO or parameter:
   - Ask user for Figma links (full-page and widget-level), or ask for manual design details.
4. Use `Framelink Figma MCP` server to retrieve design context.
5. Produce output in this order:
   - Layout interpretation
   - Component mapping
   - Implementation plan
   - Code changes (after user confirmation where required)
6. Request final confirmation for spacing and alignment decisions before final implementation.

Fallback manual design template:
- Page section structure:
- Widget dimensions:
- Spacing/padding/margins:
- Fonts and sizes:
- Colors:
- Interactions:

Use these rules:
- Follow `.github/instructions/figma-instructions.md`.
- Generate implementation strictly with UUI library (`@epam/uui`, `@epam/uui-components`, `@epam/uui-core`) and matching component docs in `.github/instructions`.
- If a needed UI element is not obvious, first search `.github/instructions` for the closest UUI component before creating custom markup.
- Keep design replication as accurate as possible.
- Ask clarifying questions for ambiguous placement or style.