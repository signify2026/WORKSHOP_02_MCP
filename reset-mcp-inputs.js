#!/usr/bin/env node
/**
 * Clears stored MCP input values (URLs, PAT) from VS Code's workspace database.
 * Works on macOS, Linux, and Windows.
 *
 * Usage:
 *   node reset-mcp-inputs.js
 *
 * After running, reload VS Code — it will re-prompt for all MCP inputs.
 */

const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const fs = require('fs');

function getWorkspaceStoragePath() {
  const home = os.homedir();
  switch (process.platform) {
    case 'darwin':
      return path.join(home, 'Library', 'Application Support', 'Code', 'User', 'workspaceStorage');
    case 'win32':
      return path.join(process.env.APPDATA || '', 'Code', 'User', 'workspaceStorage');
    default:
      return path.join(home, '.config', 'Code', 'User', 'workspaceStorage');
  }
}

function sqlite3Available() {
  try {
    execSync('sqlite3 --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

if (!sqlite3Available()) {
  console.error('sqlite3 CLI not found.');
  if (process.platform === 'win32') {
    console.error('Install it via: winget install SQLite.SQLite');
  } else {
    console.error('Install it via: brew install sqlite  (macOS) or  apt install sqlite3  (Linux)');
  }
  process.exit(1);
}

const storagePath = getWorkspaceStoragePath();

if (!fs.existsSync(storagePath)) {
  console.error(`VS Code workspace storage not found at:\n  ${storagePath}`);
  process.exit(1);
}

// Include global storage (where VS Code actually stores mcpInputs)
const globalDb = path.join(path.dirname(storagePath), 'globalStorage', 'state.vscdb');

const databases = [
  ...(fs.existsSync(globalDb) ? [globalDb] : []),
  ...fs.readdirSync(storagePath)
    .map((dir) => path.join(storagePath, dir, 'state.vscdb'))
    .filter((db) => fs.existsSync(db)),
];

let cleared = 0;

for (const db of databases) {
  try {
    const keysToDelete = ['mcpInputs', 'mcpToolCache'];
    for (const key of keysToDelete) {
      const value = execSync(`sqlite3 "${db}" "SELECT value FROM ItemTable WHERE key='${key}';"`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      }).trim();

      if (value) {
        execSync(`sqlite3 "${db}" "DELETE FROM ItemTable WHERE key='${key}';"`, { stdio: 'pipe' });
        console.log(`Cleared ${key} from: ${db}`);
        cleared++;
      }
    }
  } catch {
    // skip locked or unreadable databases
  }
}

if (cleared === 0) {
  console.log('No stored MCP inputs found — nothing to clear.');
} else {
  console.log(`\nDone (${cleared} database(s) cleared). Reload VS Code to re-enter credentials.`);
}
