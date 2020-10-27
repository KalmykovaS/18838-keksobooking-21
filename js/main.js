'use strict';

const TITLES = [`Хата с краю`, `Квартира в центре`, `Бунгало под мостом`, `Дворец пионеров`];
const TYPES = [`palace`, `flat`, `house`, `bungalo`];
const TYPES_LOCAL = [`Дворец`, `Квартира`, `Дом`, `Бунгало`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const getRandomInt = function (max) {
  return Math.floor(Math.random() * Math.floor(max));
};

const getRandomItem = function (arr) {
  let index = Math.floor(Math.random() * arr.length);

  return arr[index];
};

const getRandomItems = function (arr) {
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

const getRandomLocation = function () {
  let x = getRandomInt(1000);
  let y = 130 + getRandomInt(500);

  return {
    'x': x,
    'y': y
  };
};

const generateMockItem = function (i) {
  let location = getRandomLocation();
  return /* pin: */ {
    'author': {
      'avatar': `img/avatars/user0` + i + `.png`,
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

const generateMockData = function () {
  let mockData = [];
  for (let i = 0; i < 8; i++) {
    mockData[i] = generateMockItem(i + 1);
    // почему +1?
  }
  return mockData;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

const pins = document.querySelector(`.map__pins`);
const pinsTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPin = function (pin) {
  let pinsElement = pinsTemplate.cloneNode(true);
  pinsElement.style.top = (pin.location.y - 70) + `px`;
  pinsElement.style.left = (pin.location.x - 25) + `px`;
  pinsElement.firstElementChild.src = pin.author.avatar;
  pinsElement.firstElementChild.alt = pin.offer.title;

  return pinsElement;
};

const dataPins = generateMockData();
const fragment = document.createDocumentFragment();
for (let i = 0; i < dataPins.length; i++) {
  fragment.appendChild(renderPin(dataPins[i]));
}

pins.appendChild(fragment);
