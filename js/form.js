'use strict';

(() => {
  const TITLE_FORM_MIN_LENGTH = 30;
  const TITLE_FORM_MAX_LENGTH = 100;
  const PRICE_FORM_MAX_LENGTH = 1000000;

  const adForm = window.main.adForm;

  const formTitle = adForm.querySelector(`#title`);
  const formPrice = adForm.querySelector(`#price`);
  const formType = adForm.querySelector(`#type`);
  const formRoomNumber = adForm.querySelector(`#room_number`);
  const formCapacity = adForm.querySelector(`#capacity`);
  const formTimein = adForm.querySelector(`#timein`);
  const formTimeout = adForm.querySelector(`#timeout`);
  const formReset = adForm.querySelector(`.ad-form__reset`);

  const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
  const main = document.querySelector(`main`);

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
    const price = formPrice.value;

    if (price < typeToMinPrice[formType.value]) {
      formPrice.setCustomValidity(`Меньше минимального значения`);
    } else if (price > PRICE_FORM_MAX_LENGTH) {
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
    if (formPrice.value) {
      validatePrice();
    }
  };
  const onPriceChange = validatePrice;

  formTitle.addEventListener(`input`, onTitleChange);
  formPrice.addEventListener(`input`, onPriceChange);
  formRoomNumber.addEventListener(`change`, onRoomNumberChange);
  formCapacity.addEventListener(`change`, onCapacityChange);
  formType.addEventListener(`change`, onTypeChange);
  formTimein.addEventListener(`change`, syncSelectedIndices(formTimein, formTimeout));
  formTimeout.addEventListener(`change`, syncSelectedIndices(formTimeout, formTimein));


  let modalMessage;
  const onModalMessageClick = (evt) => {
    if (modalMessage) {
      evt.preventDefault();
      modalMessage.remove();
      modalMessage = null;
    }
  };
  const modalMessageEscPressHandler = (evt) => {
    if (modalMessage && evt.key === `Escape`) {
      evt.preventDefault();
      modalMessage.remove();
      modalMessage = null;
    }
  };
  document.addEventListener(`click`, onModalMessageClick);
  document.addEventListener(`keydown`, modalMessageEscPressHandler);


  const resetForm = () => {
    adForm.reset();
    updateMinPricePlaceholder();
    window.map.updateAddressLocation(window.map.getMainPinLocation());
  };
  const onResetForm = (evt) => {
    evt.preventDefault();
    resetForm();
  };
  const successHandler = () => {
    modalMessage = successMessageTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, modalMessage);

    resetForm();
    window.pageState.deactivatePage();
  };
  const errorHandler = () => {
    modalMessage = errorMessageTemplate.cloneNode(true);
    main.insertAdjacentElement(`afterbegin`, modalMessage);
  };

  adForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    window.upload(new FormData(adForm), successHandler, errorHandler);
  });

  formReset.addEventListener(`click`, onResetForm);
})();
