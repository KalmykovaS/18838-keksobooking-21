'use strict';

(() => {
  const MIN_Y = 130;
  const MAX_Y = 630;
  const MAIN_PIN_HEAD_HEIGHT = 84;
  const mapPinMain = window.main.mapPinMain;
  const getMainPinLocation = window.map.getMainPinLocation;
  const updateAddressLocation = window.map.updateAddressLocation;
  const pins = document.querySelector(`.map__pins`);


  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let newTopCoordinate = mapPinMain.offsetTop - shift.y;
      let newLeftCoordinate = mapPinMain.offsetLeft - shift.x;

      newTopCoordinate = Math.max(newTopCoordinate, MIN_Y - MAIN_PIN_HEAD_HEIGHT);
      newTopCoordinate = Math.min(newTopCoordinate, MAX_Y - MAIN_PIN_HEAD_HEIGHT);

      let pinsBounds = pins.getBoundingClientRect();
      let minX = 0;
      let maxX = pinsBounds.width - mapPinMain.clientWidth;

      newLeftCoordinate = Math.max(newLeftCoordinate, minX);
      newLeftCoordinate = Math.min(newLeftCoordinate, maxX);

      mapPinMain.style.top = `${newTopCoordinate}px`;
      mapPinMain.style.left = `${newLeftCoordinate}px`;

      updateAddressLocation(getMainPinLocation());
    };

    let onMouseUp;
    onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        let onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mapPinMain.removeEventListener(`click`, onClickPreventDefault);
        };
        mapPinMain.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
