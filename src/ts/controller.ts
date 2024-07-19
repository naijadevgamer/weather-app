import "../styles/input.css";
import * as model from "./model";
import forecastView from "./views/forecastView";
import weatherView from "./views/weatherView";
import highlightView from "./views/highlightView";
import tempUnitChangeView from "./views/tempUnitChangeView";

const controlCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    weatherView.renderSpinner();
    forecastView.renderSkeleton();
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          weatherView.renderSpinner();
          forecastView.renderSkeleton();
          await model.loadCurrentLocationWeather(position);
          weatherView.renderWeather(model.state);
          forecastView.renderForecast(model.state);
          highlightView.renderHighlight(model.state);
          console.log(model.state.weatherData, model.state.forecastData);
        } catch (err: any) {
          weatherView.renderError(err.message);
        }
      },
      (error: GeolocationPositionError) => {
        weatherView.renderError(
          "Could not get your position: " + error.message
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  } else
    return weatherView.renderError(
      "Geolocation is not supported by your browser."
    );
};

const controlForecastClick = (date: string) => {
  highlightView.renderUpdate(model.state, date);
};

const controlCurrentWeatherClick = () => {
  if (model.state.weatherData.humidity)
    highlightView.renderHighlight(model.state);
};

const controlTempUnitChange = (unit: string) => {
  model.changeTempUnit(unit);
  tempUnitChangeView.renderTempBtn(model.state);
  weatherView.renderWeather(model.state);
  forecastView.renderForecast(model.state);
};

controlCurrentLocationWeather();
forecastView.addHandlerClick(controlForecastClick);
weatherView.addHandlerClick(controlCurrentWeatherClick);
tempUnitChangeView.addHandlerClick(controlTempUnitChange);

const controlSearchResult = async () => {
  try {
  } catch (err) {
    console.error(err);
  }
};

const controlForecast = async function () {
  try {
  } catch (err) {
    console.error(err);
  }
};
