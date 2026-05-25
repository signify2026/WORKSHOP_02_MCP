---
mode: agent
description: "Scaffold the signify-atlassian custom MCP server from scratch: create all files, register in VS Code, install dependencies, and validate."
---

# Create Signify Atlassian MCP Server

Scaffold the complete `signify-atlassian` custom MCP server for the workshop.

## Steps

### 1. Create folder structure

Create the directory `mcp-servers/signify-atlassian/` if it does not exist.

### 2. Create `mcp-servers/signify-atlassian/package.json`

```json
{
  "name": "signify-atlassian",
  "version": "1.0.0",
  "description": "Workshop custom MCP server for Jira and Confluence Data Center.",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "inspect": "npx @modelcontextprotocol/inspector node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.29.0",
    "dotenv": "^16.4.0",
    "zod": "^4.4.3"
  }
}
```

### 3. Create `mcp-servers/signify-atlassian/.env.example`

This file documents the required variables. Copy it to `.env` when running the server outside VS Code (e.g. IntelliJ terminal or a plain `node` invocation). The `.env` file is loaded by `dotenv` at startup and does **not** override variables already injected by VS Code MCP.

> **Never commit `.env`.** Add it to `.gitignore` if it doesn't already appear there.

```
ATLASSIAN_BASE_URL=https://jiraeu.epam.com
CONFLUENCE_BASE_URL=https://confluence.epam.com
ATLASSIAN_PAT=replace-with-your-personal-access-token
```

### 4. Create `mcp-servers/signify-atlassian/server.js`

```js
#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

// Load .env if present — for running outside VS Code (IntelliJ, plain terminal).
// Does NOT override variables already set by VS Code MCP env injection.
loadDotenv();

const requiredEnv = ['ATLASSIAN_BASE_URL', 'ATLASSIAN_PAT'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  throw new Error(
    `Missing required environment variable(s): ${missingEnv.join(', ')}. ` +
      'Set ATLASSIAN_BASE_URL and ATLASSIAN_PAT before starting the MCP server.',
  );
}

const jiraBaseUrl = normalizeBaseUrl(process.env.ATLASSIAN_BASE_URL);
const confluenceBaseUrl = normalizeBaseUrl(process.env.CONFLUENCE_BASE_URL || process.env.ATLASSIAN_BASE_URL);
const atlassianPat = process.env.ATLASSIAN_PAT;

const server = new McpServer({
  name: 'signify-atlassian',
  version: '1.0.0',
});

server.tool(
  'get_issue',
  'Fetch one Jira issue by key from a self-hosted Atlassian instance.',
  {
    issueKey: z.string().min(2).describe('Jira issue key, for example US-4821 or PROJ-123'),
  },
  async ({ issueKey }) => {
    const issue = await jiraRequest(`/rest/api/2/issue/${encodeURIComponent(issueKey)}`);
    const fields = issue.fields || {};

    return textResult({
      key: issue.key,
      summary: fields.summary || '',
      status: fields.status?.name || 'Unknown',
      assignee: fields.assignee?.displayName || 'Unassigned',
      reporter: fields.reporter?.displayName || 'Unknown',
      description: normalizeAtlassianText(fields.description),
      acceptanceCriteria: extractAcceptanceCriteria(fields.description),
      url: `${jiraBaseUrl}/browse/${issue.key}`,
    });
  },
);

server.tool(
  'search_issues',
  'Search Jira issues by JQL and return a compact result list.',
  {
    jql: z.string().min(3).describe('JQL query, for example project = LEARN AND status != Done'),
    maxResults: z.number().int().min(1).max(50).default(10).describe('Maximum number of issues to return'),
  },
  async ({ jql, maxResults }) => {
    const params = new URLSearchParams({
      jql,
      maxResults: String(maxResults),
      fields: 'summary,status,assignee,issuetype,priority',
    });
    const result = await jiraRequest(`/rest/api/2/search?${params.toString()}`);

    return textResult({
      total: result.total ?? 0,
      returned: result.issues?.length ?? 0,
      issues: (result.issues || []).map((issue) => ({
        key: issue.key,
        type: issue.fields?.issuetype?.name || 'Issue',
        summary: issue.fields?.summary || '',
        status: issue.fields?.status?.name || 'Unknown',
        priority: issue.fields?.priority?.name || 'None',
        assignee: issue.fields?.assignee?.displayName || 'Unassigned',
        url: `${jiraBaseUrl}/browse/${issue.key}`,
      })),
    });
  },
);

server.tool(
  'create_page',
  'Create a Confluence page in one space with the provided title and body.',
  {
    spaceKey: z.string().min(1).describe('Confluence space key, for example QA or ENG'),
    title: z.string().min(3).describe('Confluence page title'),
    body: z.string().min(1).describe('Page body in Confluence storage format or simple HTML'),
  },
  async ({ spaceKey, title, body }) => {
    const page = await confluenceRequest('/rest/api/content', {
      method: 'POST',
      body: {
        type: 'page',
        title,
        space: { key: spaceKey },
        body: {
          storage: {
            value: body,
            representation: 'storage',
          },
        },
      },
    });

    const webPath = page._links?.webui || `/pages/viewpage.action?pageId=${page.id}`;

    return textResult({
      id: page.id,
      title: page.title,
      spaceKey,
      url: `${confluenceBaseUrl}${webPath}`,
    });
  },
);

await server.connect(new StdioServerTransport());

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, '');
}

async function jiraRequest(path, options = {}) {
  return atlassianRequest(jiraBaseUrl, path, options);
}

async function confluenceRequest(path, options = {}) {
  return atlassianRequest(confluenceBaseUrl, path, options);
}

async function atlassianRequest(baseUrl, path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method || 'GET',
    headers: {
      Authorization: `Bearer ${atlassianPat}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: AbortSignal.timeout(15000),
  });

  const text = await response.text();
  const payload = text ? safeJsonParse(text) : {};

  if (!response.ok) {
    throw new Error(
      `Atlassian request failed: ${response.status} ${response.statusText}. ` +
        `Path: ${path}. Response: ${JSON.stringify(payload).slice(0, 800)}`,
    );
  }

  return payload;
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text };
  }
}

function textResult(value) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

function normalizeAtlassianText(value) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function extractAcceptanceCriteria(value) {
  const text = normalizeAtlassianText(value);
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const criteria = lines.filter((line) =>
    /^(ac[-\s]?\d+|acceptance criteria|given|when|then|\* \[ \]|\- \[ \]|\d+\.)/i.test(line),
  );

  return criteria.length > 0 ? criteria : [];
}
```

### 5. Register in `.vscode/mcp.json`

Read the existing `.vscode/mcp.json`. Add the following to the `inputs` array if not already present:

```json
{
  "type": "promptString",
  "id": "atlassian-base-url",
  "description": "Jira Data Center base URL, for example https://jiraeu.epam.com"
},
{
  "type": "promptString",
  "id": "confluence-base-url",
  "description": "Confluence Data Center base URL, for example https://confluence.epam.com"
},
{
  "type": "promptString",
  "id": "atlassian-pat",
  "description": "Atlassian personal access token",
  "password": true
}
```

Add the following to the `servers` object if not already present:

```json
"signify-atlassian": {
  "type": "stdio",
  "command": "node",
  "args": ["./mcp-servers/signify-atlassian/server.js"],
  "env": {
    "ATLASSIAN_BASE_URL": "${input:atlassian-base-url}",
    "CONFLUENCE_BASE_URL": "${input:confluence-base-url}",
    "ATLASSIAN_PAT": "${input:atlassian-pat}"
  }
}
```

### 6. Install dependencies

Run from `mcp-servers/signify-atlassian`:

```bash
npm install
```

### 7. Validate

From the repository root run:

```bash
node --check mcp-servers/signify-atlassian/server.js && echo "server.js syntax ok"
node -e "JSON.parse(require('fs').readFileSync('.vscode/mcp.json','utf8')); console.log('mcp.json ok')"
```

Both must print their success messages.

Run an MCP smoke test to confirm the server exposes exactly these tools:
- `get_issue`
- `search_issues`
- `create_page`

```bash
ATLASSIAN_BASE_URL=https://jiraeu.epam.com ATLASSIAN_PAT=dummy node mcp-servers/signify-atlassian/server.js << 'EOF'
{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"test","version":"1"}}}
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}
EOF
```

### 8. Guide VS Code registration

Tell the user to:
1. `Cmd+Shift+P` → **Developer: Reload Window**
2. Open Copilot Chat in **Agent Mode**
3. Click 🔧 **Tools** and confirm `signify-atlassian` appears
4. VS Code will prompt once (securely) for:
   - Jira base URL
   - Confluence base URL
   - PAT (masked input)

## Rules

- Do not hardcode personal access tokens anywhere
- Do not commit `.env` files
- Add `.env` to `.gitignore` if not already present
- If `.vscode/mcp.json` already has a `signify-atlassian` entry, skip step 5
- If any file already exists with correct content, skip recreating it
- Do not add `create_issue` — that tool is added separately via `/mcp-create-issue-tool`
