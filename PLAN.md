# Learn Claude Code 微信小程序实施方案

## Context

基于 [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) 项目，将其 Next.js Web 应用完整复刻为**原生微信小程序**，以便在手机上利用碎片化时间随时随地学习 Claude Code 架构设计。

**技术选型**：原生微信小程序（无框架）  
**功能范围**：完整复刻 Web 版  
**语言支持**：中/英/日 三语切换  
**数据来源**：`/Users/bill_huang/learn-claude-code/web/src/` 下的数据资产

---

## 项目结构

```
learn-claude-code-miniprogram/
├── PLAN.md                         # 本文件：实施方案
├── scripts/                        # Node.js 构建脚本
│   └── build-miniprogram-data.js   # 从 web 数据源生成小程序数据
├── miniprogram/                    # 小程序源码
│   ├── app.js / app.json / app.wxss
│   ├── pages/                      # 主包页面（4 个 TabBar 页）
│   │   ├── home/
│   │   ├── timeline/
│   │   ├── layers/
│   │   └── reference/
│   ├── subpkg-chapters/            # 分包：章节详情 + Bridge 文档
│   │   ├── pages/chapter/
│   │   ├── pages/bridge-doc/
│   │   └── components/             # 交互组件
│   ├── subpkg-compare/             # 分包：版本对比页
│   ├── components/                 # 公共组件
│   ├── data/                       # 构建脚本生成的静态数据
│   ├── utils/                      # i18n, storage, highlight, progress, event-bus
│   └── i18n/                       # zh.json / en.json / ja.json
```

---

## 数据来源与构建管道

### 可直接复用的数据
| Web 数据源 | 用途 | 处理方式 |
|-----------|------|---------|
| `web/src/data/generated/docs.json` | 全量 Markdown 文档（三语 × ~35 篇） | 预渲染为 WXML-nodes JSON，按语言+slug 拆分 |
| `web/src/data/generated/versions.json` | 章节源码、LOC、工具、类、函数 | 拆分为 index + source |
| `web/src/data/scenarios/*.json` | 模拟器步骤数据（s01-s12） | 合并为 scenarios-all.json |
| `web/src/data/annotations/*.json` | 设计决策（s01-s12） | 按章节保留 |
| `web/src/i18n/messages/{zh,en,ja}.json` | UI 文案 | 直接复制 |

### 需从 TS 模块提取的数据
| Web TS 模块 | 内容 | 输出 |
|-------------|------|------|
| `lib/constants.ts` | VERSION_ORDER, VERSION_META, LAYERS | → `meta.json` |
| `lib/version-content.ts` | 三语 subtitle/coreAddition/keyInsight | → 合入 `meta.json` |
| `lib/chapter-guides.ts` | 三语 focus/confusion/goal | → 合入 `meta.json` |
| `lib/stage-checkpoints.ts` | 阶段里程碑 | → 合入 `meta.json` |
| `lib/bridge-docs.ts` | 桥接文档关联映射 | → `bridge-docs-meta.json` |
| `data/execution-flows/*.ts` | 执行流程图节点/边 | → `flows.json` |
| `data/architecture-blueprints/*.ts` | 架构蓝图数据 | → `blueprints.json` |

### 构建脚本
```
node scripts/build-miniprogram-data.js
  ├── extract-ts-data.js      → 提取 TS 数据为 JSON
  ├── build-meta.js            → 聚合 meta/versions-index
  ├── prerender-docs.js        → Markdown → WXML-nodes JSON（核心）
  ├── split-source.js          → 提取源码字段
  ├── merge-scenarios.js       → 合并模拟器数据
  └── copy-flow-blueprints.js  → 复制流程图/蓝图数据
```

---

## 核心技术方案

### 1. Markdown 渲染
构建时预渲染 + 运行时混合渲染（rich-text + 自定义组件）

### 2. Python 语法高亮
移植 Web 版 `source-viewer.tsx` 的纯正则方案

### 3. 可视化组件
- SessionViz s01-s06 → Canvas 2D
- GenericOverview s07-s19 → 纯 WXML/WXSS
- ExecutionFlow → Canvas 2D
- ArchDiagram → 纯 WXML/WXSS
- AgentLoopSimulator → WXML + setInterval
- DesignDecisions → CSS transition 手风琴

### 4. i18n 三语支持
wx.Storage 存语言偏好，EventBus 通知切换

### 5. 阅读进度追踪
IntersectionObserver + scroll 位置保存/恢复

---

## 实施阶段

| Phase | 内容 | 预估时间 |
|-------|------|---------|
| 0 | 构建管道 | 1.5 天 |
| 1 | 项目骨架与设计体系 | 2 天 |
| 2 | Home + Reference 页 | 1.5 天 |
| 3 | Timeline + Layers 页 | 2.5 天 |
| 4 | 章节页 Learn Tab（核心） | 3.5 天 |
| 5 | 章节页 Code Tab | 1.5 天 |
| 6 | 章节页 Deep Dive Tab | 4.5 天 |
| 7 | Compare 页 | 2.5 天 |
| 8 | Bridge Doc 页 + 完善 | 1.5 天 |
| 9 | 性能优化与打磨 | 2.5 天 |
| 10 | 发布准备 | 1.5 天 |
| **总计** | | **~25 天** |
