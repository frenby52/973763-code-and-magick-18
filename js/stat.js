'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var FONT_GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var CURRENT_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var getMaxElement = function (arr) {
  if (arr) {
    var maxElement = arr[0];
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
  }
  return maxElement;
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, textBaseline) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = textBaseline;
  ctx.fillText(text, x, y);
};

var renderColumn = function (ctx, names, times, x, y, barHeight) {
  renderText(ctx, Math.round(times), x, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2.5 - barHeight);
  renderText(ctx, names, x, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP);
  var saturation = Math.round(Math.random() * 100) + '%';
  ctx.fillStyle = 'hsl(240, ' + saturation + ', 50%)';
  if (names === 'Вы') {
    ctx.fillStyle = CURRENT_PLAYER_COLOR;
  }
  ctx.fillRect(x, y, BAR_WIDTH, barHeight);
};

var renderColumns = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderColumn(ctx, names[i], times[i], CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - FONT_GAP * 2 - (BAR_HEIGHT * times[i]) / maxTime, (BAR_HEIGHT * times[i]) / maxTime);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderColumns(ctx, names, times);
  renderText(ctx, 'Ура вы победили!', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP, 'hanging');
  renderText(ctx, 'Список результатов:', CLOUD_X + FONT_GAP, CLOUD_Y + FONT_GAP * 2, 'hanging');
};
