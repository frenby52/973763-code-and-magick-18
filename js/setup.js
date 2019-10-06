'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupBlock.querySelector('.setup-close');
  var userNameInput = setupBlock.querySelector('.setup-user-name');
  var setupWizardAppearance = setupBlock.querySelector('.setup-wizard-appearance');
  var wizardCoat = setupWizardAppearance.querySelector('.wizard-coat');
  var coatColorInput = setupWizardAppearance.querySelector('input[name="coat-color"]');
  var wizardEyes = setupWizardAppearance.querySelector('.wizard-eyes');
  var eyesColorInput = setupWizardAppearance.querySelector('input[name="eyes-color"]');
  var setupFireball = setupBlock.querySelector('.setup-fireball-wrap');
  var fireballColorInput = setupFireball.querySelector('input[name="fireball-color"]');
  var setupSimilarBlock = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var wizardTemplateId = document.querySelector('#similar-wizard-template');
  var wizardTemplate = wizardTemplateId.content.querySelector('.setup-similar-item');
  var setupWizardForm = setupBlock.querySelector('.setup-wizard-form');
  var WIZARDS_QUANTITY = 4;

  var defaultX = setupBlock.style.top;
  var defaultY = setupBlock.style.left;

  var resetPopupCoordinates = function () {
    setupBlock.style.top = defaultX;
    setupBlock.style.left = defaultY;
  };

  var activateSetupSimilar = function () {
    setupSimilarBlock.classList.remove('hidden');
  };

  var createWizardElement = function (data) {
    var wizardElement = wizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = data.name;
    wizardElement.querySelector('.wizard-coat').style.fill = data.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.colorEyes;

    return wizardElement;
  };

  var createWizardElements = function (data) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_QUANTITY; i++) {
      var randomIndexWizards = window.util.randomInteger(0, data.length - 1);
      var wizardElement = createWizardElement(data[randomIndexWizards]);
      documentFragment.appendChild(wizardElement);
    }

    return documentFragment;
  };

  var insertWizardElements = function (data) {
    var documentFragment = createWizardElements(data);
    setupSimilarList.appendChild(documentFragment);
  };

  var clearSimilarList = function () {
    setupSimilarList.innerHTML = '';
  };

  var loadHandler = function (data) {
    insertWizardElements(data);
    activateSetupSimilar();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; top:-20px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    setupSimilarList.insertAdjacentElement('afterbegin', node);
  };

  var formUploadHandler = function () {
    setupBlock.classList.add('hidden');
    resetPopupCoordinates();
    clearSimilarList();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(setupWizardForm), formUploadHandler, errorHandler);
    evt.preventDefault();
  };

  setupWizardForm.addEventListener('submit', formSubmitHandler);

  var openPopup = function () {
    window.backend.load(loadHandler, errorHandler);
    setupBlock.classList.remove('hidden');
    wizardCoat.addEventListener('click', function () {
      var coatColor = window.util.chooseRandomColor(window.colors.WIZARD_COAT_COLORS);
      wizardCoat.style.fill = coatColor;
      coatColorInput.value = coatColor;
    });

    wizardEyes.addEventListener('click', function () {
      var eyesColor = window.util.chooseRandomColor(window.colors.WIZARD_EYES_COLORS);
      wizardEyes.style.fill = eyesColor;
      eyesColorInput.value = eyesColor;
    });

    setupFireball.addEventListener('click', function () {
      var fireballColor = window.util.chooseRandomColor(window.colors.WIZARD_FIREBALL_COLORS);
      setupFireball.style.backgroundColor = fireballColor;
      fireballColorInput.value = fireballColor;
    });

    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    clearSimilarList();
  };

  var setupOpenEnterHandler = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var setupCloseEnterHandler = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
    resetPopupCoordinates();
  };

  var popupEscPressHandler = function (evt) {
    if (userNameInput !== document.activeElement) {
      window.util.isEscEvent(evt, closePopup);
      resetPopupCoordinates();
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', setupOpenEnterHandler);

  setupClose.addEventListener('click', function () {
    closePopup();
    resetPopupCoordinates();
  });

  setupClose.addEventListener('keydown', setupCloseEnterHandler);
})();

