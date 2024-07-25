import View from "./view";

/**
 * Class representing the Recent Search View.
 * Generates recent search results. Also handles search results based on recent search click
 */
class RecentSearchView extends View {
  private searchCloseInput = document.querySelector(
    "#search-close"
  ) as HTMLInputElement;
  /**
   * Creates an instance of RecentSearchView.
   */
  constructor() {
    // Initialize the parent element for the RecentSearchView
    const parentElement = document.querySelector(
      ".results-wrapper"
    ) as HTMLDivElement;
    super(parentElement, "");
  }

  /**
   * Adds a click event handler to the recent search buttons.
   * @param handler - The function to be called with the selected unit (query).
   */
  addHandlerClick(handler: (query: string) => void): void {
    this.parentElement.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest(".result") as HTMLButtonElement;

      if (!button) return;
      const query =
        (button.querySelector("p") as HTMLParagraphElement).textContent || "";

      // Check the close input to close the aside bar when button is clicked
      this.searchCloseInput.checked = true;
      handler(query);
    });
  }

  /**
   * Generates the markup for the recent search buttons.
   * @returns The HTML markup as a string.
   */
  protected generateMarkup(): string {
    return this.data.recent
      .map(
        (_: any, i: number) => ` <li class="result group">
          <p>${this.data.recent[i]}</p>
          <svg class="result-svg">
            <use
              xlink:href="images/sprite.svg#icon-chevron-small-right"
            ></use>
          </svg>
        </li>`
      )
      .join("");
  }
}

export default new RecentSearchView();
