import { API_KEY } from "./config";
import { formatDate } from "./helper";

export const state = {
  weatherData: {},
  search: {
    query: "",
    results: [],
  },
};

type ForecastObject = {
  city: string;
  temp: number; // Celsius
  maxTemp: number; // Celsius
  minTemp: number; // Celsius
  weatherIcon: string;
  weatherName: string;
  weatherId: number;
  date: string; // Formatted date (e.g., "Fri, 5 Jun")
  windStatus: number; // miles/hour
  windDirection: number; // degrees
  humidity: number; // percentage
  visibility: number; // miles
  airPressure: number; // mb (hPa)
};

type WeatherObject = {
  city: string;
  tempC: number; // Celsius
  tempF: number; // Celsius
  weatherIcon: string;
  weatherName: string;
  weatherId: number;
  date: string; // Unix timestamp
  windStatus: number; // miles/hour
  windDirection: number; // degrees
  humidity: number; // percentage
  visibility: number; // miles
  airPressure: number; // mb (hPa)
};

const createWeatherObject = (data: any): WeatherObject => {
  return {
    city: data.name,
    tempC: data.main.temp - 273.15, // Converting Kelvin to Celsius
    tempF: ((data.main.temp - 273.15) * 9) / 5 + 32, // Converting Kelvin to Fahrenheit
    weatherIcon: data.weather[0].icon,
    weatherName: data.weather[0].main,
    weatherId: data.weather[0].id,
    date: formatDate(data.dt),
    windStatus: data.wind.speed * 2.237, // Converting meters/second to mph
    windDirection: data.wind.deg, // degrees
    humidity: data.main.humidity, // percentage
    visibility: data.visibility / 1609.34, // Converting meters to miles
    airPressure: data.main.pressure / 100, // Converting hPa to mb
  };
};

// Function to create forecast object for each day
const createForecastObjects = (data: any): ForecastObject[] => {
  const dailyData: { [key: string]: ForecastObject } = {};

  data.list.forEach((item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString("en-US");

    if (!dailyData[date]) {
      dailyData[date] = {
        city: data.city.name,
        temp: ((item.main.temp - 273.15) * 9) / 5 + 32, // Kelvin to Fahrenheit
        maxTemp: ((item.main.temp_max - 273.15) * 9) / 5 + 32, // Kelvin to Fahrenheit
        minTemp: ((item.main.temp_min - 273.15) * 9) / 5 + 32, // Kelvin to Fahrenheit
        weatherIcon: item.weather[0].icon,
        weatherName: item.weather[0].main,
        weatherId: item.weather[0].id,
        date: formatDate(item.dt),
        windStatus: item.wind.speed * 2.237, // meters/second to miles/hour
        windDirection: item.wind.deg, // degrees
        humidity: item.main.humidity, // percentage
        visibility: item.visibility / 1609.34, // meters to miles
        airPressure: item.main.pressure, // hPa to mb (they are equivalent)
      };
    } else {
      dailyData[date].temp += ((item.main.temp - 273.15) * 9) / 5 + 32;
      dailyData[date].maxTemp = Math.max(
        dailyData[date].maxTemp,
        ((item.main.temp_max - 273.15) * 9) / 5 + 32
      );
      dailyData[date].minTemp = Math.min(
        dailyData[date].minTemp,
        ((item.main.temp_min - 273.15) * 9) / 5 + 32
      );
      dailyData[date].windStatus += item.wind.speed * 2.237;
      dailyData[date].humidity += item.main.humidity;
      dailyData[date].visibility += item.visibility / 1609.34;
      dailyData[date].airPressure += item.main.pressure;
    }
  });

  const forecastArray = Object.values(dailyData).map((forecast) => {
    const entriesCount = data.list.filter(
      (item: any) =>
        new Date(item.dt * 1000).toLocaleDateString("en-US") === forecast.date
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

const getWeatherIcon = (data: WeatherObject) => {
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
    if (data.weatherId === 511) return "Haill";
    if ([600, 601, 602].includes(data.weatherId)) return "Snow";
    return "Sleet";
  }

  if (data.weatherIcon === "50d" || data.weatherIcon === "50n") return "Mist";
  if (data.weatherIcon === "01d" || data.weatherIcon === "01n") return "Clear";

  if (
    data.weatherIcon === "02d" ||
    data.weatherIcon === "02n" ||
    data.weatherIcon === "03d" ||
    data.weatherIcon === "03n"
  )
    return "LightCloud";

  if (data.weatherIcon === "04d" || data.weatherIcon === "04n")
    return "HeavyCloud";

  return;
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

    console.log(
      createWeatherObject(weatherData),
      getWeatherIcon(createWeatherObject(weatherData))
    );
    console.log(createForecastObjects(forecastData));
    console.log(
      createForecastObjects(forecastData).map((forecast: any) =>
        getWeatherIcon(forecast)
      )
    );
    state.weatherData = createWeatherObject(weatherData);
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
