'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.setup-user-pic');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    if (file) {
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          window.message.removeErrorMessage();
          preview.src = reader.result;
        });

        reader.addEventListener('error', function () {
          window.message.removeErrorMessage();
          window.message.showError('Произошла ошибка загрузки аватара');
        });

        reader.readAsDataURL(file);
      } else {
        window.message.removeErrorMessage();
        window.message.showError('Неверный формат файла аватара');
      }
    }
  });
})();
