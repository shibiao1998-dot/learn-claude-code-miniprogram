# MCP 与工具集成

MCP（Model Context Protocol，模型上下文协议）服务器通过连接外部工具、数据库和 API 来扩展 Claude Code 的能力。本文涵盖推荐的日常使用服务器、配置方式以及权限管理。

---

## 1. 什么是 MCP

MCP 是一个开放协议，让 Claude Code 能够与外部服务通信。通过 MCP 服务器，Claude 可以获取最新文档、自动化浏览器操作、检查真实的 Chrome 控制台、生成架构图等。

---

## 2. 推荐的日常 MCP 服务器

> *"一口气装了 15 个 MCP 服务器，以为越多越好。结果每天只用 4 个。"* — [r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/)（682 赞）

| MCP 服务器 | 功能 | 资源 |
|------------|------|------|
| [Context7](https://github.com/upstash/context7) | 将最新的库文档拉入上下文，避免因训练数据过时而产生幻觉 API | [Reddit: "目前最好的编码 MCP"](https://reddit.com/r/mcp/comments/1qarjqm/) · [npm](https://www.npmjs.com/package/@upstash/context7-mcp) |
| [Playwright](https://github.com/microsoft/playwright-mcp) | 浏览器自动化——自主实现、测试和验证 UI 功能。支持截图、导航、表单测试 | [Reddit: 前端必备](https://reddit.com/r/mcp/comments/1m59pk0/) · [Docs](https://playwright.dev/) |
| [Claude in Chrome](https://github.com/nicobailon/claude-code-in-chrome-mcp) | 连接 Claude 到你的真实 Chrome 浏览器——检查控制台、网络、DOM。调试用户实际看到的内容 | [Reddit: "调试的 game changer"](https://reddit.com/r/mcp/comments/1qarjqm/) |
| [DeepWiki](https://github.com/devanshusemwal/deepwiki-mcp) | 获取任何 GitHub 仓库的结构化 wiki 文档——架构、API 接口、关系映射 | [GitHub](https://github.com/devanshusemwal/deepwiki-mcp) |
| [Excalidraw](https://github.com/antonpk1/excalidraw-mcp-app) | 根据提示词生成架构图、流程图和系统设计的手绘风格 Excalidraw 草图 | [GitHub](https://github.com/antonpk1/excalidraw-mcp-app) |

工作流闭环：**研究**（Context7/DeepWiki）→ **调试**（Playwright/Chrome）→ **文档化**（Excalidraw）

---

## 3. 配置

MCP 服务器在项目根目录的 `.mcp.json`（项目级）或 `~/.claude.json`（用户级）中配置。

### 传输类型

| 类型 | 传输方式 | 示例 |
|------|---------|------|
| **stdio** | 生成本地进程 | `npx`、`python`、二进制文件 |
| **http** | 连接远程 URL | HTTP/SSE 端点 |

### `.mcp.json` 配置示例

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    },
    "deepwiki": {
      "command": "npx",
      "args": ["-y", "deepwiki-mcp"]
    },
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp"
    }
  }
}
```

### 使用环境变量保护密钥

使用环境变量展开来引用密钥，避免在 `.mcp.json` 中硬编码 API Key：

```json
{
  "mcpServers": {
    "remote-api": {
      "type": "http",
      "url": "https://mcp.example.com/mcp?token=${MCP_API_TOKEN}"
    }
  }
}
```

---

## 4. Settings 中的 MCP 配置

在 `.claude/settings.json` 中可以控制 MCP 服务器的审批行为：

| 键 | 类型 | 说明 |
|-----|------|------|
| `enableAllProjectMcpServers` | boolean | 自动批准所有 `.mcp.json` 中的服务器，无需提示 |
| `enabledMcpjsonServers` | array | 自动批准的特定服务器名称允许列表 |
| `disabledMcpjsonServers` | array | 要拒绝的特定服务器名称阻止列表 |

**受管设置（Managed Settings）专用**：

| 键 | 类型 | 说明 |
|-----|------|------|
| `allowedMcpServers` | array | 按名称/命令/URL 匹配的允许列表 |
| `deniedMcpServers` | array | 按匹配规则的阻止列表 |
| `allowManagedMcpServersOnly` | boolean | 仅允许受管允许列表中的 MCP 服务器 |

### 受管设置中的服务器匹配

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": "npx @modelcontextprotocol/*" },
    { "serverUrl": "https://mcp.company.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" }
  ]
}
```

### 配置示例

```json
{
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": ["memory", "github", "filesystem"],
  "disabledMcpjsonServers": ["experimental-server"]
}
```

---

## 5. MCP 工具的权限规则

MCP 工具在权限规则中遵循 `mcp__<server>__<tool>` 命名约定：

```json
{
  "permissions": {
    "allow": [
      "mcp__*",
      "mcp__context7__*",
      "mcp__playwright__browser_snapshot"
    ],
    "deny": [
      "mcp__dangerous-server__*"
    ]
  }
}
```

在权限规则中也可以使用 `MCP(server:tool)` 语法：

```json
{
  "permissions": {
    "allow": [
      "MCP(github:*)"
    ]
  }
}
```

---

## 6. MCP 作用域

MCP 服务器可在三个层级定义：

| 作用域 | 位置 | 用途 |
|--------|------|------|
| **项目级** | `.mcp.json`（仓库根目录） | 团队共享服务器，提交到 git |
| **用户级** | `~/.claude.json`（`mcpServers` 键） | 跨所有项目的个人服务器 |
| **子代理级** | 代理 frontmatter 字段（`mcpServers` 字段） | 作用域限定于特定子代理的服务器 |

**优先级**：子代理级 > 项目级 > 用户级

---

## 7. 常用环境变量

| 变量 | 说明 |
|------|------|
| `MCP_TIMEOUT` | MCP 启动超时时间（毫秒） |
| `MAX_MCP_OUTPUT_TOKENS` | MCP 最大输出 token 数（默认：25000）。输出超过 10,000 token 时显示警告 |
| `MCP_TOOL_TIMEOUT` | MCP 工具执行超时时间（毫秒） |
| `MCP_CLIENT_SECRET` | MCP OAuth 客户端密钥 |
| `MCP_OAUTH_CALLBACK_PORT` | MCP OAuth 回调端口 |
| `ENABLE_TOOL_SEARCH` | MCP 工具搜索阈值（如 `auto:5`） |
| `CLAUDE_CODE_DISABLE_MCP` | 禁用所有 MCP 服务器（`1` 禁用） |
| `MCP_CONNECTION_NONBLOCKING` | 在 `-p` 模式下设为 `true` 可跳过 MCP 连接等待 |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | 启用 Claude.ai MCP 服务器 |

---

## 8. 与子代理配合使用

子代理可以通过 frontmatter 中的 `mcpServers` 字段配置专属的 MCP 服务器：

```yaml
---
name: research-agent
description: Research agent with web access
tools: WebFetch, Read, Grep
mcpServers:
  - context7
  - deepwiki
---
```

这意味着你可以为不同的子代理配置不同的 MCP 工具集，实现更精细的权限和能力控制。

---

## 9. 常用命令

| 命令 | 说明 |
|------|------|
| `/mcp` | 管理 MCP 服务器（查看、添加、移除） |
| `claude mcp add` | 从命令行添加 MCP 服务器 |
| `claude mcp remove` | 从命令行移除 MCP 服务器 |
| `claude mcp list` | 列出已配置的 MCP 服务器 |
| `claude mcp get` | 获取特定 MCP 服务器的详细信息 |
| `claude mcp enable` | 启用 MCP 服务器 |

---

## 10. 来源

- [MCP Servers — Claude Code Docs](https://code.claude.com/docs/en/mcp)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [5 MCPs that have genuinely made me 10x faster — r/mcp](https://reddit.com/r/mcp/comments/1qarjqm/)
- [MCP Server Overload Discussion — r/mcp](https://reddit.com/r/mcp/comments/1mj0fxs/)
