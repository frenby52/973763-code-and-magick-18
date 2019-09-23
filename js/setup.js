'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb (101, 137, 164)', 'rgb (241, 43, 107)', 'rgb (146, 100, 161)', 'rgb (56, 159, 117)', 'rgb (215, 210, 55)', 'rgb (0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_QUANTITY = 4;
var setupBlock = document.querySelector('.setup');
var setupSimilarBlock = document.querySelector('.setup-similar');
var setupSimilarList = document.querySelector('.setup-similar-list');
var wizardTemplateId = document.querySelector('#similar-wizard-template');
var wizardTemplate = wizardTemplateId.content.querySelector('.setup-similar-item');

function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

var createWizardName = function (names, surnames) {
  var randomIndexNames = randomInteger(0, names.length - 1);
  var randomIndexSurnames = randomInteger(0, surnames.length - 1);
  var wizardName = names[randomIndexNames] + ' ' + surnames[randomIndexSurnames];

  return wizardName;
};

var chooseRandomColor = function (colorData) {
  var randomIndex = randomInteger(0, colorData.length - 1);
  var color = colorData[randomIndex];

  return color;
};

var createWizardInfo = function () {
  var wizardInfo =
  {
    name: createWizardName(WIZARD_NAMES, WIZARD_SURNAMES),
    coatColor: chooseRandomColor(WIZARD_COAT_COLORS),
    eyesColor: chooseRandomColor(WIZARD_EYES_COLORS)
  };

  return wizardInfo;
};

var generateWizardsData = function (quantity) {
  var wizardsData = [];
  for (var i = 0; i < quantity; i++) {
    wizardsData[i] = createWizardInfo();
  }

  return wizardsData;
};

var wizardsData = generateWizardsData(WIZARDS_QUANTITY);

var activateSetup = function () {
  setupBlock.classList.remove('hidden');
  setupSimilarBlock.classList.remove('hidden');
};

activateSetup();

var createWizardElement = function (data) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = data.name;
  wizardElement.querySelector('.wizard-coat').style.fill = data.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = data.eyesColor;

  return wizardElement;
};

var fillWizardElements = function (data) {
  var documentFragment = document.createDocumentFragment();
  for (var i = 0; i < data.length; i++) {
    var wizardElement = createWizardElement(data[i]);
    documentFragment.appendChild(wizardElement);
  }

  return documentFragment;
};

var insertWizardElements = function (data) {
  var documentFragment = fillWizardElements(data);
  setupSimilarList.appendChild(documentFragment);
};

insertWizardElements(wizardsData);
