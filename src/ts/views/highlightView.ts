// import View from "./view";

class HighlightView {
  _data: any;
  _parentElement = document.querySelector("#highlight") as HTMLDivElement;

  // MVC: Publisher
  addHandlerWeatherRender(handler: any) {
    ["load", "hashchange"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  renderHighlight(data: any) {
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderUpdate(data: any, date: string) {
    this._data = data;
    const markup = this._generateForecastMarkup(date);
    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _generateForecastMarkup(date: string) {
    // this._data.forecastData.forEach((forecast: any, i: number) => {
    //   if (i === 0) this._data.tomorrow = false;
    // });
    return this._data.forecastData.length === 6
      ? this._data.forecastData
          .filter((_: any, i: number) => i > 0)
          .filter((forecast: any) => date === forecast.date)
          .map((forecast: any) => this._generateForecastPreview(forecast))
          .join("")
      : this._data.forecastData
          .filter((forecast: any) => date === forecast.date)
          .map((forecast: any) => this._generateForecastPreview(forecast))
          .join("");
  }

  _getDay(forecast: any) {
    let todayIndex = new Date(
      `${this._data.weatherData.date} ${new Date().getFullYear()}`
    ).getDay();

    console.log(todayIndex);
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
    console.log(todayIndex);
    return days[todayIndex + 1] === days[forecastDayIndex]
      ? "Tomorrow"
      : days[forecastDayIndex];
  }

  _generateForecastPreview(forecast: any) {
    return `<h2 class="text-[2.4rem] mb-10 max-p:text-center">
        ${this._getDay(forecast)}'s Highlight
      </h2>
      <div
        class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
      >
        <!-- Wind status -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Wind status</h3>

          <!-- Wind value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(
              forecast.windStatus
            )}</span><span class="text-[3.6rem]">mph</span>
          </p>

          <!-- Wind visual  -->
          <div
            class="text-secondary-text mx-auto flex items-center justify-center"
          >
            <div class="btn btn--wind mr-4">
              <svg class="fill-primary-text h-6 w-6" style="rotate: ${
                forecast.windDirection > 45
                  ? `${forecast.windDirection - 45}deg`
                  : `${45 - forecast.windDirection}deg`
              }">
                <use xlink:href="images/sprite.svg#icon-compass"></use>
              </svg>
            </div>
            <p class="text-[1.4rem]">WSW</p>
          </div>
        </div>

        <!-- Humidity -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Humidity</h3>

          <!-- Humidity value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(
              forecast.humidity
            )}</span><span class="text-[3.6rem]">%</span>
          </p>

          <!-- Humidity range bar  -->
          <div
            class="w-[22.9rem] mx-auto text-[1.2rem] text-tertiary-text max-tl:w-[90%]"
          >
            <p class="flex justify-between px-1">
              <span class="inline-block">0</span>
              <span class="inline-block">50</span>
              <span class="inline-block">100</span>
            </p>
            <div
              class="w-full h-[8px] rounded-3xl overflow-hidden bg-primary-text"
            >
              <p class=" bg-range-bg h-full" style="width: ${Math.round(
                forecast.humidity
              )}%; transition: all 10s ease 3s"></p>
            </div>
            <div class="flex justify-end px-1">%</div>
          </div>
        </div>

        <!-- Visibility -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Visibility</h3>

          <!-- Visibility value  -->
          <p class="text-[6.4rem]">
            <span>${forecast.visibility.toFixed(
              1
            )}</span><span class="text-[3.6rem]"> miles</span>
          </p>
        </div>

        <!-- Air pressure-->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Air pressure</h3>

          <!-- Air pressure value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(
              forecast.airPressure
            )}</span><span class="text-[3.6rem]"> mb</span>
          </p>
        </div>
      </div>`;
  }

  _generateMarkup() {
    return `<h2 class="text-[2.4rem] mb-10 max-p:text-center">
        Today's Highlight
      </h2>
      <div
        class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
      >
        <!-- Wind status -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Wind status</h3>

          <!-- Wind value  -->
          <p class="text-[6.4rem]">
            <span>${
              this._data.weatherData.windStatus
            }</span><span class="text-[3.6rem]">mph</span>
          </p>

          <!-- Wind visual  -->
          <div
            class="text-secondary-text mx-auto flex items-center justify-center"
          >
            <div class="btn btn--wind mr-4">
              <svg class="fill-primary-text h-6 w-6" style="rotate: ${
                this._data.weatherData.windDirection > 45
                  ? `${this._data.weatherData.windDirection - 45}deg`
                  : `${45 - this._data.weatherData.windDirection}deg`
              }">
                <use xlink:href="images/sprite.svg#icon-compass"></use>
              </svg>
            </div>
            <p class="text-[1.4rem]">WSW</p>
          </div>
        </div>

        <!-- Humidity -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Humidity</h3>

          <!-- Humidity value  -->
          <p class="text-[6.4rem]">
            <span>${
              this._data.weatherData.humidity
            }</span><span class="text-[3.6rem]">%</span>
          </p>

          <!-- Humidity range bar  -->
          <div
            class="w-[22.9rem] mx-auto text-[1.2rem] text-tertiary-text max-tl:w-[90%]"
          >
            <p class="flex justify-between px-1">
              <span class="inline-block">0</span>
              <span class="inline-block">50</span>
              <span class="inline-block">100</span>
            </p>
            <div
              class="w-full h-[8px] rounded-3xl overflow-hidden bg-primary-text"
            >
              <p class=" bg-range-bg h-full" style="width: ${
                this._data.weatherData.humidity
              }%;"></p>
            </div>
            <div class="flex justify-end px-1">%</div>
          </div>
        </div>

        <!-- Visibility -->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Visibility</h3>

          <!-- Visibility value  -->
          <p class="text-[6.4rem]">
            <span>${
              this._data.weatherData.visibility
            }</span><span class="text-[3.6rem]"> miles</span>
          </p>
        </div>

        <!-- Air pressure-->
        <div class="bg-secondary-bg text-center p-8">
          <h3 class="font-medium">Air pressure</h3>

          <!-- Air pressure value  -->
          <p class="text-[6.4rem]">
            <span>${
              this._data.weatherData.airPressure
            }</span><span class="text-[3.6rem]"> mb</span>
          </p>
        </div>
      </div>`;
  }
}

export default new HighlightView();
