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
  var wizards;
  var coatColor = wizardCoat.style.fill;
  var eyesColor = wizardEyes.style.fill;

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
    var takeNumber = data.length > WIZARDS_QUANTITY ? WIZARDS_QUANTITY : data.length;
    for (var i = 0; i < takeNumber; i++) {
      var wizardElement = createWizardElement(data[i]);
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
    wizards = data;
    // insertWizardElements(data);
    updateWizards();
    activateSetupSimilar();
  };

  var getRank = function (data) {
    var rank = 0;

    if (data.colorCoat === coatColor) {
      rank += 2;
    }
    if (data.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    var uniqueWizards = wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
    clearSimilarList();
    insertWizardElements(uniqueWizards);
  };

  var loadErrorHandler = function (error) {
    window.message.showError(error);
  };

  var formUploadHandler = function () {
    setupBlock.classList.add('hidden');
    resetPopupCoordinates();
    clearSimilarList();
    window.message.removeErrorMessage();
  };

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(setupWizardForm), formUploadHandler, loadErrorHandler);
    evt.preventDefault();
  };

  setupWizardForm.addEventListener('submit', formSubmitHandler);

  var coatChangeHandler = window.debounce(updateWizards);
  var eyesChangeHandler = window.debounce(updateWizards);

  var openPopup = function () {
    window.backend.load(loadHandler, loadErrorHandler);
    setupBlock.classList.remove('hidden');
    wizardCoat.addEventListener('click', function () {
      var newCoatColor = window.util.chooseRandomColor(window.colors.WIZARD_COAT_COLORS);
      wizardCoat.style.fill = newCoatColor;
      coatColorInput.value = newCoatColor;
      coatColor = newCoatColor;
      coatChangeHandler();
    });

    wizardEyes.addEventListener('click', function () {
      var newEyesColor = window.util.chooseRandomColor(window.colors.WIZARD_EYES_COLORS);
      wizardEyes.style.fill = newEyesColor;
      eyesColorInput.value = newEyesColor;
      eyesColor = newEyesColor;
      eyesChangeHandler();
    });

    setupFireball.addEventListener('click', function () {
      var newFireballColor = window.util.chooseRandomColor(window.colors.WIZARD_FIREBALL_COLORS);
      setupFireball.style.backgroundColor = newFireballColor;
      fireballColorInput.value = newFireballColor;
    });

    document.addEventListener('keydown', popupEscPressHandler);
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', popupEscPressHandler);
    clearSimilarList();
    window.message.removeErrorMessage();
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

