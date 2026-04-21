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
