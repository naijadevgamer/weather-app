import View from "./view";

/**
 * A view class for displaying forecast information.
 * Extends the base `View` class and provides specific implementations for rendering forecast data.
 */
class ForecastView extends View {
  constructor() {
    const parentElement = document.querySelector("#forecast") as HTMLDivElement;
    const errorMessage = "No forecast data available. Please try again later.";
    super(parentElement, errorMessage);
  }

  /**
   * Adds an event handler for clicks on forecast items.
   * @param handler - The function to execute when a forecast item is clicked.
   */
  addHandlerClick(handler: (date: string) => void) {
    this.parentElement.addEventListener("click", (e: Event) => {
      const el = e.target as HTMLElement;
      const btn = el.closest(".day") as HTMLElement;

      // Ensure that the clicked element is part of a forecast item
      if (!btn) return;

      // Call the handler with the date from the clicked item
      handler(btn.dataset.date ?? "");
    });
  }

  /**
   * Renders a skeleton view while forecast data is being loaded.
   */
  renderSkeleton() {
    const markup = `
      <!-- Skeleton loading view for forecast items -->
      ${Array(5)
        .fill("")
        .map(
          () => `
        <div role="status" class="day--l">
          <p class="day__name--l"></p>
          <div class="day__img--l">
            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600 fill-current">
              <use xlink:href="images/sprite.svg#icon-skeleton-img"></use>
            </svg>
          </div>
          <div class="day__temp">
            <div class="day__minmax"></div>
            <div class="day__minmax"></div>
          </div>
        </div>
      `
        )
        .join("")}
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Generates the HTML markup for the forecast data.
   * @returns The HTML markup as a string.
   */
  protected generateMarkup(): string {
    const forecasts = this.data.forecastData;

    // Exclude the first forecast item if there are exactly 6 items
    const itemsToRender =
      forecasts.length === 6 ? forecasts.slice(1) : forecasts;

    // Generate markup for each forecast item
    return itemsToRender
      .map((forecast: any, i: number) =>
        this.generateMarkupPreview(forecast, i)
      )
      .join("");
  }

  /**
   * Generates the HTML markup for a single forecast item.
   * @param forecast - The forecast data for the item.
   * @param index - The index of the forecast item.
   * @returns The HTML markup as a string.
   */
  private generateMarkupPreview(forecast: any, index: number): string {
    return `
      <div class="day fade-in-bottom" data-date="${forecast.date}">
        <p class="day__name">${this.getDay(forecast, "forecast")}</p>
        <img
          src="images/${this.data.forecastIconNames[index]}.png"
          alt="${forecast.date} weather icon"
          class="day__img"
        />
        <div class="day__temp">
          <p class="max">
            ${this.convertTemp(forecast.maxTemp)}${
      this.data.celcius ? "°C" : "°F"
    }
          </p>
          <p class="min text-secondary-text">
            ${this.convertTemp(forecast.minTemp)}${
      this.data.celcius ? "°C" : "°F"
    }
          </p>
        </div>
      </div>
    `;
  }
}

export default new ForecastView();
