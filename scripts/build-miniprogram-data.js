#!/usr/bin/env node
/**
 * build-miniprogram-data.js
 * 从 Web 版数据源提取并转换数据，输出到 miniprogram/data/
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

// ──────────────────────────────────────────────
// 路径配置
// ──────────────────────────────────────────────
const WEB_SRC = "/Users/bill_huang/learn-claude-code/web/src";
const OUT_DIR = path.resolve(__dirname, "../miniprogram/data");
const I18N_SRC = path.join(WEB_SRC, "i18n/messages");
const I18N_OUT = path.resolve(__dirname, "../miniprogram/i18n");

// ──────────────────────────────────────────────
// 工具函数：TypeScript → JS 提取
// ──────────────────────────────────────────────

/**
 * 去掉 TypeScript 类型注解，返回可被 vm 执行的 JS 代码
 */
/**
 * 删除 const NAME: TYPE = 中的 TYPE 部分（支持多行、嵌套尖括号、嵌套大括号）
 * 策略：在 `const NAME` 后面如果跟着 `: ` 就扫描到相匹配的 `=`，删除中间内容
 */
function removeConstTypeAnnotations(code) {
  // 找到所有 `const IDENTIFIER:` 的位置，然后扫描到对应的 =
  let result = "";
  let i = 0;
  while (i < code.length) {
    // 匹配 `const IDENTIFIER:` 模式
    const constMatch = code.slice(i).match(/^(const\s+\w+)\s*:/);
    if (constMatch) {
      // 先输出 `const IDENTIFIER`
      result += constMatch[1];
      // 跳过到冒号处
      let j = i + constMatch[1].length;
      while (j < code.length && code[j] !== ":") j++;
      j++; // 跳过冒号

      // 扫描类型注解，处理嵌套的 <>, {}, (), []
      let depth_angle = 0;
      let depth_curly = 0;
      let depth_paren = 0;
      let depth_square = 0;
      while (j < code.length) {
        const ch = code[j];
        if (ch === "<") depth_angle++;
        else if (ch === ">") { if (depth_angle > 0) depth_angle--; }
        else if (ch === "{") depth_curly++;
        else if (ch === "}") { if (depth_curly > 0) depth_curly--; }
        else if (ch === "(") depth_paren++;
        else if (ch === ")") { if (depth_paren > 0) depth_paren--; }
        else if (ch === "[") depth_square++;
        else if (ch === "]") { if (depth_square > 0) depth_square--; }
        else if (ch === "=" &&
          depth_angle === 0 && depth_curly === 0 &&
          depth_paren === 0 && depth_square === 0 &&
          code[j + 1] !== "=" && code[j + 1] !== ">") {
          // 找到赋值 =（排除 == 和 =>），停止
          break;
        }
        j++;
      }
      // 输出 ` = `，然后从 j 继续
      result += " ";
      i = j; // i 指向 =
      continue;
    }
    result += code[i];
    i++;
  }
  return result;
}

/**
 * 删除所有 function 声明（export function 和普通 function）
 * 包括整个函数体，因为我们只需要 const 数据，不需要函数
 */
function removeFunctionDeclarations(code) {
  let result = "";
  let i = 0;
  while (i < code.length) {
    // 匹配 function NAME 或 export function NAME
    const funcMatch = code.slice(i).match(/^(?:export\s+)?function\s+\w+/);
    if (funcMatch) {
      // 跳过函数名，然后找到函数体的 { }
      let j = i + funcMatch[0].length;
      // 跳过参数列表（可能有嵌套括号）
      // 先找到 {
      let depth_paren = 0;
      let foundBrace = false;
      while (j < code.length && !foundBrace) {
        if (code[j] === "(") depth_paren++;
        else if (code[j] === ")") { depth_paren--; }
        else if (code[j] === "{" && depth_paren === 0) {
          foundBrace = true;
          break;
        }
        j++;
      }
      if (!foundBrace) {
        result += code[i];
        i++;
        continue;
      }
      // j 指向 {，扫描直到匹配的 }
      let depth = 0;
      let k = j;
      while (k < code.length) {
        if (code[k] === "{") depth++;
        else if (code[k] === "}") {
          depth--;
          if (depth === 0) { k++; break; }
        }
        k++;
      }
      // 跳过整个函数
      i = k;
      continue;
    }
    result += code[i];
    i++;
  }
  return result;
}


function stripTypeScript(content) {
  let code = content;

  // 删除 import 语句（单行）
  code = code.replace(/^import\s+.*?;\s*$/gm, "");

  // 删除 interface 块（单行和多行）
  // 单行：export interface Foo { ... }
  code = code.replace(/^export\s+interface\s+[^\n]*\{[^{}]*\}\s*$/gm, "");
  code = code.replace(/^interface\s+[^\n]*\{[^{}]*\}\s*$/gm, "");
  // 多行：直到独立的 } 行结束（interface 通常不以 }; 结尾）
  code = code.replace(/^(export\s+)?interface\s+\w[^{]*\{[\s\S]*?^\}/gm, "");

  // 删除 export type 声明（多种形式）
  // 1. 多行对象 type（export type Foo = { ... };）
  //    特征：export type NAME = { ... }; 其中 } 和 ; 在同一行 `};` 且在行首
  code = code.replace(/^export\s+type\s+\w[^=]*=\s*\{[\s\S]*?^\};\s*$/gm, "");
  // 2. 多行 union type（export type Foo =\n  | "a"\n  | "b";）
  //    特征：各行以 | 开头，最后以 ; 结尾
  code = code.replace(/^export\s+type\s+\w[^\n]*\n(?:\s*\|[^\n]*\n)+/gm, "");
  // 3. 剩余单行 export type
  code = code.replace(/^export\s+type\s+[^\n]+;$/gm, "");

  // 删除 type 声明（非 export）
  // 1. 多行对象 type（type Foo = { ... };）
  code = code.replace(/^type\s+\w[^=]*=\s*\{[\s\S]*?^\};\s*$/gm, "");
  // 2. 单行 type
  code = code.replace(/^type\s+[^\n]+;$/gm, "");

  // 删除 as const
  code = code.replace(/\bas\s+const\b/g, "");

  // 删除 readonly 关键字
  code = code.replace(/\breadonly\s+/g, "");

  // 处理嵌套泛型类型注解（变量声明中的 : ComplexType<...> = ），包括多行
  code = removeConstTypeAnnotations(code);

  // 删除 export function 和 function（我们不需要工具函数，直接删除整个函数体）
  // 策略：找到 function NAME(...) {...} 并删除整个块
  code = removeFunctionDeclarations(code);
  code = code.replace(/^export\s+const\s+/gm, "const ");

  // 删除 as const（保留）
  code = code.replace(/\bas\s+const\b/g, "");
  // 删除 as TypeName 类型断言（以大写开头的 TS 类型，如 as VersionId）
  // 注意：不删除英文句子中的 "as the"（小写）
  code = code.replace(/\bas\s+[A-Z]\w*/g, "");



  // 删除函数签名中的返回类型注解
  // ): ReturnType { 形式（普通函数）
  code = code.replace(/\)\s*:\s*[\w\[\] |?]+\s*\{/g, ") {");
  // ): ReturnType => 形式（箭头函数）
  code = code.replace(/\)\s*:\s*[\w\[\] |?]+\s*=>/g, ") =>");
  // 类型谓词 (param): param is Type =>
  code = code.replace(/\((\w+)\)\s*:\s*\w+\s+is\s+\w+\s*=>/g, "($1) =>");
  // 删除函数参数中的内置类型注解（只处理小写，不破坏对象属性）
  code = code.replace(/(\w+)\s*:\s*string(?=\s*[,)\n])/g, "$1");
  code = code.replace(/(\w+)\s*:\s*number(?=\s*[,)\n])/g, "$1");
  code = code.replace(/(\w+)\s*:\s*boolean(?=\s*[,)\n])/g, "$1");

  // 删除属性可选标记 ?: → :
  code = code.replace(/\?\s*:/g, ":");

  return code;
}

/**
 * 从 TS 文件中提取指定 export 名称的值
 */
function extractTSExport(filePath, exportName) {
  const content = fs.readFileSync(filePath, "utf-8");
  let code = stripTypeScript(content);

  // 在末尾添加 module.exports
  code += `\nmodule.exports = { "${exportName}": typeof ${exportName} !== 'undefined' ? ${exportName} : undefined };`;

  try {
    const ctx = {
      module: { exports: {} },
      require,
      console,
    };
    vm.runInNewContext(code, ctx);
    const result = ctx.module.exports[exportName];
    if (result === undefined) {
      throw new Error(`Export "${exportName}" not found in ${filePath}`);
    }
    return result;
  } catch (err) {
    // 输出前 30 行帮助调试
    const lines = code.split("\n").slice(0, 50).join("\n");
    console.error(`\n[ERROR] Failed to extract "${exportName}" from ${filePath}`);
    console.error(`Error: ${err.message}`);
    console.error(`First 50 lines of processed code:\n${lines}\n`);
    throw err;
  }
}

/**
 * 从 TS 文件中提取多个 export
 */
function extractMultipleTSExports(filePath, exportNames) {
  const content = fs.readFileSync(filePath, "utf-8");
  let code = stripTypeScript(content);

  const exportsObj = exportNames.map((n) => `"${n}": typeof ${n} !== 'undefined' ? ${n} : undefined`).join(", ");
  code += `\nmodule.exports = { ${exportsObj} };`;

  try {
    const ctx = {
      module: { exports: {} },
      require,
      console,
    };
    vm.runInNewContext(code, ctx);
    return ctx.module.exports;
  } catch (err) {
    const lines = code.split("\n").slice(0, 80).join("\n");
    console.error(`\n[ERROR] Failed to extract [${exportNames.join(", ")}] from ${filePath}`);
    console.error(`Error: ${err.message}`);
    console.error(`First 80 lines of processed code:\n${lines}\n`);
    throw err;
  }
}

// ──────────────────────────────────────────────
// 工具函数：文件写入 & 统计
// ──────────────────────────────────────────────

/**
 * 输出为 JS 模块文件（module.exports = ...），微信小程序 require() 只支持 .js
 * filePath 应以 .js 结尾
 */
function writeJSModule(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const json = JSON.stringify(data, null, 2);
  const jsContent = `module.exports = ${json};\n`;
  fs.writeFileSync(filePath, jsContent, "utf-8");
  const sizeKB = (Buffer.byteLength(jsContent, "utf-8") / 1024).toFixed(1);
  console.log(`  ✓ ${path.relative(process.cwd(), filePath)}  (${sizeKB} KB)`);
  return sizeKB;
}

// ──────────────────────────────────────────────
// 确保输出目录存在
// ──────────────────────────────────────────────
fs.mkdirSync(OUT_DIR, { recursive: true });
fs.mkdirSync(path.join(OUT_DIR, "docs"), { recursive: true });
fs.mkdirSync(I18N_OUT, { recursive: true });

console.log("🔨 Building miniprogram data...\n");

// ──────────────────────────────────────────────
// 1. 读取所有数据源
// ──────────────────────────────────────────────
console.log("📖 Loading data sources...");

// JSON 源（直接 require）
const docsJson = require(path.join(WEB_SRC, "data/generated/docs.json"));
const versionsJson = require(path.join(WEB_SRC, "data/generated/versions.json"));

// TypeScript 源
let VERSION_META, VERSION_ORDER, LAYERS;
let VERSION_CONTENT;
let CHAPTER_GUIDES;
let STAGE_CHECKPOINTS;
let BRIDGE_DOCS;
let GENERIC_FLOWS, EXECUTION_FLOWS;
let ARCHITECTURE_BLUEPRINTS;

try {
  console.log("  Loading constants.ts...");
  const constants = extractMultipleTSExports(
    path.join(WEB_SRC, "lib/constants.ts"),
    ["VERSION_ORDER", "VERSION_META", "LAYERS"]
  );
  VERSION_ORDER = constants.VERSION_ORDER;
  VERSION_META = constants.VERSION_META;
  LAYERS = constants.LAYERS;
} catch (e) {
  console.error("Failed to load constants.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading version-content.ts...");
  VERSION_CONTENT = extractTSExport(
    path.join(WEB_SRC, "lib/version-content.ts"),
    "VERSION_CONTENT"
  );
} catch (e) {
  console.error("Failed to load version-content.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading chapter-guides.ts...");
  CHAPTER_GUIDES = extractTSExport(
    path.join(WEB_SRC, "lib/chapter-guides.ts"),
    "CHAPTER_GUIDES"
  );
} catch (e) {
  console.error("Failed to load chapter-guides.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading stage-checkpoints.ts...");
  STAGE_CHECKPOINTS = extractTSExport(
    path.join(WEB_SRC, "lib/stage-checkpoints.ts"),
    "STAGE_CHECKPOINTS"
  );
} catch (e) {
  console.error("Failed to load stage-checkpoints.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading bridge-docs.ts...");
  BRIDGE_DOCS = extractTSExport(
    path.join(WEB_SRC, "lib/bridge-docs.ts"),
    "BRIDGE_DOCS"
  );
} catch (e) {
  console.error("Failed to load bridge-docs.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading execution-flows.ts...");
  const flows = extractMultipleTSExports(
    path.join(WEB_SRC, "data/execution-flows.ts"),
    ["GENERIC_FLOWS", "EXECUTION_FLOWS"]
  );
  GENERIC_FLOWS = flows.GENERIC_FLOWS;
  EXECUTION_FLOWS = flows.EXECUTION_FLOWS;
} catch (e) {
  console.error("Failed to load execution-flows.ts:", e.message);
  process.exit(1);
}

try {
  console.log("  Loading architecture-blueprints.ts...");
  ARCHITECTURE_BLUEPRINTS = extractTSExport(
    path.join(WEB_SRC, "data/architecture-blueprints.ts"),
    "ARCHITECTURE_BLUEPRINTS"
  );
} catch (e) {
  console.error("Failed to load architecture-blueprints.ts:", e.message);
  process.exit(1);
}

console.log("  All data sources loaded.\n");

// ──────────────────────────────────────────────
// 2. 构建 meta.json
// ──────────────────────────────────────────────
console.log("📦 Building meta.json...");

// 构建 versions map
const versionOrder = Array.from(VERSION_ORDER);
const versionsMap = {};

for (let i = 0; i < versionOrder.length; i++) {
  const id = versionOrder[i];
  const meta = VERSION_META[id];
  const versionData = versionsJson.versions.find((v) => v.id === id) || {};

  versionsMap[id] = {
    id,
    title: meta.title,
    layer: meta.layer,
    prevVersion: meta.prevVersion || null,
    nextVersion: versionOrder[i + 1] || null,
    loc: versionData.loc || 0,
    tools: versionData.tools || [],
    newTools: versionData.newTools || [],
    classes: versionData.classes || [],
    functions: versionData.functions || [],
    content: {
      zh: VERSION_CONTENT.zh[id] || {},
      en: VERSION_CONTENT.en[id] || {},
      ja: VERSION_CONTENT.ja[id] || {},
    },
    guide: CHAPTER_GUIDES[id] || {},
  };
}

const meta = {
  versionOrder,
  layers: Array.from(LAYERS).map((l) => ({
    id: l.id,
    label: l.label,
    color: l.color,
    versions: Array.from(l.versions),
  })),
  versions: versionsMap,
  stageCheckpoints: Array.from(STAGE_CHECKPOINTS),
  diffs: versionsJson.diffs || [],
};

writeJSModule(path.join(OUT_DIR, "meta.js"), meta);

// ──────────────────────────────────────────────
// 3. 构建 docs-index.json 和 docs/ 子目录
// ──────────────────────────────────────────────
console.log("📦 Building docs-index.json and docs/ files...");

const chaptersIndex = {};
const bridgesIndex = {};

for (const doc of docsJson) {
  const { version, slug, locale, title, kind, content, filename } = doc;

  if (kind === "chapter") {
    if (!chaptersIndex[version]) chaptersIndex[version] = {};
    chaptersIndex[version][locale] = { slug, title };

    // 写单独文件
    writeJSModule(
      path.join(OUT_DIR, "docs", `chapter-${version}-${locale}.js`),
      { version, slug, locale, title, kind, content }
    );
  } else if (kind === "bridge") {
    if (!bridgesIndex[slug]) bridgesIndex[slug] = {};
    bridgesIndex[slug][locale] = { slug, title };

    // 写单独文件
    writeJSModule(
      path.join(OUT_DIR, "docs", `bridge-${slug}-${locale}.js`),
      { version: version || null, slug, locale, title, kind, content }
    );
  }
}

writeJSModule(path.join(OUT_DIR, "docs-index.js"), {
  chapters: chaptersIndex,
  bridges: bridgesIndex,
});

// ──────────────────────────────────────────────
// 4. 构建 versions-source.json
// ──────────────────────────────────────────────
console.log("📦 Building versions-source.json...");

const versionsSource = {};
for (const v of versionsJson.versions) {
  versionsSource[v.id] = v.source || "";
}
writeJSModule(path.join(OUT_DIR, "versions-source.js"), versionsSource);

// ──────────────────────────────────────────────
// 5. 构建 scenarios-all.json
// ──────────────────────────────────────────────
console.log("📦 Building scenarios-all.json...");

const scenariosAll = {};
const scenariosDir = path.join(WEB_SRC, "data/scenarios");
const scenarioFiles = fs.readdirSync(scenariosDir).filter((f) => f.endsWith(".json"));

for (const file of scenarioFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(scenariosDir, file), "utf-8"));
  const versionId = data.version || path.basename(file, ".json");
  scenariosAll[versionId] = data;
}

writeJSModule(path.join(OUT_DIR, "scenarios-all.js"), scenariosAll);

// ──────────────────────────────────────────────
// 6. 构建 bridge-docs-meta.json
// ──────────────────────────────────────────────
console.log("📦 Building bridge-docs-meta.json...");

writeJSModule(path.join(OUT_DIR, "bridge-docs-meta.js"), BRIDGE_DOCS);

// ──────────────────────────────────────────────
// 7. 构建 flows.json
// ──────────────────────────────────────────────
console.log("📦 Building flows.json...");

// 合并 GENERIC_FLOWS 和 EXECUTION_FLOWS（EXECUTION_FLOWS 优先）
const flowsAll = {};
if (GENERIC_FLOWS) {
  for (const [key, val] of Object.entries(GENERIC_FLOWS)) {
    flowsAll[key] = val;
  }
}
if (EXECUTION_FLOWS) {
  for (const [key, val] of Object.entries(EXECUTION_FLOWS)) {
    // 如果同一版本两个都有，合并为 { generic, execution }
    if (flowsAll[key]) {
      flowsAll[key] = { generic: flowsAll[key], execution: val };
    } else {
      flowsAll[key] = val;
    }
  }
}

writeJSModule(path.join(OUT_DIR, "flows.js"), flowsAll);

// ──────────────────────────────────────────────
// 8. 构建 blueprints.json
// ──────────────────────────────────────────────
console.log("📦 Building blueprints.json...");

writeJSModule(path.join(OUT_DIR, "blueprints.js"), ARCHITECTURE_BLUEPRINTS);

// ──────────────────────────────────────────────
// 9. 复制 i18n 文件
// ──────────────────────────────────────────────
console.log("📦 Copying i18n files...");

for (const locale of ["zh", "en", "ja"]) {
  const src = path.join(I18N_SRC, `${locale}.json`);
  const dst = path.join(I18N_OUT, `${locale}.js`);
  if (fs.existsSync(src)) {
    const jsonData = JSON.parse(fs.readFileSync(src, "utf-8"));
    const jsContent = `module.exports = ${JSON.stringify(jsonData, null, 2)};\n`;
    fs.writeFileSync(dst, jsContent, "utf-8");
    const sizeKB = (Buffer.byteLength(jsContent, "utf-8") / 1024).toFixed(1);
    console.log(`  ✓ miniprogram/i18n/${locale}.js  (${sizeKB} KB)`);
  } else {
    console.warn(`  ⚠ i18n source not found: ${src}`);
  }
}

// ──────────────────────────────────────────────
// 完成报告
// ──────────────────────────────────────────────
console.log("\n🎉 Build complete!");
console.log("\nOutput summary:");

function listDir(dir, indent = "  ") {
  if (!fs.existsSync(dir)) return;
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      console.log(`${indent}${item}/`);
      listDir(fullPath, indent + "  ");
    } else {
      const sizeKB = (stat.size / 1024).toFixed(1);
      console.log(`${indent}${item}  (${sizeKB} KB)`);
    }
  }
}

console.log("\nminiprogram/data/");
listDir(OUT_DIR);
console.log("\nminiprogram/i18n/");
listDir(I18N_OUT);
