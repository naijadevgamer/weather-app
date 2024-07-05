import { API_URL, API_KEY } from "./config";

export const state = {
  search: {
    query: "",
    results: [],
  },
};

export const loadCurrentWeather = async function (position: any) {
  try {
    const { lat, lon } = position.coords;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await res.json();
    console.log(data);
  } catch (err: any) {
    throw err;
  }
};
