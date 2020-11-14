'use strict';

(() => {
  const MAX_PIN_NUMBER = 5;
  const ANY = `any`;

  const populatePins = window.map.populatePins;
  const clearPins = window.map.clearPins;
  const removeCard = window.card.removeCard;

  const mapFilters = document.querySelector(`.map__filters`);

  const housingType = mapFilters.querySelector(`#housing-type`);
  // const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);
  // const housingFeatures = mapFilters.querySelector(`#housing-features`);

  const filterData = (data) => {
    return data.filter((item) => {
      const isHousingTypeMatched = housingType.value === ANY || housingType.value === item.offer.type;
      // const isHousingPriceMatched = housingPrice.value === ANY || housingPrice.value === ;
      const isHousingRoomsMatched = housingRooms.value === ANY || housingRooms.value === item.offer.rooms;
      const isHousingGuestsMatched = housingGuests.value === ANY || housingGuests.value === item.offer.guests;

      return isHousingTypeMatched && isHousingRoomsMatched && isHousingGuestsMatched;
    }).slice(0, MAX_PIN_NUMBER);
  };

  housingType.addEventListener(`change`, () => {
    removeCard();
    clearPins();
    populatePins(filterData(window.main.data));
  });

  window.filter = {
    filterData
  };
})();
