# Claude Code 终端大陆 — 游戏化重构设计

## 概述

将整个微信小程序从深度阅读模式重构为游戏化学习体验。采用混合模式：卡牌收集为骨架 + 闯关推进 + 成就系统，保持轻量。视觉风格为终端/代码美学（深色背景 + 高亮代码色 + 等宽字体，纯 CSS 实现零图片依赖）。

**核心决策：**
- 方案 B：原地重构现有页面（线上版本不受影响）
- 数据优先：先建构建管道和游戏引擎，再改 UI
- 内容来源：自动从现有 19+7 章内容中提取知识点
- 用户覆盖：从纯小白到初级开发者，通过难度分级适配

**设计灵感来源：**
- Brilliant：先问后教（问题驱动学习，记忆留存率高 40%+）
- 百词斩：砍词式进度可视化（离散知识点逐个"解密"）
- Duolingo：连胜机制（损失厌恶驱动习惯养成，但挂钩真实掌握度）

---

## 1. 游戏世界观与核心循环

### 世界观：终端探索者

用户是刚接入 Claude Code 终端的探索者。知识点以「未解密节点」散布在 5 个系统区域中，任务是逐个解密，收集「指令卡」，最终成为完全掌握终端的高手。

视觉隐喻：
- 未探索 = `[????]` 加密节点
- 挑战中 = `> loading...` 闪烁光标
- 已掌握 = `✓ decoded` 绿色高亮
- 整体进度 = 终端进度条 `[████░░░░░░] 38%`

### 5 个系统区域

| 区域 | 架构层 | 关卡 | 解锁条件 |
|------|--------|------|---------|
| `> CORE/` | 核心层 | s01-s06 (6关) | 初始开放 |
| `$ TOOLS/` | 硬化层 | s07-s11 (5关) | CORE/ 通关 4/6 |
| `# RUNTIME/` | 运行时层 | s12-s14 (3关) | TOOLS/ 通关 3/5 |
| `@ NETWORK/` | 平台层 | s15-s19 (5关) | RUNTIME/ 通关 2/3 |
| `! PRACTICE/` | 实践层 | bp01-bp07 (7关) | 任意 3 个区域通关 |

解锁条件不要求全通——降低卡关挫折感，允许跳过最难关卡继续推进。

### 核心游戏循环（Brilliant 式"先问后教"）

```
进入关卡
  ↓
Phase 1: 挑战（先问）
  展示 3-5 道与本关知识相关的问题
  用户凭直觉/已有认知作答
  答错时显示 "好奇吗？继续看" — 不惩罚错误
  ↓
Phase 2: 解密（后教）
  根据答题表现，展示针对性的知识卡片
  答对的 → 简要确认 + 进阶知识点
  答错的 → 详细解释 + 核心概念
  （自适应：你不懂的讲多一点，你懂的少废话）
  ↓
Phase 3: 确认（再问）
  对 Phase 1 答错的题，变换形式重新出现
  答对 → 节点解密成功 ✓
  仍答错 → 标记为"待复习"，不阻挡通关
  ↓
结算
  获得 ⭐1-3 星评价
  解锁 1-3 张指令卡
  经验值增长 → 终端等级提升
```

### 难度分级

- `>_ 概念`（⭐）— 纯理解，零基础可答
- `>> 应用`（⭐⭐）— 需联系使用场景
- `>>> 判断`（⭐⭐⭐）— 需深度辨别

关卡内混合三种难度。1 星通关只需答对概念题，3 星需要全对。

---

## 2. 卡牌系统

### 指令卡结构

每张卡牌 = 一个离散知识点，从现有章节内容自动提取。

```
┌──────────────────┐
│ ██ R             │  ← 稀有度标识
│──────────────────│
│  > Agent Loop    │  ← 卡牌名称
│  $ core          │  ← 所属区域
│──────────────────│
│  Claude 的核心   │  ← 一句话描述
│  工作循环：      │
│  读取→思考→      │
│  执行→观察→循环  │
│──────────────────│
│  PWR: 85  DEF:70 │  ← 属性值（收藏感）
│  #loop #agent    │  ← 标签
└──────────────────┘
```

### 稀有度

| 稀有度 | 终端标识 | 颜色 | 映射规则 | 占比 |
|--------|---------|------|---------|------|
| N (Normal) | `░` | 灰 | 辅助概念、细节知识点 | ~60% |
| R (Rare) | `▒` | 蓝 | 章节核心概念 | ~25% |
| SR (Super Rare) | `▓` | 紫 | 跨章节关键机制 | ~12% |
| SSR (Secret) | `█` | 金 | 架构级核心洞察 | ~3% |

稀有度由构建脚本根据出现频次、被引用次数、标题层级自动判定。

### 获取途径

| 途径 | 说明 |
|------|------|
| 关卡通关 | 主要来源。⭐1=1张N/R，⭐2=2张含R，⭐3=3张含SR概率 |
| 区域全通 | 通关整个区域额外奖励 1 张该区域 SSR |
| 每日挑战 | 每天 3 道随机题，全对奖励 1 张随机卡 |
| 复习召回 | 待复习知识点重新答对后，卡牌升级（N→R 等） |

### 图鉴

替代现有「架构层」页面。按区域分组：已获得完整展示，未获得显示 `[???]`。收集进度以终端进度条展示。同时承担知识查阅功能——已获得卡牌可随时翻看。

### 卡牌总量

基于 26 章（19 原版 + 7 BP），每章 4-8 个知识点，预估 150-200 张。

---

## 3. 进度系统与成就

### 终端等级

| 等级 | 称号 | 经验值 | 解锁 |
|------|------|--------|------|
| Lv.1 | `guest` | 0 | 初始状态 |
| Lv.3 | `user` | 200 | 解锁每日挑战 |
| Lv.5 | `dev` | 500 | 解锁卡牌升级功能 |
| Lv.8 | `admin` | 1200 | 解锁隐藏关卡 |
| Lv.10 | `root` | 2000 | 全部解锁 |

经验值来源：通关关卡（30-100 exp）、每日挑战（20 exp）、复习召回（10 exp）、首次获得 SR/SSR（50 exp）。

### 连胜系统

挂钩真实掌握度（完成关卡或每日挑战），非纯打卡。里程碑（7/30/100 天）奖励限定卡牌。断连不归零而是降级：7天→3天、30天→15天。每 7 天连胜自动获得 1 次保护。

### 成就徽章

终端风格命名，四类：

- **探索类**：`> first_login`、`> core_clear`、`> all_clear`
- **收集类**：`$ cards_10`、`$ cards_100`、`$ full_set_core`
- **精通类**：`# perfect_stage`、`# no_miss`、`# speed_run`
- **坚持类**：`! streak_7`、`! streak_30`、`! recall_master`

### 主页进度可视化

百词斩"砍词"的终端版——逐步解密整个系统：

```
┌─ CLAUDE CODE TERMINAL ──────────────┐
│  user@claude:~$ status              │
│                                      │
│  > CORE/     [████████░░] 80%  ⭐12  │
│  $ TOOLS/    [███░░░░░░░] 30%  ⭐ 4  │
│  # RUNTIME/  [░░░░░░░░░░]  0%  🔒   │
│  @ NETWORK/  [░░░░░░░░░░]  0%  🔒   │
│  ! PRACTICE/ [░░░░░░░░░░]  0%  🔒   │
│                                      │
│  TOTAL [███░░░░░░░] 22%              │
│  Cards: 34/180  Level: 3 (user)      │
│  🔥 Streak: 7 days                   │
└──────────────────────────────────────┘
```

---

## 4. 数据架构与构建管道

### 卡牌数据 `game-cards.js`

```js
module.exports = {
  cards: [
    {
      id: 'card_s01_001',
      name: { zh: 'Agent Loop', en: 'Agent Loop', ja: 'エージェントループ' },
      desc: { zh: 'Claude的核心工作循环：读取→思考→执行→观察', ... },
      rarity: 'SSR',
      region: 'core',
      chapter: 's01',
      tags: ['loop', 'agent'],
      power: 85,
      defense: 70
    }
  ]
}
```

### 关卡数据 `game-stages.js`

```js
module.exports = {
  stages: [
    {
      id: 'stage_s01',
      chapter: 's01',
      region: 'core',
      title: { zh: '初识 Agent Loop', ... },
      questions: [
        {
          id: 'q_s01_001',
          type: 'choice',
          difficulty: 1,
          stem: { zh: 'Claude Code 每次执行任务时的循环叫什么？', ... },
          options: [
            { id: 'a', text: { zh: 'Agent Loop', ... } },
            { id: 'b', text: { zh: 'Event Loop', ... } },
            { id: 'c', text: { zh: 'Main Loop', ... } },
            { id: 'd', text: { zh: 'Task Loop', ... } }
          ],
          answer: 'a',
          explanation: { zh: 'Agent Loop 是 Claude Code 的核心循环...', ... },
          reward_card: 'card_s01_001'
        }
      ],
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: ['card_s01_001', 'card_s01_002', 'card_s01_003']
    }
  ]
}
```

### 玩家存档 `wx.StorageSync`

```js
// key: 'game_save'
{
  level: 3,
  exp: 230,
  streak: { current: 7, best: 15, lastDate: '2026-04-21', shields: 1 },
  stages: { stage_s01: { stars: 3, bestScore: 5, attempts: 2 } },
  cards: { card_s01_001: { obtained: true, upgraded: false } },
  achievements: ['first_login', 'core_clear'],
  review: ['card_s03_002'],
  dailyChallenge: { date: '2026-04-21', completed: false, score: 0 }
}
```

### 构建管道 C

```
现有 meta.js + 章节文档（Markdown）
    ↓  node scripts/build-game-data.js
    → miniprogram/data/game-cards.js       (~40KB)
    → subpkg-chapters/data/game-stages.js  (~80KB)
```

知识点提取策略：h2/h3 标题 → 卡牌候选；加粗文本 → 关键概念；代码块 → 题目素材。稀有度 = 出现频次 × 标题层级权重 × 被引用次数。

干扰选项从同区域其他章节的概念中抽取。V1 生成后需人工审核，后续可接入 LLM 辅助。

---

## 5. 页面结构与导航重构

### TabBar 页面映射

| 现有 | 重构为 | 新用途 |
|------|--------|--------|
| `pages/home/home` | **终端主控台** | 进度总览 + 今日挑战 + 继续闯关 |
| `pages/timeline/timeline` | **区域地图** | 5 区域关卡选择，节点式地图 |
| `pages/layers/layers` | **图鉴** | 卡牌收集网格 |
| `pages/reference/reference` | **档案** | 成就徽章 + 统计 |

### 分包页面映射

| 现有 | 重构为 | 新用途 |
|------|--------|--------|
| `subpkg-chapters/pages/chapter/chapter` | **关卡页** | 先问后教闯关交互 |
| `subpkg-bridge/pages/bridge-doc/bridge-doc` | **卡牌详情页** | 已获得卡牌的完整知识内容 |
| `subpkg-compare/pages/compare/compare` | V1 暂不使用 | 保留 |

### TabBar 配置

```json
{
  "tabBar": {
    "list": [
      { "pagePath": "pages/home/home", "text": "终端" },
      { "pagePath": "pages/timeline/timeline", "text": "地图" },
      { "pagePath": "pages/layers/layers", "text": "图鉴" },
      { "pagePath": "pages/reference/reference", "text": "档案" }
    ]
  }
}
```

### 导航流

```
终端(home) ──switchTab──→ 地图(timeline)
    │                         │
    │ navigateTo              │ navigateTo
    ↓                         ↓
  每日挑战(chapter)        关卡页(chapter)
                              │
                              │ 通关结算 → 获得卡牌
终端(home) ←─switchTab──── 图鉴(layers)
                              │ navigateTo
                              ↓
                         卡牌详情(bridge-doc)
```

---

## 6. 视觉设计系统

### 深色终端主题色板

| 用途 | 变量 | 值 |
|------|------|----|
| 背景主色 | `--color-bg` | `#0D1117` |
| 卡片背景 | `--color-bg-card` | `#161B22` |
| 浮层背景 | `--color-bg-elevated` | `#21262D` |
| 主文字 | `--color-text-primary` | `#E6EDF3` |
| 次文字 | `--color-text-secondary` | `#8B949E` |
| 暗文字 | `--color-text-muted` | `#484F58` |
| 终端绿 | `--color-terminal-green` | `#3FB950` |
| 警告橙 | `--color-terminal-orange` | `#D29922` |
| 错误红 | `--color-terminal-red` | `#F85149` |
| 链接蓝 | `--color-terminal-blue` | `#58A6FF` |
| 紫色 | `--color-terminal-purple` | `#BC8CFF` |
| 金色 | `--color-terminal-gold` | `#F0C040` |

### 区域专属色

| 区域 | 主题色 |
|------|--------|
| `> CORE/` | `#3FB950` 绿 |
| `$ TOOLS/` | `#58A6FF` 蓝 |
| `# RUNTIME/` | `#BC8CFF` 紫 |
| `@ NETWORK/` | `#F85149` 红 |
| `! PRACTICE/` | `#D29922` 橙 |

### 字体

```css
page {
  --font-mono: Menlo, 'Courier New', monospace;
  --font-body: -apple-system, 'PingFang SC', sans-serif;
}
```

终端元素用 `--font-mono`，正文用 `--font-body`，混排是核心视觉特征。

### 卡牌视觉规范

纯 CSS 实现：
- N → 1px solid #484F58（暗灰）
- R → 1px solid #58A6FF（蓝）
- SR → 1px solid #BC8CFF（紫）+ 微弱 box-shadow
- SSR → 1px solid #F0C040（金）+ 强 box-shadow + 顶部渐变条

尺寸：缩略图 180×240rpx，详情大卡 480×640rpx，结算展示 320×420rpx。

### 动效

纯 CSS transition/animation，不用 `wx.createAnimation`：
- 节点解密：`░` → `█` 打字机效果
- 答对：绿色闪烁 + `✓ correct` 滑入
- 答错：红色抖动 + `✗ retry`
- 获得卡牌：从下方升起 + 稀有度光效
- 进度条：平滑填充 `transition: width 0.5s`

### TabBar 图标

终端符号风格：终端 `>_` / 地图 `◇◆` / 图鉴 `▤` / 档案 `⊡`

---

## 7. 开发分期路线图

### Phase 1：游戏数据层

**目标**：构建脚本自动产出卡牌和关卡数据

**交付物**：
- `scripts/build-game-data.js`
- `miniprogram/data/game-cards.js`（~200 张卡牌，三语）
- `subpkg-chapters/data/game-stages.js`（26 关，每关 3-5 题）

**验证标准**：脚本无报错，数据格式正确，稀有度分布符合 N:60% R:25% SR:12% SSR:3%，每关覆盖三种难度。

### Phase 2：游戏引擎（utils 层）

**目标**：游戏核心逻辑，纯 JS 模块

**交付物**：
- `miniprogram/utils/game-engine.js` — 关卡答题逻辑
- `miniprogram/utils/game-save.js` — 存档管理
- `miniprogram/utils/game-cards.js` — 卡牌管理
- `miniprogram/utils/game-daily.js` — 每日挑战
- `miniprogram/utils/game-achievement.js` — 成就检测

**验证标准**：各模块可在控制台手动测试，存档读写正常，评分/星数/奖励逻辑正确，连胜跨日正常。

### Phase 3：UI 重构

**目标**：全部页面改造为游戏化界面

内部细拆：
- 3a: 全局主题 + 首页
- 3b: 地图页 + 关卡页
- 3c: 图鉴页 + 卡牌详情页
- 3d: 档案页 + 成就系统

**验证标准**：完整游戏循环跑通，深色主题双端正常，动效流畅，i18n 正常，包大小合规。

### Phase 4：打磨与增强

通关结算动画、音效、分享卡片定制、复习召回系统、数据统计面板、LLM 辅助题目优化。

---

**每个 Phase 完成后独立验证、提交、确认，再进入下一个。**
