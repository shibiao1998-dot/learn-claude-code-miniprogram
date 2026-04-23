# Phase 4b: 复习召回系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add spaced-repetition review system that auto-collects wrong answers and lets users revisit them from the home page.

**Architecture:** New `utils/game-review.js` module handles review queue with simplified Ebbinghaus intervals. Chapter page gains `mode=review` support. Home page gets a review entry button.

**Tech Stack:** Native WeChat miniprogram JS (CommonJS, no async/await, no optional chaining, no spread operator), WXML, WXSS with CSS variables.

**Constraints:**
- All `require()` paths must be compile-time literal strings
- Use `Object.assign({}, obj, patch)` instead of spread `{...obj}`
- All sizes in rpx units
- No npm dependencies

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `miniprogram/utils/game-review.js` | Review queue: add, get pending, complete, stats, remove |
| Modify | `miniprogram/utils/game-engine.js:138-158` | Replace simple ID push with `game-review.addToReview()` call in `saveStageResult()` |
| Modify | `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Add `mode=review` startup path + review settlement |
| Modify | `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Review-specific settlement UI |
| Modify | `miniprogram/pages/home/home.js` | Add review stats to `_refreshGameState()` + navigation |
| Modify | `miniprogram/pages/home/home.wxml` | Review entry button in action row |
| Modify | `miniprogram/pages/home/home.wxss` | Review button styles |

---

### Task 1: Create `utils/game-review.js` Module

**Files:**
- Create: `miniprogram/utils/game-review.js`

- [ ] **Step 1: Create the review module**

Create `miniprogram/utils/game-review.js` with the following complete code:

```js
// utils/game-review.js
var gameSave = require('./game-save');

var INTERVALS = [1, 2, 4];
var DAY_MS = 86400000;

function addToReview(questionId, stageId) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) data.review = [];
    for (var i = 0; i < data.review.length; i++) {
      if (data.review[i].questionId === questionId) return;
    }
    var now = Date.now();
    data.review.push({
      questionId: questionId,
      stageId: stageId,
      addedAt: now,
      nextReviewAt: now + DAY_MS,
      reviewCount: 0,
      lastCorrect: false
    });
  });
}

function getReviewQueue() {
  var data = gameSave.load();
  if (!Array.isArray(data.review)) return [];
  var now = Date.now();
  return data.review.filter(function(item) {
    return typeof item === 'object' && item.nextReviewAt <= now;
  });
}

function completeReview(questionId, correct) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) return;
    for (var i = 0; i < data.review.length; i++) {
      var item = data.review[i];
      if (item.questionId === questionId) {
        if (correct) {
          item.reviewCount++;
          item.lastCorrect = true;
          if (item.reviewCount >= INTERVALS.length) {
            data.review.splice(i, 1);
          } else {
            item.nextReviewAt = Date.now() + INTERVALS[item.reviewCount] * DAY_MS;
          }
        } else {
          item.reviewCount = 0;
          item.lastCorrect = false;
          item.nextReviewAt = Date.now() + INTERVALS[0] * DAY_MS;
        }
        return;
      }
    }
  });
}

function getReviewStats() {
  var data = gameSave.load();
  if (!Array.isArray(data.review)) return { total: 0, pending: 0 };
  var now = Date.now();
  var pending = 0;
  var items = data.review;
  for (var i = 0; i < items.length; i++) {
    if (typeof items[i] === 'object' && items[i].nextReviewAt <= now) {
      pending++;
    }
  }
  return { total: items.length, pending: pending };
}

function removeFromReview(questionId) {
  gameSave.update(function(data) {
    if (!Array.isArray(data.review)) return;
    for (var i = 0; i < data.review.length; i++) {
      if (data.review[i].questionId === questionId) {
        data.review.splice(i, 1);
        return;
      }
    }
  });
}

module.exports = {
  addToReview: addToReview,
  getReviewQueue: getReviewQueue,
  completeReview: completeReview,
  getReviewStats: getReviewStats,
  removeFromReview: removeFromReview
};
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/utils/game-review.js
git commit -m "feat: add game-review.js spaced-repetition review module"
```

---

### Task 2: Wire `game-engine.js` to Use `game-review.js` for Error Collection

**Files:**
- Modify: `miniprogram/utils/game-engine.js` (lines 1-2 for import, lines 138-158 for `saveStageResult`)

Currently `saveStageResult()` pushes bare question ID strings into `data.review`. We need to replace this with proper `game-review.addToReview()` calls that create structured review records.

- [ ] **Step 1: Add import at top of game-engine.js**

At line 2 of `miniprogram/utils/game-engine.js`, after `var gameSave = require('./game-save');`, add:

```js
var gameReview = require('./game-review');
```

- [ ] **Step 2: Replace review logic in `saveStageResult()`**

In `miniprogram/utils/game-engine.js`, the `saveStageResult` function currently has this block (around lines 150-156):

```js
    result.reviewIds.forEach(function(qId) {
      if (data.review.indexOf(qId) === -1) {
        data.review.push(qId);
      }
    });
```

Replace that entire block with just a comment marker — the review collection now happens outside the `update()` callback. The full replacement for the `saveStageResult` function should be:

```js
function saveStageResult(result) {
  gameSave.update(function(data) {
    var prev = data.stages[result.stageId];
    if (!prev || result.stars > prev.stars) {
      data.stages[result.stageId] = {
        stars: result.stars,
        bestScore: result.correctCount,
        attempts: prev ? prev.attempts + 1 : 1
      };
    } else {
      data.stages[result.stageId].attempts = (prev.attempts || 0) + 1;
    }
  });

  result.reviewIds.forEach(function(qId) {
    gameReview.addToReview(qId, result.stageId);
  });

  gameSave.addExp(result.expReward);
}
```

Key change: moved `reviewIds` processing outside `gameSave.update()` and now calls `gameReview.addToReview()` which creates proper structured records with spaced-repetition fields.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-engine.js
git commit -m "refactor: wire game-engine to use game-review for error collection"
```

---

### Task 3: Add Review Mode to `chapter.js`

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`

The chapter page needs to handle `mode=review`: load questions from the review queue, run them through the standard answer flow (but simplified — no Phase 2/3, just straight through), then show a review-specific settlement.

- [ ] **Step 1: Add game-review import**

At the top of `miniprogram/subpkg-chapters/pages/chapter/chapter.js`, after line 6 (`var gameSave = require('../../../utils/game-save');`), add:

```js
var gameReview = require('../../../utils/game-review');
```

- [ ] **Step 2: Add review data fields to Page data**

In the `data: { ... }` object, after the `animStep: 0` line, add:

```js
    reviewMode: false,
    reviewMastered: 0,
    reviewRemaining: 0,
```

- [ ] **Step 3: Add review mode branch in `onLoad`**

In the `onLoad` function, the current code is:

```js
  onLoad: function(options) {
    var locale = i18n.getLocale();
    this.setData({ locale: locale });

    if (options.mode === 'daily') {
      this._startDaily(locale);
    } else {
      var chapterId = options.id || 's01';
      this._startStage(chapterId, locale);
    }
  },
```

Replace with:

```js
  onLoad: function(options) {
    var locale = i18n.getLocale();
    this.setData({ locale: locale });

    if (options.mode === 'review') {
      this._startReview(locale);
    } else if (options.mode === 'daily') {
      this._startDaily(locale);
    } else {
      var chapterId = options.id || 's01';
      this._startStage(chapterId, locale);
    }
  },
```

- [ ] **Step 4: Add `_startReview` method**

Add this new method after the `_startDaily` method (after the closing `},` of `_startDaily`):

```js
  _startReview: function(locale) {
    var queue = gameReview.getReviewQueue();
    if (!queue || queue.length === 0) {
      wx.showToast({ title: '暂无待复习题目', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var stageData = require('../../data/game-stages');
    var allStages = stageData.stages;

    var questions = [];
    for (var i = 0; i < queue.length; i++) {
      var qId = queue[i].questionId;
      var found = false;
      for (var s = 0; s < allStages.length; s++) {
        var qs = allStages[s].questions;
        for (var q = 0; q < qs.length; q++) {
          if (qs[q].id === qId) {
            questions.push(qs[q]);
            found = true;
            break;
          }
        }
        if (found) break;
      }
    }

    if (questions.length === 0) {
      wx.showToast({ title: '题目数据加载失败', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var fakeReviewStage = {
      id: 'stage_review',
      chapter: 'review',
      region: 'core',
      questions: questions,
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: []
    };

    this._session = gameEngine.createSession(fakeReviewStage);

    var firstQ = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'review',
      reviewMode: true,
      stageTitle: '错题复习',
      regionLabel: 'REVIEW/',
      regionColor: '#D29922',
      phase: 1,
      phaseLabel: 'REVIEW',
      currentQuestion: this._formatQuestion(firstQ, locale),
      questionIndex: 1,
      totalQuestions: questions.length,
      progressPercent: Math.round(1 / questions.length * 100)
    });
  },
```

- [ ] **Step 5: Modify `_showSettlement` for review mode**

In the `_showSettlement` method, the current code block starting with `if (this.data.mode === 'daily')` needs to also handle review mode. Find this section:

```js
    if (this.data.mode === 'daily') {
      gameDaily.completeDailyChallenge(result.correctCount);
    } else {
      gameEngine.saveStageResult(result);
      if (result.earnedCards.length > 0) {
        gameCards.obtainCards(result.earnedCards);
      }
    }
```

Replace with:

```js
    if (this.data.mode === 'review') {
      var session = this._session;
      var mastered = 0;
      for (var i = 0; i < session.questions.length; i++) {
        var qId = session.questions[i].id;
        var ans = session.answers[qId];
        var correct = ans && ans.correct;
        gameReview.completeReview(qId, correct);
        if (correct) mastered++;
      }
      gameSave.addExp(result.correctCount * 10);
      var reviewStats = gameReview.getReviewStats();
      this.setData({
        reviewMastered: mastered,
        reviewRemaining: reviewStats.pending
      });
    } else if (this.data.mode === 'daily') {
      gameDaily.completeDailyChallenge(result.correctCount);
    } else {
      gameEngine.saveStageResult(result);
      if (result.earnedCards.length > 0) {
        gameCards.obtainCards(result.earnedCards);
      }
    }
```

- [ ] **Step 6: Modify `nextQuestion` to skip Phase 2/3 in review mode**

In the `nextQuestion` method, add a review-mode shortcut at the very beginning (after the first line `var session = this._session;`):

Find this code at the start of `nextQuestion`:

```js
  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    if (session.phase === 2 && this.data.phase === 1) {
```

Replace with:

```js
  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    if (this.data.reviewMode && session.phase === 2) {
      session.finished = true;
      this._showSettlement();
      return;
    }

    if (session.phase === 2 && this.data.phase === 1) {
```

- [ ] **Step 7: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat: add review mode to chapter page with spaced-repetition"
```

---

### Task 4: Add Review Settlement UI to `chapter.wxml`

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`

- [ ] **Step 1: Add review-specific settlement content**

In `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`, find the EXP block in the settlement section (around line 120-123):

```xml
      <!-- EXP gained -->
      <view class="settle-exp {{animStep >= 7 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}">
        <text class="settle-exp__label font-mono">EXP +</text>
        <text class="settle-exp__value font-mono" style="color:{{regionColor}}">{{result.expReward}}</text>
      </view>
```

Replace with:

```xml
      <!-- EXP gained -->
      <view class="settle-exp {{animStep >= 7 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}">
        <text class="settle-exp__label font-mono">EXP +</text>
        <text class="settle-exp__value font-mono" style="color:{{regionColor}}">{{reviewMode ? result.correctCount * 10 : result.expReward}}</text>
      </view>

      <!-- Review mode stats -->
      <view class="settle-review {{animStep >= 8 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}" wx:if="{{reviewMode}}">
        <text class="settle-review__text font-mono">MASTERED: {{reviewMastered}} · REMAINING: {{reviewRemaining}}</text>
      </view>
```

- [ ] **Step 2: Modify action buttons for review mode**

Find the action buttons section (around line 143-150):

```xml
      <!-- Action buttons (show after all animations) -->
      <view class="settle-actions {{animStep >= 7 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <view class="btn-settle btn-settle--retry" bindtap="retryStage">
          <text class="btn-settle__text font-mono">> RETRY</text>
        </view>
        <view class="btn-settle btn-settle--map" bindtap="goToMap">
          <text class="btn-settle__text font-mono">> MAP</text>
        </view>
      </view>
```

Replace with:

```xml
      <!-- Action buttons (show after all animations) -->
      <view class="settle-actions {{animStep >= 7 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <view class="btn-settle btn-settle--retry" bindtap="retryStage" wx:if="{{!reviewMode}}">
          <text class="btn-settle__text font-mono">> RETRY</text>
        </view>
        <view class="btn-settle btn-settle--map" bindtap="goToMap">
          <text class="btn-settle__text font-mono">> {{reviewMode ? 'HOME' : 'MAP'}}</text>
        </view>
      </view>
```

- [ ] **Step 3: Modify settlement header for review mode**

Find the settlement header (around line 102-105):

```xml
      <view class="settle-header {{animStep >= 1 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <text class="settle-title font-mono" style="color:{{regionColor}}">STAGE CLEAR</text>
        <text class="settle-stage">{{stageTitle}}</text>
      </view>
```

Replace with:

```xml
      <view class="settle-header {{animStep >= 1 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <text class="settle-title font-mono" style="color:{{regionColor}}">{{reviewMode ? 'REVIEW DONE' : 'STAGE CLEAR'}}</text>
        <text class="settle-stage">{{stageTitle}}</text>
      </view>
```

- [ ] **Step 4: Hide stars and cards for review mode**

Find the stars section (around line 108-112):

```xml
      <!-- Stars -->
      <view class="settle-stars {{animStep >= 2 ? '' : 'settle-anim-hidden'}}">
```

Add `wx:if="{{!reviewMode}}"` to it:

```xml
      <!-- Stars -->
      <view class="settle-stars {{animStep >= 2 ? '' : 'settle-anim-hidden'}}" wx:if="{{!reviewMode}}">
```

Find the earned cards section (around line 131):

```xml
      <!-- Earned cards -->
      <view class="settle-cards" wx:if="{{earnedCardDetails.length > 0}}">
```

Change to:

```xml
      <!-- Earned cards -->
      <view class="settle-cards" wx:if="{{earnedCardDetails.length > 0 && !reviewMode}}">
```

Also find the level-up notification:

```xml
      <view class="settle-levelup {{animStep >= 8 ? 'settle-anim-pulse' : 'settle-anim-hidden'}}" wx:if="{{newLevel}}">
```

Change to:

```xml
      <view class="settle-levelup {{animStep >= 8 ? 'settle-anim-pulse' : 'settle-anim-hidden'}}" wx:if="{{newLevel && !reviewMode}}">
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat: add review mode settlement UI to chapter page"
```

---

### Task 5: Add Review Entry to Home Page

**Files:**
- Modify: `miniprogram/pages/home/home.js`
- Modify: `miniprogram/pages/home/home.wxml`
- Modify: `miniprogram/pages/home/home.wxss`

- [ ] **Step 1: Add game-review import to home.js**

At the top of `miniprogram/pages/home/home.js`, after line 8 (`var gameAchievement = require('../../utils/game-achievement');`), add:

```js
var gameReview = require('../../utils/game-review');
```

- [ ] **Step 2: Add reviewStats to Page data**

In the `data: { ... }` object in home.js, after the `nextRegionLabel: '',` line, add:

```js
    reviewStats: { total: 0, pending: 0 },
```

- [ ] **Step 3: Add review stats to `_refreshGameState()`**

In `_refreshGameState()`, before the final `this.setData({` call (around line 129), add:

```js
    var reviewStats = gameReview.getReviewStats();
```

Then add `reviewStats: reviewStats,` to the `setData` call, after the `nextRegionLabel: nextRegionLabel` line:

```js
    this.setData({
      levelInfo: levelInfo,
      streakInfo: streakInfo,
      collectionStats: collectionStats,
      dailyState: dailyState,
      regions: regions,
      totalProgress: totalProgress,
      recentCards: recentCards,
      nextStageId: nextStageId,
      nextRegionLabel: nextRegionLabel,
      reviewStats: reviewStats
    });
```

- [ ] **Step 4: Add review navigation method**

After the `goToContinue` method in home.js, add:

```js
  goToReview: function() {
    wx.navigateTo({
      url: '/subpkg-chapters/pages/chapter/chapter?mode=review'
    });
  },
```

- [ ] **Step 5: Add review button to home.wxml**

In `miniprogram/pages/home/home.wxml`, after the closing `</view>` of the `action-row` section (line 56), add a new review section:

```xml
  <!-- Review Entry -->
  <view class="review-entry" wx:if="{{reviewStats.pending > 0}}" bindtap="goToReview">
    <view class="review-entry__left">
      <text class="review-entry__icon font-mono">?!</text>
      <view class="review-entry__info">
        <text class="review-entry__title">错题复习</text>
        <text class="review-entry__desc font-mono">{{reviewStats.pending}} 题待复习 · 10exp/题</text>
      </view>
    </view>
    <text class="review-entry__arrow font-mono">></text>
  </view>
```

- [ ] **Step 6: Add review entry styles to home.wxss**

Append these styles to `miniprogram/pages/home/home.wxss`:

```css
/* --- Review Entry --- */
.review-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-terminal-orange);
  border-radius: var(--radius-md);
  padding: var(--spacing-md) var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.review-entry:active {
  background: var(--color-bg-elevated);
}

.review-entry__left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.review-entry__icon {
  font-size: var(--font-xl);
  color: var(--color-terminal-orange);
  font-weight: 700;
}

.review-entry__info {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
}

.review-entry__title {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
}

.review-entry__desc {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

.review-entry__arrow {
  font-size: var(--font-md);
  color: var(--color-terminal-orange);
}
```

- [ ] **Step 7: Add review settlement style to chapter.wxss**

Append this style to `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`:

```css
/* Review settlement stats */
.settle-review {
  text-align: center;
  padding: var(--spacing-sm) 0;
}

.settle-review__text {
  font-size: var(--font-sm);
  color: var(--color-terminal-orange);
}
```

- [ ] **Step 8: Commit**

```bash
git add miniprogram/pages/home/home.js miniprogram/pages/home/home.wxml miniprogram/pages/home/home.wxss miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat: add review entry on home page and review settlement styles"
```
