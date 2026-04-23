# Phase 4a: 通关结算动画 + 振动 + 音效 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add settlement screen animations (sequenced reveal), haptic feedback on answer confirmation, and sound effects using Kenney CC0 audio assets.

**Architecture:** Pure WXSS `@keyframes` animations triggered by JS `setTimeout` chains setting data flags. Sound module wraps `wx.createInnerAudioContext()` with lazy init and enable/disable toggle. Vibration uses built-in `wx.vibrateShort`/`wx.vibrateLong`. No canvas, no external dependencies.

**Tech Stack:** Native WeChat miniprogram WXML/WXSS/JS, WXSS @keyframes, wx.createInnerAudioContext, wx.vibrateShort/vibrateLong

---

### Task 1: Create sound.js utility module

**Files:**
- Create: `miniprogram/utils/sound.js`

- [ ] **Step 1: Create sound.js with play/enable/disable API**

Create `miniprogram/utils/sound.js` with the following content:

```js
// utils/sound.js
var SOUND_KEY = 'sound_enabled';

var _contexts = {};
var _enabled = null;

var SOUNDS = {
  correct: '/assets/sounds/correct.ogg',
  wrong: '/assets/sounds/wrong.ogg',
  star: '/assets/sounds/star.ogg',
  levelup: '/assets/sounds/levelup.ogg',
  card: '/assets/sounds/card.ogg'
};

function isEnabled() {
  if (_enabled === null) {
    _enabled = wx.getStorageSync(SOUND_KEY);
    if (_enabled === '' || _enabled === undefined) {
      _enabled = true;
      wx.setStorageSync(SOUND_KEY, true);
    }
  }
  return _enabled;
}

function setEnabled(on) {
  _enabled = !!on;
  wx.setStorageSync(SOUND_KEY, _enabled);
}

function play(name) {
  if (!isEnabled()) return;
  var src = SOUNDS[name];
  if (!src) return;

  if (!_contexts[name]) {
    _contexts[name] = wx.createInnerAudioContext();
    _contexts[name].src = src;
  }

  var ctx = _contexts[name];
  ctx.stop();
  ctx.seek(0);
  ctx.play();
}

module.exports = {
  play: play,
  isEnabled: isEnabled,
  setEnabled: setEnabled
};
```

- [ ] **Step 2: Create assets/sounds directory with placeholder files**

Create directory `miniprogram/assets/sounds/`. We need 5 OGG audio files from Kenney's Interface Sounds pack (CC0 license). Since we cannot download them programmatically, create minimal placeholder files that will be replaced with real audio:

Run these commands to create the directory and placeholder info:

```bash
mkdir -p miniprogram/assets/sounds
```

Then create a README in the sounds directory:

Create `miniprogram/assets/sounds/README.md`:

```markdown
# Sound Effects

Source: [Kenney Interface Sounds](https://kenney.nl/assets/interface-sounds) (CC0 License)

## Required files

Download from Kenney and rename:
- `correct.ogg` — short confirmation beep (e.g., confirmation_002.ogg)
- `wrong.ogg` — short error tone (e.g., error_004.ogg)
- `star.ogg` — short switch/chime (e.g., switch_003.ogg)
- `levelup.ogg` — ascending tone (e.g., maximize_006.ogg)
- `card.ogg` — short drop/pop (e.g., drop_002.ogg)

All files should be < 5KB each for minimal package size impact.
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/sound.js miniprogram/assets/sounds/README.md
git commit -m "feat: add sound.js utility module with Kenney CC0 sound integration"
```

---

### Task 2: Add settlement animation system to chapter.js

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`

- [ ] **Step 1: Add sound and vibration imports, add animation data fields**

At the top of `chapter.js`, after the existing requires (line 6), add:

```js
var sound = require('../../../utils/sound');
```

In the `data` object (between `newLevel: null` at line 55 and the closing `},`), add these animation step flags:

```js
    newLevel: null,
    animStep: 0
```

- [ ] **Step 2: Add vibration calls in confirmAnswer**

In the `confirmAnswer` method, after `this.setData({ showFeedback: true, ... })` (after line 180), add vibration:

```js
    if (result.correct) {
      wx.vibrateShort({ type: 'light' });
      sound.play('correct');
    } else {
      wx.vibrateShort({ type: 'heavy' });
      sound.play('wrong');
    }
```

- [ ] **Step 3: Add _playSettlementAnimation method and update _showSettlement**

Add a new method `_playSettlementAnimation` to the Page object, and modify `_showSettlement` to call it.

At the end of the existing `_showSettlement` method, right before the closing `}` of the method, add this call after the `this.setData(...)`:

```js
    this._playSettlementAnimation();
```

Then add this new method to the Page object (after `_showSettlement`):

```js
  _playSettlementAnimation: function() {
    var self = this;
    var stars = self.data.result ? self.data.result.stars : 0;

    setTimeout(function() { self.setData({ animStep: 1 }); }, 100);

    setTimeout(function() { self.setData({ animStep: 2 }); }, 400);

    var starDelay = 600;
    for (var i = 1; i <= 3; i++) {
      (function(idx) {
        setTimeout(function() {
          self.setData({ animStep: 2 + idx });
          if (idx <= stars) {
            wx.vibrateShort({ type: 'medium' });
            sound.play('star');
          }
        }, starDelay + idx * 200);
      })(i);
    }

    setTimeout(function() { self.setData({ animStep: 6 }); }, 1400);

    setTimeout(function() { self.setData({ animStep: 7 }); }, 1600);

    if (self.data.newLevel) {
      setTimeout(function() {
        self.setData({ animStep: 8 });
        wx.vibrateLong();
        sound.play('levelup');
      }, 1800);
    }

    var cardStartDelay = self.data.newLevel ? 2100 : 1800;
    var earnedCards = self.data.earnedCardDetails || [];
    for (var j = 0; j < earnedCards.length; j++) {
      (function(idx) {
        setTimeout(function() {
          self.setData({ animStep: 9 + idx });
          sound.play('card');
        }, cardStartDelay + idx * 150);
      })(j);
    }
  },

```

- [ ] **Step 4: Reset animStep in retryStage**

In the `retryStage` method, add `animStep: 0` to the `this.setData(...)` call (inside the existing setData at around line 341-348):

```js
      this.setData({
        finished: false,
        showSettlement: false,
        showReview: false,
        showFeedback: false,
        selectedOption: '',
        animStep: 0
      });
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(chapter): add settlement animation sequencer with vibration and sound"
```

---

### Task 3: Add animation classes to chapter.wxml

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`

- [ ] **Step 1: Replace the settlement screen section with animated version**

Replace lines 97-152 (the entire `<!-- ══════════ Settlement Screen ══════════ -->` section) with:

```xml
  <!-- ══════════ Settlement Screen ══════════ -->
  <scroll-view scroll-y class="game-content" wx:if="{{showSettlement}}">

    <view class="settle-container">
      <!-- Stage complete header -->
      <view class="settle-header {{animStep >= 1 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <text class="settle-title font-mono" style="color:{{regionColor}}">STAGE CLEAR</text>
        <text class="settle-stage">{{stageTitle}}</text>
      </view>

      <!-- Stars -->
      <view class="settle-stars {{animStep >= 2 ? '' : 'settle-anim-hidden'}}">
        <text class="settle-star {{result.stars >= 1 ? 'settle-star--earned' : ''}} {{animStep >= 3 ? 'settle-star-pop' : 'settle-anim-hidden'}}">★</text>
        <text class="settle-star {{result.stars >= 2 ? 'settle-star--earned' : ''}} {{animStep >= 4 ? 'settle-star-pop' : 'settle-anim-hidden'}}">★</text>
        <text class="settle-star {{result.stars >= 3 ? 'settle-star--earned' : ''}} {{animStep >= 5 ? 'settle-star-pop' : 'settle-anim-hidden'}}">★</text>
      </view>

      <!-- Score -->
      <view class="settle-score {{animStep >= 6 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <text class="settle-score__text font-mono">{{result.correctCount}}/{{result.totalQuestions}} correct ({{result.ratio}}%)</text>
      </view>

      <!-- EXP gained -->
      <view class="settle-exp {{animStep >= 7 ? 'settle-anim-slidein' : 'settle-anim-hidden'}}">
        <text class="settle-exp__label font-mono">EXP +</text>
        <text class="settle-exp__value font-mono" style="color:{{regionColor}}">{{result.expReward}}</text>
      </view>

      <!-- Level up notification -->
      <view class="settle-levelup {{animStep >= 8 ? 'settle-anim-pulse' : 'settle-anim-hidden'}}" wx:if="{{newLevel}}">
        <text class="settle-levelup__text font-mono" style="color:var(--color-terminal-gold)">LEVEL UP! → {{newLevel.title}} Lv.{{newLevel.level}}</text>
      </view>

      <!-- Earned cards -->
      <view class="settle-cards" wx:if="{{earnedCardDetails.length > 0}}">
        <text class="settle-cards__title font-mono {{animStep >= 9 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">CARDS OBTAINED:</text>
        <view class="settle-cards__list">
          <view wx:for="{{earnedCardDetails}}" wx:key="id"
                class="settle-card settle-card--{{item.rarity}} {{animStep >= 9 + index ? 'settle-anim-slideup' : 'settle-anim-hidden'}}">
            <text class="settle-card__rarity font-mono">{{item.rarity}}</text>
            <text class="settle-card__name">{{item.name}}</text>
          </view>
        </view>
      </view>

      <!-- Action buttons (show after all animations) -->
      <view class="settle-actions {{animStep >= 7 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <view class="btn-settle btn-settle--retry" bindtap="retryStage">
          <text class="btn-settle__text font-mono">> RETRY</text>
        </view>
        <view class="btn-settle btn-settle--map" bindtap="goToMap">
          <text class="btn-settle__text font-mono">> MAP</text>
        </view>
      </view>
    </view>

  </scroll-view>
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): add animation condition classes to settlement WXML"
```

---

### Task 4: Add @keyframes animations to chapter.wxss

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`

- [ ] **Step 1: Append animation keyframes and utility classes at end of file**

Append the following at the end of `chapter.wxss` (after line 552):

```css

/* ── Settlement Animations ── */
.settle-anim-hidden {
  opacity: 0;
}

/* Fade in + slide up */
.settle-anim-fadein {
  animation: settleFadeIn 0.4s ease-out forwards;
}

@keyframes settleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Star pop (scale bounce) */
.settle-star-pop {
  animation: starPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes starPop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    opacity: 1;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide in from right */
.settle-anim-slidein {
  animation: settleSlideIn 0.35s ease-out forwards;
}

@keyframes settleSlideIn {
  from {
    opacity: 0;
    transform: translateX(40rpx);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Slide up from bottom (for cards) */
.settle-anim-slideup {
  animation: settleSlideUp 0.3s ease-out forwards;
}

@keyframes settleSlideUp {
  from {
    opacity: 0;
    transform: translateY(40rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse glow (for level up) */
.settle-anim-pulse {
  animation: settlePulse 0.6s ease-in-out forwards;
}

@keyframes settlePulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* SR/SSR card glow on animation */
.settle-card--SR.settle-anim-slideup {
  box-shadow: 0 0 16rpx 4rpx rgba(188, 140, 255, 0.3);
}

.settle-card--SSR.settle-anim-slideup {
  box-shadow: 0 0 20rpx 6rpx rgba(240, 192, 64, 0.35);
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): add settlement @keyframes animations and SR/SSR card glow"
```
