module.exports = {
  "version": "tips",
  "slug": "tips-parallelism",
  "locale": "zh",
  "title": "并行执行 实用技巧",
  "kind": "tips",
  "content": "# 并行执行\n\n> 本分类共 5 条技巧\n\n## 1. 并行运行 5 个 Claude\n\n在终端中并行运行 5 个 Claude。将标签页编号为 1-5，利用系统通知来了解何时有 Claude 需要你的输入。\n\n参考：[终端设置文档](https://code.claude.com/docs/en/terminal)\n\n---\n\n## 2. 使用 claude.ai/code 实现更大规模的并行\n\n在 `claude.ai/code` 上并行运行 5-10 个 Claude，与本地的 Claude 同时工作。将本地会话交接到 Web 会话，在 Chrome 中手动启动会话，并在两者之间来回切换。\n\n---\n\n## 3. 更多并行工作\n\n同时启动 3-5 个 Git worktree，每个 worktree 运行自己的 Claude 会话并行工作。这是最大的生产力提升方式，也是团队的头号建议。Boris 个人使用多个 Git checkout，但 Claude Code 团队的大多数人更喜欢 worktree——这也是 @amorisscode 在 Claude Desktop 应用中内置原生 worktree 支持的原因！\n\n有些人还会给 worktree 命名并设置 shell 别名（`2a`、`2b`、`2c`），这样就能一键在它们之间切换。还有人有专门的\"分析\" worktree，只用于查看日志和运行 BigQuery。\n\n参考：[Worktree 文档](https://code.claude.com/docs/en/common...)\n\n---\n\n## 4. 使用 Git Worktree\n\nClaude Code 内置了对 Git worktree 的深度支持。Worktree 对于在同一仓库中进行大量并行工作至关重要。Boris **同时运行着数十个 Claude**，这就是他的做法。\n\n- 使用 `claude -w` 在一个 worktree 中启动新会话\n- 或者在 Claude Desktop 应用中勾选**\"worktree\"**复选框\n- 对于非 Git VCS 用户，使用 `WorktreeCreate` 钩子添加你自己的 worktree 创建逻辑\n\n---\n\n## 5. 使用 /batch 批量展开大规模变更\n\n`/batch` 会先访谈你，然后让 Claude 将工作分散到尽可能多的 **worktree 代理**（数十个、数百个甚至数千个）来完成。\n\n- 用于大型代码迁移和其他可并行化的工作\n- 每个 worktree 代理在自己的代码库副本上独立工作\n\n---"
};
