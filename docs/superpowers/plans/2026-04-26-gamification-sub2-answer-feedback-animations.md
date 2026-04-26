# Gamification Sub-Plan 2: Answer Feedback Animations

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add answer-phase visual feedback animations — combo bounce, combo-break overlay, and float-score rise — using a WXS animation module so that each quiz answer delivers immediate, satisfying visual response without touching the settlement screen.

**Architecture:** A new WXS module `quiz-anim.wxs` provides three functions driven by `change:` observer bindings in `chapter.wxml`: `onComboUpdate` springs the combo indicator on each correct answer, `onComboBreak` shows a translucent overlay flash when a combo of 2+ is broken, and `onFeedbackShow` floats a score label upward and fades it out. `chapter.js` adds five trigger/state fields to page data and extends `confirmAnswer` to set them; `nextQuestion` resets the transient display fields. `chapter.wxml` wires the bindings, adds the two overlay elements, and enriches option item classes with glow/shake/dim and a checkmark badge. `chapter.wxss` appends the new animation keyframes and utility classes.

**Tech Stack:** Native WeChat mini program — WXS (restricted JS subset), WXML, WXSS with CSS variables and `@keyframes`. No WXS `setTimeout` (not available); frame-based delays use repeated `requestAnimationFrame` calls. No npm, no bundler, no test harness.

**Parent Spec:** `docs/superpowers/specs/2026-04-25-gamification-interaction-enhancement-design.md`
**Parent Plan:** `docs/superpowers/plans/2026-04-25-gamification-interaction-enhancement.md` (Task 3 animation polish, Task 4 WXML wiring, Task 5 WXSS keyframes)
**Sub-plan 1 predecessor:** `docs/superpowers/plans/2026-04-26-gamification-sub1-combo-system.md` (must be merged first — provides `gameEngine.getComboMultiplier`, `gameEngine.isComboMilestone`, and the `comboCount`/`maxCombo` page-data fields this plan extends)

**Deferred to sub-plan 3 (settlement animations):** `onStarReveal`, `onScoreReveal`, `onExpReveal` WXS functions; settlement WXML/WXSS changes; `_showSettlement` / `_playSettlementAnimation` in `chapter.js`; card-flip effect; combo stats row in settlement screen.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` | Create | WXS animation module — 3 answer-phase functions |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Modify | 5 new page-data fields + `confirmAnswer` trigger logic + `nextQuestion` reset |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Modify | WXS import, combo binding, overlays, option class/checkmark upgrades |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` | Modify | Append float-score, combo-break, option-enhanced, checkmark styles |

---

### Task 1: Create quiz-anim.wxs

**Files:**
- Create: `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs`

WXS is a restricted subset of JS. Rules that apply here: `var` only, no arrow functions, no `let`/`const`, no `setTimeout`, no `require`. `Date.now()`, `Math.abs`, `Math.round`, `Math.min`, `Math.max`, `requestAnimationFrame` are available. This module exports exactly three functions for answer-phase animations; the three settlement functions (`onStarReveal`, `onScoreReveal`, `onExpReveal`) are deferred to sub-plan 3.

- [ ] **Step 1: Write quiz-anim.wxs**

Create `miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs` with this exact content:

```js
// quiz-anim.wxs — answer-phase animation observers
// WXS dialect: var only, no arrow functions, no setTimeout, no require.
// Bound via change: observers in chapter.wxml.

/**
 * onComboUpdate — spring-bounce the combo indicator on every correct answer.
 * Triggered by change:comboVal binding; fires when comboAnimTrigger changes.
 */
function onComboUpdate(newVal, oldVal, ownerInstance) {
  if (!newVal) return;
  var el = ownerInstance.selectComponent('.combo-indicator');
  if (!el) return;

  // Frame 0: snap to enlarged state
  el.setStyle({ transform: 'scale(1.5)', transition: 'none' });

  // Frame 1: spring back to normal
  function springBack() {
    el.setStyle({ transform: 'scale(1)', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' });
  }
  requestAnimationFrame(function() {
    requestAnimationFrame(springBack);
  });
}

/**
 * onComboBreak — brief translucent red overlay flash when a streak is broken.
 * Triggered by change:comboBreakVal binding; fires when comboBreakTrigger changes.
 */
function onComboBreak(newVal, oldVal, ownerInstance) {
  if (!newVal) return;
  var el = ownerInstance.selectComponent('.combo-break-container');
  if (!el) return;

  // Show the overlay, then fade it out after 2 frames
  el.setStyle({ opacity: '1', transition: 'none' });

  function fadeOut() {
    el.setStyle({ opacity: '0', transition: 'opacity 0.6s ease-out' });
  }
  requestAnimationFrame(function() {
    requestAnimationFrame(fadeOut);
  });
}

/**
 * onFeedbackShow — float score text upward while fading to transparent.
 * Triggered by change:feedbackAnimTrigger binding.
 */
function onFeedbackShow(newVal, oldVal, ownerInstance) {
  if (!newVal) return;
  var el = ownerInstance.selectComponent('.float-score');
  if (!el) return;

  // Reset to start position
  el.setStyle({ opacity: '1', transform: 'translateY(0)', transition: 'none' });

  // One rAF double-pump: commit reset, then start rise+fade
  function startRise() {
    el.setStyle({
      opacity: '0',
      transform: 'translateY(-80rpx)',
      transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
    });
  }
  requestAnimationFrame(function() {
    requestAnimationFrame(startRise);
  });
}

module.exports = {
  onComboUpdate: onComboUpdate,
  onComboBreak: onComboBreak,
  onFeedbackShow: onFeedbackShow
};
```

- [ ] **Step 2: Syntax check (partial — Node.js catches JS syntax; WXS quirks need DevTools)**

Run from the repo root:

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs && echo "Syntax OK"
```

Expected output: `Syntax OK`. Note: `node -c` does not validate WXS-specific restrictions (no `setTimeout`, `selectComponent` signature, etc.) — those must be verified manually in WeChat DevTools.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
git commit -m "feat(chapter): add WXS answer-phase animation module (sub-plan 2)

quiz-anim.wxs exports onComboUpdate (spring bounce), onComboBreak
(overlay flash), and onFeedbackShow (float score rise+fade). Uses
requestAnimationFrame double-pump for deferred style commits; no
setTimeout (unsupported in WXS)."
```

---

### Task 2: chapter.js — state fields + confirmAnswer + nextQuestion

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:79-83` (page data, after sub-plan-1 fields)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:297-338` (confirmAnswer)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:375-385` (nextQuestion setData block)

- [ ] **Step 1: Add 5 trigger/state fields after the sub-plan-1 fields (line 83)**

In `chapter.js`, the sub-plan-1 fields currently end at line 82-83:

```js
    comboMultiplier: 1.0,  // populated by _showSettlement() in sub-plan 3
    baseExp: 0             // populated by _showSettlement() in sub-plan 3
```

Replace those two lines with:

```js
    comboMultiplier: 1.0,  // populated by _showSettlement() in sub-plan 3
    baseExp: 0,            // populated by _showSettlement() in sub-plan 3

    comboAnimTrigger: 0,
    comboBreakTrigger: 0,
    comboBreakShow: false,
    feedbackAnimTrigger: 0,
    floatScoreText: ''
```

- [ ] **Step 2: Rewrite confirmAnswer() (lines 297-338)**

Replace the entire `confirmAnswer` method with:

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

      // Build float score label: base +1 with optional multiplier suffix
      var multiplier = gameEngine.getComboMultiplier(result.combo);
      var scoreLabel = '+1';
      if (multiplier >= 2.0) {
        scoreLabel = '+1 ×2.0';
      } else if (multiplier >= 1.5) {
        scoreLabel = '+1 ×1.5';
      } else if (multiplier >= 1.2) {
        scoreLabel = '+1 ×1.2';
      }
      updateData.floatScoreText = scoreLabel;
      updateData.comboAnimTrigger = Date.now();
      updateData.feedbackAnimTrigger = Date.now();

      wx.vibrateShort({ type: 'light' });
      sound.play('correct');

      if (gameEngine.isComboMilestone(result.combo)) {
        sound.play('star');
      }
    } else {
      // Combo break: show overlay only if there was a streak of 2+
      if (this.data.comboCount >= 2) {
        updateData.comboBreakShow = true;
        updateData.comboBreakTrigger = Date.now();
      }
      updateData.comboCount = 0;
      updateData.floatScoreText = '';

      wx.vibrateShort({ type: 'heavy' });
      sound.play('wrong');
      gameReview.addToReview(q.id);
    }

    this.setData(updateData);
  },
```

- [ ] **Step 3: Patch nextQuestion setData block (lines 375-385)**

The existing `setData` call in `nextQuestion` (lines 375-385) is:

```js
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
```

Replace it with:

```js
    this.setData({
      currentQuestion: this._formatQuestion(q, locale),
      showFeedback: false,
      selectedOption: '',
      feedbackCorrect: false,
      feedbackExplanation: '',
      feedbackAnswer: '',
      questionIndex: idx,
      totalQuestions: totalQ,
      progressPercent: Math.round(idx / totalQ * 100),
      comboBreakShow: false,
      floatScoreText: ''
    });
```

- [ ] **Step 4: Verify syntax**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "Syntax OK"
```

Expected output: `Syntax OK`

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): add animation trigger fields and feedback scoring (sub-plan 2)

Add comboAnimTrigger, comboBreakTrigger, comboBreakShow, feedbackAnimTrigger,
floatScoreText to page data. confirmAnswer() sets trigger timestamps and builds
float score label using gameEngine.getComboMultiplier(); combo-break overlay
fires only when existing streak >= 2. nextQuestion() resets comboBreakShow and
floatScoreText on each new question."
```

---

### Task 3: chapter.wxml — WXS import, bindings, overlays, option classes

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:2` (WXS import after opening tag)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:12-15` (combo-indicator view)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:95-106` (options-list block)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:107` (insert overlays)

- [ ] **Step 1: Add WXS import immediately after line 2 (`<view class="game-page">`)**

Replace line 2:

```xml
<view class="game-page">
```

With:

```xml
<view class="game-page">
<wxs module="anim" src="./quiz-anim.wxs"></wxs>
```

- [ ] **Step 2: Add change: bindings to the combo-indicator view (currently lines 12-15)**

The current combo-indicator block (lines 12-15) is:

```xml
      <view class="combo-indicator {{comboCount >= 2 ? 'combo-indicator--show' : ''}}">
        <text class="combo-number font-mono" style="color:{{regionColor}}">×{{comboCount}}</text>
        <text class="combo-fire">🔥</text>
      </view>
```

Replace it with:

```xml
      <view
        class="combo-indicator {{comboCount >= 2 ? 'combo-indicator--show' : ''}}"
        change:comboVal="{{anim.onComboUpdate}}"
        comboVal="{{comboAnimTrigger}}"
      >
        <text class="combo-number font-mono" style="color:{{regionColor}}">×{{comboCount}}</text>
        <text class="combo-fire">🔥</text>
      </view>
```

- [ ] **Step 3: Rewrite the options-list block with glow/shake/dim classes and checkmark badge (lines 95-106)**

The current options-list block (lines 95-106) is:

```xml
    <!-- Options -->
    <view class="options-list">
      <view
        wx:for="{{currentQuestion.options}}"
        wx:key="id"
        class="option-item {{selectedOption === item.id ? 'option--selected' : ''}} {{showFeedback && item.id === feedbackAnswer ? 'option--correct' : ''}} {{showFeedback && selectedOption === item.id && !feedbackCorrect ? 'option--wrong' : ''}}"
        bindtap="selectOption"
        data-optionid="{{item.id}}"
      >
        <text class="option-id">{{item.id}}</text>
        <text class="option-text">{{item.text}}</text>
      </view>
    </view>
```

Replace it with:

```xml
    <!-- Options -->
    <view class="options-list">
      <view
        wx:for="{{currentQuestion.options}}"
        wx:key="id"
        class="option-item {{selectedOption === item.id ? 'option--selected' : ''}} {{showFeedback && item.id === feedbackAnswer ? 'option--correct option--correct-glow' : ''}} {{showFeedback && selectedOption === item.id && !feedbackCorrect ? 'option--wrong option--wrong-shake' : ''}} {{showFeedback && item.id !== feedbackAnswer && !(selectedOption === item.id && !feedbackCorrect) ? 'option--dimmed' : ''}}"
        bindtap="selectOption"
        data-optionid="{{item.id}}"
      >
        <text class="option-id">{{item.id}}</text>
        <text class="option-text">{{item.text}}</text>
        <text class="option-check" wx:if="{{showFeedback && item.id === feedbackAnswer}}">✓</text>
      </view>
    </view>
```

- [ ] **Step 4: Insert float-score container and combo-break overlay after the options-list block (after line 106, before the existing comment `<!-- Confirm button -->`)**

After the closing `</view>` of `.options-list`, insert:

```xml
    <!-- Float score (rises on correct answer) -->
    <view class="float-score-container" wx:if="{{floatScoreText}}"
      change:feedbackTrigger="{{anim.onFeedbackShow}}"
      feedbackTrigger="{{feedbackAnimTrigger}}"
    >
      <text class="float-score" style="color:{{regionColor}}">{{floatScoreText}}</text>
    </view>

    <!-- Combo-break overlay (flash on streak loss) -->
    <view class="combo-break-container" wx:if="{{comboBreakShow}}"
      change:breakTrigger="{{anim.onComboBreak}}"
      breakTrigger="{{comboBreakTrigger}}"
    >
      <text class="combo-break-text">连击中断!</text>
    </view>
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): wire WXS animation bindings, overlays, option enhancement (sub-plan 2)

Add <wxs> import for quiz-anim.wxs. Bind change:comboVal on combo-indicator.
Add float-score-container and combo-break-container overlays after options-list.
Upgrade option class expression with option--correct-glow, option--wrong-shake,
option--dimmed, and a checkmark badge on the correct option after feedback."
```

---

### Task 4: chapter.wxss — append feedback animation styles

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (append at end, currently 949 lines)

- [ ] **Step 1: Append all feedback animation CSS blocks**

Append the following to the end of `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (after the existing `/* ══════════ Combo Indicator ══════════ */` block at lines 926-949):

```css
/* ══════════ Float Score ══════════ */
.float-score-container {
  position: relative;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  overflow: visible;
}

.float-score {
  font-size: var(--font-2xl);
  font-weight: 800;
  opacity: 1;
  transform: translateY(0);
  /* transition driven by WXS onFeedbackShow */
}

/* ══════════ Combo Break Overlay ══════════ */
.combo-break-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(239, 68, 68, 0.15); /* --color-error at 15% opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 100;
  opacity: 0;
  /* transition driven by WXS onComboBreak */
}

.combo-break-text {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-error);
  letter-spacing: 4rpx;
}

/* ══════════ Option Enhanced States ══════════ */
.option--correct-glow {
  box-shadow: 0 0 0 4rpx var(--color-success);
  background: rgba(16, 185, 129, 0.08); /* --color-success at 8% */
}

.option--wrong-shake {
  animation: enhancedShake 0.45s ease-out;
}

@keyframes enhancedShake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-12rpx); }
  30%  { transform: translateX(10rpx); }
  45%  { transform: translateX(-8rpx); }
  60%  { transform: translateX(6rpx); }
  75%  { transform: translateX(-4rpx); }
  90%  { transform: translateX(2rpx); }
  100% { transform: translateX(0); }
}

.option--dimmed {
  opacity: 0.4;
}

/* ══════════ Option Checkmark Badge ══════════ */
.option-check {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-success);
  margin-left: var(--spacing-xs);
  animation: checkPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes checkPop {
  0%   { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
```

- [ ] **Step 2: Verify line count**

```bash
wc -l miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
```

Expected: approximately 1055–1070 lines (949 existing + ~115 appended).

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): append answer-feedback animation styles (sub-plan 2)

Add float-score-container/float-score (WXS-driven rise+fade), combo-break-container
overlay (fixed full-screen tint), option--correct-glow (success ring), option--wrong-shake
(enhanced 7-step keyframe), option--dimmed (non-answer fade), option-check badge with
checkPop spring animation. All colours use CSS variables; all dimensions in rpx."
```

---

### Task 5: Integration verification

**Files:** (read-only checks)

- [ ] **Step 1: Syntax check both .js and .wxs files**

```bash
node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && \
node -c miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs && \
echo "All OK"
```

Expected output: `All OK`

- [ ] **Step 2: Grep that all trigger fields declared in chapter.js appear in chapter.wxml**

```bash
grep -n "comboAnimTrigger\|comboBreakTrigger\|comboBreakShow\|feedbackAnimTrigger\|floatScoreText" \
  miniprogram/subpkg-chapters/pages/chapter/chapter.js \
  miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
```

Expected: each of the five field names appears in both files.

- [ ] **Step 3: Grep that all exported anim.* references in chapter.wxml match module.exports in quiz-anim.wxs**

```bash
grep -n "anim\." miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
grep -n "module.exports" miniprogram/subpkg-chapters/pages/chapter/quiz-anim.wxs
```

Expected: `anim.onComboUpdate`, `anim.onComboBreak`, `anim.onFeedbackShow` in wxml; all three keys present in `module.exports` in the wxs file.

- [ ] **Step 4: Manual verification in WeChat DevTools (documented, not automated)**

The miniprogram has no automated test harness. WXS/WXML/WXSS have no CLI validator. Manual check (executor may document as 'pending manual verification' in the PR summary if DevTools is unavailable):

1. Open `miniprogram/` in WeChat DevTools.
2. Enter any chapter, start a quiz.
3. Answer correctly: combo indicator springs larger then snaps back; a float score label (`+1` or `+1 ×1.2` etc.) rises upward and fades; the correct option glows green with a `✓` badge; other options dim to 40% opacity.
4. Answer correctly a second time: `×2 🔥` indicator in header; float score shows `+1` again.
5. Answer correctly three times: milestone sound (`star`) plays; float score shows `+1 ×1.2`.
6. Answer wrongly after a streak of 2+: wrong option shakes; full-screen red tint flashes and fades; "连击中断!" text briefly visible.
7. Answer wrongly from streak of 0 or 1: wrong option shakes; no combo-break overlay.
8. Tap "下一题": `comboBreakShow` resets (overlay gone), `floatScoreText` resets (container hidden).

---

## Self-review checklist

- **Spec coverage:** All six in-scope lines are addressed — `quiz-anim.wxs` with exactly 3 functions ✓; page-data additions (all 5 fields) ✓; `confirmAnswer` trigger logic including `getComboMultiplier`-based label and combo-break guard ✓; `nextQuestion` reset ✓; WXML WXS import + combo binding + overlays + option class upgrade + checkmark ✓; WXSS all 6 named rule-sets ✓.
- **Explicit deferrals to sub-plan 3:** `onStarReveal`, `onScoreReveal`, `onExpReveal` WXS functions; settlement WXML/WXSS additions; `_showSettlement` / `_playSettlementAnimation` in `chapter.js`; card-flip effect; combo stats row in settlement — none touched here.
- **No placeholders:** Every step contains the exact code to paste.
- **Type consistency:** Field names `comboAnimTrigger`, `comboBreakTrigger`, `comboBreakShow`, `feedbackAnimTrigger`, `floatScoreText` match between `chapter.js` data declarations, `chapter.wxml` bindings, and `quiz-anim.wxs` `selectComponent` targets. WXS function names in `module.exports` (`onComboUpdate`, `onComboBreak`, `onFeedbackShow`) match the `anim.*` references in `chapter.wxml`.
- **JS dialect compliance:** `chapter.js` additions use `var` only (no `let`/`const`), no arrow functions at module scope, no `async/await`, no optional chaining, no object spread. `quiz-anim.wxs` uses `var` only, no `setTimeout` (uses `requestAnimationFrame` double-pump instead).
- **Design tokens:** All colours reference `var(--color-success)`, `var(--color-error)`, `var(--color-accent-gold)` etc.; all font sizes reference `var(--font-*)` variables; all dimensions in `rpx`, none in `px`.
- **Scripted step count:** 15 checkboxes across 5 tasks (Task 1: 3, Task 2: 5, Task 3: 5, Task 4: 3, Task 5: 4 — Step 4 is a documented manual-verification note, not an automated step). Total automated scripted steps: 14; one manual DevTools verification step documented as non-blocking. At the 15-step ceiling from CLAUDE.md.
