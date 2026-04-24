
# 游戏化交互增强 — 设计文档

V2 Phase 2：在现有答题系统基础上增加 Combo 连击系统、丰富答题反馈动画、结算页增强动画。采用 WXS 响应式动画方案。

## 背景

V2 Phase 1 已完成明亮主题、学习卡片系统和 L1-L3 动画系统。Quiz regeneration 已将 480 道高质量三语题目部署到位。当前答题体验的主要不足：

1. **反馈单一**：答对/答错仅有颜色变化 + 震动，缺乏视觉冲击力
2. **无连击激励**：连续答对没有任何反馈，缺乏紧张感和成就感
3. **结算页平淡**：fadeIn/slideIn 动画缺乏游戏感，星星弹出、EXP 展示都很简单

## 范围

### 包含

- Combo 连击系统（数据层 + UI + WXS 弹簧动画）
- 答题反馈动画增强（正确 glow + 飘浮得分；错误 shake + combo break）
- 结算页动画增强（星星旋转弹入、数字滚动、EXP 乘数弹入、卡片翻转）

### 不包含

- 新题型（填空、排序、判断）— 属于后续 Phase
- Canvas 2D 粒子效果 — 属于 Phase 3
- 限时答题/速度加分 — 未选中
- 音效资源制作 — 复用现有音效或后续补充

## 技术方案：WXS 响应式动画

### 为什么选 WXS 而非纯 CSS

- WXS 可实现弹簧物理（spring damping）、数字计数滚动等帧级动画
- WXS 通过 `ownerInstance.selectComponent().setStyle()` 直接操作 DOM，绕过 setData，60fps 流畅
- 基础库 3.15.2 完全支持 `ownerInstance.requestAnimationFrame`
- 纯 CSS 无法实现数字滚动、弹簧过冲等动态效果

### WXS 技术约束

- WXS 不能调用 `wx.xxx` API，只能操作样式
- WXS 通过 observer 绑定：`change:prop="{{anim.onXxx}}"` 响应 prop 变化
- 弹簧函数在 WXS 内部用 `ownerInstance.requestAnimationFrame` 循环实现
- WXS 需要基础库 >= 2.12.0（当前 3.15.2，满足）

---

## Section 1：Combo 连击系统

### 数据层（game-engine.js）

`createSession()` 新增字段：

```
session.combo = 0
session.maxCombo = 0
```

`submitAnswer()` 逻辑变更：
- Phase 1 答对：`session.combo++`，更新 `session.maxCombo = Math.max(session.maxCombo, session.combo)`
- Phase 1 答错：`session.combo = 0`
- Phase 3（确认阶段）：不影响 combo

返回值扩展：`{ correct, answer, explanation, combo, maxCombo }`

### EXP 加成规则

`getSessionResult()` 中计算 combo 加成：

| Combo 范围 | 加成倍率 |
|-----------|---------|
| 0-2 | ×1.0（无加成） |
| 3-4 | ×1.2 |
| 5-7 | ×1.5 |
| 8+ | ×2.0 |

加成应用于 `expReward`，不影响星星评定（星星仍基于正确率 ratio）。

`getSessionResult()` 返回值新增 `maxCombo` 和 `comboMultiplier` 字段。

### UI（chapter.wxml）

答题区 header 右侧新增 combo 指示器，当 `comboCount >= 2` 时显示：

```
┌─────────────────────────────┐
│  QUIZ  3/18         ×3 🔥  │
│  ════════════════           │
```

HTML 结构：
```xml
<view class="combo-indicator" wx:if="{{comboCount >= 2}}"
      change:comboVal="{{anim.onComboUpdate}}" comboVal="{{comboAnimTrigger}}">
  <text class="combo-number">×{{comboCount}}</text>
  <text class="combo-fire">🔥</text>
</view>
```

### WXS 动画（quiz-anim.wxs）

`onComboUpdate(newVal, oldVal, ownerInstance)`：
- combo 增加时：数字从 scale(1.8) 弹簧回弹到 scale(1.0)，过冲系数 0.3，持续 400ms
- combo 断裂时（由 `onComboBreak` 处理）：数字 translateY(0→60rpx) + opacity(1→0)，300ms

弹簧函数参数：`stiffness=180, damping=12, mass=1`

---

## Section 2：丰富答题反馈动画

### 答对反馈（3 层效果叠加）

**层 1 — 选项卡片效果（CSS + WXS）：**
- 选中选项：边框 glow 扩散（box-shadow 从 0 到 `0 0 20rpx rgba(16,185,129,0.4)`），背景渐变为浅绿 `#ECFDF5`
- Checkmark 图标从 scale(0) 弹性弹出（CSS keyframe `correctPop`）
- 其余选项：opacity 降到 0.4，scale(0.97)，transition 300ms

**层 2 — Combo 指示器弹跳：**
- 见 Section 1 的 WXS 弹簧动画

**层 3 — 飘浮得分文字（WXS）：**
- 从选项区域向上飘浮 "+1" 文字
- combo >= 3 时显示加成信息（如 "+1 ×1.2"）
- WXS 驱动：translateY(0→-120rpx) + opacity(1→0)，持续 800ms，ease-out 缓动
- WXML 中新增一个 absolute 定位的 text 元素，WXS 控制其 transform 和 opacity

`onFeedbackShow(newVal, oldVal, ownerInstance)` 触发条件：`feedbackAnimTrigger` prop 变化时。

### 答错反馈（2 层效果）

**层 1 — 选项卡片抖动（CSS）：**
- 选中选项：CSS `@keyframes shake`（translateX: 0→-6rpx→6rpx→-6rpx→0，150ms，共 3 次 = 450ms）
- 边框和背景脉冲红色 `#FEE2E2`
- 正确答案选项同时高亮绿色边框（让用户看到正确答案位置）

**层 2 — Combo 断裂效果（WXS）：**
- 仅当之前 combo >= 2 时触发
- combo 指示器 WXS 下落 + 淡出：translateY(0→80rpx) + opacity(1→0)，300ms
- 短暂显示 "COMBO BREAK" 文字（红色，scale 从 1.2 到 1.0 + opacity 从 1 到 0），持续 1000ms
- chapter.js 中 `comboBreakShow` data 字段控制显隐

`onComboBreak(newVal, oldVal, ownerInstance)` 触发条件：`comboBreakTrigger` prop 变化时。

---

## Section 3：结算页增强动画

保留现有 `animStep` 分阶段 setTimeout 触发机制。每个阶段增设 WXS 触发 prop。

### 阶段 1 — 标题入场（animStep 1）

- 增强：标题从上方 slide-down + scale(1.1→1.0) + blur(8rpx→0)
- 实现：CSS `@keyframes settleHeaderIn`，纯 CSS 足够

### 阶段 2-4 — 星星弹出（animStep 3/4/5）

- 增强：WXS 弹簧物理动画
- 效果：星星从 scale(0) + rotate(-180deg) 旋转弹入，弹簧过冲到 scale(1.4) 再回弹到 scale(1.0)
- 获得的星星：金色 glow 扩散（box-shadow `0 0 16rpx rgba(234,179,8,0.5)`）
- 未获得的星星：灰色 scale 弹入，无 glow
- 间隔 250ms（当前 200ms）

`onStarReveal(newVal, oldVal, ownerInstance)` — 接收星星索引和是否点亮，驱动弹簧旋转动画。

### 阶段 5 — 分数展示（animStep 6）

- 增强：WXS 数字滚动
- 效果：正确数从 0 计数到最终值，总数从 0 计数到最终值，百分比同步滚动。持续 600ms，ease-out 缓动。
- 视觉效果类似老虎机停止

`onScoreReveal(newVal, oldVal, ownerInstance)` — 接收 `{ correct, total, ratio }`，驱动三个数字同步滚动。

### 阶段 6 — EXP 增长（animStep 7）

- 增强：EXP 数字从 0 滚动到最终值（WXS），持续 500ms
- 如果有 combo 加成（multiplier > 1.0）：先显示基础 EXP 值，然后 "×1.5" 乘数标签从右侧 slideIn，最终数字闪烁放大一下（scale 1.0→1.15→1.0）

`onExpReveal(newVal, oldVal, ownerInstance)` — 接收 `{ baseExp, multiplier, finalExp }`，驱动滚动 + 乘数弹入。

### 阶段 7.5 — Combo 统计（新增，animStep 8）

- 仅当 `maxCombo >= 3` 时显示
- 内容：`MAX COMBO ×8`，combo 数字用 regionColor 高亮
- slideIn 入场，与现有 `settle-anim-slidein` 类似

### 阶段 8+ — 升级/卡片（animStep 9/10+，原 animStep 8/9+）

- 升级通知：保留 pulse 效果，额外增加文字 text-shadow glow 闪烁
- 卡片揭示：CSS rotateY(180deg→0) 翻转效果，每张间隔 200ms

---

## Section 4：文件结构与影响范围

### 修改文件

| 文件 | 改动类型 | 说明 |
|------|---------|------|
| `miniprogram/utils/game-engine.js` | 修改 | combo/maxCombo 字段 + EXP 加成计算 |
| `subpkg-chapters/pages/chapter/chapter.js` | 修改 | combo 状态管理 + 动画触发 prop + combo break 检测 |
| `subpkg-chapters/pages/chapter/chapter.wxml` | 修改 | combo 指示器 + 飘浮得分 + WXS 绑定 + 结算 combo 统计行 |
| `subpkg-chapters/pages/chapter/chapter.wxss` | 修改 | glow/shake/flip keyframes + combo 样式 + 结算增强样式 |
| `subpkg-chapters/pages/chapter/quiz-anim.wxs` | **新增** | WXS 动画模块 |

### 不改动的文件

- `game-save.js` / `game-review.js` / `game-daily.js` / `game-cards.js`
- `game-stages.js` / `knowledge-cards.js`（数据结构不变）
- `sound.js`（API 已支持新 key）
- 所有非 chapter 页面

### 包大小预估

- `quiz-anim.wxs`：3-5KB（压缩后）
- 新增 CSS keyframes：~2KB
- subpkg-chapters 当前 3.0MB（2MB 限制内，数据文件是大头，代码增量可忽略）

### 兼容性

- WXS 响应式动画：基础库 >= 2.9.5 ✓
- `ownerInstance.requestAnimationFrame`：基础库 >= 2.12.0 ✓
- 当前项目基础库：3.15.2 ✓

### 音效

- combo 达到 3/5/8 时播放音效
- 优先复用现有 `star` 音效，后续可新增 `combo.ogg`
- combo break 无专用音效（错误音效 `wrong` 已覆盖）

---

## WXS 模块 API 设计

`quiz-anim.wxs` 导出函数签名：

```
module.exports = {
  // Combo 数字弹簧弹跳
  onComboUpdate: function(newVal, oldVal, ownerInstance, instance) {},

  // Combo 断裂下落+淡出 + "COMBO BREAK" 文字
  onComboBreak: function(newVal, oldVal, ownerInstance, instance) {},

  // 答对飘浮得分文字
  onFeedbackShow: function(newVal, oldVal, ownerInstance, instance) {},

  // 结算星星弹簧旋转弹入
  onStarReveal: function(newVal, oldVal, ownerInstance, instance) {},

  // 结算分数数字滚动
  onScoreReveal: function(newVal, oldVal, ownerInstance, instance) {},

  // 结算 EXP 滚动 + 乘数弹入
  onExpReveal: function(newVal, oldVal, ownerInstance, instance) {}
}
```

内部共享弹簧函数：

```
function spring(current, target, velocity, stiffness, damping, mass) {
  var force = -stiffness * (current - target);
  var dampingForce = -damping * velocity;
  var acceleration = (force + dampingForce) / mass;
  velocity += acceleration * (1/60);
  current += velocity * (1/60);
  return { current: current, velocity: velocity };
}
```

默认弹簧参数：`stiffness=180, damping=12, mass=1`

---

## animStep 时序表（结算页）

| animStep | 时间偏移 | 内容 | 动画技术 |
|----------|---------|------|---------|
| 1 | 100ms | 标题入场 | CSS blur + slide |
| 2 | 400ms | 星星区域显示 | CSS |
| 3 | 650ms | 第 1 颗星弹入 | WXS spring + rotate |
| 4 | 900ms | 第 2 颗星弹入 | WXS spring + rotate |
| 5 | 1150ms | 第 3 颗星弹入 | WXS spring + rotate |
| 6 | 1500ms | 分数数字滚动 | WXS counter |
| 7 | 1800ms | EXP 滚动 + 乘数 | WXS counter + slideIn |
| 8 | 2000ms | Combo 统计（如有） | CSS slideIn |
| 9 | 2200ms | 升级通知（如有） | CSS pulse + glow |
| 10+ | 2400ms+ | 卡片翻转揭示 | CSS rotateY |

---

## 设计决策记录

1. **WXS 而非纯 CSS**：用户选择了更丰富的弹簧物理和数字滚动效果，这些需要帧级控制
2. **combo 不影响星星**：星星基于正确率，combo 只影响 EXP，避免双重变量导致评分混乱
3. **保留 animStep 机制**：现有 setTimeout 链已验证可靠，WXS 作为每个阶段的"特效增强层"叠加上去
4. **单个 .wxs 文件**：所有动画函数集中管理，共享弹簧函数，避免多文件协调
