#!/usr/bin/env node
/**
 * build-best-practice-data.js
 * 从 claude-code-best-practice 仓库提取内容，生成小程序数据文件
 *
 * 生成文件：
 *   miniprogram/data/bp-meta.js         — bp 章节元数据（合并进 meta.js 的增量）
 *   miniprogram/data/bp-config-examples.js — Code Tab 配置示例
 *   miniprogram/data/tips-index.js      — Tips 分类索引
 *   miniprogram/data/docs/chapter-bp*.js — 7×3=21 个 bp 章节文档
 *   miniprogram/data/docs/tips-*.js     — Tips 分类详情文档
 */

const fs = require('fs');
const path = require('path');

// ──────────────────────────────────────────────
// 路径配置
// ──────────────────────────────────────────────
const BP_REPO = '/Users/bill_huang/claude-code-best-practice';
const OUT_DIR = path.resolve(__dirname, '../miniprogram/data');
const DOCS_DIR = path.join(OUT_DIR, 'docs');
const META_FILE = path.join(OUT_DIR, 'meta.js');
const I18N_DIR = path.resolve(__dirname, '../miniprogram/i18n');

// 验证源仓库存在
if (!fs.existsSync(BP_REPO)) {
  console.error('ERROR: claude-code-best-practice 仓库不存在: ' + BP_REPO);
  console.error('请先运行: git clone https://github.com/shanraisshan/claude-code-best-practice.git /Users/bill_huang/claude-code-best-practice');
  process.exit(1);
}

// ──────────────────────────────────────────────
// bp 章节定义
// ──────────────────────────────────────────────
const BP_CHAPTERS = [
  {
    id: 'bp01',
    title: 'CLAUDE.md & Memory',
    slug: 'bp01-claude-md-and-memory',
    sources: ['best-practice/claude-memory.md'],
    configFields: 0,
    tipsCount: 0,
    relatedChapters: ['s09'],
    content: {
      zh: {
        subtitle: '项目记忆体系',
        coreAddition: 'CLAUDE.md 层级加载 + @path 导入',
        keyInsight: 'CLAUDE.md 是你与 Claude Code 的"团队约定"，写好它比任何提示词技巧都重要。'
      },
      en: {
        subtitle: 'Project Memory System',
        coreAddition: 'CLAUDE.md hierarchy loading + @path imports',
        keyInsight: 'CLAUDE.md is your "team agreement" with Claude Code — writing it well matters more than any prompting trick.'
      },
      ja: {
        subtitle: 'プロジェクトメモリシステム',
        coreAddition: 'CLAUDE.md 階層読み込み + @path インポート',
        keyInsight: 'CLAUDE.md は Claude Code との「チーム合意」です。上手に書くことが最も重要です。'
      }
    },
    guide: {
      zh: {
        focus: '理解 CLAUDE.md 的祖先加载（向上）和后代懒加载（向下）机制。',
        confusion: '不要把 CLAUDE.md 当成"提示词模板"，它是持久化的项目规则，不是每次对话的指令。',
        goal: '能为自己的项目写出结构清晰、团队共享的 CLAUDE.md。'
      },
      en: {
        focus: 'Understand ancestor loading (up) and descendant lazy loading (down) of CLAUDE.md.',
        confusion: 'Do not treat CLAUDE.md as a "prompt template" — it is persistent project rules, not per-conversation instructions.',
        goal: 'Write a well-structured, team-shared CLAUDE.md for your own project.'
      },
      ja: {
        focus: 'CLAUDE.md の祖先ロード（上向き）と子孫遅延ロード（下向き）の仕組みを理解する。',
        confusion: 'CLAUDE.md を「プロンプトテンプレート」と混同しない。永続的なプロジェクトルールです。',
        goal: '自分のプロジェクト用に構造化された CLAUDE.md を書けるようになる。'
      }
    }
  },
  {
    id: 'bp02',
    title: 'Commands',
    slug: 'bp02-commands',
    sources: ['best-practice/claude-commands.md', 'implementation/claude-commands-implementation.md'],
    configFields: 13,
    tipsCount: 0,
    relatedChapters: ['s05'],
    content: {
      zh: {
        subtitle: '斜杠命令实战',
        coreAddition: '13 个 frontmatter 字段 + 69 个内置命令',
        keyInsight: '斜杠命令是"内循环"工作流的固化——把你每天重复做的事变成一个命令。'
      },
      en: {
        subtitle: 'Slash Commands in Practice',
        coreAddition: '13 frontmatter fields + 69 built-in commands',
        keyInsight: 'Slash commands crystallize your "inner loop" workflows — turn what you repeat daily into a command.'
      },
      ja: {
        subtitle: 'スラッシュコマンド実践',
        coreAddition: '13 の frontmatter フィールド + 69 の組み込みコマンド',
        keyInsight: 'スラッシュコマンドは「内部ループ」ワークフローの固定化です。'
      }
    },
    guide: {
      zh: {
        focus: '掌握 frontmatter 的 13 个字段各自的作用，特别是 context:fork 和 allowed-tools。',
        confusion: '命令不只是"快捷输入"——通过 context:fork 和 model 字段，它可以调度独立的子代理。',
        goal: '为自己的项目创建至少 3 个自定义命令（如 /commit-push-pr、/review、/test）。'
      },
      en: {
        focus: 'Master all 13 frontmatter fields, especially context:fork and allowed-tools.',
        confusion: 'Commands are not just "shortcut input" — with context:fork and model fields, they can dispatch independent subagents.',
        goal: 'Create at least 3 custom commands for your own project (e.g., /commit-push-pr, /review, /test).'
      },
      ja: {
        focus: '13 の frontmatter フィールドを把握する。特に context:fork と allowed-tools。',
        confusion: 'コマンドは単なる「ショートカット入力」ではなく、独立したサブエージェントを起動できます。',
        goal: '自分のプロジェクト用にカスタムコマンドを最低3つ作成する。'
      }
    }
  },
  {
    id: 'bp03',
    title: 'Skills',
    slug: 'bp03-skills',
    sources: ['best-practice/claude-skills.md', 'implementation/claude-skills-implementation.md'],
    configFields: 13,
    tipsCount: 0,
    relatedChapters: ['s05'],
    content: {
      zh: {
        subtitle: '技能系统实战',
        coreAddition: '13 个 frontmatter 字段 + 5 个内置技能',
        keyInsight: 'Skill 是可复用的领域知识——让 Claude 在特定场景下自动变成"专家"。'
      },
      en: {
        subtitle: 'Skills System in Practice',
        coreAddition: '13 frontmatter fields + 5 built-in skills',
        keyInsight: 'A Skill is reusable domain knowledge — it turns Claude into an "expert" for specific scenarios automatically.'
      },
      ja: {
        subtitle: 'スキルシステム実践',
        coreAddition: '13 の frontmatter フィールド + 5 つの組み込みスキル',
        keyInsight: 'Skill は再利用可能なドメイン知識です。Claude を特定シナリオの「エキスパート」にします。'
      }
    },
    guide: {
      zh: {
        focus: '理解 Skills 和 Commands 的区别——Skills 是知识（被调用），Commands 是动作（用户触发）。',
        confusion: '不要把 Skill 写成完整的指令流程。Skill 提供知识和模板，Claude 自行决定如何运用。',
        goal: '能为自己的项目创建一个领域 Skill（如代码审查标准、部署检查清单）。'
      },
      en: {
        focus: 'Understand the difference between Skills and Commands — Skills are knowledge (invoked), Commands are actions (user-triggered).',
        confusion: 'Do not write a Skill as a complete instruction flow. Skills provide knowledge and templates; Claude decides how to use them.',
        goal: 'Create a domain Skill for your own project (e.g., code review standards, deployment checklist).'
      },
      ja: {
        focus: 'Skills と Commands の違いを理解する。Skills は知識、Commands はアクション。',
        confusion: 'Skill を完全な指示フローとして書かない。Skill は知識を提供し、Claude が活用方法を決めます。',
        goal: '自分のプロジェクト用にドメインスキルを1つ作成する。'
      }
    }
  },
  {
    id: 'bp04',
    title: 'Hooks',
    slug: 'bp04-hooks',
    sources: ['best-practice/claude-settings.md'],
    configFields: 0,
    tipsCount: 0,
    relatedChapters: ['s08'],
    content: {
      zh: {
        subtitle: '钩子与自动化',
        coreAddition: '生命周期钩子 + 自动化工作流',
        keyInsight: 'Hooks 让你在 Claude 的每个动作前后插入自定义逻辑——从音效提醒到自动代码检查。'
      },
      en: {
        subtitle: 'Hooks & Automation',
        coreAddition: 'Lifecycle hooks + automated workflows',
        keyInsight: 'Hooks let you insert custom logic before and after every Claude action — from sound alerts to automated code checks.'
      },
      ja: {
        subtitle: 'フック＆自動化',
        coreAddition: 'ライフサイクルフック + 自動化ワークフロー',
        keyInsight: 'Hooks により Claude の各アクションの前後にカスタムロジックを挿入できます。'
      }
    },
    guide: {
      zh: {
        focus: '理解 PreToolUse 和 PostToolUse 两个核心钩子的触发时机和参数。',
        confusion: '钩子不是"中间件"——它们是同步执行的，长时间运行的钩子会阻塞 Claude 的响应。',
        goal: '配置一个实用的 PostToolUse 钩子（如：写文件后自动格式化）。'
      },
      en: {
        focus: 'Understand the timing and parameters of PreToolUse and PostToolUse hooks.',
        confusion: 'Hooks are not "middleware" — they execute synchronously. Long-running hooks block Claude\'s response.',
        goal: 'Configure a practical PostToolUse hook (e.g., auto-format after file write).'
      },
      ja: {
        focus: 'PreToolUse と PostToolUse の発火タイミングとパラメータを理解する。',
        confusion: 'フックは「ミドルウェア」ではなく同期実行です。長時間実行のフックは応答をブロックします。',
        goal: '実用的な PostToolUse フックを設定する（例：ファイル書き込み後の自動フォーマット）。'
      }
    }
  },
  {
    id: 'bp05',
    title: 'Subagents',
    slug: 'bp05-subagents',
    sources: ['best-practice/claude-subagents.md', 'implementation/claude-subagents-implementation.md'],
    configFields: 16,
    tipsCount: 0,
    relatedChapters: ['s04', 's15', 's16'],
    content: {
      zh: {
        subtitle: '子代理编排',
        coreAddition: '16 个 frontmatter 字段 + 5 种官方类型 + Agent Teams',
        keyInsight: '子代理是"分身术"——让多个 Claude 各司其职，比一个 Claude 做所有事高效得多。'
      },
      en: {
        subtitle: 'Subagent Orchestration',
        coreAddition: '16 frontmatter fields + 5 official types + Agent Teams',
        keyInsight: 'Subagents are "clones" — having multiple Claudes each do one thing is far more efficient than one Claude doing everything.'
      },
      ja: {
        subtitle: 'サブエージェント編成',
        coreAddition: '16 の frontmatter フィールド + 5 種の公式タイプ + Agent Teams',
        keyInsight: 'サブエージェントは「分身」です。複数の Claude が分担する方が効率的です。'
      }
    },
    guide: {
      zh: {
        focus: '掌握 5 种官方子代理类型的适用场景：general-purpose / code-reviewer / code-simplifier 等。',
        confusion: '子代理之间不共享上下文——每个子代理从头开始，需要在 prompt 中提供完整背景。',
        goal: '设计一个包含 2-3 个专业子代理的工作流（如：研究→规划→实现）。'
      },
      en: {
        focus: 'Master the use cases for 5 official subagent types: general-purpose / code-reviewer / code-simplifier etc.',
        confusion: 'Subagents do not share context — each starts fresh. Provide complete background in the prompt.',
        goal: 'Design a workflow with 2-3 specialized subagents (e.g., research → plan → implement).'
      },
      ja: {
        focus: '5 種の公式サブエージェントタイプの使い分けを把握する。',
        confusion: 'サブエージェント間でコンテキストは共有されません。プロンプトに完全な背景を提供する必要があります。',
        goal: '2-3 の専門サブエージェントを含むワークフローを設計する。'
      }
    }
  },
  {
    id: 'bp06',
    title: 'MCP & Tools',
    slug: 'bp06-mcp-and-tools',
    sources: ['best-practice/claude-mcp.md'],
    configFields: 0,
    tipsCount: 0,
    relatedChapters: ['s19'],
    content: {
      zh: {
        subtitle: 'MCP 与工具集成',
        coreAddition: '5 个推荐 MCP + 配置模式',
        keyInsight: 'MCP 是 Claude Code 的"外接大脑"——让它能访问浏览器、数据库、第三方 API 等外部世界。'
      },
      en: {
        subtitle: 'MCP & Tool Integration',
        coreAddition: '5 recommended MCPs + configuration patterns',
        keyInsight: 'MCP is Claude Code\'s "external brain" — giving it access to browsers, databases, third-party APIs, and the outside world.'
      },
      ja: {
        subtitle: 'MCP＆ツール統合',
        coreAddition: '5 つの推奨 MCP + 設定パターン',
        keyInsight: 'MCP は Claude Code の「外部脳」です。ブラウザ、データベース、サードパーティ API へのアクセスを提供します。'
      }
    },
    guide: {
      zh: {
        focus: '理解 MCP 的配置方式（settings.json 中的 mcpServers 字段）和 5 个日常推荐 MCP。',
        confusion: 'MCP 不是"插件商店"——每个 MCP Server 需要独立配置和运行，注意安全风险。',
        goal: '为自己的开发环境配置至少 2 个 MCP（如 Context7 + Playwright）。'
      },
      en: {
        focus: 'Understand MCP configuration (mcpServers field in settings.json) and the 5 recommended daily-use MCPs.',
        confusion: 'MCP is not a "plugin store" — each MCP Server needs independent setup and has security implications.',
        goal: 'Configure at least 2 MCPs for your dev environment (e.g., Context7 + Playwright).'
      },
      ja: {
        focus: 'MCP の設定方法（settings.json の mcpServers フィールド）と推奨 MCP を理解する。',
        confusion: 'MCP は「プラグインストア」ではなく、各 MCP Server は個別に設定と運用が必要です。',
        goal: '自分の開発環境に最低 2 つの MCP を設定する。'
      }
    }
  },
  {
    id: 'bp07',
    title: 'Settings & Workflows',
    slug: 'bp07-settings-and-workflows',
    sources: ['best-practice/claude-settings.md', 'best-practice/claude-power-ups.md', 'best-practice/claude-cli-startup-flags.md'],
    configFields: 0,
    tipsCount: 0,
    relatedChapters: ['s07', 's10'],
    content: {
      zh: {
        subtitle: '配置与工作流',
        coreAddition: 'Settings.json 全字段 + Power-ups + CLI 参数',
        keyInsight: '真正的高效不是打字更快，而是让 Claude Code 的默认行为完全符合你的团队习惯。'
      },
      en: {
        subtitle: 'Settings & Workflows',
        coreAddition: 'Settings.json full fields + Power-ups + CLI flags',
        keyInsight: 'True efficiency is not typing faster — it is making Claude Code\'s defaults match your team\'s habits perfectly.'
      },
      ja: {
        subtitle: '設定＆ワークフロー',
        coreAddition: 'Settings.json 全フィールド + Power-ups + CLI フラグ',
        keyInsight: '本当の効率化はタイピングの速さではなく、Claude Code のデフォルト動作をチームの習慣に合わせることです。'
      }
    },
    guide: {
      zh: {
        focus: '了解 settings.json 的三级层次（全局 > 项目 > 本地）和关键配置项。',
        confusion: '不要把所有配置都放在全局——项目特定的规则放项目级，个人偏好放全局。',
        goal: '为自己的项目建立完整的 settings.json + CLAUDE.md + commands 三件套。'
      },
      en: {
        focus: 'Understand the three-tier hierarchy of settings.json (global > project > local) and key fields.',
        confusion: 'Do not put everything in global settings — project-specific rules go in project settings, personal preferences go in global.',
        goal: 'Set up a complete settings.json + CLAUDE.md + commands trio for your project.'
      },
      ja: {
        focus: 'settings.json の三層構造（グローバル > プロジェクト > ローカル）と重要なフィールドを理解する。',
        confusion: 'すべてをグローバル設定に入れない。プロジェクト固有のルールはプロジェクト設定に。',
        goal: '自分のプロジェクト用に settings.json + CLAUDE.md + commands の三点セットを整備する。'
      }
    }
  }
];

// ──────────────────────────────────────────────
// Tips 分类定义
// ──────────────────────────────────────────────
const TIPS_CATEGORIES = [
  { id: 'prompting',   label: { zh: '提示词技巧', en: 'Prompting', ja: 'プロンプト技巧' } },
  { id: 'planning',    label: { zh: '规划技巧',   en: 'Planning',  ja: '計画技巧' } },
  { id: 'claude-md',   label: { zh: 'CLAUDE.md',  en: 'CLAUDE.md', ja: 'CLAUDE.md' } },
  { id: 'agents',      label: { zh: '代理技巧',   en: 'Agents',    ja: 'エージェント技巧' } },
  { id: 'commands',    label: { zh: '命令技巧',   en: 'Commands',  ja: 'コマンド技巧' } },
  { id: 'skills',      label: { zh: '技能技巧',   en: 'Skills',    ja: 'スキル技巧' } },
  { id: 'hooks',       label: { zh: '钩子技巧',   en: 'Hooks',     ja: 'フック技巧' } },
  { id: 'workflows',   label: { zh: '工作流',     en: 'Workflows', ja: 'ワークフロー' } },
  { id: 'git-pr',      label: { zh: 'Git & PR',   en: 'Git & PR',  ja: 'Git & PR' } },
  { id: 'debugging',   label: { zh: '调试技巧',   en: 'Debugging', ja: 'デバッグ技巧' } },
  { id: 'utilities',   label: { zh: '实用工具',   en: 'Utilities', ja: 'ユーティリティ' } },
  { id: 'daily',       label: { zh: '日常习惯',   en: 'Daily Habits', ja: '日常習慣' } },
  { id: 'parallelism', label: { zh: '并行执行',   en: 'Parallelism',  ja: '並列実行' } },
];

// ──────────────────────────────────────────────
// 配置示例（Code Tab 内容）
// ──────────────────────────────────────────────
const CONFIG_EXAMPLES = {
  bp01: `# CLAUDE.md 示例结构
# ================================================

# 项目概述
This is a Next.js e-commerce application using
TypeScript, Prisma ORM, and Tailwind CSS.

# 构建命令
\`\`\`
npm run dev          # 启动开发服务器
npm run build        # 生产构建
npm run test         # 运行测试
npm run lint         # 代码检查
\`\`\`

# 代码规范
- 使用 TypeScript strict 模式
- 组件使用函数式写法 + hooks
- API 路由放在 app/api/ 下
- 数据库操作通过 Prisma Client

# 测试要求
- 新功能必须有单元测试
- API 端点需要集成测试
- 测试覆盖率不低于 80%

# Git 约定
- feat: / fix: / docs: / refactor: 前缀
- PR 标题不超过 70 字符
- 每个 PR 只解决一个问题

# ─── @path 导入示例 ───
# @docs/api-reference.md
# @.claude/rules/code-style.md`,

  bp02: `# .claude/commands/commit-push-pr.md
# ================================================
---
name: commit-push-pr
description: Stage, commit, push and open a PR
allowed-tools: Bash, Write
model: haiku
---

1. Run \`git status\` to see changes
2. Stage all relevant files
3. Write a conventional commit message
4. Push to remote branch
5. Open a PR with \`gh pr create\`

# ─── 带参数的命令 ───

# .claude/commands/review.md
---
name: review
description: Review code changes
argument-hint: [file-or-pr-url]
model: opus
context: fork
---

Review the code at \$ARGUMENTS for:
- Logic errors and edge cases
- Performance issues
- Security vulnerabilities
- Code style consistency

# ─── 不可用户调用的后台命令 ───

# .claude/commands/internal-lint.md
---
name: internal-lint
user-invocable: false
disable-model-invocation: true
allowed-tools: Bash
---

Run \`npm run lint -- --fix\` silently.`,

  bp03: `# .claude/skills/code-review-standards.md
# ================================================
---
name: code-review-standards
description: >
  团队代码审查标准和检查清单
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

## 审查检查清单

### 必查项
- [ ] 类型安全：无 any，无类型断言
- [ ] 错误处理：async 函数有 try-catch
- [ ] 边界条件：null/undefined 检查
- [ ] 命名规范：变量名有意义，函数名动词开头

### 性能
- [ ] 避免不必要的 re-render
- [ ] 大列表使用虚拟滚动
- [ ] 图片使用 lazy loading

### 安全
- [ ] 用户输入已验证和转义
- [ ] API 密钥不在前端暴露
- [ ] CORS 配置正确

# ─── 带 context:fork 的技能 ───

# .claude/skills/deployment-checklist.md
---
name: deployment-checklist
description: Pre-deployment verification
context: fork
shell: bash
---

Before deploying, verify:
1. All tests pass
2. No console.log in production code
3. Environment variables configured
4. Database migrations applied`,

  bp04: `# settings.json — hooks 配置示例
# ================================================

# 文件写入后自动格式化
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write $FILE_PATH"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'About to run: $TOOL_INPUT'"
          }
        ]
      }
    ]
  }
}

# ─── 音效反馈钩子 ───

# hooks/notification-sound.py
import sys, subprocess
event = sys.argv[1] if len(sys.argv) > 1 else ""
sounds = {
  "TaskCompleted": "complete.wav",
  "Stop": "done.wav",
  "Notification": "notify.wav",
}
if event in sounds:
    subprocess.run(["afplay", f"sounds/{sounds[event]}"])`,

  bp05: `# .claude/agents/research-agent.md
# ================================================
---
name: research-agent
description: >
  Deep research on technical topics before
  implementation. Reads docs, explores code,
  and produces a structured research report.
model: opus
tools:
  - Read
  - Glob
  - Grep
  - WebFetch
  - WebSearch
disallowedTools:
  - Edit
  - Write
  - Bash
maxTurns: 30
effort: max
---

You are a research specialist. Your job is to
thoroughly investigate the given topic and produce
a structured report with findings, alternatives,
and recommendations.

# ─── Agent Teams 示例 ───

# .claude/agents/code-reviewer.md
---
name: code-reviewer
description: Reviews code for quality and bugs
model: sonnet
isolation: worktree
skills:
  - code-review-standards
---

Review the assigned code. Focus on:
1. Correctness and edge cases
2. Performance implications
3. Security vulnerabilities
Report findings in a structured format.`,

  bp06: `# settings.json — MCP 配置示例
# ================================================

{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@context7/mcp"],
      "description": "获取任意库的最新文档"
    },
    "playwright": {
      "command": "npx",
      "args": ["@anthropic/mcp-playwright"],
      "description": "浏览器自动化测试"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_xxx"
      },
      "description": "GitHub API 集成"
    }
  }
}

# ─── 推荐的 5 个日常 MCP ───

# 1. Context7    — 实时获取任意库的文档
# 2. Playwright  — 浏览器自动化（测试/截图）
# 3. Chrome      — Chrome DevTools 集成
# 4. DeepWiki    — 深度技术文档搜索
# 5. Excalidraw  — 架构图/流程图绘制`,

  bp07: `# settings.json 完整示例
# ================================================

# 全局配置 (~/.claude/settings.json)
{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "WebSearch"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)"
    ]
  },
  "model": "opus",
  "theme": "dark",
  "verbose": false
}

# 项目配置 (.claude/settings.json)
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Write(src/**)"
    ]
  },
  "hooks": { ... },
  "mcpServers": { ... }
}

# ─── CLI 启动参数 ───

# claude --model opus          # 指定模型
# claude --allowedTools "..."  # 预授权工具
# claude --plan                # Plan 模式启动
# claude -p "prompt"           # 非交互执行
# claude --resume              # 恢复上次会话
# claude --worktree            # 在 worktree 中运行`
};

// ──────────────────────────────────────────────
// 工具函数
// ──────────────────────────────────────────────

/** 读取 Markdown 文件并清理 GitHub 特有标记 */
function readAndCleanMarkdown(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn('  WARN: 文件不存在: ' + filePath);
    return '';
  }
  let md = fs.readFileSync(filePath, 'utf-8');

  // 移除 GitHub badge 图片
  md = md.replace(/!\[.*?\]\(https:\/\/img\.shields\.io\/.*?\)/g, '');
  // 移除导航表格
  md = md.replace(/<table width="100%">[\s\S]*?<\/table>/g, '');
  // 移除 HTML 图片标签（保留 alt 文本）
  md = md.replace(/<a href="[^"]*"><img[^>]*alt="([^"]*)"[^>]*><\/a>/g, '> *$1*');
  md = md.replace(/<p align="center">[\s\S]*?<\/p>/g, '');
  md = md.replace(/<img[^>]*alt="([^"]*)"[^>]*>/g, '> *$1*');
  // 移除 HTML 注释
  md = md.replace(/<!--[\s\S]*?-->/g, '');
  // 移除空的链接标记
  md = md.replace(/\[!\[Implemented\].*?\]\([^)]*\)/g, '');
  // 清理多余空行
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

/** 将 module.exports 数据写入 JS 文件 */
function writeModuleExports(filePath, data) {
  const json = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, 'module.exports = ' + json + ';\n', 'utf-8');
  console.log('  -> ' + path.relative(process.cwd(), filePath));
}

// ──────────────────────────────────────────────
// 解析 Tips 文件
// ──────────────────────────────────────────────

/** 解析单个 tips markdown 文件，提取每条 tip */
function parseTipsFile(filePath) {
  var md = fs.readFileSync(filePath, 'utf-8');
  var tips = [];
  var lines = md.split('\n');
  var currentTip = null;
  var source = path.basename(filePath, '.md');

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    // 匹配 ## 数字/ 标题 格式
    var tipMatch = line.match(/^##\s+(\d+)\s*[/／]\s*(.*)/);
    if (tipMatch) {
      if (currentTip) {
        currentTip.body = currentTip.body.trim();
        tips.push(currentTip);
      }
      currentTip = {
        number: parseInt(tipMatch[1], 10),
        title: tipMatch[2].trim(),
        body: '',
        source: source
      };
    } else if (currentTip) {
      // 跳过 GitHub 图片链接和 --- 分隔线
      if (line.match(/^<a href="https:\/\/x\.com/)) continue;
      if (line.match(/^---$/)) continue;
      if (line.match(/^See:/)) {
        currentTip.body += line + '\n';
        continue;
      }
      currentTip.body += line + '\n';
    }
  }
  if (currentTip) {
    currentTip.body = currentTip.body.trim();
    tips.push(currentTip);
  }

  return tips;
}

/** 将 tips 分类到预定义类别中 */
function categorizeTip(tip) {
  var title = (tip.title || '').toLowerCase();
  var body = (tip.body || '').toLowerCase();
  var text = title + ' ' + body;

  if (text.includes('parallel') || text.includes('5 claude') || text.includes('claude.ai/code')) return 'parallelism';
  if (text.includes('claude.md') || text.includes('memory') || text.includes('claude md')) return 'claude-md';
  if (text.includes('plan mode') || text.includes('planning') || text.includes('ultraplan') || text.includes('plan ')) return 'planning';
  if (text.includes('prompt') || text.includes('opus') || text.includes('model') || text.includes('thinking')) return 'prompting';
  if (text.includes('slash command') || text.includes('/command') || text.includes('commands')) return 'commands';
  if (text.includes('skill')) return 'skills';
  if (text.includes('hook')) return 'hooks';
  if (text.includes('agent') || text.includes('subagent')) return 'agents';
  if (text.includes('git') || text.includes('pr ') || text.includes('pull request') || text.includes('commit') || text.includes('squash')) return 'git-pr';
  if (text.includes('debug') || text.includes('error') || text.includes('bug') || text.includes('doctor')) return 'debugging';
  if (text.includes('workflow') || text.includes('auto mode') || text.includes('auto-accept')) return 'workflows';
  if (text.includes('copy') || text.includes('export') || text.includes('voice') || text.includes('notification') || text.includes('terminal')) return 'utilities';

  return 'daily';
}

// ──────────────────────────────────────────────
// 主构建流程
// ──────────────────────────────────────────────

function main() {
  console.log('=== 构建 Best Practice 数据 ===\n');

  // 确保输出目录存在
  if (!fs.existsSync(DOCS_DIR)) {
    fs.mkdirSync(DOCS_DIR, { recursive: true });
  }

  // ── Step 1: 构建 bp 章节文档 ──
  console.log('[1/5] 生成 bp 章节文档...');

  var locales = ['zh', 'en', 'ja'];

  BP_CHAPTERS.forEach(function(ch) {
    // 合并所有源文件内容
    var combinedEn = '';
    ch.sources.forEach(function(src) {
      var filePath = path.join(BP_REPO, src);
      var content = readAndCleanMarkdown(filePath);
      if (content) {
        combinedEn += content + '\n\n';
      }
    });

    if (!combinedEn) {
      console.warn('  WARN: 章节 ' + ch.id + ' 无内容');
      return;
    }

    locales.forEach(function(locale) {
      var title = ch.title;
      var contentStr = combinedEn;

      // 中文标题映射
      var zhTitles = {
        bp01: 'CLAUDE.md 与 Memory 系统',
        bp02: 'Commands 斜杠命令实战',
        bp03: 'Skills 技能系统实战',
        bp04: 'Hooks 钩子与自动化',
        bp05: 'Subagents 子代理编排',
        bp06: 'MCP 与工具集成',
        bp07: 'Settings 配置与工作流',
      };
      var jaTitles = {
        bp01: 'CLAUDE.md とメモリシステム',
        bp02: 'Commands スラッシュコマンド実践',
        bp03: 'Skills スキルシステム実践',
        bp04: 'Hooks フックと自動化',
        bp05: 'Subagents サブエージェント編成',
        bp06: 'MCP とツール統合',
        bp07: 'Settings 設定とワークフロー',
      };

      if (locale === 'zh') title = zhTitles[ch.id] || ch.title;
      if (locale === 'ja') title = jaTitles[ch.id] || ch.title;

      var docData = {
        version: ch.id,
        slug: ch.slug,
        locale: locale,
        title: ch.id + ': ' + title,
        kind: 'best-practice',
        content: contentStr
      };

      var fileName = 'chapter-' + ch.id + '-' + locale + '.js';
      writeModuleExports(path.join(DOCS_DIR, fileName), docData);
    });
  });

  // ── Step 2: 解析 Tips ──
  console.log('\n[2/5] 解析 Tips 文件...');

  var tipsDir = path.join(BP_REPO, 'tips');
  var tipsFiles = fs.readdirSync(tipsDir).filter(function(f) {
    return f.endsWith('.md');
  });

  var allTips = [];
  tipsFiles.forEach(function(f) {
    var filePath = path.join(tipsDir, f);
    var tips = parseTipsFile(filePath);
    console.log('  ' + f + ': ' + tips.length + ' tips');
    allTips = allTips.concat(tips);
  });

  console.log('  总计: ' + allTips.length + ' 条 tips');

  // 分类
  var categorizedTips = {};
  TIPS_CATEGORIES.forEach(function(cat) {
    categorizedTips[cat.id] = [];
  });

  allTips.forEach(function(tip) {
    var catId = categorizeTip(tip);
    if (categorizedTips[catId]) {
      categorizedTips[catId].push(tip);
    } else {
      categorizedTips['daily'].push(tip);
    }
  });

  // 更新 BP_CHAPTERS 的 tipsCount
  var bpTipsMapping = {
    bp01: 'claude-md',
    bp02: 'commands',
    bp03: 'skills',
    bp04: 'hooks',
    bp05: 'agents',
    bp06: 'utilities',
    bp07: 'workflows',
  };

  BP_CHAPTERS.forEach(function(ch) {
    var catId = bpTipsMapping[ch.id];
    if (catId && categorizedTips[catId]) {
      ch.tipsCount = categorizedTips[catId].length;
    }
  });

  // ── Step 3: 生成 tips-index.js ──
  console.log('\n[3/5] 生成 Tips 索引和文档...');

  var tipsIndex = TIPS_CATEGORIES.map(function(cat) {
    var tips = categorizedTips[cat.id] || [];
    return {
      id: cat.id,
      label: cat.label,
      count: tips.length,
      slug: 'tips-' + cat.id,
    };
  }).filter(function(item) {
    return item.count > 0;
  });

  writeModuleExports(path.join(OUT_DIR, 'tips-index.js'), tipsIndex);

  // 生成每个分类的 Tips 文档
  tipsIndex.forEach(function(cat) {
    var tips = categorizedTips[cat.id];
    var mdContent = '# ' + cat.label.en + '\n\n';
    mdContent += '> ' + cat.count + ' tips in this category\n\n';

    tips.forEach(function(tip, idx) {
      mdContent += '## ' + (idx + 1) + '. ' + tip.title + '\n\n';
      if (tip.body) {
        mdContent += tip.body + '\n\n';
      }
      mdContent += '*Source: ' + tip.source.replace(/^claude-/, '').replace(/-/g, ' ') + '*\n\n';
      mdContent += '---\n\n';
    });

    // 英文版
    var docData = {
      version: 'tips',
      slug: 'tips-' + cat.id,
      locale: 'en',
      title: cat.label.en + ' Tips',
      kind: 'tips',
      content: mdContent.trim()
    };
    writeModuleExports(path.join(DOCS_DIR, 'tips-' + cat.id + '-en.js'), docData);

    // 中文版（标题翻译，内容保留英文原文）
    var zhDocData = {
      version: 'tips',
      slug: 'tips-' + cat.id,
      locale: 'zh',
      title: cat.label.zh + ' 实用技巧',
      kind: 'tips',
      content: mdContent.trim()
    };
    writeModuleExports(path.join(DOCS_DIR, 'tips-' + cat.id + '-zh.js'), zhDocData);

    // 日文版 fallback 到英文
    var jaDocData = {
      version: 'tips',
      slug: 'tips-' + cat.id,
      locale: 'ja',
      title: cat.label.ja + ' Tips',
      kind: 'tips',
      content: mdContent.trim()
    };
    writeModuleExports(path.join(DOCS_DIR, 'tips-' + cat.id + '-ja.js'), jaDocData);
  });

  // ── Step 4: 生成 bp-config-examples.js ──
  console.log('\n[4/5] 生成配置示例...');
  writeModuleExports(path.join(OUT_DIR, 'bp-config-examples.js'), CONFIG_EXAMPLES);

  // ── Step 5: 更新 meta.js（追加 bp 数据）──
  console.log('\n[5/5] 更新 meta.js...');

  // 读取现有 meta.js
  var metaPath = META_FILE;
  var metaContent = fs.readFileSync(metaPath, 'utf-8');
  // 用 vm 执行获取对象
  var metaModule = { exports: {} };
  var metaScript = new (require('vm').Script)(
    '(function(module, exports) { ' + metaContent + ' })(metaModule, metaModule.exports);'
  );
  metaScript.runInNewContext({ metaModule: metaModule });
  var meta = metaModule.exports;

  // 添加 bpOrder
  meta.bpOrder = BP_CHAPTERS.map(function(ch) { return ch.id; });

  // 先移除已有的 best-practice 层（幂等：重复运行不会重复添加）
  meta.layers = meta.layers.filter(function(l) { return l.id !== 'best-practice'; });

  // 添加 best-practice 层
  meta.layers.push({
    id: 'best-practice',
    label: 'Best Practice',
    color: '#EA580C',
    versions: meta.bpOrder.slice()
  });

  // 添加 bp versions
  BP_CHAPTERS.forEach(function(ch) {
    var prevIdx = BP_CHAPTERS.indexOf(ch) - 1;
    var nextIdx = BP_CHAPTERS.indexOf(ch) + 1;

    meta.versions[ch.id] = {
      id: ch.id,
      title: ch.title,
      layer: 'best-practice',
      prevVersion: prevIdx >= 0 ? BP_CHAPTERS[prevIdx].id : null,
      nextVersion: nextIdx < BP_CHAPTERS.length ? BP_CHAPTERS[nextIdx].id : null,
      loc: 0,
      tools: [],
      newTools: [],
      classes: [],
      functions: [],
      isBestPractice: true,
      configFields: ch.configFields,
      tipsCount: ch.tipsCount,
      relatedChapters: ch.relatedChapters,
      content: ch.content,
      guide: ch.guide
    };
  });

  // 添加 best-practice 层的 stageCheckpoint（幂等）
  meta.stageCheckpoints = meta.stageCheckpoints.filter(function(cp) { return cp.layer !== 'best-practice'; });
  meta.stageCheckpoints.push({
    layer: 'best-practice',
    entryVersion: 'bp01',
    endVersion: 'bp07',
    title: {
      zh: '掌握最佳实践',
      en: 'Master Best Practices',
      ja: 'ベストプラクティスを習得'
    },
    body: {
      zh: '从理论到实战——学习如何配置 CLAUDE.md、Commands、Skills、Hooks、Subagents、MCP，打造属于你的 Claude Code 工作流。',
      en: 'From theory to practice — learn to configure CLAUDE.md, Commands, Skills, Hooks, Subagents, MCP, and build your own Claude Code workflow.',
      ja: '理論から実践へ。CLAUDE.md、Commands、Skills、Hooks、Subagents、MCP を設定し、独自の Claude Code ワークフローを構築。'
    },
    rebuild: {
      zh: '为自己的项目建立完整的 Claude Code 配置体系',
      en: 'Build a complete Claude Code configuration system for your own project',
      ja: '自分のプロジェクト用の完全な Claude Code 設定体系を構築'
    }
  });

  writeModuleExports(metaPath, meta);

  // ── Step 6: 更新 i18n 文件 ──
  console.log('\n[bonus] 更新 i18n 文件...');

  var i18nAdditions = {
    zh: {
      'sessions': {
        bp01: 'CLAUDE.md 与 Memory',
        bp02: 'Commands 命令',
        bp03: 'Skills 技能',
        bp04: 'Hooks 钩子',
        bp05: 'Subagents 子代理',
        bp06: 'MCP 与工具',
        bp07: 'Settings 与工作流',
      },
      'layer_labels': {
        'best-practice': '最佳实践'
      },
      'reference': {
        tips_title: '实用技巧',
        tips_subtitle: '来自 Claude Code 团队的实战经验'
      }
    },
    en: {
      'sessions': {
        bp01: 'CLAUDE.md & Memory',
        bp02: 'Commands',
        bp03: 'Skills',
        bp04: 'Hooks',
        bp05: 'Subagents',
        bp06: 'MCP & Tools',
        bp07: 'Settings & Workflows',
      },
      'layer_labels': {
        'best-practice': 'Best Practice'
      },
      'reference': {
        tips_title: 'Tips & Tricks',
        tips_subtitle: 'Battle-tested tips from the Claude Code team'
      }
    },
    ja: {
      'sessions': {
        bp01: 'CLAUDE.md とメモリ',
        bp02: 'Commands',
        bp03: 'Skills',
        bp04: 'Hooks',
        bp05: 'Subagents',
        bp06: 'MCP とツール',
        bp07: 'Settings とワークフロー',
      },
      'layer_labels': {
        'best-practice': 'ベストプラクティス'
      },
      'reference': {
        tips_title: '実用テクニック',
        tips_subtitle: 'Claude Code チームからの実戦経験'
      }
    }
  };

  locales.forEach(function(locale) {
    var i18nPath = path.join(I18N_DIR, locale + '.js');
    if (!fs.existsSync(i18nPath)) {
      console.warn('  WARN: i18n 文件不存在: ' + i18nPath);
      return;
    }

    var i18nContent = fs.readFileSync(i18nPath, 'utf-8');
    var i18nModule = { exports: {} };
    var i18nScript = new (require('vm').Script)(
      '(function(module, exports) { ' + i18nContent + ' })(i18nModule, i18nModule.exports);'
    );
    i18nScript.runInNewContext({ i18nModule: i18nModule });
    var i18nData = i18nModule.exports;

    var additions = i18nAdditions[locale];

    // 合并 sessions
    if (additions.sessions) {
      if (!i18nData.sessions) i18nData.sessions = {};
      Object.keys(additions.sessions).forEach(function(key) {
        i18nData.sessions[key] = additions.sessions[key];
      });
    }

    // 合并 layer_labels
    if (additions.layer_labels) {
      if (!i18nData.layer_labels) i18nData.layer_labels = {};
      Object.keys(additions.layer_labels).forEach(function(key) {
        i18nData.layer_labels[key] = additions.layer_labels[key];
      });
    }

    // 合并 reference
    if (additions.reference) {
      if (!i18nData.reference) i18nData.reference = {};
      Object.keys(additions.reference).forEach(function(key) {
        i18nData.reference[key] = additions.reference[key];
      });
    }

    writeModuleExports(i18nPath, i18nData);
  });

  console.log('\n=== 构建完成 ===');
  console.log('生成 bp 章节文档: ' + (BP_CHAPTERS.length * locales.length) + ' 个');
  console.log('生成 Tips 分类: ' + tipsIndex.length + ' 个');
  console.log('总 Tips 数: ' + allTips.length + ' 条');
}

main();
