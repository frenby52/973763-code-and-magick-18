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
  var isFocus = false;

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
    wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;

    return wizardElement;
  };

  var createWizardElements = function (data) {
    var documentFragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      var wizardElement = createWizardElement(data[i]);
      documentFragment.appendChild(wizardElement);
    }

    return documentFragment;
  };

  var insertWizardElements = function (data) {
    var documentFragment = createWizardElements(data);
    setupSimilarList.appendChild(documentFragment);
  };

  activateSetupSimilar();
  insertWizardElements(window.data.wizardsData);

  var openPopup = function () {
    setupBlock.classList.remove('hidden');
    userNameInput.addEventListener('focus', function () {
      isFocus = true;
    });
    userNameInput.addEventListener('blur', function () {
      isFocus = false;
    });
    wizardCoat.addEventListener('click', function () {
      var coatColor = window.util.chooseRandomColor(window.data.colors.WIZARD_COAT_COLORS);
      wizardCoat.style.fill = coatColor;
      coatColorInput.value = coatColor;
    });

    wizardEyes.addEventListener('click', function () {
      var eyesColor = window.util.chooseRandomColor(window.data.colors.WIZARD_EYES_COLORS);
      wizardEyes.style.fill = eyesColor;
      eyesColorInput.value = eyesColor;
    });

    setupFireball.addEventListener('click', function () {
      var fireballColor = window.util.chooseRandomColor(window.data.colors.WIZARD_FIREBALL_COLORS);
      setupFireball.style.backgroundColor = fireballColor;
      fireballColorInput.value = fireballColor;
    });

    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  var setupOpenEnterHandler = function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  };

  var setupCloseEnterHandler = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
    resetPopupCoordinates();
  };

  var popupEscPressHandler = function (evt) {
    if (!isFocus) {
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

