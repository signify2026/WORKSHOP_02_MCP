---
agent: agent
description: Create branch, apply code changes, and prepare/open a PR using ADO context when available.
---

Command: /create-pr <optional-ado-link-or-change-summary>

Objective:
- Open a new branch and apply requested code changes.
- Prepare or create pull request from that branch.

Process:
1. Resolve context:
   - If ADO link/ID is provided, fetch ticket details using `ado` MCP server.
   - If not, ask user for manual ticket title/goal and acceptance criteria.
2. Branch setup:
   - Create branch name from ticket context (for example: `feature/ado-123-short-title`).
   - Create branch from target base branch (`main` unless specified).
3. Implementation:
   - Apply requested code changes.
   - Keep changes scoped to the request.
   - Run relevant validations/tests when possible.
4. PR preparation:
   - Draft title and description with problem, change summary, testing, and ticket link.
   - If PR automation is available, create PR.
   - Otherwise, provide exact commands and PR body for manual creation.

Fallback manual ticket template:
- Ticket/Work item:
- Goal:
- Acceptance Criteria:
- Base branch:
- Preferred branch name (optional):

Use these rules:
- Follow `.github/instructions/create-pr.instructions.md`.
- For UI implementation in this project, use UUI library components and align with docs under `.github/instructions`.
- Do not include secrets in branch, commit, or PR content.
- Explicitly list changed files and verification steps.