'use strict';
// загружаем данные на сервер
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.addEventListener(`error`, onError);

    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
