/**
 * Base class for creating views in the application.
 */
export default class View {
  protected data: any; // Data to be rendered in the view
  protected parentElement: HTMLElement; // Parent element where the view will be rendered
  protected errorMessage: string; // Error message to be displayed

  /**
   * Initializes the view with parent element and error message.
   * @param parentElement - The HTML element to render the view in.
   * @param errorMessage - Default error message to be displayed.
   */
  constructor(parentElement: HTMLElement, errorMessage: string) {
    this.parentElement = parentElement;
    this.errorMessage = errorMessage;
  }

  /**
   * Renders the view with the given data.
   * @param data - Data to be rendered.
   */
  render(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Updates the view with new data.
   * @param data - New data to update the view with.
   */
  update(data: any) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    // Create a virtual DOM to compare with current DOM
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currElements = Array.from(this.parentElement.querySelectorAll("*"));

    newElements.forEach((newEl: Element, i) => {
      const curEl = currElements[i];

      // Update text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild &&
        newEl.firstChild.nodeValue &&
        newEl.firstChild.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr: Attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  // update(data: any) {
  //   this.data = data;
  //   const newMarkup = this.generateMarkup();

  //   // To create virtual dom
  //   const newDOM = document.createRange().createContextualFragment(newMarkup);
  //   const newElements = Array.from(newDOM.querySelectorAll("*"));

  //   const currElements = Array.from(this.parentElement.querySelectorAll("*"));

  //   newElements.forEach((newEl: any, i) => {
  //     const curEl = currElements[i];
  //     console.log(currElements[i]);
  //     console.log(newElements[i]);
  //     // Updates changed TEXT
  //     if (
  //       !newEl.isEqualNode(curEl) &&
  //       newEl.firstChild?.nodeValue.trim() !== ""
  //     ) {
  //       curEl.textContent = newEl.textContent;
  //     }

  //     // Updates changed ATTRIBUTES
  //     if (!newEl.isEqualNode(curEl)) {
  //       Array.from(newEl.attributes).forEach((attr: any) =>
  //         curEl.setAttribute(attr.name, attr.value)
  //       );
  //     }
  //   });
  // }

  /**
   * Clears the content of the parent element.
   */
  protected clear() {
    this.parentElement.innerHTML = "";
  }

  /**
   * Converts temperature from Kelvin to Celsius or Fahrenheit based on the current unit.
   * @param temp - Temperature in Kelvin.
   * @returns Converted temperature.
   */
  protected convertTemp(temp: number): number {
    return this.data.celcius
      ? Math.round(temp - 273.15)
      : Math.round(((temp - 273.15) * 9) / 5 + 32);
  }

  /**
   * Returns the name of the day for the given forecast date.
   * If the forecast date is today or tomorrow, it returns "Today" or "Tomorrow" respectively.
   * Otherwise, it returns the day of the week.
   * @param forecast - The forecast object containing the date.
   * @param dateType - Type of date ("forecast" or other).
   * @returns Name of the day or the date itself.
   */
  protected getDay(forecast: any, dateType: string): string {
    // Get the index of today's day in the week
    const todayIndex = new Date(
      `${this.data.weatherData.date} ${new Date().getFullYear()}`
    ).getDay();

    // Get the index of the forecast day in the week
    const forecastDayIndex = new Date(
      `${forecast.date} ${new Date().getFullYear()}`
    ).getDay();

    // List of days in a week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Adjust index if today is Saturday to correctly calculate "Tomorrow"
    const adjustedTodayIndex = todayIndex === 6 ? -1 : todayIndex;

    // Determine if the forecast day is today, tomorrow, or any other day
    if (days[adjustedTodayIndex] === days[forecastDayIndex]) {
      return "Today";
    } else if (days[adjustedTodayIndex + 1] === days[forecastDayIndex]) {
      return "Tomorrow";
    } else {
      return dateType === "forecast" ? forecast.date : days[forecastDayIndex];
    }
  }

  /**
   * Renders a spinner to indicate loading.
   */
  renderSpinner() {
    const markup = `<div class="loader mx-auto my-60"></div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders an error message.
   * @param message - Error message to display.
   */
  renderError(message: string = this.errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use xlink:href="images/sprite.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Generates markup for the view.
   * This method should be implemented in subclasses.
   * @returns Markup string.
   */
  protected generateMarkup(): string {
    // Placeholder for implementation in subclass
    return "";
  }
}
