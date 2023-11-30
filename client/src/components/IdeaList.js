import ideaAPI from "../../services/ideaAPI";

class IdeaList {
  constructor() {
    this._ideaList = document.getElementById("idea-list");
    this._ideas = [];
    this.getIdeas();

    this._validTags = new Set();
    this._validTags.add("technology");
    this._validTags.add("software");
    this._validTags.add("business");
    this._validTags.add("education");
    this._validTags.add("health");
    this._validTags.add("inventions");
  }

  _addEventListeners() {
    this._ideaList.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  async getIdeas() {
    try {
      const res = await ideaAPI.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteIdea(ideaId) {
    try {
      //Delete idea in the server
      const res = await ideaAPI.deleteIdea(ideaId);

      //Delete idea in the DOM
      this._ideas.filter((idea) => idea._id !== ideaId);
      this.getIdeas();
    } catch (error) {
      alert("You are not allow to delete this idea");
    }
  }

  _setValidTag(text) {
    let validTag = "";

    if (this._validTags.has(text.toLowerCase())) {
      validTag = `tag-${text}`;
    } else {
      validTag = "";
    }

    return validTag;
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  render() {
    this._ideaList.innerHTML = `
      ${this._ideas
        .map((idea) => {
          const tag = this._setValidTag(idea.tag);
          const deletebtn =
            idea.author === localStorage.getItem("author")
              ? '<button class="delete"><i class="fas fa-times"></i></button>'
              : "";

          return `
        <div class="card" data-id="${idea._id}">
          ${deletebtn}
          <h3>
            ${idea.text}
          </h3>
          <p class="tag ${tag}">${idea.tag.toUpperCase()}</p>
          <p>
            Posted on <span class="date">${idea.date}</span> by
            <span class="author">${idea.author}</span>
          </p>
        </div>
        `;
        })
        .join("")}
    `;
    this._addEventListeners();
  }
}

export default IdeaList;
