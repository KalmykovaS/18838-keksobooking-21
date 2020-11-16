'use strict';

(() => {
  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SUBMIT_URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT_IN_MS = 10000;

  const StatusCode = {
    OK: 200
  };
  const MethodHTTP = {
    GET: `GET`,
    POST: `POST`
  };

  const load = (onSuccess, onError) => {
    sendRequest(onSuccess, onError, MethodHTTP.GET, DATA_URL);
  };

  const upload = (data, onSuccess, onError) => {
    sendRequest(onSuccess, onError, MethodHTTP.POST, SUBMIT_URL, data);
  };

  const sendRequest = (onSuccess, onError, method, url, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load,
    upload
  };
})();
