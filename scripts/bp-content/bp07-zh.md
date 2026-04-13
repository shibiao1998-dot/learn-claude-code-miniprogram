# 设置与工作流

Claude Code 的 `settings.json` 配置参考、Power-ups 交互教程，以及 CLI 启动标志完整指南。

---

## 1. 设置层级

设置按优先级从高到低应用：

| 优先级 | 位置 | 作用域 | 共享？ | 用途 |
|--------|------|--------|--------|------|
| 1 | 受管设置（Managed Settings） | 组织 | 是（IT 部署） | 不可覆盖的安全策略 |
| 2 | 命令行参数 | 会话 | 不适用 | 单次会话临时覆盖 |
| 3 | `.claude/settings.local.json` | 项目 | 否（git 忽略） | 个人项目专属设置 |
| 4 | `.claude/settings.json` | 项目 | 是（已提交） | 团队共享设置 |
| 5 | `~/.claude/settings.json` | 用户 | 不适用 | 全局个人默认值 |

**受管设置**由组织强制执行，不可被任何其他层级覆盖（包括命令行参数）。交付方式包括：

- **服务器受管设置**（远程交付）
- **MDM 配置文件** — macOS plist `com.anthropic.claudecode`
- **注册表策略** — Windows `HKLM\SOFTWARE\Policies\ClaudeCode`
- **文件** — `managed-settings.json` 和 `managed-mcp.json`
- **Drop-in 目录** — `managed-settings.d/` 用于独立策略片段（v2.1.83），遵循 systemd 约定，按文件名字母顺序合并

**重要规则**：

- `deny` 规则具有最高安全优先级，不可被低优先级的 allow/ask 规则覆盖
- 数组设置（如 `permissions.allow`）跨作用域**拼接去重**——各层级的条目合并而非替换

---

## 2. 权限系统

### 权限结构

```json
{
  "permissions": {
    "allow": [],
    "ask": [],
    "deny": [],
    "additionalDirectories": [],
    "defaultMode": "acceptEdits",
    "disableBypassPermissionsMode": "disable"
  }
}
```

### 权限模式

| 模式 | 行为 |
|------|------|
| `"default"` | 标准权限检查，带提示 |
| `"acceptEdits"` | 自动接受文件编辑，无需询问 |
| `"dontAsk"` | 自动拒绝工具，除非通过 `/permissions` 或 `permissions.allow` 预批准 |
| `"bypassPermissions"` | 跳过所有权限检查（危险） |
| `"auto"` | 后台分类器替代手动提示（研究预览，需要 Team 计划 + Sonnet/Opus 4.6） |
| `"plan"` | 只读探索模式 |

### 工具权限语法

| 工具 | 语法 | 示例 |
|------|------|------|
| `Bash` | `Bash(command pattern)` | `Bash(npm run *)`、`Bash(git *)` |
| `Read` | `Read(path pattern)` | `Read(.env)`、`Read(./secrets/**)` |
| `Edit` | `Edit(path pattern)` | `Edit(src/**)`、`Edit(*.ts)` |
| `Write` | `Write(path pattern)` | `Write(*.md)` |
| `WebFetch` | `WebFetch(domain:pattern)` | `WebFetch(domain:example.com)` |
| `WebSearch` | `WebSearch` | 全局网页搜索 |
| `Agent` | `Agent(name)` | `Agent(researcher)`、`Agent(*)` |
| `MCP` | `mcp__server__tool` | `mcp__memory__*`、`MCP(github:*)` |

**求值顺序**：规则按顺序求值——先 deny，再 ask，最后 allow。第一个匹配的规则生效。

**路径模式前缀**：

| 前缀 | 含义 | 示例 |
|------|------|------|
| `//` | 文件系统根目录的绝对路径 | `Read(//Users/alice/file)` |
| `~/` | 相对于 home 目录 | `Read(~/.zshrc)` |
| `/` | 相对于项目根目录 | `Edit(/src/**)` |
| `./` 或无前缀 | 相对路径（当前目录） | `Read(.env)` |

**权限配置示例**：

```json
{
  "permissions": {
    "allow": [
      "Edit(*)",
      "Write(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__*"
    ],
    "ask": [
      "Bash(rm *)",
      "Bash(git push *)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)",
      "Bash(curl *)"
    ],
    "additionalDirectories": ["../shared-libs/"]
  }
}
```

---

## 3. 模型配置

### 模型别名

| 别名 | 说明 |
|------|------|
| `"default"` | 推荐的账户类型默认模型 |
| `"sonnet"` | 最新 Sonnet 模型（Claude Sonnet 4.6） |
| `"opus"` | 最新 Opus 模型（Claude Opus 4.6） |
| `"haiku"` | 快速 Haiku 模型 |
| `"sonnet[1m]"` | Sonnet，1M token 上下文 |
| `"opus[1m]"` | Opus，1M token 上下文（Max、Team、Enterprise 默认，v2.1.75 起） |
| `"opusplan"` | Opus 用于规划，Sonnet 用于执行 |

### Effort Level（推理深度）

`/model` 命令提供 **effort level** 控制，调整模型对每个响应的推理深度：

| 级别 | 说明 |
|------|------|
| High（默认） | 完整推理深度，适合复杂任务 |
| Medium | 平衡推理，适合日常任务 |
| Low | 最少推理，响应最快 |

**设置方式**：

1. 运行 `/effort low`、`/effort medium` 或 `/effort high` 直接设置（v2.1.76+）
2. 或运行 `/model` → 选择模型 → 使用 **← →** 方向键调整
3. 通过 `effortLevel` 键持久化到 `settings.json`

### 模型覆盖

将 Anthropic 模型 ID 映射到 Bedrock、Vertex 或 Foundry 部署的提供商特定模型 ID：

```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-sonnet-4-6-v1:0"
  }
}
```

### 模型环境变量

通过 `env` 键配置：

```json
{
  "env": {
    "ANTHROPIC_MODEL": "sonnet",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku",
    "MAX_THINKING_TOKENS": "10000"
  }
}
```

---

## 4. 显示与用户体验

### 显示设置

| 键 | 类型 | 默认值 | 说明 |
|-----|------|--------|------|
| `statusLine` | object | - | 自定义状态栏配置 |
| `outputStyle` | string | `"default"` | 输出风格 |
| `spinnerTipsEnabled` | boolean | `true` | 等待时显示提示 |
| `spinnerVerbs` | object | - | 自定义 spinner 动词 |
| `spinnerTipsOverride` | object | - | 自定义 spinner 提示 |
| `respectGitignore` | boolean | `true` | 在文件选择器中遵循 .gitignore |
| `prefersReducedMotion` | boolean | `false` | 减少 UI 动画和动态效果 |
| `fileSuggestion` | object | - | 自定义文件建议命令 |

### 状态栏配置

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh",
    "padding": 2,
    "refreshInterval": 5
  }
}
```

| 字段 | 说明 |
|------|------|
| `type` | 设为 `"command"` 运行 Shell 脚本 |
| `command` | 生成状态栏输出的 Shell 命令或脚本路径 |
| `padding` | 额外水平间距（字符数） |
| `refreshInterval` | 每 N 秒重新执行命令（最小值 1） |

状态栏命令通过 stdin 接收 JSON 对象，包含当前模型、工作目录、费用统计、上下文窗口使用情况、速率限制等丰富信息。

### Spinner 自定义示例

```json
{
  "spinnerVerbs": {
    "mode": "replace",
    "verbs": ["Cooking", "Brewing", "Crafting", "Conjuring"]
  },
  "spinnerTipsOverride": {
    "tips": ["在 ~50% 上下文时使用 /compact", "复杂任务先用 plan mode"],
    "excludeDefault": true
  }
}
```

### 全局配置（`~/.claude.json`）

以下偏好存储在 `~/.claude.json` 中（**不是** `settings.json`）：

| 键 | 说明 |
|-----|------|
| `autoConnectIde` | 自动连接正在运行的 IDE |
| `editorMode` | 按键绑定模式：`"normal"` 或 `"vim"` |
| `showTurnDuration` | 显示轮次耗时消息 |
| `terminalProgressBarEnabled` | 终端进度条 |
| `teammateMode` | Agent Team 显示模式：`"auto"`、`"in-process"` 或 `"tmux"` |

---

## 5. 沙箱

沙箱为 Bash 命令提供安全隔离：

```json
{
  "sandbox": {
    "enabled": true,
    "autoAllowBashIfSandboxed": true,
    "excludedCommands": ["git", "docker", "gh"],
    "allowUnsandboxedCommands": false,
    "network": {
      "allowUnixSockets": ["/var/run/docker.sock"],
      "allowLocalBinding": true
    }
  }
}
```

关键设置：

| 键 | 说明 |
|-----|------|
| `sandbox.enabled` | 启用 Bash 沙箱 |
| `sandbox.failIfUnavailable` | 沙箱无法启动时退出（而非不隔离运行） |
| `sandbox.autoAllowBashIfSandboxed` | 沙箱启用时自动批准 Bash 命令 |
| `sandbox.excludedCommands` | 在沙箱外运行的命令 |
| `sandbox.allowUnsandboxedCommands` | 允许 `dangerouslyDisableSandbox` 逃逸 |
| `sandbox.network.allowedDomains` | 沙箱中的网络域名允许列表 |
| `sandbox.filesystem.allowWrite` | 沙箱命令可写入的额外路径 |
| `sandbox.filesystem.denyWrite` | 沙箱命令不可写入的路径 |
| `sandbox.filesystem.denyRead` | 沙箱命令不可读取的路径 |

---

## 6. 插件系统

### 插件设置

| 键 | 作用域 | 说明 |
|-----|--------|------|
| `enabledPlugins` | 任意 | 启用/禁用特定插件 |
| `extraKnownMarketplaces` | 项目 | 添加自定义插件市场 |
| `strictKnownMarketplaces` | 受管 | 允许的市场白名单 |
| `blockedMarketplaces` | 受管 | 阻止特定市场 |

### 市场来源类型

`github`、`git`、`directory`、`hostPattern`、`settings`、`url`、`npm`、`file`

使用 `source: 'settings'` 可以内联声明少量插件，无需搭建托管市场仓库：

```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    }
  }
}
```

---

## 7. 其他核心设置

### 通用设置

| 键 | 类型 | 说明 |
|-----|------|------|
| `model` | string | 覆盖默认模型，接受别名或完整模型 ID |
| `agent` | string | 设置主对话的默认代理 |
| `language` | string | Claude 的偏好响应语言 |
| `cleanupPeriodDays` | number | 不活跃会话的清理周期（天），默认 30 |
| `autoUpdatesChannel` | string | 更新渠道：`"stable"` 或 `"latest"` |
| `alwaysThinkingEnabled` | boolean | 默认启用扩展思考 |
| `showThinkingSummaries` | boolean | 在交互会话中显示思考摘要 |
| `includeGitInstructions` | boolean | 在系统提示词中包含 git 工作流指令 |
| `defaultShell` | string | 默认 Shell：`"bash"` 或 `"powershell"` |
| `availableModels` | array | 限制用户可选的模型列表 |

### Plans 和 Memory 目录

| 键 | 说明 |
|-----|------|
| `plansDirectory` | `/plan` 输出的存储目录，默认 `~/.claude/plans` |
| `autoMemoryDirectory` | 自动记忆的自定义存储目录 |

### Worktree（工作树）设置

```json
{
  "worktree": {
    "symlinkDirectories": ["node_modules", ".cache"],
    "sparsePaths": ["packages/my-app", "shared/utils"]
  }
}
```

### Attribution（署名）设置

```json
{
  "attribution": {
    "commit": "Generated with AI\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
    "pr": "Generated with Claude Code"
  }
}
```

设为空字符串 `""` 可完全隐藏署名。

### 认证辅助

| 键 | 说明 |
|-----|------|
| `apiKeyHelper` | 输出认证 token 的 Shell 脚本路径 |
| `forceLoginMethod` | 限制登录方式为 `"claudeai"` 或 `"console"` |
| `forceLoginOrgUUID` | 要求登录属于特定组织 |

---

## 8. Power-ups（交互教程）

Power-ups 是 v2.1.90 引入的交互式课程，通过动画演示教授 Claude Code 的功能。每个 Power-up 教一个大多数人会遗漏的 Claude Code 功能。

### 使用方式

```bash
claude
/powerup
```

### 全部 10 个 Power-ups

| # | Power-up | 涵盖主题 |
|---|----------|---------|
| 1 | Talk to your codebase | `@` 文件引用、行号引用 |
| 2 | Steer with modes | `shift+tab`、plan 模式、auto 模式 |
| 3 | Undo anything | `/rewind`、`Esc-Esc` |
| 4 | Run in the background | 任务、`/tasks` |
| 5 | Teach Claude your rules | `CLAUDE.md`、`/memory` |
| 6 | Extend with tools | MCP、`/mcp` |
| 7 | Automate your workflow | Skills（技能）、Hooks（钩子） |
| 8 | Multiply yourself | 子代理、`/agents` |
| 9 | Code from anywhere | `/remote-control`、`/teleport` |
| 10 | Dial the model | `/model`、`/effort` |

---

## 9. CLI 启动标志

从终端启动 Claude Code 时可使用的标志和子命令参考。

### 会话管理

| 标志 | 缩写 | 说明 |
|------|------|------|
| `--continue` | `-c` | 继续当前目录中最近的对话 |
| `--resume` | `-r` | 恢复特定会话（按 ID 或名称），或显示交互选择器 |
| `--from-pr <NUMBER\|URL>` | | 恢复与特定 GitHub PR 关联的会话 |
| `--fork-session` | | 恢复时创建新会话 ID |
| `--session-id <UUID>` | | 使用指定会话 ID |
| `--no-session-persistence` | | 禁用会话持久化（仅 print 模式） |
| `--remote` | | 在 claude.ai 上创建新的 web 会话 |
| `--teleport` | | 在本地终端恢复 web 会话 |

### 模型与配置

| 标志 | 说明 |
|------|------|
| `--model <NAME>` | 设置模型，支持别名或完整模型 ID |
| `--fallback-model <NAME>` | 默认模型过载时的自动回退模型（仅 print 模式） |
| `--betas <LIST>` | API 请求中包含的 beta headers |

### 权限与安全

| 标志 | 说明 |
|------|------|
| `--dangerously-skip-permissions` | 跳过所有权限提示，谨慎使用 |
| `--permission-mode <MODE>` | 指定权限模式启动：`default`、`plan`、`acceptEdits`、`bypassPermissions` |
| `--allowedTools <TOOLS>` | 无需提示即可执行的工具（权限规则语法） |
| `--disallowedTools <TOOLS>` | 从模型上下文中完全移除的工具 |
| `--tools <TOOLS>` | 限制 Claude 可使用的内置工具 |
| `--permission-prompt-tool <TOOL>` | 非交互模式下处理权限提示的 MCP 工具 |

### 输出与格式

| 标志 | 缩写 | 说明 |
|------|------|------|
| `--print` | `-p` | 无交互模式输出响应（headless/SDK 模式） |
| `--output-format <FORMAT>` | | 输出格式：`text`、`json`、`stream-json` |
| `--json-schema <SCHEMA>` | | 获取匹配 schema 的验证 JSON（仅 print 模式） |
| `--verbose` | | 启用详细日志，输出完整轮次信息 |

### 系统提示词

| 标志 | 说明 |
|------|------|
| `--system-prompt <TEXT>` | 用自定义文本替换整个系统提示词 |
| `--system-prompt-file <PATH>` | 从文件加载系统提示词 |
| `--append-system-prompt <TEXT>` | 在默认系统提示词后追加自定义文本 |
| `--append-system-prompt-file <PATH>` | 在默认提示词后追加文件内容 |

### 代理与子代理

| 标志 | 说明 |
|------|------|
| `--agent <NAME>` | 为当前会话指定代理 |
| `--agents <JSON>` | 通过 JSON 动态定义自定义子代理 |
| `--teammate-mode <MODE>` | Agent Team 显示模式：`auto`、`in-process`、`tmux` |

### MCP 与插件

| 标志 | 说明 |
|------|------|
| `--mcp-config <PATH\|JSON>` | 从 JSON 文件或字符串加载 MCP 服务器 |
| `--strict-mcp-config` | 仅使用 `--mcp-config` 中的 MCP 服务器，忽略其他 |
| `--plugin-dir <PATH>` | 为此会话从目录加载插件（可重复） |

### 目录与工作区

| 标志 | 缩写 | 说明 |
|------|------|------|
| `--add-dir <PATH>` | | 添加额外工作目录 |
| `--worktree` | `-w` | 在隔离的 git 工作树中启动（基于 HEAD 分支） |

### 预算与限制

| 标志 | 说明 |
|------|------|
| `--max-budget-usd <AMOUNT>` | API 调用的最大金额限制（仅 print 模式） |
| `--max-turns <NUMBER>` | 限制代理轮次数（仅 print 模式） |

### 集成

| 标志 | 说明 |
|------|------|
| `--chrome` | 启用 Chrome 浏览器集成 |
| `--no-chrome` | 禁用 Chrome 浏览器集成 |
| `--ide` | 启动时自动连接 IDE |

### 初始化与维护

| 标志 | 说明 |
|------|------|
| `--init` | 运行初始化 Hooks 并启动交互模式 |
| `--init-only` | 运行初始化 Hooks 后退出 |
| `--maintenance` | 运行维护 Hooks 后退出 |

### 调试与诊断

| 标志 | 说明 |
|------|------|
| `--debug <CATEGORIES>` | 启用调试模式，可选分类过滤（如 `"api,hooks"`） |
| `--doctor` | 诊断配置问题 |

### 设置覆盖

| 标志 | 说明 |
|------|------|
| `--settings <PATH\|JSON>` | 加载 settings JSON 文件或 JSON 字符串 |
| `--setting-sources <LIST>` | 要加载的来源（逗号分隔）：`user`、`project`、`local` |
| `--disable-slash-commands` | 禁用此会话的所有技能和斜杠命令 |

---

## 10. 顶层子命令

作为 `claude <subcommand>` 运行：

| 子命令 | 说明 |
|--------|------|
| `claude` | 启动交互式 REPL |
| `claude "query"` | 带初始提示词启动 REPL |
| `claude agents` | 列出已配置的代理 |
| `claude auth` | 管理 Claude Code 认证 |
| `claude doctor` | 从命令行运行诊断 |
| `claude install` | 安装或切换 Claude Code 原生构建版本 |
| `claude mcp` | 配置 MCP 服务器（`add`、`remove`、`list`、`get`、`enable`） |
| `claude plugin` | 管理 Claude Code 插件 |
| `claude remote-control` | 管理远程控制会话 |
| `claude update` / `claude upgrade` | 更新到最新版本 |

---

## 11. 仅启动环境变量

以下环境变量只能在启动 Claude Code 之前在 Shell 中设置（不能通过 `settings.json` 的 `env` 字段配置）：

| 变量 | 说明 |
|------|------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | 启用实验性 Agent Teams |
| `CLAUDE_CODE_TMPDIR` | 覆盖内部文件的临时目录 |
| `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | 启用额外目录的 CLAUDE.md 加载 |
| `DISABLE_AUTOUPDATER=1` | 禁用自动更新检查 |
| `CLAUDE_CODE_EFFORT_LEVEL` | 控制推理深度 |
| `USE_BUILTIN_RIPGREP=0` | 使用系统 ripgrep 而非内置版本 |
| `CLAUDE_CODE_SIMPLE` | 启用简单模式（仅 Bash + Edit 工具） |
| `CLAUDE_BASH_NO_LOGIN=1` | BashTool 跳过 login shell |
| `CCR_FORCE_BUNDLE=1` | 使用 `claude --remote` 时强制打包上传本地仓库 |

完整的 `env` 字段可配置环境变量列表（包括 `MAX_THINKING_TOKENS`、`CLAUDE_CODE_SHELL`、`CLAUDE_CODE_ENABLE_TASKS` 等 170+ 个变量），请参考 [Claude Code 环境变量参考](https://code.claude.com/docs/en/env-vars)。

---

## 12. 常用命令速查

| 命令 | 说明 |
|------|------|
| `/model` | 切换模型，调整 effort level |
| `/effort` | 直接设置 effort level：`low`、`medium`、`high` |
| `/config` | 交互式配置界面 |
| `/memory` | 查看/编辑所有记忆文件 |
| `/agents` | 管理子代理 |
| `/mcp` | 管理 MCP 服务器 |
| `/hooks` | 查看已配置的 Hooks |
| `/plugin` | 管理插件 |
| `/keybindings` | 配置自定义快捷键 |
| `/skills` | 查看和管理技能 |
| `/permissions` | 查看和管理权限规则 |
| `/powerup` | 打开 Power-ups 交互教程 |

---

## 13. 完整配置示例

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "sonnet",
  "agent": "code-reviewer",
  "language": "english",
  "cleanupPeriodDays": 30,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true,
  "showThinkingSummaries": true,
  "includeGitInstructions": true,
  "defaultShell": "bash",
  "plansDirectory": "./plans",
  "effortLevel": "medium",

  "worktree": {
    "symlinkDirectories": ["node_modules"],
    "sparsePaths": ["packages/my-app", "shared/utils"]
  },

  "permissions": {
    "allow": [
      "Edit(*)",
      "Write(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__*",
      "Agent(*)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)"
    ],
    "additionalDirectories": ["../shared/"],
    "defaultMode": "acceptEdits"
  },

  "enableAllProjectMcpServers": true,

  "sandbox": {
    "enabled": true,
    "excludedCommands": ["git", "docker"]
  },

  "attribution": {
    "commit": "Generated with Claude Code",
    "pr": ""
  },

  "statusLine": {
    "type": "command",
    "command": "git branch --show-current"
  },

  "spinnerTipsEnabled": true,

  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EFFORT_LEVEL": "medium"
  }
}
```

---

## 14. 来源

- [Claude Code Settings Documentation](https://code.claude.com/docs/en/settings)
- [Claude Code CLI Reference](https://code.claude.com/docs/en/cli-reference)
- [Claude Code Permissions Reference](https://code.claude.com/docs/en/permissions)
- [Claude Code Environment Variables Reference](https://code.claude.com/docs/en/env-vars)
- [Claude Code Changelog — v2.1.90](https://code.claude.com/docs/en/changelog)
- [Claude Code Settings JSON Schema](https://json.schemastore.org/claude-code-settings.json)
