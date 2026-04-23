# Phase 3c: Card Collection (图鉴) + Card Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the layers page as a card collection grid (图鉴) showing all cards grouped by region with obtained/locked state, and rewrite the bridge-doc page to also serve as a card detail viewer when accessed with a `?cardId=` parameter.

**Architecture:** The layers page uses `game-cards.getCardsByRegion()` to build a grid of card thumbnails per region, with collection stats at top. Tapping an obtained card navigates to bridge-doc with `?cardId=xxx`. The bridge-doc page gains a dual-mode: `?slug=xxx` loads the existing Markdown document (unchanged), `?cardId=xxx` shows a terminal-styled card detail view with name, description, rarity, power/defense, tags.

**Tech Stack:** Native WeChat miniprogram (WXML/WXSS/JS), CSS variables from dark terminal theme, game-cards utility.

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Rewrite | `pages/layers/layers.json` | Nav bar title update |
| Rewrite | `pages/layers/layers.js` | Card collection data by region |
| Rewrite | `pages/layers/layers.wxml` | Card grid with region sections |
| Rewrite | `pages/layers/layers.wxss` | Dark theme card grid styles |
| Modify | `subpkg-bridge/pages/bridge-doc/bridge-doc.json` | Nav bar dark theme |
| Modify | `subpkg-bridge/pages/bridge-doc/bridge-doc.js` | Add cardId mode alongside slug mode |
| Modify | `subpkg-bridge/pages/bridge-doc/bridge-doc.wxml` | Add card detail view block |
| Modify | `subpkg-bridge/pages/bridge-doc/bridge-doc.wxss` | Add card detail styles |

---

### Task 1: Layers Page — JS (Card Collection Data)

**Files:**
- Rewrite: `miniprogram/pages/layers/layers.js`
- Rewrite: `miniprogram/pages/layers/layers.json`

- [ ] **Step 1: Update layers.json**

```json
{
  "navigationBarTitleText": "图鉴",
  "navigationBarBackgroundColor": "#0D1117",
  "navigationBarTextStyle": "white",
  "backgroundColor": "#0D1117",
  "usingComponents": {}
}
```

- [ ] **Step 2: Rewrite layers.js**

Replace the entire file. The new version loads game-cards data to build card grids grouped by region.

```js
// pages/layers/layers.js
var i18n = require('../../utils/i18n');
var eventBus = require('../../utils/event-bus');
var gameCards = require('../../utils/game-cards');

var REGIONS = [
  { id: 'core', symbol: '>', label: 'CORE/', colorHex: '#3FB950' },
  { id: 'tools', symbol: '$', label: 'TOOLS/', colorHex: '#58A6FF' },
  { id: 'runtime', symbol: '#', label: 'RUNTIME/', colorHex: '#BC8CFF' },
  { id: 'network', symbol: '@', label: 'NETWORK/', colorHex: '#F85149' },
  { id: 'practice', symbol: '!', label: 'PRACTICE/', colorHex: '#D29922' }
];

Page({
  data: {
    locale: 'zh',
    stats: {},
    regions: [],
    activeFilter: 'all'
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
    var stats = gameCards.getCollectionStats();
    var filter = this.data.activeFilter;

    var regions = REGIONS.map(function(r) {
      var cards = gameCards.getCardsByRegion(r.id);

      if (filter === 'obtained') {
        cards = cards.filter(function(c) { return c.obtained; });
      } else if (filter === 'missing') {
        cards = cards.filter(function(c) { return !c.obtained; });
      }

      var displayCards = cards.map(function(c) {
        var name = c.name;
        return {
          id: c.id,
          name: name[locale] || name.zh || name.en || c.id,
          rarity: c.rarity,
          obtained: c.obtained
        };
      });

      var regionStats = stats.byRegion[r.id] || { total: 0, obtained: 0 };

      return {
        id: r.id,
        symbol: r.symbol,
        label: r.label,
        colorHex: r.colorHex,
        cards: displayCards,
        obtained: regionStats.obtained,
        total: regionStats.total,
        visible: displayCards.length > 0
      };
    });

    this.setData({
      locale: locale,
      stats: {
        total: stats.total,
        obtained: stats.obtained,
        percent: Math.round(stats.ratio * 100),
        byRarity: stats.byRarity
      },
      regions: regions
    });
  },

  setFilter: function(e) {
    var filter = e.currentTarget.dataset.filter;
    this.setData({ activeFilter: filter });
    this._buildPageData();
  },

  goToCard: function(e) {
    var cardId = e.currentTarget.dataset.cardid;
    var obtained = e.currentTarget.dataset.obtained;
    if (!obtained || obtained === 'false') {
      wx.showToast({ title: '未解锁', icon: 'none' });
      return;
    }
    wx.navigateTo({
      url: '/subpkg-bridge/pages/bridge-doc/bridge-doc?cardId=' + cardId
    });
  },

  onShareAppMessage: function() {
    return {
      title: 'Claude Code Terminal — 图鉴',
      path: '/pages/home/home'
    };
  },

  onShareTimeline: function() {
    return {
      title: 'Claude Code Terminal — 图鉴'
    };
  }
});
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/layers/layers.js miniprogram/pages/layers/layers.json
git commit -m "feat(layers): rewrite JS as card collection grid with region grouping"
```

---

### Task 2: Layers Page — WXML + WXSS (Card Grid UI)

**Files:**
- Rewrite: `miniprogram/pages/layers/layers.wxml`
- Rewrite: `miniprogram/pages/layers/layers.wxss`

- [ ] **Step 1: Rewrite layers.wxml**

```xml
<!-- pages/layers/layers.wxml -->
<scroll-view scroll-y class="collection-page">

  <!-- Collection Header -->
  <view class="coll-header">
    <text class="coll-header__title font-mono">COLLECTION</text>
    <view class="coll-header__stats">
      <text class="coll-stat font-mono">{{stats.obtained}}/{{stats.total}}</text>
      <text class="coll-stat-pct font-mono">({{stats.percent}}%)</text>
    </view>
    <view class="coll-progress-bar">
      <view class="coll-progress-bar__fill" style="width:{{stats.percent}}%"></view>
    </view>

    <!-- Rarity breakdown -->
    <view class="rarity-row">
      <view class="rarity-item">
        <text class="rarity-dot" style="color:var(--color-rarity-n)">░</text>
        <text class="rarity-count font-mono">N {{stats.byRarity.N.obtained}}/{{stats.byRarity.N.total}}</text>
      </view>
      <view class="rarity-item">
        <text class="rarity-dot" style="color:var(--color-rarity-r)">▒</text>
        <text class="rarity-count font-mono">R {{stats.byRarity.R.obtained}}/{{stats.byRarity.R.total}}</text>
      </view>
      <view class="rarity-item">
        <text class="rarity-dot" style="color:var(--color-rarity-sr)">▓</text>
        <text class="rarity-count font-mono">SR {{stats.byRarity.SR.obtained}}/{{stats.byRarity.SR.total}}</text>
      </view>
      <view class="rarity-item">
        <text class="rarity-dot" style="color:var(--color-rarity-ssr)">█</text>
        <text class="rarity-count font-mono">SSR {{stats.byRarity.SSR.obtained}}/{{stats.byRarity.SSR.total}}</text>
      </view>
    </view>
  </view>

  <!-- Filter tabs -->
  <view class="filter-row">
    <text class="filter-tab font-mono {{activeFilter === 'all' ? 'filter-tab--active' : ''}}" bindtap="setFilter" data-filter="all">ALL</text>
    <text class="filter-tab font-mono {{activeFilter === 'obtained' ? 'filter-tab--active' : ''}}" bindtap="setFilter" data-filter="obtained">OBTAINED</text>
    <text class="filter-tab font-mono {{activeFilter === 'missing' ? 'filter-tab--active' : ''}}" bindtap="setFilter" data-filter="missing">MISSING</text>
  </view>

  <!-- Region Sections -->
  <view class="region-sections">
    <view wx:for="{{regions}}" wx:key="id" class="coll-region" wx:if="{{item.visible}}">

      <view class="coll-region__header">
        <text class="coll-region__symbol font-mono" style="color:{{item.colorHex}}">{{item.symbol}}</text>
        <text class="coll-region__label font-mono" style="color:{{item.colorHex}}">{{item.label}}</text>
        <text class="coll-region__count font-mono">{{item.obtained}}/{{item.total}}</text>
      </view>

      <view class="card-grid">
        <view
          wx:for="{{item.cards}}"
          wx:for-item="card"
          wx:key="id"
          class="card-thumb card-thumb--{{card.rarity}} {{card.obtained ? '' : 'card-thumb--locked'}}"
          bindtap="goToCard"
          data-cardid="{{card.id}}"
          data-obtained="{{card.obtained}}"
        >
          <text class="card-thumb__rarity font-mono">{{card.obtained ? card.rarity : '?'}}</text>
          <text class="card-thumb__name">{{card.obtained ? card.name : '???'}}</text>
        </view>
      </view>

    </view>
  </view>

  <view class="coll-footer"></view>
</scroll-view>
```

- [ ] **Step 2: Rewrite layers.wxss**

```css
/* pages/layers/layers.wxss — Card Collection Grid */

.collection-page {
  height: 100vh;
  background: var(--color-bg);
  padding: 0 var(--spacing-md);
}

/* ── Header ── */
.coll-header {
  padding: var(--spacing-lg) 0 var(--spacing-md);
}

.coll-header__title {
  font-size: var(--font-xl);
  font-weight: 700;
  color: var(--color-terminal-blue);
  display: block;
  margin-bottom: var(--spacing-xs);
}

.coll-header__stats {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.coll-stat {
  font-size: var(--font-md);
  font-weight: 700;
  color: var(--color-text-primary);
}

.coll-stat-pct {
  font-size: var(--font-sm);
  color: var(--color-text-muted);
}

.coll-progress-bar {
  height: 6rpx;
  background: var(--color-bg-muted);
  border-radius: 3rpx;
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.coll-progress-bar__fill {
  height: 100%;
  background: var(--color-terminal-blue);
  border-radius: 3rpx;
  transition: width 0.3s;
}

/* Rarity breakdown */
.rarity-row {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-md);
}

.rarity-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rpx;
}

.rarity-dot {
  font-size: var(--font-sm);
  font-weight: 700;
}

.rarity-count {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
}

/* ── Filter Tabs ── */
.filter-row {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  margin-bottom: var(--spacing-sm);
}

.filter-tab {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  padding: var(--spacing-xs) var(--spacing-md);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-pill);
}

.filter-tab--active {
  color: var(--color-text-primary);
  background: var(--color-bg-elevated);
  border-color: var(--color-text-muted);
}

/* ── Region Sections ── */
.region-sections {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  padding-bottom: var(--spacing-xl);
}

.coll-region__header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-sm);
}

.coll-region__symbol {
  font-size: var(--font-md);
  font-weight: 700;
}

.coll-region__label {
  font-size: var(--font-sm);
  font-weight: 700;
}

.coll-region__count {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  margin-left: auto;
}

/* ── Card Grid ── */
.card-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.card-thumb {
  width: calc(33.33% - 12rpx);
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  gap: 6rpx;
  min-height: 120rpx;
}

.card-thumb:active {
  opacity: 0.7;
}

.card-thumb--locked {
  opacity: 0.35;
}

/* Rarity border colors */
.card-thumb--N { border-left: 4rpx solid var(--color-rarity-n); }
.card-thumb--R { border-left: 4rpx solid var(--color-rarity-r); }
.card-thumb--SR { border-left: 4rpx solid var(--color-rarity-sr); }
.card-thumb--SSR { border-left: 4rpx solid var(--color-rarity-ssr); }

.card-thumb--locked.card-thumb--N,
.card-thumb--locked.card-thumb--R,
.card-thumb--locked.card-thumb--SR,
.card-thumb--locked.card-thumb--SSR {
  border-left-color: var(--color-bg-muted);
}

.card-thumb__rarity {
  font-size: var(--font-2xs);
  font-weight: 700;
  color: var(--color-text-muted);
}

.card-thumb--N .card-thumb__rarity { color: var(--color-rarity-n); }
.card-thumb--R .card-thumb__rarity { color: var(--color-rarity-r); }
.card-thumb--SR .card-thumb__rarity { color: var(--color-rarity-sr); }
.card-thumb--SSR .card-thumb__rarity { color: var(--color-rarity-ssr); }

.card-thumb--locked .card-thumb__rarity {
  color: var(--color-text-muted);
}

.card-thumb__name {
  font-size: var(--font-2xs);
  color: var(--color-text-primary);
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.card-thumb--locked .card-thumb__name {
  color: var(--color-text-muted);
}

/* Footer */
.coll-footer {
  height: 60rpx;
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/layers/layers.wxml miniprogram/pages/layers/layers.wxss
git commit -m "feat(layers): rewrite WXML+WXSS as terminal card collection grid"
```

---

### Task 3: Bridge-Doc Page — Add Card Detail Mode

**Files:**
- Modify: `miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.json`
- Modify: `miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.js`
- Modify: `miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.wxml`
- Modify: `miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.wxss`

The bridge-doc page gains a new `?cardId=xxx` parameter. When present, it shows a card detail view instead of a Markdown document. The existing `?slug=xxx` path is UNCHANGED — only additive changes.

- [ ] **Step 1: Update bridge-doc.json**

```json
{
  "navigationBarTitleText": "详情",
  "navigationBarBackgroundColor": "#0D1117",
  "navigationBarTextStyle": "white",
  "backgroundColor": "#0D1117",
  "usingComponents": {}
}
```

- [ ] **Step 2: Modify bridge-doc.js — add card detail loading**

Add a `require` for `game-cards` at the top (after existing requires), and modify `onLoad` to detect `?cardId=` parameter. Add a `_loadCard` method. Keep all existing code intact.

Add after line 6 (after `const bridgeDocsMeta = require(...)`):
```js
var gameCards = require('../../../utils/game-cards');
```

Modify `onLoad` to check for cardId first:
```js
  onLoad(options) {
    if (options.cardId) {
      this._loadCard(options.cardId);
    } else {
      const slug = options.slug || '';
      this._loadDoc(slug);
    }

    this._localeListener = () => {
      if (this.data.cardMode) {
        this._loadCard(this.data.cardId);
      } else {
        this._loadDoc(this.data.slug);
      }
    };
    eventBus.on('locale:change', this._localeListener);
  },
```

Add `_loadCard` method before `_loadDoc`:
```js
  _loadCard(cardId) {
    var locale = i18n.getLocale();
    var card = gameCards.getCard(cardId);

    if (!card) {
      this.setData({ notFound: true, loaded: true, cardMode: true, cardId: cardId });
      wx.setNavigationBarTitle({ title: '卡牌未找到' });
      return;
    }

    var name = card.name;
    var desc = card.desc;
    var cardName = name[locale] || name.zh || name.en || cardId;
    var cardDesc = desc[locale] || desc.zh || desc.en || '';
    var obtained = gameCards.isObtained(cardId);
    var regionLabels = { core: 'CORE/', tools: 'TOOLS/', runtime: 'RUNTIME/', network: 'NETWORK/', practice: 'PRACTICE/' };
    var regionColors = { core: '#3FB950', tools: '#58A6FF', runtime: '#BC8CFF', network: '#F85149', practice: '#D29922' };

    wx.setNavigationBarTitle({ title: cardName });

    this.setData({
      cardMode: true,
      cardId: cardId,
      cardData: {
        id: card.id,
        name: cardName,
        desc: cardDesc,
        rarity: card.rarity,
        region: card.region,
        regionLabel: regionLabels[card.region] || '',
        regionColor: regionColors[card.region] || '#3FB950',
        chapter: card.chapter,
        tags: card.tags || [],
        power: card.power,
        defense: card.defense,
        obtained: obtained
      },
      loaded: true,
      notFound: false
    });
  },
```

Also add `cardMode: false, cardId: '', cardData: null` to the initial `data` object.

- [ ] **Step 3: Modify bridge-doc.wxml — add card detail view**

Insert a new block BEFORE the existing `<!-- 加载中 -->` comment (after line 14, the closing `</view>` of bd-header). The card detail view shows when `cardMode` is true.

Add before `<!-- 加载中 -->`:
```xml
  <!-- ══════════ Card Detail Mode ══════════ -->
  <block wx:if="{{cardMode && loaded && !notFound}}">
    <view class="card-detail">
      <!-- Card visual -->
      <view class="card-visual card-visual--{{cardData.rarity}}">
        <view class="card-visual__header">
          <text class="card-visual__rarity font-mono">{{cardData.rarity}}</text>
          <text class="card-visual__region font-mono" style="color:{{cardData.regionColor}}">{{cardData.regionLabel}}</text>
        </view>
        <text class="card-visual__name">{{cardData.name}}</text>
        <text class="card-visual__desc">{{cardData.desc}}</text>
        <view class="card-visual__stats">
          <text class="card-stat font-mono">PWR: {{cardData.power}}</text>
          <text class="card-stat font-mono">DEF: {{cardData.defense}}</text>
        </view>
        <view class="card-visual__tags">
          <text wx:for="{{cardData.tags}}" wx:key="*this" class="card-tag font-mono">#{{item}}</text>
        </view>
      </view>

      <!-- Card meta -->
      <view class="card-meta">
        <view class="card-meta__row">
          <text class="card-meta__label font-mono">CHAPTER</text>
          <text class="card-meta__value">{{cardData.chapter}}</text>
        </view>
        <view class="card-meta__row">
          <text class="card-meta__label font-mono">STATUS</text>
          <text class="card-meta__value font-mono" style="color:{{cardData.obtained ? 'var(--color-terminal-green)' : 'var(--color-terminal-red)'}}">{{cardData.obtained ? '✓ DECODED' : '✗ LOCKED'}}</text>
        </view>
      </view>

      <view class="card-back-btn" bindtap="goBack">
        <text class="card-back-btn__text font-mono">> BACK</text>
      </view>
    </view>
  </block>

  <!-- ══════════ Original Doc Mode (unchanged below) ══════════ -->
```

Also wrap the existing header in a condition so it only shows in doc mode — add `wx:if="{{!cardMode}}"` to the `bd-header` view.

And wrap the existing doc content sections with `wx:if="{{!cardMode}}"` so they don't render in card mode.

- [ ] **Step 4: Add card detail styles to bridge-doc.wxss**

Append the following CSS to the END of the existing file (do NOT replace existing styles):

```css
/* ══════════════════════════════════════════
   Card Detail Mode
══════════════════════════════════════════ */
.card-detail {
  padding: var(--spacing-lg) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.card-visual {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.card-visual--N { border-top: 4rpx solid var(--color-rarity-n); }
.card-visual--R { border-top: 4rpx solid var(--color-rarity-r); }
.card-visual--SR { border-top: 4rpx solid var(--color-rarity-sr); box-shadow: 0 0 20rpx rgba(188, 140, 255, 0.1); }
.card-visual--SSR { border-top: 4rpx solid var(--color-rarity-ssr); box-shadow: 0 0 30rpx rgba(240, 192, 64, 0.15); }

.card-visual__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-visual__rarity {
  font-size: var(--font-sm);
  font-weight: 700;
}

.card-visual--N .card-visual__rarity { color: var(--color-rarity-n); }
.card-visual--R .card-visual__rarity { color: var(--color-rarity-r); }
.card-visual--SR .card-visual__rarity { color: var(--color-rarity-sr); }
.card-visual--SSR .card-visual__rarity { color: var(--color-rarity-ssr); }

.card-visual__region {
  font-size: var(--font-xs);
  font-weight: 600;
}

.card-visual__name {
  font-size: var(--font-lg);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
}

.card-visual__desc {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
  line-height: 1.7;
}

.card-visual__stats {
  display: flex;
  flex-direction: row;
  gap: var(--spacing-lg);
  padding-top: var(--spacing-sm);
  border-top: 1rpx solid var(--color-border);
}

.card-stat {
  font-size: var(--font-sm);
  color: var(--color-text-secondary);
}

.card-visual__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.card-tag {
  font-size: var(--font-2xs);
  color: var(--color-text-muted);
  background: var(--color-bg-elevated);
  padding: 4rpx 12rpx;
  border-radius: var(--radius-sm);
}

/* Card meta info */
.card-meta {
  background: var(--color-bg-card);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.card-meta__row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.card-meta__label {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
}

.card-meta__value {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
}

/* Back button */
.card-back-btn {
  padding: var(--spacing-md);
  background: var(--color-bg-elevated);
  border: 1rpx solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  justify-content: center;
}

.card-back-btn__text {
  font-size: var(--font-sm);
  font-weight: 700;
  color: var(--color-text-primary);
}

.card-back-btn:active {
  background: var(--color-bg-muted);
}
```

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.js miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.json miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.wxml miniprogram/subpkg-bridge/pages/bridge-doc/bridge-doc.wxss
git commit -m "feat(bridge-doc): add card detail mode alongside existing doc mode"
```

---

## Notes

- **Backwards compatibility**: The bridge-doc page's existing `?slug=xxx` behavior is completely unchanged. Card detail mode is purely additive.
- **Card data source**: `game-cards.getCardsByRegion()` returns card data with `obtained` boolean merged from save state. Card details (name, desc, tags, power, defense) come from the build-generated `data/game-cards.js`.
- **Filter**: The ALL/OBTAINED/MISSING filter on the collection page is client-side — no data reload needed, just re-filter.
- **i18n**: Card names and descriptions use locale fallback: `[locale] || zh || en`.
- **Locked cards**: Show as `???` with reduced opacity. Tapping shows a toast "未解锁" instead of navigating.
