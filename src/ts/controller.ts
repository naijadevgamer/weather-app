import "../styles/input.css";
import * as model from "./model";

const controlCurrentLocationWeather = async function () {
  try {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        model.loadCurrentLocationWeather,
        function () {
          throw new Error("Could not get your position");
        }
      );
  } catch (err) {
    console.error(err);
  }
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
