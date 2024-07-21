import View from "./view";

class TempUnitSwitchView extends View {
  constructor() {
    const parentElement = document.querySelector(
      "#unit-switch"
    ) as HTMLDivElement;
    super(parentElement, "");
  }

  addHandlerClick(handler: any) {
    this.parentElement.addEventListener("click", (e: Event) => {
      const el = e.target as HTMLDivElement;
      const btn = el.closest(".btn") as HTMLButtonElement;
      if (!btn) return;
      if (btn.classList.contains("celcius")) handler("celcius");
      else handler("fahrenheit");
    });
  }

  protected generateMarkup() {
    return `<button
        class="btn ${
          this.data.celcius ? "btn--temp-active" : "btn--temp-unit"
        } celcius"
      >
        °C
      </button>
      <button
        class="btn ${
          !this.data.celcius ? "btn--temp-active" : "btn--temp-unit"
        }"
      >
        °F
      </button>`;
  }
}

export default new TempUnitSwitchView();
