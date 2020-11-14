'use strict';

(() => {
  const HOUSING_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const adForm = document.querySelector(`.ad-form`);
  const map = document.querySelector(`.map`);
  const mapPinMain = document.querySelector(`.map__pin--main`);
  let data = [];

  window.main = {
    HOUSING_TYPES,
    adForm,
    map,
    mapPinMain,
    data
  };
})();
