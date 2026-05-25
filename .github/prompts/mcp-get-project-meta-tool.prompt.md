---
mode: agent
description: "Add the get_project_meta tool to mcp-servers/signify-atlassian/server.js to fetch valid issue types and priorities for a Jira project."
---

# Add get_project_meta Tool to Signify Atlassian MCP

Add a new tool called `get_project_meta` to `mcp-servers/signify-atlassian/server.js`.

## Spec

- **Name**: `get_project_meta`
- **Description**: Return the valid issue types and priorities for a Jira project. (one sentence, exactly as written)
- **Inputs**:
  - `projectKey`: string, min 2 chars, e.g. `"LEARN"`
- **Handler**: GET `${jiraBaseUrl}/rest/api/2/issue/createmeta` using the existing `jiraRequest` helper
- **Query params**: `projectKeys=${projectKey}&expand=projects.issuetypes.fields`
- **Return**: `textResult` with a compact object — `projectKey`, `issueTypes` (array of names), `priorities` (array of names)

## Placement

- After the existing `search_issues` tool block
- Before the `create_page` tool block

## Generated tool code

```javascript
server.tool(
  'get_project_meta',
  'Return the valid issue types and priorities for a Jira project.',
  {
    projectKey: z.string().min(2).describe('Jira project key, e.g. LEARN'),
  },
  async ({ projectKey }) => {
    const params = new URLSearchParams({
      projectKeys: projectKey,
      expand: 'projects.issuetypes.fields',
    });
    const meta = await jiraRequest(`/rest/api/2/issue/createmeta?${params.toString()}`);

    const project = (meta.projects || [])[0];
    if (!project) {
      return textResult({ error: `Project "${projectKey}" not found or not accessible.` });
    }

    const issueTypes = (project.issuetypes || []).map((t) => t.name);

    const priorityField = (project.issuetypes || [])
      .flatMap((t) => Object.values(t.fields || {}))
      .find((f) => f.schema?.type === 'priority');
    const priorities = (priorityField?.allowedValues || []).map((p) => p.name);

    return textResult({
      projectKey: project.key,
      issueTypes,
      priorities: priorities.length > 0 ? priorities : ['Highest', 'High', 'Medium', 'Low', 'Lowest'],
    });
  },
);
```

## Rules

- Use the existing `jiraRequest` and `textResult` helpers — do not add new HTTP logic
- After editing, run `node --check mcp-servers/signify-atlassian/server.js` to verify syntax
- Do not modify any other tools or helpers in the file
- Reload VS Code after saving (`Cmd+Shift+P` → Developer: Reload Window) so the new tool appears in the Tools panel

## Usage after adding the tool

Before calling `create_issue`, call `get_project_meta` first to discover valid values:

```
Use signify-atlassian get_project_meta for project EPMCDMETST
```

Then use the returned `issueTypes` and `priorities` to populate `create_issue` inputs, avoiding 400 errors from invalid values.
