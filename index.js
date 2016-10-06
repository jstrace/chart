
/**
 * Module dependencies.
 */

var matrix = require('array-matrix');

/**
 * Expose `chart()`.
 */

module.exports = chart;

/**
 * Return ascii chart of `data`.
 *
 * - `width` total chart width [130]
 * - `height` total chart height [30]
 * - `padding` edge padding [3]
 * - `pointChar` character used to plot a point [█]
 * - `negativePointChar` character used to plot a negative point [░]
 * - `axisChar` character used to draw axis [.]
 *
 * @param {Array} data
 * @param {Object} [opts]
 * @return {String}
 * @api public
 */

function chart(data, opts) {
  opts = opts || {};

  // options
  var w = opts.width || 130;
  var h = opts.height || 30;
  var pc = opts.pointChar || '█';
  var nc = opts.negativePointChar || '░';
  var ac = opts.axisChar || '.';

  // padding
  var pad = typeof opts.padding === 'number' ? opts.padding : 3;
  w -= pad * 2;
  h -= pad * 2;

  // setup
  var out = matrix(w, h);
  var m = max(data) || 0;
  var label = Math.abs(m).toString();
  var labelw = label.length;
  var labelp = 1;

  // chart sizes void of padding etc
  var ch = h;
  var cw = w - labelw - labelp;

  // fill
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      out[y][x] = ' ';
    }
  }

  // y-axis labels
  for (var i = 0; i < labelw; i++) {
    out[0][i] = label[i];
  }

  out[h - 1][labelw - labelp] = '0';

  // y-axis
  for (var y = 0; y < h; y++) {
    out[y][labelw + labelp] = ac;
  }

  // x-axis
  var x = labelw + labelp;
  while (x < w) {
    out[h - 1][x++] = ac;
    out[h - 1][x++] = ' ';
  }

  // strip excess from head
  // so that data may "roll"
  var space = Math.floor(w / 2) - 1;
  var excess = Math.max(0, data.length - space);
  if (excess) data = data.slice(excess);

  // plot data
  var x = labelw + labelp + 2;
  for (var i = 0; i < data.length; i++) {
    var d = data[i];
    var p = d / m;
    var y = Math.round((h - 2) * p);
    var c = y < 0 ? nc : pc;
    if (y < 0) y = -y;

    while (y--) {
      out[Math.abs(y - h) - 2][x] = c;
    }

    x += 2;
  }

  // Return string
  var str = string(out, h);
  return pad ? padding(str, pad) : str;
}

/**
 * Apply padding.
 */

function padding(str, n) {
  var linew = str.split('\n')[0].length;
  var line = Array(linew).join(' ') + '\n';

  // y
  str = Array(n).join(line) + str;
  str = str + Array(n).join(line);

  // x
  str = str.replace(/^/gm, Array(n).join(' '));
  return str;
}

/**
 * Convert matrix to a string.
 */

function string(out) {
  var buf = [];

  for (var i = 0; i < out.length; i++) {
    buf.push(out[i].join(''));
  }

  return buf.join('\n');
}

/**
 * Return max in array.
 */

function max(data) {
  var n = Math.abs(data[0]);

  for (var i = 1; i < data.length; i++) {
    n = Math.abs(data[i]) > n ? Math.abs(data[i]) : n;
  }

  return n;
}
