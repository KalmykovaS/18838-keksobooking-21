'use strict';

(() => {
  const MAIN_PIN_HEIGHT = 84;
  const MAIN_PIN_HALF_WIDTH = 31;
  const pins = document.querySelector(`.map__pins`);
  const mapPinMain = window.main.mapPinMain;

  const getMainPinCenterLocation = () => {
    let mainPinTop = parseInt(mapPinMain.style.top, 10);
    let mainPinLeft = parseInt(mapPinMain.style.left, 10);

    return window.data.createLocation(mainPinLeft, mainPinTop);
  };

  const populatePins = () => {
    const dataPins = window.data.generateMockData();
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataPins.length; i++) {
      let pin = window.pin.renderPin(dataPins[i]);
      pin.addEventListener(`click`, () => {
        window.main.map.appendChild(window.card.renderCard(dataPins[i]));
      });
      fragment.appendChild(pin);
    }

    pins.appendChild(fragment);
  };

  const getMainPinLocation = () => {
    let location = getMainPinCenterLocation();

    location.x -= MAIN_PIN_HALF_WIDTH;
    location.y -= MAIN_PIN_HEIGHT;

    return location;
  };

  const updateAddressLocation = (location) => {
    let address = document.querySelector(`#address`);
    address.value = `${location.x}, ${location.y}`;
  };

  let mainPinAddressLocation = getMainPinCenterLocation();
  updateAddressLocation(mainPinAddressLocation);

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      let popup = document.querySelector(`.map__card.popup`);
      if (popup) {
        popup.remove();
        // forEach(popup => popup.remove())
      }
    }
  });

  window.map = {
    populatePins,
    getMainPinLocation,
    updateAddressLocation
  };
})();
