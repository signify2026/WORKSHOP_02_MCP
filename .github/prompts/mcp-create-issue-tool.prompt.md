---
mode: agent
description: "Add the create_issue tool to mcp-servers/signify-atlassian/server.js, then create a Jira issue from a user story file."
---

# Add create_issue Tool to Signify Atlassian MCP

Add a new tool called `create_issue` to `mcp-servers/signify-atlassian/server.js`.

## Spec

- **Name**: `create_issue`
- **Description**: Create a new Jira issue in the specified project and return its key and URL. (one sentence, exactly as written)
- **Inputs**:
  - `projectKey`: string, min 2 chars, e.g. `"LEARN"`
  - `issueType`: enum `["Bug", "Story", "Task", "User Story"]`
  - `summary`: string, min 5 chars
  - `description`: string, optional
  - `priority`: enum `["Highest", "High", "Medium", "Low", "Lowest"]`, optional
  - `assignee`: string, optional — Jira login username (not display name)
- **Handler**: POST to `${jiraBaseUrl}/rest/api/2/issue` using the existing `jiraRequest` helper
- **Request body**: standard Jira REST API v2 create-issue payload
- **Return**: `textResult` with the created issue `key` and `url`

## Placement

- After the existing `create_page` tool block
- Before the `await server.connect(new StdioServerTransport())` line

## Rules

- Use the existing `jiraRequest` and `textResult` helpers — do not add new HTTP logic
- Use `z.enum` for `issueType` and `priority`, `z.string().optional()` for `description` and `assignee`
- Spread optional fields into `fields` only when provided: `...(priority ? { priority: { name: priority } } : {})`
- Map `assignee` as `{ assignee: { name: assignee } }` (Jira Data Center uses username, not accountId)
- Keep the tool description to one sentence
- After editing, run `node --check mcp-servers/signify-atlassian/server.js` to verify syntax
- Do not modify any other tools or helpers in the file

## Creating an Issue from a User Story File

When this prompt is invoked with a user story file argument, read the file and call `create_issue` with fields mapped as follows:

| User story field | `create_issue` param | Mapping notes |
|---|---|---|
| `Title` | `summary` | Direct |
| `Type` | `issueType` | Use `"Story"` unless the file says `"Bug"` or `"Task"` |
| `Priority` | `priority` | Strip numeric prefix: `"2 - High"` → `"High"` |
| `Assigned` | `assignee` | Omit if `"Unassigned"` |
| `Description` + all sections below | `description` | Compose using Jira wiki markup (see below) |

### Description composition order (Jira wiki markup)

Build the `description` string in this exact order, using `h2.` for section headings:

1. The user story narrative paragraph(s) from **Description**
2. `h2. Design References` — list each reference as a bullet with its file path
3. `h2. Acceptance Criteria` — each `- [ ]` item as a bullet
4. `h2. Technical Notes` — each bullet as-is
5. `h2. Comments` — each comment with author and text

Do not omit any section that is present in the source file.
