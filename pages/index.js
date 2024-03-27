import FormValidator from "../components/FormValidator.js";
import Card from "../components/card.js";

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

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input_error",
  errorClass: "modal__error_visible",
};

const forms = document.querySelectorAll(config.formSelector);

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});

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
  document.removeEventListener("keydown", closeModalbyEscape);
  modal.removeEventListener("mousedown", closeModalOutsideClick);
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalbyEscape);
  modal.addEventListener("mousedown", closeModalOutsideClick);
}

function closeModalbyEscape(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closePopup(openedModal);
  }
}

function closeModalOutsideClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleImageClick(cardData) {
  openPopUp(previewImageModal);
  previewImage.src = cardData.link;
  previewImageTitle.textContent = cardData.name;
  previewImage.setAttribute("alt", cardData.name);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const cardTitleInput = addCardFormElement.querySelector("#name");
  const cardUrlInput = addCardFormElement.querySelector("#url");
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardElement = new Card(
    { name, link },
    "#card-template",
    handleImageClick
  );
  cardListEl.prepend(cardElement.getView());
  addCardFormElement.reset();
  closePopup(addCardModal);
}

/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopUp(profileEditModal);
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

// create card

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  cardListEl.append(card.getView());
});
