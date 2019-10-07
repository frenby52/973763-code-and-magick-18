'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');

  var showError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('load-error');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; top:-20px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    setupBlock.insertAdjacentElement('afterbegin', node);
  };

  window.message = {
    showError: showError
  };
})();
