import "../styles/input.css";
import * as model from "./model";
import forecastView from "./views/forecastView";
import weatherView from "./views/weatherView";
import highlightView from "./views/highlightView";
import tempUnitChangeView from "./views/tempUnitChangeView";
import searchView from "./views/searchView";
import currentLocationView from "./views/locationView";

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
const controlSearchResult = async () => {
  try {
    weatherView.renderSpinner();
    forecastView.renderSkeleton();
    const query = searchView.getQuery();
    // if (!query) return;
    await model.loadSearchResult(query);
    console.log(model.state.weatherData);
    searchView.clearInput();
    weatherView.renderWeather(model.state);
    forecastView.renderForecast(model.state);
    highlightView.renderHighlight(model.state);
  } catch (err: any) {
    weatherView.renderError(err.message);
  }
};

controlCurrentLocationWeather();
forecastView.addHandlerClick(controlForecastClick);
weatherView.addHandlerClick(controlCurrentWeatherClick);
tempUnitChangeView.addHandlerClick(controlTempUnitChange);
searchView.addHandlerSubmit(controlSearchResult);
currentLocationView.addHandlerClick(controlCurrentLocationWeather);
