'use strict';

(() => {
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const adForm = document.querySelector(`.ad-form`);
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);

  window.main = {
    TYPES,
    adForm,
    map,
    mapPinMain
  };
})();
