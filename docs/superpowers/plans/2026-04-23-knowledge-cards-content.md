---
title: Knowledge Cards Content — Stages s07–s19 + bp01–bp07
date: 2026-04-23
status: pending
file: miniprogram/subpkg-chapters/data/knowledge-cards.js
---

# Knowledge Cards Content Plan

## Overview

Fill in placeholder knowledge cards for the 19 remaining stages (s07–s19, bp01–bp07).  
Current state: each placeholder stage has exactly 1 card reading "即将推出 / Coming Soon".  
Target state: ~76 new cards, 3–5 per stage, replacing all placeholders.

**Approach**: 4 independent subagent tasks by region. Each task edits `knowledge-cards.js` directly, replacing the placeholder `[]` arrays (or single-item placeholder arrays) for its assigned stages.

Card structure (must match exactly):
```js
{
  id: 'kc_sXX_NNN',           // stage id + zero-padded sequence
  title: { zh: '...', en: '...', ja: '...' },
  icon: '🔄',
  content: { zh: '...', en: '...', ja: '...' },
  code_example: 'python pseudocode string',
  key_point: { zh: '...', en: '...', ja: '...' }
}
```

Quality bar (match existing CORE cards):
- `content`: 2–3 sentences, technical but conversational, 三语
- `code_example`: Python pseudocode, 3–8 lines, shows the concept in action
- `key_point`: single memorable sentence, 三语
- `icon`: one emoji representing the concept
- Card count: 3–5 per stage based on knowledge density

Deferred: visual polish, card ordering UI, swipe animations — out of scope for this plan.

---

## Task 1: Hardening Region (s07–s11)

**Target stages**: s07, s08, s09, s10, s11  
**Estimated cards**: 21

### s07: Permission System — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s07_001 | 权限管道四步流程 | 🚦 | deny → mode → allow → ask pipeline |
| 2 | kc_s07_002 | 三种权限模式 | 🔑 | default / plan / auto modes |
| 3 | kc_s07_003 | Bash 命令安全检查 | 🛡️ | bash-specific security validation layer |
| 4 | kc_s07_004 | 权限规则数据结构 | 📋 | PermissionRule: tool + pattern + action |

### s08: Hook System — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s08_001 | Hook 是预留插口 | 🔌 | hooks as extension points, not if/else |
| 2 | kc_s08_002 | 三个核心事件 | 📡 | SessionStart / PreToolUse / PostToolUse |
| 3 | kc_s08_003 | 退出码约定 0/1/2 | 🔢 | exit code convention: success/warn/block |
| 4 | kc_s08_004 | Hook 接入主循环 | 🔄 | integrating hook results into the main loop |

### s09: Memory System — 5 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s09_001 | Memory 只存跨会话价值 | 🧠 | what deserves persistent storage |
| 2 | kc_s09_002 | 四类 Memory | 📂 | user / feedback / project / reference |
| 3 | kc_s09_003 | Memory 文件结构 | 📄 | frontmatter + content + index |
| 4 | kc_s09_004 | 不该存入 Memory 的东西 | ⚠️ | anti-patterns: one-time context, secrets |
| 5 | kc_s09_005 | Memory 与其他系统的边界 | 🗂️ | memory vs task/plan/CLAUDE.md boundary |

### s10: System Prompt Construction — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s10_001 | Prompt 是组装流水线 | 🏭 | assembly pipeline, not one big string |
| 2 | kc_s10_002 | 六段组装结构 | 🧩 | core + tools + skills + memory + claude_md + dynamic |
| 3 | kc_s10_003 | 稳定说明 vs 动态提醒 | ⚖️ | prompt vs reminder distinction |
| 4 | kc_s10_004 | CLAUDE.md 分层叠加 | 🗂️ | layered instruction loading (global → project → local) |

### s11: Error Recovery — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s11_001 | 三类错误三条恢复路径 | 🔧 | truncation / context / transport errors |
| 2 | kc_s11_002 | 续写提示的关键 | ✍️ | continuation message design |
| 3 | kc_s11_003 | 上下文压缩恢复 | 📦 | compact and retry pattern |
| 4 | kc_s11_004 | 退避重试与预算 | ⏱️ | backoff + retry budget |

---

## Task 2: Runtime Region (s12–s14)

**Target stages**: s12, s13, s14  
**Estimated cards**: 11

### s12: Task System — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s12_001 | 从 Todo 到 Task | 📋 | todo vs task: dependency + persistence |
| 2 | kc_s12_002 | TaskRecord 核心结构 | 🏗️ | id / subject / status / blockedBy / blocks / owner |
| 3 | kc_s12_003 | is_ready() 就绪判断 | ✅ | ready = pending + no active blockers |
| 4 | kc_s12_004 | 完成自动解锁后续 | 🔓 | cascading unblock on task completion |

### s13: Background Tasks — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s13_001 | 主循环只有一条 | 🔂 | single main loop, parallelism = waiting |
| 2 | kc_s13_002 | background_run 立即返回 | 🚀 | non-blocking dispatch returns task_id |
| 3 | kc_s13_003 | 通知队列模式 | 📬 | summary notification vs full output |
| 4 | kc_s13_004 | 排空通知再调模型 | 🧹 | drain notifications before model call |

### s14: Cron Scheduler — 3 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s14_001 | 调度 = 记住何时开始 | 🕐 | schedule vs background task distinction |
| 2 | kc_s14_002 | Cron 表达式与记录 | 📅 | 5-field cron + ScheduleRecord structure |
| 3 | kc_s14_003 | 定时通知回主循环 | 🔁 | scheduled prompt injected into main loop |

---

## Task 3: Platform Region (s15–s19)

**Target stages**: s15, s16, s17, s18, s19  
**Estimated cards**: 19

### s15: Agent Teams — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s15_001 | Teammate vs Subagent | 👥 | persistent teammate vs one-shot subagent |
| 2 | kc_s15_002 | 团队三要素 | 🏛️ | roster + inbox + independent loop |
| 3 | kc_s15_003 | TeamConfig 与消息信封 | 📨 | team config + MessageEnvelope structure |
| 4 | kc_s15_004 | 邮箱驱动工作分配 | 📥 | inbox-driven work assignment |

### s16: Team Protocols — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s16_001 | 结构化协议设计 | 🤝 | request_id + state machine |
| 2 | kc_s16_002 | 优雅关机协议 | 🛑 | shutdown request / response pattern |
| 3 | kc_s16_003 | 计划审批协议 | 📝 | plan approval flow |
| 4 | kc_s16_004 | 普通消息 vs 协议消息 | 💬 | plain message vs protocol envelope |

### s17: Autonomous Agents — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s17_001 | WORK↔IDLE 双阶段循环 | 🔄 | work-idle cycle |
| 2 | kc_s17_002 | 空闲时先邮箱再任务板 | 📋 | inbox-first scan during idle phase |
| 3 | kc_s17_003 | 安全认领任务 | 🔒 | atomic claim with role + status check |
| 4 | kc_s17_004 | 身份重注入 | 🪪 | identity re-injection after context compaction |

### s18: Worktree Isolation — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s18_001 | Task 管做什么 Worktree 管在哪做 | 🗂️ | task vs worktree responsibility split |
| 2 | kc_s18_002 | WorktreeRecord 与任务绑定 | 🔗 | worktree-task binding structure |
| 3 | kc_s18_003 | 隔离执行 cwd 切换 | 📁 | isolated execution via cwd switching |
| 4 | kc_s18_004 | Closeout: keep 或 remove | 🧹 | explicit closeout decision at task end |

### s19: MCP & Plugin — 4 cards (was 3 in brief, adding namespacing)

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_s19_001 | MCP 是外部工具统一协议 | 🔌 | MCP as universal external tool protocol |
| 2 | kc_s19_002 | 工具名前缀规则 | 🏷️ | mcp__server__tool namespacing |
| 3 | kc_s19_003 | Plugin manifest 发现服务器 | 🗺️ | plugin discovery via manifest |
| 4 | kc_s19_004 | 统一权限管道路由 | 🛡️ | local tools and MCP share the same permission pipeline |

---

## Task 4: Best Practice Region (bp01–bp07)

**Target stages**: bp01, bp02, bp03, bp04, bp05, bp06, bp07  
**Estimated cards**: 25

### bp01: CLAUDE.md & Memory — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp01_001 | 最高性价比的质量提升手段 | 📝 | writing good CLAUDE.md is the highest-leverage quality tool |
| 2 | kc_bp01_002 | 两种加载机制 | 📂 | ancestor eager-load vs descendant lazy-load |
| 3 | kc_bp01_003 | Monorepo 中的分层指令 | 🗂️ | layered instructions in monorepo projects |
| 4 | kc_bp01_004 | CLAUDE.local.md 存个人偏好 | 🙍 | local vs shared instructions |

### bp02: Commands — 3 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp02_001 | Command = frontmatter + 正文 | 📄 | command file structure |
| 2 | kc_bp02_002 | 13 个关键 frontmatter 字段 | 🔧 | name / description / allowed-tools / model etc. |
| 3 | kc_bp02_003 | 69 个内置命令分 8 类 | 📚 | Auth/Config/Context/Debug/Edit/File/Git/Workflow |

### bp03: Skills — 3 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp03_001 | Skill vs Command | 🧠 | auto-discoverable knowledge package |
| 2 | kc_bp03_002 | description 决定触发时机 | 🎯 | description field drives when skill activates |
| 3 | kc_bp03_003 | 5 个官方捆绑技能 | 🎁 | simplify / batch / debug / loop / claude-api |

### bp04: Hooks — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp04_001 | 四种 Hook 类型 | 🔌 | command / prompt / agent / http |
| 2 | kc_bp04_002 | 三种事件频率 | ⏱️ | per-session / per-turn / per-tool-call |
| 3 | kc_bp04_003 | 退出码语义 | 🔢 | 0=success, 2=block, other=warn |
| 4 | kc_bp04_004 | Matcher 配置格式 | ⚙️ | settings.json hook configuration with matchers |

### bp05: Subagents — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp05_001 | 子代理 = 专用 AI 代理 | 🤖 | specialized agent with own tools/model/permissions |
| 2 | kc_bp05_002 | 16 个 frontmatter 字段 | 📋 | key: tools / model / permissionMode / isolation |
| 3 | kc_bp05_003 | 5 个内置代理类型 | 🗂️ | general-purpose / Explore / Plan / statusline / guide |
| 4 | kc_bp05_004 | Command→Agent→Skill 编排 | 🏗️ | orchestration architecture pattern |

### bp06: MCP & Tools — 3 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp06_001 | 推荐日常 MCP 服务器 | 🛠️ | Context7 / Playwright / Chrome / DeepWiki / Excalidraw |
| 2 | kc_bp06_002 | .mcp.json 配置 stdio vs http | ⚙️ | transport types and configuration format |
| 3 | kc_bp06_003 | Settings MCP 审批控制 | 🛡️ | enable/disable per-server approval |

### bp07: Settings & Workflows — 4 cards

| # | id | title (zh) | icon | Concept |
|---|-----|-----------|------|---------|
| 1 | kc_bp07_001 | 五层设置优先级 | 🏔️ | managed → CLI → local → project → user |
| 2 | kc_bp07_002 | 六种权限模式 | 🔑 | default / acceptEdits / dontAsk / bypassPermissions / auto / plan |
| 3 | kc_bp07_003 | 工具权限语法 | 📝 | Bash(pattern) / Read(path) / Edit(path) / MCP |
| 4 | kc_bp07_004 | CLI 启动标志 | 🚀 | --agent / --model / --permission-mode etc. |

---

## Execution Notes

- **One subagent per task** — 4 total, regions are independent (no shared state)
- **Edit strategy**: each subagent locates the placeholder array for its stage (search for `'s07'`, `'bp01'`, etc.) and replaces the single-item placeholder with the full card array
- **id format**: `kc_sXX_NNN` for numbered stages, `kc_bpXX_NNN` for best-practice stages
- **code_example**: Python pseudocode only — no real imports, dataclasses shown as plain dicts or classes
- **BP chapters**: code_example should show conceptual config structures (e.g., settings.json as a Python dict, CLAUDE.md content as a string) rather than runtime logic
- **Language order in objects**: always `zh` first, then `en`, then `ja`
- **No speculative fields**: do not add fields not present in the existing card structure

### Size estimate

| Region | Stages | New cards | Approx size |
|--------|--------|-----------|-------------|
| Hardening (s07–s11) | 5 | 21 | ~40 KB |
| Runtime (s12–s14) | 3 | 11 | ~21 KB |
| Platform (s15–s19) | 5 | 19 | ~36 KB |
| Best Practice (bp01–bp07) | 7 | 25 | ~47 KB |
| **Total** | **20** | **76** | **~144 KB** |

Current file: ~56 KB → estimated final: ~200 KB (well within 2 MB subpackage limit).
