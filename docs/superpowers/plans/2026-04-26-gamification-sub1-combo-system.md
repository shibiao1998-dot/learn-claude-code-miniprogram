# Gamification Sub-Plan 1: Combo System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add combo (连击) tracking to quiz sessions so consecutive correct answers accumulate, boost EXP rewards, and display a live combo indicator in the chapter game header.

**Architecture:** `game-engine.js` gains `combo` / `maxCombo` fields on session state and an EXP multiplier in `getSessionResult()`. `chapter.js` tracks `comboCount` in page `data` and updates it in `confirmAnswer()`. `chapter.wxml` adds a static combo indicator next to the phase badge; `chapter.wxss` styles it with a simple CSS opacity+scale transition (no WXS yet). Haptic feedback (`wx.vibrateShort`) and existing sound effects (`sound.play('correct' | 'wrong' | 'star')`) fire on each answer.

**Tech Stack:** Native WeChat mini program (CommonJS JS, WXML, WXSS with CSS variables). No WXS, no new assets.

**Parent Spec:** `docs/superpowers/specs/2026-04-25-gamification-interaction-enhancement-design.md`
**Parent Plan:** `docs/superpowers/plans/2026-04-25-gamification-interaction-enhancement.md` (Task 1 in full; Combo slices from Task 3, Task 4 Step 2, Task 5 Step 1)

**Deferred to sub-plan 2 (answer feedback animations):** WXS module `quiz-anim.wxs`, option glow/shake/dim, float score, combo break overlay.
**Deferred to sub-plan 3 (settlement animations):** Sequenced settlement reveal, star/score/EXP number-scroll animations, combo stats row, card flip.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/utils/game-engine.js` | Modify | Combo state + EXP multiplier |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Modify | Combo counter in page data + confirmAnswer sets it |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Modify | Static combo indicator in game header |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` | Modify | Combo indicator styles |

---

### Task 1: Combo tracking in game-engine.js

**Files:**
- Modify: `miniprogram/utils/game-engine.js:6-21` (createSession)
- Modify: `miniprogram/utils/game-engine.js:44-81` (submitAnswer)
- Modify: `miniprogram/utils/game-engine.js:96-136` (getSessionResult)

- [ ] **Step 1: Add combo fields to createSession()**

In `miniprogram/utils/game-engine.js`, replace the `createSession` function (lines 6-21) with:

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

Replace the entire `submitAnswer` function (lines 44-81) with:

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

Replace the entire `getSessionResult` function (lines 96-136) with:

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

- [ ] **Step 4: Verify syntax**

Run from the repo root:

```bash
node -c miniprogram/utils/game-engine.js && echo "Syntax OK"
```

Expected output: `Syntax OK`

- [ ] **Step 5: Commit**

```bash
git add miniprogram/utils/game-engine.js
git commit -m "feat(game-engine): add combo tracking and EXP multiplier

Session state gains combo/maxCombo fields. submitAnswer() increments
combo on correct answers in phase 1 and resets to 0 on wrong answers.
getSessionResult() applies a combo-based EXP multiplier driven by
maxCombo (x1.0 under 3, x1.2 at 3, x1.5 at 5, x2.0 at 8)."
```

---

### Task 2: Combo state in chapter.js

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:39-77` (page data)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:292-320` (confirmAnswer)

- [ ] **Step 1: Add combo fields to page data**

In `miniprogram/subpkg-chapters/pages/chapter/chapter.js`, line 77 is currently `    reviewRemaining: 0` (no trailing comma since it is the last field). Replace that single line with:

```js
    reviewRemaining: 0,

    comboCount: 0,
    maxCombo: 0,
    comboMultiplier: 1.0,
    baseExp: 0
```

- [ ] **Step 2: Update confirmAnswer() to track combo and fire feedback**

Find the `confirmAnswer` method (starts at line 292) and replace the entire method with:

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
      if (result.combo > this.data.maxCombo) {
        updateData.maxCombo = result.combo;
      }

      wx.vibrateShort({ type: 'light' });
      sound.play('correct');

      if (result.combo === 3 || result.combo === 5 || result.combo === 8) {
        sound.play('star');
      }
    } else {
      updateData.comboCount = 0;

      wx.vibrateShort({ type: 'heavy' });
      sound.play('wrong');
      gameReview.addToReview(q.id);
    }

    this.setData(updateData);
  },
```

- [ ] **Step 3: Verify syntax**

Run from the repo root:

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected output: `Syntax OK`

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): track combo count in page data

Add comboCount/maxCombo/comboMultiplier/baseExp to page data.
confirmAnswer() mirrors the engine's combo onto the page and fires
light/heavy vibration plus correct/wrong sound effects. A star sound
plays on the 3rd, 5th, and 8th consecutive correct answers."
```

---

### Task 3: Combo indicator in chapter.wxml

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:5-16` (game header)

- [ ] **Step 1: Insert combo indicator into game header**

Find the game header block (lines 5-16). Replace the entire block with:

```xml
  <!-- ══════════ Game Header ══════════ -->
  <view class="game-header" wx:if="{{!showSettlement && !showLearn}}">
    <view class="game-header__top">
      <text class="game-header__back" bindtap="goBack">← 返回</text>
      <view class="game-header__phase">
        <text class="phase-badge font-mono" style="color:{{regionColor}}">{{phaseLabel}}</text>
        <text class="phase-counter font-mono">{{questionIndex}}/{{totalQuestions}}</text>
      </view>
      <view class="combo-indicator {{comboCount >= 2 ? 'combo-indicator--show' : ''}}">
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

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): add combo indicator to game header

The combo indicator sits next to the phase badge and only becomes
visible once the player has at least two consecutive correct answers
(comboCount >= 2). Shows x<N> in the region's accent color plus a
fire emoji."
```

---

### Task 4: Combo indicator styles in chapter.wxss

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (append at end)

- [ ] **Step 1: Append combo indicator styles**

Append these rules at the end of `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`:

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

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): style combo indicator with fade-in transition

Hidden by default (opacity 0, scale 0); slides in on a 0.2s opacity+scale
transition when comboCount >= 2 triggers combo-indicator--show."
```

---

### Task 5: Integration verification

**Files:** (read-only)

- [ ] **Step 1: Confirm all four files pass Node syntax check**

Run from the repo root:

```bash
node -c miniprogram/utils/game-engine.js && \
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && \
echo "All OK"
```

Expected output: `All OK`

- [ ] **Step 2: Grep the new combo hooks are wired**

Run:

```bash
grep -n "combo" miniprogram/utils/game-engine.js miniprogram/subpkg-chapters/pages/chapter/chapter.js miniprogram/subpkg-chapters/pages/chapter/chapter.wxml miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
```

Expected: combo references appear in all four files — engine (combo/maxCombo/comboMultiplier), chapter.js (comboCount/maxCombo plus vibrate+sound), wxml (combo-indicator block), wxss (.combo-indicator rules).

- [ ] **Step 3: Manual verification in WeChat DevTools (documented, not automated)**

The miniprogram has no automated test harness. Manual check (executor may skip and document this as 'pending manual verification' in the PR summary):

1. Open `miniprogram/` in WeChat DevTools.
2. Enter any chapter → start a quiz.
3. Answer 2 questions correctly in a row → combo indicator fades in showing `x2 🔥`.
4. Answer wrong → indicator fades back out (comboCount resets to 0).
5. Achieve 3+ consecutive correct → star sound plays; settle screen's EXP matches `baseExp * multiplier`.

---

## Self-review checklist

- Spec coverage: Combo data layer ✓, EXP multiplier ✓, combo indicator UI ✓, vibration + sound ✓. Animation polish (spring/shake/glow) explicitly deferred to sub-plan 2.
- No placeholders: every step shows exact code.
- Type consistency: field names (`combo` / `maxCombo` / `comboMultiplier` / `comboCount`) and multiplier thresholds (3 / 5 / 8) match parent spec.
- File scope: 4 files modified, 0 created. No WXS file, no new assets.
- Total step count: 16 checkboxes across 5 tasks. 15 of them are scripted; Task 5 Step 3 is a documented manual-verification note (no automation possible — the mini program has no test harness). Scripted step count is at the 15-step ceiling from CLAUDE.md.
