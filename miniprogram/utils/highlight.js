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

module.exports = { tokenize };
