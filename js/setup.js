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

  var isFocus = false;

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
  };

  var popupEscPressHandler = function (evt) {
    if (!isFocus) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', setupOpenEnterHandler);

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', setupCloseEnterHandler);
})();

