# V2 Phase 1a：明亮色彩系统改造 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将全局色彩系统从暗色终端主题（#0D1117）转为明亮清新教育风（#FFFFFF），为后续所有页面改造提供基础。

**Architecture:** 修改 app.wxss CSS 变量定义、app.json 导航栏/TabBar 配色、生成新的明亮版 TabBar 图标。所有页面通过 CSS 变量引用自动继承新色彩。

**Tech Stack:** WXSS CSS 变量、app.json 配置、Node.js 图标生成脚本

**Spec:** `docs/superpowers/specs/2026-04-22-v2-phase1-learn-flow-and-bright-ui-design.md` §3

---

### Task 1: 重写 app.wxss CSS 变量

**Files:**
- Modify: `miniprogram/app.wxss`

- [ ] **Step 1: 替换全部 CSS 变量定义**

将 `miniprogram/app.wxss` 的 `page {}` 选择器中的变量全部替换。原文件 100 行。

新内容（完整替换 `miniprogram/app.wxss`）：

```css
/* app.wxss — Bright Learning Theme */
page {
  /* Background & Surface */
  --color-bg: #FFFFFF;
  --color-bg-card: #F8FAFC;
  --color-bg-elevated: #FFFFFF;
  --color-bg-muted: #F1F5F9;

  /* Text hierarchy */
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;
  --color-text-muted: #94A3B8;
  --color-text-faint: #CBD5E1;

  /* Accent colors (bright palette) */
  --color-accent-green: #10B981;
  --color-accent-orange: #F59E0B;
  --color-accent-red: #EF4444;
  --color-accent-blue: #3B82F6;
  --color-accent-purple: #8B5CF6;
  --color-accent-gold: #F59E0B;
  --color-accent-pink: #F43F5E;

  /* Region colors */
  --color-region-core: #10B981;
  --color-region-tools: #3B82F6;
  --color-region-runtime: #8B5CF6;
  --color-region-network: #F43F5E;
  --color-region-practice: #F59E0B;

  /* Rarity colors */
  --color-rarity-n: #94A3B8;
  --color-rarity-r: #3B82F6;
  --color-rarity-sr: #8B5CF6;
  --color-rarity-ssr: #F59E0B;

  /* Borders */
  --color-border: #E2E8F0;
  --color-border-light: #F1F5F9;

  /* Semantic */
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;
  --color-info: #3B82F6;
  --color-exp: #8B5CF6;
  --color-streak: #F59E0B;

  /* Shadows (replacing dark borders) */
  --shadow-sm: 0 2rpx 8rpx rgba(0,0,0,0.04);
  --shadow-md: 0 4rpx 16rpx rgba(0,0,0,0.08);
  --shadow-lg: 0 8rpx 32rpx rgba(0,0,0,0.12);

  /* Radius */
  --radius-xs: 4rpx;
  --radius-sm: 8rpx;
  --radius-md: 16rpx;
  --radius-lg: 24rpx;
  --radius-xl: 32rpx;
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
  --font-mono: "SF Mono", Menlo, Consolas, monospace;
  --font-body: -apple-system, BlinkMacSystemFont, "SF Pro Display", "PingFang SC", sans-serif;

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
.text-green { color: var(--color-accent-green); }
.text-blue { color: var(--color-accent-blue); }
.text-orange { color: var(--color-accent-orange); }
.text-red { color: var(--color-accent-red); }
.text-purple { color: var(--color-accent-purple); }
.text-gold { color: var(--color-accent-gold); }

.font-mono { font-family: var(--font-mono); }

.region-core { color: var(--color-region-core); }
.region-tools { color: var(--color-region-tools); }
.region-runtime { color: var(--color-region-runtime); }
.region-network { color: var(--color-region-network); }
.region-practice { color: var(--color-region-practice); }
```

- [ ] **Step 2: 验证 CSS 变量命名向后兼容**

在项目中搜索所有引用旧变量名的地方，记录需要更新的文件：

```bash
cd miniprogram && grep -rn "color-terminal-" --include="*.wxss" --include="*.wxml" | grep -v "node_modules"
```

旧变量名 `--color-terminal-green/orange/red/blue/purple/gold` 改为 `--color-accent-*`。所有引用这些变量的 WXSS 文件需要在后续 Task（Plan 1c 页面明亮化）中更新。此处仅记录列表，不改页面文件。

- [ ] **Step 3: Commit**

```bash
git add miniprogram/app.wxss
git commit -m "feat(theme): replace dark terminal CSS vars with bright learning theme"
```

---

### Task 2: 更新 app.json 导航栏和 TabBar 配色

**Files:**
- Modify: `miniprogram/app.json`

- [ ] **Step 1: 修改 window 和 tabBar 配置**

将 `miniprogram/app.json` 中的以下部分修改：

**window 部分**（第 28-34 行）改为：
```json
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#FFFFFF",
    "navigationBarTitleText": "Claude Code 学习",
    "navigationBarTextStyle": "black",
    "backgroundColor": "#F1F5F9"
  },
```

**tabBar 部分**（第 35-38 行颜色改为）：
```json
  "tabBar": {
    "color": "#94A3B8",
    "selectedColor": "#1E293B",
    "backgroundColor": "#FFFFFF",
    "borderStyle": "white",
```

tabBar.list 的 text 标签保持中文不变（终端→首页、地图→地图、图鉴→图鉴、档案→档案），但将"终端"改为"首页"：

第 42 行 `"text": "终端"` 改为 `"text": "首页"`

- [ ] **Step 2: Commit**

```bash
git add miniprogram/app.json
git commit -m "feat(theme): update app.json navigation and tabBar to bright theme"
```

---

### Task 3: 生成明亮版 TabBar 图标

**Files:**
- Modify: `scripts/generate-icons.js`
- Output: `miniprogram/assets/icons/*.png`（8 个图标文件，构建产物）

- [ ] **Step 1: 查看现有图标生成脚本**

先读取 `scripts/generate-icons.js` 了解当前实现。图标是纯 Node.js（Canvas）生成的 PNG。

- [ ] **Step 2: 修改图标颜色参数**

在 `scripts/generate-icons.js` 中，将图标颜色从暗色终端风格改为明亮风格：

- 普通状态颜色：从暗灰色改为 `#94A3B8`（与 tabBar.color 一致）
- 选中状态颜色：从亮白色改为 `#1E293B`（与 tabBar.selectedColor 一致）
- 背景：透明（保持不变）

具体修改取决于脚本的当前实现。核心是改两个颜色常量。

- [ ] **Step 3: 运行图标生成脚本**

```bash
node scripts/generate-icons.js
```

验证输出：`miniprogram/assets/icons/` 下 8 个 PNG 文件应已更新。

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-icons.js miniprogram/assets/icons/
git commit -m "feat(theme): regenerate tabBar icons with bright color palette"
```

---

### Task 4: 更新 chapter.js 硬编码颜色

**Files:**
- Modify: `miniprogram/subpkg-chapters/pages/chapter/chapter.js`

- [ ] **Step 1: 替换 REGION_COLORS 常量**

在 `miniprogram/subpkg-chapters/pages/chapter/chapter.js` 第 21-27 行，将 `REGION_COLORS` 从暗色改为明亮色：

```js
var REGION_COLORS = {
  core: '#10B981',
  tools: '#3B82F6',
  runtime: '#8B5CF6',
  network: '#F43F5E',
  practice: '#F59E0B'
};
```

同时将第 134 行的 daily 模式硬编码颜色 `'#D29922'` 改为 `'#F59E0B'`。
将第 193 行的 review 模式硬编码颜色 `'#D29922'` 改为 `'#F59E0B'`。

- [ ] **Step 2: Commit**

```bash
git add miniprogram/subpkg-chapters/pages/chapter/chapter.js
git commit -m "feat(theme): update chapter.js hardcoded region colors to bright palette"
```

---

### Task 5: 更新其他 JS 文件中的硬编码颜色

**Files:**
- Search and modify: any JS file with hardcoded dark theme colors

- [ ] **Step 1: 搜索硬编码颜色**

```bash
cd miniprogram && grep -rn "#3FB950\|#58A6FF\|#BC8CFF\|#F85149\|#D29922\|#F0C040\|#0D1117\|#161B22\|#21262D\|#30363D\|#484F58\|#8B949E\|#E6EDF3" --include="*.js" --include="*.wxml" | grep -v "node_modules" | grep -v "data/"
```

对每个找到的硬编码颜色进行替换（data/ 目录下的构建产物不改）。常见映射：

| 旧色 | 新色 | 用途 |
|------|------|------|
| `#3FB950` | `#10B981` | core green |
| `#58A6FF` | `#3B82F6` | tools blue |
| `#BC8CFF` | `#8B5CF6` | runtime purple |
| `#F85149` | `#F43F5E` | network red/pink |
| `#D29922` | `#F59E0B` | practice/daily orange |
| `#F0C040` | `#F59E0B` | gold |
| `#0D1117` | `#FFFFFF` | background |
| `#161B22` | `#F8FAFC` | card bg |
| `#21262D` | `#FFFFFF` | elevated bg |
| `#30363D` | `#E2E8F0` | border |
| `#484F58` | `#94A3B8` | muted text |
| `#8B949E` | `#64748B` | secondary text |
| `#E6EDF3` | `#1E293B` | primary text |

注意：只改 pages/ 和 utils/ 下的 JS 文件，不改 data/ 下的构建产物。

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(theme): replace all hardcoded dark colors with bright palette in JS/WXML"
```

---

### Task 6: 验证色彩系统完整性

- [ ] **Step 1: 全局搜索验证无遗漏**

```bash
cd miniprogram && grep -rn "#0D1117\|#161B22\|#21262D\|#30363D" --include="*.js" --include="*.wxss" --include="*.wxml" --include="*.json" | grep -v "node_modules" | grep -v "data/"
```

期望结果：0 个匹配（data/ 目录除外）。如有遗漏，补充修改。

- [ ] **Step 2: 在微信开发者工具中启动项目**

打开微信开发者工具，加载 `miniprogram/` 目录。检查：
1. 导航栏为白色、文字为黑色
2. TabBar 为白色底、灰色图标、选中为深色
3. 页面背景为白色（内容可能暂时不匹配，页面 WXSS 在 Plan 1c 中更新）
4. 无 JS 报错

- [ ] **Step 3: Commit 最终验证修复（如有）**

```bash
git add -A
git commit -m "fix(theme): address remaining dark color references"
```
