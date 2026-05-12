---
agent: agent
description: Fetch Azure DevOps work item details from a provided ADO link or ID, with manual fallback.
---

Command: /get-ado-details <ado-link-or-id>

Objective:
- Retrieve and present Azure DevOps work item details.
- If no valid ADO link/ID is passed, ask for manual work item details.

Process:
1. Parse the parameter after `/get-ado-details` as ADO URL, ID, or query text.
2. Use the `ado` MCP server to fetch details.
3. Return a structured output with:
   - Work item type, ID, title
   - Status, assignee, priority
   - Description
   - Acceptance criteria
   - Comments/history highlights
4. If MCP retrieval fails or parameter is missing:
   - Ask user to provide manual details in this format:
     - ID:
     - Title:
     - Description:
     - Acceptance Criteria:
     - Comments:
5. **Extract Figma Links**: Scan the description and comments for Figma URLs (https://figma.com/...). 
   - If found, highlight them in a "Design References" section
   - Preserve context around each link (e.g., full-page link vs widget link)
6. End by suggesting next actions. Prioritize as follows:
   - If Figma links found: Suggest `/figma-to-code` with the extracted Figma link(s)
   - Otherwise: Ask if user wants branch creation, TODO extraction, or file impact analysis

Use these rules:
- Follow `.github/instructions/azure-devops.instructions.md`.
- Preserve markdown formatting in descriptions and comments.
- Do not fabricate missing fields.