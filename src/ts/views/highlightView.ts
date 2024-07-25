import View from "./view";

/**
 * Class representing the Highlight view.
 * @extends View
 */
class HighlightView extends View {
  /**
   * Creates an instance of HighlightView.
   */
  constructor() {
    const parentElement = document.querySelector(
      "#highlight"
    ) as HTMLDivElement;
    const errorMessage = "No highlight data available. Please try again later.";
    super(parentElement, errorMessage);
  }

  /**
   * Renders the highlight for the forecast based on the provided date.
   * @param {any} data - The data to be rendered.
   * @param {string} date - The date for which to render the highlight.
   */
  renderForecastHighlight(data: any, date: string) {
    this.data = data;
    const markup = this.generateForecastHighlightMarkup(date);
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Renders a placeholder skeleton when data is loading.
   */
  renderNull() {
    const markup = `
      <div class="mt-32 font-bold max-p:mt-20" id="highlight">
        <h2 class="text-[2.4rem] mb-10 max-p:text-center">Today's Highlight</h2>
        <div
          class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
        >
          <!-- Wind status -->
          <div class="bg-secondary-bg text-center p-8">
            <h3 class="font-medium">Wind status</h3>
            <p class="text-[6.4rem]">
              <span>0</span><span class="text-[3.6rem]">mph</span>
            </p>
            <div class="text-secondary-text mx-auto flex items-center justify-center">
              <div class="btn btn--wind mr-4">
                <svg class="fill-primary-text h-6 w-6" style="rotate: -45deg">
                  <use xlink:href="images/sprite.svg#icon-compass"></use>
                </svg>
              </div>
              <p class="text-[1.4rem]">WSW</p>
            </div>
          </div>

          <!-- Humidity -->
          <div class="bg-secondary-bg text-center p-8">
            <h3 class="font-medium">Humidity</h3>
            <p class="text-[6.4rem]">
              <span>0</span><span class="text-[3.6rem]">%</span>
            </p>
            <div class="w-[22.9rem] mx-auto text-[1.2rem] text-tertiary-text max-tl:w-[90%]">
              <p class="flex justify-between px-1">
                <span class="inline-block">0</span>
                <span class="inline-block">50</span>
                <span class="inline-block">100</span>
              </p>
              <div class="w-full h-[8px] rounded-3xl overflow-hidden bg-primary-text">
                <p class="bg-range-bg h-full" style="width: 0%; transition: all 10s ease 3s"></p>
              </div>
              <div class="flex justify-end px-1">%</div>
            </div>
          </div>

          <!-- Visibility -->
          <div class="bg-secondary-bg text-center p-8">
            <h3 class="font-medium">Visibility</h3>
            <p class="text-[6.4rem]">
              <span>0,0</span><span class="text-[3.6rem]"> miles</span>
            </p>
          </div>

          <!-- Air pressure -->
          <div class="bg-secondary-bg text-center p-8">
            <h3 class="font-medium">Air pressure</h3>
            <p class="text-[6.4rem]">
              <span>0</span><span class="text-[3.6rem]"> mb</span>
            </p>
          </div>
        </div>
      </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  /**
   * Generates markup for forecast highlights based on the provided date.
   * @param {string} date - The date for which to generate the highlight.
   * @returns {string} - The HTML markup for the forecast highlight.
   */
  private generateForecastHighlightMarkup(date: string): string {
    const forecasts = this.data.forecastData;

    // Exclude the first forecast item if there are exactly 6 items
    const itemsToRender =
      forecasts.length === 6 ? forecasts.slice(1) : forecasts;

    // Filter forecast data for the specific date and generate markup
    return itemsToRender
      .filter((forecast: any) => forecast.date === date)
      .map((forecast: any) => this.generateForecastHighlightPreview(forecast))
      .join("");
  }

  /**
   * Generates the HTML markup for a single forecast highlight preview.
   * @param {any} forecast - The forecast data.
   * @returns {string} - The HTML markup for the forecast highlight preview.
   */
  private generateForecastHighlightPreview(forecast: any): string {
    // Get the rotation angle for the wind visual based on the wind direction
    const windRotation =
      forecast.windDirection > 45
        ? `${forecast.windDirection - 45}deg`
        : `${45 - forecast.windDirection}deg`;

    return `
      <h2 class="fade-in-bottom text-[2.4rem] mb-10 max-p:text-center">
        ${this.getDay(forecast, "highlight")}'s Highlight
      </h2>
      <div
        class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
      >        
        <!-- Wind status -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Wind status</h3>

          <!-- Wind value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(forecast.windStatus)}</span
            ><span class="text-[3.6rem]">mph</span>
          </p>

          <!-- Wind visual  -->
          <div
            class="text-secondary-text mx-auto flex items-center justify-center"
          >
            <div class="btn btn--wind mr-4">
              <svg
                class="fill-primary-text h-6 w-6"
                style="rotate: ${windRotation}"
              >
                <use xlink:href="images/sprite.svg#icon-compass"></use>
              </svg>
            </div>
            <p class="text-[1.4rem]">WSW</p>
          </div>
        </div>

        <!-- Humidity -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Humidity</h3>

          <!-- Humidity value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(forecast.humidity)}</span
            ><span class="text-[3.6rem]">%</span>
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
              <p
                class="bg-range-bg h-full"
                style="width: ${Math.round(
                  forecast.humidity
                )}%; transition: all 10s ease 3s"
              ></p>
            </div>
            <div class="flex justify-end px-1">%</div>
          </div>
        </div>

        <!-- Visibility -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Visibility</h3>

          <!-- Visibility value  -->
          <p class="text-[6.4rem]">
            <span>${forecast.visibility.toFixed(1)}</span
            ><span class="text-[3.6rem]"> miles</span>
          </p>
        </div>

        <!-- Air pressure-->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Air pressure</h3>

          <!-- Air pressure value  -->
          <p class="text-[6.4rem]">
            <span>${Math.round(forecast.airPressure)}</span
            ><span class="text-[3.6rem]"> mb</span>
          </p>
        </div>
      </div>
    `;
  }

  /**
   * Generates the default markup for today's highlight.
   * @returns {string} - The default HTML markup for today's highlight.
   */
  protected generateMarkup(): string {
    // Get the rotation angle for the wind visual based on the current wind direction
    const windRotation =
      this.data.weatherData.windDirection > 45
        ? `${this.data.weatherData.windDirection - 45}deg`
        : `${45 - this.data.weatherData.windDirection}deg`;

    return `<h2
        class="text-[2.4rem] mb-10 max-p:text-center fade-in-bottom"
      >
        Today's Highlight
      </h2>
      <div
        class="grid grid-rows-highlight grid-cols-2 gap-20 max-tl:grid-cols-highlight max-tl:auto-rows-max max-tl:grid-rows-none max-p:grid-cols-highlight-p max-p:gap-10"
      >
        <!-- Wind status -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Wind status</h3>
          <!-- Wind value  -->
          <p class="text-[6.4rem]">
            <span>${this.data.weatherData.windStatus}</span
            ><span class="text-[3.6rem]">mph</span>
          </p>

          <!-- Wind visual  -->
          <div
            class="text-secondary-text mx-auto flex items-center justify-center"
          >
            <div class="btn btn--wind mr-4">
              <svg
                class="fill-primary-text h-6 w-6"
                style="rotate: ${windRotation}"
              >
                <use xlink:href="images/sprite.svg#icon-compass"></use>
              </svg>
            </div>
            <p class="text-[1.4rem]">WSW</p>
          </div>
        </div>

        <!-- Humidity -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Humidity</h3>

          <!-- Humidity value  -->
          <p class="text-[6.4rem]">
            <span>${this.data.weatherData.humidity}</span
            ><span class="text-[3.6rem]">%</span>
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
              <p
                class="bg-range-bg h-full"
                style="width: ${this.data.weatherData.humidity}%;"
              ></p>
            </div>
            <div class="flex justify-end px-1">%</div>
          </div>
        </div>

        <!-- Visibility -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Visibility</h3>

          <!-- Visibility value  -->
          <p class="text-[6.4rem]">
            <span>${this.data.weatherData.visibility}</span
            ><span class="text-[3.6rem]"> miles</span>
          </p>
        </div>

        <!-- Air pressure -->
        <div class="bg-secondary-bg text-center p-8 fade-in-bottom">
          <h3 class="font-medium">Air pressure</h3>

          <!-- Air pressure value  -->
          <p class="text-[6.4rem]">
            <span>${this.data.weatherData.airPressure}</span
            ><span class="text-[3.6rem]"> mb</span>
          </p>
        </div>
      </div>`;
  }
}

export default new HighlightView();
