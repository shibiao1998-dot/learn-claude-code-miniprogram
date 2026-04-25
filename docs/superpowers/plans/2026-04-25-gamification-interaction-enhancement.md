# 游戏化交互增强 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Combo streak system, rich quiz feedback animations, and enhanced settlement animations using WXS reactive animation.

**Architecture:** WXS module (`quiz-anim.wxs`) handles frame-level animations (spring physics, number counting). CSS handles static keyframe animations (shake, glow, flip). `game-engine.js` tracks combo state. `chapter.js` bridges data ↔ UI triggers.

**Tech Stack:** WeChat Mini Program (WXML/WXSS/JS/WXS), WXS reactive animation with `ownerInstance.requestAnimationFrame`, CSS `@keyframes`.

**Spec:** `docs/superpowers/specs/2026-04-25-gamification-interaction-enhancement-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/utils/game-engine.js` | Modify | Add combo tracking to session + EXP multiplier |
| `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` | **Create** | WXS animation module: spring physics, number scroll, combo bounce |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Modify | Combo state management + animation trigger props |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Modify | Combo indicator UI + WXS bindings + settlement enhancements |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` | Modify | New keyframes (shake, glow, flip) + combo/settlement styles |

---

### Task 1: Combo Tracking in game-engine.js

**Files:**
- Modify: `miniprogram/utils/game-engine.js:6-21` (createSession)
- Modify: `miniprogram/utils/game-engine.js:44-81` (submitAnswer)
- Modify: `miniprogram/utils/game-engine.js:96-136` (getSessionResult)

- [ ] **Step 1: Add combo fields to createSession()**

In `miniprogram/utils/game-engine.js`, find the `createSession` function (lines 6-21). Add `combo: 0` and `maxCombo: 0` to the returned object, after the `finished: false` line:

```js
function createSession(stage) {
  return {
    stageId: stage.id,
    chapter: stage.chapter,
    region: stage.region,
    questions: stage.questions.slice(),
    starThresholds: stage.star_thresholds,
    rewardCards: stage.reward_cards,
    phase: 1,
    currentIndex: 0,
    answers: {},
    wrongIds: [],
    confirmAnswers: {},
    finished: false,
    combo: 0,
    maxCombo: 0
  };
}
```

- [ ] **Step 2: Add combo logic to submitAnswer()**

In the same file, find the `submitAnswer` function (lines 44-81). In the `session.phase === 1` branch, add combo tracking after the existing logic. Replace the entire function with:

```js
function submitAnswer(session, questionId, chosenOptionId) {
  var question = null;
  for (var i = 0; i < session.questions.length; i++) {
    if (session.questions[i].id === questionId) {
      question = session.questions[i];
      break;
    }
  }
  if (!question) return null;

  var isCorrect = chosenOptionId === question.answer;
  var prevCombo = session.combo;

  if (session.phase === 1) {
    session.answers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    if (isCorrect) {
      session.combo++;
      if (session.combo > session.maxCombo) {
        session.maxCombo = session.combo;
      }
    } else {
      session.combo = 0;
      session.wrongIds.push(questionId);
    }
    session.currentIndex++;

    if (session.currentIndex >= session.questions.length) {
      session.phase = 2;
      session.currentIndex = 0;
    }
  } else if (session.phase === 3) {
    session.confirmAnswers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    session.currentIndex++;

    if (session.currentIndex >= session.wrongIds.length) {
      session.finished = true;
    }
  }

  return {
    correct: isCorrect,
    answer: question.answer,
    explanation: question.explanation,
    combo: session.combo,
    prevCombo: prevCombo,
    maxCombo: session.maxCombo
  };
}
```

- [ ] **Step 3: Add combo multiplier to getSessionResult()**

In the same file, find `getSessionResult` (lines 96-136). Add combo multiplier calculation. Replace the entire function with:

```js
function getSessionResult(session) {
  var totalQuestions = session.questions.length;
  var correctInPhase1 = 0;
  var keys = Object.keys(session.answers);
  for (var i = 0; i < keys.length; i++) {
    if (session.answers[keys[i]].correct) correctInPhase1++;
  }

  var ratio = totalQuestions > 0 ? correctInPhase1 / totalQuestions : 0;

  var stars = 0;
  if (ratio >= session.starThresholds[2]) stars = 3;
  else if (ratio >= session.starThresholds[1]) stars = 2;
  else if (ratio >= session.starThresholds[0]) stars = 1;

  var earnedCards = [];
  if (stars >= 1 && session.rewardCards.length > 0) earnedCards.push(session.rewardCards[0]);
  if (stars >= 2 && session.rewardCards.length > 1) earnedCards.push(session.rewardCards[1]);
  if (stars >= 3 && session.rewardCards.length > 2) earnedCards.push(session.rewardCards[2]);

  var baseExp = stars === 3 ? 100 : stars === 2 ? 60 : stars === 1 ? 30 : 10;

  var comboMultiplier = 1.0;
  if (session.maxCombo >= 8) comboMultiplier = 2.0;
  else if (session.maxCombo >= 5) comboMultiplier = 1.5;
  else if (session.maxCombo >= 3) comboMultiplier = 1.2;

  var expReward = Math.round(baseExp * comboMultiplier);

  var reviewIds = [];
  for (var j = 0; j < session.wrongIds.length; j++) {
    var wId = session.wrongIds[j];
    if (!session.confirmAnswers[wId] || !session.confirmAnswers[wId].correct) {
      reviewIds.push(wId);
    }
  }

  return {
    stageId: session.stageId,
    stars: stars,
    correctCount: correctInPhase1,
    totalQuestions: totalQuestions,
    ratio: ratio,
    earnedCards: earnedCards,
    expReward: expReward,
    baseExp: baseExp,
    comboMultiplier: comboMultiplier,
    maxCombo: session.maxCombo,
    reviewIds: reviewIds
  };
}
```

- [ ] **Step 4: Verify game-engine.js loads correctly**

Run:
```bash
node -e "var ge = require('./miniprogram/utils/game-engine.js'); console.log('OK:', Object.keys(ge));"
```

This will fail because `game-engine.js` requires `game-save.js` and `game-review.js` which use `wx.xxx` APIs. Instead verify syntax only:

```bash
node -c miniprogram/utils/game-engine.js && echo "Syntax OK"
```

Expected: `Syntax OK`

- [ ] **Step 5: Commit**

```bash
git add miniprogram/utils/game-engine.js
git commit -m "feat(game-engine): add combo tracking and EXP multiplier

Add combo/maxCombo fields to session. submitAnswer() tracks consecutive
correct answers. getSessionResult() applies combo-based EXP multiplier
(×1.0 for 0-2, ×1.2 for 3-4, ×1.5 for 5-7, ×2.0 for 8+)."
```

---

### Task 2: WXS Animation Module (quiz-anim.wxs)

**Files:**
- Create: `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs`

- [ ] **Step 1: Create the WXS file with spring physics and all animation functions**

Create `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` with the following content:

```javascript
// quiz-anim.wxs — WXS reactive animation module
// Spring physics + number scrolling + combo effects

// --- Shared spring physics ---
function springStep(current, target, velocity, stiffness, damping, mass) {
  var force = -stiffness * (current - target);
  var dampForce = -damping * velocity;
  var accel = (force + dampForce) / mass;
  velocity += accel * (1 / 60);
  current += velocity * (1 / 60);
  return { current: current, velocity: velocity };
}

var SPRING_STIFFNESS = 180;
var SPRING_DAMPING = 12;
var SPRING_MASS = 1;
var SPRING_THRESHOLD = 0.01;

// --- Combo bounce animation ---
function onComboUpdate(newVal, oldVal, ownerInstance, instance) {
  if (!newVal || newVal === oldVal) return;
  var el = instance;
  if (!el) return;

  var scale = 1.8;
  var velocity = 0;
  var target = 1.0;

  function tick() {
    var result = springStep(scale, target, velocity, SPRING_STIFFNESS, SPRING_DAMPING, SPRING_MASS);
    scale = result.current;
    velocity = result.velocity;

    el.setStyle({ transform: 'scale(' + scale.toFixed(3) + ')' });

    if (Math.abs(scale - target) > SPRING_THRESHOLD || Math.abs(velocity) > SPRING_THRESHOLD) {
      ownerInstance.requestAnimationFrame(tick);
    } else {
      el.setStyle({ transform: 'scale(1)' });
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- Combo break animation ---
function onComboBreak(newVal, oldVal, ownerInstance, instance) {
  if (!newVal || newVal === oldVal) return;

  var breakEl = ownerInstance.selectComponent('.combo-break-text');
  if (!breakEl) return;

  var startTime = Date.now();
  var duration = 1000;

  breakEl.setStyle({
    opacity: '1',
    transform: 'scale(1.2)'
  });

  function tick() {
    var elapsed = Date.now() - startTime;
    var progress = elapsed / duration;
    if (progress >= 1) {
      breakEl.setStyle({ opacity: '0', transform: 'scale(1)' });
      return;
    }

    var scaleVal = 1.2 - 0.2 * Math.min(progress * 3, 1);
    var opacityVal = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;

    breakEl.setStyle({
      opacity: '' + opacityVal.toFixed(3),
      transform: 'scale(' + scaleVal.toFixed(3) + ')'
    });

    ownerInstance.requestAnimationFrame(tick);
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- Feedback float score animation ---
function onFeedbackShow(newVal, oldVal, ownerInstance, instance) {
  if (!newVal || newVal === oldVal) return;

  var floatEl = ownerInstance.selectComponent('.float-score');
  if (!floatEl) return;

  var startTime = Date.now();
  var duration = 800;

  floatEl.setStyle({
    opacity: '1',
    transform: 'translateY(0)'
  });

  function tick() {
    var elapsed = Date.now() - startTime;
    var progress = elapsed / duration;
    if (progress >= 1) {
      floatEl.setStyle({ opacity: '0', transform: 'translateY(-120rpx)' });
      return;
    }

    var eased = 1 - Math.pow(1 - progress, 3);
    var yVal = -120 * eased;
    var opacityVal = progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4;

    floatEl.setStyle({
      opacity: '' + opacityVal.toFixed(3),
      transform: 'translateY(' + yVal.toFixed(1) + 'rpx)'
    });

    ownerInstance.requestAnimationFrame(tick);
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- Settlement star spring + rotate animation ---
function onStarReveal(newVal, oldVal, ownerInstance, instance) {
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

  function tick() {
    var scaleResult = springStep(scale, earned ? 1.0 : 0.8, velocity, SPRING_STIFFNESS, SPRING_DAMPING, SPRING_MASS);
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
      style['boxShadow'] = '0 0 ' + glowSize.toFixed(0) + 'rpx rgba(234,179,8,0.5)';
    }

    el.setStyle(style);

    if (Math.abs(scale - (earned ? 1.0 : 0.8)) > SPRING_THRESHOLD || Math.abs(velocity) > SPRING_THRESHOLD ||
        Math.abs(rotate) > 0.5 || Math.abs(rotVelocity) > 0.5) {
      ownerInstance.requestAnimationFrame(tick);
    } else {
      var finalStyle = {
        transform: 'scale(' + (earned ? '1' : '0.8') + ') rotate(0deg)',
        opacity: '1'
      };
      if (earned) {
        finalStyle['boxShadow'] = '0 0 16rpx rgba(234,179,8,0.5)';
      }
      el.setStyle(finalStyle);
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- Score number scroll animation ---
function onScoreReveal(newVal, oldVal, ownerInstance, instance) {
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
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);

    var curCorrect = Math.round(targetCorrect * eased);
    var curTotal = Math.round(targetTotal * eased);
    var curRatio = Math.round(targetRatio * eased);

    if (correctEl) correctEl.setStyle({ content: '' + curCorrect });
    if (totalEl) totalEl.setStyle({ content: '' + curTotal });
    if (ratioEl) ratioEl.setStyle({ content: '' + curRatio });

    if (progress < 1) {
      ownerInstance.requestAnimationFrame(tick);
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

// --- EXP number scroll + multiplier slide animation ---
function onExpReveal(newVal, oldVal, ownerInstance, instance) {
  if (!newVal || newVal === oldVal) return;

  var parts = ('' + newVal).split('_');
  var targetExp = parseInt(parts[0]) || 0;
  var multiplier = parseFloat(parts[1]) || 1.0;

  var expEl = ownerInstance.selectComponent('.exp-value-num');
  var multEl = ownerInstance.selectComponent('.exp-multiplier');

  var startTime = Date.now();
  var duration = 500;

  function tick() {
    var elapsed = Date.now() - startTime;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);

    var curExp = Math.round(targetExp * eased);
    if (expEl) expEl.setStyle({ content: '' + curExp });

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

    if (progress >= 1 && expEl) {
      var scaleUp = { transform: 'scale(1.15)' };
      expEl.setStyle(scaleUp);
      setTimeout(function() {
        expEl.setStyle({ transform: 'scale(1)' });
      }, 150);
    }

    if (progress < 1) {
      ownerInstance.requestAnimationFrame(tick);
    }
  }

  ownerInstance.requestAnimationFrame(tick);
}

module.exports = {
  onComboUpdate: onComboUpdate,
  onComboBreak: onComboBreak,
  onFeedbackShow: onFeedbackShow,
  onStarReveal: onStarReveal,
  onScoreReveal: onScoreReveal,
  onExpReveal: onExpReveal
};
```

- [ ] **Step 2: Verify WXS syntax**

WXS files can't be verified with Node.js (different runtime), but check for obvious syntax errors:

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs && echo "Syntax OK"
```

Note: WXS supports a subset of JS. The `setTimeout` in `onExpReveal` may not be available in WXS. If the WeChat DevTools reports an error, replace it with an additional `requestAnimationFrame` tick that counts frames:

```javascript
// Alternative to setTimeout in WXS:
var bounceFrames = 9; // ~150ms at 60fps
function bounceTick() {
  bounceFrames--;
  if (bounceFrames <= 0) {
    expEl.setStyle({ transform: 'scale(1)' });
    return;
  }
  ownerInstance.requestAnimationFrame(bounceTick);
}
ownerInstance.requestAnimationFrame(bounceTick);
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
git commit -m "feat(chapter): add WXS reactive animation module

New quiz-anim.wxs with spring physics engine and 6 animation functions:
onComboUpdate, onComboBreak, onFeedbackShow, onStarReveal,
onScoreReveal, onExpReveal. Shared spring step function with
stiffness=180, damping=12, mass=1."
```

---

### Task 3: Combo UI + Answer Feedback in chapter.js

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`

- [ ] **Step 1: Add combo data fields to Page data**

In `miniprogram/subpkg-chapters/pages/chapter/chapter.js`, find the `data` object inside `Page({})` (starts at line 39). Add these fields after `reviewRemaining: 0` (line 77):

```js
    reviewRemaining: 0,

    comboCount: 0,
    comboAnimTrigger: 0,
    comboBreakTrigger: 0,
    comboBreakShow: false,
    feedbackAnimTrigger: 0,
    floatScoreText: '',
    maxCombo: 0,
    comboMultiplier: 1.0,
    baseExp: 0,

    starRevealTrigger0: '',
    starRevealTrigger1: '',
    starRevealTrigger2: '',
    scoreRevealTrigger: '',
    expRevealTrigger: ''
```

- [ ] **Step 2: Update confirmAnswer() to handle combo**

Find the `confirmAnswer` method (starts around line 292). Replace the entire method with:

```js
  confirmAnswer: function() {
    if (!this.data.selectedOption || this.data.showFeedback) return;

    var session = this._session;
    var q = this.data.currentQuestion;
    var locale = this.data.locale;
    var result = gameEngine.submitAnswer(session, q.id, this.data.selectedOption);

    if (!result) return;

    var explanation = result.explanation;
    var explText = explanation[locale] || explanation.zh || explanation.en || '';

    var updateData = {
      showFeedback: true,
      feedbackCorrect: result.correct,
      feedbackExplanation: explText,
      feedbackAnswer: result.answer
    };

    if (result.correct) {
      updateData.comboCount = result.combo;
      updateData.comboAnimTrigger = Date.now();

      var multiplierLabel = '';
      if (result.combo >= 8) multiplierLabel = ' ×2.0';
      else if (result.combo >= 5) multiplierLabel = ' ×1.5';
      else if (result.combo >= 3) multiplierLabel = ' ×1.2';
      updateData.floatScoreText = '+1' + multiplierLabel;
      updateData.feedbackAnimTrigger = Date.now();

      wx.vibrateShort({ type: 'light' });
      sound.play('correct');

      if (result.combo === 3 || result.combo === 5 || result.combo === 8) {
        sound.play('star');
      }
    } else {
      var hadCombo = this.data.comboCount >= 2;
      updateData.comboCount = 0;
      updateData.floatScoreText = '';

      if (hadCombo) {
        updateData.comboBreakShow = true;
        updateData.comboBreakTrigger = Date.now();
      }

      wx.vibrateShort({ type: 'heavy' });
      sound.play('wrong');
      gameReview.addToReview(q.id);
    }

    this.setData(updateData);
  },
```

- [ ] **Step 3: Update nextQuestion() to reset feedback state**

Find the `nextQuestion` method (starts around line 322). In the `this.setData({...})` call inside this method, add `comboBreakShow: false` and `floatScoreText: ''` to the reset. Find the setData block that starts around line 357:

```js
    this.setData({
      currentQuestion: this._formatQuestion(q, locale),
      showFeedback: false,
      selectedOption: '',
      feedbackCorrect: false,
      feedbackExplanation: '',
      feedbackAnswer: '',
      comboBreakShow: false,
      floatScoreText: '',
      questionIndex: idx,
      totalQuestions: totalQ,
      progressPercent: Math.round(idx / totalQ * 100)
    });
```

- [ ] **Step 4: Update _showSettlement() to use new result fields and trigger WXS animations**

Find `_showSettlement` (starts around line 426). In the `this.setData({...})` call, update the `result` object to include new fields, and add the trigger props. Replace the `this.setData({...})` block (starting around line 472) with:

```js
    this.setData({
      finished: true,
      showSettlement: true,
      showReview: false,
      showFeedback: false,
      currentQuestion: null,
      comboCount: 0,
      comboBreakShow: false,
      result: {
        stars: result.stars,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        expReward: result.expReward,
        ratio: Math.round(result.ratio * 100)
      },
      maxCombo: result.maxCombo,
      comboMultiplier: result.comboMultiplier,
      baseExp: result.baseExp,
      earnedCardDetails: earnedCardDetails,
      newLevel: leveledUp ? newLevelInfo : null
    });
```

- [ ] **Step 5: Update _playSettlementAnimation() to trigger WXS**

Find `_playSettlementAnimation` (starts around line 492). Replace the entire method with:

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
          self.setData({ animStep: 2 + idx });
          var earned = idx <= stars ? 1 : 0;
          var triggerKey = 'starRevealTrigger' + (idx - 1);
          var triggerData = {};
          triggerData[triggerKey] = (idx - 1) + '_' + earned + '_' + Date.now();
          self.setData(triggerData);
          if (earned) {
            wx.vibrateShort({ type: 'medium' });
            sound.play('star');
          }
        }, starDelay + (idx - 1) * 250);
      })(i);
    }

    setTimeout(function() {
      self.setData({ animStep: 6 });
      var r = self.data.result;
      self.setData({
        scoreRevealTrigger: r.correctCount + '_' + r.totalQuestions + '_' + r.ratio + '_' + Date.now()
      });
    }, 1500);

    setTimeout(function() {
      self.setData({ animStep: 7 });
      var r = self.data.result;
      self.setData({
        expRevealTrigger: r.expReward + '_' + self.data.comboMultiplier + '_' + Date.now()
      });
    }, 1800);

    var comboDelay = 2000;
    if (self.data.maxCombo >= 3) {
      setTimeout(function() { self.setData({ animStep: 8 }); }, comboDelay);
      comboDelay = 2200;
    }

    if (self.data.newLevel) {
      setTimeout(function() {
        self.setData({ animStep: 9 });
        wx.vibrateLong();
        sound.play('levelup');
      }, comboDelay);
      comboDelay += 200;
    }

    var cardStartDelay = comboDelay + 200;
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

- [ ] **Step 6: Update retryStage() to reset new data fields**

Find `retryStage` (starts around line 541). Add the new fields to the reset setData call:

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
        expRevealTrigger: ''
      });
    }
  },
```

- [ ] **Step 7: Verify syntax**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected: `Syntax OK`

- [ ] **Step 8: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): add combo state management and animation triggers

Track comboCount, trigger WXS animations on answer feedback and
settlement. Float score text shows combo multiplier. Settlement
animation triggers WXS star reveal, score scroll, and EXP reveal."
```

---

### Task 4: WXML Template Updates (combo indicator + WXS bindings + settlement)

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`

- [ ] **Step 1: Add WXS import at the top of the file**

At the top of `chapter.wxml`, right after the opening `<view class="game-page">` (line 2), add:

```xml
<view class="game-page">
  <wxs module="anim" src="./quiz-anim.wxs"></wxs>
```

- [ ] **Step 2: Add combo indicator to the game header**

In the game header section (lines 5-17), add the combo indicator inside `game-header__top`, after the `game-header__phase` view. Replace the entire game header block with:

```xml
  <!-- ══════════ Game Header ══════════ -->
  <view class="game-header" wx:if="{{!showSettlement && !showLearn}}">
    <view class="game-header__top">
      <text class="game-header__back" bindtap="goBack">← 返回</text>
      <view class="game-header__phase">
        <text class="phase-badge font-mono" style="color:{{regionColor}}">{{phaseLabel}}</text>
        <text class="phase-counter font-mono">{{questionIndex}}/{{totalQuestions}}</text>
      </view>
      <view class="combo-indicator {{comboCount >= 2 ? 'combo-indicator--show' : ''}}"
            change:comboVal="{{anim.onComboUpdate}}" comboVal="{{comboAnimTrigger}}">
        <text class="combo-number font-mono" style="color:{{regionColor}}">×{{comboCount}}</text>
        <text class="combo-fire">🔥</text>
      </view>
    </view>
    <text class="game-header__title">{{stageTitle}}</text>
    <view class="game-header__bar">
      <view class="game-header__bar-fill" style="width:{{progressPercent}}%;background:{{regionColor}}"></view>
    </view>
  </view>
```

- [ ] **Step 3: Add float score and combo break overlay to the question area**

In the question section (lines 76-125), add the float score text and combo break overlay. After the `options-list` view (line 101) and before the `action-area` (line 104), add:

```xml
    <!-- Float score (WXS animated) -->
    <view class="float-score-container" wx:if="{{floatScoreText}}">
      <text class="float-score"
            change:feedbackVal="{{anim.onFeedbackShow}}" feedbackVal="{{feedbackAnimTrigger}}">
        {{floatScoreText}}
      </text>
    </view>

    <!-- Combo break overlay -->
    <view class="combo-break-container" wx:if="{{comboBreakShow}}"
          change:breakVal="{{anim.onComboBreak}}" breakVal="{{comboBreakTrigger}}">
      <text class="combo-break-text">COMBO BREAK</text>
    </view>
```

- [ ] **Step 4: Add enhanced option classes for glow and dimming**

Update the options list (lines 91-102). Replace the options block with enhanced classes:

```xml
    <!-- Options -->
    <view class="options-list">
      <view
        wx:for="{{currentQuestion.options}}"
        wx:key="id"
        class="option-item {{selectedOption === item.id ? 'option--selected' : ''}} {{showFeedback && item.id === feedbackAnswer ? 'option--correct option--correct-glow' : ''}} {{showFeedback && selectedOption === item.id && !feedbackCorrect ? 'option--wrong option--wrong-shake' : ''}} {{showFeedback && item.id !== feedbackAnswer && item.id !== selectedOption ? 'option--dimmed' : ''}}"
        bindtap="selectOption"
        data-optionid="{{item.id}}"
      >
        <text class="option-id">{{item.id}}</text>
        <text class="option-text">{{item.text}}</text>
        <text class="option-check" wx:if="{{showFeedback && item.id === feedbackAnswer}}">✓</text>
      </view>
    </view>
```

- [ ] **Step 5: Update settlement stars with WXS bindings and individual classes**

In the settlement section, replace the stars block (lines 164-169) with:

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

- [ ] **Step 6: Update settlement score with individual number elements**

Replace the score block (lines 171-174) with:

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

- [ ] **Step 7: Update settlement EXP with multiplier display**

Replace the EXP block (lines 176-180) with:

```xml
      <!-- EXP gained -->
      <view class="settle-exp {{animStep >= 7 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}"
            change:expVal="{{anim.onExpReveal}}" expVal="{{expRevealTrigger}}">
        <text class="settle-exp__label">EXP +</text>
        <text class="exp-value-num settle-exp__value" style="color:{{regionColor}}">{{reviewMode ? result.correctCount * 10 : result.expReward}}</text>
        <text class="exp-multiplier settle-exp__multiplier" wx:if="{{comboMultiplier > 1}}" style="color:{{regionColor}}">×{{comboMultiplier}}</text>
      </view>
```

- [ ] **Step 8: Add combo stats row to settlement**

After the EXP block and before the review mode stats (line 182), add:

```xml
      <!-- Combo stats -->
      <view class="settle-combo {{animStep >= 8 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}" wx:if="{{maxCombo >= 3 && !reviewMode}}">
        <text class="settle-combo__label">MAX COMBO</text>
        <text class="settle-combo__value" style="color:{{regionColor}}">×{{maxCombo}}</text>
      </view>
```

- [ ] **Step 9: Update settlement animStep thresholds for renumbered steps**

Update the remaining settlement elements to use the new animStep numbers. Find the review stats (line 183), level up (line 188), cards title (line 194), card items (line 197), and action buttons (line 205). Replace their animStep thresholds:

For review stats: `animStep >= 8` → `animStep >= 9`
For level up: `animStep >= 8` → `animStep >= 9`
For cards title: `animStep >= 9` → `animStep >= 10`
For card items: `animStep >= 9 + index` → `animStep >= 10 + index`
For action buttons: `animStep >= 7` stays the same (buttons appear with EXP)

Updated settlement blocks:

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

- [ ] **Step 10: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): add combo indicator, float score, WXS bindings, and settlement enhancements

Add combo indicator in header, floating score text, combo break overlay,
enhanced option classes (glow, shake, dim), WXS animation bindings for
settlement stars/score/EXP, combo stats row, and card flip class."
```

---

### Task 5: CSS Styles (combo, feedback, settlement animations)

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`

- [ ] **Step 1: Add combo indicator styles**

Append these styles at the end of `chapter.wxss` (after line 924):

```css
/* ══════════ Combo Indicator ══════════ */
.combo-indicator {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4rpx;
  opacity: 0;
  transform: scale(0);
  transition: opacity 0.2s, transform 0.2s;
}

.combo-indicator--show {
  opacity: 1;
  transform: scale(1);
}

.combo-number {
  font-size: var(--font-md);
  font-weight: 700;
}

.combo-fire {
  font-size: var(--font-md);
}
```

- [ ] **Step 2: Add float score styles**

Append after the combo styles:

```css
/* ══════════ Float Score ══════════ */
.float-score-container {
  position: relative;
  height: 0;
  overflow: visible;
}

.float-score {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-success);
  opacity: 0;
  pointer-events: none;
  white-space: nowrap;
}
```

- [ ] **Step 3: Add combo break styles**

Append after float score styles:

```css
/* ══════════ Combo Break ══════════ */
.combo-break-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  pointer-events: none;
}

.combo-break-text {
  font-size: var(--font-2xl);
  font-weight: 700;
  color: var(--color-error);
  opacity: 0;
  text-align: center;
  letter-spacing: 2rpx;
}
```

- [ ] **Step 4: Add enhanced option feedback styles (glow, shake, dim, checkmark)**

Append after combo break styles:

```css
/* ══════════ Enhanced Option Feedback ══════════ */
.option--correct-glow {
  box-shadow: 0 0 20rpx rgba(16, 185, 129, 0.4);
  background: #ECFDF5 !important;
  border-color: var(--color-success) !important;
}

.option--wrong-shake {
  animation: enhancedShake 0.45s ease-out;
  background: #FEE2E2 !important;
  border-color: var(--color-error) !important;
}

@keyframes enhancedShake {
  0%, 100% { transform: translateX(0); }
  15% { transform: translateX(-6rpx); }
  30% { transform: translateX(6rpx); }
  45% { transform: translateX(-6rpx); }
  60% { transform: translateX(6rpx); }
  75% { transform: translateX(-6rpx); }
  90% { transform: translateX(4rpx); }
}

.option--dimmed {
  opacity: 0.4;
  transform: scale(0.97);
  transition: opacity 0.3s, transform 0.3s;
}

.option-check {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-success);
  flex-shrink: 0;
  animation: checkPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes checkPop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
```

- [ ] **Step 5: Add enhanced settlement header animation**

Replace the existing `.settle-anim-fadein` for the header. Add a new specific header animation after the existing settlement animations section (after line 650):

```css
/* ══════════ Enhanced Settlement Animations ══════════ */

/* Header slide-down + blur */
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
```

- [ ] **Step 6: Add settlement score number and EXP multiplier styles**

Append after the header animation:

```css
/* Score numbers (inline) */
.settle-score {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: center;
}

.settle-score__num {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

/* EXP multiplier label */
.settle-exp__multiplier {
  font-size: var(--font-sm);
  font-weight: 700;
  margin-left: var(--spacing-xs);
  opacity: 0;
}

/* Level up glow enhancement */
.settle-levelup.settle-anim-pulse .settle-levelup__text {
  text-shadow: 0 0 12rpx rgba(245, 158, 11, 0.5);
}
```

- [ ] **Step 7: Add combo stats row styles**

Append:

```css
/* ══════════ Combo Stats Row ══════════ */
.settle-combo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.settle-combo__label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
  font-weight: 600;
}

.settle-combo__value {
  font-size: var(--font-lg);
  font-weight: 700;
}
```

- [ ] **Step 8: Add card flip animation**

Append:

```css
/* ══════════ Card Flip Animation ══════════ */
.settle-card-flip {
  animation: cardFlipIn 0.5s ease-out forwards;
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

- [ ] **Step 9: Verify file is valid WXSS**

WXSS doesn't have a standalone validator. Quick check the file is not corrupted:

```bash
wc -l miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
```

Expected: approximately 1050-1100 lines (was 924, added ~150 lines).

- [ ] **Step 10: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): add combo, feedback, and settlement animation styles

New CSS: combo indicator with show/hide transition, float score overlay,
combo break fixed overlay, enhanced option feedback (glow, shake, dim,
checkmark pop), settlement header blur entrance, score number inline
layout, EXP multiplier, combo stats row, card flip perspective animation.
~150 lines of new styles."
```

---

### Task 6: Integration Verification

**Files:**
- All 5 files from Tasks 1-5

- [ ] **Step 1: Verify all files have correct syntax**

```bash
node -c miniprogram/utils/game-engine.js && echo "game-engine OK"
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "chapter.js OK"
node -c miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs && echo "quiz-anim OK"
echo "WXSS and WXML are template files — verified by WeChat DevTools"
```

- [ ] **Step 2: Verify cross-file consistency**

Check that all data fields referenced in WXML exist in chapter.js data:

```bash
grep -oP '{{(\w+)' miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u | head -40
```

Cross-reference with chapter.js data fields — all new fields (`comboCount`, `comboAnimTrigger`, `comboBreakTrigger`, `comboBreakShow`, `feedbackAnimTrigger`, `floatScoreText`, `maxCombo`, `comboMultiplier`, `baseExp`, `starRevealTrigger0-2`, `scoreRevealTrigger`, `expRevealTrigger`) should appear in the Page `data` object.

- [ ] **Step 3: Verify WXS module references match**

Check that the WXS functions referenced in WXML exist in quiz-anim.wxs:

```bash
grep -oP 'anim\.(\w+)' miniprogram/subpkg-chapters/pages/chapter/chapter.wxml | sort -u
```

Expected output should match the 6 exported functions: `onComboUpdate`, `onComboBreak`, `onFeedbackShow`, `onStarReveal`, `onScoreReveal`, `onExpReveal`.

- [ ] **Step 4: Verify package size**

```bash
du -sh miniprogram/subpkg-chapters/
```

Expected: should still be under 2MB (current is 3.0MB which includes data files — the page-level code files are a small fraction).

- [ ] **Step 5: Final commit with all files verified**

If any fixes were needed, commit them:

```bash
git status
# If clean, no commit needed
# If fixes were applied:
git add -A miniprogram/
git commit -m "fix(chapter): integration fixes for gamification interaction enhancement"
```
