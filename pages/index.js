import FormValidator from "../../components/FormValidator.js";
import Card from "../../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

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
const addCardFormElement = addCardModal.querySelector(".modal__form");

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardFormSubmit
);
cardPopup.setEventListeners();

const popupWithImage = new PopupWithImage("#preview__image-modal");
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

/*Event Handlers*/

/*function handleProfileEditSubmit({ name, description }) {
  userInfo.setUserInfo({ name, description });
  profilePopup.close(); 
} */

function handleProfileEditSubmit() {
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  profilePopup.close();
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

function handleAddCardFormSubmit(e) {
  const cardTitleInput = addCardFormElement.querySelector("#name");
  const cardUrlInput = addCardFormElement.querySelector("#url");
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link });
  addCardFormElement.reset();
}

/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  cardPopup.open();
});

// create card

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
  cardListEl.append(card);
});

function renderCard(cardData) {
  const card = createCard(cardData);
  cardListEl.prepend(card);
}

//section instances

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);
