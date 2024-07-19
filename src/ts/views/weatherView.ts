// import View from "./view";

class WeatherView {
  _data: any;
  _parentElement = document.querySelector("#weather") as HTMLDivElement;
  _errorMessage = "No weather data available. Please try again later.";

  // MVC: Publisher
  addHandlerWeatherRender(handler: any) {
    ["load", "hashchange"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  addHandlerClick(handler: any) {
    this._parentElement.addEventListener("click", (e: Event) => {
      const el = e.target as HTMLDivElement;
      handler();
    });
  }

  renderWeather(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="loader mx-auto my-60"></div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message: string = this._errorMessage) {
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
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _convertTemp(temp: number): number {
    return this._data.celcius
      ? Math.round(temp - 273.15)
      : Math.round(((temp - 273.15) * 9) / 5 + 32);
  }

  _generateMarkup() {
    return `<!-- Weather image  -->
      <div
        class="w-full h-[37.6rem] relative grid justify-items-center items-center my-auto max-tl:my-20 max-tp:h-[25rem] max-p:mt-10 max-p:mb-10"
      >
        <img
          class="absolute object-cover left-0 top-0 object-center h-full w-full colorized"
          src="images/Cloud-background.png"
          alt="Background image"
        />
        <img
          class="relative z-10 max-p:w-[40%]"
          src="images/${this._data.weatherIconName}.png"
          alt="Weather image"
        />
      </div>

      <!-- Weather Temp Value  -->
      <div class="mx-auto px-16 max-tl:px-7">
        <span class="text-[14.4rem]"
          >${this._convertTemp(this._data.weatherData.temp)}</span
        ><span class="text-[4.8rem] text-secondary-text">${
          this._data.celcius ? "°C" : "°F"
        }</span>
      </div>
      <!-- Weather Name  -->
      <p
        class="mx-auto text-[3.6rem] my-auto font-semibold text-secondary-text max-tl:my-10 max-p:mt-10 max-p:mb-10"
      >
        ${this._data.weatherData.weatherName}
      </p>

      <!-- Weather Date  -->
      <div
        class="mx-auto flex items-center text-secondary-text mb-8 text-[1.8rem] px-16 max-tl:px-7 max-p:mt-auto"
      >
        <p>Today</p>
        <span class="mx-4">•</span>
        <p>${this._data.weatherData.date}</p>
      </div>

      <!-- Weather Location  -->
      <div
        class="text-secondary-text mx-auto flex items-center px-16 max-tl:px-7"
      >
        <svg class="fill-secondary-text h-10 w-10">
          <use xlink:href="images/sprite.svg#icon-location-pin"></use>
        </svg>
        <p class="city font-semibold">${this._data.weatherData.city}</p>
      </div>`;
  }
}

export default new WeatherView();
