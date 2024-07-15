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

  // renderSpinner() {
  //   const markup = `
  //   <div class="loader mx-auto my-60"></div>`;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  // renderError(message: string = this._errorMessage) {
  //   const markup = `
  //     <div class="error">
  //       <div>
  //         <svg>
  //           <use xlink:href="images/sprite.svg#icon-alert-triangle"></use>
  //         </svg>
  //       </div>
  //       <p>${message}</p>
  //     </div>
  //   `;
  //   this._clear();
  //   this._parentElement.insertAdjacentHTML("afterbegin", markup);
  // }

  // _generateMarkup() {
  //   return `<!-- Weather image  -->
  //     <div
  //       class="w-full h-[37.6rem] relative grid justify-items-center items-center my-auto max-tl:my-20 max-tp:h-[25rem] max-p:mt-10 max-p:mb-10"
  //     >
  //       <img
  //         class="absolute object-cover left-0 top-0 object-center h-full w-full colorized"
  //         src="images/Cloud-background.png"
  //         alt="Background image"
  //       />
  //       <img
  //         class="relative z-10 max-p:w-[40%]"
  //         src="images/${this._data.weatherIconName}.png"
  //         alt="Weather image"
  //       />
  //     </div>

  //     <!-- Weather Temp Value  -->
  //     <div class="mx-auto px-16 max-tl:px-7">
  //       <span class="text-[14.4rem]"
  //         >${this._convertTemp(this._data.weatherData.temp)}</span
  //       ><span class="text-[4.8rem] text-secondary-text">${
  //         this._data.celcius ? "°C" : "°F"
  //       }</span>
  //     </div>
  //     <!-- Weather Name  -->
  //     <p
  //       class="mx-auto text-[3.6rem] my-auto font-semibold text-secondary-text max-tl:my-10 max-p:mt-10 max-p:mb-10"
  //     >
  //       ${this._data.weatherData.weatherName}
  //     </p>

  //     <!-- Weather Date  -->
  //     <div
  //       class="mx-auto flex items-center text-secondary-text mb-8 text-[1.8rem] px-16 max-tl:px-7 max-p:mt-auto"
  //     >
  //       <p>Today</p>
  //       <span class="mx-4">•</span>
  //       <p>${this._data.weatherData.date}</p>
  //     </div>

  //     <!-- Weather Location  -->
  //     <div
  //       class="text-secondary-text mx-auto flex items-center px-16 max-tl:px-7"
  //     >
  //       <svg class="fill-secondary-text h-10 w-10">
  //         <use xlink:href="images/sprite.svg#icon-location-pin"></use>
  //       </svg>
  //       <p class="city font-semibold">${this._data.weatherData.city}</p>
  //     </div>`;
  // }

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
              <svg class="fill-primary-text h-6 w-6 ${
                this._data.weatherData.windDirection > 45
                  ? `rotate-[${this._data.weatherData.windDirection - 45}deg]`
                  : `-rotate-[${45 - this._data.weatherData.windDirection}deg]`
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
