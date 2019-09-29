'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  var chooseRandomColor = function (colorData) {
    var randomIndex = randomInteger(0, colorData.length - 1);

    return colorData[randomIndex];
  };

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

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    randomInteger: randomInteger,
    chooseRandomColor: chooseRandomColor,
    getMaxElement: getMaxElement,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
