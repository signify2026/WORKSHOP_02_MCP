# User Story: Class Filter Tabs Component

## Work Item Details

| Field         | Value                                              |
|---------------|----------------------------------------------------|
| **ID**        | US-4821                                            |
| **Type**      | Story                                              |
| **Title**     | Implement Class Filter Tabs for Learning Dashboard |
| **Status**    | In Progress                                        |
| **Priority**  | 2 - High                                           |
| **Assigned**  | Unassigned                                         |

## Description

As a learner on the Learning Dashboard, I want to filter classes by category (All, Current, Upcoming, Past) using a set of horizontal tab buttons, so that I can quickly navigate between different class views.

The Class Filter Tabs component should be placed directly below the header navigation and above the main content area. It acts as the primary navigation for the class overview section.

### Design References

- **Full page layout**: See `src/assets/figma-analysis/main-content-full-layout.png`
- **Widget detail**: See `src/assets/figma-analysis/class-filter-tabs.png`
- **Center content area**: See `src/assets/figma-analysis/complete-center-area.png`

## Acceptance Criteria

- [ ] A horizontal row of tab buttons is rendered with labels: **All**, **Current**, **Upcoming**, **Past**
- [ ] Each tab displays a count badge showing the number of items in that category
- [ ] The active tab is visually distinguished (highlighted underline or background)
- [ ] Clicking a tab updates the active state and filters the content below
- [ ] The component uses UUI library `TabButton` component (`@epam/uui`)
- [ ] Layout matches the Figma design with correct spacing, typography, and alignment
- [ ] Component has unit tests covering tab selection and count display
- [ ] Component follows project conventions: CSS Modules (`.module.scss`), TypeScript, functional component

## Technical Notes

- Reference `src/components/ClassFilterTabs/` if a skeleton already exists
- Use `TabButton` from `@epam/uui` — see `.github/instructions/uui-library/TabButton.md`
- Style with CSS Modules (`.module.scss`)
- Mock data can be sourced from `src/data/mockData.ts`

## Comments

> **Tech Lead** (2 days ago):
> Make sure the tab counts are dynamic and update when the underlying data changes. Don't hardcode the counts.

> **Designer** (3 days ago):
> The active tab uses the primary blue underline from UUI defaults. No custom colors needed.
