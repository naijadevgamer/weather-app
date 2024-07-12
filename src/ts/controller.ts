import "../styles/input.css";
import * as model from "./model";
import weatherView from "./views/weatherView";

const controlCurrentLocationWeather = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          weatherView.renderSpinner();
          await model.loadCurrentLocationWeather(position);
          weatherView.render(model.state.weather);
        } catch (err: any) {
          weatherView.renderError(err.message);
        }
      },
      (error: GeolocationPositionError) => {
        weatherView.renderError(
          "Could not get your position: " + error.message
        );
      }
    );
  } else
    return weatherView.renderError(
      "Geolocation is not supported by your browser."
    );
};

controlCurrentLocationWeather();

const controlSearchResult = async function () {
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
