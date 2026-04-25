# Phase 2: 游戏引擎 (Utils Layer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement pure JS game engine modules that handle stage gameplay, player save data, card collection, daily challenges, and achievement detection — all without touching any UI.

**Architecture:** Five independent CommonJS modules in `miniprogram/utils/`, each with a single responsibility. They share state through a central save manager (`game-save.js`) that wraps `wx.setStorageSync`. No external dependencies. Game data from Phase 1 (`game-cards.js`, `game-stages.js`) is loaded via `require()`.

**Tech Stack:** Native WeChat miniprogram JS (ES6 limited: no async/await, no optional chaining, no spread operator). CommonJS modules.

**Design spec:** `docs/superpowers/specs/2026-04-21-gamification-redesign-design.md` Sections 1, 3, 4.

**Phase 1 outputs used:**
- `miniprogram/data/game-cards.js` — `{ cards: [{ id, name, desc, rarity, region, chapter, tags, power, defense }] }`
- `miniprogram/subpkg-chapters/data/game-stages.js` — `{ stages: [{ id, chapter, region, title, questions, star_thresholds, reward_cards }] }`
- Question: `{ id, type, difficulty, stem, options, answer, explanation, reward_card }`

---

## File Structure

| File | Responsibility |
|------|----------------|
| `miniprogram/utils/game-save.js` | Player save CRUD: load/save/reset game state from wx.StorageSync |
| `miniprogram/utils/game-engine.js` | Stage gameplay: run a stage's 3-phase question flow, score, award stars |
| `miniprogram/utils/game-cards.js` | Card collection: obtain/upgrade cards, query collection, compute stats |
| `miniprogram/utils/game-daily.js` | Daily challenge: pick random questions, track completion, manage streaks |
| `miniprogram/utils/game-achievement.js` | Achievement detection: check unlock conditions, list all achievements |

Dependencies between modules:
```
game-engine.js ──→ game-save.js
game-cards.js  ──→ game-save.js
game-daily.js  ──→ game-save.js, game-engine.js
game-achievement.js ──→ game-save.js
```

All modules are consumed by Page JS files in Phase 3 (not this phase).

---

## Task 1: Game Save Manager

**Files:**
- Create: `miniprogram/utils/game-save.js`

The central state module. All other game modules depend on it. Stores a single `game_save` key in wx.StorageSync.

- [ ] **Step 1: Create game-save.js**

```js
// utils/game-save.js
var SAVE_KEY = 'game_save';

function _defaultSave() {
  return {
    level: 1,
    exp: 0,
    streak: { current: 0, best: 0, lastDate: null, shields: 0 },
    stages: {},
    cards: {},
    achievements: [],
    review: [],
    dailyChallenge: { date: null, completed: false, score: 0 }
  };
}

function load() {
  var save = wx.getStorageSync(SAVE_KEY);
  if (!save) {
    save = _defaultSave();
    wx.setStorageSync(SAVE_KEY, save);
  }
  return save;
}

function save(data) {
  wx.setStorageSync(SAVE_KEY, data);
}

function reset() {
  var fresh = _defaultSave();
  wx.setStorageSync(SAVE_KEY, fresh);
  return fresh;
}

function update(patchFn) {
  var data = load();
  patchFn(data);
  save(data);
  return data;
}

// --- Exp & Level ---
var LEVEL_THRESHOLDS = [
  { level: 1, exp: 0, title: 'guest' },
  { level: 2, exp: 80, title: 'guest' },
  { level: 3, exp: 200, title: 'user' },
  { level: 4, exp: 350, title: 'user' },
  { level: 5, exp: 500, title: 'dev' },
  { level: 6, exp: 700, title: 'dev' },
  { level: 7, exp: 950, title: 'dev' },
  { level: 8, exp: 1200, title: 'admin' },
  { level: 9, exp: 1600, title: 'admin' },
  { level: 10, exp: 2000, title: 'root' }
];

function addExp(amount) {
  return update(function(data) {
    data.exp += amount;
    // Recalculate level
    var newLevel = 1;
    for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (data.exp >= LEVEL_THRESHOLDS[i].exp) {
        newLevel = LEVEL_THRESHOLDS[i].level;
        break;
      }
    }
    data.level = newLevel;
  });
}

function getLevelInfo() {
  var data = load();
  var current = LEVEL_THRESHOLDS[0];
  var next = LEVEL_THRESHOLDS[1];
  for (var i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (data.exp >= LEVEL_THRESHOLDS[i].exp) {
      current = LEVEL_THRESHOLDS[i];
      next = LEVEL_THRESHOLDS[i + 1] || null;
      break;
    }
  }
  return {
    level: current.level,
    title: current.title,
    exp: data.exp,
    nextLevelExp: next ? next.exp : null,
    progress: next ? (data.exp - current.exp) / (next.exp - current.exp) : 1
  };
}

// --- Date helpers ---
function _today() {
  var d = new Date();
  var y = d.getFullYear();
  var m = String(d.getMonth() + 1);
  if (m.length < 2) m = '0' + m;
  var day = String(d.getDate());
  if (day.length < 2) day = '0' + day;
  return y + '-' + m + '-' + day;
}

function _daysBetween(dateStr1, dateStr2) {
  if (!dateStr1 || !dateStr2) return Infinity;
  var d1 = new Date(dateStr1 + 'T00:00:00');
  var d2 = new Date(dateStr2 + 'T00:00:00');
  return Math.round(Math.abs(d2 - d1) / 86400000);
}

module.exports = {
  load: load,
  save: save,
  reset: reset,
  update: update,
  addExp: addExp,
  getLevelInfo: getLevelInfo,
  LEVEL_THRESHOLDS: LEVEL_THRESHOLDS,
  _today: _today,
  _daysBetween: _daysBetween
};
```

- [ ] **Step 2: Verify in devtools console**

Open WeChat DevTools, go to Console, run:
```js
var gs = require('./utils/game-save.js');
var save = gs.load();
console.log('Initial save:', JSON.stringify(save));
gs.addExp(250);
console.log('After 250 exp:', JSON.stringify(gs.getLevelInfo()));
gs.reset();
console.log('After reset:', JSON.stringify(gs.load()));
```

Expected: Initial save has level=1, after 250 exp level=3 title='user', after reset back to level=1.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-save.js
git commit -m "feat(game): add game save manager with exp/level system"
```

---

## Task 2: Game Engine (Stage Gameplay)

**Files:**
- Create: `miniprogram/utils/game-engine.js`

Implements the Brilliant-style "ask first, teach later" 3-phase flow for a single stage.

- [ ] **Step 1: Create game-engine.js**

```js
// utils/game-engine.js
var gameSave = require('./game-save');

// --- Stage Session ---
// A session tracks the state of playing through one stage

function createSession(stage) {
  return {
    stageId: stage.id,
    chapter: stage.chapter,
    region: stage.region,
    questions: stage.questions.slice(),
    starThresholds: stage.star_thresholds,
    rewardCards: stage.reward_cards,
    phase: 1,             // 1=challenge, 2=review, 3=confirm
    currentIndex: 0,
    answers: {},           // { questionId: { chosen: 'a', correct: boolean } }
    wrongIds: [],          // question IDs answered wrong in phase 1
    confirmAnswers: {},    // phase 3 re-answers
    finished: false
  };
}

// --- Phase 1: Challenge (Ask First) ---
function getCurrentQuestion(session) {
  if (session.finished) return null;

  if (session.phase === 1 || session.phase === 2) {
    if (session.currentIndex >= session.questions.length) return null;
    return session.questions[session.currentIndex];
  }

  // Phase 3: re-ask wrong questions
  if (session.phase === 3) {
    if (session.currentIndex >= session.wrongIds.length) return null;
    var wrongId = session.wrongIds[session.currentIndex];
    for (var i = 0; i < session.questions.length; i++) {
      if (session.questions[i].id === wrongId) return session.questions[i];
    }
    return null;
  }

  return null;
}

function submitAnswer(session, questionId, chosenOptionId) {
  var question = null;
  for (var i = 0; i < session.questions.length; i++) {
    if (session.questions[i].id === questionId) {
      question = session.questions[i];
      break;
    }
  }
  if (!question) return null;

  var isCorrect = chosenOptionId === question.answer;

  if (session.phase === 1) {
    session.answers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    if (!isCorrect) {
      session.wrongIds.push(questionId);
    }
    session.currentIndex++;

    // Check if phase 1 is complete
    if (session.currentIndex >= session.questions.length) {
      session.phase = 2;
      session.currentIndex = 0;
    }
  } else if (session.phase === 3) {
    session.confirmAnswers[questionId] = { chosen: chosenOptionId, correct: isCorrect };
    session.currentIndex++;

    if (session.currentIndex >= session.wrongIds.length) {
      session.finished = true;
    }
  }

  return {
    correct: isCorrect,
    answer: question.answer,
    explanation: question.explanation
  };
}

// --- Phase 2: Teach (Review) ---
// Phase 2 is purely informational — the UI shows knowledge cards
// based on phase 1 results. No logic needed here, just a phase transition.
function completeReviewPhase(session) {
  if (session.phase !== 2) return;

  if (session.wrongIds.length === 0) {
    // No wrong answers, skip phase 3
    session.finished = true;
  } else {
    session.phase = 3;
    session.currentIndex = 0;
  }
}

// --- Scoring ---
function getSessionResult(session) {
  var totalQuestions = session.questions.length;
  var correctInPhase1 = 0;
  var keys = Object.keys(session.answers);
  for (var i = 0; i < keys.length; i++) {
    if (session.answers[keys[i]].correct) correctInPhase1++;
  }

  var ratio = totalQuestions > 0 ? correctInPhase1 / totalQuestions : 0;

  var stars = 0;
  if (ratio >= session.starThresholds[2]) stars = 3;
  else if (ratio >= session.starThresholds[1]) stars = 2;
  else if (ratio >= session.starThresholds[0]) stars = 1;

  // Cards to collect based on stars
  var earnedCards = [];
  if (stars >= 1 && session.rewardCards.length > 0) earnedCards.push(session.rewardCards[0]);
  if (stars >= 2 && session.rewardCards.length > 1) earnedCards.push(session.rewardCards[1]);
  if (stars >= 3 && session.rewardCards.length > 2) earnedCards.push(session.rewardCards[2]);

  // Exp reward
  var expReward = stars === 3 ? 100 : stars === 2 ? 60 : stars === 1 ? 30 : 10;

  // Questions still wrong after phase 3 → review queue
  var reviewIds = [];
  for (var j = 0; j < session.wrongIds.length; j++) {
    var wId = session.wrongIds[j];
    if (!session.confirmAnswers[wId] || !session.confirmAnswers[wId].correct) {
      reviewIds.push(wId);
    }
  }

  return {
    stageId: session.stageId,
    stars: stars,
    correctCount: correctInPhase1,
    totalQuestions: totalQuestions,
    ratio: ratio,
    earnedCards: earnedCards,
    expReward: expReward,
    reviewIds: reviewIds
  };
}

// --- Persist Results ---
function saveStageResult(result) {
  gameSave.update(function(data) {
    // Update stage record (keep best)
    var prev = data.stages[result.stageId];
    if (!prev || result.stars > prev.stars) {
      data.stages[result.stageId] = {
        stars: result.stars,
        bestScore: result.correctCount,
        attempts: prev ? prev.attempts + 1 : 1
      };
    } else {
      data.stages[result.stageId].attempts = (prev.attempts || 0) + 1;
    }

    // Add review items
    result.reviewIds.forEach(function(qId) {
      if (data.review.indexOf(qId) === -1) {
        data.review.push(qId);
      }
    });
  });

  // Add exp (triggers level recalc)
  gameSave.addExp(result.expReward);
}

// --- Query Helpers ---
function getStageProgress(stageId) {
  var data = gameSave.load();
  return data.stages[stageId] || null;
}

function getRegionProgress(regionStageIds) {
  var data = gameSave.load();
  var cleared = 0;
  var totalStars = 0;
  regionStageIds.forEach(function(sId) {
    var s = data.stages[sId];
    if (s && s.stars > 0) {
      cleared++;
      totalStars += s.stars;
    }
  });
  return {
    cleared: cleared,
    total: regionStageIds.length,
    totalStars: totalStars,
    ratio: regionStageIds.length > 0 ? cleared / regionStageIds.length : 0
  };
}

function isRegionUnlocked(region, allStages) {
  var data = gameSave.load();
  var unlockRules = {
    core: { requires: null, count: 0 },
    tools: { requires: 'core', count: 4 },
    runtime: { requires: 'tools', count: 3 },
    network: { requires: 'runtime', count: 2 },
    practice: { requires: null, count: 0, specialRule: 'any3regions' }
  };

  var rule = unlockRules[region];
  if (!rule) return false;

  // Core is always open
  if (!rule.requires && !rule.specialRule) return true;

  // Practice: any 3 regions cleared
  if (rule.specialRule === 'any3regions') {
    var regionsClear = 0;
    var regions = ['core', 'tools', 'runtime', 'network'];
    regions.forEach(function(r) {
      var rStages = allStages.filter(function(s) { return s.region === r; });
      var cleared = 0;
      rStages.forEach(function(s) {
        var rec = data.stages[s.id];
        if (rec && rec.stars > 0) cleared++;
      });
      if (cleared >= Math.ceil(rStages.length * 0.5)) regionsClear++;
    });
    return regionsClear >= 3;
  }

  // Normal rule: N stages cleared in required region
  var reqStages = allStages.filter(function(s) { return s.region === rule.requires; });
  var cleared = 0;
  reqStages.forEach(function(s) {
    var rec = data.stages[s.id];
    if (rec && rec.stars > 0) cleared++;
  });
  return cleared >= rule.count;
}

module.exports = {
  createSession: createSession,
  getCurrentQuestion: getCurrentQuestion,
  submitAnswer: submitAnswer,
  completeReviewPhase: completeReviewPhase,
  getSessionResult: getSessionResult,
  saveStageResult: saveStageResult,
  getStageProgress: getStageProgress,
  getRegionProgress: getRegionProgress,
  isRegionUnlocked: isRegionUnlocked
};
```

- [ ] **Step 2: Verify no syntax errors**

In WeChat DevTools Console:
```js
var ge = require('./utils/game-engine.js');
console.log('Exports:', Object.keys(ge).join(', '));
```

Expected: All 9 function names listed.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-engine.js
git commit -m "feat(game): add game engine with 3-phase stage gameplay"
```

---

## Task 3: Card Collection Manager

**Files:**
- Create: `miniprogram/utils/game-cards.js`

Note: This file name is different from the data file `miniprogram/data/game-cards.js`. This is the logic module for card collection management.

- [ ] **Step 1: Create game-cards.js**

```js
// utils/game-cards.js
var gameSave = require('./game-save');
var cardData = require('../data/game-cards');

var _cardsById = {};
cardData.cards.forEach(function(card) {
  _cardsById[card.id] = card;
});

// --- Obtain Cards ---
function obtainCards(cardIds) {
  var newCards = [];
  gameSave.update(function(data) {
    cardIds.forEach(function(id) {
      if (!data.cards[id]) {
        data.cards[id] = { obtained: true, upgraded: false, obtainedAt: Date.now() };
        newCards.push(id);
      }
    });
  });

  // Award bonus exp for first-time SR/SSR
  newCards.forEach(function(id) {
    var card = _cardsById[id];
    if (card && (card.rarity === 'SR' || card.rarity === 'SSR')) {
      gameSave.addExp(50);
    }
  });

  return newCards;
}

// --- Upgrade Card ---
function upgradeCard(cardId) {
  var card = _cardsById[cardId];
  if (!card) return false;

  var data = gameSave.load();
  if (!data.cards[cardId] || !data.cards[cardId].obtained) return false;
  if (data.cards[cardId].upgraded) return false;

  gameSave.update(function(d) {
    d.cards[cardId].upgraded = true;
  });
  return true;
}

// --- Query ---
function getCard(cardId) {
  return _cardsById[cardId] || null;
}

function isObtained(cardId) {
  var data = gameSave.load();
  return !!(data.cards[cardId] && data.cards[cardId].obtained);
}

function getCollectionStats() {
  var data = gameSave.load();
  var total = cardData.cards.length;
  var obtained = Object.keys(data.cards).length;

  var byRegion = {};
  var byRarity = { N: { total: 0, obtained: 0 }, R: { total: 0, obtained: 0 }, SR: { total: 0, obtained: 0 }, SSR: { total: 0, obtained: 0 } };

  cardData.cards.forEach(function(card) {
    if (!byRegion[card.region]) {
      byRegion[card.region] = { total: 0, obtained: 0 };
    }
    byRegion[card.region].total++;
    byRarity[card.rarity].total++;

    if (data.cards[card.id]) {
      byRegion[card.region].obtained++;
      byRarity[card.rarity].obtained++;
    }
  });

  return {
    total: total,
    obtained: obtained,
    ratio: total > 0 ? obtained / total : 0,
    byRegion: byRegion,
    byRarity: byRarity
  };
}

function getCardsByRegion(region) {
  var data = gameSave.load();
  return cardData.cards
    .filter(function(c) { return c.region === region; })
    .map(function(c) {
      var saveEntry = data.cards[c.id];
      return {
        id: c.id,
        name: c.name,
        desc: c.desc,
        rarity: c.rarity,
        region: c.region,
        chapter: c.chapter,
        tags: c.tags,
        power: c.power,
        defense: c.defense,
        obtained: !!(saveEntry && saveEntry.obtained),
        upgraded: !!(saveEntry && saveEntry.upgraded)
      };
    });
}

function getAllCards() {
  var data = gameSave.load();
  return cardData.cards.map(function(c) {
    var saveEntry = data.cards[c.id];
    return {
      id: c.id,
      name: c.name,
      rarity: c.rarity,
      region: c.region,
      obtained: !!(saveEntry && saveEntry.obtained),
      upgraded: !!(saveEntry && saveEntry.upgraded)
    };
  });
}

module.exports = {
  obtainCards: obtainCards,
  upgradeCard: upgradeCard,
  getCard: getCard,
  isObtained: isObtained,
  getCollectionStats: getCollectionStats,
  getCardsByRegion: getCardsByRegion,
  getAllCards: getAllCards
};
```

- [ ] **Step 2: Verify no syntax errors**

In WeChat DevTools Console:
```js
var gc = require('./utils/game-cards.js');
console.log('Exports:', Object.keys(gc).join(', '));
var stats = gc.getCollectionStats();
console.log('Total cards:', stats.total, 'Obtained:', stats.obtained);
```

Expected: 630 total, 0 obtained.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-cards.js
git commit -m "feat(game): add card collection manager"
```

---

## Task 4: Daily Challenge System

**Files:**
- Create: `miniprogram/utils/game-daily.js`

- [ ] **Step 1: Create game-daily.js**

```js
// utils/game-daily.js
var gameSave = require('./game-save');
var stageData = require('../subpkg-chapters/data/game-stages');

// --- Seeded daily random ---
function _dailySeed() {
  var today = gameSave._today();
  var hash = 0;
  for (var i = 0; i < today.length; i++) {
    hash = ((hash << 5) - hash + today.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function _seededRandom(seed) {
  var state = seed | 0;
  return function() {
    state = (state + 0x6D2B79F5) | 0;
    var t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// --- Pick 3 random questions for today ---
function getDailyQuestions() {
  var allQuestions = [];
  stageData.stages.forEach(function(stage) {
    stage.questions.forEach(function(q) {
      allQuestions.push(q);
    });
  });

  var rng = _seededRandom(_dailySeed());
  var shuffled = allQuestions.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(rng() * (i + 1));
    var temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }

  return shuffled.slice(0, 3);
}

// --- Daily state ---
function getDailyState() {
  var data = gameSave.load();
  var today = gameSave._today();

  if (data.dailyChallenge.date !== today) {
    // New day — reset daily challenge
    gameSave.update(function(d) {
      d.dailyChallenge = { date: today, completed: false, score: 0 };
    });
    return { date: today, completed: false, score: 0 };
  }

  return data.dailyChallenge;
}

function completeDailyChallenge(correctCount) {
  var today = gameSave._today();
  gameSave.update(function(data) {
    data.dailyChallenge = { date: today, completed: true, score: correctCount };
  });

  // Award exp
  gameSave.addExp(20);

  // Update streak
  _updateStreak();

  return { expAwarded: 20, allCorrect: correctCount === 3 };
}

// --- Streak ---
function _updateStreak() {
  var today = gameSave._today();
  gameSave.update(function(data) {
    var streak = data.streak;
    var daysSince = gameSave._daysBetween(streak.lastDate, today);

    if (daysSince === 0) {
      // Already updated today, skip
      return;
    } else if (daysSince === 1) {
      // Consecutive day
      streak.current++;
    } else if (daysSince === 2 && streak.shields > 0) {
      // Missed 1 day but have shield
      streak.shields--;
      streak.current++;
    } else {
      // Streak broken — degrade, not reset
      if (streak.current >= 30) {
        streak.current = 15;
      } else if (streak.current >= 7) {
        streak.current = 3;
      } else {
        streak.current = 0;
      }
      streak.current++;  // Today counts as day 1
    }

    // Update best
    if (streak.current > streak.best) {
      streak.best = streak.current;
    }

    // Award shield every 7 days
    if (streak.current > 0 && streak.current % 7 === 0) {
      streak.shields++;
    }

    streak.lastDate = today;
  });
}

function getStreakInfo() {
  var data = gameSave.load();
  return {
    current: data.streak.current,
    best: data.streak.best,
    shields: data.streak.shields,
    lastDate: data.streak.lastDate
  };
}

module.exports = {
  getDailyQuestions: getDailyQuestions,
  getDailyState: getDailyState,
  completeDailyChallenge: completeDailyChallenge,
  getStreakInfo: getStreakInfo
};
```

- [ ] **Step 2: Verify no syntax errors**

In WeChat DevTools Console:
```js
var gd = require('./utils/game-daily.js');
console.log('Exports:', Object.keys(gd).join(', '));
var questions = gd.getDailyQuestions();
console.log('Daily questions:', questions.length, questions.map(function(q){return q.id;}));
var state = gd.getDailyState();
console.log('Daily state:', JSON.stringify(state));
```

Expected: 3 questions returned, daily state shows today's date and completed=false.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-daily.js
git commit -m "feat(game): add daily challenge system with streak tracking"
```

---

## Task 5: Achievement System

**Files:**
- Create: `miniprogram/utils/game-achievement.js`

- [ ] **Step 1: Create game-achievement.js**

```js
// utils/game-achievement.js
var gameSave = require('./game-save');

// --- Achievement Definitions ---
var ACHIEVEMENTS = [
  // Exploration
  { id: 'first_login', category: 'explore', icon: '>', name: { zh: '首次登录', en: 'First Login', ja: '初回ログイン' }, desc: { zh: '首次进入终端', en: 'Enter the terminal for the first time', ja: '初めてターミナルに入る' } },
  { id: 'core_clear', category: 'explore', icon: '>', name: { zh: '核心通关', en: 'Core Clear', ja: 'コアクリア' }, desc: { zh: '通关 CORE/ 区域', en: 'Clear CORE/ region', ja: 'CORE/リージョンをクリア' } },
  { id: 'tools_clear', category: 'explore', icon: '>', name: { zh: '工具通关', en: 'Tools Clear', ja: 'ツールクリア' }, desc: { zh: '通关 TOOLS/ 区域', en: 'Clear TOOLS/ region', ja: 'TOOLS/リージョンをクリア' } },
  { id: 'runtime_clear', category: 'explore', icon: '>', name: { zh: '运行时通关', en: 'Runtime Clear', ja: 'ランタイムクリア' }, desc: { zh: '通关 RUNTIME/ 区域', en: 'Clear RUNTIME/ region', ja: 'RUNTIME/リージョンをクリア' } },
  { id: 'network_clear', category: 'explore', icon: '>', name: { zh: '网络通关', en: 'Network Clear', ja: 'ネットワーククリア' }, desc: { zh: '通关 NETWORK/ 区域', en: 'Clear NETWORK/ region', ja: 'NETWORK/リージョンをクリア' } },
  { id: 'practice_clear', category: 'explore', icon: '>', name: { zh: '实战通关', en: 'Practice Clear', ja: 'プラクティスクリア' }, desc: { zh: '通关 PRACTICE/ 区域', en: 'Clear PRACTICE/ region', ja: 'PRACTICE/リージョンをクリア' } },
  { id: 'all_clear', category: 'explore', icon: '>', name: { zh: '全部通关', en: 'All Clear', ja: '全クリア' }, desc: { zh: '通关全部 5 个区域', en: 'Clear all 5 regions', ja: '全5リージョンをクリア' } },

  // Collection
  { id: 'cards_10', category: 'collect', icon: '$', name: { zh: '初级收集者', en: 'Novice Collector', ja: '初級コレクター' }, desc: { zh: '收集 10 张卡牌', en: 'Collect 10 cards', ja: 'カードを10枚集める' } },
  { id: 'cards_50', category: 'collect', icon: '$', name: { zh: '中级收集者', en: 'Collector', ja: '中級コレクター' }, desc: { zh: '收集 50 张卡牌', en: 'Collect 50 cards', ja: 'カードを50枚集める' } },
  { id: 'cards_100', category: 'collect', icon: '$', name: { zh: '高级收集者', en: 'Senior Collector', ja: '上級コレクター' }, desc: { zh: '收集 100 张卡牌', en: 'Collect 100 cards', ja: 'カードを100枚集める' } },
  { id: 'cards_300', category: 'collect', icon: '$', name: { zh: '大师收集者', en: 'Master Collector', ja: 'マスターコレクター' }, desc: { zh: '收集 300 张卡牌', en: 'Collect 300 cards', ja: 'カードを300枚集める' } },
  { id: 'full_set_core', category: 'collect', icon: '$', name: { zh: 'CORE 全收集', en: 'Full CORE Set', ja: 'COREフルセット' }, desc: { zh: '集齐 CORE/ 全部卡牌', en: 'Collect all CORE/ cards', ja: 'CORE/の全カードを集める' } },

  // Mastery
  { id: 'perfect_stage', category: 'mastery', icon: '#', name: { zh: '完美通关', en: 'Perfect Stage', ja: 'パーフェクトステージ' }, desc: { zh: '任意关卡 ⭐3 通关', en: 'Clear any stage with 3 stars', ja: '任意のステージを⭐3でクリア' } },
  { id: 'no_miss_10', category: 'mastery', icon: '#', name: { zh: '连续正确', en: 'No Miss', ja: 'ノーミス' }, desc: { zh: '累计连续 10 题不出错', en: '10 correct answers in a row', ja: '10問連続正解' } },
  { id: 'level_dev', category: 'mastery', icon: '#', name: { zh: '开发者', en: 'Developer', ja: 'デベロッパー' }, desc: { zh: '达到 dev 等级', en: 'Reach dev level', ja: 'devレベルに到達' } },
  { id: 'level_root', category: 'mastery', icon: '#', name: { zh: '超级管理员', en: 'Root Access', ja: 'ルートアクセス' }, desc: { zh: '达到 root 等级', en: 'Reach root level', ja: 'rootレベルに到達' } },

  // Persistence
  { id: 'streak_7', category: 'persist', icon: '!', name: { zh: '一周坚持', en: 'Week Streak', ja: '1週間連続' }, desc: { zh: '连续学习 7 天', en: '7-day learning streak', ja: '7日間連続学習' } },
  { id: 'streak_30', category: 'persist', icon: '!', name: { zh: '月度坚持', en: 'Month Streak', ja: '1ヶ月連続' }, desc: { zh: '连续学习 30 天', en: '30-day learning streak', ja: '30日間連続学習' } },
  { id: 'streak_100', category: 'persist', icon: '!', name: { zh: '百日坚持', en: 'Century Streak', ja: '100日連続' }, desc: { zh: '连续学习 100 天', en: '100-day learning streak', ja: '100日間連続学習' } },
  { id: 'daily_master', category: 'persist', icon: '!', name: { zh: '每日达人', en: 'Daily Master', ja: 'デイリーマスター' }, desc: { zh: '完成 30 次每日挑战', en: 'Complete 30 daily challenges', ja: 'デイリーチャレンジを30回完了' } }
];

// --- Region stage counts (for checking region clear) ---
var REGION_STAGES = {
  core: ['stage_s01','stage_s02','stage_s03','stage_s04','stage_s05','stage_s06'],
  tools: ['stage_s07','stage_s08','stage_s09','stage_s10','stage_s11'],
  runtime: ['stage_s12','stage_s13','stage_s14'],
  network: ['stage_s15','stage_s16','stage_s17','stage_s18','stage_s19'],
  practice: ['stage_bp01','stage_bp02','stage_bp03','stage_bp04','stage_bp05','stage_bp06','stage_bp07']
};

// --- Check & Unlock ---
function checkAndUnlock() {
  var data = gameSave.load();
  var newlyUnlocked = [];

  ACHIEVEMENTS.forEach(function(ach) {
    if (data.achievements.indexOf(ach.id) !== -1) return;

    var unlocked = _checkCondition(ach.id, data);
    if (unlocked) {
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    gameSave.update(function(d) {
      newlyUnlocked.forEach(function(ach) {
        if (d.achievements.indexOf(ach.id) === -1) {
          d.achievements.push(ach.id);
        }
      });
    });
  }

  return newlyUnlocked;
}

function _isRegionCleared(regionStageIds, stages) {
  var cleared = 0;
  regionStageIds.forEach(function(sId) {
    if (stages[sId] && stages[sId].stars > 0) cleared++;
  });
  return cleared >= Math.ceil(regionStageIds.length * 0.7);
}

function _checkCondition(achId, data) {
  var cardCount = Object.keys(data.cards).length;
  var stages = data.stages;

  switch (achId) {
    // Exploration
    case 'first_login': return true;
    case 'core_clear': return _isRegionCleared(REGION_STAGES.core, stages);
    case 'tools_clear': return _isRegionCleared(REGION_STAGES.tools, stages);
    case 'runtime_clear': return _isRegionCleared(REGION_STAGES.runtime, stages);
    case 'network_clear': return _isRegionCleared(REGION_STAGES.network, stages);
    case 'practice_clear': return _isRegionCleared(REGION_STAGES.practice, stages);
    case 'all_clear':
      return _isRegionCleared(REGION_STAGES.core, stages) &&
             _isRegionCleared(REGION_STAGES.tools, stages) &&
             _isRegionCleared(REGION_STAGES.runtime, stages) &&
             _isRegionCleared(REGION_STAGES.network, stages) &&
             _isRegionCleared(REGION_STAGES.practice, stages);

    // Collection
    case 'cards_10': return cardCount >= 10;
    case 'cards_50': return cardCount >= 50;
    case 'cards_100': return cardCount >= 100;
    case 'cards_300': return cardCount >= 300;
    case 'full_set_core':
      var coreCards = 0;
      Object.keys(data.cards).forEach(function(cId) {
        if (cId.indexOf('card_s01_') === 0 || cId.indexOf('card_s02_') === 0 ||
            cId.indexOf('card_s03_') === 0 || cId.indexOf('card_s04_') === 0 ||
            cId.indexOf('card_s05_') === 0 || cId.indexOf('card_s06_') === 0) {
          coreCards++;
        }
      });
      return coreCards >= 138; // core region has 138 cards

    // Mastery
    case 'perfect_stage':
      var stageKeys = Object.keys(stages);
      for (var i = 0; i < stageKeys.length; i++) {
        if (stages[stageKeys[i]].stars === 3) return true;
      }
      return false;
    case 'no_miss_10': return false; // tracked externally, checked on answer
    case 'level_dev': return data.level >= 5;
    case 'level_root': return data.level >= 10;

    // Persistence
    case 'streak_7': return data.streak.best >= 7;
    case 'streak_30': return data.streak.best >= 30;
    case 'streak_100': return data.streak.best >= 100;
    case 'daily_master': return false; // needs daily completion counter, tracked later

    default: return false;
  }
}

// --- Query ---
function getAllAchievements() {
  var data = gameSave.load();
  return ACHIEVEMENTS.map(function(ach) {
    return {
      id: ach.id,
      category: ach.category,
      icon: ach.icon,
      name: ach.name,
      desc: ach.desc,
      unlocked: data.achievements.indexOf(ach.id) !== -1
    };
  });
}

function getAchievementStats() {
  var data = gameSave.load();
  return {
    total: ACHIEVEMENTS.length,
    unlocked: data.achievements.length,
    ratio: ACHIEVEMENTS.length > 0 ? data.achievements.length / ACHIEVEMENTS.length : 0
  };
}

module.exports = {
  ACHIEVEMENTS: ACHIEVEMENTS,
  checkAndUnlock: checkAndUnlock,
  getAllAchievements: getAllAchievements,
  getAchievementStats: getAchievementStats
};
```

- [ ] **Step 2: Verify no syntax errors**

In WeChat DevTools Console:
```js
var ga = require('./utils/game-achievement.js');
console.log('Achievements defined:', ga.ACHIEVEMENTS.length);
var stats = ga.getAchievementStats();
console.log('Stats:', JSON.stringify(stats));
var unlocked = ga.checkAndUnlock();
console.log('Newly unlocked:', unlocked.map(function(a){return a.id;}));
```

Expected: 20 achievements defined, 0 unlocked initially, first_login unlocked on first check.

- [ ] **Step 3: Commit**

```bash
git add miniprogram/utils/game-achievement.js
git commit -m "feat(game): add achievement system with 20 achievements"
```

---

## Task 6: Integration Smoke Test

**Files:**
- No new files — verify all 5 modules work together

- [ ] **Step 1: Run integration test in DevTools console**

```js
// Load all modules
var gs = require('./utils/game-save.js');
var ge = require('./utils/game-engine.js');
var gc = require('./utils/game-cards.js');
var gd = require('./utils/game-daily.js');
var ga = require('./utils/game-achievement.js');

// Reset save
gs.reset();
console.log('1. Fresh save:', JSON.stringify(gs.load()));

// Check initial state
console.log('2. Level info:', JSON.stringify(gs.getLevelInfo()));
console.log('3. Collection:', JSON.stringify(gc.getCollectionStats()));
console.log('4. Daily state:', JSON.stringify(gd.getDailyState()));

// Simulate a stage play
var stageData = require('./subpkg-chapters/data/game-stages.js');
var stage = stageData.stages[0]; // s01
var session = ge.createSession(stage);
console.log('5. Session created for:', session.stageId);

// Answer all questions correctly in phase 1
var q;
while ((q = ge.getCurrentQuestion(session)) !== null && session.phase === 1) {
  ge.submitAnswer(session, q.id, q.answer);
}
console.log('6. Phase 1 done, wrong count:', session.wrongIds.length);

// Complete review phase
ge.completeReviewPhase(session);
console.log('7. Finished:', session.finished);

// Get result
var result = ge.getSessionResult(session);
console.log('8. Result:', JSON.stringify(result));

// Save and collect cards
ge.saveStageResult(result);
var newCards = gc.obtainCards(result.earnedCards);
console.log('9. New cards:', newCards);

// Check progress
console.log('10. Level after:', JSON.stringify(gs.getLevelInfo()));
console.log('11. Collection after:', JSON.stringify(gc.getCollectionStats()));

// Check achievements
var unlocked = ga.checkAndUnlock();
console.log('12. Achievements unlocked:', unlocked.map(function(a){return a.id;}));

// Daily challenge
var daily = gd.getDailyQuestions();
console.log('13. Daily questions:', daily.length);
gd.completeDailyChallenge(3);
console.log('14. Streak after daily:', JSON.stringify(gd.getStreakInfo()));

console.log('\n=== All modules working! ===');
```

Expected: All 14 checks output valid data, no errors. Cards obtained, exp gained, level increased, first_login achievement unlocked.

- [ ] **Step 2: Verify streak degradation logic**

```js
var gs = require('./utils/game-save.js');
// Manually set streak to test degradation
gs.update(function(d) {
  d.streak = { current: 8, best: 8, lastDate: '2026-04-18', shields: 1 };
});
// Simulate completing daily (3 days gap from Apr 18)
var gd = require('./utils/game-daily.js');
gd.completeDailyChallenge(2);
var info = gd.getStreakInfo();
console.log('Streak after 3-day gap (was 8):', info.current, '(expected: 4 = degraded to 3 + today)');
```

- [ ] **Step 3: Clean up and commit if any fixes were needed**

If no fixes needed, just verify git status is clean:
```bash
git status
```

---

## Verification Checklist

After all tasks are complete, verify:

- [ ] `miniprogram/utils/game-save.js` — load/save/reset/update/addExp/getLevelInfo all work
- [ ] `miniprogram/utils/game-engine.js` — 3-phase gameplay: challenge→review→confirm
- [ ] `miniprogram/utils/game-cards.js` — obtainCards/getCollectionStats/getCardsByRegion
- [ ] `miniprogram/utils/game-daily.js` — getDailyQuestions (3 questions, deterministic per day), streak
- [ ] `miniprogram/utils/game-achievement.js` — 20 achievements, checkAndUnlock auto-detects
- [ ] All modules use CommonJS (`require`/`module.exports`)
- [ ] No async/await, no optional chaining, no spread operator
- [ ] All modules load without error in WeChat DevTools
- [ ] Integration test passes: full gameplay loop (create session → answer → score → collect cards → check achievements)
