module.exports = {
  "version": "tips",
  "slug": "tips-debugging",
  "locale": "en",
  "title": "Debugging Tips",
  "kind": "tips",
  "content": "# Debugging\n\n> 2 tips in this category\n\n## 1. Claude Fixes Most Bugs by Itself\n\nHere's how the team does it:\n\nEnable the Slack MCP, then paste a Slack bug thread into Claude and just say \"fix.\" Zero context switching required.\n\nOr, just say \"Go fix the failing CI tests.\" Don't micromanage how.\n\nPoint Claude at docker logs to troubleshoot distributed systems — it's surprisingly capable at this.\n\n*Source: boris 10 tips 01 feb 26*\n\n---\n\n## 2. Let Claude Use All Your Tools via MCP\n\nClaude Code uses all your tools. It often searches and posts to Slack (via the MCP server), runs BigQuery queries to answer analytics questions (using `bq` CLI), grabs error logs from Sentry, etc. The Slack MCP configuration is checked into `.mcp.json` and shared with the team.\n\n*Source: boris 13 tips 03 jan 26*\n\n---"
};
