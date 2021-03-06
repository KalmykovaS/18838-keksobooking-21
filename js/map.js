'use strict';

(() => {
  const MAIN_PIN_MARK_HEIGHT = 22;
  const MAIN_PIN_HALF_EDGE_DEFAULT = 31;
  const MAIN_PIN_TOP_DEFAULT = 375;
  const MAIN_PIN_LEFT_DEFAULT = 570;
  const pins = document.querySelector(`.map__pins`);
  const mapPinMain = window.main.mapPinMain;

  const createLocation = (x, y) => {
    return {x, y};
  };

  const getMainPinCenterLocation = () => {
    let mainPinTop = parseInt(mapPinMain.style.top, 10);
    let mainPinLeft = parseInt(mapPinMain.style.left, 10);

    return createLocation(mainPinLeft + MAIN_PIN_HALF_EDGE_DEFAULT, mainPinTop + MAIN_PIN_HALF_EDGE_DEFAULT);
  };

  const resetMainPinLocation = () => {
    mapPinMain.style.top = `${MAIN_PIN_TOP_DEFAULT}px`;
    mapPinMain.style.left = `${MAIN_PIN_LEFT_DEFAULT}px`;
  };

  const populatePins = (dataPins) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataPins.length; i++) {
      let pin = window.pin.renderPin(dataPins[i]);
      pin.addEventListener(`click`, () => {
        window.main.map.appendChild(window.card.renderCard(dataPins[i]));
        pin.classList.add(`map__pin--active`);
      });
      fragment.appendChild(pin);
    }

    pins.appendChild(fragment);
  };

  const clearPins = () => {
    document.querySelectorAll(`.map__pin:not(.map__pin--main)`).forEach((node) => node.remove());
  };

  const getMainPinLocation = () => {
    let location = getMainPinCenterLocation();

    location.y += (MAIN_PIN_HALF_EDGE_DEFAULT + MAIN_PIN_MARK_HEIGHT);

    return location;
  };

  const updateAddressLocation = (location) => {
    let address = document.querySelector(`#address`);
    address.value = `${location.x}, ${location.y}`;
  };

  let mainPinAddressLocation = getMainPinCenterLocation();
  updateAddressLocation(mainPinAddressLocation);

  window.map = {
    populatePins,
    clearPins,
    getMainPinLocation,
    getMainPinCenterLocation,
    updateAddressLocation,
    resetMainPinLocation
  };
})();
