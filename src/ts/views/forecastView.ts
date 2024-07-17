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
      console.log(btn.dataset.date);
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

  _generateMarkup() {
    return this._data.forecastData.length === 6
      ? this._data.forecastData
          .filter((_: any, i: number) => i > 0)
          .map(
            (forecast: any, i: number) => `<div class="day" data-date="${
              forecast.date
            }">
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

  // _generateMarkup() {
  //   return `<h2 class="text-[2.4rem] mb-10 max-p:text-center">
  //       Today's Highlight
  //     </h2>
  //     <div
  //       class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
  //     >
  //       <!-- Wind status -->
  //       <div class="bg-secondary-bg text-center p-8">
  //         <h3 class="font-medium">Wind status</h3>

  //         <!-- Wind value  -->
  //         <p class="text-[6.4rem]">
  //           <span>${
  //             this._data.windStatus
  //           }</span><span class="text-[3.6rem]">mph</span>
  //         </p>

  //         <!-- Wind visual  -->
  //         <div
  //           class="text-secondary-text mx-auto flex items-center justify-center"
  //         >
  //           <div class="btn btn--wind mr-4">
  //             <svg class="fill-primary-text h-6 w-6 ${
  //               this._data.windDirection > 45
  //                 ? `rotate-[${this._data.windDirection - 45}deg]`
  //                 : `-rotate-[${45 - this._data.windDirection}deg]`
  //             }">
  //               <use xlink:href="./src/images/sprite.svg#icon-compass"></use>
  //             </svg>
  //           </div>
  //           <p class="text-[1.4rem]">WSW</p>
  //         </div>
  //       </div>

  //       <!-- Humidity -->
  //       <div class="bg-secondary-bg text-center p-8">
  //         <h3 class="font-medium">Humidity</h3>

  //         <!-- Humidity value  -->
  //         <p class="text-[6.4rem]">
  //           <span>${
  //             this._data.humidity
  //           }</span><span class="text-[3.6rem]">%</span>
  //         </p>

  //         <!-- Humidity range bar  -->
  //         <div
  //           class="w-[22.9rem] mx-auto text-[1.2rem] text-tertiary-text max-tl:w-[90%]"
  //         >
  //           <p class="flex justify-between px-1">
  //             <span class="inline-block">0</span>
  //             <span class="inline-block">50</span>
  //             <span class="inline-block">100</span>
  //           </p>
  //           <div
  //             class="w-full h-[8px] rounded-3xl overflow-hidden bg-primary-text"
  //           >
  //             <p class="w-[${this._data.humidity}%] bg-range-bg h-full"></p>
  //           </div>
  //           <div class="flex justify-end px-1">%</div>
  //         </div>
  //       </div>

  //       <!-- Visibility -->
  //       <div class="bg-secondary-bg text-center p-8">
  //         <h3 class="font-medium">Visibility</h3>

  //         <!-- Visibility value  -->
  //         <p class="text-[6.4rem]">
  //           <span>${
  //             this._data.visibility
  //           }</span><span class="text-[3.6rem]"> miles</span>
  //         </p>
  //       </div>

  //       <!-- Air pressure-->
  //       <div class="bg-secondary-bg text-center p-8">
  //         <h3 class="font-medium">Air pressure</h3>

  //         <!-- Air pressure value  -->
  //         <p class="text-[6.4rem]">
  //           <span>${
  //             this._data.airPressure
  //           }</span><span class="text-[3.6rem]"> mb</span>
  //         </p>
  //       </div>
  //     </div>`;
  // }
}

export default new ForecastView();
