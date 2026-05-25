# snap-code-project — Agent Instructions

React + TypeScript dashboard app built exclusively with the **EPAM UUI** component library.

## Commands

| Task | Command |
|------|---------|
| Install | `yarn` |
| Dev server | `npm start` → http://localhost:3000 |
| Unit tests | `npm test` |
| E2E tests | `npm run test:e2e` |
| E2E tests (UI mode) | `npm run test:e2e:ui` |
| Build | `npm run build` |

> Playwright auto-starts the dev server (`reuseExistingServer: true`). If port 3000 is already up, tests skip the start step.

## Architecture

```
src/
  pages/          # Top-level route components (MainPage)
  components/     # Feature components, each in its own folder
  common/         # Shared layout (Menu)
  data/           # Mock data (mockData.ts)
  utils/          # Pure logic helpers (dataUtils.ts)
tests/e2e/        # Playwright spec files
```

- **Single route**: `/` renders `MainPage`, which composes all feature components.
- **State**: Local `useState` only — no Redux, no Zustand.
- **Theme**: `loveship` (imported via `@epam/assets/theme/theme_loveship.scss`).

## Component Conventions

Each component lives in its own folder and exports from an `index.ts` barrel:

```
ComponentName/
  ComponentName.tsx
  ComponentName.module.scss
  ComponentName.test.tsx
  index.ts
```

- **UI**: Use UUI components only — `@epam/uui`, `@epam/uui-components`, `@epam/uui-core`. See [.github/instructions/uui-library/](.github/instructions/uui-library/) for per-component usage docs.
- **Styles**: SCSS modules (`*.module.scss`). Never inline styles. Use `:global()` for non-scoped selectors.
- **Data binding**: Use `useArrayDataSource` + `DataTable` from `@epam/uui-core` for tabular data.

## Testing

- **Unit**: React Testing Library via `react-scripts test`. Test files co-located with components.
- **E2E**: Playwright specs in `tests/e2e/`. Follow [.github/instructions/playwright-testing.instructions.md](.github/instructions/playwright-testing.instructions.md) — selector hierarchy is mandatory (`getByRole` → `getByLabel` → `getByText` → `getByTestId`; never CSS/XPath).

## Key Workflows

| Workflow | Resource |
|----------|----------|
| Figma → Component (full pipeline) | `/snap-code` agent — [.github/agents/snap-code.agent.md](.github/agents/snap-code.agent.md) |
| Analyze Figma design | `/figma-analysis` skill — [.github/skills/figma-analysis/SKILL.md](.github/skills/figma-analysis/SKILL.md) |
| Validate UI against design | `/playwright-validation` skill — [.github/skills/playwright-validation/SKILL.md](.github/skills/playwright-validation/SKILL.md) |
| Generate E2E tests | `/generate-tests` prompt — [.github/prompts/generate-tests.prompt.md](.github/prompts/generate-tests.prompt.md) |
| Repair broken locators | `/repair-locators` prompt — [.github/prompts/repair-locators.prompt.md](.github/prompts/repair-locators.prompt.md) |
| Fetch ADO work item | `/get-ado-details` prompt — [.github/prompts/get-ado-details.prompt.md](.github/prompts/get-ado-details.prompt.md) |
| Create PR | `/create-pr` prompt — [.github/prompts/create-pr.prompt.md](.github/prompts/create-pr.prompt.md) |

## Critical Constraints

- **No alternate UI libraries.** Only `@epam/uui*` packages. Never introduce MUI, Ant Design, shadcn, etc.
- **No fabricating design values.** If spacing, color, or layout is unclear, ask — do not guess.
- **Accessibility required.** Proper ARIA roles, labels, keyboard navigation in all components.
- **Branch naming**: `feature/ado-<id>-<short-title>` or `feature/<short-title>`.
