export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    _handleLikeButton,
    handleCardLike,
    handleCardDislike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._id = data._id;
    this._handleLikeButton = _handleLikeButton;
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
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () =>
        !this._isLiked ? this.handleLike(this) : this.handleDislike(this)
      );

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
    //
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
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
