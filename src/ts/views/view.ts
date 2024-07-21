export default class View {
  protected data: any;
  protected parentElement: HTMLElement;
  protected errorMessage: string;

  constructor(parentElement: HTMLElement, errorMessage: string) {
    this.parentElement = parentElement;
    this.errorMessage = errorMessage;
  }

  render(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  update(data: any) {
    this.data = data;
    const newMarkup = this.generateMarkup();

    // To create virtual dom
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    const currElements = Array.from(this.parentElement.querySelectorAll("*"));
    newElements.forEach((newEl: any, i) => {
      const curEl = currElements[i];
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr: any) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  protected clear() {
    this.parentElement.innerHTML = "";
  }

  protected getDay(forecast: any, dateType: string) {
    let todayIndex = new Date(
      `${this.data.weatherData.date} ${new Date().getFullYear()}`
    ).getDay();

    const forecastDayIndex = new Date(
      `${forecast.date} ${new Date().getFullYear()}`
    ).getDay();

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednessday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    todayIndex = todayIndex === 6 ? -1 : todayIndex;

    return days[todayIndex] === days[forecastDayIndex]
      ? "Today"
      : days[todayIndex + 1] === days[forecastDayIndex]
      ? "Tomorrow"
      : dateType === "forecast"
      ? forecast.date
      : days[forecastDayIndex];
  }

  renderSpinner() {
    const markup = `<div class="loader mx-auto my-60"></div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

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

  protected convertTemp(temp: number): number {
    return this.data.celcius
      ? Math.round(temp - 273.15)
      : Math.round(((temp - 273.15) * 9) / 5 + 32);
  }

  protected generateMarkup(): string {
    // Placeholder for implementation in subclass
    return "";
  }
}
