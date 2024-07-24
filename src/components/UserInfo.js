export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
      avatar: this._avatarElement.src,
    };
    return this._userData;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
