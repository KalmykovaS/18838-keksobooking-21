'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const adForm = window.main.adForm;
  const map = window.main.map;
  const mapPinMain = window.main.mapPinMain;
  const getMainPinLocation = window.map.getMainPinLocation;
  const getMainPinCenterLocation = window.map.getMainPinCenterLocation;
  const updateAddressLocation = window.map.updateAddressLocation;

  const enableControls = (enabled, controlsContainer) => {
    const functionName = enabled ? `removeAttribute` : `setAttribute`;

    const controls = controlsContainer.querySelectorAll(`select, fieldset`);

    for (let i = 0; i < controls.length; i++) {
      controls[i][functionName](`disabled`, `disabled`);
    }
  };

  const removeError = () => {
    let errorNode = document.querySelector(`#load_error`);
    if (errorNode) {
      errorNode.remove();
    }
  };

  const updatePageState = (activated) => {
    enableControls(activated, adForm);
    enableControls(activated, mapFilters);
    if (activated) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
      updateAddressLocation(getMainPinLocation());
    } else {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      window.map.resetMainPinLocation();
      updateAddressLocation(getMainPinCenterLocation());
    }
  };

  const successHandler = (data) => {
    activated = true;

    removeError();
    updatePageState(activated);
    window.main.data = data;
    const filteredData = window.filter.filterData(data);
    window.map.populatePins(filteredData);
  };

  const errorHandler = (errorMessage) => {
    removeError();

    let node = document.createElement(`div`);
    node.id = `load_error`;
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
    window.backend.load(successHandler, errorHandler);
  };
  const deactivatePage = () => {
    activated = false;
    updatePageState(activated);
    window.map.clearPins();
    window.card.removeCard();
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
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key !== `Enter`) {
      return;
    }

    if (!activated) {
      activatePage();
    }
  });

  window.pageState = {
    activatePage,
    deactivatePage
  };
})();
