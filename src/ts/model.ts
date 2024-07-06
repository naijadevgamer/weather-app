import { API_KEY } from "./config";

export const state = {
  search: {
    query: "",
    results: [],
  },
};

export const loadCurrentLocationWeather = async (position: any) => {
  try {
    const { latitude: lat, longitude: lon } = position.coords;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await res.json();
  } catch (err: any) {
    throw err;
  }
};

export const loadSearchResult = async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${"ilorin"}&appid=${API_KEY}`
    );
    const res3 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${"ilo"}&appid=${API_KEY}`
    );

    const data = await res.json();
    const data3 = await res3.json();
  } catch (err: any) {
    throw err;
  }
};
