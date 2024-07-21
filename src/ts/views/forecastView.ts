import View from "./view";

class ForecastView extends View {
  constructor() {
    const parentElement = document.querySelector("#forecast") as HTMLDivElement;
    const errorMessage = "No forecast data available. Please try again later.";
    super(parentElement, errorMessage);
  }

  addHandlerClick(handler: any) {
    this._parentElement.addEventListener("click", function (e: Event) {
      const el = e.target as HTMLDivElement;
      const btn = el.closest(".day") as HTMLDivElement;
      if (!btn) return;
      handler(btn.dataset.date);
    });
  }

  renderSkeleton() {
    const markup = `<div role="status" class="day--l">
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
      </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  protected _generateMarkup() {
    return this._data.forecastData.length === 6
      ? this._data.forecastData
          .filter((_: any, i: number) => i > 0)
          .map((forecast: any, i: number) =>
            this.generateMarkupPreview(forecast, i)
          )
          .join("")
      : this._data.forecastData
          .map((forecast: any, i: number) =>
            this.generateMarkupPreview(forecast, i)
          )
          .join("");
  }

  private generateMarkupPreview(forecast: any, i: number): string {
    return `<div class="day fade-in-bottom" data-date="${forecast.date}">
      <p class="day__name">${this.getDay(forecast, "forecast")}</p>
      <img
        src="images/${this._data.forecastIconNames[i]}.png"
        alt=""
        class="day__img"
      />
      <div class="day__temp">
        <p class="max">
          ${this._convertTemp(forecast.maxTemp)}${
      this._data.celcius ? "°C" : "°F"
    }
        </p>
        <p class="min text-secondary-text">
          ${this._convertTemp(forecast.minTemp)}${
      this._data.celcius ? "°C" : "°F"
    }
        </p>
      </div>
    </div>`;
  }
}

export default new ForecastView();
