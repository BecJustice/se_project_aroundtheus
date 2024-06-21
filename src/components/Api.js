export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.header = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
  }

  //i mty just need to comletelet rewrite code for functinos in index.js handleprofileform submit, handleaddcardform, handlescardlike and dislikes, handledelete, everything i made for Api connects
  //also need to add new html elements

  getInitialCards() {
    return fetch(this.baseUrl + "/cards", {
      headers: this.header,
    })
      .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }

  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      headers: this.header,
    })
      .then(this._checkResponse)
      .then((userData) => {
        return userData;
      });
  }

  updateProfileInfo(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then(this._checkResponse)
      .then((result) => {
        return result;
      });
  }

  updateAvatar(newAvatarUrl) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.header,
      body: JSON.stringify({ avatar: newAvatarUrl }),
    }).then(this._checkResponse);
  }

  createNewCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.header,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.header,
    }).then(this._checkResponse);
  }
  //rememebrname
  likeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.header,
    }).then(this._checkResponse);
  }
  //me
  dislikeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.header,
    }).then(this._checkResponse);
  }
}
