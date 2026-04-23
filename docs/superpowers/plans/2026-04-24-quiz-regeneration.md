# Quiz Regeneration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all 126 low-quality mechanically-generated quiz questions with ~453 high-quality trilingual multiple-choice questions, generated from 103 knowledge cards across 26 stages.

**Architecture:** Read knowledge cards from `knowledge-cards.js`, generate 4-5 questions per card at mixed cognitive levels (30% remember / 40% understand / 30% apply), write directly into the `questions` array of each stage in `game-stages.js`. Stage outer structure (id, chapter, region, title, star_thresholds, reward_cards) is preserved unchanged.

**Tech Stack:** WeChat miniprogram data files (CommonJS `module.exports`), trilingual content (zh/en/ja)

**Spec:** `docs/superpowers/specs/2026-04-24-quiz-regeneration-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Modify | `miniprogram/subpkg-chapters/data/game-stages.js` | Replace `questions` arrays for all 26 stages |
| Read-only | `miniprogram/subpkg-chapters/data/knowledge-cards.js` | Source data: 103 knowledge cards |

No other files are created or modified.

---

### Task 1: Core Region — s01-s06 (26 cards → ~115 questions)

**Files:**
- Modify: `miniprogram/subpkg-chapters/data/game-stages.js` — replace `questions` arrays for stage_s01 through stage_s06
- Read: `miniprogram/subpkg-chapters/data/knowledge-cards.js` — stages stage_s01 through stage_s06

- [ ] **Step 1: Read all Core knowledge cards**

Read all knowledge cards for stages s01-s06 from `knowledge-cards.js`. The file exports `{ stages: [...] }` where each element is `{ stage_id: "stage_sXX", cards: [...] }`. Each card has: `id`, `title: {zh,en,ja}`, `icon`, `content: {zh,en,ja}`, `code_example`, `key_point: {zh,en,ja}`.

Card counts: s01=5, s02=4, s03=4, s04=4, s05=4, s06=5 (total 26 cards).

- [ ] **Step 2: Generate questions for each stage**

For each stage, generate 4-5 questions per card. Each question must follow this exact structure:

```js
{
  "id": "q_s01_001",           // stage prefix + 3-digit zero-padded sequence
  "type": "choice",
  "difficulty": 1,              // 1=remember, 2=understand, 3=apply
  "stem": {
    "zh": "完整的中文问题句？",
    "en": "Complete English question?",
    "ja": "完全な日本語の質問？"
  },
  "options": [
    { "id": "a", "text": { "zh": "...", "en": "...", "ja": "..." } },
    { "id": "b", "text": { "zh": "...", "en": "...", "ja": "..." } },
    { "id": "c", "text": { "zh": "...", "en": "...", "ja": "..." } },
    { "id": "d", "text": { "zh": "...", "en": "...", "ja": "..." } }
  ],
  "answer": "b",               // correct option id, distributed evenly across a/b/c/d
  "explanation": {
    "zh": "2-3句解释。先说为什么正确答案对，再说常见误解。",
    "en": "2-3 sentence explanation.",
    "ja": "2-3文の説明。"
  },
  "reward_card": "card_s01_001" // use existing reward_cards from stage, cycle if needed
}
```

**Quality requirements:**
- **Stem**: Complete self-contained question. One question = one knowledge point. No negative phrasing.
- **Distractors**: All 3 wrong options must be plausible misconceptions. Use concepts from OTHER cards in the SAME stage as distractors (most confusable). Similar length and grammar to correct answer.
- **Answer distribution**: Roughly even across a/b/c/d within each stage.
- **Difficulty mix**: ~30% difficulty 1 (remember: "XX 的核心作用是什么？"), ~40% difficulty 2 (understand: "为什么 XX 这样设计？"), ~30% difficulty 3 (apply: "遇到 XX 场景时会怎么处理？").
- **Explanation**: 2-3 sentences. Why correct answer is right + common misconception. Reference the card's key_point.
- **Trilingual**: Chinese is primary. English and Japanese are translations. Technical terms stay in English (Agent Loop, Hook, MCP).

- [ ] **Step 3: Replace questions arrays in game-stages.js**

For each of the 6 stages (stage_s01 through stage_s06), locate the stage object in `game-stages.js` and replace its `questions` array with the generated questions. **Preserve all other stage fields** (id, chapter, region, title, star_thresholds, reward_cards).

The stage outer structure looks like:
```js
{
  "id": "stage_s01",
  "chapter": "s01",
  "region": "core",
  "title": { "zh": "最小闭环", "en": "Minimal Closed Loop", "ja": "最小の閉ループ" },
  "questions": [ ... ],  // ← ONLY replace this array
  "star_thresholds": [0.4, 0.7, 1],
  "reward_cards": ["card_s01_001", "card_s01_002", "card_s01_003"]
}
```

- [ ] **Step 4: Validate**

Run: `node -e "const d = require('./miniprogram/subpkg-chapters/data/game-stages.js'); const stages = d.stages.filter(s => s.region === 'core'); stages.forEach(s => { const diffs = {1:0,2:0,3:0}; const ans = {a:0,b:0,c:0,d:0}; s.questions.forEach(q => { diffs[q.difficulty]++; ans[q.answer]++; }); console.log(s.id + ': ' + s.questions.length + ' questions | diff: ' + JSON.stringify(diffs) + ' | ans: ' + JSON.stringify(ans)); });"`

Expected: Each stage has 16-25 questions, difficulty roughly 30/40/30, answers roughly even.

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(quiz): regenerate Core region questions from knowledge cards (s01-s06)"
```

---

### Task 2: Hardening Region — s07-s11 (21 cards → ~92 questions)

**Files:**
- Modify: `miniprogram/subpkg-chapters/data/game-stages.js` — replace `questions` arrays for stage_s07 through stage_s11
- Read: `miniprogram/subpkg-chapters/data/knowledge-cards.js` — stages stage_s07 through stage_s11

- [ ] **Step 1: Read all Hardening knowledge cards**

Read all knowledge cards for stages s07-s11 from `knowledge-cards.js`.

Card counts: s07=4, s08=4, s09=5, s10=4, s11=4 (total 21 cards).

- [ ] **Step 2: Generate questions for each stage**

Same quality requirements as Task 1 Step 2. Generate 4-5 questions per card.

Question IDs continue the `q_sXX_NNN` pattern for each stage (e.g., q_s07_001, q_s07_002, ...).

**Stage-specific distractor guidance:**
- s07 (Permission): Confuse deny/mode/allow/ask pipeline ordering; mix up PermissionRule fields
- s08 (Hook): Confuse exit codes 0/1/2; mix up PreToolUse vs PostToolUse timing
- s09 (Memory): Confuse the 4 memory types; mix up what should/shouldn't be stored
- s10 (System Prompt): Confuse the 6 assembly segments; mix up prompt vs reminder
- s11 (Error Recovery): Confuse the 3 error types; mix up truncation vs context vs transport

- [ ] **Step 3: Replace questions arrays in game-stages.js**

Same approach as Task 1 Step 3. Replace `questions` arrays for stage_s07 through stage_s11. Preserve all other fields.

- [ ] **Step 4: Validate**

Run: `node -e "const d = require('./miniprogram/subpkg-chapters/data/game-stages.js'); const stages = d.stages.filter(s => ['s07','s08','s09','s10','s11'].includes(s.chapter)); stages.forEach(s => { const diffs = {1:0,2:0,3:0}; const ans = {a:0,b:0,c:0,d:0}; s.questions.forEach(q => { diffs[q.difficulty]++; ans[q.answer]++; }); console.log(s.id + ': ' + s.questions.length + ' questions | diff: ' + JSON.stringify(diffs) + ' | ans: ' + JSON.stringify(ans)); });"`

Expected: Each stage has 16-25 questions, difficulty roughly 30/40/30, answers roughly even.

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(quiz): regenerate Hardening region questions from knowledge cards (s07-s11)"
```

---

### Task 3: Runtime + Platform Region — s12-s19 (31 cards → ~136 questions)

**Files:**
- Modify: `miniprogram/subpkg-chapters/data/game-stages.js` — replace `questions` arrays for stage_s12 through stage_s19
- Read: `miniprogram/subpkg-chapters/data/knowledge-cards.js` — stages stage_s12 through stage_s19

- [ ] **Step 1: Read all Runtime + Platform knowledge cards**

Read all knowledge cards for stages s12-s19 from `knowledge-cards.js`.

Card counts: s12=4, s13=4, s14=3, s15=4, s16=4, s17=4, s18=4, s19=4 (total 31 cards).

- [ ] **Step 2: Generate questions for each stage**

Same quality requirements as Task 1 Step 2. Generate 4-5 questions per card.

**Stage-specific distractor guidance:**
- s12 (Task System): Confuse Todo vs Task; mix up is_ready() conditions
- s13 (Background Tasks): Confuse blocking vs non-blocking; mix up notification patterns
- s14 (Cron): Confuse schedule vs background task; mix up cron fields
- s15 (Agent Teams): Confuse Teammate vs Subagent; mix up team components
- s16 (Protocols): Confuse shutdown vs plan-approval; mix up protocol vs plain message
- s17 (Autonomous): Confuse WORK vs IDLE phases; mix up claim safety conditions
- s18 (Worktree): Confuse task vs worktree responsibility; mix up keep vs remove
- s19 (MCP & Plugin): Confuse MCP namespacing; mix up local vs MCP permission

- [ ] **Step 3: Replace questions arrays in game-stages.js**

Same approach as Task 1 Step 3. Replace `questions` arrays for stage_s12 through stage_s19. Preserve all other fields.

- [ ] **Step 4: Validate**

Run: `node -e "const d = require('./miniprogram/subpkg-chapters/data/game-stages.js'); const stages = d.stages.filter(s => ['s12','s13','s14','s15','s16','s17','s18','s19'].includes(s.chapter)); stages.forEach(s => { const diffs = {1:0,2:0,3:0}; const ans = {a:0,b:0,c:0,d:0}; s.questions.forEach(q => { diffs[q.difficulty]++; ans[q.answer]++; }); console.log(s.id + ': ' + s.questions.length + ' questions | diff: ' + JSON.stringify(diffs) + ' | ans: ' + JSON.stringify(ans)); });"`

Expected: Each stage has 12-25 questions, difficulty roughly 30/40/30, answers roughly even.

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(quiz): regenerate Runtime+Platform region questions from knowledge cards (s12-s19)"
```

---

### Task 4: Best Practice Region — bp01-bp07 (25 cards → ~110 questions)

**Files:**
- Modify: `miniprogram/subpkg-chapters/data/game-stages.js` — replace `questions` arrays for stage_bp01 through stage_bp07
- Read: `miniprogram/subpkg-chapters/data/knowledge-cards.js` — stages stage_bp01 through stage_bp07

- [ ] **Step 1: Read all Best Practice knowledge cards**

Read all knowledge cards for stages bp01-bp07 from `knowledge-cards.js`.

Card counts: bp01=4, bp02=3, bp03=3, bp04=4, bp05=4, bp06=3, bp07=4 (total 25 cards).

- [ ] **Step 2: Generate questions for each stage**

Same quality requirements as Task 1 Step 2. Generate 4-5 questions per card.

**BP-specific note:** Best Practice questions should test practical knowledge — "when would you use X?", "what's the correct configuration for Y?", "which approach is recommended for Z?". Code examples in BP cards often show config structures (settings.json, CLAUDE.md content) rather than runtime logic — questions should test understanding of configuration patterns.

**Stage-specific distractor guidance:**
- bp01 (CLAUDE.md): Confuse eager-load vs lazy-load; mix up global vs project vs local scope
- bp02 (Commands): Confuse frontmatter fields; mix up command categories
- bp03 (Skills): Confuse Skill vs Command; mix up auto-discovery triggers
- bp04 (Hooks): Confuse hook types; mix up event frequencies (per-session/turn/tool-call)
- bp05 (Subagents): Confuse agent types; mix up frontmatter fields like tools vs model
- bp06 (MCP): Confuse stdio vs http transport; mix up server approval settings
- bp07 (Settings): Confuse the 5 priority levels; mix up permission modes

- [ ] **Step 3: Replace questions arrays in game-stages.js**

Same approach as Task 1 Step 3. Replace `questions` arrays for stage_bp01 through stage_bp07. Preserve all other fields.

- [ ] **Step 4: Validate**

Run: `node -e "const d = require('./miniprogram/subpkg-chapters/data/game-stages.js'); const stages = d.stages.filter(s => s.chapter.startsWith('bp')); stages.forEach(s => { const diffs = {1:0,2:0,3:0}; const ans = {a:0,b:0,c:0,d:0}; s.questions.forEach(q => { diffs[q.difficulty]++; ans[q.answer]++; }); console.log(s.id + ': ' + s.questions.length + ' questions | diff: ' + JSON.stringify(diffs) + ' | ans: ' + JSON.stringify(ans)); });"`

Expected: Each stage has 12-25 questions, difficulty roughly 30/40/30, answers roughly even.

- [ ] **Step 5: Commit**

```bash
git add miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(quiz): regenerate Best Practice region questions from knowledge cards (bp01-bp07)"
```

---

## Summary

| Task | Region | Stages | Cards | Est. Questions |
|------|--------|--------|-------|----------------|
| 1 | Core | s01-s06 | 26 | ~115 |
| 2 | Hardening | s07-s11 | 21 | ~92 |
| 3 | Runtime + Platform | s12-s19 | 31 | ~136 |
| 4 | Best Practice | bp01-bp07 | 25 | ~110 |
| **Total** | | **26 stages** | **103 cards** | **~453** |
