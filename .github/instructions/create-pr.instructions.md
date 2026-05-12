## Instructions
Use this workflow to create a branch, apply code changes safely, and open a pull request.

## Steps to Follow

1. Prepare Context:
   - If an ADO link is provided, retrieve work item ID/title and acceptance criteria
   - Derive branch name from ticket context when possible
   - If missing ADO context, ask user for branch name and change objective

2. Create Branch:
   - Create from the correct base branch (default `main` unless user specifies)
   - Use naming convention like `feature/ado-<id>-<short-title>` or `feature/<short-title>`

3. Implement Changes:
   - Apply requested code updates
   - Keep scope aligned to the ticket/request
   - Run relevant checks/tests when available

4. Summarize and Prepare PR:
   - Summarize changed files and behavior
   - Generate a PR title and description
   - Include ticket references and testing notes

5. Fallback Behavior:
   - If branch or PR automation tools are unavailable, use git CLI steps and provide the exact commands
   - If remote creation is unavailable, provide a ready-to-paste PR body

## Constraints
- Never include secrets/tokens in commits or PR description
- Do not mix unrelated refactors with requested changes
- Keep commit/PR message aligned with the actual code delta
- For UI changes, implement using UUI library and follow component behavior/style guidance from `.github/instructions`
- Avoid adding other UI component libraries unless explicitly requested