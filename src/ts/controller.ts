import "../styles/input.css";
import * as model from "./model";
import forecastView from "./views/forecastView";
import weatherView from "./views/weatherView";
import highlightView from "./views/highlightView";
import tempUnitChangeView from "./views/tempUnitChangeView";
import searchView from "./views/searchView";
import currentLocationView from "./views/locationView";
import recentSearchView from "./views/recentSearchView";

/**
 * Control function to fetch and display weather data for the current location.
 */
const controlCurrentLocationWeather = () => {
  // Render loading states
  weatherView.renderSpinner();
  forecastView.renderSkeleton();
  highlightView.renderNull();

  // Check if geolocation is available in the browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        try {
          // Load weather data for the current location
          await model.loadCurrentLocationWeather(position);

          // Render data
          weatherView.render(model.state);
          forecastView.render(model.state);
          highlightView.render(model.state);
          recentSearchView.render(model.state);
        } catch (err: any) {
          // Handle errors by rendering error messages
          weatherView.renderError(err.message);
        }
      },
      (error: GeolocationPositionError) => {
        // Handle geolocation errors
        weatherView.renderError(
          "Could not get your position: " + error.message
        );
      },
      {
        enableHighAccuracy: true, // Request high accuracy for the location
        timeout: 20000, // Timeout after 20 seconds
        maximumAge: 0, // Do not use cached location
      }
    );
  } else {
    // Handle case where geolocation is not supported
    weatherView.renderError("Geolocation is not supported by your browser.");
  }
};

/**
 * Control function to handle click events on forecast items.
 * @param date - The date for which to display the forecast highlight.
 */
const controlForecastClick = (date: string) => {
  highlightView.renderForecastHighlight(model.state, date);
};

/**
 * Control function to handle click events on current weather.
 */
const controlCurrentWeatherClick = () => {
  highlightView.update(model.state);
};

/**
 * Control function to handle changes in temperature units.
 * @param unit - The temperature unit to change to ('celcius' or 'fahrenheit').
 */
const controlTempUnitChange = (unit: "celcius" | "fahrenheit") => {
  model.changeTempUnit(unit);
  // Update all views with the new temperature unit
  tempUnitChangeView.update(model.state);
  weatherView.update(model.state);
  forecastView.update(model.state);
};

/**
 * Control function to handle search results based on user input.
 */
const controlSearchResult = async () => {
  try {
    // Render loading states
    weatherView.renderSpinner();
    forecastView.renderSkeleton();
    highlightView.renderNull();

    // Get search query and fetch results
    const query = searchView.getQuery();
    await model.loadSearchResult(query);

    // Clear search input and render results
    searchView.clearInput();
    weatherView.render(model.state);
    forecastView.render(model.state);
    highlightView.render(model.state);
    recentSearchView.render(model.state);
  } catch (err: any) {
    weatherView.renderError(err.message);
  }
};

/**
 * Control function to handle search results based on receent search buttons.
 */
const controlRecent = async (query: string) => {
  try {
    // Render loading states
    weatherView.renderSpinner();
    forecastView.renderSkeleton();
    highlightView.renderNull();

    await model.loadSearchResult(query);

    weatherView.render(model.state);
    forecastView.render(model.state);
    highlightView.render(model.state);
  } catch (err: any) {
    weatherView.renderError(err.message);
  }
};

/**
 * Initialize the application by setting up event handlers.
 */
const init = () => {
  // Render weather data
  controlCurrentLocationWeather();
  // Add event handlers for each view
  forecastView.addHandlerClick(controlForecastClick);
  weatherView.addHandlerClick(controlCurrentWeatherClick);
  tempUnitChangeView.addHandlerClick(controlTempUnitChange);
  searchView.addHandlerSubmit(controlSearchResult);
  currentLocationView.addHandlerClick(controlCurrentLocationWeather);
  recentSearchView.addHandlerClick(controlRecent);
};

// Initialize the app
init();

// localStorage.clear();
