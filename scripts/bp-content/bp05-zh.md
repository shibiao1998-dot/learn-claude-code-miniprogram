# 子代理（Subagents）

Claude Code 子代理——frontmatter 字段、内置代理类型，以及 Command → Agent → Skill 编排架构的实践示例。

---

## 1. 什么是子代理

子代理是 Claude Code 中的专用 AI 代理，可以在主会话中被生成来执行特定任务。每个子代理可以拥有自己的工具集、模型、权限模式和生命周期 Hooks（钩子）。子代理通过 `.claude/agents/` 目录下的 Markdown 文件定义，使用 YAML frontmatter 字段进行配置。

---

## 2. Frontmatter 字段（16 个）

每个子代理通过 `.claude/agents/<name>.md` 文件定义，文件顶部的 YAML frontmatter 字段控制代理行为：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `name` | string | 是 | 唯一标识符，使用小写字母和连字符 |
| `description` | string | 是 | 描述何时调用。使用 `"PROACTIVELY"` 可让 Claude 自动调用 |
| `tools` | string/list | 否 | 工具允许列表（逗号分隔），如 `Read, Write, Edit, Bash`。省略则继承所有工具。支持 `Agent(agent_type)` 语法限制可生成的子代理；旧的 `Task(agent_type)` 别名仍有效 |
| `disallowedTools` | string/list | 否 | 要拒绝的工具，从继承的或指定的列表中移除 |
| `model` | string | 否 | 使用的模型：`sonnet`、`opus`、`haiku`、完整模型 ID（如 `claude-opus-4-6`）或 `inherit`（默认：`inherit`） |
| `permissionMode` | string | 否 | 权限模式：`default`、`acceptEdits`、`auto`、`dontAsk`、`bypassPermissions` 或 `plan` |
| `maxTurns` | integer | 否 | 子代理停止前的最大代理轮次数 |
| `skills` | list | 否 | 启动时预加载到代理上下文中的技能名称（完整内容注入，不仅仅是可用） |
| `mcpServers` | list | 否 | 此子代理的 MCP 服务器——服务器名称字符串或内联 `{name: config}` 对象 |
| `hooks` | object | 否 | 作用域为此子代理的生命周期 Hooks。支持所有 Hook 事件；最常用的是 `PreToolUse`、`PostToolUse` 和 `Stop` |
| `memory` | string | 否 | 持久化记忆范围：`user`、`project` 或 `local` |
| `background` | boolean | 否 | 设为 `true` 则始终作为后台任务运行（默认：`false`） |
| `effort` | string | 否 | 此子代理激活时的 effort level 覆盖：`low`、`medium`、`high`、`max`（仅 Opus 4.6）。默认：继承会话设置 |
| `isolation` | string | 否 | 设为 `"worktree"` 则在临时 git 工作树中运行（无变更时自动清理） |
| `initialPrompt` | string | 否 | 当此代理作为主会话代理运行时（通过 `--agent` 或 `agent` 设置），自动作为第一个用户轮次提交。命令和技能会被处理。会预置到用户提供的提示词之前 |
| `color` | string | 否 | 任务列表和记录中的显示颜色：`red`、`blue`、`green`、`yellow`、`purple`、`orange`、`pink` 或 `cyan` |

---

## 3. 内置代理类型（5 个）

Claude Code 提供 5 个开箱即用的内置代理：

| # | 代理 | 模型 | 工具 | 说明 |
|---|------|------|------|------|
| 1 | `general-purpose` | inherit | 全部 | 复杂的多步骤任务——默认代理类型，用于研究、代码搜索和自主工作 |
| 2 | `Explore` | haiku | 只读（无 Write、Edit） | 快速代码库搜索和探索——优化用于查找文件、搜索代码和回答代码库问题 |
| 3 | `Plan` | inherit | 只读（无 Write、Edit） | 计划模式下的预规划研究——在编写代码之前探索代码库并设计实现方案 |
| 4 | `statusline-setup` | sonnet | Read、Edit | 配置用户的 Claude Code 状态栏设置 |
| 5 | `claude-code-guide` | haiku | Glob、Grep、Read、WebFetch、WebSearch | 回答关于 Claude Code 功能、Agent SDK 和 Claude API 的问题 |

---

## 4. 创建自定义子代理

### 方式一：使用 `/agents` 命令

```bash
$ claude
> /agents
```

这会打开代理管理界面，可以创建、编辑和删除代理。

### 方式二：让 Claude 帮你创建

直接告诉 Claude 你需要什么样的代理，它会自动在 `.claude/agents/<name>.md` 中生成包含 YAML frontmatter 和正文的 Markdown 文件。

### 方式三：手动创建文件

在 `.claude/agents/` 目录下创建一个 `.md` 文件，包含 YAML frontmatter 和代理指令正文。

---

## 5. 实践示例：天气代理

### 代理定义

**文件**：`.claude/agents/weather-agent.md`

```yaml
---
name: weather-agent
description: Use this agent PROACTIVELY when you need to fetch weather data for
  Dubai, UAE. This agent fetches real-time temperature from Open-Meteo
  using its preloaded weather-fetcher skill.
tools: WebFetch, Read, Write, Edit
model: sonnet
color: green
maxTurns: 5
permissionMode: acceptEdits
memory: project
skills:
  - weather-fetcher
---

# Weather Agent

You are a specialized weather agent that fetches weather data for Dubai,
UAE.

## Your Task

Execute the weather workflow by following the instructions from your preloaded
skill:

1. **Fetch**: Follow the `weather-fetcher` skill instructions to fetch the
   current temperature
2. **Report**: Return the temperature value and unit to the caller
3. **Memory**: Update your agent memory with the reading details for
   historical tracking

...
```

该代理有一个预加载技能（`weather-fetcher`），提供从 Open-Meteo 获取天气数据的指令。它将温度值和单位返回给调用方。

### 使用方式

```bash
$ claude
> what is the weather in dubai?
```

由于 `description` 中包含 `PROACTIVELY`，Claude 会自动识别并调用此代理来获取天气数据。

---

## 6. 编排架构：Command → Agent → Skill

天气代理演示了 **Command → Agent → Skill** 编排模式，展示了三个组件如何协同工作：

| 组件 | 角色 | 示例 |
|------|------|------|
| **Command（命令）** | 入口点，用户交互 | `/weather-orchestrator` |
| **Agent（代理）** | 使用预加载技能获取数据（agent skill） | `weather-agent` + `weather-fetcher` 技能 |
| **Skill（技能）** | 独立创建输出（standalone skill） | `weather-svg-creator` 技能 |

### 工作流程

1. 用户通过 `/weather-orchestrator` 命令发起请求
2. 命令将工作流传递给 `weather-agent` 代理
3. 代理使用预加载的 `weather-fetcher` 技能获取温度数据
4. 命令随后调用独立的 `weather-svg-creator` 技能创建可视化输出

这种模式展示了两种不同的技能用法：

- **Agent Skill（代理技能）**：通过 `skills` frontmatter 字段预加载到代理中，代理在执行时自动使用
- **Standalone Skill（独立技能）**：由命令或用户直接调用，独立执行

---

## 7. 权限控制

子代理的生成可以通过权限规则控制：

```json
{
  "permissions": {
    "allow": [
      "Agent(*)",
      "Task(Explore)",
      "Agent(my-agent)"
    ],
    "deny": [
      "Agent(dangerous-agent)"
    ]
  }
}
```

`Agent(agent_type)` 和 `Task(agent_type)` 语法都可以在权限规则中使用，用于限制可生成的子代理类型。

---

## 8. 使用建议

1. **合理选择模型**：对于只读探索任务使用 `haiku`（更快更便宜），复杂任务使用 `inherit` 或 `opus`
2. **限制工具集**：通过 `tools` 和 `disallowedTools` 精确控制子代理可以使用的工具
3. **设置 `maxTurns`**：防止子代理无限循环
4. **利用 `isolation: "worktree"`**：让子代理在隔离环境中工作，避免干扰主分支
5. **使用 `background: true`**：对于不需要实时交互的任务，让子代理在后台运行
6. **预加载技能**：通过 `skills` 字段将常用技能注入代理上下文，减少额外工具调用

---

## 9. 来源

- [Create custom subagents — Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [CLI reference — Claude Code Docs](https://code.claude.com/docs/en/cli-reference)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
