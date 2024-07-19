// import View from "./view";

class SearchView {
  _data: any;
  _parentElement = document.querySelector("form") as HTMLFormElement;
  _searchCloseInput = document.querySelector(
    "#search-close"
  ) as HTMLInputElement;
  // MVC: Publisher
  addHandlerSubmit(handler: any) {
    this._parentElement.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this._searchCloseInput.checked === false;
      handler();
    });
  }

  getQuery() {
    const inputEl = this._parentElement.querySelector(
      "#city-search"
    ) as HTMLInputElement;
    const query = inputEl.value;
    this.#clearInput();
    if (!query) throw new Error("Search field is empty 🤦‍♂️");
    return query;
  }

  #clearInput() {
    const inputEl = this._parentElement.querySelector(
      ".search__field"
    ) as HTMLInputElement;
    inputEl.value = "";
  }
}

export default new SearchView();
