'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
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
      coatColor: window.util.chooseRandomColor(WIZARD_COAT_COLORS),
      eyesColor: window.util.chooseRandomColor(WIZARD_EYES_COLORS)
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

  window.data = {
    wizardsData: wizardsData,
    colors: {
      WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
      WIZARD_EYES_COLORS: WIZARD_EYES_COLORS,
      WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS
    }
  };
})();
