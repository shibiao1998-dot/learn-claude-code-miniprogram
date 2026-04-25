# Phase 3a: 全局主题 + 首页重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Switch the miniprogram to a dark terminal theme and rebuild the home page as a gamified "Terminal Console" — the player's main hub showing progress, daily challenge entry, continue-playing button, and recently obtained cards.

**Architecture:** Modify `app.wxss` CSS variables for dark theme, update `app.json` for new TabBar styling and labels, update `app.js` to initialize game save on launch, then completely rewrite `pages/home/home.*` (WXML/WXSS/JS) to use the Phase 2 game engine modules.

**Tech Stack:** Native WeChat miniprogram (WXML/WXSS/JS), CSS variables, CommonJS modules. NO async/await, NO optional chaining, NO spread (use Object.assign).

**Design spec:** `docs/superpowers/specs/2026-04-21-gamification-redesign-design.md` Sections 5 and 6.

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `miniprogram/app.wxss` | Rewrite | Dark terminal theme CSS variables + utility classes |
| `miniprogram/app.json` | Modify | Dark TabBar colors, new tab labels, navigation bar dark |
| `miniprogram/app.js` | Modify | Initialize game save + check achievements on launch |
| `miniprogram/pages/home/home.wxml` | Rewrite | Terminal console layout |
| `miniprogram/pages/home/home.wxss` | Rewrite | Terminal console styles |
| `miniprogram/pages/home/home.js` | Rewrite | Game state loading + navigation |
| `scripts/generate-icons.js` | Modify | New terminal-style icon glyphs + dark theme colors |

---

## Task 1: Dark Terminal Theme (app.wxss)

**Files:**
- Rewrite: `miniprogram/app.wxss`

- [ ] **Step 1: Replace app.wxss with dark terminal theme**

Replace the entire content of `miniprogram/app.wxss` with:

```css
/* app.wxss — Terminal Dark Theme */
page {
  /* Background & Surface */
  --color-bg: #0D1117;
  --color-bg-card: #161B22;
  --color-bg-elevated: #21262D;
  --color-bg-muted: #30363D;

  /* Text hierarchy */
  --color-text-primary: #E6EDF3;
  --color-text-secondary: #8B949E;
  --color-text-muted: #484F58;
  --color-text-faint: #30363D;

  /* Terminal accent colors */
  --color-terminal-green: #3FB950;
  --color-terminal-orange: #D29922;
  --color-terminal-red: #F85149;
  --color-terminal-blue: #58A6FF;
  --color-terminal-purple: #BC8CFF;
  --color-terminal-gold: #F0C040;

  /* Region colors */
  --color-region-core: #3FB950;
  --color-region-tools: #58A6FF;
  --color-region-runtime: #BC8CFF;
  --color-region-network: #F85149;
  --color-region-practice: #D29922;

  /* Rarity colors */
  --color-rarity-n: #484F58;
  --color-rarity-r: #58A6FF;
  --color-rarity-sr: #BC8CFF;
  --color-rarity-ssr: #F0C040;

  /* Borders */
  --color-border: #30363D;
  --color-border-light: #21262D;

  /* Semantic */
  --color-success: #3FB950;
  --color-warning: #D29922;
  --color-error: #F85149;

  /* Radius */
  --radius-xs: 4rpx;
  --radius-sm: 8rpx;
  --radius-md: 12rpx;
  --radius-lg: 16rpx;
  --radius-pill: 200rpx;

  /* Spacing — 4px grid (8rpx = 4px) */
  --spacing-xs: 8rpx;
  --spacing-sm: 16rpx;
  --spacing-md: 24rpx;
  --spacing-lg: 32rpx;
  --spacing-xl: 40rpx;
  --spacing-2xl: 48rpx;

  /* Typography scale */
  --font-2xs: 20rpx;
  --font-xs: 22rpx;
  --font-sm: 26rpx;
  --font-base: 28rpx;
  --font-md: 32rpx;
  --font-lg: 36rpx;
  --font-xl: 44rpx;
  --font-2xl: 48rpx;
  --font-3xl: 56rpx;

  /* Font families */
  --font-mono: Menlo, 'Courier New', Consolas, monospace;
  --font-body: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'PingFang SC', sans-serif;

  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: var(--font-body);
  font-size: var(--font-base);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

/* Utility classes */
.text-primary { color: var(--color-text-primary); }
.text-secondary { color: var(--color-text-secondary); }
.text-muted { color: var(--color-text-muted); }
.text-green { color: var(--color-terminal-green); }
.text-blue { color: var(--color-terminal-blue); }
.text-orange { color: var(--color-terminal-orange); }
.text-red { color: var(--color-terminal-red); }
.text-purple { color: var(--color-terminal-purple); }
.text-gold { color: var(--color-terminal-gold); }

.font-mono { font-family: var(--font-mono); }

.region-core { color: var(--color-region-core); }
.region-tools { color: var(--color-region-tools); }
.region-runtime { color: var(--color-region-runtime); }
.region-network { color: var(--color-region-network); }
.region-practice { color: var(--color-region-practice); }
```

- [ ] **Step 2: Verify in DevTools — pages should show dark background**

Open WeChat DevTools, navigate to home page. Background should be `#0D1117` (near black). Text should be light.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/app.wxss
git commit -m "feat(game): switch to dark terminal theme"
```

---

## Task 2: App Configuration (app.json + app.js)

**Files:**
- Modify: `miniprogram/app.json`
- Modify: `miniprogram/app.js`

- [ ] **Step 1: Update app.json for dark theme and new tab labels**

Replace the entire content of `miniprogram/app.json` with:

```json
{
  "pages": [
    "pages/home/home",
    "pages/timeline/timeline",
    "pages/layers/layers",
    "pages/reference/reference"
  ],
  "subpackages": [
    {
      "root": "subpkg-chapters",
      "pages": [
        "pages/chapter/chapter"
      ]
    },
    {
      "root": "subpkg-bridge",
      "pages": [
        "pages/bridge-doc/bridge-doc"
      ]
    },
    {
      "root": "subpkg-compare",
      "pages": [
        "pages/compare/compare"
      ]
    }
  ],
  "window": {
    "backgroundTextStyle": "dark",
    "navigationBarBackgroundColor": "#0D1117",
    "navigationBarTitleText": "Claude Code Terminal",
    "navigationBarTextStyle": "white",
    "backgroundColor": "#0D1117"
  },
  "tabBar": {
    "color": "#484F58",
    "selectedColor": "#E6EDF3",
    "backgroundColor": "#161B22",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/home/home",
        "text": "终端",
        "iconPath": "assets/icons/home.png",
        "selectedIconPath": "assets/icons/home-active.png"
      },
      {
        "pagePath": "pages/timeline/timeline",
        "text": "地图",
        "iconPath": "assets/icons/timeline.png",
        "selectedIconPath": "assets/icons/timeline-active.png"
      },
      {
        "pagePath": "pages/layers/layers",
        "text": "图鉴",
        "iconPath": "assets/icons/layers.png",
        "selectedIconPath": "assets/icons/layers-active.png"
      },
      {
        "pagePath": "pages/reference/reference",
        "text": "档案",
        "iconPath": "assets/icons/reference.png",
        "selectedIconPath": "assets/icons/reference-active.png"
      }
    ]
  },
  "style": "v2",
  "sitemapLocation": "sitemap.json",
  "lazyCodeLoading": "requiredComponents"
}
```

- [ ] **Step 2: Update app.js to initialize game save**

Replace the entire content of `miniprogram/app.js` with:

```js
// app.js
const i18n = require('./utils/i18n');
const storage = require('./utils/storage');
const gameSave = require('./utils/game-save');
const gameAchievement = require('./utils/game-achievement');

App({
  globalData: {
    locale: 'zh',
    theme: 'dark',
  },

  onLaunch() {
    // Load saved locale
    const savedLocale = storage.getLocale();
    if (savedLocale) {
      this.globalData.locale = savedLocale;
    }
    // Initialize i18n
    i18n.init(this.globalData.locale);

    // Initialize game save (creates default if first launch)
    gameSave.load();

    // Check achievements on launch (e.g., first_login)
    gameAchievement.checkAndUnlock();
  },

  setLocale(locale) {
    this.globalData.locale = locale;
    storage.setLocale(locale);
    i18n.setLocale(locale);
  },
});
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/app.json miniprogram/app.js
git commit -m "feat(game): dark theme config + game save initialization"
```

---

## Task 3: Generate Dark Theme TabBar Icons

**Files:**
- Modify: `scripts/generate-icons.js`

Update the icon generation script to use dark theme colors and terminal-style glyphs.

- [ ] **Step 1: Update generate-icons.js colors and icon designs**

The icon script generates 81x81 PNG files. We need to update:
1. Colors: inactive `#484F58`, active `#E6EDF3` (matching new TabBar config)
2. Icon designs: keep the existing geometric shapes but update for terminal aesthetic

Open `scripts/generate-icons.js` and change the color constants near the top:

Find:
```js
const INACTIVE = { r: 148, g: 163, b: 184 }; // #94A3B8
const ACTIVE = { r: 15, g: 23, b: 42 };       // #0F172A
```

Replace with:
```js
const INACTIVE = { r: 72, g: 79, b: 88 };     // #484F58
const ACTIVE = { r: 230, g: 237, b: 243 };    // #E6EDF3
```

- [ ] **Step 2: Regenerate icons**

Run: `node scripts/generate-icons.js`

Verify: `ls -la miniprogram/assets/icons/` shows 8 updated PNG files.

- [ ] **Step 3: Commit**

```bash
git add scripts/generate-icons.js miniprogram/assets/icons/
git commit -m "feat(game): update TabBar icons for dark theme"
```

---

## Task 4: Home Page — Terminal Console (JS)

**Files:**
- Rewrite: `miniprogram/pages/home/home.js`

- [ ] **Step 1: Replace home.js with game-powered version**

Replace the entire content of `miniprogram/pages/home/home.js` with:

```js
// pages/home/home.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameSave = require('../../utils/game-save');
var gameEngine = require('../../utils/game-engine');
var gameCards = require('../../utils/game-cards');
var gameDaily = require('../../utils/game-daily');
var gameAchievement = require('../../utils/game-achievement');
var stageData = require('../../subpkg-chapters/data/game-stages');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', stages: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'] },
  { id: 'tools', symbol: '$', label: 'TOOLS/', stages: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'] },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', stages: ['stage_s12','stage_s13','stage_s14'] },
  { id: 'network', symbol: '@', label: 'NETWORK/', stages: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'] },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', stages: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07'] }
];

Page({
  data: {
    locale: 'zh',
    t: {},
    // Player info
    levelInfo: {},
    streakInfo: {},
    collectionStats: {},
    // Region progress
    regions: [],
    totalProgress: 0,
    // Daily
    dailyState: {},
    // Recent cards
    recentCards: [],
    // Continue playing
    nextStageId: null,
    nextRegionLabel: '',
  },

  onLoad: function() {
    this._buildPageData();
    this._localeListener = function(locale) {
      this.setData({ locale: locale });
      this._buildPageData();
    }.bind(this);
    eventBus.on('locale:change', this._localeListener);
  },

  onUnload: function() {
    eventBus.off('locale:change', this._localeListener);
  },

  onShow: function() {
    this._refreshGameState();
  },

  _buildPageData: function() {
    var locale = i18n.getLocale();
    var messages = {};
    try {
      switch (locale) {
        case 'en': messages = require('../../i18n/en.js'); break;
        case 'ja': messages = require('../../i18n/ja.js'); break;
        default:   messages = require('../../i18n/zh.js'); break;
      }
    } catch (e) {
      console.warn('[home] i18n load failed');
    }

    this.setData({ locale: locale, t: messages });
    this._refreshGameState();
  },

  _refreshGameState: function() {
    var levelInfo = gameSave.getLevelInfo();
    var streakInfo = gameDaily.getStreakInfo();
    var collectionStats = gameCards.getCollectionStats();
    var dailyState = gameDaily.getDailyState();

    // Build region progress
    var totalCleared = 0;
    var totalStages = 0;
    var nextStageId = null;
    var nextRegionLabel = '';

    var regions = REGIONS.map(function(r) {
      var progress = gameEngine.getRegionProgress(r.stages);
      var unlocked = gameEngine.isRegionUnlocked(r.id, stageData.stages);
      totalCleared += progress.cleared;
      totalStages += progress.total;

      // Find next playable stage
      if (!nextStageId && unlocked) {
        for (var i = 0; i < r.stages.length; i++) {
          var sp = gameEngine.getStageProgress(r.stages[i]);
          if (!sp || sp.stars === 0) {
            nextStageId = r.stages[i];
            nextRegionLabel = r.label;
            break;
          }
        }
      }

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        cleared: progress.cleared,
        total: progress.total,
        totalStars: progress.totalStars,
        ratio: progress.ratio,
        unlocked: unlocked,
        barWidth: Math.round(progress.ratio * 100)
      };
    });

    var totalProgress = totalStages > 0 ? Math.round(totalCleared / totalStages * 100) : 0;

    // Recent cards (last 5 obtained, sorted by obtainedAt)
    var save = gameSave.load();
    var cardEntries = Object.keys(save.cards).map(function(id) {
      return { id: id, obtainedAt: save.cards[id].obtainedAt || 0 };
    });
    cardEntries.sort(function(a, b) { return b.obtainedAt - a.obtainedAt; });
    var recentCards = cardEntries.slice(0, 5).map(function(entry) {
      var card = gameCards.getCard(entry.id);
      if (!card) return null;
      return {
        id: card.id,
        name: card.name,
        rarity: card.rarity,
        region: card.region
      };
    }).filter(Boolean);

    // Check achievements
    gameAchievement.checkAndUnlock();

    this.setData({
      levelInfo: levelInfo,
      streakInfo: streakInfo,
      collectionStats: collectionStats,
      dailyState: dailyState,
      regions: regions,
      totalProgress: totalProgress,
      recentCards: recentCards,
      nextStageId: nextStageId,
      nextRegionLabel: nextRegionLabel
    });
  },

  // --- Navigation ---
  goToDailyChallenge: function() {
    wx.navigateTo({
      url: '/subpkg-chapters/pages/chapter/chapter?mode=daily'
    });
  },

  goToContinue: function() {
    if (this.data.nextStageId) {
      var chapter = this.data.nextStageId.replace('stage_', '');
      wx.navigateTo({
        url: '/subpkg-chapters/pages/chapter/chapter?id=' + chapter
      });
    }
  },

  goToMap: function() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  switchLocale: function(e) {
    var locale = e.currentTarget.dataset.locale;
    var app = getApp();
    app.setLocale(locale);
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 游戏化学习',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 游戏化学习'
    };
  },
});
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/home/home.js
git commit -m "feat(game): rewrite home.js as terminal console with game state"
```

---

## Task 5: Home Page — Terminal Console (WXML)

**Files:**
- Rewrite: `miniprogram/pages/home/home.wxml`

- [ ] **Step 1: Replace home.wxml with terminal console layout**

Replace the entire content of `miniprogram/pages/home/home.wxml` with:

```xml
<!-- pages/home/home.wxml — Terminal Console -->
<scroll-view scroll-y class="terminal-page">

  <!-- Terminal Header -->
  <view class="terminal-header">
    <view class="header-top">
      <text class="terminal-title font-mono">CLAUDE CODE TERMINAL</text>
      <view class="lang-switcher">
        <text class="lang-btn {{locale=='zh'?'active':''}}" bindtap="switchLocale" data-locale="zh">中</text>
        <text class="lang-btn {{locale=='en'?'active':''}}" bindtap="switchLocale" data-locale="en">EN</text>
        <text class="lang-btn {{locale=='ja'?'active':''}}" bindtap="switchLocale" data-locale="ja">日</text>
      </view>
    </view>
    <text class="terminal-prompt font-mono">{{levelInfo.title || 'guest'}}@claude:~$</text>
  </view>

  <!-- Player Status -->
  <view class="status-card">
    <view class="status-row">
      <text class="status-label font-mono">Level {{levelInfo.level || 1}}</text>
      <text class="status-sep">·</text>
      <text class="status-value font-mono">{{levelInfo.title || 'guest'}}</text>
      <text class="status-sep">·</text>
      <text class="status-value font-mono">{{levelInfo.exp || 0}} exp</text>
    </view>
    <!-- Total progress bar -->
    <view class="total-bar">
      <view class="bar-track">
        <view class="bar-fill" style="width:{{totalProgress}}%"></view>
      </view>
      <text class="bar-pct font-mono">{{totalProgress}}%</text>
    </view>
    <view class="status-row status-row-sub">
      <text class="status-mini font-mono">🔥 {{streakInfo.current || 0}} days</text>
      <text class="status-mini font-mono">{{collectionStats.obtained || 0}}/{{collectionStats.total || 0}} cards</text>
    </view>
  </view>

  <!-- Action Buttons -->
  <view class="action-row">
    <view class="action-btn action-daily {{dailyState.completed ? 'completed' : ''}}" bindtap="goToDailyChallenge">
      <text class="action-icon font-mono">>_</text>
      <text class="action-title">{{dailyState.completed ? '已完成' : '今日挑战'}}</text>
      <text class="action-desc font-mono">3题/20exp</text>
    </view>
    <view class="action-btn action-continue" bindtap="goToContinue" wx:if="{{nextStageId}}">
      <text class="action-icon font-mono">>>></text>
      <text class="action-title">继续闯关</text>
      <text class="action-desc font-mono">{{nextRegionLabel}}</text>
    </view>
    <view class="action-btn action-map" bindtap="goToMap" wx:else>
      <text class="action-icon font-mono">◇◆</text>
      <text class="action-title">查看地图</text>
      <text class="action-desc font-mono">选择区域</text>
    </view>
  </view>

  <!-- Region Progress -->
  <view class="regions-section">
    <text class="section-title font-mono">> status</text>
    <view class="region-list">
      <view wx:for="{{regions}}" wx:key="id" class="region-row {{item.unlocked ? '' : 'locked'}}">
        <text class="region-symbol font-mono region-{{item.id}}">{{item.symbol}}</text>
        <text class="region-label font-mono">{{item.label}}</text>
        <view class="region-bar">
          <view class="bar-track-sm">
            <view class="bar-fill-sm region-bg-{{item.id}}" style="width:{{item.barWidth}}%"></view>
          </view>
        </view>
        <text class="region-pct font-mono" wx:if="{{item.unlocked}}">{{item.barWidth}}%</text>
        <text class="region-stars font-mono" wx:if="{{item.unlocked && item.totalStars > 0}}">⭐{{item.totalStars}}</text>
        <text class="region-lock font-mono" wx:if="{{!item.unlocked}}">🔒</text>
      </view>
    </view>
  </view>

  <!-- Recent Cards -->
  <view class="recent-section" wx:if="{{recentCards.length > 0}}">
    <text class="section-title font-mono">> recent cards</text>
    <scroll-view scroll-x class="recent-scroll">
      <view class="recent-cards-row">
        <view wx:for="{{recentCards}}" wx:key="id" class="mini-card rarity-{{item.rarity}}">
          <text class="mini-card-rarity font-mono">{{item.rarity}}</text>
          <text class="mini-card-name">{{item.name[locale] || item.name.zh}}</text>
        </view>
      </view>
    </scroll-view>
  </view>

  <view class="page-footer"></view>
</scroll-view>
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/home/home.wxml
git commit -m "feat(game): rewrite home.wxml as terminal console layout"
```

---

## Task 6: Home Page — Terminal Console (WXSS)

**Files:**
- Rewrite: `miniprogram/pages/home/home.wxss`

- [ ] **Step 1: Replace home.wxss with terminal console styles**

Replace the entire content of `miniprogram/pages/home/home.wxss` with:

```css
/* pages/home/home.wxss — Terminal Console */

.terminal-page {
  height: 100vh;
  padding: var(--spacing-lg);
  padding-bottom: 160rpx;
}

/* --- Terminal Header --- */
.terminal-header {
  margin-bottom: var(--spacing-xl);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.terminal-title {
  font-size: var(--font-lg);
  color: var(--color-terminal-green);
  letter-spacing: 2rpx;
}

.terminal-prompt {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.lang-switcher {
  display: flex;
  gap: 4rpx;
}

.lang-btn {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  padding: 8rpx 16rpx;
  border-radius: var(--radius-sm);
  background: var(--color-bg-card);
}

.lang-btn.active {
  color: var(--color-terminal-green);
  background: var(--color-bg-elevated);
}

/* --- Status Card --- */
.status-card {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  border: 1rpx solid var(--color-border);
}

.status-row {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.status-row-sub {
  margin-bottom: 0;
  margin-top: var(--spacing-sm);
  justify-content: space-between;
}

.status-label {
  font-size: var(--font-md);
  color: var(--color-text-primary);
  font-weight: 600;
}

.status-sep {
  color: var(--color-text-muted);
  margin: 0 var(--spacing-sm);
}

.status-value {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.status-mini {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

/* Progress bars */
.total-bar {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.bar-track {
  flex: 1;
  height: 12rpx;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--color-terminal-green);
  border-radius: var(--radius-pill);
  transition: width 0.5s ease;
}

.bar-pct {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
  min-width: 80rpx;
  text-align: right;
}

/* --- Action Buttons --- */
.action-row {
  display: flex;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.action-btn {
  flex: 1;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg) var(--spacing-md);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
}

.action-btn:active {
  background: var(--color-bg-elevated);
}

.action-icon {
  font-size: var(--font-xl);
  color: var(--color-terminal-green);
}

.action-daily .action-icon {
  color: var(--color-terminal-orange);
}

.action-daily.completed .action-icon {
  color: var(--color-text-muted);
}

.action-daily.completed .action-title {
  color: var(--color-text-muted);
}

.action-title {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
}

.action-desc {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

/* --- Region Progress --- */
.regions-section {
  margin-bottom: var(--spacing-xl);
}

.section-title {
  font-size: var(--font-sm);
  color: var(--color-terminal-green);
  margin-bottom: var(--spacing-md);
  display: block;
}

.region-list {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  padding: var(--spacing-sm) var(--spacing-md);
}

.region-row {
  display: flex;
  align-items: center;
  padding: var(--spacing-sm) 0;
  gap: var(--spacing-sm);
}

.region-row.locked {
  opacity: 0.4;
}

.region-symbol {
  font-size: var(--font-md);
  width: 48rpx;
  text-align: center;
}

.region-core { color: var(--color-region-core); }
.region-tools { color: var(--color-region-tools); }
.region-runtime { color: var(--color-region-runtime); }
.region-network { color: var(--color-region-network); }
.region-practice { color: var(--color-region-practice); }

.region-label {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  width: 200rpx;
}

.region-bar {
  flex: 1;
}

.bar-track-sm {
  height: 8rpx;
  background: var(--color-bg-muted);
  border-radius: var(--radius-pill);
  overflow: hidden;
}

.bar-fill-sm {
  height: 100%;
  border-radius: var(--radius-pill);
  transition: width 0.5s ease;
}

.region-bg-core { background: var(--color-region-core); }
.region-bg-tools { background: var(--color-region-tools); }
.region-bg-runtime { background: var(--color-region-runtime); }
.region-bg-network { background: var(--color-region-network); }
.region-bg-practice { background: var(--color-region-practice); }

.region-pct {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
  width: 72rpx;
  text-align: right;
}

.region-stars {
  font-size: var(--font-xs);
  color: var(--color-terminal-orange);
  width: 80rpx;
  text-align: right;
}

.region-lock {
  font-size: var(--font-sm);
  width: 80rpx;
  text-align: right;
}

/* --- Recent Cards --- */
.recent-section {
  margin-bottom: var(--spacing-xl);
}

.recent-scroll {
  white-space: nowrap;
}

.recent-cards-row {
  display: inline-flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) 0;
}

.mini-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 160rpx;
  height: 200rpx;
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  justify-content: center;
  gap: var(--spacing-xs);
  border: 1rpx solid var(--color-rarity-n);
}

.mini-card.rarity-R {
  border-color: var(--color-rarity-r);
}

.mini-card.rarity-SR {
  border-color: var(--color-rarity-sr);
  box-shadow: 0 0 16rpx rgba(188, 140, 255, 0.15);
}

.mini-card.rarity-SSR {
  border-color: var(--color-rarity-ssr);
  box-shadow: 0 0 20rpx rgba(240, 192, 64, 0.2);
}

.mini-card-rarity {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

.rarity-R .mini-card-rarity { color: var(--color-rarity-r); }
.rarity-SR .mini-card-rarity { color: var(--color-rarity-sr); }
.rarity-SSR .mini-card-rarity { color: var(--color-rarity-ssr); }

.mini-card-name {
  font-size: var(--font-2xs);
  color: var(--color-text-primary);
  text-align: center;
  white-space: normal;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.page-footer {
  height: 40rpx;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/home/home.wxss
git commit -m "feat(game): rewrite home.wxss with terminal console styles"
```

---

## Verification Checklist

After all tasks are complete, verify in WeChat DevTools:

- [ ] App loads with dark background (`#0D1117`) throughout
- [ ] Navigation bar is dark with white text "Claude Code Terminal"
- [ ] TabBar shows dark background with new labels: 终端/地图/图鉴/档案
- [ ] TabBar icons show with correct inactive/active colors
- [ ] Home page shows terminal console layout:
  - "CLAUDE CODE TERMINAL" header in green monospace
  - "guest@claude:~$" prompt
  - Level/exp/progress status card
  - Two action buttons (今日挑战 + 继续闯关)
  - 5 region progress rows with colored progress bars
  - Recent cards section (empty initially, shows after playing stages)
- [ ] Language switcher still works (中/EN/日)
- [ ] Tab navigation works (switching between 终端/地图/图鉴/档案)
- [ ] No console errors
