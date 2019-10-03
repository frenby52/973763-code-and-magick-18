'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_QUANTITY = 4;

  var createWizardName = function (names, surnames) {
    var randomIndexNames = window.util.randomInteger(0, names.length - 1);
    var randomIndexSurnames = window.util.randomInteger(0, surnames.length - 1);
    var wizardName = names[randomIndexNames] + ' ' + surnames[randomIndexSurnames];

    return wizardName;
  };

  var createWizardInfo = function () {
    return {
      name: createWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
      coatColor: window.util.chooseRandomColor(window.colors.WIZARD_COAT_COLORS),
      eyesColor: window.util.chooseRandomColor(window.colors.WIZARD_EYES_COLORS)
    };
  };

  var generateWizardsData = function (quantity) {
    var wizardsData = [];
    for (var i = 0; i < quantity; i++) {
      wizardsData[i] = createWizardInfo();
    }

    return wizardsData;
  };

  var wizardsData = generateWizardsData(WIZARDS_QUANTITY);

  window.data = wizardsData;
})();
