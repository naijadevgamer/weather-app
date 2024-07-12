import "../styles/input.css";
import * as model from "./model";
import weatherView from "./views/weatherView";

const controlCurrentLocationWeather = async function () {
  try {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          weatherView.renderSpinner();
          await model.loadCurrentLocationWeather(position);
          weatherView.render(model.state.weather);
          console.log(model.state.weather);
        },
        () => {
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
