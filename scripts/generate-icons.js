/**
 * Generate TabBar icons for WeChat Mini Program
 * Pure Node.js - no external dependencies
 * Outputs 81x81 PNG files with simple line-art icons
 *
 * Uses raw PNG construction with zlib compression
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const SIZE = 81;
const OUTPUT_DIR = path.join(__dirname, '..', 'miniprogram', 'assets', 'icons');

// Colors
const INACTIVE = { r: 148, g: 163, b: 184 };  // #94A3B8
const ACTIVE = { r: 30, g: 41, b: 59 };       // #1E293B

/**
 * Create an 81x81 RGBA pixel buffer (transparent background)
 */
function createBuffer() {
  return Buffer.alloc(SIZE * SIZE * 4, 0); // all transparent
}

/**
 * Set pixel in RGBA buffer
 */
function setPixel(buf, x, y, r, g, b, a) {
  if (x < 0 || x >= SIZE || y < 0 || y >= SIZE) return;
  var idx = (y * SIZE + x) * 4;
  buf[idx] = r;
  buf[idx + 1] = g;
  buf[idx + 2] = b;
  buf[idx + 3] = a;
}

/**
 * Draw filled circle
 */
function fillCircle(buf, cx, cy, radius, color) {
  for (var y = cy - radius; y <= cy + radius; y++) {
    for (var x = cx - radius; x <= cx + radius; x++) {
      var dx = x - cx;
      var dy = y - cy;
      if (dx * dx + dy * dy <= radius * radius) {
        setPixel(buf, Math.round(x), Math.round(y), color.r, color.g, color.b, 255);
      }
    }
  }
}

/**
 * Draw circle outline (ring)
 */
function strokeCircle(buf, cx, cy, radius, thickness, color) {
  var outer = radius;
  var inner = radius - thickness;
  for (var y = cy - outer; y <= cy + outer; y++) {
    for (var x = cx - outer; x <= cx + outer; x++) {
      var dx = x - cx;
      var dy = y - cy;
      var dist2 = dx * dx + dy * dy;
      if (dist2 <= outer * outer && dist2 >= inner * inner) {
        setPixel(buf, Math.round(x), Math.round(y), color.r, color.g, color.b, 255);
      }
    }
  }
}

/**
 * Draw filled rectangle
 */
function fillRect(buf, x1, y1, x2, y2, color) {
  for (var y = Math.max(0, Math.round(y1)); y <= Math.min(SIZE - 1, Math.round(y2)); y++) {
    for (var x = Math.max(0, Math.round(x1)); x <= Math.min(SIZE - 1, Math.round(x2)); x++) {
      setPixel(buf, x, y, color.r, color.g, color.b, 255);
    }
  }
}

/**
 * Draw rectangle outline
 */
function strokeRect(buf, x1, y1, x2, y2, thickness, color) {
  fillRect(buf, x1, y1, x2, y1 + thickness - 1, color); // top
  fillRect(buf, x1, y2 - thickness + 1, x2, y2, color); // bottom
  fillRect(buf, x1, y1, x1 + thickness - 1, y2, color); // left
  fillRect(buf, x2 - thickness + 1, y1, x2, y2, color); // right
}

/**
 * Draw line (Bresenham)
 */
function drawLine(buf, x0, y0, x1, y1, thickness, color) {
  var dx = Math.abs(x1 - x0);
  var dy = Math.abs(y1 - y0);
  var sx = x0 < x1 ? 1 : -1;
  var sy = y0 < y1 ? 1 : -1;
  var err = dx - dy;
  var half = Math.floor(thickness / 2);

  while (true) {
    // Draw a small filled area for thickness
    for (var ty = -half; ty <= half; ty++) {
      for (var tx = -half; tx <= half; tx++) {
        setPixel(buf, Math.round(x0 + tx), Math.round(y0 + ty), color.r, color.g, color.b, 255);
      }
    }
    if (Math.round(x0) === Math.round(x1) && Math.round(y0) === Math.round(y1)) break;
    var e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}

/**
 * Draw triangle (filled) for house roof
 */
function fillTriangle(buf, x0, y0, x1, y1, x2, y2, color) {
  var minY = Math.max(0, Math.min(y0, y1, y2));
  var maxY = Math.min(SIZE - 1, Math.max(y0, y1, y2));

  for (var y = Math.round(minY); y <= Math.round(maxY); y++) {
    var intersections = [];
    var edges = [[x0, y0, x1, y1], [x1, y1, x2, y2], [x2, y2, x0, y0]];
    for (var i = 0; i < edges.length; i++) {
      var ex0 = edges[i][0], ey0 = edges[i][1], ex1 = edges[i][2], ey1 = edges[i][3];
      if ((ey0 <= y && ey1 > y) || (ey1 <= y && ey0 > y)) {
        var t = (y - ey0) / (ey1 - ey0);
        intersections.push(ex0 + t * (ex1 - ex0));
      }
    }
    intersections.sort(function(a, b) { return a - b; });
    for (var j = 0; j < intersections.length - 1; j += 2) {
      for (var x = Math.round(intersections[j]); x <= Math.round(intersections[j + 1]); x++) {
        setPixel(buf, x, y, color.r, color.g, color.b, 255);
      }
    }
  }
}

// ==================== Icon Drawers ====================

/**
 * Home icon: simple house outline
 */
function drawHome(color) {
  var buf = createBuffer();
  // Roof (triangle)
  fillTriangle(buf, 40, 12, 12, 40, 68, 40, color);
  // Body (rectangle)
  fillRect(buf, 18, 40, 62, 68, color);
  // Cut out interior (make it outline-like)
  var bg = { r: 0, g: 0, b: 0 };
  // Inner roof
  fillTriangle(buf, 40, 18, 18, 38, 62, 38, bg);
  // Inner body
  for (var y = 43; y <= 65; y++) {
    for (var x = 21; x <= 59; x++) {
      setPixel(buf, x, y, 0, 0, 0, 0);
    }
  }
  // Door (small rect in center bottom)
  fillRect(buf, 33, 50, 47, 68, color);
  // Door interior
  for (var y2 = 53; y2 <= 65; y2++) {
    for (var x2 = 36; x2 <= 44; x2++) {
      setPixel(buf, x2, y2, 0, 0, 0, 0);
    }
  }
  return buf;
}

/**
 * Timeline icon: vertical line with 3 station dots (metro style)
 */
function drawTimeline(color) {
  var buf = createBuffer();
  // Vertical line
  fillRect(buf, 38, 10, 42, 70, color);
  // Three station dots
  fillCircle(buf, 40, 20, 7, color);
  fillCircle(buf, 40, 40, 7, color);
  fillCircle(buf, 40, 60, 7, color);
  // Hollow out center of dots (ring effect)
  fillCircle(buf, 40, 20, 3, { r: 0, g: 0, b: 0 });
  fillCircle(buf, 40, 40, 3, { r: 0, g: 0, b: 0 });
  fillCircle(buf, 40, 60, 3, { r: 0, g: 0, b: 0 });
  // Re-zero alpha for hollow centers
  for (var y = 0; y < SIZE; y++) {
    for (var x = 0; x < SIZE; x++) {
      var idx = (y * SIZE + x) * 4;
      if (buf[idx] === 0 && buf[idx + 1] === 0 && buf[idx + 2] === 0) {
        buf[idx + 3] = 0;
      }
    }
  }
  return buf;
}

/**
 * Layers icon: 3 stacked rounded rectangles
 */
function drawLayers(color) {
  var buf = createBuffer();
  // Three stacked rectangles, offset vertically
  strokeRect(buf, 14, 10, 66, 30, 3, color);
  strokeRect(buf, 14, 30, 66, 50, 3, color);
  strokeRect(buf, 14, 50, 66, 70, 3, color);
  return buf;
}

/**
 * Reference icon: book/document outline
 */
function drawReference(color) {
  var buf = createBuffer();
  // Outer book shape
  strokeRect(buf, 16, 8, 64, 72, 3, color);
  // Spine line
  fillRect(buf, 16, 8, 20, 72, color);
  // Text lines
  fillRect(buf, 28, 22, 56, 24, color);
  fillRect(buf, 28, 32, 56, 34, color);
  fillRect(buf, 28, 42, 48, 44, color);
  fillRect(buf, 28, 52, 52, 54, color);
  return buf;
}

// ==================== PNG Encoder ====================

/**
 * Encode RGBA buffer as PNG (minimal implementation)
 */
function encodePNG(buf, width, height) {
  // PNG signature
  var signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  var ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  var ihdrChunk = makeChunk('IHDR', ihdr);

  // IDAT chunk - raw image data with filter byte per row
  var rawData = Buffer.alloc(height * (1 + width * 4));
  for (var y = 0; y < height; y++) {
    rawData[y * (1 + width * 4)] = 0; // filter: None
    buf.copy(rawData, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }
  var compressed = zlib.deflateSync(rawData);
  var idatChunk = makeChunk('IDAT', compressed);

  // IEND chunk
  var iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  var length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  var typeBuffer = Buffer.from(type, 'ascii');
  var crcData = Buffer.concat([typeBuffer, data]);
  var crc = crc32(crcData);
  var crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 lookup table
var crcTable = [];
for (var n = 0; n < 256; n++) {
  var c = n;
  for (var k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xEDB88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(buf) {
  var crc = 0xFFFFFFFF;
  for (var i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// ==================== Main ====================

var icons = {
  home: drawHome,
  timeline: drawTimeline,
  layers: drawLayers,
  reference: drawReference,
};

var colors = {
  inactive: INACTIVE,
  active: ACTIVE,
};

// Ensure output dir exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

var generated = [];
Object.keys(icons).forEach(function(name) {
  Object.keys(colors).forEach(function(colorName) {
    var suffix = colorName === 'active' ? '-active' : '';
    var filename = name + suffix + '.png';
    var filepath = path.join(OUTPUT_DIR, filename);

    var pixelBuf = icons[name](colors[colorName]);
    var png = encodePNG(pixelBuf, SIZE, SIZE);
    fs.writeFileSync(filepath, png);
    generated.push(filename + ' (' + png.length + ' bytes)');
  });
});

console.log('Generated ' + generated.length + ' icons in ' + OUTPUT_DIR + ':');
generated.forEach(function(g) { console.log('  ' + g); });
