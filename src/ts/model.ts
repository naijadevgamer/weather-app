import { API_KEY } from "./config";

export const state = {
  search: {
    query: "",
    results: [],
  },
};

type WeatherObject = {
  city: string;
  temp: number; // Celsius
  weatherIcon: string;
  date: number; // Unix timestamp
  windStatus: number; // meters/second
  windDirection: number; // degrees
  humidity: number; // percentage
  visibility: number; // kilometers
  airPressure: number; // hPa
};

const createWeatherObject = (data: any): WeatherObject => {
  return {
    city: data.name,
    temp: data.main.temp - 273.15, // Converting Kelvin to Celsius
    weatherIcon: data.weather[0].icon,
    date: data.dt,
    windStatus: data.wind.speed, // meters/second
    windDirection: data.wind.deg, // degrees
    humidity: data.main.humidity, // percentage
    visibility: data.visibility / 1000, // Converting meters to kilometers
    airPressure: data.main.pressure, // hPa
  };
};

export const loadCurrentLocationWeather = async (position: any) => {
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
    const [weatherData, forecastData] = await Promise.all([
      weatherRes.json(),
      forecastRes.json(),
    ]);

    console.log(createWeatherObject(weatherData));
  } catch (err: any) {
    throw err;
  }
};

export const loadSearchResult = async () => {
  try {
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${"ilorin"}&appid=${API_KEY}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${"ilo"}&appid=${API_KEY}`
      ),
    ]);
    const [weatherData, forecastData] = await Promise.all([
      weatherRes.json(),
      forecastRes.json(),
    ]);

    console.log(weatherData, forecastData);
  } catch (err: any) {
    throw err;
  }
};
