import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config } from "../utils/constants.js";
import "./index.css";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const forms = document.querySelectorAll(config.formSelector);

const formValidators = {};
//attach ids to forms "profile-edit-form":formValidator

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidators[form.id] = formValidator;
  formValidator.enableValidation();
});
const profileEditBtn = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const profileAvatarContainer = document.querySelector(
  ".profile__image-overlay"
);

//
const deletePopup = new PopupWithConfirmation("#delete-modal");
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
  avatarSelector: ".profile__image",
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
    console.log(data);
    userInfo.setUserInfo(data);
    userInfo.setAvatar(data.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

/*Functions*/

const handleAvatarSubmit = ({ avatar }) => {
  console.log(avatar);
  editAvatarPopup.setLoading(true);
  api
    .updateAvatar(avatar)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      formValidators["edit-avatar-form"].disableButton();
      formValidators["edit-avatar-form"].toggleButtonState();
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editAvatarPopup.setLoading(false);
    });
};

const editAvatarPopup = new PopupWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
editAvatarPopup.setEventListeners();

//edit profile
function handleProfileEditSubmit({ name, description }) {
  profilePopup.setLoading(true);
  api
    .updateProfileInfo(name, description)
    .then((userData) => {
      console.log(userData);
      userInfo.setUserInfo(userData);
      profilePopup.close();
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

//add card
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

//deletecard
function handleDeleteButton(card) {
  deletePopup.open();
  deletePopup.setSubmit(() => {
    deletePopup.setLoading(true);
    console.log(card);
    api
      .deleteCard(card._id)
      .then(() => {
        console.log("Card deleted successfully");
        card.removeCard();
        formValidators["delete-modal-form"].toggleButtonState();
        deletePopup.close();
      })
      .catch((error) => {
        console.error("Error deleting card:", error);
      })
      .finally(() => {
        deletePopup.setLoading(false);
      });
  });
}

//handle likes, like a card

function handleCardLike(card) {
  api
    .likeCard(card.getCardId())
    .then(() => {
      card.updateLike(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleCardDislike(card) {
  api
    .dislikeCard(card.getCardId())
    .then(() => {
      card.updateLike(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

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

profileAvatarContainer.addEventListener("click", () => {
  editAvatarPopup.open();
});

// create card

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteButton,
    handleCardLike,
    handleCardDislike
  );
  return cardElement.getView();
}

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
