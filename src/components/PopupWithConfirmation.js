import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._modalButton = this._popupElement.querySelector(".modal__button");
  }
  setSubmit(handleSubmit) {
    this._handleFormSubmit = handleSubmit;
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
      this._handleFormSubmit();
    });
  }
}
