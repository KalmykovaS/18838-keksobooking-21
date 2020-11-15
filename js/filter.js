'use strict';

(() => {
  const MAX_PIN_NUMBER = 5;
  const PriceStatus = {
    ANY: `any`,
    MIDDLE: `middle`,
    LOW: `low`,
    HIGH: `high`
  };

  const populatePins = window.map.populatePins;
  const clearPins = window.map.clearPins;
  const removeCard = window.card.removeCard;

  const mapFilters = document.querySelector(`.map__filters`);

  const housingType = mapFilters.querySelector(`#housing-type`);
  const housingPrice = mapFilters.querySelector(`#housing-price`);
  const housingRooms = mapFilters.querySelector(`#housing-rooms`);
  const housingGuests = mapFilters.querySelector(`#housing-guests`);
  const housingFeatures = mapFilters.querySelector(`#housing-features`);

  const prices = {
    min: 10000,
    max: 50000
  };

  const checkPrice = (element) => {
    switch (housingPrice.value) {
      case PriceStatus.ANY:
        return true;
      case PriceStatus.LOW:
        return (element.offer.price < prices.min);
      case PriceStatus.MIDDLE:
        return (element.offer.price > prices.min) && (element.offer.price < prices.max);
      case PriceStatus.HIGH:
        return (element.offer.price > prices.max);
      default:
        return element === housingPrice.value;
    }
  };

  const createRequiredFeatures = () => {
    return Array.from(housingFeatures.querySelectorAll(`input:checked`)).map((item) => {
      return item.value;
    });
  };

  const filterData = (data) => {
    return data.filter((item) => {
      const isHousingTypeMatched = housingType.value === PriceStatus.ANY || housingType.value === item.offer.type;
      const isHousingPriceMatched = checkPrice(item);
      const isHousingRoomsMatched = housingRooms.value === PriceStatus.ANY || parseInt(housingRooms.value, 10) === item.offer.rooms;
      const isHousingGuestsMatched = housingGuests.value === PriceStatus.ANY || parseInt(housingGuests.value, 10) === item.offer.guests;
      const isHousingFeatures = createRequiredFeatures().every((feature) => {
        return item.offer.features.includes(feature);
      });

      return isHousingTypeMatched &&
              isHousingPriceMatched &&
              isHousingRoomsMatched &&
              isHousingGuestsMatched &&
              isHousingFeatures;
    }).slice(0, MAX_PIN_NUMBER);
  };

  const onFilterChange = window.debounce(() => {
    removeCard();
    clearPins();
    populatePins(filterData(window.main.data));
  });

  housingType.addEventListener(`change`, onFilterChange);
  housingPrice.addEventListener(`change`, onFilterChange);
  housingRooms.addEventListener(`change`, onFilterChange);
  housingGuests.addEventListener(`change`, onFilterChange);
  housingFeatures.addEventListener(`change`, onFilterChange);

  window.filter = {
    filterData
  };
})();
