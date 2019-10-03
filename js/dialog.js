'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupUploadUserpic = setupBlock.querySelector('.upload');

  var setupMoveMousedownHandler = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var mousemoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
      setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
    };

    var mouseupHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mousemoveHandler);
      document.removeEventListener('mouseup', mouseupHandler);

      var clickPreventHandler = function (clickEvt) {
        clickEvt.preventDefault();
        setupUploadUserpic.removeEventListener('click', clickPreventHandler);
      };

      if (dragged) {
        setupUploadUserpic.addEventListener('click', clickPreventHandler);
      }
    };

    document.addEventListener('mousemove', mousemoveHandler);
    document.addEventListener('mouseup', mouseupHandler);
  };

  setupUploadUserpic.addEventListener('mousedown', setupMoveMousedownHandler);
})();
