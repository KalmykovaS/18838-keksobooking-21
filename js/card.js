'use strict';

(() => {
  const HOUSING_TYPES_LOCAL = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card.popup`);

  let onPopupEscapeClose = (evt) => {
    if (evt.key === `Escape`) {
      removeCard();
    }
  };

  const removeCard = () => {
    let popup = document.querySelector(`.map__card.popup`);
    if (popup) {
      popup.remove();
    }
    deleteActivePinClass();
    document.removeEventListener(`keydown`, onPopupEscapeClose);
  };

  const deleteActivePinClass = () => {
    const activePin = document.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const renderCard = (card) => {
    removeCard();

    let cardElement = cardTemplate.cloneNode(true);
    let typeIndex = window.main.HOUSING_TYPES.indexOf(card.offer.type);

    cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
    cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
    cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
    cardElement.querySelector(`.popup__type`).textContent = HOUSING_TYPES_LOCAL[typeIndex];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

    let featuresCard = cardElement.querySelector(`.popup__features`);
    featuresCard.innerHTML = ``;
    for (let j = 0; j < card.offer.features.length; j++) {
      let item = document.createElement(`li`);
      item.classList.add(`popup__feature`);
      item.classList.add(`popup__feature--${card.offer.features[j]}`);
      featuresCard.appendChild(item);
    }

    cardElement.querySelector(`.popup__description`).textContent = card.offer.description;

    let imgElement = cardElement.querySelector(`.popup__photo`).cloneNode(true);
    let photosCard = cardElement.querySelector(`.popup__photos`);
    photosCard.innerHTML = ``;
    for (let k = 0; k < card.offer.photos.length; k++) {
      let itemImg = imgElement.cloneNode(true);
      itemImg.src = card.offer.photos[k];
      photosCard.appendChild(itemImg);
    }

    cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;

    let popupClose = cardElement.querySelector(`.popup__close`);
    let onPopupClose;
    onPopupClose = () => {
      removeCard();
      popupClose.removeEventListener(`click`, onPopupClose);
    };
    popupClose.addEventListener(`click`, onPopupClose);
    document.addEventListener(`keydown`, onPopupEscapeClose);

    return cardElement;
  };

  window.card = {
    renderCard,
    removeCard
  };
})();
