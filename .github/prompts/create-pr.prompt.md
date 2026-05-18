---
description: "[OPTIONAL — covered separately] Create branch, apply code changes, and prepare/open a PR."
agent: agent
argument-hint: "Ticket title or ADO link"
tools:
  - read
  - edit
  - search
  - execute
  - ado/*
---

# Create Pull Request (Optional Step)

> **Note**: Branch and PR creation is covered in its own dedicated session.
> This prompt is included for reference and can be used independently when needed.

## Objective

Open a new branch, apply requested code changes, and prepare a pull request.

## Steps

1. **Resolve context**:
   - If an ADO link/ID is provided, fetch ticket details via `ado` MCP server.
   - Otherwise, ask user for: ticket title/goal, acceptance criteria, base branch.
2. **Create branch**:
   - Derive name from context (e.g., `feature/us-4821-class-filter-tabs`).
   - Branch from `main` unless specified otherwise.
3. **Apply changes**:
   - Implement requested code updates.
   - Keep scope aligned to the ticket/request.
   - Run validations/tests when available.
4. **Prepare PR**:
   - Draft title and description (problem, change summary, testing notes, ticket link).
   - If automation is available, create the PR.
   - Otherwise, provide exact git commands and a ready-to-paste PR body.

## Rules

- Follow `.github/instructions/create-pr.instructions.md`.
- Use UUI library components for UI changes — see `.github/instructions/uui-library/`.
- Never include secrets in branch names, commits, or PR content.
- Explicitly list changed files and verification steps.