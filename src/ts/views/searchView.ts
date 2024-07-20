// import View from "./view";

class SearchView {
  _data: any;
  _parentElement = document.querySelector(".form") as HTMLFormElement;
  _searchCloseInput = document.querySelector(
    "#search-close"
  ) as HTMLInputElement;
  // MVC: Publisher
  addHandlerSubmit(handler: any) {
    this._parentElement.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      this._searchCloseInput.checked = true;
      handler();
    });
  }

  getQuery() {
    const inputEl = this._parentElement.querySelector(
      "#city-search"
    ) as HTMLInputElement;
    const query = inputEl.value.trim();
    if (!query) throw new Error("Search field is empty 🤦‍♂️");
    return query;
  }

  clearInput() {
    const inputEl = this._parentElement.querySelector(
      "#city-search"
    ) as HTMLInputElement;
    inputEl.value = "";
  }
}

export default new SearchView();
