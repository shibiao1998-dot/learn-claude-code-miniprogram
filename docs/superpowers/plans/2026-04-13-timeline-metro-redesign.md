# Timeline Metro Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the fragmented timeline card layout with a continuous metro/subway line map — station dots, transfer nodes, one unbroken colored rail.

**Architecture:** Rewrite only the "Chapter Timeline" block inside the existing timeline page. The WXML template replaces `timeline-item`/`timeline-card` markup with `metro-line`/`metro-station`/`metro-transfer` elements. The WXSS swaps old card styles for metro layout styles. The JS simplifies the `timelineItems` data (drops subtitle/keyInsight/loc) and adds `rangeText`/`lastLayerColor`.

**Tech Stack:** WeChat Mini Program native (WXML / WXSS / JS). No npm. CSS variables defined in `app.wxss`. `rpx` units.

**Spec:** `docs/superpowers/specs/2026-04-13-timeline-metro-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `miniprogram/pages/timeline/timeline.js` | Modify lines 169–216, 246–294 | Simplify `timelineItems` data; add `rangeText` per layer-start item; add `lastLayerColor`; remove unused i18n keys `t_locUnit` |
| `miniprogram/pages/timeline/timeline.wxml` | Modify lines 109–178 | Replace old timeline block with metro-line markup |
| `miniprogram/pages/timeline/timeline.wxss` | Modify lines 295–537 | Delete old timeline/inline-checkpoint styles; add metro styles |

No new files created. No other files touched.

---

### Task 1: Simplify JS data — drop unused fields, add rangeText & lastLayerColor

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.js:79-103` (add `_buildLayerRangeMap`)
- Modify: `miniprogram/pages/timeline/timeline.js:169-216` (simplify timelineItems)
- Modify: `miniprogram/pages/timeline/timeline.js:246-294` (setData changes)

- [ ] **Step 1: Add `_buildLayerRangeMap` helper after `_buildLayerEndMap` (line 103)**

Insert this function after the closing `}` of `_buildLayerEndMap()`:

```javascript
// 构建 layerStart 的版本范围文本映射
function _buildLayerRangeMap() {
  var map = {};
  meta.layers.forEach(function(layer) {
    if (layer.versions && layer.versions.length > 0) {
      var first = layer.versions[0];
      var last = layer.versions[layer.versions.length - 1];
      map[first] = first + ' → ' + last;
    }
  });
  return map;
}
```

- [ ] **Step 2: Simplify `timelineItems` map in `_buildPageData` (lines 169–216)**

Replace the entire `const timelineItems = meta.versionOrder.map(...)` block with:

```javascript
    const layerRangeMap = _buildLayerRangeMap();

    // 构建 timelineItems（地铁图模式：仅保留 id/title/layer/isRead/layerStart 信息）
    const timelineItems = meta.versionOrder.map(function(id) {
      var v = meta.versions[id];
      if (!v) return null;

      var isLayerStart = layerStartMap[id] !== undefined;

      // layer 标题
      var layerLabel = '';
      if (isLayerStart) {
        var lid = layerStartMap[id];
        layerLabel = (messages.layer_labels && messages.layer_labels[lid]) || lid;
      }

      return {
        id: id,
        title: (messages.sessions && messages.sessions[id]) || v.title,
        layer: v.layer,
        isRead: progress.isRead(id),
        isLayerStart: isLayerStart,
        layerLabel: layerLabel,
        layerColor: _getLayerColor(v.layer),
        rangeText: isLayerStart ? (layerRangeMap[id] || '') : '',
      };
    }).filter(Boolean);
```

- [ ] **Step 3: Add `lastLayerColor` and remove unused i18n keys in `setData` (lines 246–294)**

In the `this.setData({...})` call:

1. Add after `readCount,`:
```javascript
      lastLayerColor: timelineItems.length > 0 ? timelineItems[timelineItems.length - 1].layerColor : '#94A3B8',
```

2. Remove these keys from setData (they are no longer used in the template):
   - `t_locUnit` (line ~288 — the `t_locUnit:` line)

- [ ] **Step 4: Simplify `_refreshReadState` (lines 297–303)**

Replace the existing method body:

```javascript
  _refreshReadState() {
    var updated = this.data.timelineItems.map(function(item) {
      return Object.assign({}, item, { isRead: progress.isRead(item.id) });
    });
    var readCount = progress.getReadCount(meta.versionOrder);
    this.setData({ timelineItems: updated, readCount: readCount });
  },
```

(This is functionally identical — just confirming it still works without the removed fields.)

- [ ] **Step 5: Commit**

```bash
git add miniprogram/pages/timeline/timeline.js
git commit -m "refactor(timeline): simplify timelineItems data for metro layout

Drop subtitle/keyInsight/loc/checkpointData from timeline items.
Add rangeText for layer-start items and lastLayerColor for end marker."
```

---

### Task 2: Rewrite WXML template — metro line markup

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.wxml:109-178`

- [ ] **Step 1: Replace the entire "主时间线" section (lines 109–178)**

Delete lines 109–178 and replace with:

```xml
  <!-- ========== 主时间线（地铁线路图） ========== -->
  <view class="section section-last">
    <text class="section-title">{{t_timelineSectionTitle}}</text>

    <view class="metro-line">
      <block wx:for="{{timelineItems}}" wx:key="id">

        <!-- 换乘站（阶段起始） -->
        <view wx:if="{{item.isLayerStart}}" class="metro-transfer"
              bindtap="toggleCheckpoint" data-layer="{{item.layer}}">
          <view class="metro-rail metro-rail-transfer" style="background: {{item.layerColor}}"></view>
          <view class="transfer-node" style="border-color: {{item.layerColor}}">
            <view class="transfer-dot" style="background: {{item.layerColor}}"></view>
          </view>
          <view class="transfer-text">
            <text class="transfer-label" style="color: {{item.layerColor}}">{{item.layerLabel}}</text>
            <text class="transfer-range">{{item.rangeText}}</text>
          </view>
        </view>

        <!-- 普通站点 -->
        <view class="metro-station {{item.isRead ? 'read' : ''}}"
              bindtap="goToChapter" data-id="{{item.id}}"
              hover-class="station-hover">
          <view class="metro-rail" style="background: {{item.layerColor}}"></view>
          <view class="station-dot" style="background: {{item.layerColor}}"></view>
          <text class="station-id" style="color: {{item.layerColor}}">{{item.id}}</text>
          <text class="station-name">{{item.title}}</text>
        </view>

      </block>

      <!-- 终点标记 -->
      <view class="metro-end">
        <view class="metro-rail metro-rail-end" style="background: {{lastLayerColor}}"></view>
        <view class="end-dot" style="background: {{lastLayerColor}}"></view>
      </view>
    </view>
  </view>
```

- [ ] **Step 2: Verify template integrity**

Check that:
- The `</scroll-view>` closing tag on line 183 is preserved
- The `page-footer` view (lines 180–181) is preserved
- The `wx:for` uses `{{timelineItems}}` and `wx:key="id"`

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/timeline/timeline.wxml
git commit -m "feat(timeline): replace card layout with metro line map markup

Continuous rail + station dots + transfer nodes. Remove old
timeline-card, layer-divider, and inline-checkpoint markup."
```

---

### Task 3: Rewrite WXSS — delete old styles, add metro styles

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.wxss:295-537`

- [ ] **Step 1: Delete old timeline and inline-checkpoint styles (lines 295–537)**

Delete everything from line 295 (`/* ========== 主时间线 ========== */`) through line 537 (`}`), inclusive. This removes:
- `.timeline` container
- `.layer-divider`, `.layer-divider-line`, `.layer-divider-content`, `.layer-divider-dot`, `.layer-divider-label`
- `.timeline-item`, `.timeline-line-wrapper`, `.timeline-line`
- `.timeline-card`, `.timeline-card.card-read`
- `.chapter-header`, `.chapter-id-badge`, `.chapter-id`, `.chapter-title`
- `.read-badge`, `.read-check`
- `.chapter-subtitle`, `.chapter-insight`
- `.chapter-meta`, `.chapter-loc`, `.chapter-layer-dot`
- `.inline-checkpoint` and all sub-selectors
- `.page-footer`

- [ ] **Step 2: Add new metro line styles in place of deleted block**

Insert at line 295:

```css
/* ========== 地铁线路图 ========== */
.metro-line {
  position: relative;
  padding: var(--spacing-sm) 0 var(--spacing-lg);
}

/* ---- 连续轨道线 ---- */
.metro-rail {
  position: absolute;
  left: 45rpx;
  top: 0;
  bottom: 0;
  width: 6rpx;
  border-radius: 3rpx;
}

/* 换乘站的轨道：顶部不延伸到行顶（留出圆环空间） */
.metro-rail-transfer {
  top: 0;
  bottom: 0;
}

/* 终点段的轨道：只到圆点中心位置 */
.metro-rail-end {
  bottom: auto;
  height: 24rpx;
}

/* ---- 普通站点行 ---- */
.metro-station {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 80rpx;
  padding-left: 80rpx;
}

.metro-station.read .station-dot {
  opacity: 0.4;
}

.metro-station.read .station-id,
.metro-station.read .station-name {
  opacity: 0.4;
}

.station-hover {
  background: rgba(51, 65, 85, 0.3);
  border-radius: var(--radius-sm);
}

.station-dot {
  position: absolute;
  left: 40rpx;
  top: 50%;
  width: 16rpx;
  height: 16rpx;
  margin-top: -8rpx;
  border-radius: 50%;
}

.station-id {
  font-size: var(--font-xs);
  font-weight: 700;
  font-family: monospace;
  width: 60rpx;
  flex-shrink: 0;
}

.station-name {
  font-size: var(--font-sm);
  color: var(--color-text-primary);
  margin-left: var(--spacing-sm);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---- 换乘站行 ---- */
.metro-transfer {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 120rpx;
  padding-left: 80rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}

/* 第一个换乘站不需要顶部额外间距 */
.metro-transfer:first-child {
  margin-top: 0;
}

.transfer-node {
  position: absolute;
  left: 32rpx;
  top: 50%;
  width: 32rpx;
  height: 32rpx;
  margin-top: -16rpx;
  border-radius: 50%;
  border: 4rpx solid;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.transfer-dot {
  width: 10rpx;
  height: 10rpx;
  border-radius: 50%;
}

.transfer-text {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: var(--spacing-sm);
}

.transfer-label {
  font-size: var(--font-sm);
  font-weight: 700;
  letter-spacing: 1rpx;
}

.transfer-range {
  font-size: var(--font-xs);
  color: var(--color-text-muted);
  font-family: monospace;
}

/* ---- 终点标记 ---- */
.metro-end {
  position: relative;
  height: 32rpx;
}

.end-dot {
  position: absolute;
  left: 44rpx;
  top: 24rpx;
  width: 8rpx;
  height: 8rpx;
  border-radius: 50%;
  opacity: 0.5;
}

/* ========== 底部留白 ========== */
.page-footer {
  height: 80rpx;
}
```

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/timeline/timeline.wxss
git commit -m "style(timeline): add metro line map styles, remove old card styles

Continuous 6rpx rail, 16rpx station dots, 32rpx transfer nodes,
80rpx row height, color-coded by architecture layer."
```

---

### Task 4: Visual polish & alignment tuning

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.wxss` (fine-tune values)
- Modify: `miniprogram/pages/timeline/timeline.wxml` (adjust if needed)

- [ ] **Step 1: Verify rail continuity — check for gaps between station rows**

In the WeChat DevTools simulator, scroll through the full timeline. If gaps appear between station rows (rail segments don't connect), the issue is `height: 80rpx` not fully filling. Fix by ensuring `.metro-station` and `.metro-transfer` have `box-sizing: border-box` and no vertical margin that breaks the rail:

Add at the top of the metro styles section if needed:

```css
.metro-station,
.metro-transfer,
.metro-end {
  box-sizing: border-box;
}
```

- [ ] **Step 2: Verify transfer node alignment**

The transfer node center should be at `left: 48rpx` (matching rail center at `left: 45rpx + 3rpx`). Verify:
- `.transfer-node` left = 32rpx, width = 32rpx → center = 32 + 16 = 48rpx ✓
- `.station-dot` left = 40rpx, width = 16rpx → center = 40 + 8 = 48rpx ✓
- `.metro-rail` left = 45rpx, width = 6rpx → center = 45 + 3 = 48rpx ✓
- `.end-dot` left = 44rpx, width = 8rpx → center = 44 + 4 = 48rpx ✓

If anything looks off in the simulator, adjust these `left` values to re-center.

- [ ] **Step 3: Verify first transfer station has no rail above it**

The first `metro-transfer` is the first child inside `metro-line`. Its `.metro-rail` segment should start from the transfer node center, not from the top of the container. If there's a colored line segment above the first transfer node, add:

```css
.metro-transfer:first-child .metro-rail-transfer {
  top: 50%;
}
```

This clips the rail to start from the node center downward.

- [ ] **Step 4: Verify read state styling**

Open a chapter (to mark it as read), go back to timeline. The read station should show:
- Dot at opacity 0.4
- ID text in muted gray
- Name text in muted gray

If the `!important` on `.station-id` color override doesn't work (because inline `style=` has higher priority), switch to opacity approach:

```css
.metro-station.read .station-id {
  opacity: 0.4;
}
```

- [ ] **Step 5: Commit any fixes**

```bash
git add miniprogram/pages/timeline/timeline.wxss miniprogram/pages/timeline/timeline.wxml
git commit -m "fix(timeline): polish metro alignment and read-state styling"
```

---

### Task 5: Clean up JS — remove dead data keys from `setData`

**Files:**
- Modify: `miniprogram/pages/timeline/timeline.js`

- [ ] **Step 1: Remove unused `data` keys from initial `data:{}` (lines 107–129)**

Remove these keys from the initial `data` object since they're no longer used in the template:
- No changes needed to the data object itself — unused keys in setData are harmless, but for cleanliness, ensure `t_locUnit` is not set.

In the `setData()` call inside `_buildPageData()`, find and delete the line:

```javascript
      t_locUnit: locale === 'zh' ? '行' : 'LOC',
```

Also delete the `t_checkpointToggleShow` and `t_checkpointToggleHide` lines if they were only used in the now-removed inline checkpoint template (check WXML — they're no longer referenced):

```javascript
      t_checkpointToggleShow: locale === 'zh' ? '查看重建目标' : locale === 'ja' ? '再構築目標を見る' : 'View rebuild target',
      t_checkpointToggleHide: locale === 'zh' ? '收起' : locale === 'ja' ? '閉じる' : 'Hide',
```

Check: `t_checkpointToggleShow` is still used in the checkpoint cards section (line 102 of wxml: `{{t_checkpointToggleShow}}`). **Keep it.** Only remove `t_locUnit` and `t_checkpointToggleHide` (check wxml for `t_checkpointToggleHide` — it's not referenced in the current template, so remove it).

- [ ] **Step 2: Verify the page loads without errors**

Open the timeline page in WeChat DevTools. Console should show no warnings about undefined data bindings. All stations and transfers should render.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/pages/timeline/timeline.js
git commit -m "chore(timeline): remove dead i18n keys from setData"
```

---

### Task 6: Final verification

- [ ] **Step 1: Full scroll test**

Scroll from top to bottom through the entire timeline. Verify:
- Rail is one continuous line with no gaps
- Color changes at each transfer station (green → blue → purple → pink)
- All 19 stations + 4 transfer nodes render
- End-of-line dot appears after s19
- Transfer stations are visually larger and have breathing room

- [ ] **Step 2: Interaction test**

- Tap any regular station → navigates to chapter detail page
- Tap any transfer station → toggles checkpoint card expansion in the section above
- Go to a chapter, come back → that station shows muted (read) styling
- Switch language (zh/en/ja) → all station titles and transfer labels update

- [ ] **Step 3: Squash commit (optional)**

If all looks good and you want a single clean commit:

```bash
git log --oneline -6
```

Verify the 4-5 commits from this plan are the latest. If preferred, leave as separate commits for easier review.
