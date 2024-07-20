// import View from "./view";

class CurrentLocationView {
  _data: any;
  _parentElement = document.querySelector(".btn--locator") as HTMLButtonElement;

  // MVC: Publisher
  // addHandlerWeatherRender(handler: any) {
  //   ["load", "hashchange"].forEach((event) =>
  //     window.addEventListener(event, handler)
  //   );
  // }

  addHandlerClick(handler: any) {
    this._parentElement.addEventListener("click", (e: Event) => {
      handler();
    });
  }
}

export default new CurrentLocationView();
