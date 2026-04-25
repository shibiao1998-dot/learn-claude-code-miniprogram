# Claude Code 实用技巧合集

---

## 来源: Boris Cherny 13 条技巧 (2026年1月3日)

Boris 分享了他个人的 Claude Code 使用设置，并指出这套配置"出人意料地简单"——Claude Code 开箱即用就很好用，所以他没有做太多定制。使用 Claude Code 没有唯一正确的方式：团队有意将其设计成可以随心所欲地使用、定制和改造。Claude Code 团队中的每个人用法都大不相同。

---

### 1/ 并行运行 5 个 Claude

在终端中并行运行 5 个 Claude。将标签页编号为 1-5，利用系统通知来了解何时有 Claude 需要你的输入。

参考：[终端设置文档](https://code.claude.com/docs/en/terminal)

---

### 2/ 使用 claude.ai/code 实现更大规模的并行

在 `claude.ai/code` 上并行运行 5-10 个 Claude，与本地的 Claude 同时工作。将本地会话交接到 Web 会话，在 Chrome 中手动启动会话，并在两者之间来回切换。

---

### 3/ 所有任务都使用 Opus + Thinking 模式

所有任务都使用 Opus 4.5 + thinking 模式。这是 Boris 用过的最好的编码模型——虽然它比 Sonnet 更大更慢，但因为你不需要频繁纠正它的方向，而且它的工具使用能力更强，最终几乎总是比使用更小的模型更快。

---

### 4/ 团队共享同一个 CLAUDE.md

为整个代码仓库共享一个 `CLAUDE.md`。将其提交到 Git 中，让整个团队每周贡献多次内容。每当 Claude 做错了什么，就把它添加到 `CLAUDE.md` 中，这样 Claude 下次就知道不要再犯同样的错误。

---

### 5/ 在 PR 中 @claude 来更新 CLAUDE.md

在代码评审时，在同事的 PR 上 tag `@claude`，让它在 PR 中添加内容到 `CLAUDE.md`。使用 Claude Code GitHub Action（[install-@hub-action](https://github.com/apps/claude)）来实现——这是 Boris 版本的"复利工程"。

---

### 6/ 大多数会话都从 Plan 模式开始

大多数会话都从 Plan 模式开始（按两次 Shift+Tab）。如果目标是写一个 Pull Request，先用 Plan 模式与 Claude 反复讨论，直到你满意它的方案。然后切换到自动接受编辑模式，Claude 通常可以一次到位地完成实现。一个好的计划真的非常重要。

---

### 7/ 使用斜杠命令处理高频工作流

为每天重复多次的"内循环"工作流创建斜杠命令。这样可以避免重复提示，也让 Claude 能够使用这些工作流。命令会提交到 Git 中，存放在 `.claude/commands/` 目录下。

示例：`/commit-push-pr` —— 提交、推送并创建 PR。

---

### 8/ 使用子代理自动化常见工作流

定期使用一些子代理：`code-simplifier` 在 Claude 完成工作后简化代码，`verify-app` 包含详细的端到端测试指令，等等。将子代理视为自动化最常见工作流的方式——类似于斜杠命令。

子代理存放在 `.claude/agents/` 目录下。

---

### 9/ 使用 PostToolUse Hook 自动格式化代码

使用 `PostToolUse` 钩子来格式化 Claude 的代码。Claude 通常能生成格式良好的代码，钩子负责处理剩余 10% 的格式问题，避免后续在 CI 中出现格式错误。

```json
"PostToolUse": [
  {
    "matcher": "Write|Edit",
    "hooks": [
      {
        "type": "command",
        "command": "bun run format || true"
      }
    ]
  }
]
```

---

### 10/ 预授权权限，而不是使用 --dangerously-skip-permissions

不要使用 `--dangerously-skip-permissions`。相反，使用 `/permissions` 预先允许那些你知道在你的环境中是安全的常用 bash 命令，以避免不必要的权限提示。大部分权限设置都会提交到 `.claude/settings.json` 中与团队共享。

---

### 11/ 通过 MCP 让 Claude 使用你所有的工具

Claude Code 可以使用你的所有工具。它经常搜索和发送 Slack 消息（通过 MCP 服务器），运行 BigQuery 查询来回答分析问题（使用 `bq` CLI），从 Sentry 获取错误日志等。Slack MCP 配置提交在 `.mcp.json` 中与团队共享。

---

### 12/ 使用后台代理验证长时间运行的任务

对于非常耗时的任务，可以：(a) 提示 Claude 在完成后用后台代理验证其工作；(b) 使用代理 Stop 钩子来更确定性地执行验证；或 (c) 使用 ralph-wiggum 插件（最初由 @GeoffreyHuntley 构想）。

---

### 13/ 给 Claude 一种验证其工作的方式

这可能是从 Claude Code 获得优秀结果的最重要的一点——给 Claude 一种验证其工作的方式。如果 Claude 拥有这个反馈闭环，最终结果的质量将提升 2-3 倍。

Boris 提交的每一个更改都会经过 Claude 测试。

---

---

## 来源: Boris Cherny 10 条技巧 (2026年2月1日)

Boris 分享了直接来自 Claude Code 团队的使用技巧。团队的使用方式与 Boris 个人的使用方式有所不同。记住：使用 Claude Code 没有唯一正确的方式——每个人的设置都不一样。你应该多尝试，找到最适合自己的方式！

---

### 1/ 更多并行工作

同时启动 3-5 个 Git worktree，每个 worktree 运行自己的 Claude 会话并行工作。这是最大的生产力提升方式，也是团队的头号建议。Boris 个人使用多个 Git checkout，但 Claude Code 团队的大多数人更喜欢 worktree——这也是 @amorisscode 在 Claude Desktop 应用中内置原生 worktree 支持的原因！

有些人还会给 worktree 命名并设置 shell 别名（`2a`、`2b`、`2c`），这样就能一键在它们之间切换。还有人有专门的"分析" worktree，只用于查看日志和运行 BigQuery。

参考：[Worktree 文档](https://code.claude.com/docs/en/common...)

---

### 2/ 每个复杂任务都从 Plan 模式开始

把精力投入到计划中，这样 Claude 就能一次性完成实现。

有人让一个 Claude 写计划，然后启动第二个 Claude 以高级工程师的身份来审查这个计划。

另一个人说，一旦事情偏离方向，他们就会切回 Plan 模式重新规划。不要硬撑。他们还会明确告诉 Claude 在验证步骤中也进入 Plan 模式，而不仅仅是在构建阶段。

---

### 3/ 投资你的 CLAUDE.md

每次纠正之后，都以"更新你的 CLAUDE.md，这样你下次就不会再犯同样的错误"作为结尾。Claude 非常擅长为自己编写规则。

不断地精炼你的 `CLAUDE.md`。持续迭代，直到 Claude 的错误率明显下降。

有一位工程师让 Claude 为每个任务/项目维护一个笔记目录，在每次 PR 后更新。然后把 `CLAUDE.md` 指向这个目录。

---

### 4/ 创建自己的 Skill 并提交到 Git

在每个项目中复用。团队的建议：

- 如果你每天做同一件事超过一次，就把它变成一个 skill 或命令
- 创建一个 `/techdebt` 斜杠命令，在每次会话结束时运行，查找并消除重复代码
- 设置一个斜杠命令，将 7 天内的 Slack、GDrive、Asana 和 GitHub 信息同步到一个上下文汇总中
- 构建分析工程师风格的代理，编写 dbt 模型、审查代码并在开发环境中测试变更

参考：[使用 Skill 扩展 Claude —— Claude Code 文档](https://code.claude.com/docs/en/skills)

---

### 5/ Claude 自己就能修复大多数 Bug

团队是这样做的：

启用 Slack MCP，然后把一个 Slack bug 讨论帖粘贴给 Claude，只说"修复"。完全不需要切换上下文。

或者直接说"去修复失败的 CI 测试"。不要微观管理怎么做。

让 Claude 查看 docker 日志来排查分布式系统问题——它在这方面的能力出人意料地强。

---

### 6/ 提升你的提示水平

a. **挑战 Claude。** 说"严格审查这些更改，在我通过你的测试之前不要创建 PR"。让 Claude 做你的审查员。或者说"证明给我看这能工作"，让 Claude 对比 main 分支和你的功能分支之间的行为差异。

b. **在一个平庸的修复之后，** 说："基于你现在知道的一切，推翻这个方案，实现那个优雅的解决方案。"

c. **编写详细的规格说明**，在交接工作之前减少歧义。你越具体，输出就越好。

---

### 7/ 终端和环境设置

团队喜欢 Ghostty！多人喜欢它的同步渲染、24 位颜色和完善的 Unicode 支持。

为了更方便地管理多个 Claude，使用 `/statusline` 自定义你的状态栏，始终显示上下文使用量和当前 Git 分支。很多人还会给终端标签页着色和命名，有些人使用 tmux——每个标签页对应一个任务/worktree。

使用语音输入。你说话的速度是打字的 3 倍，而且你的提示会因此变得更加详细。（在 macOS 上按两次 fn 键）

参考：[终端设置文档](https://code.claude.com/docs/en/termin...)

---

### 8/ 使用子代理

a. 在任何你希望 Claude 投入更多计算资源的请求后面加上"使用子代理"。

b. 将单个任务分配给子代理，以保持主代理的上下文窗口干净和专注。

c. 通过钩子将权限请求路由到 Opus 4.5——让它扫描攻击并自动批准安全的请求。参考：[Hooks 文档](https://code.claude.com/docs/en/hooks#...)

---

### 9/ 使用 Claude 进行数据和分析工作

让 Claude Code 使用 `bq` CLI 来即时拉取和分析指标。团队在代码库中有一个 BigQuery skill，每个人都在 Claude Code 中直接使用它进行分析查询。Boris 个人已经 6 个多月没有写过一行 SQL 了。

这适用于任何有 CLI、MCP 或 API 的数据库。

---

### 10/ 用 Claude 学习

团队的几条用 Claude Code 学习的建议：

a. 在 `/config` 中启用"Explanatory"（解释型）或"Learning"（学习型）输出风格，让 Claude 解释其更改背后的"为什么"。

b. 让 Claude 生成一个可视化的 HTML 演示文稿来解释不熟悉的代码。它做出来的幻灯片出人意料地好！

c. 让 Claude 画 ASCII 图表来展示新的协议和代码库，帮助你理解它们。

d. 构建一个间隔重复学习 skill：你解释你的理解，Claude 提出后续问题来填补空白，并存储结果。

---

---

## 来源: Boris Cherny 12 条定制技巧 (2026年2月12日)

Boris Cherny 强调，可定制性是工程师们最喜欢 Claude Code 的特性之一——钩子、插件、LSP、MCP、skill、effort 级别、自定义代理、状态栏、输出风格等等。他分享了 12 种开发者和团队定制使用方式的实用方法。

---

### 1/ 配置你的终端

为最佳 Claude Code 体验设置你的终端：

- **主题**：运行 `/config` 设置浅色/深色模式
- **通知**：为 iTerm2 启用通知，或使用自定义通知钩子
- **换行**：如果在 IDE 终端、Apple Terminal、Warp 或 Alacritty 中使用 Claude Code，运行 `/terminal-setup` 启用 Shift+Enter 换行（这样就不需要输入 `\`）
- **Vim 模式**：运行 `/vim`

---

### 2/ 调整 Effort 级别

运行 `/model` 选择你偏好的 effort 级别：

- **Low** —— 更少 token，更快响应
- **Medium** —— 均衡表现
- **High** —— 更多 token，更高智能

Boris 的偏好：所有任务都用 High。

---

### 3/ 安装插件、MCP 和 Skill

插件让你可以安装 LSP（支持所有主流语言）、MCP、skill、代理和自定义钩子。

从 Anthropic 官方插件市场安装，或为你的公司创建自己的市场。将 `settings.json` 提交到代码库中，为团队自动添加市场。

运行 `/plugin` 开始使用。

---

### 4/ 创建自定义代理

在 `.claude/agents` 中放入 `.md` 文件来创建自定义代理。每个代理可以有自定义名称、颜色、工具集、预授权和预禁止的工具、权限模式和模型。

你也可以在 `settings.json` 中使用 `"agent"` 字段或通过 `--agent` 标志设置主对话的默认代理。

运行 `/agents` 开始使用。

---

### 5/ 预批准常用权限

Claude Code 使用一套结合了提示注入检测、静态分析、沙箱和人工监督的权限系统。

开箱即用时，一小部分安全命令已被预批准。要预批准更多命令，运行 `/permissions` 并添加到允许和阻止列表中。将这些设置提交到团队的 `settings.json` 中。

支持完整的通配符语法——例如 `Bash(bun run *)` 或 `Edit(/docs/**)`。

---

### 6/ 启用沙箱

选择启用 Claude Code 的开源沙箱运行时，以提高安全性同时减少权限提示。

运行 `/sandbox` 启用。沙箱在你的本机运行，支持文件和网络隔离。

---

### 7/ 添加状态栏

自定义状态栏显示在编辑器下方，展示模型、目录、剩余上下文、费用以及你工作时想看到的任何其他信息。

每个团队成员可以有不同的状态栏。使用 `/statusline` 让 Claude 根据你的 `.bashrc`/`.zshrc` 生成一个。

---

### 8/ 自定义快捷键

Claude Code 中的每个快捷键都可以自定义。运行 `/keybindings` 重新映射任何按键。设置会实时加载，你可以立即感受效果。

---

### 9/ 设置 Hook

Hook 让你可以确定性地接入 Claude 的生命周期：

- 自动将权限请求路由到 Slack 或 Opus
- 当 Claude 到达一轮结束时，推动它继续（你甚至可以启动一个代理或使用提示来决定 Claude 是否应该继续）
- 预处理或后处理工具调用，例如添加你自己的日志记录

让 Claude 帮你添加一个 hook 来开始使用。

---

### 10/ 自定义加载动画文字

自定义加载动画的动词，用你自己的动词添加或替换默认列表。将 `settings.json` 提交到源代码管理中，与团队共享自定义动词。

---

### 11/ 使用输出风格

运行 `/config` 设置输出风格，让 Claude 以不同的语气或格式回复。

- **Explanatory**（解释型）—— 建议在熟悉新代码库时使用，让 Claude 在工作时解释框架和代码模式
- **Learning**（学习型）—— 让 Claude 指导你进行代码修改
- **Custom**（自定义）—— 创建自定义输出风格以调整 Claude 的语调

---

### 12/ 定制一切！

Claude Code 开箱即用就很好用，但当你进行定制时，请将你的 `settings.json` 提交到 Git 中，让团队也能受益。配置支持多个层级：

- 针对整个代码库
- 针对子目录
- 仅针对你自己
- 通过企业级策略

拥有 37 项设置和 84 个环境变量（使用 `settings.json` 中的 `"env"` 字段来避免包装脚本），你想要的几乎任何行为都是可配置的。

---

---

## 来源: Boris Cherny 15 条隐藏功能 (2026年3月30日)

Boris 分享了他最喜欢的 Claude Code 隐藏和被低估的功能，重点介绍了他最常使用的那些。

---

### 1/ Claude Code 有移动端应用

你知道 Claude Code 有移动端应用吗？Boris 经常在 iOS 应用上写代码——这是一种不用打开笔记本电脑就能进行修改的便捷方式。

- 下载 iOS/Android 版 Claude 应用
- 进入左侧的 **Code** 标签
- 你可以直接在手机上审查更改、批准 PR 和编写代码

---

### 2/ 在移动端/Web/桌面端和终端之间转移会话

运行 `claude --teleport` 或 `/teleport` 在你的机器上继续一个云端会话。或运行 `/remote-control` 从手机/Web 控制本地运行的会话。

- **Teleport**：将云端会话拉取到你的本地终端
- **Remote Control**：让你从任何设备控制本地会话
- Boris 在 `/config` 中设置了**"为所有会话启用 Remote Control"**

---

### 3/ /loop 和 /schedule——两个最强大的功能

用这些功能让 Claude 在设定的时间间隔内自动运行，最长可持续一周。Boris 在本地运行了大量循环：

- `/loop 5m /babysit` —— 自动处理代码审查、自动 rebase，并护送 PR 进入生产环境
- `/loop 30m /slack-feedback` —— 每 30 分钟自动为 Slack 反馈提交 PR
- `/loop /post-merge-sweeper` —— 为他遗漏的代码审查评论提交 PR
- `/loop 1h /pr-pruner` —— 关闭过时和不再需要的 PR
- ……还有更多！

尝试将工作流转化为 skill + loop。这非常强大。

---

### 4/ 使用 Hook 确定性地运行逻辑

使用 hook 在代理生命周期中运行逻辑。例如：

- 每次启动 Claude 时**动态加载**上下文（`SessionStart`）
- **记录模型运行的每个 bash 命令**（`PreToolUse`）
- **将权限提示路由到 WhatsApp** 供你批准/拒绝（`PermissionRequest`）
- 每当 Claude 停止时**推动它继续**（`Stop`）

---

### 5/ Cowork Dispatch

Boris 每天都使用 Dispatch 来查看 Slack 和邮件、管理文件，以及在不在电脑前时在笔记本电脑上做事。当他不在写代码时，他就在使用 Dispatch。

- Dispatch 是 Claude Desktop 应用的**安全远程控制**
- 它可以使用你的 MCP、浏览器和电脑，需要你的许可
- 把它想象成一种从任何地方把非编码任务委托给 Claude 的方式

---

### 6/ 使用 Chrome 扩展做前端工作

使用 Claude Code 最重要的技巧：**给 Claude 一种验证其输出的方式。** 一旦你做到了这一点，Claude 就会不断迭代直到结果令人满意。

- 想象一下让某人搭建一个网站，但不让他使用浏览器——结果大概不会好看
- 给 Claude 一个浏览器，它就会写代码并不断迭代直到看起来满意
- Boris 每次做 Web 代码时都使用 Chrome 扩展——它比其他类似的 MCP 工作得更可靠

---

### 7/ 使用 Claude Desktop 应用自动启动和测试 Web 服务器

同样的思路，Desktop 应用内置了让 Claude **自动运行你的 Web 服务器甚至在内置浏览器中测试它**的能力。

- 你可以在 CLI 或 VSCode 中使用 Chrome 扩展设置类似的功能
- 或者直接使用 Desktop 应用获得集成体验

---

### 8/ 分叉你的会话

经常有人问如何分叉现有会话。有两种方式：

1. 在会话中运行 `/branch`
2. 从 CLI 运行 `claude --resume <session-id> --fork-session`

`/branch` 创建一个分支对话——你现在在分支中。要恢复原始会话，使用 `claude -r <original-session-id>`。

---

### 9/ 使用 /btw 进行旁路查询

Boris 经常使用这个功能，在代理工作时回答快速问题。`/btw` 让你在不打断代理当前任务的情况下问一个附带问题。

示例：
```
/btw how do I spell dachshund?
> dachshund — German for "badger dog" (dachs + badger, hund + dog).
↑/↓ to scroll · Space, Enter, or Escape to dismiss
```

---

### 10/ 使用 Git Worktree

Claude Code 内置了对 Git worktree 的深度支持。Worktree 对于在同一仓库中进行大量并行工作至关重要。Boris **同时运行着数十个 Claude**，这就是他的做法。

- 使用 `claude -w` 在一个 worktree 中启动新会话
- 或者在 Claude Desktop 应用中勾选**"worktree"**复选框
- 对于非 Git VCS 用户，使用 `WorktreeCreate` 钩子添加你自己的 worktree 创建逻辑

---

### 11/ 使用 /batch 批量展开大规模变更

`/batch` 会先访谈你，然后让 Claude 将工作分散到尽可能多的 **worktree 代理**（数十个、数百个甚至数千个）来完成。

- 用于大型代码迁移和其他可并行化的工作
- 每个 worktree 代理在自己的代码库副本上独立工作

---

### 12/ 使用 --bare 加速 SDK 启动最高 10 倍

默认情况下，当你运行 `claude -p`（或 TypeScript/Python SDK）时，Claude 会搜索本地的 CLAUDE.md、设置和 MCP。但对于非交互式用法，大多数时候你需要通过 `--system-prompt`、`--mcp-config`、`--settings` 等明确指定要加载的内容。

- 这是 SDK 最初构建时的一个设计疏忽
- 在未来的版本中，他们会将默认值切换为 `--bare`
- 目前，使用该标志可获得最高 **10 倍的启动速度提升**

```bash
claude -p "summarize this codebase" \
    --output-format=stream-json \
    --verbose \
    --bare
```

---

### 13/ 使用 --add-dir 让 Claude 访问更多文件夹

当跨多个仓库工作时，Boris 通常在一个仓库中启动 Claude，然后使用 `--add-dir`（或 `/add-dir`）让 Claude 看到另一个仓库。

- 这不仅告诉 Claude 这个仓库的存在，还**赋予它在该仓库中工作的权限**
- 或者在团队的 `settings.json` 中添加 `"additionalDirectories"`，在启动 Claude Code 时始终加载额外的文件夹

---

### 14/ 使用 --agent 给 Claude Code 自定义系统提示词和工具

自定义代理是一个强大但经常被忽视的基础能力。使用方法很简单，在 `.claude/agents/` 中定义一个新代理，然后运行：

```bash
claude --agent=<your agent's name>
```

- 代理可以有受限的工具集、自定义描述和特定模型
- 非常适合创建只读代理、专业审查代理或领域特定工具

---

### 15/ 使用 /voice 启用语音输入

有趣的事实：Boris 的大部分编码是通过语音对 Claude 说话完成的，而不是打字。

- 在 CLI 中运行 `/voice`，然后按住空格键说话
- 在 Desktop 上按语音按钮
- 或者在 iOS 设置中启用听写功能

---

---

## 来源: Boris Cherny 2 条技巧 — 代码审查与测试时计算 (2026年3月10日)

---

### 1/ 引入代码审查功能

Claude Code 新功能：**代码审查**。一组代理会对每个 PR 进行深度审查。

- 最初为 Anthropic 自己的团队构建——今年每位工程师的代码产出提升了 **200%**，而代码审查成了瓶颈
- Boris 使用了几周后发现它能捕获很多他本来不会注意到的真实 bug
- 当一个 PR 被打开时，Claude 会派出一组代理来寻找 bug

---

### 2/ 测试时计算与多上下文窗口

粗略地说，你在编码问题上投入的 token 越多，结果就越好。Boris 称之为**测试时计算 (test time compute)**。

- 使用**独立的上下文窗口**会让结果更好——这就是子代理之所以有效的原因，也解释了为什么一个代理可能会引入 bug 而另一个（使用完全相同的模型）却能发现它
- 类似于工程团队：如果 Boris 引入了一个 bug，他的同事在审查代码时可能比他自己更可靠地发现它
- 最终，代理可能会写出完美无 bug 的代码——在那之前，**多个不相关的上下文窗口**往往是一种好方法

---

---

## 来源: Boris Cherny 2 条技巧 — Squash 合并与 PR 大小分布 (2026年3月25日)

---

### 1/ 一天 266 次贡献——始终使用 Squash 合并

Boris 分享了他的 GitHub 贡献图，显示 **3 月 24 日有 266 次贡献**——来自 **141 个 PR，全部使用 squash 合并**，中位数为每个 PR **118 行**。

- Squash 合并将分支上的所有提交合并为目标分支上的单个提交——保持历史记录干净和线性
- 每个 PR = 一个提交，便于回滚整个功能，也简化了 `git bisect`
- 在高速 AI 辅助工作流（每天 141 个 PR）中，squash 是务实的选择——分支内的"修复 lint"、"试试这个"等单独提交都是噪音

---

### 2/ PR 大小分布——保持 PR 小巧

Boris 分享了那 141 个 PR 的大小分布，总共 **45,032 行变更**（添加 + 删除）：

| 指标 | 行数 (添加+删除) | 含义 |
|--------|---------------:|---------|
| **p50** | **118** | 中位 PR 大小——一半的 PR 在 118 行或以下 |
| p90 | 498 | 90% 的 PR 在 500 行以下 |
| **p99** | **2,978** | 仅约 1 个 PR 超过约 3000 行 |
| min | 2 | 最小的 PR——一个 2 行的快速修复 |
| max | 10,459 | 最大的单个 PR——可能是迁移或生成的代码 |

- **中位数 118 行**意味着大多数 PR 都是聚焦且可审查的，即使每天 141 个 PR
- 分布严重右偏——偶尔的大 PR 不可避免（批量重命名、迁移），但常态是紧凑的
- 小 PR 降低了合并冲突风险，更容易审查，与 squash 合并完美配合以实现干净的回滚

---

---

## 来源: Thariq — Skill 使用经验 (2026年3月17日)

Skill 已经成为 Claude Code 中使用最多的扩展点之一。它们灵活、易于创建、便于分发。但这种灵活性也让人难以判断什么是最佳实践。Thariq 分享了在 Anthropic 内部广泛使用 skill 的经验教训，目前有数百个 skill 在活跃使用中。

---

### Skill 是什么？

一个常见的误解是 skill "只是 markdown 文件"，但最有趣的部分在于它们是**文件夹**，可以包含脚本、资源、数据等——代理可以发现、探索和操作的东西。Skill 还有多种配置选项，包括注册动态钩子。

---

### Skill 的类型

在整理了所有 skill 之后，团队注意到它们聚集为 9 个常见类别。最好的 skill 干净地归入一个类别；比较混乱的 skill 横跨多个类别。

---

### 1/ 库和 API 参考

解释如何正确使用某个库、CLI 或 SDK 的 skill。这些可以是内部库，也可以是 Claude Code 有时会遇到问题的常见库。通常包含参考代码片段文件夹和编写脚本时要避免的坑点列表。

**示例：** billing-lib、internal-platform-cli、frontend-design

---

### 2/ 产品验证

描述如何测试或验证代码是否正常工作的 skill。通常与 Playwright、tmux 等外部工具配合使用。验证类 skill 对于确保 Claude 输出正确非常有用。值得让一位工程师花一周时间专门打磨你的验证类 skill。

**示例：** signup-flow-driver、checkout-verifier、tmux-cli-driver

---

### 3/ 数据获取与分析

连接到你的数据和监控基础设施的 skill。可能包含带凭据的数据获取库、特定的仪表板 ID 等，以及常见工作流或获取数据方式的说明。

**示例：** funnel-query、cohort-compare、grafana

---

### 4/ 业务流程与团队自动化

将重复性工作流自动化为一个命令的 skill。通常是相当简单的指令，但可能对其他 skill 或 MCP 有更复杂的依赖。将之前的结果保存在日志文件中可以帮助模型保持一致性并反思先前的执行。

**示例：** standup-post、create-\<ticket-system\>-ticket、weekly-recap

---

### 5/ 代码脚手架与模板

为代码库中特定功能生成框架样板代码的 skill。你可以将这些 skill 与可组合的脚本结合使用。当你的脚手架有自然语言需求且无法纯粹通过代码覆盖时，它们特别有用。

**示例：** new-\<framework\>-workflow、new-migration、create-app

---

### 6/ 代码质量与审查

在你的组织内强制执行代码质量并帮助审查代码的 skill。可以包含确定性的脚本或工具以获得最大鲁棒性。你可能希望在钩子中或 GitHub Action 中自动运行这些 skill。

**示例：** adversarial-review、code-style、testing-practices

---

### 7/ CI/CD 与部署

帮助你在代码库中获取、推送和部署代码的 skill。这些 skill 可能会引用其他 skill 来收集数据。

**示例：** babysit-pr、deploy-\<service\>、cherry-pick-prod

---

### 8/ 运维手册

接受一个症状（如 Slack 讨论帖、告警或错误签名），通过多工具调查，并生成结构化报告的 skill。

**示例：** \<service\>-debugging、oncall-runner、log-correlator

---

### 9/ 基础设施运维

执行日常维护和运维程序的 skill——其中一些涉及需要防护栏的破坏性操作。这些 skill 使工程师更容易在关键操作中遵循最佳实践。

**示例：** \<resource\>-orphans、dependency-management、cost-investigation

---

### 制作 Skill 的技巧

编写有效 skill 的 9 条最佳实践，以及关于分发和衡量的指导。

---

#### 技巧 1：不要陈述显而易见的事情

Claude Code 对你的代码库了解很多，Claude 对编码也了解很多，包括许多默认观点。如果你发布的 skill 主要关于知识，试着专注于那些能推动 Claude 跳出其常规思维方式的信息。frontend-design skill 就是一个很好的例子——它是通过与客户反复迭代来改进 Claude 的设计品味而构建的，避免了 Inter 字体和紫色渐变等经典模式。

---

#### 技巧 2：建立"坑点"章节

任何 skill 中信号量最高的内容就是"坑点"(Gotchas) 章节。这些章节应该从 Claude 使用你的 skill 时遇到的常见失败点中积累而来。理想情况下，你应该随着时间推移不断更新你的 skill 来捕获这些坑点。

---

#### 技巧 3：利用文件系统和渐进式披露

Skill 是一个文件夹，不仅仅是一个 markdown 文件。你应该把整个文件系统视为上下文工程和渐进式披露的一种形式。告诉 Claude 你的 skill 中有哪些文件，它会在适当的时候读取它们。最简单的形式是指向其他 markdown 文件——例如，将详细的函数签名和使用示例拆分到 `references/api.md` 中。你可以有参考文件夹、脚本文件夹、示例文件夹等。

---

#### 技巧 4：避免过度限制 Claude

Claude 通常会尝试遵循你的指令，因为 skill 是高度可复用的，所以你要注意不要过于具体。给 Claude 它需要的信息，但给它适应情况的灵活性。与其给出规定性的分步指令，不如给出目标和约束。

---

#### 技巧 5：考虑好初始化设置

有些 skill 可能需要用户的上下文来初始化。一个好的模式是将设置信息存储在 skill 目录中的 `config.json` 文件中。如果配置未设置，代理可以向用户询问信息。你可以指示 Claude 使用 AskUserQuestion 工具进行结构化的多选问题。

---

#### 技巧 6：描述字段是写给模型看的

当 Claude Code 启动一个会话时，它会构建一个包含所有可用 skill 及其描述的列表。这个列表是 Claude 用来判断"这个请求有对应的 skill 吗？"的依据。这意味着描述字段不是摘要——它是**何时触发**这个 skill 的描述。为模型而写。

---

#### 技巧 7：记忆与数据存储

一些 skill 可以通过在其中存储数据来实现一种记忆形式。你可以把数据存储在简单的追加式文本日志文件或 JSON 文件中，也可以用复杂的 SQLite 数据库。存储在 skill 目录中的数据可能在升级 skill 时被删除，所以请使用 `${CLAUDE_PLUGIN_DATA}` 作为每个插件的稳定数据文件夹。

---

#### 技巧 8：存储脚本与生成代码

你能给 Claude 的最强大工具之一就是代码。给 Claude 脚本和库让它可以把精力花在组合上，决定下一步做什么，而不是重建样板代码。Claude 还可以即时生成脚本来组合这些功能，以进行更高级的分析。

---

#### 技巧 9：按需钩子

Skill 可以包含仅在 skill 被调用时激活的钩子，并持续到会话结束。用于那些你不想一直运行但有时非常有用的带有强烈倾向性的钩子。

**示例：**
- `/careful` —— 通过 PreToolUse 匹配 Bash 来阻止 `rm -rf`、`DROP TABLE`、force-push、`kubectl delete`
- `/freeze` —— 阻止任何不在特定目录中的 Edit/Write 操作

---

### 分发 Skill

与团队共享 skill 的两种方式：
- **提交到仓库**（在 `.claude/skills` 下）—— 适合在相对少量仓库中工作的小团队
- **制作插件**，建立一个 Claude Code 插件市场，用户可以上传和安装插件

每个被提交的 skill 也会给模型增加一点上下文。随着规模扩大，内部插件市场让你可以分发 skill 并让团队决定安装哪些。

---

### 管理市场

没有集中的团队来决定哪些 skill 进入市场。相反，尝试有机地找到最有用的 skill。上传到 GitHub 的沙箱文件夹并在 Slack 或其他论坛中分享。一旦一个 skill 获得了足够的关注（由 skill 的所有者决定），他们就可以提交 PR 将其移入市场。发布前的审查很重要，以避免重复的 skill。

---

### 组合 Skill

你可能希望 skill 之间相互依赖。例如，一个文件上传 skill 负责上传文件，一个 CSV 生成 skill 负责创建 CSV 并上传它。这种依赖管理尚未原生内置到市场或 skill 中，但你可以按名称引用其他 skill，模型会在它们已安装的情况下调用它们。

---

### 衡量 Skill

要了解一个 skill 的表现，使用 PreToolUse 钩子在公司内记录 skill 的使用情况。这样你就可以找到受欢迎的 skill，或者触发率低于预期的 skill。

---

### 总结

Skill 是代理极其强大、灵活的工具，但这一切仍处于早期阶段，我们都在摸索如何最好地使用它们。把这些更多地看作一组经验证有效的实用技巧，而不是一份权威指南。理解 skill 的最好方式是动手开始、不断实验、看看什么对你有效。我们的大多数 skill 最初只是几行文字和一个坑点，后来因为人们在 Claude 遇到新的边界情况时不断补充而变得越来越好。
