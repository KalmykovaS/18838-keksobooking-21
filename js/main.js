'use strict';

const TITLES = [`Хата с краю`, `Квартира в центре`, `Бунгало под мостом`, `Дворец пионеров`];
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
// const TYPES_LOCAL = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

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
  pinsElement.style.top = (pin.location.y - 70) + `px`;
  pinsElement.style.left = (pin.location.x - 25) + `px`;
  pinsElement.firstElementChild.src = pin.author.avatar;
  pinsElement.firstElementChild.alt = pin.offer.title;

  return pinsElement;
};

const populatePins = () => {
  const dataPins = generateMockData();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < dataPins.length; i++) {
    fragment.appendChild(renderPin(dataPins[i]));
  }

  return pins.appendChild(fragment);
};

// const firstCard = generateMockData()[0];
// const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card.popup`);

// todo: 2) метод отрисовки карточки можно закомментировать до тех пор,
// пока вы не доберётесь до 2-й части задания, чтобы не ругался линтер
// const renderCard = (card) => {
//   let cardElement = cardTemplate.cloneNode(true);
//   let typeIndex = TYPES.indexOf(card.offer.type);

//   cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
//   cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
//   cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
//   cardElement.querySelector(`.popup__type`).textContent = TYPES_LOCAL[typeIndex];
//   cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
//   cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;

//   let featuresCard = cardElement.querySelector(`.popup__features`);
//   featuresCard.innerHTML = ``;
//   for (let j = 0; j < card.offer.features.length; j++) {
//     let item = document.createElement(`li`);
//     item.classList.add(`popup__feature`);
//     item.classList.add(`popup__feature--${card.offer.features[j]}`);
//     featuresCard.appendChild(item);
//   }

//   cardElement.querySelector(`.popup__description`).textContent = card.offer.description;

//   let imgElement = cardElement.querySelector(`.popup__photo`).cloneNode(true);
//   let photosCard = cardElement.querySelector(`.popup__photos`);
//   photosCard.innerHTML = ``;
//   for (let k = 0; k < card.offer.photos.length; k++) {
//     let itemImg = imgElement.cloneNode(true);
//     itemImg.src = card.offer.photos[k];
//     photosCard.appendChild(itemImg);
//   }

//   cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;

//   return cardElement;
// };

// document.querySelector(`.map`).appendChild(renderCard(firstCard));


const mapPinMain = document.querySelector(`.map__pin--main`);

// const setFormEnabled = (enabled) => {
//   const adForm = document.querySelector(`.ad-form`);
//   const adFormFieldset = adForm.querySelectorAll(`fieldset`);
//   const mapFilters = document.querySelector(`.map__filters`);
//   const mapFiltersSelect = mapFilters.querySelectorAll(`select`);

//   const functionName = enabled ? `removeAttribute` : `setAttribute`;

//   for (let i = 0; i < adFormFieldset.length; i++) {
//     adFormFieldset[i][functionName](`disabled`, `disabled`);
//   }

//   for (let i = 0; i < mapFiltersSelect.length; i++) {
//     mapFiltersSelect[i][functionName](`disabled`, `disabled`);
//   }
// };

// переделать на fieldset и select
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
  document.querySelector(`.map`).classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);
  populatePins();
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button !== 0) {
    return;
  }

  if (!activated) {
    activatePage();
  }

  // todo: заполнить поле адреса
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (!activated && evt.key === `Enter`) {
    activatePage();
  }
});

const roomNumber = document.querySelector(`#room_number`);

const capacity = document.querySelector(`#capacity`);

const validateRoomCapacity = () => {
  let valid = (roomNumber.value === 100 && capacity.value !== 0) ||
   (roomNumber.value >= capacity.value);

  if (valid) {
    roomNumber.setCustomValidity(``);
  } else {
    if (roomNumber.value === 100 && capacity.value !== 0) {
      roomNumber.setCustomValidity(`Простите, но 100 комнат - не для гостей!`);
    } else if (roomNumber.value < capacity.value) {
      roomNumber.setCustomValidity(`Выберите большее количество комнат`);
    }
  }

  return valid;
};

const validateForm = () => {
  validateRoomCapacity();
};

const submitButton = document.querySelector(`.ad-form__submit`);
submitButton.addEventListener(`click`, validateForm);
