import axios from "axios";

class IdeaApi {
  constructor() {
    this._apiUrl = "/api/ideas";
  }

  getIdeas() {
    return axios.get(this._apiUrl);
  }

  postIdea(data) {
    return axios.post(this._apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this._apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    //Get author from localstorage
    const author = localStorage.getItem("author")
      ? localStorage.getItem("author")
      : "";
    return axios.delete(`${this._apiUrl}/${id}`, {
      data: {
        author,
      },
    });
  }
}

export default new IdeaApi();
