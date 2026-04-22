# Phase 4：打磨与增强 — 设计文档

## 概述

Phase 4 是游戏化重构的最后阶段，在 Phase 1-3 构建的完整游戏循环基础上增加体验打磨。目标是让游戏反馈更丰富、学习效果更持久、社交分享更便捷。

**范围**：5 项（LLM 辅助题目优化延后，不在本 Phase 内）

**分期交付**：拆为 4 个子 Phase，每个独立验证后再进入下一个。

---

## 子 Phase 分期

| 子 Phase | 内容 | 改动范围 | 预估步骤 |
|---------|------|---------|---------|
| 4a | 通关结算动画 + 振动 + 音效 | chapter 三件套 + 新建 utils/sound.js + assets/sounds/ | ~12 步 |
| 4b | 复习召回系统 | 新建 utils/game-review.js + chapter.js review mode + home 入口 | ~14 步 |
| 4c | 分享卡片定制 | 新建 utils/share-card.js + chapter 结算页按钮 | ~10 步 |
| 4d | 数据统计面板 | reference 三件套扩展 | ~8 步 |

---

## Phase 4a：通关结算动画 + 振动 + 音效

### 结算动画序列

进入结算页后依次触发，纯 WXSS `@keyframes` + JS `setTimeout` 控制时序：

1. **"STAGE CLEAR" 标题** — 淡入 + 上滑（delay 0s，duration 0.4s）
2. **三颗星星** — 逐个 scale 弹入（每颗间隔 0.2s），获得的星 scale(0→1.2→1) + 金色
3. **分数行** — 淡入（delay 0.9s），数字从 0 递增到实际值
4. **EXP 行** — 从右滑入（delay 1.1s）
5. **等级提升** — 如有，脉冲闪烁效果（delay 1.3s）
6. **获得卡牌** — 每张卡从下方依次滑入（间隔 0.15s），SR/SSR 额外 box-shadow 发光

### 实现方式

- `chapter.js` 新增 `_playSettlementAnimation()` 方法
- 用 `setTimeout` 链式设置 data flag：`animStep1`/`animStep2`/.../`animStep6`
- WXML 中各元素通过 `{{animStepN ? 'anim-active' : ''}}` 条件类触发
- WXSS 中定义 `@keyframes` 和对应的 `.anim-active` 样式

### 振动反馈

| 事件 | API | 备注 |
|------|-----|------|
| 答对 | `wx.vibrateShort({ type: 'light' })` | 轻微正反馈 |
| 答错 | `wx.vibrateShort({ type: 'heavy' })` | 明显负反馈 |
| 获得星星 | `wx.vibrateShort({ type: 'medium' })` | 每颗星触发一次 |
| 等级提升 | `wx.vibrateLong()` | 长振动，强调感 |

在 `chapter.js` 的 `confirmAnswer()`（答题反馈时）和 `_playSettlementAnimation()`（结算时）中调用。

### 音效系统

**资源来源**：Kenney "Interface Sounds" (CC0 授权)，精选 5 个 .ogg 文件

**文件存放**：`miniprogram/assets/sounds/`

| 音效名 | 用途 | 预估大小 |
|--------|------|---------|
| correct.ogg | 答对 | ~3KB |
| wrong.ogg | 答错 | ~3KB |
| star.ogg | 获得星星 | ~3KB |
| levelup.ogg | 等级提升 | ~4KB |
| card.ogg | 获得卡牌 | ~3KB |

**封装模块**：`utils/sound.js`

```js
// API
play(name)     // 播放指定音效，name = 'correct'|'wrong'|'star'|'levelup'|'card'
setEnabled(on) // 开关音效（持久化到 Storage）
isEnabled()    // 查询开关状态
```

实现：每个音效一个 `wx.createInnerAudioContext()` 实例，首次 play 时创建并缓存。

### 改动文件

- 新建：`miniprogram/utils/sound.js`（~40 行）
- 新建：`miniprogram/assets/sounds/` 目录 + 5 个 .ogg 文件
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.js` — 增加动画控制 + 振动 + 音效调用
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` — 结算元素加动画条件类
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` — 新增 @keyframes 和动画类

---

## Phase 4b：复习召回系统

### 核心机制

错题自动收集 + 简化版艾宾浩斯间隔复习。

### 数据模型

`game-save.js` 已有 `review: []` 字段。每条 review 记录：

```js
{
  questionId: 'q_s01_001',  // 题目 ID
  stageId: 'stage_s01',     // 来源关卡
  addedAt: 1713744000000,   // 收集时间戳
  nextReviewAt: 1713830400000, // 下次复习时间
  reviewCount: 0,           // 已复习次数
  lastCorrect: false        // 最后一次是否答对
}
```

### 间隔策略

| 复习答对次数 | 下次间隔 |
|------------|---------|
| 0（首次错误）| 1 天 |
| 1 | 2 天 |
| 2 | 4 天 |
| 3+ | 标记 mastered，移出队列 |

复习答错：重置 reviewCount 为 0，间隔回到 1 天。

### 新建模块：utils/game-review.js

```js
// API
addToReview(questionId, stageId)  // 答错时自动收集（去重）
getReviewQueue()                   // 返回 nextReviewAt <= now 的题目列表
completeReview(questionId, correct) // 更新间隔或标记 mastered
getReviewStats()                   // { total, pending, mastered }
removeFromReview(questionId)       // 手动移除
```

### UI 入口

**Home 首页**：在 "DAILY CHALLENGE" 区块下方新增 "REVIEW" 行：
- 显示待复习数量 badge
- 点击跳转 `chapter?mode=review`

**Chapter 页**：
- `mode=review` 时从 `getReviewQueue()` 取题
- 复用现有答题→反馈流程
- 结算页显示复习专属信息（已掌握数、剩余待复习数）
- 不奖励卡牌，EXP 固定 10/题

### 触发收集

在 `chapter.js` 的 `_showSettlement()` 中，遍历 session 错题，调用 `addToReview()`。

### 改动文件

- 新建：`miniprogram/utils/game-review.js`（~80 行）
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.js` — review mode + 错题收集
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` — review 结算 UI
- 修改：`miniprogram/pages/home/home.js` — review 入口数据
- 修改：`miniprogram/pages/home/home.wxml` — review 入口 UI

---

## Phase 4c：分享卡片定制

### 功能

通关结算后可生成终端风格的分享图片，支持微信分享和保存到相册。

### 实现方式

使用 `wx.createOffscreenCanvas()` + `canvas.getContext('2d')` 离屏绘制。

### 新建模块：utils/share-card.js

```js
// API
generateShareImage(data) // data = { title, stars, score, total, exp, level, cards }
                         // 返回 Promise-like callback: generateShareImage(data, callback)
                         // callback(tempFilePath)
```

注意：微信小程序不支持 async/await，用回调模式。

### 卡片布局（750×1000 虚拟像素）

```
┌─ CLAUDE CODE TERMINAL ──────────────┐
│                                      │
│  STAGE CLEAR                         │
│  [章节名称]              ★★★        │
│                                      │
│  > SCORE: 5/5 (100%)                 │
│  > EXP: +80                          │
│  > LEVEL: dev Lv.5                   │
│                                      │
│  CARDS OBTAINED:                     │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ SSR  │ │  R   │ │  N   │        │
│  │ name │ │ name │ │ name │        │
│  └──────┘ └──────┘ └──────┘        │
│                                      │
│  user@claude:~$ ▌                    │
│  ── CC学习工具 ──                    │
└──────────────────────────────────────┘
```

### 颜色

Canvas 不支持 CSS 变量，硬编码终端色板：
- 背景：#0D1117
- 文字：#E6EDF3
- 边框：#30363D
- 星金色：#F0C040
- 稀有度颜色：N=#484F58, R=#58A6FF, SR=#BC8CFF, SSR=#F0C040

### 分享集成

- 结算页新增 "SHARE" 按钮（在 RETRY 和 MAP 之间）
- 点击后调用 `generateShareImage()` 生成图片
- 弹出操作菜单：分享给好友 / 保存到相册
- 分享好友：设置 `onShareAppMessage` 的 `imageUrl`
- 保存相册：`wx.saveImageToPhotosAlbum()`（需 `wx.authorize`）

### 改动文件

- 新建：`miniprogram/utils/share-card.js`（~120 行）
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.js` — 分享按钮逻辑
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` — 分享按钮 UI
- 修改：`miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` — 分享按钮样式

---

## Phase 4d：数据统计面板

### 功能

在档案页（reference）成就区块和设置区块之间新增详细统计区块。

### 统计项

**总览行**：
- 总答题数（遍历所有 stage 记录累加）
- 总体正确率
- 总 EXP
- 总通关关卡数

**区域进度**（5 行）：
- 每个区域：名称 + ASCII 进度条 `[████░░░░░░] 40%` + 星数

**连胜记录**：
- 当前连击 / 最佳连击 / 保护盾数

**卡牌分布**：
- N / R / SR / SSR 各稀有度 已获得/总数

### 数据源

全部从现有 API 聚合：
- `gameSave.load()` — stages、exp、streak
- `gameEngine.getRegionProgress()` — 区域进度
- `gameCards.getCollectionStats()` — 卡牌统计

不需要额外存储。

### UI 设计

终端风格，全部 font-mono：
- Section 标题：`STATISTICS`
- 区域进度用文本模拟进度条（WXML 中用 `wx:for` 生成 █ 和 ░ 字符）
- 卡牌分布用稀有度颜色高亮数字

### 改动文件

- 修改：`miniprogram/pages/reference/reference.js` — _buildPageData() 新增统计聚合
- 修改：`miniprogram/pages/reference/reference.wxml` — 插入统计 section
- 修改：`miniprogram/pages/reference/reference.wxss` — 统计区块样式

---

## 技术约束

1. 不支持动态 require — 音效文件路径必须是字面字符串
2. 不支持 async/await — canvas 操作用回调
3. 不支持展开运算符 — 用 Object.assign()
4. rpx 单位 — 所有新增样式
5. 包大小 — 音效文件总计 <20KB，canvas 绘图纯 JS 无额外资源
6. 音效文件放主包 utils/sound.js 引用路径下，chapter 页在分包中通过 require 主包 utils

## 延后项

- LLM 辅助题目优化（需要后端服务，与当前纯离线架构不同）
- 音效精调（可在后续迭代中替换音频文件）

## 音效资源

来源：[Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds)（CC0 授权，100 个文件）
精选 5 个短音效（.ogg 格式），总计 <20KB。
