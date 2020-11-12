'use strict';
// загружаем данные на сервер
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
