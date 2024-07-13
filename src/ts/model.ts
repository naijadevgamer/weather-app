import { API_KEY } from "./config";
import { formatDate } from "./helper";

export const state: {
  weatherData: Record<string, any>;
  weatherIconName: string;
  forecastData: Record<string, any>;
  forecastIconNames: string[];
  search: {
    query: string;
    results: any[];
  };
  currentHighlight: string;
  celcius: boolean;
} = {
  weatherData: {},
  weatherIconName: "",
  forecastData: {},
  forecastIconNames: [],
  search: {
    query: "",
    results: [],
  },
  currentHighlight: "today",
  celcius: true,
};

type ForecastObject = {
  city: string;
  id: number;
  temp: number; // Kelvin
  maxTemp: number;
  minTemp: number;
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
  id: number;
  temp: number; // kelvin
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
    temp: data.main.temp,
    weatherIcon: data.weather[0].icon,
    weatherName: data.weather[0].main,
    weatherId: data.weather[0].id,
    date: formatDate(data.dt),
    windStatus: Math.round(data.wind.speed * 2.237), // Converting meters/second to mph
    windDirection: data.wind.deg, // degrees
    humidity: data.main.humidity, // percentage
    visibility: (data.visibility / 1609.34).toFixed(1), // Converting meters to miles
    airPressure: Math.round(data.main.pressure / 100), // Converting hPa to mb
    ...(data.id && { id: data.id }),
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
        id: data.city.id,
        temp: item.main.temp, // Kelvin
        maxTemp: item.main.temp_max, // Kelvin
        minTemp: item.main.temp_min, // Kelvin
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

const getWeatherIcon = (data: WeatherObject): string => {
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

  return "";
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

    [weatherRes, forecastRes].forEach((res, i) => {
      if (!res.ok)
        throw new Error(
          `${[weatherData, forecastData][i].message} ${res.status} ${
            res.statusText
          }`
        );
    });

    state.weatherData = createWeatherObject(weatherData);
    state.weatherIconName = getWeatherIcon(createWeatherObject(weatherData));

    state.forecastData = createForecastObjects(forecastData);
    state.forecastIconNames = createForecastObjects(forecastData).map(
      (forecast: any) => getWeatherIcon(forecast)
    );
  } catch (err) {
    // console.error("Error in loadCurrentLocationWeather:", err);
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
        `https://api.openweathermap.org/data/2.5/forecast?q=${"ilorin"}&appid=${API_KEY}`
      ),
    ]);
    const [weatherData, forecastData] = await Promise.all([
      weatherRes.json(),
      forecastRes.json(),
    ]);

    [weatherRes, forecastRes].forEach((res, i) => {
      if (!res.ok)
        throw new Error(
          `${[weatherData, forecastData][i].message} ${res.status} ${
            res.statusText
          }`
        );
    });
  } catch (err: any) {
    throw err;
  }
};

// loadSearchResult();
