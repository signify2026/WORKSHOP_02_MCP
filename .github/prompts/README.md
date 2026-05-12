# Prompt Commands

This folder contains reusable prompt files for MCP-driven workflows.

## Commands
- `/get-ado-details <ado-link-or-id>`
- `/figma-to-code <optional-ado-link-or-figma-link>`
- `/validate-ui <optional-url-or-route>`
- `/create-pr <optional-ado-link-or-change-summary>`

## MCP Prerequisites
- Configure servers in `.vscode/mcp.json`
- Replace `YOUR_AZURE_DEVOPS_ORG` with your Azure DevOps organization name
- Provide Figma API key when prompted by the Figma MCP server

## Notes
- These prompt files include fallback flows for manual input when MCP data is missing.
- Keep instruction files under `.github/instructions` with this repo.
- UI code generation is expected to be UUI-first and instruction-driven from `.github/instructions`.