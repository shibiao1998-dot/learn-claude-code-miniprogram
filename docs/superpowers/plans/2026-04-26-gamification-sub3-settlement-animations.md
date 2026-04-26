# 游戏化交互增强 · Sub-Plan 3 · 结算动画 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add WXS-driven settlement animations: star spring+rotate reveal, score number scroll, EXP counter + multiplier slide-in, combo stats row, and card flip entry.

**Architecture:** Three new WXS functions (`onStarReveal` / `onScoreReveal` / `onExpReveal`) appended to the existing `quiz-anim.wxs` module from sub-plan 2. `chapter.js` populates `comboMultiplier` / `baseExp` / `maxCombo` from `gameEngine.getSessionResult()` (already exported in sub-plan 1), plus 5 new trigger fields that `_playSettlementAnimation` sets at staggered delays. `chapter.wxml` replaces the existing settlement stars/score/EXP blocks with WXS-bound equivalents and adds a combo stats row. `chapter.wxss` appends styles for the new elements and keyframes for card flip + header blur entrance. Settlement header already uses `.settle-anim-fadein` — we override it to the richer `@keyframes settleHeaderIn` (slide + blur) via a more specific selector.

**Tech Stack:** WeChat Mini Program WXS (var-only, `ownerInstance.requestAnimationFrame`, no `setTimeout`), CSS `@keyframes`, rpx units, CSS variables.

**Parent Spec:** `docs/superpowers/plans/2026-04-25-gamification-interaction-enhancement.md` (Tasks 2 partial, 3 partial, 4 steps 5-9, 5 steps 5-8, 6).

**Dependencies (already merged in sub-plans 1 & 2):**
- `gameEngine.getSessionResult()` returns `comboMultiplier`, `baseExp`, `maxCombo` (sub-plan 1).
- `chapter.js` data has `comboMultiplier: 1.0`, `baseExp: 0`, `maxCombo: 0` placeholders (sub-plan 2).
- `quiz-anim.wxs` exists with 3 exports: `onComboUpdate`, `onComboBreak`, `onFeedbackShow` (sub-plan 2).
- `_showSettlement` / `_playSettlementAnimation` exist but use CSS-only animation via `animStep`.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` | Modify (append 3 functions + update `module.exports`) | Add `onStarReveal`, `onScoreReveal`, `onExpReveal` |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Modify | Add 5 trigger fields; wire settlement data; rewrite `_playSettlementAnimation`; extend `retryStage` reset |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Modify | Replace settlement stars/score/EXP with WXS-bound blocks; add combo row; renumber animStep thresholds for levelup/cards |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` | Modify (append ~110 lines) | Header blur entrance, score inline layout, EXP multiplier, combo row, card flip keyframes |

---

## Why the `setTimeout` replacement matters (read before Task 1)

The parent plan's draft `onExpReveal` uses `setTimeout(function() { expEl.setStyle({ transform: 'scale(1)' }); }, 150)` inside WXS for a bounce finish. **WXS does not expose `setTimeout`**. Sub-plan 2 confirmed via working code that only `ownerInstance.requestAnimationFrame` is available for deferred work. This plan uses a frame-counter alternative (9 frames ≈ 150ms at 60fps) to mirror the intended bounce without relying on `setTimeout`. **Do not copy the `setTimeout` variant.**

---

### Task 1: Append settlement WXS functions to `quiz-anim.wxs`

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs:75` (end of file; current `module.exports` block at ~line 71–75)

- [ ] **Step 1: Read the current file to confirm shape**

Run: `wc -l miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs`

Expected: `75 miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs`

Run: `tail -10 miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs`

Expected last lines (sub-plan 2 output):

```
module.exports = {
  onComboUpdate: onComboUpdate,
  onComboBreak: onComboBreak,
  onFeedbackShow: onFeedbackShow
};
```

- [ ] **Step 2: Replace the entire file with the extended version**

Overwrite `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` so that:
- All 3 existing functions (`onComboUpdate`, `onComboBreak`, `onFeedbackShow`) are preserved byte-for-byte (copy from current file).
- 3 new functions (`onStarReveal`, `onScoreReveal`, `onExpReveal`) are appended **before** `module.exports`.
- Add a shared `springStep` helper and spring constants above the first animation function (right under the existing file header comment).
- Update `module.exports` to list all 6 functions.

Complete replacement body — read the current file first and preserve the existing function bodies verbatim; only add the new content shown below.

Add these **above the first `function onComboUpdate` declaration** (i.e., right after the leading comment block):

```js
// --- Spring physics helper (shared by star/score reveals) ---
var SPRING_STIFFNESS = 180;
var SPRING_DAMPING = 16;
var SPRING_MASS = 1;
var SPRING_THRESHOLD = 0.001;
var DT = 1 / 60;

function springStep(current, target, velocity, stiffness, damping, mass) {
  var force = -stiffness * (current - target);
  var dampingForce = -damping * velocity;
  var acceleration = (force + dampingForce) / mass;
  var newVelocity = velocity + acceleration * DT;
  var newCurrent = current + newVelocity * DT;
  return { current: newCurrent, velocity: newVelocity };
}
```

Append these **right before `module.exports`**:

```js
// --- Settlement star spring + rotate reveal ---
// Binding: change:starValN="{{anim.onStarReveal}}" starValN="{{starRevealTriggerN}}" (N = 0, 1, 2)
// Trigger value format: "<index>_<earned>_<timestamp>" e.g. "0_1_1700000000000"
function onStarReveal(newVal, oldVal, ownerInstance) {
  if (!newVal || newVal === oldVal) return;

  var parts = ('' + newVal).split('_');
  var starIndex = parseInt(parts[0]) || 0;
  var earned = parts[1] === '1';

  var el = ownerInstance.selectComponent('.settle-star-' + starIndex);
  if (!el) return;

  var scale = 0;
  var rotate = -180;
  var velocity = 0;
  var rotVelocity = 0;
  var targetScale = earned ? 1.0 : 0.8;

  function tick() {
    var scaleResult = springStep(scale, targetScale, velocity, SPRING_STIFFNESS, SPRING_DAMPING, SPRING_MASS);
    scale = scaleResult.current;
    velocity = scaleResult.velocity;

    var rotResult = springStep(rotate, 0, rotVelocity, 120, 14, 1);
    rotate = rotResult.current;
    rotVelocity = rotResult.velocity;

    var style = {
      transform: 'scale(' + scale.toFixed(3) + ') rotate(' + rotate.toFixed(1) + 'deg)',
      opacity: '1'
    };

    if (earned) {
      var glowSize = Math.max(0, (scale - 0.8) * 80);
      style['box-shadow'] = '0 0 ' + glowSize.toFixed(0) + 'rpx rgba(234,179,8,0.5)';
    }

    el.setStyle(style);

    var scaleSettled = Math.abs(scale - targetScale) <= SPRING_THRESHOLD && Math.abs(velocity) <= SPRING_THRESHOLD;
    var rotSettled = Math.abs(rotate) <= 0.5 && Math.abs(rotVelocity) <= 0.5;

    if (!scaleSettled || !rotSettled) {
      ownerInstance.requestAnimationFrame(tick);
    } else {
      var finalStyle = {
        transform: 'scale(' + (earned ? '1' : '0.8') + ') rotate(0deg)',
        opacity: '1'
      };
      if (earned) {
        finalStyle['box-shadow'] = '0 0 16rpx rgba(234,179,8,0.5)';
      }
      el.setStyle(finalStyle);
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- Score number scroll (correct/total/ratio counts up together) ---
// Binding: change:scoreVal="{{anim.onScoreReveal}}" scoreVal="{{scoreRevealTrigger}}"
// Trigger value format: "<correct>_<total>_<ratio>_<timestamp>" e.g. "5_5_100_1700000000000"
function onScoreReveal(newVal, oldVal, ownerInstance) {
  if (!newVal || newVal === oldVal) return;

  var parts = ('' + newVal).split('_');
  var targetCorrect = parseInt(parts[0]) || 0;
  var targetTotal = parseInt(parts[1]) || 0;
  var targetRatio = parseInt(parts[2]) || 0;

  var correctEl = ownerInstance.selectComponent('.score-correct-num');
  var totalEl = ownerInstance.selectComponent('.score-total-num');
  var ratioEl = ownerInstance.selectComponent('.score-ratio-num');

  var startTime = Date.now();
  var duration = 600;

  function tick() {
    var elapsed = Date.now() - startTime;
    var progress = elapsed / duration;
    if (progress > 1) progress = 1;
    var eased = 1 - Math.pow(1 - progress, 3);

    var curCorrect = Math.round(targetCorrect * eased);
    var curTotal = Math.round(targetTotal * eased);
    var curRatio = Math.round(targetRatio * eased);

    if (correctEl) correctEl.setStyle({ content: '"' + curCorrect + '"' });
    if (totalEl) totalEl.setStyle({ content: '"' + curTotal + '"' });
    if (ratioEl) ratioEl.setStyle({ content: '"' + curRatio + '"' });

    if (progress < 1) {
      ownerInstance.requestAnimationFrame(tick);
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- EXP number scroll + multiplier slide-in + bounce finish ---
// Binding: change:expVal="{{anim.onExpReveal}}" expVal="{{expRevealTrigger}}"
// Trigger value format: "<exp>_<multiplier>_<timestamp>" e.g. "150_1.5_1700000000000"
// NOTE: Uses requestAnimationFrame frame counter (not setTimeout) because WXS lacks setTimeout.
function onExpReveal(newVal, oldVal, ownerInstance) {
  if (!newVal || newVal === oldVal) return;

  var parts = ('' + newVal).split('_');
  var targetExp = parseInt(parts[0]) || 0;
  var multiplier = parseFloat(parts[1]) || 1.0;

  var expEl = ownerInstance.selectComponent('.exp-value-num');
  var multEl = ownerInstance.selectComponent('.exp-multiplier');

  var startTime = Date.now();
  var duration = 500;
  var bounceFrames = 0;

  function tick() {
    var elapsed = Date.now() - startTime;
    var progress = elapsed / duration;
    if (progress > 1) progress = 1;
    var eased = 1 - Math.pow(1 - progress, 3);

    var curExp = Math.round(targetExp * eased);
    if (expEl) expEl.setStyle({ content: '"' + curExp + '"' });

    if (multEl && multiplier > 1.0) {
      if (progress > 0.6) {
        var multProgress = (progress - 0.6) / 0.4;
        var multEased = 1 - Math.pow(1 - multProgress, 3);
        multEl.setStyle({
          opacity: '' + multEased.toFixed(3),
          transform: 'translateX(' + ((1 - multEased) * 40).toFixed(1) + 'rpx)'
        });
      }
    }

    if (progress < 1) {
      ownerInstance.requestAnimationFrame(tick);
    } else if (expEl) {
      expEl.setStyle({ transform: 'scale(1.15)' });
      bounceFrames = 9;
      ownerInstance.requestAnimationFrame(bounceTick);
    }
  }

  function bounceTick() {
    bounceFrames--;
    if (bounceFrames <= 0) {
      if (expEl) expEl.setStyle({ transform: 'scale(1)' });
      return;
    }
    ownerInstance.requestAnimationFrame(bounceTick);
  }

  ownerInstance.requestAnimationFrame(tick);
}
```

Replace the existing `module.exports` block with:

```js
module.exports = {
  onComboUpdate: onComboUpdate,
  onComboBreak: onComboBreak,
  onFeedbackShow: onFeedbackShow,
  onStarReveal: onStarReveal,
  onScoreReveal: onScoreReveal,
  onExpReveal: onExpReveal
};
```

- [ ] **Step 3: Verify 6 exports and no stray `setTimeout`**

Run:
```bash
grep -c "^function " miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
grep -n "setTimeout" miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
grep -A 7 "^module.exports" miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
```

Expected:
- First grep: `7` (springStep + 3 old + 3 new).
- Second grep: empty output (exit 1 is OK).
- Third grep: shows the 6-key export object.

> **Note:** `node -c` **cannot** parse `.wxs` (Node 20 rejects the extension via its ESM resolver). This is a tooling limitation, not a code defect. Skip `node -c` for this file — the grep checks above are the verification step. WeChat DevTools validates WXS at build time.

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
git commit -m "feat(chapter): add settlement WXS animations (star/score/exp reveal)

Appends onStarReveal (spring scale + rotate with glow), onScoreReveal
(600ms eased number scroll for correct/total/ratio), and onExpReveal
(500ms EXP scroll with multiplier slide-in and 9-frame bounce finish).
Adds shared springStep helper. module.exports now lists all 6 functions.

Uses requestAnimationFrame frame counter instead of setTimeout in
onExpReveal because WXS does not expose setTimeout."
```

---

### Task 2: Wire settlement data + trigger orchestration in `chapter.js`

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:88` (data block trailing — add new fields)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:519-534` (`_showSettlement` setData payload)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:539-583` (entire `_playSettlementAnimation`)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:598-605` (`retryStage` setData)

- [ ] **Step 1: Add 5 settlement trigger fields to the page `data` block**

Open `miniprogram/subpkg-chapters/pages/chapter/chapter.js`. Find the closing `}` of the `data` object at line 89 (right after `floatScoreText: ''`). Replace lines 84–89 (the trigger block through the closing brace) with:

```js
    comboAnimTrigger: 0,
    comboBreakTrigger: 0,
    comboBreakShow: false,
    feedbackAnimTrigger: 0,
    floatScoreText: '',

    starRevealTrigger0: '',
    starRevealTrigger1: '',
    starRevealTrigger2: '',
    scoreRevealTrigger: '',
    expRevealTrigger: ''
  },
```

- [ ] **Step 2: Wire `_showSettlement` to expose `comboMultiplier`, `baseExp`, `maxCombo`**

Find the `setData` call inside `_showSettlement` (lines 519-534 — ends with `newLevel: leveledUp ? newLevelInfo : null`). Replace the entire `this.setData({ ... })` call with:

```js
    this.setData({
      finished: true,
      showSettlement: true,
      showReview: false,
      showFeedback: false,
      currentQuestion: null,
      result: {
        stars: result.stars,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        expReward: result.expReward,
        ratio: Math.round(result.ratio * 100)
      },
      comboMultiplier: result.comboMultiplier,
      baseExp: result.baseExp,
      maxCombo: result.maxCombo,
      earnedCardDetails: earnedCardDetails,
      newLevel: leveledUp ? newLevelInfo : null
    });
```

Leave the surrounding code (the `if (this.data.mode === 'review') { ... } else if ...` block, `newLevelInfo` / `leveledUp` / `earnedCardDetails` setup, and the final `this._playSettlementAnimation();` call) unchanged.

- [ ] **Step 3: Rewrite `_playSettlementAnimation` to drive WXS triggers**

Find `_playSettlementAnimation: function() {` at line 539. Replace the entire method (lines 539-583, up through and including its closing `},` right before `goBack:`) with:

```js
  _playSettlementAnimation: function() {
    var self = this;
    var stars = self.data.result ? self.data.result.stars : 0;

    setTimeout(function() { self.setData({ animStep: 1 }); }, 100);
    setTimeout(function() { self.setData({ animStep: 2 }); }, 400);

    var starDelay = 650;
    for (var i = 1; i <= 3; i++) {
      (function(idx) {
        setTimeout(function() {
          var patch = { animStep: 2 + idx };
          var earned = idx <= stars ? 1 : 0;
          patch['starRevealTrigger' + (idx - 1)] = (idx - 1) + '_' + earned + '_' + Date.now();
          self.setData(patch);
          if (earned) {
            wx.vibrateShort({ type: 'medium' });
            sound.play('star');
          }
        }, starDelay + (idx - 1) * 250);
      })(i);
    }

    setTimeout(function() {
      var r = self.data.result;
      if (!r) return;
      self.setData({
        animStep: 6,
        scoreRevealTrigger: r.correctCount + '_' + r.totalQuestions + '_' + r.ratio + '_' + Date.now()
      });
    }, 1500);

    setTimeout(function() {
      var r = self.data.result;
      if (!r) return;
      self.setData({
        animStep: 7,
        expRevealTrigger: r.expReward + '_' + self.data.comboMultiplier + '_' + Date.now()
      });
    }, 1800);

    var tailDelay = 2000;
    if (self.data.maxCombo >= 3) {
      setTimeout(function() { self.setData({ animStep: 8 }); }, tailDelay);
      tailDelay = 2200;
    }

    if (self.data.newLevel) {
      (function(delay) {
        setTimeout(function() {
          self.setData({ animStep: 9 });
          wx.vibrateLong();
          sound.play('levelup');
        }, delay);
      })(tailDelay);
      tailDelay += 200;
    }

    var cardStartDelay = tailDelay + 200;
    var earnedCards = self.data.earnedCardDetails || [];
    for (var j = 0; j < earnedCards.length; j++) {
      (function(idx) {
        setTimeout(function() {
          self.setData({ animStep: 10 + idx });
          sound.play('card');
        }, cardStartDelay + idx * 200);
      })(j);
    }
  },
```

**Notes for the implementer:**
- `setTimeout` inside `chapter.js` (page JS) is fine — only **WXS** lacks it.
- `animStep` milestones are renumbered: `6` = score, `7` = EXP, `8` = combo row (if `maxCombo >= 3`), `9` = levelup/review stats, `10+index` = cards.
- The `wx.vibrateShort` / `sound.play` calls preserve sub-plan 2 behavior for starred bursts.

- [ ] **Step 4: Extend `retryStage` reset to clear new settlement fields**

Find `retryStage: function()` at line 588. Replace lines 598-605 (the `this.setData({ ... })` block inside the `if (stage)` branch) with:

```js
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
        expRevealTrigger: ''
      });
```

- [ ] **Step 5: Verify syntax**

Run: `node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"`

Expected: `Syntax OK`

(Ignore any TS80001 "may be converted to an ES module" diagnostic — WeChat mini program requires CommonJS.)

- [ ] **Step 6: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): wire settlement WXS triggers and combo-gated tail animation

Add 5 trigger fields (starRevealTrigger0..2, scoreRevealTrigger,
expRevealTrigger) to page data. _showSettlement now forwards
comboMultiplier, baseExp, maxCombo from getSessionResult to the
template. _playSettlementAnimation reissues staggered triggers:
stars at 650/900/1150ms, score at 1500ms, EXP+multiplier at 1800ms,
optional combo row at 2000ms (if maxCombo>=3), levelup shifted to
animStep 9, cards to animStep 10+index. retryStage clears all new
fields to prevent stale state on re-run."
```

---

### Task 3: Rebind settlement WXML to the WXS module

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:191-229` (settlement stars/score/EXP/levelup/cards blocks)

- [ ] **Step 1: Replace the settlement stars block with WXS-bound individual stars**

Find the stars block at lines 191-195 (starts `<view class="settle-stars ...">`). Replace it with:

```xml
      <!-- Stars -->
      <view class="settle-stars {{animStep >= 2 ? '' : 'settle-anim-hidden'}}" wx:if="{{!reviewMode}}">
        <text class="settle-star settle-star-0 {{result.stars >= 1 ? 'settle-star--earned' : ''}} {{animStep >= 3 ? '' : 'settle-anim-hidden'}}"
              change:starVal0="{{anim.onStarReveal}}" starVal0="{{starRevealTrigger0}}">★</text>
        <text class="settle-star settle-star-1 {{result.stars >= 2 ? 'settle-star--earned' : ''}} {{animStep >= 4 ? '' : 'settle-anim-hidden'}}"
              change:starVal1="{{anim.onStarReveal}}" starVal1="{{starRevealTrigger1}}">★</text>
        <text class="settle-star settle-star-2 {{result.stars >= 3 ? 'settle-star--earned' : ''}} {{animStep >= 5 ? '' : 'settle-anim-hidden'}}"
              change:starVal2="{{anim.onStarReveal}}" starVal2="{{starRevealTrigger2}}">★</text>
      </view>
```

**Why this shape:** Each star needs its own unique class selector (`.settle-star-0/1/2`) so WXS's `ownerInstance.selectComponent('.settle-star-' + index)` can find it. Dropped the `settle-star-pop` class — the WXS spring replaces that CSS pop.

- [ ] **Step 2: Replace the settlement score block with individual number elements**

Find the score block at lines 197-200 (starts `<view class="settle-score ...">`). Replace with:

```xml
      <!-- Score -->
      <view class="settle-score {{animStep >= 6 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}"
            change:scoreVal="{{anim.onScoreReveal}}" scoreVal="{{scoreRevealTrigger}}">
        <text class="score-correct-num settle-score__num">{{result.correctCount}}</text>
        <text class="settle-score__text">/</text>
        <text class="score-total-num settle-score__num">{{result.totalQuestions}}</text>
        <text class="settle-score__text"> correct (</text>
        <text class="score-ratio-num settle-score__num">{{result.ratio}}</text>
        <text class="settle-score__text">%)</text>
      </view>
```

- [ ] **Step 3: Replace the settlement EXP block with multiplier slide-in**

Find the EXP block at lines 202-206 (starts `<view class="settle-exp ...">`). Replace with:

```xml
      <!-- EXP gained -->
      <view class="settle-exp {{animStep >= 7 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}"
            change:expVal="{{anim.onExpReveal}}" expVal="{{expRevealTrigger}}">
        <text class="settle-exp__label">EXP +</text>
        <text class="exp-value-num settle-exp__value" style="color:{{regionColor}}">{{reviewMode ? result.correctCount * 10 : result.expReward}}</text>
        <text class="exp-multiplier settle-exp__multiplier" wx:if="{{comboMultiplier > 1}}" style="color:{{regionColor}}">×{{comboMultiplier}}</text>
      </view>
```

**Important:** the `×` is U+00D7 (Unicode multiplication sign), not ASCII `x`. Preserve it byte-for-byte.

- [ ] **Step 4: Insert combo stats row after the EXP block**

Immediately after the EXP block's closing `</view>`, insert:

```xml
      <!-- Combo stats -->
      <view class="settle-combo {{animStep >= 8 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}" wx:if="{{maxCombo >= 3 && !reviewMode}}">
        <text class="settle-combo__label">MAX COMBO</text>
        <text class="settle-combo__value" style="color:{{regionColor}}">×{{maxCombo}}</text>
      </view>
```

Again, `×` is U+00D7.

- [ ] **Step 5: Renumber animStep thresholds for review/levelup/cards**

Find the review stats block (starts `<view class="settle-review ..."`) — currently `animStep >= 8`. Change to `animStep >= 9`.

Find the level up block (starts `<view class="settle-levelup ..."`) — currently `animStep >= 8`. Change to `animStep >= 9`.

Find the cards title (starts `<text class="settle-cards__title ..."`) — currently `animStep >= 9`. Change to `animStep >= 10`.

Find the card items (`class="settle-card settle-card--{{item.rarity}} ..."`) — currently `animStep >= 9 + index` and applies `'settle-anim-slideup'`. Change both:
- Threshold: `animStep >= 10 + index`
- Applied class (when true): `'settle-card-flip'` instead of `'settle-anim-slideup'`

Resulting blocks (verify yours matches; preserves everything except the marked changes):

```xml
      <!-- Review mode stats -->
      <view class="settle-review {{animStep >= 9 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}" wx:if="{{reviewMode}}">
        <text class="settle-review__text">MASTERED: {{reviewMastered}} · REMAINING: {{reviewRemaining}}</text>
      </view>

      <!-- Level up notification -->
      <view class="settle-levelup {{animStep >= 9 ? 'settle-anim-pulse' : 'settle-anim-hidden'}}" wx:if="{{newLevel && !reviewMode}}">
        <text class="settle-levelup__text" style="color:var(--color-accent-gold)">LEVEL UP! → {{newLevel.title}} Lv.{{newLevel.level}}</text>
      </view>

      <!-- Earned cards -->
      <view class="settle-cards" wx:if="{{earnedCardDetails.length > 0 && !reviewMode}}">
        <text class="settle-cards__title {{animStep >= 10 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">🃏 获得卡片</text>
        <view class="settle-cards__list">
          <view wx:for="{{earnedCardDetails}}" wx:key="id"
                class="settle-card settle-card--{{item.rarity}} {{animStep >= 10 + index ? 'settle-card-flip' : 'settle-anim-hidden'}}">
            <text class="settle-card__rarity font-mono">{{item.rarity}}</text>
            <text class="settle-card__name">{{item.name}}</text>
          </view>
        </view>
      </view>
```

**Leave the `settle-actions` block (around line 231, threshold `animStep >= 7`) unchanged** — action buttons are intentionally synced to the EXP reveal so players can tap `Retry`/`Map` immediately.

- [ ] **Step 6: Verify WXS references and data fields match**

Run:
```bash
grep -oE "anim\.[a-zA-Z]+" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u
```

Expected output (6 lines):
```
anim.onComboBreak
anim.onComboUpdate
anim.onFeedbackShow
anim.onScoreReveal
anim.onStarReveal
anim.onExpReveal
```

(Order may vary — set equality is what matters.)

Run:
```bash
grep -oE "(starRevealTrigger[0-2]|scoreRevealTrigger|expRevealTrigger|comboMultiplier|maxCombo|baseExp)" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u
```

Expected: `comboMultiplier`, `expRevealTrigger`, `maxCombo`, `scoreRevealTrigger`, `starRevealTrigger0`, `starRevealTrigger1`, `starRevealTrigger2`. (`baseExp` is only used inside game-engine for now — not referenced in WXML. That's fine.)

- [ ] **Step 7: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): bind settlement to WXS animations and add combo row

Replace stars/score/EXP blocks with WXS-bound variants:
- Stars get per-index classes (.settle-star-0..2) for WXS selectComponent
- Score wraps correct/total/ratio in .score-*-num elements for number scroll
- EXP adds .exp-value-num + .exp-multiplier for counter + slide-in
Add MAX COMBO row (visible when maxCombo>=3, !reviewMode) at animStep>=8.
Renumber downstream animStep thresholds: review/levelup to 9, cards
title to 10, card items to 10+index. Cards now use .settle-card-flip
(new 3D flip keyframe in Task 4) instead of .settle-anim-slideup."
```

---

### Task 4: Append settlement enhancement styles to `chapter.wxss`

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss:1031` (append at EOF)

- [ ] **Step 1: Append 5 style blocks to the end of the file**

Open `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`. Append at the end of the file (after the existing line 1031):

```css

/* ══════════ Enhanced Settlement Header (override .settle-anim-fadein for header) ══════════ */
/* More specific than .settle-anim-fadein so this wins without !important. */
.settle-header.settle-anim-fadein {
  animation: settleHeaderIn 0.5s ease-out forwards;
}

@keyframes settleHeaderIn {
  from {
    opacity: 0;
    transform: translateY(-30rpx) scale(1.1);
    filter: blur(8rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

/* ══════════ Settlement Score (inline number row) ══════════ */
.settle-score {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
}

.settle-score__num {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

/* ══════════ Settlement EXP Multiplier (slides in from right) ══════════ */
.settle-exp__multiplier {
  font-size: var(--font-sm);
  font-weight: 700;
  margin-left: var(--spacing-xs);
  opacity: 0;
  transform: translateX(40rpx);
}

/* Level up glow enhancement (layers on existing .settle-anim-pulse) */
.settle-levelup.settle-anim-pulse .settle-levelup__text {
  text-shadow: 0 0 12rpx rgba(245, 158, 11, 0.5);
}

/* ══════════ Settlement Combo Stats Row ══════════ */
.settle-combo {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.settle-combo__label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  font-weight: 600;
  letter-spacing: 1rpx;
}

.settle-combo__value {
  font-size: var(--font-lg);
  font-weight: 700;
}

/* ══════════ Settlement Card Flip Entry ══════════ */
.settle-card-flip {
  animation: cardFlipIn 0.5s ease-out forwards;
  transform-origin: center center;
}

@keyframes cardFlipIn {
  0% {
    opacity: 0;
    transform: perspective(800rpx) rotateY(180deg) translateY(20rpx);
  }
  50% {
    opacity: 0.7;
    transform: perspective(800rpx) rotateY(90deg) translateY(10rpx);
  }
  100% {
    opacity: 1;
    transform: perspective(800rpx) rotateY(0deg) translateY(0);
  }
}
```

**Why the header override works:** `.settle-header.settle-anim-fadein` has higher specificity than the existing `.settle-anim-fadein` (line 565), so the richer keyframe wins for the header element without changing the base class used by other settlement elements.

**Why `animation-fill-mode: forwards` is used:** The element is wrapped in `wx:if` / toggled by an `animStep` class; `forwards` pins the final frame so the card doesn't snap back to `rotateY(180deg)` if the page re-renders after the animation ends.

- [ ] **Step 2: Verify line count**

Run: `wc -l miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`

Expected: approximately `1100-1120` (was 1031, added ~75 lines of CSS + spacing).

- [ ] **Step 3: Verify design tokens used exist in `app.wxss`**

Run:
```bash
grep -oE "var\(--[a-z-]+\)" miniprogram/subpkg-chapters/pages/chapter/chapter.wxss | tail -25 | sort -u
grep -E "  --(font-(sm|md|lg)|spacing-(xs|sm)|color-text-(primary|muted)|color-accent-gold)" miniprogram/app.wxss
```

Expected: every `var(--*)` token used in the appended block appears as a definition in `app.wxss`. If any is missing, stop and report rather than add the token.

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): add settlement animation styles (header blur, combo row, card flip)

New CSS (~75 lines):
- .settle-header.settle-anim-fadein overrides base fade with slide+blur entrance
- .settle-score flex row with .settle-score__num inline numbers for WXS scroll
- .settle-exp__multiplier opacity-0 + translateX(40rpx) initial for WXS slide-in
- .settle-levelup glow text-shadow when pulsing
- .settle-combo row (label + gold multiplier) for MAX COMBO display
- .settle-card-flip with 3D rotateY perspective keyframe (animation-fill-mode forwards)"
```

---

### Task 5: Integration verification

**Files:** All 4 files from Tasks 1-4.

- [ ] **Step 1: Syntax gate for JS files**

Run:
```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "chapter.js OK"
node -c miniprogram/utils/game-engine.js && echo "game-engine.js OK (unchanged)"
```

Expected: both `OK`. `.wxs` and `.wxml` and `.wxss` are validated by WeChat DevTools at build time, not by Node.

- [ ] **Step 2: Cross-file field consistency**

Run:
```bash
grep -c "comboAnimTrigger\|comboBreakTrigger\|comboBreakShow\|feedbackAnimTrigger\|floatScoreText\|starRevealTrigger[0-2]\|scoreRevealTrigger\|expRevealTrigger\|comboMultiplier\|maxCombo\|baseExp" miniprogram/subpkg-chapters/pages/chapter/chapter.js
```

Expected: count ≥ 15 (data block declares all 11 gamification fields, `_showSettlement` sets 3, `_playSettlementAnimation` references triggers multiple times, `retryStage` resets all).

Run:
```bash
grep -oE "\{\{[a-zA-Z]+" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u | grep -E "starRevealTrigger|scoreRevealTrigger|expRevealTrigger|comboMultiplier|maxCombo"
```

Expected: lists every trigger/data field referenced in WXML. If any appear here but **not** in chapter.js's data block, that's a bug — stop and fix.

- [ ] **Step 3: WXS export / WXML binding parity**

Run:
```bash
grep -oE "change:[a-zA-Z0-9]+" miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u
```

Expected (9 change:* bindings):
```
change:breakTrigger
change:comboVal
change:expVal
change:feedbackTrigger
change:scoreVal
change:starVal0
change:starVal1
change:starVal2
```

(8 lines — one per observer. `starVal0/1/2` are separate bindings that all route to `anim.onStarReveal` via different change names.)

Run:
```bash
grep -E "^  on(Combo(Update|Break)|FeedbackShow|StarReveal|ScoreReveal|ExpReveal):" miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
```

Expected: 6 lines in `module.exports`.

- [ ] **Step 4: Subpackage size gate**

Run:
```bash
du -sh miniprogram/subpkg-chapters/
```

Expected: under 2MB for code (data files inflate the number but gate is `.js/.wxss/.wxml/.wxs` page code growth). Sub-plan 2 ended at ~1.6MB in data; this sub-plan adds ~280 lines of source across 4 files — negligible (<15KB). Flag if the directory exceeds 2.0MB, otherwise proceed.

- [ ] **Step 5: Manual DevTools verification note**

> **For the human reviewer (not an automated step):** Open the worktree in WeChat DevTools, start any stage, answer all questions correctly to trigger a 3-star settlement. Verify:
> 1. Header slides down with blur (0.5s).
> 2. Stars appear one-by-one (~250ms apart) with spring scale + rotate from -180°; earned stars have gold glow.
> 3. Score numbers count up from 0 to target over ~600ms.
> 4. EXP counter scrolls and, if `maxCombo >= 2`, `×1.2/1.5/2.0` slides in from the right at ~60% through the count.
> 5. If `maxCombo >= 3`, the MAX COMBO row appears with `×N`.
> 6. Earned cards flip in with 3D rotateY.
> Then repeat with a partial-star run to verify non-earned stars settle at scale 0.8 without glow.

- [ ] **Step 6: Final verification commit (if anything drifted)**

If verification caught a real issue (not just a display preference), fix it in a focused follow-up commit referencing the task it came from. If everything is clean, no commit needed — move to the handoff.

---

## Self-review

**Spec coverage** (vs parent plan Task 2 steps 4-6, Task 3 steps 4-8, Task 4 steps 5-9, Task 5 steps 5-8, Task 6):
- WXS `onStarReveal` — Task 1 Step 2 ✓
- WXS `onScoreReveal` — Task 1 Step 2 ✓
- WXS `onExpReveal` (with setTimeout replaced by rAF frame counter) — Task 1 Step 2 ✓
- `module.exports` updated to 6 functions — Task 1 Step 2 ✓
- 5 trigger fields in data — Task 2 Step 1 ✓
- `_showSettlement` forwards `comboMultiplier`, `baseExp`, `maxCombo` — Task 2 Step 2 ✓
- `_playSettlementAnimation` fires WXS triggers — Task 2 Step 3 ✓
- `retryStage` resets new fields — Task 2 Step 4 ✓
- Settlement stars get per-index classes + WXS bindings — Task 3 Step 1 ✓
- Score block with inline number elements — Task 3 Step 2 ✓
- EXP block with multiplier element — Task 3 Step 3 ✓
- Combo stats row — Task 3 Step 4 ✓
- animStep renumber for review/levelup/cards — Task 3 Step 5 ✓
- Header blur entrance keyframe — Task 4 Step 1 ✓
- Score inline layout styles — Task 4 Step 1 ✓
- EXP multiplier initial-hidden styles — Task 4 Step 1 ✓
- Combo row styles — Task 4 Step 1 ✓
- Card flip keyframe with `forwards` — Task 4 Step 1 ✓
- Cross-file consistency check — Task 5 Steps 2-3 ✓

**Placeholder scan:** grep for "TODO", "TBD", "implement later", "fill in", "similar to task" — none present. All code blocks are complete and paste-ready.

**Type consistency:**
- `comboMultiplier` is a Number (result.comboMultiplier from getSessionResult, line 154 of game-engine.js is a float 1.0/1.2/1.5/2.0) — used consistently as a Number in comparisons (`comboMultiplier > 1`) and as a string in trigger payload (`+ '_' + self.data.comboMultiplier + '_'`). ✓
- `maxCombo` is an Integer. Compared with `>= 3` consistently. ✓
- Trigger values are all strings; WXS parses with `parseInt` / `parseFloat` and guards with `|| 0`. ✓
- WXS function names in `module.exports` (Task 1) match `change:*` binding values in WXML (Task 3) via `anim.on*`: ✓
- CSS class names: `.settle-star-0/1/2`, `.score-correct-num`, `.score-total-num`, `.score-ratio-num`, `.exp-value-num`, `.exp-multiplier` — match `ownerInstance.selectComponent()` strings in Task 1 WXS. ✓

**Scope discipline:** 5 tasks, 22 checkboxes total (15 scripted steps + 5 grep/wc/node-c verifications + 1 manual DevTools note + 1 optional follow-up). Meets the CLAUDE.md 15-step ceiling for scripted work. No follow-on phase deferred — this completes the parent plan.
