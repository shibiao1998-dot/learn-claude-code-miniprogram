// utils/markdown-parser.js
// 轻量 Markdown 解析器，用于微信小程序 WXML 渲染

/**
 * 解析表格行，返回单元格文本数组
 */
function _parseTableRow(line) {
  var trimmed = line.trim();
  // 去掉首尾 |
  if (trimmed.charAt(0) === '|') trimmed = trimmed.substring(1);
  if (trimmed.charAt(trimmed.length - 1) === '|') trimmed = trimmed.substring(0, trimmed.length - 1);
  var cells = trimmed.split('|');
  var result = [];
  for (var ci = 0; ci < cells.length; ci++) {
    result.push(cells[ci].trim());
  }
  return result;
}

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

    // 表格（检测 | 开头的行）
    if (line.trim().indexOf('|') === 0 && line.trim().lastIndexOf('|') > 0) {
      var tableLines = [];
      while (i < lines.length && lines[i].trim().indexOf('|') === 0 && lines[i].trim().lastIndexOf('|') > 0) {
        tableLines.push(lines[i]);
        i++;
      }
      if (tableLines.length >= 2) {
        // 解析表头
        var headerCells = _parseTableRow(tableLines[0]);
        // 跳过分隔行（|---|---|）
        var startRow = 1;
        if (tableLines.length > 1 && tableLines[1].match(/^\s*\|[\s\-:|]+\|\s*$/)) {
          startRow = 2;
        }
        // 解析数据行
        var bodyRows = [];
        for (var ri = startRow; ri < tableLines.length; ri++) {
          bodyRows.push(_parseTableRow(tableLines[ri]));
        }
        nodes.push({
          type: 'table',
          headers: headerCells,
          rows: bodyRows,
          colCount: headerCells.length,
        });
      } else {
        // 不够构成表格，当段落处理
        nodes.push({ type: 'paragraph', content: tableLines.join(' ') });
      }
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
      !lines[i].match(/^---+$/) &&
      !(lines[i].trim().indexOf('|') === 0 && lines[i].trim().lastIndexOf('|') > 0)
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
 * 浅色主题配色
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

    const em = earliest.match;
    const et = earliest.type;
    if (em[1]) result.push({ type: 'text', text: em[1] });

    if (et === 'bold') {
      result.push({
        type: 'text',
        text: em[2],
        attrs: { style: 'font-weight:700;color:#0F172A' },
      });
    } else if (et === 'code') {
      result.push({
        type: 'text',
        text: em[2],
        attrs: {
          style: 'font-family:monospace;background:#F1F5F9;color:#2563EB;padding:0 6rpx;border-radius:4rpx;font-size:0.9em',
        },
      });
    } else if (et === 'italic') {
      result.push({
        type: 'text',
        text: em[2],
        attrs: { style: 'font-style:italic;color:#475569' },
      });
    }

    remaining = em[3];
  }

  return result;
}

/**
 * 将行内 Markdown 标记转为 HTML 字符串，供 <rich-text> 组件使用
 * 支持 **bold**, `code`, *italic*
 * 处理顺序：先 code（防止内部 * 被误解析），再 bold，最后 italic
 * @param {string} text
 * @returns {string}
 */
function inlineToHtml(text) {
  if (!text) return '';
  // 先转义 HTML 特殊字符
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // 行内代码（先处理，防止内部 * 被后续规则匹配）
  html = html.replace(/`([^`]+)`/g, '<span style="font-family:monospace;background:#F1F5F9;color:#2563EB;padding:0 4px;border-radius:4px;font-size:0.9em">$1</span>');
  // 粗体
  html = html.replace(/\*\*(.+?)\*\*/g, '<span style="font-weight:700;color:#0F172A">$1</span>');
  // 斜体
  html = html.replace(/\*(.+?)\*/g, '<span style="font-style:italic;color:#475569">$1</span>');
  return html;
}

module.exports = { parse, inlineToNodes, inlineToHtml };
