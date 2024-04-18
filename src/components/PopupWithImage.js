import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._description = this._popupElement.querySelector(".modal__image-title");
    this._image = this._popupElement.querySelector(".modal__image");
  }

  open({ name, link }) {
    this._description.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
