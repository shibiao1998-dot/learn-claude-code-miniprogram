# CLAUDE.md 与记忆系统

通过 CLAUDE.md 文件实现持久化上下文——如何编写它们，以及它们在 monorepo（单仓多项目）中的加载机制。

---

## 1. 编写优秀的 CLAUDE.md

一份结构良好的 CLAUDE.md 是提升 Claude Code 输出质量的最有效方式。Humanlayer 提供了一份优秀的指南，涵盖了应包含的内容、如何组织结构，以及常见的注意事项。

- [Humanlayer - Writing a good Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

---

## 2. 大型 Monorepo 中的 CLAUDE.md

在 monorepo 中使用 Claude Code 时，理解 CLAUDE.md 文件如何被加载到上下文中，对于有效组织项目指令至关重要。

### 两种加载机制

Claude Code 使用两种不同的机制来加载 CLAUDE.md 文件：

#### Ancestor Loading（祖先加载）——沿目录树向上

当你启动 Claude Code 时，它会从当前工作目录**向上**遍历到文件系统根目录，并加载沿途找到的每一个 CLAUDE.md 文件。这些文件在**启动时立即加载**。

#### Descendant Loading（后代加载）——沿目录树向下

当前工作目录下子目录中的 CLAUDE.md 文件**不会在启动时加载**。只有当 Claude 在会话期间读取这些子目录中的文件时，它们才会被加载。这被称为**懒加载（lazy loading）**。

### Monorepo 结构示例

考虑一个典型的 monorepo，其中包含多个独立组件目录：

```
/mymonorepo/
├── CLAUDE.md          # 根级指令（跨所有组件共享）
├── frontend/
│   └── CLAUDE.md      # 前端专用指令
├── backend/
│   └── CLAUDE.md      # 后端专用指令
└── api/
    └── CLAUDE.md      # API 专用指令
```

### 场景 1：从根目录启动 Claude Code

当你从 `/mymonorepo/` 启动 Claude Code 时：

```bash
cd /mymonorepo
claude
```

| 文件 | 启动时加载？ | 原因 |
|------|-------------|------|
| `/mymonorepo/CLAUDE.md` | 是 | 它是你的当前工作目录 |
| `/mymonorepo/frontend/CLAUDE.md` | 否 | 仅在读取/编辑 `frontend/` 中的文件时加载 |
| `/mymonorepo/backend/CLAUDE.md` | 否 | 仅在读取/编辑 `backend/` 中的文件时加载 |
| `/mymonorepo/api/CLAUDE.md` | 否 | 仅在读取/编辑 `api/` 中的文件时加载 |

### 场景 2：从组件目录启动 Claude Code

当你从 `/mymonorepo/frontend/` 启动 Claude Code 时：

```bash
cd /mymonorepo/frontend
claude
```

| 文件 | 启动时加载？ | 原因 |
|------|-------------|------|
| `/mymonorepo/CLAUDE.md` | 是 | 它是祖先目录 |
| `/mymonorepo/frontend/CLAUDE.md` | 是 | 它是你的当前工作目录 |
| `/mymonorepo/backend/CLAUDE.md` | 否 | 目录树的不同分支 |
| `/mymonorepo/api/CLAUDE.md` | 否 | 目录树的不同分支 |

### 核心要点

1. **祖先目录总是在启动时加载**——Claude 沿目录树向上遍历，加载找到的所有 CLAUDE.md 文件。这确保你始终能访问根级的、仓库范围的指令。

2. **后代目录懒加载**——子目录中的 CLAUDE.md 文件仅在你与该子目录中的文件交互时才加载。这可以防止无关上下文膨胀你的会话。

3. **兄弟目录永远不加载**——如果你在 `frontend/` 中工作，`backend/CLAUDE.md` 或 `api/CLAUDE.md` 不会被加载到上下文中。

4. **全局 CLAUDE.md**——你还可以在主目录的 `~/.claude/CLAUDE.md` 放置一个 CLAUDE.md 文件，它会应用于所有 Claude Code 会话，不限于特定项目。

### 这种设计为何适合 Monorepo

- **共享指令向下传播**——根级 CLAUDE.md 包含仓库范围的约定、编码标准和通用模式，适用于所有地方。

- **组件专用指令保持隔离**——前端开发者不需要后端专用指令干扰上下文，反之亦然。

- **上下文得到优化**——通过懒加载后代目录的 CLAUDE.md 文件，Claude Code 避免了在启动时加载可能数百 KB 的无关指令。

### 最佳实践

1. **将共享约定放在根级 CLAUDE.md 中**——编码标准、提交信息格式、PR 模板，以及其他仓库范围的指南。

2. **将组件专用指令放在组件的 CLAUDE.md 中**——框架专用模式、组件架构、该组件特有的测试约定。

3. **使用 CLAUDE.local.md 存放个人偏好**——将其添加到 `.gitignore`，用于不应与团队共享的指令。

---

## 参考来源

- [Claude Code 文档 - Claude 如何查找记忆](https://code.claude.com/docs/en/memory#how-claude-looks-up-memories)
- [Boris Cherny 在 X 上的说明 - CLAUDE.md 加载机制](https://x.com/bcherny/status/2016339448863355206)
- [Humanlayer - Writing a good Claude.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
