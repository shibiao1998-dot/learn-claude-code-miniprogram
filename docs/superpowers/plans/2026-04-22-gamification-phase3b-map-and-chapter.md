# Phase 3b: Region Map + Chapter Gameplay Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the timeline page as a terminal-styled region/stage map, and rewrite the chapter page as a 3-phase Brilliant-style gameplay page (challenge → review → confirm → settlement).

**Architecture:** The timeline page becomes a node-based region map showing 5 regions with their stages, unlock status, and star progress. The chapter page is completely replaced with a game session UI driven by `game-engine.js` — it accepts `?mode=daily` or `?id=stageId` params, runs the 3-phase loop, and shows a settlement screen with earned cards/exp/stars.

**Tech Stack:** Native WeChat miniprogram (WXML/WXSS/JS), CSS variables from dark terminal theme, game-engine/game-save/game-cards/game-daily utils.

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Rewrite | `pages/timeline/timeline.json` | Nav bar title update |
| Rewrite | `pages/timeline/timeline.js` | Region map data with game-engine progress |
| Rewrite | `pages/timeline/timeline.wxml` | Terminal-styled region/stage node map |
| Rewrite | `pages/timeline/timeline.wxss` | Dark theme region map styles |
| Rewrite | `subpkg-chapters/pages/chapter/chapter.json` | Nav bar title update |
| Rewrite | `subpkg-chapters/pages/chapter/chapter.js` | 3-phase game session controller |
| Rewrite | `subpkg-chapters/pages/chapter/chapter.wxml` | Gameplay UI: question/review/confirm/settlement |
| Rewrite | `subpkg-chapters/pages/chapter/chapter.wxss` | Dark theme gameplay styles |

---

### Task 1: Timeline Page — JS (Region Map Data)

**Files:**
- Rewrite: `miniprogram/pages/timeline/timeline.js`
- Rewrite: `miniprogram/pages/timeline/timeline.json`

- [ ] **Step 1: Update timeline.json**

```json
{
  "navigationBarTitleText": "区域地图",
  "navigationBarBackgroundColor": "#0D1117",
  "navigationBarTextStyle": "white",
  "backgroundColor": "#0D1117",
  "usingComponents": {}
}
```

- [ ] **Step 2: Rewrite timeline.js**

Replace the entire file. The new version loads game-engine, game-save, and game-stages data to build a region map with unlock status, stage progress (stars), and navigation.

```js
// pages/timeline/timeline.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameEngine = require('../../utils/game-engine');
var gameSave = require('../../utils/game-save');
var stageData = require('../../subpkg-chapters/data/game-stages');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', color: 'var(--color-region-core)', colorHex: '#3FB950' },
  { id: 'tools', symbol: '$', label: 'TOOLS/', color: 'var(--color-region-tools)', colorHex: '#58A6FF' },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', color: 'var(--color-region-runtime)', colorHex: '#BC8CFF' },
  { id: 'network', symbol: '@', label: 'NETWORK/', color: 'var(--color-region-network)', colorHex: '#F85149' },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', color: 'var(--color-region-practice)', colorHex: '#D29922' }
];

var REGION_STAGES = {
  core: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'],
  tools: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'],
  runtime: ['stage_s12','stage_s13','stage_s14'],
  network: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'],
  practice: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07']
};

function _getStageTitle(stageId, locale) {
  var stages = stageData.stages;
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].id === stageId) {
      var t = stages[i].title;
      return t[locale] || t.zh || t.en || stageId;
    }
  }
  return stageId;
}

Page({
  data: {
    locale: 'zh',
    regions: [],
    totalProgress: 0,
    levelInfo: {}
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
    var totalCleared = 0;
    var totalStages = 0;

    var regions = REGIONS.map(function(r) {
      var stageIds = REGION_STAGES[r.id];
      var unlocked = gameEngine.isRegionUnlocked(r.id, stageData.stages);
      var progress = gameEngine.getRegionProgress(stageIds);
      totalCleared += progress.cleared;
      totalStages += progress.total;

      var stages = stageIds.map(function(sId) {
        var sp = gameEngine.getStageProgress(sId);
        return {
          id: sId,
          chapter: sId.replace('stage_', ''),
          title: _getStageTitle(sId, locale),
          stars: sp ? sp.stars : 0,
          attempts: sp ? sp.attempts : 0,
          cleared: sp ? sp.stars > 0 : false
        };
      });

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        colorHex: r.colorHex,
        unlocked: unlocked,
        cleared: progress.cleared,
        total: progress.total,
        totalStars: progress.totalStars,
        maxStars: progress.total * 3,
        barWidth: Math.round(progress.ratio * 100),
        stages: stages
      };
    });

    var totalProgress = totalStages > 0 ? Math.round(totalCleared / totalStages * 100) : 0;

    this.setData({
      locale: locale,
      regions: regions,
      totalProgress: totalProgress,
      levelInfo: levelInfo
    });
  },

  goToStage: function(e) {
    var stageId = e.currentTarget.dataset.stageid;
    var regionId = e.currentTarget.dataset.regionid;
    var region = null;
    for (var i = 0; i < this.data.regions.length; i++) {
      if (this.data.regions[i].id === regionId) {
        region = this.data.regions[i];
        break;
      }
    }
    if (!region || !region.unlocked) {
      wx.showToast({ title: '区域未解锁', icon: 'none' });
      return;
    }
    var chapter = stageId.replace('stage_', '');
    wx.navigateTo({
      url: '/subpkg-chapters/pages/chapter/chapter?id=' + chapter
    });
  },

  toggleRegion: function(e) {
    var regionId = e.currentTarget.dataset.regionid;
    var regions = this.data.regions.map(function(r) {
      if (r.id === regionId) {
        return Object.assign({}, r, { expanded: !r.expanded });
      }
      return r;
    });
    this.setData({ regions: regions });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 区域地图',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 区域地图'
    };
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/timeline/timeline.js miniprogram/pages/timeline/timeline.json
git commit -m "feat(timeline): rewrite JS as terminal region map with game-engine integration"
```

---

### Task 2: Timeline Page — WXML (Region Map Template)

**Files:**
- Rewrite: `miniprogram/pages/timeline/timeline.wxml`

- [ ] **Step 1: Rewrite timeline.wxml**

Replace entirely with a terminal-styled region map. Each region is a collapsible section showing its stages as node entries with star indicators.

```xml
<!-- pages/timeline/timeline.wxml -->
<scroll-view scroll-y class="map-page">

  <!-- Terminal Header -->
  <view class="map-header">
    <text class="map-header__title">REGION MAP</text>
    <view class="map-header__stats">
      <text class="map-header__level font-mono">{{levelInfo.title}} Lv.{{levelInfo.level}}</text>
      <text class="map-header__progress font-mono">{{totalProgress}}% decoded</text>
    </view>
    <view class="map-progress-bar">
      <view class="map-progress-bar__fill" style="width:{{totalProgress}}%"></view>
    </view>
  </view>

  <!-- Regions -->
  <view class="region-list">
    <view wx:for="{{regions}}" wx:key="id" class="region-section {{item.unlocked ? '' : 'region--locked'}}">

      <!-- Region Header (tap to expand/collapse) -->
      <view class="region-header" bindtap="toggleRegion" data-regionid="{{item.id}}">
        <view class="region-header__left">
          <text class="region-symbol font-mono" style="color:{{item.colorHex}}">{{item.symbol}}</text>
          <text class="region-label font-mono" style="color:{{item.colorHex}}">{{item.label}}</text>
          <text class="region-lock font-mono" wx:if="{{!item.unlocked}}">[LOCKED]</text>
        </view>
        <view class="region-header__right">
          <text class="region-stars font-mono">{{item.totalStars}}/{{item.maxStars}}</text>
          <text class="region-chevron font-mono">{{item.expanded ? '▾' : '▸'}}</text>
        </view>
      </view>

      <!-- Region Progress Bar -->
      <view class="region-bar">
        <view class="region-bar__track">
          <view class="region-bar__fill" style="width:{{item.barWidth}}%;background:{{item.colorHex}}"></view>
        </view>
        <text class="region-bar__text font-mono">{{item.cleared}}/{{item.total}}</text>
      </view>

      <!-- Stage List (expanded) -->
      <view class="stage-list" wx:if="{{item.expanded && item.unlocked}}">
        <view
          wx:for="{{item.stages}}"
          wx:for-item="stage"
          wx:key="id"
          class="stage-node {{stage.cleared ? 'stage--cleared' : 'stage--pending'}}"
          bindtap="goToStage"
          data-stageid="{{stage.id}}"
          data-regionid="{{item.id}}"
        >
          <!-- Node connector line -->
          <view class="stage-connector" style="background:{{item.colorHex}}"></view>

          <!-- Node dot -->
          <view class="stage-dot {{stage.cleared ? 'stage-dot--cleared' : ''}}" style="border-color:{{item.colorHex}}">
            <text wx:if="{{stage.cleared}}" class="stage-dot__check">✓</text>
            <view wx:else class="stage-dot__inner" style="background:{{item.colorHex}}"></view>
          </view>

          <!-- Stage info -->
          <view class="stage-info">
            <text class="stage-chapter font-mono">{{stage.chapter}}</text>
            <text class="stage-title">{{stage.title}}</text>
          </view>

          <!-- Stars -->
          <view class="stage-stars">
            <text class="star {{stage.stars >= 1 ? 'star--earned' : ''}}">★</text>
            <text class="star {{stage.stars >= 2 ? 'star--earned' : ''}}">★</text>
            <text class="star {{stage.stars >= 3 ? 'star--earned' : ''}}">★</text>
          </view>
        </view>
      </view>

      <!-- Locked overlay message -->
      <view class="locked-msg" wx:if="{{item.expanded && !item.unlocked}}">
        <text class="locked-msg__text font-mono">> access denied: complete previous region</text>
      </view>

    </view>
  </view>

  <view class="map-footer"></view>
</scroll-view>
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/timeline/timeline.wxml
git commit -m "feat(timeline): rewrite WXML as terminal region map with collapsible stages"
```

---

### Task 3: Timeline Page — WXSS (Region Map Styles)

**Files:**
- Rewrite: `miniprogram/pages/timeline/timeline.wxss`

- [ ] **Step 1: Rewrite timeline.wxss**

Replace entirely with dark terminal theme styles for the region map.

```css
/* pages/timeline/timeline.wxss — Terminal Region Map */

.map-page {
  height: 100vh;
  background: var(--color-bg);
  padding: 0 var(--spacing-md);
}

/* ── Header ── */
.map-header {
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.map-header__title {
  font-family: var(--font-mono);
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-terminal-green);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.map-header__stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.map-header__level {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
}

.map-header__progress {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
}

.map-progress-bar {
  height: 6rpx;
  background: var(--color-bg-muted);
  border-radius: 3rpx;
  overflow: hidden;
}

.map-progress-bar__fill {
  height: 100%;
  background: var(--color-terminal-green);
  border-radius: 3rpx;
  transition: width 0.3s;
}

/* ── Region Section ── */
.region-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-xl);
}

.region-section {
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
  overflow: hidden;
}

.region--locked {
  opacity: 0.5;
}

/* Region Header */
.region-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md);
}

.region-header__left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
}

.region-header__right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
}

.region-symbol {
  font-size: var(--font-lg);
  font-weight: 700;
}

.region-label {
  font-size: var(--font-md);
  font-weight: 700;
}

.region-lock {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

.region-stars {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

.region-chevron {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

/* Region Progress Bar */
.region-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
  padding: 0 var(--spacing-md) var(--spacing-sm);
}

.region-bar__track {
  flex: 1;
  height: 4rpx;
  background: var(--color-bg-muted);
  border-radius: 2rpx;
  overflow: hidden;
}

.region-bar__fill {
  height: 100%;
  border-radius: 2rpx;
  transition: width 0.3s;
}

.region-bar__text {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
  min-width: 60rpx;
  text-align: right;
}

/* ── Stage List ── */
.stage-list {
  padding: 0 var(--spacing-md) var(--spacing-sm);
}

.stage-node {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: var(--spacing-sm) 0;
  position: relative;
}

.stage-node:active {
  opacity: 0.7;
}

/* Connector line */
.stage-connector {
  position: absolute;
  left: 19rpx;
  top: 0;
  bottom: 0;
  width: 2rpx;
  opacity: 0.3;
}

.stage-node:first-child .stage-connector {
  top: 50%;
}

.stage-node:last-child .stage-connector {
  bottom: 50%;
}

/* Stage dot */
.stage-dot {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  border: 2rpx solid;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  z-index: 1;
  flex-shrink: 0;
}

.stage-dot--cleared {
  background: transparent;
}

.stage-dot__check {
  font-size: var(--font-xs);
  color: var(--color-terminal-green);
}

.stage-dot__inner {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  opacity: 0.5;
}

/* Stage info */
.stage-info {
  flex: 1;
  margin-left: var(--spacing-sm);
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  min-width: 0;
}

.stage-chapter {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  width: 80rpx;
  flex-shrink: 0;
}

.stage-title {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stage--cleared .stage-title {
  color: var(--color-text-secondary);
}

/* Stars */
.stage-stars {
  display: flex;
  flex-direction: row;
  gap: 2rpx;
  flex-shrink: 0;
  margin-left: var(--spacing-xs);
}

.star {
  font-size: var(--font-xs);
  color: var(--color-bg-muted);
}

.star--earned {
  color: var(--color-terminal-gold);
}

/* Locked message */
.locked-msg {
  padding: var(--spacing-md);
}

.locked-msg__text {
  font-size: var(--font-xs);
  color: var(--color-terminal-red);
  opacity: 0.7;
}

/* Footer */
.map-footer {
  height: 60rpx;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/pages/timeline/timeline.wxss
git commit -m "feat(timeline): rewrite WXSS with terminal dark theme region map styles"
```

---

### Task 4: Chapter Page — JS (Game Session Controller)

**Files:**
- Rewrite: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`
- Rewrite: `miniprogram/subpkg-chapters/pages/chapter/chapter.json`

This is the most complex task. The chapter page becomes a 3-phase game session: challenge → review → confirm → settlement. It supports two entry modes: `?id=chapterId` (stage play) and `?mode=daily` (daily challenge).

- [ ] **Step 1: Update chapter.json**

```json
{
  "navigationBarTitleText": "关卡",
  "navigationBarBackgroundColor": "#0D1117",
  "navigationBarTextStyle": "white",
  "backgroundColor": "#0D1117",
  "usingComponents": {}
}
```

- [ ] **Step 2: Rewrite chapter.js**

Replace the entire file with the game session controller.

```js
// subpkg-chapters/pages/chapter/chapter.js
var i18n = require('../../../utils/i18n');
var gameEngine = require('../../../utils/game-engine');
var gameCards = require('../../../utils/game-cards');
var gameDaily = require('../../../utils/game-daily');
var gameSave = require('../../../utils/game-save');
var stageData = require('../../data/game-stages');

function _findStage(chapterId) {
  var stageId = 'stage_' + chapterId;
  var stages = stageData.stages;
  for (var i = 0; i < stages.length; i++) {
    if (stages[i].id === stageId) return stages[i];
  }
  return null;
}

var REGION_COLORS = {
  core: '#3FB950',
  tools: '#58A6FF',
  runtime: '#BC8CFF',
  network: '#F85149',
  practice: '#D29922'
};

Page({
  data: {
    mode: 'stage',
    locale: 'zh',
    stageTitle: '',
    regionLabel: '',
    regionColor: '#3FB950',

    // Game state
    phase: 0,
    phaseLabel: '',
    finished: false,

    // Current question
    currentQuestion: null,
    questionIndex: 0,
    totalQuestions: 0,
    progressPercent: 0,

    // Answer feedback
    showFeedback: false,
    feedbackCorrect: false,
    feedbackExplanation: '',
    feedbackAnswer: '',
    selectedOption: '',

    // Review phase (phase 2)
    showReview: false,
    reviewCards: [],

    // Settlement
    showSettlement: false,
    result: null,
    earnedCardDetails: [],
    newLevel: null
  },

  _session: null,

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

    var q = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'stage',
      stageTitle: title,
      regionLabel: regionLabels[stage.region] || '',
      regionColor: REGION_COLORS[stage.region] || '#3FB950',
      phase: 1,
      phaseLabel: 'CHALLENGE',
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: stage.questions.length,
      progressPercent: Math.round(1 / stage.questions.length * 100)
    });
  },

  _startDaily: function(locale) {
    var questions = gameDaily.getDailyQuestions();
    if (!questions || questions.length === 0) {
      wx.showToast({ title: '每日挑战加载失败', icon: 'none' });
      wx.navigateBack();
      return;
    }

    var fakeDailyStage = {
      id: 'stage_daily',
      chapter: 'daily',
      region: 'core',
      questions: questions,
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: []
    };

    this._session = gameEngine.createSession(fakeDailyStage);

    var q = gameEngine.getCurrentQuestion(this._session);
    this.setData({
      mode: 'daily',
      stageTitle: '每日挑战',
      regionLabel: 'DAILY/',
      regionColor: '#D29922',
      phase: 1,
      phaseLabel: 'CHALLENGE',
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: questions.length,
      progressPercent: Math.round(1 / questions.length * 100)
    });
  },

  _formatQuestion: function(q, locale) {
    if (!q) return null;
    var stem = q.stem;
    var stemText = stem[locale] || stem.zh || stem.en || '';
    var options = q.options.map(function(opt) {
      var text = opt.text;
      return {
        id: opt.id,
        text: text[locale] || text.zh || text.en || ''
      };
    });
    var diffLabels = { 1: '>_', 2: '>>', 3: '>>>' };
    return {
      id: q.id,
      stem: stemText,
      options: options,
      difficulty: q.difficulty,
      diffLabel: diffLabels[q.difficulty] || '>_'
    };
  },

  selectOption: function(e) {
    if (this.data.showFeedback) return;
    var optionId = e.currentTarget.dataset.optionid;
    this.setData({ selectedOption: optionId });
  },

  confirmAnswer: function() {
    if (!this.data.selectedOption || this.data.showFeedback) return;

    var session = this._session;
    var q = this.data.currentQuestion;
    var locale = this.data.locale;
    var result = gameEngine.submitAnswer(session, q.id, this.data.selectedOption);

    if (!result) return;

    var explanation = result.explanation;
    var explText = explanation[locale] || explanation.zh || explanation.en || '';

    this.setData({
      showFeedback: true,
      feedbackCorrect: result.correct,
      feedbackExplanation: explText,
      feedbackAnswer: result.answer
    });
  },

  nextQuestion: function() {
    var session = this._session;
    var locale = this.data.locale;

    if (session.phase === 2 && this.data.phase === 1) {
      this._enterReviewPhase(locale);
      return;
    }

    if (session.finished) {
      this._showSettlement();
      return;
    }

    var q = gameEngine.getCurrentQuestion(session);
    if (!q) {
      if (session.phase === 2) {
        this._enterReviewPhase(locale);
      } else {
        this._showSettlement();
      }
      return;
    }

    var totalQ = this.data.phase === 3 ? session.wrongIds.length : session.questions.length;
    var idx = session.currentIndex + 1;

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

  _enterReviewPhase: function(locale) {
    var session = this._session;

    var reviewCards = session.questions.map(function(q) {
      var ans = session.answers[q.id];
      if (!ans) return null;
      var stemText = q.stem[locale] || q.stem.zh || q.stem.en || '';
      var explText = q.explanation[locale] || q.explanation.zh || q.explanation.en || '';
      var correctText = '';
      for (var i = 0; i < q.options.length; i++) {
        if (q.options[i].id === q.answer) {
          var t = q.options[i].text;
          correctText = t[locale] || t.zh || t.en || '';
          break;
        }
      }
      return {
        stem: stemText,
        correct: ans.correct,
        correctAnswer: correctText,
        explanation: explText
      };
    }).filter(Boolean);

    this.setData({
      phase: 2,
      phaseLabel: 'REVIEW',
      showReview: true,
      showFeedback: false,
      reviewCards: reviewCards,
      currentQuestion: null
    });
  },

  continueAfterReview: function() {
    var session = this._session;
    var locale = this.data.locale;
    gameEngine.completeReviewPhase(session);

    if (session.finished) {
      this._showSettlement();
      return;
    }

    var q = gameEngine.getCurrentQuestion(session);
    this.setData({
      phase: 3,
      phaseLabel: 'CONFIRM',
      showReview: false,
      currentQuestion: this._formatQuestion(q, locale),
      questionIndex: 1,
      totalQuestions: session.wrongIds.length,
      progressPercent: Math.round(1 / session.wrongIds.length * 100)
    });
  },

  _showSettlement: function() {
    var session = this._session;
    var result = gameEngine.getSessionResult(session);
    var locale = this.data.locale;
    var prevLevel = gameSave.getLevelInfo();

    if (this.data.mode === 'daily') {
      gameDaily.completeDailyChallenge(result.correctCount);
    } else {
      gameEngine.saveStageResult(result);
      if (result.earnedCards.length > 0) {
        gameCards.obtainCards(result.earnedCards);
      }
    }

    var newLevelInfo = gameSave.getLevelInfo();
    var leveledUp = newLevelInfo.level > prevLevel.level;

    var earnedCardDetails = result.earnedCards.map(function(cardId) {
      var card = gameCards.getCard(cardId);
      if (!card) return null;
      var name = card.name;
      return {
        id: card.id,
        name: name[locale] || name.zh || name.en || cardId,
        rarity: card.rarity,
        region: card.region
      };
    }).filter(Boolean);

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
      earnedCardDetails: earnedCardDetails,
      newLevel: leveledUp ? newLevelInfo : null
    });
  },

  goBack: function() {
    wx.navigateBack({ delta: 1 });
  },

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
        selectedOption: ''
      });
    }
  },

  goToMap: function() {
    wx.switchTab({ url: '/pages/timeline/timeline' });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 闯关',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 闯关'
    };
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js miniprogram/subpkg-chapters/pages/chapter/chapter.json
git commit -m "feat(chapter): rewrite JS as 3-phase game session controller"
```

---

### Task 5: Chapter Page — WXML (Gameplay Template)

**Files:**
- Rewrite: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxml`

- [ ] **Step 1: Rewrite chapter.wxml**

Replace entirely with the game session UI: header with phase indicator, question card with options, feedback overlay, review screen, and settlement screen.

```xml
<!-- subpkg-chapters/pages/chapter/chapter.wxml -->
<view class="game-page">

  <!-- ══════════ Game Header ══════════ -->
  <view class="game-header" wx:if="{{!showSettlement}}">
    <view class="game-header__top">
      <text class="game-header__back font-mono" bindtap="goBack">← ESC</text>
      <view class="game-header__phase">
        <text class="phase-badge font-mono" style="color:{{regionColor}}">{{phaseLabel}}</text>
        <text class="phase-counter font-mono">{{questionIndex}}/{{totalQuestions}}</text>
      </view>
    </view>
    <text class="game-header__title">{{stageTitle}}</text>
    <view class="game-header__bar">
      <view class="game-header__bar-fill" style="width:{{progressPercent}}%;background:{{regionColor}}"></view>
    </view>
  </view>

  <!-- ══════════ Phase 1 & 3: Question ══════════ -->
  <scroll-view scroll-y class="game-content" wx:if="{{currentQuestion && !showReview && !showSettlement}}">

    <!-- Difficulty indicator -->
    <view class="diff-row">
      <text class="diff-label font-mono" style="color:{{regionColor}}">{{currentQuestion.diffLabel}}</text>
      <text class="diff-text font-mono">难度 {{currentQuestion.difficulty}}</text>
    </view>

    <!-- Question stem -->
    <view class="question-card">
      <text class="question-stem">{{currentQuestion.stem}}</text>
    </view>

    <!-- Options -->
    <view class="options-list">
      <view
        wx:for="{{currentQuestion.options}}"
        wx:key="id"
        class="option-item {{selectedOption === item.id ? 'option--selected' : ''}} {{showFeedback && item.id === feedbackAnswer ? 'option--correct' : ''}} {{showFeedback && selectedOption === item.id && !feedbackCorrect ? 'option--wrong' : ''}}"
        bindtap="selectOption"
        data-optionid="{{item.id}}"
      >
        <text class="option-id font-mono">{{item.id}}</text>
        <text class="option-text">{{item.text}}</text>
      </view>
    </view>

    <!-- Confirm button (before feedback) -->
    <view class="action-area" wx:if="{{!showFeedback}}">
      <view class="btn-confirm {{selectedOption ? 'btn-confirm--active' : ''}}" bindtap="confirmAnswer" style="{{selectedOption ? 'background:' + regionColor : ''}}">
        <text class="btn-confirm__text font-mono">> SUBMIT</text>
      </view>
    </view>

    <!-- Feedback (after answer) -->
    <view class="feedback-area" wx:if="{{showFeedback}}">
      <view class="feedback-badge {{feedbackCorrect ? 'feedback--correct' : 'feedback--wrong'}}">
        <text class="feedback-badge__icon font-mono">{{feedbackCorrect ? '✓' : '✗'}}</text>
        <text class="feedback-badge__text font-mono">{{feedbackCorrect ? 'CORRECT' : 'INCORRECT'}}</text>
      </view>
      <view class="feedback-explain" wx:if="{{feedbackExplanation}}">
        <text class="feedback-explain__text">{{feedbackExplanation}}</text>
      </view>
      <view class="btn-next" bindtap="nextQuestion">
        <text class="btn-next__text font-mono">> NEXT</text>
      </view>
    </view>

  </scroll-view>

  <!-- ══════════ Phase 2: Review ══════════ -->
  <scroll-view scroll-y class="game-content" wx:if="{{showReview && !showSettlement}}">

    <view class="review-header">
      <text class="review-title font-mono" style="color:{{regionColor}}">// REVIEW</text>
      <text class="review-subtitle">答题回顾 — 答错的题目重点关注</text>
    </view>

    <view class="review-list">
      <view wx:for="{{reviewCards}}" wx:key="index" class="review-card {{item.correct ? 'review--correct' : 'review--wrong'}}">
        <view class="review-card__header">
          <text class="review-card__icon font-mono">{{item.correct ? '✓' : '✗'}}</text>
          <text class="review-card__stem">{{item.stem}}</text>
        </view>
        <view class="review-card__body" wx:if="{{!item.correct}}">
          <text class="review-card__answer">正确答案: {{item.correctAnswer}}</text>
          <text class="review-card__explain">{{item.explanation}}</text>
        </view>
      </view>
    </view>

    <view class="btn-continue" bindtap="continueAfterReview">
      <text class="btn-continue__text font-mono">> CONTINUE</text>
    </view>

  </scroll-view>

  <!-- ══════════ Settlement Screen ══════════ -->
  <scroll-view scroll-y class="game-content" wx:if="{{showSettlement}}">

    <view class="settle-container">
      <!-- Stage complete header -->
      <view class="settle-header">
        <text class="settle-title font-mono" style="color:{{regionColor}}">STAGE CLEAR</text>
        <text class="settle-stage">{{stageTitle}}</text>
      </view>

      <!-- Stars -->
      <view class="settle-stars">
        <text class="settle-star {{result.stars >= 1 ? 'settle-star--earned' : ''}}">★</text>
        <text class="settle-star {{result.stars >= 2 ? 'settle-star--earned' : ''}}">★</text>
        <text class="settle-star {{result.stars >= 3 ? 'settle-star--earned' : ''}}">★</text>
      </view>

      <!-- Score -->
      <view class="settle-score">
        <text class="settle-score__text font-mono">{{result.correctCount}}/{{result.totalQuestions}} correct ({{result.ratio}}%)</text>
      </view>

      <!-- EXP gained -->
      <view class="settle-exp">
        <text class="settle-exp__label font-mono">EXP +</text>
        <text class="settle-exp__value font-mono" style="color:{{regionColor}}">{{result.expReward}}</text>
      </view>

      <!-- Level up notification -->
      <view class="settle-levelup" wx:if="{{newLevel}}">
        <text class="settle-levelup__text font-mono" style="color:var(--color-terminal-gold)">LEVEL UP! → {{newLevel.title}} Lv.{{newLevel.level}}</text>
      </view>

      <!-- Earned cards -->
      <view class="settle-cards" wx:if="{{earnedCardDetails.length > 0}}">
        <text class="settle-cards__title font-mono">CARDS OBTAINED:</text>
        <view class="settle-cards__list">
          <view wx:for="{{earnedCardDetails}}" wx:key="id" class="settle-card settle-card--{{item.rarity}}">
            <text class="settle-card__rarity font-mono">{{item.rarity}}</text>
            <text class="settle-card__name">{{item.name}}</text>
          </view>
        </view>
      </view>

      <!-- Action buttons -->
      <view class="settle-actions">
        <view class="btn-settle btn-settle--retry" bindtap="retryStage">
          <text class="btn-settle__text font-mono">> RETRY</text>
        </view>
        <view class="btn-settle btn-settle--map" bindtap="goToMap">
          <text class="btn-settle__text font-mono">> MAP</text>
        </view>
      </view>
    </view>

  </scroll-view>
</view>
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxml
git commit -m "feat(chapter): rewrite WXML with 3-phase gameplay and settlement UI"
```

---

### Task 6: Chapter Page — WXSS (Gameplay Styles)

**Files:**
- Rewrite: `miniprogram/subpkg-chapters/pages/chapter/chapter.wxss`

- [ ] **Step 1: Rewrite chapter.wxss**

Replace entirely with dark terminal theme gameplay styles.

```css
/* subpkg-chapters/pages/chapter/chapter.wxss — Terminal Gameplay */

.game-page {
  min-height: 100vh;
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
}

/* ── Game Header ── */
.game-header {
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-sm);
  background: var(--color-bg-card);
  border-bottom: 1rpx solid var(--color-border);
}

.game-header__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
}

.game-header__back {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  padding: var(--spacing-xs);
}

.game-header__phase {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
}

.phase-badge {
  font-size: var(--font-xs);
  font-weight: 700;
  letter-spacing: 1rpx;
}

.phase-counter {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

.game-header__title {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.game-header__bar {
  height: 4rpx;
  background: var(--color-bg-muted);
  border-radius: 2rpx;
  overflow: hidden;
}

.game-header__bar-fill {
  height: 100%;
  border-radius: 2rpx;
  transition: width 0.3s;
}

/* ── Game Content ── */
.game-content {
  flex: 1;
  height: calc(100vh - 180rpx);
  padding: var(--spacing-md);
}

/* ── Difficulty ── */
.diff-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.diff-label {
  font-size: var(--font-sm);
  font-weight: 700;
}

.diff-text {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

/* ── Question Card ── */
.question-card {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.question-stem {
  font-size: var(--font-base);
  color: var(--color-text-primary);
  line-height: 1.7;
}

/* ── Options ── */
.options-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.option-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color 0.2s, background 0.2s;
}

.option-item:active {
  opacity: 0.8;
}

.option--selected {
  border-color: var(--color-terminal-blue);
  background: #58A6FF12;
}

.option--correct {
  border-color: var(--color-terminal-green);
  background: #3FB95012;
}

.option--wrong {
  border-color: var(--color-terminal-red);
  background: #F8514912;
}

.option-id {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-muted);
  width: 40rpx;
  flex-shrink: 0;
  text-transform: uppercase;
}

.option--selected .option-id {
  color: var(--color-terminal-blue);
}

.option--correct .option-id {
  color: var(--color-terminal-green);
}

.option--wrong .option-id {
  color: var(--color-terminal-red);
}

.option-text {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  line-height: 1.6;
  flex: 1;
}

/* ── Buttons ── */
.action-area {
  display: flex;
  justify-content: center;
}

.btn-confirm {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-bg-muted);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
  opacity: 0.4;
}

.btn-confirm--active {
  opacity: 1;
}

.btn-confirm__text {
  font-size: var(--font-sm);
  font-weight: 700;
  color: #FFFFFF;
}

.btn-next {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-bg-elevated);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-md);
}

.btn-next__text {
  font-size: var(--font-sm);
  font-weight: 600;
  color: var(--color-text-primary);
}

.btn-next:active {
  background: var(--color-bg-muted);
}

/* ── Feedback ── */
.feedback-area {
  margin-top: var(--spacing-md);
}

.feedback-badge {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-sm);
}

.feedback--correct {
  background: #3FB95018;
  border: 1rpx solid #3FB95044;
}

.feedback--wrong {
  background: #F8514918;
  border: 1rpx solid #F8514944;
}

.feedback-badge__icon {
  font-size: var(--font-lg);
  font-weight: 700;
}

.feedback--correct .feedback-badge__icon { color: var(--color-terminal-green); }
.feedback--wrong .feedback-badge__icon { color: var(--color-terminal-red); }

.feedback-badge__text {
  font-size: var(--font-sm);
  font-weight: 700;
}

.feedback--correct .feedback-badge__text { color: var(--color-terminal-green); }
.feedback--wrong .feedback-badge__text { color: var(--color-terminal-red); }

.feedback-explain {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-sm);
}

.feedback-explain__text {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

/* ── Review Phase ── */
.review-header {
  margin-bottom: var(--spacing-lg);
}

.review-title {
  font-size: var(--font-lg);
  font-weight: 700;
  display: block;
  margin-bottom: var(--spacing-xs);
}

.review-subtitle {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.review-card {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.review--correct {
  border-left: 4rpx solid var(--color-terminal-green);
}

.review--wrong {
  border-left: 4rpx solid var(--color-terminal-red);
}

.review-card__header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.review-card__icon {
  font-size: var(--font-sm);
  font-weight: 700;
  flex-shrink: 0;
}

.review--correct .review-card__icon { color: var(--color-terminal-green); }
.review--wrong .review-card__icon { color: var(--color-terminal-red); }

.review-card__stem {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  line-height: 1.6;
  flex: 1;
}

.review-card__body {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1rpx solid var(--color-border);
}

.review-card__answer {
  font-size: var(--font-xs);
  color: var(--color-terminal-green);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.review-card__explain {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
  line-height: 1.6;
  display: block;
}

.btn-continue {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--color-bg-elevated);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
}

.btn-continue__text {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.btn-continue:active {
  background: var(--color-bg-muted);
}

/* ── Settlement Screen ── */
.settle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--spacing-xl) 0;
}

.settle-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.settle-title {
  font-size: var(--font-2xl);
  font-weight: 700;
  display: block;
  margin-bottom: var(--spacing-xs);
}

.settle-stage {
  font-size: var(--font-md);
  color: var(--color-text-secondary);
}

/* Stars */
.settle-stars {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.settle-star {
  font-size: 80rpx;
  color: var(--color-bg-muted);
  transition: color 0.3s;
}

.settle-star--earned {
  color: var(--color-terminal-gold);
}

/* Score */
.settle-score {
  margin-bottom: var(--spacing-md);
}

.settle-score__text {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

/* EXP */
.settle-exp {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.settle-exp__label {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.settle-exp__value {
  font-size: var(--font-lg);
  font-weight: 700;
}

/* Level up */
.settle-levelup {
  margin-bottom: var(--spacing-lg);
  padding: var(--spacing-sm) var(--spacing-lg);
  background: #F0C04018;
  border: 1rpx solid #F0C04044;
  border-radius: var(--radius-md);
}

.settle-levelup__text {
  font-size: var(--font-sm);
  font-weight: 700;
}

/* Cards */
.settle-cards {
  width: 100%;
  margin-bottom: var(--spacing-lg);
}

.settle-cards__title {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  display: block;
  margin-bottom: var(--spacing-sm);
}

.settle-cards__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.settle-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--color-bg-card);
  border-radius: var(--radius-md);
  border: 1rpx solid var(--color-border);
}

.settle-card--N { border-left: 4rpx solid var(--color-rarity-n); }
.settle-card--R { border-left: 4rpx solid var(--color-rarity-r); }
.settle-card--SR { border-left: 4rpx solid var(--color-rarity-sr); }
.settle-card--SSR { border-left: 4rpx solid var(--color-rarity-ssr); }

.settle-card__rarity {
  font-size: var(--font-xs);
  font-weight: 700;
  width: 60rpx;
  text-align: center;
}

.settle-card--N .settle-card__rarity { color: var(--color-rarity-n); }
.settle-card--R .settle-card__rarity { color: var(--color-rarity-r); }
.settle-card--SR .settle-card__rarity { color: var(--color-rarity-sr); }
.settle-card--SSR .settle-card__rarity { color: var(--color-rarity-ssr); }

.settle-card__name {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  flex: 1;
}

/* Action buttons */
.settle-actions {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
  width: 100%;
}

.btn-settle {
  flex: 1;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
}

.btn-settle--retry {
  background: var(--color-bg-elevated);
  border: 1rpx solid var(--color-border);
}

.btn-settle--map {
  background: var(--color-terminal-green);
}

.btn-settle__text {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.btn-settle--map .btn-settle__text {
  color: #0D1117;
}

.btn-settle:active {
  opacity: 0.8;
}
```

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.wxss
git commit -m "feat(chapter): rewrite WXSS with terminal dark theme gameplay styles"
```

---

## Notes

- **Cross-subpackage require**: `timeline.js` uses `require('../../subpkg-chapters/data/game-stages')` which crosses from main package to subpackage. If this fails at runtime in WeChat DevTools, the fix is to copy `game-stages.js` stage metadata (just IDs/titles, not full questions) into `miniprogram/data/`.
- **Daily mode**: The chapter page accepts `?mode=daily` param. Daily questions come from `game-daily.getDailyQuestions()` which returns 3 random questions. Daily mode skips card rewards but awards streak progress.
- **Phase flow**: Phase 1 (challenge) → auto-transition to Phase 2 (review) → tap continue → if wrong answers exist, Phase 3 (confirm) → settlement. If no wrong answers, Phase 2 → settlement directly.
- **i18n**: Question stems, options, and explanations all use `locale` fallback chain: `[locale] || zh || en`.
