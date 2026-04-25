# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个**原生微信小程序**，是 [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) Web 项目的完整移植版本。目的是让用户在手机上利用碎片化时间学习 Claude Code 的架构设计。支持中/英/日三语切换。

- **平台**：原生微信小程序（无任何前端框架，纯原生 WXML/WXSS/JS）
- **小程序 AppID**：`wx99d3e1be24241162`
- **基础库版本**：3.15.2
- **项目名称**：cc学习工具

---

## 构建命令

```bash
# 从 Web 数据源生成小程序静态数据
# 前提：Web 数据源须存在于 /Users/bill_huang/learn-claude-code/web/src/
node scripts/build-miniprogram-data.js

# 从 Best Practice 数据源生成实践指南数据
# 前提：best-practice 仓库须存在于 /Users/bill_huang/claude-code-best-practice
# 同时读取 scripts/bp-content/ 下的手写中文 Markdown（bp01-zh.md ~ bp07-zh.md, tips-all-zh.md）
node scripts/build-best-practice-data.js

# 生成 TabBar PNG 图标（纯 Node.js，无外部依赖）
node scripts/generate-icons.js
```

**开发调试**：用**微信开发者工具**打开 `miniprogram/` 目录。无 npm 依赖，无需 `npm install`。无测试、无 Lint、无 CI。

> ⚠️ `miniprogram/data/`、`subpkg-chapters/data/`、`subpkg-bridge/data/` 和 `miniprogram/i18n/` 下的文件均为**构建产物**（`.js` 格式，`module.exports = {...}`），不要手动编辑。构建脚本输出到 `miniprogram/data/`，构建后需将文件移到对应分包目录。

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 平台 | 原生微信小程序 |
| 模板语言 | WXML |
| 样式 | WXSS（CSS 变量 + rpx 单位） |
| 逻辑 | 原生 JavaScript（ES6，CommonJS `require`） |
| 数据构建 | Node.js（`fs`/`path`/`vm` 模块，无外部依赖） |
| 国际化 | 自研 i18n（switch-case 静态加载，EventBus 驱动切换） |
| 状态管理 | `getApp().globalData` + `wx.StorageSync` |

完全无外部 npm 包依赖（纯原生）。

---

## 架构要点

### 1. 主包 / 分包结构

小程序分为**主包**和三个**分包**：

- **主包**（`pages/`）：4 个 TabBar 页面 — home / timeline / layers / reference
- **分包 `subpkg-chapters`**：章节详情页（`chapter`）+ 章节文档数据 + 大数据文件
- **分包 `subpkg-bridge`**：Bridge Doc / Tips 阅读页（`bridge-doc`）+ bridge/tips 文档数据
- **分包 `subpkg-compare`**：版本对比页

> 分包拆分原因：微信主包限制 1.5MB、单分包限制 2MB，且分包之间不能互相 require。`markdown-parser.js` 因此在 `subpkg-chapters/utils/` 和 `subpkg-bridge/utils/` 各存一份。

导航规则：TabBar 页互跳用 `wx.switchTab`，进入章节/Bridge Doc 用 `wx.navigateTo`。

### 2. 数据流

两条独立的构建管道产出小程序数据（构建脚本输出到 `miniprogram/data/`，需手动移动到对应分包目录）：

```
管道 A：原版章节（s01-s19）
Web 数据源 (TS/JSON)  /Users/bill_huang/learn-claude-code/web/src/
    ↓  node scripts/build-miniprogram-data.js
    ↓ （手写 TypeScript 类型剥离器 → vm.runInContext → module.exports 序列化）
miniprogram/data/meta.js + miniprogram/i18n/*.js
    → 章节文档构建后移至 subpkg-chapters/data/docs/

管道 B：最佳实践（bp01-bp07 + tips）
scripts/bp-content/bp*.md + tips-all-zh.md  （手写中文内容）
/Users/bill_huang/claude-code-best-practice  （外部仓库参考）
    ↓  node scripts/build-best-practice-data.js
    ↓ （Markdown 解析 → 自动翻译 → 合并进 meta.js 和 i18n/*.js）
    → chapter-bp*.js 移至 subpkg-chapters/data/docs/
    → tips-*.js 移至 subpkg-bridge/data/docs/
    → bp-config-examples.js 移至 subpkg-chapters/data/
    → tips-index.js 留在 miniprogram/data/
```

数据文件运行时分布：

| 位置 | 内容 | 大小 |
|------|------|------|
| `miniprogram/data/` | `meta.js`、`bridge-docs-meta.js`、`tips-index.js`、`docs-index.js` | ~340KB |
| `subpkg-chapters/data/` | `versions-source.js`、`blueprints.js`、`flows.js`、`scenarios-all.js`、`bp-config-examples.js` + `docs/chapter-*.js`（78 个） | ~1.6MB |
| `subpkg-bridge/data/` | `docs/bridge-*.js`（51 个）+ `docs/tips-*.js`（36 个） | ~710KB |

最终数据通过静态 `require` 加载：`Page.data → setData() → WXML 渲染`。

`meta.js` 是核心数据文件，包含：`versionOrder`（章节顺序 s01–s19）、`versions`（每章元信息）、`layers`（5 个架构层）、`stageCheckpoints`（里程碑）、`diffs`（版本间差异）。Best Practice 章节（bp01–bp07）也合并在 `versions` 中。

### 3. 国际化方案（静态映射）

微信小程序**不支持动态 `require`**（路径必须在编译期确定），因此所有需要按 locale 加载资源的地方都使用 `switch (locale) { case 'zh': ... }` 静态映射：

- `utils/i18n.js`：`_loadMessages()` 加载 UI 文案
- `subpkg-chapters/data-loader.js`：`loadChapterDoc()` 映射 78 个章节文档（26 章 × 3 语言，含 s01–s19 + bp01–bp07）
- `subpkg-bridge/pages/bridge-doc/bridge-doc.js`：`_loadBridgeDocContent()` 映射 87 个文档（51 原版 Bridge Doc + 36 Tips 文档，即 12 分类 × 3 语言）

> **添加新文档、新章节或新语言时，必须同步更新以上三处静态映射。**

### 4. 章节详情页三 Tab 模式（chapter.js）

- **Learn Tab**（默认）：Markdown 文档 → `subpkg-chapters/utils/markdown-parser.js` 解析为 WXML nodes
- **Code Tab**（懒加载）：Python 源码 → `subpkg-chapters/utils/highlight.js` tokenize；上限 `MAX_CODE_LINES=300` 行。BP 章节加载 `subpkg-chapters/data/bp-config-examples.js` 中的配置示例
- **Deep Dive Tab**（懒加载）：流程图 + 架构蓝图 + 模拟器步骤 + Bridge Doc 链接。BP 章节链接到 `tips-index.js` 中的 Tips 分类

### 5. Tips 文档系统

Best Practice 层引入的新内容类型。Tips 来源于 Anthropic 工程师（Boris Cherny、Thariq 等）的博客/推文，按 12 个分类组织（prompting、planning、claude-md、agents、commands、skills、hooks、git-pr、debugging、utilities、daily、parallelism）。通过 `bridge-doc` 页面复用 Markdown 渲染基础设施展示。

### 6. Markdown 解析器（markdown-parser.js）

因分包不能互相 require，该文件在 `subpkg-chapters/utils/` 和 `subpkg-bridge/utils/` 各存一份。修改时须同步更新两份。

导出 3 个函数：
- `parse(markdown)` — 块级解析（标题、代码块、**表格**、引用、列表、段落、分割线）
- `inlineToNodes(text)` — 行内标记转 rich-text 节点数组（加粗、行内代码、斜体）
- `inlineToHtml(text)` — 行内标记转 HTML 字符串，供 `<rich-text>` 组件使用

### 7. 设计系统（浅色主题）

所有设计 token 在 `app.wxss` 的 `page {}` 选择器中声明为 CSS 变量：

- 背景：`--color-bg: #FFFFFF` / `--color-bg-card: #F8FAFC` / `--color-bg-muted: #E2E8F0`
- 文字：`--color-text-primary: #0F172A` / `secondary: #475569` / `muted: #94A3B8`
- 强调：`--color-accent: #0F172A`（编辑态深色）/ `--color-accent-blue: #2563EB`（交互蓝）
- 架构层颜色见下方"架构层说明"

### 8. 进度与阅读位置追踪

- `progress.markRead(chapterId)` 在章节页 `_buildPageData()` 时自动调用
- `wx.StorageSync` 持久化，key 为 `chapter_progress`
- 各页面 `onShow()` 钩子调用 `_refreshProgress()` 刷新 UI
- `storage.js` 提供 `getScrollPos(pageKey)` / `setScrollPos(pageKey, pos)` 支持阅读位置保存恢复

---

## 关键约束（编码时务必遵守）

1. **不支持动态 require**：所有 `require()` 路径必须是编译期字面字符串常量，不能用变量拼接。
2. **不支持展开运算符 `{...obj}`**：使用 `Object.assign({}, obj, patch)` 代替。
3. **ES6 有限支持**：可用箭头函数、`const/let`、模板字符串、解构赋值；避免 `async/await`、可选链 `?.`、空值合并 `??` 等高级特性。
4. **rpx 单位**：所有尺寸用 rpx（750rpx = 屏幕宽度），不要用 px。
5. **包大小限制**：主包 ≤ 1.5MB，单分包 ≤ 2MB。大数据文件已按引用关系分配到对应分包中，新增大文件须考虑当前各包余量。
6. **数据文件是 `.js`**：`miniprogram/data/`、`subpkg-chapters/data/`、`subpkg-bridge/data/` 和 `miniprogram/i18n/` 下的数据文件均为**构建产物**（`module.exports = {...}` 格式），不要手动编辑。

---

## 内容创作目录

`scripts/bp-content/` 是 Best Practice 内容的创作目录：
- `bp01-zh.md` ~ `bp07-zh.md`：7 篇手写中文最佳实践文章
- `tips-all-zh.md`：汇总的 Tips 内容（来源于 Anthropic 工程师博文）
- `sources/`：从 best-practice 仓库拉取的参考素材

这些文件是**源文件**（非构建产物），需要手动维护。构建脚本读取它们并生成三语数据文件。

---

## Git 约定

- **Conventional Commits** 格式：`feat:` / `fix:` / `refactor:` / `chore:` / `docs:`
- 可选 scope：`feat(timeline):` / `fix(chapter):` 等
- **GitHub remote**：`origin` → `https://github.com/shibiao1998-dot/learn-claude-code-miniprogram`
- `data/` 目录的构建产物需一并提交（不在 .gitignore 中）

---

## 架构层说明

Claude Code 被分为 5 个架构层。注意：`meta.js`（来自上游 Web 数据源）中的颜色与 `app.wxss` CSS 变量中定义的渲染颜色不同，实际渲染以 `app.wxss` 为准。

| 层 | ID | app.wxss 颜色 | meta.js 颜色 | 章节 | 含义 |
|---|----|--------------|-------------|------|------|
| 核心层 | `core` | #059669 绿 | #2563EB 蓝 | s01–s06 | Agent 循环主闭环 |
| 硬化层 | `hardening` | #2563EB 蓝 | #059669 绿 | s07–s11 | 工具系统/提示管理 |
| 运行时层 | `runtime` | #7C3AED 紫 | #D97706 琥珀 | s12–s14 | 任务/子代理系统 |
| 平台层 | `platform` | #DB2777 粉 | #DC2626 红 | s15–s19 | MCP/团队协作 |
| 最佳实践层 | `best-practice` | #EA580C 橙 | #EA580C 橙 | bp01–bp07 | Claude Code 实用指南 |
