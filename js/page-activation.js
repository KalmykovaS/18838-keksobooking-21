'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const adForm = window.main.adForm;
  const map = window.main.map;
  const mapPinMain = window.main.mapPinMain;
  const getMainPinLocation = window.map.getMainPinLocation;
  const updateAddressLocation = window.map.updateAddressLocation;

  const enableControls = (enabled, controlsContainer) => {
    const functionName = enabled ? `removeAttribute` : `setAttribute`;

    const controls = controlsContainer.querySelectorAll(`select, fieldset`);

    for (let i = 0; i < controls.length; i++) {
      controls[i][functionName](`disabled`, `disabled`);
    }
  };

  const activatePage = () => {
    activated = true;

    enableControls(activated, adForm);
    enableControls(activated, mapFilters);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.map.populatePins();
  };

  let activated = false;
  enableControls(activated, adForm);
  enableControls(activated, mapFilters);

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button !== 0) {
      return;
    }

    if (!activated) {
      activatePage();
    }

    updateAddressLocation(getMainPinLocation());
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key !== `Enter`) {
      return;
    }

    if (!activated) {
      activatePage();
    }

    updateAddressLocation(getMainPinLocation());
  });
})();
