export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleCardLike,
    handleCardDislike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._id = data._id;
    this.handleLike = handleCardLike;
    this.handleDislike = handleCardDislike;
    this._isLiked = data.isLiked;
  }
  getCardId() {
    return this._id;
  }

  _setEventListeners() {
    //
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });
    //

    this._likeButton.addEventListener("click", () => {
      if (this._isLiked) {
        this.handleDislike(this);
      } else {
        this.handleLike(this);
      }
    });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
    //
  }

  updateLike(isLiked) {
    this._isLiked = isLiked;
    this._renderLikes();
  }

  removeCard() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }

  _renderLikes() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }
}
