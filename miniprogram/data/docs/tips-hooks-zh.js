module.exports = {
  "version": "tips",
  "slug": "tips-hooks",
  "locale": "zh",
  "title": "钩子技巧 实用技巧",
  "kind": "tips",
  "content": "# 钩子技巧\n\n> 本分类共 2 条技巧\n\n## 1. 使用 PostToolUse Hook 自动格式化代码\n\n使用 `PostToolUse` 钩子来格式化 Claude 的代码。Claude 通常能生成格式良好的代码，钩子负责处理剩余 10% 的格式问题，避免后续在 CI 中出现格式错误。\n\n```json\n\"PostToolUse\": [\n  {\n    \"matcher\": \"Write|Edit\",\n    \"hooks\": [\n      {\n        \"type\": \"command\",\n        \"command\": \"bun run format || true\"\n      }\n    ]\n  }\n]\n```\n\n---\n\n## 2. 配置你的终端\n\n为最佳 Claude Code 体验设置你的终端：\n\n- **主题**：运行 `/config` 设置浅色/深色模式\n- **通知**：为 iTerm2 启用通知，或使用自定义通知钩子\n- **换行**：如果在 IDE 终端、Apple Terminal、Warp 或 Alacritty 中使用 Claude Code，运行 `/terminal-setup` 启用 Shift+Enter 换行（这样就不需要输入 `\\`）\n- **Vim 模式**：运行 `/vim`\n\n---"
};
