import "../styles/input.css";
import * as model from "./model";

console.log("Hello, Webpack with TypeScript and Tailwind CSS!");

const controlCurrentWeather = async function () {
  try {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        model.loadCurrentWeather,
        function () {
          throw new Error("Could not get your position");
        }
      );
  } catch (err) {
    console.error(err);
  }
};

controlCurrentWeather();
