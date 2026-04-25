# V2 Phase 1：学习流程重构 + 明亮UI — 设计文档

## 概述

本文档是小程序 V2 大版本改版的 Phase 1 设计规格。核心目标：解决"用户什么都不知道就直接答题"的问题，引入"先学后测"的学习卡片系统，同时将整体视觉风格从暗色终端主题全面转为明亮清新教育风。

### V2 全局路线图

| Phase | 内容 | 状态 |
|-------|------|------|
| **Phase 1** | 学习流程重构 + UI 明亮化 + 基础动效 | **本文档** |
| Phase 2 | 题库重建（构建脚本 + Claude API + 自动审核） | 待设计 |
| Phase 3 | 丰富动效（粒子/3D/全屏动画）+ 游戏化增强 | 待设计 |

### 设计原则

- **先学后测**：测试是检验学习成果的手段，不是学习本身
- **认知科学驱动**：概念讲解 → 互动练习 → 测验检验（参考 Brilliant/Enki 模式）
- **渐进展示**：降低认知负荷，一次只呈现一个概念
- **即时反馈**：答对/答错当场反馈+解释，不做事后复盘

---

## 1. 学习卡片系统

### 1.1 核心流程变更

**现状**：进入关卡 → 直接答选择题（CHALLENGE → REVIEW → CONFIRM）→ 结算

**改为**：进入关卡 → **学习卡片（LEARN）** → 答题测验（QUIZ） → 结算（SETTLE）

### 1.2 卡片结构

每个关卡（stage）新增一组知识卡片（Knowledge Cards），放在答题之前。每组 3-5 张。

**单张卡片包含**：
- 顶部：进度指示点（● ● ● ○ ○）
- 图标/emoji：概念的视觉标识
- 标题：核心概念名称（三语）
- 正文：50-100字简短概念讲解（通俗易懂）
- 代码示例区：语法高亮的关键代码/配置（可选）
- 要点提示：一句话总结（💡 前缀）
- 底部按钮："继续 →"（最后一张为"开始测验 →"）

### 1.3 交互方式

- 使用微信 `swiper` 组件实现左右滑动切换
- 底部进度点指示当前位置
- 用户可回滑复习之前的卡片
- 卡片浏览完成给 +5 EXP（鼓励学习而非跳过）
- 最后一张卡片按钮变为"开始测验 →"，点击进入 QUIZ 阶段

### 1.4 数据结构

新增数据文件 `knowledge-cards.js`，与 `game-stages.js` 平行，放在 `subpkg-chapters/data/` 中：

```js
module.exports = {
  stages: [
    {
      stage_id: "stage_s01",
      cards: [
        {
          id: "kc_s01_001",
          title: { zh: "REPL 循环", en: "The REPL Loop", ja: "REPLループ" },
          icon: "🔄",
          content: {
            zh: "Claude Code 的核心是一个 REPL 循环...",
            en: "At the core of Claude Code is a REPL loop...",
            ja: "Claude Codeの中核はREPLループ..."
          },
          code_example: "claude > help\nAvailable commands: ...",
          key_point: {
            zh: "REPL = 读取-执行-打印-循环，这是所有交互的基础",
            en: "REPL = Read-Eval-Print-Loop, the foundation of all interactions",
            ja: "REPL = 読み取り-実行-出力-ループ、全操作の基盤"
          }
        }
        // 每个 stage 3-5 张卡片
      ]
    }
    // 26 个 stage
  ]
};
```

### 1.5 内容来源与范围

- **Phase 1 MVP**：手写 CORE 区域 6 章（s01-s06）的知识卡片内容，共约 20-30 张卡片。其余 20 章使用占位数据（标题+简短提示"更多内容即将推出"）
- **Phase 2**：由 LLM 构建脚本从 Markdown 文档统一生成全部 26 章的知识卡片（与题目生成一并处理），替换 Phase 1 的占位数据
- 每章提取 3-5 个核心概念，每个概念一张卡片
- 卡片内容为构建产物，遵循现有 `module.exports` 格式
- 手写卡片的内容来源：`subpkg-chapters/data/docs/chapter-s01-zh.js` 至 `chapter-s06-zh.js`

---

## 2. 关卡流程重构

### 2.1 新三阶段

| 阶段 | 名称 | 内容 | 对应现有代码 |
|------|------|------|-------------|
| LEARN | 知识学习 | 滑动浏览知识卡片 | **新增** |
| QUIZ | 答题测验 | 选择题 + 即时反馈 | 改造现有 CHALLENGE |
| SETTLE | 结算奖励 | 星星/EXP/卡片奖励 | 保留现有 settlement |

### 2.2 LEARN 阶段（新增）

- 顶部标题："📖 学习 · {stage_title}"
- 进度条从 0% → 100%，每张卡片等分推进
- swiper 组件承载卡片组
- 浏览完所有卡片后底部按钮变为"开始测验 →"
- 完成浏览获得 +5 EXP

### 2.3 QUIZ 阶段（改造）

- 保留现有选择题逻辑和计分
- **去掉 REVIEW + CONFIRM 两阶段**——答错时当场展示正确答案+解释
- 答对：选项卡片背景渐变浅绿 + ✓ 弹入 + 轻弹跳 + 震动
- 答错：选项卡片背景渐变浅红 + 水平抖动 + 正确答案高亮 + 解释卡片滑出 + 震动
- 错题自动进入间隔复习队列（复用现有 game-review.js）

### 2.4 SETTLE 阶段（保留+优化）

- 保留现有星星评级逻辑（≥40% 一星，≥70% 两星，100% 三星）
- 保留 EXP 奖励计算（10/30/60/100）
- 保留卡片奖励机制
- 动效用 Phase 1 的 L1-L3 级别动效

### 2.5 入口逻辑

| 入口 | mode 参数 | 是否有 LEARN 阶段 | 说明 |
|------|-----------|------------------|------|
| "继续闯关" | `game`（默认） | ✅ 有 | 常规闯关，先学后测 |
| "今日挑战" | `daily` | ❌ 跳过 | 混合题，无对应卡片组 |
| "错题复习" | `review` | ❌ 跳过 | 复习已做错的题 |
| 地图点击关卡 | `game` | ✅ 有 | 同"继续闯关" |

---

## 3. 明亮色彩系统

### 3.1 全局转变

从 GitHub Dark 终端风（#0D1117 黑底、Monospace、绿色光标）全面转为明亮清新教育风（白底、圆润卡片、多彩强调色、系统字体）。

### 3.2 CSS 变量替换

**背景色**：
```css
--color-bg:          #FFFFFF;       /* 主背景 */
--color-bg-card:     #F8FAFC;       /* 卡片/区块底色 */
--color-bg-muted:    #F1F5F9;       /* 次级背景 */
--color-bg-elevated: #FFFFFF;       /* 浮层/弹窗（配合阴影） */
```

**文字色**：
```css
--color-text-primary:   #1E293B;    /* 主文字（深灰蓝） */
--color-text-secondary: #64748B;    /* 次要文字 */
--color-text-muted:     #94A3B8;    /* 辅助/提示 */
```

**五区域主题色**：
```css
--color-region-core:     #10B981;   /* 翡翠绿 ← 原 #3FB950 */
--color-region-tools:    #3B82F6;   /* 天空蓝 ← 原 #58A6FF */
--color-region-runtime:  #8B5CF6;   /* 薰衣草紫 ← 原 #BC8CFF */
--color-region-network:  #F43F5E;   /* 玫瑰红 ← 原 #F85149 */
--color-region-practice: #F59E0B;   /* 琥珀橙 ← 原 #D29922 */
```

**功能色**：
```css
--color-success:  #10B981;  /* 答对 */
--color-error:    #EF4444;  /* 答错 */
--color-warning:  #F59E0B;  /* 提示 */
--color-info:     #3B82F6;  /* 信息 */
--color-exp:      #8B5CF6;  /* 经验值 */
--color-streak:   #F59E0B;  /* 连续打卡 */
```

**卡片稀有度色**：
```css
--color-rarity-n:   #94A3B8;  /* N 中灰 */
--color-rarity-r:   #3B82F6;  /* R 蓝 */
--color-rarity-sr:  #8B5CF6;  /* SR 紫 */
--color-rarity-ssr: #F59E0B;  /* SSR 金（+ 微光效果） */
```

### 3.3 字体系统

```css
--font-primary: -apple-system, "SF Pro", "PingFang SC", sans-serif;
--font-code:    "SF Mono", Menlo, Consolas, monospace;
```

全局从 Monospace 改为系统无衬线字体。等宽字体仅用于代码示例区域。

### 3.4 圆角系统

```css
--radius-sm:  8rpx;     /* 小元素：标签、徽章 */
--radius-md:  16rpx;    /* 按钮、输入框 */
--radius-lg:  24rpx;    /* 卡片 */
--radius-xl:  32rpx;    /* 大卡片、弹窗 */
```

### 3.5 阴影系统

替代现有大量的 `border: 1px solid #30363D` 边框：
```css
--shadow-sm:  0 2rpx 8rpx rgba(0,0,0,0.04);
--shadow-md:  0 4rpx 16rpx rgba(0,0,0,0.08);
--shadow-lg:  0 8rpx 32rpx rgba(0,0,0,0.12);
```

### 3.6 导航栏配置

```json
{
  "window": {
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#F1F5F9"
  }
}
```

### 3.7 Home 页面风格示意

**从终端控制台风格**：
```
┌── #0D1117 黑底 ──────────────┐
│  CLAUDE CODE TERMINAL        │  ← 绿色等宽字
│  user@claude:~$              │
│  ┌─ #161B22 暗灰卡片 ──────┐ │
│  │ Level 3 · dev · 350 exp │ │
│  └──────────────────────────┘ │
│  [>_ 今日挑战] [>>> 闯关]     │  ← 绿色边框按钮
└──────────────────────────────┘
```

**转为明亮教育风格**：
```
┌── #FFFFFF 白底 ──────────────┐
│  👋 欢迎回来                  │  ← 系统字体
│  Level 3 · 开发者             │
│  ┌─ #F8FAFC 圆角卡片+阴影 ──┐ │
│  │ 🔥 连续 7 天  📚 350 EXP │ │
│  │ ████████░░░░  45%        │ │  ← 彩色渐变进度条
│  └──────────────────────────┘ │
│  ┌──────┐ ┌──────┐ ┌──────┐  │
│  │ 📖   │ │ ⚡   │ │ 🗺️   │  │  ← 彩色圆角按钮
│  │今日   │ │继续   │ │地图   │  │
│  │挑战   │ │闯关   │ │      │  │
│  └──────┘ └──────┘ └──────┘  │
└──────────────────────────────┘
```

---

## 4. 基础动效系统

### 4.1 动效分层策略

| 层级 | 名称 | 触发场景 | 实现方式 | 所属 Phase |
|------|------|---------|---------|-----------|
| L1 | 过渡 | 页面/卡片切换 | CSS transition | **Phase 1** |
| L2 | 反馈 | 按钮点击、答题对错 | CSS animation + 震动 | **Phase 1** |
| L3 | 奖励 | 星星弹出、EXP 增长 | CSS keyframes | **Phase 1** |
| L4 | 粒子 | 开宝箱、全对庆祝 | Canvas 2D | Phase 3 |
| L5 | 3D | 卡片翻转、成就徽章 | CSS transform-3d | Phase 3 |

### 4.2 L1 过渡动效

**知识卡片滑动**：
- swiper 组件自带滑动过渡
- duration: 300ms, easing: ease-out
- 卡片入场：从右侧滑入 + 轻微放大（scale 0.95 → 1.0）

**页面元素逐项入场（stagger）**：
- 每项延迟 80ms
- translateY(20rpx) → 0 + opacity 0 → 1
- duration: 400ms, ease-out

**阶段切换（LEARN → QUIZ → SETTLE）**：
- 旧阶段：fadeOut 200ms
- 新阶段：fadeIn 300ms + 轻微上移

### 4.3 L2 交互反馈

**按钮点击**：
```css
.btn-press {
  transition: transform 0.15s ease;
}
.btn-press:active {
  transform: scale(0.95);
}
```
配合 `wx.vibrateShort({ type: 'light' })` 轻震动。

**答对**：
- 选项背景渐变为浅绿 #ECFDF5
- ✓ 图标 scale(0→1) 弹入（overshoot）
- 整体轻微弹跳 translateY(-4rpx) 回弹
- `wx.vibrateShort({ type: 'medium' })`
- 音效：correct.ogg

**答错**：
- 选项背景渐变为浅红 #FEF2F2
- 水平震动：translateX 左右抖 3 次（±6rpx），200ms
- 正确选项同时高亮浅绿
- 下方滑出解释卡片（translateY + fadeIn, 300ms）
- `wx.vibrateShort({ type: 'heavy' })`
- 音效：wrong.ogg

**进度点切换**：
- 当前点 scale(1.3) + 主题色，非当前 scale(1.0) + 灰色
- 300ms spring 过渡

### 4.4 L3 奖励动效

**星星评级**：
- 每颗星延迟 300ms 弹入
- scale(0) → scale(1.3) → scale(1.0) overshoot
- 空星 #E2E8F0 → 实星 #F59E0B
- 配合震动和 star.ogg 音效

**EXP 数字增长**：
- 数字从 0 滚动到目标值
- duration: 800ms, ease-out
- 颜色：--color-exp 紫色
- 旁边 "+N" 标签上飘消失

**进度条动画**：
- 宽度从旧值 → 新值
- duration: 600ms, ease-in-out
- 渐变色填充（区域主题色）
- 到达里程碑时脉冲闪烁

### 4.5 微信小程序动画实现策略

优先级顺序：
1. **CSS transition/animation** — 性能最好，GPU 加速，用于大多数场景
2. **wx.createAnimation()** — 需要动态控制时使用
3. **WXS 响应式动画** — 手势跟随等实时场景
4. **Canvas 2D** — Phase 3 粒子效果使用

原则：避免 `setData` 驱动高频动画，用 CSS 或 WXS 代替。

### 4.6 音效

保留现有 5 个音效（correct, wrong, star, levelup, card），新增 2 个：
- `card-slide.ogg` — 知识卡片切换（轻柔翻页声）
- `phase-enter.ogg` — 阶段切换（短促提示音）

---

## 5. 影响范围

### 5.1 需要修改的文件

| 文件 | 改动类型 | 说明 |
|------|---------|------|
| `app.wxss` | **重写** | CSS 变量全部替换为明亮色彩 |
| `app.json` | 修改 | 导航栏配色、tabBar 配色 |
| `pages/home/home.*` | **重写** | 布局从终端风改为卡片风 |
| `pages/timeline/timeline.*` | 大改 | 地图页明亮化 |
| `pages/layers/layers.*` | 大改 | 图鉴页明亮化 |
| `pages/reference/reference.*` | 大改 | 档案页明亮化 |
| `subpkg-chapters/pages/chapter/chapter.js` | **大改** | 新增 LEARN 阶段，改造 QUIZ 阶段 |
| `subpkg-chapters/pages/chapter/chapter.wxml` | **大改** | 新增知识卡片 UI，答题 UI 重做 |
| `subpkg-chapters/pages/chapter/chapter.wxss` | **重写** | 全部明亮化 + 动效样式 |

### 5.2 需要新增的文件

| 文件 | 说明 |
|------|------|
| `subpkg-chapters/data/knowledge-cards.js` | 知识卡片数据（26 stage × 3-5 cards） |
| `assets/sounds/card-slide.ogg` | 卡片切换音效 |
| `assets/sounds/phase-enter.ogg` | 阶段切换音效 |

### 5.3 不变的文件

- `utils/game-engine.js` — 计分逻辑不变
- `utils/game-save.js` — 存储结构不变（可能新增 learn_completed 标记）
- `utils/game-daily.js` — 每日挑战逻辑不变
- `utils/game-review.js` — 间隔复习逻辑不变
- `utils/game-achievement.js` — 成就逻辑不变
- `utils/game-cards.js` — 卡片收集逻辑不变
- `subpkg-chapters/data/game-stages.js` — 题目数据不变（Phase 2 再重建）
- `data/game-cards.js` — 630 张收集卡数据不变

---

## 6. Phase 1 不做的事情（明确延迟）

- ❌ 题库重建（Phase 2）
- ❌ 新增题型：填空、排序、判断（Phase 2）
- ❌ 粒子效果和 Canvas 动画（Phase 3）
- ❌ 3D 卡片翻转效果（Phase 3）
- ❌ 成就全屏动画（Phase 3）
- ❌ 技能树/知识地图可视化（Phase 3）
- ❌ 吉祥物/角色系统
- ❌ 社交功能（排行榜、分享）

---

## 7. 验收标准

1. 用户进入任意常规关卡，先看到 3-5 张知识卡片，可左右滑动浏览
2. 浏览完卡片后点击"开始测验"进入答题
3. 答对/答错有即时视觉+震动反馈，答错当场展示解释
4. 每日挑战和错题复习仍可正常使用（跳过 LEARN 阶段）
5. 全部页面背景为白色/浅灰，文字为深色，无暗色终端痕迹
6. 五个区域使用新的明亮主题色
7. 导航栏和 TabBar 为浅色风格
8. 按钮有点击缩放反馈
9. 星星评级有弹跳动画
10. EXP 数字有滚动增长效果
11. 所有功能在微信开发者工具和真机上正常运行
