# Demo Flow: Figma-to-Code with AI-Assisted Validation

A step-by-step guide for running the live demo with deliberate pacing.

---

## Pre-Demo Setup

- [ ] Project cloned and dependencies installed (`yarn` or `npm install`)
- [ ] VS Code open with the project loaded
- [ ] MCP servers configured in `.vscode/mcp.json` (Figma MCP, Playwright MCP)
- [ ] Figma API key ready
- [ ] Dev server starts successfully (`npm start`)
- [ ] Customization files visible:
  - `.github/agents/snap-code.agent.md` (orchestrator agent)
  - `.github/prompts/` (individual task prompts)
  - `.github/skills/playwright-validation/` (validation skill)
  - `.github/instructions/` (always-on rules + UUI docs)

---

## Option A: Full Orchestration with `@snap-code`

**What**: Use the custom agent to run the entire workflow end-to-end.

**Action**: In Copilot Chat, type `@snap-code build the class filter tabs component`

**What happens**:
1. The agent reads the user story from `.github/demo/user-story.md`
2. Presents requirements and design references, pauses for confirmation
3. Analyzes the design and generates the component using UUI library
4. Starts the dev server, opens the browser via Playwright, validates the rendered UI
5. Reports discrepancies, fixes them, and re-validates

**Key talking points**:
- A **custom agent** (`.agent.md`) is a persona with scoped tools and a defined workflow
- `@snap-code` has access to `read`, `edit`, `search`, `execute`, plus Figma and Playwright MCP servers
- It orchestrates multiple steps with pauses between them — this is what makes it different from a prompt
- The agent references instruction files and skills automatically — it doesn't need to be told about UUI rules or validation methodology

⏸ **Pause**: After Step 1 (user story), explain the 5 primitives before the agent continues.

---

## Option B: Step-by-Step with Individual Prompts

Use this when you want to show each primitive in isolation, or let participants run steps independently.

### Step 1: Understand the Requirements — `/get-user-story`

**Action**: Run the `/get-user-story` prompt.

**What happens**:
- Reads `.github/demo/user-story.md`
- Presents the structured user story: title, description, acceptance criteria
- Extracts design references (local images in `src/assets/figma-analysis/`)
- Suggests running `/figma-to-code` as next step

**Key talking points**:
- This is a **prompt file** (`.prompt.md`) — a single focused task, reusable and version-controlled
- It uses `agent: agent` and scoped `tools: [read, search]` — minimal tools for the task
- The user story format mirrors what you'd get from any ticket system

⏸ **Pause**: Let participants read the output. Highlight acceptance criteria and design references.

---

### Step 2: Convert Design to Code — `/figma-to-code`

**Action**: Run the `/figma-to-code` prompt (it chains from the user story context).

**What happens**:
- Analyzes the design (Figma MCP or local images)
- Maps UI elements to UUI library components (references `.github/instructions/uui-library/`)
- Presents an implementation plan, asks for confirmation
- Generates: component `.tsx`, styles `.module.scss`, test file, barrel export

**Key talking points**:
- **Instruction files** (`.github/instructions/figma-instructions.md`) are always-on rules that guide design interpretation — pixel accuracy, UUI-first approach
- The **UUI component library docs** (60+ files in `.github/instructions/uui-library/`) ensure correct component and prop usage
- This prompt uses `Framelink Figma MCP/*` — the MCP server name from `.vscode/mcp.json`

⏸ **Pause**: Walk through the generated code. Show how UUI components were selected.

---

### Step 3: Live Validation with Playwright — `/validate-ui`

**Action**: Run the `/validate-ui` prompt.

**What happens**:
1. Dev server starts in background
2. Playwright MCP opens the app in a browser
3. Takes a snapshot/screenshot of the rendered page
4. Compares against the design reference (layout, spacing, colors, typography)
5. Reports discrepancies with severity ratings
6. Proposes fixes, applies them (with confirmation), then re-validates

**Key talking points**:
- This is the **skill + MCP pairing** pattern:
  - **Playwright MCP server** = browser automation capabilities (navigate, snapshot, click)
  - **Playwright Validation skill** (`.github/skills/playwright-validation/SKILL.md`) = validation methodology (what to check, how to report, fix-and-revalidate loop)
- A skill has a `SKILL.md` with YAML frontmatter (`name`, `description`) — the agent discovers it by matching keywords in the description
- The skill makes the agent *smarter* without writing custom tools

⏸ **Pause**: Let participants watch the browser open. Show before/after screenshots.

---

## Bonus (If Time Permits): ADO Integration — `/get-ado-details`

**What**: Show how the same flow works when pulling requirements directly from Azure DevOps.

**Action**: Run `/get-ado-details` with an ADO work item link.

**Key talking point**: The architecture is the same — only the *source* of the user story changes. The flow decouples from the ticket system.

---

## Summary: The 5 Primitives Showcased

| Primitive             | File                                          | Purpose                              |
|-----------------------|-----------------------------------------------|--------------------------------------|
| **Custom Agent**      | `.github/agents/snap-code.agent.md`           | Orchestrates the full workflow        |
| **Prompt files**      | `.github/prompts/*.prompt.md`                 | Individual focused tasks              |
| **Instruction files** | `.github/instructions/`                       | Always-on rules (design, UUI docs)   |
| **Skills**            | `.github/skills/playwright-validation/`       | On-demand validation methodology      |
| **MCP servers**       | `.vscode/mcp.json`                            | External capabilities (Figma, Playwright) |

**Key insight**: Agent orchestrates. Prompts do single tasks. Instructions set guardrails. Skills provide methodology. MCP connects tools.

---

## Pacing Guidelines

| Step                      | Target Duration | Notes                                          |
|---------------------------|----------------|-------------------------------------------------|
| Pre-demo setup            | 5 min          | Should be done before audience joins             |
| Option A (full agent)     | 25–30 min      | Best for showing the end-to-end flow             |
| — or Option B Step 1      | 8–10 min       | Include pause for Q&A on prompt file structure   |
| — or Option B Step 2      | 12–15 min      | Longest step; walk through generated code slowly |
| — or Option B Step 3      | 10–12 min      | Live browser — high audience engagement          |
| Bonus (ADO)               | 5 min          | Only if ahead of schedule                        |
| **Total (Option A)**      | **30–35 min**  |                                                  |
| **Total (Option B)**      | **35–42 min**  |                                                  |
| **Total**      | **35–42 min**  |                                                  |
