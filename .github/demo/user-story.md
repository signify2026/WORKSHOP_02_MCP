# User Story: Support Team Widget Component

## Work Item Details

| Field         | Value                                              |
|---------------|----------------------------------------------------|
| **ID**        | EPMCDMETST                                         |
| **Type**      | Story                                              |
| **Title**     | Implement Support Team Widget for Learning Dashboard |
| **Status**    | In Progress                                        |
| **Priority**  | 2 - High                                           |
| **Assigned**  | Unassigned                                         |

## Description

As a learner on the Learning Dashboard, I want to see available curators, trainers, and mentors who can help me, so that I can reach out for support when needed.

The Support Team widget displays categorized lists of people (Curator, Trainers, Mentors) with their profile information and contact options. It should be placed in the sidebar/content area of the dashboard.

### Design References

- **Full page layout**: [Figma - Full Page](https://www.figma.com/design/sxI8Pai15Zl6Zk7DGd6MYT/Internal-EPAM?node-id=4401-3797&t=xgZqLkiGuwyUgO52-4)
- **Widget detail**: [Figma - Support Team Widget](https://www.figma.com/design/sxI8Pai15Zl6Zk7DGd6MYT/Internal-EPAM?node-id=4401-3999&t=lW3iaeS2zmAKOhTf-4)

## Acceptance Criteria

- [ ] Display categorized sections: **Curator**, **Trainers**, **Mentors**
- [ ] Show profile photo, name, and title for each person
- [ ] Implement "Show All" functionality to expand the list when there are more items
- [ ] Add contact/message icons for each person to enable communication
- [ ] Include hover states with additional information
- [ ] Layout matches the Figma design with correct spacing, typography, and alignment
- [ ] Component has unit tests covering rendering, "Show All" toggle, and hover states
- [ ] Component follows project conventions: CSS Modules (`.module.scss`), TypeScript, functional component

## Technical Notes

- Reference `src/components/SupportTeamWidget/` if a skeleton already exists
- Use UUI components from `@epam/uui` where applicable (Avatar, IconButton, etc.)
- Style with CSS Modules (`.module.scss`)
- Mock data can be sourced from `src/data/mockData.ts`

## Comments

> **Tech Lead** (2 days ago):
> Make sure the people data is dynamic and sourced from props or a data layer. Don't hardcode the list.

> **Designer** (3 days ago):
> Use standard UUI avatar sizes and spacing. Hover state should show a tooltip or card with additional details.
