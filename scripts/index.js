const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/*elements*/

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileModalCloseBtn = document.querySelector("#modal-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#profile-add-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  "#add-modal-close-button"
);
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardTitleInput = document.querySelector("#modal-add-card-input");
const cardUrlInput = document.querySelector("#modal-form-url-input");
const previewImageModal = document.querySelector("#preview__image-modal");
const previewImageTitle = document.querySelector(".modal__image-title");
const previewImageCloseButton = document.querySelector("#image-close-modal");
const previewImage = document.querySelector("#modal-image");

/*functions*/

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardImageEl.addEventListener("click", () => handlePreviewPicture(cardData));

  const cardRemoveButton = cardElement.querySelector("#card__remove-button");
  cardRemoveButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function handlePreviewPicture(data) {
  previewImage.src = data.link;
  previewImageTitle.textContent = data.name;
  openPopUp(previewImageModal);
}

/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function renderCard(cardData) {
  const card = newCard(cardData, "#card-template");
  const cardElement = card.getView();
  cardListEl.prepend(cardElement);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
}

/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

addNewCardButton.addEventListener("click", () => {
  openPopUp(profileAddModal);
});

profileModalCloseBtn.addEventListener("click", () => {
  closePopup(profileEditModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

previewImageCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
});
