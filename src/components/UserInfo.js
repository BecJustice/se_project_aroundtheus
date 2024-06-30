export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    this._userData = {
      name: this._nameElement.textContent,
      description: this._descriptionElement.textContent,
    };
    return this._userData;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = about;
  }
}
