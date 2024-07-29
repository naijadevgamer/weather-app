import { API_KEY } from "./config";
import {
  formatDate,
  convertMetersToMiles,
  convertSpeedToMph,
  formatWeatherDescription,
} from "./helper";

/**
 * Application state including weather and forecast data.
 */
export let state: {
  weatherData: WeatherObject;
  weatherIconName: string;
  forecastData: ForecastObject[];
  forecastIconNames: string[];
  query: string;
  recent: string[];
  celcius: boolean;
} = {
  weatherData: {} as WeatherObject,
  weatherIconName: "",
  forecastData: [] as ForecastObject[],
  forecastIconNames: [],
  query: "",
  recent: JSON.parse(localStorage.getItem("recent") || "[]"),
  celcius: true,
};

/**
 * Represents a forecast object with relevant weather details.
 */
export type ForecastObject = {
  city: string;
  temp: number; // Temperature in Kelvin
  maxTemp: number;
  minTemp: number;
  weatherIcon: string;
  weatherName: string;
  weatherId: number;
  date: string; // Formatted date (e.g., "Fri, 5 Jun")
  windStatus: number; // Wind speed in miles/hour
  windDirection: number; // Wind direction in degrees
  humidity: number; // Humidity in percentage
  visibility: number; // Visibility in miles
  airPressure: number; // Air pressure in mb (hPa)
};

/**
 * Represents a weather object with current weather details.
 */
type WeatherObject = {
  city: string;
  temp: number; // Temperature in Kelvin
  weatherIcon: string;
  weatherName: string;
  weatherId: number;
  date: string; // Date in Unix timestamp
  windStatus: number; // Wind speed in miles/hour
  windDirection: number; // Wind direction in degrees
  humidity: number; // Humidity in percentage
  visibility: number; // Visibility in miles
  airPressure: number; // Air pressure in mb (hPa)
};

/**
 * Creates a WeatherObject from the API data.
 * @param data - The weather data from the API.
 * @returns A WeatherObject instance.
 * @throws An error if the data is invalid.
 */
const createWeatherObject = (data: any): WeatherObject => {
  if (!data || !data.main || !data.weather) {
    throw new Error("Invalid weather data");
  }

  return {
    city: data.name,
    temp: data.main.temp,
    weatherIcon: data.weather[0].icon,
    weatherName: formatWeatherDescription(data.weather[0].description),
    weatherId: data.weather[0].id,
    date: formatDate(data.dt),
    windStatus: convertSpeedToMph(data.wind.speed),
    windDirection: data.wind.deg,
    humidity: data.main.humidity,
    visibility: convertMetersToMiles(data.visibility),
    airPressure: Math.round(data.main.pressure),
  };
};

/**
 * Creates an array of forecast objects from the provided data.
 *
 * @param {any} data - The raw forecast data from the API.
 * @returns {ForecastObject[]} - An array of formatted forecast objects.
 */
const createForecastObjects = (data: any): ForecastObject[] => {
  const dailyData: { [key: string]: ForecastObject } = {};

  // Process each forecast item
  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US");

    if (!dailyData[date]) {
      // Initialize a new entry for this date
      dailyData[date] = {
        city: data.city.name,
        temp: item.main.temp,
        maxTemp: item.main.temp_max,
        minTemp: item.main.temp_min,
        weatherIcon: item.weather[0].icon,
        weatherName: item.weather[0].main,
        weatherId: item.weather[0].id,
        date: formatDate(item.dt),
        windStatus: item.wind.speed * 2.237, // Convert meters/second to miles/hour
        windDirection: item.wind.deg,
        humidity: item.main.humidity,
        visibility: item.visibility / 1609.34, // Convert meters to miles
        airPressure: item.main.pressure,
      };
    } else {
      // Update existing entry for this date
      if (new Date(item.dt * 1000).getHours() === 13)
        dailyData[date].weatherIcon = item.weather[0].icon; // Update icon if closest to midday
      dailyData[date].temp += item.main.temp;
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        item.main.temp_max
      );
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        item.main.temp_min
      );
      dailyData[date].windStatus += item.wind.speed * 2.237;
      dailyData[date].humidity += item.main.humidity;
      dailyData[date].visibility += item.visibility / 1609.34;
      dailyData[date].airPressure += item.main.pressure;
    }
  });

  // Average out the values for each day
  const forecastArray = Object.values(dailyData).map((forecast) => {
    const entriesCount = data.list.filter(
      (item: any) => formatDate(item.dt) === forecast.date
    ).length;
    if (entriesCount > 0) {
      forecast.temp /= entriesCount;
      forecast.windStatus /= entriesCount;
      forecast.humidity /= entriesCount;
      forecast.visibility /= entriesCount;
      forecast.airPressure /= entriesCount;
    }

    return forecast;
  });

  return forecastArray;
};

/**
 * Maps weather icon codes to descriptive weather conditions.
 *
 * @param {WeatherObject} data - The weather object containing icon and id.
 * @returns {string} - The descriptive weather condition.
 */
const getWeatherIcon = (data: WeatherObject | ForecastObject): string => {
  // Determine the weather condition based on icon code and id
  if (data.weatherIcon === "11d" || data.weatherIcon === "11n")
    return "Thunderstorm";
  if (data.weatherIcon === "09d" || data.weatherIcon === "09n") {
    if ([302, 312].includes(data.weatherId)) return "HeavyRain";
    if ([313, 314, 321, 521, 522, 531].includes(data.weatherId))
      return "Shower";
    return "LightRain";
  }
  if (data.weatherIcon === "10d" || data.weatherIcon === "10n") {
    if ([500, 501].includes(data.weatherId)) return "LightRain";
    return "HeavyRain";
  }
  if (data.weatherIcon === "13d" || data.weatherIcon === "13n") {
    if (data.weatherId === 511) return "Hail";
    if ([600, 601, 602].includes(data.weatherId)) return "Snow";
    return "Sleet";
  }
  if (data.weatherIcon === "50d" || data.weatherIcon === "50n") return "Mist";
  if (data.weatherIcon === "01d" || data.weatherIcon === "01n") return "Clear";
  if (["02d", "02n", "03d", "03n"].includes(data.weatherIcon))
    return "LightCloud";
  if (data.weatherIcon === "04d" || data.weatherIcon === "04n")
    return "HeavyCloud";
  return "";
};

/**
 * Fetch current weather and forecast data based on geolocation.
 * @param position - Geolocation position object
 * @throws Error if fetch fails or response is not ok
 */
export const loadCurrentLocationWeather = async (
  position: GeolocationPosition
): Promise<void> => {
  try {
    const { latitude: lat, longitude: lon } = position.coords;

    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      ),
    ]);

    // Check if responses are ok
    [weatherRes, forecastRes].forEach((res, i) => {
      if (!res.ok) {
        throw new Error(
          `${[weatherRes, forecastRes][i].statusText} ${res.status}`
        );
      }
    });

    const [weatherData, forecastData] = await Promise.all([
      weatherRes.json(),
      forecastRes.json(),
    ]);

    // Update state with the fetched data
    state.weatherData = createWeatherObject(weatherData);
    state.weatherIconName = getWeatherIcon(state.weatherData);
    state.forecastData = createForecastObjects(forecastData);
    state.forecastIconNames = state.forecastData.map((forecast) =>
      getWeatherIcon(forecast)
    );
  } catch (err) {
    console.error("Failed to load current location weather:", err);
    throw err;
  }
};

/**
 * Persist the recent search array base on query to the local storage
 */
const persistRecentSearch = (): void => {
  // Return if query is already present
  if (
    state.recent.some(
      (recent) => recent.toLowerCase() === state.query.toLowerCase()
    )
  )
    return;

  // Checks if the array can take in more recent search query
  if (state.recent.length < 3) state.recent.unshift(state.query);
  else {
    state.recent.pop(); // Remove the last value
    state.recent.unshift(state.query); // Add to recent from the front
  }

  localStorage.setItem("recent", JSON.stringify(state.recent));
};

/**
 * Fetch weather and forecast data based on search query.
 * @param query - City name or search query
 * @throws Error if fetch fails or response is not ok
 */
export const loadSearchResult = async (query: string): Promise<void> => {
  try {
    state.query = query;
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}`
      ),
    ]);

    // Check if responses are ok
    [weatherRes, forecastRes].forEach((res, i) => {
      if (!res.ok) {
        throw new Error(
          `${[weatherRes, forecastRes][i].statusText} ${res.status}`
        );
      }
    });

    const [weatherData, forecastData] = await Promise.all([
      weatherRes.json(),
      forecastRes.json(),
    ]);

    // Update state with the fetched data
    state.weatherData = createWeatherObject(weatherData);
    state.weatherIconName = getWeatherIcon(state.weatherData);
    state.forecastData = createForecastObjects(forecastData);
    state.forecastIconNames = state.forecastData.map((forecast) =>
      getWeatherIcon(forecast)
    );
    persistRecentSearch();
  } catch (err) {
    throw err;
  }
};

/**
 * Change the temperature unit between Celsius and Fahrenheit.
 * @param unit - Desired temperature unit ("celcius" or "fahrenheit")
 */
export const changeTempUnit = (unit: "celcius" | "fahrenheit"): void => {
  state.celcius = unit === "celcius";
};
