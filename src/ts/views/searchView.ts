class SearchView {
  _data: any;
  #parentElement = document.querySelector(".form") as HTMLFormElement;
  _searchCloseInput = document.querySelector(
    "#search-close"
  ) as HTMLInputElement;
  _isHandlerAdded = false; // Flag to check if the handler is already added

  // MVC: Publisher
  addHandlerSubmit(handler: any) {
    this.#parentElement.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this._searchCloseInput.checked = true;
      handler();
    });
  }

  getQuery() {
    const query = (
      this.#parentElement.querySelector("#city-search") as HTMLInputElement
    ).value.trim();
    if (!query) throw new Error("Search field is empty 🤦‍♂️");
    return query;
  }

  clearInput() {
    (
      this.#parentElement.querySelector("#city-search") as HTMLInputElement
    ).value = "";
  }
}

export default new SearchView();
