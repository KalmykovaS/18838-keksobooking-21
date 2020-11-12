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

  const removeError = () => {
    let errorNode = document.querySelector(`#error`);
    if (errorNode) {
      errorNode.remove();
    }
  };

  const successHandler = (data) => {
    activated = true;

    removeError();
    enableControls(activated, adForm);
    enableControls(activated, mapFilters);
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.map.populatePins(data);
  };

  const errorHandler = (errorMessage) => {
    removeError();

    let node = document.createElement(`div`);
    node.id = `error`;
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: rgba(255,0,0,0.7);`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.top = `100px`;
    node.style.fontSize = `25px`;

    node.textContent = errorMessage;
    map.insertAdjacentElement(`afterbegin`, node);
  };

  const activatePage = () => {
    window.load(successHandler, errorHandler);
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
