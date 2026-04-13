# Timeline Metro Redesign

## Problem

Timeline page's chapter path display has poor visual quality:
- Left colored lines are fragmented (each card draws its own short segment with gaps between)
- Layer divider dots misaligned with timeline line
- All cards same size/spacing — no visual rhythm, feels like a flat list rather than a journey path
- Inline checkpoint bars disconnected from the path line

## Solution

Redesign the "Chapter Timeline" section as a **metro/subway line map**:
- One continuous thick line running top to bottom
- Small station dots on the line for each chapter
- Larger transfer-station nodes at layer boundaries
- Line color changes at each layer transition
- Minimal text per station (ID + title only)

## Design Details

### Overall Layout

The timeline section becomes a single continuous vertical metro line. Only the "Chapter Timeline" (`section-last`) area changes. All other sections (header, usage guide, bridge docs, checkpoint cards) remain untouched.

### Metro Rail (Continuous Line)

- Width: 6rpx
- Continuous from first transfer station to end-of-line marker
- Color follows current architecture layer
- Each station row and transfer row contains its own rail segment; segments stack seamlessly with zero gap to form one visual line
- Rail is positioned at left: 48rpx (center of rail)

### Regular Stations (Chapters)

Each chapter is one row:

```
  ┃    ○   s01  启动骨架
  ┃    ↑    ↑    ↑
  ┃    │    │    └── Title (text-primary, font-sm 26rpx)
  ┃    │    └── Chapter ID (layer color, monospace, font-xs 22rpx, fixed ~60rpx width)
  ┃    └── Solid circle (16rpx diameter, layer color fill)
```

- Row height: 80rpx, circle vertically centered
- Circle center aligns with rail center (left 48rpx)
- ID and title separated by 16rpx gap
- Entire row is tappable (`bindtap="goToChapter"`)
- Hover feedback: `hover-class="station-hover"` — subtle bg-muted glow, 150ms

**Read state:**

| State | Dot | ID | Title |
|-------|-----|----|-------|
| Unread | solid, layer color, opacity 1 | layer color | text-primary |
| Read | solid, layer color, opacity 0.4 | text-muted | text-muted |

### Transfer Stations (Layer Boundaries)

Placed at the start of each architecture layer (core, hardening, runtime, platform):

- **Node**: 32rpx outer ring (4rpx stroke, layer color), inner fill = background color, 6rpx center dot (layer color)
- **Label**: Layer name in layer color, bold, font-sm (26rpx)
- **Range**: Version range "s01 → s06" in text-muted, font-xs (22rpx)
- Row height: 120rpx, with 20rpx extra spacing above and below for "breathing room"
- Node center aligns with rail center

**Color transition**: Line color changes sharply at each transfer station. The rail segment above the transfer is the previous layer's color; from the transfer node downward it's the new layer's color.

**First transfer** (Core): No rail segment above it — the metro line starts here.

### End-of-Line Marker

After the last station (s19), a small solid dot (8rpx, layer color, opacity 0.5) caps the line.

### Interaction

- `goToChapter(id)`: unchanged, navigates to chapter detail
- Transfer station tap: scrolls to checkpoint cards section and toggles that layer's checkpoint (reuses `toggleCheckpoint`)
- Inline checkpoint bars: **removed** from the timeline. Checkpoint info lives only in the dedicated checkpoint cards section above.

### Removed Elements

These are stripped from the timeline (still available in chapter detail page):
- `subtitle` (chapter subtitle)
- `keyInsight` (chapter key insight)
- `chapter-meta` (LOC count, layer dot)
- `inline-checkpoint` bars

## Files Changed

| File | Change |
|------|--------|
| `timeline.wxml` | Rewrite timeline block: replace `timeline-item`/`timeline-card` with `metro-line`/`metro-station`/`metro-transfer` |
| `timeline.wxss` | Delete old timeline-item/timeline-card/inline-checkpoint styles; add metro-line/metro-station/metro-transfer/metro-end styles |
| `timeline.js` | Simplify `timelineItems` data (drop subtitle/keyInsight/loc from items); add `rangeText` to layer-start items; add `lastLayerColor` for end marker |

## WXML Structure

```xml
<view class="section section-last">
  <text class="section-title">{{t_timelineSectionTitle}}</text>
  
  <view class="metro-line">
    <block wx:for="{{timelineItems}}" wx:key="id">
      
      <!-- Transfer station (layer start) -->
      <view wx:if="{{item.isLayerStart}}" class="metro-transfer"
            bindtap="toggleCheckpoint" data-layer="{{item.layer}}">
        <view class="metro-rail" style="background:{{item.layerColor}}"></view>
        <view class="transfer-node" style="border-color:{{item.layerColor}}">
          <view class="transfer-dot" style="background:{{item.layerColor}}"></view>
        </view>
        <text class="transfer-label" style="color:{{item.layerColor}}">{{item.layerLabel}}</text>
        <text class="transfer-range">{{item.rangeText}}</text>
      </view>

      <!-- Regular station -->
      <view class="metro-station {{item.isRead ? 'read' : ''}}" 
            bindtap="goToChapter" data-id="{{item.id}}"
            hover-class="station-hover">
        <view class="metro-rail" style="background:{{item.layerColor}}"></view>
        <view class="station-dot" style="background:{{item.layerColor}}"></view>
        <text class="station-id" style="color:{{item.layerColor}}">{{item.id}}</text>
        <text class="station-name">{{item.title}}</text>
      </view>

    </block>
    
    <!-- End of line -->
    <view class="metro-end" style="background:{{lastLayerColor}}"></view>
  </view>
</view>
```

## CSS Key Dimensions

```
metro-line container: padding-left 0, position relative
metro-rail: absolute, left 45rpx, width 6rpx, top 0, bottom 0
station row: height 80rpx, padding-left 80rpx (text starts after rail+dot area)
station-dot: 16rpx, absolute, left 40rpx (center = 48rpx)
transfer row: height 120rpx, margin-top/bottom 20rpx
transfer-node: 32rpx, absolute, left 32rpx (center = 48rpx)
metro-end: 8rpx circle, left 44rpx
```

## Layer Colors (unchanged)

| Layer | Color |
|-------|-------|
| core | #34D399 |
| hardening | #60A5FA |
| runtime | #A78BFA |
| platform | #F472B6 |
