'use strict';

const TITLES = [`Хата с краю`, `Квартира в центре`, `Бунгало под мостом`, `Дворец пионеров`];
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TYPES_LOCAL = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const MAIN_PIN_HEIGHT = 84;
const MAIN_PIN_HALF_WIDTH = 31;
const PIN_HEIGHT = 70;
const PIN_HALF_WIDTH = 25;
const TITLE_FORM_MIN_LENGTH = 30;
const TITLE_FORM_MAX_LENGTH = 100;
const PRICE_FORM_MAX_LENGTH = 1000000;

const mapPinMain = document.querySelector(`.map__pin--main`);
const map = document.querySelector(`.map`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card.popup`);

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const getRandomItem = (arr) => {
  let index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

const getRandomItems = (arr) => {
  let length = getRandomInt(arr.length);
  if (length === 0 && arr.length > 1) {
    length = 1;
  }
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(arr[i]);
  }
  return result;
};

const getRandomLocation = () => {
  let x = getRandomInt(1000);
  let y = 130 + getRandomInt(500);

  return createLocation(x, y);
};

const createLocation = (x, y) => {
  return {
    'x': x,
    'y': y
  };
};

const generateMockItem = (i) => {
  let location = getRandomLocation();
  let avatarIndex = i + 1;
  return /* pin: */ {
    'author': {
      'avatar': `img/avatars/user0${avatarIndex}.png`, // user01..user08
    },
    'offer': {
      'title': getRandomItem(TITLES),
      'address': `${location.x}, ${location.y}`,
      'price': 100 + getRandomInt(1000),
      'type': getRandomItem(TYPES),
      'rooms': 1 + getRandomInt(10),
      'guests': 1 + getRandomInt(10),
      'checkin': 12 + getRandomInt(3) + `:00`,
      'checkout': 12 + getRandomInt(3) + `:00`,
      'features': getRandomItems(FEATURES),
      'description': `строка с описанием`,
      'photos': getRandomItems(PHOTOS),
    },
    'location': location
  };
};

const generateMockData = () => {
  let mockData = [];
  for (let i = 0; i < 8; i++) {
    mockData[i] = generateMockItem(i);
  }
  return mockData;
};

const pins = document.querySelector(`.map__pins`);
const pinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = (pin) => {
  let pinsElement = pinsTemplate.cloneNode(true);
  pinsElement.style.top = (pin.location.y - PIN_HEIGHT) + `px`;
  pinsElement.style.left = (pin.location.x - PIN_HALF_WIDTH) + `px`;
  pinsElement.firstElementChild.src = pin.author.avatar;
  pinsElement.firstElementChild.alt = pin.offer.title;

  return pinsElement;
};

const getMainPinCenterLocation = () => {
  let mainPinTop = parseInt(mapPinMain.style.top, 10);
  let mainPinLeft = parseInt(mapPinMain.style.left, 10);

  return createLocation(mainPinLeft, mainPinTop);
};


const getMainPinLocation = () => {
  let location = getMainPinCenterLocation();

  location.x -= MAIN_PIN_HALF_WIDTH;
  location.y -= MAIN_PIN_HEIGHT;

  return location;
};

const populatePins = () => {
  const dataPins = generateMockData();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < dataPins.length; i++) {
    let pin = renderPin(dataPins[i]);
    pin.addEventListener(`click`, () => {
      map.appendChild(renderCard(dataPins[i]));
    });
    fragment.appendChild(pin);
  }

  pins.appendChild(fragment);
};

const renderCard = (card) => {
  let cardElement = cardTemplate.cloneNode(true);
  let typeIndex = TYPES.indexOf(card.offer.type);

  cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = TYPES_LOCAL[typeIndex];
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
    cardElement.remove();
    popupClose.removeEventListener(`click`, onPopupClose);
  };
  popupClose.addEventListener(`click`, onPopupClose);

  return cardElement;
};

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    let popup = document.querySelector(`.map__card.popup`);
    if (popup) {
      popup.remove();
    }
  }
});

/* Page activation */

const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

const enableControls = (enabled, controlsContainer) => {
  const functionName = enabled ? `removeAttribute` : `setAttribute`;

  const controls = controlsContainer.querySelectorAll(`select, fieldset`);

  for (let i = 0; i < controls.length; i++) {
    controls[i][functionName](`disabled`, `disabled`);
  }
};

let activated = false;
enableControls(activated, adForm);
enableControls(activated, mapFilters);

const activatePage = () => {
  activated = true;

  enableControls(activated, adForm);
  enableControls(activated, mapFilters);
  map.classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  populatePins();
};

const updateAddressLocation = (location) => {
  let address = document.querySelector(`#address`);
  address.value = `${location.x}, ${location.y}`;
};
let mainPinLocation = getMainPinCenterLocation();
updateAddressLocation(mainPinLocation);

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button !== 0) {
    return;
  }

  if (!activated) {
    activatePage();
  }

  mainPinLocation = getMainPinLocation();
  updateAddressLocation(mainPinLocation);
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key !== `Enter`) {
    return;
  }

  if (!activated) {
    activatePage();
  }

  mainPinLocation = getMainPinLocation();
  updateAddressLocation(mainPinLocation);
});


/* Validation */

const formTitle = adForm.querySelector(`#title`);
const formPrice = adForm.querySelector(`#price`);
const formType = adForm.querySelector(`#type`);
const formRoomNumber = adForm.querySelector(`#room_number`);
const formCapacity = adForm.querySelector(`#capacity`);
const formTimein = adForm.querySelector(`#timein`);
const formTimeout = adForm.querySelector(`#timeout`);

const onTitleChange = () => {
  let valueTitleLength = formTitle.value.length;

  if (valueTitleLength < TITLE_FORM_MIN_LENGTH) {
    formTitle.setCustomValidity(`Ещё ${TITLE_FORM_MIN_LENGTH - valueTitleLength} символов`);
  } else if (valueTitleLength > TITLE_FORM_MAX_LENGTH) {
    formTitle.setCustomValidity(`Удалите лишние ${valueTitleLength - TITLE_FORM_MAX_LENGTH} символов`);
  } else {
    formTitle.setCustomValidity(``);
  }

  formTitle.reportValidity();
};

const validatePrice = () => {
  const valuePrice = formPrice.value;

  if (valuePrice < typeToMinPrice[formType.value]) {
    formPrice.setCustomValidity(`Меньше минимального значения`);
  } else if (valuePrice > PRICE_FORM_MAX_LENGTH) {
    formPrice.setCustomValidity(`Превышено максимальное значение`);
  } else {
    formPrice.setCustomValidity(``);
  }

  formPrice.reportValidity();
};

const typeToMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
const updateMinPricePlaceholder = () => {
  formPrice.placeholder = typeToMinPrice[formType.value];
};

const syncSelectedIndices = (source, target) => {
  return () => {
    target.selectedIndex = source.selectedIndex;
  };
};

const validateRoomCapacity = () => {
  if (formRoomNumber.value === 100 && formCapacity.value !== 0) {
    formCapacity.setCustomValidity(`Простите, но 100 комнат - не для гостей!`);
  } else if (formRoomNumber.value < formCapacity.value) {
    formCapacity.setCustomValidity(`Выберите большее количество комнат`);
  } else {
    formCapacity.setCustomValidity(``);
  }

  formCapacity.reportValidity();
};

const onCapacityChange = validateRoomCapacity;
const onRoomNumberChange = validateRoomCapacity;
const onTypeChange = () => {
  updateMinPricePlaceholder();
  validatePrice();
};
const onPriceChange = validatePrice;

formTitle.addEventListener(`input`, onTitleChange);
formPrice.addEventListener(`input`, onPriceChange);
formRoomNumber.addEventListener(`change`, onRoomNumberChange);
formCapacity.addEventListener(`change`, onCapacityChange);
formType.addEventListener(`change`, onTypeChange);
formTimein.addEventListener(`change`, syncSelectedIndices(formTimein, formTimeout));
formTimeout.addEventListener(`change`, syncSelectedIndices(formTimeout, formTimein));
