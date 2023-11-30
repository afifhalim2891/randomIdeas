class Modal {
  constructor() {
    this._modal = document.getElementById("modal");
    this._modalBtn = document.getElementById("modal-btn");
    this._addEventListeners();
  }

  _addEventListeners() {
    this._modalBtn.addEventListener("click", this.openModal.bind(this));
    window.addEventListener("click", this.outsideClick.bind(this));
    document.addEventListener("closeModal", this.closeModal.bind(this));
  }

  openModal() {
    this._modal.style.display = "block";
  }

  closeModal() {
    this._modal.style.display = "none";
  }

  outsideClick(e) {
    if (e.target === this._modal) {
      this.closeModal();
    }
  }
}

export default Modal;
