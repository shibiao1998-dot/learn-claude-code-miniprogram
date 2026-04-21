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
