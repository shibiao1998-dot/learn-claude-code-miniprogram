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
  score += Math.min(point.boldTerms.length * 2, 10);
  if (point.hasCode) score += 3;
  var bodyLen = point.body.length;
  if (bodyLen > 1000) score += 3;
  else if (bodyLen > 500) score += 1;
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
  if (point.boldTerms.length > 0) {
    return point.boldTerms[0];
  }
  var lines = point.body.split('\n');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (line.length > 10 && line.indexOf('#') !== 0 && line.indexOf('```') !== 0
        && line.indexOf('>') !== 0 && line.indexOf('|') !== 0 && line.indexOf('-') !== 0) {
      if (line.length > 60) return line.substring(0, 57) + '...';
      return line;
    }
  }
  return point.heading;
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
  // --- Generate Cards ---
  console.log('\nGenerating cards...');
  var allCards = [];

  allVersionIds.forEach(function(verId) {
    var docs = chapterDocs[verId];
    if (!docs || !docs.zh) return;

    var region = getRegion(verId);
    var versionMeta = meta.versions[verId];
    var zhPoints = extractKnowledgePoints(docs.zh.content);
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
  var total = allCards.length;
  var targets = {
    SSR: Math.max(Math.round(total * 0.03), 1),
    SR: Math.round(total * 0.12),
    R: Math.round(total * 0.25)
  };

  var scored = allCards.map(function(card) {
    var docs = chapterDocs[card.chapter];
    var zhPoints = extractKnowledgePoints(docs.zh.content);
    var point = zhPoints.filter(function(p) { return p.heading === card.name.zh; })[0];
    var versionMeta = meta.versions[card.chapter];
    return { card: card, score: point ? scoreRarity(point, versionMeta) : 0 };
  });
  scored.sort(function(a, b) { return b.score - a.score; });

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
    var stats = generatePowerDefense(item.card.rarity);
    item.card.power = stats.power;
    item.card.defense = stats.defense;
  });

  console.log('Total cards: ' + allCards.length);
  console.log('Distribution: SSR=' + ssrCount + ' SR=' + srCount + ' R=' + rCount + ' N=' + (total - ssrCount - srCount - rCount));
}

main();
