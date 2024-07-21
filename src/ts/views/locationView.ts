class CurrentLocationView {
  private parentElement = document.querySelector(
    ".btn--locator"
  ) as HTMLButtonElement;

  addHandlerClick(handler: any) {
    this.parentElement.addEventListener("click", (e: Event) => {
      handler();
    });
  }
}

export default new CurrentLocationView();
