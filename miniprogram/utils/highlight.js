// utils/highlight.js
// Python 语法高亮（移植自 Web 版纯正则方案）

const PYTHON_RULES = [
  { type: 'comment',  re: /(#[^\n]*)/ },
  { type: 'string',   re: /("""[\s\S]*?"""|'''[\s\S]*?'''|"[^"\n]*"|'[^'\n]*')/ },
  { type: 'keyword',  re: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|in|not|and|or|is|None|True|False|pass|break|continue|raise|yield|async|await|lambda|global|nonlocal|del)\b/ },
  { type: 'builtin',  re: /\b(print|len|range|list|dict|set|tuple|str|int|float|bool|type|isinstance|super|self|cls|open|enumerate|zip|map|filter|sorted|reversed|any|all|min|max|sum|abs|round|repr|iter|next)\b/ },
  { type: 'decorator',re: /(@\w+)/ },
  { type: 'number',   re: /\b(\d+(?:\.\d+)?)\b/ },
];

/**
 * 将 Python 代码解析成 token 数组（用于 WXML rich-text 渲染）
 * @param {string} code
 * @returns {Array<{type: string, value: string}>}
 */
function tokenize(code) {
  const tokens = [];
  let remaining = code;

  while (remaining.length > 0) {
    let matched = false;
    for (const rule of PYTHON_RULES) {
      const m = remaining.match(new RegExp('^([\\s\\S]*?)' + rule.re.source));
      if (m && m[1] !== undefined) {
        if (m[1].length > 0) tokens.push({ type: 'plain', value: m[1] });
        tokens.push({ type: rule.type, value: m[2] });
        remaining = remaining.slice(m[1].length + m[2].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: 'plain', value: remaining[0] });
      remaining = remaining.slice(1);
    }
  }
  return tokens;
}

// ── YAML/JSON 配置文件语法高亮 ──

const YAML_RULES = [
  { type: 'comment',  re: /(#[^\n]*)/ },
  { type: 'string',   re: /("(?:[^"\\]|\\.)*"|'[^']*')/ },
  { type: 'keyword',  re: /^(\s*[\w][\w\s-]*?)(?=\s*:)/ },
  { type: 'builtin',  re: /\b(true|false|null|yes|no|on|off)\b/ },
  { type: 'number',   re: /\b(\d+(?:\.\d+)?)\b/ },
  { type: 'decorator', re: /(---|\.\.\.)/ },
];

/**
 * 将 YAML/JSON 配置代码解析成 token 数组
 * @param {string} code
 * @returns {Array<{type: string, value: string}>}
 */
function tokenizeYaml(code) {
  // 按行处理，每行独立解析
  var lines = code.split('\n');
  var allTokens = [];

  for (var li = 0; li < lines.length; li++) {
    if (li > 0) allTokens.push({ type: 'plain', value: '\n' });

    var line = lines[li];
    if (!line) continue;

    // 注释行
    var commentMatch = line.match(/^(\s*)(#.*)$/);
    if (commentMatch) {
      if (commentMatch[1]) allTokens.push({ type: 'plain', value: commentMatch[1] });
      allTokens.push({ type: 'comment', value: commentMatch[2] });
      continue;
    }

    // --- 分隔符
    if (line.match(/^\s*---\s*$/)) {
      allTokens.push({ type: 'decorator', value: line });
      continue;
    }

    // key: value 格式
    var kvMatch = line.match(/^(\s*)([\w][\w\s.@/*-]*?)(\s*:\s*)(.*)?$/);
    if (kvMatch) {
      if (kvMatch[1]) allTokens.push({ type: 'plain', value: kvMatch[1] });
      allTokens.push({ type: 'keyword', value: kvMatch[2] });
      allTokens.push({ type: 'plain', value: kvMatch[3] });
      var val = kvMatch[4] || '';
      if (val) {
        // 解析值部分
        if (val.match(/^["']/) ) {
          allTokens.push({ type: 'string', value: val });
        } else if (val.match(/^(true|false|null|yes|no)$/i)) {
          allTokens.push({ type: 'builtin', value: val });
        } else if (val.match(/^\d+(?:\.\d+)?$/)) {
          allTokens.push({ type: 'number', value: val });
        } else if (val.match(/^#/)) {
          allTokens.push({ type: 'comment', value: val });
        } else {
          allTokens.push({ type: 'string', value: val });
        }
      }
      continue;
    }

    // 列表项 - value
    var listMatch = line.match(/^(\s*-\s+)(.*)$/);
    if (listMatch) {
      allTokens.push({ type: 'decorator', value: listMatch[1] });
      var lval = listMatch[2];
      if (lval.match(/^["']/)) {
        allTokens.push({ type: 'string', value: lval });
      } else {
        allTokens.push({ type: 'plain', value: lval });
      }
      continue;
    }

    // 其他行
    allTokens.push({ type: 'plain', value: line });
  }

  return allTokens;
}

module.exports = { tokenize: tokenize, tokenizeYaml: tokenizeYaml };
