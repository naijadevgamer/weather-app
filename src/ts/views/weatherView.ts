import View from "./view";

class WeatherView extends View {
  constructor() {
    const parentElement = document.querySelector("#weather") as HTMLElement;
    const errorMessage = "No weather data available. Please try again later.";
    super(parentElement, errorMessage);
  }

  addHandlerWeatherRender(handler: () => void) {
    window.addEventListener("load", handler);
  }

  addHandlerClick(handler: () => void) {
    this.parentElement.addEventListener("click", (e: Event) => {
      const el = e.target as HTMLElement;
      if ((el.children[0] as HTMLDivElement)?.classList.contains("error"))
        return;
      handler();
    });
  }

  protected generateMarkup(): string {
    return `<!-- Weather image  -->
      <div
        class="w-full h-[37.6rem] relative grid justify-items-center items-center my-auto max-tl:my-20 max-tp:h-[25rem] max-p:mt-10 max-p:mb-10 fade-in-bottom"
      >
        <img
          class="absolute object-cover left-0 top-0 object-center h-full w-full colorized"
          src="images/Cloud-background.png"
          alt="Background image"
        />
        <img
          class="relative z-10 max-p:w-[40%]"
          src="images/${this.data.weatherIconName}.png"
          alt="Weather image"
        />
      </div>

      <!-- Weather Temp Value  -->
      <div class="mx-auto px-16 max-tl:px-7 fade-in-bottom">
        <span class="text-[14.4rem]"
          >${this.convertTemp(this.data.weatherData.temp)}</span
        ><span class="text-[4.8rem] text-secondary-text"
          >${this.data.celcius ? "°C" : "°F"}</span
        >
      </div>
      <!-- Weather Name  -->
      <p
        class="mx-auto text-[3.6rem] my-auto font-semibold text-secondary-text max-tl:my-10 max-p:mt-10 max-p:mb-10 fade-in-bottom"
      >
        ${this.data.weatherData.weatherName}
      </p>

      <!-- Weather Date  -->
      <div
        class="mx-auto flex items-center text-secondary-text mb-8 text-[1.8rem] px-16 max-tl:px-7 max-p:mt-auto fade-in-bottom"
      >
        <p>Today</p>
        <span class="mx-4">•</span>
        <p>${this.data.weatherData.date}</p>
      </div>

      <!-- Weather Location  -->
      <div
        class="text-secondary-text mx-auto flex items-center px-16 max-tl:px-7 fade-in-bottom"
      >
        <svg class="fill-secondary-text h-10 w-10">
          <use xlink:href="images/sprite.svg#icon-location-pin"></use>
        </svg>
        <p class="city font-semibold">${this.data.weatherData.city}</p>
      </div>`;
  }
}

export default new WeatherView();
