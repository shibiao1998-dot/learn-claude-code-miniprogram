# Phase 3d: 档案页 + 成就系统 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `pages/reference/reference` from a bridge-doc reference page into a terminal-styled achievement dashboard with player stats, achievement badges (4 categories), and language switcher.

**Architecture:** The page becomes a scrollable dashboard showing: player stats header (level, exp, streak, cards), achievement grid organized by 4 categories (explore/collect/mastery/persist), and a settings section with language switcher + reset save. Uses existing `game-achievement.js`, `game-save.js`, `game-daily.js`, and `game-cards.js` APIs.

**Tech Stack:** Native WeChat miniprogram (WXML/WXSS/JS), CSS custom properties from app.wxss terminal dark theme.

---

### Task 1: Rewrite reference.json + reference.js

**Files:**
- Modify: `miniprogram/pages/reference/reference.json`
- Modify: `miniprogram/pages/reference/reference.js`

- [ ] **Step 1: Update reference.json with dark theme nav bar**

Replace the entire file content with:

```json
{
  "navigationBarTitleText": "档案",
  "navigationBarBackgroundColor": "#0D1117",
  "navigationBarTextStyle": "white",
  "navigationStyle": "default",
  "usingComponents": {}
}
```

- [ ] **Step 2: Rewrite reference.js as achievement dashboard controller**

Replace the entire file content with:

```js
// pages/reference/reference.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameSave = require('../../utils/game-save');
var gameCards = require('../../utils/game-cards');
var gameDaily = require('../../utils/game-daily');
var gameAchievement = require('../../utils/game-achievement');

var CATEGORIES = [
  { id: 'explore', icon: '>', label: 'EXPLORE', color: 'var(--color-region-core)' },
  { id: 'collect', icon: '$', label: 'COLLECT', color: 'var(--color-region-tools)' },
  { id: 'mastery', icon: '#', label: 'MASTERY', color: 'var(--color-region-runtime)' },
  { id: 'persist', icon: '!', label: 'PERSIST', color: 'var(--color-region-practice)' }
];

Page({
  data: {
    locale: 'zh',
    levelInfo: {},
    streakInfo: {},
    collectionStats: {},
    achievementStats: {},
    categories: [],
    showResetConfirm: false
  },

  onLoad: function() {
    this._buildPageData();
    this._localeListener = function() {
      this._buildPageData();
    }.bind(this);
    eventBus.on('locale:change', this._localeListener);
  },

  onShow: function() {
    this._buildPageData();
  },

  onUnload: function() {
    eventBus.off('locale:change', this._localeListener);
  },

  _buildPageData: function() {
    var locale = i18n.getLocale();
    var levelInfo = gameSave.getLevelInfo();
    var streakInfo = gameDaily.getStreakInfo();
    var collectionStats = gameCards.getCollectionStats();
    var achievementStats = gameAchievement.getAchievementStats();
    var allAchievements = gameAchievement.getAllAchievements();

    var categories = CATEGORIES.map(function(cat) {
      var items = [];
      for (var i = 0; i < allAchievements.length; i++) {
        var ach = allAchievements[i];
        if (ach.category === cat.id) {
          items.push({
            id: ach.id,
            icon: ach.icon,
            name: ach.name[locale] || ach.name.zh || ach.name.en || ach.id,
            desc: ach.desc[locale] || ach.desc.zh || ach.desc.en || '',
            unlocked: ach.unlocked
          });
        }
      }
      var unlockedCount = 0;
      for (var j = 0; j < items.length; j++) {
        if (items[j].unlocked) unlockedCount++;
      }
      return {
        id: cat.id,
        icon: cat.icon,
        label: cat.label,
        color: cat.color,
        items: items,
        unlocked: unlockedCount,
        total: items.length
      };
    });

    this.setData({
      locale: locale,
      levelInfo: levelInfo,
      streakInfo: streakInfo,
      collectionStats: collectionStats,
      achievementStats: achievementStats,
      categories: categories,
      showResetConfirm: false
    });
  },

  switchLocale: function(e) {
    var locale = e.currentTarget.dataset.locale;
    getApp().setLocale(locale);
  },

  showReset: function() {
    this.setData({ showResetConfirm: true });
  },

  cancelReset: function() {
    this.setData({ showResetConfirm: false });
  },

  confirmReset: function() {
    gameSave.reset();
    this.setData({ showResetConfirm: false });
    this._buildPageData();
    wx.showToast({ title: '存档已重置', icon: 'none' });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 档案',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 档案'
    };
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/reference/reference.json miniprogram/pages/reference/reference.js
git commit -m "feat(reference): rewrite JS+JSON as achievement dashboard controller"
```

---

### Task 2: Rewrite reference.wxml

**Files:**
- Modify: `miniprogram/pages/reference/reference.wxml`

- [ ] **Step 1: Rewrite reference.wxml as achievement dashboard template**

Replace the entire file content with:

```xml
<!-- pages/reference/reference.wxml -->
<scroll-view scroll-y class="archive-page">

  <!-- Player Stats Header -->
  <view class="arc-header">
    <text class="arc-header__title font-mono">ARCHIVE</text>
    <view class="arc-stats-row">
      <view class="arc-stat">
        <text class="arc-stat__value font-mono">Lv.{{levelInfo.level}}</text>
        <text class="arc-stat__label font-mono">{{levelInfo.title}}</text>
      </view>
      <view class="arc-stat">
        <text class="arc-stat__value font-mono">{{levelInfo.exp}}</text>
        <text class="arc-stat__label font-mono">EXP</text>
      </view>
      <view class="arc-stat">
        <text class="arc-stat__value font-mono">{{streakInfo.current}}</text>
        <text class="arc-stat__label font-mono">STREAK</text>
      </view>
      <view class="arc-stat">
        <text class="arc-stat__value font-mono">{{collectionStats.obtained}}</text>
        <text class="arc-stat__label font-mono">CARDS</text>
      </view>
    </view>
    <!-- EXP progress bar -->
    <view class="arc-exp-bar" wx:if="{{levelInfo.nextLevelExp}}">
      <view class="arc-exp-bar__fill" style="width:{{levelInfo.progress * 100}}%"></view>
    </view>
    <text class="arc-exp-hint font-mono" wx:if="{{levelInfo.nextLevelExp}}">{{levelInfo.exp}}/{{levelInfo.nextLevelExp}} → Lv.{{levelInfo.level + 1}}</text>
    <text class="arc-exp-hint font-mono" wx:else>MAX LEVEL</text>
  </view>

  <!-- Achievement Summary -->
  <view class="arc-summary">
    <text class="arc-summary__title font-mono">ACHIEVEMENTS</text>
    <text class="arc-summary__count font-mono">{{achievementStats.unlocked}}/{{achievementStats.total}}</text>
  </view>

  <!-- Achievement Categories -->
  <view class="arc-categories">
    <view wx:for="{{categories}}" wx:key="id" class="arc-category">
      <view class="arc-category__header">
        <text class="arc-category__icon font-mono" style="color:{{item.color}}">{{item.icon}}</text>
        <text class="arc-category__label font-mono" style="color:{{item.color}}">{{item.label}}</text>
        <text class="arc-category__count font-mono">{{item.unlocked}}/{{item.total}}</text>
      </view>
      <view class="arc-badges">
        <view wx:for="{{item.items}}" wx:for-item="ach" wx:key="id"
              class="arc-badge {{ach.unlocked ? 'arc-badge--unlocked' : 'arc-badge--locked'}}">
          <text class="arc-badge__icon font-mono">{{ach.unlocked ? ach.icon : '?'}}</text>
          <view class="arc-badge__info">
            <text class="arc-badge__name">{{ach.unlocked ? ach.name : '???'}}</text>
            <text class="arc-badge__desc">{{ach.unlocked ? ach.desc : '未解锁'}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <!-- Settings Section -->
  <view class="arc-settings">
    <text class="arc-settings__title font-mono">SETTINGS</text>

    <!-- Language Switcher -->
    <view class="arc-setting-row">
      <text class="arc-setting-row__label font-mono">LANGUAGE</text>
      <view class="arc-lang-switcher">
        <text class="arc-lang-btn font-mono {{locale=='zh'?'arc-lang-btn--active':''}}" bindtap="switchLocale" data-locale="zh">中</text>
        <text class="arc-lang-btn font-mono {{locale=='en'?'arc-lang-btn--active':''}}" bindtap="switchLocale" data-locale="en">EN</text>
        <text class="arc-lang-btn font-mono {{locale=='ja'?'arc-lang-btn--active':''}}" bindtap="switchLocale" data-locale="ja">日</text>
      </view>
    </view>

    <!-- Reset Save -->
    <view class="arc-setting-row">
      <text class="arc-setting-row__label font-mono">RESET SAVE</text>
      <view class="arc-reset-btn" bindtap="showReset" wx:if="{{!showResetConfirm}}">
        <text class="arc-reset-btn__text font-mono">RESET</text>
      </view>
      <view class="arc-reset-confirm" wx:else>
        <text class="arc-reset-confirm__warn font-mono">确认重置所有进度？</text>
        <view class="arc-reset-actions">
          <text class="arc-reset-action arc-reset-action--cancel font-mono" bindtap="cancelReset">取消</text>
          <text class="arc-reset-action arc-reset-action--confirm font-mono" bindtap="confirmReset">确认重置</text>
        </view>
      </view>
    </view>
  </view>

  <view class="arc-footer"></view>
</scroll-view>
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/reference/reference.wxml
git commit -m "feat(reference): rewrite WXML as achievement dashboard template"
```

---

### Task 3: Rewrite reference.wxss

**Files:**
- Modify: `miniprogram/pages/reference/reference.wxss`

- [ ] **Step 1: Rewrite reference.wxss with terminal dark theme styles**

Replace the entire file content with:

```css
/* pages/reference/reference.wxss — Achievement Archive */

.archive-page {
  height: 100vh;
  background: var(--color-bg);
  padding: 0 var(--spacing-md);
}

/* ── Header ── */
.arc-header {
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.arc-header__title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-terminal-blue);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.arc-stats-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.arc-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.arc-stat__value {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

.arc-stat__label {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

.arc-exp-bar {
  height: 6rpx;
  background: var(--color-bg-muted);
  border-radius: 3rpx;
  overflow: hidden;
  margin-bottom: var(--spacing-xs);
}

.arc-exp-bar__fill {
  height: 100%;
  background: var(--color-terminal-blue);
  border-radius: 3rpx;
  transition: width 0.3s;
}

.arc-exp-hint {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
  display: block;
  text-align: center;
}

/* ── Achievement Summary ── */
.arc-summary {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1rpx solid var(--color-border);
  margin-bottom: var(--spacing-md);
}

.arc-summary__title {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.arc-summary__count {
  font-size: var(--font-sm);
  color: var(--color-terminal-green);
}

/* ── Categories ── */
.arc-categories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.arc-category__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.arc-category__icon {
  font-size: var(--font-md);
  font-weight: 700;
}

.arc-category__label {
  font-size: var(--font-sm);
  font-weight: 700;
}

.arc-category__count {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  margin-left: auto;
}

/* ── Badges ── */
.arc-badges {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.arc-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm);
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
}

.arc-badge--locked {
  opacity: 0.45;
}

.arc-badge__icon {
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-text-muted);
  background: var(--color-bg-muted);
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.arc-badge--unlocked .arc-badge__icon {
  color: var(--color-terminal-green);
  background: var(--color-bg-elevated);
}

.arc-badge__info {
  display: flex;
  flex-direction: column;
  gap: 2rpx;
  min-width: 0;
}

.arc-badge__name {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arc-badge--locked .arc-badge__name {
  color: var(--color-text-muted);
}

.arc-badge__desc {
  font-size: var(--font-2xs);
  color: var(--color-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.arc-badge--locked .arc-badge__desc {
  color: var(--color-text-muted);
}

/* ── Settings ── */
.arc-settings {
  border-top: 1rpx solid var(--color-border);
  padding-top: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.arc-settings__title {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--spacing-md);
}

.arc-setting-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1rpx solid var(--color-border-light);
}

.arc-setting-row__label {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
}

/* Language Switcher */
.arc-lang-switcher {
  display: flex;
  flex-direction: row;
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.arc-lang-btn {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-right: 1rpx solid var(--color-border);
}

.arc-lang-btn:last-child {
  border-right: none;
}

.arc-lang-btn--active {
  color: var(--color-text-primary);
  background: var(--color-bg-elevated);
}

/* Reset */
.arc-reset-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border: 1rpx solid var(--color-terminal-red);
  border-radius: var(--radius-sm);
}

.arc-reset-btn__text {
  font-size: var(--font-xs);
  color: var(--color-terminal-red);
}

.arc-reset-confirm {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-xs);
}

.arc-reset-confirm__warn {
  font-size: var(--font-2xs);
  color: var(--color-terminal-red);
}

.arc-reset-actions {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
}

.arc-reset-action {
  font-size: var(--font-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
}

.arc-reset-action--cancel {
  color: var(--color-text-muted);
  border: 1rpx solid var(--color-border);
}

.arc-reset-action--confirm {
  color: #FFFFFF;
  background: var(--color-terminal-red);
}

/* Footer */
.arc-footer {
  height: 60rpx;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/reference/reference.wxss
git commit -m "feat(reference): rewrite WXSS with terminal dark theme achievement styles"
```
