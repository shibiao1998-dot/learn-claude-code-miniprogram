# Phase 4c: 分享卡片定制 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate a terminal-styled share image after stage settlement, supporting WeChat friend sharing and save-to-album.

**Architecture:** New `utils/share-card.js` module uses `wx.createOffscreenCanvas()` to draw a dark terminal card (750×1000 virtual pixels) with stage results. Chapter settlement page gets a SHARE button between RETRY and MAP that triggers image generation, then presents an action sheet for sharing or saving.

**Tech Stack:** WeChat OffscreenCanvas API, `canvas.getContext('2d')`, `wx.canvasToTempFilePath()`, `wx.saveImageToPhotosAlbum()`, callback pattern (no async/await).

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/utils/share-card.js` | Create | Canvas drawing module — generates terminal-styled share image |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.js` | Modify | Share button logic — image generation, action sheet, save/share |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml` | Modify | Share button UI in settlement actions |
| `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` | Modify | Share button styles |

---

### Task 1: Create share-card.js canvas drawing module

**Files:**
- Create: `miniprogram/utils/share-card.js`

- [ ] **Step 1: Create `miniprogram/utils/share-card.js` with the full implementation**

```js
// utils/share-card.js

var COLORS = {
  bg: '#0D1117',
  text: '#E6EDF3',
  textMuted: '#8B949E',
  border: '#30363D',
  green: '#3FB950',
  gold: '#F0C040',
  orange: '#D29922',
  rarityN: '#484F58',
  rarityR: '#58A6FF',
  raritySR: '#BC8CFF',
  raritySSR: '#F0C040'
};

var RARITY_COLORS = {
  N: COLORS.rarityN,
  R: COLORS.rarityR,
  SR: COLORS.raritySR,
  SSR: COLORS.raritySSR
};

function generateShareImage(data, callback) {
  var width = 750;
  var height = 1000;
  var dpr = wx.getWindowInfo().pixelRatio || 2;

  var canvas = wx.createOffscreenCanvas({ type: '2d', width: width * dpr, height: height * dpr });
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  _drawBackground(ctx, width, height);
  _drawHeader(ctx, width);
  _drawTitle(ctx, data, width);
  _drawStars(ctx, data.stars, width);
  _drawScore(ctx, data, width);
  _drawCards(ctx, data.cards, width);
  _drawFooter(ctx, width, height);

  wx.canvasToTempFilePath({
    canvas: canvas,
    width: width * dpr,
    height: height * dpr,
    destWidth: width * dpr,
    destHeight: height * dpr,
    fileType: 'png',
    success: function(res) {
      callback(res.tempFilePath);
    },
    fail: function() {
      callback(null);
    }
  });
}

function _drawBackground(ctx, w, h) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.strokeRect(24, 24, w - 48, h - 48);
}

function _drawHeader(ctx, w) {
  ctx.font = '600 28px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'center';
  ctx.fillText('CLAUDE CODE TERMINAL', w / 2, 80);

  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(w - 50, 100);
  ctx.stroke();
}

function _drawTitle(ctx, data, w) {
  ctx.font = '700 40px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'center';
  ctx.fillText('STAGE CLEAR', w / 2, 160);

  ctx.font = '400 28px sans-serif';
  ctx.fillStyle = COLORS.text;
  ctx.fillText(data.title || '', w / 2, 200);
}

function _drawStars(ctx, stars, w) {
  var starSize = 48;
  var gap = 20;
  var totalWidth = starSize * 3 + gap * 2;
  var startX = (w - totalWidth) / 2;
  var y = 260;

  ctx.font = starSize + 'px sans-serif';
  ctx.textAlign = 'center';

  for (var i = 0; i < 3; i++) {
    var x = startX + i * (starSize + gap) + starSize / 2;
    ctx.fillStyle = i < stars ? COLORS.gold : COLORS.border;
    ctx.fillText('★', x, y);
  }
}

function _drawScore(ctx, data, w) {
  var lines = [
    { label: '> SCORE: ', value: data.score + '/' + data.total + ' (' + data.ratio + '%)' },
    { label: '> EXP: ', value: '+' + data.exp },
    { label: '> LEVEL: ', value: data.level }
  ];

  ctx.textAlign = 'left';
  var startX = 80;
  var y = 340;

  for (var i = 0; i < lines.length; i++) {
    ctx.font = '600 26px monospace';
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(lines[i].label, startX, y);

    var labelWidth = ctx.measureText(lines[i].label).width;
    ctx.fillStyle = COLORS.text;
    ctx.fillText(lines[i].value, startX + labelWidth, y);

    y += 50;
  }
}

function _drawCards(ctx, cards, w) {
  if (!cards || cards.length === 0) return;

  var y = 520;
  ctx.font = '600 24px monospace';
  ctx.fillStyle = COLORS.textMuted;
  ctx.textAlign = 'left';
  ctx.fillText('CARDS OBTAINED:', 80, y);

  var cardW = 160;
  var cardH = 120;
  var gap = 20;
  var totalWidth = cards.length * cardW + (cards.length - 1) * gap;
  var startX = (w - totalWidth) / 2;
  y += 30;

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var x = startX + i * (cardW + gap);
    var rarityColor = RARITY_COLORS[card.rarity] || COLORS.rarityN;

    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cardW, cardH);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(x + 1, y + 1, cardW - 2, cardH - 2);

    ctx.font = '700 20px monospace';
    ctx.fillStyle = rarityColor;
    ctx.textAlign = 'center';
    ctx.fillText(card.rarity, x + cardW / 2, y + 40);

    ctx.font = '400 18px sans-serif';
    ctx.fillStyle = COLORS.text;
    var name = card.name || '';
    if (name.length > 10) name = name.substring(0, 9) + '…';
    ctx.fillText(name, x + cardW / 2, y + 75);
  }
}

function _drawFooter(ctx, w, h) {
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, h - 120);
  ctx.lineTo(w - 50, h - 120);
  ctx.stroke();

  ctx.font = '400 24px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'left';
  ctx.fillText('user@claude:~$ ▌', 80, h - 80);

  ctx.font = '400 22px sans-serif';
  ctx.fillStyle = COLORS.textMuted;
  ctx.textAlign = 'center';
  ctx.fillText('── CC学习工具 ──', w / 2, h - 42);
}

module.exports = {
  generateShareImage: generateShareImage
};
```

- [ ] **Step 2: Verify the file was created correctly**

Run: `wc -l miniprogram/utils/share-card.js && head -3 miniprogram/utils/share-card.js && tail -3 miniprogram/utils/share-card.js`
Expected: ~165 lines, starts with `// utils/share-card.js`, ends with `module.exports`

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/share-card.js
git commit -m "feat: add share-card.js canvas drawing module for terminal-styled share images"
```

---

### Task 2: Add share button UI to chapter.wxml settlement

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml:148-155`

- [ ] **Step 1: Add SHARE button between RETRY and MAP in settlement actions**

Find this block in `chapter.wxml` (around lines 148-155):

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

Replace with:

```xml
      <!-- Action buttons (show after all animations) -->
      <view class="settle-actions {{animStep >= 7 ? 'settle-anim-fadein' : 'settle-anim-hidden'}}">
        <view class="btn-settle btn-settle--retry" bindtap="retryStage" wx:if="{{!reviewMode}}">
          <text class="btn-settle__text font-mono">> RETRY</text>
        </view>
        <view class="btn-settle btn-settle--share" bindtap="shareResult" wx:if="{{!reviewMode}}">
          <text class="btn-settle__text font-mono">> SHARE</text>
        </view>
        <view class="btn-settle btn-settle--map" bindtap="goToMap">
          <text class="btn-settle__text font-mono">> {{reviewMode ? 'HOME' : 'MAP'}}</text>
        </view>
      </view>
```

The only change is inserting the SHARE button view (3 lines) between RETRY and MAP.

- [ ] **Step 2: Verify the edit**

Run: `grep -n 'SHARE\|RETRY\|MAP\|settle-actions' miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`
Expected: Should show settle-actions, RETRY, SHARE, and MAP lines in order

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat: add SHARE button to chapter settlement UI"
```

---

### Task 3: Add share button styles to chapter.wxss

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss` (append after last line)

- [ ] **Step 1: Append share button styles at the end of chapter.wxss**

Append the following after the last line (line 665) of `chapter.wxss`:

```css

/* ── Share Button ── */
.btn-settle--share {
  background: var(--color-bg-elevated);
  border: 1rpx solid var(--color-terminal-green);
}

.btn-settle--share .btn-settle__text {
  color: var(--color-terminal-green);
}

.btn-settle--share:active {
  background: var(--color-terminal-green);
}

.btn-settle--share:active .btn-settle__text {
  color: #0D1117;
}
```

- [ ] **Step 2: Verify the styles were appended**

Run: `tail -20 miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`
Expected: Shows the new `.btn-settle--share` styles at the end

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat: add share button styles to chapter settlement"
```

---

### Task 4: Wire share logic into chapter.js

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:1-10` (imports)
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js:499-512` (before closing `});`)

- [ ] **Step 1: Add share-card import**

Find the imports at the top of `chapter.js` (lines 1-9):

```js
// subpkg-chapters/pages/chapter/chapter.js
var i18n = require('../../../utils/i18n');
var gameEngine = require('../../../utils/game-engine');
var gameCards = require('../../../utils/game-cards');
var gameDaily = require('../../../utils/game-daily');
var gameSave = require('../../../utils/game-save');
var gameReview = require('../../../utils/game-review');
var stageData = require('../../data/game-stages');
var sound = require('../../../utils/sound');
```

Add after the `sound` import line (after line 9):

```js
var shareCard = require('../../../utils/share-card');
```

- [ ] **Step 2: Add `shareResult` method and update `onShareAppMessage`**

Find the `onShareAppMessage` method near the end of `chapter.js` (around line 500):

```js
  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 闯关',
      path: '/pages/home/home'
    };
  },
```

Replace it with:

```js
  shareResult: function() {
    if (!this.data.result) return;
    var self = this;
    var levelInfo = gameSave.getLevelInfo();
    var shareData = {
      title: self.data.stageTitle,
      stars: self.data.result.stars,
      score: self.data.result.correctCount,
      total: self.data.result.totalQuestions,
      ratio: self.data.result.ratio,
      exp: self.data.result.expReward,
      level: levelInfo.title + ' Lv.' + levelInfo.level,
      cards: self.data.earnedCardDetails.map(function(c) {
        return { name: c.name, rarity: c.rarity };
      })
    };

    wx.showLoading({ title: '生成中...' });
    shareCard.generateShareImage(shareData, function(tempFilePath) {
      wx.hideLoading();
      if (!tempFilePath) {
        wx.showToast({ title: '生成失败', icon: 'none' });
        return;
      }
      self._shareImagePath = tempFilePath;
      wx.showActionSheet({
        itemList: ['分享给好友', '保存到相册'],
        success: function(res) {
          if (res.tapIndex === 0) {
            wx.showToast({ title: '请点击右上角分享', icon: 'none' });
          } else if (res.tapIndex === 1) {
            self._saveToAlbum(tempFilePath);
          }
        }
      });
    });
  },

  _saveToAlbum: function(filePath) {
    wx.saveImageToPhotosAlbum({
      filePath: filePath,
      success: function() {
        wx.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: function(err) {
        if (err.errMsg && err.errMsg.indexOf('auth deny') !== -1) {
          wx.showModal({
            title: '需要相册权限',
            content: '请在设置中开启相册访问权限',
            confirmText: '去设置',
            success: function(res) {
              if (res.confirm) {
                wx.openSetting();
              }
            }
          });
        } else {
          wx.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
  },

  onShareAppMessage: function() {
    var shareObj = {
      title: 'Claude Code Terminal — 闯关',
      path: '/pages/home/home'
    };
    if (this._shareImagePath) {
      shareObj.imageUrl = this._shareImagePath;
    }
    return shareObj;
  },
```

- [ ] **Step 3: Verify the edits**

Run: `grep -n 'shareCard\|shareResult\|_saveToAlbum\|_shareImagePath\|onShareAppMessage' miniprogram/subpkg-chapters/pages/chapter/chapter.js`
Expected: Shows shareCard import, shareResult method, _saveToAlbum method, _shareImagePath usage, and updated onShareAppMessage

- [ ] **Step 4: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat: wire share card generation and save-to-album into chapter settlement"
```

---

### Task 5: Final integration verification

- [ ] **Step 1: Verify all files are consistent**

Run these commands:

```bash
echo "=== share-card.js exports ==="
grep 'module.exports' miniprogram/utils/share-card.js

echo "=== chapter.js imports ==="
head -11 miniprogram/subpkg-chapters/pages/chapter/chapter.js

echo "=== chapter.wxml share button ==="
grep -A2 'btn-settle--share' miniprogram/subpkg-chapters/pages/chapter/chapter.wxml

echo "=== chapter.wxss share styles ==="
grep 'btn-settle--share' miniprogram/subpkg-chapters/pages/chapter/chapter.wxss

echo "=== chapter.js share methods ==="
grep -n 'shareResult\|_saveToAlbum\|onShareAppMessage' miniprogram/subpkg-chapters/pages/chapter/chapter.js
```

Expected:
- share-card.js exports `generateShareImage`
- chapter.js imports `shareCard`
- chapter.wxml has `btn-settle--share` with `bindtap="shareResult"`
- chapter.wxss has `.btn-settle--share` styles
- chapter.js has `shareResult`, `_saveToAlbum`, and `onShareAppMessage` methods

- [ ] **Step 2: Verify no syntax issues**

Run: `node -c miniprogram/utils/share-card.js && echo "share-card.js OK" && node -c miniprogram/subpkg-chapters/pages/chapter/chapter.js && echo "chapter.js OK"`
Expected: Both files pass syntax check
