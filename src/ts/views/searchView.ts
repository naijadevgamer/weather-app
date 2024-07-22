/**
 * Class representing the search view component of the application.
 * Handles user input and form submission related to search functionality.
 */
class SearchView {
  private parentElement = document.querySelector(".form") as HTMLFormElement;
  private searchCloseInput = document.querySelector(
    "#search-close"
  ) as HTMLInputElement;

  /**
   * Adds a submit event handler to the search form.
   * @param handler - The function to be called when the form is submitted.
   */
  addHandlerSubmit(handler: () => void): void {
    this.parentElement.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      // Check the close input to close the aside bar when form is submitted
      this.searchCloseInput.checked = true;
      handler();
    });
  }

  /**
   * Retrieves the search query from the input field.
   * @returns The trimmed value of the search input field.
   * @throws Error if the search field is empty.
   */
  getQuery(): string {
    const query = (
      this.parentElement.querySelector("#city-search") as HTMLInputElement
    ).value.trim();
    if (!query) throw new Error("Search field is empty 🤦‍♂️");
    return query;
  }

  /**
   * Clears the value of the search input field.
   */
  clearInput(): void {
    (
      this.parentElement.querySelector("#city-search") as HTMLInputElement
    ).value = "";
  }
}

export default new SearchView();
