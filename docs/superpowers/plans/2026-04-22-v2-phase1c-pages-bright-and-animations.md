# V2 Phase 1c：页面明亮化 + 基础动效系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 4 个 Tab 页面和 chapter 游戏页的 WXSS 全面明亮化，并增加 L1-L3 级别动效（过渡、反馈、奖励动画）。

**Architecture:** 逐页重写 WXSS 样式（使用新的 CSS 变量），更新 WXML 中的硬编码 terminal 文案，在 chapter.wxss 中增加答题反馈和结算动效。所有动效纯 CSS 实现，不依赖外部库。

**Tech Stack:** WXSS（CSS transition/animation/keyframes）、WXML 模板更新、wx.vibrateShort

**Spec:** `docs/superpowers/specs/2026-04-22-v2-phase1-learn-flow-and-bright-ui-design.md` §3.7, §4

**前置依赖:** Plan 1a（色彩系统）和 Plan 1b（学习卡片）已完成

---

### Task 1: Home 页面明亮化

**Files:**
- Modify: `miniprogram/pages/home/home.wxml`
- Modify: `miniprogram/pages/home/home.wxss` (378 行，需大幅重写)
- Modify: `miniprogram/pages/home/home.js` (更新分享文案)

- [ ] **Step 1: 更新 home.wxml 文案和结构**

主要修改：
1. 第 1 行：`<scroll-view scroll-y class="terminal-page">` → `<scroll-view scroll-y class="home-page">`
2. 第 5-15 行 terminal-header 区域重写：
```xml
  <!-- Page Header -->
  <view class="page-header">
    <view class="header-top">
      <text class="header-greeting">👋 欢迎回来</text>
      <view class="lang-switcher">
        <text class="lang-btn {{locale=='zh'?'active':''}}" bindtap="switchLocale" data-locale="zh">中</text>
        <text class="lang-btn {{locale=='en'?'active':''}}" bindtap="switchLocale" data-locale="en">EN</text>
        <text class="lang-btn {{locale=='ja'?'active':''}}" bindtap="switchLocale" data-locale="ja">日</text>
      </view>
    </view>
    <text class="header-level">Level {{levelInfo.level || 1}} · {{levelInfo.title || 'guest'}}</text>
  </view>
```
3. 去掉所有 `font-mono` class（除代码相关元素外）
4. action-btn 中的 `>_`、`>>>`、`◇◆` 图标改为 emoji：`📖`、`⚡`、`🗺️`
5. section-title 从 `> status`、`> recent cards` 改为 `📊 学习进度`、`🃏 最近获得`
6. review-entry 的 `?!` 改为 `📝`

- [ ] **Step 2: 重写 home.wxss**

完整重写 `miniprogram/pages/home/home.wxss`，核心变化：
- 所有背景色从暗色 → 使用 CSS 变量（--color-bg, --color-bg-card 等）
- 所有文字色从亮色 → 使用 CSS 变量（--color-text-primary 等）
- 边框从 `border: 1rpx solid var(--color-border)` 暗色 → `box-shadow: var(--shadow-sm)`
- font-family 从 monospace → 系统字体（继承 page 默认）
- 圆角从 `var(--radius-sm)` (8rpx) → `var(--radius-lg)` (24rpx) 用于卡片
- action-btn 背景色：使用渐变或柔和的区域色浅底
- region 进度条颜色使用 CSS 变量 `--color-region-*`

关键样式片段（指引方向，非完整代码）：

```css
.home-page {
  height: 100vh;
  background: var(--color-bg);
  padding: var(--spacing-md);
  box-sizing: border-box;
}

.page-header {
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.header-greeting {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-text-primary);
}

.status-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: var(--spacing-md);
}

.action-row {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.action-btn {
  flex: 1;
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  text-align: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.15s ease;
}

.action-btn:active {
  transform: scale(0.95);
}
```

- [ ] **Step 3: 更新 home.js 分享文案**

第 180 行：`title: 'Claude Code Terminal — 游戏化学习'` → `title: 'Claude Code 学习 — 游戏化学习工具'`
第 186 行：同上

- [ ] **Step 4: Commit**

```bash
git add miniprogram/pages/home/
git commit -m "feat(theme): brighten home page — new layout, colors, and typography"
```

---

### Task 2: Timeline 地图页明亮化

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.wxml` (85 行)
- Modify: `miniprogram/pages/timeline/timeline.wxss` (280 行)

- [ ] **Step 1: 更新 timeline.wxml**

主要修改：
1. 根容器 class 保持不变但去掉 font-mono
2. 去掉所有终端风格文案（如 `>` 前缀、`$` 符号等）
3. 将 `font-mono` class 仅保留在需要等宽字体的地方

- [ ] **Step 2: 重写 timeline.wxss**

核心变化方向与 home.wxss 一致：
- 暗色背景 → CSS 变量明亮背景
- 暗色文字 → CSS 变量深色文字
- 边框 → 阴影
- 区域节点的圆形标记使用对应的 `--color-region-*` 颜色
- 连接线从暗灰改为浅灰 `var(--color-border)`

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/timeline/
git commit -m "feat(theme): brighten timeline map page"
```

---

### Task 3: Layers 图鉴页 + Reference 档案页明亮化

**Files:**
- Modify: `miniprogram/pages/layers/layers.wxml` (72 行)
- Modify: `miniprogram/pages/layers/layers.wxss` (210 行)
- Modify: `miniprogram/pages/reference/reference.wxml` (165 行)
- Modify: `miniprogram/pages/reference/reference.wxss` (441 行)

- [ ] **Step 1: 更新 layers 页面**

layers.wxml：
- 去掉终端风格文案和 font-mono（保留卡片 rarity 标签的 monospace）
- 卡片背景从暗色改为浅色卡片 + 阴影

layers.wxss：
- 所有背景/文字/边框使用 CSS 变量
- 卡片使用 `border-radius: var(--radius-lg)` + `box-shadow: var(--shadow-sm)`
- 稀有度边框发光效果改为明亮版颜色

- [ ] **Step 2: 更新 reference 页面**

reference.wxml：
- 去掉终端风格文案
- 成就/统计卡片使用明亮版样式

reference.wxss (441 行，最大的 WXSS 文件)：
- 全部暗色 → 明亮色
- 成就卡片使用柔和的渐变背景
- 统计数字使用彩色强调
- 重置按钮从红色改为警告色

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/layers/ miniprogram/pages/reference/
git commit -m "feat(theme): brighten layers and reference pages"
```

---

### Task 4: Chapter 游戏页明亮化

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (684 行)

- [ ] **Step 1: 更新 chapter.wxml 的终端风格文案**

1. `← ESC` → `← 返回`
2. `> SUBMIT` → `提交答案`
3. `> NEXT` → `下一题 →`
4. `> CONTINUE` → `继续`
5. `STAGE CLEAR` → `🎉 关卡通过`
6. `> RETRY` → `🔄 重试`
7. `> SHARE` → `📤 分享`
8. `> MAP` / `> HOME` → `🗺️ 地图` / `🏠 首页`
9. `CORRECT` / `INCORRECT` → `✓ 正确` / `✗ 错误`
10. `// REVIEW` → `📝 答题回顾`
11. `CARDS OBTAINED:` → `🃏 获得卡片`
12. 去掉所有非必要的 `font-mono` class

- [ ] **Step 2: 重写 chapter.wxss 为明亮风格**

684 行完整重写。核心变化：
- `.game-page` 背景从暗色 → `var(--color-bg)`
- `.game-header` 从暗色条 → 白色/透明 + 底部阴影
- `.question-card` 从暗色卡片 → 白色卡片 + 柔和阴影
- `.option-item` 从暗色选项 → 白底 + 浅色边框，hover 状态改为浅色
- `.option--selected` 从高亮边框 → 浅蓝背景
- `.option--correct` 从绿色边框 → 浅绿背景 `#ECFDF5`
- `.option--wrong` 从红色边框 → 浅红背景 `#FEF2F2`
- `.feedback-badge` 从暗色标签 → 明亮版（绿底/红底 + 白文字）
- `.settle-*` 结算页全部明亮化
- `.settle-star` 从终端黄 → 金色 `#F59E0B`
- `.btn-*` 按钮从暗底描边 → 实色圆角按钮

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/
git commit -m "feat(theme): brighten chapter game page — quiz, feedback, and settlement"
```

---

### Task 5: 基础动效系统（L1-L3）

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (追加动效样式)
- Modify: `miniprogram/pages/home/home.wxss` (追加入场动效)

- [ ] **Step 1: 追加 L1 过渡动效到 chapter.wxss**

```css
/* ══════════ L1: Transition Animations ══════════ */

/* Page elements stagger entrance */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.game-header {
  animation: fadeInUp 0.4s ease-out;
}

/* Phase transition */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.game-content {
  animation: fadeIn 0.3s ease-out;
}

/* Learn card scale-in on swiper */
.learn-card {
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```

- [ ] **Step 2: 追加 L2 交互反馈动效**

```css
/* ══════════ L2: Interactive Feedback ══════════ */

/* Button press */
.btn-press,
.btn-confirm,
.btn-next,
.btn-settle,
.action-btn,
.btn-learn-next {
  transition: transform 0.15s ease;
}
.btn-press:active,
.btn-confirm:active,
.btn-next:active,
.btn-settle:active,
.action-btn:active,
.btn-learn-next:active {
  transform: scale(0.95);
}

/* Correct answer feedback */
@keyframes correctBounce {
  0% { transform: translateY(0); }
  30% { transform: translateY(-4rpx); }
  100% { transform: translateY(0); }
}

.option--correct {
  background: #ECFDF5 !important;
  border-color: var(--color-success) !important;
  animation: correctBounce 0.3s ease-out;
}

/* Wrong answer shake */
@keyframes wrongShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6rpx); }
  40% { transform: translateX(6rpx); }
  60% { transform: translateX(-6rpx); }
  80% { transform: translateX(6rpx); }
}

.option--wrong {
  background: #FEF2F2 !important;
  border-color: var(--color-error) !important;
  animation: wrongShake 0.2s ease-out;
}

/* Feedback badge icon pop */
@keyframes iconPop {
  0% { transform: scale(0); }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.feedback-badge__icon {
  animation: iconPop 0.3s ease-out;
}

/* Explanation slide-in */
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.feedback-explain {
  animation: slideInUp 0.3s ease-out;
}

/* Progress dot active state */
.learn-dot {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

- [ ] **Step 3: 追加 L3 奖励动效**

```css
/* ══════════ L3: Reward Animations ══════════ */

/* Star pop */
@keyframes starPop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

.settle-star-pop {
  animation: starPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Settlement fade in */
.settle-anim-fadein {
  animation: fadeIn 0.4s ease-out forwards;
}

.settle-anim-hidden {
  opacity: 0;
}

/* Settlement slide in */
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20rpx); }
  to { opacity: 1; transform: translateX(0); }
}

.settle-anim-slidein {
  animation: slideIn 0.4s ease-out forwards;
}

/* Slide up for cards */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30rpx); }
  to { opacity: 1; transform: translateY(0); }
}

.settle-anim-slideup {
  animation: slideUp 0.4s ease-out forwards;
}

/* Level up pulse */
@keyframes levelPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.settle-anim-pulse {
  animation: levelPulse 0.6s ease-in-out 2, fadeIn 0.3s ease-out;
}

/* EXP number counter (visual placeholder — actual counting done in JS) */
.settle-exp__value {
  transition: all 0.8s ease-out;
}
```

- [ ] **Step 4: 追加 Home 页入场动效**

在 home.wxss 中追加：

```css
/* Home page stagger entrance */
.status-card {
  animation: fadeInUp 0.4s ease-out;
}

.action-row {
  animation: fadeInUp 0.4s ease-out 0.08s both;
}

.review-entry {
  animation: fadeInUp 0.4s ease-out 0.16s both;
}

.regions-section {
  animation: fadeInUp 0.4s ease-out 0.24s both;
}

.recent-section {
  animation: fadeInUp 0.4s ease-out 0.32s both;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20rpx); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss miniprogram/pages/home/home.wxss
git commit -m "feat(anim): add L1-L3 animation system — transitions, feedback, rewards"
```

---

### Task 6: 端到端验证

- [ ] **Step 1: 在微信开发者工具中全流程测试**

逐页检查：

**Home 页**：
- 白色背景、深色文字
- 元素逐项淡入（stagger 动画）
- 按钮有点击缩放反馈
- 进度条和区域颜色正确

**Timeline 地图页**：
- 白色背景
- 区域节点使用对应明亮色
- 连接线为浅灰

**Layers 图鉴页**：
- 白色背景
- 卡片有阴影，稀有度颜色正确

**Reference 档案页**：
- 白色背景
- 统计数字彩色
- 成就卡片明亮

**Chapter 游戏页（完整流程）**：
- LEARN：卡片滑动流畅、进度点动画
- QUIZ：答对绿色弹跳、答错红色震动+解释滑入
- SETTLE：星星逐个弹出、EXP 数字显示、卡片逐个上移
- 所有文案为中文（非终端英文）

- [ ] **Step 2: 检查导航栏、TabBar**

- 导航栏白底黑字
- TabBar 白底，图标正确
- Tab 切换正常

- [ ] **Step 3: 修复发现的问题并 Commit**

```bash
git add -A
git commit -m "fix(theme): address visual issues found in end-to-end testing"
```

---

### Task 7: Bridge Doc 和 Compare 子包页面明亮化

**Files:**
- Modify: `miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.wxss`
- Modify: `miniprogram/subpkg-compare/pages/compare/compare.wxss`
- Potentially modify their `.wxml` files for terminal text cleanup

- [ ] **Step 1: 更新 bridge-doc 页面样式**

将 bridge-doc.wxss 中的暗色背景、文字、边框全部替换为 CSS 变量。核心变化同其他页面：暗底 → 白底、亮文 → 深文、硬边框 → 阴影。

- [ ] **Step 2: 更新 compare 页面样式**

将 compare.wxss 中的暗色样式全部替换。

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-bridge/ miniprogram/subpkg-compare/
git commit -m "feat(theme): brighten bridge-doc and compare subpackage pages"
```
