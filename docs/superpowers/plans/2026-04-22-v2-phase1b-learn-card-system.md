# V2 Phase 1b：学习卡片系统 + 关卡流程重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在答题前增加知识卡片学习阶段（LEARN），重构关卡流程为 LEARN → QUIZ → SETTLE 三阶段，去掉原有的 REVIEW + CONFIRM 阶段。

**Architecture:** 新增 `knowledge-cards.js` 数据文件存放卡片内容，修改 `chapter.js` 增加 LEARN 阶段逻辑，修改 `chapter.wxml` 增加卡片 swiper UI，修改 `chapter.wxss` 增加卡片样式。

**Tech Stack:** 微信小程序 swiper 组件、WXML 模板、WXSS 动画、JavaScript Page 逻辑

**Spec:** `docs/superpowers/specs/2026-04-22-v2-phase1-learn-flow-and-bright-ui-design.md` §1, §2

**前置依赖:** Plan 1a（色彩系统）已完成

---

### Task 1: 创建知识卡片数据文件（CORE 区域 s01-s06）

**Files:**
- Create: `miniprogram/subpkg-chapters/data/knowledge-cards.js`

- [ ] **Step 1: 阅读 CORE 区域源文档**

阅读以下 6 个章节的中文文档以提取核心概念：
- `miniprogram/subpkg-chapters/data/docs/chapter-s01-zh.js`
- `miniprogram/subpkg-chapters/data/docs/chapter-s02-zh.js`
- `miniprogram/subpkg-chapters/data/docs/chapter-s03-zh.js`
- `miniprogram/subpkg-chapters/data/docs/chapter-s04-zh.js`
- `miniprogram/subpkg-chapters/data/docs/chapter-s05-zh.js`
- `miniprogram/subpkg-chapters/data/docs/chapter-s06-zh.js`

每章提取 3-5 个核心知识点。

- [ ] **Step 2: 编写 knowledge-cards.js**

创建 `miniprogram/subpkg-chapters/data/knowledge-cards.js`，格式如下：

```js
// subpkg-chapters/data/knowledge-cards.js
// 构建产物 — Phase 1 MVP: CORE 区域手写，其余占位
module.exports = {
  stages: [
    {
      stage_id: 'stage_s01',
      cards: [
        {
          id: 'kc_s01_001',
          title: { zh: '概念标题', en: 'Concept Title', ja: 'コンセプト' },
          icon: '🔄',
          content: {
            zh: '50-100字概念讲解...',
            en: 'Concept explanation...',
            ja: '概念説明...'
          },
          code_example: '// 可选代码示例',
          key_point: {
            zh: '一句话总结',
            en: 'One-line summary',
            ja: '一行まとめ'
          }
        }
        // 3-5 cards per stage
      ]
    },
    // s01-s06: 完整内容
    // s07-s19, bp01-bp07: 占位（每 stage 1 张"即将推出"卡片）
  ]
};
```

对于 s07-s19 和 bp01-bp07（共 20 个 stage），每个 stage 只放一张占位卡片：

```js
{
  stage_id: 'stage_s07',
  cards: [
    {
      id: 'kc_s07_placeholder',
      title: { zh: '即将推出', en: 'Coming Soon', ja: '近日公開' },
      icon: '🚀',
      content: {
        zh: '本章节的学习卡片正在制作中，敬请期待！你可以直接开始测验。',
        en: 'Knowledge cards for this chapter are being prepared. You can start the quiz directly.',
        ja: 'この章のカードは準備中です。クイズを始めることができます。'
      },
      code_example: '',
      key_point: {
        zh: '点击下方按钮直接开始测验',
        en: 'Click below to start the quiz',
        ja: '下のボタンをクリックしてクイズを開始'
      }
    }
  ]
}
```

- [ ] **Step 3: 验证数据文件语法**

```bash
node -e "var d = require('./miniprogram/subpkg-chapters/data/knowledge-cards.js'); console.log('stages:', d.stages.length, 'total cards:', d.stages.reduce(function(a,s){return a+s.cards.length},0))"
```

期望输出：`stages: 26 total cards: XX`（XX = s01-s06 的卡片数 + 20 个占位 = 约 40-50）

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/data/knowledge-cards.js
git commit -m "feat(learn): add knowledge-cards.js data — CORE region + placeholders"
```

---

### Task 2: 重构 chapter.js — 增加 LEARN 阶段

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`

- [ ] **Step 1: 新增 require 和 data 字段**

在 `chapter.js` 顶部（第 8 行 stageData 之后）新增：

```js
var knowledgeCards = require('../../data/knowledge-cards');
```

在 Page data 对象中新增以下字段（在 `phase: 0` 附近）：

```js
    // LEARN 阶段
    showLearn: false,
    learnCards: [],
    learnCardIndex: 0,
    learnCardTotal: 0,
    learnCompleted: false,
```

新增一个查找卡片的辅助函数（在 `_findStage` 之后）：

```js
function _findKnowledgeCards(stageId) {
  var stages = knowledgeCards.stages;
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].stage_id === stageId) return stages[i].cards;
  }
  return [];
}
```

- [ ] **Step 2: 修改 _startStage 方法**

将 `_startStage`（第 81-108 行）改为先进入 LEARN 阶段而非直接进入 CHALLENGE：

```js
  _startStage: function(chapterId, locale) {
    var stage = _findStage(chapterId);
    if (!stage) {
      wx.showToast({ title: '关卡未找到', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var t = stage.title;
    var title = t[locale] || t.zh || t.en || chapterId;
    var regionLabels = { core: 'CORE/', tools: 'TOOLS/', runtime: 'RUNTIME/', network: 'NETWORK/', practice: 'PRACTICE/' };

    this._session = gameEngine.createSession(stage);
    this._stageChapterId = chapterId;

    // 加载知识卡片
    var cards = _findKnowledgeCards(stage.id);
    var localizedCards = cards.map(function(card) {
      return {
        id: card.id,
        title: card.title[locale] || card.title.zh || '',
        icon: card.icon,
        content: card.content[locale] || card.content.zh || '',
        code_example: card.code_example || '',
        key_point: card.key_point[locale] || card.key_point.zh || ''
      };
    });

    if (localizedCards.length > 0) {
      // 有卡片：进入 LEARN 阶段
      this.setData({
        mode: 'stage',
        stageTitle: title,
        regionLabel: regionLabels[stage.region] || '',
        regionColor: REGION_COLORS[stage.region] || '#10B981',
        phase: 0,
        phaseLabel: 'LEARN',
        showLearn: true,
        learnCards: localizedCards,
        learnCardIndex: 0,
        learnCardTotal: localizedCards.length,
        learnCompleted: false,
        totalQuestions: stage.questions.length
      });
    } else {
      // 无卡片：直接进入 QUIZ
      this._enterQuizPhase(locale, stage);
    }
  },
```

- [ ] **Step 3: 新增 _enterQuizPhase 方法**

在 `_startStage` 之后新增：

```js
  _enterQuizPhase: function(locale, stage) {
    if (!stage) {
      var chapterId = this._stageChapterId;
      stage = _findStage(chapterId);
    }
    var q = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      phase: 1,
      phaseLabel: 'QUIZ',
      showLearn: false,
      learnCompleted: true,
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: stage.questions.length,
      progressPercent: Math.round(1 / stage.questions.length * 100)
    });
  },
```

- [ ] **Step 4: 新增 LEARN 阶段交互方法**

在 Page 方法中新增：

```js
  onLearnCardChange: function(e) {
    var current = e.detail.current;
    this.setData({ learnCardIndex: current });
  },

  startQuizFromLearn: function() {
    var locale = this.data.locale;
    // 学习完成给 +5 EXP
    gameSave.addExp(5);
    this._enterQuizPhase(locale, null);
  },
```

- [ ] **Step 5: 去掉 REVIEW + CONFIRM 阶段**

**简化 nextQuestion 方法**（原第 259-303 行）：答完最后一题直接进入结算，不再进入 REVIEW 和 CONFIRM。

```js
  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    // 复习模式特殊处理
    if (this.data.reviewMode && session.phase === 2) {
      session.finished = true;
      this._showSettlement();
      return;
    }

    if (session.finished) {
      this._showSettlement();
      return;
    }

    var q = gameEngine.getCurrentQuestion(session);
    if (!q) {
      // 所有题目答完，直接结算（去掉 REVIEW/CONFIRM）
      this._showSettlement();
      return;
    }

    var idx = session.currentIndex + 1;
    var totalQ = session.questions.length;

    this.setData({
      currentQuestion: this._formatQuestion(q, locale),
      showFeedback: false,
      selectedOption: '',
      feedbackCorrect: false,
      feedbackExplanation: '',
      feedbackAnswer: '',
      questionIndex: idx,
      totalQuestions: totalQ,
      progressPercent: Math.round(idx / totalQ * 100)
    });
  },
```

同时删除 `_enterReviewPhase` 方法（原第 305-337 行）和 `continueAfterReview` 方法（原第 339-358 行）。如果 review 模式（mode=review）仍需要这些逻辑，保留它们但仅在 reviewMode 时使用。

注意：保留 `continueAfterReview` 仅供 review 模式使用（从 home 页"错题复习"入口进入时）。将其重命名不需要，但确保常规闯关模式不会触发 REVIEW 阶段。

实际上更安全的做法是：在 `nextQuestion` 中，当 `mode !== 'review'` 时跳过 REVIEW 阶段直接结算；当 `mode === 'review'` 时保留原有逻辑。这样不需要删除任何方法。

- [ ] **Step 6: 修改 confirmAnswer 添加错题入复习队列**

在 `confirmAnswer` 方法（原第 230-257 行）中，答错时自动加入复习队列：

在 `sound.play('wrong');` 之后新增一行：

```js
      gameReview.addToReview(q.id);
```

这样答错的题目即时进入间隔复习队列，不需要等到 REVIEW 阶段。

- [ ] **Step 7: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(learn): add LEARN phase + simplify quiz flow in chapter.js"
```

---

### Task 3: 修改 chapter.wxml — 增加学习卡片 UI

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`

- [ ] **Step 1: 在 game-header 之后、Phase 1 Question 之前插入 LEARN 阶段 UI**

在第 17 行（game-header 结束）之后，第 19 行（Phase 1 Question 开始）之前，插入：

```xml
  <!-- ══════════ Phase 0: Learn Cards ══════════ -->
  <view class="learn-section" wx:if="{{showLearn && !showSettlement}}">
    
    <!-- Learn header -->
    <view class="learn-header">
      <text class="learn-title">📖 学习 · {{stageTitle}}</text>
      <view class="learn-progress-bar">
        <view class="learn-progress-fill" style="width:{{(learnCardIndex + 1) / learnCardTotal * 100}}%"></view>
      </view>
      <text class="learn-progress-text">{{learnCardIndex + 1}} / {{learnCardTotal}}</text>
    </view>

    <!-- Swiper cards -->
    <swiper 
      class="learn-swiper"
      current="{{learnCardIndex}}"
      bindchange="onLearnCardChange"
      duration="300"
      easing-function="easeOutCubic"
    >
      <swiper-item wx:for="{{learnCards}}" wx:key="id">
        <view class="learn-card">
          <text class="learn-card__icon">{{item.icon}}</text>
          <text class="learn-card__title">{{item.title}}</text>
          <text class="learn-card__content">{{item.content}}</text>
          <view class="learn-card__code" wx:if="{{item.code_example}}">
            <text class="learn-card__code-text font-mono">{{item.code_example}}</text>
          </view>
          <view class="learn-card__keypoint">
            <text class="learn-card__keypoint-text">💡 {{item.key_point}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <!-- Progress dots -->
    <view class="learn-dots">
      <view 
        wx:for="{{learnCards}}" 
        wx:key="id" 
        class="learn-dot {{learnCardIndex === index ? 'learn-dot--active' : ''}}"
        style="{{learnCardIndex === index ? 'background:' + regionColor : ''}}"
      ></view>
    </view>

    <!-- Action button -->
    <view class="learn-action">
      <view 
        class="btn-learn-next" 
        bindtap="{{learnCardIndex === learnCardTotal - 1 ? 'startQuizFromLearn' : ''}}"
        style="background:{{regionColor}}"
      >
        <text class="btn-learn-next__text">{{learnCardIndex === learnCardTotal - 1 ? '开始测验 →' : ''}}</text>
      </view>
    </view>
  </view>
```

- [ ] **Step 2: 清理 REVIEW 阶段 UI（可选保留供 review 模式用）**

保留第 70-95 行的 Review 阶段 UI，但将其 wx:if 条件改为仅在 review 模式下显示：

原：`wx:if="{{showReview && !showSettlement}}"`
改为：`wx:if="{{showReview && !showSettlement && reviewMode}}"`

这样常规闯关模式不会看到 REVIEW 页面。

- [ ] **Step 3: 更新 game-header 的文字**

将第 7 行 `← ESC` 改为 `← 返回`。
将第 9 行 phase-badge 的显示逻辑更新，在 LEARN 阶段显示 "LEARN" 而非空白。

把 game-header 的 wx:if 改为 `wx:if="{{!showSettlement && !showLearn}}"` —— 因为 LEARN 阶段有自己的 header。

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(learn): add knowledge card swiper UI in chapter.wxml"
```

---

### Task 4: 新增学习卡片样式

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`

- [ ] **Step 1: 在 chapter.wxss 末尾追加学习卡片样式**

追加以下样式到文件末尾：

```css
/* ══════════ LEARN Phase Styles ══════════ */
.learn-section {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--spacing-md);
  box-sizing: border-box;
}

.learn-header {
  padding: var(--spacing-sm) 0;
}

.learn-title {
  font-size: var(--font-lg);
  font-weight: 600;
  color: var(--color-text-primary);
}

.learn-progress-bar {
  margin-top: var(--spacing-sm);
  height: 8rpx;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.learn-progress-fill {
  height: 100%;
  border-radius: var(--radius-pill);
  background: var(--color-accent-blue);
  transition: width 0.3s ease-out;
}

.learn-progress-text {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  margin-top: var(--spacing-xs);
}

.learn-swiper {
  flex: 1;
  margin: var(--spacing-md) 0;
}

.learn-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl) var(--spacing-lg);
  margin: 0 var(--spacing-xs);
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
}

.learn-card__icon {
  font-size: 80rpx;
  text-align: center;
  margin-bottom: var(--spacing-md);
}

.learn-card__title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.learn-card__content {
  font-size: var(--font-base);
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

.learn-card__code {
  background: #1E293B;
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.learn-card__code-text {
  font-size: var(--font-sm);
  color: #E2E8F0;
  line-height: 1.6;
}

.learn-card__keypoint {
  margin-top: auto;
  background: #FEF3C7;
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}

.learn-card__keypoint-text {
  font-size: var(--font-sm);
  color: #92400E;
  line-height: 1.6;
}

/* Progress dots */
.learn-dots {
  display: flex;
  justify-content: center;
  gap: 12rpx;
  padding: var(--spacing-sm) 0;
}

.learn-dot {
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: var(--color-bg-muted);
  transition: all 0.3s ease;
}

.learn-dot--active {
  transform: scale(1.3);
}

/* Action button */
.learn-action {
  padding: var(--spacing-md) 0 var(--spacing-xl);
}

.btn-learn-next {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--radius-lg);
  text-align: center;
}

.btn-learn-next__text {
  color: #FFFFFF;
  font-size: var(--font-md);
  font-weight: 600;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(learn): add knowledge card swiper styles"
```

---

### Task 5: 验证 LEARN → QUIZ → SETTLE 完整流程

- [ ] **Step 1: 在微信开发者工具中测试常规闯关**

打开微信开发者工具，导航到：
```
/subpkg-chapters/pages/chapter/chapter?id=s01
```

验证：
1. 页面首先显示学习卡片（swiper），标题 "📖 学习 · {stage_title}"
2. 左右滑动可切换卡片，进度条和进度点联动
3. 滑到最后一张，按钮变为"开始测验 →"
4. 点击按钮进入 QUIZ 阶段，显示第一题
5. 答对/答错有反馈
6. 答完所有题直接进入结算（不出现 REVIEW 页面）

- [ ] **Step 2: 测试每日挑战和错题复习**

导航到 `?mode=daily`：
- 应跳过 LEARN 阶段，直接显示答题

导航到 `?mode=review`：
- 应跳过 LEARN 阶段，直接显示答题
- 如果无待复习题目，应提示并返回

- [ ] **Step 3: 测试占位卡片关卡**

导航到 `?id=s07`（非 CORE 区域）：
- 应显示一张"即将推出"占位卡片
- 点击按钮后正常进入 QUIZ

- [ ] **Step 4: 修复发现的问题并 Commit**

```bash
git add -A
git commit -m "fix(learn): address issues found in learn flow testing"
```
