'use strict';

(() => {
  const pinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  const PIN_HEIGHT = 70;
  const PIN_HALF_WIDTH = 25;

  const renderPin = (pin) => {
    let pinsElement = pinsTemplate.cloneNode(true);
    pinsElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
    pinsElement.style.left = (pin.location.x - PIN_HALF_WIDTH) + `px`;
    pinsElement.firstElementChild.src = pin.author.avatar;
    pinsElement.firstElementChild.alt = pin.offer.title;

    return pinsElement;
  };

  window.pin = {renderPin};
})();
