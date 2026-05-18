---
description: "[BONUS — requires ADO access] Fetch Azure DevOps work item details from a provided ADO link or ID."
agent: agent
argument-hint: "ADO work item URL or ID"
tools:
  - ado/*
---

# Get ADO Details (Bonus Extension)

> **Note**: This prompt requires access to an Azure DevOps organization via the `ado` MCP server.
> For the main flow, use `/get-user-story` instead which reads a local user story file.

## Objective

Retrieve and present Azure DevOps work item details from a provided link or ID.

## Steps

1. **Parse input**: Accept an ADO URL, work item ID, or query text.
2. **Fetch from ADO**: Use the `ado` MCP server to retrieve work item details.
3. **Present structured output**:
   - Work item type, ID, title
   - Status, assignee, priority
   - Description (preserve markdown)
   - Acceptance criteria
   - Comments/history highlights
4. **Fallback on failure**: If the MCP call fails or no input is provided, ask user for:
   - ID, Title, Description, Acceptance Criteria, Comments
5. **Extract design references**: Scan description and comments for Figma URLs.
   - If found, present in a **Design References** section with context.
6. **Suggest next steps**:
   - If Figma links found → suggest `/figma-to-code`
   - Otherwise → suggest implementation planning or file impact analysis

## Rules

- Follow `.github/instructions/azure-devops.instructions.md`.
- Preserve markdown formatting in descriptions and comments.
- Do not fabricate missing fields.