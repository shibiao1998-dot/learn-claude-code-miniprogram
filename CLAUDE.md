# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个**原生微信小程序**，是 [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) Web 项目的完整移植版本。目的是让用户在手机上利用碎片化时间学习 Claude Code 的架构设计。支持中/英/日三语切换。

- **平台**：原生微信小程序（无任何前端框架，纯原生 WXML/WXSS/JS）
- **小程序 AppID**：`wx0cde1651df4290c6`
- **基础库版本**：3.15.2
- **项目名称**：cc学习工具

---

## 构建命令

```bash
# 从 Web 数据源生成小程序静态数据（前提：Web 数据源须存在于 /Users/bill_huang/learn-claude-code/web/src/）
node scripts/build-miniprogram-data.js

# 生成 TabBar PNG 图标（纯 Node.js，无外部依赖）
node scripts/generate-icons.js
```

**开发调试**：用**微信开发者工具**打开 `miniprogram/` 目录。无 npm 依赖，无需 `npm install`。无测试、无 Lint、无 CI。

> ⚠️ `miniprogram/data/` 和 `miniprogram/i18n/` 下的文件均为**构建产物**（`.js` 格式，`module.exports = {...}`），不要手动编辑。

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

小程序分为**主包**和两个**分包**：

- **主包**（`pages/`）：4 个 TabBar 页面 — home / timeline / layers / reference
- **分包 `subpkg-chapters`**：章节详情页（`chapter`）+ Bridge Doc 阅读页（`bridge-doc`）
- **分包 `subpkg-compare`**：版本对比页

导航规则：TabBar 页互跳用 `wx.switchTab`，进入章节/Bridge Doc 用 `wx.navigateTo`。

### 2. 数据流

```
Web 数据源 (TS/JSON)  /Users/bill_huang/learn-claude-code/web/src/
    ↓  node scripts/build-miniprogram-data.js
    ↓  （手写 TypeScript 类型剥离器 → vm.runInContext → module.exports 序列化）
miniprogram/data/*.js + miniprogram/i18n/*.js
    ↓  静态 require（编译期确定路径）
Page.data → setData() → WXML 渲染
```

`meta.js` 是核心数据文件，包含：`versionOrder`（章节顺序 s01–s19）、`versions`（每章元信息）、`layers`（4 个架构层）、`stageCheckpoints`（里程碑）、`diffs`（版本间差异）。

### 3. 国际化方案（静态映射）

微信小程序**不支持动态 `require`**（路径必须在编译期确定），因此所有需要按 locale 加载资源的地方都使用 `switch (locale) { case 'zh': ... }` 静态映射：

- `utils/i18n.js`：`_loadMessages()` 加载 UI 文案
- `subpkg-chapters/data-loader.js`：`loadChapterDoc()` 映射 57 个章节文档（19 章 × 3 语言）
- `subpkg-chapters/pages/bridge-doc/bridge-doc.js`：`_loadBridgeDocContent()` 映射 51 个 Bridge Doc（17 slug × 3 语言）

> **添加新文档或新语言时，必须同步更新以上三处静态映射。**

### 4. 章节详情页三 Tab 模式（chapter.js）

- **Learn Tab**（默认）：Markdown 文档 → `markdown-parser.js` 解析为 WXML nodes
- **Code Tab**（懒加载）：Python 源码 → `highlight.js` tokenize；上限 `MAX_CODE_LINES=300` 行
- **Deep Dive Tab**（懒加载）：流程图 + 架构蓝图 + 模拟器步骤 + Bridge Doc 链接

### 5. 设计系统（浅色主题）

所有设计 token 在 `app.wxss` 的 `page {}` 选择器中声明为 CSS 变量：

- 背景：`--color-bg: #FFFFFF` / `--color-bg-card: #F8FAFC` / `--color-bg-muted: #E2E8F0`
- 文字：`--color-text-primary: #0F172A` / `secondary: #475569` / `muted: #94A3B8`
- 强调：`--color-accent: #0F172A`（编辑态深色）/ `--color-accent-blue: #2563EB`（交互蓝）
- 架构层颜色：core=`#059669` / hardening=`#2563EB` / runtime=`#7C3AED` / platform=`#DB2777`

### 6. 进度追踪

- `progress.markRead(chapterId)` 在章节页 `_buildPageData()` 时自动调用
- `wx.StorageSync` 持久化，key 为 `chapter_progress`
- 各页面 `onShow()` 钩子调用 `_refreshProgress()` 刷新 UI

---

## 关键约束（编码时务必遵守）

1. **不支持动态 require**：所有 `require()` 路径必须是编译期字面字符串常量，不能用变量拼接。
2. **不支持展开运算符 `{...obj}`**：使用 `Object.assign({}, obj, patch)` 代替。
3. **ES6 有限支持**：可用箭头函数、`const/let`、模板字符串、解构赋值；避免 `async/await`、可选链 `?.`、空值合并 `??` 等高级特性。
4. **rpx 单位**：所有尺寸用 rpx（750rpx = 屏幕宽度），不要用 px。
5. **主包 2MB 限制**：`versions-source.js`（~300KB）已在主包中，新增大文件须考虑分包。
6. **数据文件是 `.js`**：`miniprogram/data/` 和 `miniprogram/i18n/` 的数据文件使用 `module.exports = {...}` 格式（不是 `.json`），因为小程序 `require` 对 `.js` 支持更好。

---

## Git 约定

- **Conventional Commits** 格式：`feat:` / `fix:` / `refactor:` / `chore:` / `docs:`
- 可选 scope：`feat(timeline):` / `fix(chapter):` 等
- **GitHub remote**：`origin` → `https://github.com/shibiao1998-dot/learn-claude-code-miniprogram`
- `data/` 目录的构建产物需一并提交（不在 .gitignore 中）

---

## 架构层说明

Claude Code 被分为 4 个架构层（对应章节 s01–s19）：

| 层 | ID | 颜色 | 章节 | 含义 |
|---|----|------|------|------|
| 核心层 | `core` | #059669 绿 | s01–s06 | Agent 循环主闭环 |
| 硬化层 | `hardening` | #2563EB 蓝 | s07–s12 | 工具系统/提示管理 |
| 运行时层 | `runtime` | #7C3AED 紫 | s13–s16 | 任务/子代理系统 |
| 平台层 | `platform` | #DB2777 粉 | s17–s19 | MCP/团队协作 |
