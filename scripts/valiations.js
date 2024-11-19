const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputElement, errorMsg, config) => {
  const errorMsgID = `#${inputElement.id}-error`;
  const errorMsgEl = document.querySelector(errorMsgID);
  errorMsgEl.textContent = errorMsg;
  inputElement.classList.add(settings.inputErrorClass);
  errorMsgEl.classList.add(settings.errorClass);
};

const hideInputError = (formEl, inputElement, config,) => {
  const errorMsgID = `#${inputElement.id}-error`;
  const errorMsgEl = document.querySelector(errorMsgID);
  errorMsgEl.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
  errorMsgEl.classList.remove(settings.errorClass);
};

const checkInputValidity = (formEl, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formEl, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formEl, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  const isInvalid = hasInvalidInput(inputList);

  if (isInvalid) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

const resetValidation = (formEl, inputList) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input);
  });
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(settings.inputSelector));
  const buttonElement = formEl.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEl, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl);
  });
};

enableValidation(settings);

