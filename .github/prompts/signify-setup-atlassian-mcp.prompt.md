---
mode: agent
description: "Set up and validate the custom Signify Atlassian MCP server for Jira and Confluence Data Center."
---

# Setup Signify Atlassian MCP

Set up and validate the local `signify-atlassian` MCP server for the workshop.

## Objective

Help the user get the custom Signify Atlassian MCP ready without manually remembering commands.

Important: execute the checks using available file and terminal tools. Do not turn this into a manual checklist unless the chat client does not expose file/terminal tools. If tools are unavailable, stop and tell the user to switch Copilot Chat to Agent Mode and enable workspace/terminal tools.

## Steps

1. **Verify files exist**
   - Use file/workspace tools to confirm these files are present:
     - `mcp-servers/signify-atlassian/server.js`
     - `mcp-servers/signify-atlassian/package.json`
     - `mcp-servers/signify-atlassian/.env.example`
     - `.vscode/mcp.json`
   - Check that `.env` is listed in `.gitignore`. If it is not, add it.
   - If the user is **not** running inside VS Code (e.g. IntelliJ), check whether `mcp-servers/signify-atlassian/.env` exists. If it does not, instruct the user to copy `.env.example` to `.env` and fill in their values:
     ```bash
     cp mcp-servers/signify-atlassian/.env.example mcp-servers/signify-atlassian/.env
     ```
   - Do not read or print the contents of `.env`.

2. **Verify VS Code MCP registration**
   - Read `.vscode/mcp.json`.
   - Confirm there is an `signify-atlassian` server entry.
   - Confirm it passes:
     - `ATLASSIAN_BASE_URL`
     - `CONFLUENCE_BASE_URL`
     - `ATLASSIAN_PAT`
   - Confirm `ATLASSIAN_PAT` is sourced from a password input, not hardcoded.

3. **Install MCP server dependencies**
   - Execute this from `mcp-servers/signify-atlassian`:

     ```bash
     npm install
     ```

     from `mcp-servers/signify-atlassian`.

4. **Run syntax and JSON checks**
   - Execute this from the repository root:

     ```bash
     node --check mcp-servers/signify-atlassian/server.js
     node -e "JSON.parse(require('fs').readFileSync('.vscode/mcp.json','utf8')); console.log('mcp json ok')"
     ```

5. **Validate tool discovery without real credentials**
   - Run a local MCP client smoke test if possible.
   - Confirm the server exposes:
     - `get_issue`
     - `search_issues`
     - `create_page`
     - `create_issue`

6. **Capture common failure mode (500 wrapper over upstream 406)**
   - If a call fails with a message like:
     - `Atlassian request failed: 500 Internal Server Error ... Response: "HTTP 406 Not Acceptable"`
   - Treat this as an upstream Jira/Confluence accept/auth/path issue wrapped by MCP error handling, not as an immediate server crash.
   - Verify and report:
     - `ATLASSIAN_BASE_URL` is root-only (for example `https://jiraeu.epam.com`) and does not include `/browse` or `/rest/api/...`
     - `ATLASSIAN_PAT` is injected from secure input (or `.env` outside VS Code), never hardcoded
     - token user can open the same issue in browser (browse permission)
     - response diagnostics from server error message (status, content-type, request-id, response preview)
   - If needed, suggest a safe read-only retry using `get_issue` on a known-visible issue key.

7. **Guide the VS Code registration**
   - Tell the user to reload VS Code.
   - Tell the user to open Copilot Chat in Agent Mode.
   - Tell the user to open **Tools** and confirm `signify-atlassian` appears.
   - Explain that VS Code will prompt once (securely) for:
     - Jira base URL
     - Confluence base URL
     - PAT (masked input)

   **IntelliJ / outside VS Code**: credentials come from `mcp-servers/signify-atlassian/.env` instead. The server loads this file automatically via `dotenv` at startup, so no extra configuration is needed.

8. **Optional real Jira test**
   - If the user confirms they have a safe issue key and PAT already configured, test:

     ```text
     Use signify-atlassian get_issue to fetch <issue-key>.
     ```

   - Do not ask the user to paste a PAT into chat.

## Rules

- Do not hardcode personal access tokens.
- Do not commit `.env`. Verify it is in `.gitignore`.
- Do not read or print the contents of `.env` in any tool output.
- Do not create or modify real Jira/Confluence content unless the user explicitly confirms.
- Prefer read-only validation first: `get_issue` or `search_issues`.
- Use `create_page` only after the user confirms the target Confluence space and page title.
- Use `create_issue` only after the user explicitly confirms project key, issue type, and summary.
