'use strict';

(function () {
  var getRank = function (data, coatColor, eyesColor) {
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

  window.getUniqueWizards = function (data, coatColor, eyesColor) {
    return data.sort(function (left, right) {
      var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    });
  };
})();
