# Phase 4d: 数据统计面板 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a detailed statistics section to the archive/reference page, showing total answer stats, region progress with ASCII progress bars, streak records, and card distribution by rarity.

**Architecture:** All stats are computed from existing APIs (`gameSave.load()`, `gameEngine.getRegionProgress()`, `gameCards.getCollectionStats()`, `gameDaily.getStreakInfo()`). No new storage needed. The reference page (`reference.js`) aggregates data in `_buildPageData()`, the template (`reference.wxml`) renders a new STATISTICS section between achievements and settings, and styles go in `reference.wxss`.

**Tech Stack:** Native WeChat miniprogram (WXML/WXSS/JS, CommonJS, CSS variables, rpx units).

**Key constraint:** `game-stages.js` is in subpackage `subpkg-chapters/data/` and CANNOT be required from the main package. Region→stage ID mapping is hardcoded as a constant (same pattern as `home.js` REGIONS).

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `miniprogram/pages/reference/reference.js` | Modify | Import gameEngine, add REGIONS constant, compute stats in _buildPageData() |
| `miniprogram/pages/reference/reference.wxml` | Modify | Insert STATISTICS section between achievements and settings |
| `miniprogram/pages/reference/reference.wxss` | Modify | Add statistics section styles |

---

### Task 1: Add statistics data computation to reference.js

**Files:**
- Modify: `miniprogram/pages/reference/reference.js:1-8` (imports)
- Modify: `miniprogram/pages/reference/reference.js:43-88` (_buildPageData)

- [ ] **Step 1: Add gameEngine import and REGIONS constant**

After the existing imports (line 7: `var gameAchievement = require('../../utils/game-achievement');`), add:

```js
var gameEngine = require('../../utils/game-engine');
```

Before the `Page({` line (currently line 16), add the REGIONS constant:

```js
var REGIONS = [
  { id: 'core', label: 'CORE', color: 'var(--color-region-core)', stages: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'] },
  { id: 'tools', label: 'TOOLS', color: 'var(--color-region-tools)', stages: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'] },
  { id: 'runtime', label: 'RUNTIME', color: 'var(--color-region-runtime)', stages: ['stage_s12','stage_s13','stage_s14'] },
  { id: 'network', label: 'NETWORK', color: 'var(--color-region-network)', stages: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'] },
  { id: 'practice', label: 'PRACTICE', color: 'var(--color-region-practice)', stages: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07'] }
];
```

- [ ] **Step 2: Add `stats` data field**

In the `data: { ... }` block, add after `showResetConfirm: false`:

```js
    stats: null
```

So it becomes:

```js
    showResetConfirm: false,
    stats: null
```

- [ ] **Step 3: Add stats computation in _buildPageData()**

Inside `_buildPageData()`, after the line `var achievementStats = gameAchievement.getAchievementStats();` and before the `var allAchievements = ...` line, add the stats computation block:

```js
    var saveData = gameSave.load();
    var stageKeys = Object.keys(saveData.stages);
    var totalAnswered = 0;
    var totalCorrect = 0;
    var clearedStages = 0;
    for (var si = 0; si < stageKeys.length; si++) {
      var stageRec = saveData.stages[stageKeys[si]];
      if (stageRec && stageRec.stars > 0) clearedStages++;
      if (stageRec && stageRec.bestScore) totalCorrect += stageRec.bestScore;
      if (stageRec && stageRec.attempts) totalAnswered += stageRec.attempts;
    }

    var regionStats = REGIONS.map(function(r) {
      var progress = gameEngine.getRegionProgress(r.stages);
      var maxStars = r.stages.length * 3;
      var pct = Math.round(progress.ratio * 100);
      var barFilled = Math.round(pct / 10);
      var bar = '';
      for (var b = 0; b < 10; b++) {
        bar += b < barFilled ? '█' : '░';
      }
      return {
        id: r.id,
        label: r.label,
        color: r.color,
        bar: bar,
        pct: pct,
        stars: progress.totalStars,
        maxStars: maxStars,
        cleared: progress.cleared,
        total: progress.total
      };
    });

    var stats = {
      totalAnswered: totalAnswered,
      clearedStages: clearedStages,
      totalExp: levelInfo.exp,
      regionStats: regionStats,
      streak: streakInfo,
      cards: collectionStats
    };
```

- [ ] **Step 4: Add stats to setData call**

In the `this.setData({ ... })` call, add `stats: stats` after `achievementStats: achievementStats,`:

Change:
```js
      achievementStats: achievementStats,
      categories: categories,
```

To:
```js
      achievementStats: achievementStats,
      stats: stats,
      categories: categories,
```

- [ ] **Step 5: Verify and commit**

Run: `node -c miniprogram/pages/reference/reference.js && echo "OK"`
Expected: OK

Run: `grep -n 'gameEngine\|REGIONS\|regionStats\|stats:' miniprogram/pages/reference/reference.js`
Expected: Shows import, REGIONS constant, regionStats computation, and stats in setData

```bash
git add miniprogram/pages/reference/reference.js
git commit -m "feat: add statistics data computation to reference page"
```

---

### Task 2: Add STATISTICS section to reference.wxml

**Files:**
- Modify: `miniprogram/pages/reference/reference.wxml:58-60` (between achievements and settings)

- [ ] **Step 1: Insert STATISTICS section between arc-categories and arc-settings**

Find this transition in `reference.wxml` (around lines 58-61):

```xml
  </view>

  <!-- Settings Section -->
  <view class="arc-settings">
```

Insert the statistics section between `</view>` (end of arc-categories) and the settings comment. The new block goes right after line 58 (`</view>` closing arc-categories):

```xml

  <!-- Statistics Section -->
  <view class="arc-stats-section" wx:if="{{stats}}">
    <text class="arc-stats-section__title font-mono">STATISTICS</text>

    <!-- Overview -->
    <view class="stats-overview">
      <view class="stats-overview__row">
        <text class="stats-kv font-mono">STAGES CLEARED:</text>
        <text class="stats-kv__val font-mono">{{stats.clearedStages}}</text>
      </view>
      <view class="stats-overview__row">
        <text class="stats-kv font-mono">TOTAL ATTEMPTS:</text>
        <text class="stats-kv__val font-mono">{{stats.totalAnswered}}</text>
      </view>
      <view class="stats-overview__row">
        <text class="stats-kv font-mono">TOTAL EXP:</text>
        <text class="stats-kv__val font-mono">{{stats.totalExp}}</text>
      </view>
    </view>

    <!-- Region Progress -->
    <view class="stats-regions">
      <text class="stats-sub-title font-mono">REGION PROGRESS</text>
      <view wx:for="{{stats.regionStats}}" wx:key="id" class="stats-region-row">
        <text class="stats-region__label font-mono" style="color:{{item.color}}">{{item.label}}</text>
        <text class="stats-region__bar font-mono">{{item.bar}}</text>
        <text class="stats-region__pct font-mono">{{item.pct}}%</text>
        <text class="stats-region__stars font-mono" style="color:var(--color-terminal-orange)">★{{item.stars}}/{{item.maxStars}}</text>
      </view>
    </view>

    <!-- Streak -->
    <view class="stats-streak">
      <text class="stats-sub-title font-mono">STREAK</text>
      <view class="stats-streak__row">
        <view class="stats-streak__item">
          <text class="stats-streak__val font-mono">{{stats.streak.current}}</text>
          <text class="stats-streak__label font-mono">CURRENT</text>
        </view>
        <view class="stats-streak__item">
          <text class="stats-streak__val font-mono">{{stats.streak.best}}</text>
          <text class="stats-streak__label font-mono">BEST</text>
        </view>
        <view class="stats-streak__item">
          <text class="stats-streak__val font-mono">{{stats.streak.shields}}</text>
          <text class="stats-streak__label font-mono">SHIELDS</text>
        </view>
      </view>
    </view>

    <!-- Card Distribution -->
    <view class="stats-cards">
      <text class="stats-sub-title font-mono">CARD DISTRIBUTION</text>
      <view class="stats-cards__row">
        <view class="stats-card-item">
          <text class="stats-card-item__rarity font-mono" style="color:var(--color-rarity-n)">N</text>
          <text class="stats-card-item__count font-mono">{{stats.cards.byRarity.N.obtained}}/{{stats.cards.byRarity.N.total}}</text>
        </view>
        <view class="stats-card-item">
          <text class="stats-card-item__rarity font-mono" style="color:var(--color-rarity-r)">R</text>
          <text class="stats-card-item__count font-mono">{{stats.cards.byRarity.R.obtained}}/{{stats.cards.byRarity.R.total}}</text>
        </view>
        <view class="stats-card-item">
          <text class="stats-card-item__rarity font-mono" style="color:var(--color-rarity-sr)">SR</text>
          <text class="stats-card-item__count font-mono">{{stats.cards.byRarity.SR.obtained}}/{{stats.cards.byRarity.SR.total}}</text>
        </view>
        <view class="stats-card-item">
          <text class="stats-card-item__rarity font-mono" style="color:var(--color-rarity-ssr)">SSR</text>
          <text class="stats-card-item__count font-mono">{{stats.cards.byRarity.SSR.obtained}}/{{stats.cards.byRarity.SSR.total}}</text>
        </view>
      </view>
    </view>
  </view>
```

- [ ] **Step 2: Verify the edit**

Run: `grep -n 'STATISTICS\|stats-overview\|stats-region\|stats-streak\|stats-cards\|arc-settings' miniprogram/pages/reference/reference.wxml`
Expected: STATISTICS section lines appear before arc-settings

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/reference/reference.wxml
git commit -m "feat: add STATISTICS section to reference page template"
```

---

### Task 3: Add statistics styles to reference.wxss

**Files:**
- Modify: `miniprogram/pages/reference/reference.wxss` (append before footer styles)

- [ ] **Step 1: Insert statistics styles before the footer section**

Find the footer section at the end of `reference.wxss` (around line 295):

```css
/* Footer */
.arc-footer {
  height: 60rpx;
}
```

Insert the following styles BEFORE the `/* Footer */` comment:

```css
/* ── Statistics Section ── */
.arc-stats-section {
  border-top: 1rpx solid var(--color-border);
  padding-top: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.arc-stats-section__title {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-terminal-green);
  display: block;
  margin-bottom: var(--spacing-md);
}

.stats-sub-title {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  display: block;
  margin-bottom: var(--spacing-sm);
  margin-top: var(--spacing-md);
}

/* Overview */
.stats-overview {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md);
}

.stats-overview__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xs) 0;
}

.stats-kv {
  font-size: var(--font-xs);
  color: var(--color-text-secondary);
}

.stats-kv__val {
  font-size: var(--font-xs);
  font-weight: 700;
  color: var(--color-text-primary);
}

/* Region Progress */
.stats-regions {
  margin-bottom: var(--spacing-sm);
}

.stats-region-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) 0;
}

.stats-region__label {
  font-size: var(--font-2xs);
  width: 140rpx;
  font-weight: 700;
}

.stats-region__bar {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
  letter-spacing: 1rpx;
  flex: 1;
}

.stats-region__pct {
  font-size: var(--font-2xs);
  color: var(--color-text-secondary);
  width: 72rpx;
  text-align: right;
}

.stats-region__stars {
  font-size: var(--font-2xs);
  width: 120rpx;
  text-align: right;
}

/* Streak */
.stats-streak__row {
  display: flex;
  justify-content: space-around;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.stats-streak__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.stats-streak__val {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

.stats-streak__label {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

/* Card Distribution */
.stats-cards__row {
  display: flex;
  justify-content: space-around;
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
}

.stats-card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rpx;
}

.stats-card-item__rarity {
  font-size: var(--font-sm);
  font-weight: 700;
}

.stats-card-item__count {
  font-size: var(--font-2xs);
  color: var(--color-text-secondary);
}
```

- [ ] **Step 2: Verify the styles**

Run: `grep -n 'stats-' miniprogram/pages/reference/reference.wxss | head -20`
Expected: Shows the new stats classes

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/reference/reference.wxss
git commit -m "feat: add statistics section styles to reference page"
```

---

### Task 4: Final verification

- [ ] **Step 1: Verify all files are consistent**

```bash
echo "=== JS syntax ===" && node -c miniprogram/pages/reference/reference.js && echo "reference.js OK"

echo "=== JS imports ===" && head -10 miniprogram/pages/reference/reference.js

echo "=== WXML stats section ===" && grep -c 'stats' miniprogram/pages/reference/reference.wxml

echo "=== WXSS stats classes ===" && grep -c 'stats-' miniprogram/pages/reference/reference.wxss

echo "=== Data flow: stats in setData ===" && grep 'stats:' miniprogram/pages/reference/reference.js
```
