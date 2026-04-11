// utils/markdown-parser.js
// 轻量 Markdown 解析器，用于微信小程序 WXML 渲染

/**
 * 将 Markdown 字符串解析为节点数组
 * @param {string} markdown
 * @returns {Array<{type: string, content?: string, lang?: string}>}
 */
function parse(markdown) {
  if (!markdown) return [];
  const lines = markdown.split('\n');
  const nodes = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 代码块
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim() || 'text';
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push({ type: 'code_block', lang, content: codeLines.join('\n') });
      i++; // 跳过结尾 ```
      continue;
    }

    // 标题（从最长前缀优先匹配）
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);
    if (h3) { nodes.push({ type: 'h3', content: h3[1].trim() }); i++; continue; }
    if (h2) { nodes.push({ type: 'h2', content: h2[1].trim() }); i++; continue; }
    if (h1) { nodes.push({ type: 'h1', content: h1[1].trim() }); i++; continue; }

    // 引用块（合并连续的 > 行）
    if (line.startsWith('> ')) {
      const quoteLines = [line.slice(2)];
      i++;
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      nodes.push({ type: 'blockquote', content: quoteLines.join(' ') });
      continue;
    }

    // 分隔线
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/) || line.match(/^___+$/)) {
      nodes.push({ type: 'hr' });
      i++; continue;
    }

    // 列表项
    if (line.match(/^[-*]\s+/)) {
      nodes.push({ type: 'list_item', content: line.replace(/^[-*]\s+/, '').trim() });
      i++; continue;
    }

    // 有序列表项
    if (line.match(/^\d+\.\s+/)) {
      nodes.push({ type: 'list_item', content: line.replace(/^\d+\.\s+/, '').trim() });
      i++; continue;
    }

    // 空行跳过
    if (line.trim() === '') { i++; continue; }

    // 普通段落（合并连续非特殊行）
    const paraLines = [line];
    i++;
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].startsWith('>') &&
      !lines[i].match(/^[-*]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      !lines[i].match(/^---+$/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    nodes.push({ type: 'paragraph', content: paraLines.join(' ') });
  }

  return nodes;
}

/**
 * 处理行内标记，返回 rich-text 兼容的 nodes 数组
 * 支持 **bold**, `code`, *italic*
 * @param {string} text
 * @returns {Array}
 */
function inlineToNodes(text) {
  if (!text) return [];
  const result = [];
  let remaining = text;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*([\s\S]*?)\*\*([\s\S]*)$/);
    const codeMatch = remaining.match(/^([\s\S]*?)`([^`]+)`([\s\S]*)$/);
    const italicMatch = remaining.match(/^([\s\S]*?)\*([\s\S]*?)\*([\s\S]*)$/);

    // 选优先匹配最早出现的标记
    let earliest = null;
    if (boldMatch) earliest = { match: boldMatch, type: 'bold' };
    if (codeMatch && (!earliest || codeMatch[1].length < earliest.match[1].length)) {
      earliest = { match: codeMatch, type: 'code' };
    }
    if (italicMatch && (!earliest || italicMatch[1].length < earliest.match[1].length)) {
      // 防止把 ** 误匹配为 *
      if (!boldMatch || italicMatch[1].length < boldMatch[1].length) {
        earliest = { match: italicMatch, type: 'italic' };
      }
    }

    if (!earliest) {
      result.push({ type: 'text', text: remaining });
      break;
    }

    const { match, type } = earliest;
    if (match[1]) result.push({ type: 'text', text: match[1] });

    if (type === 'bold') {
      result.push({
        type: 'text',
        text: match[2],
        attrs: { style: 'font-weight:bold;color:#F1F5F9' },
      });
    } else if (type === 'code') {
      result.push({
        type: 'text',
        text: match[2],
        attrs: {
          style: 'font-family:monospace;background:#334155;color:#38BDF8;padding:0 4px;border-radius:4px',
        },
      });
    } else if (type === 'italic') {
      result.push({
        type: 'text',
        text: match[2],
        attrs: { style: 'font-style:italic;color:#CBD5E1' },
      });
    }

    remaining = match[3];
  }

  return result;
}

module.exports = { parse, inlineToNodes };
