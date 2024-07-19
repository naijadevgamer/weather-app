// import View from "./view";

class TempUnitSwitchView {
  _data: any;
  _parentElement = document.querySelector("#unit-switch") as HTMLDivElement;

  // MVC: Publisher
  // addHandlerWeatherRender(handler: any) {
  //   ["load", "hashchange"].forEach((event) =>
  //     window.addEventListener(event, handler)
  //   );
  // }

  addHandlerClick(handler: any) {
    this._parentElement.addEventListener("click", (e: Event) => {
      const el = e.target as HTMLDivElement;
      const btn = el.closest(".btn") as HTMLButtonElement;
      if (!btn) return;
      if (btn.classList.contains("celcius")) handler("celcius");
      else handler("fahrenheit");
    });
  }

  renderTempBtn(data: any) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    return `<button
        class="btn ${
          this._data.celcius ? "btn--temp-active" : "btn--temp-unit"
        } celcius"
      >
        °C
      </button>
      <button
        class="btn ${
          !this._data.celcius ? "btn--temp-active" : "btn--temp-unit"
        }"
      >
        °F
      </button>`;
  }
}

export default new TempUnitSwitchView();
