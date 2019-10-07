'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var errorElement;

  var showError = function (errorMessage) {
    errorElement = document.createElement('div');
    errorElement.classList.add('load-error');
    errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; top:-20px';
    errorElement.style.position = 'absolute';
    errorElement.style.left = 0;
    errorElement.style.right = 0;
    errorElement.style.fontSize = '30px';
    errorElement.textContent = errorMessage;
    setupBlock.insertAdjacentElement('afterbegin', errorElement);
  };

  var removeErrorMessage = function () {
    if (errorElement) {
      errorElement.remove();
    }
  };

  window.message = {
    showError: showError,
    removeErrorMessage: removeErrorMessage
  };
})();
