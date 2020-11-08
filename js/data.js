'use strict';

(() => {
  const TITLES = [`Хата с краю`, `Квартира в центре`, `Бунгало под мостом`, `Дворец пионеров`];
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

    return createLocation(x, y);
  };

  const createLocation = (x, y) => {
    return {x, y};
  };

  const generateMockItem = (i) => {
    let location = getRandomLocation();
    let avatarIndex = i + 1;
    return {
      'author': {
        'avatar': `img/avatars/user0${avatarIndex}.png`,
      },
      'offer': {
        'title': getRandomItem(TITLES),
        'address': `${location.x}, ${location.y}`,
        'price': 100 + getRandomInt(1000),
        'type': getRandomItem(window.main.TYPES),
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

  window.data = {
    generateMockData,
    createLocation
  };
})();
