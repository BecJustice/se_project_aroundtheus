import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._modalButton = this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList = this._form.querySelectorAll(".modal__form-input");
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._modalButton.textContent = "Saving...";
    } else {
      this._modalButton.textContent = "Save";
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
