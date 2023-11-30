import ideaAPI from "../../services/ideaAPI";
import IdeaList from "./IdeaList";

class IdeaForm {
  constructor() {
    this._formModal = document.getElementById("form-modal");
    this._ideaList = new IdeaList();
  }

  _addEventListeners() {
    this._form.addEventListener("submit", this._submitHandler.bind(this));
  }

  async _submitHandler(e) {
    e.preventDefault();

    const text = this._form.elements.text.value;
    const tag = this._form.elements.tag.value;
    const author = this._form.elements.username.value;

    if (text === "" || tag === "" || author === "") {
      alert("Please fill in all the fields!");
      return;
    }

    //Save author name to local storage
    localStorage.setItem("author", author);

    const idea = {
      text,
      tag,
      author,
    };

    //Add idea to server
    const newIdea = await ideaAPI.postIdea(idea);

    //Add idea to DOM
    this._ideaList.addIdeaToList(newIdea.data.data);

    this._form.elements.text.value = "";
    this._form.elements.tag.value = "";
    this._form.elements.username.value = "";

    document.dispatchEvent(new Event("closeModal"));

    this.render();
  }

  render() {
    this._formModal.innerHTML = `
      <form id="idea-form">
          <div class="form-control">
            <label for="idea-text">Enter a Username</label>
            <input type="text" name="username" id="username" value="${
              localStorage.getItem("author")
                ? localStorage.getItem("author")
                : ""
            }" />
          </div>
          <div class="form-control">
            <label for="idea-text">What's Your Idea?</label>
            <textarea name="text" id="idea-text"></textarea>
          </div>
          <div class="form-control">
            <label for="tag">Tag</label>
            <input type="text" name="tag" id="tag" />
          </div>
          <button class="btn" type="submit" id="submit">Submit</button>
        </form>
    `;

    this._form = document.getElementById("idea-form");
    this._addEventListeners();
  }
}

export default IdeaForm;
