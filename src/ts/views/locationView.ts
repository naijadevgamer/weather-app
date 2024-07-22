class CurrentLocationView {
  private parentElement = document.querySelector(
    ".btn--locator"
  ) as HTMLButtonElement;

  /**
   * Adds a click event handler to the current location button.
   * @param {Function} handler - The function to be called when the button is clicked.
   */
  addHandlerClick(handler: any) {
    this.parentElement.addEventListener("click", (e: Event) => {
      handler();
    });
  }
}

export default new CurrentLocationView();
