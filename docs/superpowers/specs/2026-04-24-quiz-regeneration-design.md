# Quiz Regeneration Design Spec — LLM-Powered Question Bank

**Date:** 2026-04-24  
**Status:** Approved  
**Target file:** `miniprogram/subpkg-chapters/data/game-stages.js`  
**Source data:** `miniprogram/subpkg-chapters/data/knowledge-cards.js` (103 cards, 26 stages)

---

## 1. Problem

The current question bank (`game-stages.js`) contains 126 questions across 26 stages, all mechanically generated. Quality is critically low:

- Correct answers are literal copies of section headings
- Distractors are other heading texts with no conceptual relationship
- Explanations are either heading echoes or one unrelated sentence
- Questions test text matching, not understanding

Example of current quality:
```
Q: "以下哪个概念与「建议联读」直接相关？"
A: "建议联读"  ← answer is the stem itself
Explanation: "建议联读"  ← explanation is also the stem
```

## 2. Goal

Replace all 126 questions with ~450 high-quality trilingual (zh/en/ja) multiple-choice questions generated from the 103 knowledge cards. Each card produces 4-5 questions at mixed cognitive levels.

## 3. Data Structure (Unchanged)

The question data structure remains identical to preserve compatibility with `game-engine.js`, `chapter.js`, `game-review.js`, and `game-daily.js`:

```js
{
  id: "q_sXX_NNN",           // stage prefix + zero-padded sequence
  type: "choice",             // retained for future extensibility
  difficulty: 1|2|3,          // 1=remember, 2=understand, 3=apply/analyze
  stem: { zh: '...', en: '...', ja: '...' },
  options: [
    { id: "a", text: { zh: '...', en: '...', ja: '...' } },
    { id: "b", text: { zh: '...', en: '...', ja: '...' } },
    { id: "c", text: { zh: '...', en: '...', ja: '...' } },
    { id: "d", text: { zh: '...', en: '...', ja: '...' } }
  ],
  answer: "a"|"b"|"c"|"d",   // correct option id
  explanation: { zh: '...', en: '...', ja: '...' },
  reward_card: "card_sXX_NNN" // associated card reward (kept but not enforced)
}
```

**Compatibility:** No changes to any consuming code. `game-engine.js` reads `stage.questions` dynamically — increasing question count from 5 to 12-25 per stage requires zero code changes.

## 4. Question Quality Standards

### 4.1 Cognitive Level Distribution (per stage)

| Level | Difficulty | Proportion | Question Pattern |
|-------|-----------|------------|-----------------|
| Remember | 1 | ~30% | "XX 的核心作用是什么？", "以下哪个属于 XX 的组成部分？" |
| Understand | 2 | ~40% | "为什么 XX 要这样设计？", "XX 和 YY 的关键区别是什么？" |
| Apply/Analyze | 3 | ~30% | "当遇到 XX 情况时会怎么处理？", "这段代码的执行结果是？" |

### 4.2 Stem Design

- Must be a complete, self-contained question
- One question tests one knowledge point only
- Avoid negative phrasing ("which is NOT...")
- Apply-level questions use concrete scenarios, not abstract descriptions

### 4.3 Distractor Design

- All 3 distractors must be "plausible misconceptions", not obviously wrong
- Prefer cross-card distractors within the same stage (most confusable concepts)
- All 4 options must have similar length and parallel grammatical structure
- Correct answer position distributed evenly across a/b/c/d

### 4.4 Explanation Design

- 2-3 sentences: first explain why the correct answer is right, then briefly address the common misconception
- Reference the knowledge card's `key_point` to reinforce memory

### 4.5 Trilingual Quality

- Chinese is the primary authoring language
- English and Japanese are translations of the Chinese
- Technical terms stay in English across all languages (Agent Loop, Hook, MCP, etc.)

## 5. Generation Scope

| Region | Stages | Cards | Questions/Card | Est. Questions |
|--------|--------|-------|---------------|----------------|
| Core (s01-s06) | 6 | 26 | 4-5 | ~115 |
| Hardening (s07-s11) | 5 | 21 | 4-5 | ~92 |
| Runtime (s12-s14) | 3 | 11 | 4-5 | ~48 |
| Platform (s15-s19) | 5 | 20 | 4-5 | ~88 |
| Best Practice (bp01-bp07) | 7 | 25 | 4-5 | ~110 |
| **Total** | **26** | **103** | | **~453** |

Current: 126 questions → Target: ~453 questions (3.6× coverage increase).

## 6. Execution Strategy

### 6.1 Approach

Session-internal generation using subagents. Each subagent:
1. Reads all knowledge cards for its assigned stages
2. Generates questions per stage, replacing the `questions` array
3. Preserves the stage outer structure (id, chapter, region, title, reward_cards)

### 6.2 Batches

| Batch | Region | Stages | Cards | Est. Questions |
|-------|--------|--------|-------|----------------|
| 1 | Core | s01-s06 | 26 | ~115 |
| 2 | Hardening | s07-s11 | 21 | ~92 |
| 3 | Runtime + Platform | s12-s19 | 31 | ~136 |
| 4 | Best Practice | bp01-bp07 | 25 | ~110 |

### 6.3 Verification (per batch)

1. `node -e "require('./miniprogram/subpkg-chapters/data/game-stages.js')"` — syntax validation
2. Count questions per stage, verify 12-25 range
3. Check difficulty distribution (~30/40/30 across 1/2/3)
4. Check answer position distribution (roughly even a/b/c/d)
5. Sample 2-3 questions per stage for quality spot-check

## 7. Quiz Session Behavior

Each quiz session presents **all questions** for the stage (user preference). With 12-25 questions per stage, sessions become longer but more comprehensive.

No code changes needed — `chapter.js` already uses `stage.questions.length` dynamically for progress tracking and UI.

## 8. Out of Scope

- New question types (code completion, true/false, ordering) — deferred to future version
- Quiz question randomization/sampling — out of scope, all questions shown
- Adaptive difficulty — not planned
- Build script for automated regeneration — using session-internal generation instead
- UI changes — existing quiz UI handles variable question counts already

## 9. File Impact

| File | Change |
|------|--------|
| `miniprogram/subpkg-chapters/data/game-stages.js` | Full replacement of all `questions` arrays |
| All other files | No changes |
