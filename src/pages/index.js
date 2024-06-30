import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";

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

const deletePopup = new PopupWithForm("#delete-modal");
deletePopup.setEventListeners();

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

//Api

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "8fb04c52-2fa8-4c47-a8b4-76fb0eacbed1",
    "Content-Type": "application/json",
  },
});
//userinfome
api
  .getUserInfo()
  .then((data) => {
    console.log(data); ///take this out this was to make sure right thing was being called
    userInfo.setUserInfo(data);
  })
  .catch((err) => {
    console.error(err);
  });

/*Functions*/

//edit profile
function handleProfileEditSubmit({ name, description }) {
  profilePopup.setLoading(true);
  api
    .updateProfileInfo(name, description)
    .then((userData) => {
      console.log(userData); //take out, was to make sure right thing was called
      userInfo.setUserInfo(userData);
      profilePopup.close();
      //profilePopup.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      profilePopup.setLoading(false);
    });
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

//deletecard
function handleDeleteButton(cardData) {
  deletePopup.open();
  deletePopup.setSubmit(() => {
    console.log(cardData);
    api
      .deleteCard(cardData._id)
      .then(() => {
        console.log("Card deleted successfully");
        cardData.removeCard();
        deletePopup.close();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      });
  });
}

function handleAddCardFormSubmit({ name, link }) {
  cardPopup.setLoading(true);
  api
    .createNewCard({ name, link })
    .then((data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
      cardPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      cardPopup.setLoading(false);
    });
}

//handle likes

//function handleLikeButton

/*Event Listeners*/

profileEditBtn.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  profileTitleInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;
  profilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  cardPopup.open();
});

// create card

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButton
  ); //will be adding dekerte, like, disliek etc funcs
  return cardElement.getView();
}

/*function renderCard(cardData) {
  const card = createCard(cardData);
  cardSection.addItem(card);
} */

//section instances

const cardSection = new Section(
  {
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

//renderinitialcards
api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
  });
