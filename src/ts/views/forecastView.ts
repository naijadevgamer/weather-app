// import View from "./view";

class ForecastView {
  _data: any;
  _parentElement = document.querySelector("#forecast") as HTMLDivElement;
  _errorMessage = "No weather forecast data available. Please try again later.";

  // MVC: Publisher
  // addHandlerRender(handler) {
  //   ["load", "hashchange"].forEach((ev) =>
  //     window.addEventListener(ev, handler)
  //   );
  // }

  renderForecast(data: any) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerClick(handler: any) {
    this._parentElement.addEventListener("click", function (e: Event) {
      const el = e.target as HTMLDivElement;
      const btn = el.closest(".day") as HTMLDivElement;
      if (!btn) return;
      handler(btn.dataset.date);
    });
  }

  _clear() {
    this._parentElement.innerHTML = "";
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

  _convertTemp(temp: number): number {
    return this._data.celcius
      ? Math.round(temp - 273.15)
      : Math.round(((temp - 273.15) * 9) / 5 + 32);
  }

  _getDay(forecast: any) {
    let todayIndex = new Date(
      `${this._data.weatherData.date} ${new Date().getFullYear()}`
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
    return days[todayIndex + 1] === days[forecastDayIndex]
      ? "Tomorrow"
      : forecast.date;
  }

  _generateMarkup() {
    return this._data.forecastData.length === 6
      ? this._data.forecastData
          .filter((_: any, i: number) => i > 0)
          .map(
            (forecast: any, i: number) => `<div class="day" data-date="${
              forecast.date
            }">
                <p class="day__name">${this._getDay(forecast)}</p>
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
              </div>`
          )
          .join("")
      : this._data.forecastData
          .map(
            (forecast: any, i: number) => `<div class="day">
                <p class="day__name">${forecast.date}</p>
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
              </div>`
          )
          .join("");
  }
}

export default new ForecastView();
