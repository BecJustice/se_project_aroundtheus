export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showIputError(inputEl) {
    this.errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this.inputErrorClass);
    this.errorMessageEl.textContent = inputEl.validationMessage;
    this.errorMessageEl.classList.add(this._errorClass);
  }

  _hideIputError(inputEl) {
    this.errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this.inputErrorClass);
    this.errorMessageEl.textContent = inputEl.validationMessage;
    this.errorMessageEl.classList.remove(this.errorClass);
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      /*return?*/ this._showInputError(formEl, inputEl, options);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput() {
    return !this.inputList.every((inputEl) => inputEl.validity.valid);
  }

  // enable button & disable button after submission

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  } //look at this again

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners();
    // this._toggleButtonState();
  }
}

//const editFormValidator = new FormValidator();
//editFormValidator.enableValidation();

// create cards first
/* GO IN STEPS validation, events listeners, events, etc. Look at js then index*/
