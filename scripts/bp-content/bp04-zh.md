# Hooks（钩子）系统

Hooks 是用户定义的 Shell 命令、HTTP 端点或 LLM 提示词，在 Claude Code 生命周期的特定节点自动执行。本文涵盖所有 Hook 事件、配置格式、匹配器、退出码、环境变量以及 HTTP Hooks。

---

## 1. 什么是 Hooks

Hooks 在 Claude Code 会话的关键时刻触发。当事件触发且匹配器（matcher）匹配时，Claude Code 会将事件的 JSON 上下文传递给你的 Hook 处理程序：

- **Command hooks（命令钩子）**：通过 stdin 接收输入
- **HTTP hooks**：通过 POST 请求体接收输入
- **Prompt hooks（提示词钩子）**：由 LLM 处理
- **Agent hooks（代理钩子）**：由子代理处理

事件分为三种频率：

| 频率 | 事件示例 |
|------|---------|
| 每会话一次 | `SessionStart`、`SessionEnd` |
| 每轮一次 | `UserPromptSubmit`、`Stop`、`StopFailure` |
| 每次工具调用 | `PreToolUse`、`PostToolUse` |

---

## 2. 配置格式

Hooks 在 `settings.json` 的 `hooks` 字段中配置。每个事件名称下包含一个匹配器数组，每个匹配器关联一组 Hook 处理程序：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/validate-bash.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/lint-on-save.sh"
          }
        ]
      }
    ]
  }
}
```

### Hook 类型

| 类型 | 说明 |
|------|------|
| `command` | 执行 Shell 命令 |
| `prompt` | 由 LLM 处理 |
| `agent` | 由子代理处理 |
| `http` | 发送 POST 请求到 URL 端点 |

### 子代理中的 Hooks

子代理也可以在 YAML frontmatter 字段中定义 Hooks，格式与 `settings.json` 相同：

```yaml
---
name: secure-operations
description: Perform operations with security checks
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/security-check.sh"
---
```

### `/hooks` 菜单

在 Claude Code 中输入 `/hooks` 可以打开一个只读浏览器，查看已配置的所有 Hooks。菜单显示四种 Hook 类型（`command`、`prompt`、`agent`、`http`），每个 Hook 标有来源标签：

- `User`：来自 `~/.claude/settings.json`
- `Project`：来自 `.claude/settings.json`
- `Local`：来自 `.claude/settings.local.json`
- `Plugin`：来自插件的 `hooks/hooks.json`
- `Session`：当前会话中内存注册
- `Built-in`：Claude Code 内部注册

### 禁用 Hooks

- **移除单个 Hook**：从 settings JSON 中删除对应条目
- **临时禁用全部 Hooks**：在 settings 中设置 `"disableAllHooks": true`
- **受管设置层级**：管理员通过受管策略配置的 Hooks 不会被用户/项目级的 `disableAllHooks` 禁用，只有受管层级的 `disableAllHooks` 才能禁用受管 Hooks

### 相关设置键

| 键 | 说明 |
|-----|------|
| `hooks` | Hook 配置对象 |
| `disableAllHooks` | 临时禁用所有 Hooks |
| `allowManagedHooksOnly` | 仅允许受管 Hooks |
| `allowedHttpHookUrls` | 允许的 HTTP Hook URL |
| `httpHookAllowedEnvVars` | HTTP Hook 允许传递的环境变量 |

---

## 3. 输入与输出

### 通用输入字段

所有 Hook 事件都会收到以下 JSON 字段（除了各事件特有的字段）：

| 字段 | 说明 |
|------|------|
| `session_id` | 当前会话标识符 |
| `transcript_path` | 对话 JSON 文件路径 |
| `cwd` | Hook 被调用时的工作目录 |
| `permission_mode` | 当前权限模式：`"default"`、`"plan"`、`"acceptEdits"` 等 |
| `hook_event_name` | 触发的事件名称 |

在 `--agent` 或子代理中运行时，还会包含：

| 字段 | 说明 |
|------|------|
| `agent_id` | 子代理唯一标识符 |
| `agent_type` | 代理名称（如 `"Explore"` 或 `"security-reviewer"`） |

### 退出码

| 退出码 | 含义 |
|--------|------|
| **0** | 成功。Claude Code 解析 stdout 中的 JSON 输出 |
| **2** | 阻断性错误。stdout 被忽略，stderr 内容作为错误信息反馈给 Claude |
| **其他** | 非阻断性错误，在记录中显示通知后继续执行 |

> **重要**：只有退出码 2 才会阻断操作。退出码 1 被视为非阻断性错误，操作仍会继续执行。如果你的 Hook 需要强制执行策略，请使用 `exit 2`。

示例——阻断危险 Bash 命令的 Hook 脚本：

```bash
#!/bin/bash
command=$(jq -r '.tool_input.command' < /dev/stdin)

if [[ "$command" == rm* ]]; then
  echo "Blocked: rm commands are not allowed" >&2
  exit 2  # 阻断性错误：工具调用被阻止
fi

exit 0  # 成功：工具调用继续
```

### 各事件退出码 2 的行为

| Hook 事件 | 可阻断？ | 退出码 2 的效果 |
|-----------|---------|----------------|
| `PreToolUse` | 是 | 阻止工具调用 |
| `PermissionRequest` | 是 | 拒绝权限 |
| `UserPromptSubmit` | 是 | 阻止提示词处理并清除提示词 |
| `Stop` | 是 | 阻止 Claude 停止，继续对话 |
| `SubagentStop` | 是 | 阻止子代理停止 |
| `TeammateIdle` | 是 | 阻止队友进入空闲状态 |
| `TaskCreated` | 是 | 回滚任务创建 |
| `TaskCompleted` | 是 | 阻止任务被标记为完成 |
| `ConfigChange` | 是 | 阻止配置变更生效 |
| `Elicitation` | 是 | 拒绝用户输入请求 |
| `ElicitationResult` | 是 | 阻止响应 |
| `WorktreeCreate` | 是 | 任何非零退出码导致工作树创建失败 |
| `PostToolUse` | 否 | 向 Claude 显示 stderr（工具已执行） |
| `PostToolUseFailure` | 否 | 向 Claude 显示 stderr（工具已失败） |
| `PermissionDenied` | 否 | 退出码和 stderr 被忽略 |
| `Notification` | 否 | 仅向用户显示 stderr |
| `SessionStart` | 否 | 仅向用户显示 stderr |
| `SessionEnd` | 否 | 仅向用户显示 stderr |
| 其他观测类事件 | 否 | 仅记录日志 |

### JSON 输出

退出码 0 时，可通过 stdout 输出 JSON 对象实现更精细的控制：

| 字段 | 默认值 | 说明 |
|------|--------|------|
| `continue` | `true` | 设为 `false` 则 Claude 在 Hook 执行后完全停止处理 |
| `stopReason` | 无 | `continue` 为 `false` 时向用户显示的消息 |
| `suppressOutput` | `false` | 设为 `true` 则从调试日志中省略 stdout |
| `systemMessage` | 无 | 向用户显示的警告消息 |

停止 Claude 的示例：

```json
{
  "continue": false,
  "stopReason": "构建失败，请先修复错误再继续"
}
```

> **注意**：每个 Hook 只能选择一种方式——要么仅使用退出码信号，要么退出码为 0 并输出 JSON 做结构化控制。Claude Code 仅在退出码 0 时处理 JSON。

### HTTP 响应处理

HTTP Hooks 使用 HTTP 状态码和响应体代替退出码和 stdout：

- **2xx 空响应体**：成功，等同于退出码 0 无输出
- **2xx 纯文本响应体**：成功，文本作为上下文添加
- **2xx JSON 响应体**：成功，按相同 JSON 输出格式解析
- **非 2xx 状态**：非阻断性错误，继续执行
- **连接失败或超时**：非阻断性错误，继续执行

> 与命令 Hooks 不同，HTTP Hooks 不能仅通过状态码发出阻断信号。要阻止工具调用或拒绝权限，需返回 2xx 响应并在 JSON 响应体中包含相应决策字段。

---

## 4. 全部 Hook 事件（25 个）

### 事件总览

| 事件 | 触发时机 |
|------|---------|
| `SessionStart` | 会话开始或恢复时 |
| `InstructionsLoaded` | 加载 CLAUDE.md 或 `.claude/rules/*.md` 时 |
| `UserPromptSubmit` | 用户提交提示词，Claude 处理之前 |
| `PreToolUse` | 工具调用执行之前，可阻止 |
| `PermissionRequest` | 显示权限对话框时 |
| `PermissionDenied` | auto mode 分类器拒绝工具调用时 |
| `PostToolUse` | 工具调用成功后 |
| `PostToolUseFailure` | 工具调用失败后 |
| `Notification` | Claude Code 发送通知时 |
| `SubagentStart` | 子代理生成时 |
| `SubagentStop` | 子代理完成时 |
| `TaskCreated` | 任务创建时 |
| `TaskCompleted` | 任务标记完成时 |
| `Stop` | Claude 完成响应时 |
| `StopFailure` | 因 API 错误导致轮次结束时 |
| `TeammateIdle` | Agent Team 队友即将进入空闲时 |
| `ConfigChange` | 会话期间配置文件变更时 |
| `CwdChanged` | 工作目录变更时 |
| `FileChanged` | 被监视的文件在磁盘上变更时 |
| `WorktreeCreate` | 创建工作树时 |
| `WorktreeRemove` | 移除工作树时 |
| `PreCompact` | 上下文压缩之前 |
| `PostCompact` | 上下文压缩完成后 |
| `Elicitation` | MCP 服务器请求用户输入时 |
| `ElicitationResult` | 用户响应 MCP elicitation 后 |
| `SessionEnd` | 会话终止时 |

### 匹配器参考

| 事件 | 匹配器过滤内容 | 匹配器值示例 |
|------|---------------|-------------|
| `PreToolUse`、`PostToolUse`、`PostToolUseFailure`、`PermissionRequest`、`PermissionDenied` | 工具名称 | `Bash`、`Edit\|Write`、`mcp__.*` |
| `SessionStart` | 会话启动方式 | `startup`、`resume`、`clear`、`compact` |
| `SessionEnd` | 会话结束原因 | `clear`、`resume`、`logout`、`prompt_input_exit` |
| `Notification` | 通知类型 | `permission_prompt`、`idle_prompt`、`auth_success` |
| `SubagentStart`、`SubagentStop` | 代理类型 | `Bash`、`Explore`、`Plan`、自定义代理名 |
| `PreCompact`、`PostCompact` | 压缩触发方式 | `manual`、`auto` |
| `FileChanged` | 文件名 | `package.json`、`.env` |

---

## 5. 关键事件详解

### SessionStart

会话开始或恢复时运行。适合加载开发上下文或设置环境变量。仅支持 `type: "command"` Hook。

**额外输入字段**：`source`（`"startup"`、`"resume"`、`"clear"`、`"compact"`）、`model`

```json
{
  "session_id": "abc123",
  "cwd": "/Users/my-project",
  "hook_event_name": "SessionStart",
  "source": "startup",
  "model": "claude-sonnet-4-6"
}
```

**决策控制**：stdout 文本或 `additionalContext` 字段会作为上下文添加给 Claude。

**持久化环境变量**：SessionStart Hooks 可通过 `CLAUDE_ENV_FILE` 环境变量将环境变量写入文件，供后续 Bash 命令使用：

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
  echo 'export DEBUG_LOG=true' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

> `CLAUDE_ENV_FILE` 仅在 `SessionStart`、`CwdChanged` 和 `FileChanged` Hook 中可用。

### UserPromptSubmit

用户提交提示词后、Claude 处理之前运行。可添加上下文、验证提示词或阻止特定类型的提示词。

**额外输入字段**：`prompt`（用户提交的文本）

**决策控制**：

| 字段 | 说明 |
|------|------|
| `decision` | `"block"` 阻止提示词处理并清除 |
| `reason` | 阻止时向用户显示的原因 |
| `additionalContext` | 添加到 Claude 上下文的字符串 |
| `sessionTitle` | 设置会话标题，等同于 `/rename` |

### PreToolUse

Claude 创建工具参数后、执行工具调用之前运行。匹配工具名称：`Bash`、`Edit`、`Write`、`Read`、`Glob`、`Grep`、`Agent`、`WebFetch`、`WebSearch`、`AskUserQuestion`、`ExitPlanMode` 以及 MCP 工具名。

**决策控制**（通过 `hookSpecificOutput`）：

| 字段 | 说明 |
|------|------|
| `permissionDecision` | `"allow"` 跳过权限提示；`"deny"` 阻止调用；`"ask"` 提示用户确认；`"defer"` 优雅退出以便稍后恢复 |
| `permissionDecisionReason` | 原因说明 |
| `updatedInput` | 修改工具的输入参数 |
| `additionalContext` | 工具执行前添加给 Claude 的上下文 |

多个 PreToolUse Hooks 返回不同决策时，优先级为：`deny` > `defer` > `ask` > `allow`

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "不允许数据库写操作"
  }
}
```

### PostToolUse

工具成功完成后立即运行。

**额外输入字段**：`tool_input`、`tool_response`、`tool_use_id`

**决策控制**：

| 字段 | 说明 |
|------|------|
| `decision` | `"block"` 将 `reason` 反馈给 Claude |
| `reason` | `"block"` 时向 Claude 显示的说明 |
| `additionalContext` | 给 Claude 的额外上下文 |

### Stop

Claude 完成响应时运行。退出码 2 可阻止 Claude 停止并继续对话——适合实现"循环直到条件满足"模式。

### Notification

Claude Code 发送通知时运行。匹配通知类型：`permission_prompt`、`idle_prompt`、`auth_success`、`elicitation_dialog`。可为不同类型配置不同处理程序：

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/permission-alert.sh"
          }
        ]
      },
      {
        "matcher": "idle_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/idle-notification.sh"
          }
        ]
      }
    ]
  }
}
```

### PermissionRequest

权限对话框即将显示时运行。可代替用户做出允许或拒绝决策。

**决策控制**（通过 `hookSpecificOutput.decision`）：

| 字段 | 说明 |
|------|------|
| `behavior` | `"allow"` 授予权限，`"deny"` 拒绝 |
| `updatedInput` | 仅 `"allow"` 时：修改工具输入参数 |
| `updatedPermissions` | 仅 `"allow"` 时：要应用的权限更新条目数组 |
| `message` | 仅 `"deny"` 时：告知 Claude 权限被拒绝的原因 |

### FileChanged

被监视的文件在磁盘上变更时运行。`matcher` 字段指定要监视的文件名。支持 `CLAUDE_ENV_FILE` 环境变量。

### WorktreeCreate / WorktreeRemove

工作树创建和移除时运行。`WorktreeCreate` 中任何非零退出码都会导致工作树创建失败。Hook 命令通过 stdout 打印路径，HTTP Hook 通过 `hookSpecificOutput.worktreePath` 返回路径。

---

## 6. 决策控制模式总结

不同事件使用不同的决策控制模式：

| 事件 | 决策模式 | 关键字段 |
|------|---------|---------|
| `UserPromptSubmit`、`PostToolUse`、`Stop`、`SubagentStop`、`ConfigChange` | 顶层 `decision` | `decision: "block"`、`reason` |
| `PreToolUse` | `hookSpecificOutput` | `permissionDecision`（allow/deny/ask/defer） |
| `PermissionRequest` | `hookSpecificOutput` | `decision.behavior`（allow/deny） |
| `PermissionDenied` | `hookSpecificOutput` | `retry: true` 允许模型重试 |
| `WorktreeCreate` | 路径返回 | stdout 打印路径 |
| `Elicitation`、`ElicitationResult` | `hookSpecificOutput` | `action`（accept/decline/cancel） |
| 观测类事件 | 无 | 仅用于日志/清理等副作用 |

---

## 7. 实用示例

### 工具调用前验证 Bash 命令

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/validate-bash.sh"
          }
        ]
      }
    ]
  }
}
```

### 文件写入后自动运行 Lint

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/lint-on-save.sh"
          }
        ]
      }
    ]
  }
}
```

### 会话启动时加载项目上下文

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "./scripts/load-context.sh"
          }
        ]
      }
    ]
  }
}
```

### 使用 HTTP Hook

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "http",
            "url": "https://hooks.example.com/post-tool"
          }
        ]
      }
    ]
  }
}
```

---

## 8. 来源

- [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks)
- [Claude Code Settings Documentation](https://code.claude.com/docs/en/settings)
- [claude-code-hooks](https://github.com/shanraisshan/claude-code-hooks) — 完整 Hook 参考及声音通知系统
