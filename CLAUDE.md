# 项目级指令

## 项目概述

这是一个原生微信小程序项目，是 `learn-claude-code` Web 项目的完整移植版，目标是让用户利用手机碎片时间学习 Claude Code 的架构设计。项目支持中文、英文和日文三种语言。

- 平台是原生微信小程序，不使用前端框架。
- 小程序 AppID 是 `wx99d3e1be24241162`。
- 基础库版本是 `3.15.2`。
- 项目名称是“cc学习工具”。

## 构建命令

```bash
node scripts/build-miniprogram-data.js
node scripts/build-best-practice-data.js
node scripts/generate-icons.js
```

- `build-miniprogram-data.js` 用于从 Web 数据源生成小程序静态数据。
- `build-best-practice-data.js` 用于从 Best Practice 数据源生成实践指南数据。
- `generate-icons.js` 用于生成 TabBar PNG 图标。

开发调试需要使用微信开发者工具打开 `miniprogram/` 目录。项目没有 npm 依赖，不需要 `npm install`，也没有测试、Lint 和持续集成。

`miniprogram/data/`、`subpkg-chapters/data/`、`subpkg-bridge/data/` 和 `miniprogram/i18n/` 下的 `.js` 文件属于构建产物，不应手动修改。构建后如果需要分包落位，应当移动到对应目录。

## 技术栈

- 模板语言使用 WXML。
- 样式使用 WXSS，采用 CSS 变量和 `rpx` 单位。
- 逻辑层使用原生 JavaScript 与 CommonJS `require`。
- 数据构建使用 Node.js 内置模块，没有外部依赖。
- 国际化采用自研方案，通过静态映射和 EventBus 驱动切换。
- 状态管理依赖 `getApp().globalData` 与 `wx.StorageSync`。

## 架构要点

### 主包与分包

项目由一个主包和三个分包组成：

- 主包 `pages/` 包含 4 个 TabBar 页面：`home`、`timeline`、`layers`、`reference`。
- `subpkg-chapters` 包含章节详情页、章节文档数据和大数据文件。
- `subpkg-bridge` 包含 Bridge Doc 与 Tips 阅读页及其文档数据。
- `subpkg-compare` 包含版本对比页。

由于微信主包和分包体积限制，且分包之间不能互相 `require`，`markdown-parser.js` 在不同分包内各保留一份副本。

TabBar 页面之间跳转使用 `wx.switchTab`，进入章节或 Bridge Doc 页面使用 `wx.navigateTo`。

### 数据流

项目存在两条独立的数据构建管线：

1. 原版章节数据由 `/Users/bill_huang/learn-claude-code/web/src/` 生成，经 `build-miniprogram-data.js` 输出到 `miniprogram/data/`，再移动到章节分包目录。
2. Best Practice 数据由 `scripts/bp-content/` 与外部仓库 `/Users/bill_huang/claude-code-best-practice` 生成，经 `build-best-practice-data.js` 输出到主包和分包的不同数据目录。

运行时数据通过静态 `require` 加载，再进入 `Page.data` 和 `setData()` 驱动 WXML 渲染。

`meta.js` 是核心数据文件，包含章节顺序、章节元信息、五层架构信息、里程碑检查点和版本差异。Best Practice 章节也会合并进 `versions` 中。

### 国际化方案

由于微信小程序不支持动态 `require`，所有按语言加载的资源都必须采用 `switch (locale)` 这类静态映射方式。

以下位置依赖这一规则：

- `utils/i18n.js` 负责加载界面文案。
- `subpkg-chapters/data-loader.js` 负责映射章节文档。
- `subpkg-bridge/pages/bridge-doc/bridge-doc.js` 负责加载 bridge 与 tips 文档。

修改国际化加载逻辑时，应保持静态映射方式，不能改为运行时动态拼接路径。

## 编辑注意事项

- 构建产物目录中的文件不应手动修改，应从源脚本或源数据修正后重新生成。
- 分包之间不能互相 `require`，公共逻辑如果确需复用，应按分包边界分别维护。
- 该项目以原生小程序约束为主，处理页面逻辑时应优先遵循微信平台能力边界，而不是套用 Web 前端习惯。
