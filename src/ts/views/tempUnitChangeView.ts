import View from "./view";

/**
 * Class representing the temperature unit switch view.
 * Handles user interaction for switching between Celsius and Fahrenheit.
 */
class TempUnitSwitchView extends View {
  /**
   * Creates an instance of TempUnitSwitchView.
   */
  constructor() {
    // Initialize the parent element for the unit switch
    const parentElement = document.querySelector(
      "#unit-switch"
    ) as HTMLDivElement;
    super(parentElement, "");
  }

  /**
   * Adds a click event handler to the unit switch buttons.
   * @param handler - The function to be called with the selected unit ("celsius" or "fahrenheit").
   */
  addHandlerClick(handler: (unit: "celcius" | "fahrenheit") => void): void {
    this.parentElement.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const button = target.closest(".btn") as HTMLButtonElement;

      if (!button || !this.data) return;

      console.log(this.data);

      // const el = e.currentTarget as HTMLElement;

      // // Ignore clicks when there is an error message or when loading
      // const firstChild = el.children[0] as HTMLDivElement;
      // const isClassPresent = ["error", "loader"].some((className) =>
      //   firstChild.classList.contains(className)
      // );
      // if (isClassPresent) return;

      // Determine which button was clicked and invoke the handler with the appropriate unit
      const unit = button.classList.contains("celcius")
        ? "celcius"
        : "fahrenheit";
      handler(unit);
    });
  }

  /**
   * Generates the markup for the temperature unit switch buttons.
   * @returns The HTML markup as a string.
   */
  protected generateMarkup(): string {
    return `
      <button
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
