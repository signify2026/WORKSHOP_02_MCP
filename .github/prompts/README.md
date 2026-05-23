# Prompt Commands

This folder contains reusable prompt files for MCP-driven workflows.

## Commands

| Command | What it does | MCP used |
|---------|-------------|----------|
| `/get-user-story` | Read user story from `.github/demo/user-story.md`, present ACs and design references | — |
| `/get-ado-details <ado-link-or-id>` | Pull requirements directly from an Azure DevOps work item | ADO MCP |
| `/figma-to-code <optional-ado-link-or-figma-link>` | Analyse Figma design and generate component `.tsx`, `.module.scss`, barrel export | Figma MCP |
| `/validate-ui <optional-url-or-route>` | Open the live app, screenshot rendered UI, compare to Figma design, fix discrepancies | Playwright MCP |
| `/generate-tests` | Navigate the live app, read the accessibility tree, generate `@playwright/test` spec per AC, run and verify | Playwright MCP |
| `/repair-locators` | Repair a failing test — navigate live page, replace broken selectors from accessibility tree | Playwright MCP |
| `/create-pr <optional-ado-link-or-change-summary>` | Create a pull request with a structured description | — |

## Workflow order (full pipeline)

```
/get-user-story  →  /figma-to-code  →  /validate-ui  →  /generate-tests  →  /create-pr
```

Or use `@snap-code build the <feature>` to run the full pipeline as a single orchestrated agent.

## What `/validate-ui` vs `/generate-tests` do

| | `/validate-ui` | `/generate-tests` |
|--|--|--|
| **Purpose** | Design fidelity check | Automated test coverage |
| **Tool** | `browser_screenshot` + Figma comparison | `browser_snapshot` (accessibility tree) |
| **Output** | Fixed code that matches Figma | `tests/e2e/<component>.spec.ts` |
| **When to run** | After `/figma-to-code` | After `/validate-ui` passes |

## MCP Prerequisites
- Configure servers in `.vscode/mcp.json` (already committed — Playwright, Figma, ADO wired)
- Provide Figma API key when prompted
- Provide Azure DevOps org name when prompted

## Notes
- These prompt files include fallback flows for manual input when MCP data is missing.
- Keep instruction files under `.github/instructions` with this repo.
- UI code generation is expected to be UUI-first and instruction-driven from `.github/instructions`.
- Test generation follows `.github/instructions/playwright-testing.instructions.md` automatically.