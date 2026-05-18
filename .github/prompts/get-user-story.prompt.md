---
description: "Read the local user story and present it as the starting context for implementation."
agent: agent
tools:
  - read
  - search
---

# Get User Story

Read the user story from `.github/demo/user-story.md` and present it as the starting context for the current task.

## Steps

1. **Read the user story file**:
   - Open and read `.github/demo/user-story.md` from the project root.

2. **Present a structured summary**:
   - Display the work item details: ID, title, status, priority.
   - Show the full description.
   - List all acceptance criteria clearly.
   - Surface any technical notes and comments.

3. **Extract design references**:
   - Scan the description for Figma links or local image paths.
   - If found, present them in a **Design References** section.
   - Note which reference is the full-page layout and which is the widget detail.

4. **Suggest next steps** (prioritized):
   - If design references are found → suggest running `/figma-to-code` with those references.
   - Otherwise → suggest manual design input or direct implementation.

## Rules

- Do not fabricate or assume any fields that are not in the file.
- Preserve all markdown formatting from the source file.
- Keep the summary concise but complete — do not omit acceptance criteria or technical notes.
