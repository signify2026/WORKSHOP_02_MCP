# GitHub Copilot Instructions

See [AGENTS.md](../AGENTS.md) for full project context, commands, architecture, and conventions.

## Tool Pre-Check — Required Before Every Task

Before starting **any** task, verify that the following tool groups are available and enabled. If any are missing, stop and notify the user with the exact tool group name to enable.

### Required tool groups

| Group | Key tools | Needed for |
|-------|-----------|------------|
| **File system** | `read_file`, `create_file`, `replace_string_in_file` | Reading and editing source files |
| **Terminal** | `create_and_run_task`, `get_task_output` | Running `npm start`, `npm test`, `npx playwright test` |
| **Playwright MCP** | `mcp_playwright_browser_navigate`, `mcp_playwright_browser_snapshot`, `mcp_playwright_browser_take_screenshot`, `mcp_playwright_browser_click` | Live UI validation, E2E test generation |
| **Azure DevOps MCP** | `mcp_ado_wit_get_work_item`, `mcp_ado_repo_create_pull_request` | Fetching work items, creating PRs |

### Pre-check procedure

1. Attempt to call a lightweight tool from each required group (e.g. read a known file).
2. If a tool call fails with "disabled by user", **immediately stop** and output:

   > ⚠️ **Tool setup required**  
   > The following tool group is disabled: `<group name>`  
   > Please enable it via the wrench icon (🔧) in the Copilot chat panel, then re-run the task.

3. Do not proceed around disabled tools — do not fall back to guessing or hallucinating outputs.
4. Once all tools respond successfully, confirm readiness and begin the task.

## Persistent Tool Reminder

If Playwright MCP tools become unavailable mid-task (e.g. after a server restart), pause and prompt:

> The Playwright MCP server appears to have disconnected. Check **Output → GitHub Copilot - MCP** for errors, restart if needed, then continue.