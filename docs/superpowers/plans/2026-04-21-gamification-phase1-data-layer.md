# Phase 1: 游戏数据层 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create `build-game-data.js` that reads existing chapter docs and meta.js to auto-generate card data (`game-cards.js`) and stage data (`game-stages.js`) for the gamified miniprogram.

**Architecture:** A single Node.js build script reads chapter doc files (`chapter-{id}-{locale}.js`) and `meta.js`, extracts knowledge points from Markdown headings/bold text/code blocks, generates cards with auto-assigned rarity, and produces quiz questions with distractors drawn from sibling chapters. Output follows the existing `module.exports = {...}` CommonJS pattern.

**Tech Stack:** Node.js (fs/path/vm modules, no external deps) — same as existing build scripts.

**Design spec:** `docs/superpowers/specs/2026-04-21-gamification-redesign-design.md` Section 4.

---

## File Structure

| File | Responsibility |
|------|----------------|
| `scripts/build-game-data.js` | Main build script: orchestrates reading, extraction, generation, output |
| `miniprogram/data/game-cards.js` | Output: all card data (~200 cards, trilingual) |
| `miniprogram/subpkg-chapters/data/game-stages.js` | Output: all stage data (26 stages, 3-5 questions each) |

The script is a single file (following the pattern of `build-miniprogram-data.js` and `build-best-practice-data.js`). No new utility modules — all logic is self-contained.

---

## Task 1: Script Skeleton + Chapter Doc Reader

**Files:**
- Create: `scripts/build-game-data.js`

- [ ] **Step 1: Create script skeleton with chapter doc reader**

```js
#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// --- Paths ---
const ROOT = path.resolve(__dirname, '..');
const MINIPROGRAM = path.join(ROOT, 'miniprogram');
const CHAPTERS_DATA = path.join(MINIPROGRAM, 'subpkg-chapters', 'data');
const DOCS_DIR = path.join(CHAPTERS_DATA, 'docs');
const META_PATH = path.join(MINIPROGRAM, 'data', 'meta.js');
const CARDS_OUTPUT = path.join(MINIPROGRAM, 'data', 'game-cards.js');
const STAGES_OUTPUT = path.join(CHAPTERS_DATA, 'game-stages.js');

// --- Helpers ---
function loadJSModule(filePath) {
  var code = fs.readFileSync(filePath, 'utf-8');
  var sandbox = { module: { exports: {} } };
  vm.runInNewContext(code, sandbox);
  return sandbox.module.exports;
}

function writeJSModule(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  var json = JSON.stringify(data, null, 2);
  var content = 'module.exports = ' + json + ';\n';
  fs.writeFileSync(filePath, content, 'utf-8');
  var sizeKB = (Buffer.byteLength(content, 'utf-8') / 1024).toFixed(1);
  console.log('  -> ' + path.relative(ROOT, filePath) + ' (' + sizeKB + ' KB)');
}

// --- Load meta ---
console.log('Loading meta.js...');
var meta = loadJSModule(META_PATH);
var allVersionIds = (meta.versionOrder || []).concat(meta.bpOrder || []);
var locales = ['zh', 'en', 'ja'];

// --- Load chapter docs ---
console.log('Loading chapter docs...');
var chapterDocs = {};

allVersionIds.forEach(function(verId) {
  chapterDocs[verId] = {};
  locales.forEach(function(locale) {
    var fileName = 'chapter-' + verId + '-' + locale + '.js';
    var filePath = path.join(DOCS_DIR, fileName);
    if (fs.existsSync(filePath)) {
      chapterDocs[verId][locale] = loadJSModule(filePath);
    }
  });
});

console.log('Loaded docs for ' + Object.keys(chapterDocs).length + ' chapters');

// --- Main ---
function main() {
  console.log('\n=== Build Game Data ===\n');
  console.log('Chapters: ' + allVersionIds.length);
  console.log('Locales: ' + locales.join(', '));
  // TODO: extraction, card generation, stage generation
}

main();
```

- [ ] **Step 2: Run script to verify it loads all chapter docs**

Run: `cd /Users/bill_huang/workspace/claudecode/myproject/learn-claude-code-miniprogram && node scripts/build-game-data.js`

Expected output:
```
Loading meta.js...
Loading chapter docs...
Loaded docs for 26 chapters

=== Build Game Data ===

Chapters: 26
Locales: zh, en, ja
```

- [ ] **Step 3: Commit**

```bash
git add scripts/build-game-data.js
git commit -m "feat(game): add build-game-data.js skeleton with chapter doc reader"
```

---

## Task 2: Knowledge Point Extraction Engine

**Files:**
- Modify: `scripts/build-game-data.js`

The extraction engine parses Markdown content from chapter docs and extracts discrete knowledge points. Each knowledge point becomes a card candidate.

Extraction rules:
1. **H2 headings** (`## title`) → major knowledge points (card candidates)
2. **H3 headings** (`### title`) → sub-knowledge points (card candidates)
3. **Bold text** (`**text**`) in paragraphs → key concept extraction for card descriptions
4. **Code blocks** → tracked for question generation (not cards themselves)
5. Skip navigation lines (backtick lines with `s00 > s01 > ...`), blockquotes used as epigraphs, and "教学边界"/"试一试" sections

- [ ] **Step 1: Add Markdown extraction functions**

Add after the `writeJSModule` function:

```js
// --- Markdown Knowledge Extraction ---

// Sections to skip (not knowledge content)
var SKIP_SECTIONS = [
  '试一试', '教学边界', '一句话记住', '相对', '如果你开始觉得',
  'Try it', 'Teaching boundary', 'One sentence',
  '試してみよう', '教学の境界'
];

function shouldSkipSection(heading) {
  for (var i = 0; i < SKIP_SECTIONS.length; i++) {
    if (heading.indexOf(SKIP_SECTIONS[i]) !== -1) return true;
  }
  return false;
}

function extractKnowledgePoints(markdown) {
  var lines = markdown.split('\n');
  var points = [];
  var currentH2 = null;
  var currentBody = [];
  var codeBlockOpen = false;

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    // Track code block boundaries
    if (line.trim().indexOf('```') === 0) {
      codeBlockOpen = !codeBlockOpen;
      if (!codeBlockOpen) {
        currentBody.push(line);
      }
      continue;
    }
    if (codeBlockOpen) {
      currentBody.push(line);
      continue;
    }

    // Skip navigation breadcrumb lines
    if (line.indexOf('`s00') !== -1 && line.indexOf(' > ') !== -1) continue;

    // H2: major knowledge point
    if (line.indexOf('## ') === 0 && line.indexOf('### ') !== 0) {
      // Save previous section
      if (currentH2 && !shouldSkipSection(currentH2)) {
        points.push({
          level: 2,
          heading: currentH2,
          body: currentBody.join('\n'),
          boldTerms: extractBoldTerms(currentBody.join('\n')),
          hasCode: currentBody.some(function(l) { return l.trim().indexOf('```') === 0; })
        });
      }
      currentH2 = line.replace(/^##\s+/, '').trim();
      currentBody = [];
      continue;
    }

    // H3: sub-knowledge point (nested under current H2)
    if (line.indexOf('### ') === 0 && line.indexOf('#### ') !== 0) {
      var h3Title = line.replace(/^###\s+/, '').trim();
      if (currentH2 && !shouldSkipSection(h3Title)) {
        // Flush current body to H2 first
        if (currentBody.length > 0 && !shouldSkipSection(currentH2)) {
          points.push({
            level: 2,
            heading: currentH2,
            body: currentBody.join('\n'),
            boldTerms: extractBoldTerms(currentBody.join('\n')),
            hasCode: currentBody.some(function(l) { return l.trim().indexOf('```') === 0; })
          });
          currentBody = [];
        }
        // Start tracking H3
        currentH2 = h3Title;
        currentBody = [];
        continue;
      }
    }

    currentBody.push(line);
  }

  // Don't forget last section
  if (currentH2 && !shouldSkipSection(currentH2)) {
    points.push({
      level: 2,
      heading: currentH2,
      body: currentBody.join('\n'),
      boldTerms: extractBoldTerms(currentBody.join('\n')),
      hasCode: currentBody.some(function(l) { return l.trim().indexOf('```') === 0; })
    });
  }

  return points;
}

function extractBoldTerms(text) {
  var matches = [];
  var regex = /\*\*([^*]+)\*\*/g;
  var match;
  while ((match = regex.exec(text)) !== null) {
    var term = match[1].trim();
    if (term.length > 2 && term.length < 80) {
      matches.push(term);
    }
  }
  return matches;
}
```

- [ ] **Step 2: Test extraction by logging results for s01**

Add at the end of `main()`:

```js
  // Test extraction on s01
  if (chapterDocs.s01 && chapterDocs.s01.zh) {
    var testPoints = extractKnowledgePoints(chapterDocs.s01.zh.content);
    console.log('\n--- Test: s01 zh extraction ---');
    console.log('Knowledge points found: ' + testPoints.length);
    testPoints.forEach(function(p) {
      console.log('  [H' + p.level + '] ' + p.heading + ' (bold terms: ' + p.boldTerms.length + ', hasCode: ' + p.hasCode + ')');
    });
  }
```

- [ ] **Step 3: Run and verify extraction quality**

Run: `node scripts/build-game-data.js`

Expected: Should extract 6-10 knowledge points from s01-zh, including headings like "这一章要解决什么问题", "先解释几个名词", "最小心智模型", "关键数据结构", "最小实现", "初学者最容易犯的错". Bold terms should include things like "把'模型 + 工具'连接成一个能持续推进任务的主循环".

- [ ] **Step 4: Remove test code and commit**

Remove the test block added in Step 2 from `main()`.

```bash
git add scripts/build-game-data.js
git commit -m "feat(game): add Markdown knowledge point extraction engine"
```

---

## Task 3: Card Generation with Rarity Assignment

**Files:**
- Modify: `scripts/build-game-data.js`

Cards are generated from extracted knowledge points. Each card gets an auto-assigned rarity based on: heading level, bold term count, code presence, and cross-chapter reference frequency.

- [ ] **Step 1: Add region mapping and rarity scoring**

Add after the extraction functions:

```js
// --- Region Mapping ---
var REGION_MAP = {
  core: { versions: ['s01','s02','s03','s04','s05','s06'], symbol: '>' },
  tools: { versions: ['s07','s08','s09','s10','s11'], symbol: '$' },
  runtime: { versions: ['s12','s13','s14'], symbol: '#' },
  network: { versions: ['s15','s16','s17','s18','s19'], symbol: '@' },
  practice: { versions: ['bp01','bp02','bp03','bp04','bp05','bp06','bp07'], symbol: '!' }
};

function getRegion(versionId) {
  var keys = Object.keys(REGION_MAP);
  for (var i = 0; i < keys.length; i++) {
    if (REGION_MAP[keys[i]].versions.indexOf(versionId) !== -1) {
      return keys[i];
    }
  }
  return 'core';
}

// --- Card Generation ---
function generateCardId(versionId, index) {
  var padded = String(index + 1);
  while (padded.length < 3) padded = '0' + padded;
  return 'card_' + versionId + '_' + padded;
}

function scoreRarity(point, versionMeta) {
  var score = 0;

  // Bold terms indicate importance
  score += Math.min(point.boldTerms.length * 2, 10);

  // Code blocks indicate implementation detail (more practical)
  if (point.hasCode) score += 3;

  // Body length indicates depth
  var bodyLen = point.body.length;
  if (bodyLen > 1000) score += 3;
  else if (bodyLen > 500) score += 1;

  // Version metadata: more tools/classes = more complex chapter
  if (versionMeta) {
    if (versionMeta.tools && versionMeta.tools.length > 3) score += 2;
    if (versionMeta.classes && versionMeta.classes.length > 2) score += 2;
  }

  return score;
}

function assignRarity(score) {
  if (score >= 14) return 'SSR';
  if (score >= 10) return 'SR';
  if (score >= 5) return 'R';
  return 'N';
}

function generatePowerDefense(rarity) {
  var bases = { N: [30, 20], R: [50, 40], SR: [70, 60], SSR: [85, 75] };
  var base = bases[rarity] || bases.N;
  var variance = Math.floor(Math.random() * 15);
  return { power: base[0] + variance, defense: base[1] + variance };
}

function extractTags(heading, boldTerms) {
  var tags = [];
  var combined = (heading + ' ' + boldTerms.join(' ')).toLowerCase();

  var tagKeywords = {
    loop: ['loop', '循环', 'ループ'],
    agent: ['agent', '智能体', 'エージェント'],
    tool: ['tool', '工具', 'ツール'],
    prompt: ['prompt', '提示', 'プロンプト'],
    context: ['context', '上下文', 'コンテキスト'],
    permission: ['permission', '权限', '許可'],
    mcp: ['mcp', 'protocol', '协议'],
    task: ['task', '任务', 'タスク'],
    memory: ['memory', '记忆', 'メモリ'],
    hook: ['hook', '钩子', 'フック'],
    stream: ['stream', '流式', 'ストリーム'],
    error: ['error', '错误', 'エラー', 'recovery', '恢复'],
    plan: ['plan', '规划', '計画'],
    security: ['security', '安全', 'sandbox', '沙箱']
  };

  var keys = Object.keys(tagKeywords);
  for (var i = 0; i < keys.length; i++) {
    var words = tagKeywords[keys[i]];
    for (var j = 0; j < words.length; j++) {
      if (combined.indexOf(words[j]) !== -1) {
        tags.push(keys[i]);
        break;
      }
    }
  }

  return tags.length > 0 ? tags.slice(0, 3) : ['concept'];
}

function makeCardDescription(point) {
  // Use the first bold term or first non-empty paragraph line as description
  if (point.boldTerms.length > 0) {
    return point.boldTerms[0];
  }
  var lines = point.body.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length > 10 && line.indexOf('#') !== 0 && line.indexOf('```') !== 0
        && line.indexOf('>') !== 0 && line.indexOf('|') !== 0 && line.indexOf('-') !== 0) {
      // Truncate to ~60 chars
      if (line.length > 60) return line.substring(0, 57) + '...';
      return line;
    }
  }
  return point.heading;
}
```

- [ ] **Step 2: Add the main card generation loop**

Add to `main()`:

```js
  // --- Generate Cards ---
  console.log('\nGenerating cards...');
  var allCards = [];

  allVersionIds.forEach(function(verId) {
    var docs = chapterDocs[verId];
    if (!docs || !docs.zh) return;

    var region = getRegion(verId);
    var versionMeta = meta.versions[verId];
    var zhPoints = extractKnowledgePoints(docs.zh.content);

    // Also extract from en/ja for trilingual names/descriptions
    var enPoints = docs.en ? extractKnowledgePoints(docs.en.content) : [];
    var jaPoints = docs.ja ? extractKnowledgePoints(docs.ja.content) : [];

    zhPoints.forEach(function(zhPoint, idx) {
      var enPoint = enPoints[idx] || null;
      var jaPoint = jaPoints[idx] || null;

      var score = scoreRarity(zhPoint, versionMeta);
      var rarity = assignRarity(score);
      var stats = generatePowerDefense(rarity);
      var tags = extractTags(zhPoint.heading, zhPoint.boldTerms);

      var card = {
        id: generateCardId(verId, idx),
        name: {
          zh: zhPoint.heading,
          en: enPoint ? enPoint.heading : zhPoint.heading,
          ja: jaPoint ? jaPoint.heading : zhPoint.heading
        },
        desc: {
          zh: makeCardDescription(zhPoint),
          en: enPoint ? makeCardDescription(enPoint) : makeCardDescription(zhPoint),
          ja: jaPoint ? makeCardDescription(jaPoint) : makeCardDescription(zhPoint)
        },
        rarity: rarity,
        region: region,
        chapter: verId,
        tags: tags,
        power: stats.power,
        defense: stats.defense
      };

      allCards.push(card);
    });
  });

  // --- Rarity distribution adjustment ---
  // Sort by score descending and force distribution: N:60% R:25% SR:12% SSR:3%
  var total = allCards.length;
  var targets = {
    SSR: Math.max(Math.round(total * 0.03), 1),
    SR: Math.round(total * 0.12),
    R: Math.round(total * 0.25)
  };
  // N gets the rest

  // Re-score all cards and sort
  var scored = allCards.map(function(card, i) {
    var docs = chapterDocs[card.chapter];
    var zhPoints = extractKnowledgePoints(docs.zh.content);
    var point = zhPoints.filter(function(p) { return p.heading === card.name.zh; })[0];
    var versionMeta = meta.versions[card.chapter];
    return { card: card, score: point ? scoreRarity(point, versionMeta) : 0, index: i };
  });
  scored.sort(function(a, b) { return b.score - a.score; });

  // Assign rarity by rank
  var ssrCount = 0, srCount = 0, rCount = 0;
  scored.forEach(function(item) {
    if (ssrCount < targets.SSR) {
      item.card.rarity = 'SSR';
      ssrCount++;
    } else if (srCount < targets.SR) {
      item.card.rarity = 'SR';
      srCount++;
    } else if (rCount < targets.R) {
      item.card.rarity = 'R';
      rCount++;
    } else {
      item.card.rarity = 'N';
    }
    // Regenerate power/defense for updated rarity
    var stats = generatePowerDefense(item.card.rarity);
    item.card.power = stats.power;
    item.card.defense = stats.defense;
  });

  console.log('Total cards: ' + allCards.length);
  console.log('Distribution: SSR=' + ssrCount + ' SR=' + srCount + ' R=' + rCount + ' N=' + (total - ssrCount - srCount - rCount));
```

- [ ] **Step 3: Run and verify card generation**

Run: `node scripts/build-game-data.js`

Expected: 150-200 total cards with distribution roughly matching N:60% R:25% SR:12% SSR:3%. Each card should have all required fields (id, name with 3 locales, desc, rarity, region, chapter, tags, power, defense).

- [ ] **Step 4: Commit**

```bash
git add scripts/build-game-data.js
git commit -m "feat(game): add card generation with rarity scoring and distribution"
```

---

## Task 4: Question Generation Engine

**Files:**
- Modify: `scripts/build-game-data.js`

Generate quiz questions for each stage (chapter). Each stage gets 3-5 questions across 3 difficulty levels. Questions are multiple-choice with distractors drawn from sibling chapters in the same region.

- [ ] **Step 1: Add question generation functions**

Add after the card generation code (but before `main()`):

```js
// --- Question Generation ---

function generateQuestions(verId, zhPoints, enPoints, jaPoints, regionCards) {
  var questions = [];
  var questionIndex = 0;

  // Strategy: generate 1 question per major knowledge point, up to 5
  var pointsToUse = zhPoints.slice(0, 5);

  pointsToUse.forEach(function(zhPoint, pIdx) {
    var enPoint = enPoints[pIdx] || null;
    var jaPoint = jaPoints[pIdx] || null;

    // Determine difficulty based on content complexity
    var difficulty;
    if (zhPoint.hasCode && zhPoint.boldTerms.length > 2) {
      difficulty = 3; // judgment
    } else if (zhPoint.hasCode || zhPoint.boldTerms.length > 1) {
      difficulty = 2; // application
    } else {
      difficulty = 1; // concept
    }

    // Generate a concept question from the heading + bold terms
    var question = makeChoiceQuestion(
      verId, questionIndex, difficulty,
      zhPoint, enPoint, jaPoint,
      regionCards
    );

    if (question) {
      questions.push(question);
      questionIndex++;
    }
  });

  // Ensure at least 3 questions (pad with concept questions from remaining points)
  var remaining = zhPoints.slice(5);
  var rIdx = 0;
  while (questions.length < 3 && rIdx < remaining.length) {
    var extraPoint = remaining[rIdx];
    var extraEn = enPoints[5 + rIdx] || null;
    var extraJa = jaPoints[5 + rIdx] || null;
    var q = makeChoiceQuestion(verId, questionIndex, 1, extraPoint, extraEn, extraJa, regionCards);
    if (q) {
      questions.push(q);
      questionIndex++;
    }
    rIdx++;
  }

  // Ensure difficulty spread: at least 1 concept (d=1) question
  var hasConcept = questions.some(function(q) { return q.difficulty === 1; });
  if (!hasConcept && questions.length > 0) {
    questions[0].difficulty = 1;
  }

  return questions;
}

function makeChoiceQuestion(verId, qIdx, difficulty, zhPoint, enPoint, jaPoint, regionCards) {
  if (!zhPoint || !zhPoint.heading) return null;

  var padded = String(qIdx + 1);
  while (padded.length < 3) padded = '0' + padded;
  var qId = 'q_' + verId + '_' + padded;

  // The correct answer is derived from the knowledge point's heading/description
  var correctText = {
    zh: zhPoint.heading,
    en: enPoint ? enPoint.heading : zhPoint.heading,
    ja: jaPoint ? jaPoint.heading : zhPoint.heading
  };

  // Generate stem (question text) asking about this concept
  var stem = generateStem(difficulty, zhPoint, enPoint, jaPoint);

  // Generate distractors from other cards in the region
  var distractors = pickDistractors(correctText, regionCards, 3);

  // Build options (correct + 3 distractors), shuffled
  var options = [{ id: 'a', text: correctText, correct: true }]
    .concat(distractors.map(function(d, i) {
      return { id: String.fromCharCode(98 + i), text: d, correct: false };
    }));

  // Shuffle options
  for (var i = options.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = options[i];
    options[i] = options[j];
    options[j] = temp;
  }

  // Find correct answer id after shuffle
  var answerId = 'a';
  for (var k = 0; k < options.length; k++) {
    if (options[k].correct) {
      answerId = options[k].id;
      break;
    }
  }

  // Clean up: remove correct flag from options
  var cleanOptions = options.map(function(o) {
    return { id: o.id, text: o.text };
  });

  // Generate explanation
  var explanation = {
    zh: zhPoint.boldTerms.length > 0 ? zhPoint.boldTerms[0] : zhPoint.heading,
    en: enPoint ? (enPoint.boldTerms.length > 0 ? enPoint.boldTerms[0] : enPoint.heading) : correctText.en,
    ja: jaPoint ? (jaPoint.boldTerms.length > 0 ? jaPoint.boldTerms[0] : jaPoint.heading) : correctText.ja
  };

  // Find matching card for reward
  var rewardCard = null;
  for (var c = 0; c < regionCards.length; c++) {
    if (regionCards[c].chapter === verId && regionCards[c].name.zh === zhPoint.heading) {
      rewardCard = regionCards[c].id;
      break;
    }
  }

  return {
    id: qId,
    type: 'choice',
    difficulty: difficulty,
    stem: stem,
    options: cleanOptions,
    answer: answerId,
    explanation: explanation,
    reward_card: rewardCard
  };
}

function generateStem(difficulty, zhPoint, enPoint, jaPoint) {
  var heading = zhPoint.heading;

  if (difficulty === 1) {
    return {
      zh: '以下哪个概念与「' + heading + '」直接相关？',
      en: 'Which concept is directly related to "' + (enPoint ? enPoint.heading : heading) + '"?',
      ja: '「' + (jaPoint ? jaPoint.heading : heading) + '」に直接関連する概念はどれですか？'
    };
  } else if (difficulty === 2) {
    return {
      zh: '在 Claude Code 中，关于「' + heading + '」的正确理解是？',
      en: 'What is the correct understanding of "' + (enPoint ? enPoint.heading : heading) + '" in Claude Code?',
      ja: 'Claude Code における「' + (jaPoint ? jaPoint.heading : heading) + '」の正しい理解はどれですか？'
    };
  } else {
    return {
      zh: '以下关于「' + heading + '」的说法，哪个是正确的？',
      en: 'Which statement about "' + (enPoint ? enPoint.heading : heading) + '" is correct?',
      ja: '「' + (jaPoint ? jaPoint.heading : heading) + '」について正しい説明はどれですか？'
    };
  }
}

function pickDistractors(correctText, regionCards, count) {
  var distractors = [];
  var used = {};
  used[correctText.zh] = true;

  // Shuffle regionCards to get random distractors
  var shuffled = regionCards.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  for (var k = 0; k < shuffled.length && distractors.length < count; k++) {
    var card = shuffled[k];
    if (!used[card.name.zh]) {
      used[card.name.zh] = true;
      distractors.push(card.name);
    }
  }

  // If not enough distractors from region, add generic ones
  var fallbacks = [
    { zh: '以上都不对', en: 'None of the above', ja: '上記のいずれでもない' },
    { zh: '这是一个无关的概念', en: 'This is an unrelated concept', ja: 'これは無関係な概念です' },
    { zh: '此功能尚未实现', en: 'This feature is not yet implemented', ja: 'この機能はまだ実装されていません' }
  ];
  var fIdx = 0;
  while (distractors.length < count && fIdx < fallbacks.length) {
    distractors.push(fallbacks[fIdx]);
    fIdx++;
  }

  return distractors;
}
```

- [ ] **Step 2: Run and verify no syntax errors**

Run: `node scripts/build-game-data.js`

Expected: Same output as before (no errors). The question functions are not yet called from main().

- [ ] **Step 3: Commit**

```bash
git add scripts/build-game-data.js
git commit -m "feat(game): add question generation engine with difficulty levels"
```

---

## Task 5: Stage Assembly + Output

**Files:**
- Modify: `scripts/build-game-data.js`

Wire up the question generation into stage assembly and write both output files.

- [ ] **Step 1: Add stage generation and file output to main()**

Add to the end of `main()`, after the card distribution code:

```js
  // --- Generate Stages ---
  console.log('\nGenerating stages...');
  var allStages = [];

  // Group cards by region for distractor picking
  var cardsByRegion = {};
  allCards.forEach(function(card) {
    if (!cardsByRegion[card.region]) cardsByRegion[card.region] = [];
    cardsByRegion[card.region].push(card);
  });

  allVersionIds.forEach(function(verId) {
    var docs = chapterDocs[verId];
    if (!docs || !docs.zh) return;

    var region = getRegion(verId);
    var versionMeta = meta.versions[verId];

    var zhPoints = extractKnowledgePoints(docs.zh.content);
    var enPoints = docs.en ? extractKnowledgePoints(docs.en.content) : [];
    var jaPoints = docs.ja ? extractKnowledgePoints(docs.ja.content) : [];

    var regionCards = cardsByRegion[region] || [];
    var questions = generateQuestions(verId, zhPoints, enPoints, jaPoints, regionCards);

    // Find reward cards for this stage (cards from this chapter)
    var stageCards = allCards
      .filter(function(c) { return c.chapter === verId; })
      .slice(0, 3)
      .map(function(c) { return c.id; });

    var stage = {
      id: 'stage_' + verId,
      chapter: verId,
      region: region,
      title: {
        zh: versionMeta && versionMeta.content && versionMeta.content.zh
          ? versionMeta.content.zh.subtitle || versionMeta.title
          : verId,
        en: versionMeta && versionMeta.content && versionMeta.content.en
          ? versionMeta.content.en.subtitle || versionMeta.title
          : verId,
        ja: versionMeta && versionMeta.content && versionMeta.content.ja
          ? versionMeta.content.ja.subtitle || versionMeta.title
          : verId
      },
      questions: questions,
      star_thresholds: [0.4, 0.7, 1.0],
      reward_cards: stageCards
    };

    allStages.push(stage);
  });

  console.log('Total stages: ' + allStages.length);

  // --- Question stats ---
  var totalQ = 0;
  var diffCounts = { 1: 0, 2: 0, 3: 0 };
  allStages.forEach(function(s) {
    totalQ += s.questions.length;
    s.questions.forEach(function(q) { diffCounts[q.difficulty]++; });
  });
  console.log('Total questions: ' + totalQ);
  console.log('Difficulty spread: concept=' + diffCounts[1] + ' application=' + diffCounts[2] + ' judgment=' + diffCounts[3]);

  // --- Write output files ---
  console.log('\nWriting output files...');
  writeJSModule(CARDS_OUTPUT, { cards: allCards });
  writeJSModule(STAGES_OUTPUT, { stages: allStages });

  console.log('\n=== Done! ===');
```

- [ ] **Step 2: Run and verify full pipeline**

Run: `node scripts/build-game-data.js`

Expected output (approximate):
```
Loading meta.js...
Loading chapter docs...
Loaded docs for 26 chapters

=== Build Game Data ===

Chapters: 26
Locales: zh, en, ja

Generating cards...
Total cards: ~150-200
Distribution: SSR=~5 SR=~20 R=~40 N=~rest

Generating stages...
Total stages: 26
Total questions: ~100-130
Difficulty spread: concept=~40 application=~50 judgment=~30

Writing output files...
  -> miniprogram/data/game-cards.js (~40 KB)
  -> miniprogram/subpkg-chapters/data/game-stages.js (~80 KB)

=== Done! ===
```

- [ ] **Step 3: Spot-check output data quality**

Manually inspect the generated files:
- Open `miniprogram/data/game-cards.js` and verify:
  - Each card has all required fields
  - Trilingual names are present (not all identical unless en/ja docs are missing)
  - SSR cards are for important concepts (Agent Loop, Tool Use, etc.)
  - Tags are relevant
- Open `miniprogram/subpkg-chapters/data/game-stages.js` and verify:
  - Each stage has 3-5 questions
  - Questions have 4 options each
  - Answers are valid option IDs
  - Explanations make sense

- [ ] **Step 4: Commit**

```bash
git add scripts/build-game-data.js miniprogram/data/game-cards.js miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(game): complete build pipeline - generate cards and stages from chapter content"
```

---

## Task 6: Deterministic Output + Polish

**Files:**
- Modify: `scripts/build-game-data.js`

The current script uses `Math.random()` for power/defense values and option shuffling, which means the output changes on every run. Fix this with a seeded PRNG for reproducible builds.

- [ ] **Step 1: Add seeded PRNG and replace all Math.random() calls**

Add after the `writeJSModule` function:

```js
// --- Seeded PRNG (Mulberry32) for deterministic output ---
function createRng(seed) {
  var state = seed | 0;
  return function() {
    state = (state + 0x6D2B79F5) | 0;
    var t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

var rng = createRng(20260421);
```

Then replace every `Math.random()` in the file with `rng()` and every `Math.floor(Math.random() * ...)` with `Math.floor(rng() * ...)`. There are 3 locations:
1. `generatePowerDefense()`: `Math.floor(Math.random() * 15)` → `Math.floor(rng() * 15)`
2. Shuffle in `makeChoiceQuestion()`: `Math.floor(Math.random() * (i + 1))` → `Math.floor(rng() * (i + 1))`
3. Shuffle in `pickDistractors()`: `Math.floor(Math.random() * (i + 1))` → `Math.floor(rng() * (i + 1))`

- [ ] **Step 2: Run twice and verify identical output**

```bash
node scripts/build-game-data.js
cp miniprogram/data/game-cards.js /tmp/cards1.js
node scripts/build-game-data.js
diff miniprogram/data/game-cards.js /tmp/cards1.js
```

Expected: `diff` shows no differences.

- [ ] **Step 3: Add summary banner at script end**

Add just before `console.log('\n=== Done! ===');`:

```js
  // Summary
  console.log('\n--- Summary ---');
  console.log('Cards: ' + allCards.length + ' (SSR:' + ssrCount + ' SR:' + srCount + ' R:' + rCount + ' N:' + (total - ssrCount - srCount - rCount) + ')');
  console.log('Stages: ' + allStages.length + ' (' + totalQ + ' questions)');
  var regionSummary = Object.keys(REGION_MAP).map(function(r) {
    var cards = (cardsByRegion[r] || []).length;
    var stages = allStages.filter(function(s) { return s.region === r; }).length;
    return r + ':' + cards + 'c/' + stages + 's';
  }).join(' | ');
  console.log('Regions: ' + regionSummary);
```

- [ ] **Step 4: Final run and commit**

Run: `node scripts/build-game-data.js`

Verify clean output, then commit all files:

```bash
git add scripts/build-game-data.js miniprogram/data/game-cards.js miniprogram/subpkg-chapters/data/game-stages.js
git commit -m "feat(game): deterministic PRNG + summary output for build-game-data"
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `node scripts/build-game-data.js` runs without errors
- [ ] `miniprogram/data/game-cards.js` exists and contains ~150-200 cards
- [ ] `miniprogram/subpkg-chapters/data/game-stages.js` exists and contains 26 stages
- [ ] Each card has: id, name (3 locales), desc (3 locales), rarity, region, chapter, tags, power, defense
- [ ] Rarity distribution: N ~60%, R ~25%, SR ~12%, SSR ~3%
- [ ] Each stage has 3-5 questions with difficulty levels 1-3
- [ ] Each question has 4 options, a valid answer ID, and an explanation
- [ ] Running the script twice produces identical output (deterministic)
- [ ] `game-cards.js` file size is under 60KB
- [ ] `game-stages.js` file size is under 120KB
