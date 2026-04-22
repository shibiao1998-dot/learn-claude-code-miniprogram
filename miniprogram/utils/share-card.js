// utils/share-card.js

var COLORS = {
  bg: '#0D1117',
  text: '#E6EDF3',
  textMuted: '#8B949E',
  border: '#30363D',
  green: '#3FB950',
  gold: '#F0C040',
  orange: '#D29922',
  rarityN: '#484F58',
  rarityR: '#58A6FF',
  raritySR: '#BC8CFF',
  raritySSR: '#F0C040'
};

var RARITY_COLORS = {
  N: COLORS.rarityN,
  R: COLORS.rarityR,
  SR: COLORS.raritySR,
  SSR: COLORS.raritySSR
};

function generateShareImage(data, callback) {
  var width = 750;
  var height = 1000;
  var dpr = wx.getWindowInfo().pixelRatio || 2;

  var canvas = wx.createOffscreenCanvas({ type: '2d', width: width * dpr, height: height * dpr });
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  _drawBackground(ctx, width, height);
  _drawHeader(ctx, width);
  _drawTitle(ctx, data, width);
  _drawStars(ctx, data.stars, width);
  _drawScore(ctx, data);
  _drawCards(ctx, data.cards, width);
  _drawFooter(ctx, width, height);

  wx.canvasToTempFilePath({
    canvas: canvas,
    width: width * dpr,
    height: height * dpr,
    destWidth: width * dpr,
    destHeight: height * dpr,
    fileType: 'png',
    success: function(res) {
      callback(res.tempFilePath);
    },
    fail: function() {
      callback(null);
    }
  });
}

function _drawBackground(ctx, w, h) {
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, w - 40, h - 40);

  ctx.strokeRect(24, 24, w - 48, h - 48);
}

function _drawHeader(ctx, w) {
  ctx.font = '600 28px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'center';
  ctx.fillText('CLAUDE CODE TERMINAL', w / 2, 80);

  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 100);
  ctx.lineTo(w - 50, 100);
  ctx.stroke();
}

function _drawTitle(ctx, data, w) {
  ctx.font = '700 40px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'center';
  ctx.fillText('STAGE CLEAR', w / 2, 160);

  ctx.font = '400 28px sans-serif';
  ctx.fillStyle = COLORS.text;
  ctx.fillText(data.title || '', w / 2, 200);
}

function _drawStars(ctx, stars, w) {
  var starSize = 48;
  var gap = 20;
  var totalWidth = starSize * 3 + gap * 2;
  var startX = (w - totalWidth) / 2;
  var y = 260;

  ctx.font = starSize + 'px sans-serif';
  ctx.textAlign = 'center';

  for (var i = 0; i < 3; i++) {
    var x = startX + i * (starSize + gap) + starSize / 2;
    ctx.fillStyle = i < stars ? COLORS.gold : COLORS.border;
    ctx.fillText('★', x, y);
  }
}

function _drawScore(ctx, data) {
  var lines = [
    { label: '> SCORE: ', value: data.score + '/' + data.total + ' (' + data.ratio + '%)' },
    { label: '> EXP: ', value: '+' + data.exp },
    { label: '> LEVEL: ', value: data.level }
  ];

  ctx.textAlign = 'left';
  var startX = 80;
  var y = 340;

  for (var i = 0; i < lines.length; i++) {
    ctx.font = '600 26px monospace';
    ctx.fillStyle = COLORS.textMuted;
    ctx.fillText(lines[i].label, startX, y);

    var labelWidth = ctx.measureText(lines[i].label).width;
    ctx.fillStyle = COLORS.text;
    ctx.fillText(lines[i].value, startX + labelWidth, y);

    y += 50;
  }
}

function _drawCards(ctx, cards, w) {
  if (!cards || cards.length === 0) return;

  var y = 520;
  ctx.font = '600 24px monospace';
  ctx.fillStyle = COLORS.textMuted;
  ctx.textAlign = 'left';
  ctx.fillText('CARDS OBTAINED:', 80, y);

  var cardW = 160;
  var cardH = 120;
  var gap = 20;
  var totalWidth = cards.length * cardW + (cards.length - 1) * gap;
  var startX = (w - totalWidth) / 2;
  y += 30;

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var x = startX + i * (cardW + gap);
    var rarityColor = RARITY_COLORS[card.rarity] || COLORS.rarityN;

    ctx.strokeStyle = rarityColor;
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, cardW, cardH);

    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(x + 1, y + 1, cardW - 2, cardH - 2);

    ctx.font = '700 20px monospace';
    ctx.fillStyle = rarityColor;
    ctx.textAlign = 'center';
    ctx.fillText(card.rarity, x + cardW / 2, y + 40);

    ctx.font = '400 18px sans-serif';
    ctx.fillStyle = COLORS.text;
    var name = card.name || '';
    if (name.length > 10) name = name.substring(0, 9) + '…';
    ctx.fillText(name, x + cardW / 2, y + 75);
  }
}

function _drawFooter(ctx, w, h) {
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, h - 120);
  ctx.lineTo(w - 50, h - 120);
  ctx.stroke();

  ctx.font = '400 24px monospace';
  ctx.fillStyle = COLORS.green;
  ctx.textAlign = 'left';
  ctx.fillText('user@claude:~$ ▌', 80, h - 80);

  ctx.font = '400 22px sans-serif';
  ctx.fillStyle = COLORS.textMuted;
  ctx.textAlign = 'center';
  ctx.fillText('── CC学习工具 ──', w / 2, h - 42);
}

module.exports = {
  generateShareImage: generateShareImage
};
