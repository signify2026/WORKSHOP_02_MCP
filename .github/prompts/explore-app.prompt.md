---
mode: agent
description: "Open the running app in a browser, navigate through every feature area, and describe what a user can do — no test code."
tools:
  - mcp_playwright
---

# Explore the App — No Tests Yet

Navigate the live app and describe it from a user's perspective.
Do not generate any test code. Just observe and report.

## Steps

1. Navigate to `http://localhost:3000` using `browser_navigate`.
2. Take a snapshot using `browser_snapshot`.
3. For each distinct feature area visible on the page, describe:
   - What the feature is called (use the label the UI shows, not component names)
   - What a user can do with it (actions, interactions)
   - What changes when they interact (state, data, navigation)
4. If an interaction is needed to reveal more (e.g. clicking a tab, expanding a card),
   perform it using `browser_action`, then snapshot again and describe what changed.
5. Repeat until you have covered the full visible surface of the app.

## Output format

Return a structured feature map — one section per feature area:

```
## [Feature name as shown in the UI]
- What it shows: ...
- What a user can do: ...
- What changes when they interact: ...
- Accessible via: [role and label you found in the accessibility tree]
```

## Rules

- Do not write test code, selectors, or assertions.
- Use the language a QA engineer would use, not a developer.
- If something has no accessible label or role, note it as:
  `⚠️ No accessible label found — consider adding aria-label or data-testid`
