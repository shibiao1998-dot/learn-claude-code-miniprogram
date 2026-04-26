# 游戏化交互增强 · Sub-Plan 4 · 数字滚动动画 + 定时器清理 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 补齐结算页分数/EXP 数字滚动动画（父 spec Section 3.3 + 3.4），并为 `_playSettlementAnimation` 的多个 `setTimeout` 加上页面生命周期级别的清理逻辑，防止用户提前离开时触发 `setData on destroyed page` 告警。

**Architecture:** 放弃 WXS 的 `setStyle({content:...})` 方案（对普通 `<text>` 节点无效），改由 Page 端用 `setInterval` 驱动。在 `chapter.js` data 里新增 5 个 `displayed*` 字段，WXML 把 `{{result.correctCount}}` 等替换为 `{{displayedCorrect || result.correctCount}}`（兜底为静态终值，避免首次渲染前闪空）。`_playSettlementAnimation` 启动滚动时把 interval ID 收进 `this._animTimers`，所有 `setTimeout` 也一并收进去。新增 `onUnload` 和 `onHide` 生命周期钩子，统一遍历 `_animTimers` 清理。`retryStage` 也调用同一个清理函数再重置数据。

**Tech Stack:** 原生微信小程序 Page（CommonJS JS、`setData`、`setInterval` / `clearInterval` / `setTimeout` / `clearTimeout`），WXML 条件渲染。无新增 WXS，无新增 CSS。

**Parent Spec:** `docs/superpowers/specs/2026-04-25-gamification-interaction-enhancement-design.md`
- Section 3.3「分数展示（animStep 6）」数字滚动 — 本 plan 实现。
- Section 3.4「EXP 增长（animStep 7）」数字滚动 — 本 plan 实现。

**Dependencies (已合入主干的前序 sub-plan):**
- Sub-plan 1 combo 数据层 & 指示器（commit 621340b）。
- Sub-plan 2 答题阶段反馈动画（commit 7cc74e7）。
- Sub-plan 3 结算页 WXS 星星弹簧、combo 行、卡片翻转（commit 2ca3d6a）— `onScoreReveal` 已是空 stub，`onExpReveal` 保留 multiplier 滑入和结尾弹跳但去掉了失效的数字滚动。本 plan 的 Page 端滚动会与 sub-plan 3 保留的 multiplier 滑入**在时间上重叠**，两者都由 `animStep 7` + `expRevealTrigger` 共同触发，互不干扰。

**Known tech debt being paid off:**
- `_playSettlementAnimation` 目前有 8+ 个 `setTimeout`，全部没有 `onUnload` 清理，用户返回时会触发 WeChat warning。
- 现在随数字滚动的 `setInterval` 一起建立统一清理机制。

---

## File Map

| 文件 | 改动类型 | 职责 |
|------|---------|------|
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | 修改 | data 新增 5 个 displayed 字段；`_clearAnimTimers` 辅助；`_playSettlementAnimation` 收集定时器 + 启动滚动；`retryStage` 调用清理；新增 `onUnload` / `onHide` |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | 修改 | 分数/EXP 四处文本绑定从 `{{result.*}}` 改为 `{{displayed* || result.*}}` 兜底写法 |

**不改动的文件：**
- `quiz-anim.wxs` — WXS 方案对文本滚动失效，不再动它。`onScoreReveal` 保持 stub，`onExpReveal` 保留其 multiplier 滑入和结尾弹跳逻辑。
- `chapter.wxss` — 无需新样式。
- `game-engine.js` — 数据层不变。

---

## 为什么不用 WXS 做数字滚动（重要背景）

Sub-plan 3 code review 发现：WXS 的 `el.setStyle({ content: '"5"' })` 对普通 `<text>` 节点无效，CSS `content` 属性只对 `::before`/`::after` 伪元素生效。Sub-plan 3 因此把 `onScoreReveal` 改成 no-op、把 `onExpReveal` 的数字滚动删掉，只保留 multiplier 滑入和结尾弹跳。

本 plan 改由 Page 端 `setInterval` + `setData` 驱动。代价是每帧触发一次 setData 重渲染，但滚动持续 500–600ms 合计 ~30 次 setData，对性能无可感影响。

## 兜底写法说明

WXML 改为 `{{displayedCorrect || result.correctCount}}`：
- `displayedCorrect` 是 Number 类型，初始 `0`。WXML 里 `0 || x` 返回 `x`，所以动画开始前显示终值 `result.correctCount`，不会闪出一个 `0`。
- 动画启动第一帧 `setData({ displayedCorrect: 0 })` 把显示值从终值切回 `0`（仍走 `0 || result.correctCount`… 但此时我们会改用 `displayScrollActive: true` 标记位切换策略）。
- **修正方案**：新增布尔 `displayScrollActive`，WXML 用 `{{displayScrollActive ? displayedCorrect : result.correctCount}}`。这样动画未启动时显示终值；启动后即使值是 0 也显示 0。

看 Task 1 Step 2 的完整 WXML 示例。

## 时序图

```
animStep=6 @ 1500ms  ─┬─► setData({displayScrollActive: true, displayedCorrect:0, displayedTotal:0, displayedRatio:0})
                      └─► setInterval(16ms) 持续 600ms 递增 3 个字段到终值，然后 clearInterval

animStep=7 @ 1800ms  ─┬─► setData({displayedExp:0}) 同时 WXS onExpReveal 触发 multiplier 滑入（已在 sub-plan 3 实现）
                      └─► setInterval(16ms) 持续 500ms 递增 displayedExp 到终值，然后 clearInterval
                         WXS 在 500ms 后做 scale(1.15) → scale(1) 弹跳（已在 sub-plan 3 实现）

onUnload / onHide / retryStage ─► _clearAnimTimers() 清理所有 setTimeout & setInterval
```

---

### Task 1: WXML 兜底绑定 + chapter.js data 字段

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:94` (data block 末尾)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:203-215` (4 处文本绑定)

- [ ] **Step 1: 在 data 对象末尾新增 6 个字段**

打开 `miniprogram/subpkg-chapters/pages/chapter/chapter.js`。找到 data 对象的结尾（第 94 行 `expRevealTrigger: ''` 后面紧跟 `},`）。把第 90–94 行（5 个 trigger 字段）+ 第 95 行闭合的 `},` 替换为：

```js
    starRevealTrigger0: '',
    starRevealTrigger1: '',
    starRevealTrigger2: '',
    scoreRevealTrigger: '',
    expRevealTrigger: '',

    displayScrollActive: false,
    displayedCorrect: 0,
    displayedTotal: 0,
    displayedRatio: 0,
    displayedExp: 0
  },
```

> **注意：** 原 5 个 trigger 字段保持不变，仅在其后追加空行 + 6 个新字段。结尾的 `  },` 闭合 data 对象。

- [ ] **Step 2: WXML 把 4 处结算数字替换为兜底表达式**

打开 `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`。找到第 203-207 行的分数三元素和第 215 行的 EXP 元素。替换为：

第 203 行（正确数）：
- old: `<text class="score-correct-num settle-score__num">{{result.correctCount}}</text>`
- new: `<text class="score-correct-num settle-score__num">{{displayScrollActive ? displayedCorrect : result.correctCount}}</text>`

第 205 行（总题数）：
- old: `<text class="score-total-num settle-score__num">{{result.totalQuestions}}</text>`
- new: `<text class="score-total-num settle-score__num">{{displayScrollActive ? displayedTotal : result.totalQuestions}}</text>`

第 207 行（百分比）：
- old: `<text class="score-ratio-num settle-score__num">{{result.ratio}}</text>`
- new: `<text class="score-ratio-num settle-score__num">{{displayScrollActive ? displayedRatio : result.ratio}}</text>`

第 215 行（EXP 值）：
- old: `<text class="exp-value-num settle-exp__value" style="color:{{regionColor}}">{{reviewMode ? result.correctCount * 10 : result.expReward}}</text>`
- new: `<text class="exp-value-num settle-exp__value" style="color:{{regionColor}}">{{displayScrollActive ? displayedExp : (reviewMode ? result.correctCount * 10 : result.expReward)}}</text>`

**说明：** `displayScrollActive` 为 `false` 时显示终值（既包含正常 stage 也包含 reviewMode 复习模式）。`true` 时统一显示 `displayed*` 字段，滚动期间的 review 模式 EXP 也由同一滚动驱动。

- [ ] **Step 3: 校验 chapter.js 语法**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected: `Syntax OK`

- [ ] **Step 4: 校验 WXML 关键字段存在**

```bash
grep -c "displayScrollActive" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
grep -c "displayedCorrect\|displayedTotal\|displayedRatio\|displayedExp" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
```

Expected: 第一个 grep ≥ 4（四处兜底），第二个 grep = 4（每字段一次）。

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): add display-scroll fields and fallback WXML bindings

data 新增 displayScrollActive + displayedCorrect/Total/Ratio/Exp 字段。
WXML 的 4 处结算数字改为 '{{displayScrollActive ? displayed* : static}}'
兜底表达式——滚动未启动时展示终值，滚动期间由 Page 端 setInterval
驱动的 displayed* 字段替换。配合后续 Task 3 的 setInterval 使用。"
```

---

### Task 2: 新增 `_clearAnimTimers` 辅助 + `onUnload` / `onHide` 钩子

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:620` (在 `goBack` 之前插入两个新方法)

- [ ] **Step 1: 阅读当前的 `goBack` 前后文**

用 Read 工具打开 `miniprogram/subpkg-chapters/pages/chapter/chapter.js` offset 615, limit 15，确认 `_playSettlementAnimation` 结束的 `},` 在第 616 行，`goBack: function() {` 在第 618 行。

- [ ] **Step 2: 在 `_playSettlementAnimation` 和 `goBack` 之间插入 3 个新成员**

在第 616 行 `_playSettlementAnimation` 的闭合 `},` 之后、第 618 行 `goBack: function() {` 之前插入：

```js
  _animTimers: null,

  _clearAnimTimers: function() {
    if (!this._animTimers) return;
    for (var i = 0; i < this._animTimers.length; i++) {
      var t = this._animTimers[i];
      if (t && t.type === 'timeout') {
        clearTimeout(t.id);
      } else if (t && t.type === 'interval') {
        clearInterval(t.id);
      }
    }
    this._animTimers = [];
  },

  onUnload: function() {
    this._clearAnimTimers();
  },

  onHide: function() {
    this._clearAnimTimers();
  },

```

**说明：**
- `_animTimers` 存数组，元素形如 `{ type: 'timeout', id: N }` 或 `{ type: 'interval', id: N }`，便于按种类调用对应清理函数。
- `_clearAnimTimers` 对 null 安全（首次调用时未初始化）。
- `onUnload` 由 WeChat 在 `wx.navigateBack` / 页面销毁时触发。
- `onHide` 由 WeChat 在切后台或用户切到别的 tab 时触发——此时动画事实上已中断，清理定时器避免切回前台后继续消费 setData。

**不使用 `this.setData` 在清理函数内部重置 `displayScrollActive` 等字段**：页面已在销毁，setData 本身就是问题来源，retryStage 里会走另一套完整重置逻辑。

- [ ] **Step 3: 校验语法**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
grep -n "_clearAnimTimers\|onUnload\|onHide" miniprogram/subpkg-chapters/pages/chapter/chapter.js
```

Expected: `Syntax OK`；grep 输出包含 `_clearAnimTimers:`（定义）、1 条调用（Task 3 还没加）、`onUnload: function()` 和 `onHide: function()`。

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): add _clearAnimTimers helper and onUnload/onHide hooks

新增 _animTimers 数组字段与 _clearAnimTimers 方法，按 type 分别
clearTimeout/clearInterval。新增 onUnload 与 onHide 生命周期钩子
统一调用清理。为后续把 _playSettlementAnimation 的多个 setTimeout
与数字滚动的 setInterval 统一管理做准备。"
```

---

### Task 3: 改造 `_playSettlementAnimation` 收集定时器 + 启动数字滚动

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:548-616` (整个 `_playSettlementAnimation`)

- [ ] **Step 1: 整体替换 `_playSettlementAnimation`**

找到 `_playSettlementAnimation: function() {` （第 548 行）到它的闭合 `},` （第 616 行）之间的全部代码。把整段（包括开头的 `_playSettlementAnimation: function() {` 和结尾的 `},`）替换为：

```js
  _playSettlementAnimation: function() {
    var self = this;
    self._clearAnimTimers();
    self._animTimers = [];
    var stars = self.data.result ? self.data.result.stars : 0;

    function track(id, type) {
      self._animTimers.push({ id: id, type: type });
      return id;
    }

    track(setTimeout(function() { self.setData({ animStep: 1 }); }, 100), 'timeout');
    track(setTimeout(function() { self.setData({ animStep: 2 }); }, 400), 'timeout');

    var starDelay = 650;
    for (var i = 1; i <= 3; i++) {
      (function(idx) {
        track(setTimeout(function() {
          var patch = { animStep: 2 + idx };
          var earned = idx <= stars ? 1 : 0;
          patch['starRevealTrigger' + (idx - 1)] = (idx - 1) + '_' + earned + '_' + Date.now();
          self.setData(patch);
          if (earned) {
            wx.vibrateShort({ type: 'medium' });
            sound.play('star');
          }
        }, starDelay + (idx - 1) * 250), 'timeout');
      })(i);
    }

    // Score scroll @ 1500ms (600ms duration)
    track(setTimeout(function() {
      var r = self.data.result;
      if (!r) return;
      self.setData({
        animStep: 6,
        scoreRevealTrigger: r.correctCount + '_' + r.totalQuestions + '_' + r.ratio + '_' + Date.now(),
        displayScrollActive: true,
        displayedCorrect: 0,
        displayedTotal: 0,
        displayedRatio: 0,
        displayedExp: 0
      });
      self._startScoreScroll(r.correctCount, r.totalQuestions, r.ratio, 600);
    }, 1500), 'timeout');

    // EXP scroll @ 1800ms (500ms duration)
    track(setTimeout(function() {
      var r = self.data.result;
      if (!r) return;
      var targetExp = self.data.reviewMode ? r.correctCount * 10 : r.expReward;
      self.setData({
        animStep: 7,
        expRevealTrigger: r.expReward + '_' + self.data.comboMultiplier + '_' + Date.now()
      });
      self._startExpScroll(targetExp, 500);
    }, 1800), 'timeout');

    var tailDelay = 2000;
    if (self.data.maxCombo >= 3) {
      track(setTimeout(function() { self.setData({ animStep: 8 }); }, tailDelay), 'timeout');
      tailDelay = 2200;
    }

    if (self.data.newLevel) {
      (function(delay) {
        track(setTimeout(function() {
          self.setData({ animStep: 9 });
          wx.vibrateLong();
          sound.play('levelup');
        }, delay), 'timeout');
      })(tailDelay);
      tailDelay += 200;
    }

    var cardStartDelay = tailDelay + 200;
    var earnedCards = self.data.earnedCardDetails || [];
    for (var j = 0; j < earnedCards.length; j++) {
      (function(idx) {
        track(setTimeout(function() {
          self.setData({ animStep: 10 + idx });
          sound.play('card');
        }, cardStartDelay + idx * 200), 'timeout');
      })(j);
    }
  },

  _startScoreScroll: function(targetCorrect, targetTotal, targetRatio, durationMs) {
    var self = this;
    var startTime = Date.now();
    var id = setInterval(function() {
      var elapsed = Date.now() - startTime;
      var progress = elapsed / durationMs;
      if (progress >= 1) {
        self.setData({
          displayedCorrect: targetCorrect,
          displayedTotal: targetTotal,
          displayedRatio: targetRatio
        });
        clearInterval(id);
        return;
      }
      var eased = 1 - Math.pow(1 - progress, 3);
      self.setData({
        displayedCorrect: Math.round(targetCorrect * eased),
        displayedTotal: Math.round(targetTotal * eased),
        displayedRatio: Math.round(targetRatio * eased)
      });
    }, 16);
    self._animTimers.push({ id: id, type: 'interval' });
  },

  _startExpScroll: function(targetExp, durationMs) {
    var self = this;
    var startTime = Date.now();
    var id = setInterval(function() {
      var elapsed = Date.now() - startTime;
      var progress = elapsed / durationMs;
      if (progress >= 1) {
        self.setData({ displayedExp: targetExp });
        clearInterval(id);
        return;
      }
      var eased = 1 - Math.pow(1 - progress, 3);
      self.setData({ displayedExp: Math.round(targetExp * eased) });
    }, 16);
    self._animTimers.push({ id: id, type: 'interval' });
  },
```

**设计说明：**
- `_playSettlementAnimation` 开头先调 `_clearAnimTimers()`，防止用户刷新动画（例如在复习模式下快速返回重进）时老定时器还在跑。
- `track()` 本地辅助：既 push 到 `_animTimers`，又返回 id 给 `setTimeout` 链式风格（此处其实返回值没用到，但保留以免未来需要）。
- 分数滚动在 animStep 6 设置时一并启动 setInterval；EXP 同理在 animStep 7 时启动。两条独立的 interval，各自 clear 各自的 id。
- easing `1 - Math.pow(1 - progress, 3)` 与父 spec Section 3.3/3.4 的 ease-out cubic 一致。
- 16ms 约为 60fps。`setInterval` 精度在 WeChat 里够用；滚动总共 30–40 tick，setData 峰值可控。
- **EXP 滚动不考虑 reviewMode 分支差异**：因为 `targetExp` 已在 `_startExpScroll` 调用处根据 `reviewMode` 决定。

- [ ] **Step 2: 校验语法**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected: `Syntax OK`（可能再次出现 TS80001 CommonJS 提示，忽略——WeChat 小程序必须 CommonJS）。

- [ ] **Step 3: 校验关键符号**

```bash
grep -c "track(setTimeout" miniprogram/subpkg-chapters/pages/chapter/chapter.js
grep -c "_animTimers.push" miniprogram/subpkg-chapters/pages/chapter/chapter.js
grep -c "_startScoreScroll\|_startExpScroll" miniprogram/subpkg-chapters/pages/chapter/chapter.js
```

Expected:
- 第一个 ≥ 7（两个 animStep 设置 + 三个 star + score + exp + 可选 combo + 可选 levelup + card loop 里至少一个）。实际值因为 combo/levelup/cards 循环会被多次匹配，≥ 7 即可。
- 第二个 = 2（两个 interval track）。
- 第三个 = 4（两个定义 + 两个调用）。

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): add number-scroll animation with tracked timers

_playSettlementAnimation 所有 setTimeout 现经 track() 汇入 _animTimers。
新增 _startScoreScroll 与 _startExpScroll 两个 setInterval-driven 滚动器:
- 分数滚动（正确/总数/百分比同步，600ms ease-out cubic）在 animStep 6
  时启动；
- EXP 滚动（500ms 同缓动）在 animStep 7 时启动，reviewMode 下目标为
  correctCount * 10。
两条 interval 的 id 均追加到 _animTimers，onUnload/onHide 会统一清理，
避免用户返回时触发 setData on destroyed page 告警。"
```

---

### Task 4: `retryStage` 清理定时器 + 重置 displayed 字段

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:622-652` (整个 `retryStage`)

- [ ] **Step 1: 整体替换 `retryStage`**

找到 `retryStage: function() {` （第 622 行）到它的闭合 `},` （约第 652 行）。把整段替换为：

```js
  retryStage: function() {
    if (this.data.mode === 'daily') {
      wx.navigateBack();
      return;
    }
    var session = this._session;
    if (!session) return;
    var stage = _findStage(session.chapter);
    if (stage) {
      this._clearAnimTimers();
      this._startStage(session.chapter, this.data.locale);
      this.setData({
        finished: false,
        showSettlement: false,
        showReview: false,
        showFeedback: false,
        selectedOption: '',
        animStep: 0,
        comboCount: 0,
        comboBreakShow: false,
        floatScoreText: '',
        maxCombo: 0,
        comboMultiplier: 1.0,
        baseExp: 0,
        starRevealTrigger0: '',
        starRevealTrigger1: '',
        starRevealTrigger2: '',
        scoreRevealTrigger: '',
        expRevealTrigger: '',
        displayScrollActive: false,
        displayedCorrect: 0,
        displayedTotal: 0,
        displayedRatio: 0,
        displayedExp: 0
      });
    }
  },
```

**关键变化：**
- 新增 `this._clearAnimTimers();` 在 `_startStage` 调用之前（防止旧结算动画的定时器在新一局开始后还在跑）。
- setData 最后追加 5 个 display 字段重置（`displayScrollActive: false` 把兜底逻辑切回显示终值）。

- [ ] **Step 2: 校验语法**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected: `Syntax OK`（TS80001 忽略）。

- [ ] **Step 3: 校验重置字段**

```bash
grep -A 30 "retryStage: function" miniprogram/subpkg-chapters/pages/chapter/chapter.js | grep -c "displayScrollActive: false\|displayedCorrect: 0\|displayedTotal: 0\|displayedRatio: 0\|displayedExp: 0"
```

Expected: `5`（五个重置全都在 retryStage 内）。

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): clear timers and reset display fields in retryStage

retryStage 新增 _clearAnimTimers 调用（在 _startStage 前），并在 setData
中一并重置 displayScrollActive 与 4 个 displayed* 字段，避免重试时
旧动画的 setTimeout/setInterval 仍在触发 setData 导致 UI 抖动。"
```

---

### Task 5: 集成验证

**Files:** 前四个 Task 涉及的 2 个文件。

- [ ] **Step 1: 语法网关**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "chapter.js OK"
```

Expected: `chapter.js OK`。.wxml 无 Node 校验方式，由 WeChat DevTools 构建期验证。

- [ ] **Step 2: 字段声明 ↔ 使用一致性**

```bash
echo "=== chapter.js data 里的 display 字段 ==="
grep -n "displayScrollActive\|displayedCorrect\|displayedTotal\|displayedRatio\|displayedExp" miniprogram/subpkg-chapters/pages/chapter/chapter.js | head -30

echo "=== WXML 里的 display 字段 ==="
grep -n "displayScrollActive\|displayedCorrect\|displayedTotal\|displayedRatio\|displayedExp" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
```

Expected:
- chapter.js 输出包含：data 声明（5 行）、`_playSettlementAnimation` setData 初始化、`_startScoreScroll` / `_startExpScroll` 内部 setData、`retryStage` 重置。总行数 ≥ 12。
- WXML 输出 5 行：`displayScrollActive` 出现 4 次（4 处兜底三元），`displayedCorrect/Total/Ratio/Exp` 各出现 1 次。

- [ ] **Step 3: 定时器收集 / 清理的完整性**

```bash
echo "=== 收集路径 ==="
grep -n "_animTimers.push\|track(setTimeout" miniprogram/subpkg-chapters/pages/chapter/chapter.js

echo "=== 清理路径 ==="
grep -n "_clearAnimTimers\|clearTimeout\|clearInterval" miniprogram/subpkg-chapters/pages/chapter/chapter.js
```

Expected:
- 收集：`track(setTimeout` 在 `_playSettlementAnimation` 里出现 ≥ 7 次；`_animTimers.push` 在 2 个滚动器里各出现 1 次。
- 清理：`_clearAnimTimers` 定义 1 次 + 至少 3 处调用（`onUnload` / `onHide` / `_playSettlementAnimation` 开头 / `retryStage` 各一处，≥ 3 处）；`clearTimeout` / `clearInterval` 在 `_clearAnimTimers` 内部。

- [ ] **Step 4: 手工 DevTools 验证清单**

> **For human review（不是自动步骤）：** 用微信开发者工具打开 `miniprogram/`，以下 4 个场景必须都验证：
> 1. **正常结算数字滚动：** 开始任一关卡，答完 18 题触发结算。观察：分数三数字（正确数、总数、百分比）在 animStep 6 时从 0 滚到终值（600ms）；EXP 在 animStep 7 时从 0 滚到终值（500ms）；multiplier `×1.5` 在 EXP 滚动 60% 后滑入；EXP 滚到终值后 scale 弹跳（sub-plan 3 已实现）。
> 2. **结算中返回：** 在数字滚动过程中（animStep 6 或 7）快速点左上角「← 返回」按钮（或物理返回）。控制台不应出现 `setData on destroyed page` / `Invalid data field` 之类告警；Console 出现红字则说明 `onUnload` 清理失败。
> 3. **结算中切后台：** 动画播放到一半时按 Home 键切到桌面再回来。回来时动画应已结束（切后台触发 onHide 清理），不应看到数字再次从头滚动。
> 4. **重试：** 结算完成后点「重试」。确认数字在新关卡开始时恢复为 0（下一次结算时再滚到新关卡的终值），不继承上一局的终值。

- [ ] **Step 5: 更新失败应记录的信息**

若第 4 步出现任何异常，记录：
- 出错的具体场景（1/2/3/4 哪一个）。
- 控制台完整告警文本。
- 动画当时卡在 animStep 的哪个值。
- 然后停下来，不要自己尝试修复——返回给人工审核决定。

- [ ] **Step 6: 无新增技术债的收尾确认**

无需 commit。本 task 仅验证。

---

## Self-review

**Spec coverage（对照父 spec Section 3 未完成项）：**
- Section 3.3「分数数字滚动（600ms ease-out cubic）」— Task 3 `_startScoreScroll` ✓
- Section 3.4「EXP 数字滚动（500ms）+ 完成时的 multiplier 滑入 + 结尾 scale 弹跳」— 滚动由 Task 3 `_startExpScroll` 实现 ✓；multiplier 滑入和弹跳由 sub-plan 3 的 `onExpReveal` 保留不变。

**Tech debt 清理（非 spec 但入 scope）：**
- `_playSettlementAnimation` 中 8+ 个 `setTimeout` 无清理 — Task 2 + Task 3 + Task 4 联合解决 ✓
- 重试时旧定时器可能叠加 — Task 3 开头的 `_clearAnimTimers()` + Task 4 的 retryStage 清理 ✓

**Placeholder 扫描：** 全文无 "TODO"、"TBD"、"implement later"、"similar to task"、"fill in"——已检查。所有代码块都完整可粘贴。

**Type consistency：**
- `displayedCorrect` / `displayedTotal` / `displayedRatio` / `displayedExp` 四个字段在 data 声明为 `0`（Number），`setData` 时也均是 `Math.round(...)` 的 Number，WXML 里的 `displayScrollActive ? displayed* : result.*` 左右两路都是 Number，类型一致 ✓。
- `displayScrollActive` 始终 Boolean（`false`/`true`）✓。
- `_animTimers` 数组元素形状 `{ id: Number, type: 'timeout' | 'interval' }`；`_clearAnimTimers` 按 type switch 处理；`track()` 和 `_animTimers.push` 都按这个形状 push。一致 ✓。
- `_startScoreScroll(targetCorrect, targetTotal, targetRatio, durationMs)` 与调用处 `self._startScoreScroll(r.correctCount, r.totalQuestions, r.ratio, 600)` 参数顺序对齐 ✓。
- `_startExpScroll(targetExp, durationMs)` 与调用处 `self._startExpScroll(targetExp, 500)` 一致 ✓。

**Scope 纪律：** 5 个 Task，17 个 checkbox（其中 13 个脚本步骤 + 4 个 grep/验证 + 1 个手工 DevTools 清单）。符合 CLAUDE.md 的 15 步上限。

**确实没改的东西：** `quiz-anim.wxs` 保持 sub-plan 3 结束时的形态（6 个导出函数），`chapter.wxss` 未动，`game-engine.js` 未动。验证 Task 5 Step 1 已确认 chapter.js 语法 OK 即覆盖。
